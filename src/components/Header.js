import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';  // Ensure this import is in your main file

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <span className="logo">
          <i className="fas fa-home"></i> Technical Platform Station
        </span>
      </div>
      <div className="header-right">
        <div className="dropdown">
          <button className="dropbtn">
            Select a district or station name <i className="fas fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <Link to="#">Station 1</Link>
            <Link to="#">Station 2</Link>
            <Link to="#">Station 3</Link>
          </div>
        </div>
        <button className="language-button">EN</button>
        <i className="fas fa-user-circle user-icon"></i>
      </div>
    </div>
  );
};

export default Header;
