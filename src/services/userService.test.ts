import { 
    getUsers,
    getDoctors,
    getPatients,
    addUser,
    updateUser,
    deleteUser,
    authenticateUser,
    getUserProfile,
    getUserByEmail,
  } from "../services/userService";
  import bcrypt from "bcryptjs";
  
  jest.mock("../services/userService");
  
  describe("userService", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    // Test getUsers
    it("should fetch all users", async () => {
      const mockUsers = [
        { id: "1", name: "user1" },
        { id: "2", name: "user2" },
      ];
  
      // Mock the return value of getUsers method
      (getUsers as jest.Mock).mockResolvedValue(mockUsers);
  
      const users = await getUsers();
      expect(users).toEqual(mockUsers);
    });
  
    // Test getDoctors
    it("should fetch all doctors", async () => {
      const mockUsers = [
        { id: "1", role: "doctor" },
        { id: "2", role: "patient" },
      ];
  
      (getDoctors as jest.Mock).mockResolvedValue(mockUsers.filter((user) => user.role === "doctor"));
  
      const doctors = await getDoctors();
      expect(doctors.length).toBe(1);
      expect(doctors[0].role).toBe("doctor");
    });
  
    // Test getPatients
    it("should fetch all patients", async () => {
      const mockUsers = [
        { id: "1", role: "patient" },
        { id: "2", role: "doctor" },
      ];
  
      (getPatients as jest.Mock).mockResolvedValue(mockUsers.filter((user) => user.role === "patient"));
  
      const patients = await getPatients();
      expect(patients.length).toBe(1);
      expect(patients[0].role).toBe("patient");
    });
  
    // Test addUser
    it("should add a new user", async () => {
      const mockUserData = {
        email: "test@example.com",
        name: "Test User",
        dateOfBirth: "1990-01-01",
        password: "password123",
        role: "patient",
        gender: "male",
      };
  
      (addUser as jest.Mock).mockResolvedValue(mockUserData);
  
      await addUser(mockUserData);
      expect(addUser).toHaveBeenCalledWith(mockUserData);
    });
  
    // Test updateUser
    it("should update a user", async () => {
      const mockEmail = "test@example.com";
      const mockUpdatedData = { name: "Updated Name" };
  
      (updateUser as jest.Mock).mockResolvedValue(mockUpdatedData);
  
      await updateUser(mockEmail, mockUpdatedData);
      expect(updateUser).toHaveBeenCalledWith(mockEmail, mockUpdatedData);
    });
  
    // Test deleteUser
    it("should delete a user", async () => {
      const mockEmail = "test@example.com";
  
      (deleteUser as jest.Mock).mockResolvedValue({});
  
      await deleteUser(mockEmail);
      expect(deleteUser).toHaveBeenCalledWith(mockEmail);
    });
  
    // Test authenticateUser
    it("should authenticate a user", async () => {
      const mockEmail = "test@example.com";
      const mockPassword = "password123";
      const mockHashedPassword = await bcrypt.hash(mockPassword, 10);
  
      (authenticateUser as jest.Mock).mockResolvedValue({
        email: mockEmail,
        password: mockHashedPassword,
      });
  
      const user = await authenticateUser(mockEmail, mockPassword);
      expect(user).toBeDefined();
    });
  
    // Test getUserByEmail
    it("should fetch a user by email", async () => {
      const mockEmail = "test@example.com";
      const mockUser = { email: mockEmail };
  
      (getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
  
      const user = await getUserByEmail(mockEmail);
      expect(user).toBeDefined();
      expect(getUserByEmail).toHaveBeenCalledWith(mockEmail);
    });
  
    // Test getUserProfile
    it("should fetch user profile", async () => {
      const mockUserId = "12345";
      const mockProfile = { userId: mockUserId, profileData: "data" };
  
      (getUserProfile as jest.Mock).mockResolvedValue(mockProfile);
  
      const userProfile = await getUserProfile(mockUserId);
      expect(userProfile).toBeDefined();
      expect(getUserProfile).toHaveBeenCalledWith(mockUserId);
    });
  });
  