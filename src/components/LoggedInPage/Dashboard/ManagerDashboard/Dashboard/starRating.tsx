import React from "react";
import { Box } from "@mui/material";
import { Star, StarHalf, StarBorder } from "@mui/icons-material";

interface StarRatingProps {
  rating: number; // Rating out of 10
}

// Method to convert rating out of 10 to rating out of 5
export const calculateStars = (rating: number): number => {
  return parseFloat(((rating / 10) * 5).toFixed(1));
};

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const convertedRating = calculateStars(rating); // Convert rating to out of 5
  const fullStars = Math.floor(convertedRating); // Number of full stars
  const hasHalfStar = convertedRating % 1 !== 0; // Check if there's a half star
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Number of empty stars

  return (
    <Box display="flex" alignItems="center">
      {/* Full Stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star key={`full-${index}`} sx={{ color: "#ffc107", fontSize: "1.2rem" }} />
      ))}

      {/* Half Star */}
      {hasHalfStar && <StarHalf sx={{ color: "#ffc107", fontSize: "1.2rem" }} />}

      {/* Empty Stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <StarBorder key={`empty-${index}`} sx={{ color: "#ffc107", fontSize: "1.2rem" }} />
      ))}
    </Box>
  );
};

export default StarRating;