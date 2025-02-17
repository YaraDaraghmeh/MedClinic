import axiosInstance from "../database/axiosInstance";
import { Appointment } from "../Types";

const COLLECTION_PATH = "/appointments";

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const createAppointment = async (appointmentData: {
  doctorEmail: string;
  patientEmail: string;
  appointmentDate: Date;
  appointmentTime: string;
  reason: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
}) => {
  try {
    const formattedDate = formatDate(appointmentData.appointmentDate);
    const formattedTime = appointmentData.appointmentTime;

    const [hour, minute] = formattedTime.split(":").map(Number);
    if (hour < 9 || hour > 17 || (hour === 17 && minute > 0)) {
      throw new Error("Appointment time must be between 9:00 AM and 5:00 PM.");
    }

    const appointmentId = `${appointmentData.doctorEmail}-${appointmentData.patientEmail}-${formattedDate}-${formattedTime}`;

    const fields = {
      doctorEmail: { stringValue: appointmentData.doctorEmail },
      patientEmail: { stringValue: appointmentData.patientEmail },
      appointmentDate: { stringValue: formattedDate },
      appointmentTime: { stringValue: formattedTime },
      reason: { stringValue: appointmentData.reason },
      status: { stringValue: appointmentData.status },
    };

    const response = await axiosInstance.patch(`/appointments/${appointmentId}`, { fields });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAppointments = async () => {
  try {
    const response = await axiosInstance.get(COLLECTION_PATH);
    return response.data.documents.map((doc: any) => ({
      id: doc.name.split("/").pop(),
      ...doc.fields,
    }));
  } catch (error) {
    throw error;
  }
};

export const deleteAppointment = async (appointmentId: string) => {
  try {
    await axiosInstance.delete(`/appointments/${appointmentId}`);
    return { success: true, message: `Appointment ${appointmentId} deleted successfully` };
  } catch (error) {
    throw error;
  }
};

export const getAppointmentsByDoctor = async (doctorEmail: string) => {
  try {
    const appointments = await getAppointments();
    return appointments.filter((appointment: Appointment) =>
      appointment.doctorEmail?.stringValue?.toLowerCase() === doctorEmail.toLowerCase()
    );
  } catch (error) {
    throw error;
  }
};

export const getAppointmentsByPatient = async (patientEmail: string) => {
  try {
    const appointments = await getAppointments();
    return appointments.filter((appointment: Appointment) => appointment.patientEmail?.stringValue === patientEmail);
  } catch (error) {
    throw error;
  }
};

export const isAppointmentTimeTakenForDoctor = async (doctorEmail: string, selectedDate: Date, selectedTime: string) => {
  try {
    const formattedSelectedDate = formatDate(selectedDate);
    const appointments = await getAppointmentsByDoctor(doctorEmail);

    const isTaken = appointments.some((appointment: Appointment) => {
      const appointmentDate = appointment.appointmentDate?.stringValue;
      const appointmentTime = appointment.appointmentTime?.stringValue;

      return appointmentDate === formattedSelectedDate && appointmentTime === selectedTime;
    });

    return isTaken;
  } catch (error) {
    throw error;
  }
};

export const getAppointmentsForDoctorToday = async (doctorEmail: string) => {
  try {
    const today = new Date();
    const formattedToday = formatDate(today);

    const appointments = await getAppointmentsByDoctor(doctorEmail);

    const appointmentsToday = appointments.filter((appointment: Appointment) => {
      const appointmentDate = appointment.appointmentDate?.stringValue;
      return appointmentDate === formattedToday;
    });

    const sortedAppointments = appointmentsToday.sort((a: Appointment, b: Appointment) => {
      const timeA = a.appointmentTime?.stringValue;
      const timeB = b.appointmentTime?.stringValue;

      if (timeA && timeB) {
        return timeA.localeCompare(timeB);
      }
      return 0;
    });

    return sortedAppointments;
  } catch (error) {
    throw error;
  }
};
