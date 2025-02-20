import React from "react";
import ManagerDashboard from "./ManagerDashboard/Dashboard/ManagerDashboard";
import DoctorDashboard from "./DoctorsDashboard/DoctorsDashboard";
import PatientDashboard from "./PatientDashboard.tsx/PatientDashboard";
import { User } from "../../../Types";
import { useLoggedInUser } from "../../../hooks/LoggedinUserContext";



const Dashboard: React.FC = () => {
  const {loggedInUser}=useLoggedInUser();
  switch (loggedInUser?.role) {
    case "manager":
      return <ManagerDashboard />;
    case "doctor":
      return <DoctorDashboard />;
    case "patient":
      return <PatientDashboard />;
    default:
      return <div>No dashboard available for this role</div>;
  }
};

export default Dashboard;
