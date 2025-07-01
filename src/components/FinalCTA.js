import React from 'react';
import { motion } from 'framer-motion';

function FinalCTA() {

  // const containerVariants = {
  //   hidden: { opacity: 0, y: 50 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.7,
  //       staggerChildren: 0.3,
  //     },
  //   },
  // };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };


  return (
   <motion.section 
       className="final-cta"
      id="waitlist"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
        <div className="container">
            <motion.h2 variants={itemVariants}>Ready to Transform Your Security Operations?</motion.h2>
            <motion.p variants={itemVariants}>Join our early access program and be among the first to benefit from next-generation threat intelligence powered by AI.</motion.p>
            <motion.div className="hero-buttons" variants={itemVariants}>
                <a href="mailto:hello@threatlenscore.com?subject=Early Access Request" className="btn-primary">Request Early Access</a>
                <a href="mailto:partnerships@threatlenscore.com?subject=Partnership Inquiry" className="btn-secondary">Become Partner</a>
            </motion.div>
        </div>
    </motion.section>
  )
}

export default FinalCTA;