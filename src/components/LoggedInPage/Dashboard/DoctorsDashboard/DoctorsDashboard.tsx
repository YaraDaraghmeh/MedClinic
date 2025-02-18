import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import StatisticsCards from '../DoctorsDashboard/StaticsCards';
import PieChartComponent from './PieChartComponent';
import { getAppointmentsByDoctor } from '../../../../services/appointmentService';
import { Appointment, User } from '../../../../Types';
import LineChartComponent from './BarChartComponent';
import TodaysAppointments from './TodaysAppointments';
import { useAppointmentsContext } from '../../../../hooks/AppointmentContext';

type ChartData = {
  day: string;
  appointments: number;
}[];

type StatusData = {
  name: string;
  value: number;
}[];

const DoctorDashboard: React.FC = () => {
  const [appointmentData, setAppointmentData] = useState<ChartData>([]);
  const [statusData, setStatusData] = useState<StatusData>([]);
  const [user, setUser] = useState<User | null>(null);
const {appointments}= useAppointmentsContext();
  // Single useEffect to handle both user and appointment data fetching
  useEffect(() => {
    const fetchData = async () => {
      // Fetch user from session storage
      const userFromSession = sessionStorage.getItem('user');
      if (userFromSession) {
        const parsedUser = JSON.parse(userFromSession);
        setUser(parsedUser);

        // Fetch appointments only if user email is available
        if (parsedUser.email?.stringValue) {
          try {
            
           

            // Process and set appointment data
            const processedAppointmentsPerDay = processAppointmentsPerDay(appointments);
            const processedAppointmentStatus = processAppointmentStatus(appointments);

            setAppointmentData(processedAppointmentsPerDay);
            setStatusData(processedAppointmentStatus);
          } catch (error) {
            console.error("Error fetching appointments:", error);
            setAppointmentData([]);
            setStatusData([]);
          }
        } else {
          console.error("User email is missing or undefined");
        }
      } else {
        console.error("User not found in session storage");
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  const processAppointmentsPerDay = (appointments: Appointment[]): ChartData => {
    const groupedData: Record<string, number> = {};

    appointments.forEach((appointment) => {
      const rawDate = appointment.appointmentDate;
      if (rawDate && rawDate) {
        const formattedDate = rawDate.slice(0, 5); // Extract "DD-MM"
        groupedData[formattedDate] = (groupedData[formattedDate] || 0) + 1;
      }
    });

    const chartData = Object.entries(groupedData).map(([day, count]) => ({
      day,
      appointments: count,
    }));
    return chartData;
  };

  const processAppointmentStatus = (appointments: Appointment[]): StatusData => {
    const statusCounts: Record<string, number> = {
      pending: 0,
      confirmed: 0,
      completed: 0,
    };

    appointments.forEach((appointment) => {
      const status = appointment.status?.toLowerCase();
      if (status && statusCounts.hasOwnProperty(status)) {
        statusCounts[status]++;
      }
    });

    const statusArr = Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value,
    }));
    return statusArr;
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <StatisticsCards 
        total={appointmentData.reduce((sum, day) => sum + day.appointments, 0)}
        pending={statusData.find(s => s.name === 'pending')?.value || 0}
        confirmed={statusData.find(s => s.name === 'confirmed')?.value || 0}
      />

      <Box sx={{ display: 'flex', gap: '20px', mt: 4, flexDirection: 'row' }}>
        <Box sx={{ flex: 1 }}>
          <LineChartComponent data={appointmentData} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <PieChartComponent data={statusData} colors={['#52c41a', '#faad14', '#f5222d']} />
        </Box>
      </Box>

      {/* Add TodaysAppointments component */}
      <Box sx={{ mt: 4 }}>
        <TodaysAppointments  />
      </Box>
    </Box>
  );
};

export default DoctorDashboard;