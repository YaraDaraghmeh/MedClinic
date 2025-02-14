import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Services from '../ServicesPage/Services';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import ContactPage from '../ContactPage/ContactPage';
import Footer from '../Footer/Footer';
import { About } from '../AboutPage/about';
import Appointment from '../../screens/Patient.screen';
import SignInComponent from '../LoginSignUp/login';
import ErrorPage from '../ErrorPage/ErrorPage';
import Sidebar from '../SideBar/SideBar';

const Home: React.FC = () => {
  return <HomePage />;
};

const Contact: React.FC = () => {
  return <ContactPage />;
};

const Main: React.FC = () => {
  const location = useLocation();
  const [user, setUser] = useState<any>(null); // Track the logged-in user

  // Array of routes that should display the Header
  const pagesWithHeader = ['/about', '/services', '/contact', '/', '/login'];

  const isErrorPage = location.pathname === '/error';
  const shouldHideHeader = !pagesWithHeader.includes(location.pathname) || isErrorPage;

  // Fetch user data from sessionStorage when the component mounts
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser); // Save the user object in the state
    }
  }, []);

  return (
    <>
      {/* Render Sidebar if user exists */}
      {user && <Sidebar />}

      {/* Render Header only if the route is not in the array or /error */}
      {!shouldHideHeader && <Header />}

      {/* Main Content */}
      <div className={`mt-4 ${user ? 'ml-64' : ''}`}> {/* Add margin-left to content if user is logged in */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<SignInComponent/>}/>
        </Routes>
      </div>

      {/* Render Footer only if the route is not /error or wildcard */}
      {location.pathname !== '/error' && <Footer />}
    </>
  );
};

export default Main;
