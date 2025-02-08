export interface User {
    specialization: any;
    id: string; name: { stringValue: string };
    email: { stringValue: string };
    age: { integerValue: number };
    password: { stringValue: string };
    role: { stringValue: string };
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
  