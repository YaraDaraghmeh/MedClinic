import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Appointment.css';
import { useAppointmentsContext } from '../../hooks/AppointmentContext';
import { useLoggedInUser } from '../../hooks/LoggedinUserContext';
import { User } from '../../Types';
import './AppointmentForm.css'
interface IAppointmentForm {
  date: string;
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
  }, [formData.date, formData.doctorEmail]);

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
      toast.error('You cannot select a past date.');
      return;
    }

    setFormData({ ...formData, date: e.target.value, time: '' });
  };

  const generateAvailableTimes = () => {
    const times = [];
    for (let hour = 9; hour < 17; hour++) {
      times.push(`${hour.toString().padStart(2, '0')}:00`);
    }

    const bookedTimes = appointments
      .filter((app) => {
        if (!app.appointmentDate) return false; // Skip if appointmentDate is undefined

        try {
          const appointmentDate = new Date(app.appointmentDate);
          if (isNaN(appointmentDate.getTime())) return false; // Skip if invalid date

          const formattedAppointmentDate = appointmentDate.toISOString().split('T')[0];
          return (
            app.doctorEmail === formData.doctorEmail &&
            formattedAppointmentDate === formData.date
          );
        } catch (error) {
          console.error('Invalid appointment date:', app.appointmentDate);
          return false; // Skip if an error occurs
        }
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
  
      try {
        const appointmentDate = new Date(app.appointmentDate);
        if (isNaN(appointmentDate.getTime())) return false;
  
        const formattedAppointmentDate = appointmentDate.toISOString().split('T')[0];
        return (
          app.doctorEmail === formData.doctorEmail &&
          formattedAppointmentDate === formData.date &&
          app.appointmentTime === formData.time
        );
      } catch (error) {
        console.error('Invalid appointment date:', app.appointmentDate);
        return false;
      }
    });
  
    if (isTimeBooked) {
      toast.error('This time slot is already booked. Please choose another time.');
      return;
    }
  
    try {
      const appointmentDate = new Date(formData.date);
      const [hour, minute] = formData.time.split(':');
      appointmentDate.setHours(parseInt(hour), parseInt(minute));
  
      await addAppointment({
        doctorEmail: formData.doctorEmail,
        patientEmail: loggedInUser.email,
        appointmentDate: appointmentDate,
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
  

  return (
    <div className="appointment-card">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="doctor-selection">
        <label>Select Doctor</label>
<div className="doctor-list">
  {doctors.length === 1 ? (
    // If there's only one doctor, display it as selected and disabled
    <div className="doctor-card selected">
      <img
        src={doctors[0].imageUrl || '/default-avatar.png'}
        alt={doctors[0].name}
        className="doctor-image"
      />
      <div className="doctor-info">
        <h3>{doctors[0].name}</h3>
        <p>{doctors[0].specialization}</p>
      </div>
    </div>
  ) : (
    // If there are multiple doctors, allow selection
    doctors.map((doctor) => (
      <div
        key={doctor.email}
        className={`doctor-card ${formData.doctorEmail === doctor.email ? 'selected' : ''}`}
        onClick={() => setFormData({ ...formData, doctorEmail: doctor.email })}
      >
        <img
          src={doctor.imageUrl || '/default-avatar.png'}
          alt={doctor.name}
          className="doctor-image"
        />
        <div className="doctor-info">
          <h3>{doctor.name}</h3>
          <p>{doctor.specialization}</p>
        </div>
      </div>
    ))
  )}
</div>
        </div>

        <div className="form-group">
          <label>Appointment Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleDateChange}
            required
            min={new Date().toISOString().split('T')[0]}
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