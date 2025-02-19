import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../Types";

interface LoggedInUserContextType {
  loggedInUser: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Create LoggedInUserContext with default values
const LoggedInUserContext = createContext<LoggedInUserContextType | undefined>(
  undefined
);

export const LoggedInUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedUser, setLoggedUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Save loggedUser to sessionStorage when it changes
  useEffect(() => {
    if (loggedUser) {
      sessionStorage.setItem("user", JSON.stringify(loggedUser));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [loggedUser]);

  // Function to log in the user
  const login = (userData: User) => {
    setLoggedUser(userData);
  };

  // Function to log out the user
  const logout = () => {
    setLoggedUser(null);
  };

  return (
    <LoggedInUserContext.Provider value={{ loggedInUser: loggedUser, login, logout }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};

// Custom hook for accessing LoggedInUserContext
export const useLoggedInUser = () => {
  const context = useContext(LoggedInUserContext);
  if (!context) {
    throw new Error(
      "useLoggedInUser must be used within a LoggedInUserProvider"
    );
  }
  return context;
};
