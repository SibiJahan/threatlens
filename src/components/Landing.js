import React from 'react'
import Header from './Header'
import DemoSection from './DemoSection'
import Features from './Features'
import FinalCTA from './FinalCTA'
import Footer from './Footer'
import Hero from './Hero'
import Slider from './Slider'


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
  )
}

export default Landing