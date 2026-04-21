import { useEffect, useState } from "react";
import "./CookieBanner.scss";

const COOKIE_CONSENT_KEY = "lp-cookie-consent";

function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

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
      <aside className="cookie-banner" aria-live="polite" aria-label="Cookie banner">
        <div className="cookie-banner__copy">
          <p className="cookie-banner__eyebrow">Privacy</p>
          <h2>Cookies and local storage</h2>
          <p>
            This portfolio uses local storage to remember your cookie choice.
            External links may set cookies on third-party websites.
          </p>
        </div>

        <div className="cookie-banner__actions">
          <button type="button" className="cookie-banner__secondary" onClick={() => handleChoice("essential")}>
            Only Necessary
          </button>
          <button type="button" className="cookie-banner__primary" onClick={() => handleChoice("accepted")}>
            Accept
          </button>
        </div>
      </aside>
    </div>
  );
}

export default CookieBanner;
