/* Dentara — single place for launch settings (browser + build.js) */
(function (root) {
  var cfg = {
    // Final public URL, no trailing slash. Used by build.js for canonical, sitemap and social tags.
    siteUrl: "https://www.example.com",

    // DEMO MODE — true while Dentara is a fictional portfolio concept.
    // While true: sample/demo labels stay visible, and every WhatsApp button opens a chat with the
    // website DESIGNER (waNumber below), with a message that says it came from the demo.
    // For a real clinic: set demo to false, then fill in the clinic's own details below.
    demo: true,

    // Phone shown on the page. The demo value is deliberately not a real, dialable number.
    phoneDisplay: "+91 00000 00000",
    // Digits with country code (e.g. "919876543210") to turn the phone into a tap-to-call link.
    // Leave "" in demo mode — the number then shows as plain text and nothing can be dialled.
    phoneTel: "",

    // WhatsApp number: digits only, with country code.
    // DEMO: this is the designer's portfolio number. REAL CLINIC: replace with the clinic's number.
    waNumber: "917904535371",

    // Form service endpoint (e.g. Formspree / Getform / your own API). Leave "" for demo mode —
    // the form then clearly says it is a demonstration and sends nothing.
    formEndpoint: "",

    // First-visit booking pop-up (built by common.js, shown on every page).
    // It appears once per visitor, then stays quiet for `rememberDays`.
    popup: {
      enabled: true,       // set false to switch the pop-up off completely
      delaySeconds: 8,     // wait this long before showing it (minimum 3)
      rememberDays: 30,    // after it has been shown, don't show it again for this many days
      exitIntent: true     // desktop only: also show it when the mouse leaves through the top of the page
    }
  };
  if (typeof module === "object" && module.exports) module.exports = cfg;
  else root.DENTARA_CONFIG = cfg;
})(typeof window !== "undefined" ? window : this);
