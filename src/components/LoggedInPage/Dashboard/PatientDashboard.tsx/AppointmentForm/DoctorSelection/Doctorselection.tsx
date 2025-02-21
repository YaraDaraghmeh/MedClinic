import React from "react";
import "./DoctorSelection.css";
import { User } from "../../../../../../Types";

interface DoctorSelectionProps {
  doctors: User[];
  doctorEmail: string;
  onDoctorChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
disabled:boolean;
}

const DoctorSelection: React.FC<DoctorSelectionProps> = ({ doctors, doctorEmail, onDoctorChange,disabled }) => {
  return (
    <div className="form-group">
      <label>Select Doctor</label>
      <select name="doctorEmail" value={doctorEmail} onChange={onDoctorChange} required disabled={disabled}>
        <option value="">Select a doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor.email} value={doctor.email}>
            <img src={doctor.imageUrl} alt={doctor.name} className="doctor-image" />
            {doctor.name} - {doctor.specialization}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DoctorSelection;