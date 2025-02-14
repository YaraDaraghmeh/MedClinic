import React from 'react';
import { Link } from 'react-router-dom';
import "./SideBar.css"
const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2></h2>
      <div className="sidebar-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Sidebar;
