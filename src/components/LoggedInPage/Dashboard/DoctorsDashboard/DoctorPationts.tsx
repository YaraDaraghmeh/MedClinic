import React, { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography,
  CircularProgress
} from '@mui/material';
import { User, Appointment } from '../../../../Types';
import { getAppointmentsByDoctor } from '../../../../services/appointmentService';
import { getUserByEmail } from '../../../../services/userService';

type PatientData = {
  patient: User;
  appointmentCount: number;
  upcomingAppointments: number;
  completedAppointments: number;
  age: number;
};

const calculateAge = (dateOfBirth: string) => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const PatientsTable = ({ doctor }: { doctor: User }) => {
  const [patientsData, setPatientsData] = useState<PatientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        setError('');
        
        if (!doctor?.email?.stringValue) return;

        const appointments: Appointment[] = await getAppointmentsByDoctor(doctor.email.stringValue);
        
        const patientMap = new Map<string, PatientData>();

        for (const appointment of appointments) {
          const patientEmail = appointment.patientEmail?.stringValue;
          if (!patientEmail) continue;

          if (!patientMap.has(patientEmail)) {
            try {
              const patient = await getUserByEmail(patientEmail);
              patientMap.set(patientEmail, {
                patient,
                appointmentCount: 0,
                upcomingAppointments: 0,
                completedAppointments: 0,
                age: calculateAge(patient.dateOfBirth?.stringValue || '')
              });
            } catch (error) {
              console.error(`Error fetching patient ${patientEmail}:`, error);
              continue;
            }
          }

          // Update appointment counts
          const patientData = patientMap.get(patientEmail)!;
          patientData.appointmentCount++;
          
          const status = appointment.status?.stringValue;
          if (status === 'completed') {
            patientData.completedAppointments++;
          } else if (status === 'pending' || status === 'confirmed') {
            patientData.upcomingAppointments++;
          }
        }

        setPatientsData(Array.from(patientMap.values()));
      } catch (error) {
        console.error("Failed to fetch patient data:", error);
        setError('Failed to load patient data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [doctor]);

  if (loading) {
    return <CircularProgress sx={{ mt: 4 }} />;
  }

  if (error) {
    return <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>;
  }

  if (patientsData.length === 0) {
    return <Typography variant="body1" sx={{ p: 2 }}>No patients found</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 4, boxShadow: 3 }}>
      <Typography variant="h6" sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
        Patient List - Dr. {doctor.name?.stringValue}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Total Appointments</TableCell>
            <TableCell>Upcoming</TableCell>
            <TableCell>Completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patientsData.map((patientData) => (
            <TableRow key={patientData.patient.email.stringValue}>
              <TableCell>
                {patientData.patient.name?.stringValue || 'N/A'}
              </TableCell>
              <TableCell>{patientData.patient.email.stringValue}</TableCell>
              <TableCell>{patientData.patient.gender?.stringValue || 'N/A'}</TableCell>
              <TableCell>{patientData.age}</TableCell>
              <TableCell>{patientData.appointmentCount}</TableCell>
              <TableCell>{patientData.upcomingAppointments}</TableCell>
              <TableCell>{patientData.completedAppointments}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PatientsTable;