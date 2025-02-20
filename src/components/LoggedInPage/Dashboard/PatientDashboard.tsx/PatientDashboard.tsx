import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";
import { HeartPulse, CalendarCheck, Stethoscope, Star,ArrowLeft, ArrowRight } from 'lucide-react';
import { useAppointmentsContext } from "../../../../hooks/AppointmentContext";
import { useFeedback } from "../../../../hooks/FeedbackContext";
import { useLoggedInUser } from "../../../../hooks/LoggedinUserContext";
import { Appointment, Feedback } from "../../../../Types";
import "./PatientDashboared.css";
import { Link } from "react-router-dom";

const PatientDashboard: React.FC = () => {
  const { appointments, getAppointmentsByPatient } = useAppointmentsContext();
  const { feedbacks, submitFeedback } = useFeedback();
  const { loggedInUser } = useLoggedInUser();
  
  const [patientAppointments, setPatientAppointments] = useState<Appointment[]>([]);
  const [newFeedback, setNewFeedback] = useState({ message: '', rating: 5 });
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      const patientApps = getAppointmentsByPatient(loggedInUser.email);
      setPatientAppointments(patientApps);
    }
  }, [loggedInUser, appointments]);

  const getAppointmentStatusCounts = () => {
    const counts = { pending: 0, confirmed: 0, completed: 0, canceled: 0 };
    patientAppointments.forEach(app => counts[app.status] += 1);
    return [
      { name: 'Pending', value: counts.pending },
      { name: 'Confirmed', value: counts.confirmed },
      { name: 'Completed', value: counts.completed },
      { name: 'Canceled', value: counts.canceled },
    ];
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loggedInUser) {
      await submitFeedback({
        userEmail: loggedInUser.email,
        message: newFeedback.message,
        rating: newFeedback.rating,
      });
      setNewFeedback({ message: '', rating: 5 });
      setShowFeedbackModal(false);
    }
  };

  if (!loggedInUser) return <div className="text-center py-8">Loading dashboard...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="patient-dashboard"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="dashboard-header">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="profile-section"
          >
            <img 
              src={loggedInUser.imageUrl || '/default-avatar.png'} 
              alt="Profile"
              className="profile-image"
            />
            <div>
              <h1 className="welcome-heading">
                Welcome back, {loggedInUser.name.split(' ')[0]}!
              </h1>
              <p className="welcome-subtext">Your health journey matters</p>
            </div>
          </motion.div>
          <div className="total-appointments">
            <HeartPulse className="heart-icon" size={24} />
            <div>
              <p className="total-label">Total Appointments</p>
              <p className="total-value">{patientAppointments.length}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <motion.div whileHover={{ scale: 1.05 }} className="stat-card">
            <CalendarCheck className="text-blue-600" size={32} />
            <div>
              <h3>{patientAppointments.filter(a => a.status === 'confirmed').length}</h3>
              <p>Upcoming Appointments</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="stat-card">
            <Stethoscope className="text-green-600" size={32} />
            <div>
              <h3>{[...new Set(patientAppointments.map(a => a.doctorEmail))].length}</h3>
              <p>Different Doctors Visited</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="stat-card">
            <Star className="text-yellow-500" size={32} />
            <div>
              <h3>{feedbacks.filter(f => f.userEmail === loggedInUser.email).length}</h3>
              <p>Feedbacks Submitted</p>
            </div>
          </motion.div>
        </div>

        {/* Appointments Chart */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="chart-container"
        >
          <h2>Appointments Overview</h2>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getAppointmentStatusCounts()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Upcoming Appointments */}
          <motion.div 
    className="appointments-list"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
>
    <div className="section-header">
        <div className="arrow-container">
            {patientAppointments.some(a => ['pending', 'confirmed'].includes(a.status)) && (
                <ArrowLeft className="arrow-icon inactive-arrow" size={24} />
            )}
            <h2>Upcoming Appointments</h2>
            {patientAppointments.some(a => ['pending', 'confirmed'].includes(a.status)) && (
                <ArrowRight className="arrow-icon inactive-arrow" size={24} />
            )}
        </div>
    </div>
    <div className="appointments-container">
        {patientAppointments.some(a => ['pending', 'confirmed'].includes(a.status)) ? (
            patientAppointments
                .filter(a => ['pending', 'confirmed'].includes(a.status))
                .slice(0, 3)
                .map((appointment) => (
                    <motion.div
                        key={appointment.id}
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        className="appointment-item"
                    >
                        <div>
                            <p className="appointment-date">
                                {appointment.appointmentDate}
                            </p>
                            <p className="appointment-reason">{appointment.reason}</p>
                        </div>
                        <span className={`status-badge ${appointment.status}`}>
                            {appointment.status}
                        </span>
                    </motion.div>
                ))
        ) : (
          <div className="no-appointments">
          <i className="!text-gray-700 !block mb-3">you have no upcoming appointments</i>
          <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
          <Link to="/make-appointment" className="add-appointment-button">
          Make an Appointment now!🚑
      </Link></motion.div></div>
       )}
    </div>
</motion.div>

         
          <motion.div 
    className="feedback-section"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
>
    <motion.h2 
        className="feedback-title"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
    >
        💬 Share Your Thoughts!
    </motion.h2>

    <motion.p 
        className="feedback-message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
    >
        We love hearing from you! Your feedback helps us improve and make things even better.  
    </motion.p>
    <button
    onClick={() => setShowFeedbackModal(true)}
    className="feedback-button border text-white transition-all duration-300 ease-in-out hover:bg-blue-700 hover:border-blue-700 hover:shadow-md"
>
    🚀 Give Feedback
</button>





</motion.div>
        </div>

        {/* Feedback Modal */}
        {showFeedbackModal && (
          <motion.div
            className="feedback-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="feedback-content"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <h2>Share Your Feedback</h2>
              <form onSubmit={handleFeedbackSubmit} className="feedback-form">
                <div className="rating-section">
                  <label>Rating</label>
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewFeedback(prev => ({
                          ...prev,
                          rating: star
                        }))}
                        className={`star ${star <= newFeedback.rating ? 'active' : ''}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div className="message-section">
                  <label>Message</label>
                  <textarea
                    value={newFeedback.message}
                    onChange={(e) => setNewFeedback(prev => ({
                      ...prev,
                      message: e.target.value
                    }))}
                    className="feedback-textarea"
                    rows={3}
                  />
                </div>
                <div className="button-group">
                  
                  <button
                    type="button"
                    
                    onClick={() => setShowFeedbackModal(false)}
                    className="cancel-button !border-1 !border-gray-300"
                  >
                    Cancel
                  </button><button type="submit" className="submit-button">
                    Submit Feedback
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PatientDashboard;