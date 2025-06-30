import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Hero() {
    const navigate = useNavigate();

    const handleExploreClick = () => {
        navigate('/dashboard');
    };

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.3,
          delayChildren: 0.2,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

  return (
    <section className="hero">
        <div className="container">
            <motion.div 
                className="hero-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1 variants={itemVariants}>ThreatLens Core</motion.h1>
                <motion.p variants={itemVariants}>
                    API-first malware detection service for security teams. Upload files, check URLs, or submit hashes to get threat reports with IoC extraction, actionable intelligence, and compliance tracking in real-time.
                </motion.p>
                <motion.div className="hero-buttons" variants={itemVariants}>
                    <a href="#features" onClick={handleExploreClick} className="btn-primary">Explore Platform</a>
                    <a href="#waitlist" className="btn-secondary">Join Waitlist</a>
                </motion.div>
            </motion.div>
        </div>
    </section>
  )
}

export default Hero;