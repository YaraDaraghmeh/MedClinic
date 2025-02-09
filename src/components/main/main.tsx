import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Services from '../ServicesPage/Services';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import ContactPage from '../ContactPage/ContactPage';
import Footer from '../Footer/Footer';
import { About } from '../AboutPage/about';
import SignInComponent from '../LoginSignUp/login';
import ErrorPage from '../ErrorPage/ErrorPage';


const Home: React.FC = () => {
  return <HomePage />;
};

const Contact: React.FC = () => {
  return <ContactPage />;
};

const Main: React.FC = () => {
  const location = useLocation();

  // Array of routes that should display the Header
  const pagesWithHeader = ['/about', '/services', '/contact', '/', '/login'];

  const isErrorPage = location.pathname === '/error';
  const shouldHideHeader = !pagesWithHeader.includes(location.pathname) || isErrorPage;

  return (
    <>
      {/* Render Header only if the route is not in the array or /error */}
      {!shouldHideHeader && <Header />}

      {/* Routes for different pages */}
      <div className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<SignInComponent />} />
          <Route path="/error" element={<ErrorPage errorMessage="You Don't have access to this page" />} />
          <Route path="*" element={<ErrorPage errorMessage="Page not found!" />} />
        </Routes>
      </div>

      {/* Render Footer only if the route is not /error or wildcard */}
      {location.pathname !== '/error' && location.pathname !== '/404' && <Footer />}
    </>
  );
};

export default Main;
