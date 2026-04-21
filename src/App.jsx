import { useEffect } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import CookieBanner from './components/CookieBanner/CookieBanner.jsx';
import Main from './components/Main/Main.jsx';
import Footer from './components/Footer/Footer.jsx';
import Navbar from './components/Header/Navbar.jsx';
import Chatbot from './components/Chatbot/Chatbot.jsx';
import { LanguageProvider } from './i18n.jsx';
import './styles/App.scss';

config.autoAddCss = false;

const revealSelectors = [
    '.section-heading',
    '.about-grid .info',
    '.project-card',
    '.contact-intro',
    '.contact .form',
];

const useScrollReveal = () => {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return undefined;
        }

        const targets = new WeakSet();
        const selector = revealSelectors.join(',');

        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll(selector).forEach((element) => {
                element.classList.add('is-visible');
            });
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                });
            },
            { rootMargin: '0px 0px -10% 0px', threshold: 0.16 },
        );

        const observeElements = () => {
            document.querySelectorAll(selector).forEach((element, index) => {
                if (targets.has(element)) return;
                targets.add(element);
                element.classList.add('reveal');
                element.style.setProperty('--reveal-delay', `${Math.min(index * 70, 280)}ms`);
                observer.observe(element);
            });
        };

        observeElements();

        const mutationObserver = new MutationObserver(observeElements);
        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, []);
};

const useHashScroll = () => {
    useEffect(() => {
        let retryTimer;

        const scrollToHash = () => {
            window.clearTimeout(retryTimer);
            let attempts = 0;

            const tryScroll = () => {
                const id = window.location.hash.slice(1);
                if (!id) return;

                const target = document.getElementById(decodeURIComponent(id));
                if (target) {
                    target.scrollIntoView({ block: 'start' });
                    return;
                }

                if (attempts < 12) {
                    attempts += 1;
                    retryTimer = window.setTimeout(tryScroll, 100);
                }
            };

            tryScroll();
        };

        scrollToHash();
        window.addEventListener('hashchange', scrollToHash);

        return () => {
            window.clearTimeout(retryTimer);
            window.removeEventListener('hashchange', scrollToHash);
        };
    }, []);
};

function App() {
    useScrollReveal();
    useHashScroll();

    return (
        <LanguageProvider>
            <div className="App" id='home'>
                <Navbar />
                <Main />
                <Footer />
                <Chatbot />
                <CookieBanner />
            </div>
        </LanguageProvider>
    );
}

export default App;
