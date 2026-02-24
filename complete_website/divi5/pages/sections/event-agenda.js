/**
 * event-agenda.js — Full-Day Agenda Section (S4)
 *
 * White background with timeline layout.
 * ContentSpec: Section 4 — Proves structure + professionalism
 */

const base = require('../../lib/templates/_base');

const P = 'evt-agd';

const AGENDA = [
  { time: '09:00 – 09:30', title: 'Registration & Networking', desc: 'Coffee, introductions, and a quick survey of your current BOI compliance process.', isBreak: false },
  { time: '09:30 – 10:30', title: 'Why BOI Audits Fail', desc: 'The gap between theoretical BOM consumption and actual production data — and why most ERPs can\'t bridge it.', isBreak: false },
  { time: '10:30 – 10:45', title: 'Coffee Break', desc: '', isBreak: true },
  { time: '10:45 – 12:00', title: 'The Jin Hai Case Study', desc: 'How one factory went from 10M+ THB/year in supplementary taxes to zero. Data walkthrough, not marketing slides.', isBreak: false },
  { time: '12:00 – 13:00', title: 'Networking Lunch', desc: '', isBreak: true },
  { time: '13:00 – 14:30', title: 'Hands-On: Building a Reconciliation Report', desc: 'Working with sample production data, you\'ll build the exact report format BOI auditors want to see.', isBreak: false },
  { time: '14:30 – 14:45', title: 'Coffee Break', desc: '', isBreak: true },
  { time: '14:45 – 15:30', title: 'Assessing Your Current System', desc: 'Framework for evaluating whether your ERP can produce production-order-level tracking — and what to do if it can\'t.', isBreak: false },
  { time: '15:30 – 16:00', title: 'Q&A + Next Steps', desc: 'Open discussion, individual compliance questions, and your take-home checklist.', isBreak: false },
];

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const items = AGENDA.map(a => `
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
    <span class="${P}-label">Full-Day Agenda</span>
    <h2 class="${P}-title">A Structured Day — Not a Sales Pitch</h2>
    <p class="${P}-subtitle">Every session is designed around what you'll take home — not what we want to sell.</p>
  </div>
  <div class="${P}-timeline">
    ${items}
  </div>
</div>
  `;

  return base.wrapInDiviSection('Agenda', html, 'Agenda: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === AGENDA (S4) === */
.${P}-section{background:#fff;padding:80px 24px;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-inner{text-align:center;max-width:800px;margin:0 auto 48px}
.${P}-label{display:block;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:#22C55E;margin-bottom:16px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:36px;font-weight:700;color:#000864;line-height:1.3;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;margin:0;padding:0}
.${P}-timeline{max-width:800px;margin:0 auto;display:flex;flex-direction:column;gap:0;border-left:3px solid rgba(34,197,94,0.3);padding-left:32px}
.${P}-item{display:flex;gap:24px;padding:20px 0;border-bottom:1px solid #f0f0f0;position:relative}
.${P}-item::before{content:'';position:absolute;left:-38px;top:24px;width:10px;height:10px;border-radius:50%;background:#22C55E;border:2px solid #fff}
.${P}-item--break{opacity:0.6}
.${P}-item--break::before{background:#cbd5e1}
.${P}-time{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;color:#22C55E;min-width:130px;flex-shrink:0;padding-top:2px}
.${P}-item--break .${P}-time{color:#94a3b8}
.${P}-content h3{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:600;color:#000864;margin:0 0 4px;padding:0}
.${P}-content p{font-family:'Noto Sans',sans-serif;font-size:15px;font-weight:400;color:#64748b;line-height:1.6;margin:0;padding:0}

.et_pb_section .${P}-title{-webkit-font-smoothing:auto !important;line-height:1.3 !important;margin:0 0 16px !important;padding:0 !important}
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

module.exports = { blocks, css };
