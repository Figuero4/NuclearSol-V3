/* ==========================================================================
   INS — HERO
   Registers its own copy with the i18n engine and triggers the entrance
   sequence once the media layer is ready.
   ========================================================================== */

(function () {
  "use strict";

  if (window.INS_I18N) {
    window.INS_I18N.extend({
      en: {
        "hero.eyebrow": "International Nuclear Solutions",
        "hero.title": "Engineering the future<br class=\"br-wide\" /> of nuclear operations",
        "hero.sub":
          "Advanced solutions for nuclear safety, decontamination, operational efficiency and mission-critical infrastructure.",
        "hero.cta.primary": "Explore our solutions",
        "hero.cta.secondary": "Talk to an expert",
        "hero.scroll": "Scroll to explore",
        "hero.media.alt": "Nuclear generating facility at dusk"
      },
      es: {
        "hero.eyebrow": "International Nuclear Solutions",
        "hero.title": "Ingeniería para el futuro<br class=\"br-wide\" /> de la operación nuclear",
        "hero.sub":
          "Soluciones avanzadas en seguridad nuclear, descontaminación, eficiencia operativa e infraestructura crítica.",
        "hero.cta.primary": "Conoce nuestras soluciones",
        "hero.cta.secondary": "Habla con un experto",
        "hero.scroll": "Desliza para explorar",
        "hero.media.alt": "Instalación de generación nuclear al atardecer"
      }
    });
  }

  var hero = document.querySelector("[data-hero]");
  if (!hero) return;

  function start() {
    // Two frames: lets the browser paint the pre-animation state first, so
    // the sequence never starts mid-way on a slow first paint.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        hero.classList.add("is-ready");
      });
    });
  }

  var video = hero.querySelector("[data-hero-video]");
  var img = hero.querySelector(".hero__media img");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (video) {
    // A moving background is exactly the kind of motion this preference
    // asks sites to avoid — show the poster frame as a static image instead.
    if (reduceMotion) {
      video.removeAttribute("autoplay");
      video.pause();
      video.removeAttribute("loop");
    }

    if (video.readyState >= 2) {
      start();
    } else {
      video.addEventListener("loadeddata", start, { once: true });
      video.addEventListener("error", start, { once: true });
      // Don't hold the page hostage to a slow asset — the poster frame
      // covers this window regardless.
      window.setTimeout(start, 1800);
    }
  } else if (img && !img.complete) {
    img.addEventListener("load", start, { once: true });
    img.addEventListener("error", start, { once: true });
    // Don't hold the page hostage to a slow asset.
    window.setTimeout(start, 1800);
  } else if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(start);
    window.setTimeout(start, 1200);
  } else {
    start();
  }
})();
