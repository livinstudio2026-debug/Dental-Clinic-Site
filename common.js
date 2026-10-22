/* Dentara — shared behaviour for every page (nav, progress, reveal, parallax, menu, tilt, images) */
(function () {
  "use strict";
  var C = window.DENTARA_CONFIG || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover:hover)").matches;
  var hasIO = "IntersectionObserver" in window;

  /* ---- WhatsApp links + footer year */
  function setWa(text) {
    // Demo mode: WhatsApp goes to the website designer, and the message says so.
    var msg = C.demo ? "Hi Leo, I'm viewing the Dentara demo site. " + text : text;
    var url = "https://wa.me/" + (C.waNumber || "") + "?text=" + encodeURIComponent(msg);
    $$("#wa,#wa2,#wa3,[data-wa-link]").forEach(function (a) {
      a.href = url;
      if (C.demo) {
        a.title = "Demo site: opens a chat with the website designer, not a clinic";
      }
    });
    return url;
  }

  /* ---- Demo-mode labels, clinic phone, placeholder social links */
  $$("[data-demo-only]").forEach(function (el) { el.hidden = !C.demo; });
  $$("[data-phone]").forEach(function (el) {
    if (C.phoneDisplay) el.textContent = C.phoneDisplay;
    var tel = (C.phoneTel || "").replace(/\D/g, "");
    if (tel) { var a = document.createElement("a"); a.href = "tel:+" + tel; a.textContent = el.textContent; el.parentNode.replaceChild(a, el); }
  });
  $$("[data-demo-link]").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); }); });
  var waUrl = setWa(document.body.getAttribute("data-wa") || "Hello Dentara, I'd like to enquire about an appointment.");
  var yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Scroll: progress bar, nav hide/show, parallax (visible elements only), active link */
  var nav = $("#nav"), bar = $("#progress"), links = $("#links"), burger = $("#burger");
  var lastY = 0, ticking = false, maxY = 0, visPar = [];

  function measure() { maxY = document.documentElement.scrollHeight - window.innerHeight; }
  function kbFocusInNav() { try { return !!(nav && nav.querySelector(":focus-visible")); } catch (e) { return false; } }
  function place(el) {
    // Measure the untransformed position so the offset never feeds back into itself.
    var r = el.getBoundingClientRect(), prev = el._off || 0;
    var off = (r.top - prev + r.height / 2 - window.innerHeight / 2) * parseFloat(el.dataset.speed);
    el._off = off;
    el.style.transform = "translate3d(0," + off.toFixed(1) + "px,0)";
  }
  function onScroll() {
    ticking = false;
    var y = window.scrollY;
    if (bar) bar.style.width = (maxY > 0 ? Math.min(y / maxY, 1) * 100 : 0) + "%";
    if (nav) {
      nav.classList.toggle("scrolled", y > 10);
      nav.classList.toggle("hide", y > lastY && y > 400 && !(links && links.classList.contains("open")) && !kbFocusInNav());
    }
    lastY = y;
    if (!reduce) visPar.forEach(place);
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener("resize", measure);
  window.addEventListener("load", measure);
  if ("ResizeObserver" in window) new ResizeObserver(measure).observe(document.body);
  measure(); onScroll();
  if (nav) nav.addEventListener("focusin", function () { nav.classList.remove("hide"); });

  var parIO = hasIO ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var i = visPar.indexOf(en.target);
      if (en.isIntersecting) { if (i < 0) visPar.push(en.target); if (!reduce) place(en.target); }
      else if (i > -1) visPar.splice(i, 1);
    });
  }, { rootMargin: "120px 0px" }) : null;

  var secs = $$("main section[id]"), navLinks = $$(".nav__links li:not(.nav__extra) a");
  if (hasIO && secs.length && navLinks.length) {
    var cur = "";
    var secIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) cur = en.target.id; else if (cur === en.target.id) cur = "";
      });
      navLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + cur); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    secs.forEach(function (s) { secIO.observe(s); });
  }

  /* ---- Mobile menu */
  if (links && burger) {
    $$("li", links).forEach(function (li, i) { li.style.setProperty("--i", i); });
    var setMenu = function (open) {
      links.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
      if (open && nav) nav.classList.remove("hide");
    };
    burger.addEventListener("click", function () { setMenu(!links.classList.contains("open")); });
    links.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("open")) { setMenu(false); burger.focus(); }
    });
    window.addEventListener("resize", function () { if (window.innerWidth > 960) setMenu(false); });
  }

  /* ---- Counters */
  function count(el) {
    var target = +el.dataset.count, suffix = el.dataset.suffix || "", t0 = null, dur = 1800;
    if (reduce) { el.textContent = target.toLocaleString() + suffix; return; }
    (function tick(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(performance.now());
  }

  /* ---- Reveal on scroll.
     After an element has revealed we drop .reveal/.in and its inline delay, so the element's own
     hover/tilt transitions (cards, feature tiles…) are no longer overridden by the reveal styles. */
  function settle(el) {
    var d = parseFloat(el.style.transitionDelay) || 0;
    setTimeout(function () { el.classList.remove("reveal", "in"); el.style.transitionDelay = ""; }, reduce ? 0 : d + 1000);
  }
  function onReveal(entries, obs) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      el.classList.add("in");
      $$("[data-count]", el).forEach(count);
      if (el.hasAttribute("data-count")) count(el);
      obs.unobserve(el);
      settle(el);
    });
  }
  var revealIO = hasIO ? new IntersectionObserver(onReveal, { threshold: 0.13, rootMargin: "0px 0px -40px 0px" }) : null;
  // Treatment cards start earlier (before they are fully on screen) so they never feel late
  var fastIO = hasIO ? new IntersectionObserver(onReveal, { threshold: 0, rootMargin: "0px 15% 12% 15%" }) : null;

  /* ---- Pointer effects */
  function tilt(c) {
    c.addEventListener("mouseenter", function () { c.classList.add("tilting"); });
    c.addEventListener("mousemove", function (e) {
      var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      c.style.transform = "perspective(900px) rotateX(" + (-y * 6) + "deg) rotateY(" + (x * 6) + "deg) translateY(-6px)";
    });
    c.addEventListener("mouseleave", function () { c.classList.remove("tilting"); c.style.transform = ""; });
  }
  function magnet(b) {
    b.addEventListener("mousemove", function (e) {
      var r = b.getBoundingClientRect();
      b.style.transform = "translate(" + ((e.clientX - r.left - r.width / 2) * 0.2) + "px," + ((e.clientY - r.top - r.height / 2) * 0.3) + "px)";
    });
    b.addEventListener("mouseleave", function () { b.style.transform = ""; });
  }

  /* ---- Image fallback: another dental photo, a neutral avatar for portraits, else a soft gradient */
  var BASE = location.pathname.indexOf("/treatments/") > -1 ? "../" : "";
  var FB = ["gallery/gallery-1", "gallery/gallery-7", "gallery/gallery-5", "home/hero-round"];
  var AVATAR = "data:image/svg+xml," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 480'><rect width='400' height='480' fill='#D9E9E5'/><circle cx='200' cy='185' r='70' fill='#2D7775' opacity='.35'/><path d='M60 480c0-92 60-150 140-150s140 58 140 150z' fill='#2D7775' opacity='.35'/></svg>");
  function fallback(img) {
    if (img.dataset.fb) { img.classList.add("img-failed"); return; }
    img.dataset.fb = "1";
    img.removeAttribute("srcset"); img.removeAttribute("sizes");
    img.src = img.closest(".doc__img") ? AVATAR : BASE + "assets/images/" + FB[Math.floor(Math.random() * FB.length)] + ".webp";
  }

  /* ---- Wire up everything inside `root` (safe to call more than once) */
  function refresh(root) {
    root = root || document;
    $$(".reveal", root).forEach(function (el) {
      if (el.dataset.r) return; el.dataset.r = "1";
      if (!revealIO) { el.classList.add("in"); return; }
      var idx = $$(".reveal", el.parentNode).indexOf(el), isCard = el.classList.contains("tcard");
      // Cards: tiny per-column stagger (0 / 45 / 90 ms). Everything else keeps the original gentle stagger.
      el.style.transitionDelay = (isCard ? (idx % 3) * 45 : Math.min(idx, 5) * 90) + "ms";
      (isCard && fastIO ? fastIO : revealIO).observe(el);
    });
    $$("[data-count]", root).forEach(function (c) {
      if (c.closest(".reveal")) return;
      if (revealIO) revealIO.observe(c); else count(c);
    });
    if (!revealIO) $$("[data-count]", root).forEach(count);
    $$("[data-speed]", root).forEach(function (el) {
      if (el.dataset.p) return; el.dataset.p = "1";
      if (parIO) parIO.observe(el);
    });
    if (!reduce && canHover) {
      $$(".tcard", root).forEach(function (c) { if (!c.dataset.t3) { c.dataset.t3 = "1"; tilt(c); } });
      $$(".magnet", root).forEach(function (b) { if (!b.dataset.mg) { b.dataset.mg = "1"; magnet(b); } });
    }
    $$("img", root).forEach(function (img) {
      if (img.dataset.ih) return; img.dataset.ih = "1";
      img.addEventListener("error", function () { fallback(img); });
      // The error may already have fired before this script ran
      if (img.complete && img.naturalWidth === 0 && img.currentSrc) fallback(img);
    });
  }

  /* ---- First-visit booking pop-up
     Built here so it works on the home page and every treatment page without touching their HTML.
     Shown once (then remembered in localStorage), never while someone is typing, reading the contact
     form or using the mobile menu. Close: ✕, "Maybe later", Esc, or a click outside. Settings: config.js → popup */
  var PC = C.popup || {};
  var BK_KEY = "dentara_booking_popup_v1";
  var BK_IMG = BASE + "assets/images/home/hero-main.webp";
  var bk = null, bkOpen = false, bkFrom = null, bkTimer = 0;

  function bkStore(set) {
    try {
      if (set) { localStorage.setItem(BK_KEY, String(Date.now())); return; }
      var t = +localStorage.getItem(BK_KEY) || 0;
      return !!t && Date.now() - t < (PC.rememberDays || 30) * 864e5;
    } catch (e) { return !set; }   // storage blocked → we can't remember, so we never show (no nagging)
  }

  function bkValidPhone(v) {
    var s = v.replace(/[\s().-]/g, "");
    return /^(\+?91|0)?[6-9]\d{9}$/.test(s) || /^\+\d{8,15}$/.test(s);
  }

  function bkBuild() {
    var tick = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>';
    var check = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="8.5"/><path d="M6.2 10.3l2.6 2.6 5-5.4"/></svg>';
    var slots = [["Any time", "Any time"], ["Morning", "Morning (9–12)"], ["Afternoon", "Afternoon (12–3)"], ["Late afternoon", "Late afternoon (3–6)"]];
    var el = document.createElement("div");
    el.className = "bk"; el.id = "bk"; el.hidden = true;
    el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-labelledby", "bk-title"); el.setAttribute("aria-describedby", "bk-sub");
    el.innerHTML =
      '<div class="bk__back" data-bk-close></div>' +
      '<div class="bk__card" tabindex="-1">' +
        '<button class="bk__x" type="button" data-bk-close aria-label="Close booking form">' + tick + '</button>' +
        '<aside class="bk__side" aria-hidden="true">' +
          '<img src="' + BK_IMG + '" alt="" decoding="async">' +
          '<div class="bk__side-in"><h3>Gentle, unhurried care</h3><ul class="bk__pts">' +
            '<li>' + check + 'No obligation, just a conversation</li>' +
            '<li>' + check + 'We call you back to confirm a time</li>' +
            '<li>' + check + 'Mon–Sat, 9:00 AM – 6:00 PM</li>' +
          '</ul></div>' +
        '</aside>' +
        '<div class="bk__main">' +
          '<div class="bk__view">' +
            '<span class="bk__tag bk__s" style="--i:0"><i></i>Now booking appointments</span>' +
            '<h2 class="bk__s" id="bk-title" style="--i:1">Book your first visit</h2>' +
            '<p class="bk__sub bk__s" id="bk-sub" style="--i:2">Share a few details and we’ll call to confirm a time that suits you. It takes under a minute.</p>' +
            '<form class="bk__form" novalidate>' +
              '<div class="hp" aria-hidden="true"><label>Company<input name="company" type="text" tabindex="-1" autocomplete="off"></label></div>' +
              '<div class="bk__f bk__s" style="--i:3"><input id="bk-name" name="name" type="text" placeholder=" " autocomplete="name" required><label for="bk-name">Full name</label></div>' +
              '<div class="bk__f bk__s" style="--i:4"><input id="bk-phone" name="phone" type="tel" inputmode="tel" placeholder=" " autocomplete="tel" required><label for="bk-phone">Phone number</label></div>' +
              '<div class="bk__f bk__f--sel bk__s" style="--i:5"><select id="bk-treat" name="treatment"><option>General Dentistry</option><option>Teeth Cleaning</option><option>Orthodontics</option><option>Restorative Care</option><option>Cosmetic Dentistry</option><option>Not sure yet</option></select><label for="bk-treat">Treatment</label></div>' +
              '<fieldset class="bk__slots bk__s" style="--i:6"><legend>Preferred time</legend><div class="bk__chips">' +
                slots.map(function (s, i) { return '<label class="bk__chip"><input type="radio" name="slot" value="' + s[0] + '"' + (i ? "" : " checked") + '><span>' + s[1] + '</span></label>'; }).join("") +
              '</div></fieldset>' +
              '<p class="bk__err" role="alert" hidden></p>' +
              '<button class="btn btn--primary bk__go bk__s" type="submit" style="--i:7">Request Appointment</button>' +
              '<button class="bk__later bk__s" type="button" data-bk-close style="--i:8">Maybe later</button>' +
              '<p class="bk__fine bk__demo" hidden>Demo: nothing is sent until a form service is connected.</p>' +
            '</form>' +
          '</div>' +
          '<div class="bk__done" hidden>' +
            '<svg class="bk__tick" viewBox="0 0 84 84" aria-hidden="true"><circle cx="42" cy="42" r="36"/><circle class="ring" cx="42" cy="42" r="36"/><path d="M27 43l11 11 20-23"/></svg>' +
            '<h2 tabindex="-1"></h2><p class="bk__sub"></p>' +
            '<button class="btn btn--primary" type="button" data-bk-close>Close</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(el);
    if (!C.formEndpoint && C.demo !== false) $(".bk__demo", el).hidden = false;
    refresh(el);

    el.addEventListener("click", function (e) { if (e.target.closest("[data-bk-close]")) bkClose(); });

    var form = $(".bk__form", el), err = $(".bk__err", el), go = $(".bk__go", el);
    var fields = [form.elements.name, form.elements.phone];
    fields.forEach(function (f) { f.addEventListener("input", function () { f.classList.remove("invalid"); f.removeAttribute("aria-invalid"); if (!form.querySelector(".invalid")) err.hidden = true; }); });

    function done(name) {
      var first = name.trim().split(/\s+/)[0];
      $(".bk__done h2", el).textContent = "Thank you, " + first;
      $(".bk__done .bk__sub", el).textContent = C.formEndpoint
        ? "We’ve got your request and will call you shortly to confirm a time."
        : "Demo only: nothing was sent or saved. On a live site this request would go to the clinic.";
      $(".bk__view", el).hidden = true;
      var d = $(".bk__done", el); d.hidden = false;
      $("h2", d).focus({ preventScroll: true });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name, phone = form.elements.phone, problems = [];
      fields.forEach(function (f) { f.classList.remove("invalid"); f.removeAttribute("aria-invalid"); });
      if (name.value.trim().length < 2) { problems.push("Please enter your name."); name.classList.add("invalid"); name.setAttribute("aria-invalid", "true"); }
      if (!bkValidPhone(phone.value.trim())) { problems.push("Please enter a valid phone number, e.g. +91 90000 00000."); phone.classList.add("invalid"); phone.setAttribute("aria-invalid", "true"); }
      if (problems.length) { err.textContent = problems.join(" "); err.hidden = false; (form.querySelector(".invalid") || name).focus(); return; }
      err.hidden = true;

      if (form.elements.company.value) { done(name.value); return; }        // honeypot filled → bot: fake success, send nothing
      if (!C.formEndpoint) { done(name.value); return; }                    // demo mode

      var label = go.textContent;
      go.disabled = true; go.textContent = "Sending…";
      fetch(C.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: name.value.trim(), phone: phone.value.trim(), treatment: form.elements.treatment.value,
          preferredTime: form.elements.slot.value, message: "Booking pop-up request", source: "popup"
        })
      }).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); done(name.value); })
        .catch(function () { err.textContent = "Sorry, that didn’t go through. Please call us or message us on WhatsApp."; err.hidden = false; })
        .then(function () { go.disabled = false; go.textContent = label; });
    });
    return el;
  }

  function bkKey(e) {
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); bkClose(); return; }
    if (e.key !== "Tab") return;
    var f = $$('button:not([disabled]),input:not([disabled]):not([tabindex="-1"]),select:not([disabled])', bk)
      .filter(function (n) { return n.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1], a = document.activeElement;
    if (!bk.contains(a) || a === $(".bk__card", bk)) { e.preventDefault(); (e.shiftKey ? last : first).focus(); }
    else if (e.shiftKey && a === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus(); }
  }

  function bkShow() {
    if (bkOpen) return;
    clearTimeout(bkTimer);
    if (!bk) bk = bkBuild();
    // Re-opening after a finished request starts from a clean form
    if ($(".bk__done", bk) && !$(".bk__done", bk).hidden) { $(".bk__done", bk).hidden = true; $(".bk__view", bk).hidden = false; $(".bk__form", bk).reset(); }
    bkFrom = document.activeElement && document.activeElement !== document.body ? document.activeElement : null;
    var root = document.documentElement;
    root.style.setProperty("--bk-sbw", Math.max(0, window.innerWidth - root.clientWidth) + "px");
    root.classList.add("bk-lock");
    bk.hidden = false; bkOpen = true;
    bkStore(true);
    void bk.offsetWidth;                                   // commit the closed state so the open animation runs
    requestAnimationFrame(function () { bk.classList.add("bk--in"); });
    $(".bk__card", bk).focus({ preventScroll: true });     // focus the dialog itself so phones don't pop the keyboard
    document.addEventListener("keydown", bkKey, true);
  }

  function bkClose() {
    if (!bkOpen) return;
    bkOpen = false;
    document.removeEventListener("keydown", bkKey, true);
    bk.classList.remove("bk--in"); bk.classList.add("bk--out");
    setTimeout(function () {
      bk.hidden = true; bk.classList.remove("bk--out");
      document.documentElement.classList.remove("bk-lock");
      if (bkFrom && document.contains(bkFrom)) { try { bkFrom.focus({ preventScroll: true }); } catch (e) {} }
      bkFrom = null;
    }, reduce ? 0 : 420);
  }

  // Anything with data-open-booking opens the pop-up (handy for a "Book now" button later)
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-open-booking]");
    if (t) { e.preventDefault(); bkShow(); }
  });

  function bkReady() {
    if (bkOpen || document.hidden) return false;
    var a = document.activeElement;
    if (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return false;      // someone is typing
    if (links && links.classList.contains("open")) return false;             // mobile menu is open
    var c = $("#contact");
    if (c) { var r = c.getBoundingClientRect(); if (r.top < window.innerHeight * 0.7 && r.bottom > window.innerHeight * 0.3) return false; }  // already at the booking form
    return true;
  }

  /* ---- Clinic tour video: click to play, click again to pause, pauses when scrolled away.
     Poster + glowing play button show whenever it is not playing. */
  (function () {
    var frame = $("#tourframe"), v = $("#tourvideo"), btn = $("#tourplay");
    if (!frame || !v || !btn) return;
    var wantPlay = false;
    function play() {
      wantPlay = true;
      var p = v.play(); if (p && p.catch) p.catch(function () { wantPlay = false; });
    }
    v.addEventListener("playing", function () { frame.classList.add("is-playing"); });
    v.addEventListener("pause", function () { frame.classList.remove("is-playing"); });
    v.addEventListener("error", function () { btn.hidden = true; v.setAttribute("controls", ""); }, true);
    btn.addEventListener("click", play);
    v.addEventListener("click", function () { if (v.paused) play(); else { wantPlay = false; v.pause(); } });
    document.addEventListener("visibilitychange", function () { if (document.hidden) v.pause(); });
    if (hasIO) {
      new IntersectionObserver(function (en) {
        if (!en[0].isIntersecting && !v.paused) v.pause();
      }, { threshold: 0.15 }).observe(frame);
    }
  })();

  var qpBk = new URLSearchParams(location.search);
  if (PC.enabled !== false && !document.body.hasAttribute("data-no-popup") && !qpBk.get("enquire") &&
      location.hash !== "#contact" && !bkStore(false)) {
    var bkStart = Date.now(), bkTries = 0;
    (new Image()).src = BK_IMG;                                              // preload so the photo is there when it opens
    var bkAttempt = function () {
      if (bkOpen || bkStore(false)) return;
      if (bkReady()) bkShow();
      else if (++bkTries < 6) bkTimer = setTimeout(bkAttempt, 3000);         // busy right now: try again a few times, then give up
    };
    bkTimer = setTimeout(bkAttempt, Math.max(3, +PC.delaySeconds || 8) * 1000);
    if (canHover && PC.exitIntent !== false) {
      document.addEventListener("mouseout", function bkExit(e) {
        if (e.relatedTarget || e.clientY > 0 || Date.now() - bkStart < 4000) return;
        if (bkStore(false)) { document.removeEventListener("mouseout", bkExit); return; }
        if (!bkReady()) return;
        document.removeEventListener("mouseout", bkExit);
        bkShow();
      });
    }
  }

  window.Dentara = { $: $, $$: $$, reduce: reduce, refresh: refresh, setWa: setWa, waUrl: waUrl, openBooking: bkShow };
  refresh(document);
})();
