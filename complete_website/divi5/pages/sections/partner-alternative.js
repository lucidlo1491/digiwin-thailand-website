/**
 * partner-alternative.js — "You Keep the Meat" Alternative Model (S4)
 *
 * Before/after comparison layout + benefits grid + CTA.
 * data-particles attribute from HTML prototype → particle-ocean.js bundled in Code Module.
 *
 * Source: partner-program.html lines 1201-1293
 */

const fs = require('fs');
const path = require('path');
const base = require('../../lib/templates/_base');

const P = 'alt'; // CSS prefix

// Read particle-ocean.js for inline injection (wp_kses strips <canvas> but script runs after parse)
const PARTICLE_JS = fs.readFileSync(
  path.join(__dirname, '..', '..', '..', 'particle-ocean.js'), 'utf8'
);

// ════════════════════════════════════════════════════════════════
// ICONS
// ════════════════════════════════════════════════════════════════
const ICON_X = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
const ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';

const BENEFIT_ICONS = {
  layers: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
  lock: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  trend: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
};

// ════════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════════
const OLD_MODEL = {
  label: 'Typical Vendor Model',
  title: 'Vendor Takes the Meat',
  items: [
    'Vendor controls pricing and margin',
    'Partner is just a reseller channel',
    'Direct team competes for your deals',
    'Maintenance revenue goes to HQ',
  ],
};

const NEW_MODEL = {
  label: 'DigiWin Partner-First Model',
  title: 'Partner Keeps the Meat',
  items: [
    '<strong>100%</strong> of implementation &amp; service fees',
    '<strong>30\u201340%</strong> margin on license sales',
    '<strong>Zero</strong> channel conflict\u2014Thai market is yours',
    '<strong>Recurring</strong> maintenance revenue\u2014you set the rate',
  ],
};

