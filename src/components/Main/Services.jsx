import "./Services.scss";
import { useTranslation } from "../../i18n.jsx";

const items = [
  {
    titleKey: "services.landingTitle",
    textKey: "services.landingText",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5h16v3H4V5Zm0 5h10v9H4v-9Zm12 0h4v4h-4v-4Zm0 6h4v3h-4v-3Z" />
      </svg>
    ),
  },
  {
    titleKey: "services.businessTitle",
    textKey: "services.businessText",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4h16v4H4V4Zm0 6h7v10H4V10Zm9 0h7v4h-7v-4Zm0 6h7v4h-7v-4Z" />
      </svg>
    ),
  },
  {
    titleKey: "services.appsTitle",
    textKey: "services.appsText",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.7 5.2 4.3 9.6l4.4 4.4 1.4-1.4-3-3 3-3-1.4-1.4Zm6.6 0-1.4 1.4 3 3-3 3 1.4 1.4 4.4-4.4-4.4-4.4Zm-2.3 0-2.6 13.6 2 .4L14.9 5.6l-2-.4Z" />
      </svg>
    ),
  },
];

function Services() {
  const { t } = useTranslation();

  return (
    <section className="services-section" id="services">
      <div className="section-heading">
        <p className="section-kicker">{t("services.kicker")}</p>
        <h2>{t("services.title")}</h2>
        <p className="section-text">{t("services.text")}</p>
      </div>

      <div className="services-grid">
        {items.map((item) => (
          <article className="service-card" key={item.titleKey}>
            <span className="service-icon">{item.icon}</span>
            <h3>{t(item.titleKey)}</h3>
            <p>{t(item.textKey)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;
