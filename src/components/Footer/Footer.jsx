import './Footer.scss';
import { GITHUB_URL } from '../../config/contact';
import Icon from '../Icon.jsx';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="footer-copy">
        <p>© {currentYear} Louis Peter</p>
        <span>Full stack portfolio</span>
        <a className='f-p' href="/impressum.html">Impressum</a>
        <a className='f-p' href="#contact">Contact</a>
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
