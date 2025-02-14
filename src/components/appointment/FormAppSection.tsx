import React, { useState, useEffect } from 'react';
import { getDoctors } from '../../services/userService'; 
import { createAppointment } from '../../services/appointmentService';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './Appointment.css';
import { calculateAge } from '../../functions';

interface IAppointmentForm {
  patientName: string;
  patientContact: string;
  patientAge: number;
  patientGender: string;
  date: string;
  time: string;
  symptoms: string;
  doctorId?: string;
  doctorEmail: string;
}

const INITIAL_STATE: IAppointmentForm = {
  patientName: '',
  patientContact: '',
  patientAge: 0,
  patientGender: '',
  date: '',
  time: '',
  symptoms: '',
  doctorId: '',
  doctorEmail: '',
};

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState<IAppointmentForm>(INITIAL_STATE);
  const [confirmation, setConfirmation] = useState(false);
  const [doctors, setDoctors] = useState<any[]>([]);

 

  // Fetch doctors when the component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsData = await getDoctors();
        setDoctors(doctorsData);
      } catch (error) {
        toast.error("Failed to fetch doctor list. Please try again later.");
      }
    };
    fetchDoctors();
    
    const user = sessionStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      console.log(userData);

      // Ensure the dateOfBirth is in the expected format
      const dob = userData.dateOfBirth.stringValue;
      //console.log(dob)
      const age = calculateAge(dob);
      //console.log(age);
      setFormData({
        ...formData,
        patientName: userData.name.stringValue,
        patientContact: userData.email.stringValue,
        patientAge: age,
        patientGender: userData.gender.stringValue,
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();

    if (selectedDate < today) {
      toast.error("You cannot select a past date.");
      return;
    }

    setFormData({ ...formData, date: e.target.value });
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTime = e.target.value;
    const [hours, minutes] = selectedTime.split(':').map(Number);

    if (hours < 9 || hours >= 17) {
      toast.error("The clinic operates between 9:00 AM and 5:00 PM. Please choose a valid time.");
      return;
    }

    setFormData({ ...formData, time: selectedTime });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let user = sessionStorage.getItem('user');
      if (!user) {
        toast.error("User not found. Please log in again.");
        return;
      }

      const userData = JSON.parse(user!);
      type AppointmentStatus = "pending" | "confirmed" | "completed" | "canceled";

      const appointmentDate = new Date(formData.date);
      const [hour, minute] = formData.time.split(":");
      appointmentDate.setHours(parseInt(hour), parseInt(minute));

      const response = await createAppointment({
        doctorEmail: formData.doctorEmail, 
        patientEmail: userData.email.stringValue,
        appointmentDate: appointmentDate, 
        appointmentTime: formData.time,
        reason: formData.symptoms,
        status: "pending" as AppointmentStatus,
      });

      setConfirmation(true);
      setFormData(INITIAL_STATE);
      toast.success("Your appointment has been booked successfully!");
    } catch (error) {
      toast.error("An error occurred while booking the appointment.");
    }
  };

  return (
    <div className="appointment-container">
      <h2>Book an Appointment</h2>
      
      <form onSubmit={handleSubmit} className="appointment-form">
        <label>Patient Name</label>
        <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} required />

        <label>Contact</label>
        <input type="text" name="patientContact" value={formData.patientContact} onChange={handleChange} required />

        <label>Age</label>
        <input type="text" name="patientAge" value={formData.patientAge} readOnly />

        <label>Gender</label>
        <input type="text" name="patientGender" value={formData.patientGender} readOnly />

        <label>Doctor</label>
        <select name="doctorEmail" value={formData.doctorEmail} onChange={handleChange} required>
          <option value="">Select</option>
          {doctors.map((doctor) => (
            <option key={doctor.email.stringValue} value={doctor.email.stringValue}>
              {doctor.name.stringValue}
            </option>
          ))}
        </select>

        <label>Appointment Date</label>
        <input type="date" name="date" value={formData.date} onChange={handleDateChange} required />

        <label>Appointment Time</label>
        <input type="time" name="time" value={formData.time} onChange={handleTimeChange} required />

        <label>Symptoms Description</label>
        <textarea name="symptoms" rows={3} value={formData.symptoms} onChange={handleChange} required />

        <button type="submit" className="submit-btn">Submit</button>
      </form>
      <ToastContainer position='bottom-left' />
    </div>
  );
};

export default AppointmentForm;
