/* Dentara — treatment content + page renderer.
   One source of truth, used by the browser (treatment.js) and by build.js (static pages, index cards). */
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.DentaraData = api;
})(typeof window !== "undefined" ? window : this, function () {
  "use strict";

  // slug · name · icon · photo (file name in assets/images/treatments/, no extension) · group (form option) · tagline (page hero) · card (home card blurb)
  var treatments = [
 {
  "slug": "general-checkup",
  "name": "General Check-up & Consultation",
  "icon": "🩺",
  "photo": "general-checkup",
  "group": "General Dentistry",
  "tagline": "A thorough exam and a clear plan for your oral health.",
  "card": "Thorough examination, digital X-rays and a clear plan for your oral health.",
  "intro": "A regular check-up is the foundation of a healthy smile. We examine your teeth, gums and bite, take digital images where needed and explain everything in plain language — so there are never any surprises.",
  "benefits": [
   {
    "t": "Early detection",
    "d": "Spot cavities and gum problems before they cause pain."
   },
   {
    "t": "Digital imaging",
    "d": "See exactly what we see, on screen, together."
   },
   {
    "t": "Personal plan",
    "d": "Advice tailored to your teeth, habits and budget."
   },
   {
    "t": "Prevention first",
    "d": "Simple routines that save time and cost later."
   }
  ],
  "steps": [
   {
    "t": "Welcome",
    "d": "A relaxed chat about your health, concerns and goals."
   },
   {
    "t": "Examination",
    "d": "A careful check of teeth, gums, bite and soft tissues."
   },
   {
    "t": "Imaging",
    "d": "Digital X-rays or photos when they’re helpful."
   },
   {
    "t": "Your plan",
    "d": "Clear options, costs and next steps."
   }
  ],
  "facts": {
   "duration": "30–45 min",
   "visits": "1 visit",
   "comfort": "Comfortable, no injections"
  },
  "faqs": [
   {
    "q": "How often should I visit?",
    "a": "Most people benefit from a check-up every six months; we’ll advise what’s right for you."
   },
   {
    "q": "Will I need X-rays?",
    "a": "Only when they add useful information. We explain why before taking any."
   }
  ]
 },
 {
  "slug": "teeth-cleaning",
  "name": "Teeth Cleaning (Scaling & Polishing)",
  "icon": "✨",
  "photo": "teeth-cleaning",
  "group": "Teeth Cleaning",
  "tagline": "Remove plaque and stains for fresher breath and healthier gums.",
  "card": "Remove plaque and stains for fresher breath and healthier gums.",
  "intro": "Even careful brushing misses hardened plaque (tartar). A professional scale and polish removes it gently, lifts surface stains and leaves your teeth smooth and fresh.",
  "benefits": [
   {
    "t": "Healthier gums",
    "d": "Reduces bleeding, swelling and gum irritation."
   },
   {
    "t": "Fresher breath",
    "d": "Removes the bacteria that cause odour."
   },
   {
    "t": "Brighter look",
    "d": "Lifts everyday tea, coffee and tobacco stains."
   },
   {
    "t": "Cavity prevention",
    "d": "A cleaner surface is harder for decay to hold."
   }
  ],
  "steps": [
   {
    "t": "Assessment",
    "d": "We check your gums and plaque levels."
   },
   {
    "t": "Scaling",
    "d": "Ultrasonic and hand tools remove tartar."
   },
   {
    "t": "Polishing",
    "d": "A fine paste smooths and brightens teeth."
   },
   {
    "t": "Advice",
    "d": "Brushing and flossing tips that suit you."
   }
  ],
  "facts": {
   "duration": "30–45 min",
   "visits": "1 visit",
   "comfort": "Gentle, usually no anaesthesia"
  },
  "faqs": [
   {
    "q": "Does scaling loosen teeth?",
    "a": "No. It removes deposits that damage gums; healthy teeth stay firmly in place."
   },
   {
    "q": "Is some sensitivity normal?",
    "a": "Mild sensitivity for a day or two can happen and settles quickly."
   }
  ]
 },
 {
  "slug": "dental-implants",
  "name": "Dental Implants",
  "icon": "🔩",
  "photo": "dental-implants",
  "group": "Restorative Care",
  "tagline": "Permanent, fixed replacements for missing teeth.",
  "card": "Permanent, fixed replacements for missing teeth that last for years.",
  "intro": "An implant is a small titanium post placed in the jawbone that supports a crown, bridge or denture — closest to a natural tooth in look, feel and function.",
  "benefits": [
   {
    "t": "Fixed & stable",
    "d": "No slipping, eat with confidence."
   },
   {
    "t": "Looks natural",
    "d": "Custom-made crown on top."
   },
   {
    "t": "Protects bone",
    "d": "Helps maintain jaw structure."
   },
   {
    "t": "Long-lasting",
    "d": "A durable, long-term solution."
   }
  ],
  "steps": [
   {
    "t": "Planning",
    "d": "Scans assess bone and position."
   },
   {
    "t": "Placement",
    "d": "The implant is placed under anaesthesia."
   },
   {
    "t": "Healing",
    "d": "The implant integrates with bone."
   },
   {
    "t": "Crown",
    "d": "Your final tooth is fitted."
   }
  ],
  "facts": {
   "duration": "Several months",
   "visits": "2–3+ visits",
   "comfort": "Local anaesthetic"
  },
  "faqs": [
   {
    "q": "Am I suitable?",
    "a": "Most healthy adults are; a scan and exam confirm it."
   },
   {
    "q": "How long does it take?",
    "a": "Healing varies; we’ll give you a clear timeline at planning."
   }
  ]
 },
 {
  "slug": "fillings",
  "name": "Tooth-Coloured Fillings",
  "icon": "🦷",
  "photo": "fillings",
  "group": "General Dentistry",
  "tagline": "Natural-looking fillings that repair cavities discreetly.",
  "card": "Natural-looking composite fillings that repair cavities discreetly.",
  "intro": "Tooth-coloured composite fillings rebuild decayed teeth while matching their natural shade, so repairs blend in and preserve as much healthy tooth as possible.",
  "benefits": [
   {
    "t": "Natural appearance",
    "d": "Shade-matched to your teeth."
   },
   {
    "t": "Conservative",
    "d": "Less healthy tooth removed than many alternatives."
   },
   {
    "t": "Bonded strength",
    "d": "Sticks to the tooth and supports it."
   },
   {
    "t": "Same-visit",
    "d": "Most fillings are completed in one appointment."
   }
  ],
  "steps": [
   {
    "t": "Numbing",
    "d": "Local anaesthetic keeps you comfortable."
   },
   {
    "t": "Cleaning",
    "d": "Decay is removed carefully."
   },
   {
    "t": "Filling",
    "d": "Composite is placed in layers and set with light."
   },
   {
    "t": "Finishing",
    "d": "Bite is checked and the surface polished."
   }
  ],
  "facts": {
   "duration": "30–60 min",
   "visits": "1 visit",
   "comfort": "Local anaesthetic"
  },
  "faqs": [
   {
    "q": "How long will it last?",
    "a": "With good care, many years. We’ll check it at routine visits."
   },
   {
    "q": "Can I eat afterwards?",
    "a": "Once numbness wears off. We’ll give you specific guidance."
   }
  ]
 },
 {
  "slug": "root-canal",
  "name": "Root Canal Treatment (RCT)",
  "icon": "🔬",
  "photo": "root-canal",
  "group": "Restorative Care",
  "tagline": "Comfortable, precise treatment that saves infected teeth and ends pain.",
  "card": "Comfortable, precise treatment that saves infected teeth and ends pain.",
  "intro": "When the inner pulp of a tooth becomes infected or inflamed, a root canal removes the problem, disinfects the canals and seals the tooth — relieving pain and helping you keep your natural tooth.",
  "benefits": [
   {
    "t": "Pain relief",
    "d": "Treats the source of toothache."
   },
   {
    "t": "Saves your tooth",
    "d": "Avoids extraction where possible."
   },
   {
    "t": "Modern comfort",
    "d": "Effective anaesthesia and gentle technique."
   },
   {
    "t": "Long-term function",
    "d": "Usually finished with a protective crown."
   }
  ],
  "steps": [
   {
    "t": "Diagnosis",
    "d": "Examination and X-ray confirm the need."
   },
   {
    "t": "Cleaning",
    "d": "The infected pulp is removed and canals disinfected."
   },
   {
    "t": "Sealing",
    "d": "Canals are filled and sealed."
   },
   {
    "t": "Restoration",
    "d": "A filling or crown protects the tooth."
   }
  ],
  "facts": {
   "duration": "1–2 visits",
   "visits": "Often 1–2",
   "comfort": "Local anaesthetic"
  },
  "faqs": [
   {
    "q": "Is a root canal painful?",
    "a": "The treatment itself is done under anaesthesia and is generally no more uncomfortable than a filling."
   },
   {
    "q": "Do I need a crown after?",
    "a": "Often yes, to protect the treated tooth. We’ll advise at your visit."
   }
  ]
 },
 {
  "slug": "extractions",
  "name": "Extractions & Wisdom Teeth",
  "icon": "🛡️",
  "photo": "extractions",
  "group": "General Dentistry",
  "tagline": "Gentle removal of damaged or impacted teeth with careful aftercare.",
  "card": "Gentle removal of damaged or impacted teeth with careful aftercare.",
  "intro": "Sometimes a tooth can’t be saved, or a wisdom tooth causes pain and infection. We plan every extraction carefully, keep you comfortable and guide your recovery.",
  "benefits": [
   {
    "t": "Pain relief",
    "d": "Ends recurring infection and discomfort."
   },
   {
    "t": "Protects neighbours",
    "d": "Prevents damage to nearby teeth."
   },
   {
    "t": "Careful planning",
    "d": "Imaging guides safe removal."
   },
   {
    "t": "Clear aftercare",
    "d": "Simple steps for fast healing."
   }
  ],
  "steps": [
   {
    "t": "Assessment",
    "d": "X-rays check position and roots."
   },
   {
    "t": "Numbing",
    "d": "Local anaesthetic for comfort."
   },
   {
    "t": "Removal",
    "d": "Done gently and precisely."
   },
   {
    "t": "Aftercare",
    "d": "Written guidance and follow-up."
   }
  ],
  "facts": {
   "duration": "20–60 min",
   "visits": "1 visit",
   "comfort": "Local anaesthetic"
  },
  "faqs": [
   {
    "q": "How long is recovery?",
    "a": "Most people feel better within a few days; we’ll explain what to expect."
   },
   {
    "q": "Should wisdom teeth always be removed?",
    "a": "No — only when they cause problems or are likely to."
   }
  ]
 },
 {
  "slug": "crowns-bridges",
  "name": "Crowns & Bridges",
  "icon": "👑",
  "photo": "crowns-bridges",
  "group": "Restorative Care",
  "tagline": "Strong, natural-looking restorations for damaged or missing teeth.",
  "card": "Zirconia and porcelain restorations that look and feel natural.",
  "intro": "A crown caps and protects a weakened tooth, while a bridge replaces missing teeth using neighbouring support. Modern zirconia and porcelain look and feel natural.",
  "benefits": [
   {
    "t": "Restores strength",
    "d": "Protects cracked or heavily filled teeth."
   },
   {
    "t": "Natural look",
    "d": "Matched to your shade and shape."
   },
   {
    "t": "Better chewing",
    "d": "Restores bite and function."
   },
   {
    "t": "Durable",
    "d": "Designed to last for years with care."
   }
  ],
  "steps": [
   {
    "t": "Planning",
    "d": "Examination, imaging and shade selection."
   },
   {
    "t": "Preparation",
    "d": "The tooth is shaped for a precise fit."
   },
   {
    "t": "Temporary",
    "d": "A temporary restoration protects the tooth."
   },
   {
    "t": "Fitting",
    "d": "Your final crown or bridge is bonded."
   }
  ],
  "facts": {
   "duration": "2 visits",
   "visits": "2 visits",
   "comfort": "Local anaesthetic"
  },
  "faqs": [
   {
    "q": "Which material is best?",
    "a": "It depends on the tooth’s position and your needs. We’ll explain the options."
   },
   {
    "q": "How do I care for a crown?",
    "a": "Brush and floss as normal, with regular check-ups."
   }
  ]
 },
 {
  "slug": "dentures",
  "name": "Dentures (Complete & Partial)",
  "icon": "😁",
  "photo": "dentures",
  "group": "Restorative Care",
  "tagline": "Comfortable, well-fitted dentures that restore your smile.",
  "card": "Well-fitted, comfortable dentures that restore your smile and chewing.",
  "intro": "Dentures replace multiple missing teeth. We craft complete or partial dentures that fit comfortably, look natural and make eating and speaking easier.",
  "benefits": [
   {
    "t": "Restores smile",
    "d": "Fills gaps naturally."
   },
   {
    "t": "Better eating",
    "d": "Chew a wider range of foods."
   },
   {
    "t": "Custom fit",
    "d": "Made from precise impressions."
   },
   {
    "t": "Removable",
    "d": "Easy to clean and maintain."
   }
  ],
  "steps": [
   {
    "t": "Consultation",
    "d": "We discuss options and suitability."
   },
   {
    "t": "Impressions",
    "d": "Precise moulds of your mouth."
   },
   {
    "t": "Try-in",
    "d": "Fit, shade and shape are checked."
   },
   {
    "t": "Fitting",
    "d": "Final adjustments for comfort."
   }
  ],
  "facts": {
   "duration": "Several weeks",
   "visits": "3–5 visits",
   "comfort": "Non-invasive"
  },
  "faqs": [
   {
    "q": "Will they look natural?",
    "a": "Yes — teeth are chosen to suit your face and shade."
   },
   {
    "q": "How long until they feel normal?",
    "a": "Most people adapt within a few weeks."
   }
  ]
 },
 {
  "slug": "braces-aligners",
  "name": "Braces & Clear Aligners",
  "icon": "📐",
  "photo": "braces-aligners",
  "group": "Orthodontics",
  "tagline": "Straighten your teeth with metal, ceramic or invisible options.",
  "card": "Metal, ceramic and invisible options to straighten teeth confidently.",
  "intro": "Crooked or crowded teeth are harder to clean and can affect your bite. Braces and clear aligners gently move teeth into better alignment for a healthier, more confident smile.",
  "benefits": [
   {
    "t": "Straighter smile",
    "d": "Improved alignment and spacing."
   },
   {
    "t": "Healthier bite",
    "d": "Better function and wear."
   },
   {
    "t": "Choice of options",
    "d": "Metal, ceramic or clear aligners."
   },
   {
    "t": "All ages",
    "d": "Suitable for teens and adults."
   }
  ],
  "steps": [
   {
    "t": "Assessment",
    "d": "Records, scans and a treatment plan."
   },
   {
    "t": "Fitting",
    "d": "Braces or aligners are placed."
   },
   {
    "t": "Adjustments",
    "d": "Regular visits guide progress."
   },
   {
    "t": "Retention",
    "d": "Retainers keep your result."
   }
  ],
  "facts": {
   "duration": "Months",
   "visits": "Regular reviews",
   "comfort": "Mild pressure, gentle"
  },
  "faqs": [
   {
    "q": "How long does treatment take?",
    "a": "It varies with each case; we’ll estimate after your assessment."
   },
   {
    "q": "Are aligners right for me?",
    "a": "They suit many cases; we’ll advise honestly."
   }
  ]
 },
 {
  "slug": "teeth-whitening",
  "name": "Teeth Whitening",
  "icon": "💎",
  "photo": "teeth-whitening",
  "group": "Cosmetic Dentistry",
  "tagline": "Safe, professional whitening for a brighter smile.",
  "card": "Safe in-clinic whitening for several shades brighter in one visit.",
  "intro": "Professional whitening lifts years of staining safely and predictably, with results that are far more even and controlled than over-the-counter products.",
  "benefits": [
   {
    "t": "Visibly brighter",
    "d": "Several shades lighter."
   },
   {
    "t": "Safe process",
    "d": "Supervised by your dentist."
   },
   {
    "t": "Customised",
    "d": "Strength matched to your teeth."
   },
   {
    "t": "Boosts confidence",
    "d": "A fresher, younger look."
   }
  ],
  "steps": [
   {
    "t": "Check-up",
    "d": "We confirm your teeth are suitable."
   },
   {
    "t": "Protection",
    "d": "Gums are shielded."
   },
   {
    "t": "Whitening",
    "d": "Gel is applied and activated."
   },
   {
    "t": "Care",
    "d": "Tips to maintain your shade."
   }
  ],
  "facts": {
   "duration": "45–60 min",
   "visits": "1 visit",
   "comfort": "Mild sensitivity possible"
  },
  "faqs": [
   {
    "q": "Is whitening safe?",
    "a": "When supervised by a dentist, yes."
   },
   {
    "q": "How long do results last?",
    "a": "It depends on habits like tea, coffee and smoking."
   }
  ]
 },
 {
  "slug": "veneers-smile-design",
  "name": "Veneers & Smile Design",
  "icon": "🌟",
  "photo": "veneers-smile-design",
  "group": "Cosmetic Dentistry",
  "tagline": "Custom-crafted makeovers designed around your face.",
  "card": "Custom-crafted veneers and makeovers designed around your face.",
  "intro": "Veneers are thin porcelain shells that reshape colour, size and alignment. Smile design plans the whole result around your features so it looks naturally yours.",
  "benefits": [
   {
    "t": "Complete makeover",
    "d": "Fix shape, colour and gaps together."
   },
   {
    "t": "Natural result",
    "d": "Designed to suit your face."
   },
   {
    "t": "Stain resistant",
    "d": "Porcelain resists everyday staining."
   },
   {
    "t": "Preview first",
    "d": "See the plan before committing."
   }
  ],
  "steps": [
   {
    "t": "Consultation",
    "d": "Discuss goals and expectations."
   },
   {
    "t": "Design",
    "d": "A plan and preview of your result."
   },
   {
    "t": "Preparation",
    "d": "Minimal shaping and temporaries."
   },
   {
    "t": "Bonding",
    "d": "Final veneers are fitted."
   }
  ],
  "facts": {
   "duration": "2–3 weeks",
   "visits": "2–3 visits",
   "comfort": "Local anaesthetic"
  },
  "faqs": [
   {
    "q": "Are veneers reversible?",
    "a": "Preparation is minimal but permanent; we’ll discuss this fully."
   },
   {
    "q": "Are they suitable for everyone?",
    "a": "A consultation determines suitability."
   }
  ]
 },
 {
  "slug": "gum-treatment",
  "name": "Gum Treatment (Periodontics)",
  "icon": "🌿",
  "photo": "gum-treatment",
  "group": "General Dentistry",
  "tagline": "Care for bleeding, swollen gums and lasting gum health.",
  "card": "Care for bleeding, swollen gums and deep cleaning for lasting gum health.",
  "intro": "Healthy gums hold your teeth in place. If you notice bleeding, swelling, bad breath or receding gums, early treatment can stop the problem from progressing.",
  "benefits": [
   {
    "t": "Stops progression",
    "d": "Treat gum disease early."
   },
   {
    "t": "Less bleeding",
    "d": "Calmer, healthier gums."
   },
   {
    "t": "Protects teeth",
    "d": "Preserves the support around them."
   },
   {
    "t": "Deep cleaning",
    "d": "Reaches below the gumline."
   }
  ],
  "steps": [
   {
    "t": "Gum check",
    "d": "Measure gum health and pocket depth."
   },
   {
    "t": "Deep clean",
    "d": "Remove plaque and tartar below gums."
   },
   {
    "t": "Healing",
    "d": "Gums settle and tighten."
   },
   {
    "t": "Maintenance",
    "d": "Regular reviews keep them healthy."
   }
  ],
  "facts": {
   "duration": "45–60 min",
   "visits": "1–3 visits",
   "comfort": "Local anaesthetic if needed"
  },
  "faqs": [
   {
    "q": "Is bleeding gum normal?",
    "a": "No — it’s an early sign worth checking."
   },
   {
    "q": "Can gum disease be cured?",
    "a": "It can be controlled well with treatment and good home care."
   }
  ]
 },
 {
  "slug": "kids-dentistry",
  "name": "Kids’ Dentistry (Pedodontics)",
  "icon": "🧸",
  "photo": "kids-dentistry",
  "group": "General Dentistry",
  "tagline": "Friendly, fear-free dental care for children.",
  "card": "Friendly, fear-free care with sealants, fluoride and early guidance.",
  "intro": "We make early visits fun and calm, building positive habits. Check-ups, fluoride and sealants help protect growing teeth.",
  "benefits": [
   {
    "t": "Fear-free",
    "d": "Gentle, patient approach."
   },
   {
    "t": "Prevention",
    "d": "Fluoride and fissure sealants."
   },
   {
    "t": "Healthy habits",
    "d": "Guidance for parents and kids."
   },
   {
    "t": "Growth monitoring",
    "d": "Track development early."
   }
  ],
  "steps": [
   {
    "t": "Meet & greet",
    "d": "Let your child explore."
   },
   {
    "t": "Gentle check",
    "d": "A quick, friendly exam."
   },
   {
    "t": "Protect",
    "d": "Cleaning, fluoride or sealants."
   },
   {
    "t": "Advice",
    "d": "Tips for brushing and diet."
   }
  ],
  "facts": {
   "duration": "20–30 min",
   "visits": "1 visit",
   "comfort": "Child-friendly"
  },
  "faqs": [
   {
    "q": "When should my child first visit?",
    "a": "Ideally when the first teeth appear or by their first birthday."
   },
   {
    "q": "Are sealants necessary?",
    "a": "They help protect back teeth from decay; we’ll advise."
   }
  ]
 },
 {
  "slug": "dental-emergency",
  "name": "Dental Emergency & Pain Relief",
  "icon": "🚑",
  "photo": "dental-emergency",
  "group": "General Dentistry",
  "tagline": "Quick help for toothache, swelling and broken teeth.",
  "card": "Quick help for toothache, swelling, broken or knocked-out teeth.",
  "intro": "Dental pain rarely waits. We prioritise urgent cases — toothache, swelling, broken or knocked-out teeth — to relieve pain and protect your tooth.",
  "benefits": [
   {
    "t": "Fast relief",
    "d": "Priority for urgent problems."
   },
   {
    "t": "Clear diagnosis",
    "d": "Find the cause quickly."
   },
   {
    "t": "Saves teeth",
    "d": "Prompt care improves outcomes."
   },
   {
    "t": "Guidance",
    "d": "What to do while you reach us."
   }
  ],
  "steps": [
   {
    "t": "Call us",
    "d": "Tell us what’s happening."
   },
   {
    "t": "Assessment",
    "d": "Quick exam and imaging."
   },
   {
    "t": "Relief",
    "d": "Treatment to ease pain and stabilise."
   },
   {
    "t": "Follow-up",
    "d": "A plan for complete repair."
   }
  ],
  "facts": {
   "duration": "As needed",
   "visits": "1+ visits",
   "comfort": "Comfort first"
  },
  "faqs": [
   {
    "q": "What counts as an emergency?",
    "a": "Severe pain, swelling, bleeding, or a broken or knocked-out tooth."
   },
   {
    "q": "What if a tooth is knocked out?",
    "a": "Keep it moist, handle it by the crown, and call us immediately."
   }
  ]
 }
];

  /* Custom line icons (32×32, duotone: stroke + soft fill). They inherit colour via currentColor,
     so CSS decides the tint. They replace the old emoji in every card, pill and "at a glance" panel. */
  var TOOTH = "M16 7.5C14.6 6 12.4 5.2 10.4 5.7 7.6 6.4 6.2 9 6.6 12.2c.3 2.4 1.4 4.2 2 6.6.6 2.4.7 7.8 2.6 7.8 1.6 0 1.8-4 2.6-6 .4-1 1.2-1.4 2.2-1.4s1.8.4 2.2 1.4c.8 2 1 6 2.6 6 1.9 0 2-5.4 2.6-7.8.6-2.4 1.7-4.2 2-6.6.4-3.2-1-5.8-3.8-6.5C19.6 5.2 17.4 6 16 7.5z";
  function tooth(tr) { return '<path class="a" d="' + TOOTH + '"' + (tr ? ' transform="' + tr + '"' : "") + "/>"; }
  function svg(inner) {
    return '<svg class="ico" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + inner + "</svg>";
  }
  var ICONS = {
    "general-checkup": tooth("translate(-2.6 -1.6) scale(.84)") +
      '<circle class="a" cx="23" cy="23" r="5.6"/><path d="m20.4 23.2 1.8 1.8 3.4-3.8"/>',
    "teeth-cleaning": '<g transform="rotate(-45 16 17)"><rect class="a" x="3" y="15.2" width="15" height="3.4" rx="1.7"/><path d="M18 16.9h2.6"/><rect class="a" x="20.6" y="13.4" width="8.4" height="7" rx="1.8"/><path d="M23 13.4v-2M25.4 13.4v-2M27.8 13.4v-2"/></g>' +
      '<circle cx="7" cy="8" r="2.3"/><circle cx="12.6" cy="4.8" r="1.4"/><circle cx="4.6" cy="13.6" r="1.3"/>',
    "dental-implants": '<path class="a" d="M8.6 6.4c1.9-1.5 4.2-1.1 7.4 0 3.2-1.1 5.5-1.5 7.4 0 1.6 1.4 1.3 4.9-.7 7.6H9.3C7.3 11.3 7 7.8 8.6 6.4z"/>' +
      '<path d="M12.5 14v2.4h7V14"/><path class="a" d="M13 16.4h6l-1.3 10.2c-.1.9-.7 1.5-1.7 1.5s-1.6-.6-1.7-1.5z"/><path d="M13.3 19.6h5.4M13.7 22.4h4.6M14.1 25.1h3.8"/>',
    "fillings": tooth() + '<circle cx="16" cy="12.4" r="3" fill="currentColor" fill-opacity=".55"/>',
    "root-canal": tooth() + '<path d="M12.6 13.2c1.8-1 5-1 6.8 0M12.4 13.4c-.2 3.6-1.1 6.4-1.2 10M19.6 13.4c.2 3.6 1.1 6.4 1.2 10"/>',
    "extractions": '<path d="M16 3.4v8.2M12.4 7l3.6-3.6L19.6 7"/>' + tooth("translate(3.5 9.2) scale(.78)"),
    "crowns-bridges": '<path class="a" d="M6.2 11.2 10.8 16 16 8l5.2 8 4.6-4.8L24 23.4H8z"/><path d="M8.4 27h15.2"/><circle cx="6" cy="9.6" r="1.4"/><circle cx="16" cy="5.8" r="1.4"/><circle cx="26" cy="9.6" r="1.4"/>',
    "dentures": '<path class="a" d="M4.6 11c0-2.6 2-4.4 4.6-4.4h13.6c2.6 0 4.6 1.8 4.6 4.4v3.6c0 5.4-3.4 9.6-11.4 9.6S4.6 20 4.6 14.6z"/><path d="M4.8 13h22.4M11 13v6M16 13v7.4M21 13v6"/>',
    "braces-aligners": '<rect class="a" x="2.8" y="8.6" width="8.4" height="14.8" rx="3.2"/><rect class="a" x="11.8" y="8.6" width="8.4" height="14.8" rx="3.2"/><rect class="a" x="20.8" y="8.6" width="8.4" height="14.8" rx="3.2"/>' +
      '<path d="M1.6 16h28.8"/><rect x="5" y="14" width="4" height="4" rx="1" fill="currentColor"/><rect x="14" y="14" width="4" height="4" rx="1" fill="currentColor"/><rect x="23" y="14" width="4" height="4" rx="1" fill="currentColor"/>',
    "teeth-whitening": tooth("translate(-1.8 2.6) scale(.82)") +
      '<path fill="currentColor" stroke="none" d="M24.6 2.4c.5 3.2 1.6 4.3 4.8 4.8-3.2.5-4.3 1.6-4.8 4.8-.5-3.2-1.6-4.3-4.8-4.8 3.2-.5 4.3-1.6 4.8-4.8z"/><path d="M28.4 14.2v3M26.9 15.7h3"/>',
    "veneers-smile-design": '<path class="a" d="M3.4 13.2C6.4 18.6 10.6 22 16 22s9.6-3.4 12.6-8.8C25.4 11.2 21 10 16 10s-9.4 1.2-12.6 3.2z"/><path d="M16 10.2V22M10.4 11v10M21.6 11v10M3.8 14.4h24.4" opacity=".7"/>' +
      '<path fill="currentColor" stroke="none" d="M25.6 2.6c.4 2.4 1.2 3.2 3.6 3.6-2.4.4-3.2 1.2-3.6 3.6-.4-2.4-1.2-3.2-3.6-3.6 2.4-.4 3.2-1.2 3.6-3.6z"/>',
    "gum-treatment": '<path class="a" d="M9.2 19.4C6.8 15.6 5.8 11.4 7.4 8.4c1-1.9 3-2.5 5-2 1.5.4 2.5 1.2 3.6 1.2s2.1-.8 3.6-1.2c2-.5 4 .1 5 2 1.6 3 .6 7.2-1.8 11"/>' +
      '<path class="a" d="M2.8 21.4c2.4-2.6 4.6-2.6 6.6-.2s4.6 2.6 6.6 0 4.6-2.6 6.6 0 4.2 2.4 6.6 0v7.4H2.8z"/>',
    "kids-dentistry": tooth() + '<circle cx="12.7" cy="11.8" r=".95" fill="currentColor" stroke="none"/><circle cx="19.3" cy="11.8" r=".95" fill="currentColor" stroke="none"/><path d="M12.8 15c.9 1.2 2 1.8 3.2 1.8s2.3-.6 3.2-1.8"/><path d="M27 3.2v4.4M24.8 5.4h4.4"/>',
    "dental-emergency": tooth("translate(-1.8 2.6) scale(.84)") + '<circle class="a" cx="24" cy="8" r="5.6"/><path d="M24 5.2v5.6M21.2 8h5.6"/>'
  };
  treatments.forEach(function (t) { t.icon = svg(ICONS[t.slug] || tooth()); });

  var bySlug = {};
  treatments.forEach(function (t) { bySlug[t.slug] = t; });

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function px(name, home) {
    return (home || "") + "assets/images/treatments/" + name + ".webp";
  }

  /* Card used on the home page grid */
  function card(t, href) {
    return '<article class="tcard reveal"><div class="tcard__img"><img loading="lazy" decoding="async" src="' + esc(px(t.photo)) + '" alt=""><span class="tcard__ic" aria-hidden="true">' + t.icon + '</span></div>' +
      '<div class="tcard__b"><h3><a class="tcard__link" href="' + esc(href) + '">' + esc(t.name) + '</a></h3><p>' + esc(t.card) + '</p>' +
      '<div class="tcard__act"><span class="tcard__learn">Learn more →</span><a href="#contact" data-t="' + esc(t.group) + '">Enquire <span>→</span></a></div></div></article>';
  }

  /* Page body (everything inside <main>).
     ctx: { home: "" | "../", waUrl, cardHref(slug) } */
  function render(t, ctx) {
    var home = ctx.home || "", wa = ctx.waUrl || "#", short = t.name.split(" (")[0];
    var enquire = home + "index.html?enquire=" + encodeURIComponent(t.group) + "&treatment=" + encodeURIComponent(t.name) + "#contact";
    var n = function (i) { return (i < 9 ? "0" : "") + (i + 1); };

    var benefits = t.benefits.map(function (b, i) {
      return '<div class="bene reveal"><b>' + n(i) + '</b><h3>' + esc(b.t) + '</h3><p>' + esc(b.d) + '</p></div>';
    }).join("");
    var steps = t.steps.map(function (s, i) {
      return '<li class="reveal"><b>' + n(i) + '</b><h3>' + esc(s.t) + '</h3><p>' + esc(s.d) + '</p></li>';
    }).join("");
    var faqs = t.faqs.map(function (f, i) {
      return '<details' + (i === 0 ? " open" : "") + '><summary>' + esc(f.q) + '</summary><p>' + esc(f.a) + '</p></details>';
    }).join("");
    var at = treatments.indexOf(t);
    var related = [1, 2, 3].map(function (k) {
      var r = treatments[(at + k) % treatments.length];
      return '<article class="tcard reveal"><div class="tcard__img"><img loading="lazy" decoding="async" src="' + esc(px(r.photo, home)) + '" alt=""><span class="tcard__ic" aria-hidden="true">' + r.icon + '</span></div>' +
        '<div class="tcard__b"><h3><a class="tcard__link" href="' + esc(ctx.cardHref(r.slug)) + '">' + esc(r.name) + '</a></h3><p>' + esc(r.tagline) + '</p>' +
        '<div class="tcard__act"><span class="tcard__learn">Learn more →</span></div></div></article>';
    }).join("");
    var labels = ["Typical duration", "Visits", "Comfort"], vals = [t.facts.duration, t.facts.visits, t.facts.comfort];
    var facts = vals.map(function (v, i) { return '<div><span>' + labels[i] + '</span><b>' + esc(v) + '</b></div>'; }).join("");

    return '<section class="vhero"><img class="vhero__bg" fetchpriority="high" src="' + esc(px(t.photo, home)) + '" alt=""><div class="vhero__shade"></div><div class="vhero__in">' +
      '<nav class="crumbs" aria-label="Breadcrumb"><a href="' + home + 'index.html">Home</a><span aria-hidden="true">/</span><a href="' + home + 'index.html#treatments">Treatments</a><span aria-hidden="true">/</span><b aria-current="page">' + esc(t.name) + '</b></nav>' +
      '<div class="vhero__grid"><div><span class="pill pill--glass reveal"><b aria-hidden="true">' + t.icon + '</b> Treatment details</span>' +
      '<h1 class="reveal">' + esc(t.name) + '</h1><p class="lead reveal">' + esc(t.tagline) + '</p>' +
      '<div class="vhero__actions reveal"><a class="btn btn--primary magnet" href="' + esc(enquire) + '">Enquire about this treatment</a><a class="btn btn--outline" data-wa-link href="' + esc(wa) + '" target="_blank" rel="noopener">Ask on WhatsApp</a></div></div>' +
      '<aside class="glass reveal" aria-label="At a glance"><span class="glass__ic" aria-hidden="true">' + t.icon + '</span><p class="glass__t">At a glance</p>' + facts + '</aside></div></div>' +
      '<div class="vhero__wave" aria-hidden="true"><svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0 80V44C240 4 480 4 720 34s480 38 720 -2v48z" fill="#F5F7F4"/></svg></div></section>' +

      '<section class="sec"><div class="wrap split split--top"><div class="reveal"><span class="label">Overview</span><h2>About ' + esc(t.name) + '</h2><p class="lead">' + esc(t.intro) + '</p>' +
      '<p class="fine">Timings and visits are typical and vary by person — we confirm everything at your consultation.</p><a class="btn btn--primary" href="' + esc(enquire) + '">Book a consultation</a></div><div class="benes">' + benefits + '</div></div></section>' +

      '<section class="sec sec--mist"><div class="wrap"><div class="head reveal"><span class="label">What to expect</span><h2>Your treatment, step by step</h2></div><ol class="timeline">' + steps + '</ol></div></section>' +

      '<section class="sec"><div class="wrap faqw"><div class="head reveal"><span class="label">FAQ</span><h2>Good to know</h2><p>More questions? Message us on WhatsApp.</p></div><div class="faq reveal">' + faqs + '</div></div></section>' +

      '<section class="sec sec--mist"><div class="wrap"><div class="head head--row reveal"><div><span class="label">Explore more</span><h2>Related treatments</h2></div><a class="link" href="' + home + 'index.html#treatments">All treatments →</a></div><div class="grid">' + related + '</div></div></section>' +

      '<section class="cta"><img data-speed="0.08" loading="lazy" decoding="async" src="' + esc(px(t.photo, home)) + '" alt=""><div class="wrap reveal"><h2>Ready to get started with ' + esc(short) + '?</h2><p>Send an enquiry and we’ll confirm a time that suits you.</p><a href="' + esc(enquire) + '" class="btn btn--light magnet">Enquire now</a></div></section>';
  }

  return { treatments: treatments, bySlug: bySlug, esc: esc, px: px, card: card, render: render };
});