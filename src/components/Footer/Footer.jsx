import './Footer.scss';
import { GITHUB_URL } from '../../config/contact';
import Icon from '../Icon.jsx';
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
      <div className='f-icons'>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <Icon name="github" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
