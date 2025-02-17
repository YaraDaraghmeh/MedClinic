import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAppointmentsByDoctor, getAppointmentsByPatient } from "../../../services/appointmentService";
import { getUserByEmail } from "../../../services/userService";
import { getFeedbackByEmail, getAverageRating, getFeedback, deleteFeedback } from "../../../services/feedbackService"; // Assuming you have a feedback service
import { Appointment, User,Feedback } from "../../../Types";
import "./UserProfile.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [averageRating, setAverageRating] = useState<string>("0.0");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const email = queryParams.get("email");

        if (!email) {
          throw new Error("No email provided in the URL");
        }

        const userData = await getUserByEmail(email);
        setUser(userData);

        // Fetch appointments based on the user role
        if (userData.role?.stringValue !== "manager") {
          let userAppointments;
          if (userData.role?.stringValue === "doctor") {
            userAppointments = await getAppointmentsByDoctor(email);
          } else if (userData.role?.stringValue === "patient") {
            userAppointments = await getAppointmentsByPatient(email);
          }
          setAppointments(userAppointments);
        }

        // Fetch feedbacks for the user
        const userFeedbacks = await getFeedbackByEmail(email);
        setFeedbacks(userFeedbacks);

        // Get the average rating for the user
        const avgRating = await getAverageRating();
        setAverageRating(avgRating);

        setLoading(false);
      } catch (error: any) {
        setError(error.message || "An error occurred.");
        setLoading(false);
        navigate("/error"); // Navigate to error page if something goes wrong
      }
    };

    fetchData();
  }, [location.search, navigate]);

  

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={user!.imageUrl?.stringValue || "/default-image.png"} alt={user!.name.stringValue} className="profile-image" />
        <div className="profile-details">
          <h2>{user!.name.stringValue}</h2>
          <p>Email: {user!.email.stringValue}</p>
          <p>Gender: {user!.gender.stringValue}</p>
          <p>Role: {user!.role?.stringValue}</p>
          <p>Date of Birth: {user!.dateOfBirth.stringValue}</p>
          <p>Average Rating: {averageRating}</p>
        </div>
      </div>

      {user!.role?.stringValue !== "manager" && (
        <div className="appointments-section">
          <h3>Appointments</h3>
          {appointments.length > 0 ? (
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.appointmentDate?.stringValue}</td>
                    <td>{appointment.appointmentTime?.stringValue}</td>
                    <td style={{ color: appointment.status?.stringValue === 'completed' ? 'green' : 'red' }}>
                      {appointment.status?.stringValue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No appointments found.</p>
          )}
        </div>
      )}

      {user!.role?.stringValue !== "manager" && user!.role?.stringValue !== "doctor" && (
        <div className="feedback-section">
          <h3>Feedback</h3>
          {feedbacks &&feedbacks.length > 0 ? (
            <table className="feedback-table">
              <thead>
                <tr>
                  <th>Message</th>
                  <th>Rating</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback) => (
                  <tr key={feedback.id}>
                    <td>{feedback.message?.stringValue}</td>
                    <td>{feedback.rating?.integerValue}</td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No feedback available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
