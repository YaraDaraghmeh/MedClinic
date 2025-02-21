import React from "react";
import "./DoctorModal.css";
import { User } from "../../../../../../Types";

interface DoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: User | null;
  completedAppointments: number;
}

const DoctorModal: React.FC<DoctorModalProps> = ({ isOpen, onClose, doctor, completedAppointments }) => {
  if (!isOpen || !doctor) return null;

  return (
    <div className="doctor-modal-overlay">
      <div className="doctor-modal-container">
        <div className="doctor-modal-header">
          <img
            src={doctor.imageUrl || "/default-doctor.png"}
            alt={doctor.name}
            className="doctor-modal-image"
          />
          <div className="doctor-modal-info">
            <h2>Dr. {doctor.name}</h2>
            <p><strong>Specialization:</strong> {doctor.specialization || "General Practitioner"}</p>
            <p><strong>Email:</strong> {doctor.email}</p>
            <p><strong>Gender:</strong> {doctor.gender}</p>
            <p><strong>Date of Birth:</strong> {doctor.dateOfBirth}</p>
          </div>
        </div>
        <div className="doctor-modal-completed-appointments">
          <p><strong>Completed Appointments:</strong> {completedAppointments}</p>
        </div>

        <a
          href={`/make-appointment?email=${doctor.email}`}
          className="doctor-modal-book-now-btn"
        >
          Book Now
        </a>
        <button onClick={onClose} className="doctor-modal-close-btn">
          Close
        </button>
      </div>
    </div>
  );
};

export default DoctorModal;