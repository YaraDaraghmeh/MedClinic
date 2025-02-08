import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import ContactPage from '../ContactPage/ContactPage';
import Footer from '../Footer/Footer';
import SignInComponent from '../LoginSignUp/login';

const Home: React.FC = () => {
  return <HomePage />;
};

const About: React.FC = () => {
  return <div className="p-4">About Us</div>;
};

const Services: React.FC = () => {
  return <div className="p-4">Our Services</div>;
};

const Contact: React.FC = () => {
  return <ContactPage />;
};

const Main: React.FC = () => {
  return (
    <>
      {/* Include Navbar */}
      <Header />

      {/* Routes for different pages */}
      <div className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<SignInComponent/>}/>
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default Main;
