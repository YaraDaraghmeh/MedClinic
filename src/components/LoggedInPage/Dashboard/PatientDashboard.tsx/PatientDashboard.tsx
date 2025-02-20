// PatientDashboard.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppointmentsContext } from "../../../../hooks/AppointmentContext";
import { useFeedback } from "../../../../hooks/FeedbackContext";
import { useLoggedInUser } from "../../../../hooks/LoggedinUserContext";
import { Appointment } from "../../../../Types";
import "./PatientDashboard.css";
import AppointmentsChart from "./Dashboard/AppointmentsChart";
import DashboardHeader from "./Dashboard/DashboardHeader";
import FeedbackModal from "./Dashboard/FeedbackModal";
import FeedbackSection from "./Dashboard/FeedbackSection";
import StatsGrid from "./Dashboard/StatsGrid";
import UpcomingAppointments from "./Dashboard/UpcomingAppointments";


const PatientDashboard: React.FC = () => {
  const { appointments, getAppointmentsByPatient } = useAppointmentsContext();
  const { feedbacks, submitFeedback } = useFeedback();
  const { loggedInUser } = useLoggedInUser();
  
  const [patientAppointments, setPatientAppointments] = useState<Appointment[]>([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [newFeedback, setNewFeedback] = useState({ message: '', rating: 5 });

  useEffect(() => {
    if (loggedInUser) {
      const patientApps = getAppointmentsByPatient(loggedInUser.email);
      setPatientAppointments(patientApps);
    }
  }, [loggedInUser, appointments]);

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
        <DashboardHeader 
          user={loggedInUser} 
          appointmentCount={patientAppointments.length} 
        />

        <StatsGrid
          appointments={patientAppointments}
          feedbacks={feedbacks}
          loggedInUser={loggedInUser}
        />

        <AppointmentsChart appointments={patientAppointments} />

        <div className="content-grid">
          <UpcomingAppointments 
            appointments={patientAppointments} 
            loggedInUser={loggedInUser}
          />

          <FeedbackSection onOpenModal={() => setShowFeedbackModal(true)} />
        </div>

        <FeedbackModal
          isOpen={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
          onSubmit={handleFeedbackSubmit}
          feedback={newFeedback}
          setFeedback={setNewFeedback}
        />
      </div>
    </motion.div>
  );
};

export default PatientDashboard;