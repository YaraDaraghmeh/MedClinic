import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import AppointmentsOverTimeChart from "./AppointmentsOverTimeChart";
import UsersByRoleChart from "./UsersByRoleChart";
import { useAppointmentsContext } from "../../../../../hooks/AppointmentContext";

interface ChartsProps {
  doctors: number;
  patients: number;
}

const Charts: React.FC<ChartsProps> = ({ doctors, patients }) => {
 const {appointments}= useAppointmentsContext();
  
  // Process appointments data for the line chart
  const processAppointmentsData = () => {
    const yearlyData: { [year: string]: number[] } = {}; // Store data for each year
  
    appointments.forEach((appointment) => {
      const date = appointment.appointmentDate;
      if (date) {
        const parsedDate = new Date(date);
        const year = parsedDate.getFullYear(); // Extract year
        const month = parsedDate.getMonth(); // Extract month (0-11)
  
        if (!yearlyData[year]) {
          yearlyData[year] = Array(12).fill(0); // Initialize with 12 months
        }
        yearlyData[year][month]++; // Increment count for that month
      }
    });
  
    return yearlyData;
  };
  

  return (
    <Grid container spacing={3} sx={{ marginBottom: 3 }}>
      <Grid item xs={12} md={6}>
        <AppointmentsOverTimeChart />
      </Grid>
      <Grid item xs={12} md={6}>
        <UsersByRoleChart doctors={doctors} patients={patients} />
      </Grid>
    </Grid>
  );
};

export default Charts;
