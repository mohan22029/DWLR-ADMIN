import React, { useEffect, useState } from 'react';
import '../styles/Header.css';
import ThemeToggle from './ThemeToggle'; // Adjust path as needed

const quotes = [
  "Every drop counts – save water, save life.",
  "Pure water is the world’s first and foremost medicine.",
  "Water is life. Don’t waste it.",
  "Thousands have lived without love, not one without water.",
  "No water, no life. No blue, no green."
];

const Header = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Choose a random quote from the list
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="header">
      <div className="header-left">
        <h1>DWLR Dashboard</h1>
        <p>Welcome, Water Board Admin</p>
      </div>
      <div className="header-right">
        <blockquote className="quote-of-the-day">💧 {quote}</blockquote>
        <div className="theme-toggle">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;