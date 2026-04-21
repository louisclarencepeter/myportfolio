import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LANGUAGE_STORAGE_KEY = 'portfolio-language';

export const languages = [
  { code: 'en', label: 'EN', name: 'English', htmlLang: 'en' },
  { code: 'de', label: 'DE', name: 'Deutsch', htmlLang: 'de' },
  { code: 'sw', label: 'SW', name: 'Kiswahili', htmlLang: 'sw' },
];

const translations = {
  en: {
    nav: {
      primary: 'Primary',
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      toggleMenu: 'Toggle menu',
      switchTheme: 'Switch to {theme} theme',
      light: 'light',
      dark: 'dark',
      language: 'Language',
    },
    home: {
      eyebrow: 'Portfolio 2026',
      caption: 'Full Stack Developer in Frankfurt am Main',
      headline: 'Building thoughtful web experiences',
      summary:
        'I build responsive websites and applications with React, JavaScript, Node.js, and modern tools across frontend and backend development.',
      viewProjects: 'View Projects',
      contactMe: 'Contact Me',
      portraitAlt: 'Portrait of Louis Peter',
      stackLabel: 'Full stack',
      stackTools: 'React, Node.js',
    },
    about: {
      kicker: 'About',
      title: 'Full stack developer focused on polished digital experiences',
      text:
        'I work across the full stack, combining frontend design sense with backend problem-solving to build responsive and reliable web experiences.',
      portraitAlt: 'Portrait of Louis Peter',
      bio:
        'Living in Frankfurt am Main with a passion for full stack development, thoughtful design, and building useful digital products.',
      education: 'Education',
      program: 'Full Stack Web Development',
      school: 'Digital Career Institute',
      dciAlt: 'Digital Career Institute logo',
      skillsAlt: 'Skills overview',
      coreStack: 'Core Stack',
    },
    projects: {
      kicker: 'Projects',
      title: 'Selected projects I built from concept to launch',
      text:
        'These projects show how I approach layout, branding, responsiveness, and useful web experiences across different industries.',
      primavistaTag: 'Business Website',
      primavistaAlt: 'Trockenbau Primavista website preview',
      primavistaDescription:
        'A business website for a drywall and interior construction service, built to present services clearly and help visitors get in touch.',
      flowdeskTag: 'Web Tool',
      flowdeskAlt: 'Flowdesk Tool website preview',
      flowdeskDescription:
        'A focused web tool experience designed around clarity, fast access, and a practical workflow for users.',
      paradiseTag: 'Travel Website',
      paradiseAlt: 'Destination Paradise website preview',
      paradiseDescription:
        'A travel-focused website shaped to showcase destinations, create interest, and guide visitors toward their next trip.',
    },
    contact: {
      kicker: 'Contact',
      title: "Let's build something thoughtful",
      text:
        "If you want to collaborate, talk about full stack web development, or just say hello, send me a message and I'll get back to you by email.",
      directTitle: 'Prefer a direct message?',
      directText: 'You can reach me by email or connect with me on GitHub and LinkedIn.',
      formIntro: 'Please fill in the form below to send me a message',
      name: 'Name:',
      email: 'Email:',
      message: 'Message:',
      send: 'Send',
      sending: 'Sending...',
      fillAll: 'Please fill in all fields.',
      openingEmail: 'Opening your email client...',
      success: 'Thanks! Your message has been sent.',
      fallback: 'Something went wrong. Opening your email client instead...',
      subject: 'Portfolio contact from {name}',
      mailBody: 'Name: {name}\nEmail: {email}\n\n{message}',
    },
    footer: {
      tagline: 'Full stack portfolio',
      impressum: 'Impressum',
      contact: 'Contact',
    },
    chat: {
      label: 'Chat with Lou',
      kicker: 'Meet Lou',
      title: 'Ask about my work',
      button: 'Ask Lou',
      open: 'Open Lou',
      close: 'Close Lou',
      greeting:
        "Hi, I'm Lou. I can answer quick questions about Louis, his projects, and how to get in touch. What would you like to know?",
      starterProjects: 'Show me the projects',
      starterStack: 'What does Louis build with?',
      starterContact: 'How can I contact him?',
      startersLabel: 'Suggested questions',
      inputLabel: 'Message',
      placeholder: 'Ask about skills, projects, contact...',
      send: 'Send message',
      thinking: 'Thinking...',
      error:
        "I couldn't answer right now. You can still reach Louis through the contact form or by email.",
    },
    cookies: {
      label: 'Cookie banner',
      eyebrow: 'Privacy',
      title: 'Cookies and local storage',
      text:
        'This portfolio uses local storage to remember your cookie choice. External links may set cookies on third-party websites.',
      onlyNecessary: 'Only Necessary',
      accept: 'Accept',
    },
  },
  de: {
    nav: {
      primary: 'Hauptnavigation',
      home: 'Start',
      about: 'Über mich',
      projects: 'Projekte',
      contact: 'Kontakt',
      toggleMenu: 'Menü öffnen',
      switchTheme: 'Zum {theme} Design wechseln',
      light: 'hellen',
      dark: 'dunklen',
      language: 'Sprache',
    },
    home: {
      eyebrow: 'Portfolio 2026',
      caption: 'Full-Stack-Entwickler in Frankfurt am Main',
      headline: 'Ich entwickle Web-Erlebnisse, die klar funktionieren',
      summary:
        'Ich entwickle Websites und Web-Apps, die auf allen Geräten gut aussehen und zuverlässig funktionieren: mit React, JavaScript, Node.js und modernen Tools.',
      viewProjects: 'Projekte ansehen',
      contactMe: 'Kontakt aufnehmen',
      portraitAlt: 'Porträt von Louis Peter',
      stackLabel: 'Full Stack',
      stackTools: 'React, Node.js',
    },
    about: {
      kicker: 'Über mich',
      title: 'Full-Stack-Entwickler mit Blick für saubere digitale Erlebnisse',
      text:
        'Ich verbinde Frontend-Design mit Backend-Logik und baue Websites, die verständlich, schnell und verlässlich funktionieren.',
      portraitAlt: 'Porträt von Louis Peter',
      bio:
        'Ich lebe in Frankfurt am Main und entwickle gern durchdachte Interfaces, stabile Funktionen und digitale Produkte, die Menschen wirklich nutzen können.',
      education: 'Ausbildung',
      program: 'Full Stack Web Development',
      school: 'Digital Career Institute',
      dciAlt: 'Logo des Digital Career Institute',
      skillsAlt: 'Übersicht der Fähigkeiten',
      coreStack: 'Core Stack',
    },
    projects: {
      kicker: 'Projekte',
      title: 'Ausgewählte Projekte von der Idee bis zum Launch',
      text:
        'Hier siehst du, wie ich Layout, Markenauftritt, mobile Darstellung und klare Nutzerführung in unterschiedlichen Bereichen umsetze.',
      primavistaTag: 'Business-Website',
      primavistaAlt: 'Vorschau der Trockenbau Primavista Website',
      primavistaDescription:
        'Eine Website für einen Trockenbau- und Innenausbau-Betrieb, die Leistungen übersichtlich erklärt und Anfragen leicht macht.',
      flowdeskTag: 'Web-Tool',
      flowdeskAlt: 'Vorschau der Flowdesk Tool Website',
      flowdeskDescription:
        'Ein schlankes Web-Tool mit klarer Struktur, schnellem Einstieg und einem Ablauf, der im Alltag praktisch bleibt.',
      paradiseTag: 'Reise-Website',
      paradiseAlt: 'Vorschau der Destination Paradise Website',
      paradiseDescription:
        'Eine Reise-Website, die Ziele stimmungsvoll präsentiert, Vertrauen schafft und Besucher zur nächsten Anfrage führt.',
    },
    contact: {
      kicker: 'Kontakt',
      title: 'Lass uns gemeinsam etwas Sinnvolles bauen',
      text:
        'Wenn du ein Projekt starten möchtest, Unterstützung bei einer Website brauchst oder einfach eine Idee besprechen willst, schreib mir gern.',
      directTitle: 'Lieber direkt schreiben?',
      directText: 'Du erreichst mich per E-Mail oder findest mich auf GitHub und LinkedIn.',
      formIntro: 'Schreib mir kurz, worum es geht',
      name: 'Name:',
      email: 'E-Mail:',
      message: 'Nachricht:',
      send: 'Senden',
      sending: 'Wird gesendet...',
      fillAll: 'Bitte fülle alle Felder aus.',
      openingEmail: 'Dein E-Mail-Programm wird geöffnet...',
      success: 'Danke! Deine Nachricht wurde gesendet.',
      fallback: 'Das hat gerade nicht geklappt. Ich öffne stattdessen dein E-Mail-Programm...',
      subject: 'Anfrage über das Portfolio von {name}',
      mailBody: 'Name: {name}\nE-Mail: {email}\n\n{message}',
    },
    footer: {
      tagline: 'Full-Stack-Portfolio',
      impressum: 'Impressum',
      contact: 'Kontakt',
    },
    chat: {
      label: 'Chat mit Lou',
      kicker: 'Lou kennenlernen',
      title: 'Frag etwas über meine Arbeit',
      button: 'Lou fragen',
      open: 'Lou öffnen',
      close: 'Lou schließen',
      greeting:
        'Hi, ich bin Lou. Ich beantworte kurze Fragen zu Louis, seinen Projekten und zur Kontaktaufnahme. Was möchtest du wissen?',
      starterProjects: 'Zeig mir die Projekte',
      starterStack: 'Womit entwickelt Louis?',
      starterContact: 'Wie kann ich ihn kontaktieren?',
      startersLabel: 'Vorgeschlagene Fragen',
      inputLabel: 'Nachricht',
      placeholder: 'Frag nach Skills, Projekten, Kontakt...',
      send: 'Nachricht senden',
      thinking: 'Ich denke nach...',
      error:
        'Ich kann gerade nicht antworten. Du kannst Louis weiterhin über das Kontaktformular oder per E-Mail erreichen.',
    },
    cookies: {
      label: 'Cookie-Hinweis',
      eyebrow: 'Datenschutz',
      title: 'Cookies und lokaler Speicher',
      text:
        'Dieses Portfolio speichert deine Cookie-Auswahl lokal im Browser. Externe Links können auf anderen Websites eigene Cookies verwenden.',
      onlyNecessary: 'Nur notwendige',
      accept: 'Akzeptieren',
    },
  },
  sw: {
    nav: {
      primary: 'Urambazaji mkuu',
      home: 'Mwanzo',
      about: 'Kuhusu',
      projects: 'Miradi',
      contact: 'Mawasiliano',
      toggleMenu: 'Fungua menyu',
      switchTheme: 'Badili kwenda mandhari ya {theme}',
      light: 'mwanga',
      dark: 'giza',
      language: 'Lugha',
    },
    home: {
      eyebrow: 'Portfolio 2026',
      caption: 'Msanidi wa Full-Stack huko Frankfurt am Main',
      headline: 'Ninatengeneza tovuti zilizo wazi, nzuri na rahisi kutumia',
      summary:
        'Ninatengeneza tovuti na programu za wavuti zinazofanya kazi vizuri kwenye simu na kompyuta, kwa kutumia React, JavaScript, Node.js na zana za kisasa.',
      viewProjects: 'Tazama kazi zangu',
      contactMe: 'Wasiliana nami',
      portraitAlt: 'Picha ya Louis Peter',
      stackLabel: 'Full stack',
      stackTools: 'React, Node.js',
    },
    about: {
      kicker: 'Kuhusu',
      title: 'Msanidi wa full-stack anayejali ubora na matumizi rahisi',
      text:
        'Ninachanganya ubunifu wa frontend na mantiki ya backend ili kujenga tovuti zinazoeleweka haraka, zinaonekana vizuri na zinafanya kazi kwa uhakika.',
      portraitAlt: 'Picha ya Louis Peter',
      bio:
        'Ninaishi Frankfurt am Main. Napenda kutengeneza interfaces safi, mifumo imara na bidhaa za kidijitali ambazo watu wanaweza kuzitumia kwa urahisi.',
      education: 'Elimu',
      program: 'Full Stack Web Development',
      school: 'Digital Career Institute',
      dciAlt: 'Nembo ya Digital Career Institute',
      skillsAlt: 'Muhtasari wa teknolojia ninazotumia',
      coreStack: 'Teknolojia ninazotumia',
    },
    projects: {
      kicker: 'Miradi',
      title: 'Baadhi ya miradi niliyoijenga kutoka wazo hadi uzinduzi',
      text:
        'Miradi hii inaonyesha jinsi ninavyopanga muonekano, utambulisho wa chapa, matumizi kwenye vifaa tofauti na safari rahisi kwa mtumiaji.',
      primavistaTag: 'Tovuti ya kampuni',
      primavistaAlt: 'Muonekano wa tovuti ya Trockenbau Primavista',
      primavistaDescription:
        'Tovuti ya kampuni ya huduma za gypsum na ukarabati wa ndani, iliyopangwa kueleza huduma kwa uwazi na kurahisisha mawasiliano.',
      flowdeskTag: 'Zana ya wavuti',
      flowdeskAlt: 'Muonekano wa tovuti ya Flowdesk Tool',
      flowdeskDescription:
        'Zana ya wavuti yenye muundo rahisi, mwanzo wa haraka na mtiririko wa kazi unaoeleweka kwa watumiaji.',
      paradiseTag: 'Tovuti ya safari',
      paradiseAlt: 'Muonekano wa tovuti ya Destination Paradise',
      paradiseDescription:
        'Tovuti ya safari inayowasilisha maeneo ya kuvutia, kujenga hamu ya kusafiri na kumwelekeza mgeni kuchukua hatua inayofuata.',
    },
    contact: {
      kicker: 'Mawasiliano',
      title: 'Tufanye kazi pamoja kwenye wazo lako',
      text:
        'Kama unahitaji tovuti, una wazo la mradi, au unataka tu kuzungumza kuhusu kazi ya wavuti, nitumie ujumbe nami nitakujibu kwa barua pepe.',
      directTitle: 'Unapendelea kuandika moja kwa moja?',
      directText: 'Unaweza kunifikia kwa barua pepe au kuungana nami kupitia GitHub na LinkedIn.',
      formIntro: 'Niandikie ujumbe mfupi kuhusu unachohitaji',
      name: 'Jina:',
      email: 'Barua pepe:',
      message: 'Ujumbe:',
      send: 'Tuma',
      sending: 'Inatuma...',
      fillAll: 'Tafadhali jaza sehemu zote muhimu.',
      openingEmail: 'Ninafungua programu yako ya barua pepe...',
      success: 'Asante! Ujumbe wako umetumwa.',
      fallback: 'Kuna tatizo kidogo. Ninafungua programu yako ya barua pepe badala yake...',
      subject: 'Ujumbe kutoka kwenye portfolio ya {name}',
      mailBody: 'Jina: {name}\nBarua pepe: {email}\n\n{message}',
    },
    footer: {
      tagline: 'Portfolio ya full stack',
      impressum: 'Impressum',
      contact: 'Mawasiliano',
    },
    chat: {
      label: 'Ongea na Lou',
      kicker: 'Kutana na Lou',
      title: 'Uliza kuhusu kazi zangu',
      button: 'Uliza Lou',
      open: 'Fungua Lou',
      close: 'Funga Lou',
      greeting:
        'Habari, mimi ni Lou. Ninaweza kujibu maswali mafupi kuhusu Louis, miradi yake na namna ya kuwasiliana naye. Ungependa kujua nini?',
      starterProjects: 'Nionyeshe miradi',
      starterStack: 'Louis anatumia teknolojia gani?',
      starterContact: 'Ninawezaje kuwasiliana naye?',
      startersLabel: 'Maswali ya kuanzia',
      inputLabel: 'Ujumbe',
      placeholder: 'Uliza kuhusu ujuzi, miradi, mawasiliano...',
      send: 'Tuma ujumbe',
      thinking: 'Nafikiria...',
      error:
        'Siwezi kujibu kwa sasa. Bado unaweza kuwasiliana na Louis kupitia fomu ya mawasiliano au barua pepe.',
    },
    cookies: {
      label: 'Taarifa ya cookies',
      eyebrow: 'Faragha',
      title: 'Cookies na hifadhi ya kivinjari',
      text:
        'Portfolio hii huhifadhi chaguo lako la cookies kwenye kivinjari chako. Viungo vya nje vinaweza kutumia cookies kwenye tovuti zao.',
      onlyNecessary: 'Muhimu tu',
      accept: 'Kubali',
    },
  },
};

