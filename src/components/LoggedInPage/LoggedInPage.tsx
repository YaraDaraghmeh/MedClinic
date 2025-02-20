import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom"; // Import Navigate for redirection
import "./LoggedInpage.css";
import Sidebar from "./SideBar/SideBar";
import Header from "./Header/Header";
import Content from "./Content/Content";
import ErrorPage from "../ErrorPage/ErrorPage";
import Main from "../main/main";

import { useLoggedInUser } from "../../hooks/LoggedinUserContext";

const LoggedInPage: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
 const {loggedInUser}= useLoggedInUser();
  
useEffect(()=>{
  if(!loggedInUser){
  
    return;}
},[loggedInUser])
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  if(!loggedInUser){
      return <ErrorPage/>;
  }

  // If user is found, render the normal layout
  return (
    <Box sx={{ display: "flex", fontFamily: "Poppins, sans-serif" }}>
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        
       
      />

      {/* Header */}
      <Header isCollapsed={isCollapsed}  />

      {/* Content Section */}
      <Content isCollapsed={isCollapsed}  />
    </Box>
  );
};

export default LoggedInPage;
