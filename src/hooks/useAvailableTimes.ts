import { useEffect, useState } from "react";
import { Appointment } from "../Types";


interface UseAvailableTimesProps {
  date: string;
  doctorEmail: string;
  appointments: Appointment[];
}

const useAvailableTimes = ({ date, doctorEmail, appointments }: UseAvailableTimesProps) => {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    if (date && doctorEmail) {
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

      // Filter out booked times
      const bookedTimes = appointments
        .filter((app) => {
          if (!app.appointmentDate) return false; // Skip if appointmentDate is undefined
          return app.doctorEmail === doctorEmail && app.appointmentDate === date;
        })
        .map((app) => app.appointmentTime);

      const available = times.filter((time) => !bookedTimes.includes(time));
      setAvailableTimes(available);
    }
  }, [date, doctorEmail, appointments]);

  return availableTimes;
};

export default useAvailableTimes;