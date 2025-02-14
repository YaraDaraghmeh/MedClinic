import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAppointmentsByPatient } from "../../services/appointmentService";
import { AppointmentStatus } from "../../types/appointment.types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Appointment.css";

interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  dateTime: Date | null; 
  symptoms: string;
  status: AppointmentStatus;
  notes: string;
  patientName: string;
  patientContact: string;
  patientAge: number;
  patientGender: string;
}  

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = sessionStorage.getItem("user");
  const patientEmail = user ? JSON.parse(user).email.stringValue : "";

  useEffect(() => {
    if (!patientEmail) {
      toast.error("No patient email found. Please log in.");
      navigate("/");
      return;
    }
  
    const fetchAppointments = async () => {
      try {
        const fetchedAppointments = await getAppointmentsByPatient(patientEmail);
        console.log("Fetched Appointments (Raw):", fetchedAppointments);
  
        if (!Array.isArray(fetchedAppointments)) {
          throw new Error("Invalid data format");
        }
  
        const formattedAppointments: Appointment[] = fetchedAppointments.map((appointment: any) => {
          const date = appointment.appointmentDate?.stringValue;
          const time = appointment.appointmentTime?.stringValue;
  
          let dateTime: Date | null = null;
          if (date && time) {
            const combinedDateTime = `${date} ${time}`;
            if (!isNaN(new Date(combinedDateTime).getTime())) {
              dateTime = new Date(combinedDateTime);
            }
          }
  
          return {
            id: appointment.id?.stringValue || "",
            patientId: appointment.patientId?.stringValue || "",
            doctorId: appointment.doctorId?.stringValue || "Not Assigned",
            dateTime,
            symptoms: appointment.reason?.stringValue || "No details provided",
            status: (appointment.status?.stringValue as AppointmentStatus) || "Pending",
            notes: appointment.notes?.stringValue || "",
            patientName: appointment.patientName?.stringValue || "",
            patientContact: appointment.patientContact?.stringValue || "",
            patientAge: Number(appointment.patientAge?.integerValue) || 0,
            patientGender: appointment.patientGender?.stringValue || "",
          };
        });
  
        setAppointments(formattedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to fetch appointments. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchAppointments();
  }, [patientEmail, navigate]);

  return (
    <div className="appointments-container">
      <h2>My Appointments</h2>
      <ToastContainer position='bottom-left' />
      {loading ? (
        <p>Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="appointments-list">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <p className="doc">Doctor: {appointment.doctorId}</p>
              <p className="date">
                Date: {appointment.dateTime ? appointment.dateTime.toLocaleDateString() : "Not Available"}
              </p>
              <p className="date">
                Time: {appointment.dateTime ? appointment.dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Not Available"}
              </p>
              <p className="symptoms">Symptoms: {appointment.symptoms}</p>
              <p className={`status ${appointment.status.toLowerCase()}`}>Status: {appointment.status}</p>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => navigate("/")} className="back-btn">Back to Home</button>
    </div>
  );
};

export default AppointmentsPage;