import React from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import { HomeOutlined, PeopleOutlined, ReceiptOutlined, CalendarTodayOutlined } from '@mui/icons-material';
import '../LoggedInpage.css';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  user: any; // Add user as a prop
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar, user }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: isCollapsed ? '60px' : '250px',
        backgroundColor: '#2c3e50',
        padding: '20px',
        color: 'white',
        zIndex: 1000,
        transition: 'width 0.3s',
        overflow: 'hidden',
      }}
    >
      <IconButton onClick={toggleSidebar} sx={{ marginBottom: '20px', color: 'white' }}>
        {isCollapsed ? '☰' : '×'}
      </IconButton>
      <Typography
        variant="h6"
        sx={{
          textTransform: 'uppercase',
          margin: '10px',
          display: isCollapsed ? 'none' : 'block',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        {user?.role?.stringValue ? `${user.role.stringValue} Dashboard` : 'Dashboard'}
      </Typography>

      {/* Profile Image and Info */}
      {!isCollapsed && user && (
        <Box sx={{ textAlign: 'center', marginBottom: '30px' }}>
          <img
            src={user.imageUrl?.stringValue || '/path/to/default-profile-image.jpg'} // Use user's profile image or default
            className="userImage"
            alt="Profile"
            style={{ borderRadius: '50%', width: '80px', height: '80px' }}
          />
          <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif' }}>
            {user.name?.stringValue || 'User'} {/* Display user's name or default text */}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif' }}>
            {user.role?.stringValue || 'User Role'} {/* Display user's role or default text */}
          </Typography>
        </Box>
      )}

      {/* Sidebar Links */}
      <div className="sidebar-links">
        <Link to="/" className="sidebar-link">
          <HomeOutlined className="sidebar-icon" /> {!isCollapsed && 'Home'}
        </Link>
        <Link to="/about" className="sidebar-link">
          <PeopleOutlined className="sidebar-icon" /> {!isCollapsed && 'About'}
        </Link>
        <Link to="/services" className="sidebar-link">
          <ReceiptOutlined className="sidebar-icon" /> {!isCollapsed && 'Services'}
        </Link>
        <Link to="/calendar" className="sidebar-link">
          <CalendarTodayOutlined className="sidebar-icon" /> {!isCollapsed && 'Calendar'}
        </Link>
      </div>
    </Box>
  );
};

export default Sidebar;