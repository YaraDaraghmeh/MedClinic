import React from "react";
import { Tooltip, Box, Avatar, Typography } from "@mui/material";
import { calculateAge } from "../../../../../../functions";
import { User } from "../../../../../../Types";
interface UserTooltipProps {
  user: User;
}

const UserTooltip: React.FC<UserTooltipProps> = ({ user }) => {

  return (
    <Tooltip
      title={
        <Box sx={{ padding: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}>
            <Avatar src={user?.imageUrl} sx={{ width: 60, height: 60 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {user?.name || "N/A"}
              </Typography>
              <Typography variant="body2">
                {user?.email || "N/A"}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2">
            <strong>Age:</strong> {calculateAge(user?.dateOfBirth)}
          </Typography>
          <Typography variant="body2">
            <strong>Gender:</strong> {user?.gender || "N/A"}
          </Typography>
          <Typography variant="body2">
            <strong>Role:</strong> {user?.role || "N/A"}
          </Typography>
          {user?.specialization && (
            <Typography variant="body2">
              <strong>Specialization:</strong> {user?.specialization}
            </Typography>
          )}
        </Box>
      }
      arrow
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar src={user?.imageUrl} />
        {user?.email || "N/A"}
      </Box>
    </Tooltip>
  );
};

export default UserTooltip;