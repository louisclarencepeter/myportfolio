import { useEffect, useState } from "react";
import "./CookieBanner.scss";
import { useTranslation } from "../../i18n.jsx";

const COOKIE_CONSENT_KEY = "lp-cookie-consent";

function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const savedPreference = window.localStorage.getItem(COOKIE_CONSENT_KEY);

    if (!savedPreference) {
      setIsVisible(true);
    }
  }, []);

  const handleChoice = (choice) => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="cookie-banner__layer">
      <div className="cookie-banner__backdrop" aria-hidden="true" />
      <aside className="cookie-banner" aria-live="polite" aria-label={t("cookies.label")}>
        <div className="cookie-banner__copy">
          <p className="cookie-banner__eyebrow">{t("cookies.eyebrow")}</p>
          <h2>{t("cookies.title")}</h2>
          <p>{t("cookies.text")}</p>
        </div>

        <div className="cookie-banner__actions">
          <button type="button" className="cookie-banner__secondary" onClick={() => handleChoice("essential")}>
            {t("cookies.onlyNecessary")}
          </button>
          <button type="button" className="cookie-banner__primary" onClick={() => handleChoice("accepted")}>
            {t("cookies.accept")}
          </button>
        </div>
      </aside>
    </div>
  );
}

export default CookieBanner;
