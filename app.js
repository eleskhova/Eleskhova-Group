/* =====================================================================
   Eleskhova Group — site logic (vanilla JS, no build step, no framework)
   ===================================================================== */
"use strict";

/* ---------- small icon set (inline SVG, no external icon library) ---------- */
const ICON_PATHS = {
  check: 'M20 6 9 17l-5-5',
  arrow: 'M7 17 17 7M7 7h10v10',
  chevronDown: 'm6 9 6 6 6-6',
  phone: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  mail: 'M4 4h16v16H4zM4 6l8 7 8-7',
  mapPin: 'M20 10c0 4.99-5.54 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.2 4 15 4 10a8 8 0 0 1 16 0Z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  award: 'M15.48 12.9 17 21.7l-5-3-5 3 1.52-8.8M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z',
  fileCheck: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8ZM14 2v6h6M9 15l2 2 4-4',
  graduationCap: 'm22 7-9-4-9 4 9 4 9-4ZM4 9v6c0 1.5 3.5 4 8 4s8-2.5 8-4V9',
  wrench: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  package: 'M21 8 12 3 3 8v8l9 5 9-5ZM3 8l9 5 9-5M12 13v8',
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z',
  hardHat: 'M4 15v-3a6 6 0 0 1 6-6M20 15v-3a6 6 0 0 0-6-6M4 15h16M4 15v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2M12 4v2',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 6v6l4 2',
  sparkles: 'm12 3-1.5 4.5L6 9l4.5 1.5L12 15l1.5-4.5L18 9l-4.5-1.5L12 3ZM5 3v3M3 5h4M19 17v3M17 19h4',
  building: 'M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18ZM10 6h4M10 10h4M10 14h4M10 18h4',
  boxes: 'M2.97 12.92 12 18l9.03-5.08M2.97 6.92 12 12l9.03-5.08L12 2Z',
  x: 'M18 6 6 18M6 6l12 12',
  truck: 'M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2m14 0a2 2 0 1 1-4 0m4 0a2 2 0 1 0-4 0m-6 0a2 2 0 1 1-4 0m4 0a2 2 0 1 0-4 0m2 0h6m4-6h3l3 4v2h-2',
  heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z',
  star: 'm12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21.1 7 14.2 2 9.3l6.9-1L12 2Z',
  calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
  creditCard: 'M2 10h20M2 6h20v12H2zM6 15h4'
};
function icon(name, size = 16, cls = '') {
  const d = ICON_PATHS[name] || ICON_PATHS.check;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-inline ${cls}" aria-hidden="true"><path d="${d}"/></svg>`;
}
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function linkedinIcon(size = 16) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" class="icon-inline" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z"/></svg>`;
}
function linkedinLinkHTML(cls = 'chip') {
  const url = (CONFIG.linkedinURL || '').startsWith('http') ? CONFIG.linkedinURL : null;
  if (!url) return '';
  return `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px">${linkedinIcon(14)} LinkedIn</a>`;
}

/* ---------- WhatsApp helper ---------- */
function waLink(text) {
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/* ---------- toast ---------- */
function toast(msg, ms = 3200) {
  const wrap = document.getElementById('toastWrap');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; setTimeout(() => el.remove(), 300); }, ms);
}

/* ---------- fire-and-forget submit to Google Sheet ---------- */
/* ---------- traffic-source tracking ----------
   Captures utm_source / utm_medium / utm_campaign from the URL the very
   first time someone lands on the site this session, and the referring
   page (e.g. a Google search or a WhatsApp share). Every form submission
   afterwards includes these, so the Sheet shows which channel actually
   produces leads — not just what they submitted. */
function getTrafficSource() {
  const stored = sessionStorage.getItem('eleskhova_traffic_source');
  if (stored) return JSON.parse(stored);
  const params = new URLSearchParams(location.search);
  const source = {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    referrer: document.referrer || 'direct'
  };
  sessionStorage.setItem('eleskhova_traffic_source', JSON.stringify(source));
  return source;
}

function submitToSheet(payload) {
  const fullPayload = { ...payload, ...getTrafficSource(), page: location.hash || '#home', submittedAt: new Date().toISOString() };
  if (!CONFIG.googleSheetWebAppURL || CONFIG.googleSheetWebAppURL.indexOf('PASTE_') === 0) {
    console.info('[Eleskhova] Google Sheet webhook not configured yet — see SETUP.md. Payload:', fullPayload);
    return Promise.resolve(false);
  }
  return fetch(CONFIG.googleSheetWebAppURL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(fullPayload)
  }).then(() => true).catch(err => { console.error('Sheet submit failed', err); return false; });
}

/* =====================================================================
   DATA
   ===================================================================== */
const NAV = [
  { k: 'home', l: 'Home' },
  { k: 'about', l: 'About' },
  { k: 'rentals', l: 'Student Rentals' },
  { k: 'academy', l: 'Academy' },
  { k: 'facilities', l: 'Facilities' },
  { k: 'logistics', l: 'Logistics & Consulting' },
  { k: 'tenders', l: 'Tenders' },
  { k: 'emporium', l: 'Emporium' },
  { k: 'contact', l: 'Contact' }
];

const DIVISIONS = [
  { id: 'rentals', icon: 'package', title: 'Student Rentals', desc: 'Silver-standard appliances. 1-7 day delivery in Gauteng.', badge: 'FLAGSHIP' },
  { id: 'academy', icon: 'graduationCap', title: 'Academy', desc: 'Trained cleaners & guards deployed from our academy.' },
  { id: 'facilities', icon: 'shield', title: 'Facilities', desc: 'Train → Deploy → Manage: cleaning, security, maintenance.' },
  { id: 'logistics', icon: 'truck', title: 'Logistics & Consulting', desc: 'SOPs, Risk, Cross-border SADC, Unions, Disciplinary.' },
  { id: 'tenders', icon: 'fileCheck', title: 'Tenders', desc: 'Training, Security, Cleaning, Logistics partnerships.', badge: 'TENDER READY' },
  { id: 'emporium', icon: 'sparkles', title: 'Emporium', desc: 'Chwaneleskhova — kids & lifestyle. Owl Premium.' }
];

const CAMPUSES = ['UP', 'TUT', 'UJ', 'WITS', 'UNISA', 'Sefako Makgatho', 'Hatfield', 'Sunnyside', 'Arcadia', 'Pretoria Central', 'Auckland Park', 'Braamfontein', 'Doornfontein', 'Centurion'];
const COVERAGE = ['Hatfield', 'Sunnyside', 'Arcadia', 'Pretoria Central', 'Auckland Park', 'Braamfontein', 'Doornfontein', 'Centurion', 'Soshanguve', 'Midrand', 'Johannesburg'];

const TIERS = [
  { tier: 'STARTER', max: 'Max 3 items', cap: 'R800 cap', note: 'New guarantor required.', style: 'tint' },
  { tier: 'BRONZE', max: 'Unlock 5 items', cap: 'R1200 cap', note: 'After 3 on-time payments — add TV, Freezer or Air Fryer.', style: 'light' },
  { tier: 'SILVER', max: 'All up to 8 items', cap: 'R2000 + R50 OFF', note: 'After 6 on-time payments — priority support.', style: 'dark' }
];

const PRICE_GRID = [
  { name: 'Bar Fridge 93L (Defy)', note: 'Most popular', variants: [{ label: 'Silver', price: 320, pop: true }, { label: 'White', price: 300 }] },
  { name: 'Fridge 246L (Shared)', note: 'Best for flats', variants: [{ label: 'Silver', price: 600, pop: true }, { label: 'White', price: 580 }] },
  { name: 'Freezer (Shared)', variants: [{ price: 350 }] },
  { name: 'Microwave 20L', variants: [{ label: 'Silver', price: 180, pop: true }, { label: 'White', price: 160 }] },
  { name: 'Combo — Bar Fridge + Microwave', note: 'Most popular', variants: [{ label: 'Silver', price: 450, pop: true }] },
  { name: 'Combo — Fridge 246L + Microwave', note: 'Best for flats', variants: [{ label: 'Silver', price: 750, pop: true }] },
  { name: 'KIC Combo 92L + 20L', note: 'Counts as 2 items', variants: [{ price: 420 }] },
  { name: 'Washing Machine 7KG (Shared)', variants: [{ price: 500 }] },
  { name: 'TV 32"', note: 'R500 deposit', variants: [{ price: 250 }] },
  { name: 'Air Fryer', variants: [{ price: 150 }] },
  { name: 'Small Appliances (Kettle / 2-Plate / Fan / Heater / Vacuum)', note: 'Counts as 2 items', variants: [{ label: 'Kettle', price: 60 }, { label: '2-Plate', price: 120 }, { label: 'Fan', price: 80 }, { label: 'Heater', price: 100 }, { label: 'Vacuum', price: 100 }] }
];

const APPLIANCE_CHECKLIST = ['Bar Fridge 93L — R320', 'Fridge 246L — R600', 'Microwave — R180', 'Combo Bar+Micro — R450', 'Washing 7KG — R500', 'Kettle — R60', '2-Plate — R120', 'Air Fryer — R150', 'TV 32" — R250', 'Freezer — R350', 'Fan — R80', 'Heater — R100'];

const ACADEMY_COURSES = [
  { t: 'Supply Chain Management', i: 'boxes' },
  { t: 'Security Training & Guarding — Grade B, A', i: 'shield' },
  { t: 'Cleaning Training', i: 'sparkles' },
  { t: 'Facilitator', i: 'users' },
  { t: 'Assessor', i: 'fileCheck' },
  { t: 'Moderator', i: 'award' },
  { t: 'SAMTRAC Intro', i: 'hardHat' },
  { t: 'Warehousing & Logistics', i: 'truck' }
];

