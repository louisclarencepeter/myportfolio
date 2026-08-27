import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LANGUAGE_STORAGE_KEY = "portfolio-language";

export const languages = [
  { code: "en", label: "EN", name: "English", htmlLang: "en" },
  { code: "de", label: "DE", name: "Deutsch", htmlLang: "de" },
  { code: "sw", label: "SW", name: "Kiswahili", htmlLang: "sw" },
];

const translations = {
  en: {
    nav: {
      primary: "Primary navigation",
      story: "Story",
      projects: "Projects",
      photography: "Photography",
      contact: "Contact",
      menu: "Menu",
      close: "Close",
      switchTheme: "Switch to {theme} theme",
      light: "light",
      dark: "dark",
      language: "Language",
    },
    home: {
      headline: "A life built across places, pictures and products.",
      summary:
        "I’m Louis Peter — a Tanzanian creator back in Zanzibar, building travel experiences, digital products and visual stories.",
      followJourney: "Follow the journey",
      seeProjects: "See my projects",
      zanzibar: "Zanzibar",
      frankfurt: "Frankfurt",
      placesLabel: "Returned from Frankfurt to Zanzibar",
      mediaLabel: "Portrait of Louis Peter",
      portraitAlt: "Louis Peter smiling on the shoreline",
    },
    story: {
      title: "Before the code, there was Zanzibar.",
      intro:
        "Years in hospitality and excursions taught me how people experience a place. Science and practical computing gave me the tools. Germany added language, photography and software. Now I’m back in Zanzibar, bringing those chapters together.",
      dhowAlt: "A wooden dhow approaching a turquoise Zanzibar sandbank",
      stoneTownAlt: "Stone Town waterfront in Zanzibar",
      detailCaption: "From the coastlines of Zanzibar to the streets of Frankfurt — and home again.",
      timelineLabel: "Louis Peter’s life journey",
      timeline: {
        learning: {
          period: "2004–2012",
          title: "Learning in Tanzania",
          text: "Science, mathematics and practical computing shaped how I solve problems.",
        },
        hospitality: {
          period: "2012–2019",
          title: "Hospitality & excursions",
          text: "From Stone Town to Bwejuu, I worked with guests, reservations and island experiences.",
        },
        paradise: {
          period: "2015–2021",
          title: "Destination Paradise begins",
          text: "I turned years of local knowledge into a travel company rooted in Zanzibar.",
        },
        germany: {
          period: "2021–2026",
          title: "A chapter in Germany",
          text: "Language study, photography and full-stack development gave the idea new tools.",
        },
        return: {
          period: "2026–today",
          title: "Back in Zanzibar",
          text: "I returned home with new tools for travel, visual storytelling and digital products.",
        },
      },
    },
    projects: {
      title: "Three projects. One thread.",
      intro: "Helping people see, build and go.",
      photography: {
        statement: "Life, people and places through my lens.",
        link: "View photography",
        alt: "Editorial portrait photographed by Louis Peter",
      },
      dcs: {
        statement: "A Tanzania-based studio for software, brands and visual content.",
        signature: "Build. Create. Grow.",
        link: "Visit DCS",
        alt: "FlowDesk software displayed on a laptop, created by Digital & Creative Solutions",
      },
      paradise: {
        statement: "The Zanzibar travel idea I carried into a digital platform.",
        link: "Explore Paradise",
        alt: "Destination Paradise travel platform homepage",
      },
    },
    photography: {
      title: "The camera taught me to notice.",
      intro:
        "Portraits, weddings, events, places and aerial work — a personal practice across Frankfurt and Tanzania.",
      link: "Visit the photography site",
      gallery: {
        wedding: {
          caption: "Wedding · Frankfurt",
          alt: "Wedding party photographed outside a stone building",
        },
        aerial: {
          caption: "Aerial · Zanzibar",
          alt: "Boats floating above a clear turquoise reef",
        },
        architecture: {
          caption: "Architecture · Frankfurt",
          alt: "Frankfurt high-rise buildings seen from below",
        },
        couple: {
          caption: "Couple · Golden hour",
          alt: "A smiling couple walking through trees at golden hour",
        },
        editorial: {
          caption: "Editorial portrait",
          alt: "Editorial beauty portrait holding a makeup pencil",
        },
      },
    },
    contact: {
      title: "Let’s make the next chapter useful.",
      text: "Open to thoughtful collaborations in software, storytelling and travel.",
      name: "Your name",
      email: "Email",
      message: "Tell me what you’re thinking",
      send: "Send a message",
      sending: "Sending...",
      fillAll: "Please fill in all fields.",
      success: "Thanks — your message has been sent.",
      fallback: "Something went wrong. Opening your email client instead...",
      subject: "Portfolio contact from {name}",
      mailBody: "Name: {name}\nEmail: {email}\n\n{message}",
    },
    footer: {
      places: "Frankfurt → Zanzibar",
      linksLabel: "Other places to find Louis Peter",
      photography: "Photography",
      impressum: "Impressum",
    },
    chat: {
      label: "Chat with Lou",
      kicker: "Meet Lou",
      title: "Ask about my journey",
      button: "Ask Lou",
      open: "Open Lou",
      close: "Close Lou",
      greeting:
        "Hi, I’m Lou. Ask me about Louis’s Zanzibar story, photography, software work or projects.",
      starterProjects: "Show me the projects",
      starterStack: "What does Louis build with?",
      starterContact: "How can I contact him?",
      startersLabel: "Suggested questions",
      inputLabel: "Message",
      placeholder: "Ask about the story, projects, or contact...",
      send: "Send message",
      thinking: "Thinking...",
      error:
        "I couldn’t answer right now. You can still reach Louis through the contact form or by email.",
      nudge: "Curious about the story? Ask Lou.",
      nudgeDismiss: "Dismiss",
    },
    cookies: {
      label: "Cookie banner",
      eyebrow: "Privacy",
      title: "Cookies and local storage",
      text:
        "This portfolio uses local storage to remember your cookie choice. If you accept, Google Analytics helps me understand aggregate site usage.",
      onlyNecessary: "Only necessary",
      accept: "Accept",
    },
  },
  de: {
    nav: {
      primary: "Hauptnavigation",
      story: "Geschichte",
      projects: "Projekte",
      photography: "Fotografie",
      contact: "Kontakt",
      menu: "Menü",
      close: "Schließen",
      switchTheme: "Zum {theme} Design wechseln",
      light: "hellen",
      dark: "dunklen",
      language: "Sprache",
    },
    home: {
      headline: "Ein Leben zwischen Orten, Bildern und digitalen Produkten.",
      summary:
        "Ich bin Louis Peter — ein tansanischer Kreativer, zurück auf Sansibar. Ich entwickle Reiseerlebnisse, digitale Produkte und visuelle Geschichten.",
      followJourney: "Meiner Reise folgen",
      seeProjects: "Meine Projekte ansehen",
      zanzibar: "Sansibar",
      frankfurt: "Frankfurt",
      placesLabel: "Von Frankfurt zurück nach Sansibar",
      mediaLabel: "Porträt von Louis Peter",
      portraitAlt: "Louis Peter lächelnd am Meeresufer",
    },
    story: {
      title: "Vor dem Code war Sansibar.",
      intro:
        "Jahre in Hotellerie und Ausflugsorganisation haben mir gezeigt, wie Menschen einen Ort erleben. Naturwissenschaften und praktische Informatik gaben mir die Werkzeuge. Deutschland brachte Sprache, Fotografie und Software hinzu. Jetzt bin ich zurück auf Sansibar und verbinde diese Kapitel.",
      dhowAlt: "Eine hölzerne Dhau vor einer türkisfarbenen Sandbank auf Sansibar",
      stoneTownAlt: "Die Uferpromenade von Stone Town auf Sansibar",
      detailCaption: "Von den Küsten Sansibars zu den Straßen Frankfurts — und wieder nach Hause.",
      timelineLabel: "Der Lebensweg von Louis Peter",
      timeline: {
        learning: {
          period: "2004–2012",
          title: "Lernen in Tansania",
          text: "Naturwissenschaften, Mathematik und praktische Informatik prägten meine Art, Probleme zu lösen.",
        },
        hospitality: {
          period: "2012–2019",
          title: "Hotellerie & Ausflüge",
          text: "Von Stone Town bis Bwejuu arbeitete ich mit Gästen, Reservierungen und Inselerlebnissen.",
        },
        paradise: {
          period: "2015–2021",
          title: "Destination Paradise beginnt",
          text: "Aus jahrelanger Ortskenntnis entstand ein Reiseunternehmen mit Wurzeln auf Sansibar.",
        },
        germany: {
          period: "2021–2026",
          title: "Ein Kapitel in Deutschland",
          text: "Sprachkurse, Fotografie und Full-Stack-Entwicklung gaben der Idee neue Werkzeuge.",
        },
        return: {
          period: "2026–heute",
          title: "Zurück auf Sansibar",
          text: "Ich bin mit neuen Werkzeugen für Reisen, visuelles Storytelling und digitale Produkte zurückgekehrt.",
        },
      },
    },
    projects: {
      title: "Drei Projekte. Ein roter Faden.",
      intro: "Menschen helfen zu sehen, zu bauen und aufzubrechen.",
      photography: {
        statement: "Leben, Menschen und Orte durch meine Linse.",
        link: "Fotografie ansehen",
        alt: "Editorial-Porträt, fotografiert von Louis Peter",
      },
      dcs: {
        statement: "Ein Studio aus Tansania für Software, Marken und visuelle Inhalte.",
        signature: "Build. Create. Grow.",
        link: "DCS besuchen",
        alt: "FlowDesk-Software auf einem Laptop, entwickelt von Digital & Creative Solutions",
      },
      paradise: {
        statement: "Die Reiseidee aus Sansibar, die ich in eine digitale Plattform überführt habe.",
        link: "Paradise entdecken",
        alt: "Startseite der Reiseplattform Destination Paradise",
      },
    },
    photography: {
      title: "Die Kamera lehrte mich, genauer hinzusehen.",
      intro:
        "Porträts, Hochzeiten, Veranstaltungen, Orte und Luftaufnahmen — eine persönliche Praxis zwischen Frankfurt und Tansania.",
      link: "Zur Fotografie-Website",
      gallery: {
        wedding: {
          caption: "Hochzeit · Frankfurt",
          alt: "Hochzeitsgesellschaft vor einem Steingebäude",
        },
        aerial: {
          caption: "Luftaufnahme · Sansibar",
          alt: "Boote über einem klaren türkisfarbenen Riff",
        },
        architecture: {
          caption: "Architektur · Frankfurt",
          alt: "Frankfurter Hochhäuser aus der Untersicht",
        },
        couple: {
          caption: "Paar · Goldene Stunde",
          alt: "Ein lächelndes Paar zwischen Bäumen in der goldenen Stunde",
        },
        editorial: {
          caption: "Editorial-Porträt",
          alt: "Editorial-Beauty-Porträt mit einem Schminkstift",
        },
      },
    },
    contact: {
      title: "Machen wir das nächste Kapitel nützlich.",
      text: "Offen für durchdachte Zusammenarbeit in Software, Storytelling und Reisen.",
      name: "Dein Name",
      email: "E-Mail",
      message: "Erzähl mir, woran du denkst",
      send: "Nachricht senden",
      sending: "Wird gesendet...",
      fillAll: "Bitte fülle alle Felder aus.",
      success: "Danke — deine Nachricht wurde gesendet.",
      fallback: "Das hat gerade nicht geklappt. Ich öffne stattdessen dein E-Mail-Programm...",
      subject: "Portfolio-Anfrage von {name}",
      mailBody: "Name: {name}\nE-Mail: {email}\n\n{message}",
    },
    footer: {
      places: "Frankfurt → Sansibar",
      linksLabel: "Weitere Seiten von Louis Peter",
      photography: "Fotografie",
      impressum: "Impressum",
    },
    chat: {
      label: "Chat mit Lou",
      kicker: "Lou kennenlernen",
      title: "Frag nach meinem Weg",
      button: "Lou fragen",
      open: "Lou öffnen",
      close: "Lou schließen",
      greeting:
        "Hi, ich bin Lou. Frag mich nach Louis’ Geschichte aus Sansibar, seiner Fotografie, Softwarearbeit oder seinen Projekten.",
      starterProjects: "Zeig mir die Projekte",
      starterStack: "Womit entwickelt Louis?",
      starterContact: "Wie kann ich ihn kontaktieren?",
      startersLabel: "Vorgeschlagene Fragen",
      inputLabel: "Nachricht",
      placeholder: "Frag nach Geschichte, Projekten oder Kontakt...",
      send: "Nachricht senden",
      thinking: "Ich denke nach...",
      error:
        "Ich kann gerade nicht antworten. Du kannst Louis weiterhin über das Kontaktformular oder per E-Mail erreichen.",
      nudge: "Neugierig auf die Geschichte? Frag Lou.",
      nudgeDismiss: "Schließen",
    },
    cookies: {
      label: "Cookie-Hinweis",
      eyebrow: "Datenschutz",
      title: "Cookies und lokaler Speicher",
      text:
        "Dieses Portfolio speichert deine Cookie-Auswahl lokal im Browser. Wenn du zustimmst, hilft Google Analytics mir, die Nutzung der Website zusammengefasst zu verstehen.",
      onlyNecessary: "Nur notwendige",
      accept: "Akzeptieren",
    },
  },
  sw: {
    nav: {
      primary: "Urambazaji mkuu",
      story: "Safari yangu",
      projects: "Miradi",
      photography: "Upigaji picha",
      contact: "Mawasiliano",
      menu: "Menyu",
      close: "Funga",
      switchTheme: "Badili kwenda mandhari ya {theme}",
      light: "mwanga",
      dark: "giza",
      language: "Lugha",
    },
    home: {
      headline: "Maisha yaliyojengwa kati ya maeneo, picha na bidhaa za kidijitali.",
      summary:
        "Mimi ni Louis Peter — mbunifu Mtanzania niliyerudi Zanzibar, nikitengeneza uzoefu wa safari, bidhaa za kidijitali na hadithi za picha.",
      followJourney: "Fuata safari yangu",
      seeProjects: "Tazama miradi yangu",
      zanzibar: "Zanzibar",
      frankfurt: "Frankfurt",
      placesLabel: "Nimerudi kutoka Frankfurt hadi Zanzibar",
      mediaLabel: "Picha ya Louis Peter",
      portraitAlt: "Louis Peter akitabasamu ufukweni",
    },
    story: {
      title: "Kabla ya kuandika programu, kulikuwa na Zanzibar.",
      intro:
        "Miaka katika ukarimu na safari ilinifunza jinsi watu wanavyohisi eneo. Sayansi na mafunzo ya kompyuta yalinipa zana. Ujerumani iliongeza lugha, upigaji picha na programu. Sasa nimerudi Zanzibar nikileta sura hizo pamoja.",
      dhowAlt: "Dau la mbao likikaribia fungu la mchanga lenye maji ya samawati Zanzibar",
      stoneTownAlt: "Ufukwe wa Stone Town, Zanzibar",
      detailCaption: "Kutoka fukwe za Zanzibar hadi mitaa ya Frankfurt — na kurudi nyumbani.",
      timelineLabel: "Safari ya maisha ya Louis Peter",
      timeline: {
        learning: {
          period: "2004–2012",
          title: "Kujifunza Tanzania",
          text: "Sayansi, hisabati na mafunzo ya kompyuta yalijenga namna ninavyotatua matatizo.",
        },
        hospitality: {
          period: "2012–2019",
          title: "Ukarimu na safari",
          text: "Kutoka Stone Town hadi Bwejuu, nilifanya kazi na wageni, nafasi za malazi na uzoefu wa visiwani.",
        },
        paradise: {
          period: "2015–2021",
          title: "Destination Paradise inaanza",
          text: "Niligeuza uzoefu wa miaka mingi wa eneo kuwa kampuni ya safari yenye mizizi Zanzibar.",
        },
        germany: {
          period: "2021–2026",
          title: "Sura ya Ujerumani",
          text: "Masomo ya lugha, upigaji picha na uundaji wa full-stack vililipa wazo zana mpya.",
        },
        return: {
          period: "2026–leo",
          title: "Nimerudi Zanzibar",
          text: "Nimerudi nyumbani nikiwa na zana mpya za safari, usimulizi wa picha na bidhaa za kidijitali.",
        },
      },
    },
    projects: {
      title: "Miradi mitatu. Uzi mmoja.",
      intro: "Kuwasaidia watu kuona, kujenga na kusafiri.",
      photography: {
        statement: "Maisha, watu na maeneo kupitia lenzi yangu.",
        link: "Tazama upigaji picha",
        alt: "Picha ya urembo iliyopigwa na Louis Peter",
      },
      dcs: {
        statement: "Studio ya Tanzania ya programu, chapa na maudhui ya picha.",
        signature: "Build. Create. Grow.",
        link: "Tembelea DCS",
        alt: "Programu ya FlowDesk kwenye kompyuta mpakato, iliyoundwa na Digital & Creative Solutions",
      },
      paradise: {
        statement: "Wazo la safari la Zanzibar nililolibeba hadi kuwa jukwaa la kidijitali.",
        link: "Gundua Paradise",
        alt: "Ukurasa wa mwanzo wa jukwaa la safari la Destination Paradise",
      },
    },
    photography: {
      title: "Kamera ilinifundisha kutazama kwa makini.",
      intro:
        "Picha za watu, harusi, matukio, maeneo na picha za angani — kazi binafsi kati ya Frankfurt na Tanzania.",
      link: "Tembelea tovuti ya picha",
      gallery: {
        wedding: {
          caption: "Harusi · Frankfurt",
          alt: "Watu wa harusi wakiwa mbele ya jengo la mawe",
        },
        aerial: {
          caption: "Picha ya angani · Zanzibar",
          alt: "Boti zikielea juu ya mwamba wenye maji ya samawati",
        },
        architecture: {
          caption: "Usanifu · Frankfurt",
          alt: "Majengo marefu ya Frankfurt yakitazamwa kutoka chini",
        },
        couple: {
          caption: "Wapenzi · Mwanga wa jioni",
          alt: "Wapenzi wanaotabasamu wakitembea kati ya miti wakati wa jioni",
        },
        editorial: {
          caption: "Picha ya urembo",
          alt: "Picha ya urembo ya mwanamke akiwa na penseli ya vipodozi",
        },
      },
    },
    contact: {
      title: "Tufanye sura inayofuata iwe na maana.",
      text: "Niko tayari kwa ushirikiano wa makini katika programu, usimulizi na safari.",
      name: "Jina lako",
      email: "Barua pepe",
      message: "Niambie unachofikiria",
      send: "Tuma ujumbe",
      sending: "Inatuma...",
      fillAll: "Tafadhali jaza sehemu zote.",
      success: "Asante — ujumbe wako umetumwa.",
      fallback: "Kuna tatizo kidogo. Ninafungua programu yako ya barua pepe badala yake...",
      subject: "Ujumbe wa portfolio kutoka kwa {name}",
      mailBody: "Jina: {name}\nBarua pepe: {email}\n\n{message}",
    },
    footer: {
      places: "Frankfurt → Zanzibar",
      linksLabel: "Sehemu nyingine za kumpata Louis Peter",
      photography: "Upigaji picha",
      impressum: "Impressum",
    },
    chat: {
      label: "Ongea na Lou",
      kicker: "Kutana na Lou",
      title: "Uliza kuhusu safari yangu",
      button: "Uliza Lou",
      open: "Fungua Lou",
      close: "Funga Lou",
      greeting:
        "Habari, mimi ni Lou. Niulize kuhusu safari ya Louis ya Zanzibar, upigaji picha, programu au miradi yake.",
      starterProjects: "Nionyeshe miradi",
      starterStack: "Louis anatumia teknolojia gani?",
      starterContact: "Ninawezaje kuwasiliana naye?",
      startersLabel: "Maswali ya kuanzia",
      inputLabel: "Ujumbe",
      placeholder: "Uliza kuhusu safari, miradi au mawasiliano...",
      send: "Tuma ujumbe",
      thinking: "Nafikiria...",
      error:
        "Siwezi kujibu kwa sasa. Bado unaweza kuwasiliana na Louis kupitia fomu ya mawasiliano au barua pepe.",
      nudge: "Unataka kujua safari yangu? Muulize Lou.",
      nudgeDismiss: "Funga",
    },
    cookies: {
      label: "Taarifa ya cookies",
      eyebrow: "Faragha",
      title: "Cookies na hifadhi ya kivinjari",
      text:
        "Portfolio hii huhifadhi chaguo lako la cookies kwenye kivinjari chako. Ukikubali, Google Analytics hunisaidia kuelewa matumizi ya tovuti kwa muhtasari.",
      onlyNecessary: "Muhimu tu",
      accept: "Kubali",
    },
  },
};

