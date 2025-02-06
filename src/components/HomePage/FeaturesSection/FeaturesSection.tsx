import React from "react";
import "./FeaturesSection.css";

const features = [
  { icon: "fas fa-heartbeat", title: "Quality Care", description: "We provide high-quality, professional healthcare services." },
  { icon: "fas fa-wallet", title: "Affordable Prices", description: "Access to excellent medical care at affordable prices for everyone." },
  { icon: "fas fa-clock", title: "Fast Service", description: "Quick and efficient service with minimal wait times." },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section">
      <h2 className="section-title">Our Features</h2>
      <div className="features-container">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">
              <i className={feature.icon}></i>
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
