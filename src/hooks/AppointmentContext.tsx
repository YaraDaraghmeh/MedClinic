import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { db } from '../database/firebase';
import { collection, onSnapshot, doc, updateDoc, writeBatch, setDoc, deleteDoc } from "firebase/firestore";
import { Appointment } from "../Types";

// Define the context type
interface AppointmentsContextType {
  appointments: Appointment[];
  addAppointment: (appointmentData: {
    doctorEmail: string;
    patientEmail: string;
    appointmentDate: Date;
    appointmentTime: string;
    reason: string;
    status: "pending" | "confirmed" | "completed" | "canceled";
  }) => Promise<void>;
  updateAppointment: (
    id: string,
    updatedData: Partial<{
      doctorEmail: string;
      patientEmail: string;
      appointmentDate: Date;
      appointmentTime: string;
      reason: string;
      status: "pending" | "confirmed" | "completed" | "canceled";
      note?:string;
      documents?:string[]
    }>
  ) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
  getAppointmentsByDoctor: (doctorEmail: string) => Appointment[];
  getAppointmentsByPatient: (patientEmail: string) => Appointment[];
  forwardAppointments: (oldDoctorEmail: string, newDoctorEmail: string) => Promise<void>;
  cancelAllAppointments: (doctorEmail: string) => Promise<void>;
}

// Create the context
const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

// Create the provider component
export const AppointmentsProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Fetch appointments and listen for real-time updates
  useEffect(() => {
    const appointmentsCollection = collection(db, "appointments");
  
    const unsubscribe = onSnapshot(appointmentsCollection, async (snapshot) => {
      const fetchedAppointments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as unknown as Appointment[];
  
      setAppointments(fetchedAppointments);
  
      // Get today's date in UTC format without time
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      // Find appointments that have passed their date and are not canceled
      const batch = writeBatch(db);
      let hasUpdates = false;
  
      fetchedAppointments.forEach((appointment) => {
        const appointmentDate = new Date(appointment.appointmentDate);
        if (
          appointmentDate < today &&
          appointment.status !== "canceled" &&
          appointment.status !== "completed"
        ) {
          const appointmentDoc = doc(db, "appointments", appointment.id);
          batch.update(appointmentDoc, { status: "canceled" });
          hasUpdates = true;
        }
      });
  
      // Commit the batch update if there are changes
      if (hasUpdates) {
        await batch.commit();
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  // Add a new appointment
  const addAppointment = async (appointmentData: {
    doctorEmail: string;
    patientEmail: string;
    appointmentDate: Date;
    appointmentTime: string;
    reason: string;
    status: "pending" | "confirmed" | "completed" | "canceled";
  }) => {
    try {
      const appointmentId = `${appointmentData.doctorEmail}-${appointmentData.patientEmail}-${appointmentData.appointmentDate.toISOString()}-${appointmentData.appointmentTime}`;

      const appointmentDoc = doc(db, "appointments", appointmentId); // Use a unique ID for the appointment
      await setDoc(appointmentDoc, {
        doctorEmail: appointmentData.doctorEmail,
        patientEmail: appointmentData.patientEmail,
        appointmentDate: appointmentData.appointmentDate.toISOString(),
        appointmentTime: appointmentData.appointmentTime,
        reason: appointmentData.reason,
        status: appointmentData.status,
      });
    } catch (error) {
      throw new Error(
        `Error adding appointment: ${
          error instanceof Error ? error.message : "An unknown error occurred."
        }`
      );
    }
  };

  // Update an appointment
  const updateAppointment = async (
    id: string,
    updatedData: Partial<{
      doctorEmail: string;
      patientEmail: string;
      appointmentDate: Date;
      appointmentTime: string;
      reason: string;
      status: "pending" | "confirmed" | "completed" | "canceled";
    }>
  ) => {
    try {
      const appointmentDoc = doc(db, "appointments", id); // Use the appointment ID
      await updateDoc(appointmentDoc, updatedData);
    } catch (error) {
      throw new Error(
        `Error updating appointment: ${
          error instanceof Error ? error.message : "An unknown error occurred."
        }`
      );
    }
  };

  // Delete an appointment
  const deleteAppointment = async (id: string) => {
    try {
      const appointmentDoc = doc(db, "appointments", id); // Use the appointment ID
      await deleteDoc(appointmentDoc);
    } catch (error) {
      throw new Error(
        `Error deleting appointment: ${
          error instanceof Error ? error.message : "An unknown error occurred."
        }`
      );
    }
  };

  // Get appointments by doctor email
  const getAppointmentsByDoctor = (doctorEmail: string) => {
    return appointments.filter((appointment) => appointment.doctorEmail === doctorEmail);
  };

  // Get appointments by patient email
  const getAppointmentsByPatient = (patientEmail: string) => {
    return appointments.filter((appointment) => appointment.patientEmail === patientEmail);
  };

  // Forward appointments from one doctor to another
  const forwardAppointments = async (oldDoctorEmail: string, newDoctorEmail: string) => {
    try {
      const batch = writeBatch(db); // Create a batch for bulk updates

      // Filter appointments for the old doctor
      const appointmentsToForward = appointments.filter(
        (appointment) => appointment.doctorEmail === oldDoctorEmail
      );

      // Update each appointment in the batch
      appointmentsToForward.forEach((appointment) => {
        const appointmentDoc = doc(db, "appointments", appointment.id);
        batch.update(appointmentDoc, {
          doctorEmail: newDoctorEmail,
          status: "pending", // Reset status to "pending" for the new doctor
        });
      });

      // Commit the batch
      await batch.commit();
    } catch (error) {
      throw new Error(
        `Error forwarding appointments: ${
          error instanceof Error ? error.message : "An unknown error occurred."
        }`
      );
    }
  };

  // Cancel all appointments for a specific doctor
  const cancelAllAppointments = async (doctorEmail: string) => {
    try {
      const batch = writeBatch(db); // Create a batch for bulk updates

      // Filter appointments for the doctor
      const appointmentsToCancel = appointments.filter(
        (appointment) => appointment.doctorEmail === doctorEmail
      );

      // Update each appointment in the batch
      appointmentsToCancel.forEach((appointment) => {
        const appointmentDoc = doc(db, "appointments", appointment.id);
        batch.update(appointmentDoc, {
          status: "canceled", // Set status to "canceled"
        });
      });

      // Commit the batch
      await batch.commit();
    } catch (error) {
      throw new Error(
        `Error canceling appointments: ${
          error instanceof Error ? error.message : "An unknown error occurred."
        }`
      );
    }
  };

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        getAppointmentsByDoctor,
        getAppointmentsByPatient,
        forwardAppointments,
        cancelAllAppointments,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

// Custom hook to use the context
export const useAppointmentsContext = () => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error("useAppointmentsContext must be used within an AppointmentsProvider");
  }
  return context;
};