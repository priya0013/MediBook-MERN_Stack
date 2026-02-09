import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

/**
 * Navbar Component - Navigation bar visible on all pages
 * 
 * Learning Goals:
 * 1. Conditional rendering based on user role
 * 2. useLocation hook to highlight active page
 * 3. useNavigate for programmatic navigation
 * 4. Logout functionality
 */

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get user info from localStorage (set during login)
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  /**
   * Handle logout
   * Clear localStorage and redirect to login
   */
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/login');
    }
  };

  /**
   * Check if current path is active
   * Used to highlight active nav link
   */
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand/Logo */}
        <div className="navbar-brand">
          <a href="/" className="logo">
            MediBook
          </a>
        </div>

        {/* Navigation Links */}
        <div className="navbar-menu">
          {!token ? (
            // Not logged in - show Login and Register
            <div className="nav-links">
              <a 
                href="/login"
                className={`nav-link ${isActive('/login') ? 'active' : ''}`}
              >
                Login
              </a>
              <a 
                href="/register"
                className={`nav-link ${isActive('/register') ? 'active' : ''}`}
              >
                Register
              </a>
            </div>
          ) : (
            // Logged in - show role-based menu
            <div className="nav-links">
              {role === 'user' && (
                <>
                  <a 
                    href="/dashboard"
                    className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                  >
                    Dashboard
                  </a>
                  <a 
                    href="/my-appointments"
                    className={`nav-link ${isActive('/my-appointments') ? 'active' : ''}`}
                  >
                    My Appointments
                  </a>
                </>
              )}

              {role === 'admin' && (
                <>
                  <a 
                    href="/admin"
                    className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
                  >
                    Admin Dashboard
                  </a>
                  <a 
                    href="/admin/services"
                    className={`nav-link ${isActive('/admin/services') ? 'active' : ''}`}
                  >
                    Manage Services
                  </a>
                </>
              )}

              {/* Logout Button */}
              <button 
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
