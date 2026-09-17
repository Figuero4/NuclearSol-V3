/* ==========================================================================
   INS — i18n
   Curated EN/ES dictionary. No third-party translation service: technical
   nuclear vocabulary must not be machine-guessed.

   Usage in markup:
     <span data-i18n="nav.solutions"></span>          → textContent
     <a data-i18n-aria="nav.home">                    → aria-label
     <input data-i18n-placeholder="form.email">       → placeholder
     <title data-i18n="meta.title">                   → document title

   Adding a section: append its keys to both `en` and `es`. Missing keys fall
   back to English and warn in the console rather than rendering blank.
   ========================================================================== */

(function (global) {
  "use strict";

  var STORAGE_KEY = "ins-lang";
  var SUPPORTED = ["en", "es"];
  var DEFAULT = "en";

  var dict = {
    en: {
      "meta.title": "International Nuclear Solutions",
      "meta.description":
        "Certified technicians, quality supplies and unmatched support for nuclear power plants worldwide.",

      "nav.skip": "Skip to main content",
      "nav.home": "International Nuclear Solutions — home",
      "nav.solutions": "Solutions",
      "nav.industries": "Industries",
      "nav.technology": "Technology",
      "nav.projects": "Projects",
      "nav.about": "About",
      "nav.contact": "Contact",
      "nav.menu.open": "Open menu",
      "nav.menu.close": "Close menu",
      "nav.menu.label": "Main navigation",
      "nav.lang.label": "Language",
      "nav.lang.en": "Switch to English",
      "nav.lang.es": "Cambiar a español",
      "nav.panel.reach": "Reach us directly",

      "hero.eyebrow": "Welcome",
      "hero.title": "International Nuclear Solutions",
      "hero.subtitle":
        "Certified technicians, quality supplies and unmatched support for nuclear power plants worldwide.",
      "hero.cta.primary": "Talk to our team",
      "hero.cta.secondary": "See our services",

      "placeholder.next": "Next section goes here",
      "placeholder.note":
        "Scroll to watch the navbar resolve into its glass capsule. This block is temporary scaffolding — it will be replaced when we build the hero and the sections that follow."
    },

    es: {
      "meta.title": "International Nuclear Solutions",
      "meta.description":
        "Técnicos certificados, suministros de calidad y soporte incomparable para centrales nucleares en todo el mundo.",

      "nav.skip": "Ir al contenido principal",
      "nav.home": "International Nuclear Solutions — inicio",
      "nav.solutions": "Soluciones",
      "nav.industries": "Industrias",
      "nav.technology": "Tecnología",
      "nav.projects": "Proyectos",
      "nav.about": "Nosotros",
      "nav.contact": "Contacto",
      "nav.menu.open": "Abrir menú",
      "nav.menu.close": "Cerrar menú",
      "nav.menu.label": "Navegación principal",
      "nav.lang.label": "Idioma",
      "nav.lang.en": "Switch to English",
      "nav.lang.es": "Cambiar a español",
      "nav.panel.reach": "Contáctanos directamente",

      "hero.eyebrow": "Bienvenido",
      "hero.title": "International Nuclear Solutions",
      "hero.subtitle":
        "Técnicos certificados, suministros de calidad y soporte incomparable para centrales nucleares en todo el mundo.",
      "hero.cta.primary": "Habla con nuestro equipo",
      "hero.cta.secondary": "Ver nuestros servicios",

      "placeholder.next": "Aquí va la siguiente sección",
      "placeholder.note":
        "Haz scroll para ver cómo el navbar se convierte en su cápsula glassy. Este bloque es provisional: se reemplazará cuando construyamos el hero y las secciones siguientes."
    }
  };

  var current = DEFAULT;

  function read(lang, key) {
    var table = dict[lang] || dict[DEFAULT];
    if (Object.prototype.hasOwnProperty.call(table, key)) return table[key];
    if (dict[DEFAULT][key] !== undefined) {
      console.warn('[i18n] Missing "' + key + '" for "' + lang + '".');
      return dict[DEFAULT][key];
    }
    console.warn('[i18n] Unknown key "' + key + '".');
    return "";
  }

  function apply(lang, root) {
    var scope = root || document;

    scope.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = read(lang, el.getAttribute("data-i18n"));
    });

    scope.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = read(lang, el.getAttribute("data-i18n-html"));
    });

    scope.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", read(lang, el.getAttribute("data-i18n-aria")));
    });

    scope.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      el.setAttribute("alt", read(lang, el.getAttribute("data-i18n-alt")));
    });

    scope.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute(
        "placeholder",
        read(lang, el.getAttribute("data-i18n-placeholder"))
      );
    });

    scope.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      el.setAttribute("title", read(lang, el.getAttribute("data-i18n-title")));
    });
  }

  function detect() {
    var stored;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      stored = null;
    }
    if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;

    var browser = (navigator.language || DEFAULT).slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(browser) !== -1 ? browser : DEFAULT;
  }

  function set(lang, opts) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT;
    current = lang;

    document.documentElement.setAttribute("lang", lang);
    document.title = read(lang, "meta.title");

    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", read(lang, "meta.description"));

    apply(lang);

    if (!opts || opts.persist !== false) {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) {
        /* private mode — preference simply won't survive the session */
      }
    }

    document.dispatchEvent(
      new CustomEvent("ins:langchange", { detail: { lang: lang } })
    );
  }

  global.INS_I18N = {
    supported: SUPPORTED,
    get: function () {
      return current;
    },
    t: function (key, lang) {
      return read(lang || current, key);
    },
    set: set,
    apply: apply,
    /* Lets later sections register their own keys without touching this file. */
    extend: function (additions) {
      SUPPORTED.forEach(function (lang) {
        if (!additions[lang]) return;
        Object.keys(additions[lang]).forEach(function (key) {
          dict[lang][key] = additions[lang][key];
        });
      });
      apply(current);
    },
    init: function () {
      set(detect(), { persist: false });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", global.INS_I18N.init);
  } else {
    global.INS_I18N.init();
  }
})(window);
