import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import { motion } from "framer-motion";

const MetricCard: React.FC<{
  label: string;
  value: number | string;
  icon: JSX.Element;
  bgColor: string;
}> = ({ label, value, icon, bgColor }) => {
    return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Paper
            sx={{
              padding: { xs: 1, sm: 2 },
              borderRadius: "20px",
              backgroundColor: bgColor,
              boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
              display: "flex",
              flexDirection: "column",
              minHeight: "160px",
              justifyContent: "center",
              maxWidth: "100%",
              overflow: "hidden",
              "&:hover": {
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
                transform: "translateY(-5px)",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 1, sm: 2 } }}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  padding: 1.5,
                  marginRight: 2,
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                }}
              >
                {icon}
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "black",
                  textTransform: "uppercase",
                  fontSize: { xs: "0.75rem", sm: "0.85rem" },
                }}
              >
                {label}
              </Typography>
            </Box>
    
            <Divider sx={{ marginBottom: 1, backgroundColor: "#fff" }} />
    
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "black",
                  justifySelf:"center",
                  fontSize: { xs: "1.3rem", sm: "1.5rem" },
                }}
              >
                {value}
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      );
    };
export default MetricCard;