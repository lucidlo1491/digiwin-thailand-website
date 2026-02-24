/**
 * event-related.js — Related Events Section (S9)
 *
 * Light gray background, 3 upcoming event cards.
 * ContentSpec: Section 9 — Keep them in funnel if this event doesn't fit
 */

const base = require('../../lib/templates/_base');

const P = 'evt-rel';

const EVENTS = [
  {
    type: 'seminar',
    typeBadge: 'Seminar',
    title: 'Production Transparency: From Paper Reports to Real-Time Dashboards',
    date: 'April 10, 2026',
    location: 'Bangkok, Thailand',
    href: '/events/production-transparency-seminar/',
    color: '#00AFF0',
    colorBg: 'rgba(0,175,240,0.12)',
  },
  {
    type: 'workshop',
    typeBadge: 'Workshop',
    title: 'Hands-On: Setting Up Shop Floor Data Collection with MES',
    date: 'April 24, 2026',
    location: 'Bangkok, Thailand',
    href: '/events/shop-floor-data-workshop/',
    color: '#15803d',
    colorBg: 'rgba(21,128,61,0.12)',
  },
  {
    type: 'factory-visit',
    typeBadge: 'Factory Visit',
    title: 'Live Factory Tour: See DigiWin MES in Action',
    date: 'May 8, 2026',
    location: 'EEC Industrial Zone',
    href: '/events/factory-tour-mes/',
    color: '#F59E0B',
    colorBg: 'rgba(245,158,11,0.12)',
  },
];

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const cards = EVENTS.map(e => `
    <div class="${P}-card">
      <div class="${P}-card-border" style="background:${e.color}"></div>
      <div class="${P}-card-body">
        <span class="${P}-badge" style="color:${e.color};background:${e.colorBg}">${e.typeBadge}</span>
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
        <a href="${e.href}" class="${P}-link" style="color:${e.color}">Learn More
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </div>`).join('\n');

  const html = `
<div class="${P}-section">
  <div class="${P}-inner">
    <span class="${P}-label">More Upcoming Events</span>
    <h2 class="${P}-title">Continue Your Learning Journey</h2>
    <div class="${P}-grid">
      ${cards}
    </div>
  </div>
</div>
  `;

  return base.wrapInDiviSection('Related Events', html, 'Related Events: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === RELATED EVENTS (S9) === */
.${P}-section{background:#F5F7FA;padding:80px 24px;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-inner{max-width:1100px;margin:0 auto}
.${P}-label{display:block;text-align:center;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:#15803d;margin-bottom:16px}
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

module.exports = { blocks, css };
