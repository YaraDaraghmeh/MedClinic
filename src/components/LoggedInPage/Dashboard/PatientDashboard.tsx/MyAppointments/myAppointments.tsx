import React, { useState } from "react";
import { useLoggedInUser } from "../../../../../hooks/LoggedinUserContext";
import { useAppointmentsContext } from "../../../../../hooks/AppointmentContext";
import { Appointment } from "../../../../../Types";
import Filters from "./Filters/Filters";
import NoteModal from "./NoteModal/NoteModal";
import Pagination from "./Pagination/Pagination";
import AppointmentsList from "./AppoitmentsList/AppoitmentsList";
import { format } from "date-fns";
import "./MyAppointments.css";

const MyAppointments: React.FC = () => {
  const { appointments, updateAppointment } = useAppointmentsContext();
  const { loggedInUser } = useLoggedInUser();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [filterDoctor, setFilterDoctor] = useState<string>("");
  const [filterNoteStatus, setFilterNoteStatus] = useState<string>("all");
  const appointmentsPerPage = 4;

  // Filter appointments for the logged-in patient
  const patientAppointments = appointments.filter(
    (appointment) => appointment.patientEmail === loggedInUser?.email
  );

  // Get unique doctors for select filter
  const doctors = Array.from(new Set(patientAppointments.map((a) => a.doctorEmail)));

  // Apply filters
  const filteredAppointments = patientAppointments.filter((appointment) => {
    const matchesDate = filterDate
      ? appointment.appointmentDate === format(filterDate, "dd-MM-yyyy")
      : true;

    const matchesDoctor = filterDoctor ? appointment.doctorEmail === filterDoctor : true;

    let matchesNoteStatus = true;
    if (filterNoteStatus === "read") {
      matchesNoteStatus = !!appointment.note && !!appointment.readNote;
    } else if (filterNoteStatus === "unread") {
      matchesNoteStatus = !!appointment.note && !appointment.readNote;
    } else if (filterNoteStatus === "hasNote") {
      matchesNoteStatus = !!appointment.note;
    }

    return matchesDate && matchesDoctor && matchesNoteStatus;
  });

  // Pagination logic
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  // Handle viewing note
  const handleViewNote = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowNoteModal(true);

    if (appointment.note && !appointment.readNote) {
      updateAppointment(appointment.id, { readNote: true });
    }
  };

  // Handle date change
  const handleDateChange = (date: Date | null) => {
    setFilterDate(date);
  };

  // Check if any filter has been changed
  const isFiltersChanged = filterDate !== null || filterDoctor !== "" || filterNoteStatus !== "all";

  // Reset all filters
  const resetFilters = () => {
    setFilterDate(null);
    setFilterDoctor("");
    setFilterNoteStatus("all");
  };

  return (
    <div className="my-appointments">
      <h2>My Appointments</h2>

      <Filters
        filterDate={filterDate}
        handleDateChange={handleDateChange}
        filterDoctor={filterDoctor}
        setFilterDoctor={setFilterDoctor}
        filterNoteStatus={filterNoteStatus}
        setFilterNoteStatus={setFilterNoteStatus}
        doctors={doctors}
        isFiltersChanged={isFiltersChanged}
        resetFilters={resetFilters}
      />

      {currentAppointments.length === 0 ? (
        <p className="no-appointments">No appointments found.</p>
      ) : (
        <AppointmentsList
          currentAppointments={currentAppointments}
          handleViewNote={handleViewNote}
        />
      )}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      <NoteModal
        showNoteModal={showNoteModal}
        setShowNoteModal={setShowNoteModal}
        selectedAppointment={selectedAppointment}
      />
    </div>
  );
};

export default MyAppointments;
