import React from "react";
import "./TestimonialsSection.css";

const testimonials = [
  { 
    text: "The care I received was exceptional. I felt valued and heard.", 
    author: "John Doe", 
    image: "https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/E12KS1G65-W0168RE00G7-133faf432639-512.jpeg" 
  },
  { 
    text: "Highly recommend this clinic. Fast service and wonderful staff!", 
    author: "Jane Smith", 
    image: "https://img.freepik.com/free-psd/portrait-young-girl-black-t-shirt-isolated-white-background_1142-53483.jpg" 
  },
  { 
    text: "Great experience! The doctors were very professional and kind.", 
    author: "Mark Lee", 
    image: "https://www.morganstanley.com/content/dam/msdotcom/people/tiles/isaiah-dwuma.jpg.img.490.medium.jpg/1594668408164.jpg" 
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="testimonials-section">
      <h2 className="section-title">What Our Patients Say</h2>
      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <div className="testimonial-header">
              <img src={testimonial.image} alt={testimonial.author} className="testimonial-image" />
              <p className="testimonial-author">- {testimonial.author}</p>
            </div>
            <p className="testimonial-text">"{testimonial.text}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
