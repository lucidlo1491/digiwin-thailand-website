/**
 * partner-offerings.js — What You Get Section (S5)
 *
 * Two offering cards (clickable, icon + description) + dark navy checklist box.
 * .dw-years dynamic year needs inline JS for the counter.
 *
 * Source: partner-program.html lines 1296-1367
 */

const base = require('../../lib/templates/_base');

const P = 'offer'; // CSS prefix

// ════════════════════════════════════════════════════════════════
// ICONS
// ════════════════════════════════════════════════════════════════
const ICON_TARGET = '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>';
const ICON_DOLLAR = '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>';
const ICON_ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
const ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';

// ════════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════════
const OFFERINGS = [
  {
    icon: ICON_TARGET,
    title: 'The Solution Stack',
    body: 'Proven products to resell: ERP, MES, WMS, AIoT. <span class="dw-years">44</span> years of development. 50,000+ installations worldwide. Products that work in real factories.',
    link: { text: 'View Product Portfolio', href: '/partner-program/solutions.html' },
  },
  {
    icon: ICON_DOLLAR,
    title: 'Partner Economics',
    body: 'Transparent margins, predictable revenue share, and multi-year projections that show how partnership compounds your business value over time.',
    link: { text: 'See the Numbers', href: '/partner-program/economics.html' },
  },
];

const BENEFITS = [
  'Protected territory rights',
  'Technical certification',
  'Sales enablement support',
  'Marketing co-investment',
  'Implementation methodology',
  'Ongoing product updates',
  '6-month lead lock protection',
  'Annual partner summit',
];

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const offeringCardsHTML = OFFERINGS.map(o => `
        <a href="${o.link.href}" class="${P}-card">
          <div class="${P}-card-icon">${o.icon}</div>
          <div class="${P}-card-content">
            <h3>${o.title}</h3>
            <p>${o.body}</p>
            <span class="${P}-card-link">${o.link.text} ${ICON_ARROW}</span>
          </div>
        </a>`).join('');

  const benefitsHTML = BENEFITS.map(b =>
    `<div class="${P}-check-item">${ICON_CHECK}<span>${b}</span></div>`
  ).join('');

  // Dynamic year script for .dw-years
  const yearScript = `<script>(function(){var y=new Date().getFullYear()-1982;document.querySelectorAll('.dw-years').forEach(function(e){e.textContent=y});})()</script>`;

  const html = `
    <div class="${P}-section">
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">What You Get as a DigiWin Partner</h2>
          <p class="${P}-subtitle">A product stack built for manufacturing, transparent margin structures, and the support infrastructure to make your first deals profitable.</p>
        </div>

        <div class="${P}-cards">${offeringCardsHTML}
        </div>

        <div class="${P}-box">
          <div class="${P}-box-inner">
            <h3 class="${P}-box-title">Partner Benefits at a Glance</h3>
            <div class="${P}-checks">${benefitsHTML}
            </div>
          </div>
        </div>
      </div>
    </div>${yearScript}`;

  return base.wrapInDiviSection('What You Get: Partner Offerings', html, 'Partner Offerings: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === PARTNER OFFERINGS (S5) === */
.${P}-section{background:#fff;padding:100px 24px;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-box-inner{max-width:1200px;margin:0 auto}
.${P}-header{text-align:center;max-width:800px;margin:0 auto 60px}
.${P}-box-title{font-family:'Noto Sans',sans-serif;font-size:40px;font-weight:700;color:#000864;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;max-width:600px;margin:0 auto;padding:0}
.${P}-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:32px;margin-bottom:48px}
.${P}-card{background:linear-gradient(135deg,#f8fafc,#fff);border:1px solid #e2e8f0;border-radius:20px;padding:40px;display:flex;gap:24px;text-decoration:none;transition:all 0.3s ease}
.${P}-card:hover{border-color:#00AFF0;box-shadow:0 12px 40px rgba(0,175,240,0.15);transform:translateY(-4px)}
.${P}-card-icon{width:72px;height:72px;background:linear-gradient(135deg,#00AFF0,#003CC8);border-radius:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.${P}-card-icon svg{width:36px;height:36px;stroke:#fff;fill:none}
.${P}-card-content h3{font-family:'Noto Sans',sans-serif;font-size:22px;font-weight:600;color:#000864;line-height:1.6;margin:0 0 12px;padding:0}
.${P}-card-content p{font-family:'Noto Sans',sans-serif;font-size:15px;color:#5b6b80;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-card-link{font-family:'Noto Sans',sans-serif;font-size:15px;font-weight:600;color:#0369a1;display:inline-flex;align-items:center;gap:8px}
.${P}-card-link svg{width:16px;height:16px;stroke:currentColor;transition:transform 0.2s}
.${P}-card:hover .${P}-card-link svg{transform:translateX(4px)}
.${P}-box{background:linear-gradient(135deg,#000864 0%,#000432 100%);border-radius:20px;padding:48px;position:relative;overflow:hidden}
.${P}-box::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M20 0l20 20-20 20L0 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");pointer-events:none}
.${P}-box-inner{position:relative;z-index:1}
.${P}-box-title{font-family:'Noto Sans',sans-serif;font-size:28px;font-weight:600;color:#fff;line-height:1.6;margin:0 0 32px;padding:0;text-align:center}
.${P}-checks{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.${P}-check-item{display:flex;align-items:flex-start;gap:12px}
.${P}-check-item svg{width:24px;height:24px;stroke:#4ade80;flex-shrink:0;margin-top:2px}
.${P}-check-item span{font-family:'Noto Sans',sans-serif;font-size:15px;color:rgba(255,255,255,0.9);line-height:1.5}
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-cards{grid-template-columns:1fr;gap:24px}
  .${P}-checks{grid-template-columns:repeat(2,1fr)}
  .${P}-box{padding:40px}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
  .${P}-cards{grid-template-columns:1fr}
  .${P}-card{flex-direction:column}
  .${P}-checks{grid-template-columns:1fr}
  .${P}-box{padding:32px 24px}
  .${P}-header{margin-bottom:40px}
}
${base.reducedMotion(`.${P}-card,.${P}-card-link svg{transition:none !important}`)}`.trim();
}

module.exports = { blocks, css };
