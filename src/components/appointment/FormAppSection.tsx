import React, { useState } from 'react';
import './Appointment.css';

const AppointmentForm: React.FC = () => {
  const [patientName, setPatientName] = useState('');
  const [contact, setContact] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [confirmation, setConfirmation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmation(true);
  };

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDateTime = new Date(e.target.value);
    const hours = selectedDateTime.getHours();
  
    if (hours < 9 || hours >= 17) {
      alert("The clinic operates between 9:00 AM and 5:00 PM. Please choose a valid time.");
      // setDateTime(""); 
    } else {
      setDateTime(e.target.value);
    }
  };

  return (
    <div className='appointment-containe' >
        
      <h2>Book an Appointment</h2>
      {confirmation && <p className="success-message">Your appointment has been booked successfully!</p>}
      <form onSubmit={handleSubmit} className="appointment-form">
        <label>Patient Name</label>
        <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />

        <label>Contact</label>
        <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />

        <label>Age</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />

        <label>Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Appointment Date & Time</label>
        <input 
  type="datetime-local" 
  value={dateTime} 
  onChange={handleDateTimeChange} 
  required 
/>

        <label>Symptoms Description</label>
        <textarea rows={3} value={symptoms} onChange={(e) => setSymptoms(e.target.value)} required />

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
    
  );
};

export default AppointmentForm;