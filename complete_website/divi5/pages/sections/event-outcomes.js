/**
 * event-outcomes.js — Workshop Outcomes Section (S3)
 *
 * Light gray background, 6 outcome cards in 2-column grid.
 * ContentSpec: Section 3 — Outcomes > topics
 */

const base = require('../../lib/templates/_base');

const P = 'evt-out';

const OUTCOMES = [
  { icon: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>', title: 'Run a BOI reconciliation report', desc: 'Map imported bonded materials to production orders — the exact format BOI auditors expect to see.' },
  { icon: '<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>', title: 'Identify compliance gaps in your current ERP', desc: 'Know specifically which data your system can and cannot produce for BOI filings.' },
  { icon: '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>', title: 'Calculate your supplementary tax exposure', desc: 'Estimate the gap between theoretical BOM consumption and actual production usage in your factory.' },
  { icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', title: 'Build a BOI audit preparation checklist', desc: 'A step-by-step process your team can follow before every audit cycle — take it home and use it.' },
  { icon: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>', title: 'Evaluate ERP systems for BOI readiness', desc: 'Know what questions to ask any ERP vendor about production-order-level tracking capabilities.' },
  { icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>', title: 'Present a compliance upgrade business case', desc: 'Build the ROI argument for production-level tracking using real factory data from the workshop.' },
];

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const cards = OUTCOMES.map(o => `
    <div class="${P}-card">
      <div class="${P}-icon">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">${o.icon}</svg>
      </div>
      <h3>${o.title}</h3>
      <p>${o.desc}</p>
    </div>`).join('\n');

  const html = `
<div class="${P}-section">
  <div class="${P}-inner">
    <span class="${P}-label">Workshop Outcomes</span>
    <h2 class="${P}-title">What You'll Be Able to Do After This Workshop</h2>
    <div class="${P}-grid">
      ${cards}
    </div>
  </div>
</div>
  `;

  return base.wrapInDiviSection('Workshop Outcomes', html, 'Outcomes: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === WORKSHOP OUTCOMES (S3) === */
.${P}-section{background:#F5F7FA;padding:80px 24px;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-inner{max-width:1100px;margin:0 auto}
.${P}-label{display:block;text-align:center;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:#22C55E;margin-bottom:16px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:36px;font-weight:700;color:#000864;text-align:center;line-height:1.3;margin:0 0 48px;padding:0}
.${P}-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.${P}-card{background:#fff;border-radius:16px;padding:32px;transition:transform 0.3s ease,box-shadow 0.3s ease}
.${P}-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,0.08)}
.${P}-icon{width:48px;height:48px;border-radius:50%;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
.${P}-icon svg{stroke:#22C55E}
.${P}-card h3{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:600;color:#000864;margin:0 0 8px;padding:0}
.${P}-card p{font-family:'Noto Sans',sans-serif;font-size:15px;font-weight:400;color:#64748b;line-height:1.6;margin:0;padding:0}

.et_pb_section .${P}-title{-webkit-font-smoothing:auto !important;line-height:1.3 !important;margin:0 0 48px !important;padding:0 !important}
.et_pb_section .${P}-card h3{-webkit-font-smoothing:auto !important;margin:0 0 8px !important;padding:0 !important}
.et_pb_section .${P}-card p{-webkit-font-smoothing:auto !important;padding-bottom:0 !important}

@media(max-width:768px){
  .${P}-grid{grid-template-columns:1fr}
  .${P}-title{font-size:28px}
}
${base.reducedMotion(`.${P}-card{transition:none !important}`)}
`.trim();
}

module.exports = { blocks, css };
