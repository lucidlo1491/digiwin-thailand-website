/**
 * home-trust-anchors.js — Trust Anchors Section (§3.8)
 * 5 credibility cards: dark gradient on white background.
 *
 * Template: card-grid-dark (theme: 'dark-cards')
 */

const cardGrid = require('../../lib/templates/card-grid-dark');

const DATA = {
  adminLabel: 'Trust Anchors: 5 Credibility Cards',
  sectionPrefix: 'trust',
  theme: 'dark-cards',
  background: '#ffffff',
  padding: '100px 40px',
  headerStyle: 'plain',
  headerMaxWidth: '700px',
  headerMarginBottom: '60px',
  cardBg: 'linear-gradient(135deg, #000864 0%, #1e3a5f 50%, #0f172a 100%)',
  cardGrain: true,
  cardMinHeight: '280px',
  cardPadding: '36px',
  gridCols: 2,
  gridGap: '24px',
  header: {
    label: 'Why Trust DigiWin',
    title: 'Credibility Without Hype',
    subtitle: 'We don\u2019t just claim to be different. Here\u2019s the evidence.',
  },
  svgScene: `<svg viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
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
  </svg>`,
  cards: [
    {
      badge: '300378',
      title: 'Financial Stability',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00AFF0" stroke-width="1.5"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>',
      bgIcon: '<svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="#00AFF0" stroke-width="1"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>',
      headline: 'We are a publicly traded company with transparent financials\u2014the stability partners and clients need for a 10-year relationship.',
      detail: 'Our financials are publicly audited and regulated by the Shenzhen Stock Exchange. That means you\u2019re partnering with a company that has the governance, capital, and long-term commitment to support your factory for years to come \u2014 not a vendor that might disappear after implementation.',
    },
    {
      badge: 'Foxconn FII',
      title: 'Manufacturing DNA',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00AFF0" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
      bgIcon: '<svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="#00AFF0" stroke-width="1"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
      headline: 'Strategic investment from Foxconn Industrial Internet \u2014 validation that our software meets the standards of the world\u2019s largest electronics manufacturer.',
      detail: 'This isn\u2019t generic IT software \u2014 it\u2019s built for industrial reality. When the company that manufactures iPhones trusts DigiWin on their production lines, that speaks to the depth and reliability of our platform at the highest level of manufacturing complexity.',
    },
    {
      badge: 'Since 1982',
      title: 'Manufacturing Focus Since Day One',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00AFF0" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
      bgIcon: '<svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="#00AFF0" stroke-width="1"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
      headline: 'We have spent <span class="dw-years">44</span> years exclusively in manufacturing software\u2014built on decades of shop-floor reality, not temporary tech trends.',
      detail: 'DigiWin has survived every technology shift (DOS \u2192 Windows \u2192 Cloud) while staying focused on manufacturing. We didn\u2019t pivot to crypto or retail POS when it was trendy.',
    },
    {
      badge: '50,000+',
      title: 'Proven at Scale',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00AFF0" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
      bgIcon: '<svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="#00AFF0" stroke-width="1"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
      headline: 'Our methodology is refined from 50,000+ implementations across Asia\u2014adopt a proven standard, not a beta product.',
      detail: 'The software has been refined through thousands of real-world factory deployments across Asia. It handles the specific complexities \u2014 Thai tax rules, sub-contracting workflows, circular bills of materials \u2014 that often break smaller systems.',
    },
    {
      badge: 'BOI Ready',
      title: 'BOI Compliance',
      fullWidth: true,
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00AFF0" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
      bgIcon: '<svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="#00AFF0" stroke-width="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
      headline: 'Production-order-level material reconciliation that passes BOI (Board of Investment) audits \u2014 a capability no competitor can match.',
      detail: 'One factory saved 10M+ THB/year in supplementary taxes. Our system tracks actual material consumption per production order, not theoretical bill-of-materials calculations \u2014 the gap that triggers costly audit findings. <a href="/blog/" style="color:#0369a1">Read the full story \u2192</a>',
    },
  ],
};

module.exports = {
  blocks: () => cardGrid.blocks(DATA),
  css: () => cardGrid.css(DATA),
};
