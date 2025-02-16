import React from "react";
import ManagerDashboard from "./ManagerDashboard/Dashboard/ManagerDashboard";
import DoctorDashboard from "./DoctorsDashboard/DoctorsDashboard";
import PatientDashboard from "./PatientDashboard.tsx/PatientDashboard";

interface DashboardProps {
  user: { role: string };
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  switch (user.role?.stringValue) {
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
