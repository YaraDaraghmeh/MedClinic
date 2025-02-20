import React, { useEffect, useState } from 'react';
import { User, Appointment } from '../../../../Types';
import { getAppointmentsByDoctor } from '../../../../services/appointmentService';
import { getUserByEmail } from '../../../../services/userService';
import { useUserContext } from '../../../../hooks/UserContext';
import { useAppointmentsContext } from '../../../../hooks/AppointmentContext';
import { CircularProgress, Box, Typography } from '@mui/material';
import { FaUser } from 'react-icons/fa'; // For the profile icon

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
  const { appointments } = useAppointmentsContext();
  const { users } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        if (!doctor?.email) {
          throw new Error('Doctor email not found');
        }

        // Get unique patient emails
        const patientEmails = Array.from(
          new Set(
            appointments
              .map((a) => a.patientEmail)
              .filter(Boolean) as string[]
          )
        );

        // Fetch patient data and aggregate appointments
        const patientsData = await Promise.all(
          patientEmails.map(async (email) => {
            try {
              const patient = await getUserByEmail(users, email);
              const patientAppointments = appointments.filter(
                (a) => a.patientEmail === email
              );

              return {
                name: patient.name || 'Unknown',
                email,
                gender: patient.gender || 'N/A',
                age: calculateAge(patient.dateOfBirth || ''),
                totalAppointments: patientAppointments.length,
                upcoming: patientAppointments.filter((a) =>
                  ['pending', 'confirmed'].includes(a.status || '')
                ).length,
                completed: patientAppointments.filter(
                  (a) => a.status === 'completed'
                ).length,
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
    <div className="mx-2 !my-8 shadow-lg !rounded-lg !bg-white min-h-[400px]">
      <div className="bg-blue-400 p-4 !rounded-t-lg">
        <Typography variant="h6" className="text-white font-semibold">
          Patients of Dr. {doctor.name}
        </Typography>
      </div>
      <table className="  !border-collapse">
        <thead className="bg-gray-100 !text-gray-600">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Gender</th>
            <th className="p-2 text-left">Age</th>
            <th className="p-2 text-left">Total Appointments</th>
            <th className="p-2 text-left">Upcoming</th>
            <th className="p-2 text-left">Completed</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr
              key={patient.email}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => window.location.href = `/user-profile?email=${patient.email}`}
            >
              <td className="p-2 flex items-center">
                <FaUser className="mr-2" /> {patient.name}
              </td>
              <td className="p-2">{patient.email}</td>
              <td className="p-2">{patient.gender}</td>
              <td className="p-2">{patient.age}</td>
              <td className="p-2">{patient.totalAppointments}</td>
              <td className="p-2">{patient.upcoming}</td>
              <td className="p-2">{patient.completed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsTable;
