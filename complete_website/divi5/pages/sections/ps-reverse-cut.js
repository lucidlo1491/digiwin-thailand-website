/**
 * ps-reverse-cut.js — Reverse Cut Strategy Section (S4)
 *
 * Built from scratch. 3 phase cards with amber accent, navy client
 * experience boxes, comparison table with red strikethrough / green new.
 * No Super D, no particles, no wave.
 *
 * Source: solutions.html lines 1324-1406
 */

const base = require('../../lib/templates/_base');

const P = 'ps-rc'; // CSS prefix

// ════════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════════
const PHASES = [
  {
    tag: 'Phase 1',
    title: 'The Wedge',
    desc: 'Sell MES as the \u201CShop Floor Enforcer\u201D that fixes production data accuracy. <strong>\u201CKeep their current ERP for Finance. Use Digiwin for the factory floor.\u201D</strong>',
    expQuote: '\u201CFinally, I can see what\u2019s actually happening on the floor.\u201D',
  },
  {
    tag: 'Phase 2',
    title: 'The Contrast',
    desc: 'Client realizes Digiwin MES is flexible and \u201Cmanufacturing-native\u201D while their legacy ERP is rigid. The \u201Cintegration tax\u201D of maintaining two systems becomes annoying.',
    expQuote: '\u201CWhy is updating our legacy ERP so painful when Digiwin just works?\u201D',
  },
  {
    tag: 'Phase 3',
    title: 'The Replacement',
    desc: 'When legacy ERP needs upgrade or license renewal, propose T100. <strong>\u201CYou already run your factory on Digiwin. Why not run your books on it too?\u201D</strong>',
    expQuote: '\u201CLet\u2019s just consolidate everything on Digiwin.\u201D',
  },
];

