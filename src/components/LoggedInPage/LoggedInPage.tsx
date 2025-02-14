import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'; // Import Navigate for redirection
import './LoggedInpage.css';
import Sidebar from './SideBar/SideBar';
import Header from './Header/Header';
import Content from './Content/Content';
import ErrorPage from '../ErrorPage/ErrorPage'; 
import Main from '../main/main';

const LoggedInPage: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null); // State to store user data
  const location = useLocation(); 
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('user'); 
      setUser(null); // Clear user state
    navigate('/login'); // Redirect to login page
  };
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user'); 
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // If no user is found, show the ErrorPage
  if (!user) {
    return <Main/>;
  }

  // If user is found, render the normal layout
  return (
    <Box sx={{ display: 'flex', fontFamily: 'Poppins, sans-serif' }}>
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} user={user} onLogout={handleLogout}/>

      {/* Header */}
      <Header isCollapsed={isCollapsed} user={user} />

      {/* Content Section */}
      <Content isCollapsed={isCollapsed} />
    </Box>
  );
};

export default LoggedInPage;