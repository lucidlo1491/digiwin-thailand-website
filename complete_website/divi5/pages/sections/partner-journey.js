/**
 * partner-journey.js — Continue Your Research (S6) + How You Grow (S7)
 *
 * Shared builder: both use identical .journey-* step structure.
 * S6: numbered circles (1,2,3), blue gradient, connecting line, per-step CTAs
 * S7: lettered circles (R,S,G), custom gradients, no CTAs, no connecting line
 *
 * Source: partner-program.html lines 1370-1424
 */

const base = require('../../lib/templates/_base');

const P = 'journey'; // CSS prefix shared by both sections

// ════════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════════

const RESEARCH_STEPS = [
  {
    number: '1',
    gradient: 'linear-gradient(135deg, #00AFF0, #003CC8)',
    title: 'Deepen the \u201CWhy\u201D',
    body: 'Understand why your margin erosion is <em>structural</em>, not circumstantial. See if the diagnosis matches your reality.',
    cta: { text: 'The Evolving Business Model \u2192', href: '/partner-program/business-model.html' },
  },
  {
    number: '2',
    gradient: 'linear-gradient(135deg, #00AFF0, #003CC8)',
    title: 'Evaluate the \u201CWeapon\u201D',
    body: 'See if DigiWin gives you a better weapon to fight the price war against low-cost ERP vendors and specialized MES providers.',
    cta: { text: 'The Solution Stack \u2192', href: '/partner-program/solutions.html' },
  },
  {
    number: '3',
    gradient: 'linear-gradient(135deg, #00AFF0, #003CC8)',
    title: 'Verify the \u201CMath\u201D',
    body: 'Run the numbers yourself. Realistic projections in Thai Baht, conservative scenarios, and the actual margin structure.',
    cta: { text: 'Partner Economics \u2192', href: '/partner-program/economics.html' },
  },
];

const TIER_STEPS = [
  {
    number: 'R',
    gradient: 'linear-gradient(135deg, #94a3b8, #5b6b80)',
    title: 'Ready (Entry)',
    body: '<strong>Competitive margin from Day 1</strong><br>Co-delivery required. We work your first projects together. Earn while you learn.',
  },
  {
    number: 'S',
    gradient: 'linear-gradient(135deg, #a8a29e, #78716c)',
    title: 'Silver (Collaborative)',
    body: '<strong>Strong margin</strong><br>Supervised delivery. You lead projects; we provide backend support and escalation.',
  },
  {
    number: 'G',
    gradient: 'linear-gradient(135deg, #fbbf24, #d97706)',
    title: 'Gold (Independent)',
    body: '<strong>Highest-tier margin</strong><br>Full autonomy. You sell, deliver, and support without our direct involvement. Your team, your clients, your business.',
  },
];

// ════════════════════════════════════════════════════════════════
// SECTION BUILDER
// ════════════════════════════════════════════════════════════════
function buildSection(config) {
  const { id, adminLabel, bg, header, steps, showLine } = config;

  const stepsHTML = steps.map(step => {
    const ctaHTML = step.cta
      ? `<a href="${step.cta.href}" class="${P}-step-cta">${step.cta.text}</a>`
      : '';
    return `
        <div class="${P}-step">
          <div class="${P}-number" style="background:${step.gradient}"><span>${step.number}</span></div>
          <h3>${step.title}</h3>
          <p>${step.body}</p>
          ${ctaHTML}
        </div>`;
  }).join('');

  const lineClass = showLine ? ` ${P}-steps--line` : '';

  const html = `
    <div class="${P}-section ${P}-section--${id}" style="background:${bg}">
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">${header.title}</h2>
          <p class="${P}-subtitle">${header.subtitle}</p>
        </div>
        <div class="${P}-steps${lineClass}">${stepsHTML}
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection(adminLabel, html, `${adminLabel}: Content`);
}

// ── S6: Research Journey ────────────────────────────────────────
const RESEARCH_CONFIG = {
  id: 'research',
  adminLabel: 'Journey: Continue Your Research',
  bg: 'linear-gradient(180deg, #f8fafc 0%, #fff 100%)',
  showLine: true,
  header: {
    title: 'Continue Your Research',
    subtitle: 'You\u2019re skeptical\u2014good. Explore the details before we talk.',
  },
  steps: RESEARCH_STEPS,
};

// ── S7: Tier Ascension ──────────────────────────────────────────
const TIER_CONFIG = {
  id: 'tiers',
  adminLabel: 'Journey: How You Grow',
  bg: '#fff',
  showLine: true,
  header: {
    title: 'How You Grow With Us',
    subtitle: 'Clear milestones define your progression from co-delivery to full autonomy \u2014 and higher margins at every stage.',
  },
  steps: TIER_STEPS,
};

// ════════════════════════════════════════════════════════════════
// SHARED CSS
// ════════════════════════════════════════════════════════════════
function sharedCSS() {
  return `
/* === JOURNEY SECTIONS (S6+S7) === */
.${P}-section{padding:100px 24px 120px;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-section--tiers{padding-top:60px}
.${P}-inner{max-width:1200px;margin:0 auto;position:relative;z-index:2}
.${P}-header{text-align:center;max-width:800px;margin:0 auto 60px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:40px;font-weight:700;color:#000864;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;max-width:600px;margin:0 auto;padding:0}
.${P}-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;position:relative}
.${P}-steps--line::before{content:'';position:absolute;top:48px;left:12.5%;right:12.5%;height:3px;background:linear-gradient(90deg,#00AFF0,#10b981);border-radius:2px;z-index:0}
.${P}-step{text-align:center;position:relative;z-index:1}
.${P}-number{width:96px;height:96px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;box-shadow:0 8px 24px rgba(0,175,240,0.3)}
.${P}-number span{font-family:'Noto Sans',sans-serif;font-size:32px;font-weight:700;color:#fff}
.${P}-step h3{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:600;color:#000864;margin:0 0 12px;padding:0}
.${P}-step p{font-family:'Noto Sans',sans-serif;font-size:14px;color:#5b6b80;line-height:1.6;margin:0;padding:0}
.${P}-step-cta{display:inline-block;margin-top:16px;font-family:'Noto Sans',sans-serif;font-size:14px;font-weight:600;color:#0369a1;background:rgba(0,175,240,0.08);border:1px solid rgba(0,175,240,0.2);padding:10px 20px;border-radius:8px;text-decoration:none;transition:all 0.3s ease}
.${P}-step-cta:hover{background:rgba(0,175,240,0.15);border-color:#00AFF0;transform:translateY(-1px)}
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-steps{grid-template-columns:repeat(2,1fr);gap:48px}
  .${P}-steps--line::before{display:none}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
  .${P}-section--tiers{padding-top:40px}
  .${P}-steps{grid-template-columns:1fr}
  .${P}-header{margin-bottom:40px}
}
${base.reducedMotion(`.${P}-step-cta{transition:none !important}`)}`.trim();
}

// ════════════════════════════════════════════════════════════════
// EXPORTS
// ════════════════════════════════════════════════════════════════
module.exports = {
  journeyResearch: {
    blocks: () => buildSection(RESEARCH_CONFIG),
    css: () => sharedCSS(),
  },
  journeyTiers: {
    blocks: () => buildSection(TIER_CONFIG),
    css: () => '', // CSS already emitted by journeyResearch
  },
  RESEARCH_CONFIG,
  RESEARCH_STEPS,
  TIER_CONFIG,
  TIER_STEPS,
};
