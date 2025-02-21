// src/components/MyAppointments/AppointmentsList/AppointmentsList.tsx
import React from "react";
import { Appointment } from "../../../../../../Types";
import './AppoitmentsList.css'

interface AppointmentsListProps {
  currentAppointments: Appointment[];
  handleViewNote: (appointment: Appointment) => void;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({
  currentAppointments,
  handleViewNote,
}) => {
  return (
    <ul className="appointments-list">
      {currentAppointments.map((appointment) => (
        <li key={appointment.id} className="appointment-item">
          <div className="appointment-details">
            <div>
              <strong>Doctor:</strong> {appointment.doctorEmail}
            </div>
            <div>
              <strong>Date:</strong> {appointment.appointmentDate}
            </div>
            <div>
              <strong>Time:</strong> {appointment.appointmentTime}
            </div>
            <div>
              <strong>Status:</strong>{" "}
              <span className={`status ${appointment.status}`}>
                {appointment.status}
              </span>
            </div>
            <div>
              <strong>Reason:</strong> {appointment.reason}
            </div>
          </div>
          {appointment.note && (
            <button
              onClick={() => handleViewNote(appointment)}
              className={`view-note-button ${
                appointment.readNote ? "" : "unread-note"
              }`}
            >
              View Note
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default AppointmentsList;