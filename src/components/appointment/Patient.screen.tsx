
import AppointmentForm from "./FormAppSection";
import AppointmentHeader from "./AppointmentHeader";
import EmergencyContact from "./EmergencyContact";
import './Appointment.css';
import { useNavigate } from "react-router-dom";


const Appointment = () => {
  const navigate = useNavigate();
  return (
    <div className="appointment-container">
        
        <AppointmentHeader />
        <div className="appointment-content">
        <EmergencyContact />
        <AppointmentForm  />
      </div>
      <button 
  onClick={() => navigate("/appointments")} 
  className="view-appointments-btn"
>
  View My Appointments
</button>
        
    </div>
  );
};

export default Appointment;