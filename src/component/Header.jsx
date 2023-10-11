import React, { useState } from "react";
import { BsGithub } from "react-icons/bs";
import "../styles/Header.css";
import logo from "../assets/logo-2-new.png";
import Home from "./Home";
import "../styles/HamburgerMenu.css";

const Header = () => {
  return (
    <div className="container">
      <div className="container__name">
        <a href="/">
          <div className="container__name">
            <img id="image" src={logo} />
            <h2 id="header-name">Numé Hlpr</h2>
          </div>
        </a>
      </div>
      <div className="container__links">
        <a href="/home">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="https://github.com/surjendu104/Numerical-Method-Solver" target="_blank">
          <BsGithub size={20} />
        </a>
      </div>
      <HamburgerMenu />
    </div>
  );
};

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`hamburger-menu ${isOpen ? "open" : ""}`}>
      <div className="hamburger-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className={`menu ${isOpen ? "open" : ""}`}>
        <div className="menu-items">
          <a href="/home">Home</a>
        </div>
        <div className="menu-items">
          <a href="/about">About</a>
        </div>
        <div className="menu-items">
          <a href="/contact">Contact</a>
        </div>
        <div className="menu-items">
          <a href="https://www.github.com/surjendu104" target="_blank">
            <BsGithub size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
