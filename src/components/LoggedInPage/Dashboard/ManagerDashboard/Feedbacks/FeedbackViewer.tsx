import React, { useEffect, useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { BeatLoader, ClipLoader } from "react-spinners";

import "./FeedbackViewer.css";
import FeedbackCard from "./FeedbackCard";
import { Feedback } from "../../../../../Types";
import { useFeedback } from "../../../../../hooks/FeedbackContext";



const FeedbackViewer: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
const {feedbacks}= useFeedback();
 
  const sortedFeedbacks = [...feedbacks].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
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