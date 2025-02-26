import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAppointmentsByDoctor, getAppointmentsByPatient } from "../../../services/appointmentService";
import { getUserByEmail } from "../../../services/userService";
import { getFeedbackByEmail, getAverageRating } from "../../../services/feedbackService";
import { Appointment, User, Feedback } from "../../../Types";
import { formatDate } from "../../../functions";
import "./UserProfile.css";
import { useUserContext } from "../../../hooks/UserContext";
import { useAppointmentsContext } from "../../../hooks/AppointmentContext";
import { useFeedback } from "../../../hooks/FeedbackContext";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { useLoggedInUser } from "../../../hooks/LoggedinUserContext";


const UserProfile = () => {
  const {users} = useUserContext();
  const {appointments}= useAppointmentsContext();
 const {feedbacks} = useFeedback();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [appointmentsbyUser, setAppointmentsbyUser] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [userfeedbacks, setuserFeedbacks] = useState<Feedback[]>([]);
  const [averageRating, setAverageRating] = useState<string>("0.0");
const {loggedInUser}= useLoggedInUser();

  useEffect(() => {
    if(!loggedInUser){
navigate("/");
return;
    }
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const email = queryParams.get("email");

        if (!email) {
          throw new Error("No email provided in the URL");
        }

        const userData = await getUserByEmail(users,email);
        setUser(userData);

        if (userData.role !== "manager") {
          let userAppointments;
          if (userData.role === "doctor") {
            userAppointments = await getAppointmentsByDoctor(appointments,email);
          } else if (userData.role === "patient") {
            userAppointments = await getAppointmentsByPatient(appointments,email);
            const userFeedbacks = await getFeedbackByEmail(feedbacks,email);
           console.log(userFeedbacks);
            setuserFeedbacks(userFeedbacks);
            const avgRating = await getAverageRating(feedbacks);
            setAverageRating(avgRating);
          }
          setAppointmentsbyUser(userAppointments!);
        }

        setLoading(false);
      } catch (error: any) {
        setError(error.message || "An error occurred.");
        setLoading(false);
        navigate("/error");
      }
    };

    fetchData();
  }, [location.search, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <ErrorPage errorMessage={error} />;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img
          src={user!.imageUrl || "/default-image.png"}
          alt={user!.name}
          className="profile-image"
        />
        <div className="profile-details">
          <h2>{user!.name}</h2>
          <p>Email: {user!.email}</p>
          <p>Gender: {user!.gender}</p>
          <p>Role: {user!.role}</p>
          <p>Date of Birth: {user!.dateOfBirth}</p>
        {loggedInUser?.role=='patient'&&  <p>Average Rating: {averageRating}</p>}
        </div>
      </div>

      {user!.role !== "manager" && (
        <div className="appointments-section">
          <h3>Appointments</h3>
          {appointmentsbyUser.length > 0 ? (
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointmentsbyUser.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.appointmentDate}</td>
                    <td>{appointment.appointmentTime}</td>
                    <td className={`status ${appointment.status}`}>
                      {appointment.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">No appointments found.</p>
          )}
        </div>
      )}
{loggedInUser!.role === "manager"&& user?.email===loggedInUser?.email && (
  <div className="manager-fun-section">
    <h3>Hey Manager!</h3>
    <p>Relax, boss! Everything is under control... (probably) 😎</p>
    <img 
      src="https://media3.giphy.com/media/VbnUQpnihPSIgIXuZv/200w.gif?cid=6c09b9529k6caewwt0grbqmm7jg72tu7f9hx7tixd7n2nxhn&ep=v1_gifs_search&rid=200w.gif&ct=g" 
      alt="Funny manager gif"
      className="funny-gif"
    />
  </div>
)}

      {user!.role !== "manager" && user!.role !== "doctor" && (
        <div className="feedback-section">
          <h3>Feedbacks</h3>
          {Array.isArray(userfeedbacks) && userfeedbacks.length > 0 ? (
            <table className="feedback-table">
              <thead>
                <tr>
                  <th>Message</th>
                  <th>Rating</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {userfeedbacks.map((feedback: Feedback) => (
                  <tr key={feedback.id}>
                    <td>{feedback.message}</td>
                    <td>{feedback.rating}</td>
                    <td>{formatDate(feedback.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">No feedback available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;