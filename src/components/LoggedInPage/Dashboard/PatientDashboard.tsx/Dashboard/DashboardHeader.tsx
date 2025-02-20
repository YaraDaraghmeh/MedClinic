import { motion } from "framer-motion";
import { HeartPulse } from 'lucide-react';
import { User } from "../../../../../Types";


const DashboardHeader = ({ user, appointmentCount }: { 
  user: User, 
  appointmentCount: number 
}) => (
  <div className="dashboard-header">
    <motion.div
      initial={{ x: -20 }}
      animate={{ x: 0 }}
      className="profile-section"
    >
      <img 
        src={user.imageUrl || '/default-avatar.png'} 
        alt="Profile"
        className="profile-image"
      />
      <div>
        <h1 className="welcome-heading">
          Welcome back, {user.name.split(' ')[0]}!
        </h1>
        <p className="welcome-subtext">Your health journey matters</p>
      </div>
    </motion.div>
    <div className="total-appointments">
      <HeartPulse className="heart-icon" size={24} />
      <div>
        <p className="total-label">Total Appointments</p>
        <p className="total-value">{appointmentCount}</p>
      </div>
    </div>
  </div>
);
export default DashboardHeader;