import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Container,
} from "@mui/material";
import { getUserByEmail } from "../../../../services/userService";
import { useUserContext } from "../../../../hooks/UserContext";
import { useAppointmentsContext } from "../../../../hooks/AppointmentContext";
import { FaUser } from "react-icons/fa";
import { User } from "../../../../Types";

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
  const [patients, setPatients] = useState<Array<{
    name: string;
    email: string;
    gender: string;
    age: number;
    totalAppointments: number;
    upcoming: number;
    completed: number;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { appointments } = useAppointmentsContext();
  const { users } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        if (!doctor?.email) {
          throw new Error("Doctor email not found");
        }

        const patientEmails = Array.from(new Set(appointments.map(a => a.patientEmail).filter(Boolean)));

        const patientsData = await Promise.all(
          patientEmails.map(async (email) => {
            try {
              const patient = await getUserByEmail(users, email);
              const patientAppointments = appointments.filter(a => a.patientEmail === email);

              return {
                name: patient.name || "Unknown",
                email,
                gender: patient.gender || "N/A",
                age: calculateAge(patient.dateOfBirth || ""),
                totalAppointments: patientAppointments.length,
                upcoming: patientAppointments.filter(a => ["pending", "confirmed"].includes(a.status || "")).length,
                completed: patientAppointments.filter(a => a.status === "completed").length,
              };
            } catch (error) {
              console.error(`Error fetching patient ${email}:`, error);
              return null;
            }
          })
        );

        setPatients(patientsData.filter((patient): patient is NonNullable<typeof patient> => patient !== null));
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to load patient data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [doctor, appointments, users]);

  return (
    <Container maxWidth="lg" sx={{ paddingBottom: "150px", marginBottom: "150px" }}>
      <Paper sx={{ mt: 4, p: 2, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
          Patients of Dr. {doctor.name}
        </Typography>
        {loading ? (
          <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>Loading...</Typography>
        ) : error ? (
          <Typography color="error" sx={{ mt: 2, p: 2 }}>Error: {error}</Typography>
        ) : patients.length === 0 ? (
          <Typography variant="body1" sx={{ p: 2 }}>No patients found for this doctor</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
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
                  <TableRow
                    key={patient.email}
                    sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f0f0f0" } }}
                    onClick={() => window.location.href = `/user-profile?email=${patient.email}` }
                  >
                    <TableCell><FaUser className="mr-2" /> {patient.name}</TableCell>
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
        )}
      </Paper>
    </Container>
  );
};

export default PatientsTable;
