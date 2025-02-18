import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { User } from "../../../../../Types";

interface ForwardDialogProps {
  open: boolean;
  onClose: () => void;
  onForward: () => void;
  newDoctorEmail: string;
  setNewDoctorEmail: (email: string) => void;
  doctors:User[];
}

export const ForwardDialog: React.FC<ForwardDialogProps> = ({
  open,
  onClose,
  onForward,
  newDoctorEmail,
  setNewDoctorEmail,
  doctors,
}) => {
  // Log data for debugging
  console.log("Doctors:", doctors);
  console.log("New Doctor Email:", newDoctorEmail);

  // Function to format doctor names with specializations (if duplicates exist)
  const formatDoctorName = (doctor: User )=> {
    const duplicateNames = doctors.filter(
      (d) => d.name === doctor.name
    ).length;
    if (duplicateNames > 1 && doctor.specialization) {
      return `${doctor.name} - ${doctor.specialization}`;
    }
    return doctor.name;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: "12px",
          minWidth: "450px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {/* Dialog Title */}
      <DialogTitle
        className="bg-gradient-to-r from-blue-500 to-blue-600 !text-white !text-xl !font-semibold px-6 py-4 rounded-t-lg"
      >
        Forward Appointments
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent className="px-6 py-5">
        <Typography
          variant="body1"
          className="!text-gray-700 !text-md !mb-4"
        >
          Select the doctor to whom you want to forward the appointments.
        </Typography>

        {/* Combo Box for Doctors */}
        <FormControl fullWidth variant="outlined" className="!mb-4">
          <InputLabel id="doctor-select-label">Select Doctor</InputLabel>
          <Select
            labelId="doctor-select-label"
            value={newDoctorEmail}
            onChange={(e) => setNewDoctorEmail(e.target.value as string)}
            label="Select Doctor"
            required
            className="!rounded-lg"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: "200px", // Limit dropdown height
                  borderRadius: "8px",
                },
              },
            }}
          >
            {doctors.map((doctor) => (
              <MenuItem
                key={doctor.email}
                value={doctor.email}
              >
                {formatDoctorName(doctor)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions className="px-6 pb-5 flex justify-end space-x-4">
        {/* Cancel Button */}
        <Button
          onClick={onClose}
          variant="outlined"
          className="border-gray-400 text-gray-700 px-6 py-2 rounded-lg transition duration-200 hover:bg-gray-100 hover:border-gray-500 hover:shadow-sm focus:outline-none"
        >
          Cancel
        </Button>

        {/* Forward Button */}
        <Button
          onClick={onForward}
          variant="contained"
          className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 rounded-lg text-white shadow-md transition duration-200 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg focus:outline-none"
        >
          Forward
        </Button>
      </DialogActions>
    </Dialog>
  );
};