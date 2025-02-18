export interface User {
  email:string;
  name:string;
  dateOfBirth:string;
  password:string;
  role: "doctor"|"patient"|"manager";
  gender: string;
  imageUrl?: string;
  specialization?:
  "Cardiology"|
  "Dermatology"|
  "Neurology"|
  "Pediatrics"|
  "Radiology"|  
  "Surgery"|
  "Oncology"|
  "Orthopedics"|
  "Psychiatry"|
  "Urology";
}

export interface Appointment {
  id: string;
  doctorEmail: string ;
  patientEmail:  string ;
  appointmentDate: string ;
  appointmentTime: string ;
  reason:  string ;
  status:  "pending" | "confirmed" | "completed" | "canceled" ;
}export interface Feedback {
  id: string;
  userEmail: { stringValue: string };
  message: { stringValue: string };
  rating: { doubleValue: number };
  timestamp: { stringValue: string };
}

