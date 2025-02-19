import React from "react";
import ManagerDashboard from "./ManagerDashboard/Dashboard/ManagerDashboard";
import DoctorDashboard from "./DoctorsDashboard/DoctorsDashboard";
import PatientDashboard from "./PatientDashboard.tsx/PatientDashboard";
import { User } from "../../../Types";

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  switch (user.role) {
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
