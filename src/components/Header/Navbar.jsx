import { useState, useEffect, useCallback } from 'react';
import './Navbar.scss';
import logo from '../../assets/images/me.webp';
import { useTranslation } from '../../i18n.jsx';

const THEME_STORAGE_KEY = 'portfolio-theme';

const menuItems = [
  { key: 'nav.home', href: '#home', id: 'home' },
  { key: 'nav.about', href: '#aboutme', id: 'aboutme' },
  { key: 'nav.services', href: '#services', id: 'services' },
  { key: 'nav.projects', href: '#myprojects', id: 'myprojects' },
  { key: 'nav.contact', href: '#contact', id: 'contact' },
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

const useActiveSection = (ids) => {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const computeActive = () => {
      const triggerY = window.scrollY + window.innerHeight * 0.3;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= triggerY) current = id;
      }
      setActiveId((prev) => (prev === current ? prev : current));
    };

    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        computeActive();
      });
    };

    computeActive();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [ids]);

  return activeId;
};

const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (!target) return;

  const reduceMotion =
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });

  if (window.history?.pushState) {
    window.history.pushState(null, '', `#${id}`);
  }

  const previousTabIndex = target.getAttribute('tabindex');
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  target.addEventListener(
    'blur',
    () => {
      if (previousTabIndex === null) target.removeAttribute('tabindex');
      else target.setAttribute('tabindex', previousTabIndex);
    },
    { once: true },
  );
};

const getSavedTheme = () => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
};

const getSystemTheme = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const getInitialTheme = () => {
  const savedTheme = getSavedTheme();
  if (savedTheme) return savedTheme;
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.dataset.theme || getSystemTheme();
};

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'light' ? '#f7f0e8' : '#0e131b');
};

const NavbarItem = ({ item, onNavigate, isActive, t }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onNavigate?.();
    scrollToSection(item.id);
  };

  return (
    <li>
      <a
        href={item.href}
        onClick={handleClick}
        className={isActive ? 'is-active' : ''}
        aria-current={isActive ? 'true' : undefined}
      >
        {t(item.key)}
      </a>
    </li>
  );
};

const ThemeToggle = ({ theme, onToggle, t, className = '' }) => (
  <button
    type="button"
    className={`theme-toggle ${className}`}
    onClick={onToggle}
    aria-label={t('nav.switchTheme', { theme: t(theme === 'dark' ? 'nav.light' : 'nav.dark') })}
    aria-pressed={theme === 'light'}
  >
    <span className="theme-toggle-track" aria-hidden="true">
      <svg className="theme-toggle-icon theme-toggle-icon--moon" viewBox="0 0 24 24" focusable="false">
        <path d="M20.1 14.4A7.5 7.5 0 0 1 9.6 3.9 8.8 8.8 0 1 0 20.1 14.4Z" />
      </svg>
      <svg className="theme-toggle-icon theme-toggle-icon--sun" viewBox="0 0 24 24" focusable="false">
        <path d="M12 7.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0-5.2 1.1 2.9h-2.2L12 2Zm0 17.1 1.1 2.9h-2.2l1.1-2.9ZM4.9 4.9l2.8 1.3-1.5 1.5-1.3-2.8Zm12.9 11.4 1.3 2.8-2.8-1.3 1.5-1.5ZM2 12l2.9-1.1v2.2L2 12Zm17.1 0 2.9-1.1v2.2L19.1 12ZM4.9 19.1l1.3-2.8 1.5 1.5-2.8 1.3ZM17.8 7.7l-1.5-1.5 2.8-1.3-1.3 2.8Z" />
      </svg>
      <span className="theme-toggle-thumb" />
    </span>
  </button>
);

const LanguageSwitcher = ({ className = '' }) => {
  const { language, languages, setLanguage, t } = useTranslation();

  return (
    <div className={`language-switcher ${className}`} aria-label={t('nav.language')}>
      {languages.map((item) => (
        <button
          type="button"
          key={item.code}
          className={item.code === language ? 'is-active' : ''}
          onClick={() => setLanguage(item.code)}
          aria-label={`${t('nav.language')}: ${item.name}`}
          aria-pressed={item.code === language}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const [hasSavedTheme, setHasSavedTheme] = useState(() => Boolean(getSavedTheme()));
  const { t } = useTranslation();
  useStickyNavbar();
  const activeId = useActiveSection(menuItems.map((item) => item.id));

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (hasSavedTheme || !window.matchMedia) return undefined;

    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleSystemThemeChange = (event) => {
      setTheme(event.matches ? 'light' : 'dark');
    };

    colorSchemeQuery.addEventListener('change', handleSystemThemeChange);
    return () => colorSchemeQuery.removeEventListener('change', handleSystemThemeChange);
  }, [hasSavedTheme]);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((v) => !v), []);
  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      setHasSavedTheme(true);
      return nextTheme;
    });
  }, []);

  return (
    <nav className="navbar" aria-label={t('nav.primary')}>
      <div className="container nav-container">

        <div className="classicalmenu">
          <div className="classicalmenu-logo">
            <a
              href="#home"
              aria-label={t('nav.home')}
              onClick={(event) => {
                event.preventDefault();
                closeMenu();
                scrollToSection('home');
              }}
            >
              <img src={logo} alt="Louis Peter" />
            </a>
          </div>
          <ul>
            {menuItems.map((item) => (
              <NavbarItem
                key={item.href}
                item={item}
                onNavigate={closeMenu}
                isActive={activeId === item.id}
                t={t}
              />
            ))}
          </ul>
          <div className="nav-tools">
            <LanguageSwitcher />
            <ThemeToggle theme={theme} onToggle={toggleTheme} t={t} />
          </div>
        </div>

        <div className="mobile-nav-tools">
          <ThemeToggle theme={theme} onToggle={toggleTheme} t={t} />
        </div>

        <input
          className="checkbox"
          type="checkbox"
          checked={isOpen}
          onChange={(e) => setIsOpen(e.target.checked)}
          aria-label={t('nav.toggleMenu')}
        />

        <button
          type="button"
          className="hamburger-lines"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={t('nav.toggleMenu')}
        >
          {[1, 2, 3].map((line) => (
            <span key={line} className={`line line${line}`} />
          ))}
        </button>

        <div className="logo">
          <a href="#home" aria-label={t('nav.home')}>
            <img src={logo} alt="Louis Peter" />
          </a>
        </div>

        <ul className="menu-items" id="mobile-menu">
          <li className="mobile-language-item">
            <LanguageSwitcher />
          </li>
          {menuItems.map((item) => (
            <NavbarItem key={item.href} item={item} onNavigate={closeMenu} t={t} />
          ))}
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;
