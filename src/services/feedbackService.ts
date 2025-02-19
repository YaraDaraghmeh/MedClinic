import { Feedback } from "../Types";

export const getFeedbackByEmail = (feedbacks: Feedback[], email: string) => {
  return feedbacks.filter((feedback) => feedback.userEmail === email);
};

export const getAverageRating = (feedbacks: Feedback[]) => {
  const totalRatings = feedbacks.reduce((sum, feedback) => {
    return sum + (feedback.rating ?? 0);
  }, 0);

  const averageRating = feedbacks.length > 0 ? (totalRatings / feedbacks.length).toFixed(1) : "0.0";

  return averageRating;
};