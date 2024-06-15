import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../res/styles/Sidebar.css'; // Make sure to import the CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Technical Platform Station</h3>
      <ul>
        <li>
          <Link to="/">
            <i className="fas fa-upload icon"></i><span className="nav-text">Device Config</span>
          </Link>
        </li>
        <li>
          <Link to="/rule-chains">
            <i className="fas fa-sitemap icon"></i><span className="nav-text">Rule Chains</span>
          </Link>
        </li>
        <li>
          <Link to="/logs">
            <i className="fa-regular fa-file-lines icon"></i><span className="nav-text">Logs</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
