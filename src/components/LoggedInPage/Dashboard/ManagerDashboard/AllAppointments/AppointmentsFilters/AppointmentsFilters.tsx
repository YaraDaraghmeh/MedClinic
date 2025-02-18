import React from "react";
import { TextField, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";

interface AppointmentsFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  doctorFilter: string;
  setDoctorFilter: (value: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
  doctors: any[];
}

const AppointmentsFilters: React.FC<AppointmentsFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  doctorFilter,
  setDoctorFilter,
  sortOrder,
  setSortOrder,
  doctors,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
      <TextField
        fullWidth
        label="Search by patient, doctor, or reason..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
        InputProps={{
          style: {
            borderRadius: "8px",
          },
        }}
      />

      <FormControl variant="outlined" sx={{ minWidth: 150 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as string)}
          label="Status"
          sx={{ borderRadius: "8px" }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="confirmed">Confirmed</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="canceled">Canceled</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ minWidth: 150 }}>
        <InputLabel>Doctor</InputLabel>
        <Select
          value={doctorFilter}
          onChange={(e) => setDoctorFilter(e.target.value as string)}
          label="Doctor"
          sx={{ borderRadius: "8px" }}
        >
          <MenuItem value="all">All Doctors</MenuItem>
          {doctors.map((doctor,index) => (
            <MenuItem key={index} value={doctor.email?.stringValue}>
              {doctor.name?.stringValue}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ minWidth: 150 }}>
        <InputLabel>Sort by Date</InputLabel>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          label="Sort by Date"
          sx={{ borderRadius: "8px" }}
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default AppointmentsFilters;