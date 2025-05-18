import React from 'react';
import '../styles/ThemeToggle.css';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <div className="theme-toggle">
      <input
        type="checkbox"
        id="theme-toggle-checkbox"
        className="theme-toggle-checkbox"
        onChange={toggleTheme}
        checked={theme === 'dark'}
      />
      <label htmlFor="theme-toggle-checkbox" className="theme-toggle-label">
        <span className="theme-toggle-inner"></span>
        <span className="theme-toggle-switch"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;