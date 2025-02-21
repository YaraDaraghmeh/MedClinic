import React from "react";
import { Box } from "@mui/material";
import { Star, StarHalf, StarBorder } from "@mui/icons-material";

interface StarRatingProps {
  rating: number; // Rating out of 10
}



const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating); 
  const emptyStars = 5 - fullStars ; 

  return (
    <Box display="flex" alignItems="center">
      {/* Full Stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star key={`full-${index}`} sx={{ color: "#ffc107", fontSize: "1.2rem" }} />
      ))}

      
      {/* Empty Stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <StarBorder key={`empty-${index}`} sx={{ color: "#ffc107", fontSize: "1.2rem" }} />
      ))}
    </Box>
  );
};

export default StarRating;