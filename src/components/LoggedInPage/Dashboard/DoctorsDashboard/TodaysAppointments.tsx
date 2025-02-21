import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItemText,
  Divider,
  Card,
  CardContent,
  Avatar,
  Stack,
  Container,
} from "@mui/material";
import { getAppointmentsForDoctorToday } from "../../../../services/appointmentService";
import { Appointment, User } from "../../../../Types";
import ErrorPage from "../../../ErrorPage/ErrorPage";
import { useAppointmentsContext } from "../../../../hooks/AppointmentContext";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import moment from "moment";

const TodaysAppointments: React.FC = () => {
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const { appointments } = useAppointmentsContext();

  useEffect(() => {
    const fetchTodaysAppointments = async () => {
      try {
        const userFromSession = sessionStorage.getItem("user");
        if (!userFromSession) {
          console.error("User not found in session storage");
          return <ErrorPage />;
        }

        const parsedUser = JSON.parse(userFromSession);
        setUser(parsedUser);

        // Debug logs
        console.log("Current date:", moment().format("DD-MM-YYYY"));
        console.log("All appointments:", appointments);

        const todaysAppointments = getAppointmentsForDoctorToday(
          appointments,
          parsedUser.email // Changed from parsedUser.email.stringValue
        );

        console.log("Filtered appointments:", todaysAppointments);
        setTodayAppointments(todaysAppointments);
      } catch (error) {
        console.error("Error fetching today's appointments:", error);
        setTodayAppointments([]);
      }
    };

    fetchTodaysAppointments();
  }, [appointments]);

  // Date formatting helper
  const formatDisplayDate = (dateString: string) => {
    return moment(dateString, "DD-MM-YYYY").format("DD MMMM YYYY");
  };

  // Time formatting helper
  const formatDisplayTime = (timeString: string) => {
    return moment(timeString, "HH:mm").format("hh:mm A");
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: "50px" }}>
      <Box
        sx={{
          padding: "24px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          marginTop: "20px",
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#1976d2", marginBottom: "20px" }}
        >
          Today's Appointments
        </Typography>
        {todayAppointments.length === 0 ? (
          <Typography
            variant="body1"
            sx={{
              color: "#666",
              padding: "30px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            No appointments scheduled for today.
          </Typography>
        ) : (
          <List>
            {todayAppointments.map((appointment, index) => (
              <React.Fragment key={appointment.id}>
                <Card
                  sx={{
                    marginBottom: "15px",
                    borderRadius: "10px",
                    backgroundColor: "#fafafa",
                    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                    padding: "10px",
                  }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold" color="primary">
                            {appointment.patientEmail || "N/A"}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <CalendarMonthIcon sx={{ fontSize: 16, color: "#1976d2" }} />
                              <Typography variant="body2" color="textSecondary">
                                {formatDisplayDate(appointment.appointmentDate) || "N/A"}
                              </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <AccessTimeIcon sx={{ fontSize: 16, color: "#1976d2" }} />
                              <Typography variant="body2" color="textSecondary">
                                {formatDisplayTime(appointment.appointmentTime) || "N/A"}
                              </Typography>
                            </Stack>
                          </>
                        }
                      />
                    </Stack>
                  </CardContent>
                </Card>
                {index < todayAppointments.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
};

export default TodaysAppointments;