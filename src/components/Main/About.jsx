import "./About.scss";
import logo from "../../assets/images/me.webp";
import dci from "../../assets/images/dci.svg";
import skills from "../../assets/images/skills.webp";
import Icon from "../Icon.jsx";

const About = () => {
  return (
    <section className="about-section" id="aboutme">
      <div className="section-heading">
        <p className="section-kicker">About</p>
        <h2>Full stack developer focused on polished digital experiences</h2>
        <p className="section-text">
          I work across the full stack, combining frontend design sense with
          backend problem-solving to build responsive and reliable web
          experiences.
        </p>
      </div>

      <div className="about-grid">
        <article className="info intro-card">
          <img src={logo} alt="Portrait of Louis Peter" />
          <h3>Louis Peter</h3>
          <p>
            Living in Frankfurt am Main with a passion for full stack
            development, thoughtful design, and building useful digital
            products.
          </p>
          <div className="social-links">
            <a
              href="https://github.com/louisclarencepeter"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Icon name="github" />
            </a>
            <a
              href="https://www.linkedin.com/in/louisclarencepeter/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Icon name="linkedin" />
            </a>
          </div>
        </article>

        <article className="info">
          <img src={dci} alt="Digital Career Institute logo" />
          <h3>Education</h3>
          <p>2022 - 2023</p>
          <p>Full Stack Web Development</p>
          <p>Digital Career Institute</p>
        </article>

        <article className="info">
          <img src={skills} alt="Skills overview" />
          <h3>Core Stack</h3>
          <div className="skill-list">
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>Git</span>
            <span>React</span>
            <span>Express</span>
            <span>Node.js</span>
            <span>MongoDB</span>
          </div>
        </article>
      </div>
    </section>
  );
};

export default About;
