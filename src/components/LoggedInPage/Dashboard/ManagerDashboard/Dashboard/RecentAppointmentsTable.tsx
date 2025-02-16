import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";

interface RecentAppointmentsTableProps {
  appointments: any[];
}

const RecentAppointmentsTable: React.FC<RecentAppointmentsTableProps> = ({
  appointments,
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#1976d2", // Header background color
            }}
          >
            <TableCell
              sx={{
                color: "#fff", // Header text color
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              Patient
            </TableCell>
            <TableCell
              sx={{
                color: "#fff", // Header text color
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              Doctor
            </TableCell>
            <TableCell
              sx={{
                color: "#fff", // Header text color
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              Date
            </TableCell>
            <TableCell
              sx={{
                color: "#fff", // Header text color
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              Time
            </TableCell>
            <TableCell
              sx={{
                color: "#fff", // Header text color
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <motion.tr
              key={appointment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TableCell
                sx={{
                  borderBottom: "1px solid #e0e0e0",
                  fontSize: "0.95rem",
                  color: "#333",
                }}
              >
                {appointment.patientEmail?.stringValue || "N/A"}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #e0e0e0",
                  fontSize: "0.95rem",
                  color: "#333",
                }}
              >
                {appointment.doctorEmail?.stringValue || "N/A"}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #e0e0e0",
                  fontSize: "0.95rem",
                  color: "#333",
                }}
              >
                {appointment.appointmentDate?.stringValue || "N/A"}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #e0e0e0",
                  fontSize: "0.95rem",
                  color: "#333",
                }}
              >
                {appointment.appointmentTime?.stringValue || "N/A"}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #e0e0e0",
                  fontSize: "0.95rem",
                  color: "#333",
                }}
              >
                {appointment.status?.stringValue || "N/A"}
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecentAppointmentsTable;