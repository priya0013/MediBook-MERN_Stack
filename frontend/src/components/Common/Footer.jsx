import React from 'react';
import '../styles/Footer.css';

/**
 * Footer Component - Displayed on all pages
 * 
 * Learning Goals:
 * 1. Simple presentational component
 * 2. No state needed
 * 3. Static content display
 */

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Sections */}
        <div className="footer-sections">
          {/* About Section */}
          <div className="footer-section">
            <h4>About MediBook</h4>
            <p>Your trusted platform for booking appointments with doctors.</p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/dashboard">Browse Services</a></li>
              <li><a href="/my-appointments">My Appointments</a></li>
              <li><a href="/">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: support@medibook.com</p>
            <p>Phone: +91 1800-353567</p>
            <p>Address: Mumbai, India</p>
          </div>

          {/* Social Media */}
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="/">Facebook</a>
              <a href="/">Twitter</a>
              <a href="/">Instagram</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} MediBook. All rights reserved.</p>
          <p>
            <a href="/">Privacy Policy</a> | 
            <a href="/"> Terms & Conditions</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
