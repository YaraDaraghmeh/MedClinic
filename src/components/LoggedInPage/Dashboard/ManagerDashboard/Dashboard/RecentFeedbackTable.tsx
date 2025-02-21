import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import StarRating from "./starRating";
import { Feedback } from "../../../../../Types";

interface RecentFeedbackTableProps {
  feedback: Feedback[];
}

const RecentFeedbackTable: React.FC<RecentFeedbackTableProps> = ({ feedback }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % feedback.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [feedback.length]);

  const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return "No date available";
    try {
      return format(new Date(timestamp), "MMMM dd, yyyy • hh:mm a");
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxWidth: 500,
        height: 310,
        position: "relative",
        padding: 2,
      }}
    >
      {/* Background Card Layer */}
      <Card
        sx={{
          position: "absolute",
          width: "90%",
          height: "90%",
          borderRadius: 4,
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
          background: "#e3f2fd", // Light hospital blue
          transform: "rotate(-3deg)",
          zIndex: 1,
        }}
      />

      {/* Middle Card Layer */}
      <Card
        sx={{
          position: "absolute",
          width: "95%",
          height: "95%",
          borderRadius: 4,
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
          background: "#bbdefb", // Soft hospital blue
          transform: "rotate(-1deg)",
          zIndex: 2,
        }}
      />

      {/* Foreground Card Layer */}
      <AnimatePresence mode="wait">
        {feedback.length > 0 && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, type: "spring" }}
            style={{ position: "absolute", width: "100%", zIndex: 3 }}
          >
            <Card
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: 4,
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
                padding: "25px",
                background: "#ffffff", // Clean white
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                {/* User Email */}
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    color: "#0277bd", // Deep hospital blue
                    fontSize: "1.2rem",
                  }}
                >
                  {feedback[currentIndex]?.userEmail || "Anonymous"}
                </Typography>

                {/* Rating (Stars + Numeric Value) */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                  <StarRating rating={feedback[currentIndex].rating} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      color: "#01579b", // Dark blue
                      fontSize: "1rem",
                      background: "#81d4fa", // Light blue accent
                      padding: "4px 8px",
                      borderRadius: "8px",
                    }}
                  >
                    {feedback[currentIndex]?.rating || 0} / 5 ⭐
                  </Typography>
                </Box>

                {/* Message */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "#37474f", // Soft gray text
                    marginTop: 2,
                    fontSize: "1rem",
                    fontStyle: "italic",
                    background: "#e1f5fe", // Ultra-light blue
                    padding: "8px",
                    borderRadius: "10px",
                  }}
                >
                  {feedback[currentIndex]?.message || "No message provided."}
                </Typography>
              </CardContent>

              {/* Timestamp (Bottom Right) */}
              <Typography
                variant="caption"
                sx={{
                  alignSelf: "flex-end",
                  color: "#ffffff",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  background: "#0288d1", // Strong hospital blue
                  padding: "4px 6px",
                  borderRadius: "6px",
                }}
              >
                {formatTimestamp(feedback[currentIndex]?.timestamp)}
              </Typography>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default RecentFeedbackTable;
