import portrait from "../../assets/images/me.webp";
import Icon from "../Icon.jsx";
import "./Home.scss";

const Home = () => (
  <section className="hero-container">
    <div className="hero-copy">
      <p className="eyebrow">Portfolio 2026</p>
      <a href="#aboutme">
        <h1>Louis Peter</h1>
      </a>
      <p className="caption">Full Stack Developer in Frankfurt am Main</p>
      <h2 className="line">Building thoughtful web experiences</h2>
      <p className="hero-summary">
        I build responsive websites and applications with React, JavaScript,
        Node.js, and modern tools across frontend and backend development.
      </p>
      <div className="hero-actions">
        <a href="#myprojects" className="primary-action">
          View Projects
        </a>
        <a href="#contact" className="secondary-action">
          Contact Me
        </a>
      </div>
    </div>

    <div className="hero-visual">
      <div className="portrait-card">
        <img src={portrait} alt="Portrait of Louis Peter" />
        <div className="portrait-copy">
          <p>Full stack</p>
          <strong>React, Node.js</strong>
        </div>
      </div>

      <div className="icons">
        <a
          href="https://en.wikipedia.org/wiki/HTML"
          target="_blank"
          rel="noreferrer"
          className="icon"
        >
          <Icon name="html5" />
          <p>HTML</p>
        </a>
        <a
          href="https://en.wikipedia.org/wiki/CSS"
          target="_blank"
          rel="noreferrer"
          className="icon"
        >
          <Icon name="css3-alt" />
          <p>CSS</p>
        </a>
        <a
          href="https://en.wikipedia.org/wiki/JavaScript"
          target="_blank"
          rel="noreferrer"
          className="icon"
        >
          <Icon name="js-square" />
          <p>JavaScript</p>
        </a>
      </div>
    </div>
  </section>
);

export default Home;
