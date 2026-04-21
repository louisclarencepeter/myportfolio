import { useState, useEffect, useCallback } from 'react';
import './Navbar.scss';
import logo from '../../assets/images/me.webp';

const menuItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#aboutme' },
  { label: 'Projects', href: '#myprojects' },
  { label: 'Contact', href: '#contact' },
];

const useStickyNavbar = () => {
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return undefined;
    const handleScroll = () => {
      if (window.pageYOffset >= navbar.offsetTop) {
        navbar.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

const NavbarItem = ({ item, onNavigate }) => (
  <li>
    <a href={item.href} onClick={onNavigate}>
      {item.label}
    </a>
  </li>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  useStickyNavbar();

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((v) => !v), []);

  return (
    <nav className="navbar" aria-label="Primary">
      <div className="container nav-container">

        <div className="classicalmenu">
          <div className="classicalmenu-logo">
            <a href="#home" aria-label="Home">
              <img src={logo} alt="Louis Peter" />
            </a>
          </div>
          <ul>
            {menuItems.map((item) => (
              <NavbarItem key={item.href} item={item} onNavigate={closeMenu} />
            ))}
          </ul>
        </div>

        <input
          className="checkbox"
          type="checkbox"
          checked={isOpen}
          onChange={(e) => setIsOpen(e.target.checked)}
          aria-label="Toggle menu"
        />

        <button
          type="button"
          className="hamburger-lines"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {[1, 2, 3].map((line) => (
            <span key={line} className={`line line${line}`} />
          ))}
        </button>

        <div className="logo">
          <a href="#home" aria-label="Home">
            <img src={logo} alt="Louis Peter" />
          </a>
        </div>

        <ul className="menu-items" id="mobile-menu">
          {menuItems.map((item) => (
            <NavbarItem key={item.href} item={item} onNavigate={closeMenu} />
          ))}
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;
