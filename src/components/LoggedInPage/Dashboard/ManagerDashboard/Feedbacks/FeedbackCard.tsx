import React, { useEffect, useState } from "react";
import { getUserByEmail } from "../../../../../services/userService";
import { FaStar } from "react-icons/fa";
import { BeatLoader } from "react-spinners";

import "./FeedbackViewer.css";
import { calculateStars } from "../Dashboard/starRating";
import { User } from "../../../../../Types";
import ErrorPage from "../../../../ErrorPage/ErrorPage";

interface Feedback {
  id: string;
  userEmail: { stringValue: string };
  message: { stringValue: string };
  rating: { doubleValue: number };
  timestamp: { stringValue: string };
}



const FeedbackCard: React.FC<{ feedback: Feedback }> = ({ feedback }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserByEmail(feedback.userEmail.stringValue);
        setUser(userData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user details.");
        setLoading(false);
      }
    };

    fetchUser();
  }, [feedback.userEmail.stringValue]);

  const stars = calculateStars(feedback.rating.doubleValue);

  const handleUserClick = () => {
    if (user) {
      window.location.href = `/user-profile?email=${user.email.stringValue}`;
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
            src={user?.imageUrl?.stringValue || "https://via.placeholder.com/50"}
            alt="User"
            className="user-image"
          />
        </a>
        <div className="user-details">
          <h3 className="user-name">{user?.name?.stringValue || "Unknown User"}</h3>
          <p className="rating">
            <FaStar className="star-icon" /> {stars} / 5
          </p>
        </div>
      </div>
      <p className="message">{feedback.message.stringValue}</p>
      <p className="date">
        {new Date(feedback.timestamp.stringValue).toLocaleDateString("en-US", {
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