const BENEFITS = [
  {
    icon: BENEFIT_ICONS.layers,
    title: 'Your Market, Not Ours',
    body: 'Our direct team handles Chinese/Taiwanese-owned factory inbound only. We don\u2019t compete for Thai SME deals because <strong>your local relationships are the asset we can\u2019t replicate</strong>.',
  },
  {
    icon: BENEFIT_ICONS.lock,
    title: 'Deal Registration Protection',
    body: 'Once you book a lead, it is <strong>locked to you for 6 months</strong>. Our direct team or other partners cannot undercut your groundwork. It\u2019s in the Master Agreement.',
  },
  {
    icon: BENEFIT_ICONS.trend,
    title: 'Land &amp; Expand Strategy',
    body: 'Enter clients with lower-risk <strong>MES or Workflow iGP</strong> projects, then expand to full ERP once trust is established. Each phase generates revenue while deepening the relationship.',
  },
];

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const oldItems = OLD_MODEL.items.map(item =>
    `<li>${ICON_X} ${item}</li>`
  ).join('');

  const newItems = NEW_MODEL.items.map(item =>
    `<li>${ICON_CHECK} ${item}</li>`
  ).join('');

  const benefitsHTML = BENEFITS.map(b => `
        <div class="${P}-benefit">
          <div class="${P}-benefit-icon">${b.icon}</div>
          <h3>${b.title}</h3>
          <p>${b.body}</p>
        </div>`).join('');

  const arrowSVG = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

  const html = `
    <div class="${P}-section" data-particles>
      <div class="${P}-wave" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">\u201CYou Keep the Meat, We Drink the Soup\u201D</h2>
          <p class="${P}-subtitle">Unlike global vendors who use partners as low-margin resellers, we deliberately give partners the high-margin revenue so you have a reason to grow with us.</p>
        </div>

        <div class="${P}-comparison">
          <div class="${P}-model ${P}-model-old">
            <span class="${P}-model-label ${P}-model-label--old">${OLD_MODEL.label}</span>
            <h3>${OLD_MODEL.title}</h3>
            <ul class="${P}-model-list">${oldItems}</ul>
          </div>
          <div class="${P}-arrow">${arrowSVG}</div>
          <div class="${P}-model ${P}-model-new">
            <span class="${P}-model-label ${P}-model-label--new">${NEW_MODEL.label}</span>
            <h3>${NEW_MODEL.title}</h3>
            <ul class="${P}-model-list">${newItems}</ul>
          </div>
        </div>

        <div class="${P}-benefits">${benefitsHTML}
        </div>

        <div class="${P}-cta-wrap">
          <a href="/demo.html" class="${P}-cta-btn">Let\u2019s Talk Partnership</a>
          <p class="${P}-cta-note">30-minute conversation. We\u2019ll walk through your current portfolio and show you where DigiWin fits.</p>
        </div>
      </div>
    </div>
    <script>${PARTICLE_JS}</script>`;

  return base.wrapInDiviSection('Alternative Model: Partner-First', html, 'Alternative Model: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === ALTERNATIVE MODEL (S4) === */
.${P}-section{background:linear-gradient(180deg,#F5F7FA 0%,#fff 100%);padding:100px 24px 180px;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-wave{position:absolute;bottom:0;left:0;right:0;height:200px;background:linear-gradient(180deg,transparent,rgba(0,60,200,0.04));pointer-events:none;z-index:0;opacity:0.08}
.${P}-inner{max-width:1200px;margin:0 auto;position:relative;z-index:2}
.${P}-header{text-align:center;max-width:860px;margin:0 auto 60px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:40px;font-weight:700;color:#000864;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;max-width:600px;margin:0 auto;padding:0}
.${P}-comparison{display:grid;grid-template-columns:1fr 80px 1fr;gap:32px;align-items:center;margin-bottom:60px}
.${P}-model{background:#fff;border-radius:20px;padding:40px;box-shadow:0 4px 24px rgba(0,0,0,0.06)}
.${P}-model-old{border:2px solid #fecaca}
.${P}-model-new{border:2px solid #86efac}
.${P}-model-label{display:inline-block;padding:6px 16px;border-radius:50px;font-family:'Noto Sans',sans-serif;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:20px}
.${P}-model-label--old{background:#fee2e2;color:#991b1b}
.${P}-model-label--new{background:#dcfce7;color:#166534}
.${P}-model h3{font-family:'Noto Sans',sans-serif;font-size:24px;font-weight:600;color:#000864;line-height:1.6;margin:0 0 24px;padding:0}
.${P}-model-list{list-style:none;padding:0;margin:0}
.${P}-model-list li{display:flex;align-items:flex-start;gap:12px;font-family:'Noto Sans',sans-serif;font-size:15px;color:#475569;padding:12px 0;border-bottom:1px solid #f1f5f9}
.${P}-model-list li:last-child{border-bottom:none}
.${P}-model-list li svg{width:20px;height:20px;flex-shrink:0;margin-top:2px}
.${P}-model-old .${P}-model-list li svg{stroke:#dc2626}
.${P}-model-new .${P}-model-list li svg{stroke:#16a34a}
.${P}-arrow{display:flex;align-items:center;justify-content:center}
.${P}-arrow svg{width:48px;height:48px;stroke:#00AFF0}
.${P}-benefits{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:16px}
.${P}-benefit{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:32px;transition:all 0.3s ease}
.${P}-benefit:hover{border-color:#00AFF0;box-shadow:0 8px 32px rgba(0,175,240,0.12)}
.${P}-benefit-icon{width:56px;height:56px;background:linear-gradient(135deg,#00AFF0,#003CC8);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:20px}
.${P}-benefit-icon svg{width:28px;height:28px;stroke:#fff;fill:none}
.${P}-benefit h3{font-family:'Noto Sans',sans-serif;font-size:20px;font-weight:600;color:#000864;line-height:1.6;margin:0 0 12px;padding:0}
.${P}-benefit p{font-family:'Noto Sans',sans-serif;font-size:15px;color:#5b6b80;line-height:1.6;margin:0;padding:0}
.${P}-cta-wrap{text-align:center;margin-top:56px}
.${P}-cta-btn{font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;color:#fff;background:#006dac;padding:16px 32px;border-radius:8px;text-decoration:none;display:inline-block;transition:all 0.3s ease;box-shadow:0 4px 14px rgba(0,175,240,0.35)}
.${P}-cta-btn:hover{background:#003CC8;transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,175,240,0.45)}
.${P}-cta-note{font-family:'Noto Sans',sans-serif;font-size:14px;color:#5b6b80;margin-top:16px}
${base.diviListReset(P + '-model')}
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-comparison{grid-template-columns:1fr;gap:24px}
  .${P}-arrow{transform:rotate(90deg)}
  .${P}-benefits{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
  .${P}-benefits{grid-template-columns:1fr}
  .${P}-header{margin-bottom:40px}
}
${base.reducedMotion(`.${P}-benefit,.${P}-cta-btn{transition:none !important}`)}`.trim();
}

module.exports = { blocks, css };
