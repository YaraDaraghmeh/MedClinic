import React from "react";
import { Tooltip, Box, Avatar, Typography } from "@mui/material";
import { calculateAge } from "../../../../../../functions";
import { User } from "../../../../../../Types";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface UserTooltipProps {
  user: User;
}

const UserTooltip: React.FC<UserTooltipProps> = ({ user }) => {
  const navigate = useNavigate();

  // Function to handle clicking on the user
  const handleUserClick = () => {
    if (user.name !== "Anonymous") {
      navigate(`/user-profile?email=${user.email}`);
    }
  };

  return (
    <Tooltip
      title={
        <Box
          sx={{
            padding: 2,
            fontFamily: "'Roboto', sans-serif !important",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}>
            <Avatar src={user?.imageUrl} sx={{ width: 60, height: 60 }} />
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "'Roboto', sans-serif !important",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
              >
                {user?.name || "N/A"}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'Roboto', sans-serif !important",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
              >
                {user?.email || "N/A"}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Roboto', sans-serif !important",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          >
            <strong style={{ fontWeight: "bold" }}>Age:</strong> {calculateAge(user?.dateOfBirth)}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Roboto', sans-serif !important",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          >
            <strong style={{ fontWeight: "bold" }}>Gender:</strong> {user?.gender || "N/A"}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Roboto', sans-serif !important",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          >
            <strong style={{ fontWeight: "bold" }}>Role:</strong> {user?.role || "N/A"}
          </Typography>
          {user?.specialization && (
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'Roboto', sans-serif !important",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
            >
              <strong style={{ fontWeight: "bold" }}>Specialization:</strong> {user?.specialization}
            </Typography>
          )}
        </Box>
      }
      arrow
    >
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, cursor: user.name !== "Anonymous" ? "pointer" : "default" }}
        onClick={handleUserClick}
      >
        <Avatar src={user?.imageUrl} />
        <Typography
          sx={{
            fontFamily: "'Roboto', sans-serif !important",
            color:"black"
          }}
        >
          {user?.email || "N/A"}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default UserTooltip;