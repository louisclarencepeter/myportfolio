import "./Footer.scss";
import { GITHUB_URL, LINKEDIN_URL } from "../../config/contact";
import { useTranslation } from "../../i18n.jsx";

function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <strong>Louis Peter</strong>
      <span className="site-footer__places">{t("footer.places")}</span>
      <nav aria-label={t("footer.linksLabel")}>
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://louisclarencepeter.com/" target="_blank" rel="noreferrer">
          {t("footer.photography")}
        </a>
        <a href="/impressum.html">{t("footer.impressum")}</a>
      </nav>
      <span>© {currentYear}</span>
    </footer>
  );
}

export default Footer;
