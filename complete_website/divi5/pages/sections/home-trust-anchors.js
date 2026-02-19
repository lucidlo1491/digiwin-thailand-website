/**
 * home-trust-anchors.js — Trust Anchors Section Builder
 *
 * ContentSpec §3.8 — 5 Credibility Cards
 * White section with dark gradient cards in 2-column grid.
 */

const { codeModule, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../../lib/modules');
const superD = require('../../lib/super-d');

const SPEC = {
  cardBg: 'linear-gradient(135deg, #000864 0%, #1e3a5f 50%, #0f172a 100%)',
  cardRadius: '20px',
  cardPadding: '36px',
  cardMinHeight: '280px',
  gridGap: '24px',
};

const cards = [
  { badge: '300378', title: 'Financial Stability',
    headline: 'We are a publicly traded company with transparent financials\u2014the stability partners and clients need for a 10-year relationship.',
    detail: 'Our financials are publicly audited and regulated by the Shenzhen Stock Exchange. That means you\'re partnering with a company that has the governance, capital, and long-term commitment to support your factory for years to come \u2014 not a vendor that might disappear after implementation.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00AFF0" stroke-width="1.5"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>',
    bgIcon: '<svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="#00AFF0" stroke-width="1"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>' },
  { badge: 'Foxconn FII', title: 'Manufacturing DNA',
    headline: 'Strategic investment from Foxconn Industrial Internet \u2014 validation that our software meets the standards of the world\'s largest electronics manufacturer.',
    detail: 'This isn\'t generic IT software \u2014 it\'s built for industrial reality. When the company that manufactures iPhones trusts DigiWin on their production lines, that speaks to the depth and reliability of our platform at the highest level of manufacturing complexity.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00AFF0" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
    bgIcon: '<svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="#00AFF0" stroke-width="1"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>' },
  { badge: 'Since 1982', title: 'Manufacturing Focus Since Day One',
    headline: 'We have spent <span class="dw-years">44</span> years exclusively in manufacturing software\u2014built on decades of shop-floor reality, not temporary tech trends.',
    detail: 'DigiWin has survived every technology shift (DOS \u2192 Windows \u2192 Cloud) while staying focused on manufacturing. We didn\'t pivot to crypto or retail POS when it was trendy.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00AFF0" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    bgIcon: '<svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="#00AFF0" stroke-width="1"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>' },
  { badge: '50,000+', title: 'Proven at Scale',
    headline: 'Our methodology is refined from 50,000+ implementations across Asia\u2014adopt a proven standard, not a beta product.',
    detail: 'The software has been refined through thousands of real-world factory deployments across Asia. It handles the specific complexities \u2014 Thai tax rules, sub-contracting workflows, circular bills of materials \u2014 that often break smaller systems.',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00AFF0" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    bgIcon: '<svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="#00AFF0" stroke-width="1"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' },
  { badge: 'BOI Ready', title: 'BOI Compliance', fullWidth: true,
    headline: 'Production-order-level material reconciliation that passes BOI (Board of Investment) audits \u2014 a capability no competitor can match.',
    detail: 'One factory saved 10M+ THB/year in supplementary taxes. Our system tracks actual material consumption per production order, not theoretical bill-of-materials calculations \u2014 the gap that triggers costly audit findings. <a href="/blog/boi-compliance-jin-hai.html" style="color:#0369a1">Read the full story \u2192</a>',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00AFF0" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
    bgIcon: '<svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="#00AFF0" stroke-width="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>' },
];

function blocks() {
  const cardsHTML = cards.map((card) => `
    <div class="trust-card${card.fullWidth ? ' trust-card-full' : ''}">
      <div class="trust-bg-icon">${card.bgIcon}</div>
      <div class="trust-icon">${card.icon}</div>
      <div class="trust-badge">${card.badge}</div>
      <h3 class="trust-card-title">${card.title}</h3>
      <p class="trust-headline">${card.headline}</p>
      <p class="trust-detail">${card.detail}</p>
    </div>
  `).join('');

  // Trust section scene SVG — shield, stock ticker, timeline, globe
  const sceneSvg = `<div class="trust-scene" aria-hidden="true">
    <svg viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <path d="M250 180 L250 380 Q250 480 350 530 Q450 480 450 380 L450 180 L350 140Z" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
      <path d="M320 300 L345 325 L400 270" stroke="#00AFF0" stroke-width="2.5" fill="none" opacity="0.2"/>
      <path d="M600 400 L650 380 L700 420 L750 350 L800 370 L850 300 L900 320 L950 280 L1000 300 L1050 260 L1100 280" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.15"/>
      <text x="1110" y="285" font-family="'Noto Sans',sans-serif" font-size="12" font-weight="700" fill="#000864" opacity="0.1">300378</text>
      <circle cx="1250" cy="200" r="45" stroke="#000864" stroke-width="2" fill="none" opacity="0.12"/>
      <circle cx="1250" cy="200" r="35" stroke="#000864" stroke-width="1" fill="none" opacity="0.08"/>
      <text x="1250" y="205" font-family="'Noto Sans',sans-serif" font-size="10" font-weight="700" fill="#000864" opacity="0.1" text-anchor="middle">ISO</text>
      <line x1="100" y1="750" x2="1300" y2="750" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
      <line x1="100" y1="740" x2="100" y2="760" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
      <line x1="400" y1="740" x2="400" y2="760" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
      <line x1="700" y1="740" x2="700" y2="760" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
      <line x1="1000" y1="740" x2="1000" y2="760" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
      <line x1="1300" y1="740" x2="1300" y2="760" stroke="#000864" stroke-width="1.5" opacity="0.12"/>
      <text x="100" y="780" font-family="'Noto Sans',sans-serif" font-size="11" fill="#000864" opacity="0.08" text-anchor="middle">1982</text>
      <text x="700" y="780" font-family="'Noto Sans',sans-serif" font-size="11" fill="#000864" opacity="0.08" text-anchor="middle">2006</text>
      <text x="1300" y="780" font-family="'Noto Sans',sans-serif" font-size="11" fill="#000864" opacity="0.08" text-anchor="middle">2026</text>
      <circle cx="800" cy="150" r="60" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.1"/>
      <ellipse cx="800" cy="150" rx="30" ry="60" stroke="#000864" stroke-width="1" fill="none" opacity="0.07"/>
      <line x1="740" y1="150" x2="860" y2="150" stroke="#000864" stroke-width="1" opacity="0.07"/>
      <circle cx="780" cy="135" r="3" fill="#00AFF0" opacity="0.2"/>
      <circle cx="820" cy="160" r="3" fill="#00AFF0" opacity="0.15"/>
      <circle cx="790" cy="170" r="2.5" fill="#00AFF0" opacity="0.12"/>
      <circle cx="500" cy="500" r="3" fill="#000864" opacity="0.1"/>
      <circle cx="1100" cy="600" r="4" fill="#000864" opacity="0.07"/>
      <circle cx="150" cy="550" r="3" fill="#000864" opacity="0.08"/>
    </svg>
  </div>`;

  // Scene SVG is INSIDE trust-section (same Code Module) so position:absolute references .trust-section
  const html = `
    <div class="trust-section">
    ${sceneSvg}
    <div class="trust-container">
      <div class="trust-header">
        <div class="trust-header-label">Why Trust DigiWin</div>
        <h2 class="trust-title">Credibility Without Hype</h2>
        <p class="trust-subtitle">We don't just claim to be different. Here's the evidence.</p>
      </div>
      <div class="trust-grid">
        ${cardsHTML}
      </div>
    </div>
    </div>
  `;

  return [
    sectionOpen({ adminLabel: 'Trust Anchors: 5 Credibility Cards', css: 'selector{background:transparent !important;padding:0 !important;}' }),
    rowOpen({ css: 'selector{max-width:100% !important;width:100% !important;padding:0 !important;}' }),
    columnOpen({ css: 'selector{padding:0 !important;}' }),
    codeModule(html, 'Trust Anchors: Scene SVG + 5 Cards'),
    columnClose(),
    rowClose(),
    sectionClose(),
  ];
}

function css() {
  return `
/* === TRUST SCENE SVG (explicit dimensions for Divi Code Module) === */
.trust-scene{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:0.20}
.trust-scene svg{width:100%;height:100%}
/* === TRUST ANCHORS === */
.trust-section{background:#ffffff;padding:100px 40px;position:relative;overflow:hidden;-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto;font-size:16px}
.trust-container{max-width:1200px;margin:0 auto}
.trust-header{text-align:center;max-width:700px;margin:0 auto 60px}
.trust-header-label{font-family:'Noto Sans',sans-serif;font-size:13px;font-weight:600;color:#0369a1;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:12px;line-height:1.6}
.trust-title{font-family:'Noto Sans',sans-serif;font-weight:700;font-size:clamp(32px,3.5vw,44px);color:#000864;line-height:1.15;margin:0 0 16px}
.trust-subtitle{font-family:'Noto Sans',sans-serif;font-weight:400;font-size:18px;color:#5b6b80;line-height:1.6;margin:0}
.trust-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:${SPEC.gridGap}}
.trust-card{background:${SPEC.cardBg};border-radius:${SPEC.cardRadius};padding:${SPEC.cardPadding};min-height:${SPEC.cardMinHeight};position:relative;overflow:hidden;transition:opacity 0.2s,transform 0.2s;line-height:1.6}
.trust-card::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");opacity:0.03;pointer-events:none;z-index:1}
.trust-card>*{position:relative;z-index:2}
.trust-card:hover{box-shadow:0 24px 48px rgba(0,0,0,0.25)}
.trust-card-full{grid-column:1 / -1}
.trust-bg-icon{position:absolute;top:-20px;right:-20px;width:180px;height:180px;opacity:0.08;z-index:1;transition:all 0.4s ease;pointer-events:none}
.trust-card:hover .trust-bg-icon{opacity:0.12;transform:scale(1.05) rotate(5deg)}
.trust-icon{width:48px;height:48px;background:rgba(0,175,240,0.15);border:1px solid rgba(0,175,240,0.3);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;position:relative;z-index:2}
.trust-badge{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;color:#0369a1;background:rgba(0,175,240,0.15);border:1px solid rgba(0,175,240,0.25);padding:5px 12px;border-radius:6px;letter-spacing:0.05em;line-height:1.6;margin-bottom:14px;position:relative;z-index:2}
.trust-card-title{font-family:'Noto Sans',sans-serif;font-weight:700;font-size:22px;color:#fff;margin:0 0 12px;line-height:1.6}
.trust-headline{font-family:'Noto Sans',sans-serif;font-weight:500;font-size:15px;color:rgba(255,255,255,0.9);line-height:1.6;margin:0 0 14px;padding:0}
.trust-detail{font-family:'Noto Sans',sans-serif;font-weight:400;font-size:13px;color:rgba(255,255,255,0.75);line-height:1.65;margin:0;padding:0}
.trust-detail a{color:#0369a1;text-decoration:none;transition:color 0.3s ease}
.trust-detail a:hover{color:#00AFF0;text-decoration:underline}
@media(max-width:991px){.trust-grid{grid-template-columns:1fr}.trust-card-full{grid-column:1}}
@media(max-width:767px){.trust-card{padding:28px 24px;min-height:auto}.trust-card-title{font-size:20px}.trust-headline{font-size:14px}.trust-detail{font-size:13px}}
@media(prefers-reduced-motion:reduce){.trust-card{transition:none !important}}`;
}

module.exports = { blocks, css };
