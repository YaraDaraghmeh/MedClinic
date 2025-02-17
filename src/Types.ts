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
  doctorEmail: { stringValue: string };
  patientEmail: { stringValue: string };
  appointmentDate: { stringValue: string };
  appointmentTime: { stringValue: string };
  reason: { stringValue: string };
  status: { stringValue: "pending" | "confirmed" | "completed" | "canceled" };
}
export interface Feedback {
  id: string;
  userEmail: string;
  message: { stringValue: string };
  rating: { integerValue: number };
  timestamp: { timestampValue: string };
}
