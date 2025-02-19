import React, { useEffect, useState, useMemo, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography, Box, CircularProgress, Paper } from "@mui/material";
import AppointmentsFilters from "./AppointmentsFilters/AppointmentsFilters";
import AppointmentsTable from "./AppointmentsTable/AppointmentsTable";
import AppointmentsPagination from "./AppointmentsPagination/AppointmentsPagination";
import { useUserContext } from "../../../../../hooks/UserContext";
import { useAppointmentsContext } from "../../../../../hooks/AppointmentContext";
import { User } from "../../../../../Types";
import { getDoctors } from "../../../../../services/userService";

const AppointmentsPage: React.FC = () => {
 const {appointments}= useAppointmentsContext();
  const [filteredAppointments, setFilteredAppointments] = useState<any[]>([]);
 const {users} = useUserContext();
  const [doctors, setDoctors] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [doctorFilter, setDoctorFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     
        setFilteredAppointments(appointments);
        
      
   setDoctors(getDoctors(users));
   setLoading(false);
  }, []);

  // Memoize filtered appointments
  const filteredAppointmentsMemo = useMemo(() => {
    let filtered = appointments;

    if (searchTerm) {
      filtered = filtered.filter(
        (appointment) =>
          appointment.patientEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.doctorEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.reason?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (appointment) => appointment.status === statusFilter
      );
    }

    if (doctorFilter !== "all") {
      filtered = filtered.filter(
        (appointment) => appointment.doctorEmail === doctorFilter
      );
    }

    filtered.sort((a, b) => {
      const dateA = a.appointmentDate || "";
      const dateB = b.appointmentDate || "";
      return sortOrder === "asc" ? dateA.localeCompare(dateB) : dateB.localeCompare(dateA);
    });

    return filtered;
  }, [appointments, searchTerm, statusFilter, doctorFilter, sortOrder]);

  useEffect(() => {
    setFilteredAppointments(filteredAppointmentsMemo);
    setCurrentPage(1);
  }, [filteredAppointmentsMemo]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <Box sx={{ padding: 3, backgroundColor: "#ffffff", paddingBottom:10, minHeight:"55vh" } }>
      <ToastContainer position="bottom-left" />
      <Typography variant="h4" sx={{ marginBottom: 3, color: "#1976d2", fontWeight: "bold" }}>
        Appointments
      </Typography>

      <AppointmentsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        doctorFilter={doctorFilter}
        setDoctorFilter={setDoctorFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        doctors={doctors}
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <AppointmentsTable
            currentItems={currentItems}
            doctors={doctors}
            indexOfFirstItem={indexOfFirstItem}
          />
          <AppointmentsPagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </Box>
  );
};

export default AppointmentsPage;