const LanguageContext = createContext(null);

const getSavedLanguage = () => {
  try {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return languages.some((language) => language.code === savedLanguage)
      ? savedLanguage
      : null;
  } catch {
    return null;
  }
};

const getVisitorLanguage = () => {
  if (typeof navigator === "undefined") return "en";

  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone === "Africa/Dar_es_Salaam") return "sw";
    if (timeZone === "Europe/Berlin") return "de";
  } catch {
    // Fall back to browser locale below.
  }

  const visitorLocales = (
    navigator.languages?.length ? navigator.languages : [navigator.language]
  )
    .filter(Boolean)
    .map((locale) => locale.toLowerCase());

  if (visitorLocales.some((locale) => locale === "sw-tz" || locale.endsWith("-tz"))) {
    return "sw";
  }
  if (visitorLocales.some((locale) => locale === "de-de" || locale.endsWith("-de"))) {
    return "de";
  }

  return "en";
};

const getInitialLanguage = () => getSavedLanguage() || getVisitorLanguage();

const formatTranslation = (value, replacements) => {
  if (!replacements) return value;

  return Object.entries(replacements).reduce(
    (text, [key, replacement]) => text.replaceAll(`{${key}}`, replacement),
    value,
  );
};

const getNestedValue = (source, key) =>
  key.split(".").reduce((current, part) => current?.[part], source);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(getInitialLanguage);

  useEffect(() => {
    const languageConfig =
      languages.find((item) => item.code === language) || languages[0];
    document.documentElement.lang = languageConfig.htmlLang;
  }, [language]);

  const setLanguage = (nextLanguage) => {
    if (!languages.some((item) => item.code === nextLanguage)) return;
    setLanguageState(nextLanguage);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  };

  const value = useMemo(() => {
    const t = (key, replacements) => {
      const translatedValue =
        getNestedValue(translations[language], key) ??
        getNestedValue(translations.en, key) ??
        key;
      return formatTranslation(translatedValue, replacements);
    };

    return { language, languages, setLanguage, t };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useTranslation must be used within LanguageProvider");
  return context;
};
