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
    const monthlyAppointments = [0, 0, 0, 0, 0, 0, 0];

    appointments.forEach((appointment) => {
      const date = appointment.appointmentDate;
      if (date) {
        const month = parseInt(date.split("-")[1], 10) - 1;
        if (month >= 0 && month < 7) {
          monthlyAppointments[month]++; // Increment count for the month
        }
      }
    });

    return monthlyAppointments;
  };

  return (
    <Grid container spacing={3} sx={{ marginBottom: 3 }}>
      <Grid item xs={12} md={6}>
        <AppointmentsOverTimeChart data={processAppointmentsData()} />
      </Grid>
      <Grid item xs={12} md={6}>
        <UsersByRoleChart doctors={doctors} patients={patients} />
      </Grid>
    </Grid>
  );
};

export default Charts;
