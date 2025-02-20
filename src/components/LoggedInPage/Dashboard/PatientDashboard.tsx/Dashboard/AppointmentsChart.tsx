import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";

interface Appointment {
  status: 'pending' | 'confirmed' | 'completed' | 'canceled';
}

interface ChartData {
  name: string;
  value: number;
}

const AppointmentsChart = ({ appointments }: { appointments: Appointment[] }) => {
  const getStatusCounts = (): ChartData[] => {
    const counts = { 
      pending: 0, 
      confirmed: 0, 
      completed: 0, 
      canceled: 0 
    };
    
    appointments.forEach(app => {
      const status = app.status as keyof typeof counts;
      counts[status] += 1;
    });

    return [
      { name: 'Pending', value: counts.pending },
      { name: 'Confirmed', value: counts.confirmed },
      { name: 'Completed', value: counts.completed },
      { name: 'Canceled', value: counts.canceled },
    ];
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="chart-container"
    >
      <h2>Appointments Overview</h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getStatusCounts()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default AppointmentsChart;