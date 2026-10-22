/* Dentara — home page only (shared behaviour lives in common.js) */
(function () {
  "use strict";
  var D = window.Dentara, $ = D.$, $$ = D.$$, reduce = D.reduce;
  var C = window.DENTARA_CONFIG || {};

  // ---- Hero headline word-by-word reveal
  var h1 = $("[data-split]");
  function split(node) {
    Array.prototype.slice.call(node.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        var frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function (t, i) {
          if (!t) return;
          if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(" ")); return; }
          var w = document.createElement("span"); w.className = "word";
          var s = document.createElement("span"); s.textContent = t;
          s.style.transitionDelay = (i * 45) + "ms"; w.appendChild(s); frag.appendChild(w);
        });
        node.replaceChild(frag, n);
      } else if (n.nodeType === 1) split(n);
    });
  }
  if (h1) {
    h1.setAttribute("aria-label", h1.textContent.replace(/\s+/g, " ").trim());
    split(h1);
    requestAnimationFrame(function () { setTimeout(function () { h1.classList.add("words-in"); }, 150); });
  }

  // ---- Treatments: show first row, reveal all on "View all"
  var tgrid = $("#tgrid"), va = $("#viewall");
  if (va) va.addEventListener("click", function () {
    var open = tgrid.classList.toggle("collapsed") === false;
    va.setAttribute("aria-expanded", open);
    $("span", va).textContent = open ? "Show fewer" : "View all treatments";
    if (!open) $("#treatments").scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  });

  // ---- Testimonial slider
  var slider = $("#slider");
  function step(d) { var q = $(".quote", slider); slider.scrollBy({ left: d * (q.offsetWidth + 22), behavior: reduce ? "auto" : "smooth" }); }
  $("#prev").addEventListener("click", function () { step(-1); });
  $("#next").addEventListener("click", function () { step(1); });

  // ---- Pre-select treatment from card links
  var select = $("#treatment");
  $$("[data-t]").forEach(function (a) { a.addEventListener("click", function () { select.value = a.dataset.t; }); });

  // ---- Form
  var form = $("#form"), err = $("#err"), ok = $("#ok"), demo = $("#demo-note"), privacy = $("#privacy"), submit = $("button[type=submit]", form);
  var endpoint = C.formEndpoint || "";
  // With a real endpoint connected the demonstration notice goes away and the privacy line appears.
  if (endpoint) {
    if (demo) demo.hidden = true;
    if (privacy) privacy.hidden = false;
    submit.textContent = "Request Appointment";
  }

  // Arriving from a treatment page: preselect treatment + prefill message
  var qp = new URLSearchParams(location.search), enq = qp.get("enquire");
  if (enq) {
    $$("option", select).forEach(function (o) { if (o.value === enq || o.textContent === enq) select.value = o.value; });
    if (qp.get("treatment")) form.elements.msg.value = "Hi, I'd like to enquire about " + qp.get("treatment") + ".";
  }

  // Indian mobile (optionally +91 / 0 prefix) or a general international number
  function validPhone(v) {
    var s = v.replace(/[\s().-]/g, "");
    return /^(\+?91|0)?[6-9]\d{9}$/.test(s) || /^\+\d{8,15}$/.test(s);
  }
  function done() {
    form.reset(); err.hidden = true;
    ok.textContent = endpoint ? "✓ Thank you! We’ll get back to you shortly to confirm a time." : "✓ Demo only — nothing was sent or saved. On a live site this request would go to the clinic.";
    ok.hidden = false; ok.setAttribute("tabindex", "-1"); ok.focus();
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    ok.hidden = true;
    var name = form.elements.name, phone = form.elements.phone, problems = [];
    [name, phone].forEach(function (f) { f.classList.remove("invalid"); f.removeAttribute("aria-invalid"); });
    if (name.value.trim().length < 2) { problems.push("Please enter your name."); name.classList.add("invalid"); name.setAttribute("aria-invalid", "true"); }
    if (!validPhone(phone.value.trim())) { problems.push("Please enter a valid phone number, e.g. +91 90000 00000."); phone.classList.add("invalid"); phone.setAttribute("aria-invalid", "true"); }
    if (problems.length) { err.textContent = problems.join(" "); err.hidden = false; (form.querySelector(".invalid") || name).focus(); return; }
    err.hidden = true;

    if (form.elements.company.value) { done(); return; }   // honeypot filled → bot: pretend success, send nothing
    if (!endpoint) { done(); return; }                      // demo mode

    var label = submit.textContent;
    submit.disabled = true; submit.textContent = "Sending…";
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        name: name.value.trim(), phone: phone.value.trim(),
        treatment: form.elements.treatment.value, message: form.elements.msg.value.trim()
      })
    }).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); done(); })
      .catch(function () { err.textContent = "Sorry, that didn’t go through. Please call us or message us on WhatsApp."; err.hidden = false; })
      .then(function () { submit.disabled = false; submit.textContent = label; });
  });
})();

/* Gallery: on touch devices, tap a photo to show its caption (tap again or tap elsewhere to hide) */
(function () {
  var items = document.querySelectorAll(".gallery figure");
  if (!items.length || !window.matchMedia("(hover:none)").matches) return;
  function closeAll(except) { items.forEach(function (f) { if (f !== except) f.classList.remove("open"); }); }
  items.forEach(function (f) {
    f.addEventListener("click", function (e) { e.stopPropagation(); closeAll(f); f.classList.toggle("open"); });
  });
  document.addEventListener("click", function () { closeAll(null); });
})();