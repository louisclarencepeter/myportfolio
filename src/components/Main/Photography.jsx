import wedding from "../../assets/images/life-portfolio/photography-wedding.webp";
import aerial from "../../assets/images/life-portfolio/photography-aerial.webp";
import architecture from "../../assets/images/life-portfolio/photography-architecture.webp";
import couple from "../../assets/images/life-portfolio/photography-couple.webp";
import editorial from "../../assets/images/life-portfolio/photography-editorial.webp";
import { useTranslation } from "../../i18n.jsx";
import "./Photography.scss";

const gallery = [
  {
    key: "wedding",
    src: wedding,
    width: 1024,
    height: 683,
    className: "photography-gallery__item--wide",
  },
  {
    key: "aerial",
    src: aerial,
    width: 719,
    height: 1280,
    className: "photography-gallery__item--tall",
  },
  {
    key: "architecture",
    src: architecture,
    width: 576,
    height: 1024,
    className: "photography-gallery__item--detail",
  },
  {
    key: "couple",
    src: couple,
    width: 1024,
    height: 1024,
    className: "photography-gallery__item--square",
  },
  {
    key: "editorial",
    src: editorial,
    width: 1600,
    height: 1066,
    className: "photography-gallery__item--editorial",
  },
];

const ExternalArrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

function Photography() {
  const { t } = useTranslation();

  return (
    <section
      className="photography-section"
      id="photography"
      aria-labelledby="photography-title"
    >
      <header className="photography-section__heading">
        <h2 id="photography-title">{t("photography.title")}</h2>
        <span className="editorial-rule editorial-rule--coral" aria-hidden="true" />
        <p>{t("photography.intro")}</p>
        <a
          href="https://louisclarencepeter.com/"
          target="_blank"
          rel="noreferrer"
          className="editorial-link"
        >
          <span>{t("photography.link")}</span>
          <ExternalArrow />
        </a>
      </header>

      <div className="photography-gallery">
        {gallery.map((item, index) => (
          <figure
            className={`photography-gallery__item ${item.className}`}
            key={item.key}
          >
            <div className="photography-gallery__frame">
              <img
                src={item.src}
                alt={t(`photography.gallery.${item.key}.alt`)}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {t(`photography.gallery.${item.key}.caption`)}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Photography;
