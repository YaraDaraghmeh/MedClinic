import React, { useEffect, useState } from "react";
import { getAppointments } from "../services/appointmentService";
import AppointmentItem from "./AppointmentItem";

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAppointments();
      setAppointments(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-xl font-bold p-4 border-b">All Appointments</h2>
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left text-gray-600">#</th>
              <th className="p-3 text-left text-gray-600">Patient</th>
              <th className="p-3 text-left text-gray-600">Age</th>
              <th className="p-3 text-left text-gray-600">Date & Time</th>
              <th className="p-3 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <AppointmentItem key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-6 text-gray-500">
                  No appointments available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;
