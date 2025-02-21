import { Feedback } from "../Types";

export const getFeedbackByEmail = (feedbacks: Feedback[], email: string) => {
  return feedbacks.filter((feedback) => feedback.userEmail === email);
};

export const getAverageRating = (feedbacks: Feedback[]): string => {
  console.log("Original feedbacks:", feedbacks);

  if (!Array.isArray(feedbacks) || feedbacks.length === 0) {
    console.log("No feedbacks or invalid input.");
    return "0.0";
  }

  // Filter out invalid feedback ratings
  const validFeedbacks = feedbacks.filter((feedback) => feedback.rating != null);

  if (validFeedbacks.length === 0) {
    return "0.0";
  }

  // Calculate the total rating
  const totalRatings:number = validFeedbacks.reduce((sum:number, feedback) => {
    return sum + Number(feedback.rating!);
  }, 0);

  
  // Calculate the average and format it to one decimal place
  const averageRating = (totalRatings / validFeedbacks.length).toFixed(1);
  
  return averageRating;
};
