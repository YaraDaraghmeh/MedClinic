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

interface AppointmentsTableProps {
  currentItems: any[];
  users: any[];
  doctors: any[];
  indexOfFirstItem: number;
}

const AppointmentsTable: React.FC<AppointmentsTableProps> = ({
  currentItems,
  users,
  doctors,
  indexOfFirstItem,
}) => {
  const getUserByEmail = (email: string) => {
    const user = users.find((user) => user.email?.stringValue === email);
    const doctor = doctors.find((doctor) => doctor.email?.stringValue === email);
    return user || doctor;
  };

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
              const patient = getUserByEmail(appointment.patientEmail?.stringValue);
              const doctor = getUserByEmail(appointment.doctorEmail?.stringValue);

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
                  <TableCell>{appointment.appointmentDate?.stringValue || "N/A"}</TableCell>
                  <TableCell>{appointment.appointmentTime?.stringValue || "N/A"}</TableCell>
                  <TableCell>{appointment.reason?.stringValue || "N/A"}</TableCell>
                  <TableCell
                    sx={{
                      color:
                        appointment.status?.stringValue === "pending"
                          ? "#ff9800"
                          : appointment.status?.stringValue === "confirmed"
                          ? "#4caf50"
                          : appointment.status?.stringValue === "completed"
                          ? "#2196f3"
                          : "#f44336",
                      fontWeight: "bold",
                    }}
                  >
                    {appointment.status?.stringValue || "N/A"}
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