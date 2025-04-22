import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // On every route change, re‑check localStorage and backend session
    const stored = JSON.parse(localStorage.getItem('user'));
    if (!stored) {
      setUser(null);
      return;
    }

    // Verify with backend that session is still valid
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/profile`, { withCredentials: true })
      .then(() => {
        setUser(stored);
      })
      .catch(() => {
        localStorage.removeItem('user');
        setUser(null);
      });
  }, [location]);

  const handleLogout = () => {
    // clear client‐side
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">✈️ FlyNow</Link>
      <div className="nav-links">
        {!user ? (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/register" className="nav-btn">Register</Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="nav-btn">Profile</Link>
            <button onClick={handleLogout} className="nav-btn logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
