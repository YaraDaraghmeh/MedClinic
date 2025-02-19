import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Chart from "react-apexcharts";
import { useAppointmentsContext } from "../../../../../hooks/AppointmentContext";

const AppointmentsOverTimeChart: React.FC = () => {
  const { appointments } = useAppointmentsContext();

  // Function to process appointments data
  const processAppointmentsData = () => {
    const yearlyData: { [year: string]: number[] } = {}; // Store data for each year
  
    appointments.forEach((appointment) => {
      const date = appointment.appointmentDate;
      if (date) {
        const [day, month, year] = date.split("-"); // Split date (dd-mm-yyyy)
        const numericMonth = parseInt(month, 10) - 1; // Convert month to zero-based index
  
        if (!yearlyData[year]) {
          yearlyData[year] = Array(12).fill(0); // Initialize array for 12 months
        }
        yearlyData[year][numericMonth]++; // Increment count for that month
      }
    });
  
    return yearlyData;
  };
  

  // Process the data
  const yearlyAppointments = processAppointmentsData();
  const years = Object.keys(yearlyAppointments).sort(); // Get all years sorted

  // Convert yearly data to series format for ApexCharts
  const lineChartSeries = years.map((year) => ({
    name: `Appointments ${year}`,
    data: yearlyAppointments[year], // Data for each month
  }));

  // ApexCharts options
  const lineChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#1976d2", "#ff5722", "#4caf50", "#ff9800", "#9c27b0"], // Different colors for years
    stroke: { curve: "smooth", width: 2 },
    markers: {
      size: 5,
      strokeColors: "#fff",
      strokeWidth: 2,
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      labels: { style: { colors: "#666", fontFamily: "'Poppins', sans-serif" } },
    },
    yaxis: {
      labels: { style: { colors: "#666", fontFamily: "'Poppins', sans-serif" } },
    },
    tooltip: {
      theme: "light",
      shared: true, // Show all year values on hover
      y: {
        formatter: function (value, { seriesIndex }) {
          const year = years[seriesIndex]; // Get corresponding year
          return `${year}: ${value} appointments`;
        },
      },
    },
    grid: { borderColor: "#f0f0f0" },
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 600 }}>
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
