import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hi">Hi 👋</div>
      <div className="about-brief">
        Your go-to destination for numerical method solutions! We are passionate
        about simplifying complex mathematical problems and making them
        accessible to everyone. Our platform is designed to empower students,
        engineers, and professionals with efficient and accurate numerical
        methods to tackle a wide range of mathematical challenges.
      </div>
      <div className="about-diff">What Sets Us Apart ❓ </div>
      <div className="about-points">
        <div className="about-points-box">
          <div className="about-points-header">User-Friendly</div>
          <div className="about-points-desc">
            At Nume Hlpr, we believe in simplicity. Our user-friendly interface
            ensures that you can find the solution you need quickly and easily.
          </div>
        </div>
        <div className="about-points-box">
          <div className="about-points-header">Comprehensive Solutions</div>
          <div className="about-points-desc">
            Whether you're dealing with root finding, numerical integration,
            differential equations, or any other numerical problem, we've got
            you covered. We offer a comprehensive library of numerical methods
            to suit your needs.
          </div>
        </div>
        <div className="about-points-box">
          <div className="about-points-header">Accuracy and Reliability</div>
          <div className="about-points-desc">
            Our solutions are rigorously tested and verified to ensure accuracy.
            You can trust the results you obtain on our platform.
          </div>
        </div>
        <div className="about-points-box">
          <div className="about-points-header">Educational Resources</div>
          <div className="about-points-desc">
            We're not just here to solve problems – we're here to help you
            learn. Explore our educational resources, tutorials, and
            explanations to deepen your understanding of numerical methods.
          </div>
        </div>
        <div className="about-points-box">
          <div className="about-points-header">Community Support</div>
          <div className="about-points-desc">
            Join a community of like-minded individuals, where you can share
            your knowledge, seek help, and collaborate on numerical method
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
