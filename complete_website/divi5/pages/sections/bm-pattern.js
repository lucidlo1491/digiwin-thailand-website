/**
 * bm-pattern.js — "You Know This Pattern" Cycle Section (S2)
 *
 * 4-step cycle grid with connecting gradient line + repeat callout.
 * Custom builder (no template match — unique step-circle + connecting line pattern).
 *
 * Source: business-model.html lines 762-801
 */

const base = require('../../lib/templates/_base');

const P = 'pat'; // CSS prefix

// ════════════════════════════════════════════════════════════════
// ICONS (inline SVG — simple enough to survive wp_kses)
// ════════════════════════════════════════════════════════════════
const ICONS = {
  check: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  doc: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  alert: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',
  repeat: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" aria-hidden="true"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
};

const STEPS = [
  { icon: ICONS.check, title: 'Win the Project', body: 'After weeks of proposals, demos, and negotiations, you finally land a customer.' },
  { icon: ICONS.doc, title: 'Deliver Expertise', body: 'Your team does great work. You solve hard problems. You make them successful.' },
  { icon: ICONS.alert, title: 'Project Ends', body: 'Knowledge transferred. Their team can handle it. They don\u2019t need you anymore.' },
  { icon: ICONS.refresh, title: 'Start from Zero', body: 'Back to hunting. More proposals. More negotiations. The cycle repeats.' },
];

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const stepsHTML = STEPS.map(s => `
        <div class="${P}-step">
          <div class="${P}-icon">${s.icon}</div>
          <h3>${s.title}</h3>
          <p>${s.body}</p>
        </div>`).join('');

  const html = `
    <div class="${P}-section">
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">You Know This Pattern</h2>
          <p class="${P}-subtitle">Every SI lives the same cycle. It feels productive. But it\u2019s a trap.</p>
        </div>
        <div class="${P}-cycle">${stepsHTML}
        </div>
        <div class="${P}-repeat">
          <p>And the cycle repeats\u2026 forever ${ICONS.repeat}</p>
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Pattern: The Cycle Trap', html, 'Pattern: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === PATTERN CYCLE (S2) === */
.${P}-section{padding:100px 24px;background:#fff;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-inner{max-width:1000px;margin:0 auto;position:relative;z-index:2}
.${P}-header{text-align:center;margin:0 0 60px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:40px;font-weight:700;color:#000864;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;max-width:600px;margin:0 auto;padding:0}
.${P}-cycle{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;position:relative}
.${P}-cycle::before{content:'';position:absolute;top:48px;left:12.5%;right:12.5%;height:3px;background:linear-gradient(90deg,#dc2626,#f97316,#eab308,#dc2626);border-radius:2px;z-index:0}
.${P}-step{text-align:center;position:relative;z-index:1}
.${P}-icon{width:96px;height:96px;background:linear-gradient(135deg,#fef2f2 0%,#fee2e2 100%);border:2px solid #fecaca;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 24px}
.${P}-icon svg{width:40px;height:40px;stroke:#dc2626;fill:none}
.${P}-step h3{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:600;color:#000864;line-height:1.6;margin:0 0 12px;padding:0}
.${P}-step p{font-family:'Noto Sans',sans-serif;font-size:14px;color:#5b6b80;line-height:1.6;margin:0;padding:0}
.${P}-repeat{text-align:center;margin-top:48px;padding:32px;background:linear-gradient(135deg,#fef2f2,#fff5f5);border:1px solid #fecaca;border-radius:16px}
.${P}-repeat p{font-family:'Noto Sans',sans-serif;font-size:20px;color:#991b1b;font-weight:500;margin:0;padding:0}
.${P}-repeat p svg{width:24px;height:24px;stroke:#dc2626;vertical-align:middle;margin-left:8px;fill:none}
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-cycle{grid-template-columns:repeat(2,1fr);gap:48px}
  .${P}-cycle::before{display:none}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
  .${P}-cycle{grid-template-columns:1fr}
  .${P}-header{margin-bottom:40px}
}
${base.reducedMotion(`.${P}-step{transition:none !important}`)}`.trim();
}

module.exports = { blocks, css, STEPS };
