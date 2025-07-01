import React from 'react';
import { motion } from 'framer-motion';

function DemoSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className='landingall'
    >
      <div className='landingbody'>
        <section className="demo-section" id="demo">
          {/* ... rest of the component JSX ... */}
          <div className="container">
            <h2 className="section-title">Experience ThreatLens in Action</h2>
            
            <div className="demo-preview">
                <div className="demo-placeholder">
                    <div className="demo-content">
                        <div className="demo-icon">⏰</div>
                        <h3 style={{color: "white",marginBottom: "1rem"}}>Interactive Demo Coming Soon</h3>
                        <p style={{color: "#b0b0b0"}}>See how our AI prevented $44.7M in losses this quarter</p>
                    </div>
                </div>
                
                <div style={{display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap"}}>
                    <span style={{background:" rgba(0, 255, 255, 0.1)", padding: "8px 16px", borderRadius: "20px", fontSize: "0.9rem", border: "1px solid rgba(0, 255, 255, 0.3)"}}>
                        ⏱️ Real-time Analysis
                    </span>
                    <span style={{background:" rgba(0, 255, 255, 0.1)", padding: "8px 16px", borderRadius: "20px", fontSize: "0.9rem", border: "1px solid rgba(0, 255, 255, 0.3)"}}>
                        🤖 AI-Powered Insights
                    </span>
                    <span style={{background:" rgba(0, 255, 255, 0.1)", padding: "8px 16px", borderRadius: "20px", fontSize: "0.9rem", border: "1px solid rgba(0, 255, 255, 0.3)"}}>
                        💸 Business Impact
                    </span>
                </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default DemoSection;