const TABLE_ROWS = [
  { metric: 'Budget',     old: '5M+ THB',              new: '~1M THB' },
  { metric: 'Timeline',   old: '9-18 months',          new: '3-6 months' },
  { metric: 'Disruption', old: 'High (rip-and-replace)', new: 'Low (overlay)' },
  { metric: 'Client Risk', old: 'High',                 new: 'Low' },
];

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const phasesHTML = PHASES.map(ph => `
            <div class="${P}-phase">
              <div class="${P}-phase-hd">
                <span class="${P}-tag">${ph.tag}</span>
                <h3>${ph.title}</h3>
              </div>
              <p>${ph.desc}</p>
              <div class="${P}-exp">
                <span class="${P}-exp-label">Client Experience:</span>
                <span class="${P}-exp-quote">${ph.expQuote}</span>
              </div>
            </div>`).join('');

  const theadHTML = `<thead><tr><th scope="col">Metric</th><th scope="col">Full ERP Replacement</th><th scope="col">MES Entry (Reverse Cut)</th></tr></thead>`;
  const tbodyHTML = TABLE_ROWS.map(r => `
              <tr>
                <td>${r.metric}</td>
                <td class="${P}-old" data-label="Full ERP">${r.old}</td>
                <td class="${P}-new" data-label="Reverse Cut">${r.new}</td>
              </tr>`).join('');

  const html = `
    <div class="${P}-section">
      <div class="${P}-inner">
        <div class="${P}-header">
          <span class="${P}-label">THE REVERSE CUT STRATEGY</span>
          <h2 class="${P}-title">How to Win Enterprise ERP Accounts</h2>
          <p class="${P}-subtitle">Don\u2019t fight the castle at the front gate. Enter through the factory door with MES, make yourself indispensable, and win the ERP business from the inside out.</p>
        </div>
        <div class="${P}-grid">${phasesHTML}
        </div>
        <div class="${P}-comparison">
          <h4>Why It Works: Lower Risk Threshold</h4>
          <table class="${P}-table">
            <caption class="sr-only">Comparison of Full ERP Replacement versus MES Reverse Cut entry approach</caption>
            ${theadHTML}
            <tbody>${tbodyHTML}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Reverse Cut Strategy', html, 'Reverse Cut: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === REVERSE CUT STRATEGY (S4) === */
.${P}-section{padding:100px 24px;background:#fff;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-inner{max-width:1100px;margin:0 auto;position:relative;z-index:2}
.${P}-header{text-align:center;margin-bottom:60px}
.${P}-label{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;color:#92400e;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;display:block}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:40px;font-weight:700;color:#000864;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;max-width:700px;margin:0 auto;padding:0}
.${P}-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:48px}
.${P}-phase{background:linear-gradient(180deg,#f8fafc 0%,#fff 100%);border:1px solid #e2e8f0;border-radius:20px;padding:32px}
.${P}-phase-hd{margin-bottom:16px}
.${P}-tag{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;color:#92400e;background:#fef3c7;padding:4px 10px;border-radius:50px;margin-bottom:8px;display:inline-block}
.${P}-phase h3{font-family:'Noto Sans',sans-serif;font-size:22px;font-weight:700;color:#000864;line-height:1.6;margin:0;padding:0}
.${P}-phase p{font-family:'Noto Sans',sans-serif;font-size:15px;color:#5b6b80;line-height:1.6;margin:0 0 20px;padding:0}
.${P}-phase p strong{color:#000864}
.${P}-exp{background:#000864;border-radius:12px;padding:16px}
.${P}-exp-label{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;color:rgba(255,255,255,0.75);text-transform:uppercase;letter-spacing:1px;display:block;margin-bottom:8px}
.${P}-exp-quote{font-size:14px;font-style:italic;color:#fff;line-height:1.5}
.${P}-comparison{background:linear-gradient(135deg,#000864 0%,#000432 100%);border-radius:20px;padding:40px}
.${P}-comparison h4{font-family:'Noto Sans',sans-serif;font-size:20px;font-weight:600;color:#fff;text-align:center;margin:0 0 24px;padding:0;line-height:1.6}
.${P}-table{max-width:700px;margin:0 auto;width:100%;border-collapse:collapse}
.${P}-table th{font-size:12px;font-weight:600;color:rgba(255,255,255,0.75);text-transform:uppercase;letter-spacing:0.5px;padding:0 0 20px;border-bottom:2px solid rgba(255,255,255,0.2);text-align:left}
.${P}-table td{padding:16px 8px 16px 0;font-size:15px;color:rgba(255,255,255,0.9);border-bottom:1px solid rgba(255,255,255,0.1)}
.${P}-table tbody tr:last-child td{border-bottom:none}
.${P}-table td:first-child{font-weight:600;color:#fff}
.${P}-old{color:#f87171 !important;text-decoration:line-through;opacity:0.8}
.${P}-new{font-weight:600;color:#15803d !important}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-grid{grid-template-columns:1fr}
  .${P}-table thead{display:none}
  .${P}-table tr{display:block;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.15)}
  .${P}-table td{display:flex;justify-content:space-between;align-items:center;gap:12px;border-bottom:none;padding:8px 0}
  .${P}-table td::before{content:attr(data-label);font-weight:600;color:rgba(255,255,255,0.75);font-size:12px;text-transform:uppercase;letter-spacing:0.5px;flex-shrink:0}
  .${P}-table td:first-child{font-size:16px}
  .${P}-table td:first-child::before{display:none}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
  .${P}-title{font-size:32px}
  .${P}-comparison{padding:24px}
}
/* Divi line-height + color overrides */
.et_pb_section .${P}-label{line-height:19.2px !important}
.et_pb_section .${P}-tag{line-height:17.6px !important}
.et_pb_section .${P}-exp-label{line-height:19.2px !important}
.et_pb_section .${P}-phase p strong{color:#5b6b80 !important}
${base.reducedMotion(``)}`.trim();
}

module.exports = { blocks, css };
