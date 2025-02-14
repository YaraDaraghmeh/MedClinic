import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Appointment {
  id: string;
  doctorEmail: string;
  appointmentDate: string;
  appointmentTime: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
}

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // بيانات تجريبية إلى حين ربطها بقاعدة البيانات
    const mockAppointments: Appointment[] = [
      {
        id: "1",
        doctorEmail: "doctor1@example.com",
        appointmentDate: "14-02-2025",
        appointmentTime: "10:00",
        status: "confirmed",
      },
      {
        id: "2",
        doctorEmail: "doctor2@example.com",
        appointmentDate: "15-02-2025",
        appointmentTime: "12:30",
        status: "pending",
      },
      {
        id: "3",
        doctorEmail: "doctor1@example.com",
        appointmentDate: "14-02-2025",
        appointmentTime: "10:00",
        status: "canceled",
      },
    ];
    setAppointments(mockAppointments);
    setLoading(false);
  }, []);

  return (

    
    <div className="appointments-container">
      <h2>My Appointments</h2>
      {loading ? (
        <p>Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="appointments-list">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <p className="doc">Doctor: {appointment.doctorEmail}</p>
              <p className="date">Date: {appointment.appointmentDate}</p>
              <p className="date">Time: {appointment.appointmentTime}</p>
              <p className={`status ${appointment.status}`}>Status: {appointment.status}</p>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => navigate("/")} className="back-btn">Back to Home</button>
    </div>
  );
};

export default AppointmentsPage;
