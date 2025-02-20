import React, { useState, useEffect, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Preloader from "../loader/Preloader";
import LoggedInPage from "../LoggedInPage/LoggedInPage";
import { useLoggedInUser } from "../../hooks/LoggedinUserContext";

// Lazy loaded components
const Services = React.lazy(() => import("../ServicesPage/Services"));
const Header = React.lazy(() => import("../Header/Header"));
const HomePage = React.lazy(() => import("../HomePage/HomePage"));
const ContactPage = React.lazy(() => import("../ContactPage/ContactPage"));
const Footer = React.lazy(() => import("../Footer/Footer"));
const About = React.lazy(() => import("../AboutPage/about").then((module) => ({ default: module.About })));
const SignInComponent = React.lazy(() => import("../LoginSignUp/login"));
const ErrorPage = React.lazy(() => import("../ErrorPage/ErrorPage"));

const Main: React.FC = () => {
  const {loggedInUser}= useLoggedInUser();
  const location = useLocation();
  
  // If the user is logged in, show the LoggedInPage
  if (loggedInUser) return <LoggedInPage />;

  // If user is not logged in, render the public pages (header, footer, etc.)
  return (
    <>
      <Suspense fallback={<div>Loading Header... Please wait.</div>}>
        <Header />
      </Suspense>

      <div className="mt-4">
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<SignInComponent />} />
            <Route path="/error" element={<ErrorPage errorMessage="You Don't have access to this page" />} />
            <Route path="*" element={<ErrorPage errorMessage="Page not found!" />} />
          </Routes>
        </Suspense>
      </div>

      <Suspense fallback={<Preloader />}>
        <Footer />
      </Suspense>
    </>
  );
};

export default Main;
