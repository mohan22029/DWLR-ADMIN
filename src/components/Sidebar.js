import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';
import { Droplet, AlertTriangle, BarChart2, FileText } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleMenuItemKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
    }
  };

  return (
    <div className="sidebar">
      <h2>DWLR Portal</h2>
      <ul>
        <li
          className={isActive('/') ? 'active' : ''}
          onKeyDown={handleMenuItemKeyDown}
          tabIndex={0}
          role="menuitem"
        >
          <Link to="/">
            <Droplet size={20} /> Dashboard
          </Link>
        </li>
        <li
          className={isActive('/anomaly') ? 'active' : ''}
          onKeyDown={handleMenuItemKeyDown}
          tabIndex={0}
          role="menuitem"
        >
          <Link to="/anomaly">
            <AlertTriangle size={20} /> Anomaly Detection
          </Link>
        </li>
        <li
          className={isActive('/alert') ? 'active' : ''}
          onKeyDown={handleMenuItemKeyDown}
          tabIndex={0}
          role="menuitem"
        >
          <Link to="/alert">
            <BarChart2 size={20} /> Alerts
          </Link>
        </li>
        <li
          className={isActive('/news') ? 'active' : ''}
          onKeyDown={handleMenuItemKeyDown}
          tabIndex={0}
          role="menuitem"
        >
          <Link to="/news">
            <FileText size={20} /> News
          </Link>
        </li>
        <li
          className={isActive('/predict') ? 'active' : ''}
          onKeyDown={handleMenuItemKeyDown}
          tabIndex={0}
          role="menuitem"
        >
          <Link to="/predict">
            <Droplet size={20} /> Water Level Prediction
          </Link>
        </li>
      </ul>
      <div className="sidebar-footer">
        <div className="water-drop-animation">
          <Droplet size={24} color="#4ECDC4" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
