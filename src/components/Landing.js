import React from 'react';
import Header from './Header';
import Hero from './Hero';
import DemoSection from './DemoSection';
import Features from './Features';
import Slider from './Slider';
import FinalCTA from './FinalCTA';
import Footer from './Footer';

function Landing() {
  return (
    <div className='land'>
        <Header/>
        <Hero/>
        <DemoSection/>
        <Features/>
        <Slider/>
        <FinalCTA/>
        <Footer/>
    </div>
  );
}

export default Landing;