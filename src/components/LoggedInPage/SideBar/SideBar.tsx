import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Box, IconButton, Typography, Divider, Dialog, DialogActions, DialogContent, 
  DialogTitle, Button 
} from '@mui/material';
import { 
  HomeOutlined, PeopleOutlined, ReceiptOutlined, CalendarTodayOutlined, 
  ExitToAppOutlined, DashboardOutlined, PersonAddOutlined, FeedbackOutlined, 
  EventAvailableOutlined, MedicalServicesOutlined
} from '@mui/icons-material';
import '../LoggedInpage.css';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  user: any;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar, user ,onLogout}) => {
  const navigate = useNavigate();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleLogout = () => {
    // Clear user data from storage
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');

    // Close the confirmation dialog
    setOpenLogoutDialog(false);

    // Redirect to the login page
    navigate('/Login');
  };

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
            src={user.imageUrl?.stringValue || '/path/to/default-profile-image.jpg'}
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

      {/* Common Links for All Users */}
      <div className="sidebar-links">
        <Link to="/dashboard" className="sidebar-link">
          <DashboardOutlined className="sidebar-icon" /> {!isCollapsed && 'Dashboard'}
        </Link>
      </div>

      {/* Role-Based Navigation */}
      {user?.role?.stringValue === 'manager' && (
        <div className="sidebar-links">
          <Link to="/doctors" className="sidebar-link">
            <PeopleOutlined className="sidebar-icon" /> {!isCollapsed && 'Doctors'}
          </Link>
          <Link to="/all-appointments" className="sidebar-link">
            <ReceiptOutlined className="sidebar-icon" /> {!isCollapsed && 'All Appointments'}
          </Link>
          <Link to="/todays-patients" className="sidebar-link">
            <EventAvailableOutlined className="sidebar-icon" /> {!isCollapsed && "Today's Patients"}
          </Link>
          <Link to="/feedbacks" className="sidebar-link">
            <FeedbackOutlined className="sidebar-icon" /> {!isCollapsed && 'Feedbacks'}
          </Link>
        </div>
      )}

      {user?.role?.stringValue === 'doctor' && (
        <div className="sidebar-links">
          <Link to="/todays-patients" className="sidebar-link">
            <EventAvailableOutlined className="sidebar-icon" /> {!isCollapsed && "Today's Patients"}
          </Link>
          <Link to="/all-appointments" className="sidebar-link">
            <ReceiptOutlined className="sidebar-icon" /> {!isCollapsed && 'All Appointments'}
          </Link>
        </div>
      )}

      {user?.role?.stringValue === 'patient' && (
        <div className="sidebar-links">
          <Link to="/make-appointment" className="sidebar-link">
            <MedicalServicesOutlined className="sidebar-icon" /> {!isCollapsed && 'Make Appointment'}
          </Link>
          <Link to="/show-doctors" className="sidebar-link">
            <PeopleOutlined className="sidebar-icon" /> {!isCollapsed && 'Show Doctors'}
          </Link>
          <Link to="/my-appointments" className="sidebar-link">
            <ReceiptOutlined className="sidebar-icon" /> {!isCollapsed && 'My Appointments'}
          </Link>
        </div>
      )}

      {/* Horizontal Line Before Logout */}
      {!isCollapsed && <Divider sx={{ backgroundColor: 'white', marginTop: '15px', marginBottom: '10px' }} />}

      {/* Logout Button */}
      <button
        className="sidebar-link logout-button"
        onClick={() => setOpenLogoutDialog(true)} // Show confirmation popup
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          textAlign: 'left',
          width: '100%',
          cursor: 'pointer',
          padding: '10px',
          fontSize: '16px',
        }}
      >
        <ExitToAppOutlined className="sidebar-icon" /> {!isCollapsed && 'Logout'}
      </button>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutDialog} onClose={() => setOpenLogoutDialog(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to log out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogoutDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={onLogout} color="error" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sidebar;