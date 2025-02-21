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
import { useLoggedInUser } from "../../../hooks/LoggedinUserContext";
import { useUserContext } from "../../../hooks/UserContext";
import { getDoctors } from "../../../services/userService";
import Reports from "../Dashboard/DoctorsDashboard/Reports";
import MyAppointments from "../Dashboard/PatientDashboard.tsx/MyAppointments/myAppointments";
import DoctorsPage from "../Dashboard/PatientDashboard.tsx/DoctorsPage/DoctorsPage";
import AppointmentForm from "../Dashboard/PatientDashboard.tsx/AppointmentForm/AppointmentForm";
import DoctorsComponent from "../Dashboard/ManagerDashboard/Doctors/DoctorsComponent";

interface ContentProps {
  isCollapsed: boolean;
}

const Content: React.FC<ContentProps> = ({ isCollapsed }) => {
  const { loggedInUser } = useLoggedInUser();
  const { users } = useUserContext();
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/all-appointments" element={<AppointmentsPage />} />
        <Route path="/feedbacks" element={<FeedbackViewer />} />
        <Route path="/doctors" element={<DoctorsComponent />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor-dashboard-table" element={<DoctorAppointmentsTable />}/>
        <Route path="make-appointment" element={ <AppointmentForm doctors={getDoctors(users)}/>} />
        <Route path="/Doctor-Patients" element={<DoctorPationts doctor={loggedInUser!} />}/>
        <Route path="/my-appointmentss" element={<MyAppointments/>} />{" "}
        <Route path="/show-doctors" element={<DoctorsPage/>} />
        <Route path="/todays-patients" element={<TodaysAppointments />} />
        <Route path="/DoctorsReports"element={<Reports />} />
        <Route path="*" element={<ErrorPage errorMessage="Page not found!" />}/>
      </Routes>

      <Footer />
    </Box>
  );
};

export default Content;
