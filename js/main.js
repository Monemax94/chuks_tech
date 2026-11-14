/* ==========================================================================
   Chukz Tech Services - main.js (vanilla JS, no dependencies)
   Modules: 0 Config | 1 Project data | 2 Helpers | 3 Year | 4 Nav + header
   5 Scroll reveal | 6 Tabs | 7 Accordion | 8 Modal | 9 Projects + filter
   10 Message builders (mailto / WhatsApp / copy) | 11 Form engine
   12 Quote wizard | 13 Contact form | 14 Service sub-nav | 15 Image slider
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- 0. CONFIG: edit contact details here ---------- */
  var CONFIG = {
    email: "Info@chukstech.com",
    whatsapp: "2348032377009", // international format, digits only
    company: "Chukz Tech Services"
  };

  /* ---------- 1. PROJECT DATA ----------
     To add a real project: add ONE object to PROJECTS (no HTML edits needed).

     SCHEMA
       id          string   unique, no spaces
       title       string   card + modal heading
       category    string   "Networking" | "Servers" | "Cabling" | "Upgrades"
       summary     string   one line shown on the card
       placeholder boolean  true while content is not real (shows the "coming soon" banner)
       thumb       object   card image (4:3): { src, alt, width, height }
       overview    string   Project overview
       requirements string  Client requirements (only where disclosure is permitted)
       equipment   array    Equipment and technologies deployed
       scope       array    Scope of technical work
       photos      array    modal photos: [{ src, alt, width, height }]
       outcome     string   Project outcome

     OWNER: the wording below was written conservatively from the project titles and the
     photographs. Please confirm each project's details before launch.
  */
  var PH = "[Coming soon]"; // used only by placeholder entries
  var IMG = "assets/projects/";
  var PROJECTS = [
    {
      id: "dell-poweredge-server-installation",
      title: "Dell PowerEdge server installation, integration and deployment",
      category: "Servers",
      summary: "Server hardware installed, integrated and deployed in an equipment rack.",
      placeholder: false,
      thumb: { src: IMG + "server-installation-dell-poweredge-thumb.webp", alt: "Technician in a high-visibility vest configuring equipment with a laptop at a server rack", width: 480, height: 360 },
      overview: "Installation, integration and deployment of Dell PowerEdge servers, including connecting and configuring the equipment in the rack.",
      requirements: "Client details are shared only where disclosure is permitted.",
      equipment: ["Dell PowerEdge servers", "Rack-mounted network equipment", "Patch cabling"],
      scope: ["Installing server hardware in the rack", "Connecting the servers to the network", "Configuring and integrating the servers", "Testing the installation"],
      photos: [{ src: IMG + "server-installation-dell-poweredge-640.webp", alt: "Technician in a high-visibility vest configuring equipment with a laptop at a server rack", width: 640, height: 853 }],
      outcome: "Project outcome details are being added."
    },
    {
      id: "router-configuration",
      title: "Router configuration",
      category: "Networking",
      summary: "On-site router configuration carried out at an equipment rack.",
      placeholder: false,
      thumb: { src: IMG + "router-configuration-thumb.webp", alt: "Technician in a high-visibility vest working on a router at an equipment rack with a laptop", width: 480, height: 360 },
      overview: "Configuration of a router within an equipment rack, carried out on site by our technician using a laptop.",
      requirements: "Client details are shared only where disclosure is permitted.",
      equipment: ["Router", "Rack-mounted network equipment", "Patch cabling"],
      scope: ["Connecting to the router for configuration", "Applying the required configuration", "Checking connectivity after configuration"],
      photos: [{ src: IMG + "router-configuration-640.webp", alt: "Technician in a high-visibility vest working on a router at an equipment rack with a laptop", width: 640, height: 853 }],
      outcome: "Project outcome details are being added."
    },
    {
      id: "spine-switch-line-card",
      title: "Spine switch line card installation, replacement and upgrade",
      category: "Upgrades",
      summary: "Line card work on a spine switch, with fibre patching in the rack.",
      placeholder: false,
      thumb: { src: IMG + "spine-switch-line-card-thumb.webp", alt: "Technician in a red high-visibility vest working on fibre patch cabling and a switch chassis in a rack", width: 480, height: 360 },
      overview: "Installation, replacement and upgrade of line cards in a spine switch chassis, including the fibre patch cabling around it.",
      requirements: "Client details are shared only where disclosure is permitted.",
      equipment: ["Spine switch chassis and line cards", "Fibre patch cabling", "Cable labelling"],
      scope: ["Installing, replacing and upgrading line cards", "Reconnecting fibre patch cabling", "Testing links after the work"],
      photos: [{ src: IMG + "spine-switch-line-card-640.webp", alt: "Technician in a red high-visibility vest working on fibre patch cabling and a switch chassis in a rack", width: 640, height: 853 }],
      outcome: "Project outcome details are being added."
    },
    {
      id: "switch-line-card",
      title: "Switch line card installation, replacement and upgrade",
      category: "Upgrades",
      summary: "Switch line card installation and replacement in a patched rack.",
      placeholder: false,
      thumb: { src: IMG + "switch-line-card-thumb.webp", alt: "Technician in a red high-visibility vest installing a line card in a rack-mounted switch with fibre patch cables above", width: 480, height: 360 },
      overview: "Installation, replacement and upgrade of line cards in a rack-mounted switch, alongside fibre and copper patch cabling.",
      requirements: "Client details are shared only where disclosure is permitted.",
      equipment: ["Switch chassis and line cards", "Fibre and copper patch cabling", "Cable labelling"],
      scope: ["Installing, replacing and upgrading line cards", "Reconnecting patch cabling", "Testing links after the work"],
      photos: [{ src: IMG + "switch-line-card-640.webp", alt: "Technician in a red high-visibility vest installing a line card in a rack-mounted switch with fibre patch cables above", width: 640, height: 853 }],
      outcome: "Project outcome details are being added."
    },
    {
      id: "structured-cabling-data-centre",
      title: "Structured cabling and connectivity deployment for data centre infrastructure",
      category: "Cabling",
      summary: "Patch cabling connected to a rack of servers.",
      placeholder: false,
      thumb: { src: IMG + "structured-cabling-data-centre-thumb.webp", alt: "Technician in a red high-visibility vest connecting patch cables at a rack of servers", width: 480, height: 360 },
      overview: "Structured cabling and connectivity deployment for data centre infrastructure, with patch cables connected to rack-mounted equipment.",
      requirements: "Client details are shared only where disclosure is permitted.",
      equipment: ["Structured cabling", "Patch cables", "Rack-mounted servers"],
      scope: ["Routing and connecting cabling to rack equipment", "Patching connections to equipment ports", "Testing the connections"],
      photos: [{ src: IMG + "structured-cabling-data-centre-640.webp", alt: "Technician in a red high-visibility vest connecting patch cables at a rack of servers", width: 640, height: 853 }],
      outcome: "Project outcome details are being added."
    },
    {
      /* OWNER: this photo (rack row) stands in for the cloud storage project because the three structured
         cabling photos supplied were the same image. Swap thumb/photos for a dedicated photo when available. */
      id: "structured-cabling-cloud-storage",
      title: "Structured cabling and network connectivity for cloud storage infrastructure",
      category: "Cabling",
      summary: "Cabling and connectivity for racks of storage infrastructure.",
      placeholder: false,
      thumb: { src: IMG + "structured-cabling-cloud-storage-thumb.webp", alt: "Rows of closed equipment racks with illuminated equipment", width: 480, height: 360 },
      overview: "Structured cabling and network connectivity for cloud storage infrastructure housed in rows of equipment racks.",
      requirements: "Client details are shared only where disclosure is permitted.",
      equipment: ["Structured cabling", "Network connectivity equipment", "Equipment racks"],
      scope: ["Installing structured cabling to the racks", "Connecting equipment to the network", "Testing the connections"],
      photos: [{ src: IMG + "structured-cabling-cloud-storage-640.webp", alt: "Rows of closed equipment racks with illuminated equipment", width: 640, height: 480 }],
      outcome: "Project outcome details are being added."
    }
  ];

  var SERVICES = {
    "network-infrastructure": "Network Infrastructure Installation & Deployment",
    "structured-cabling": "Structured Cabling & Network Connectivity",
    "network-integration": "Network Integration & Configuration",
    "server-installation": "Server Installation & Infrastructure Support",
    "upgrades": "Hardware, Software & Firmware Upgrades",
    "os-reimaging": "Network Operating System Installation & Reimaging",
    "link-troubleshooting": "Link Troubleshooting",
    "other": "Other"
  };

  /* ---------- 2. HELPERS ---------- */
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])';
  function trapTab(container, e) {
    if (e.key !== "Tab") return;
    var items = $$(FOCUSABLE, container).filter(function (el) { return el.offsetParent !== null; });
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ---------- 3. YEAR ---------- */
  $$("[data-year]").forEach(function (n) { n.textContent = new Date().getFullYear(); });
  document.documentElement.classList.remove("no-js");

  /* ---------- 4. NAV + STICKY HEADER ---------- */
  (function nav() {
    var header = $(".site-header"), toggle = $(".nav-toggle"), panel = $("#nav-panel");
    if (header) {
      var onScroll = function () { header.classList.toggle("is-small", window.scrollY > 24); };
      window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    }
    if (!toggle || !panel) return;
    var mq = window.matchMedia("(min-width: 1024px)");
    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      panel.classList.toggle("is-open", open);
      document.body.classList.toggle("modal-open", open);
      if (open) { var f = $("a", panel); if (f) window.requestAnimationFrame(function () { f.focus(); }); } else { toggle.focus(); }
    }
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (e.key === "Escape") { setOpen(false); return; }
      // Focus trap across toggle + panel while the mobile menu is open
      var items = $$(FOCUSABLE, panel).concat(toggle); // DOM order: panel links, then toggle
      if (e.key !== "Tab") return;
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    $$("a", panel).forEach(function (a) { a.addEventListener("click", function () { toggle.setAttribute("aria-expanded", "false"); panel.classList.remove("is-open"); document.body.classList.remove("modal-open"); }); });
    (mq.addEventListener ? mq.addEventListener.bind(mq, "change") : mq.addListener.bind(mq))(function () {
      if (mq.matches) { toggle.setAttribute("aria-expanded", "false"); panel.classList.remove("is-open"); document.body.classList.remove("modal-open"); }
    });
  })();

  /* ---------- 5. SCROLL REVEAL ---------- */
  (function reveal() {
    var items = $$(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach(function (n) { n.classList.add("is-visible"); }); return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (n) { io.observe(n); });
  })();

  /* ---------- 6. TABS (arrow keys, Home/End) ---------- */
  $$("[data-tabs]").forEach(function (root) {
    var tabs = $$('[role="tab"]', root), panels = $$('[role="tabpanel"]', root);
    function select(i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
      });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(i); });
      t.addEventListener("keydown", function (e) {
        var n = tabs.length, k = e.key, next = null;
        if (k === "ArrowRight") next = (i + 1) % n;
        else if (k === "ArrowLeft") next = (i - 1 + n) % n;
        else if (k === "Home") next = 0;
        else if (k === "End") next = n - 1;
        if (next !== null) { e.preventDefault(); select(next, true); }
      });
    });
    select(0);
  });

  /* ---------- 7. ACCORDION (data-single = one open at a time) ---------- */
  $$("[data-accordion]").forEach(function (root) {
    var single = root.hasAttribute("data-single");
    $$(".acc-btn", root).forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        if (single && !open) {
          $$(".acc-btn", root).forEach(function (b) {
            b.setAttribute("aria-expanded", "false");
            document.getElementById(b.getAttribute("aria-controls")).hidden = true;
          });
        }
        btn.setAttribute("aria-expanded", String(!open));
        panel.hidden = open;
      });
    });
  });

  /* ---------- 8. MODAL (focus trap, Esc, focus return) ---------- */
  var modal = $("#project-modal"), lastTrigger = null;
  function openModal(trigger) {
    if (!modal) return;
    lastTrigger = trigger;
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
    $(".modal-close", modal).focus();
  }
  function closeModal() {
    if (!modal || !modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    if (lastTrigger) lastTrigger.focus();
  }
  if (modal) {
    $(".modal-close", modal).addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", function (e) {
      if (!modal.classList.contains("is-open")) return;
      if (e.key === "Escape") closeModal(); else trapTab(modal, e);
    });
  }

  /* ---------- 9. PROJECTS: render, filter, modal content ---------- */
  (function projects() {
    var grid = $("#project-grid");
    if (!grid) return;
    var status = $("#filter-status"), banner = $("#projects-banner");
    if (banner) banner.hidden = !PROJECTS.every(function (p) { return p.placeholder; });

    PROJECTS.forEach(function (p) {
      var card = el("button", "rack project-card");
      card.type = "button";
      card.setAttribute("data-category", p.category);
      card.setAttribute("aria-haspopup", "dialog");
      if (p.thumb) {
        var t = new Image(); t.className = "thumb-img"; t.loading = "lazy"; t.decoding = "async";
        t.width = p.thumb.width; t.height = p.thumb.height; t.alt = p.thumb.alt || ""; t.src = p.thumb.src;
        card.appendChild(t);
      } else { card.appendChild(el("div", "thumb", "[Project photo coming soon]")); /* OWNER: replace */ }
      card.appendChild(el("span", "badge", p.category));
      card.appendChild(el("h3", null, p.title));
      card.appendChild(el("p", null, p.summary));
      card.appendChild(el("span", "more", "View details"));
      card.addEventListener("click", function () { fillModal(p); openModal(card); });
      grid.appendChild(card);
    });

    function list(items) { var ul = el("ul"); (items || []).forEach(function (i) { ul.appendChild(el("li", null, i)); }); return ul; }
    function fillModal(p) {
      var box = $("#modal-content"); box.textContent = "";
      var dl = el("dl");
      function add(label, node) { dl.appendChild(el("dt", null, label)); var dd = el("dd"); dd.appendChild(node); dl.appendChild(dd); }
      $("#modal-title").textContent = p.title;
      add("Project overview", document.createTextNode(p.overview));
      add("Client requirements (where disclosure is permitted)", document.createTextNode(p.requirements));
      add("Equipment and technologies deployed", list(p.equipment));
      add("Scope of technical work", list(p.scope));
      var ph = el("div");
      if (p.photos && p.photos.length) {
        p.photos.forEach(function (f) {
          var img = new Image(); img.src = f.src; img.alt = f.alt || ""; img.loading = "lazy";
          if (f.width) img.width = f.width; if (f.height) img.height = f.height;
          ph.appendChild(img);
        });
      } else { ph.appendChild(el("div", "placeholder", "[Implementation photographs coming soon]")); /* OWNER: replace */ }
      add("Implementation photographs", ph);
      add("Project outcome", document.createTextNode(p.outcome));
      box.appendChild(dl);
    }

    $$("[data-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-filter"), shown = 0;
        $$("[data-filter]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        $$(".project-card", grid).forEach(function (c) {
          var show = f === "All" || c.getAttribute("data-category") === f;
          c.hidden = !show; if (show) shown++;
        });
        if (status) status.textContent = "Showing " + shown + " project" + (shown === 1 ? "" : "s") + " in " + f + ".";
      });
    });
  })();

  /* ---------- 10. MESSAGE BUILDERS ---------- */
  function mailtoLink(subject, body) {
    return "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body).replace(/%0A/g, "%0D%0A");
  }
  function waLink(text) { return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(text); }
  function copyText(text, done) {
    function fallback() {
      var t = el("textarea"); t.value = text; t.setAttribute("readonly", ""); t.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(t); t.select();
      var ok = false; try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(t); done(ok);
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { done(true); }, fallback);
    else fallback();
  }

  /* ---------- 11. FORM ENGINE (validation + result panel) ---------- */
  function val(form, name) { var f = form.elements[name]; return f ? (f.value || "").trim() : ""; }
  function radioVal(form, name) { var c = form.querySelector('input[name="' + name + '"]:checked'); return c ? c.value : ""; }
  function setError(form, name, msg) {
    var field = form.querySelector('[data-field="' + name + '"]'); if (!field) return;
    var err = $(".field-error", field), input = $("input,select,textarea", field);
    field.classList.toggle("has-error", !!msg);
    if (err) err.textContent = msg || "";
    if (input) { if (msg) input.setAttribute("aria-invalid", "true"); else input.removeAttribute("aria-invalid"); }
  }
  var RULES = {
    required: function (v) { return v ? "" : "This field is required."; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address, for example name@company.com."; },
    phone: function (v) { return /^[+\d][\d\s()-]{6,}$/.test(v) ? "" : "Enter a phone number, for example +234 803 000 0000."; }
  };
  /* Validate the listed fields; returns true when all pass. Focuses the first error. */
  function validate(form, checks) {
    var first = null, summary = $(".form-errors", form);
    checks.forEach(function (c) {
      var v = c.radio ? radioVal(form, c.name) : val(form, c.name), msg = "";
      for (var i = 0; i < c.rules.length && !msg; i++) msg = RULES[c.rules[i]](v);
      if (c.radio && msg) msg = "Choose one option.";
      setError(form, c.name, msg);
      if (msg && !first) first = c;
    });
    if (summary) {
      summary.hidden = !first;
      summary.textContent = first ? "Please fix the highlighted fields before continuing." : "";
    }
    if (first) { var t = first.radio ? form.querySelector('input[name="' + first.name + '"]') : form.elements[first.name]; if (t) t.focus(); }
    return !first;
  }
  /* Shows result panel: summary text + mailto / WhatsApp / copy buttons */
  function showResult(form, subject, text) {
    var panel = document.getElementById(form.getAttribute("data-result"));
    if (!panel) return;
    $(".summary-box", panel).textContent = text;
    $("[data-send-email]", panel).href = mailtoLink(subject, text);
    $("[data-send-wa]", panel).href = waLink(subject + "\n\n" + text);
    var msg = $("[data-copy-status]", panel);
    var copyBtn = $("[data-copy]", panel);
    copyBtn.onclick = function () {
      copyText(text, function (ok) { msg.textContent = ok ? "Summary copied. You can paste it into an email or WhatsApp message." : "Copy failed. Select the summary text and copy it manually."; });
    };
    $("[data-edit]", panel).onclick = function () { panel.hidden = true; form.hidden = false; var h = $("[data-focus-target]", form); if (h) h.focus(); };
    form.hidden = true; panel.hidden = false;
    panel.setAttribute("tabindex", "-1"); panel.focus();
    panel.scrollIntoView({ block: "start" });
  }
  function line(label, v) { return label + ": " + (v || "Not provided"); }

  /* ---------- 12. QUOTE WIZARD ---------- */
  (function quote() {
    var form = $("#quote-form");
    if (!form) return;
    var steps = $$(".wizard-step", form), dots = $$(".progress li"), current = 0;
    var CHECKS = [
      [{ name: "service", radio: true, rules: ["required"] }, { name: "projectType", radio: true, rules: ["required"] }],
      [{ name: "location", rules: ["required"] }, { name: "description", rules: ["required"] }],
      [{ name: "name", rules: ["required"] }, { name: "email", rules: ["required", "email"] }, { name: "phone", rules: ["required", "phone"] }]
    ];
    function show(n) {
      current = n;
      steps.forEach(function (s, i) { s.hidden = i !== n; });
      dots.forEach(function (d, i) {
        d.classList.toggle("is-done", i < n); d.classList.toggle("is-current", i === n);
        if (i === n) d.setAttribute("aria-current", "step"); else d.removeAttribute("aria-current");
      });
      var h = $("[data-focus-target]", steps[n]); if (h) h.focus();
    }
    // Preselect service from ?service=<slug>
    var m = /[?&]service=([^&#]+)/.exec(location.search);
    if (m && SERVICES[decodeURIComponent(m[1])]) {
      var r = form.querySelector('input[name="service"][value="' + decodeURIComponent(m[1]) + '"]');
      if (r) r.checked = true;
    }
    $$("[data-next]", form).forEach(function (b) { b.addEventListener("click", function () { if (validate(form, CHECKS[current])) show(current + 1); }); });
    $$("[data-prev]", form).forEach(function (b) { b.addEventListener("click", function () { show(current - 1); }); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (val(form, "website")) return; // honeypot filled: ignore silently
      for (var i = 0; i < CHECKS.length; i++) { if (!validate(form, CHECKS[i])) { show(i); return; } }
      /* To switch to Formspree/Netlify later, see the commented block in request-quote.html */
      var text = [
        line("Service needed", SERVICES[radioVal(form, "service")]),
        line("Project type", radioVal(form, "projectType")),
        line("Site / location", val(form, "location")),
        line("Approx. network points / devices", val(form, "points")),
        line("Equipment brand", val(form, "brand")),
        line("Preferred timeline", val(form, "timeline")),
        "Description: " + (val(form, "description") || "Not provided"),
        "",
        line("Name", val(form, "name")),
        line("Email", val(form, "email")),
        line("Phone", val(form, "phone")),
        line("Company / organisation", val(form, "org"))
      ].join("\n");
      showResult(form, "Quote request - " + CONFIG.company, text);
    });
    show(0);
  })();

  /* ---------- 13. CONTACT FORM ---------- */
  (function contact() {
    var form = $("#contact-form");
    if (!form) return;
    var CHECKS = [{ name: "name", rules: ["required"] }, { name: "email", rules: ["required", "email"] }, { name: "message", rules: ["required"] }];
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (val(form, "website")) return;
      if (!validate(form, CHECKS)) return;
      var text = [
        line("Name", val(form, "name")), line("Email", val(form, "email")),
        line("Phone", val(form, "phone")), line("Organisation", val(form, "org")),
        "", "Message: " + val(form, "message")
      ].join("\n");
      showResult(form, "Website enquiry - " + CONFIG.company, text);
    });
  })();

  /* ---------- 14. SERVICE SUB-NAV (highlight current section) ---------- */
  (function subnav() {
    var links = $$(".subnav a[href^='#']");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (a) { var s = document.getElementById(a.getAttribute("href").slice(1)); if (s) map[s.id] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { links.forEach(function (a) { a.classList.remove("is-active"); }); map[en.target.id].classList.add("is-active"); }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });
  })();
  /* ---------- 15. IMAGE SLIDER (scroll-snap, buttons, keyboard, optional autoplay) ---------- */
  $$("[data-slider]").forEach(function (root) {
    var track = $(".slides", root), slides = $$(".slide", root), prev = $("[data-slide-prev]", root),
        next = $("[data-slide-next]", root), toggle = $("[data-slide-toggle]", root), count = $("[data-slide-count]", root);
    var i = 0, timer = null, userPaused = false, visible = false;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function show(n) {
      i = (n + slides.length) % slides.length;
      track.scrollTo({ left: i * track.clientWidth, behavior: reduce ? "auto" : "smooth" });
    }
    function sync() {
      i = Math.round(track.scrollLeft / track.clientWidth) || 0;
      if (count) count.textContent = (i + 1) + " / " + slides.length;
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } track.setAttribute("aria-live", "polite"); }
    function start() {
      if (reduce || userPaused || !visible || timer) return;
      track.setAttribute("aria-live", "off");
      timer = setInterval(function () { show(i + 1); }, 6000);
    }
    track.addEventListener("scroll", function () { window.requestAnimationFrame(sync); }, { passive: true });
    if (prev) prev.addEventListener("click", function () { show(i - 1); });
    if (next) next.addEventListener("click", function () { show(i + 1); });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); show(i - 1); } else if (e.key === "ArrowRight") { e.preventDefault(); show(i + 1); }
    });
    if (toggle) {
      if (reduce) toggle.hidden = true;
      toggle.addEventListener("click", function () {
        userPaused = !userPaused;
        toggle.setAttribute("aria-pressed", String(userPaused));
        toggle.textContent = userPaused ? "Play" : "Pause";
        if (userPaused) stop(); else start();
      });
    }
    ["mouseenter", "focusin", "touchstart"].forEach(function (ev) { root.addEventListener(ev, stop, { passive: true }); });
    ["mouseleave", "focusout"].forEach(function (ev) { root.addEventListener(ev, start); });
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
    window.addEventListener("resize", function () { track.scrollTo({ left: i * track.clientWidth, behavior: "auto" }); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) start(); else stop(); }, { threshold: 0.4 }).observe(root);
    }
    sync();
  });
})();