const FACILITIES_SERVICES = [
  { t: 'Cleaning', d: 'Trained cleaners from our academy — SOP-driven, chemicals and equipment compliant.', i: 'sparkles' },
  { t: 'Security', d: 'Trained guards from our academy — PSIRA pipeline, Grade B/A pipeline, disciplined.', i: 'shield' },
  { t: 'Maintenance', d: 'Minor maintenance, asset care and compliance checks for student residences & offices.', i: 'wrench' }
];

const LOGISTICS_LIST = ['SOP / Risk Assessments', 'Operational Risk Assessments', 'Cross-border Risk Assessments (SADC)', 'Delivery Route Risk Assessments', 'Union Negotiations', 'National Union & Management Engagement', 'Employment Equity (EE) / Skills Development Committee (SDC) Representation', 'Chairing Hearings', 'Investigations', 'Bakkie Assistance'];

const TENDER_SCOPE = ['B-BBEE Level 1 contributor', 'Scope: Training, Security, Cleaning, Logistics based on qualifications', 'Higher Certificate in HR Management, HR governance, contracts &amp; SOP development', 'Lean Management — hands-on process improvement experience', 'National union & management engagement — EE/SDC committee experience', 'Grade B & Grade A Security — certified', 'Armed Response — certified', 'PSIRA Business & Academy E-C, A-B in progress', 'Facilitator certified', 'SAMTRAC Intro done, Assessor/Moderator in progress, HRBPP registration finalising', 'Centurion base, Gauteng focus, SADC capability'];

const TENDER_TIMELINE = [
  { y: '2024–25', v: 'Business registered, Academy pipeline' },
  { y: '2025', v: 'SAMTRAC, Facilitator done' },
  { y: '2026', v: 'BCom Supply Chain final year, Grade B & A Security certified, Armed Response certified' }
];

/* NOTE: 5 items still use a clean placeholder tile (no photo yet) — Kids Bundle,
   Boys Set, Girls Lifestyle Set — swap in real photos any time, see SETUP.md.
   The Owl Premium / kids owl-branded items below use supplied product mockups;
   confirm with Prince before launch whether these are final product photography
   or concept renders, and update captions accordingly. */
const PRODUCTS = [
  { src: 'images/shoes-owl-pin.jpg', title: 'Shoes with Owl Pin', cat: 'Shoes', tag: 'Owl Premium' },
  { src: 'images/tee-owl-embroidery.jpg', title: 'White Tee — Owl Embroidery', cat: 'Girls', tag: 'New' },
  { src: 'images/salicylic-serum.jpg', title: 'Salicylic Serum', cat: 'Skincare', tag: 'Skincare' },
  { src: 'images/acne-ointment.jpg', title: 'Acne Ointment', cat: 'Skincare', tag: 'Skincare' },
  { src: 'images/skincare-balm.jpg', title: 'Eczema Calm Balm', cat: 'Skincare', tag: 'Balm' },
  { title: 'Kids Bundle — Everyday', cat: 'Bundles', tag: 'Bundle', icon: 'package' },
  { title: 'Boys Set', cat: 'Boys', tag: 'Boys', icon: 'sparkles' },
  { title: 'Girls Lifestyle Set', cat: 'Girls', tag: 'Girls', icon: 'heart' },
  { src: 'images/owl-perfume-duo.jpg', title: 'Owl Premium Cologne Duo — Black &amp; White', cat: 'Fragrance', tag: 'Owl Premium' },
  { src: 'images/owl-bow-caps.jpg', title: 'Owl Bow &amp; Cap Set', cat: 'Accessories', tag: 'New' },
  { src: 'images/owl-kids-jackets.jpg', title: 'Owl Jackets &amp; Layers Set', cat: 'Boys', tag: 'New' },
  { src: 'images/owl-kids-socks.jpg', title: 'Owl Socks Set', cat: 'Accessories', tag: 'New' },
  { src: 'images/owl-kids-outfits.jpg', title: 'Owl Girls Outfit Set', cat: 'Girls', tag: 'New' },
  { src: 'images/owl-cap-pin.jpg', title: 'Owl Pin Cap — Black &amp; Green', cat: 'Accessories', tag: 'Owl Premium' }
];

const VALUES = [
  { t: 'Serve first', d: 'Every division exists to solve a real problem for real people — students, residences, campuses, businesses.' },
  { t: 'Train before we deploy', d: 'Nobody reaches a client site or a student’s door without going through the Academy first.' },
  { t: 'Trust by design', d: 'No hidden fees, no fine-print surprises. Clear pricing, clear POPIA consent, clear paper trail.' },
  { t: 'Built to last', d: 'We plan for compliance and growth years ahead — PSIRA, SAMTRAC, tender-readiness — not just the next sale.' },
  { t: 'South Africa first, SADC ready', d: 'Rooted in Centurion and Gauteng campuses, with the cross-border experience to grow into the region.' }
];

const FAQ = [
  { q: 'What documents do I need to apply for Student Rentals?', a: 'A valid ID, proof of registration for 2026, proof of residence (res letter or lease), and a guarantor\'s ID. All information is stored per POPIA for 5 years.' },
  { q: 'How long does delivery take?', a: '1–7 working days within Gauteng, covering Hatfield, Sunnyside, Arcadia, Pretoria Central, Auckland Park, Braamfontein, Doornfontein, Centurion, Soshanguve, Midrand and Johannesburg. Delivery outside Gauteng is available on request.' },
  { q: 'How do the rental tiers work?', a: 'Starter tier allows up to 3 items with an R800 cap and requires a new guarantor. After 3 on-time payments you unlock Growth (5 items, R1200 cap). After 6 on-time payments you unlock Priority (up to 8 items, R2000 cap, plus R50 off).' },
  { q: 'What happens if an appliance is stolen or damaged?', a: 'Optional insurance is available from R35 per month per item. For theft, a SAPS case number, affidavit and forced-entry photos are required within 24 hours. Damage is charged per the agreement\'s excess schedule.' },
  { q: 'How do I cancel my rental?', a: 'Give 30 days\' written notice via WhatsApp. Items are collected within 1–7 working days after notice. A R150 cleaning fee applies if items are returned dirty, and deposits are refunded within 14–21 days.' },
  { q: 'Do you offer training and security services besides rentals?', a: 'Yes — Eleskhova Academy trains cleaners and guards who are then deployed through our Facilities division. We also offer Logistics & Consulting (SOPs, risk assessments, union negotiations, cross-border SADC work) and are tender-ready for training, security, cleaning and logistics contracts.' }
];

const WHY_WE_WIN = [
  { t: 'Trust by design', d: 'Clear pricing, clear POPIA consent, no hidden fees. Asset tags, surge-plug rule, locked-room policy on every rental.' },
  { t: 'Train → Deploy → Manage', d: 'We train cleaners & guards in our academy, then deploy to Facilities clients — quality controlled.' },
  { t: 'SADC expertise', d: 'Cross-border risk assessments (Botswana, Eswatini), union negotiations, chairing hearings.' },
  { t: 'Student-first pricing', d: 'Tier unlocks reward on-time payers: R800 Starter → R1200 Bronze → R2000 Silver + R50 OFF.' }
];

/* =====================================================================
   ROUTER
   Includes one hidden route, 'report', reachable only via direct link
   or QR code (not shown in nav menus) — used for appliance fault
   reporting. See pageReport() and the QR label generator tool.
   ===================================================================== */
const HIDDEN_ROUTES = ['report'];
function isValidRoute(p) { return NAV.some(n => n.k === p) || HIDDEN_ROUTES.includes(p); }

let currentPage = (location.hash || '#home').replace('#', '') || 'home';
if (!isValidRoute(currentPage)) currentPage = 'home';

function navigate(page) {
  currentPage = page;
  if (location.hash !== '#' + page) location.hash = page;
  renderNav();
  renderPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('mobileNav').classList.remove('open');
  document.getElementById('menuToggle').setAttribute('aria-expanded', 'false');
}
window.addEventListener('hashchange', () => {
  const p = (location.hash || '#home').replace('#', '');
  currentPage = isValidRoute(p) ? p : 'home';
  renderNav(); renderPage();
});

function renderNav() {
  const desktop = document.getElementById('desktopNav');
  const mobile = document.getElementById('mobileNav');
  desktop.innerHTML = NAV.map(n => `<button data-nav="${n.k}" ${currentPage === n.k ? 'aria-current="page"' : ''}>${n.l}</button>`).join('');
  mobile.innerHTML = NAV.map(n => `<button data-nav="${n.k}" ${currentPage === n.k ? 'aria-current="page"' : ''}>${n.l}</button>`).join('');
  document.getElementById('footerDivisions').innerHTML = DIVISIONS.map(d => `<button data-nav="${d.id}">${d.title}</button>`).join('');
  const li = document.getElementById('footerLinkedin');
  if (li) li.innerHTML = linkedinLinkHTML();
}

/* =====================================================================
   PAGE BUILDERS
   ===================================================================== */
