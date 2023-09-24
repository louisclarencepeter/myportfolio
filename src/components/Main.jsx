import React from 'react';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import './Main.css';

function Main() {
  return (
    <div className="main-container">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default Main;
