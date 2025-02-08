import axiosInstance from "../database/axiosInstance";
import { Appointment } from "../Types";

// Define the collection path for appointments
const COLLECTION_PATH = "/appointments";

// Helper function to format date to dd-mm-yyyy
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};


// Method to create a new appointment
export const createAppointment = async (appointmentData: {
  doctorEmail: string;
  patientEmail: string;
  appointmentDate: Date; // Date object
  appointmentTime: string; // Time in HH:MM format
  reason: string;
  status: "pending" | "confirmed" | "completed" | "canceled"; // initial status
}) => {
  try {
    // Format the date and time
    const formattedDate = formatDate(appointmentData.appointmentDate);
    const formattedTime = appointmentData.appointmentTime; // Ensure the time is between 09:00 - 17:00

    // Validate the time range (9 AM - 5 PM)
    const [hour, minute] = formattedTime.split(":").map(Number);
    if (hour < 9 || hour > 17 || (hour === 17 && minute > 0)) {
      throw new Error("Appointment time must be between 9:00 AM and 5:00 PM.");
    }

    // Prepare the appointment ID
    const appointmentId = `${appointmentData.doctorEmail}-${appointmentData.patientEmail}-${formattedDate}-${formattedTime}`;
    
    // Prepare appointment data to send to the database
    const fields = {
      doctorEmail: { stringValue: appointmentData.doctorEmail },
      patientEmail: { stringValue: appointmentData.patientEmail },
      appointmentDate: { stringValue: formattedDate },
      appointmentTime: { stringValue: formattedTime },
      reason: { stringValue: appointmentData.reason },
      status: { stringValue: appointmentData.status },
    };

    // Send a request to add the new appointment
    const response = await axiosInstance.patch(`/appointments/${appointmentId}`, { fields });
    return response.data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

// Method to get all appointments
export const getAppointments = async () => {
  try {
    const response = await axiosInstance.get(COLLECTION_PATH);
    return response.data.documents.map((doc: any) => ({
      id: doc.name.split("/").pop(),
      ...doc.fields,
    }));
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};



// Method to delete an appointment by ID
export const deleteAppointment = async (appointmentId: string) => {
  try {
    await axiosInstance.delete(`/appointments/${appointmentId}`);
    return { success: true, message: `Appointment ${appointmentId} deleted successfully` };
  } catch (error) {
    console.error(`Error deleting appointment with ID ${appointmentId}:`, error);
    throw error;
  }
};

// Method to get all appointments by doctor email
export const getAppointmentsByDoctor = async (doctorEmail: string) => {
  try {
    const appointments = await getAppointments();
    return appointments.filter((appointment: Appointment) => appointment.doctorEmail?.stringValue === doctorEmail);
  } catch (error) {
    console.error(`Error fetching appointments for doctor ${doctorEmail}:`, error);
    throw error;
  }
};

// Method to get all appointments by patient email
export const getAppointmentsByPatient = async (patientEmail: string) => {
  try {
    const appointments = await getAppointments();
    return appointments.filter((appointment: Appointment) => appointment.patientEmail?.stringValue === patientEmail);
  } catch (error) {
    console.error(`Error fetching appointments for patient ${patientEmail}:`, error);
    throw error;
  }
};
// Method to check if a specific date and time are already taken for a doctor
export const isAppointmentTimeTakenForDoctor = async (doctorEmail: string, selectedDate: Date, selectedTime: string) => {
    try {
      const formattedSelectedDate = formatDate(selectedDate); // Format the selected date (dd-mm-yyyy)
      
      // Fetch all appointments for the doctor
      const appointments = await getAppointmentsByDoctor(doctorEmail);
      
      // Check if any appointment exists for the same date and time
      const isTaken = appointments.some((appointment: Appointment) => {
        const appointmentDate = appointment.appointmentDate?.stringValue;
        const appointmentTime = appointment.appointmentTime?.stringValue;
        
        return appointmentDate === formattedSelectedDate && appointmentTime === selectedTime;
      });
      
      return isTaken;
    } catch (error) {
      console.error(`Error checking if the appointment time is taken for doctor ${doctorEmail}:`, error);
      throw error;
    }
  };
  
// Method to get all appointments for a doctor today, sorted by time
export const getAppointmentsForDoctorToday = async (doctorEmail: string) => {
    try {
      const today = new Date();
      const formattedToday = formatDate(today); // Using the formatDate helper function to get today's date in dd-mm-yyyy format
      
      // Fetch all appointments for the doctor
      const appointments = await getAppointmentsByDoctor(doctorEmail);
      
      // Filter appointments for today
      const appointmentsToday = appointments.filter((appointment: Appointment) => {
        const appointmentDate = appointment.appointmentDate?.stringValue; // Assuming the date is stored in appointmentDate field
        return appointmentDate === formattedToday;
      });
      
      // Sort appointments by time
      const sortedAppointments = appointmentsToday.sort((a: Appointment, b: Appointment) => {
        const timeA = a.appointmentTime?.stringValue;
        const timeB = b.appointmentTime?.stringValue;
        
        // Compare the time values
        if (timeA && timeB) {
          return timeA.localeCompare(timeB);
        }
        return 0; // If no valid time, don't change the order
      });
      
      return sortedAppointments;
    } catch (error) {
      console.error(`Error fetching appointments for doctor ${doctorEmail} today:`, error);
      throw error;
    }
  };
  