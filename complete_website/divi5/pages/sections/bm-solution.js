/**
 * bm-solution.js — "There's Another Way" Solution Cards Section (S6)
 *
 * 3 green solution cards with hover effects.
 * Structure mirrors evidence cards but with green accent (not red).
 *
 * Source: business-model.html lines 973-1012
 */

const base = require('../../lib/templates/_base');

const P = 'sol'; // CSS prefix

// ════════════════════════════════════════════════════════════════
// ICONS
// ════════════════════════════════════════════════════════════════
const ICONS = {
  sun: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>',
  lock: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  trend: '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
};

const CARDS = [
  {
    icon: ICONS.sun,
    title: 'Recurring Revenue',
    body: 'Software licenses and maintenance generate predictable monthly income. Sleep on vacation. Revenue keeps coming in.',
    formula: 'Monthly Revenue = License Base \u00D7 Rate',
  },
  {
    icon: ICONS.lock,
    title: 'Sticky Relationships',
    body: 'When customers run their factory on your software, they don\u2019t leave. You become critical infrastructure, not a replaceable vendor.',
    formula: 'Churn Rate \u2192 Near Zero',
  },
  {
    icon: ICONS.trend,
    title: 'Compound Growth',
    body: 'Year 2 = Year 1 customers + new customers. Each deal adds to your base. The math finally works in your favor over time.',
    formula: 'Year N = Year N-1 + New Wins',
  },
];

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const cardsHTML = CARDS.map(c => `
        <div class="${P}-card">
          <div class="${P}-icon">${c.icon}</div>
          <h3>${c.title}</h3>
          <p>${c.body}</p>
          <div class="${P}-formula">
            <code>${c.formula}</code>
          </div>
        </div>`).join('');

  const html = `
    <div class="${P}-section">
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">There\u2019s Another Way</h2>
          <p class="${P}-subtitle">Add a product line to your services business and change the fundamental economics.</p>
        </div>
        <div class="${P}-cards">${cardsHTML}
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Solution: Another Way', html, 'Solution: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === SOLUTION CARDS (S6) === */
.${P}-section{padding:100px 24px;background:linear-gradient(180deg,#f8fafc 0%,#fff 100%);position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-inner{max-width:1200px;margin:0 auto;position:relative;z-index:2}
.${P}-header{text-align:center;margin:0 0 60px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:40px;font-weight:700;color:#000864;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;max-width:600px;margin:0 auto;padding:0}
.${P}-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.${P}-card{background:#fff;border:1px solid #86efac;border-radius:20px;padding:40px;position:relative;overflow:hidden;transition:all 0.3s ease}
.${P}-card:hover{border-color:#4ade80;box-shadow:0 12px 40px rgba(34,197,94,0.15)}
.${P}-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#22c55e,#10b981)}
.${P}-icon{width:64px;height:64px;background:linear-gradient(135deg,#22c55e,#16a34a);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:24px}
.${P}-icon svg{width:32px;height:32px;stroke:#fff;fill:none}
.${P}-card h3{font-family:'Noto Sans',sans-serif;font-size:22px;font-weight:600;color:#000864;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-card p{font-family:'Noto Sans',sans-serif;font-size:15px;color:#5b6b80;line-height:1.7;margin:0 0 24px;padding:0}
.${P}-formula{background:#f0fdf4;border-radius:12px;padding:20px;text-align:center}
.${P}-formula code{font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:600;color:#166534}
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-cards{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
  .${P}-cards{grid-template-columns:1fr}
  .${P}-header{margin-bottom:40px}
}
${base.reducedMotion(`.${P}-card{transition:none !important}`)}`.trim();
}

module.exports = { blocks, css };
