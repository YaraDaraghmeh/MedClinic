import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAppointmentsByPatient } from "../../services/appointmentService";
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

        // console.log("=== Debug: Fetched Appointments ===", fetchedAppointments);
        // console.log("=== Debug: Fetched Doctors ===", doctorsData);

        const formattedAppointments: Appointment[] = fetchedAppointments.map((appointment: any) => {
          // Parse date
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
    // if (!doctorId || doctorId === "unassigned") return "Not Assigned";

   
    const doctor = doctors.find(d => d.id === doctorId);
// console.log(doctorId)
    // console.log("=== Doctor Match ===", {
    //   doctorId,
    //   doctor: doctor ? doctor.name?.stringValue : "Not Found"
    // });
     
    console.log(doctor)
    if (!doctor) return "Unknown Doctor";

    return doctor.name?.stringValue || "Unnamed Doctor";
  };
 

  return (
    <div className="appointments-container">
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
              <p className="doc">
                Doctor: {getDoctorName(appointment.doctorId)}
                <br />
                {/* <small>ID: {appointment.doctorId || "N/A"}</small> */}
              </p>
              
              <p className="date">
                Date: {appointment.dateTime?.toLocaleDateString('en-GB') || "N/A"}
              </p>
              
              <p className="date">
                Time: {appointment.dateTime?.toLocaleTimeString('en-US', { 
                  hour: 'numeric', 
                  minute: '2-digit',
                  hour12: true 
                }) || "N/A"}
              </p>
              
              <p className="symptoms">{appointment.symptoms}</p>
              
              <p className={`status ${appointment.status.toLowerCase()}`}>
                {appointment.status}
              </p>
            </div>
          ))}
        </div>
      )}
      
      <button onClick={() => navigate("/")} className="back-btn">
        Back to Home
      </button>
    </div>
  );
};

export default AppointmentsPage;
