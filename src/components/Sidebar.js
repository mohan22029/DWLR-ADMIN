import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';
import { Droplet, AlertTriangle, BarChart2, FileText } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 768 && sidebarOpen) {
        if (
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target) &&
          hamburgerRef.current &&
          !hamburgerRef.current.contains(event.target)
        ) {
          console.log('Closing sidebar due to click outside');
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  useEffect(() => {
    console.log('Sidebar open state:', sidebarOpen);
  }, [sidebarOpen]);

  const handleMenuItemClick = (e) => {
    console.log('Menu item clicked, closing sidebar');
    setSidebarOpen(false);
  };

  const handleHamburgerKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSidebarOpen(!sidebarOpen);
    }
  };

  const handleMenuItemKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <div
        className="hamburger"
        ref={hamburgerRef}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        onKeyDown={handleHamburgerKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Toggle sidebar"
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`sidebar ${sidebarOpen ? 'active' : ''}`} ref={sidebarRef}>
        <h2>DWLR Portal</h2>
        <ul>
          <li
            className={isActive('/') ? 'active' : ''}
            onKeyDown={handleMenuItemKeyDown}
            tabIndex={0}
            role="menuitem"
          >
            <Link to="/" onClick={handleMenuItemClick}>
              <Droplet size={20} /> Dashboard
            </Link>
          </li>
          <li
            className={isActive('/anomaly') ? 'active' : ''}
            onKeyDown={handleMenuItemKeyDown}
            tabIndex={0}
            role="menuitem"
          >
            <Link to="/anomaly" onClick={handleMenuItemClick}>
              <AlertTriangle size={20} /> Anomaly Detection
            </Link>
          </li>
          <li
            className={isActive('/alert') ? 'active' : ''}
            onKeyDown={handleMenuItemKeyDown}
            tabIndex={0}
            role="menuitem"
          >
            <Link to="/alert" onClick={handleMenuItemClick}>
              <BarChart2 size={20} /> Alerts
            </Link>
          </li>
          <li
            className={isActive('/news') ? 'active' : ''}
            onKeyDown={handleMenuItemKeyDown}
            tabIndex={0}
            role="menuitem"
          >
            <Link to="/news" onClick={handleMenuItemClick}>
              <FileText size={20} /> News
            </Link>
          </li>
          <li
            className={isActive('/predict') ? 'active' : ''}
            onKeyDown={handleMenuItemKeyDown}
            tabIndex={0}
            role="menuitem"
          >
            <Link to="/predict" onClick={handleMenuItemClick}>
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
    </>
  );
};

export default Sidebar;