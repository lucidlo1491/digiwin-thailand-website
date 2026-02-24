/**
 * event-logistics.js — Event Logistics Template
 *
 * Light gray background, 2-col grid of icon + label + value items.
 *
 * Data shape:
 * {
 *   sectionPrefix: string,
 *   color: string,                    // accent hex
 *   label: string,                    // e.g. 'Practical Details'
 *   title: string,
 *   items: [{ icon, label, value }],  // icon = SVG inner markup
 * }
 */

const base = require('./_base');

const schema = {
  description: 'Logistics grid with icons, labels, and values',
  category: 'event',
};

function blocks(data) {
  const P = data.sectionPrefix;

  const logItems = data.items.map(item => `
    <div class="${P}-item">
      <div class="${P}-icon">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">${item.icon}</svg>
      </div>
      <div>
        <div class="${P}-item-label">${item.label}</div>
        <div class="${P}-item-value">${item.value}</div>
      </div>
    </div>`).join('\n');

  const html = `
<div class="${P}-section">
  <div class="${P}-inner">
    <span class="${P}-label">${data.label}</span>
    <h2 class="${P}-title">${data.title}</h2>
    <div class="${P}-grid">
      ${logItems}
    </div>
  </div>
</div>
  `;

  return base.wrapInDiviSection(data.adminLabel || 'Logistics', html, 'Logistics: Content');
}

function css(data) {
  const P = data.sectionPrefix;
  const c = base.eventColorSurface(data.color);

  return `
/* === LOGISTICS === */
.${P}-section{background:#F5F7FA;padding:80px 24px;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-inner{max-width:900px;margin:0 auto}
.${P}-label{display:block;text-align:center;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:${c.hex};margin-bottom:16px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:36px;font-weight:700;color:#000864;text-align:center;line-height:1.25;margin:0 0 16px;padding:0}
.${P}-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
.${P}-item{display:flex;gap:16px;align-items:flex-start;background:#fff;border-radius:12px;padding:20px}
.${P}-icon{width:40px;height:40px;border-radius:8px;background:${c.bg10};display:flex;align-items:center;justify-content:center;flex-shrink:0}
.${P}-icon svg{stroke:${c.hex}}
.${P}-item-label{font-family:'Noto Sans',sans-serif;font-size:14px;font-weight:600;color:#000864;margin-bottom:2px}
.${P}-item-value{font-family:'Noto Sans',sans-serif;font-size:15px;font-weight:400;color:#333;line-height:1.5}

.et_pb_section .${P}-title{-webkit-font-smoothing:auto !important;line-height:1.25 !important;margin:0 0 16px !important;padding:0 !important}
.et_pb_section .${P}-label{-webkit-font-smoothing:auto !important;line-height:19.2px !important}
.et_pb_section .${P}-item-label,.et_pb_section .${P}-item-value{-webkit-font-smoothing:auto !important}

@media(max-width:768px){
  .${P}-grid{grid-template-columns:1fr}
  .${P}-title{font-size:28px}
}
${base.reducedMotion(`.${P}-section *{transition:none !important}`)}
`.trim();
}

module.exports = { blocks, css, schema };
