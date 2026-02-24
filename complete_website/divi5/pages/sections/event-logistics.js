/**
 * event-logistics.js — Practical Details Section (S7)
 *
 * Light gray background, icon + label + value grid.
 * ContentSpec: Section 7 — Remove friction: venue, parking, what to bring
 */

const base = require('../../lib/templates/_base');

const P = 'evt-log';

const ITEMS = [
  { icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>', label: 'Date', value: 'Saturday, March 15, 2026' },
  { icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', label: 'Time', value: '09:00 – 16:00 (registration opens 08:30)' },
  { icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>', label: 'Location', value: 'Bangkok, Thailand (venue details sent after registration)' },
  { icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>', label: 'Cost', value: 'Free (sponsored by DigiWin Thailand)' },
  { icon: '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>', label: 'Language', value: 'Presentation in Thai with English materials' },
  { icon: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>', label: 'What to Bring', value: 'Laptop recommended for hands-on session. Sample data provided.' },
  { icon: '<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>', label: 'Parking', value: 'Available at venue (details sent after registration)' },
  { icon: '<path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>', label: 'Lunch', value: 'Included — networking lunch and coffee breaks throughout the day' },
];

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const logItems = ITEMS.map(item => `
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
    <span class="${P}-label">Practical Details</span>
    <h2 class="${P}-title">Everything You Need to Know</h2>
    <div class="${P}-grid">
      ${logItems}
    </div>
  </div>
</div>
  `;

  return base.wrapInDiviSection('Logistics', html, 'Logistics: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === LOGISTICS (S7) === */
.${P}-section{background:#F5F7FA;padding:80px 24px;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-inner{max-width:900px;margin:0 auto}
.${P}-label{display:block;text-align:center;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:#15803d;margin-bottom:16px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:36px;font-weight:700;color:#000864;text-align:center;line-height:1.25;margin:0 0 16px;padding:0}
.${P}-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
.${P}-item{display:flex;gap:16px;align-items:flex-start;background:#fff;border-radius:12px;padding:20px}
.${P}-icon{width:40px;height:40px;border-radius:8px;background:rgba(21,128,61,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.${P}-icon svg{stroke:#15803d}
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

module.exports = { blocks, css };
