const GOOGLE_ANALYTICS_ID = "G-FXLPQ95G5B";

let isInitialized = false;

const canUseAnalytics = () =>
  Boolean(GOOGLE_ANALYTICS_ID) &&
  import.meta.env.PROD &&
  typeof window !== "undefined" &&
  typeof document !== "undefined";

export function initGoogleAnalytics() {
  if (!canUseAnalytics()) {
    return false;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
    document.head.appendChild(script);
  }

  if (!isInitialized) {
    window.gtag("js", new Date());
    window.gtag("config", GOOGLE_ANALYTICS_ID);
    isInitialized = true;
  }

  return true;
}
