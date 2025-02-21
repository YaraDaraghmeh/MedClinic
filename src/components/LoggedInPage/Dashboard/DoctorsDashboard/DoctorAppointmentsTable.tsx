import React, { useEffect, useState, useMemo } from "react";
import { Table, Typography } from "antd";
import { useAppointmentsContext } from "../../../../hooks/AppointmentContext";
import { useLoggedInUser } from "../../../../hooks/LoggedinUserContext";
import { getAppointmentsByDoctor } from "../../../../services/appointmentService";
import EditAppointmentModal from "../DoctorsDashboard/EditAppointmentModal";
import NotesModal from "../DoctorsDashboard/NotesModal";
import DeleteConfirmationModal from "../DoctorsDashboard/DeleteConfirmationModal";
import useTableColumns from "../../../../hooks/useTableColumns";
import SearchAndFilterBar from "../DoctorsDashboard/SearchAndFilterBar";
import { Appointment } from "../../../../Types";
import moment from "moment";

const DoctorAppointmentsTable: React.FC = () => {
  const { loggedInUser } = useLoggedInUser();
  const { appointments, updateAppointment, deleteAppointment } = useAppointmentsContext();
  const [loading, setLoading] = useState(true);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<string | null>(null);

  useEffect(() => {
    const loadAppointments = () => {
      if (!loggedInUser?.email) return;
      try {
        const data = getAppointmentsByDoctor(appointments, loggedInUser.email);
        setFilteredAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAppointments();
  }, [loggedInUser?.email, appointments]);

  const filteredData = useMemo(() => {
    let data = [...filteredAppointments];

    // Search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      data = data.filter(appt => {
        const dateString = moment(appt.appointmentDate).format("DD-MM-YYYY");
        const timeString = moment(appt.appointmentTime, "HH:mm").format("hh:mm A");
        
        return (
          appt.patientEmail.toLowerCase().includes(lowerSearch) ||
          dateString.includes(lowerSearch) ||
          timeString.toLowerCase().includes(lowerSearch)
        );
      });
    }

    // Status filter
    if (statusFilter !== "all") {
      data = data.filter(appt => appt.status.toLowerCase() === statusFilter.toLowerCase());
    }

    // Date sorting
    data.sort((a, b) => {
      const dateA = moment(a.appointmentDate);
      const dateB = moment(b.appointmentDate);
      return sortOrder === "asc" ? dateA.diff(dateB) : dateB.diff(dateA);
    });

    return data;
  }, [filteredAppointments, searchTerm, statusFilter, sortOrder]);

  const columns = useTableColumns({
    setEditingAppointment,
    setDeleteConfirmVisible,
    setAppointmentToDelete,
    setSelectedAppointment,
    setShowNotesModal,
    form: null
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <Typography.Title level={3} className="!mb-2">
          Appointment Management
        </Typography.Title>
        <Typography.Text type="secondary">
          Manage your upcoming patient appointments
        </Typography.Text>
      </div>

      <SearchAndFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <Table
        columns={columns}
        dataSource={filteredData} 
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        scroll={{ x: true }}
        className="rounded-md"
        rowClassName="hover:bg-gray-50"
      />

      <EditAppointmentModal
        editingAppointment={editingAppointment}
        setEditingAppointment={setEditingAppointment}
        updateAppointment={updateAppointment as any}
      />

      <NotesModal
        showNotesModal={showNotesModal}
        setShowNotesModal={setShowNotesModal}
        selectedAppointment={selectedAppointment}
        updateAppointment={updateAppointment}
      />

      <DeleteConfirmationModal
        visible={deleteConfirmVisible}
        onCancel={() => setDeleteConfirmVisible(false)}
        onConfirm={async () => {
          if (appointmentToDelete) {
            await deleteAppointment(appointmentToDelete);
            setFilteredAppointments(prev =>
              prev.filter(appt => appt.id !== appointmentToDelete)
            );
            setDeleteConfirmVisible(false);
          }
        }}
      />
    </div>
  );
};

export default DoctorAppointmentsTable;