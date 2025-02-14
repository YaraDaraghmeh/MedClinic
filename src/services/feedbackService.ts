import axiosInstance from "../database/axiosInstance";

const COLLECTION_PATH = "/feedback";

export const submitFeedback = async (feedbackData: {
  userEmail: string;
  message: string;
  rating: number;
}) => {
  try {
    if (feedbackData.rating < 1 || feedbackData.rating > 10) {
      throw new Error("Rating must be between 1 and 10.");
    }

    const feedbackId = `${feedbackData.userEmail}-${Date.now()}`;

    const fields = {
      userEmail: { stringValue: feedbackData.userEmail },
      message: { stringValue: feedbackData.message },
      rating: { integerValue: feedbackData.rating },
      timestamp: { timestampValue: new Date().toISOString() },
    };

    const response = await axiosInstance.patch(`/feedback/${feedbackId}`, { fields });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFeedback = async () => {
  try {
    const response = await axiosInstance.get(COLLECTION_PATH);
    return response.data.documents.map((doc: any) => ({
      id: doc.name.split("/").pop(),
      ...doc.fields,
    }));
  } catch (error) {
    throw error;
  }
};



export const deleteFeedback = async (feedbackId: string) => {
  try {
    await axiosInstance.delete(`/feedback/${feedbackId}`);
    return { success: true, message: `Feedback ${feedbackId} deleted successfully` };
  } catch (error) {
    throw error;
  }
};

export const getFeedbackByEmail = async (email: string) => {
  try {
    const feedbacks = await getFeedback();
    return feedbacks.find((feedback: any) => feedback.email?.stringValue === email);
  } catch (error) {
    throw error;
  }
};

export const calculateStars = (rating: number): number => {
  return parseFloat(((rating / 10) * 5).toFixed(1));
};

export const getAverageRating = async () => {
  try {
    const feedbacks = await getFeedback();

    const totalRatings = feedbacks.reduce((sum: number, feedback: any) => {
      return sum + (feedback.rating?.integerValue ?? 0);
    }, 0);

    const averageRating = feedbacks.length > 0 ? (totalRatings / feedbacks.length).toFixed(1) : "0.0";

    return averageRating;
  } catch (error) {
    throw error;
  }
};
