/**
 * ps-competitive.js — Competitive Positioning Section (S5)
 *
 * Built from scratch. 3 competitive cards with red "vs." tags,
 * green "use when" boxes, dark ace card with dot pattern overlay.
 * Particle ocean canvas animation (matches HTML prototype data-particles).
 *
 * Source: solutions.html lines 1409-1481
 */

const base = require('../../lib/templates/_base');

const P = 'ps-comp'; // CSS prefix

// ════════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════════
const CARDS = [
  {
    tag: 'vs. Mid-Market ERP Systems',
    title: '\u201CThey Stop at the Office Door\u201D',
    points: [
      { strong: 'The Manufacturing Void:', text: 'Mid-market ERP systems treat manufacturing as simple kitting. They struggle with Thai production realities\u2014mold management, regrind (scrap reuse), complex sub-contracting loops. We handle these natively.' },
      { strong: 'The Phantom Problem:', text: 'Generic ERPs force you to create thousands of \u2018dummy\u2019 inventory transactions for Phantom BOMs. Digiwin manages this automatically, keeping warehouse data clean.' },
      { strong: 'The Cost of \u201CGood Enough\u201D:', text: 'To make generic ERP handle deep manufacturing, you need 3rd-party add-ons. This increases TCO and creates \u201Cversion lock\u201D risks. Digiwin\u2019s MES/WMS are native.' },
    ],
    useWhen: 'Client has a mid-market ERP but complains about production visibility.',
  },
  {
    tag: 'vs. Enterprise ERP Giants',
    title: '\u201CTier-1 Capability, No German Logic\u201D',
    points: [
      { strong: 'Agility vs. Rigidity:', text: 'Enterprise ERP systems often enforce rigid, linear processes that break when rush orders arrive or machines fail. Digiwin T100 handles urgent order splitting and mid-production changes without rolling back schedules.' },
      { strong: 'Total Cost Advantage:', text: 'We deliver 90% of Tier-1 capability at ~70% of the price. Shorter implementation (6-9 months vs. 12-18 months) using pre-built Automotive/Electronics templates.' },
      { strong: 'Transparent Pricing:', text: 'No audit risks, no spiraling \u201Cnamed user\u201D costs. Digiwin offers transparent pricing for high-volume shop floor users.' },
    ],
    useWhen: 'Client is evaluating enterprise ERP but has budget concerns or flexibility needs.',
  },
  {
    tag: 'vs. Local Vendors & Open-Source',
    title: '\u201CScale Without the Dead End\u201D',
    points: [
      { strong: 'The Vanishing Vendor:', text: 'Local ERPs are 30% cheaper but lack R&D budget to survive the next tech shift (AI, IoT). Digiwin is publicly listed (300378) with <span class="dw-years">44</span> years of history and Foxconn backing.' },
      { strong: 'The Feature Ceiling:', text: 'Open-source ERP hits a complexity wall when you need real-time machine integration (IoT) or traceability for ISO/IATF audits. Digiwin has these built-in.' },
      { strong: 'Financial Credibility:', text: 'Your bank and auditors know Digiwin. Using T100 or iGP helps with IPO preparation and loan approvals in ways custom-built local software cannot.' },
    ],
    useWhen: 'Client is tempted by low-cost local options or open-source alternatives.',
  },
];

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const cardsHTML = CARDS.map(card => {
    const pointsHTML = card.points.map(pt =>
      `<div class="${P}-point"><strong>${pt.strong}</strong> ${pt.text}</div>`
    ).join('');

    return `
            <div class="${P}-card">
              <div class="${P}-tag">${card.tag}</div>
              <h3>${card.title}</h3>
              <div class="${P}-points">${pointsHTML}
              </div>
              <div class="${P}-use-when"><strong>Use when:</strong> ${card.useWhen}</div>
            </div>`;
  }).join('');

  const html = `
    <div class="${P}-section" data-particles>
      <div class="${P}-inner">
        <div class="${P}-header">
          <span class="${P}-label">COMPETITIVE POSITIONING</span>
          <h2 class="${P}-title">Your Talking Points for Sales Conversations</h2>
          <p class="${P}-subtitle">How to position DigiWin against the competition in any sales conversation.</p>
        </div>
        <div class="${P}-grid">${cardsHTML}
        </div>
        <div class="${P}-ace">
          <div class="${P}-ace-label">THE ACE CARD</div>
          <p class="${P}-ace-quote">\u201CEnterprise ERP manages your General Ledger. Local software manages your Invoices. <strong>Digiwin manages your Factory Floor.</strong> We are the only ones who understand that the physical reality of a Thai production line doesn\u2019t always match the accounting rules.\u201D</p>
        </div>
      </div>
    </div>
    ${base.particleOceanScript()}`;

  return base.wrapInDiviSection('Competitive Positioning', html, 'Competitive: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === COMPETITIVE POSITIONING (S5) === */
.${P}-section{padding:100px 24px;background:linear-gradient(180deg,#f8fafc 0%,#fff 100%);position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-section canvas{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1}
.${P}-inner{max-width:1200px;margin:0 auto;position:relative;z-index:2}
.${P}-header{text-align:center;margin-bottom:60px}
.${P}-label{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;color:#8b5cf6;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;display:block}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:40px;font-weight:700;color:#000864;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;max-width:600px;margin:0 auto;padding:0}
.${P}-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:48px}
.${P}-card{background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:32px;transition:all 0.3s ease}
.${P}-card:hover{box-shadow:0 12px 40px rgba(0,0,0,0.08)}
.${P}-tag{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;color:#b91c1c;background:#fef2f2;padding:4px 10px;border-radius:50px;margin-bottom:16px;display:inline-block}
.${P}-card h3{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:700;color:#000864;line-height:1.6;margin:0 0 20px;padding:0}
.${P}-points{margin-bottom:20px}
.${P}-point{font-family:'Noto Sans',sans-serif;font-size:14px;color:#5b6b80;line-height:1.6;padding:12px 0;border-bottom:1px solid #f1f5f9}
.${P}-point:last-child{border-bottom:none}
.${P}-point strong{color:#000864;display:block;margin-bottom:4px}
.${P}-use-when{font-size:12px;color:#047857;background:#f0fdf4;padding:12px 16px;border-radius:12px}
.${P}-use-when strong{color:#047857}
.${P}-ace{background:linear-gradient(135deg,#000864 0%,#000432 100%);border-radius:24px;padding:48px;text-align:center;position:relative;overflow:hidden}
.${P}-ace::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");pointer-events:none}
.${P}-ace-label{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;color:#92400e;letter-spacing:3px;text-transform:uppercase;margin-bottom:20px;position:relative;z-index:1}
.${P}-ace-quote{font-size:20px;color:rgba(255,255,255,0.95);line-height:1.6;max-width:800px;margin:0 auto;position:relative;z-index:1}
.${P}-ace-quote strong{color:#0369a1}
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-grid{grid-template-columns:1fr}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
  .${P}-title{font-size:32px}
  .${P}-ace{padding:32px 24px}
  .${P}-ace-quote{font-size:16px}
}
/* Divi line-height overrides */
.et_pb_section .${P}-label{line-height:19.2px !important}
.et_pb_section .${P}-tag{line-height:17.6px !important}
.et_pb_section .${P}-use-when{line-height:19.2px !important}
.et_pb_section .${P}-use-when strong{line-height:19.2px !important}
.et_pb_section .${P}-ace-label{line-height:19.2px !important}
${base.reducedMotion(`.${P}-card{transition:none !important}`)}`.trim();
}

module.exports = { blocks, css, CARDS };
