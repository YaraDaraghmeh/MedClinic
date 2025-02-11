import { Appointment } from "../../Types";
import AppointmentItem from "./AppointmentItem";

interface AppointmentsListProps {
  appointments: Appointment[];
  handleStatusChange: (id: string, newStatus: string) => void;
  handleNoteSave: (id: string, note: string) => void;
}

export default function AppointmentsList({
  appointments,
  handleStatusChange,
  handleNoteSave,
}: AppointmentsListProps) {
  return (
    <div className="space-y-4">
      {appointments.map((appt) => (
        <AppointmentItem
          key={appt.id}
          appt={appt}
          handleStatusChange={handleStatusChange}
          handleNoteSave={handleNoteSave}
        />
      ))}
    </div>
  );
}