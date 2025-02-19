import React from "react";
import { Appointment } from "../../types/appointment.types";

interface AppointmentItemProps {
  appointment: Appointment;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({ appointment }) => {
  return (
    <tr>
      <td className="p-3">{appointment.id}</td>
      <td className="p-3">{appointment.patientEmail?.stringValue || "N/A"}</td>
      <td className="p-3">N/A</td> {/* Add logic for age if available */}
      <td className="p-3">
        {appointment.dateTime?.toLocaleDateString("en-GB") || "N/A"} at{" "}
        {appointment.dateTime?.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }) || "N/A"}
      </td>
      <td className="p-3">
        <button className="text-red-500 hover:text-red-700">Delete</button>
      </td>
    </tr>
  );
};

export default AppointmentItem;