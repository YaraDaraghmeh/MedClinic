import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose, onDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: "12px",
          minWidth: "450px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        },
      }}
    >
      {/* Dialog Title */}
      <DialogTitle
        className="bg-red-500 !text-white-800 !text-xl !font-semibold px-6 py-4 border-b !border-gray-200"
      >
        ⚠️ Delete Doctor
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent className="px-6 py-5">
        <Typography
          variant="body1"
          className="!text-gray-700 text-md !leading-relaxed !px-4 !py-2" // Added padding here
        >
          Are you sure you want to delete this doctor?
          <br />
          This action <b className="text-red-600">cannot be undone.</b>
        </Typography>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions className="px-6 pb-5 flex justify-end space-x-4">
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          className="border-gray-300 text-gray-700 px-5 py-2 rounded-md transition duration-200 hover:bg-gray-50 hover:border-gray-400"
        >
          Cancel
        </Button>
        <Button
          onClick={onDelete}
          variant="contained"
          color="error"
          className="bg-red-600 px-6 py-2 rounded-md text-white shadow-sm transition duration-200 hover:bg-red-700"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};