const LanguageContext = createContext(null);

const getSavedLanguage = () => {
  try {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return languages.some((language) => language.code === savedLanguage) ? savedLanguage : null;
  } catch {
    return null;
  }
};

const getVisitorLanguage = () => {
  if (typeof navigator === 'undefined') return 'en';

  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone === 'Africa/Dar_es_Salaam') return 'sw';
    if (timeZone === 'Europe/Berlin') return 'de';
  } catch {
    // Fall back to browser locale below.
  }

  const visitorLocales = (navigator.languages?.length ? navigator.languages : [navigator.language])
    .filter(Boolean)
    .map((locale) => locale.toLowerCase());

  if (visitorLocales.some((locale) => locale === 'sw-tz' || locale.endsWith('-tz'))) return 'sw';
  if (visitorLocales.some((locale) => locale === 'de-de' || locale.endsWith('-de'))) return 'de';

  return 'en';
};

const getInitialLanguage = () => {
  const savedLanguage = getSavedLanguage();
  if (savedLanguage) return savedLanguage;

  return getVisitorLanguage();
};

const formatTranslation = (value, replacements) => {
  if (!replacements) return value;

  return Object.entries(replacements).reduce(
    (text, [key, replacement]) => text.replaceAll(`{${key}}`, replacement),
    value,
  );
};

const getNestedValue = (source, key) => key.split('.').reduce((current, part) => current?.[part], source);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(getInitialLanguage);

  useEffect(() => {
    const languageConfig = languages.find((item) => item.code === language) || languages[0];
    document.documentElement.lang = languageConfig.htmlLang;
  }, [language]);

  const setLanguage = (nextLanguage) => {
    if (!languages.some((item) => item.code === nextLanguage)) return;
    setLanguageState(nextLanguage);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  };

  const value = useMemo(() => {
    const t = (key, replacements) => {
      const translatedValue = getNestedValue(translations[language], key) ?? getNestedValue(translations.en, key) ?? key;
      return formatTranslation(translatedValue, replacements);
    };

    return { language, languages, setLanguage, t };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within LanguageProvider');
  }
  return context;
};
