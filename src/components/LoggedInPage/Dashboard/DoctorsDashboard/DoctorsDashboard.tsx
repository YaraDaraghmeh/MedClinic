import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import StatisticsCards from '../DoctorsDashboard/StaticsCards';
import BarChartComponent from './BarChartComponent';
import PieChartComponent from './PieChartComponent';
import { getAppointmentsByDoctor } from '../../../../services/appointmentService';
import { Appointment } from '../../../../Types';

type ChartData = {
  day: string;
  appointments: number;
}[];

type StatusData = {
  name: string;
  value: number;
}[];

interface DoctorDashboardProps {
  user: any;
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ user }) => {
  const [appointmentData, setAppointmentData] = useState<ChartData>([]);
  const [statusData, setStatusData] = useState<StatusData>([]);

  
  const processAppointmentsPerDay = (appointments: Appointment[]): ChartData => {
    const groupedData: Record<string, number> = {};

    appointments.forEach((appointment) => {
      const rawDate = appointment.appointmentDate;
      if (rawDate && rawDate.stringValue) {
        console.log("Processing date:", rawDate.stringValue);
        const formattedDate = rawDate.stringValue.slice(0, 5);
        groupedData[formattedDate] = (groupedData[formattedDate] || 0) + 1;
      }
    });

    const chartData = Object.entries(groupedData).map(([day, count]) => ({
      day,
      appointments: count,
    }));
    console.log("Processed Chart Data:", chartData);
    return chartData;
  };

  const processAppointmentStatus = (appointments: Appointment[]): StatusData => {
    const statusCounts: Record<string, number> = {
      pending: 0,
      confirmed: 0,
      completed: 0,
    };

    appointments.forEach((appointment) => {
      const status = appointment.status?.stringValue?.toLowerCase();
      console.log("Processing status:", status);
      if (status && statusCounts.hasOwnProperty(status)) {
        statusCounts[status]++;
      }
    });

    const statusArr = Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value,
    }));
    console.log("Processed Status Data:", statusArr);
    return statusArr;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.email) {
        console.error("User prop is missing or user.email is undefined");
        return;
      }
      try {
        const appointments: Appointment[] = await getAppointmentsByDoctor(user.email);
        console.log("Fetched Appointments:", appointments);
        if (appointments.length === 0) {
          console.warn("No appointments were returned from getAppointmentsByDoctor");
        }
        setAppointmentData(processAppointmentsPerDay(appointments));
        setStatusData(processAppointmentStatus(appointments));
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointmentData([]);
        setStatusData([]);
      }
    };

    fetchData();
  }, [user]);

  return (
    <Box sx={{ padding: '20px' }}>
      <StatisticsCards 
        total={appointmentData.reduce((sum, day) => sum + day.appointments, 0)}
        pending={statusData.find(s => s.name === 'pending')?.value || 0}
        confirmed={statusData.find(s => s.name === 'confirmed')?.value || 0}
      />

      <Box sx={{ display: 'flex', gap: '20px', mt: 4, flexDirection: 'row' }}>
        <Box sx={{ flex: 1 }}>
          <BarChartComponent data={appointmentData} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <PieChartComponent data={statusData} colors={['#52c41a', '#faad14', '#f5222d']} />
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorDashboard;
