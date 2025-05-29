import React from "react";
import "../Navbar/Navbar.css";

const Navbar = () => {
  return (
    <div className="Navbar-container">
      <div className="nav-heading-Container">
        <img className="logo-img" src="appLogo-1.svg" alt="" />
      </div>
    </div>
  );
};

// Future enhancement : we can display li of elements here ex:home, products, services, logout button with icons, settings icon, profile page icon, with proper links

export default Navbar;
