/* ==========================================================================
   INS — Navbar behaviour
   1. Scroll progress → CSS custom property --p (0…1) on .nav
   2. Mobile panel: open/close, Esc, focus trap, scroll lock
   3. Language switch wiring
   ========================================================================== */

(function () {
  "use strict";

  var nav = document.querySelector("[data-nav]");
  if (!nav) return;

  var toggle = nav.querySelector("[data-nav-toggle]");
  var panel = document.querySelector("[data-nav-panel]");
  var DESKTOP = window.matchMedia("(min-width: 1024px)");

  /* ---- 1. Scroll-driven glass ---------------------------------------- */

  var THRESHOLD = 120; // px over which the capsule fully resolves
  var ticking = false;
  var lastP = -1;

  function paint() {
    var y = window.scrollY || window.pageYOffset || 0;
    var p = Math.min(y / THRESHOLD, 1);
    p = Math.round(p * 100) / 100;

    if (p !== lastP) {
      nav.style.setProperty("--p", p);
      nav.classList.toggle("is-scrolled", p > 0.02);
      lastP = p;
    }
    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(paint);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  paint();

  /* ---- 2. Mobile panel ------------------------------------------------ */

  var FOCUSABLE =
    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
  var lastFocused = null;

  function scrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  function openPanel() {
    if (!panel || !toggle) return;
    lastFocused = document.activeElement;

    panel.classList.add("is-open");
    panel.removeAttribute("aria-hidden");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute(
      "aria-label",
      window.INS_I18N ? window.INS_I18N.t("nav.menu.close") : "Close menu"
    );

    var pad = scrollbarWidth();
    if (pad > 0) document.body.style.paddingRight = pad + "px";
    document.body.classList.add("is-locked");

    var first = panel.querySelector(FOCUSABLE);
    if (first) {
      window.setTimeout(function () {
        first.focus();
      }, 180);
    }
  }

  function closePanel(returnFocus) {
    if (!panel || !toggle) return;

    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute(
      "aria-label",
      window.INS_I18N ? window.INS_I18N.t("nav.menu.open") : "Open menu"
    );

    document.body.classList.remove("is-locked");
    document.body.style.paddingRight = "";

    if (returnFocus) {
      (lastFocused && document.contains(lastFocused) ? lastFocused : toggle).focus();
    }
  }

  function isOpen() {
    return panel && panel.classList.contains("is-open");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      isOpen() ? closePanel(true) : openPanel();
    });
  }

  if (panel) {
    panel.setAttribute("aria-hidden", "true");

    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) closePanel(false);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (!isOpen()) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closePanel(true);
      return;
    }

    if (e.key !== "Tab") return;

    var items = Array.prototype.filter.call(
      panel.querySelectorAll(FOCUSABLE),
      function (el) {
        return el.offsetParent !== null;
      }
    );
    if (!items.length) return;

    var first = items[0];
    var last = items[items.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Returning to desktop width while open would strand the scroll lock.
  function handleBreakpoint(e) {
    if (e.matches && isOpen()) closePanel(false);
  }
  if (DESKTOP.addEventListener) {
    DESKTOP.addEventListener("change", handleBreakpoint);
  } else if (DESKTOP.addListener) {
    DESKTOP.addListener(handleBreakpoint);
  }

  /* ---- 3. Language switch --------------------------------------------- */

  function syncLangButtons(lang) {
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.setAttribute(
        "aria-pressed",
        btn.getAttribute("data-lang-btn") === lang ? "true" : "false"
      );
    });

    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        window.INS_I18N.t(isOpen() ? "nav.menu.close" : "nav.menu.open")
      );
    }
  }

  document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var lang = btn.getAttribute("data-lang-btn");
      if (window.INS_I18N && window.INS_I18N.get() !== lang) {
        window.INS_I18N.set(lang);
      }
    });
  });

  document.addEventListener("ins:langchange", function (e) {
    syncLangButtons(e.detail.lang);
  });

  if (window.INS_I18N) syncLangButtons(window.INS_I18N.get());
})();
