/**
 * event-personas.js — Event Personas Template
 *
 * Light gray background, persona cards with accent bar, role, size badge, desc, quote.
 *
 * Data shape:
 * {
 *   sectionPrefix: string,
 *   color: string,                    // accent hex
 *   label: string,                    // e.g. 'Who This Is For'
 *   title: string,
 *   personas: [{ role, size, desc, quote }],
 * }
 */

const base = require('./_base');

const schema = {
  description: 'Persona cards with accent bar, role badge, and quote',
  category: 'event',
};

function blocks(data) {
  const P = data.sectionPrefix;

  const cards = data.personas.map(p => `
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
    <span class="${P}-label">${data.label}</span>
    <h2 class="${P}-title">${data.title}</h2>
    <div class="${P}-grid">
      ${cards}
    </div>
  </div>
</div>
  `;

  return base.wrapInDiviSection(data.adminLabel || 'Who Should Attend', html, 'Personas: Content');
}

function css(data) {
  const P = data.sectionPrefix;
  const c = base.eventColorSurface(data.color);
  const cols = data.personas.length >= 3 ? 3 : data.personas.length;

  return `
/* === WHO SHOULD ATTEND === */
.${P}-section{background:#F5F7FA;padding:80px 24px;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-inner{max-width:1100px;margin:0 auto}
.${P}-label{display:block;text-align:center;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:${c.hex};margin-bottom:16px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:36px;font-weight:700;color:#000864;text-align:center;line-height:1.25;margin:0 0 16px;padding:0}
.${P}-grid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:24px}
.${P}-card{background:#fff;border-radius:16px;overflow:hidden;transition:transform 0.3s ease,box-shadow 0.3s ease}
.${P}-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,0.08)}
.${P}-accent{height:4px;background:${c.hex}}
.${P}-body{padding:28px}
.${P}-role{font-family:'Noto Sans',sans-serif;font-size:20px;font-weight:600;color:#000864;line-height:1.6;margin-bottom:8px}
.${P}-size{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:${c.hex};background:${c.bg10};padding:4px 10px;border-radius:4px;margin-bottom:16px}
.${P}-desc{font-family:'Noto Sans',sans-serif;font-size:15px;font-weight:400;color:#5b6b80;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-quote{font-family:'Noto Sans',sans-serif;font-size:14px;font-weight:400;color:#5b6b80;font-style:italic;line-height:1.6;margin:0;padding:16px 0 0;border-top:1px solid #f1f5f9}

.et_pb_section .${P}-title{-webkit-font-smoothing:auto !important;line-height:1.25 !important;margin:0 0 16px !important;padding:0 !important}
.et_pb_section .${P}-label{-webkit-font-smoothing:auto !important;line-height:19.2px !important}
.et_pb_section .${P}-role{-webkit-font-smoothing:auto !important;line-height:32px !important}
.et_pb_section .${P}-size{-webkit-font-smoothing:auto !important;line-height:17.6px !important}
.et_pb_section .${P}-desc{-webkit-font-smoothing:auto !important;padding-bottom:0 !important}
.et_pb_section .${P}-quote{-webkit-font-smoothing:auto !important;padding-bottom:0 !important;line-height:22.4px !important}

@media(max-width:1024px){
  .${P}-grid{grid-template-columns:1fr}
}
@media(max-width:768px){
  .${P}-title{font-size:28px}
}
${base.reducedMotion(`.${P}-card{transition:none !important}`)}
`.trim();
}

module.exports = { blocks, css, schema };
