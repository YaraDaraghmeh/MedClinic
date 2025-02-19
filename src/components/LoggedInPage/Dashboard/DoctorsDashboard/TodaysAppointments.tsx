import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { getAppointmentsForDoctorToday } from "../../../../services/appointmentService";
import { Appointment, User } from "../../../../Types";
import ErrorPage from "../../../ErrorPage/ErrorPage";
import { useAppointmentsContext } from "../../../../hooks/AppointmentContext";



const TodaysAppointments: React.FC = () => {
  const [todayappointments, settodayAppointments] = useState<Appointment[]>([]);
    const [user,setUser]= useState<User|null>(null);
  const {appointments} = useAppointmentsContext();

  // Fetch today's appointments
  useEffect(() => {
    const fetchTodaysAppointments = async () => {
        const userFromSession = sessionStorage.getItem('user');
        if (userFromSession) {
          const parsedUser = JSON.parse(userFromSession);
        
          setUser(parsedUser);
          const todaysAppointments =await getAppointmentsForDoctorToday(appointments,parsedUser!.email.stringValue);

          settodayAppointments(todaysAppointments);
        } else {
          console.error("User not found in session storage");
          return <ErrorPage />;
        }
      try {
      
     
     
      } catch (error) {
        console.error("Error fetching today's appointments:", error);
        settodayAppointments([]);
      }
    };

    fetchTodaysAppointments();
  }, []);

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h6"
        sx={{ marginBottom: "16px", fontWeight: "bold", color: "#333" }}
      >
        Today's Appointments
      </Typography>
      {todayappointments.length === 0 ? (
        <Typography variant="body1" sx={{ color: "#666" }}>
          No appointments scheduled for today.
        </Typography>
      ) : (
        <List>
          {todayappointments.map((appointment, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <ListItemText
                  primary={`Patient: ${appointment.patientEmail || "N/A"}`}
                  secondary={`Time: ${appointment.appointmentTime || "N/A"} | Status: ${appointment.status || "N/A"}`}
                />
              </ListItem>
              {index < todayappointments.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default TodaysAppointments;
