import React from "react";
import Nav from "./Nav";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Little Lemon Logo" className="logo-img" />
      </div>
      <Nav />
    </header>
  );
};

export default Header;
