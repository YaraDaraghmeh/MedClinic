import React from "react";
import "./TimeSlots.css";

interface TimeSlotsProps {
  availableTimes: string[];
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

const TimeSlots: React.FC<TimeSlotsProps> = ({ availableTimes, selectedTime, onTimeSelect }) => {
  return (
    <div className="form-group">
      <label>Appointment Time</label>
      {availableTimes.length > 0 ? (
        <div className="time-slots">
          {availableTimes.map((time) => (
            <button
              key={time}
              type="button"
              className={`time-slot ${selectedTime === time ? "selected" : ""}`}
              onClick={() => onTimeSelect(time)}
            >
              {time}
            </button>
          ))}
        </div>
      ) : (
        <p className="full-day-message">This day is fully booked.</p>
      )}
    </div>
  );
};

export default TimeSlots;