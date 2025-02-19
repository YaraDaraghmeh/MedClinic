import React from "react";
import { Box } from "@mui/material";
import {
  People as PeopleIcon,
  MedicalServices as MedicalServicesIcon,
  Event as EventIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import MetricCard from "./MetricCard";

interface KeyMetricsProps {
  patients: number;
  doctors: number;
  appointments: number;
  averageRating: string;
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({ patients, doctors, appointments, averageRating }) => {
  const metrics = [
    {
      label: "Total Patients",
      value: patients,
      icon: <PeopleIcon sx={{ fontSize: 40, color: "#00796B" }} />,
      bgColor: "#E0F2F1", // Light teal
    },
    {
      label: "Total Doctors",
      value: doctors,
      icon: <MedicalServicesIcon sx={{ fontSize: 40, color: "#1565C0" }} />,
      bgColor: "#E3F2FD", // Light blue
    },
    {
      label: "Total Appointments",
      value: appointments,
      icon: <EventIcon sx={{ fontSize: 40, color: "#0288D1" }} />,
      bgColor: "#E1F5FE", // Light sky blue
    },
    {
      label: "Average Rating",
      value: averageRating,
      icon: <StarIcon sx={{ fontSize: 40, color: "#FF6F00" }} />,
      bgColor: "#FFF3E0", // Light orange
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 2,
        marginBottom: 3,
      }}
    >
      {metrics.map((metric, index) => (
        <Box
          key={index}
          sx={{
            flex: "1 1 calc(50% - 16px)", 
            marginBottom: 2, 
          }}
        >
          <MetricCard {...metric} />
        </Box>
      ))}
    </Box>
  );
};

export default KeyMetrics;
