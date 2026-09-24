/* ==========================================================================
   INS — THEME TOGGLE
   Initial theme is already applied by the inline script in <head> (before
   first paint, to avoid a flash). This file only wires the button itself:
   toggling, persisting the choice, and keeping meta[theme-color] in sync so
   mobile browser chrome matches the page.
   ========================================================================== */

(function () {
  "use strict";

  if (window.INS_I18N) {
    window.INS_I18N.extend({
      en: {
        "nav.theme.toggle": "Toggle dark / light theme",
        "nav.theme.dark": "Switch to dark theme",
        "nav.theme.light": "Switch to light theme"
      },
      es: {
        "nav.theme.toggle": "Alternar tema oscuro / claro",
        "nav.theme.dark": "Cambiar a tema oscuro",
        "nav.theme.light": "Cambiar a tema claro"
      }
    });
  }

  var STORAGE_KEY = "ins-theme";
  var THEME_COLOR = { dark: "#050608", light: "#f7f8f9" };
  var toggle = document.querySelector("[data-theme-toggle]");
  var metaColor = document.querySelector('meta[name="theme-color"]');

  function current() {
    return document.documentElement.getAttribute("data-theme") === "light"
      ? "light"
      : "dark";
  }

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (metaColor) metaColor.setAttribute("content", THEME_COLOR[theme]);
    if (toggle) {
      toggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
      var labelKey = theme === "light" ? "nav.theme.dark" : "nav.theme.light";
      toggle.setAttribute(
        "aria-label",
        window.INS_I18N ? window.INS_I18N.t(labelKey) : "Toggle theme"
      );
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* private mode — the choice just won't persist across visits */
    }
  }

  // Sync the button's initial label/state to whatever the head script
  // already applied, without re-triggering any transition.
  apply(current());

  if (toggle) {
    toggle.addEventListener("click", function () {
      apply(current() === "light" ? "dark" : "light");
    });
  }

  // If the person hasn't chosen explicitly, follow the OS setting live.
  var media = window.matchMedia("(prefers-color-scheme: light)");
  function onSystemChange(e) {
    var hasExplicitChoice;
    try {
      hasExplicitChoice = !!localStorage.getItem(STORAGE_KEY + "-explicit");
    } catch (err) {
      hasExplicitChoice = false;
    }
    if (!hasExplicitChoice) apply(e.matches ? "light" : "dark");
  }
  if (media.addEventListener) media.addEventListener("change", onSystemChange);
  else if (media.addListener) media.addListener(onSystemChange);

  if (toggle) {
    toggle.addEventListener("click", function () {
      try {
        localStorage.setItem(STORAGE_KEY + "-explicit", "1");
      } catch (e) {
        /* ignore */
      }
    });
  }
})();
