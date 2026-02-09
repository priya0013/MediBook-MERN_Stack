import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../api/client';
import '../styles/Auth.css';

/**
 * Login Component - Demonstrates useState Hook
 * 
 * useState Concept:
 * - setState lets us add state to functional components
 * - Syntax: const [value, setValue] = useState(initialValue)
 * - value: current state value
 * - setValue: function to update state
 * - Re-renders component when state changes
 */

function Login() {
  const navigate = useNavigate();
  
  // State to store form inputs
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // State to show/hide password
  const [showPassword, setShowPassword] = useState(false);

  // State for error messages
  const [error, setError] = useState('');

  // State for loading
  const [loading, setLoading] = useState(false);

  /**
   * Handle input changes
   * When user types in input field, this function updates the state
   * 
   * Why use this pattern?
   * - Keeps track of what user types
   * - Single source of truth (state)
   * - Easy to validate later
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,  // Spread existing data
      [name]: value // Update only the changed field
    });
    setError(''); // Clear error when user types
  };

  /**
   * Handle Login
   * In Phase 2, this will call backend API
   * For now, it does basic validation with mock data
   */
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Validation
    if (!formData.email || !formData.password) {
      setError('Email and password are required!');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email!');
      return;
    }

    try {
      setLoading(true);
      const data = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: formData
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('userEmail', data.user.email);
      localStorage.setItem('userId', data.user.id);

      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1> Login</h1>
        <p className="auth-subtitle">Sign in to book your appointment</p>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="auth-form">
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-link">
          <a href="/forgot-password">Forgot password?</a>
        </p>

        {/* Link to Register */}
        <p className="auth-link">
          Don't have an account? 
          <a href="/register"> Register here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
