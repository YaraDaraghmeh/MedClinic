import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Chart from "react-apexcharts";

interface UsersByRoleChartProps {
  doctors: number;
  patients: number;
}

const UsersByRoleChart: React.FC<UsersByRoleChartProps> = ({ doctors, patients }) => {
  const doughnutChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
      height: 350,
      toolbar: { show: false },
    },
    colors: ["#1976d2", "#4caf50"],
    labels: ["Doctors", "Patients"],
    legend: {
      position: "bottom",
      fontFamily: "'Poppins', sans-serif",
      labels: { colors: "#333" },
    },
    tooltip: { theme: "light" },
    dataLabels: { enabled: false },
  };

  const doughnutChartSeries: ApexNonAxisChartSeries = [doctors, patients];

  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Paper sx={{ padding: 2, backgroundColor: "#ffffff", borderRadius: 2, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", border: "1px solid #e0e0e0" }}>
        <Typography variant="h6" sx={{ marginBottom: 2, color: "#333", fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
          Users by Role
        </Typography>
        <Box sx={{ height: "350px" }}>
          <Chart options={doughnutChartOptions} series={doughnutChartSeries} type="donut" height="100%" />
        </Box>
      </Paper>
    </motion.div>
  );
};

export default UsersByRoleChart;
