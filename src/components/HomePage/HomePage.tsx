import React from "react";
import "./HomePage.css";
import FeaturesSection from "./FeaturesSection/FeaturesSection";
import TestimonialsSection from "./TestimonialsSection/TestimonialsSection";
import { TypeAnimation } from "react-type-animation";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <section className="homepage-container">
        <div className="homepage-content">
          {/* Left Section - Text */}
          <div className="homepage-text">
            <h1 className="fade-in ">We Take Care of Your Health</h1>
            <TypeAnimation
              sequence={[
                "We Are Providing Best & Affordable Health Care.", 1000
              ]}
              wrapper="h2"
              speed={20}
              cursor={true}
              repeat={Infinity}
              
              className="typing-text"
            />
            <p className="fade-in delay-800">
              Our mission is to deliver the{" "}
              <span className="highlight">highest quality healthcare services.</span>
            </p>
            <p className="fade-in delay-1000">
              We believe that{" "}
              <span className="highlight">everyone deserves access</span> to excellent medical care without compromising on quality.
            </p>
            <button className="get-started-btn">
              Get Started <span className="arrow">→</span>
            </button>
          </div>

          {/* Right Section - Images */}
          <div className="homepage-images fade-in delay-1400">
            <div className="image-container">
              <img
                src="https://demo.awaikenthemes.com/theme-medipro/wp-content/uploads/2024/05/hero-img-1.jpg"
                alt="Doctor"
                className="image doctor"
              />
              <img
                src="https://demo.awaikenthemes.com/theme-medipro/wp-content/uploads/2024/05/hero-img-2.jpg"
                alt="Hospital"
                className="image hospital"
              />
            </div>
          </div>
        </div>
      </section>
      <FeaturesSection />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
