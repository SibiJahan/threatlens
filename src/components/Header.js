import React from 'react';
import { motion } from 'framer-motion';

function Header() {
  return (
     <header>
        <nav className="container">
            <motion.div 
                className="logo"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <img style={{width: '100%', height: '120%', objectFit: 'contain', transform: 'scale(1.4)'}} src='/images/threatlens_logo.png' alt='logo' />
            </motion.div>
            <motion.ul 
                className="nav-links"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <li ><a href="/Dashboard">Features</a></li>
                <li ><a href="/Dashboard">Contact</a></li>
            </motion.ul>
            <motion.a 
                href="#waitlist" 
                className="cta-button"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                Join Waitlist
            </motion.a>
        </nav>
    </header>
  )
}

export default Header;