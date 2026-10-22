#!/usr/bin/env node
/* Dentara — static build
   Usage:  node build.js            (uses siteUrl from config.js)
           node build.js https://yourclinic.com
   Generates:
     treatments/<slug>.html   one real, indexable page per treatment (from treatment.html + treatments.js)
     sitemap.xml, robots.txt
     the treatment cards inside index.html (between the cards:start / cards:end markers)
   Re-run after editing treatments.js, config.js, or the nav/footer in treatment.html. */
const fs = require("fs");
const path = require("path");
const cfg = require("./config.js");
const D = require("./treatments.js");

const SITE = (process.argv[2] || cfg.siteUrl).replace(/\/+$/, "");
const read = f => fs.readFileSync(path.join(__dirname, f), "utf8");
const write = (f, s) => { fs.mkdirSync(path.dirname(path.join(__dirname, f)), { recursive: true }); fs.writeFileSync(path.join(__dirname, f), s); };
const esc = D.esc;
const block = (name) => new RegExp("<!-- build:" + name + " -->[\\s\\S]*?<!-- /build:" + name + " -->");

if (/example\.com/.test(SITE)) console.warn("⚠  siteUrl is still the placeholder — set it in config.js or pass it as an argument before launch.");

/* ---- 1. static treatment pages */
const tpl = read("treatment.html");
const today = new Date().toISOString().slice(0, 10);

D.treatments.forEach(t => {
  const url = SITE + "/treatments/" + t.slug + ".html";
  const waText = "Hello Dentara, I'd like to enquire about " + t.name + ".";
  // In demo mode the chat goes to the designer, so the pre-filled message says where it came from.
  const waHref = (cfg.demo ? "Hi Leo, I'm viewing the Dentara demo site. " : "") + waText;
  const waUrl = "https://wa.me/" + cfg.waNumber + "?text=" + encodeURIComponent(waHref);
  const desc = t.name + " at Dentara Dental Studio. " + t.tagline;
  const img = SITE + "/" + D.px(t.photo);

  const jsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": url, url, name: t.name + " — Dentara Dental Studio", description: desc,
        about: { "@type": "MedicalProcedure", name: t.name }, isPartOf: { "@type": "WebSite", name: "Dentara Dental Studio", url: SITE + "/" } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: "Treatments", item: SITE + "/#treatments" },
        { "@type": "ListItem", position: 3, name: t.name, item: url } ] }
    ]
  }).replace(/</g, "\\u003c");

  const head = [
    "<title>" + esc(t.name) + " — Dentara Dental Studio</title>",
    '<meta name="description" content="' + esc(desc) + '">',
    '<link rel="canonical" href="' + url + '">',
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="Dentara Dental Studio">',
    '<meta property="og:title" content="' + esc(t.name) + ' — Dentara Dental Studio">',
    '<meta property="og:description" content="' + esc(desc) + '">',
    '<meta property="og:url" content="' + url + '">',
    '<meta property="og:image" content="' + esc(img) + '">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<script type="application/ld+json">' + jsonld + "</script>"
  ].join("\n");

  const main = '<main id="main" tabindex="-1">' + D.render(t, { home: "../", waUrl, cardHref: s => s + ".html" }) + "</main>";
  const scripts = '<script src="../config.js"></script>\n<script src="../common.js"></script>';

  let html = tpl
    .replace(block("head"), head)
    .replace(block("main"), main)
    .replace(block("scripts"), scripts)
    .replace('<body>', '<body data-wa="' + esc(waText) + '">')
    .replace(/(id="wa[23]" href=)"#"/g, '$1"' + waUrl + '"')
    .replace(/href="index\.html/g, 'href="../index.html')
    .replace('href="styles.css"', 'href="../styles.css"')
    .replace('href="favicon.svg"', 'href="../favicon.svg"');
  write("treatments/" + t.slug + ".html", html);
});
console.log("✓ " + D.treatments.length + " treatment pages → treatments/");

/* ---- 2. home page cards */
let index = read("index.html");
const cards = D.treatments.map(t => "      " + D.card(t, "treatments/" + t.slug + ".html")).join("\n");
index = index.replace(/(<!-- cards:start[^>]*-->)[\s\S]*?(<!-- cards:end -->)/, "$1\n" + cards + "\n      $2");
write("index.html", index);
console.log("✓ index.html cards");

/* ---- 3. sitemap + robots */
const urls = [SITE + "/"].concat(D.treatments.map(t => SITE + "/treatments/" + t.slug + ".html"));
write("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((u, i) => "  <url><loc>" + u + "</loc><lastmod>" + today + "</lastmod><priority>" + (i ? "0.7" : "1.0") + "</priority></url>").join("\n") + "\n</urlset>\n");
write("robots.txt", "User-agent: *\nAllow: /\n\nSitemap: " + SITE + "/sitemap.xml\n");
console.log("✓ sitemap.xml, robots.txt  (" + SITE + ")");
