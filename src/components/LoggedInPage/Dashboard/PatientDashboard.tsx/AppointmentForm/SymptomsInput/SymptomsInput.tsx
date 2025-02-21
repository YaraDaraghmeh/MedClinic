import React from "react";
import "./SymptomsInput.css";

interface SymptomsInputProps {
  symptoms: string;
  onSymptomsChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const SymptomsInput: React.FC<SymptomsInputProps> = ({ symptoms, onSymptomsChange }) => {
  return (
    <div className="form-group">
      <label>Symptoms Description</label>
      <textarea
        name="symptoms"
        rows={3}
        value={symptoms}
        onChange={onSymptomsChange}
        required
      />
    </div>
  );
};

export default SymptomsInput;