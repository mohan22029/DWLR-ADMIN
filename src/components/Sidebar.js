import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';
import { Droplet, AlertTriangle, BarChart2, FileText, Menu, X } from 'lucide-react';

const Sidebar = ({ isOpen = false, toggleSidebar }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleMenuItemKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      console.log('Sidebar: Menu item keydown, closing sidebar');
      if (typeof toggleSidebar === 'function') {
        toggleSidebar();
      } else {
        console.error('Sidebar: toggleSidebar is not a function');
      }
    }
  };

  const handleToggle = () => {
    console.log('Sidebar: Toggling sidebar, isOpen:', !isOpen);
    if (typeof toggleSidebar === 'function') {
      toggleSidebar();
    } else {
      console.error('Sidebar: toggleSidebar is not a function');
    }
  };

  return (
    <div>
      <div
        className="hamburger"
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            console.log('Sidebar: Hamburger keydown, toggling sidebar');
            if (typeof toggleSidebar === 'function') {
              toggleSidebar();
            } else {
              console.error('Sidebar: toggleSidebar is not a function');
            }
          }
        }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2 class="dummyh2">DWLR Portal</h2>
        <ul>
          <li
            className={isActive('/') ? 'active' : ''}
            onKeyDown={handleMenuItemKeyDown}
            tabIndex={0}
            role="menuitem"
          >
            <Link
              to="/"
              onClick={() => {
                console.log('Sidebar: Dashboard link clicked, closing sidebar');
                if (typeof toggleSidebar === 'function') {
                  toggleSidebar();
                } else {
                  console.error('Sidebar: toggleSidebar is not a function');
                }
              }}
            >
              <Droplet size={20} /> Dashboard
            </Link>
          </li>
          <li
            className={isActive('/anomaly') ? 'active' : ''}
            onKeyDown={handleMenuItemKeyDown}
            tabIndex={0}
            role="menuitem"
          >
            <Link
              to="/anomaly"
              onClick={() => {
                console.log('Sidebar: Anomaly link clicked, closing sidebar');
                if (typeof toggleSidebar === 'function') {
                  toggleSidebar();
                } else {
                  console.error('Sidebar: toggleSidebar is not a function');
                }
              }}
            >
              <AlertTriangle size={20} /> Anomaly Detection
            </Link>
          </li>
          <li
            className={isActive('/alert') ? 'active' : ''}
            onKeyDown={handleMenuItemKeyDown}
            tabIndex={0}
            role="menuitem"
          >
            <Link
              to="/alert"
              onClick={() => {
                console.log('Sidebar: Alerts link clicked, closing sidebar');
                if (typeof toggleSidebar === 'function') {
                  toggleSidebar();
                } else {
                  console.error('Sidebar: toggleSidebar is not a function');
                }
              }}
            >
              <BarChart2 size={20} /> Alerts
            </Link>
          </li>
          <li
            className={isActive('/news') ? 'active' : ''}
            onKeyDown={handleMenuItemKeyDown}
            tabIndex={0}
            role="menuitem"
          >
            <Link
              to="/news"
              onClick={() => {
                console.log('Sidebar: News link clicked, closing sidebar');
                if (typeof toggleSidebar === 'function') {
                  toggleSidebar();
                } else {
                  console.error('Sidebar: toggleSidebar is not a function');
                }
              }}
            >
              <FileText size={20} /> News
            </Link>
          </li>
          <li
            className={isActive('/predict') ? 'active' : ''}
            onKeyDown={handleMenuItemKeyDown}
            tabIndex={0}
            role="menuitem"
          >
            <Link
              to="/predict"
              onClick={() => {
                console.log('Sidebar: Prediction link clicked, closing sidebar');
                if (typeof toggleSidebar === 'function') {
                  toggleSidebar();
                } else {
                  console.error('Sidebar: toggleSidebar is not a function');
                }
              }}
            >
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
    </div>
  );
};

export default Sidebar;