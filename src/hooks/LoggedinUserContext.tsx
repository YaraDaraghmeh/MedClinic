import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../Types";

interface LoggedInUserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Create LoggedInUserContext with default values
const LoggedInUserContext = createContext<LoggedInUserContextType | undefined>(undefined);

export const LoggedInUserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem("loggedInUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Save user to sessionStorage when user changes
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("loggedInUser", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("loggedInUser");
    }
  }, [user]);

  // Function to log in the user
  const login = (userData: User) => {
    setUser(userData);
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
  };

  return (
    <LoggedInUserContext.Provider value={{ user, login, logout }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};

// Custom hook for accessing LoggedInUserContext
export const useLoggedInUser = () => {
  const context = useContext(LoggedInUserContext);
  if (!context) {
    throw new Error("useLoggedInUser must be used within a LoggedInUserProvider");
  }
  return context;
};
