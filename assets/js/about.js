/* ==========================================================================
   INS — ABOUT
   Copy source: int-nucl.com/about-us. The mission paragraph and the four
   values (Proactive Communication, Honesty, Transparency, Detail-Oriented
   Work) are paraphrased from that page — they are INS's own published
   values, not a stand-in set invented for this section.
   ========================================================================== */

(function () {
  "use strict";

  if (window.INS_I18N) {
    window.INS_I18N.extend({
      en: {
        "about.eyebrow": "About INS",
        "about.title.l1": "Experience built",
        "about.title.l2": "around precision.",
        "about.lead1":
          "INS leads in staff augmentation across multiple trades within the nuclear power generation industry, drawing on certified talent from domestic and international sources to support nuclear power as a cornerstone of energy generation.",
        "about.lead2":
          "INS delivers tailored services to nuclear power plants, government agencies and private sector partners, with a team whose experience spans nuclear operations, radiation protection and environmental stewardship.",

        "about.p1.title": "Proactive Communication",
        "about.p1.desc":
          "Open, timely and clear communication that keeps collaboration seamless and addresses challenges before they arise.",

        "about.p2.title": "Honesty",
        "about.p2.desc":
          "Integrity and truthfulness in every interaction, building trust with clients, partners and team members.",

        "about.p3.title": "Transparency",
        "about.p3.desc":
          "Clarity and openness carried through every process, decision and operation.",

        "about.p4.title": "Detail-Oriented Work",
        "about.p4.desc":
          "Precision and thoroughness in everything INS does, holding every engagement to the highest standard."
      },

      es: {
        "about.eyebrow": "Sobre INS",
        "about.title.l1": "Experiencia construida",
        "about.title.l2": "alrededor de la precisión.",
        "about.lead1":
          "INS lidera el staff augmentation en múltiples oficios dentro de la industria de generación nucleoeléctrica, apoyándose en talento certificado de fuentes nacionales e internacionales para sostener a la energía nuclear como pilar de la generación eléctrica.",
        "about.lead2":
          "INS presta servicios a la medida para centrales nucleares, agencias gubernamentales y socios del sector privado, con un equipo cuya experiencia abarca operaciones nucleares, protección radiológica y gestión ambiental.",

        "about.p1.title": "Comunicación Proactiva",
        "about.p1.desc":
          "Comunicación abierta, oportuna y clara que mantiene la colaboración fluida y resuelve los retos antes de que surjan.",

        "about.p2.title": "Honestidad",
        "about.p2.desc":
          "Integridad y veracidad en cada interacción, construyendo confianza con clientes, socios y equipo de trabajo.",

        "about.p3.title": "Transparencia",
        "about.p3.desc":
          "Claridad y apertura presentes en cada proceso, decisión y operación.",

        "about.p4.title": "Trabajo Detallado",
        "about.p4.desc":
          "Precisión y minuciosidad en todo lo que hace INS, manteniendo cada proyecto en el más alto estándar."
      }
    });
  }

  // Hovering a principle subtly pans the shared photo and crossfades its
  // matching tint layer. Both effects live on the photo, not four separate
  // images — the brief asks for a slight shift, not a swap.
  var root = document.querySelector("[data-about]");
  if (!root) return;

  var pan = root.querySelector(".about-feature__pan");
  var tints = root.querySelectorAll(".about-feature__tint");
  var items = root.querySelectorAll("[data-principle]");

  var OFFSETS = {
    1: { x: -7, y: -4 },
    2: { x: 7, y: -4 },
    3: { x: -7, y: 4 },
    4: { x: 7, y: 4 }
  };

  function activate(index) {
    if (pan) {
      var o = OFFSETS[index] || { x: 0, y: 0 };
      pan.style.setProperty("--pan-x", o.x + "px");
      pan.style.setProperty("--pan-y", o.y + "px");
    }
    tints.forEach(function (t) {
      t.classList.toggle("is-active", t.getAttribute("data-tint") === String(index));
    });
  }

  function reset() {
    if (pan) {
      pan.style.setProperty("--pan-x", "0px");
      pan.style.setProperty("--pan-y", "0px");
    }
    tints.forEach(function (t) {
      t.classList.remove("is-active");
    });
  }

  items.forEach(function (el) {
    var idx = el.getAttribute("data-principle");
    el.addEventListener("mouseenter", function () {
      activate(idx);
    });
    el.addEventListener("focusin", function () {
      activate(idx);
    });
  });

  root.addEventListener("mouseleave", reset);
  root.addEventListener("focusout", function (e) {
    if (!root.contains(e.relatedTarget)) reset();
  });

  if (window.INS_REVEAL) window.INS_REVEAL.refresh();
})();
