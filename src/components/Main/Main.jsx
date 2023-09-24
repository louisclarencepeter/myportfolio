import React from 'react';
import Hero from './Hero.jsx';
import About from './About.jsx';
import Projects from './Projects.jsx';
import Contact from './Contact.jsx';

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
