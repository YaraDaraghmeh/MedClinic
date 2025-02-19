import React from "react";
import { Pagination, Box } from "@mui/material";

interface AppointmentsPaginationProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const AppointmentsPagination: React.FC<AppointmentsPaginationProps> = ({
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ "& .MuiPaginationItem-root": { borderRadius: "8px" } }}
      />
    </Box>
  );
};

export default AppointmentsPagination;