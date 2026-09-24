/* ==========================================================================
   INS — PARTICLES (global ambient background)
   A fixed canvas behind every section: slow-drifting glowing points in the
   site's accent teal, with a subset that pulse brighter — read as suspended
   particles / faint energy rather than a literal "reactor core" effect, per
   the site's dark-premium, non-sci-fi visual language.

   Runs only when relevant: paused entirely in light theme, when the tab is
   hidden, and never started at all under prefers-reduced-motion (the canvas
   is also display:none there via CSS — this just avoids wasting a loop).
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  var canvas = document.createElement("canvas");
  canvas.className = "particles-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.insertBefore(canvas, document.body.firstChild);

  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var width, height;
  var particles = [];
  var running = false;
  var rafId = null;

  var ACCENT = "55, 194, 168"; // matches --accent, as an rgb triplet for canvas use

  function isDark() {
    return document.documentElement.getAttribute("data-theme") !== "light";
  }

  function particleCount() {
    var area = width * height;
    // Roughly one particle per 11,000px², clamped to a sane range — dense
    // enough to read as "medium" on a typical viewport without ever
    // becoming a performance concern on small or huge screens.
    return Math.max(36, Math.min(100, Math.round(area / 11000)));
  }

  function makeParticle() {
    var energized = Math.random() < 0.18; // ~1 in 5 particles pulses brighter
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      r: energized ? 1.6 + Math.random() * 1.4 : 0.8 + Math.random() * 1,
      baseAlpha: energized ? 0.5 + Math.random() * 0.25 : 0.22 + Math.random() * 0.18,
      energized: energized,
      phase: Math.random() * Math.PI * 2,
      speed: 0.0006 + Math.random() * 0.0008,
    };
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var target = particleCount();
    if (particles.length < target) {
      while (particles.length < target) particles.push(makeParticle());
    } else {
      particles.length = target;
    }
  }

  function step(t) {
    ctx.clearRect(0, 0, width, height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges instead of bouncing — keeps the drift continuous
      // and ambient rather than looking like something bouncing off walls.
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;

      var alpha = p.baseAlpha;
      if (p.energized) {
        alpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(t * p.speed + p.phase));
      }

      ctx.beginPath();
      if (p.energized) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(" + ACCENT + ", " + Math.min(alpha, 0.9) + ")";
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.fillStyle = "rgba(" + ACCENT + ", " + alpha + ")";
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    rafId = window.requestAnimationFrame(step);
  }

  function start() {
    if (running) return;
    running = true;
    rafId = window.requestAnimationFrame(step);
  }

  function stop() {
    running = false;
    if (rafId) window.cancelAnimationFrame(rafId);
    rafId = null;
    if (width && height) ctx.clearRect(0, 0, width, height);
  }

  function syncToTheme() {
    if (isDark() && document.visibilityState === "visible") start();
    else stop();
  }

  resize();
  syncToTheme();

  var resizeTimer = null;
  window.addEventListener(
    "resize",
    function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    },
    { passive: true }
  );

  document.addEventListener("visibilitychange", syncToTheme);

  // theme.js sets data-theme directly on <html> with no change event, so
  // watch the attribute itself to start/stop when the person toggles theme.
  new MutationObserver(syncToTheme).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
})();
