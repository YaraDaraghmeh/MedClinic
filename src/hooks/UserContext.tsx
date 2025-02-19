import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { db } from '../database/firebase';
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import bcrypt from "bcryptjs"; // For password hashing and comparison
import { User } from "../Types";

// Define the context type
interface UserContextType {
  users: User[];
  addUser: (userData: {
    email: string;
    name: string;
    dateOfBirth: string;
    password: string;
    role: string;
    gender: string;
    imageUrl?: string;
    specialization?: string;
  }) => Promise<void>;
  updateUser: (
    email: string,
    updatedData: Partial<{
      name: string;
      dateOfBirth: string;
      password: string;
      role: string;
      gender: string;
      imageUrl: string;
      specialization: string;
    }>
  ) => Promise<void>;
  deleteUser: (email: string) => Promise<void>;
  authenticateUser: (email: string, password: string) => Promise<User>; // Add this line
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create the provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users and listen for real-time updates
  useEffect(() => {
    const usersCollection = collection(db, "users"); // Reference to the "users" collection

    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const fetchedUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
      })) as unknown as User[];
      setUsers(fetchedUsers);
    });

    return () => unsubscribe();
  }, []);

  // Hash the password
  const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  // Add a new user
  const addUser = async (userData: {
    email: string;
    name: string;
    dateOfBirth: string;
    password: string;
    role: string;
    gender: string;
    imageUrl?: string;
    specialization?: string;
  }) => {
    try {
      const hashedPassword = await hashPassword(userData.password);
      const imageUrl = userData.imageUrl || "https://example.com/default-image.jpg";

      const userDoc = doc(db, "users", userData.email); // Use email as the document ID
      await setDoc(userDoc, {
        name: userData.name,
        email: userData.email,
        dateOfBirth: userData.dateOfBirth,
        password: hashedPassword,
        role: userData.role,
        gender: userData.gender,
        imageUrl: imageUrl,
        ...(userData.role === "doctor" &&
          userData.specialization && {
            specialization: userData.specialization,
          }),
      });
    } catch (error) {
      throw new Error(
        `Error adding user: ${
          error instanceof Error ? error.message : "An unknown error occurred."
        }`
      );
    }
  };

  // Update a user
  const updateUser = async (
    email: string,
    updatedData: Partial<{
      name: string;
      dateOfBirth: string;
      password: string;
      role: string;
      gender: string;
      imageUrl: string;
      specialization: string;
    }>
  ) => {
    try {
      const userDoc = doc(db, "users", email); // Use email as the document ID

      if (updatedData.password) {
        updatedData.password = await hashPassword(updatedData.password);
      }

      await updateDoc(userDoc, updatedData);
    } catch (error) {
      throw new Error(
        `Error updating user: ${
          error instanceof Error ? error.message : "An unknown error occurred."
        }`
      );
    }
  };

  // Delete a user
  const deleteUser = async (email: string) => {
    try {
      const userDoc = doc(db, "users", email); // Use email as the document ID
      await deleteDoc(userDoc);
    } catch (error) {
      throw new Error(
        `Error deleting user: ${
          error instanceof Error ? error.message : "An unknown error occurred."
        }`
      );
    }
  };

  // Authenticate a user
  const authenticateUser = async (email: string, password: string): Promise<User> => {
    const user = users.find((user) => user.email === email);

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    return user;
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, authenticateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};