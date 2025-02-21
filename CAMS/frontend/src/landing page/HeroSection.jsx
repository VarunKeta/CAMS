import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text-container">
            <h2 className="welcome-text">Welcome to</h2>
            <h4 className="main-title">VNRVJIET Campus Connect</h4>
            <p className="description">
              Connect, Learn, and Grow with our innovative platform. 
              Join a community where knowledge meets opportunity.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary">Get Started</button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
