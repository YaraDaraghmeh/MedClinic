import React, { useEffect, useState } from "react";
import { getUserByEmail } from "../../../../../services/userService";
import { FaStar } from "react-icons/fa";
import { BeatLoader } from "react-spinners";

import "./FeedbackViewer.css";
import { calculateStars } from "../Dashboard/starRating";
import { Feedback, User } from "../../../../../Types";
import ErrorPage from "../../../../ErrorPage/ErrorPage";
import { useUserContext } from "../../../../../hooks/UserContext";




const FeedbackCard: React.FC<{ feedback: Feedback }> = ({ feedback }) => {
  const [user, setUser] = useState<User | null>(null);
  const {users} = useUserContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserByEmail(users,feedback.userEmail);
        setUser(userData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user details.");
        setLoading(false);
      }
    };

    fetchUser();
  }, [feedback.userEmail]);

  const stars = calculateStars(feedback.rating);

  const handleUserClick = () => {
    if (user) {
      window.location.href = `/user-profile?email=${user.email}`;
    }
  };

  if (loading)
    return (
      <div className="loading">
        <BeatLoader color="#007bff" size={10} />
      </div>
    );
  if (error) return <ErrorPage errorMessage="An error occurred while fetching data "/>;

  return (
    <div className="feedback-card">
      <div className="user-info">
        <a onClick={handleUserClick}>
          <img
            src={user?.imageUrl || "https://via.placeholder.com/50"}
            alt="User"
            className="user-image"
          />
        </a>
        <div className="user-details1">
          <h3 className="user-name1">{user?.name || "Unknown User"}</h3>
          <p className="rating">
            <FaStar className="star-icon" /> {stars} / 5
          </p>
        </div>
      </div>
      <p className="message">{feedback.message}</p>
      <p className="date">
        {new Date(feedback.timestamp).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
};

export default FeedbackCard;
