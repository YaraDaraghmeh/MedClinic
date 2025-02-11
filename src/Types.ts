export interface User {
  email: { stringValue: string };
  name: { stringValue: string };
  dateOfBirth: { stringValue: string };
  password: { stringValue: string };
  role: { stringValue: string };
  gender: { stringValue: string };
  imageUrl?: { stringValue: string };
  specialization?: { stringValue: string };
}

export interface Appointment {
  id: string;
  patientEmail: { stringValue: string };
  appointmentDate: { stringValue: string };
  appointmentTime: { stringValue: string };
  status: { stringValue: string };
  notes?: { stringValue: string };
}
export interface ChartData {
  day: string;
  appointments: number;
}