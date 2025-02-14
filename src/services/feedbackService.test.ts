import axiosInstance from "../database/axiosInstance";
import {
  submitFeedback,
  getFeedback,
  deleteFeedback,
  getFeedbackByEmail,
  calculateStars,
  getAverageRating,
} from "../services/feedbackService";

// Mock axiosInstance
jest.mock("../database/axiosInstance");

describe("feedbackService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test submitFeedback
  it("should submit feedback", async () => {
    const mockFeedbackData = {
      userEmail: "test@example.com",
      message: "Great service!",
      rating: 9,
    };
    (axiosInstance.patch as jest.Mock).mockResolvedValue({ data: {} });

    await submitFeedback(mockFeedbackData);
    expect(axiosInstance.patch).toHaveBeenCalledWith(
      `/feedback/${mockFeedbackData.userEmail}-${expect.any(Number)}`,
      expect.any(Object)
    );
  });

  // Test getFeedback
  it("should fetch all feedback", async () => {
    const mockFeedback = [{ fields: { message: { stringValue: "Great service!" } } }];
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: { documents: mockFeedback } });

    const feedback = await getFeedback();
    expect(feedback.length).toBe(1);
    expect(feedback[0].message.stringValue).toBe("Great service!");
  });

  // Test deleteFeedback
  it("should delete feedback", async () => {
    const mockFeedbackId = "feedback123";
    (axiosInstance.delete as jest.Mock).mockResolvedValue({});

    await deleteFeedback(mockFeedbackId);
    expect(axiosInstance.delete).toHaveBeenCalledWith(`/feedback/${mockFeedbackId}`);
  });

  // Test getFeedbackByEmail
  it("should fetch feedback by email", async () => {
    const mockEmail = "test@example.com";
    const mockFeedback = [{ fields: { userEmail: { stringValue: mockEmail } } }];
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: { documents: mockFeedback } });
  
    const feedback = await getFeedbackByEmail(mockEmail);
    expect(feedback).toBeDefined();
  });
  
  // Test calculateStars
  it("should calculate stars from rating", () => {
    const stars = calculateStars(8);
    expect(stars).toBe(4);
  });

  // Test getAverageRating
  it("should calculate average rating", async () => {
    const mockFeedback = [
      { fields: { rating: { integerValue: 8 } } },
      { fields: { rating: { integerValue: 10 } } },
    ];
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: { documents: mockFeedback } });

    const averageRating = await getAverageRating();
    expect(averageRating).toBe("9.0");
  });
});