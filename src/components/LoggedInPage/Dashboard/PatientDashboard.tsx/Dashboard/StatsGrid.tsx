import { motion } from "framer-motion";
import { CalendarCheck, Stethoscope, Star } from 'lucide-react';

const StatCard = ({ icon: Icon, value, label, color }: {
  icon: React.ComponentType<any>,
  value: number,
  label: string,
  color: string
}) => (
  <motion.div whileHover={{ scale: 1.05 }} className="stat-card">
    <Icon className={`text-${color}`} size={32} />
    <div>
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  </motion.div>
);

const StatsGrid = ({ appointments, feedbacks, loggedInUser }: {
  appointments: any[],
  feedbacks: any[],
  loggedInUser: any
}) => (
  <div className="stats-grid">
    <StatCard
      icon={CalendarCheck}
      value={appointments.filter(a => a.status === 'confirmed').length}
      label="Upcoming Appointments"
      color="blue-600"
    />
    <StatCard
      icon={Stethoscope}
      value={[...new Set(appointments.map(a => a.doctorEmail))].length}
      label="Different Doctors Visited"
      color="green-600"
    />
    <StatCard
      icon={Star}
      value={feedbacks.filter(f => f.userEmail === loggedInUser.email).length}
      label="Feedbacks Submitted"
      color="yellow-500"
    />
  </div>
);
export default StatsGrid;