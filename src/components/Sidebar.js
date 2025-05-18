import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>DWLR Portal</h2>
      <ul>
        <li><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link></li>
        <li><Link to="/anomaly" style={{ textDecoration: 'none', color: 'inherit' }}>Anomaly Detection</Link></li>
        <li><Link to="/alert" style={{ textDecoration: 'none', color: 'inherit' }}>Alert</Link></li>
        <li><Link to="/news" style={{ textDecoration: 'none', color: 'inherit' }}>News</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
