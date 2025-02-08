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
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// ✅ Get all doctors
export const getDoctors = async () => {
  try {
    const users = await getUsers();
    const doctors = users.filter(
      (user: User) => user.role?.stringValue === "doctor"
    );
    return doctors;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};

// ✅ Get all patients
export const getPatients = async () => {
  try {
    const users = await getUsers();
    const patients = users.filter(
      (user: User) => user.role?.stringValue === "patient"
    );
    return patients;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};

// ✅ Add a new user (Firestore generates ID)
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
    // Check if the email is already taken
    const emailTaken = await isEmailTaken(userData.email);
    if (emailTaken) {
      throw new Error(`Email ${userData.email} is already taken`);
    }

    // Hash the password before saving it
    const hashedPassword = await hashPassword(userData.password);

    // Set default imageUrl if not provided
    const imageUrl = userData.imageUrl || DEFAULT_IMAGE_URL;

    const docId = encodeURIComponent(userData.email); // Encode email to avoid special character issues
    const fields: any = {
      name: { stringValue: userData.name },
      email: { stringValue: userData.email },
      dateOfBirth: { stringValue: userData.dateOfBirth },
      password: { stringValue: hashedPassword }, // Save hashed password
      role: { stringValue: userData.role },
      gender: { stringValue: userData.gender },
      imageUrl: { stringValue: imageUrl }, // Add imageUrl

      // Add specialization if the role is doctor
      ...(userData.role === "doctor" &&
        userData.specialization && {
          specialization: { stringValue: userData.specialization },
        }),
    };

    const response = await axiosInstance.patch(`/users/${docId}`, { fields });
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

// ✅ Update a user by email
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
    // Step 1: Fetch the current user data by email
    const existingUserData = await getUserByEmail(email);

    // Step 2: Merge the existing data with the updated data
    const updatedUser = {
      ...existingUserData, // Existing data from the server
      ...updatedData, // Updated fields, overwriting the ones that change
    };

    // Step 3: If password is updated, hash it before sending
    if (updatedUser.password) {
      updatedUser.password = await hashPassword(updatedUser.password);
    }

    // Step 4: Send the full updated data to the server
    const encodedEmail = encodeURIComponent(email);
    const response = await axiosInstance.patch(
      `/users/${encodedEmail}`,
      updatedUser
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating user with email ${email}:`, error);
    throw error;
  }
};

// ✅ Check if the email is already taken
export const isEmailTaken = async (email: string): Promise<boolean> => {
  try {
    const user = await getUserByEmail(email);
    // If the user exists, return true; otherwise, return false
    return user ? true : false;
  } catch (error) {
    // If there was an error (e.g., user not found), return false
    console.error(`Error checking if email ${email} is taken:`, error);
    return false;
  }
};

// ✅ Delete a user by email
export const deleteUser = async (email: string) => {
  try {
    const encodedEmail = encodeURIComponent(email);
    await axiosInstance.delete(`/users/${encodedEmail}`);
    return { success: true, message: `User ${email} deleted successfully` };
  } catch (error) {
    console.error(`Error deleting user with email ${email}:`, error);
    throw error;
  }
};
export const authenticateUser = async (email: string, password: string) => {
  try {
    // Get the user by email
    const user = await getUserByEmail(email);

    // If user is not found, throw an error
    if (!user) {
      throw new Error("User not found");
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match, throw an error
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const userProfile = getUserProfile(email);
    // Return the user profile
    return userProfile;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Authentication failed: ${error.message}`);
      throw error;
    } else {
      console.error("An unknown error occurred during authentication");
      throw new Error("An unknown error occurred");
    }
  }
};

export const getUserProfile = async (email: string) => {
  try {
    const user = await getUserByEmail(email);
    return user;
  } catch (error) {
    console.error(
      `Error fetching profile for user with email ${email}:`,
      error
    );
    throw error;
  }
};

// ✅ Get users by email (unique)
export const getUserByEmail = async (email: string) => {
  try {
    const encodedEmail = encodeURIComponent(email);
    const response = await axiosInstance.get(`/users/${encodedEmail}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with email ${email}:`, error);
    throw error;
  }
};

// ✅ Get users by role, and filter by name, email, or age
export const getUsersByCriteria = async (
  role: "doctor" | "patient",
  searchCriteria: { name?: string; email?: string; age?: number }
) => {
  try {
    const users = await getUsers();
    const filteredUsers = users.filter((user: User) => {
      const matchesRole = user.role?.stringValue === role;
      const matchesName = searchCriteria.name
        ? user.name?.stringValue
            .toLowerCase()
            .includes(searchCriteria.name.toLowerCase())
        : true;
      const matchesEmail = searchCriteria.email
        ? user.email?.stringValue
            .toLowerCase()
            .includes(searchCriteria.email.toLowerCase())
        : true;
      const matchesAge = searchCriteria.age
        ? user.age?.integerValue === searchCriteria.age
        : true;
      return matchesRole && matchesName && matchesEmail && matchesAge;
    });
    return filteredUsers;
  } catch (error) {
    console.error("Error fetching users by criteria:", error);
    throw error;
  }
};
// ✅ Get all doctors by criteria (name, email, or age)
export const getDoctorsByCriteria = async (searchCriteria: {
  name?: string;
  email?: string;
  age?: number;
}) => {
  return await getUsersByCriteria("doctor", searchCriteria);
};
// ✅ Get all patients by criteria (name, email, or age)
export const getPatientsByCriteria = async (searchCriteria: {
  name?: string;
  email?: string;
  age?: number;
}) => {
  return await getUsersByCriteria("patient", searchCriteria);
};

// ✅ Get all doctors by specialization
export const getDoctorsBySpecialization = async (specialization: string) => {
  try {
    const users = await getUsers();
    const doctors = users.filter(
      (user: User) =>
        user.role?.stringValue === "doctor" &&
        user.specialization?.stringValue === specialization
    );
    return doctors;
  } catch (error) {
    console.error(
      `Error fetching doctors by specialization ${specialization}:`,
      error
    );
    throw error;
  }
};