function pageHome() {
  return `
  <div class="page">
    <div class="hero-grid">
      <div class="hero-card">
        <div class="hero-blur"></div>
        <span class="badge" style="position:relative"><span class="dot pulse"></span> 6 DIVISIONS • ONE GROUP • SADC COVERAGE</span>
        <h1>Built to Serve.<br><span class="accent">Built to Grow.</span><br>Built for South Africa.</h1>
        <p class="lead"><strong>Student Rentals (appliances) is our flagship</strong>, powered by 20 years of logistics expertise. From Hatfield to Braamfontein, we deliver silver-standard appliances in 1–7 working days.</p>
        <div class="hero-cta">
          <button class="btn btn-dark" data-nav="rentals">Explore Rentals ${icon('arrow', 16)}</button>
          <button class="btn btn-outline" data-nav="about">Our Story</button>
        </div>
        <div class="stat-grid">
          ${[{ k: '6', v: 'Divisions' }, { k: '20 Years', v: 'Experience' }, { k: 'SADC', v: 'Coverage' }, { k: '1–7 Day', v: 'Delivery Gauteng' }]
      .map(s => `<div class="stat"><b>${s.k}</b><span>${s.v}</span></div>`).join('')}
        </div>
      </div>

      <div>
        <div class="flagship">
          <div class="blur"></div>
          <div class="eyebrow">FLAGSHIP • STUDENT RENTALS</div>
          <h2 class="serif">Silver Standard<br>Appliances for<br>Student Life.</h2>
          <div class="chips"><span style="background:rgba(255,255,255,.1)">R800 Cap Start</span><span style="background:var(--amber);color:var(--navy);font-weight:700">No Deposit*</span></div>
          <div class="price-row">
            ${[{ n: 'Bar Fridge 93L', p: 'R320' }, { n: 'Microwave 20L', p: 'R180' }, { n: 'Combo', p: 'R450' }]
      .map(x => `<div><div class="n">${x.n}</div><div class="p">${x.p}/mo</div></div>`).join('')}
          </div>
          <button class="btn btn-block" style="background:#fff;color:var(--navy);margin-top:20px" data-nav="rentals">View Price List</button>
          <div style="font-size:10px;opacity:.5;margin-top:8px;position:relative">*New guarantor required • T&amp;Cs apply • POPIA 5 yrs</div>
        </div>
        <div class="why-box">
          <div class="eyebrow">WHY ELESKHOVA</div>
          <ul>
            ${['Founder — BCom Supply Chain, final year 2026', 'SAMTRAC Intro certified • Facilitator certified', 'HIRA qualified • Six Sigma Green Belt (CSSGB)', 'Grade B & A Security certified • Armed Response certified', 'Assessor / Moderator in progress • PSIRA Business in progress', '20 yrs SADC logistics experience']
      .map(l => `<li>${icon('check', 16)}<span>${l}</span></li>`).join('')}
          </ul>
        </div>
      </div>
    </div>

    <div class="section-head">
      <h2>Six divisions. One seamless group.</h2>
      <div class="hint" style="display:none" id="divisionHint">Click any division to view its page →</div>
    </div>
    <div class="division-grid">
      ${DIVISIONS.map(d => `
        <button class="division-card" data-nav="${d.id}">
          <div class="top">
            <div class="icon ${d.id === 'emporium' ? 'amber' : ''}">${icon(d.icon, 20)}</div>
            ${d.badge ? `<span class="badge2">${d.badge}</span>` : ''}
          </div>
          <div class="title">${d.title}</div>
          <div class="desc">${d.desc}</div>
          <div class="cta">Open page ${icon('arrow', 14)}</div>
        </button>`).join('')}
    </div>

    <div class="trust-strip">
      <div class="eyebrow">TRUSTED BY CAMPUSES &amp; RESIDENCES</div>
      <div class="chip-wrap">${CAMPUSES.map(c => `<span class="chip">${c}</span>`).join('')}</div>
    </div>
  </div>`;
}

function pageAbout() {
  return `
  <div class="page">
    <div style="max-width:280px;margin:24px auto 0;background:#01174B;border-radius:20px;padding:0;overflow:hidden">
      <img src="images/logo-full.jpg" alt="Eleskhova Group" style="width:100%;height:auto;display:block">
    </div>
    <div class="two-col">
      <div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <span class="badge">ABOUT ELESKHOVA GROUP</span>
          <span class="badge" style="background:var(--amber);color:var(--navy);font-weight:700">B-BBEE LEVEL 1</span>
        </div>
        <h1 class="serif" style="font-size:clamp(30px,4.4vw,52px);line-height:.97;letter-spacing:-.03em;margin:16px 0 0">One brand, different stuff.<br><span style="color:var(--blue)">Built for the long term.</span></h1>
        <p style="margin-top:22px;font-size:16px;line-height:1.7;color:var(--slate-600)">Eleskhova Group owns <strong style="color:var(--navy)">eleskhovagroup.com</strong> and <strong style="color:var(--navy)">eleskhovagroup.co.za</strong> — same brand, one mission: serve South Africa through practical services that create jobs, skills and reliable supply.</p>

        <div class="card" style="margin-top:24px;padding:20px;display:flex;gap:18px;align-items:center">
          <img src="images/prince-headshot.jpg" alt="Prince Zulu, Founder &amp; Group Managing Director, Eleskhova Group" style="width:92px;height:92px;border-radius:16px;object-fit:cover;object-position:top center;flex-shrink:0;box-shadow:0 6px 18px rgba(15,23,42,.18)">
          <div>
            <div style="font-weight:700;font-size:16px;color:var(--navy)">Prince Zulu</div>
            <div style="font-size:13px;color:var(--slate-500);margin-top:2px">Founder &amp; Group Managing Director</div>
            <div style="font-size:12.5px;color:var(--slate-500);margin-top:6px;line-height:1.5">Started as a General Worker, rose through every level of operations, building Eleskhova Group from one cleaning team to six divisions.</div>
            ${CONFIG.founderLinkedinURL && CONFIG.founderLinkedinURL.startsWith('http') ? `<a href="${esc(CONFIG.founderLinkedinURL)}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;margin-top:8px;font-size:12.5px;font-weight:600;color:var(--blue)">Verify credentials on LinkedIn</a>` : ''}
          </div>
        </div>

        <div class="info-grid" style="margin-top:24px;grid-template-columns:1fr 1fr">
          <div class="card">
            <div style="font-weight:600">Founder Credentials</div>
            <ul style="list-style:none;padding:0;margin:12px 0 0;display:grid;gap:8px;font-size:13.5px;color:var(--slate-600)">
              <li style="display:flex;gap:8px">${icon('award', 16, 'accent-blue')}BCom Supply Chain Mngt — final year 2026</li>
              <li style="display:flex;gap:8px">${icon('award', 16, 'accent-blue')}Higher Certificate in Human Resources Management</li>
              <li style="display:flex;gap:8px">${icon('check', 16)}HR Governance, Contracts &amp; SOP Development — hands-on</li>
              <li style="display:flex;gap:8px">${icon('check', 16)}SAMTRAC Intro — done</li>
              <li style="display:flex;gap:8px">${icon('check', 16)}Facilitator — certified</li>
              <li style="display:flex;gap:8px">${icon('check', 16)}HIRA (Hazard Identification &amp; Risk Assessment) — qualified</li>
              <li style="display:flex;gap:8px">${icon('award', 16, 'accent-blue')}Six Sigma Green Belt (CSSGB)</li>
              <li style="display:flex;gap:8px">${icon('check', 16)}Lean Management — hands-on process improvement experience</li>
              <li style="display:flex;gap:8px">${icon('check', 16)}National union &amp; management engagement — EE/SDC committee experience</li>
              <li style="display:flex;gap:8px">${icon('check', 16)}Grade B &amp; Grade A Security — certified</li>
              <li style="display:flex;gap:8px">${icon('check', 16)}Armed Response — certified</li>
              <li style="display:flex;gap:8px;color:var(--amber)">${icon('clock', 16)}<span style="color:var(--slate-600)">Assessor / Moderator — in progress</span></li>
              <li style="display:flex;gap:8px;color:var(--amber)">${icon('clock', 16)}<span style="color:var(--slate-600)">PSIRA Business registration — in progress</span></li>
              <li style="display:flex;gap:8px;color:var(--amber)">${icon('clock', 16)}<span style="color:var(--slate-600)">HRBPP registration — finalising</span></li>
            </ul>
            <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--slate-100);font-size:12px;color:var(--slate-500);line-height:1.6">Focus: IoDSA (Governance) · SAPICS/CILTSA (Supply Chain) · ASCM (International Certification)</div>
          </div>
          <div class="card" style="background:var(--navy);color:#fff;border-color:var(--navy)">
            <div style="display:flex;justify-content:space-between;align-items:center"><div style="font-weight:600">Group Structure</div><span style="background:var(--amber);color:var(--navy);padding:2px 8px;border-radius:999px;font-size:10px;font-weight:700">B-BBEE LEVEL 1</span></div>
            <div style="margin-top:12px;display:grid;gap:8px;font-size:13px;opacity:.9">
              <div style="display:flex;justify-content:space-between;align-items:center">Student Rentals <span style="background:var(--amber);color:var(--navy);padding:2px 8px;border-radius:999px;font-size:10px;font-weight:700">FLAGSHIP</span></div>
              <div>Academy (PSIRA E-C, A-B in progress)</div>
              <div>Facilities — Cleaning &amp; Security</div>
              <div>Logistics &amp; Consulting — 20 yrs SADC</div>
              <div>Tenders — Training, Security, Cleaning, Logistics</div>
              <div>Emporium — Chwaneleskhova Kids</div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-card" style="padding:32px">
        <div class="serif" style="font-size:24px">Why we win</div>
        <div style="margin-top:18px;display:grid;gap:12px">
          ${WHY_WE_WIN.map(w => `<div class="card"><div style="font-weight:600;font-size:14px">${w.t}</div><div style="font-size:13px;color:var(--slate-500);margin-top:4px;line-height:1.5">${w.d}</div></div>`).join('')}
        </div>
        <a class="btn btn-blue mt-lg" href="${waLink('Hi, I read about Eleskhova Group on the About page')}" target="_blank" rel="noopener">Chat on WhatsApp ${icon('phone', 16)}</a>
      </div>
    </div>

    <div class="section-head">
      <h2>Previous positions</h2>
    </div>
    <p style="margin-top:10px;max-width:64ch;color:var(--slate-600);font-size:14px;line-height:1.7">Eleskhova Group's founder built this business on real, hands-on industry experience — starting on the ground and working up through every level of operations before founding the company.</p>
    <div style="margin-top:18px;display:flex;flex-wrap:wrap;gap:10px">
      ${['General Worker', 'Van Assistant', 'Checker', 'Debriefer', 'Training Officer', 'HR / IR Officer', 'Ops Manager', 'National Operations Risk Analyst (NORA)', 'Risk Manager', 'Founder — Eleskhova Group']
        .map((p, i, arr) => `<span class="chip" style="${i === arr.length - 1 ? 'background:var(--navy);color:#fff;font-weight:700;border:none' : ''}">${p}</span>${i < arr.length - 1 ? `<span style="align-self:center;color:var(--slate-300)">${icon('arrow', 12)}</span>` : ''}`).join('')}
    </div>

    <div class="section-head">
      <h2>Our purpose &amp; values</h2>
    </div>
    <p style="margin-top:10px;max-width:64ch;color:var(--slate-600);font-size:14px;line-height:1.7">People and services behind a more capable South Africa — that's the short version. Everything we build across our six divisions is judged against the same five things:</p>
    <div class="division-grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">
      ${VALUES.map((v, i) => `
        <div class="card">
          <div class="icon" style="width:36px;height:36px;font-weight:700;font-family:'Fraunces',serif">${i + 1}</div>
          <div style="font-weight:600;margin-top:14px">${v.t}</div>
          <div style="font-size:13px;color:var(--slate-500);margin-top:6px;line-height:1.5">${v.d}</div>
        </div>`).join('')}
    </div>

    <div class="trust-strip" style="display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap">
      <div>
        <div class="eyebrow">GOVERNANCE &amp; COMPLIANCE</div>
        <div style="font-size:13px;color:var(--slate-600);margin-top:6px;max-width:56ch">Personal information is handled under POPIA (5-year retention, consent-based). A PAIA manual, describing how to request access to company records, is available on request.</div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-outline btn-sm" id="openPopiaAbout" type="button">POPIA Policy</button>
        <a class="btn btn-outline btn-sm" href="${waLink('Hi, please send me the Eleskhova Group PAIA manual.')}" target="_blank" rel="noopener">Request PAIA Manual</a>
      </div>
    </div>
  </div>`;
}

