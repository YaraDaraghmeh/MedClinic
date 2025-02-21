import React from "react";
import "./Filters.css";

interface FiltersProps {
  selectedSpecialization: string;
  onSpecializationChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  specializations: string[];
}

const Filters: React.FC<FiltersProps> = ({
  selectedSpecialization,
  onSpecializationChange,
  specializations,
}) => {
  return (
    <div className="filter-container">
      <select
        value={selectedSpecialization}
        onChange={onSpecializationChange}
        className="specialization-filter"
      >
        <option value="">All Specializations</option>
        {specializations.map((spec) => (
          <option key={spec} value={spec}>
            {spec}
          </option>
        ))}
      </select>

     
    </div>
  );
};

export default Filters;