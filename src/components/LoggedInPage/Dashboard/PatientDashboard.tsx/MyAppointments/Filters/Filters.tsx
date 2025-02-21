
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Filters.css';
interface FiltersProps {
  filterDate: Date | null;
  handleDateChange: (date: Date | null) => void;
  filterDoctor: string;
  setFilterDoctor: (value: string) => void;
  filterNoteStatus: string;
  setFilterNoteStatus: (value: string) => void;
  doctors: string[];
  isFiltersChanged: boolean;
  resetFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  filterDate,
  handleDateChange,
  filterDoctor,
  setFilterDoctor,
  filterNoteStatus,
  setFilterNoteStatus,
  doctors,
  isFiltersChanged,
  resetFilters,
}) => {
  return (
    <div className="filters">
      <DatePicker
        selected={filterDate}
        onChange={handleDateChange}
        dateFormat="dd-MM-yyyy"
        className="filter-input"
        placeholderText="Filter by date"
      />

      <select
        value={filterDoctor}
        onChange={(e) => setFilterDoctor(e.target.value)}
        className="filter-input"
      >
        <option value="">All Doctors</option>
        {doctors.map((doctor) => (
          <option key={doctor} value={doctor}>
            {doctor}
          </option>
        ))}
      </select>

      <select
        value={filterNoteStatus}
        onChange={(e) => setFilterNoteStatus(e.target.value)}
        className="filter-input"
      >
        <option value="all">All Appointments</option>
        <option value="hasNote">Has Note</option>
        <option value="read">Read Notes</option>
        <option value="unread">Unread Notes</option>
      </select>

      {isFiltersChanged && (
        <button onClick={resetFilters} className="reset-filters-button">
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default Filters;