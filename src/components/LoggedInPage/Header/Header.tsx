import React from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar } from '@mui/material';
import { getFirstTwoWords } from '../../../functions';
interface HeaderProps {
  isCollapsed: boolean;
  user: any; 
}

const Header: React.FC<HeaderProps> = ({ isCollapsed, user }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: isCollapsed ? 'calc(100% - 60px)' : 'calc(100% - 250px)', // Adjust width based on Sidebar state
        marginLeft: isCollapsed ? '60px' : '250px', // Adjust margin based on Sidebar state
        zIndex: 1100, // Higher than Sidebar's z-index (1000)
        backgroundColor: '#ffffff',
        color: '#000000',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Poppins, sans-serif',
        transition: 'width 0.3s, margin-left 0.3s', // Smooth transition
      }}
    >
      <Toolbar>
        {/* MediCare Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Poppins, sans-serif' }}>
          MediCare
        </Typography>

        {/* Show User Image and Username when Sidebar is Collapsed */}
        {isCollapsed && user && (
  <Box className="collapsed-user-box">
    <Avatar
      src={user.imageUrl.stringValue} 
      alt={user.name.stringValue}
    /> 
    <Typography variant="body1">
      Hello there, {getFirstTwoWords(user.name.stringValue)}
    </Typography>
  </Box>
)}

      </Toolbar>
    </AppBar>
  );
};

export default Header;