/* ==========================================================================
   INS — PROJECTS / LOCATIONS
   Every marker and every stat traces to published INS content:
     - 13 project locations + client names: int-nucl.com/industries
       ("Our Project Locations")
     - "40+ years combined experience": int-nucl.com/about-us
     - HQ (The Woodlands, TX): int-nucl.com/contact
   The "13 locations" / "7 utility partners" figures are exact counts of
   that published list — not separately-claimed marketing statistics — so
   they're presented as counts, not as INS-issued figures.

   Hover/focus reveal is pure CSS (see locations.css); this file only adds
   the outside-tap-to-close courtesy for touch, since touch devices have no
   real "hover" to fall back on.
   ========================================================================== */

(function () {
  "use strict";

  if (window.INS_I18N) {
    window.INS_I18N.extend({
      en: {
        "locations.eyebrow": "Projects & Locations",
        "locations.title.l1": "Experience",
        "locations.title.l2": "where it matters.",
        "locations.desc":
          "INS supports commercial nuclear facilities across the United States, working directly with the utilities that operate them.",

        "locations.stat1.value": "13",
        "locations.stat1.label": "Documented project locations",
        "locations.stat2.value": "7",
        "locations.stat2.label": "Utility & operator partners",
        "locations.stat3.value": "40+",
        "locations.stat3.label": "Years combined experience",

        "locations.legend.project": "Project location",
        "locations.legend.hq": "Headquarters",
        "locations.view": "View details",

        "locations.hq.name": "The Woodlands, Texas",
        "locations.hq.client": "INS Headquarters",

        "locations.s1.name": "LaSalle, Illinois",
        "locations.s2.name": "Dresden, Illinois",
        "locations.s3.name": "Peach Bottom, Pennsylvania",
        "locations.s4.name": "Limerick, Pennsylvania",
        "locations.constellation": "Constellation Energy",

        "locations.s5.name": "South Texas Project",
        "locations.stp": "STP Operating Company",

        "locations.s6.name": "River Bend, Louisiana",
        "locations.entergy": "Entergy",

        "locations.s7.name": "Perry, Ohio",
        "locations.s8.name": "Beaver Valley, Pennsylvania",
        "locations.s9.name": "Comanche Peak, Texas",
        "locations.vistra": "Vistra Energy",

        "locations.s10.name": "Enrico Fermi, Michigan",
        "locations.dte": "DTE Energy",

        "locations.s11.name": "Turkey Point, Florida",
        "locations.s12.name": "St. Lucie, Florida",
        "locations.fpl": "Florida Power & Light",

        "locations.s13.name": "Three Mile Island, Pennsylvania",
        "locations.s13.client": "Energy Solutions & Jingoli — Decommissioning"
      },

      es: {
        "locations.eyebrow": "Proyectos y Ubicaciones",
        "locations.title.l1": "Experiencia",
        "locations.title.l2": "donde importa.",
        "locations.desc":
          "INS da soporte a centrales nucleares comerciales en todo Estados Unidos, trabajando directamente con las empresas que las operan.",

        "locations.stat1.value": "13",
        "locations.stat1.label": "Ubicaciones de proyecto documentadas",
        "locations.stat2.value": "7",
        "locations.stat2.label": "Operadores y empresas asociadas",
        "locations.stat3.value": "40+",
        "locations.stat3.label": "Años de experiencia combinada",

        "locations.legend.project": "Ubicación de proyecto",
        "locations.legend.hq": "Sede corporativa",
        "locations.view": "Ver detalles",

        "locations.hq.name": "The Woodlands, Texas",
        "locations.hq.client": "Sede de INS",

        "locations.s1.name": "LaSalle, Illinois",
        "locations.s2.name": "Dresden, Illinois",
        "locations.s3.name": "Peach Bottom, Pensilvania",
        "locations.s4.name": "Limerick, Pensilvania",
        "locations.constellation": "Constellation Energy",

        "locations.s5.name": "South Texas Project",
        "locations.stp": "STP Operating Company",

        "locations.s6.name": "River Bend, Luisiana",
        "locations.entergy": "Entergy",

        "locations.s7.name": "Perry, Ohio",
        "locations.s8.name": "Beaver Valley, Pensilvania",
        "locations.s9.name": "Comanche Peak, Texas",
        "locations.vistra": "Vistra Energy",

        "locations.s10.name": "Enrico Fermi, Michigan",
        "locations.dte": "DTE Energy",

        "locations.s11.name": "Turkey Point, Florida",
        "locations.s12.name": "St. Lucie, Florida",
        "locations.fpl": "Florida Power & Light",

        "locations.s13.name": "Three Mile Island, Pensilvania",
        "locations.s13.client": "Energy Solutions & Jingoli — Decomisionamiento"
      }
    });
  }

  var map = document.querySelector("[data-locations-map]");
  if (map) {
    // Touch has no hover, so :focus-within is what reveals the card there —
    // which means the only way to dismiss it is to move focus away. A tap
    // anywhere outside the map does that explicitly.
    document.addEventListener(
      "pointerdown",
      function (e) {
        if (map.contains(e.target)) return;
        if (document.activeElement && map.contains(document.activeElement)) {
          document.activeElement.blur();
        }
      },
      { passive: true }
    );

    map.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.activeElement) {
        document.activeElement.blur();
      }
    });
  }

  if (window.INS_REVEAL) window.INS_REVEAL.refresh();
})();
