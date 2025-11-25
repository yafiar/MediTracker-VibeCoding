import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo">💊</span>
        <h2>MediTracker</h2>
      </div>
      
      <button 
        className="hamburger-menu" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <button
          className={`nav-btn ${isActive('/dashboard') ? 'active' : ''}`}
          onClick={() => handleNavClick('/dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`nav-btn ${isActive('/today') ? 'active' : ''}`}
          onClick={() => handleNavClick('/today')}
        >
          Today
        </button>
        <button
          className={`nav-btn ${isActive('/notifications') ? 'active' : ''}`}
          onClick={() => handleNavClick('/notifications')}
        >
          Notifications
        </button>
        <button className="nav-btn danger" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
