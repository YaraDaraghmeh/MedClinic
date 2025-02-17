import React from 'react';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { About } from '../../AboutPage/about';
import Services from '../../ServicesPage/Services';
import SignInComponent from '../../LoginSignUp/login';
import ErrorPage from '../../ErrorPage/ErrorPage';
import ContactPage from '../../ContactPage/ContactPage';
import HomePage from '../../HomePage/HomePage';
import Footer from '../../Footer/Footer';
import Dashboard from '../Dashboard/Dashboard';
import AppointmentsPage from '../Dashboard/ManagerDashboard/AllAppointments/AppointmentsPage';
import AppointmentList from '../../appointment/AppointmentList';
import DoctorsComponent from '../Dashboard/ManagerDashboard/Doctors/DoctorsComponent';
import DoctorDashboard from '../Dashboard/DoctorsDashboard/DoctorsDashboard';
import DoctorAppointmentsTable from '../Dashboard/DoctorsDashboard/DoctorAppointmentsTable';
import DoctorPationts from '../Dashboard/DoctorsDashboard/DoctorPationts';

interface ContentProps {
  isCollapsed: boolean;
  user: any;
}

const Content: React.FC<ContentProps> = ({ isCollapsed,user }) => {
  return (
    <Box
      sx={{
        marginLeft: isCollapsed ? '60px' : '250px',
        marginTop: '64px',
        transition: 'margin-left 0.3s',
        flexGrow: 1,
        padding: '1px',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<SignInComponent />} />
        <Route path="/error" element={<ErrorPage errorMessage="You Don't have access to this page" />} />
        <Route path="/dashboard" element={<Dashboard user={user}/>} />
        <Route path="/all-appointments" element={<AppointmentsPage/>} />
       <Route path="/doctors" element={<DoctorsComponent/>} />
       <Route  path="/doctor-dashboard"  element={ <DoctorDashboard user={user} /> } />
       <Route path="/doctor-dashboard-table" element={<DoctorAppointmentsTable user={user}/>} />
       <Route path='/Doctor-Patients' element={<DoctorPationts doctor={user} />} />
       <Route path="*" element={<ErrorPage errorMessage="Page not found!" />} />
      </Routes>
      <Footer />
    </Box>
  );
};

export default Content;