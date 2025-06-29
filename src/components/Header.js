import React from 'react'

function Header() {
  return (
     <header>
        <nav className="container">
            <div className="logo">
<img style={{width: '100%', height: '120%', objectFit: 'contain', transform: 'scale(1.4)'}} src='/images/threatlens_logo.png' alt='logo' />
            </div>
            <ul className="nav-links">
                <li ><a href="/Dashboard">Features</a></li>
                <li ><a href="/Dashboard">Contact</a></li>
            </ul>
            <a href="#waitlist" className="cta-button">Join Waitlist</a>
        </nav>
    </header>
  )
}

export default Header