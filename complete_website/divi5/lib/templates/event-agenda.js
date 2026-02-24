/**
 * event-agenda.js — Event Agenda Template
 *
 * White background, timeline layout with left border and dots.
 *
 * Data shape:
 * {
 *   sectionPrefix: string,
 *   color: string,                    // accent hex
 *   label: string,                    // e.g. 'Full-Day Agenda'
 *   title: string,
 *   subtitle?: string,
 *   items: [{ time, title, desc, isBreak }],
 * }
 */

const base = require('./_base');

const schema = {
  description: 'Timeline agenda with left border and break indicators',
  category: 'event',
};

function blocks(data) {
  const P = data.sectionPrefix;

  const items = data.items.map(a => `
    <div class="${P}-item${a.isBreak ? ` ${P}-item--break` : ''}">
      <div class="${P}-time">${a.time}</div>
      <div class="${P}-content">
        <h3>${a.title}</h3>
        ${a.desc ? `<p>${a.desc}</p>` : ''}
      </div>
    </div>`).join('\n');

  const html = `
<div class="${P}-section">
  <div class="${P}-inner">
    <span class="${P}-label">${data.label}</span>
    <h2 class="${P}-title">${data.title}</h2>
    ${data.subtitle ? `<p class="${P}-subtitle">${data.subtitle}</p>` : ''}
  </div>
  <div class="${P}-timeline">
    ${items}
  </div>
</div>
  `;

  return base.wrapInDiviSection(data.adminLabel || 'Agenda', html, 'Agenda: Content');
}

function css(data) {
  const P = data.sectionPrefix;
  const c = base.eventColorSurface(data.color);

  return `
/* === AGENDA === */
.${P}-section{background:#fff;padding:80px 24px;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-inner{text-align:center;max-width:800px;margin:0 auto 48px}
.${P}-label{display:block;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:${c.hex};margin-bottom:16px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:36px;font-weight:700;color:#000864;line-height:1.3;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;margin:0;padding:0}
.${P}-timeline{max-width:800px;margin:0 auto;display:flex;flex-direction:column;gap:0;border-left:3px solid ${c.bg30};padding-left:32px}
.${P}-item{display:flex;gap:24px;padding:20px 0;border-bottom:1px solid #f0f0f0;position:relative}
.${P}-item::before{content:'';position:absolute;left:-38px;top:24px;width:10px;height:10px;border-radius:50%;background:${c.hex};border:2px solid #fff}
.${P}-item--break{opacity:0.6}
.${P}-item--break::before{background:#cbd5e1}
.${P}-time{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;color:${c.hex};min-width:130px;flex-shrink:0;padding-top:2px}
.${P}-item--break .${P}-time{color:#94a3b8}
.${P}-content h3{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:600;color:#000864;margin:0 0 4px;padding:0}
.${P}-content p{font-family:'Noto Sans',sans-serif;font-size:15px;font-weight:400;color:#5b6b80;line-height:1.6;margin:0;padding:0}

.et_pb_section .${P}-title{-webkit-font-smoothing:auto !important;line-height:1.25 !important;margin:0 0 16px !important;padding:0 !important}
.et_pb_section .${P}-label{-webkit-font-smoothing:auto !important;line-height:19.2px !important}
.et_pb_section .${P}-subtitle{-webkit-font-smoothing:auto !important;padding-bottom:0 !important}
.et_pb_section .${P}-content h3{-webkit-font-smoothing:auto !important;margin:0 0 4px !important;padding:0 !important}
.et_pb_section .${P}-content p{-webkit-font-smoothing:auto !important;padding-bottom:0 !important}

@media(max-width:768px){
  .${P}-title{font-size:28px}
  .${P}-item{flex-direction:column;gap:4px}
  .${P}-time{min-width:auto}
  .${P}-timeline{padding-left:24px}
  .${P}-item::before{left:-30px}
}
${base.reducedMotion(`.${P}-section *{transition:none !important}`)}
`.trim();
}

module.exports = { blocks, css, schema };
