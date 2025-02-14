import { 
    createAppointment,
    getAppointments,
    deleteAppointment,
    getAppointmentsByDoctor,
    getAppointmentsByPatient,
    isAppointmentTimeTakenForDoctor,
    getAppointmentsForDoctorToday
  } from "../services/appointmentService";
  
  // Mock all service methods explicitly
  jest.mock("../services/appointmentService", () => ({
    createAppointment: jest.fn(),
    getAppointments: jest.fn(),
    deleteAppointment: jest.fn(),
    getAppointmentsByDoctor: jest.fn(),
    getAppointmentsByPatient: jest.fn(),
    isAppointmentTimeTakenForDoctor: jest.fn(),
    getAppointmentsForDoctorToday: jest.fn(),
  }));
  
  describe("appointmentService", () => {
    afterEach(() => {
      jest.clearAllMocks(); // Clear mocks after each test
    });
  
    type AppointmentStatus = "pending" | "confirmed" | "completed" | "canceled";
  
    // Test createAppointment
    it("should create an appointment", async () => {
      const mockAppointmentData = {
        doctorEmail: "doctor@example.com",
        patientEmail: "patient@example.com",
        appointmentDate: new Date(),
        appointmentTime: "10:00",
        reason: "Checkup",
        status: "pending" as AppointmentStatus,
      };
  
      // Mocking the resolved value of the createAppointment function
      (createAppointment as jest.Mock).mockResolvedValue({});
  
      await createAppointment(mockAppointmentData);  // Calling the actual method
  
      // Verifying that the function is called with the expected arguments
      expect(createAppointment).toHaveBeenCalledWith(mockAppointmentData);
    });
  
    // Test getAppointments
    it("should fetch all appointments", async () => {
      const mockAppointments = [{ reason: "Checkup" }];
      (getAppointments as jest.Mock).mockResolvedValue(mockAppointments);  // Mocking resolved value
  
      const appointments = await getAppointments();  // Calling the actual method
      expect(appointments).toEqual(mockAppointments);  // Verifying the returned value
    });
  
    // Test deleteAppointment
    it("should delete an appointment", async () => {
      const mockAppointmentId = "appointment123";
      (deleteAppointment as jest.Mock).mockResolvedValue({});  // Mocking resolved value
  
      await deleteAppointment(mockAppointmentId);  // Calling the actual method
  
      // Verifying that the function is called with the correct argument
      expect(deleteAppointment).toHaveBeenCalledWith(mockAppointmentId);
    });
  
    // Test getAppointmentsByDoctor
    it("should fetch appointments by doctor email", async () => {
      const mockDoctorEmail = "doctor@example.com";
      const mockAppointments = [{ doctorEmail: mockDoctorEmail }];
      (getAppointmentsByDoctor as jest.Mock).mockResolvedValue(mockAppointments);  // Mocking resolved value
  
      const appointments = await getAppointmentsByDoctor(mockDoctorEmail);  // Calling the actual method
      expect(appointments).toEqual(mockAppointments);  // Verifying the returned value
      expect(getAppointmentsByDoctor).toHaveBeenCalledWith(mockDoctorEmail);  // Verifying the argument passed
    });
  
    // Test getAppointmentsByPatient
    it("should fetch appointments by patient email", async () => {
      const mockPatientEmail = "patient@example.com";
      const mockAppointments = [{ patientEmail: mockPatientEmail }];
      (getAppointmentsByPatient as jest.Mock).mockResolvedValue(mockAppointments);  // Mocking resolved value
  
      const appointments = await getAppointmentsByPatient(mockPatientEmail);  // Calling the actual method
      expect(appointments).toEqual(mockAppointments);  // Verifying the returned value
      expect(getAppointmentsByPatient).toHaveBeenCalledWith(mockPatientEmail);  // Verifying the argument passed
    });
  
    // Test isAppointmentTimeTakenForDoctor
    it("should check if appointment time is taken for a doctor", async () => {
      const mockDoctorEmail = "doctor@example.com";
      const mockDate = new Date();
      const mockTime = "10:00";
      const mockAppointments = [
        { doctorEmail: mockDoctorEmail, appointmentDate: mockDate, appointmentTime: mockTime },
      ];
      (isAppointmentTimeTakenForDoctor as jest.Mock).mockResolvedValue(false);  // Mocking resolved value
  
      const isTaken = await isAppointmentTimeTakenForDoctor(mockDoctorEmail, mockDate, mockTime);  // Calling the actual method
      expect(isTaken).toBe(false);  // Verifying the returned value
    });
  
    // Test getAppointmentsForDoctorToday
    it("should fetch appointments for a doctor today", async () => {
      const mockDoctorEmail = "doctor@example.com";
      const mockAppointments = [{ doctorEmail: mockDoctorEmail, appointmentDate: new Date() }];
      (getAppointmentsForDoctorToday as jest.Mock).mockResolvedValue(mockAppointments);  // Mocking resolved value
  
      const appointments = await getAppointmentsForDoctorToday(mockDoctorEmail);  // Calling the actual method
      expect(appointments.length).toBeGreaterThan(0);  // Verifying that appointments are fetched
    });
  });
  