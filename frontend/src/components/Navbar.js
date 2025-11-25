import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo">💊</span>
        <h2>MediTracker</h2>
      </div>
      <div className="nav-links">
        <button
          className={`nav-btn ${isActive('/dashboard') ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`nav-btn ${isActive('/today') ? 'active' : ''}`}
          onClick={() => navigate('/today')}
        >
          Today
        </button>
        <button
          className={`nav-btn ${isActive('/notifications') ? 'active' : ''}`}
          onClick={() => navigate('/notifications')}
        >
          Notifications
        </button>
        <button className="nav-btn danger" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
