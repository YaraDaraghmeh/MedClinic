import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Appointment.css';
import { useAppointmentsContext } from '../../hooks/AppointmentContext';
import { useLoggedInUser } from '../../hooks/LoggedinUserContext';
import { User } from '../../Types';
import './AppointmentForm.css';

interface IAppointmentForm {
  date: string; // DD-MM-YYYY format
  time: string;
  symptoms: string;
  doctorEmail: string;
}

const INITIAL_STATE: IAppointmentForm = {
  date: '',
  time: '',
  symptoms: '',
  doctorEmail: '',
};

interface AppointmentFormProps {
  doctors: User[];
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ doctors }) => {
  const [formData, setFormData] = useState<IAppointmentForm>(INITIAL_STATE);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const { appointments = [], addAppointment } = useAppointmentsContext();
  const { loggedInUser } = useLoggedInUser();

  useEffect(() => {
    if (doctors.length === 1) {
      setFormData((prev) => ({ ...prev, doctorEmail: doctors[0].email }));
    }
  }, [doctors]);

  useEffect(() => {
    if (formData.date && formData.doctorEmail) {
      generateAvailableTimes();
    }
  }, [appointments,formData.date, formData.doctorEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
  
    // Set time to 00:00:00 to compare just the date, ignoring the time part
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
  
    if (selectedDate < today) {
      toast.error('You cannot select a past date.');
      return;
    }
  
    // Convert YYYY-MM-DD (input value) to DD-MM-YYYY
    const [year, month, day] = e.target.value.split('-');
    const formattedDate = `${day}-${month}-${year}`;
  
    setFormData({ ...formData, date: formattedDate, time: '' });
  };
  

  const generateAvailableTimes = () => {
    const times: string[] = [];
  
    // Add times from 9 AM to 5 PM
    for (let hour = 9; hour < 17; hour++) {
      times.push(`${hour.toString().padStart(2, '0')}:00`);
    }
  
    // Check if the selected date is today's date
    const today = new Date();
    const [day, month, year] = formData.date.split('-');
    const selectedDate = new Date(`${year}-${month}-${day}`);
  
    // Set the time to 00:00 to compare only the date part
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
  
    // If today's date, filter times based on the current hour
    if (selectedDate.getTime() === today.getTime()) {
      const currentHour = today.getHours(); // Get the current hour
  
      // Only include times after the current hour
      times.filter((time) => {
        const hour = parseInt(time.split(':')[0]);
        return hour > currentHour;
      });
    }
  
    // Filter out booked times
    const bookedTimes = appointments
      .filter((app) => {
        if (!app.appointmentDate) return false; // Skip if appointmentDate is undefined
        return app.doctorEmail === formData.doctorEmail && app.appointmentDate === formData.date;
      })
      .map((app) => app.appointmentTime);
  
    const available = times.filter((time) => !bookedTimes.includes(time));
    setAvailableTimes(available);
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loggedInUser) {
      toast.error('User not found. Please log in again.');
      return;
    }

    // Check if all required fields are filled
    if (!formData.doctorEmail || !formData.date || !formData.time || !formData.symptoms) {
      toast.error('Please fill in all the required fields.');
      return;
    }

    // Check if the selected time is already booked
    const isTimeBooked = appointments.some((app) => {
      if (!app.appointmentDate) return false;

      return (
        app.doctorEmail === formData.doctorEmail &&
        app.appointmentDate === formData.date && // Compare in DD-MM-YYYY format
        app.appointmentTime === formData.time
      );
    });

    if (isTimeBooked) {
      toast.error('This time slot is already booked. Please choose another time.');
      return;
    }

    try {
      // Convert DD-MM-YYYY to Date object
      const [day, month, year] = formData.date.split('-');
      const appointmentDate = new Date(`${year}-${month}-${day}`);
      const [hour, minute] = formData.time.split(':');
      appointmentDate.setHours(parseInt(hour), parseInt(minute));

      await addAppointment({
        doctorEmail: formData.doctorEmail,
        patientEmail: loggedInUser.email,
        appointmentDate: formData.date, // Store in DD-MM-YYYY format
        appointmentTime: formData.time,
        reason: formData.symptoms,
        status: 'pending',
      });

      setFormData(INITIAL_STATE);
      toast.success('Your appointment has been booked successfully!');
    } catch (error) {
      toast.error('An error occurred while booking the appointment.');
    }
  };

  // Convert DD-MM-YYYY to YYYY-MM-DD for the date input
  const getDateInputValue = (date: string) => {
    if (!date) return '';
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`; // Convert back to YYYY-MM-DD format for input
  };

  return (
    <div className="appointment-card">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="doctor-selection">
          {doctors.length === 1 ? (
            <div className="form-group">
              <label>Doctor</label>
              <input type="text" value={doctors[0].name} disabled />
            </div>
          ) : (
            <div className="form-group">
              <label>Select Doctor</label>
              <select name="doctorEmail" value={formData.doctorEmail} onChange={handleChange} required>
                <option value="">Select a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.email} value={doctor.email}>
                    <img
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      className="doctor-image"
                    />
                    {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Appointment Date</label>
          <input
            type="date"
            name="date"
            value={getDateInputValue(formData.date)} // Convert to YYYY-MM-DD for input
            onChange={handleDateChange}
            required
            min={new Date().toISOString().split('T')[0]}
          disabled={!formData.doctorEmail}
          />
        </div>

        {formData.date && (
          <div className="form-group">
            <label>Appointment Time</label>
            {availableTimes.length > 0 ? (
              <div className="time-slots">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`time-slot ${formData.time === time ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, time })}
                  >
                    {time}
                  </button>
                ))}
              </div>
            ) : (
              <p className="full-day-message">This day is fully booked.</p>
            )}
          </div>
        )}

        <div className="form-group">
          <label>Symptoms Description</label>
          <textarea
            name="symptoms"
            rows={3}
            value={formData.symptoms}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Book Appointment
        </button>
      </form>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default AppointmentForm;
