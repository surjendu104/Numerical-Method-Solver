import React from "react";
import "../styles/Landing.css";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const handelClick = () => {
    navigate("/home");
  };
  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="landing-about-header">
          Start Here
        </div>
        <div>
          Explore the available methods. Give your problem and get the efficient solution.
        </div>
        <button
          className="outer-buttons"
          id="landing-button"
          onClick={handelClick}
        >
          Launch
        </button>
      </div>
      <div className="landing-about">
        <div className="landing-about-header">About</div>
        <div>This a site made with 💖 to solve various numerical method problems. Here are the available methods
          <span className="landing-span">Numerical Interpolation</span>
          <span className="landing-span">Numerical Integration</span>
          <span className="landing-span">Solution of Linear Algebric Equation</span>
          <span className="landing-span">Solution of Ordinary Differential Equation</span>
          <span className="landing-span">Solution of Algebric and Transcendental Equation</span>
        </div>
      </div>
      <div className="landing-contact">
        <div className="landing-about-header">Features</div>
        <div>
          <span className="landing-span">Solution of numerical methods</span>
          <span className="landing-span">Interative chart of the solution</span>
          <span className="landing-span">Accurate results</span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
