import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
   <motion.footer
   initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
   >
        <div className="container">
            <p>&copy; 2025 ThreatLens Core. Advanced Threat Intelligence Platform in Development.</p>
        </div>
    </motion.footer>
  )
}

export default Footer;