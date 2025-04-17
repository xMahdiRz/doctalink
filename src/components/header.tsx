import React from 'react'
import Navbar from './navbar'
import Hero from './hero'

const Header = () => {
  return (
    <div className='min-h-screen'>
        <Navbar />
        <Hero /> 
    </div>
  )
}

export default Header