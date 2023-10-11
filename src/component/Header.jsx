import React from "react";
import { BsGithub } from "react-icons/bs";
import '../styles/Header.css'
import logo from '../assets/logo-2-new.png'
import Home from "./Home";

const Header = () => {
  return (
    <div className="container">
      <div className="container__name">
        <img id="image" src={logo} />
        <h2 id="header-name">Numé Hlpr</h2>
      </div>
      <div className="container__links">
        <a href="/home">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="https://www.github.com/surjendu104" target="_blank">
          <BsGithub size={20}/>
        </a>
      </div>
    </div>
  );
};

export default Header;
