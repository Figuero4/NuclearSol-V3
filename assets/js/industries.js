/* ==========================================================================
   INS — INDUSTRIES
   Desktop tablist controls the crossfade stage. Keyboard support follows the
   WAI-ARIA tabs pattern (Left/Right/Home/End). The mobile accordion is plain
   native <details> and needs no JS to function — this only makes it single-
   open, which is a courtesy, not a requirement.
   ========================================================================== */

(function () {
  "use strict";

  var root = document.querySelector("[data-industries]");
  if (!root) return;

  var triggers = Array.prototype.slice.call(
    root.querySelectorAll(".industries-trigger")
  );
  var slides = root.querySelectorAll(".industries-slide");
  var copies = root.querySelectorAll(".industries-copy");

  function activate(key, focusTrigger) {
    triggers.forEach(function (btn) {
      var match = btn.getAttribute("data-target") === key;
      btn.classList.toggle("is-active", match);
      btn.setAttribute("aria-selected", match ? "true" : "false");
      btn.setAttribute("tabindex", match ? "0" : "-1");
      if (match && focusTrigger) btn.focus();
    });

    slides.forEach(function (el) {
      el.classList.toggle("is-active", el.getAttribute("data-slide") === key);
    });

    copies.forEach(function (el) {
      el.classList.toggle("is-active", el.getAttribute("data-copy") === key);
    });
  }

  triggers.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      activate(btn.getAttribute("data-target"), false);
    });

    btn.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        next = triggers[(i + 1) % triggers.length];
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        next = triggers[(i - 1 + triggers.length) % triggers.length];
      } else if (e.key === "Home") {
        next = triggers[0];
      } else if (e.key === "End") {
        next = triggers[triggers.length - 1];
      }
      if (next) {
        e.preventDefault();
        activate(next.getAttribute("data-target"), true);
      }
    });
  });

  /* Single-open mobile accordion: closing siblings is a courtesy so the
     list doesn't grow unbounded, not something native <details> requires. */
  var accItems = root.querySelectorAll(".industries-acc-item");
  accItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      accItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  if (window.INS_I18N) {
    window.INS_I18N.extend({
      en: {
        "industries.eyebrow": "Industries",
        "industries.title.l1": "Engineered for",
        "industries.title.l2": "critical industries.",
        "industries.sub":
          "From commercial nuclear plants to mission-critical construction, INS applies the same operational rigor across every sector it serves.",

        "industries.nuclear.label": "Nuclear",
        "industries.nuclear.title": "Nuclear",
        "industries.nuclear.desc":
          "INS's expertise spans nuclear decontamination, radiation safety, waste management and operational support, ensuring that facilities maintain the highest standards of safety and efficiency.",
        "industries.nuclear.locations": "Project locations",
        "industries.nuclear.loc1": "Constellation Energy — LaSalle, Dresden, Peach Bottom and Limerick",
        "industries.nuclear.loc2": "STP Operating Company — South Texas Project",
        "industries.nuclear.loc3": "Entergy — River Bend",
        "industries.nuclear.loc4": "Vistra Energy — Perry, Beaver Valley and Comanche Peak",
        "industries.nuclear.loc5": "DTE Energy — Enrico Fermi",
        "industries.nuclear.loc6": "Florida Power & Light — Turkey Point and St. Lucie",
        "industries.nuclear.loc7": "Energy Solutions & Jingoli — Three Mile Island (Decommissioning)",

        "industries.government.label": "Government",
        "industries.government.title": "Government",
        "industries.government.desc":
          "INS delivers tailored services to government agencies, holding the same standards of safety, compliance and operational rigor required across the commercial nuclear sector.",

        "industries.industrial.label": "Industrial",
        "industries.industrial.title": "Industrial",
        "industries.industrial.desc":
          "Private sector and industrial partners rely on INS for the same radiation protection, decontamination and operational support applied throughout the nuclear industry.",

        "industries.missioncritical.label": "Mission Critical Buildout",
        "industries.missioncritical.title": "Mission Critical Buildout",
        "industries.missioncritical.desc":
          "INS identifies, vets, places and manages qualified civil, mechanical, electrical and structural engineers into active construction roles supporting energy-sector and mission-critical data center projects across the United States — from field engineering and MEP coordination to safety and quality control."
      },

      es: {
        "industries.eyebrow": "Industrias",
        "industries.title.l1": "Diseñado para",
        "industries.title.l2": "industrias críticas.",
        "industries.sub":
          "De plantas nucleares comerciales a construcción de misión crítica, INS aplica el mismo rigor operativo en cada sector al que sirve.",

        "industries.nuclear.label": "Nuclear",
        "industries.nuclear.title": "Nuclear",
        "industries.nuclear.desc":
          "La experiencia de INS abarca descontaminación nuclear, seguridad radiológica, gestión de residuos y soporte operativo, asegurando que las instalaciones mantengan los más altos estándares de seguridad y eficiencia.",
        "industries.nuclear.locations": "Ubicaciones de proyectos",
        "industries.nuclear.loc1": "Constellation Energy — LaSalle, Dresden, Peach Bottom y Limerick",
        "industries.nuclear.loc2": "STP Operating Company — South Texas Project",
        "industries.nuclear.loc3": "Entergy — River Bend",
        "industries.nuclear.loc4": "Vistra Energy — Perry, Beaver Valley y Comanche Peak",
        "industries.nuclear.loc5": "DTE Energy — Enrico Fermi",
        "industries.nuclear.loc6": "Florida Power & Light — Turkey Point y St. Lucie",
        "industries.nuclear.loc7": "Energy Solutions & Jingoli — Three Mile Island (Decomisionamiento)",

        "industries.government.label": "Gobierno",
        "industries.government.title": "Gobierno",
        "industries.government.desc":
          "INS presta servicios a la medida para agencias gubernamentales, con los mismos estándares de seguridad, cumplimiento y rigor operativo que exige el sector nuclear comercial.",

        "industries.industrial.label": "Industrial",
        "industries.industrial.title": "Industrial",
        "industries.industrial.desc":
          "Socios del sector privado e industrial confían en INS para la misma protección radiológica, descontaminación y soporte operativo aplicados en toda la industria nuclear.",

        "industries.missioncritical.label": "Construcción de Misión Crítica",
        "industries.missioncritical.title": "Construcción de Misión Crítica",
        "industries.missioncritical.desc":
          "INS identifica, evalúa, coloca y gestiona ingenieros civiles, mecánicos, eléctricos y estructurales calificados en roles activos de construcción, dando soporte a proyectos del sector energético y centros de datos de misión crítica en todo Estados Unidos — desde ingeniería de campo y coordinación MEP hasta seguridad y control de calidad."
      }
    });
  }

  if (window.INS_REVEAL) window.INS_REVEAL.refresh();
})();
