import React from "react";
import "./DatePicker.css";

interface DatePickerProps {
  date: string;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ date, onDateChange, disabled }) => {
  return (
    <div className="form-group">
      <label>Appointment Date</label>
      <input
        type="date"
        name="date"
        value={date}
        onChange={onDateChange}
        required
        min={new Date().toISOString().split("T")[0]}
        disabled={disabled}
      />
    </div>
  );
};

export default DatePicker;