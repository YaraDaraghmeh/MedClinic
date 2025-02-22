import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";
import { useState } from "react"; 
import './upcomingAppointments.css';

const UpcomingAppointments = ({ appointments, loggedInUser }: {
  appointments: any[],
  loggedInUser: any
}) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current appointment index
  const hasUpcoming = appointments.some(a => ['pending', 'confirmed'].includes(a.status));

  // Filter upcoming appointments
  const upcomingAppointments = appointments.filter(a => ['pending', 'confirmed'].includes(a.status)).sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime());;

  // Handle next appointment
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % upcomingAppointments.length);
  };

  // Handle previous appointment
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? upcomingAppointments.length - 1 : prevIndex - 1
    );
  };

  return (
    <motion.div 
      className="appointments-list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="section-header">
        <div className="arrow-container">
          {hasUpcoming && (
            <ArrowLeft
              className="arrow-icon"
              size={24}
              onClick={handlePrevious} // Navigate to the previous appointment
            />
          )}
          <h2>Upcoming Appointments</h2>
          {hasUpcoming && (
            <ArrowRight
              className="arrow-icon"
              size={24}
              onClick={handleNext} // Navigate to the next appointment
            />
          )}
        </div>
      </div>
      <div className="appointments-container">
        {hasUpcoming ? (
          <motion.div
            key={upcomingAppointments[currentIndex].id} // Use key to trigger animation
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <AppointmentItem appointment={upcomingAppointments[currentIndex]} />
          </motion.div>
        ) : (
          <NoAppointments />
        )}
      </div>
    </motion.div>
  );
};

const AppointmentItem = ({ appointment }: { appointment: any }) => (
  <div className="appointment-item">
    <div>
      <p className="appointment-date">{appointment.appointmentDate}</p>
      <p className="appointment-reason">{appointment.reason}</p>
    </div>
    <span className={`status-badge ${appointment.status}`}>
      {appointment.status}
    </span>
  </div>
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