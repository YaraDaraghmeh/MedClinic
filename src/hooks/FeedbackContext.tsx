import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../database/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Feedback } from "../Types";

const COLLECTION_PATH = "feedback";

interface FeedbackContextType {
  feedbacks: Feedback[];
  submitFeedback: (feedbackData: {
    userEmail: string;
    message: string;
    rating: number;
  }) => Promise<void>;
  deleteFeedback: (feedbackId: string) => Promise<void>;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined
);

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  // Set up real-time listener for feedbacks
  useEffect(() => {
    const feedbacksCollection = collection(db, COLLECTION_PATH);

    const unsubscribe = onSnapshot(feedbacksCollection, (snapshot) => {
      const updatedFeedbacks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFeedbacks(updatedFeedbacks as Feedback[]);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  const submitFeedback = async (feedbackData: {
    userEmail: string;
    message: string;
    rating: number;
  }) => {
    try {
      if (feedbackData.rating < 1 || feedbackData.rating > 10) {
        throw new Error("Rating must be between 1 and 10.");
      }

      const feedbacksCollection = collection(db, COLLECTION_PATH);

      await addDoc(feedbacksCollection, {
        userEmail: feedbackData.userEmail,
        message: feedbackData.message,
        rating: feedbackData.rating,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      throw error;
    }
  };

  const deleteFeedback = async (feedbackId: string) => {
    try {
      const feedbackDoc = doc(db, COLLECTION_PATH, feedbackId);
      await deleteDoc(feedbackDoc);
    } catch (error) {
      console.error("Failed to delete feedback:", error);
      throw error;
    }
  };

  return (
    <FeedbackContext.Provider
      value={{ feedbacks, submitFeedback, deleteFeedback }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useFeedback must be used within a FeedbackProvider");
  }
  return context;
};
