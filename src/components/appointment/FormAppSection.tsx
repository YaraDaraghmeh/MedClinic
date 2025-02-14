import React, { useState } from 'react';

import { createAppointment } from '../../services/appointmentService';
import './Appointment.css';


interface IAppointmentForm {
  patientName: string;
  patientContact: string;
  patientAge: number;
  patientGender: string;
  dateTime: string;
  symptoms: string;
  doctorId?: string;
  doctorEmail: string;

}

const INITIAL_STATE: IAppointmentForm = {
  patientName: '',
  patientContact: '',
  patientAge: 0,
  patientGender: '',
  dateTime: '',
  symptoms: '',
  doctorId: '',
  doctorEmail: '',
};

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState<IAppointmentForm>(INITIAL_STATE);
  const [confirmation, setConfirmation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDateTime = new Date(e.target.value);
    const hours = selectedDateTime.getHours();

    
    if (hours < 9 || hours >= 17) {
      alert("The clinic operates between 9:00 AM and 5:00 PM. Please choose a valid time.");
    } else {
      setFormData({ ...formData, dateTime: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user=sessionStorage.getItem('user');
      // console.log(user!.email)
      await createAppointment({
        doctorEmail: formData.doctorId || "",
        patientEmail: "",
        appointmentDate: new Date(formData.dateTime),
        appointmentTime: formData.dateTime.split("T")[1],
        reason: formData.symptoms,
        status: "pending",
      });
      setConfirmation(true);
      setFormData(INITIAL_STATE);
    } catch (error) {
      console.error("Error creating appointment:", error);

    }
  };

  return (

    <div className='appointment-container'>

      <h2>Book an Appointment</h2>
      {confirmation && <p className="success-message">Your appointment has been booked successfully!</p>}
      <form onSubmit={handleSubmit} className="appointment-form">
        <label>Patient Name</label>

        <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} required />

        <label>Contact</label>
        <input type="text" name="patientContact" value={formData.patientContact} onChange={handleChange} required />

        <label>Age</label>
        <input type="number" name="patientAge" value={formData.patientAge} onChange={handleChange} required />

        <label>Gender</label>
        <select name="patientGender" value={formData.patientGender} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>


        <label>Doctor</label>
        <select name="doctorEmail" value={formData.doctorEmail} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Dr.JohnDoe">Dr. John Doe</option>
          <option value="Dr.JaneSmith">Dr. Jane Smith</option>
          <option value="Dr.EmmaWhite">Dr. Emma White</option>
          <option value="Dr.TomBrown">Dr. Tom Brown</option>
          <option value="Dr.OliviaGreen">Dr. Olivia Green</option>
          <option value="Dr.AvaBlue">Dr. Ava Blue</option>
          <option value="Dr.JackBlack">Dr. Jack Black</option>
        </select>


        <label>Appointment Date & Time</label>
        <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleDateTimeChange} required />

        <label>Symptoms Description</label>
        <textarea name="symptoms" rows={3} value={formData.symptoms} onChange={handleChange} required />


        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>

  );
};

export default AppointmentForm;

