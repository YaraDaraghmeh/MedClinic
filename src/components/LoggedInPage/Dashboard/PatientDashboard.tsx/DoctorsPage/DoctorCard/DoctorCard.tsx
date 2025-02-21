import React from "react";
import "./DoctorCard.css";
import { User } from "../../../../../../Types";

interface DoctorCardProps {
  doctor: User;
  onClick: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onClick }) => {
  return (
    <div className="doctor-card" onClick={onClick}>
      <img
        src={doctor.imageUrl || "/default-doctor.png"}
        alt={doctor.name}
        className="doctor-image"
      />
      <div className="doctor-info">
        <p className="specialization">{doctor.specialization || "General Practitioner"}</p>
        <h2>Dr. {doctor.name}</h2>
        <p className="email">{doctor.email}</p>
      </div>
    </div>
  );
};

export default DoctorCard;