import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Avatar,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import UserTooltip from "../UserTooltip/UserTooltip";
import { Appointment, User } from "../../../../../../Types";
import { useUserContext } from "../../../../../../hooks/UserContext";
import { getUserByEmail } from "../../../../../../services/userService";

interface AppointmentsTableProps {
  currentItems: Appointment[];
  doctors: User[];
  indexOfFirstItem: number;
}

const AppointmentsTable: React.FC<AppointmentsTableProps> = ({
  currentItems,
  doctors,
  indexOfFirstItem,
}) => {
 
const {users} = useUserContext();
  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: "8px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: "#1976d2" }}>
          <TableRow>
            <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>#</TableCell>
            <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Patient</TableCell>
            <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Doctor</TableCell>
            <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Date</TableCell>
            <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Time</TableCell>
            <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Reason</TableCell>
            <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} sx={{ textAlign: "center", padding: 3 }}>
                <Typography variant="body1" sx={{ color: "#757575" }}>
                  No Appointments Found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            currentItems.map((appointment, index) => {
              const patient = getUserByEmail(users,appointment.patientEmail);
              const doctor = getUserByEmail(users,appointment.doctorEmail);

              return (
                <TableRow
                  key={appointment.id}
                  sx={{
                    backgroundColor: "#ffffff",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell>
                    <UserTooltip user={patient} />
                  </TableCell>
                  <TableCell>
                    <UserTooltip user={doctor} />
                  </TableCell>
                  <TableCell>{appointment.appointmentDate || "N/A"}</TableCell>
                  <TableCell>{appointment.appointmentTime || "N/A"}</TableCell>
                  <TableCell>{appointment.reason || "N/A"}</TableCell>
                  <TableCell
                    sx={{
                      color:
                        appointment.status === "pending"
                          ? "#ff9800"
                          : appointment.status === "confirmed"
                          ? "#4caf50"
                          : appointment.status === "completed"
                          ? "#2196f3"
                          : "#f44336",
                      fontWeight: "bold",
                    }}
                  >
                    {appointment.status || "N/A"}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppointmentsTable;