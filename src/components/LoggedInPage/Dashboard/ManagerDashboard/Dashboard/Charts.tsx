import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { motion } from "framer-motion";
import Chart from "react-apexcharts";
import { getAppointments } from "../../../../../services/appointmentService";
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

  // Line Chart Options
  const lineChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#1976d2"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 5,
      colors: ["#1976d2"],
      strokeColors: "#fff",
      strokeWidth: 2,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      labels: {
        style: {
          colors: "#666",
          fontFamily: "'Poppins', sans-serif",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#666",
          fontFamily: "'Poppins', sans-serif",
        },
      },
    },
    tooltip: {
      theme: "light",
    },
    grid: {
      borderColor: "#f0f0f0",
    },
  };

  const lineChartSeries: ApexAxisChartSeries = [
    {
      name: "Appointments",
      data: processAppointmentsData(), // Use real data
    },
  ];

  // Doughnut Chart Options
  const doughnutChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    colors: ["#1976d2", "#4caf50"],
    labels: ["Doctors", "Patients"],
    legend: {
      position: "bottom",
      fontFamily: "'Poppins', sans-serif",
      labels: {
        colors: "#333",
      },
    },
    tooltip: {
      theme: "light",
    },
    dataLabels: {
      enabled: false,
    },
  };

  const doughnutChartSeries: ApexNonAxisChartSeries = [doctors, patients];

  return (
    <Grid container spacing={3} sx={{ marginBottom: 3 }}>
      <Grid item xs={12} md={6}>
        <motion.div whileHover={{ scale: 1.02 }}>
          <Paper
            sx={{
              padding: 2,
              backgroundColor: "#ffffff",
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                color: "#333",
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Appointments Over Time
            </Typography>
            <Box sx={{ height: "350px" }}>
              <Chart
                options={lineChartOptions}
                series={lineChartSeries}
                type="line"
                height="100%"
              />
            </Box>
          </Paper>
        </motion.div>
      </Grid>
      <Grid item xs={12} md={6}>
        <motion.div whileHover={{ scale: 1.02 }}>
          <Paper
            sx={{
              padding: 2,
              backgroundColor: "#ffffff",
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                color: "#333",
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Users by Role
            </Typography>
            <Box sx={{ height: "350px" }}>
              <Chart
                options={doughnutChartOptions}
                series={doughnutChartSeries}
                type="donut"
                height="100%"
              />
            </Box>
          </Paper>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default Charts;
