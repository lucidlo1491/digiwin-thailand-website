/**
 * Divi 5 Section Builder: Partner Path — Understanding Checks
 * Section 4: Dark theme variant with 3 pain point cards
 * ContentSpec §3.4
 *
 * REFACTORED: Uses card-grid-dark template (407 → ~60 lines)
 */

const darkGrid = require('../../lib/templates/card-grid-dark');

const DATA = {
  adminLabel: 'Partner Understanding Checks',
  sectionPrefix: 'pchecks',
  background: 'linear-gradient(165deg, #0f1419 0%, #1a2632 50%, #000864 100%)',
  headerStyle: 'span',
  header: {
    label: 'For ERP Implementers',
    title: 'Trapped in These Cycles?',
    subtitle: 'The consulting model has structural limits. Recognizing these traps is the first step to escaping them.',
  },
  svgScene: `<svg aria-hidden="true" viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <rect x="150" y="550" width="50" height="250" rx="3" stroke="#ffffff" stroke-width="1.5" fill="none" opacity="0.15"/>
    <rect x="240" y="450" width="50" height="350" rx="3" stroke="#ffffff" stroke-width="1.5" fill="none" opacity="0.18"/>
    <rect x="330" y="370" width="50" height="430" rx="3" stroke="#ffffff" stroke-width="1.5" fill="none" opacity="0.2"/>
    <rect x="420" y="320" width="50" height="480" rx="3" stroke="#ffffff" stroke-width="1.5" fill="none" opacity="0.22"/>
    <rect x="510" y="300" width="50" height="500" rx="3" stroke="#ffffff" stroke-width="1.5" fill="none" opacity="0.22"/>
    <rect x="600" y="290" width="50" height="510" rx="3" stroke="#ffffff" stroke-width="1.5" fill="none" opacity="0.2"/>
    <rect x="690" y="285" width="50" height="515" rx="3" stroke="#ffffff" stroke-width="1.5" fill="none" opacity="0.18"/>
    <line x1="100" y1="270" x2="800" y2="270" stroke="#00AFF0" stroke-width="2.5" stroke-dasharray="12 8" opacity="0.3"/>
    <text x="810" y="278" font-family="'Noto Sans',sans-serif" font-size="16" font-weight="700" fill="#ffffff" opacity="0.1">CAP</text>
    <circle cx="1050" cy="350" r="90" stroke="#ffffff" stroke-width="2" fill="none" opacity="0.12"/>
    <line x1="1050" y1="350" x2="1050" y2="280" stroke="#ffffff" stroke-width="2.5" opacity="0.15" stroke-linecap="round"/>
    <line x1="1050" y1="350" x2="1100" y2="370" stroke="#ffffff" stroke-width="2" opacity="0.12" stroke-linecap="round"/>
    <circle cx="1050" cy="350" r="4" fill="#ffffff" opacity="0.2"/>
    <line x1="1050" y1="262" x2="1050" y2="270" stroke="#ffffff" stroke-width="1.5" opacity="0.15"/>
    <line x1="1050" y1="430" x2="1050" y2="438" stroke="#ffffff" stroke-width="1.5" opacity="0.15"/>
    <line x1="962" y1="350" x2="970" y2="350" stroke="#ffffff" stroke-width="1.5" opacity="0.15"/>
    <line x1="1130" y1="350" x2="1138" y2="350" stroke="#ffffff" stroke-width="1.5" opacity="0.15"/>
    <text x="900" y="580" font-family="'Noto Sans',sans-serif" font-size="20" font-weight="800" fill="#ffffff" opacity="0.05">HEADCOUNT = REVENUE</text>
    <line x1="1250" y1="200" x2="1250" y2="700" stroke="#ffffff" stroke-width="1" opacity="0.08"/>
    <line x1="1300" y1="280" x2="1300" y2="620" stroke="#ffffff" stroke-width="1" opacity="0.08"/>
    <line x1="1350" y1="350" x2="1350" y2="550" stroke="#ffffff" stroke-width="1" opacity="0.08"/>
    <path d="M1240 400 L1250 390 L1260 400" stroke="#00AFF0" stroke-width="1.5" fill="none" opacity="0.2"/>
    <path d="M1240 500 L1250 510 L1260 500" stroke="#00AFF0" stroke-width="1.5" fill="none" opacity="0.2"/>
    <circle cx="180" cy="300" r="3" fill="#ffffff" opacity="0.1"/><circle cx="500" cy="200" r="4" fill="#ffffff" opacity="0.08"/>
    <circle cx="750" cy="400" r="3" fill="#00AFF0" opacity="0.15"/><circle cx="1200" cy="650" r="3.5" fill="#ffffff" opacity="0.08"/>
  </svg>`,
  cards: [
    {
      number: '01',
      title: '\u201CThe Man-Day Trap\u201D',
      quote: '\u201CYour revenue is mathematically capped by your headcount. You cannot grow your top line without proportionally increasing your payroll costs.\u201D',
      description: 'You are selling hours, not assets. Revenue = Hours Worked, making exponential growth impossible. Every January, you start at zero again.',
    },
    {
      number: '02',
      title: '\u201CCustomization Death Spiral\u201D',
      quote: '\u201CYou accept customization requests to win the deal, but then you become married to that code forever.\u201D',
      description: 'You can\u2019t upgrade clients on custom code. Support becomes a nightmare of unbillable hours. Your profit evaporated the moment you said \u201CYes\u201D to a non-standard request.',
    },
    {
      number: '03',
      title: '\u201CThe Ghost IT Burden\u201D',
      quote: '\u201CYou aren\u2019t just their ERP consultant\u2014you are their unpaid IT department, fixing Wi-Fi, printers, and user discipline issues.\u201D',
      description: 'Most Thai SMEs lack a dedicated IT manager. You end up subsidizing their operations with your margins \u2014 absorbing unbillable work you feel forced to do just to keep the relationship alive.',
    },
  ],
  cta: { text: 'See the Way Out', href: '/partner-program.html' },
};

module.exports = {
  blocks: () => darkGrid.blocks(DATA),
  css: () => darkGrid.css(DATA),
};
