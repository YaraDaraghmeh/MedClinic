import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Chart from "react-apexcharts";

interface AppointmentsOverTimeChartProps {
  data: number[];
}

const AppointmentsOverTimeChart: React.FC<AppointmentsOverTimeChartProps> = ({ data }) => {
  const lineChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#1976d2"],
    stroke: { curve: "smooth", width: 2 },
    markers: {
      size: 5,
      colors: ["#1976d2"],
      strokeColors: "#fff",
      strokeWidth: 2,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      labels: { style: { colors: "#666", fontFamily: "'Poppins', sans-serif" } },
    },
    yaxis: {
      labels: { style: { colors: "#666", fontFamily: "'Poppins', sans-serif" } },
    },
    tooltip: { theme: "light" },
    grid: { borderColor: "#f0f0f0" },
  };

  const lineChartSeries: ApexAxisChartSeries = [
    { name: "Appointments", data },
  ];

  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Paper sx={{ padding: 2, backgroundColor: "#ffffff", borderRadius: 2, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", border: "1px solid #e0e0e0" }}>
        <Typography variant="h6" sx={{ marginBottom: 2, color: "#333", fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
          Appointments Over Time
        </Typography>
        <Box sx={{ height: "350px" }}>
          <Chart options={lineChartOptions} series={lineChartSeries} type="line" height="100%" />
        </Box>
      </Paper>
    </motion.div>
  );
};

export default AppointmentsOverTimeChart;
