import portrait from "../../assets/images/me.webp";
import Icon from "../Icon.jsx";
import { useTranslation } from "../../i18n.jsx";
import "./Home.scss";

const Home = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-container">
      <div className="hero-copy">
        <p className="eyebrow">{t("home.eyebrow")}</p>
        <a href="#aboutme">
          <h1>Louis Peter</h1>
        </a>
        <p className="caption">{t("home.caption")}</p>
        <h2 className="line">{t("home.headline")}</h2>
        <p className="hero-summary">{t("home.summary")}</p>
        <div className="hero-actions">
          <a href="#myprojects" className="primary-action">
            {t("home.viewProjects")}
          </a>
          <a href="#contact" className="secondary-action">
            {t("home.contactMe")}
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="portrait-card">
          <img src={portrait} alt={t("home.portraitAlt")} />
          <div className="portrait-copy">
            <p>{t("home.stackLabel")}</p>
            <strong>{t("home.stackTools")}</strong>
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
};

export default Home;
