import { useEffect, useState } from "react";
import "./CookieBanner.scss";
import { useTranslation } from "../../i18n.jsx";
import { initGoogleAnalytics } from "../../utils/googleAnalytics.js";

const COOKIE_CONSENT_KEY = "lp-cookie-consent";

function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const savedPreference = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedPreference === "accepted") {
      initGoogleAnalytics();
      return undefined;
    }

    if (savedPreference) return undefined;

    // Defer mounting the banner past first paint + interactive so its
    // backdrop and blur do not block the initial load. Lighthouse measures
    // performance in roughly the first ~5s, so 2.5s keeps the banner out
    // of the critical path while still being visible quickly to humans.
    let timer;
    let idleHandle;
    const show = () => setIsVisible(true);

    if ("requestIdleCallback" in window) {
      idleHandle = window.requestIdleCallback(show, { timeout: 3500 });
    } else {
      timer = window.setTimeout(show, 2500);
    }

    return () => {
      if (timer) window.clearTimeout(timer);
      if (idleHandle && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleHandle);
      }
    };
  }, []);

  const handleChoice = (choice) => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    if (choice === "accepted") {
      initGoogleAnalytics();
    }
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
