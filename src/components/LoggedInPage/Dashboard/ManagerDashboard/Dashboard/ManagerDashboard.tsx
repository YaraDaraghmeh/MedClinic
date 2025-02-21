import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Grid } from "@mui/material";
import {
 
  getDoctors,
  getPatients,
} from "../../../../../services/userService";
import {
  getAverageRating,
} from "../../../../../services/feedbackService";
import RecentAppointmentsTable from "./RecentAppointmentsTable";
import RecentFeedbackTable from "./RecentFeedbackTable";
import KeyMetrics from "./KeyMetrics";
import Charts from "./Charts";
import { useUserContext } from "../../../../../hooks/UserContext";
import { useAppointmentsContext } from "../../../../../hooks/AppointmentContext";
import { Feedback, User } from "../../../../../Types";
import { useFeedback } from "../../../../../hooks/FeedbackContext";

const ManagerDashboard: React.FC = () => {
  const {users} = useUserContext();
  const [doctors, setDoctors] = useState<User[]>([]); 
  const [patients, setPatients] = useState<User[]>([]); 
  const {appointments}= useAppointmentsContext();
  const [averageRating, setAverageRating] = useState<string>("0.0");
  const [loading, setLoading] = useState(true);
const {feedbacks} = useFeedback();
const avgRating = getAverageRating(feedbacks);
useEffect(() => {
  const fetchData = async () => {
    try {
      const avgRating = getAverageRating(feedbacks);
      setDoctors(getDoctors(users));
      setPatients(getPatients(users));
      setAverageRating(avgRating);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [users, feedbacks]); // Add dependencies here

  const getTodaysAppointments = () => {
    const today = new Date();
    const formattedToday = `${String(today.getDate()).padStart(2, "0")}-${String(today.getMonth() + 1).padStart(2, "0")}-${today.getFullYear()}`;

    return appointments.filter(appointment => appointment.appointmentDate === formattedToday);
  };

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

  const todaysAppointments = getTodaysAppointments();

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ marginBottom: 3, color: "#1976d2", fontWeight: "bold" }}
      >
        Manager Dashboard
      </Typography>

      {/* Key Metrics and Feedback Section */}
      <Grid container spacing={10} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} sm={6}>
          <KeyMetrics
            patients={patients.length}
            doctors={doctors.length}
            appointments={appointments.length}
            averageRating={averageRating}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="h5" sx={{ marginBottom: 2, color: "#1976d2" }}>
              Feedbacks
            </Typography>
            <RecentFeedbackTable feedback={feedbacks.slice(0, 5)} />
          </Box>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h5" sx={{ marginBottom: 2, color: "#1976d2" }}>
          Overview Charts
        </Typography>
        <Charts doctors={doctors.length} patients={patients.length} />
      </Box>

      {/* Today's Appointments */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h5" sx={{ marginBottom: 2, color: "#1976d2" }}>
          Today's Appointments
        </Typography>
        {todaysAppointments.length > 0 ? (
          <RecentAppointmentsTable appointments={todaysAppointments} />
        ) : (
          <Typography
            variant="body1"
            sx={{
              color: "gray",
              fontStyle: "italic",
              padding: "8px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
            }}
          >
            No appointments for today.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ManagerDashboard;
