

export enum AppointmentStatus {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Completed = "Completed",
}

export type Appointment = {
  patientEmail: any;
  id: string;
  patientId: string;
  doctorId: string;
  dateTime: Date;
  symptoms: string;
  status: AppointmentStatus;
  notes?: string;
  patientName: string;
  patientContact: string;
  patientAge: number;
  patientGender: string;
};