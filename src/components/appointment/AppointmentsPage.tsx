import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAppointmentsByPatient } from "../../services/appointmentService";
import { getDoctors } from "../../services/userService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Appointment.css";
import { useAppointmentsContext } from "../../hooks/AppointmentContext";
import { useUserContext } from "../../hooks/UserContext";
import { useLoggedInUser } from "../../hooks/LoggedinUserContext";
import { Appointment, User } from "../../Types";
import { AppointmentStatus } from "../../types/appointment.types";

const AppointmentsPage1: React.FC = () => {
  const [myAppointments, setMyAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { appointments } = useAppointmentsContext();
  const { users } = useUserContext();
  const navigate = useNavigate();
  const { deleteAppointment } = useAppointmentsContext();
  const { loggedInUser } = useLoggedInUser();

  useEffect(() => {
    if (!loggedInUser) {
      toast.error("No patient email found. Please log in.");
      return;
    }

    const fetchData = async () => {
      try {
        const [fetchedAppointments, doctorsData] = await Promise.all([
          getAppointmentsByPatient(appointments, loggedInUser.email),
          getDoctors(users),
        ]);

        const formattedAppointments: Appointment[] = fetchedAppointments.map((appointment: any) => {
          const dateParts = appointment.appointmentDate?.stringValue?.split("-") || [];
          const timeParts = appointment.appointmentTime?.stringValue?.split(":") || [];
          const dateTime =
            dateParts.length === 3 && timeParts.length === 2
              ? new Date(
                  parseInt(dateParts[2]), // Year
                  parseInt(dateParts[1]) - 1, // Month
                  parseInt(dateParts[0]), // Day
                  parseInt(timeParts[0]), // Hours
                  parseInt(timeParts[1]) // Minutes
                )
              : null;

          return {
            id: appointment.id,
            doctorId: appointment.doctorEmail?.stringValue || "unassigned",
            dateTime: dateTime,
            symptoms: appointment.reason?.stringValue || "No details",
            status: (appointment.status?.stringValue || "pending") as AppointmentStatus,
          };
        });

        setMyAppointments(formattedAppointments);
        setDoctors(doctorsData);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loggedInUser?.email, navigate, appointments, users]);

  const getDoctorName = (doctorId: string) => {
    const doctor = doctors.find((d) => d.email === doctorId);
    return doctor ? doctor.name || "Unnamed Doctor" : "Unknown Doctor";
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    try {
      const response = await deleteAppointment(appointmentId);
      if (response.success) {
        toast.success(response.message);
        setMyAppointments((prevAppointments) =>
          prevAppointments.filter((app) => app.id !== appointmentId)
        );
      }
    } catch (error) {
      toast.error("Failed to delete appointment");
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="appointments-container">
      <div className="patient-info-container">
        <div className="patient-info">
          <div className="img">
            <img
              src="https://demo.awaikenthemes.com/theme-medipro/wp-content/uploads/2024/05/hero-img-1.jpg"
              alt="not found"
            />
          </div>
          <div className="info">
            <h1>Hello, {loggedInUser?.email}</h1>
            <p className="patient-description">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Fisitis, num metodoctoral
              pariaturis sede ut aliquip ex ea commodo consequat. Aduurendus repsiduntis
              necessitatibus labore.
            </p>
          </div>
        </div>
        <div className="appointment-count">
          <h2>Total Appointments</h2>
          <p>{myAppointments.length}</p>
        </div>
      </div>

      <div className="allAppointments">
        <h2>My Appointments</h2>
        <ToastContainer position="bottom-left" />

        {loading ? (
          <p>Loading...</p>
        ) : myAppointments.length === 0 ? (
          <p>No appointments found</p>
        ) : (
          <div className="appointments-list">
            {myAppointments.map((appointment) => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-details">
                  <p className="doc">Doctor: {getDoctorName(appointment.doctorEmail)}</p>
                  <p className="date">
                    Date: {appointment.appointmentDate ? appointment.appointmentDate : "N/A"}
                  </p>
                  <p className="time">
                    Time: {appointment.appointmentTime ? appointment.appointmentTime : "N/A"}
                  </p>
                  <p className="symptoms">Symptoms: {appointment.reason}</p>
                  <p className={`status ${appointment.status.toLowerCase()}`}>
                    Status: {appointment.status}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteAppointment(appointment.id)}
                  className="delete-btn"
                >
                  Delete Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={() => navigate("/")} className="back-btn">
        Back to Home
      </button>
    </div>
  );
};

export default AppointmentsPage1;
