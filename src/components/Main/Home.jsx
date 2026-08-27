import portrait from "../../assets/images/life-portfolio/louis-portrait.webp";
import aerial from "../../assets/images/life-portfolio/photography-aerial.webp";
import { useTranslation } from "../../i18n.jsx";
import "./Home.scss";

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

const Home = () => {
  const { t } = useTranslation();

  return (
    <section className="life-hero" id="home" aria-labelledby="hero-title">
      <div className="life-hero__copy">
        <h1 id="hero-title">{t("home.headline")}</h1>
        <span className="life-hero__rule" aria-hidden="true" />
        <p className="life-hero__summary">{t("home.summary")}</p>

        <div className="life-hero__actions">
          <a href="#story" className="editorial-action editorial-action--primary">
            <span>{t("home.followJourney")}</span>
            <Arrow />
          </a>
          <a href="#projects" className="editorial-action editorial-action--secondary">
            <span>{t("home.seeProjects")}</span>
            <Arrow />
          </a>
        </div>

        <p className="life-hero__places" aria-label={t("home.placesLabel")}>
          <span>{t("home.zanzibar")}</span>
          <span aria-hidden="true">←</span>
          <span>{t("home.frankfurt")}</span>
        </p>
      </div>

      <div className="life-hero__media" aria-label={t("home.mediaLabel")}>
        <figure className="life-hero__portrait">
          <img
            src={portrait}
            alt={t("home.portraitAlt")}
            width="1024"
            height="576"
            fetchPriority="high"
            decoding="async"
          />
        </figure>

        <figure className="life-hero__aerial">
          <img
            src={aerial}
            alt={t("home.aerialAlt")}
            width="719"
            height="1280"
            fetchPriority="high"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
};

export default Home;
