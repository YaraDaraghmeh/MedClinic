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
  CircularProgress,
  Box
} from '@mui/material';
import { User, Appointment } from '../../../../Types';
import { getAppointmentsByDoctor } from '../../../../services/appointmentService';
import { getUserByEmail } from '../../../../services/userService';
import { useUserContext } from '../../../../hooks/UserContext';

type PatientData = {
  name: string;
  email: string;
  gender: string;
  age: number;
  totalAppointments: number;
  upcoming: number;
  completed: number;
};

const calculateAge = (dateOfBirth: string): number => {
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
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
const {users} = useUserContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        
        if (!doctor?.email) {
          throw new Error('Doctor email not found');
        }

        // Get all appointments for this doctor
        const appointments: Appointment[] = await getAppointmentsByDoctor(doctor.email);
        
        // Get unique patient emails
        const patientEmails = Array.from(
          new Set(
            appointments
              .map(a => a.patientEmail?.stringValue)
              .filter(Boolean) as string[]
          )
        );

        // Fetch patient data and aggregate appointments
        const patientsData = await Promise.all(
          patientEmails.map(async (email) => {
            try {
              const patient = await getUserByEmail(users,email);
              const patientAppointments = appointments.filter(
                a => a.patientEmail?.stringValue === email
              );

              return {
                name: patient.name || 'Unknown',
                email,
                gender: patient.gender || 'N/A',
                age: calculateAge(patient.dateOfBirth || ''),
                totalAppointments: patientAppointments.length,
                upcoming: patientAppointments.filter(a => 
                  ['pending', 'confirmed'].includes(a.status?.stringValue || '')
                ).length,
                completed: patientAppointments.filter(a => 
                  a.status?.stringValue === 'completed'
                ).length
              };
            } catch (error) {
              console.error(`Error fetching patient ${email}:`, error);
              return null;
            }
          })
        );

        setPatients(patientsData.filter(Boolean) as PatientData[]);
      } catch (error) {
        console.error('Failed to fetch patient data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load patient data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [doctor]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 2, p: 2 }}>
        Error: {error}
      </Typography>
    );
  }

  if (patients.length === 0) {
    return (
      <Typography variant="body1" sx={{ p: 2 }}>
        No patients found for this doctor
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 4, boxShadow: 3 }}>
      <Typography variant="h6" sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
        Patients of Dr. {doctor.name}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Total Appointments</TableCell>
            <TableCell>Upcoming</TableCell>
            <TableCell>Completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.email}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.totalAppointments}</TableCell>
              <TableCell>{patient.upcoming}</TableCell>
              <TableCell>{patient.completed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PatientsTable;