import { User } from "../Types";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing and comparison

// Get all doctors from the users array
export const getDoctors = (users: User[]) => {
  return users.filter((user) => user.role === "doctor");
};

// Get all patients from the users array
export const getPatients = (users: User[]) => {
  return users.filter((user) => user.role === "patient");
};

// Check if the email is already taken in the users array
export const isEmailTaken = (users: User[], email: string): boolean => {
  return users.some((user) => user.email === email);
};

// Authenticate a user by email and password
export const authenticateUser = async (users: User[], email: string, password: string): Promise<User> => {
  const user = users.find((user) => user.email === email);

  if (!user || !user.password) {
    throw new Error("User not found");
  }

  const storedPassword = user.password;

  const isMatch = await bcrypt.compare(password, storedPassword);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return user;
};

// Get user profile by email from the users array
export const getUserProfile = (users: User[], email: string): User => {
  const user = users.find((user) => user.email === email);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// Get user by email from the users array
export const getUserByEmail = (users: User[], email: string): User => {
  const user = users.find((user) => user.email === email);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// Get users by role and filter by criteria from the users array
export const getUsersByCriteria = (
  users: User[],
  role: "doctor" | "patient",
  searchCriteria: { name?: string; email?: string } = {}
): User[] => {
  return users.filter((user) => {
    const matchesRole = user.role === role;
    const matchesName = searchCriteria.name
      ? user.name?.includes(searchCriteria.name)
      : true;
    const matchesEmail = searchCriteria.email
      ? user.email?.includes(searchCriteria.email)
      : true;

    return matchesRole && matchesName && matchesEmail;
  });
};

// Get doctors by criteria from the users array
export const getDoctorsByCriteria = (
  users: User[],
  searchCriteria: { name?: string; email?: string; age?: number }
): User[] => {
  return getUsersByCriteria(users, "doctor", searchCriteria);
};

// Get patients by criteria from the users array
export const getPatientsByCriteria = (
  users: User[],
  searchCriteria: { name?: string; email?: string; age?: number }
): User[] => {
  return getUsersByCriteria(users, "patient", searchCriteria);
};