/* ==========================================================================
   INS — REVEAL ENGINE
   Single shared IntersectionObserver. Any element with [data-reveal] gets
   `.is-visible` added once it crosses the threshold, then is unobserved —
   entrances run once per page load, not on every scroll pass.

   Markup contract:
     <div data-reveal>                       fades/rises in (see .reveal css)
     <div data-reveal data-reveal-group>      children get staggered via
                                              --reveal-index on each child
   ========================================================================== */

(function () {
  "use strict";

  var REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function reveal(el) {
    el.classList.add("is-visible");
  }

  function primeGroup(el) {
    var children = el.querySelectorAll("[data-reveal-child]");
    children.forEach(function (child, i) {
      child.style.setProperty("--reveal-index", i);
    });
  }

  document.querySelectorAll("[data-reveal-group]").forEach(primeGroup);

  if (REDUCE || !("IntersectionObserver" in window)) {
    document.querySelectorAll("[data-reveal], [data-reveal-child]").forEach(reveal);
    return;
  }

  var observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.28, rootMargin: "0px 0px -8% 0px" }
  );

  document
    .querySelectorAll("[data-reveal], [data-reveal-child]")
    .forEach(function (el) {
      observer.observe(el);
    });

  window.INS_REVEAL = { refresh: function () {
    document.querySelectorAll("[data-reveal-group]").forEach(primeGroup);
    document
      .querySelectorAll("[data-reveal]:not(.is-visible), [data-reveal-child]:not(.is-visible)")
      .forEach(function (el) {
        observer.observe(el);
      });
  }};
})();
