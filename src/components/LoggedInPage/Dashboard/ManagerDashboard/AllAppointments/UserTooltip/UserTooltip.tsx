import React from "react";
import { Tooltip, Box, Avatar, Typography } from "@mui/material";
import { calculateAge } from "../../../../../../functions";
interface UserTooltipProps {
  user: any;
}

const UserTooltip: React.FC<UserTooltipProps> = ({ user }) => {

  return (
    <Tooltip
      title={
        <Box sx={{ padding: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}>
            <Avatar src={user?.imageUrl?.stringValue} sx={{ width: 60, height: 60 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {user?.name?.stringValue || "N/A"}
              </Typography>
              <Typography variant="body2">
                {user?.email?.stringValue || "N/A"}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2">
            <strong>Age:</strong> {calculateAge(user?.dateOfBirth?.stringValue)}
          </Typography>
          <Typography variant="body2">
            <strong>Gender:</strong> {user?.gender?.stringValue || "N/A"}
          </Typography>
          <Typography variant="body2">
            <strong>Role:</strong> {user?.role?.stringValue || "N/A"}
          </Typography>
          {user?.specialization?.stringValue && (
            <Typography variant="body2">
              <strong>Specialization:</strong> {user?.specialization?.stringValue}
            </Typography>
          )}
        </Box>
      }
      arrow
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar src={user?.imageUrl?.stringValue} />
        {user?.email?.stringValue || "N/A"}
      </Box>
    </Tooltip>
  );
};

export default UserTooltip;