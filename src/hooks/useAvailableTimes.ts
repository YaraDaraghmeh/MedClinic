import { useEffect, useState } from "react";
import { Appointment } from "../Types";

interface UseAvailableTimesProps {
  date: string;
  doctorEmail: string;
  patientEmail: string; // Add patientEmail to props
  appointments: Appointment[];
}

const useAvailableTimes = ({ date, doctorEmail, patientEmail, appointments }: UseAvailableTimesProps) => {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    if (date && doctorEmail && patientEmail) {
      const times: string[] = [];

      // Add times from 9 AM to 5 PM
      for (let hour = 9; hour < 17; hour++) {
        times.push(`${hour.toString().padStart(2, "0")}:00`);
      }

      // Check if the selected date is today's date
      const today = new Date();
      const [day, month, year] = date.split("-");
      const selectedDate = new Date(`${year}-${month}-${day}`);

      // Set the time to 00:00 to compare only the date part
      today.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);

      // If today's date, filter times based on the current hour
      if (selectedDate.getTime() === today.getTime()) {
        const currentHour = today.getHours(); // Get the current hour

        // Only include times after the current hour
        times.filter((time) => {
          const hour = parseInt(time.split(":")[0]);
          return hour > currentHour;
        });
      }

      // Filter out booked times for the doctor
      const doctorBookedTimes = appointments
        .filter((app) => {
          if (!app.appointmentDate) return false; // Skip if appointmentDate is undefined
          return app.doctorEmail === doctorEmail && app.appointmentDate === date;
        })
        .map((app) => app.appointmentTime);

      // Filter out times where the patient already has an appointment on that day
      const patientBookedTimes = appointments
        .filter((app) => {
          if (!app.appointmentDate) return false; // Skip if appointmentDate is undefined
          return app.patientEmail === patientEmail && app.appointmentDate === date;
        })
        .map((app) => app.appointmentTime);

      // Combine booked times (doctor and patient)
      const allBookedTimes = [...doctorBookedTimes, ...patientBookedTimes];

      // Get available times by filtering out booked times
      const available = times.filter((time) => !allBookedTimes.includes(time));
      setAvailableTimes(available);
    }
  }, [date, doctorEmail, patientEmail, appointments]);

  return availableTimes;
};

export default useAvailableTimes;