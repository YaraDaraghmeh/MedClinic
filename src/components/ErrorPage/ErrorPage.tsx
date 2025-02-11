import React, { useEffect } from "react";
import { gsap } from "gsap";
import "./ErrorPage.css"; // Ensure the updated CSS file is imported

const ErrorPage = ({ errorMessage = 'Uh Oh! Page not found!' }) => {  
  useEffect(() => {
    // GSAP Animations
    let t1 = gsap.timeline();
    let t2 = gsap.timeline();
    let t3 = gsap.timeline();

    t1.to(".cog1-1", {
      transformOrigin: "50% 50%",
      rotation: "+=360",
      repeat: -1,
      ease: "none",
      duration: 8,
    });

    t2.to(".cog2-1", {
      transformOrigin: "50% 50%",
      rotation: "-=360",
      repeat: -1,
      ease: "none",
      duration: 8,
    });

    t3.fromTo(
      ".wrong-para-1",
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: { repeat: -1, yoyo: true } }
    );
  }, []);

  return (
    <div className="container-1">
      <h1 className="first-four-1">4</h1>
      <div className="cog-wheel1-1">
        <div className="cog1-1">
          <div className="top-1"></div>
          <div className="down-1"></div>
          <div className="left-top-1"></div>
          <div className="left-down-1"></div>
          <div className="right-top-1"></div>
          <div className="right-down-1"></div>
          <div className="left-1"></div>
          <div className="right-1"></div>
        </div>
      </div>

      <div className="cog-wheel2-1">
        <div className="cog2-1">
          <div className="top-1"></div>
          <div className="down-1"></div>
          <div className="left-top-1"></div>
          <div className="left-down-1"></div>
          <div className="right-top-1"></div>
          <div className="right-down-1"></div>
          <div className="left-1"></div>
          <div className="right-1"></div>
        </div>
      </div>

      <h1 className="second-four-1">4</h1>
      <p className="wrong-para-1">{errorMessage}</p>
    </div>
  );
};

export default ErrorPage;
