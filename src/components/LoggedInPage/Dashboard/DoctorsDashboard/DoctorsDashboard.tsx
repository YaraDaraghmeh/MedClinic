import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import StatisticsCards from "../DoctorsDashboard/StaticsCards";
import PieChartComponent from "./PieChartComponent";
import LineChartComponent from "./BarChartComponent";
import TodaysAppointments from "./TodaysAppointments";
import { useAppointmentsContext } from "../../../../hooks/AppointmentContext";
import { Appointment, User } from "../../../../Types";

type ChartData = {
  day: string;
  appointments: number;
}[];

type StatusData = {
  name: string;
  value: number;
}[];

const DoctorDashboard: React.FC = () => {
  const [appointmentData, setAppointmentData] = useState<ChartData>([]);
  const [statusData, setStatusData] = useState<StatusData>([]);
  const [user, setUser] = useState<User | null>(null);
  const { appointments } = useAppointmentsContext();

  useEffect(() => {
    // Fetch user from session storage
    const userFromSession = sessionStorage.getItem("user");
    if (userFromSession) {
      const parsedUser = JSON.parse(userFromSession);
      setUser(parsedUser);
    } else {
      console.error("⚠️ User not found in session storage");
      return;
    }

    if (appointments.length === 0) {
      console.warn("⚠️ No appointments available, skipping processing...");
      return;
    }

    try {
      // Process and set appointment data
      const processedAppointmentsPerDay =
        processAppointmentsPerDay(appointments);
      const processedAppointmentStatus = processAppointmentStatus(appointments);

      setAppointmentData(processedAppointmentsPerDay);
      setStatusData(processedAppointmentStatus);
    } catch (error) {
      setAppointmentData([]);
      setStatusData([]);
    }
  }, [appointments]);



  const processAppointmentsPerDay = (appointments: Appointment[]): ChartData => {
    const groupedData: Record<string, number> = {};
  
    appointments.forEach((appointment) => {
      const rawDate = appointment.appointmentDate;
      if (rawDate) {
        const formattedDate = rawDate.slice(0, 5); // Extract "DD-MM"
        groupedData[formattedDate] = (groupedData[formattedDate] || 0) + 1;
      } else {
        console.warn("⚠️ Missing appointmentDate for:", appointment);
      }
    });
  
    return Object.entries(groupedData)
      .map(([day, count]) => ({
        day,
        appointments: count,
      }))
      .sort((a, b) => {
        const [monthA, dayA] = a.day.split("-").map(Number);
        const [monthB, dayB] = b.day.split("-").map(Number);
        return monthA !== monthB ? monthA - monthB : dayA - dayB;
      });
  };
  
  const processAppointmentStatus = (
    appointments: Appointment[]
  ): StatusData => {
    const statusCounts: Record<string, number> = {
      pending: 0,
      confirmed: 0,
      completed: 0,
      canceled:0,
    };

    appointments.forEach((appointment) => {
      const status = appointment.status?.toLowerCase();
      if (status && statusCounts.hasOwnProperty(status)) {
        statusCounts[status]++;
      } else {
        console.warn("⚠️ Unknown status in appointment:", appointment);
      }
    });

    return Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <StatisticsCards
        total={appointmentData.reduce((sum, day) => sum + day.appointments, 0)}
        pending={statusData.find((s) => s.name === "pending")?.value || 0}
        confirmed={statusData.find((s) => s.name === "confirmed")?.value || 0}
      />

      <Box sx={{ display: "flex", gap: "20px", mt: 4, flexDirection: "row" }}>
        <Box sx={{ flex: 1 }}>
          <LineChartComponent data={appointmentData} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <PieChartComponent
            data={statusData}
            colors={["#4A90E2", "#50E3C2", "#2D68C4", "#1B3A87"]} 
            />
        </Box>
      </Box>

      {/* Add TodaysAppointments component */}
      <Box sx={{ mt: 4 }}>
        <TodaysAppointments />
      </Box>
    </Box>
  );
};

export default DoctorDashboard;