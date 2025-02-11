import { useState, useEffect } from "react";
import { getAppointmentsByDoctor } from "../../services/appointmentService";
import { Appointment } from "../../Types";
import AppointmentsControls from "./AppointmentsControls";
import AppointmentsList from "./AppointmentsList";
import DoctorDashboard from "./DoctorDashboard";

export default function DoctorPortal() {
  const [currentScreen, setCurrentScreen] = useState<"appointments" | "dashboard">("appointments");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const doctorEmail = "doctor@example.com"; // Replace with actual doctor email

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await getAppointmentsByDoctor(doctorEmail);
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load appointments");
        setLoading(false);
      }
    };
    loadAppointments();
  }, [doctorEmail]);

  const filteredAppointments = appointments
    .filter((appt) =>
      appt.patientEmail.stringValue.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "All" || appt.status.stringValue === statusFilter)
    )
    .sort((a, b) => {
      const dateA = new Date(a.appointmentDate.stringValue.split("-").reverse().join("-"));
      const dateB = new Date(b.appointmentDate.stringValue.split("-").reverse().join("-"));
      return dateA.getTime() - dateB.getTime();
    });

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      // Add API call to update status
      setAppointments((appts) =>
        appts.map((appt) =>
          appt.id === id ? { ...appt, status: { stringValue: newStatus } } : appt
        )
      );
    } catch (err) {
      setError("Failed to update appointment status");
    }
  };

  const handleNoteSave = async (id: string, note: string) => {
    try {
      // Add API call to update notes
      setAppointments((appts) =>
        appts.map((appt) =>
          appt.id === id ? { ...appt, notes: { stringValue: note } } : appt
        )
      );
    } catch (err) {
      setError("Failed to save note");
    }
  };

  if (loading) return <div>Loading appointments...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setCurrentScreen("appointments")}
          className={`px-4 py-2 rounded ${
            currentScreen === "appointments" ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          Appointments
        </button>
        <button
          onClick={() => setCurrentScreen("dashboard")}
          className={`px-4 py-2 rounded ${
            currentScreen === "dashboard" ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          Dashboard
        </button>
      </div>

      {currentScreen === "appointments" ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <AppointmentsControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          <AppointmentsList
            appointments={filteredAppointments}
            handleStatusChange={handleStatusChange}
            handleNoteSave={handleNoteSave}
          />
        </div>
      ) : (
        <DoctorDashboard doctorEmail={doctorEmail} />
      )}
    </div>
  );
}