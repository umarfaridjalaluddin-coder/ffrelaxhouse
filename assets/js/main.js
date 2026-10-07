/* FF Relaxhouse — behaviour. No dependencies. Reads settings from config.js. */
(function () {
  "use strict";
  var cfg = window.FF_CONFIG || {};

  /* Mobile navigation */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        toggle.focus();
      }
    });
  }

  /* Contact details and optional links */
  if (cfg.email) {
    document.querySelectorAll("[data-contact='email']").forEach(function (a) {
      a.href = "mailto:" + cfg.email;
      if (a.hasAttribute("data-show-address")) a.textContent = cfg.email;
    });
  }
  var links = {
    whatsapp: cfg.whatsapp ? "https://wa.me/" + String(cfg.whatsapp).replace(/\D/g, "") : "",
    booking: cfg.bookingUrl || "",
    instagram: cfg.instagramUrl || "",
    facebook: cfg.facebookUrl || ""
  };
  Object.keys(links).forEach(function (key) {
    document.querySelectorAll("[data-link='" + key + "']").forEach(function (a) {
      if (links[key]) {
        a.href = links[key];
        a.hidden = false;
      } else {
        a.hidden = true;
      }
    });
  });

  /* Photos: swap a placeholder for the real image only when it is listed in config */
  var photos = cfg.photos || [];
  document.querySelectorAll("[data-photo]").forEach(function (fig) {
    var file = fig.getAttribute("data-photo");
    if (photos.indexOf(file) === -1) return;
    var img = new Image();
    img.alt = fig.getAttribute("data-alt") || "";
    img.decoding = "async";
    if (!fig.classList.contains("photo--hero")) img.loading = "lazy";
    img.onload = function () {
      fig.insertBefore(img, fig.firstChild);
      fig.classList.add("has-image");
    };
    img.src = "assets/images/" + file;
  });

  /* Languages: English lives in the HTML; other languages load from assets/i18n/<code>.json */
  var langs = cfg.languages || ["en"];
  var originals = new Map();
  function applyLang(lang, dict) {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      if (!originals.has(el)) originals.set(el, el.textContent);
      var key = el.getAttribute("data-i18n");
      el.textContent = dict && dict[key] ? dict[key] : originals.get(el);
    });
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.value === lang));
    });
    try { localStorage.setItem("ff-lang", lang); } catch (e) { /* storage unavailable */ }
  }
  function setLang(lang) {
    if (lang === "en") return applyLang("en", null);
    fetch("assets/i18n/" + lang + ".json")
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (dict) { applyLang(lang, dict); })
      .catch(function () { applyLang("en", null); });
  }
  if (langs.length > 1) {
    document.querySelectorAll(".lang-switch").forEach(function (box) {
      langs.forEach(function (code) {
        var b = document.createElement("button");
        b.type = "button";
        b.value = code;
        b.textContent = (cfg.languageNames && cfg.languageNames[code]) || code.toUpperCase();
        b.setAttribute("aria-pressed", String(code === "en"));
        b.addEventListener("click", function () { setLang(code); });
        box.appendChild(b);
      });
      box.hidden = false;
    });
    var saved = null;
    try { saved = localStorage.getItem("ff-lang"); } catch (e) { /* storage unavailable */ }
    if (saved && saved !== "en" && langs.indexOf(saved) !== -1) setLang(saved);
  }

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
