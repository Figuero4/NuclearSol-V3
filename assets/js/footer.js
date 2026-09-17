/* ==========================================================================
   INS — FOOTER
   Contact details reuse the real USA office info already used in the navbar
   panel and the Contact section. The Careers link points to /careers — a
   real page in INS's own site navigation that this build hasn't built yet;
   it is a prepared link, not an invented one.
   ========================================================================== */

(function () {
  "use strict";

  if (window.INS_I18N) {
    window.INS_I18N.extend({
      en: {
        "footer.desc":
          "Certified technicians, quality supplies and unmatched support for nuclear power plants worldwide.",
        "footer.col.solutions": "Navigate",
        "footer.col.company": "Company",
        "footer.col.contact": "Contact",
        "footer.link.industries": "Industries",
        "footer.link.technology": "Technology",
        "footer.link.projects": "Projects",
        "footer.link.about": "About",
        "footer.link.careers": "Careers",
        "footer.link.contact": "Contact",
        "footer.legal.legal": "Legal",
        "footer.legal.privacy": "Privacy",
        "footer.copyright": "International Nuclear Solutions, LLC. All rights reserved."
      },
      es: {
        "footer.desc":
          "Técnicos certificados, suministros de calidad y soporte incomparable para centrales nucleares en todo el mundo.",
        "footer.col.solutions": "Navegar",
        "footer.col.company": "Compañía",
        "footer.col.contact": "Contacto",
        "footer.link.industries": "Industrias",
        "footer.link.technology": "Tecnología",
        "footer.link.projects": "Proyectos",
        "footer.link.about": "Nosotros",
        "footer.link.careers": "Empleo",
        "footer.link.contact": "Contacto",
        "footer.legal.legal": "Legal",
        "footer.legal.privacy": "Privacidad",
        "footer.copyright": "International Nuclear Solutions, LLC. Todos los derechos reservados."
      }
    });
  }

  var footer = document.querySelector("[data-footer]");
  if (!footer) return;

  // Entrance: logo/description first, columns staggered, bottom bar last —
  // all driven by the section's own is-visible class (see footer.css).
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entries, o) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            footer.classList.add("is-visible");
            o.unobserve(footer);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(footer);
  } else {
    footer.classList.add("is-visible");
  }

  // Year, computed rather than hardcoded so the footer never goes stale.
  var yearEl = footer.querySelector("[data-footer-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Minimal parallax on the giant background wordmark — a few pixels of
  // drift, not a scroll effect anyone should consciously notice.
  var mark = footer.querySelector(".site-footer__mark");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (mark && !reduceMotion) {
    var ticking = false;

    function paint() {
      var rect = footer.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      // 0 when the footer top just enters the viewport, 1 once it's fully in.
      var progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
      var shift = (progress - 0.5) * 24; // ±12px total drift
      mark.style.setProperty("--mark-shift", shift.toFixed(1) + "px");
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(paint);
      },
      { passive: true }
    );
    paint();
  }
})();
