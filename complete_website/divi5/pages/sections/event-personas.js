/**
 * event-personas.js — Who Should Attend Section (S5)
 *
 * Light gray background, 3 persona cards.
 * ContentSpec: Section 5 — Self-selection: reader sees themselves
 */

const base = require('../../lib/templates/_base');

const P = 'evt-per';

const PERSONAS = [
  { role: 'Factory CFO / Finance Director', size: '50-500 Employees, BOI-Certified', desc: 'You sign off on BOI compliance filings and worry about audit results every cycle. You need to understand your factory\'s compliance exposure.', quote: '"I need to know our compliance exposure — and whether our ERP is hiding gaps."' },
  { role: 'Production Manager / Plant Manager', size: 'Any Size, BOI-Certified', desc: 'You run the shop floor and your data feeds the compliance reports. Production accuracy directly impacts your factory\'s BOI standing.', quote: '"I need my production data to match what finance reports — but right now it doesn\'t."' },
  { role: 'ERP / IT Manager', size: 'Evaluating or Upgrading ERP', desc: 'You manage the system that\'s supposed to produce BOI reports. You need to know what production-order-level tracking actually requires.', quote: '"I need to know what production-order-level tracking actually requires from a system."' },
];

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const cards = PERSONAS.map(p => `
    <div class="${P}-card">
      <div class="${P}-accent"></div>
      <div class="${P}-body">
        <div class="${P}-role">${p.role}</div>
        <span class="${P}-size">${p.size}</span>
        <p class="${P}-desc">${p.desc}</p>
        <p class="${P}-quote">${p.quote}</p>
      </div>
    </div>`).join('\n');

  const html = `
<div class="${P}-section">
  <div class="${P}-inner">
    <span class="${P}-label">Who This Is For</span>
    <h2 class="${P}-title">Is This Workshop Right for You?</h2>
    <div class="${P}-grid">
      ${cards}
    </div>
  </div>
</div>
  `;

  return base.wrapInDiviSection('Who Should Attend', html, 'Personas: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === WHO SHOULD ATTEND (S5) === */
.${P}-section{background:#F5F7FA;padding:80px 24px;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-inner{max-width:1100px;margin:0 auto}
.${P}-label{display:block;text-align:center;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:#22C55E;margin-bottom:16px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:36px;font-weight:700;color:#000864;text-align:center;line-height:1.3;margin:0 0 48px;padding:0}
.${P}-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.${P}-card{background:#fff;border-radius:16px;overflow:hidden;transition:transform 0.3s ease,box-shadow 0.3s ease}
.${P}-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,0.08)}
.${P}-accent{height:4px;background:#22C55E}
.${P}-body{padding:28px}
.${P}-role{font-family:'Noto Sans',sans-serif;font-size:20px;font-weight:600;color:#000864;margin-bottom:8px}
.${P}-size{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:#22C55E;background:rgba(34,197,94,0.1);padding:4px 10px;border-radius:4px;margin-bottom:16px}
.${P}-desc{font-family:'Noto Sans',sans-serif;font-size:15px;font-weight:400;color:#64748b;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-quote{font-family:'Noto Sans',sans-serif;font-size:14px;font-weight:400;color:#94a3b8;font-style:italic;line-height:1.5;margin:0;padding:12px 0 0;border-top:1px solid #f0f0f0}

.et_pb_section .${P}-title{-webkit-font-smoothing:auto !important;line-height:1.3 !important;margin:0 0 48px !important;padding:0 !important}
.et_pb_section .${P}-desc,.et_pb_section .${P}-quote{-webkit-font-smoothing:auto !important;padding-bottom:0 !important}

@media(max-width:1024px){
  .${P}-grid{grid-template-columns:1fr}
}
@media(max-width:768px){
  .${P}-title{font-size:28px}
}
${base.reducedMotion(`.${P}-card{transition:none !important}`)}
`.trim();
}

module.exports = { blocks, css };
