import React, { useEffect, useState } from 'react';
import '../styles/Header.css';
import ThemeToggle from './ThemeToggle';
import { Droplet } from 'lucide-react';

const quotes = [
  "Every drop counts – save water, save life.",
  "Pure water is the world's first and foremost medicine.",
  "Water is life. Don't waste it.",
  "Thousands have lived without love, not one without water.",
  "No water, no life. No blue, no green."
];

const Header = ({ theme, toggleTheme }) => {
  const [quote, setQuote] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Choose a random quote from the list
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
    
    // Set current date
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, []);

  return (
    <div className="header">
      <div className="header-left">
        <h1 class="headerh1">
          <Droplet size={24} className="header-icon" /> DWLR Dashboard
        </h1>
        <p class="dummyb">Welcome, Water Board Admin • {currentDate}</p>
      </div>
      <div className="header-right">
        <blockquote className="quote-of-the-day">💧 {quote}</blockquote>
        <div className="theme-toggle-container">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </div>
  );
};

export default Header;