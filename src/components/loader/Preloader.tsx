import React from 'react';
import { HashLoader } from 'react-spinners'; // Import a spinner from react-spinners
import './Preloader.css'; // Import the CSS file

const Preloader: React.FC = () => {
  return (
    <div className="preloader">
      <HashLoader size={60} color="#3498db" /> {/* Display the spinner */}
    </div>
  );
};

export default Preloader;
