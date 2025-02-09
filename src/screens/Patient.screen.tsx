
import AppointmentForm from "../components/appointment/FormAppSection";
import AppointmentHeader from "../components/appointment/AppointmentHeader";
import EmergencyContact from "../components/appointment/EmergencyContact";
import '../components/appointment/Appointment.css';


const Appointment = () => {
  return (
    <div className="appointment-container">
        
        <AppointmentHeader />
        <div className="appointment-content">
        <EmergencyContact />
        <AppointmentForm />
      </div>
      
      
    </div>
  );
};

export default Appointment;