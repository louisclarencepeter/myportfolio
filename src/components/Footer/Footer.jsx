import './Footer.scss';
import { useTranslation } from '../../i18n.jsx';

function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer>
      <div className="footer-copy">
        <p>© {currentYear} Louis Peter</p>
        <span>{t('footer.tagline')}</span>
        <a className='f-p' href="/impressum.html">{t('footer.impressum')}</a>
        <a className='f-p' href="#contact">{t('footer.contact')}</a>
      </div>
    </footer>
  );
}

export default Footer;
