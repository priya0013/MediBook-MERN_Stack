import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles/Home.css';

/**
 * Home Component - Landing page
 * 
 * Learning Goals:
 * 1. Building attractive landing page
 * 2. Call-to-action buttons
 * 3. Feature showcase
 */

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to MediBook</h1>
          <p>Book your appointments with trusted doctors</p>
          <div className="hero-buttons">
            <button 
              className="btn-hero primary"
              onClick={() => navigate('/register')}
            >
              Get Started
            </button>
            <button 
              className="btn-hero secondary"
              onClick={() => navigate('/login')}
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </section>

   

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to book your appointment?</h2>
        <button 
          className="btn-cta"
          onClick={() => navigate('/register')}
        >
          Start Booking Now →
        </button>
      </section>
    </div>
  );
}

export default Home;
