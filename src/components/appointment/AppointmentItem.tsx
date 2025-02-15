import React from "react";

interface AppointmentItemProps {
  appointment: {
    id: string;
    patientName: string;
    age: number;
    dateTime: string;
  };
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({ appointment }) => {
  return (
    <tr className="border-b">
      <td className="p-4 text-gray-700">{appointment.id}</td>
      <td className="p-4 flex items-center gap-3">
        <img
          src="https://via.placeholder.com/40"
          alt={appointment.patientName}
          className="w-10 h-10 rounded-full"
        />
        <span className="text-gray-700 font-medium">{appointment.patientName}</span>
      </td>
      <td className="p-4 text-gray-700">{appointment.age}</td>
      <td className="p-4 text-gray-700">{appointment.dateTime}</td>
      <td className="p-4">
        <button className="text-red-500 bg-red-100 hover:bg-red-200 p-2 rounded-full">
          ✖
        </button>
      </td>
    </tr>
  );
};

export default AppointmentItem;
