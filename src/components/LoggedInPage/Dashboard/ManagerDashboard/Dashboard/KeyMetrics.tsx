import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { motion } from "framer-motion";
import {
  People as PeopleIcon,
  MedicalServices as MedicalServicesIcon,
  Event as EventIcon,
  Star as StarIcon,
} from "@mui/icons-material";

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
      icon: <PeopleIcon sx={{ fontSize: 30, color: "#00796B" }} />,
      bgColor: "#E0F2F1", // Light teal
    },
    {
      label: "Total Doctors",
      value: doctors,
      icon: <MedicalServicesIcon sx={{ fontSize: 30, color: "#1565C0" }} />,
      bgColor: "#E3F2FD", // Light blue
    },
    {
      label: "Total Appointments",
      value: appointments,
      icon: <EventIcon sx={{ fontSize: 30, color: "#0288D1" }} />,
      bgColor: "#E1F5FE", // Light sky blue
    },
    {
      label: "Average Rating",
      value: averageRating,
      icon: <StarIcon sx={{ fontSize: 30, color: "#FF6F00" }} />,
      bgColor: "#FFF3E0", // Light orange
    },
  ];

  return (
    <Grid container spacing={2} sx={{ marginBottom: 3 }}>
      {metrics.map((metric, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Paper
              sx={{
                padding: 2,
                textAlign: "center",
                borderRadius: 2,
                backgroundColor: metric.bgColor,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease-in-out",
                minHeight: "120px", // Smaller card height
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box display="flex" justifyContent="center" mb={1}>
                {metric.icon}
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#333", mb: 0.5 }}>
                {metric.label}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#000" }}>
                {metric.value}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default KeyMetrics;