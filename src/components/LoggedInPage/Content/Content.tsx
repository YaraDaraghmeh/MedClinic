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
import AppointmentForm from '../../appointment/FormAppSection';
import AppointmentsPage from '../../appointment/AppointmentsPage';
import Appointment from '../../appointment/Patient.screen';

interface ContentProps {
  isCollapsed: boolean;
}

const Content: React.FC<ContentProps> = ({ isCollapsed }) => {
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
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="*" element={<ErrorPage errorMessage="Page not found!" />} />
      </Routes>
      <Footer />
    </Box>
  );
};

export default Content;