import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAppointment, getAppointmentsByPatient } from "../../services/appointmentService";
import { getDoctors } from "../../services/userService";
import { Appointment, AppointmentStatus } from "../../types/appointment.types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Appointment.css";

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
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

    const fetchData = async () => {
      try {
        const [fetchedAppointments, doctorsData] = await Promise.all([
          getAppointmentsByPatient(patientEmail),
          getDoctors()
        ]);

        const formattedAppointments: Appointment[] = fetchedAppointments.map((appointment: any) => {
         
          const dateParts = appointment.appointmentDate?.stringValue?.split("-") || [];
          const timeParts = appointment.appointmentTime?.stringValue?.split(":") || [];
         
          
          const dateTime = dateParts.length === 3 && timeParts.length === 2 
            ? new Date(
                parseInt(dateParts[2]),  // Year
                parseInt(dateParts[1]) - 1, // Month
                parseInt(dateParts[0]),  // Day
                parseInt(timeParts[0]),  // Hours
                parseInt(timeParts[1])   // Minutes
              )
            : null;

          return {
            id: appointment.id,
            doctorId: appointment.doctorEmail?.stringValue || "unassigned", // Default value
            dateTime: dateTime,
            symptoms: appointment.reason?.stringValue || "No details",
            status: (appointment.status?.stringValue || "pending") as AppointmentStatus,
          };
        });

        setAppointments(formattedAppointments);
        setDoctors(doctorsData);
        console.log(appointments)
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [patientEmail, navigate]);

 
   const getDoctorName = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);

    console.log(doctor)
    if (!doctor) return "Unknown Doctor";

    return doctor.name?.stringValue || "Unnamed Doctor";
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    try {
      const response = await deleteAppointment(appointmentId);
      if (response.success) {
        toast.success(response.message);
       
        setAppointments(prevAppointments => prevAppointments.filter(app => app.id !== appointmentId));
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
        <img src="https://demo.awaikenthemes.com/theme-medipro/wp-content/uploads/2024/05/hero-img-1.jpg" alt="not found" />
      </div>

      <div className="info">
      <h1>Hello, {patientEmail}</h1>
      <p className="patient-description">
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Fisitis,
        num metodoctoral pariaturis sede ut aliquip ex ea commodo consequat.
        Aduurendus repsiduntis necessitatibus labore.
      </p>
      </div>

    </div>
    <div className="appointment-count">
      <h2>Total Appointments</h2>
      <p>{appointments.length}</p>
    </div>
  </div>

 <div className="allAppointments">
  <h2>My Appointments</h2>
  <ToastContainer position='bottom-left' />
  
  {loading ? (
    <p>Loading...</p>
  ) : appointments.length === 0 ? (
    <p>No appointments found</p>
  ) : (
    <div className="appointments-list">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="appointment-card">
          <div className="appointment-details">
            <p className="doc">Doctor: {getDoctorName(appointment.doctorId)}</p>
            <p className="date">Date: {appointment.dateTime?.toLocaleDateString('en-GB') || "N/A"}</p>
            <p className="time">Time: {appointment.dateTime?.toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            }) || "N/A"}</p>
            <p className="symptoms">Symptoms: {appointment.symptoms}</p>
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

export default AppointmentsPage;
