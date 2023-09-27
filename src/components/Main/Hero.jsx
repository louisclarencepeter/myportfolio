import React from 'react';
import './Hero.scss';

function Hero() {
  return (
    <>
      <div className="hero-container">

        {/* About me */}
        <article>
          <a href="./aboutme.html">
            <h1>Louis Peter</h1>
          </a>
          <p className="caption">Aspiring Full Stack</p>
          <h2 className="line anim-typewriter">
            {"{"}Web{"}"} #Developer#
          </h2>
        </article>
        {/* Info Icons */}
        <div className="icons">
          <a
            href="https://en.wikipedia.org/wiki/HTML"
            target="_blank"
            className="icon"
          >
            <i className="fa-brands fa-html5" />
            <p>HTML</p>
          </a>
          <a
            href="https://en.wikipedia.org/wiki/CSS"
            target="_blank"
            className="icon"
          >
            <i className="fa-brands fa-css3-alt" />
            <p>CSS</p>
          </a>
          <a
            href="https://en.wikipedia.org/wiki/JavaScript"
            target="_blank"
            className="icon"
          >
            <i className="fa-brands fa-js-square" />
            <p>JavaS</p>
          </a>
        </div>

      </div>

    </>
  );
}

export default Hero;
