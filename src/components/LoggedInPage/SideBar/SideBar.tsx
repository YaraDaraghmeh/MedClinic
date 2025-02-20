import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, IconButton, Typography, Divider, Dialog, DialogActions, DialogContent, 
  DialogTitle, Button, 
  Avatar
} from '@mui/material';
import { 
  HomeOutlined, PeopleOutlined, ReceiptOutlined, CalendarTodayOutlined, 
  ExitToAppOutlined, DashboardOutlined, PersonAddOutlined, FeedbackOutlined, 
  EventAvailableOutlined, MedicalServicesOutlined
} from '@mui/icons-material';
import LogoutDialog from '../LogoutDialog/LogoutDialog'; 
import '../LoggedInpage.css';
import { User } from '../../../Types';
import { useLoggedInUser } from '../../../hooks/LoggedinUserContext';
import LoggedInPage from '../LoggedInPage';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
 
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const {logout,loggedInUser}= useLoggedInUser();

  const handleLogout = () => {
    // Clear user data from storage
   logout();
    // Close the confirmation dialog
    setOpenLogoutDialog(false);

    // Redirect to the login page
    navigate('/Login');
  };

  // Function to check if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
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
        {loggedInUser?.role ? `${loggedInUser.role} Dashboard` : 'Dashboard'}
      </Typography>

      {/* Profile Image and Info */}
      {!isCollapsed && loggedInUser && (
        <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
       <Avatar
  src={loggedInUser.imageUrl}
  alt={loggedInUser.name}
 className="userImage"
  sx={{
    borderRadius: "50%",
    width: 80,
    height: 80,
    border: "2px solid #e5e7eb",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  }}
/>

          <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', marginTop: '5px', fontWeight: '200' }}>
            {loggedInUser.name || 'User'}  
          </Typography>
        </Box>
      )}

      {/* Horizontal Line */}
      {!isCollapsed && <Divider sx={{ backgroundColor: 'white', marginBottom: '15px' }} />}

      {/* Common Links for All Users */}
      <div className="sidebar-links">
        <Link
          to="/dashboard"
          className={`sidebar-link ${isActive('/dashboard') ? 'active' : ''}`} // Add active class conditionally
        >
          <DashboardOutlined className="sidebar-icon" /> {!isCollapsed && 'Dashboard'}
        </Link>
      </div>

      {/* Role-Based Navigation */}
      {loggedInUser?.role === 'manager' && (
        <div className="sidebar-links">
          <Link
            to="/doctors"
            className={`sidebar-link ${isActive('/doctors') ? 'active' : ''}`}
          >
            <PeopleOutlined className="sidebar-icon" /> {!isCollapsed && 'Doctors'}
          </Link>
          <Link
            to="/all-appointments"
            className={`sidebar-link ${isActive('/all-appointments') ? 'active' : ''}`}
          >
            <ReceiptOutlined className="sidebar-icon" /> {!isCollapsed && 'All Appointments'}
          </Link>
          <Link
            to="/feedbacks"
            className={`sidebar-link ${isActive('/feedbacks') ? 'active' : ''}`}
          >
            <FeedbackOutlined className="sidebar-icon" /> {!isCollapsed && 'Feedbacks'}
          </Link>
        </div>
      )}

      {loggedInUser?.role === 'doctor' && (
        <div className="sidebar-links">
         
          <Link
            to="/todays-patients"
            className={`sidebar-link ${isActive('/todays-patients') ? 'active' : ''}`}
          >
            <EventAvailableOutlined className="sidebar-icon" /> {!isCollapsed && "Today's Patients"}
          </Link>
          <Link
            to="/doctor-dashboard-table"
            className={`sidebar-link ${isActive('/all-appointmentsD') ? 'active' : ''}`}
          >
            <ReceiptOutlined className="sidebar-icon" /> {!isCollapsed && 'All Appointments'}
          </Link>
          <Link to="/Doctor-Patients" className="sidebar-link">
            <ReceiptOutlined className="sidebar-icon" /> {!isCollapsed && 'Patients List'}
          </Link>
          <Link to="/DoctorsReports" className="sidebar-link">
            <ReceiptOutlined className="sidebar-icon" /> {!isCollapsed && 'Reports'}
          </Link>
        </div>
      )}

      {loggedInUser?.role === 'patient' && (
        <div className="sidebar-links">
          <Link
            to="/make-appointment"
            className={`sidebar-link ${isActive('/make-appointment') ? 'active' : ''}`}
          >
            <MedicalServicesOutlined className="sidebar-icon" /> {!isCollapsed && 'Make Appointment'}
          </Link>
          <Link
            to="/show-doctors"
            className={`sidebar-link ${isActive('/show-doctors') ? 'active' : ''}`}
          >
            <PeopleOutlined className="sidebar-icon" /> {!isCollapsed && 'Show Doctors'}
          </Link>
          <Link
            to="/my-appointmentss"
            className={`sidebar-link ${isActive('/my-appointments') ? 'active' : ''}`}
          >
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
      <LogoutDialog
        open={openLogoutDialog}
        onClose={() => setOpenLogoutDialog(false)}
        onLogout={handleLogout}
       
      />
    </Box>
  );
};

export default Sidebar;