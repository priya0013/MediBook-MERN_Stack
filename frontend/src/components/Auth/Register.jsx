import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../api/client';
import '../styles/Auth.css';

/**
 * Register Component - Advanced useState patterns
 * 
 * Learning Goals:
 * 1. Multiple useState hooks (for different form fields)
 * 2. Form validation patterns
 * 3. Conditional rendering (showing/hiding elements)
 * 4. Error handling
 */

function Register() {
  const navigate = useNavigate();

  // State for all form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // State for password visibility
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false
  });

  // State for error messages
  const [errors, setErrors] = useState({});

  // State for loading (will be used in Phase 2 for API call)
  const [loading, setLoading] = useState(false);

  // State for success message
  const [successMessage, setSuccessMessage] = useState('');

  /**
   * Handle input changes using a cleaner pattern
   * Explanation:
   * - e.target.name: the "name" attribute of the input field
   * - e.target.value: what user typed
   * - We use spread operator (...) to keep other fields unchanged
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  /**
   * Validate all form fields
   * Returns object with field names as keys and error messages as values
   * 
   * Why validate on frontend?
   * - Better UX (instant feedback)
   * - Reduce server load (catch errors before sending to backend)
   * - Note: Always validate on backend too (in Phase 2) for security!
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  /**
   * Handle Registration
   * This demonstrates:
   * 1. Form validation
   * 2. Loading state management
   * 3. Success handling
   */
  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validate
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      await apiRequest('/api/auth/register', {
        method: 'POST',
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        }
      });

      setSuccessMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1200);
    } catch (err) {
      setErrors({
        ...errors,
        form: err.message || 'Registration failed'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Register</h1>
        <p className="auth-subtitle">Create an account to book appointments</p>

        {/* Success Message */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="auth-form">
          {errors.form && <div className="error-message">{errors.form}</div>}
          
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="10-digit phone number"
              className={errors.phone ? 'input-error' : ''}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPasswords.password ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
                className={errors.password ? 'input-error' : ''}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPasswords({
                  ...showPasswords,
                  password: !showPasswords.password
                })}
              >
                {showPasswords.password ? 'hide' : 'show'}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPasswords.confirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className={errors.confirmPassword ? 'input-error' : ''}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPasswords({
                  ...showPasswords,
                  confirmPassword: !showPasswords.confirmPassword
                })}
              >
                {showPasswords.confirmPassword ? 'hide' : 'show'}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        {/* Link to Login */}
        <p className="auth-link">
          Already have an account? 
          <a href="/login"> Login here</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
