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

  window.Dentara = { $: $, $$: $$, reduce: reduce, refresh: refresh, setWa: setWa, waUrl: waUrl };
  refresh(document);
})();