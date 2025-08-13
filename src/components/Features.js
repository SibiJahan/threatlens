import React from 'react';
import { motion } from 'framer-motion';

function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const featuresList = [
      { icon: '🔬', title: 'Multi-Format Analysis', description: 'Submit files, URLs, IP addresses, domain names, or hashes for analysis. See detailed threat reports with IoCs, behavior analysis, and risk scoring.' },
      { icon: '🎯', title: 'Smart Detection Engine', description: 'Get accurate malware family identification, anomaly detection, and threat classification from AI models trained on millions of samples.' },
      { icon: '🚨', title: 'Threat Context', description: 'Act on automated reports that explain the significance of the compromised infrastructure, the exploitation impact, potential financial losses, and compliance risks.' },
      { icon: '📡', title: 'Compliance Tracking', description: 'See how your infrastructure meets GDPR, HIPAA, SOC2 Type II, and PCI DSS 4.0 requirements. Get actionable recommendations to address compliance gaps.' },
      { icon: '✨', title: 'Built-in Integrations', description: 'Connect your security tools: Splunk, Amazon GuardDuty and AWS Security Hub, CrowdStrike, ServiceNow, Cortex XSOAR, and 1,200 more.' },
      { icon: '🥇', title: 'Developer-First API', description: 'Integrate threat analysis into your custom security stack with our RESTful API. Use comprehensive documentation to get up and running in minutes, not months.' },
  ];

  return (
    <motion.section
      className="features"
      id="features"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container">
        <motion.h2 className="section-title" variants={itemVariants}>
          Built for Security Teams
        </motion.h2>
        <motion.div className="features-grid" variants={containerVariants}>
          {featuresList.map((feature, index) => (
              <motion.div className="feature-card" key={index} variants={itemVariants}>
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Features;