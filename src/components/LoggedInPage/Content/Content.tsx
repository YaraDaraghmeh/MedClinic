import React from "react";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { About } from "../../AboutPage/about";
import Services from "../../ServicesPage/Services";
import SignInComponent from "../../LoginSignUp/login";
import ErrorPage from "../../ErrorPage/ErrorPage";
import ContactPage from "../../ContactPage/ContactPage";
import HomePage from "../../HomePage/HomePage";
import Footer from "../../Footer/Footer";
import Dashboard from "../Dashboard/Dashboard";
import AppointmentsPage from "../Dashboard/ManagerDashboard/AllAppointments/AppointmentsPage";
import AppointmentList from "../../appointment/AppointmentList";
import DoctorsComponent from "../Dashboard/ManagerDashboard/Doctors/DoctorsComponent";
import DoctorDashboard from "../Dashboard/DoctorsDashboard/DoctorsDashboard";
import DoctorAppointmentsTable from "../Dashboard/DoctorsDashboard/DoctorAppointmentsTable";
import DoctorPationts from "../Dashboard/DoctorsDashboard/DoctorPationts";
import FeedbackViewer from "../Dashboard/ManagerDashboard/Feedbacks/FeedbackViewer";
import UserProfile from "../UserAccountPages/userProfile";
import { User } from "../../../Types";
import FormAppSection from "../../appointment/FormAppSection";
import TodaysAppointments from "../Dashboard/DoctorsDashboard/TodaysAppointments";
import AppointmentsPage1 from "../../appointment/AppointmentsPage";
import ShowDoctors from "../../appointment/ShowDoctors";

interface ContentProps {
  isCollapsed: boolean;
  user: User;
}

const Content: React.FC<ContentProps> = ({ isCollapsed, user }) => {
  return (
    <Box
      sx={{
        marginLeft: isCollapsed ? "60px" : "250px",
        marginTop: "64px",
        transition: "margin-left 0.3s",
        flexGrow: 1,
        padding: "1px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<SignInComponent />} />
        <Route
          path="/error"
          element={
            <ErrorPage errorMessage="You Don't have access to this page" />
          }
        />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/all-appointments" element={<AppointmentsPage />} />
        <Route path="/feedbacks" element={<FeedbackViewer />} />
        <Route path="/doctors" element={<DoctorsComponent />} />
        <Route path="/doctors" element={<DoctorsComponent />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route
          path="/doctor-dashboard"
          element={<DoctorDashboard  />}
        />
        <Route
          path="/doctor-dashboard-table"
          element={<DoctorAppointmentsTable />}
        />
        <Route path="make-appointment"  element={<FormAppSection/>}/>
        <Route
          path="/Doctor-Patients"
          element={<DoctorPationts doctor={user} />}
        /> <Route
        path="/my-appointmentss"
        element={<AppointmentsPage1/>}
      /> <Route
      path="/show-doctors"
      element={<ShowDoctors/>}
    />
      <Route path= "/todays-patients" element={<TodaysAppointments/>} />
      <Route path="/all-appointmentsD" element={<DoctorAppointmentsTable />} />
        <Route
          path="*"
          element={<ErrorPage errorMessage="Page not found!" />}
        />
         
      </Routes>
      <Footer />
    </Box>
  );
};

export default Content;
