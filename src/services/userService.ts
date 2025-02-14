import axiosInstance from "../database/axiosInstance";
import { User } from "../Types";
import bcrypt from "bcryptjs"; //for hashing the password

const COLLECTION_PATH = "/users";

// Default image URL
const DEFAULT_IMAGE_URL =
  "https://t4.ftcdn.net/jpg/09/64/89/19/360_F_964891988_aeRrD7Ee7IhmKQhYkCrkrfE6UHtILfPp.jpg";

// Hash the password before adding or updating the user
const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
  return await bcrypt.hash(password, salt); // Hash the password with the salt
};

// Get all users
export const getUsers = async () => {
  try {
    const response = await axiosInstance.get(COLLECTION_PATH);
    return response.data.documents.map((doc: any) => ({
      id: doc.name.split("/").pop(),
      ...doc.fields,
    }));
  } catch (error: unknown) {
    throw new Error(
      `Error fetching users: ${
        error instanceof Error ? error.message : "An unknown error occurred."
      }`
    );
  }
};
// Get all doctors
export const getDoctors = async () => {
  try {
    const users = await getUsers();
    const doctors = users.filter(
      (user: User) => user.role?.stringValue === "doctor"
    );
    return doctors;
  } catch (error: unknown) {
    throw new Error(
      `Error fetching doctors: ${
        error instanceof Error ? error.message : "An unknown error occurred."
      }`
    );
  }
};

// Get all patients
export const getPatients = async () => {
  try {
    const users = await getUsers();
    const patients = users.filter(
      (user: User) => user.role?.stringValue === "patient"
    );
    return patients;
  } catch (error: unknown) {
    throw new Error(
      `Error fetching patients: ${
        error instanceof Error ? error.message : "An unknown error occurred."
      }`
    );
  }
};

// Add a new user (Firestore generates ID)
export const addUser = async (userData: {
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
    const emailTaken = await isEmailTaken(userData.email);
    if (emailTaken) {
      throw new Error(`Email ${userData.email} is already taken`);
    }

    const hashedPassword = await hashPassword(userData.password);
    const imageUrl = userData.imageUrl || DEFAULT_IMAGE_URL;

    const docId = encodeURIComponent(userData.email);
    const fields: any = {
      name: { stringValue: userData.name },
      email: { stringValue: userData.email },
      dateOfBirth: { stringValue: userData.dateOfBirth },
      password: { stringValue: hashedPassword },
      role: { stringValue: userData.role },
      gender: { stringValue: userData.gender },
      imageUrl: { stringValue: imageUrl },
      ...(userData.role === "doctor" &&
        userData.specialization && {
          specialization: { stringValue: userData.specialization },
        }),
    };

    const response = await axiosInstance.patch(`/users/${docId}`, { fields });
    return response.data;
  } catch (error: unknown) {
    throw new Error(
      `Error adding user: ${
        error instanceof Error ? error.message : "An unknown error occurred."
      }`
    );
  }
};

// Update a user by email
export const updateUser = async (
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
    const existingUserData = await getUserByEmail(email);
    if (!existingUserData) {
      throw new Error(`User with email ${email} not found.`);
    }

    const updatedUser = {
      ...existingUserData,
      ...updatedData,
    };

    if (updatedUser.password) {
      updatedUser.password = await hashPassword(updatedUser.password);
    }

    const encodedEmail = encodeURIComponent(email);
    const response = await axiosInstance.patch(
      `/users/${encodedEmail}`,
      updatedUser
    );
    return response.data;
  } catch (error: unknown) {
    throw new Error(
      `Error updating user with email ${email}: ${
        error instanceof Error ? error.message : "An unknown error occurred."
      }`
    );
  }
};

// Check if the email is already taken
export const isEmailTaken = async (email: string): Promise<boolean> => {
  try {
    const user = await getUserByEmail(email);
    return user ? true : false; // Return true if the user exists, else false
  } catch (error: unknown) {
    return false; // Return false if there is an error
  }
};

// Delete a user by email
export const deleteUser = async (email: string) => {
  try {
    const encodedEmail = encodeURIComponent(email);
    await axiosInstance.delete(`/users/${encodedEmail}`);
    return { success: true, message: `User ${email} deleted successfully` };
  } catch (error: unknown) {
    throw new Error(
      `Error deleting user with email ${email}: ${
        error instanceof Error ? error.message : "An unknown error occurred."
      }`
    );
  }
};

// Authenticate a user by email and password
export const authenticateUser = async (email: string, password: string) => {
  try {
    const user = await getUserByEmail(email);

    if (!user || !user.password) {
      throw new Error("User not found");
    }

    const storedPassword = user.password?.stringValue || user.password;

    // Compare the input password with the stored password
    const isMatch = await bcrypt.compare(password, storedPassword);

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    return user;
  } catch (error: unknown) {
    throw new Error(
      `Authentication Error: ${
        error instanceof Error ? error.message : "An unknown error occurred."
      }`
    );
  }
};

// Get user profile by email
export const getUserProfile = async (email: string) => {
  try {
    const user = await getUserByEmail(email);
    return user;
  } catch (error: unknown) {
    throw new Error(
      `Error fetching user profile: ${
        error instanceof Error ? error.message : "An unknown error occurred."
      }`
    );
  }
};

// Get user by email (unique)
export const getUserByEmail = async (email: string) => {
  try {
    const encodedEmail = encodeURIComponent(email);
    const response = await axiosInstance.get(`/users/${encodedEmail}`);

    if (!response.data || !response.data.fields) {
      throw new Error("User not found");
    }

    return response.data.fields;
  } catch (error: unknown) {
    throw new Error(
      `Error fetching user with email ${email}: ${
        error instanceof Error ? error.message : "An unknown error occurred."
      }`
    );
  }
};

// Get users by role and filter by criteria
export const getUsersByCriteria = (role: "doctor" | "patient", searchCriteria: { name?: string; email?: string } = {}) => {
  return axiosInstance.get(`/users?role=${role}`, {
    params: searchCriteria, // Default to empty object if no criteria is passed
  });
};


// Get doctors by criteria
export const getDoctorsByCriteria = async (searchCriteria: {
  name?: string;
  email?: string;
  age?: number;
}) => {
  return await getUsersByCriteria("doctor", searchCriteria);
};

// Get patients by criteria
export const getPatientsByCriteria = async (searchCriteria: {
  name?: string;
  email?: string;
  age?: number;
}) => {
  return await getUsersByCriteria("patient", searchCriteria);
};
