import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";

const UpcomingAppointments = ({ appointments, loggedInUser }: {
  appointments: any[],
  loggedInUser: any
}) => {
  const hasUpcoming = appointments.some(a => ['pending', 'confirmed'].includes(a.status));

  return (
    <motion.div 
      className="appointments-list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="section-header">
        <div className="arrow-container">
          {hasUpcoming && <ArrowLeft className="arrow-icon inactive-arrow" size={24} />}
          <h2>Upcoming Appointments</h2>
          {hasUpcoming && <ArrowRight className="arrow-icon inactive-arrow" size={24} />}
        </div>
      </div>
      <div className="appointments-container">
        {hasUpcoming ? (
          appointments
            .filter(a => ['pending', 'confirmed'].includes(a.status))
            .slice(0, 3)
            .map(appointment => (
              <AppointmentItem key={appointment.id} appointment={appointment} />
            ))
        ) : (
          <NoAppointments />
        )}
      </div>
    </motion.div>
  );
};

const AppointmentItem = ({ appointment }: { appointment: any }) => (
  <motion.div
    initial={{ x: -20 }}
    animate={{ x: 0 }}
    className="appointment-item"
  >
    <div>
      <p className="appointment-date">{appointment.appointmentDate}</p>
      <p className="appointment-reason">{appointment.reason}</p>
    </div>
    <span className={`status-badge ${appointment.status}`}>
      {appointment.status}
    </span>
  </motion.div>
);

const NoAppointments = () => (
  <div className="no-appointments">
    <i className="!text-gray-700 !block mb-3">You have no upcoming appointments</i>
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    >
      <Link to="/make-appointment" className="add-appointment-button">
        Make an Appointment now!🚑
      </Link>
    </motion.div>
  </div>
);

export default UpcomingAppointments;