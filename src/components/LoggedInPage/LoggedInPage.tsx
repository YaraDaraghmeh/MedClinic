import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import './LoggedInpage.css';
import Sidebar from './SideBar/SideBar';
import Header from './Header/Header';
import Content from './Content/Content';

const LoggedInPage: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null); // State to store user data

  // Fetch user data from sessionStorage or localStorage
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user'); // or localStorage
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box sx={{ display: 'flex', fontFamily: 'Poppins, sans-serif' }}>
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} user={user} />

      {/* Header */}
      <Header isCollapsed={isCollapsed} user={user} />

      {/* Content Section */}
      <Content isCollapsed={isCollapsed} />
    </Box>
  );
};

export default LoggedInPage;