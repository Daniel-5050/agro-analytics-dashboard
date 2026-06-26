import React from 'react';
import { FaBell, FaUserCircle, FaLeaf } from 'react-icons/fa';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar px-4">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <FaLeaf className="brand-icon me-2" />
          <span className="brand-text">Agro-Analytics Dashboard</span>
        </a>

        <div className="d-flex align-items-center ms-auto nav-icons">
          <FaBell className="nav-icon me-4" />
          <FaUserCircle className="nav-icon profile-icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;