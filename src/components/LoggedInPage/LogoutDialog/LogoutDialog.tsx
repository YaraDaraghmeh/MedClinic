import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, keyframes } from '@mui/material';

interface LogoutDialogProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const LogoutDialog: React.FC<LogoutDialogProps> = ({ open, onClose, onLogout }) => {
  const styles = {
    paper: {
      borderRadius: "12px",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
      padding: "16px",
      maxWidth: "400px",
      width: "100%",
      animation: `${slideIn} 0.5s ease-out`,
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      textAlign: "center",
      color: "#333",
      paddingBottom: "8px",
    },
    buttonCancel: {
      textTransform: "none",
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#666",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "8px 24px",
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
    },
    buttonLogout: {
      textTransform: "none",
      fontSize: "1rem",
      fontWeight: "bold",
      backgroundColor: "#ff4444",
      color: "#fff",
      borderRadius: "8px",
      padding: "8px 24px",
      "&:hover": {
        backgroundColor: "#cc0000",
      },
    },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": styles.paper,
      }}
    >
      <DialogTitle sx={styles.title}>Confirm Logout</DialogTitle>
      <DialogContent>
        <Typography
          sx={{
            fontSize: "1rem",
            textAlign: "center",
            color: "#555",
          }}
        >
          Are you sure you want to log out?
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
          padding: "16px",
          gap: "16px",
        }}
      >
        <Button onClick={onClose} sx={styles.buttonCancel}>
          Cancel
        </Button>
        <Button onClick={onLogout} sx={styles.buttonLogout}>
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
