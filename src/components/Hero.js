import React from 'react'
import { useNavigate } from 'react-router-dom';

function Hero() {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleExploreClick = () => {
        navigate('/dashboard'); // Navigate to the /dashboard route
    };

  return (
    <section className="hero">
        <div className="container">
            <div className="hero-content">
                <h1>ThreatLens Core</h1>
                <p> API-first malware detection service for security teams. Upload files, check URLs, or submit hashes to get threat reports with IoC extraction, actionable intelligence, and compliance tracking in real-time.</p>
                <div className="hero-buttons">
                    <a href="#features" onClick={handleExploreClick} className="btn-primary">Explore Platform</a>
                    <a href="#waitlist" className="btn-secondary">Join Waitlist</a>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero