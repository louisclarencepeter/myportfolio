import "./About.scss";
import logo from "../../assets/images/me.webp";
import dci from "../../assets/images/dci.svg";
import skills from "../../assets/images/skills.webp";
import Icon from "../Icon.jsx";
import { useTranslation } from "../../i18n.jsx";

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="about-section" id="aboutme">
      <div className="section-heading">
        <p className="section-kicker">{t("about.kicker")}</p>
        <h2>{t("about.title")}</h2>
        <p className="section-text">{t("about.text")}</p>
      </div>

      <div className="about-grid">
        <article className="info intro-card">
          <img src={logo} alt={t("about.portraitAlt")} />
          <h3>Louis Peter</h3>
          <p>{t("about.bio")}</p>
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
          <img src={dci} alt={t("about.dciAlt")} />
          <h3>{t("about.education")}</h3>
          <p>2022 - 2023</p>
          <p>{t("about.program")}</p>
          <p>{t("about.school")}</p>
        </article>

        <article className="info">
          <img src={skills} alt={t("about.skillsAlt")} />
          <h3>{t("about.coreStack")}</h3>
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
