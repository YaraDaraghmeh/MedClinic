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
import StarRating from "./starRating"; 

interface RecentFeedbackTableProps {
  feedback: any[];
}

const RecentFeedbackTable: React.FC<RecentFeedbackTableProps> = ({
  feedback,
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
              User
            </TableCell>
            <TableCell
              sx={{
                color: "#fff", // Header text color
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              Rating
            </TableCell>
            <TableCell
              sx={{
                color: "#fff", // Header text color
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              Message
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedback.map((fb) => (
            <motion.tr
              key={fb.id}
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
                {fb.userEmail?.stringValue || "N/A"}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #e0e0e0",
                  fontSize: "0.95rem",
                }}
              >
                <StarRating rating={fb.rating?.doubleValue || 0} />
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "1px solid #e0e0e0",
                  fontSize: "0.95rem",
                  color: "#333",
                }}
              >
                {fb.message?.stringValue || "N/A"}
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecentFeedbackTable;