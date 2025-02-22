import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "./DatePicker/DatePicker";
import TimeSlots from "./TimeSlots/TimeSlots";
import SymptomsInput from "./SymptomsInput/SymptomsInput";
import "./AppointmentForm.css";
import { useAppointmentsContext } from "../../../../../hooks/AppointmentContext";
import { useLoggedInUser } from "../../../../../hooks/LoggedinUserContext";
import useAvailableTimes from "../../../../../hooks/useavailableTimes";
import { User } from "../../../../../Types";
import DoctorSelection from "./DoctorSelection/Doctorselection";
import { useLocation } from "react-router-dom"; // Import useLocation

interface IAppointmentForm {
  date: string;
  time: string;
  symptoms: string;
  doctorEmail: string;
}

const INITIAL_STATE: IAppointmentForm = {
  date: "",
  time: "",
  symptoms: "",
  doctorEmail: "",
};

interface AppointmentFormProps {
  doctors: User[];
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ doctors }) => {
  const [formData, setFormData] = useState<IAppointmentForm>(INITIAL_STATE);
  const { appointments = [], addAppointment } = useAppointmentsContext();
  const { loggedInUser } = useLoggedInUser();
  const location = useLocation(); 
  const [disabled, setDisabled] = useState(false);

  const availableTimes = useAvailableTimes({
    date: formData.date,
    doctorEmail: formData.doctorEmail,
    patientEmail: loggedInUser?.email || "", // Pass patientEmail to the hook
    appointments,
  });

  // Get doctor email from the URL query parameter
  const queryParams = new URLSearchParams(location.search);
  const doctorEmailFromUrl = queryParams.get("email");

  useEffect(() => {
    if (doctorEmailFromUrl) {
      // Set the doctor email from the URL query parameter
      setFormData((prev) => ({ ...prev, doctorEmail: doctorEmailFromUrl }));
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [doctorEmailFromUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      toast.error("You cannot select a past date.");
      return;
    }

    const [year, month, day] = e.target.value.split("-");
    const formattedDate = `${day}-${month}-${year}`;

    setFormData({ ...formData, date: formattedDate, time: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loggedInUser) {
      toast.error("User not found. Please log in again.");
      return;
    }

    if (!formData.doctorEmail || !formData.date || !formData.time || !formData.symptoms) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    const isTimeBooked = appointments.some((app) => {
      if (!app.appointmentDate) return false;
      return (
        app.doctorEmail === formData.doctorEmail &&
        app.appointmentDate === formData.date &&
        app.appointmentTime === formData.time
      );
    });

    if (isTimeBooked) {
      toast.error("This time slot is already booked. Please choose another time.");
      return;
    }

    try {
      await addAppointment({
        doctorEmail: formData.doctorEmail,
        patientEmail: loggedInUser.email,
        appointmentDate: formData.date, // Store in DD-MM-YYYY format
        appointmentTime: formData.time,
        reason: formData.symptoms,
        status: "pending",
      });

      setFormData(INITIAL_STATE);
      toast.success("Your appointment has been booked successfully!");
    } catch (error) {
      toast.error("An error occurred while booking the appointment.");
    }
  };

  const getDateInputValue = (date: string) => {
    if (!date) return "";
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`; // Convert back to YYYY-MM-DD format for input
  };

  return (
    <div className="appointment-form-container">
      <div className="appointment-card">
        <h2>Book an Appointment</h2>
        <form onSubmit={handleSubmit} className="appointment-form">
          <DoctorSelection
            doctors={doctors}
            doctorEmail={formData.doctorEmail}
            onDoctorChange={handleChange}
            disabled={disabled} // Disable if doctorEmail is from URL
          />

          <DatePicker
            date={getDateInputValue(formData.date)}
            onDateChange={handleDateChange}
            disabled={!formData.doctorEmail}
          />

          {formData.date && (
            <TimeSlots
              availableTimes={availableTimes}
              selectedTime={formData.time}
              onTimeSelect={(time) => setFormData({ ...formData, time })}
            />
          )}

          <SymptomsInput symptoms={formData.symptoms} onSymptomsChange={handleChange} />

          <button type="submit" className="submit-btn">
            Book Appointment
          </button>
        </form>
        <ToastContainer position="bottom-left" />
      </div>
    </div>
  );
};

export default AppointmentForm;