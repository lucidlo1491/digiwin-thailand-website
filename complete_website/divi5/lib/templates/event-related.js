/**
 * event-related.js — Related Events Template
 *
 * Light gray background, 3 event cards with per-card accent colors.
 *
 * Data shape:
 * {
 *   sectionPrefix: string,
 *   color: string,                    // section accent hex (for label/title)
 *   label: string,                    // e.g. 'More Upcoming Events'
 *   title: string,
 *   events: [{
 *     typeBadge: string,              // e.g. 'Workshop', 'Seminar'
 *     title: string,
 *     date: string,
 *     location: string,
 *     href: string,
 *     color: string,                  // per-card accent hex
 *   }],
 * }
 */

const base = require('./_base');

const schema = {
  description: 'Related events cards with per-card accent colors',
  category: 'event',
};

function blocks(data) {
  const P = data.sectionPrefix;

  const cards = data.events.map(e => {
    const ec = base.eventColorSurface(e.color);
    return `
    <div class="${P}-card">
      <div class="${P}-card-border" style="background:${ec.hex}"></div>
      <div class="${P}-card-body">
        <span class="${P}-badge" style="color:${ec.hex};background:${ec.bg12}">${e.typeBadge}</span>
        <h3>${e.title}</h3>
        <div class="${P}-meta">
          <div class="${P}-meta-item">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            ${e.date}
          </div>
          <div class="${P}-meta-item">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${e.location}
          </div>
        </div>
        <a href="${e.href}" class="${P}-link" style="color:${ec.hex}">Learn More
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </div>`;
  }).join('\n');

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

  return base.wrapInDiviSection(data.adminLabel || 'Related Events', html, 'Related Events: Content');
}

function css(data) {
  const P = data.sectionPrefix;
  const c = base.eventColorSurface(data.color);

  return `
/* === RELATED EVENTS === */
.${P}-section{background:#F5F7FA;padding:80px 24px;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-inner{max-width:1100px;margin:0 auto}
.${P}-label{display:block;text-align:center;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:${c.hex};margin-bottom:16px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:36px;font-weight:700;color:#000864;text-align:center;line-height:1.25;margin:0 0 16px;padding:0}
.${P}-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.${P}-card{background:#fff;border-radius:16px;overflow:hidden;transition:transform 0.3s ease,box-shadow 0.3s ease}
.${P}-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,0.08)}
.${P}-card-border{height:4px}
.${P}-card-body{padding:28px}
.${P}-badge{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;padding:4px 12px;border-radius:50px;margin-bottom:12px}
.${P}-card h3{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:600;color:#000864;line-height:1.4;margin:0 0 16px;padding:0}
.${P}-meta{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}
.${P}-meta-item{display:flex;align-items:center;gap:6px;font-family:'Noto Sans',sans-serif;font-size:14px;color:#5b6b80}
.${P}-meta-item svg{flex-shrink:0;stroke:#94a3b8}
.${P}-link{display:inline-flex;align-items:center;gap:4px;font-family:'Noto Sans',sans-serif;font-size:14px;font-weight:600;text-decoration:none;transition:opacity 0.3s ease}
.${P}-link:hover{opacity:0.8}

.et_pb_section .${P}-title{-webkit-font-smoothing:auto !important;line-height:1.25 !important;margin:0 0 16px !important;padding:0 !important}
.et_pb_section .${P}-label{-webkit-font-smoothing:auto !important;line-height:19.2px !important}
.et_pb_section .${P}-card h3{-webkit-font-smoothing:auto !important;margin:0 0 16px !important;padding:0 !important}

@media(max-width:768px){
  .${P}-grid{grid-template-columns:1fr}
  .${P}-title{font-size:28px}
}
${base.reducedMotion(`.${P}-card{transition:none !important}`)}
`.trim();
}

module.exports = { blocks, css, schema };
