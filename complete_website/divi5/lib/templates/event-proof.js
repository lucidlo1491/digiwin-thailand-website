/**
 * event-proof.js — Event Proof/Social Signal Template
 *
 * White background, dark stats bar (4 items), proof text.
 *
 * Data shape:
 * {
 *   sectionPrefix: string,
 *   color: string,                    // accent hex
 *   label: string,                    // e.g. 'Why DigiWin Events'
 *   title: string,
 *   stats: [{ value, label }],        // 4 items
 *   text: string,                     // supporting paragraph
 * }
 */

const base = require('./_base');

const schema = {
  description: 'Stats bar with proof text',
  category: 'event',
};

function blocks(data) {
  const P = data.sectionPrefix;

  const statItems = data.stats.map(s => `
    <div class="${P}-stat">
      <div class="${P}-stat-value">${s.value}</div>
      <div class="${P}-stat-label">${s.label}</div>
    </div>`).join('\n');

  const html = `
<div class="${P}-section">
  <div class="${P}-inner">
    <span class="${P}-label">${data.label}</span>
    <h2 class="${P}-title">${data.title}</h2>
    <div class="${P}-stats-bar">
      ${statItems}
    </div>
    <p class="${P}-text">${data.text}</p>
  </div>
</div>
  `;

  return base.wrapInDiviSection(data.adminLabel || 'Proof & Social Signal', html, 'Proof: Content');
}

function css(data) {
  const P = data.sectionPrefix;
  const c = base.eventColorSurface(data.color);

  return `
/* === PROOF / SOCIAL SIGNAL === */
.${P}-section{background:#fff;padding:80px 24px;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-inner{max-width:1100px;margin:0 auto;text-align:center}
.${P}-label{display:block;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:${c.hex};margin-bottom:16px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:36px;font-weight:700;color:#000864;line-height:1.25;margin:0 0 16px;padding:0}
.${P}-stats-bar{display:grid;grid-template-columns:repeat(4,1fr);gap:0;background:linear-gradient(135deg,#0f1419,#1a2632);border-radius:16px;padding:40px 32px;margin-bottom:40px}
.${P}-stat{text-align:center;padding:0 16px}
.${P}-stat:not(:last-child){border-right:1px solid rgba(255,255,255,0.1)}
.${P}-stat-value{font-family:'Noto Sans',sans-serif;font-size:42px;font-weight:700;color:${c.hex};line-height:1;margin-bottom:8px}
.${P}-stat-label{font-family:'Noto Sans',sans-serif;font-size:14px;font-weight:400;color:rgba(255,255,255,0.85);margin-top:0}
.${P}-text{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.8;max-width:700px;margin:0 auto;padding:0}

.et_pb_section .${P}-title{-webkit-font-smoothing:auto !important;line-height:1.25 !important;margin:0 0 16px !important;padding:0 !important}
.et_pb_section .${P}-text{-webkit-font-smoothing:auto !important;padding-bottom:0 !important}
.et_pb_section .${P}-stat-value{-webkit-font-smoothing:auto !important;line-height:1 !important;margin-bottom:8px !important}
.et_pb_section .${P}-stat-label{-webkit-font-smoothing:auto !important;line-height:22.4px !important;margin-top:0 !important}
.et_pb_section .${P}-label{-webkit-font-smoothing:auto !important;line-height:19.2px !important}
.et_pb_section .${P}-stat{-webkit-font-smoothing:auto !important}
.et_pb_section .${P}-stats-bar{margin-bottom:40px !important}

@media(max-width:768px){
  .${P}-stats-bar{grid-template-columns:repeat(2,1fr);gap:24px}
  .${P}-stat:not(:last-child){border-right:none}
  .${P}-stat:nth-child(odd){border-right:1px solid rgba(255,255,255,0.1)}
  .${P}-title{font-size:28px}
  .${P}-stat-value{font-size:32px}
}
@media(max-width:480px){
  .${P}-stats-bar{grid-template-columns:1fr}
  .${P}-stat:nth-child(odd){border-right:none}
}
${base.reducedMotion(`.${P}-section *{transition:none !important}`)}
`.trim();
}

module.exports = { blocks, css, schema };
