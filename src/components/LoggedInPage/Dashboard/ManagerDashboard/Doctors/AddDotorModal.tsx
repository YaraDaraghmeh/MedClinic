import React from "react";
import { User } from "../../../../../Types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";

interface AddDoctorModalProps {
  showAddDoctorModal: boolean;
  setShowAddDoctorModal: React.Dispatch<React.SetStateAction<boolean>>;
  newDoctor: User;
  setNewDoctor: React.Dispatch<React.SetStateAction<User>>;
  autoGeneratePassword: boolean;
  setAutoGeneratePassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddDoctor: (e: React.FormEvent) => void;
}

const specializations = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Radiology",
  "Surgery",
  "Oncology",
  "Orthopedics",
  "Psychiatry",
  "Urology",
];

export const AddDoctorModal: React.FC<AddDoctorModalProps> = ({
  showAddDoctorModal,
  setShowAddDoctorModal,
  newDoctor,
  setNewDoctor,
  autoGeneratePassword,
  setAutoGeneratePassword,
  handleAddDoctor,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !newDoctor.name?.stringValue ||
      !newDoctor.email?.stringValue ||
      !newDoctor.dateOfBirth?.stringValue ||
      (!autoGeneratePassword && !newDoctor.password?.stringValue) ||
      !newDoctor.specialization?.stringValue
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Call the handleAddDoctor function passed from the parent component
    handleAddDoctor(e);
  };

  return (
    <Dialog
      open={showAddDoctorModal}
      onClose={() => setShowAddDoctorModal(false)}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "16px !important",
          padding: "2rem !important",
          backgroundColor: "#f9fafb !important",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1) !important",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "1.75rem !important",
          fontWeight: "700 !important",
          color: "#2c3e50 !important",
          textAlign: "center !important",
          paddingBottom: "1rem !important",
          borderBottom: "1px solid #e5e7eb !important",
          marginBottom: "1.5rem !important",
        }}
      >
        Add New Doctor
      </DialogTitle>

      <DialogContent
        sx={{
          paddingTop: "1.5rem !important",
          paddingBottom: "1.5rem !important",
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={newDoctor.name?.stringValue || ""}
            onChange={(e) =>
              setNewDoctor({
                ...newDoctor,
                name: { stringValue: e.target.value },
              })
            }
            required
            sx={{
              marginBottom: "1.5rem !important",
            }}
          />

          {/* Email Field */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={newDoctor.email?.stringValue || ""}
            onChange={(e) =>
              setNewDoctor({
                ...newDoctor,
                email: { stringValue: e.target.value },
              })
            }
            required
            sx={{
              marginBottom: "1.5rem !important",
            }}
          />

          {/* Date of Birth Field */}
          <TextField
            label="Date of Birth"
            type="date"
            variant="outlined"
            fullWidth
            value={newDoctor.dateOfBirth?.stringValue || ""}
            onChange={(e) =>
              setNewDoctor({
                ...newDoctor,
                dateOfBirth: { stringValue: e.target.value },
              })
            }
            required
            InputLabelProps={{ shrink: true }}
            sx={{
              marginBottom: "1.5rem !important",
            }}
          />

          {/* Auto-generate Password Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={autoGeneratePassword}
                onChange={(e) => setAutoGeneratePassword(e.target.checked)}
                color="primary"
              />
            }
            label="Auto-generate password"
            sx={{
              marginBottom: "1.5rem !important",
            }}
          />

          {/* Password Field (if auto-generate is off) */}
          {!autoGeneratePassword && (
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={newDoctor.password?.stringValue || ""}
              onChange={(e) =>
                setNewDoctor({
                  ...newDoctor,
                  password: { stringValue: e.target.value },
                })
              }
              required
              sx={{
                marginBottom: "1.5rem !important",
              }}
            />
          )}

          {/* Specialization Dropdown */}
          <FormControl fullWidth required sx={{ marginBottom: "1.5rem !important" }}>
            <InputLabel sx={{ background: "white" }}>Specialization</InputLabel>
            <Select
              value={newDoctor.specialization?.stringValue || ""}
              onChange={(e) =>
                setNewDoctor({
                  ...newDoctor,
                  specialization: { stringValue: e.target.value },
                })
              }
              displayEmpty
              variant="outlined"
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 200, // Fixed height
                    overflowY: "auto", // Scrollbar
                  },
                },
              }}
              sx={{
                borderRadius: "12px !important",
                backgroundColor: "#ffffff !important",
                "& fieldset": {
                  borderColor: "#e5e7eb !important",
                },
                "&:hover fieldset": {
                  borderColor: "#3b82f6 !important",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3b82f6 !important",
                },
              }}
            >
              {specializations.map((specialization) => (
                <MenuItem key={specialization} value={specialization}>
                  {specialization}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      </DialogContent>

      <DialogActions
        sx={{
          padding: "1.5rem !important",
          justifyContent: "space-between !important",
        }}
      >
        <Button
          onClick={() => setShowAddDoctorModal(false)}
          variant="outlined"
          sx={{
            textTransform: "none !important",
            padding: "8px 20px !important",
            borderRadius: "12px !important",
            borderColor: "#e5e7eb !important",
            color: "#374151 !important",
            "&:hover": {
              backgroundColor: "#f3f4f6 !important",
              borderColor: "red !important",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit} // Use handleSubmit instead of handleAddDoctor directly
          variant="contained"
          sx={{
            textTransform: "none !important",
            padding: "8px 20px !important",
            borderRadius: "12px !important",
            backgroundColor: "#3b82f6 !important",
            "&:hover": {
              backgroundColor: "#2563eb !important",
            },
          }}
        >
          Add Doctor
        </Button>
      </DialogActions>
    </Dialog>
  );
};