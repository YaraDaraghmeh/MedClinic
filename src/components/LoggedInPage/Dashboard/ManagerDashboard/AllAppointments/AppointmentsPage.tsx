import React, { useEffect, useState, useMemo, useCallback } from "react";
import { getAppointments } from "../../../../../services/appointmentService";
import { getUsers, getDoctors } from "../../../../../services/userService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography, Box, CircularProgress, Paper } from "@mui/material";
import AppointmentsFilters from "./AppointmentsFilters/AppointmentsFilters";
import AppointmentsTable from "./AppointmentsTable/AppointmentsTable";
import AppointmentsPagination from "./AppointmentsPagination/AppointmentsPagination";

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [doctorFilter, setDoctorFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsData, usersData, doctorsData] = await Promise.all([
          getAppointments(),
          getUsers(),
          getDoctors(),
        ]);
        setAppointments(appointmentsData);
        setFilteredAppointments(appointmentsData);
        setUsers(usersData);
        setDoctors(doctorsData);
      } catch (error) {
        toast.error("Failed to fetch data");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Memoize filtered appointments
  const filteredAppointmentsMemo = useMemo(() => {
    let filtered = appointments;

    if (searchTerm) {
      filtered = filtered.filter(
        (appointment) =>
          appointment.patientEmail?.stringValue?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.doctorEmail?.stringValue?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.reason?.stringValue?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (appointment) => appointment.status?.stringValue === statusFilter
      );
    }

    if (doctorFilter !== "all") {
      filtered = filtered.filter(
        (appointment) => appointment.doctorEmail?.stringValue === doctorFilter
      );
    }

    filtered.sort((a, b) => {
      const dateA = a.appointmentDate?.stringValue || "";
      const dateB = b.appointmentDate?.stringValue || "";
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
    <Box sx={{ padding: 3, backgroundColor: "#ffffff", minHeight: "100%" }}>
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
            users={users}
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