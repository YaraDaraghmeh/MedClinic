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
  note?: string;
  readNote?:boolean;
  documents?: string[];
}export interface Feedback {
  id: string;
  userEmail:  string ;
  message: string ;
  rating:number ;
  timestamp: string ;
}

