import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Navigation</h3>
      <ul>
        <li>
          <Link to="/"> 
          <i className="fas fa-upload icon"></i>Device Config
          </Link>
        </li>
        <li>
          <Link to="/rule-chains">
          <i className="fas fa-sitemap icon"></i> Rule Chains
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
