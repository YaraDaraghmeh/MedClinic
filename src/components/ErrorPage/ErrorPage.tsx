import React from "react";
import "./ErrorPage.css";

const ErrorPage = ({ errorMessage = "Sorry, this page is not found!", errorCode = 404 }) => {
  const handleBackToDashboard = () => {
    window.location.href = "/dashboard";
  };

  const getErrorImage = () => {
    if (errorCode === 403) {
      return "https://media.istockphoto.com/id/1472612294/vector/error-403-flat-illustration.jpg?s=612x612&w=0&k=20&c=7iFKhtih3ip1_PT6Pj6nlD6qOWNYAtxvVvvdJxVep14=";
    }
    return "https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg";
  };

  return (
    <div className="error-container">
      <img
        src={getErrorImage()}
        alt={`${errorCode} Error`}
        className="error-image"
      />
      <p className="error-message">{errorMessage}</p>
      <button onClick={handleBackToDashboard} className="error-button">
        Back to Dashboard
      </button>
    </div>
  );
};

export default ErrorPage;
