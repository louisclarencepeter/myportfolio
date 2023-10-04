// About.js

import React from 'react';
import './About.scss';
import logo from '../../assets/images/me.jpg';
import dci from '../../assets/images/dci.svg';
import skills from '../../assets/images/skills.jpg';

const About = () => {
  return (
    <>
      <main className='main'>
        <section className='about'>
          <div className='info bounce-top one'>
            <img src={logo} alt='my picture' />
            <h2>Louis Peter</h2>
            <p>Living in Frankfurt am Main with a passion for Technology and Web Development</p>
            <a href='https://github.com/louisclarencepeter' target='_blank'>
              <i className='fa-brands fa-github' />
            </a>
            <a href='https://www.linkedin.com/in/louisclarencepeter/' target='_blank'>
              <i className='fa-brands fa-linkedin' />
            </a>
          </div>
        </section>

        <section className='about'>
          <div className='info bounce-top two'>
            <img src={dci} alt='my school' />
            <h2>Education</h2>
            <p>2022 - Present</p>
            <p>Full Stack Web Development</p>
            <p>Digital Career Institute</p>
          </div>
        </section>

        <section className='about'>
          <div className='info bounce-top three'>
            <img src={skills} alt='my Progress' />
            <h2>My Skills</h2>
            <p>HTML</p>
            <p>CSS</p>
            <p>JavaScript</p>
            <p>Bootstrap</p>
            <p>Git</p>
            <p>React</p>
            <p>Node.js</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
