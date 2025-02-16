import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import {
  getUsers,
  getDoctors,
  getPatients,
} from "../../../../../services/userService";
import { getAppointments } from "../../../../../services/appointmentService";
import {
  getFeedback,
  getAverageRating,
} from "../../../../../services/feedbackService";
import RecentAppointmentsTable from "./RecentAppointmentsTable";
import RecentFeedbackTable from "./RecentFeedbackTable";
import KeyMetrics from "./KeyMetrics";
import Charts from "./Charts";

const ManagerDashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState<string>("0.0");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          usersData,
          doctorsData,
          patientsData,
          appointmentsData,
          feedbackData,
          avgRating,
        ] = await Promise.all([
          getUsers(),
          getDoctors(),
          getPatients(),
          getAppointments(),
          getFeedback(),
          getAverageRating(),
        ]);

        setUsers(usersData);
        setDoctors(doctorsData);
        setPatients(patientsData);
        setAppointments(appointmentsData);
        setFeedback(feedbackData);
        setAverageRating(avgRating);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 5,
          minHeight: "100vh",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ marginBottom: 3, color: "#1976d2", fontWeight: "bold" }}
      >
        Manager Dashboard
      </Typography>

      {/* Key Metrics */}
      <KeyMetrics
        patients={patients.length}
        doctors={doctors.length}
        appointments={appointments.length}
        averageRating={averageRating}
      />

      {/* Charts Section */}
      <Charts doctors={doctors.length} patients={patients.length} />

      {/* Recent Appointments */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h5" sx={{ marginBottom: 2, color: "#1976d2" }}>
          Recent Appointments
        </Typography>
        <RecentAppointmentsTable appointments={appointments.slice(0, 5)} />
      </Box>

      {/* Recent Feedback */}
      <Box>
        <Typography variant="h5" sx={{ marginBottom: 2, color: "#1976d2" }}>
          Recent Feedback
        </Typography>
        <RecentFeedbackTable feedback={feedback.slice(0, 5)} />
      </Box>
    </Box>
  );
};

export default ManagerDashboard;
