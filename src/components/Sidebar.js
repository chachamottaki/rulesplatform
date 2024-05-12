import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Navigation</h3>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/rule-chains">Rule Chains</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