function tierClass(style) { return style === 'dark' ? 'tier' : 'tier'; }
function pageRentals() {
  return `
  <div class="page">
    <div class="band dark">
      <div class="hero-blur"></div>
      <div class="tag-row">
        <span class="tag" style="background:#fff;color:var(--navy)">STUDENT RENTALS • FLAGSHIP</span>
        <span class="tag" style="background:var(--amber);color:var(--navy)">SILVER STANDARD</span>
        <span class="tag" style="background:rgba(255,255,255,.1)">1–7 WORKING DAYS GAUTENG</span>
      </div>
      <h1>Silver Standard Appliances.<br>No deposit surprise. Built for res life.</h1>
      <p class="lead">Prices below are per month. Asset tag + surge plug + locked room mandatory. Insurance optional. Theft protocol applies. 30 days notice to cancel.</p>
      <p class="lead" style="margin-top:10px;font-weight:700;color:var(--amber)">No need to buy. Start with 3. Unlock all 8 when you pay well.</p>
      <p style="margin-top:4px;font-size:13px;letter-spacing:.04em;text-transform:uppercase;opacity:.75">Building Assets Not Liabilities</p>
    </div>

    <div class="tier-grid">
      ${TIERS.map(t => {
    const bg = t.style === 'tint' ? 'background:var(--tint);border-color:rgba(0,145,234,.25)' : t.style === 'dark' ? 'background:var(--navy);color:#fff;border-color:var(--navy)' : 'background:#fff;border-color:rgba(0,145,234,.3)';
    const dotc = t.style === 'dark' ? 'background:var(--amber)' : t.style === 'tint' ? 'background:var(--blue)' : 'background:var(--blue-dark)';
    const capStyle = t.style === 'dark' ? 'background:#fff;color:var(--navy)' : 'background:var(--navy);color:#fff';
    const noteColor = t.style === 'dark' ? 'color:rgba(255,255,255,.7)' : 'color:var(--slate-600)';
    return `<div class="tier" style="${bg}">
          <div class="row"><span class="eyebrow">${t.tier}</span><span class="dotc" style="${dotc}"></span></div>
          <div class="max serif">${t.max}</div>
          <span class="cap" style="${capStyle}">${t.cap}</span>
          <div class="note" style="${noteColor}">${t.note}</div>
        </div>`;
  }).join('')}
    </div>

    <div class="mt-lg" style="margin-top:44px">
      <div class="section-head" style="margin-top:0">
        <h2>Price Grid — exact monthly</h2>
        <button class="btn btn-amber btn-sm" data-action="open-survey">Help us improve — 30 sec survey</button>
      </div>
      <div class="price-grid">
        ${PRICE_GRID.map(item => `
          <div class="price-card">
            <div class="head">
              <div class="name">${item.name}</div>
              ${item.note ? `<span class="tagn">${item.note}</span>` : ''}
            </div>
            <div class="variant-row">
              ${item.variants.map(v => `<div class="variant ${v.pop ? 'pop' : ''}">${v.label ? `<span class="lbl">${v.label}</span>` : ''}<b>R${v.price}</b>${v.pop ? icon('star', 12) : ''}</div>`).join('')}
            </div>
          </div>`).join('')}
      </div>

      <div class="info-grid">
        <div class="info-card blue">
          <div class="head">${icon('shield', 16)} Asset Tag &amp; Safety</div>
          <ul><li>Every item asset-tagged (e.g. ELESKHOV-SR-XXX)</li><li>Surge plug mandatory (R80–R120 if needed)</li><li>Locked room policy</li><li>R250 penalty if asset tag is removed</li></ul>
        </div>
        <div class="info-card amber">
          <div class="head">${icon('fileCheck', 16)} Insurance &amp; Theft</div>
          <ul><li>Optional insurance: R35 pm per item, or R90 for a 3-item combo</li><li>Damage excess: Plate R250 · Shelf R350 · Element R400 · Pump R650 · TV 100% new</li><li>Theft: SAPS case + affidavit + forced-entry photos within 24h</li></ul>
        </div>
        <div class="info-card dark">
          <div class="head">${icon('award', 16, '')} Loyalty Reward</div>
          <div><strong style="color:#fff">12 consecutive on-time payments = FREE Kettle OR Iron to KEEP</strong> (your choice). Main appliances remain rental for upgrade/swap. T&amp;Cs apply.</div>
        </div>
        <div class="info-card" style="background:var(--slate-50);border-color:var(--slate-200)">
          <div class="head">${icon('clock', 16)} Cancellation &amp; Collection</div>
          <ul><li>30 days' written WhatsApp notice to cancel</li><li>Collection within 1–7 working days after notice</li><li>R150 cleaning fee if returned dirty</li><li>Deposit refunded in 14–21 days</li></ul>
        </div>
        <div class="info-card" style="background:var(--slate-50);border-color:var(--slate-200)">
          <div class="head">${icon('sparkles', 16)} White Finish Available</div>
          <div style="color:var(--slate-600);font-size:12.5px;margin-top:8px;line-height:1.5">Prefer white instead of silver? Available on request — <strong style="color:var(--navy)">save R20–R30/month</strong> versus the silver-standard price.</div>
        </div>
      </div>
    </div>

    <div class="two-col">
      <div class="card" style="border-radius:24px;padding:28px">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
          <h3 class="serif" style="margin:0;font-size:22px">Application — Student Rentals</h3>
          <span class="badge">POPIA 5 YEARS</span>
        </div>
        <div id="rentalsFormArea">${rentalsFormHTML()}</div>
      </div>
      <div style="display:grid;gap:16px;align-content:start">
        <div class="card" style="background:var(--tint);border-color:rgba(0,145,234,.15)">
          <div style="font-weight:600">Docs Required</div>
          <ul style="list-style:none;padding:0;margin:12px 0 0;display:grid;gap:8px;font-size:13px;color:var(--slate-600)">
            <li style="display:flex;gap:8px">${icon('fileCheck', 16)} ID</li>
            <li style="display:flex;gap:8px">${icon('fileCheck', 16)} Proof of Registration 2026</li>
            <li style="display:flex;gap:8px">${icon('fileCheck', 16)} Proof of Residence (res letter / lease)</li>
            <li style="display:flex;gap:8px">${icon('fileCheck', 16)} Guarantor ID</li>
            <li style="display:flex;gap:8px">${icon('shield', 16)} POPIA compliant, 5 years</li>
          </ul>
        </div>
        <div class="card">
          <div style="font-weight:600">Coverage</div>
          <div class="chip-wrap">${COVERAGE.slice(0, 9).map(c => `<span class="chip">${c}</span>`).join('')}</div>
          <div style="margin-top:14px;font-size:12px;color:var(--slate-500)">Delivery 1–7 working days in Gauteng. Outside Gauteng on request.</div>
        </div>
        <div class="card" style="background:var(--navy);color:#fff">
          <div style="font-size:11px;font-weight:700;letter-spacing:.12em;opacity:.6">PAY A DEPOSIT ONLINE</div>
          <div style="margin-top:8px;font-size:13px;line-height:1.5;opacity:.85">Secure card payment via Yoco — instant confirmation, no cash handling.</div>
          <a class="btn btn-amber btn-block mt-md" href="${CONFIG.yocoLinks.rentalsDeposit}" target="_blank" rel="noopener">${icon('creditCard', 16)} Pay Deposit via Yoco</a>
        </div>
      </div>
    </div>
  </div>`;
}

