import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { getAppointments } from "../../../../../services/appointmentService";
import AppointmentsOverTimeChart from "./AppointmentsOverTimeChart";
import UsersByRoleChart from "./UsersByRoleChart";

interface ChartsProps {
  doctors: number;
  patients: number;
}

const Charts: React.FC<ChartsProps> = ({ doctors, patients }) => {
  const [appointments, setAppointments] = useState<any[]>([]);

  // Fetch appointments data on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Process appointments data for the line chart
  const processAppointmentsData = () => {
    const monthlyAppointments = [0, 0, 0, 0, 0, 0, 0];

    appointments.forEach((appointment) => {
      const date = appointment.appointmentDate?.stringValue;
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
