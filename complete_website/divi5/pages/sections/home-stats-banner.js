/**
 * home-stats-banner.js — Stats Banner Section Builder
 *
 * ContentSpec §3.7 — 6 Key Numbers
 * Dark gradient with animated counters, grain texture, blue glow.
 *
 * REFACTORED: Uses stats-banner template (203 → ~45 lines)
 */

const statsBanner = require('../../lib/templates/stats-banner');

const DATA = {
  adminLabel: 'Stats Banner: 6 Key Numbers',
  sectionPrefix: 'stats',
  background: 'linear-gradient(165deg, #0f1419 0%, #1a2632 40%, #000864 100%)',
  padding: '100px 40px',
  gridGap: '48px',
  numberSize: 'clamp(48px, 6vw, 72px)',
  numberColor: '#0369a1',
  numberWeight: '800',
  numberTracking: '-0.03em',
  labelSize: '11px',
  labelColor: 'rgba(255,255,255,0.75)',
  labelSpacing: '0.12em',
  particles: 'bold',
  waveFade: true,
  superD: {
    class: 'stats-deco',
    variant: 'outline',
    position: 'corner-tr',
    opacity: 0.08,
    label: 'Decoration: Super D Corner',
    width: '25%',
    minHeight: '25vh',
  },
  stats: [
    { number: '44', label: 'Years in Manufacturing Software', animated: true },
    { number: '50,000+', label: 'Factory Deployments Across Asia', animated: true },
    { number: '100+', label: 'Thai Implementations', animated: true },
    { number: '80%', label: "of Taiwan's Top 2,000 Manufacturers", animated: true },
    { number: '54%', label: 'Taiwan Manufacturing Solutions Market Share', animated: true },
    { number: '300378', label: 'Shenzhen Stock Exchange', animated: false },
  ],
  source: 'Source: Common Wealth Magazine, 2023',
};

module.exports = {
  DATA,
  blocks: () => statsBanner.blocks(DATA),
  css: () => statsBanner.css(DATA),
};