function rentalsFormHTML(success) {
  if (success) {
    return `
    <div class="success-box">
      <div class="h">Application captured ✓</div>
      <p>It's on its way to <strong>princez@eleskhovagroup.co.za</strong> and our Google Sheet. WhatsApp us on <strong>084 765 6448</strong> to fast-track.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
        <a class="btn btn-dark btn-sm" href="${waLink('Hi, I just applied for Student Rentals. Please fast-track my application.')}" target="_blank" rel="noopener">Fast-track on WhatsApp ${icon('phone', 14)}</a>
        <a class="btn btn-outline btn-sm" href="${CONFIG.yocoLinks.rentalsDeposit}" target="_blank" rel="noopener">${icon('creditCard', 14)} Pay Deposit</a>
        <button class="btn btn-outline btn-sm" data-action="reset-rentals-form">New application</button>
      </div>
    </div>`;
  }
  return `
  <form class="form-grid" id="rentalsForm" novalidate>
    <div><input class="field" name="fullName" placeholder="Full Name *" required></div>
    <div><input class="field" name="phone" type="tel" placeholder="Phone *" required></div>
    <div><input class="field" name="whatsapp" placeholder="WhatsApp (if different)"></div>
    <div><input class="field" name="studentNumber" style="background:#FFFBEB" placeholder="Student Number *" required></div>
    <div class="select-wrap"><select class="field" name="campus" required>
      <option value="">Campus *</option>
      <option>UP Hatfield</option><option>TUT Soshanguve</option><option>TUT Pretoria West</option>
      <option>UJ Auckland Park</option><option>WITS Braamfontein</option><option>UNISA</option>
      <option>Sefako Makgatho</option><option>Other Gauteng</option>
    </select>${icon('chevronDown', 16)}</div>
    <div><input class="field" name="resName" placeholder="Res Name"></div>
    <div class="full"><input class="field" name="resAddress" placeholder="Res Address"></div>
    <div class="full select-wrap"><select class="field" name="period">
      <option value="">Period</option><option>Semester</option><option>10 months</option><option>12 months</option>
    </select>${icon('chevronDown', 16)}</div>
    <div class="full">
      <div style="font-size:12px;font-weight:700;letter-spacing:.1em;color:var(--slate-400);margin-bottom:8px">APPLIANCES WANTED (tick)</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px">
        ${APPLIANCE_CHECKLIST.map(a => `<label class="check-row"><input type="checkbox" name="appliances" value="${esc(a)}"> ${a}</label>`).join('')}
      </div>
    </div>
    <div class="full" style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      ${['Upload ID', 'Proof Reg 2026', 'Proof Res', 'Guarantor ID'].map(l => `
        <label class="upload-row"><span>${l}</span><span style="background:var(--slate-100);padding:3px 8px;border-radius:999px;font-size:10px">Upload</span><input type="file" class="visually-hidden"></label>`).join('')}
    </div>
    <label class="full consent-row"><input type="checkbox" required name="consent"> I consent to Eleskhova Group storing my information for rental vetting per POPIA, for 5 years. Data is stored to a Google Sheet connected to princez@eleskhovagroup.co.za.</label>
    <button type="submit" class="full btn btn-blue" style="margin-top:6px">
      <span class="btn-label">Apply via WhatsApp &amp; Email ${icon('arrow', 16)}</span>
    </button>
  </form>`;
}

function pageAcademy() {
  return `
  <div class="page">
    <div class="two-col">
      <div>
        <span class="badge">ELESKHOVA ACADEMY</span>
        <h1 class="serif" style="font-size:clamp(28px,4.2vw,48px);line-height:.97;margin:16px 0 0">Skills that deploy.<br>Training that works.</h1>
        <p style="margin-top:16px;color:var(--slate-600);line-height:1.7">Accredited courses. Founder BCom final year. SAMTRAC Intro done. Facilitator certified. Grade B &amp; A Security certified. Armed Response certified. Assessor/Moderator in progress. PSIRA Business &amp; Academy E-C, A-B in progress.</p>
        <div style="margin-top:28px;display:grid;grid-template-columns:1fr 1fr;gap:12px">
          ${ACADEMY_COURSES.map(c => `<div class="card" style="display:flex;gap:12px;align-items:center;padding:16px"><div style="width:36px;height:36px;border-radius:10px;background:var(--tint);color:var(--blue-dark);display:flex;align-items:center;justify-content:center;flex-shrink:0">${icon(c.i, 18)}</div><div style="font-weight:500;font-size:13.5px;line-height:1.3">${c.t}</div></div>`).join('')}
        </div>
      </div>
      <div class="card dark-form" style="background:var(--navy);color:#fff;border-radius:24px;padding:28px;border-color:var(--navy)">
        <div class="serif" style="font-size:22px">Request Training Quote</div>
        <form id="academyForm" style="margin-top:20px;display:grid;gap:12px">
          <input class="field" name="fullName" placeholder="Full Name" required>
          <input class="field" name="org" placeholder="Company / Campus">
          <select class="field" name="course">
            <option value="">Select Course</option>
            <option>Supply Chain</option><option>Security Grades</option><option>Cleaning</option><option>Facilitator</option><option>Youth Into Logistics (Schools)</option>
          </select>
          <textarea class="field textarea" name="details" placeholder="Number of learners, dates..."></textarea>
          <button class="btn btn-amber" type="submit">Request Quote via WhatsApp</button>
          <div style="font-size:11px;opacity:.5">→ saved to our Google Sheet + princez@eleskhovagroup.co.za</div>
        </form>
        <a class="btn btn-outline btn-block mt-md" style="background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.15);color:#fff" href="${CONFIG.yocoLinks.academyQuote}" target="_blank" rel="noopener">${icon('creditCard', 16)} Pay for a Course via Yoco</a>
      </div>
    </div>

    <div class="band dark" style="margin-top:40px">
      <div class="tag-row">
        <span class="tag" style="background:var(--amber);color:var(--navy);font-weight:700">NEW · SCHOOLS PROGRAMME</span>
        <span class="tag" style="background:rgba(255,255,255,.1)">GRADE 11–12 &amp; MATRICULANTS</span>
      </div>
      <h1 style="font-size:clamp(24px,3.4vw,38px)">Youth Into Logistics.<br>A career day, not a career fair.</h1>
      <p class="lead" style="max-width:60ch">Most learners reach matric never having heard of a career in supply chain or logistics. We run half-day sessions at partner high schools showing what the industry actually looks like — then hand learners straight into TETA's funded learnership programme, with Eleskhova Academy as their training provider from day one.</p>
      <div style="margin-top:24px;display:flex;gap:10px;flex-wrap:wrap">
        <a class="btn btn-block" style="background:#fff;color:var(--navy);flex:0 1 auto" href="${waLink('Hi, I would like to book a Youth Into Logistics career day for our school.')}" target="_blank" rel="noopener">${icon('phone', 16)} Book a Career Day</a>
        <a class="btn btn-outline" style="background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.2);color:#fff" href="${waLink('Hi, I would like to know more about partnering on the Youth Into Logistics programme.')}" target="_blank" rel="noopener">Partner With Us</a>
      </div>
    </div>
  </div>`;
}

function pageFacilities() {
  return `
  <div class="page">
    <div class="band tint">
      <span class="tag" style="background:#fff;border:1px solid var(--slate-200)">FACILITIES • TRAIN → DEPLOY → MANAGE</span>
      <h1>Cleaners &amp; Guards<br>trained by us, managed by us.</h1>
      <div class="info-grid" style="position:relative;margin-top:28px">
        ${FACILITIES_SERVICES.map(s => `
          <div class="card">
            <div style="width:40px;height:40px;border-radius:12px;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center">${icon(s.i, 18)}</div>
            <div style="font-weight:600;margin-top:12px">${s.t}</div>
            <div style="font-size:13px;color:var(--slate-500);margin-top:4px;line-height:1.5">${s.d}</div>
          </div>`).join('')}
      </div>
      <div style="position:relative;margin-top:28px;display:flex;gap:8px;align-items:center;font-size:13px;font-weight:500">
        <span style="background:var(--navy);color:#fff;padding:6px 14px;border-radius:999px">Train</span>${icon('arrow', 14)}
        <span style="background:#fff;border:1px solid var(--slate-200);padding:6px 14px;border-radius:999px">Deploy</span>${icon('arrow', 14)}
        <span style="background:var(--amber);padding:6px 14px;border-radius:999px;font-weight:700">Manage</span>
      </div>
      <a class="btn btn-blue mt-lg" style="position:relative" href="${waLink('Hi Eleskhova Group, I need a Facilities quote (cleaning / security / maintenance).')}" target="_blank" rel="noopener">Request Facilities Quote ${icon('arrow', 16)}</a>
    </div>
  </div>`;
}

