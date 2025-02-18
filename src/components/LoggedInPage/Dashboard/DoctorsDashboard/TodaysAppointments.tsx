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



const TodaysAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [user,setUser]= useState<User|null>(null);
  // Function to format the date as "DD-MM-YYYY"
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Fetch today's appointments
  useEffect(() => {
    const fetchTodaysAppointments = async () => {
        const userFromSession = sessionStorage.getItem('user');
        if (userFromSession) {
          const parsedUser = JSON.parse(userFromSession);
        
          setUser(parsedUser);
          const todaysAppointments =await getAppointmentsForDoctorToday(parsedUser!.email.stringValue);

          setAppointments(todaysAppointments);
        } else {
          console.error("User not found in session storage");
          return <ErrorPage />;
        }
      try {
      
     
     
      } catch (error) {
        console.error("Error fetching today's appointments:", error);
        setAppointments([]);
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
      {appointments.length === 0 ? (
        <Typography variant="body1" sx={{ color: "#666" }}>
          No appointments scheduled for today.
        </Typography>
      ) : (
        <List>
          {appointments.map((appointment, index) => (
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
                  primary={`Patient: ${appointment.patientEmail?.stringValue || "N/A"}`}
                  secondary={`Time: ${appointment.appointmentTime?.stringValue || "N/A"} | Status: ${appointment.status?.stringValue || "N/A"}`}
                />
              </ListItem>
              {index < appointments.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default TodaysAppointments;
