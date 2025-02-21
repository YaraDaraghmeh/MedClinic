import moment from "moment";
import { Appointment } from "../Types";

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
export const getCompletedAppointmentsForDoctor = (
  appointments: Appointment[],
  doctorEmail: string
): Appointment[] => {
  return appointments.filter(
    (appointment) =>
      appointment.doctorEmail === doctorEmail && appointment.status === "completed"
  );
};
// Check if a specific time is taken for a doctor
export const isAppointmentTimeTakenForDoctor = (
  appointments: Appointment[],
  doctorEmail: string,
  selectedDate: Date,
  selectedTime: string
): boolean => {
  const formattedSelectedDate = formatDate(selectedDate);

  return appointments.some((appointment) => {
    const appointmentDate = appointment.appointmentDate;
    const appointmentTime = appointment.appointmentTime;

    return (
      appointment.doctorEmail === doctorEmail &&
      appointmentDate === formattedSelectedDate &&
      appointmentTime === selectedTime
    );
  });
};

// Get appointments for a doctor on the current day
export const getAppointmentsForDoctorToday = (
  appointments: Appointment[],
  doctorEmail: string
): Appointment[] => {
  // Get today's date in DD-MM-YYYY format
  const today = moment().format('DD-MM-YYYY');

  // Filter appointments
  const appointmentsToday = appointments.filter((appointment) => {
    return (
      appointment.doctorEmail === doctorEmail &&
      appointment.appointmentDate === today &&
      appointment.status !== 'canceled'
    );
  });

  // Sort by time (handling AM/PM properly)
  return appointmentsToday.sort((a, b) => {
    const convertTimeToMinutes = (time: string) => {
      const [timePart, period] = time.split(' ');
      const [hours, minutes] = timePart.split(':').map(Number);
      let totalMinutes = hours * 60 + minutes;
      if (period === 'PM' && hours !== 12) totalMinutes += 720;
      if (period === 'AM' && hours === 12) totalMinutes -= 720;
      return totalMinutes;
    };

    return convertTimeToMinutes(a.appointmentTime) - convertTimeToMinutes(b.appointmentTime);
  });
};
// Filter future appointments for a doctor
export const getFutureAppointmentsForDoctor = (
  appointments: Appointment[],
  doctorEmail: string
): Appointment[] => {
  const now = new Date();
  const today = formatDate(now);
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  return appointments.filter((appointment) => {
    const appointmentDate = appointment.appointmentDate;
    const appointmentTime = appointment.appointmentTime;

    return (
      appointment.doctorEmail === doctorEmail &&
      (appointmentDate > today ||
        (appointmentDate === today && appointmentTime > currentTime))
    );
  });
};

// Filter appointments by patient email
export const getAppointmentsByPatient = (
  appointments: Appointment[],
  patientEmail: string
): Appointment[] => {
  return appointments.filter(
    (appointment) => appointment.patientEmail === patientEmail
  );
};

// Filter appointments by doctor email
export const getAppointmentsByDoctor = (
  appointments: Appointment[],
  doctorEmail: string
): Appointment[] => {
  return appointments.filter(
    (appointment) => appointment.doctorEmail === doctorEmail
  );
};