function pageLogistics() {
  return `
  <div class="page">
    <div class="two-col">
      <div>
        <span class="badge">LOGISTICS &amp; CONSULTING • 20 YEARS</span>
        <h1 class="serif" style="font-size:clamp(28px,4.2vw,48px);line-height:.97;margin:16px 0 0">SOPs, Risk, SADC,<br>Unions. We've done it.</h1>
        <p style="margin-top:16px;color:var(--slate-600);line-height:1.7">Target: courier companies, SMMEs, student logistics. 20 years of national-company SADC coverage: SOP &amp; operational risk assessments, cross-border risk assessments, union negotiations, chairing hearings, and bakkie assistance.</p>
        <p style="margin-top:8px;font-size:13px;color:var(--slate-500);line-height:1.6">HIRA qualified · Six Sigma Green Belt (CSSGB) · Lean Management process improvement. Focus: IoDSA (Governance) · SAPICS/CILTSA (Supply Chain) · ASCM (International Certification).</p>
        <div style="margin-top:22px;display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${LOGISTICS_LIST.map(l => `<div class="card" style="display:flex;gap:8px;font-size:13px;font-weight:500;padding:14px">${icon('check', 16)}<span>${l}</span></div>`).join('')}
        </div>
      </div>
      <div class="card" style="border-radius:24px;padding:28px">
        <div class="serif" style="font-size:22px">Book a Consulting Call</div>
        <p style="font-size:13px;color:var(--slate-500);margin-top:6px">Pick a slot straight on our calendar — no back-and-forth.</p>
        <a class="btn btn-dark btn-block mt-md" href="${CONFIG.googleCalendarBookingURL}" target="_blank" rel="noopener">${icon('calendar', 16)} Book via Google Calendar</a>
        <div style="text-align:center;font-size:11px;color:var(--slate-400);margin:14px 0">— or send us the details —</div>
        <form id="logisticsForm" style="display:grid;gap:12px">
          <input class="field" name="fullName" placeholder="Name / Company" required>
          <select class="field" name="service">
            <option value="">Service Needed</option>
            ${LOGISTICS_LIST.map(l => `<option>${l}</option>`).join('')}
          </select>
          <textarea class="field textarea" name="details" placeholder="Challenge to solve..."></textarea>
          <button class="btn btn-blue" type="submit">Book via WhatsApp</button>
        </form>
        <div style="margin-top:14px;display:flex;gap:8px;align-items:center;font-size:12px;color:var(--slate-500)">${icon('globe', 14)} SADC • Botswana • Eswatini</div>
      </div>
    </div>
  </div>`;
}

function pageTenders() {
  return `
  <div class="page">
    <div class="band dark">
      <span class="tag" style="background:rgba(255,255,255,.1)">TENDERS • COMPLIANCE TIMELINE</span>
      <h1>Training, Security, Cleaning,<br>Logistics — tender ready.</h1>
      <div style="position:relative;margin-top:28px;display:grid;gap:24px" class="two-col">
        <div style="display:grid;gap:10px">
          ${TENDER_SCOPE.map(l => `<div style="display:flex;gap:8px;font-size:13px;line-height:1.5;opacity:.85">${icon('check', 16, '')}<span>${l}</span></div>`).join('')}
        </div>
        <div style="background:#fff;color:var(--navy);border-radius:20px;padding:22px">
          <div style="font-weight:600">Compliance Timeline</div>
          <div style="margin-top:12px;display:grid;gap:8px;font-size:12px">
            ${TENDER_TIMELINE.map(t => `<div style="display:flex;justify-content:space-between"><span>${t.y}</span><span>${t.v}</span></div>`).join('')}
          </div>
          <div style="height:1px;background:var(--slate-100);margin:12px 0"></div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <a class="btn btn-dark btn-sm" style="flex:1" href="${waLink('Hi, please send the Eleskhova Group company profile.')}" target="_blank" rel="noopener">Request Company Profile</a>
            <a class="btn btn-blue btn-sm" style="flex:1" href="${waLink('Hi, tender partnership for Training/Security/Cleaning/Logistics')}" target="_blank" rel="noopener">Request Partnership</a>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

let emporiumFilter = 'All';
function pageEmporium() {
  const cats = ['All', 'Girls', 'Boys', 'Shoes', 'Accessories', 'Fragrance', 'Bundles', 'Skincare'];
  const items = PRODUCTS.filter(p => emporiumFilter === 'All' || p.cat === emporiumFilter);
  return `
  <div class="page">
    <div style="margin-top:32px;background:var(--navy);border:2px dashed var(--amber);border-radius:20px;padding:22px 28px;display:flex;align-items:center;gap:16px;justify-content:center;text-align:center">
      <div>
        <div style="font-family:'Georgia','Fraunces',serif;font-weight:800;font-size:clamp(24px,4vw,38px);color:var(--amber);letter-spacing:-.01em">STILL TO COME — 2027</div>
        <div style="margin-top:6px;font-size:14px;color:#cbd5e1;font-weight:600">The Emporium store is not live yet. Everything below is a preview of what's coming — no orders or payments yet.</div>
      </div>
    </div>
    <div style="margin-top:24px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:16px">
      <div>
        <span class="badge" style="background:var(--amber);color:var(--navy)">${icon('sparkles', 12)} CHWANELESKHOVA • ONE BRAND, DIFFERENT STUFF</span>
        <h1 class="serif" style="font-size:clamp(30px,4.6vw,52px);line-height:.95;margin:16px 0 0">Owl Premium.<br>Kids &amp; Lifestyle.</h1>
        <p style="margin-top:10px;color:var(--slate-600);max-width:48ch;font-size:14px;line-height:1.6">Premium kids &amp; lifestyle — Girls, Boys, Shoes, Accessories, Fragrance, Bundles, Skincare. Owl-embroidered clothing, caps, socks, the Owl Premium cologne duo, plus balm, acne ointment and salicylic serum. No prices yet — request the catalogue on WhatsApp.</p>
      </div>
      <div class="filter-row">${cats.map(c => `<button class="filter-chip" data-filter="${c}" aria-pressed="${emporiumFilter === c}">${c}</button>`).join('')}</div>
    </div>
    <div class="product-grid">
      ${items.map(p => `
        <div class="product-card">
          <div class="imgwrap">${p.src
      ? `<img src="${p.src}" alt="${esc(p.title)}" loading="lazy">`
      : `<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:linear-gradient(135deg,var(--tint),var(--slate-50));color:var(--blue-dark)">${icon(p.icon || 'sparkles', 30)}<span style="font-size:11px;font-weight:600;color:var(--slate-500)">Photo coming soon</span></div>`}</div>
          <div class="body">
            <div class="top"><span class="tagx">${p.tag}</span><span class="cat">${p.cat}</span></div>
            <div class="name">${p.title}</div>
            <div class="actions">
              <a class="btn btn-dark" href="${waLink('Hi, please send the catalogue for ' + p.title + ' — Chwaneleskhova')}" target="_blank" rel="noopener">Catalogue ${icon('phone', 12)}</a>
              <span class="noprice">No price yet</span>
            </div>
          </div>
        </div>`).join('')}
    </div>
    <div style="margin-top:32px;background:var(--navy);color:#fff;border-radius:24px;padding:28px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px">
      <div>
        <div class="serif" style="font-size:22px">Chwaneleskhova — a personal brand centered around kids clothing &amp; lifestyle</div>
        <div style="font-size:13px;opacity:.7;margin-top:6px">One brand, different stuff. Owl Premium aesthetic. Request the catalogue on WhatsApp → 084 765 6448</div>
      </div>
      <a class="btn btn-amber" href="${waLink('Hi, request the full Chwaneleskhova catalogue')}" target="_blank" rel="noopener">Request Catalogue ${icon('phone', 16)}</a>
    </div>
  </div>`;
}

function pageContact() {
  return `
  <div class="page">
    <div class="two-col">
      <div>
        <div class="hero-card" style="padding:32px">
          <h1 class="serif" style="font-size:clamp(28px,4vw,36px);line-height:.97;position:relative">Contact Eleskhova Group</h1>
          <div class="info-grid" style="position:relative;margin-top:22px;grid-template-columns:1fr 1fr">
            <div class="card">
              <div style="font-size:11px;font-weight:700;letter-spacing:.12em;color:var(--slate-400)">WHATSAPP BUSINESS</div>
              <div style="font-weight:700;font-size:18px;margin-top:4px">084 765 6448</div>
              <div style="margin-top:12px;aspect-ratio:1/1;border:2px dashed var(--slate-200);border-radius:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:16px">
                <div style="width:56px;height:56px;background:var(--navy);border-radius:14px;display:flex;align-items:center;justify-content:center;color:#fff">${icon('phone', 26)}</div>
                <div style="margin-top:10px;font-weight:600;font-size:12px">SCAN TO APPLY &amp; CHAT</div>
                <div style="font-size:11px;color:var(--slate-500)">WhatsApp Business Instant</div>
              </div>
              <a class="btn btn-green btn-block mt-md" href="${waLink('Hi Eleskhova Group')}" target="_blank" rel="noopener">Open WhatsApp</a>
            </div>
            <div style="display:grid;gap:14px">
              <div class="card">
                <div style="font-size:11px;font-weight:700;letter-spacing:.12em;color:var(--slate-400)">EMAILS &amp; WEB</div>
                <div style="margin-top:8px;font-size:13px;display:grid;gap:2px">
                  <span style="font-weight:600">princez@eleskhovagroup.co.za</span>
                  <span style="font-weight:600">eleskhovagroup.com / eleskhovagroup.co.za</span>
                  ${CONFIG.linkedinURL && CONFIG.linkedinURL.startsWith('http') ? `<span style="margin-top:6px">${linkedinLinkHTML('')}</span>` : ''}
                </div>
              </div>
              <div class="card" style="background:var(--navy);color:#fff">
                <div style="font-size:11px;font-weight:700;letter-spacing:.12em;opacity:.6">ADDRESS</div>
                <div style="margin-top:8px;font-size:13px;line-height:1.6">Amampondo Dr<br>Rooihuiskraal North<br>Centurion, 0157</div>
                <div style="margin-top:10px;display:flex;gap:6px;font-size:11px">
                  <span style="background:rgba(255,255,255,.1);padding:4px 10px;border-radius:999px">Gauteng HQ</span>
                  <span style="background:var(--amber);color:var(--navy);font-weight:700;padding:4px 10px;border-radius:999px">SADC Ready</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card mt-lg" style="position:relative">
            <div style="font-size:11px;font-weight:700;letter-spacing:.12em;color:var(--slate-400)">COVERAGE</div>
            <div class="chip-wrap">${COVERAGE.map(c => `<span class="chip">${c}</span>`).join('')}</div>
          </div>
        </div>
        <div class="card mt-lg">
          <div style="font-weight:600;font-size:13px">Docs Required — POPIA compliant, 5 years</div>
          <div style="margin-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:12px;color:var(--slate-600)">
            <div>• ID</div><div>• Proof Reg 2026</div><div>• Proof of Residence</div><div>• Guarantor ID</div>
          </div>
        </div>
      </div>
      <div class="card" style="border-radius:28px;padding:28px">
        <div class="serif" style="font-size:22px">Send a Message</div>
        <div style="font-size:13px;color:var(--slate-500)">Goes straight to our Google Sheet — auto-captured.</div>
        <form id="contactForm" style="margin-top:22px;display:grid;gap:12px">
          <input class="field" name="fullName" placeholder="Full Name" required>
          <input class="field" name="company" placeholder="Company (optional)">
          <select class="field" name="service">
            <option value="">Service Needed</option>
            <option>Student Rentals</option><option>Academy</option><option>Facilities</option>
            <option>Logistics &amp; Consulting</option><option>Tenders</option><option>Emporium</option>
          </select>
          <textarea class="field textarea" style="min-height:120px" name="message" placeholder="Message..." required></textarea>
          <button class="btn btn-blue" type="submit">Send Message</button>
          <div style="font-size:11px;color:var(--slate-400);text-align:center">All forms auto-capture to our Google Sheet, connected to princez@eleskhovagroup.co.za</div>
        </form>
        <div class="card mt-lg" style="background:var(--tint);border-color:rgba(0,145,234,.15)">
          <div style="font-size:11px;font-weight:700;letter-spacing:.1em;color:var(--blue-dark)">PAY ONLINE</div>
          <div style="font-size:12.5px;color:var(--slate-600);margin-top:6px">Prefer to pay now? Use our secure Yoco payment link.</div>
          <a class="btn btn-dark btn-block mt-sm" href="${CONFIG.yocoLinks.generalPayment}" target="_blank" rel="noopener">${icon('creditCard', 16)} Pay via Yoco</a>
        </div>
      </div>
    </div>

    <div class="section-head">
      <h2>Frequently asked questions</h2>
    </div>
    <div class="mt-lg" style="max-width:820px;display:grid;gap:10px">
      ${FAQ.map((f, i) => `
        <div class="card faq-item" data-faq="${i}" style="padding:0;overflow:hidden">
          <button type="button" class="faq-toggle" data-action="toggle-faq" data-faq-index="${i}" style="width:100%;text-align:left;padding:18px 20px;display:flex;justify-content:space-between;align-items:center;gap:12px;font-weight:600;font-size:14.5px">
            <span>${esc(f.q)}</span>
            <span class="faq-chevron" style="flex-shrink:0;transition:transform .2s">${icon('chevronDown', 18)}</span>
          </button>
          <div class="faq-answer" style="max-height:0;overflow:hidden;transition:max-height .25s ease">
            <div style="padding:0 20px 18px;font-size:13.5px;color:var(--slate-600);line-height:1.6">${esc(f.a)}</div>
          </div>
        </div>`).join('')}
    </div>
  </div>`;
}

/* Fault reporting — reached via a QR sticker on each rented appliance.
   The QR encodes a URL like index.html?tag=ELESKHOV-SR-001#report so the
   Asset Tag field is pre-filled automatically. See qr-labels.html to
   generate and print the stickers. */
function pageReport() {
  const params = new URLSearchParams(location.search);
  const prefillTag = esc(params.get('tag') || '');
  return `
  <div class="page">
    <div class="band dark" style="margin-top:32px">
      <span class="tag" style="background:rgba(255,255,255,.1)">REPORT AN ISSUE</span>
      <h1 style="font-size:clamp(28px,4vw,40px)">Something wrong with a rented appliance?</h1>
      <p class="lead">Tell us the asset tag (printed on the sticker) and what's wrong — this goes straight to our team, with a WhatsApp fast-track option.</p>
    </div>
    <div class="card mt-lg" style="max-width:600px;border-radius:24px;padding:28px">
      <div class="serif" style="font-size:20px">Fault Report</div>
      <form id="reportForm" style="margin-top:20px;display:grid;gap:12px">
        <input class="field" name="assetTag" placeholder="Asset Tag (e.g. ELESKHOV-SR-001) *" value="${prefillTag}" required>
        <input class="field" name="fullName" placeholder="Your Full Name *" required>
        <input class="field" name="phone" type="tel" placeholder="WhatsApp / Phone Number *" required>
        <div class="select-wrap">
          <select class="field" name="urgency" required>
            <option value="">How urgent is this? *</option>
            <option>Not urgent — general question</option>
            <option>Needs attention — not working properly</option>
            <option>Urgent — unsafe or completely broken</option>
          </select>${icon('chevronDown', 16)}
        </div>
        <textarea class="field textarea" name="issueDescription" placeholder="Describe the issue..." required></textarea>
        <button type="submit" class="btn btn-blue">Send Report ${icon('arrow', 16)}</button>
        <div style="font-size:11px;color:var(--slate-400);text-align:center">Goes to our Google Sheet — WhatsApp 084 765 6448 for anything urgent right now.</div>
      </form>
    </div>
  </div>`;
}

const PAGE_BUILDERS = {
  home: pageHome, about: pageAbout, rentals: pageRentals, academy: pageAcademy,
  facilities: pageFacilities, logistics: pageLogistics, tenders: pageTenders,
  emporium: pageEmporium, contact: pageContact, report: pageReport
};

function renderPage() {
  const main = document.getElementById('main');
  main.innerHTML = PAGE_BUILDERS[currentPage] ? PAGE_BUILDERS[currentPage]() : pageHome();
  document.getElementById('headerQuoteLink').href = waLink('Hi Eleskhova Group, I need a quote for Student Rentals / Academy / Facilities');
  document.getElementById('fabWhatsapp').href = waLink('Hi Eleskhova Group, I need help with Student Rentals / Academy / Facilities / Logistics / Tenders / Emporium');
}

/* =====================================================================
   MODALS (Survey, POPIA, WhatsApp auto-reply setup)
   ===================================================================== */
function openModal(html) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.setAttribute('data-modal-overlay', '');
  overlay.innerHTML = html;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', escCloser);
  return overlay;
}
function escCloser(e) { if (e.key === 'Escape') closeModal(); }
function closeModal() {
  document.querySelectorAll('[data-modal-overlay]').forEach(m => m.remove());
  document.body.style.overflow = '';
  document.removeEventListener('keydown', escCloser);
}

function surveyModal() {
  const questions = ['Must-have vs nice-to-have appliances?', "What combo would make res life easier?", "What's missing that we should add?", 'What frustrates you about other rental companies?', "What don't you want?", 'Delivery preference? (same-day / 1-3 days / weekend)'];
  openModal(`
    <div class="modal">
      <div class="modal-head">
        <div><div style="font-weight:700">30-sec Survey — Help us improve</div><div style="font-size:12px;color:var(--slate-500)">No price questions — just your res-life experience.</div></div>
        <button class="modal-close" data-action="close-modal">${icon('x', 16)}</button>
      </div>
      <form class="modal-body" id="surveyForm" style="display:grid;gap:18px">
        ${questions.map((q, i) => `<div><div style="font-size:13px;font-weight:500">${q}</div><textarea class="field textarea" style="margin-top:8px;min-height:60px" name="q${i + 1}" placeholder="Your answer..."></textarea></div>`).join('')}
        <button class="btn btn-dark btn-block" type="submit">Submit Survey</button>
        <div style="font-size:11px;color:var(--slate-400);text-align:center">Stored in our Google Sheet • POPIA 5y</div>
      </form>
    </div>`);
}

function popiaModal() {
  openModal(`
    <div class="modal">
      <div class="modal-head">
        <div style="font-weight:700;font-size:18px">POPIA — Data Handling</div>
        <button class="modal-close" data-action="close-modal">${icon('x', 16)}</button>
      </div>
      <div class="modal-body" style="font-size:13px;line-height:1.7;color:var(--slate-600);display:grid;gap:12px">
        <p><strong style="color:var(--navy)">Purpose:</strong> Rental vetting, training enrolment, facilities &amp; logistics quoting, tender communication, Emporium catalogue requests.</p>
        <p><strong style="color:var(--navy)">Retention:</strong> 5 years per POPIA, stored in a Google Sheet connected to princez@eleskhovagroup.co.za.</p>
        <p><strong style="color:var(--navy)">Consent:</strong> Checkbox required on all forms: "I consent to Eleskhova Group storing my information for rental vetting per POPIA, for 5 years."</p>
        <p><strong style="color:var(--navy)">Rights:</strong> Access, correction and deletion on request via princez@eleskhovagroup.co.za or 084 765 6448.</p>
        <p><strong style="color:var(--navy)">Security:</strong> Asset tag, surge plug, locked room, affidavit for theft, 30-day cancellation notice.</p>
      </div>
    </div>`);
}

/* =====================================================================
   FORM VALIDATION HELPERS
   ===================================================================== */
function validateForm(form) {
  let ok = true;
  form.querySelectorAll('[data-field-error]').forEach(e => e.remove());
  form.querySelectorAll('.invalid').forEach(e => e.classList.remove('invalid'));
  form.querySelectorAll('[required]').forEach(field => {
    const val = field.type === 'checkbox' ? field.checked : field.value.trim();
    if (!val) {
      ok = false;
      field.classList.add('invalid');
      const err = document.createElement('div');
      err.className = 'field-error';
      err.setAttribute('data-field-error', '');
      err.textContent = 'This field is required';
      field.closest('div,label').after(err);
    }
  });
  return ok;
}

function setLoading(button, loading) {
  if (!button) return;
  if (loading) {
    button.dataset.originalHtml = button.innerHTML;
    button.innerHTML = `<span class="spin"></span> Sending...`;
    button.disabled = true;
  } else {
    if (button.dataset.originalHtml) button.innerHTML = button.dataset.originalHtml;
    button.disabled = false;
  }
}

/* =====================================================================
   EVENT DELEGATION
   ===================================================================== */
document.addEventListener('click', e => {
  const navBtn = e.target.closest('[data-nav]');
  if (navBtn) { navigate(navBtn.getAttribute('data-nav')); return; }

  if (e.target.closest('#menuToggle')) {
    const nav = document.getElementById('mobileNav');
    const btn = document.getElementById('menuToggle');
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    return;
  }

  if (e.target.closest('#openPopia') || e.target.closest('#openPopiaAbout')) { popiaModal(); return; }
  if (e.target.closest('[data-action="open-survey"]')) { surveyModal(); return; }
  if (e.target.closest('[data-action="close-modal"]')) { closeModal(); return; }
  if (e.target.closest('[data-action="reset-rentals-form"]')) {
    document.getElementById('rentalsFormArea').innerHTML = rentalsFormHTML(false);
    return;
  }

  const filterBtn = e.target.closest('[data-filter]');
  if (filterBtn) { emporiumFilter = filterBtn.getAttribute('data-filter'); renderPage(); return; }

  const faqToggle = e.target.closest('[data-action="toggle-faq"]');
  if (faqToggle) {
    const item = faqToggle.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const chevron = item.querySelector('.faq-chevron');
    const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
    document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = '0px');
    document.querySelectorAll('.faq-chevron').forEach(c => c.style.transform = 'rotate(0deg)');
    if (!isOpen) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      chevron.style.transform = 'rotate(180deg)';
    }
    return;
  }
});

document.addEventListener('submit', e => {
  const form = e.target;

  if (form.id === 'rentalsForm') {
    e.preventDefault();
    if (!validateForm(form)) { toast('Please fill in all required fields.'); return; }
    const submitBtn = form.querySelector('button[type=submit]');
    setLoading(submitBtn, true);
    const fd = new FormData(form);
    const appliances = fd.getAll('appliances');
    const payload = { type: 'rental_application', fullName: fd.get('fullName'), phone: fd.get('phone'), whatsapp: fd.get('whatsapp'), studentNumber: fd.get('studentNumber'), campus: fd.get('campus'), resName: fd.get('resName'), resAddress: fd.get('resAddress'), period: fd.get('period'), appliances: appliances.join(', ') };
    submitToSheet(payload).finally(() => {
      setLoading(submitBtn, false);
      document.getElementById('rentalsFormArea').innerHTML = rentalsFormHTML(true);
      toast('Application captured — opening WhatsApp to fast-track!');
      window.open(waLink(`Hi, I just applied for Student Rentals. Name: ${payload.fullName || ''}. Campus: ${payload.campus || ''}. Appliances: ${payload.appliances || 'TBC'}. Please fast-track my application.`), '_blank');
    });
    return;
  }

  if (form.id === 'academyForm') {
    e.preventDefault();
    if (!validateForm(form)) { toast('Please fill in all required fields.'); return; }
    const submitBtn = form.querySelector('button[type=submit]');
    setLoading(submitBtn, true);
    const fd = new FormData(form);
    const payload = { type: 'academy_quote', fullName: fd.get('fullName'), org: fd.get('org'), course: fd.get('course'), details: fd.get('details') };
    submitToSheet(payload).finally(() => {
      setLoading(submitBtn, false);
      toast('Quote request captured — we’ll WhatsApp you on 084 765 6448.');
      window.open(waLink(`Hi, I'd like a training quote. Course: ${payload.course || 'TBC'}. ${payload.details || ''}`), '_blank');
      form.reset();
    });
    return;
  }

  if (form.id === 'logisticsForm') {
    e.preventDefault();
    if (!validateForm(form)) { toast('Please fill in all required fields.'); return; }
    const submitBtn = form.querySelector('button[type=submit]');
    setLoading(submitBtn, true);
    const fd = new FormData(form);
    const payload = { type: 'logistics_consulting', fullName: fd.get('fullName'), service: fd.get('service'), details: fd.get('details') };
    submitToSheet(payload).finally(() => {
      setLoading(submitBtn, false);
      toast('Consulting request captured — opening WhatsApp.');
      window.open(waLink(`Hi, consulting request. Service: ${payload.service || 'TBC'}. ${payload.details || ''}`), '_blank');
      form.reset();
    });
    return;
  }

  if (form.id === 'contactForm') {
    e.preventDefault();
    if (!validateForm(form)) { toast('Please fill in all required fields.'); return; }
    const submitBtn = form.querySelector('button[type=submit]');
    setLoading(submitBtn, true);
    const fd = new FormData(form);
    const payload = { type: 'contact_message', fullName: fd.get('fullName'), company: fd.get('company'), service: fd.get('service'), message: fd.get('message') };
    submitToSheet(payload).finally(() => {
      setLoading(submitBtn, false);
      toast('Message sent — we’ll reply shortly. WhatsApp 084 765 6448 to fast-track.');
      form.reset();
    });
    return;
  }

  if (form.id === 'surveyForm') {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type=submit]');
    setLoading(submitBtn, true);
    const fd = new FormData(form);
    const payload = { type: 'survey', q1: fd.get('q1'), q2: fd.get('q2'), q3: fd.get('q3'), q4: fd.get('q4'), q5: fd.get('q5'), delivery_pref: fd.get('q6') };
    submitToSheet(payload).finally(() => {
      setLoading(submitBtn, false);
      closeModal();
      toast('Thanks! Your survey answers were captured.');
    });
    return;
  }

  if (form.id === 'reportForm') {
    e.preventDefault();
    if (!validateForm(form)) { toast('Please fill in all required fields.'); return; }
    const submitBtn = form.querySelector('button[type=submit]');
    setLoading(submitBtn, true);
    const fd = new FormData(form);
    const payload = { type: 'fault_report', assetTag: fd.get('assetTag'), fullName: fd.get('fullName'), phone: fd.get('phone'), urgency: fd.get('urgency'), issueDescription: fd.get('issueDescription') };
    submitToSheet(payload).finally(() => {
      setLoading(submitBtn, false);
      toast('Report sent — thank you. We\'ll follow up shortly.');
      if (payload.urgency && payload.urgency.indexOf('Urgent') === 0) {
        window.open(waLink(`URGENT fault report — Asset Tag: ${payload.assetTag}. ${payload.issueDescription}`), '_blank');
      }
      form.reset();
      form.querySelector('input[name=assetTag]').value = payload.assetTag;
    });
    return;
  }
});

/* Clear field-level invalid state as the user types/selects */
document.addEventListener('input', e => {
  if (e.target.classList && e.target.classList.contains('invalid')) {
    e.target.classList.remove('invalid');
    const err = e.target.closest('div,label').querySelector('[data-field-error]');
    if (err) err.remove();
  }
});

/* =====================================================================
   INIT
   ===================================================================== */
document.getElementById('year').textContent = new Date().getFullYear();
renderNav();
renderPage();

/* Cookie / analytics notice — simple transparency banner, not a hard
   consent gate (GA already loads; South Africa's POPIA does not require
   blocking analytics behind consent the way EU GDPR does for equivalent
   anonymised traffic stats). Shown once per browser via localStorage. */
if (!localStorage.getItem('eleskhova_cookie_ack')) {
  document.getElementById('cookieNotice').style.display = 'block';
}
document.getElementById('cookieAccept').addEventListener('click', () => {
  localStorage.setItem('eleskhova_cookie_ack', '1');
  document.getElementById('cookieNotice').style.display = 'none';
});
document.getElementById('cookiePopiaLink').addEventListener('click', () => {
  document.getElementById('cookieNotice').style.display = 'none';
  popiaModal();
});
