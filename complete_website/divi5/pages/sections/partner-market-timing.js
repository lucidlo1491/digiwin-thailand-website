/**
 * partner-market-timing.js — Why Now: Market Timing (S8)
 *
 * 3 stat cards with colored numbers (red/amber/green) + urgency messaging.
 *
 * Source: partner-program.html lines 1427-1454
 */

const base = require('../../lib/templates/_base');

const P = 'mkt'; // CSS prefix

// ════════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════════
const HEADER = {
  label: 'Why Now',
  title: 'The Thai Market Window Is Open',
  subtitle: 'Three converging forces are creating a rare opportunity for ERP partners in Thailand.',
};

const CARDS = [
  {
    stat: '2027',
    color: '#b91c1c',
    title: 'Legacy ERP End-of-Life',
    body: 'Legacy enterprise ERP systems are reaching end of maintenance. Thai manufacturers on aging platforms must migrate \u2014 and the upgrade path from incumbent vendors is often prohibitively expensive for SMEs. This creates a migration window for manufacturing-focused alternatives.',
  },
  {
    stat: '~20',
    color: '#b45309',
    title: 'Competitors Scaling Fast',
    body: 'Chinese ERP vendors each now have ~20 staff in Thailand and growing. The window to establish market position is narrowing. Partners who move first lock in territory before competitors build their own channel networks.',
  },
  {
    stat: '8,000',
    color: '#15803d',
    title: 'Target Factories Identified',
    body: 'From Thailand\u2019s manufacturing base, we\u2019ve identified 8,000 genuine targets. Only 113 are properly qualified so far \u2014 leaving 7,000+ untouched opportunities for partners to pursue.',
  },
];

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const cardsHTML = CARDS.map(card => `
        <div class="${P}-card">
          <div class="${P}-stat" style="color:${card.color}">${card.stat}</div>
          <h3>${card.title}</h3>
          <p>${card.body}</p>
        </div>`).join('');

  const html = `
    <div class="${P}-section">
      <div class="${P}-inner">
        <div class="${P}-header">
          <div class="${P}-label">${HEADER.label}</div>
          <h2 class="${P}-title">${HEADER.title}</h2>
          <p class="${P}-subtitle">${HEADER.subtitle}</p>
        </div>
        <div class="${P}-grid">${cardsHTML}
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Market Timing: Why Now', html, 'Market Timing: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === MARKET TIMING (S8) === */
.${P}-section{background:#F5F7FA;padding:80px 0;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-inner{max-width:1200px;margin:0 auto;padding:0 24px;position:relative;z-index:2}
.${P}-header{text-align:center;margin-bottom:48px}
.${P}-label{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:#0369a1;margin-bottom:12px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:40px;font-weight:700;color:#000864;margin:0 0 16px;padding:0;line-height:1.2}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;color:#666;max-width:700px;margin:0 auto;line-height:1.6;padding:0}
.${P}-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.${P}-card{background:#fff;border-radius:16px;padding:32px;border:1px solid #e8eef3}
.${P}-stat{font-family:'JetBrains Mono',monospace;font-size:32px;font-weight:700;margin-bottom:12px;line-height:1}
.${P}-card h3{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:600;color:#000864;line-height:1.6;margin:0 0 8px;padding:0}
.${P}-card p{font-family:'Noto Sans',sans-serif;font-size:15px;color:#666;line-height:1.6;margin:0;padding:0}
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-grid{grid-template-columns:repeat(2,1fr)}
  .${P}-section{padding:70px 0}
  .${P}-header{margin-bottom:40px}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:60px 0}
  .${P}-grid{grid-template-columns:1fr}
  .${P}-title{font-size:28px}
  .${P}-header{margin-bottom:32px}
}
${base.reducedMotion(``)}`.trim();
}

module.exports = { blocks, css };
