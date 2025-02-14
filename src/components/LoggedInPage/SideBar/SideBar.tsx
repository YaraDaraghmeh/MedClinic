import React from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, Typography, Divider } from '@mui/material';
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
        variant="body1"
        sx={{
          textTransform: 'uppercase',
          margin: '10px',
          display: isCollapsed ? 'none' : 'block',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
        }}
      >
        {user?.role?.stringValue ? `${user.role.stringValue} Dashboard` : 'Dashboard'}
      </Typography>

      {/* Profile Image and Info */}
      {!isCollapsed && user && (
        <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
          <img
            src={user.imageUrl?.stringValue || '/path/to/default-profile-image.jpg'} // Use user's profile image or default
            className="userImage"
            alt="Profile"
            style={{ borderRadius: '50%', width: '80px', height: '80px' }}
          />
          <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', marginTop: '5px', fontWeight: '200' }}>
            {user.name?.stringValue || 'User'}
          </Typography>
        </Box>
      )}

      {/* Horizontal Line */}
      {!isCollapsed && <Divider sx={{ backgroundColor: 'white', marginBottom: '15px' }} />}

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
