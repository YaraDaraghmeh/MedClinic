import React, { useEffect, useState } from "react";
import { getFeedback } from "../../../../../services/feedbackService";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { BeatLoader, ClipLoader } from "react-spinners";

import "./FeedbackViewer.css";
import FeedbackCard from "./FeedbackCard";

interface Feedback {
  id: string;
  userEmail: { stringValue: string };
  message: { stringValue: string };
  rating: { doubleValue: number };
  timestamp: { stringValue: string };
}

const FeedbackViewer: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const feedbackData = await getFeedback();
        setFeedbacks(feedbackData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch feedback data.");
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const sortedFeedbacks = [...feedbacks].sort((a, b) => {
    const dateA = new Date(a.timestamp.stringValue).getTime();
    const dateB = new Date(b.timestamp.stringValue).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFeedbacks = sortedFeedbacks.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSortOrder = (order: "newest" | "oldest") => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  if (loading)
    return (
      <div className="loading">
        <ClipLoader color="#007bff" size={35} />
      </div>
    );
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="feedback-dashboard">
      <h1 className="dashboard-title">Feedback Dashboard</h1>
      <div className="sort-controls">
        <button
          className={sortOrder === "newest" ? "active" : ""}
          onClick={() => handleSortOrder("newest")}
        >
          <FaSortAmountDown className="sort-icon" /> Newest
        </button>
        <button
          className={sortOrder === "oldest" ? "active" : ""}
          onClick={() => handleSortOrder("oldest")}
        >
          <FaSortAmountUp className="sort-icon" /> Oldest
        </button>
      </div>
      <div className="feedback-list">
        {currentFeedbacks.length === 0 ? (
          <p className="no-feedback">No feedback found.</p>
        ) : (
          currentFeedbacks.map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))
        )}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(sortedFeedbacks.length / itemsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeedbackViewer;