/**
 * home-logo-bar.js — Homepage Client Logo Bar Section Builder
 *
 * Extracted pattern from home-hero.js. Produces Divi 5 block markup.
 * Uses shared lib modules instead of inline functions.
 *
 * ContentSpec: §3.2 "Client Logo Bar" (lines 197-266)
 */

const fs = require('fs');
const path = require('path');
const { textModule, codeModule, htmlBlock, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../../lib/modules');
const css = require('../../lib/css-assembler');

// Logo images directory
const LOGO_DIR = path.join(__dirname, '..', '..', '..', 'logos');

// ────────────────────────────────────────────────────────────────
// SPEC — Design tokens from ContentSpec_Home_Divi5_2.0.md §3.2
// ────────────────────────────────────────────────────────────────
const SPEC = {
  section: {
    background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)', // line 207
    padding: '60px 0', // line 207
  },
  label: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '13px',           // line 208
    fontWeight: '500',          // line 208
    letterSpacing: '0.15em',    // line 208
    textTransform: 'uppercase', // line 208
    color: '#5b6b80',           // line 208
    textAlign: 'center',        // line 208
  },
  logo: {
    height: '108px',            // line 228
    maxWidth: '126px',          // line 228
    filterDefault: 'grayscale(100%) opacity(0.45)', // line 229
    filterHover: 'grayscale(0%) opacity(1)',        // line 230
  },
  companyName: {
    fontFamily: "'Noto Sans', sans-serif",
    fontSize: '30px',           // line 231
    fontWeight: '600',          // line 231
    color: '#334155',           // line 231
    lineHeight: '1.25',         // fidelity: 37.5px at 30px
    opacityDefault: '0.55',     // line 231
    opacityHover: '1',          // line 231
  },
  subtitle: {
    fontSize: '16px',           // line 232
    fontWeight: '400',          // line 232
    color: '#5b6b80',           // line 232
    textTransform: 'uppercase', // line 232
    letterSpacing: '0.06em',    // line 232
  },
  marquee: {
    animationDuration: '35s',   // line 234
    maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)', // line 234
  },
  stats: {
    valueFontFamily: "'Noto Sans', sans-serif",
    valueSize: '28px',          // line 255
    valueWeight: '700',         // line 255
    valueColor: '#000864',      // line 255
    valueLineHeight: '1.2',     // line 255
    labelSize: '13px',          // line 255
    labelColor: '#5b6b80',      // line 255
    marginTop: '4px',           // line 255
  },
};

// ════════════════════════════════════════════════════════════════
// CLIENT LOGOS DATA
// ════════════════════════════════════════════════════════════════

const CLIENTS = [
  { name: 'Cal-Comp Electronics', subtitle: 'SET: CCET', initials: 'CC', color: '#0369a1', logo: 'calcomp.png' },
  { name: 'TTS Plastic', subtitle: 'Injection Molding', initials: 'TTS', color: '#dc2626', logo: 'tts-plastic.png' },
  { name: 'Yeong Guan Energy', subtitle: 'TWSE: 1589', initials: 'YG', color: '#059669', logo: 'yeong-guan.jpg' },
  { name: 'S.T.K. Steel', subtitle: 'Stainless Steel', initials: 'STK', color: '#7c3aed', logo: 'stk-steel.png' },
  { name: 'Goldensea Hi-Tech', subtitle: 'Specialty Chemicals', initials: 'GH', color: '#ea580c', logo: 'goldensea.png' },
  { name: 'Chelic Corporation', subtitle: 'TWSE: 4555', initials: 'CHE', color: '#0891b2', logo: 'chelic.png' },
  { name: 'Chung Tai Rubber', subtitle: 'Vibration Control', initials: 'CTR', color: '#475569', logo: 'ctr.png' },
  { name: 'Haidilao International', subtitle: 'HKEX: 6862', initials: 'HDL', color: '#dc2626', logo: 'haidilao.png' },
];

// Pre-encode logos as Base64 data URIs at build time
function getLogoDataUri(filename) {
  const filePath = path.join(LOGO_DIR, filename);
  if (!fs.existsSync(filePath)) return null;
  const ext = path.extname(filename).slice(1);
  const mime = ext === 'jpg' ? 'image/jpeg' : 'image/png';
  const b64 = fs.readFileSync(filePath).toString('base64');
  return `data:${mime};base64,${b64}`;
}

// ════════════════════════════════════════════════════════════════
// LOGO MARQUEE HTML
// ════════════════════════════════════════════════════════════════

function logoItemHTML(client, i, ariaHidden) {
  const dataUri = getLogoDataUri(client.logo);
  const logoInner = dataUri
    ? `<img src="${dataUri}" alt="${client.name}" loading="lazy" style="max-height:100%;max-width:100%;object-fit:contain;">`
    : `<div class="logo-bar-placeholder" style="background:${client.color}"><span>${client.initials}</span></div>`;
  const ariaAttr = ariaHidden ? ' aria-hidden="true"' : '';
  return `
    <div class="logo-bar-item"${ariaAttr}>
      <div class="logo-bar-logo" data-client="${i + 1}">
        ${logoInner}
      </div>
      <div class="logo-bar-text">
        <div class="logo-bar-name">${client.name}</div>
        <small class="logo-bar-subtitle">${client.subtitle}</small>
      </div>
    </div>`;
}

function getLogoMarqueeHTML() {
  // Generate logo items (8 real + 8 aria-hidden clones for seamless loop)
  const logoItems = CLIENTS.map((client, i) => logoItemHTML(client, i, false)).join('');
  const cloneItems = CLIENTS.map((client, i) => logoItemHTML(client, i, true)).join('');

  return `
<div class="logo-bar-marquee-wrapper">
  <div class="logo-bar-marquee">
    ${logoItems}
    ${cloneItems}
  </div>
</div>
`;
}

// ════════════════════════════════════════════════════════════════
// STATS ROW HTML
// ════════════════════════════════════════════════════════════════

function getStatsHTML() {
  return `
<div class="logo-bar-stats">
  <div class="logo-bar-stat">
    <div class="logo-bar-stat-value">50,000+</div>
    <div class="logo-bar-stat-label">Factories Worldwide</div>
  </div>
  <div class="logo-bar-stat">
    <div class="logo-bar-stat-value">44</div>
    <div class="logo-bar-stat-label">Years in Manufacturing</div>
  </div>
  <div class="logo-bar-stat">
    <div class="logo-bar-stat-value">Certified</div>
    <div class="logo-bar-stat-label">Thai Revenue Department</div>
  </div>
</div>
`;
}

// ════════════════════════════════════════════════════════════════
// EXPORTS: blocks() and css()
// ════════════════════════════════════════════════════════════════

function blocks() {
  return [
    // Section
    sectionOpen({
      adminLabel: 'Client Logo Bar',
      css: 'selector{width:100% !important;max-width:100% !important;background:linear-gradient(180deg, #f8fafc 0%, #ffffff 100%) !important;padding:60px 0 !important;position:relative;overflow:hidden;margin:0 !important;}',
    }),

    // Row
    rowOpen({
      adminLabel: 'Logo Bar Row',
      columns: 'equal-columns_1',
      css: 'selector{max-width:1400px !important;margin:0 auto !important;padding:0 40px !important;}',
    }),

    // Column
    columnOpen({
      adminLabel: 'Logo Bar Content',
      layout: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
      css: 'selector{display:flex !important;flex-direction:column !important;align-items:center !important;gap:0 !important;}',
    }),

    // Logo Label + Marquee + Stats (single Code Module — label MUST be inside to avoid Divi text module gap)
    codeModule(`<div class="logobar-section"><p class="logobar-label">Trusted by Leading Manufacturers in Thailand</p>${getLogoMarqueeHTML()}${getStatsHTML()}</div>`, 'Logo Bar: Label + Marquee + Stats'),

    columnClose(),
    rowClose(),
    sectionClose(),
  ];
}

function logoBarCss() {
  return `
/* ===== LOGO BAR SECTION ===== */
.logobar-section{
  background:${SPEC.section.background};
  padding:0;
  -webkit-font-smoothing:auto;
  -moz-osx-font-smoothing:auto;
  font-size:16px;
  overflow:hidden;
}
.logobar-label{
  font-family:${SPEC.label.fontFamily};
  font-size:${SPEC.label.fontSize};
  font-weight:${SPEC.label.fontWeight};
  text-transform:${SPEC.label.textTransform};
  letter-spacing:${SPEC.label.letterSpacing};
  color:${SPEC.label.color};
  text-align:center;
  line-height:1.6;
  margin:0;
  padding:0;
}
.logo-bar-marquee-wrapper{
  width:100%;
  overflow:hidden;
  position:relative;
  padding:0;
  margin:0 0 48px;
  mask-image:${SPEC.marquee.maskImage};
  -webkit-mask-image:${SPEC.marquee.maskImage};
}

.logo-bar-marquee{
  display:flex;
  gap:60px;
  animation:dw-scroll ${SPEC.marquee.animationDuration} linear infinite;
  width:max-content;
}

.logo-bar-marquee:hover{
  animation-play-state:paused;
}

@keyframes dw-scroll{
  0%{transform:translateX(0)}
  100%{transform:translateX(-50%)}
}

.logo-bar-item{
  display:flex;
  align-items:center;
  gap:24px;
  flex-shrink:0;
  transition:all 0.4s ease;
}

.logo-bar-logo{
  height:${SPEC.logo.height};
  max-width:${SPEC.logo.maxWidth};
  display:flex;
  align-items:center;
  justify-content:center;
  transition:filter 0.4s ease;
  filter:${SPEC.logo.filterDefault};
}

.logo-bar-item:hover .logo-bar-logo{
  filter:${SPEC.logo.filterHover};
}

/* Placeholder logo styling (colored circles with initials) */
.logo-bar-placeholder{
  width:108px;
  height:108px;
  border-radius:12px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#fff;
  font-family:'Noto Sans',sans-serif;
  font-size:32px;
  font-weight:700;
  letter-spacing:-0.02em;
}

.logo-bar-text{
  display:flex;
  flex-direction:column;
  gap:4px;
}

.logo-bar-name{
  font-family:${SPEC.companyName.fontFamily};
  font-size:${SPEC.companyName.fontSize};
  font-weight:${SPEC.companyName.fontWeight};
  color:${SPEC.companyName.color};
  opacity:${SPEC.companyName.opacityDefault};
  line-height:${SPEC.companyName.lineHeight};
  transition:opacity 0.4s ease;
}

.logo-bar-item:hover .logo-bar-name{
  opacity:${SPEC.companyName.opacityHover};
}

.logo-bar-subtitle{
  font-family:'Noto Sans',sans-serif;
  font-size:${SPEC.subtitle.fontSize};
  font-weight:${SPEC.subtitle.fontWeight};
  color:${SPEC.subtitle.color};
  text-transform:${SPEC.subtitle.textTransform};
  letter-spacing:${SPEC.subtitle.letterSpacing};
  line-height:1.25;
  margin-top:4px;
}

/* ===== STATS ROW ===== */
.logo-bar-stats{
  display:flex;
  gap:60px;
  justify-content:center;
  align-items:center;
  padding:32px 40px 0;
  border-top:1px solid #e2e8f0;
  max-width:1200px;
  margin:0 auto;
}

.logo-bar-stat{
  display:block;
  text-align:center;
}

.logo-bar-stat-value{
  font-family:${SPEC.stats.valueFontFamily};
  font-size:${SPEC.stats.valueSize};
  font-weight:${SPEC.stats.valueWeight};
  color:${SPEC.stats.valueColor};
  line-height:${SPEC.stats.valueLineHeight};
  letter-spacing:normal;
}

.logo-bar-stat-label{
  font-family:'Noto Sans',sans-serif;
  font-size:${SPEC.stats.labelSize};
  color:${SPEC.stats.labelColor};
  text-align:center;
  line-height:1.6;
  margin-top:4px;
}

/* ===== RESPONSIVE ===== */
@media(max-width:1024px){
  .logo-bar-marquee{gap:48px}
  .logo-bar-logo{height:80px;max-width:96px}
  .logo-bar-placeholder{width:80px;height:80px;font-size:24px}
  .logo-bar-name{font-size:24px}
  .logo-bar-subtitle{font-size:13px}
  .logo-bar-stats{gap:40px}
}

@media(max-width:768px){
  .logo-bar-marquee{gap:40px}
  .logo-bar-logo{height:64px;max-width:76px}
  .logo-bar-placeholder{width:64px;height:64px;font-size:20px}
  .logo-bar-name{font-size:20px}
  .logo-bar-subtitle{font-size:11px}
  .logo-bar-stats{
    flex-direction:column;
    gap:24px;
    padding-top:24px;
  }
  .logo-bar-stat-value{font-size:24px}
  .logo-bar-stat-label{font-size:12px}
}

@media(max-width:640px){
  .et_pb_section .et_pb_row{padding:0 24px !important}
  .logo-bar-marquee-wrapper{padding:40px 0}
  .logo-bar-marquee{gap:36px}
  .logo-bar-logo{height:52px;max-width:60px}
  .logo-bar-placeholder{width:52px;height:52px;font-size:16px;border-radius:8px}
  .logo-bar-item{gap:16px}
  .logo-bar-name{font-size:16px}
  .logo-bar-subtitle{display:none}
  .logo-bar-stat-value{font-size:20px}
  .logo-bar-stat-label{font-size:11px}
}

/* ===== REDUCED MOTION ===== */
@media(prefers-reduced-motion:reduce){
  .logo-bar-marquee{
    animation:none;
    flex-wrap:wrap;
    justify-content:center;
    width:100%;
  }
  .logo-bar-item[aria-hidden="true"]{
    display:none;
  }
  .logo-bar-marquee-wrapper{
    mask-image:none;
    -webkit-mask-image:none;
  }
}`;
}

module.exports = { blocks, css: logoBarCss, SPEC };
