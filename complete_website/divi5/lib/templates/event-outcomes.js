/**
 * event-outcomes.js — Event Outcomes Template
 *
 * Light gray background, icon+title+desc cards in 2-column grid.
 *
 * Data shape:
 * {
 *   sectionPrefix: string,
 *   color: string,                    // accent hex
 *   label: string,                    // e.g. 'Workshop Outcomes'
 *   title: string,
 *   outcomes: [{ icon, title, desc }], // icon = SVG inner markup (path/line/etc.)
 * }
 */

const base = require('./_base');

const schema = {
  description: 'Outcome cards in 2-column grid with icons',
  category: 'event',
};

function blocks(data) {
  const P = data.sectionPrefix;

  const cards = data.outcomes.map(o => `
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
    <span class="${P}-label">${data.label}</span>
    <h2 class="${P}-title">${data.title}</h2>
    <div class="${P}-grid">
      ${cards}
    </div>
  </div>
</div>
  `;

  return base.wrapInDiviSection(data.adminLabel || 'Outcomes', html, 'Outcomes: Content');
}

function css(data) {
  const P = data.sectionPrefix;
  const c = base.eventColorSurface(data.color);

  return `
/* === OUTCOMES === */
.${P}-section{background:#F5F7FA;padding:80px 24px;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-inner{max-width:1100px;margin:0 auto}
.${P}-label{display:block;text-align:center;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:${c.hex};margin-bottom:16px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:36px;font-weight:700;color:#000864;text-align:center;line-height:1.25;margin:0 0 16px;padding:0}
.${P}-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.${P}-card{background:#fff;border-radius:16px;padding:32px;transition:transform 0.3s ease,box-shadow 0.3s ease}
.${P}-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,0.08)}
.${P}-icon{width:48px;height:48px;border-radius:50%;background:${c.bg10};display:flex;align-items:center;justify-content:center;margin-bottom:16px}
.${P}-icon svg{stroke:${c.hex}}
.${P}-card h3{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:600;color:#000864;margin:0 0 8px;padding:0}
.${P}-card p{font-family:'Noto Sans',sans-serif;font-size:15px;font-weight:400;color:#5b6b80;line-height:1.6;margin:0;padding:0}

.et_pb_section .${P}-title{-webkit-font-smoothing:auto !important;line-height:1.25 !important;margin:0 0 16px !important;padding:0 !important}
.et_pb_section .${P}-label{-webkit-font-smoothing:auto !important;line-height:19.2px !important}
.et_pb_section .${P}-card h3{-webkit-font-smoothing:auto !important;margin:0 0 8px !important;padding:0 !important}
.et_pb_section .${P}-card p{-webkit-font-smoothing:auto !important;padding-bottom:0 !important}

@media(max-width:768px){
  .${P}-grid{grid-template-columns:1fr}
  .${P}-title{font-size:28px}
}
${base.reducedMotion(`.${P}-card{transition:none !important}`)}
`.trim();
}

module.exports = { blocks, css, schema };
