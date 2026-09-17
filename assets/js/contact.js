/* ==========================================================================
   INS — CONTACT
   Office addresses, phone and email are copied exactly from
   int-nucl.com/contact (USA, Mexico City and Veracruz offices).

   FORM INTEGRATION — READ BEFORE DEPLOYING
   The form's <form action="..."> currently points at a placeholder
   (contains "YOUR_FORM_ID"). Until that's replaced with a real endpoint
   (Formspree, Netlify Forms, a custom API route, etc.), submitting the form
   runs full client-side validation but — deliberately — does NOT claim the
   message was sent. It shows an honest "not connected yet" notice with a
   mailto fallback instead. Once a real endpoint is in the action attribute,
   this same code performs an actual fetch POST and reports the real
   success/error result. This is intentional: a fake "Success" state here
   would tell visitors their inquiry reached INS when it did not.
   ========================================================================== */

(function () {
  "use strict";

  if (window.INS_I18N) {
    window.INS_I18N.extend({
      en: {
        "contact.eyebrow": "Contact",
        "contact.title.l1": "Let's build the",
        "contact.title.l2": "right solution.",
        "contact.lead":
          "Tell us about your project and the right person from our team will follow up.",

        "contact.office.usa": "United States",
        "contact.office.mx": "Mexico City",
        "contact.office.ver": "Veracruz",
        "contact.office.usa.address": "9595 Six Pines Dr. Suite 8120, The Woodlands, TX 77380",
        "contact.office.mx.address": "Butacaris #46 Int. 3, Col. El Caracol, Coyoacán, C.P. 04739, Ciudad de México",
        "contact.office.ver.address": "Av. Salvador Díaz Mirón núm. 1930, Fracc. Moderno, Veracruz, Ver. C.P. 91918",

        "contact.field.name": "Name",
        "contact.field.company": "Company",
        "contact.field.email": "Email",
        "contact.field.phone": "Phone",
        "contact.field.service": "Service / Area of Interest",
        "contact.field.service.placeholder": "Select an area",
        "contact.field.message": "Message",

        "contact.service.opt1": "Radiation Protection & Decontamination",
        "contact.service.opt2": "Staff Augmentation",
        "contact.service.opt3": "Surface Decontamination",
        "contact.service.opt4": "Radioactive Waste Management",
        "contact.service.opt5": "Laboratory & Instrumentation",
        "contact.service.opt6": "Non-Destructive Testing",
        "contact.service.opt7": "Mission Critical Construction (Data Centers)",
        "contact.service.opt8": "Other",

        "contact.submit": "Send inquiry",
        "contact.sending": "Sending…",

        "contact.error.name": "Please enter your name.",
        "contact.error.email": "Please enter a valid email address.",
        "contact.error.phone": "Please enter a valid phone number.",
        "contact.error.service": "Please select an area of interest.",
        "contact.error.message": "Please add a short message.",

        "contact.status.success":
          "Thank you — your inquiry has been received. Our team will follow up shortly.",
        "contact.status.error":
          "Something went wrong sending your message. Please try again, or email us directly at",
        "contact.status.unconfigured":
          "This form isn't connected to a backend yet, so nothing was sent. Please reach us directly at"
      },

      es: {
        "contact.eyebrow": "Contacto",
        "contact.title.l1": "Construyamos",
        "contact.title.l2": "la solución correcta.",
        "contact.lead":
          "Cuéntanos sobre tu proyecto y la persona indicada de nuestro equipo te contactará.",

        "contact.office.usa": "Estados Unidos",
        "contact.office.mx": "Ciudad de México",
        "contact.office.ver": "Veracruz",
        "contact.office.usa.address": "9595 Six Pines Dr. Suite 8120, The Woodlands, TX 77380",
        "contact.office.mx.address": "Butacaris #46 Int. 3, Col. El Caracol, Coyoacán, C.P. 04739, Ciudad de México",
        "contact.office.ver.address": "Av. Salvador Díaz Mirón núm. 1930, Fracc. Moderno, Veracruz, Ver. C.P. 91918",

        "contact.field.name": "Nombre",
        "contact.field.company": "Empresa",
        "contact.field.email": "Correo electrónico",
        "contact.field.phone": "Teléfono",
        "contact.field.service": "Servicio / Área de interés",
        "contact.field.service.placeholder": "Selecciona un área",
        "contact.field.message": "Mensaje",

        "contact.service.opt1": "Protección Radiológica y Descontaminación",
        "contact.service.opt2": "Staff Augmentation",
        "contact.service.opt3": "Descontaminación de Superficies",
        "contact.service.opt4": "Gestión de Residuos Radiactivos",
        "contact.service.opt5": "Laboratorio e Instrumentación",
        "contact.service.opt6": "Pruebas No Destructivas",
        "contact.service.opt7": "Construcción de Misión Crítica (Centros de Datos)",
        "contact.service.opt8": "Otro",

        "contact.submit": "Enviar solicitud",
        "contact.sending": "Enviando…",

        "contact.error.name": "Por favor escribe tu nombre.",
        "contact.error.email": "Por favor escribe un correo electrónico válido.",
        "contact.error.phone": "Por favor escribe un teléfono válido.",
        "contact.error.service": "Por favor selecciona un área de interés.",
        "contact.error.message": "Por favor añade un mensaje breve.",

        "contact.status.success":
          "Gracias — hemos recibido tu solicitud. Nuestro equipo te contactará pronto.",
        "contact.status.error":
          "Hubo un problema al enviar tu mensaje. Intenta de nuevo o escríbenos directamente a",
        "contact.status.unconfigured":
          "Este formulario aún no está conectado a un backend, así que no se envió nada. Contáctanos directamente en"
      }
    });
  }

  var form = document.querySelector("[data-contact-form]");
  if (!form) return;

  var statusEl = form.querySelector("[data-form-status]");
  var submitBtn = form.querySelector("[data-form-submit]");

  var VALIDATORS = {
    name: function (v) {
      return v.trim().length >= 2;
    },
    email: function (v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
    },
    phone: function (v) {
      if (!v.trim()) return true; // optional
      return /^[0-9+()\-.\s]{7,}$/.test(v.trim());
    },
    service: function (v) {
      return v.trim().length > 0;
    },
    message: function (v) {
      return v.trim().length >= 10;
    }
  };

  var ERROR_KEYS = {
    name: "contact.error.name",
    email: "contact.error.email",
    phone: "contact.error.phone",
    service: "contact.error.service",
    message: "contact.error.message"
  };

  function fieldWrap(input) {
    return input.closest(".field");
  }

  function setError(input, show) {
    var wrap = fieldWrap(input);
    if (!wrap) return;
    wrap.classList.toggle("has-error", show);
    input.setAttribute("aria-invalid", show ? "true" : "false");
  }

  function validateField(input) {
    var validator = VALIDATORS[input.name];
    if (!validator) return true;
    var ok = validator(input.value);
    setError(input, !ok);
    return ok;
  }

  Object.keys(VALIDATORS).forEach(function (name) {
    var input = form.elements[name];
    if (!input) return;
    input.addEventListener("blur", function () {
      validateField(input);
    });
    input.addEventListener("input", function () {
      if (fieldWrap(input) && fieldWrap(input).classList.contains("has-error")) {
        validateField(input);
      }
    });
  });

  function setStatus(kind, message) {
    if (!statusEl) return;
    statusEl.className = "contact-form__status";
    if (kind) {
      statusEl.classList.add("is-visible", "contact-form__status--" + kind);
    }
    statusEl.innerHTML = message || "";
  }

  function setSending(isSending) {
    form.classList.toggle("is-sending", isSending);
    if (submitBtn) submitBtn.disabled = isSending;
    form.setAttribute("aria-busy", isSending ? "true" : "false");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    setStatus(null);

    var firstInvalid = null;
    Object.keys(VALIDATORS).forEach(function (name) {
      var input = form.elements[name];
      if (!input) return;
      var ok = validateField(input);
      if (!ok && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    var lang = window.INS_I18N ? window.INS_I18N.get() : "en";
    var endpoint = form.getAttribute("action") || "";
    var mailto = 'mailto:info@int-nucl.com';
    var mailLink = '<a href="' + mailto + '">info@int-nucl.com</a>';

    if (!endpoint || endpoint.indexOf("YOUR_FORM_ID") !== -1) {
      // No real backend configured — say so plainly, don't fake success.
      var unconfiguredMsg = window.INS_I18N
        ? window.INS_I18N.t("contact.status.unconfigured", lang)
        : "This form isn't connected to a backend yet.";
      setStatus("unconfigured", unconfiguredMsg + " " + mailLink + ".");
      return;
    }

    setSending(true);

    fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form)
    })
      .then(function (res) {
        setSending(false);
        if (res.ok) {
          var successMsg = window.INS_I18N
            ? window.INS_I18N.t("contact.status.success", lang)
            : "Thank you — your inquiry has been received.";
          setStatus("success", successMsg);
          form.reset();
        } else {
          var errorMsg = window.INS_I18N
            ? window.INS_I18N.t("contact.status.error", lang)
            : "Something went wrong.";
          setStatus("error", errorMsg + " " + mailLink + ".");
        }
      })
      .catch(function () {
        setSending(false);
        var errorMsg2 = window.INS_I18N
          ? window.INS_I18N.t("contact.status.error", lang)
          : "Something went wrong.";
        setStatus("error", errorMsg2 + " " + mailLink + ".");
      });
  });

  if (window.INS_REVEAL) window.INS_REVEAL.refresh();
})();
