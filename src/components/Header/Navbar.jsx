import { useCallback, useEffect, useMemo, useState } from "react";
import "./Navbar.scss";
import { useTranslation } from "../../i18n.jsx";

const THEME_STORAGE_KEY = "portfolio-theme";

const menuItems = [
  { key: "nav.story", href: "#story", id: "story" },
  { key: "nav.projects", href: "#projects", id: "projects" },
  { key: "nav.photography", href: "#photography", id: "photography" },
  { key: "nav.contact", href: "#contact", id: "contact" },
];

const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (!target) return;

  const reduceMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  window.history?.pushState?.(null, "", `#${id}`);
};

const getSavedTheme = () => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
};

const getInitialTheme = () => {
  const saved = getSavedTheme();
  if (saved === "dark" || saved === "light") return saved;
  if (typeof document !== "undefined") {
    const configured = document.documentElement.dataset.theme;
    if (configured === "dark" || configured === "light") return configured;
  }
  return "light";
};

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "light" ? "#f2eee7" : "#181818");
};

const useActiveSection = () => {
  const ids = useMemo(() => ["home", ...menuItems.map((item) => item.id)], []);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const computeActive = () => {
      const triggerY = window.scrollY + window.innerHeight * 0.38;
      let current = "home";

      ids.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= triggerY) current = id;
      });

      setActiveId((previous) => (previous === current ? previous : current));
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
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids]);

  return activeId;
};

const LanguageSwitcher = ({ className = "" }) => {
  const { language, languages, setLanguage, t } = useTranslation();

  return (
    <div className={`language-switcher ${className}`} aria-label={t("nav.language")}>
      {languages.map((item) => (
        <button
          type="button"
          key={item.code}
          className={item.code === language ? "is-active" : ""}
          onClick={() => setLanguage(item.code)}
          aria-label={`${t("nav.language")}: ${item.name}`}
          aria-pressed={item.code === language}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

const ThemeToggle = ({ theme, onToggle }) => {
  const { t } = useTranslation();
  const nextTheme = theme === "light" ? t("nav.dark") : t("nav.light");

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={t("nav.switchTheme", { theme: nextTheme })}
      aria-pressed={theme === "dark"}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {theme === "light" ? (
          <path d="M20.2 15.4A8.2 8.2 0 0 1 8.6 3.8 9.3 9.3 0 1 0 20.2 15.4Z" />
        ) : (
          <path d="M12 7.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0-5.3v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" />
        )}
      </svg>
    </button>
  );
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const activeId = useActiveSection();
  const { t } = useTranslation();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.classList.add("nav-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("nav-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const navigate = useCallback((event, id) => {
    event.preventDefault();
    setIsOpen(false);
    scrollToSection(id);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "light" ? "dark" : "light";
      localStorage.setItem(THEME_STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <nav className="navbar" aria-label={t("nav.primary")}>
      <div className="navbar__inner">
        <a
          href="#home"
          className="navbar__brand"
          onClick={(event) => navigate(event, "home")}
        >
          Louis Peter
        </a>

        <div className="navbar__desktop">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={activeId === item.id ? "is-active" : ""}
                  aria-current={activeId === item.id ? "page" : undefined}
                  onClick={(event) => navigate(event, item.id)}
                >
                  {t(item.key)}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar__tools">
            <LanguageSwitcher />
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>

        <button
          type="button"
          className="navbar__menu-button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span>{isOpen ? t("nav.close") : t("nav.menu")}</span>
          <span className="navbar__menu-icon" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="navbar__mobile-panel is-open" id="mobile-navigation">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <a href={item.href} onClick={(event) => navigate(event, item.id)}>
                  <span>{t(item.key)}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="navbar__mobile-tools">
            <LanguageSwitcher />
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      )}

      {isOpen && (
        <button
          type="button"
          className="navbar__scrim"
          aria-label={t("nav.close")}
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}

export default Navbar;
