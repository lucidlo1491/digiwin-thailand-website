/**
 * products-grid.js — Products Hub Grid Section (S2)
 *
 * Data-driven: CARDS array → 4 product cards (2-col grid, full <a> tags).
 * Card hover: translateY(-12px), color-coded box-shadow, accent bar scaleX, icon scale.
 * Two background SVGs: ecosystem illustration + section scene.
 * diviListReset for product feature <ul> lists.
 *
 * Source: products.html line 559
 */

const base = require('../../lib/templates/_base');

const P = 'prod-grid'; // CSS prefix

// ════════════════════════════════════════════════════════════════
// SVG CONSTANTS
// ════════════════════════════════════════════════════════════════
const CHECK_SVG = '<svg aria-hidden="true" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5"/></svg>';
const ARROW_SVG = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';

// ════════════════════════════════════════════════════════════════
// CARD ICON SVGs — one per product
// ════════════════════════════════════════════════════════════════
const ICON_SVGS = {
  erp: `<svg aria-hidden="true" viewBox="0 0 40 40">
    <rect x="4" y="4" width="32" height="32" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <path d="M4 14h32" stroke="currentColor" stroke-width="1.5"/>
    <path d="M14 14v22" stroke="currentColor" stroke-width="1.5"/>
    <rect x="17" y="18" width="8" height="4" rx="1" fill="currentColor" opacity="0.3"/>
    <rect x="17" y="25" width="12" height="4" rx="1" fill="currentColor" opacity="0.3"/>
    <rect x="17" y="32" width="6" height="2" rx="0.5" fill="currentColor" opacity="0.5"/>
    <circle cx="9" cy="9" r="2" fill="currentColor" opacity="0.6"/>
  </svg>`,
  mes: `<svg aria-hidden="true" viewBox="0 0 40 40">
    <path d="M4 32h32" stroke="currentColor" stroke-width="1.5"/>
    <rect x="6" y="18" width="8" height="14" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <rect x="16" y="12" width="8" height="20" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <rect x="26" y="8" width="8" height="24" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="10" cy="22" r="2" fill="currentColor" opacity="0.6"/>
    <circle cx="20" cy="16" r="2" fill="currentColor" opacity="0.6"/>
    <circle cx="30" cy="12" r="2" fill="currentColor" opacity="0.6"/>
    <path d="M10 24v4M20 18v10M30 14v14" stroke="currentColor" stroke-width="1" opacity="0.4"/>
  </svg>`,
  wms: `<svg aria-hidden="true" viewBox="0 0 40 40">
    <path d="M20 4L4 12v20l16 8 16-8V12L20 4z" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <path d="M4 12l16 8 16-8" stroke="currentColor" stroke-width="1.5"/>
    <path d="M20 20v20" stroke="currentColor" stroke-width="1.5"/>
    <rect x="8" y="22" width="6" height="6" fill="currentColor" opacity="0.3" transform="skewY(-10)"/>
    <rect x="26" y="22" width="6" height="6" fill="currentColor" opacity="0.3" transform="skewY(10)"/>
    <circle cx="20" cy="12" r="2" fill="currentColor" opacity="0.6"/>
  </svg>`,
  aiot: `<svg aria-hidden="true" viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="20" cy="20" r="2" fill="currentColor"/>
    <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" stroke-width="1" opacity="0.4" stroke-dasharray="4 2"/>
    <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2" stroke-dasharray="2 4"/>
    <circle cx="8" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="32" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="8" cy="28" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="32" cy="28" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <path d="M11 14l5 3M29 14l-5 3M11 26l5-3M29 26l-5-3" stroke="currentColor" stroke-width="1" opacity="0.5"/>
  </svg>`,
};

// ════════════════════════════════════════════════════════════════
// DATA — one entry per product card
// ════════════════════════════════════════════════════════════════
const CARDS = [
  {
    slug: 'erp',
    eyebrow: 'Core System',
    title: 'ERP: T100 & iGP',
    tagline: '\u201CThe Brain\u201D \u2014 Financial Control & Visibility',
    desc: 'Complete enterprise resource planning built for manufacturing complexity. From multi-entity financials to shop floor scheduling, manage your entire operation with software that speaks manufacturing.',
    features: [
      'Multi-currency consolidation',
      'Advanced BOM/routing',
      'Integrated MRP/APS',
      'Real-time cost analysis',
    ],
    ctaText: 'Explore ERP Solutions',
    color: '#00AFF0',
    iconGradient: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  },
  {
    slug: 'mes',
    eyebrow: 'Shop Floor',
    title: 'MES & SFT',
    tagline: '\u201CEyes on Production\u201D \u2014 Real-Time Visibility',
    desc: 'Stop guessing what\u2019s happening on the floor. Real-time production tracking connects every workstation to your management dashboard. See what\u2019s happening\u2014as it happens.',
    features: [
      'Live work order tracking',
      'Quality data collection',
      'Operator analytics',
      'Complete traceability',
    ],
    ctaText: 'Explore MES Solutions',
    color: '#10b981',
    iconGradient: 'linear-gradient(135deg, #10b981 0%, #02D28C 100%)',
  },
  {
    slug: 'wms',
    eyebrow: 'Warehouse',
    title: 'WMS: sFLS',
    tagline: '\u201CEvery Item Accounted For\u201D \u2014 Zero Ghost Inventory',
    desc: 'Smart warehouse management that knows where everything is, guides picking and putaway, and keeps inventory accurate without manual counts. End the ghost inventory problem.',
    features: [
      'Barcode & RFID ready',
      'Zone/bin management',
      'Wave picking',
      'FIFO/FEFO automation',
    ],
    ctaText: 'Explore WMS Solutions',
    color: '#f59e0b',
    iconGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  {
    slug: 'aiot',
    eyebrow: 'Smart Factory',
    title: 'AIoT Platform',
    tagline: '\u201CIntelligence at Scale\u201D \u2014 Machine Connectivity',
    desc: 'Machine connectivity and AI-powered analytics that turn your equipment data into competitive advantage. Predictive maintenance, OEE optimization, and energy management.',
    features: [
      'Universal connectivity',
      'Real-time OEE',
      'Predictive maintenance',
      'Energy monitoring',
    ],
    ctaText: 'Explore AIoT Solutions',
    color: '#8b5cf6',
    iconGradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  },
];

// ════════════════════════════════════════════════════════════════
// BACKGROUND SVGs
// ════════════════════════════════════════════════════════════════

// Ecosystem illustration (left + right + center hub + data flow lines)
const ECOSYSTEM_SVG = `<svg aria-hidden="true" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
  <defs>
    <filter id="pg-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2" result="glow"/>
      <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <marker id="pg-arrow-blue" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#00AFF0" opacity="0.5"/>
    </marker>
    <marker id="pg-arrow-green" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#10b981" opacity="0.5"/>
    </marker>
    <marker id="pg-arrow-amber" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#f59e0b" opacity="0.5"/>
    </marker>
  </defs>

  <!-- Left: Factory building silhouette -->
  <g transform="translate(60, 200)" opacity="0.18">
    <path d="M0 500 L0 150 L60 100 L120 150 L120 80 L180 50 L240 80 L240 500" fill="none" stroke="#000864" stroke-width="2"/>
    <path d="M60 100 L60 150 M180 50 L180 80" stroke="#000864" stroke-width="1.5"/>
    <rect x="150" y="20" width="15" height="30" fill="none" stroke="#000864" stroke-width="1.5"/>
    <path d="M157 20 Q157 10 165 5 Q158 8 152 5 Q160 10 157 20" fill="none" stroke="#000864" stroke-width="1" opacity="0.6"/>

    <!-- AIoT layer -->
    <g transform="translate(20, 380)">
      <rect x="0" y="0" width="50" height="60" rx="4" fill="none" stroke="#8b5cf6" stroke-width="1.5"/>
      <circle cx="25" cy="25" r="12" fill="none" stroke="#8b5cf6" stroke-width="1"/>
      <circle cx="25" cy="25" r="4" fill="#8b5cf6" opacity="0.4"/>
      <circle cx="40" cy="10" r="4" fill="#8b5cf6" opacity="0.6">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
      </circle>
      <rect x="70" y="10" width="45" height="50" rx="4" fill="none" stroke="#8b5cf6" stroke-width="1.5"/>
      <rect x="80" y="25" width="25" height="20" fill="none" stroke="#8b5cf6" stroke-width="1"/>
      <circle cx="105" cy="20" r="4" fill="#8b5cf6" opacity="0.6">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <rect x="135" y="5" width="55" height="55" rx="4" fill="none" stroke="#8b5cf6" stroke-width="1.5"/>
      <path d="M145 35 L155 25 L165 35 L175 20 L180 30" fill="none" stroke="#8b5cf6" stroke-width="1"/>
      <circle cx="178" cy="15" r="4" fill="#8b5cf6" opacity="0.6">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <text x="95" y="85" text-anchor="middle" fill="#8b5cf6" font-family="JetBrains Mono, monospace" font-size="9" font-weight="500">MACHINES + SENSORS</text>
    </g>

    <!-- MES layer -->
    <g transform="translate(20, 260)">
      <line x1="0" y1="50" x2="200" y2="50" stroke="#10b981" stroke-width="2"/>
      <circle cx="10" cy="50" r="6" fill="none" stroke="#10b981" stroke-width="1.5"/>
      <circle cx="190" cy="50" r="6" fill="none" stroke="#10b981" stroke-width="1.5"/>
      <g><rect x="30" y="30" width="30" height="20" rx="2" fill="none" stroke="#10b981" stroke-width="1.5"/><text x="45" y="44" text-anchor="middle" fill="#10b981" font-size="8">WS1</text></g>
      <g><rect x="85" y="30" width="30" height="20" rx="2" fill="none" stroke="#10b981" stroke-width="1.5"/><text x="100" y="44" text-anchor="middle" fill="#10b981" font-size="8">WS2</text></g>
      <g><rect x="140" y="30" width="30" height="20" rx="2" fill="none" stroke="#10b981" stroke-width="1.5"/><text x="155" y="44" text-anchor="middle" fill="#10b981" font-size="8">WS3</text></g>
      <rect x="55" y="42" width="12" height="8" rx="1" fill="#10b981" opacity="0.5">
        <animate attributeName="x" values="20;180" dur="4s" repeatCount="indefinite"/>
      </rect>
      <text x="100" y="75" text-anchor="middle" fill="#10b981" font-family="JetBrains Mono, monospace" font-size="9" font-weight="500">PRODUCTION FLOOR</text>
    </g>

    <!-- WMS layer -->
    <g transform="translate(20, 150)">
      <g>
        <rect x="0" y="0" width="60" height="70" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
        <line x1="0" y1="23" x2="60" y2="23" stroke="#f59e0b" stroke-width="1"/>
        <line x1="0" y1="46" x2="60" y2="46" stroke="#f59e0b" stroke-width="1"/>
        <rect x="5" y="5" width="15" height="14" fill="#f59e0b" opacity="0.3"/>
        <rect x="25" y="5" width="15" height="14" fill="#f59e0b" opacity="0.2"/>
        <rect x="5" y="28" width="15" height="14" fill="#f59e0b" opacity="0.4"/>
        <rect x="40" y="28" width="15" height="14" fill="#f59e0b" opacity="0.3"/>
        <rect x="25" y="51" width="15" height="14" fill="#f59e0b" opacity="0.2"/>
        <rect x="40" y="51" width="15" height="14" fill="#f59e0b" opacity="0.4"/>
      </g>
      <g transform="translate(90, 35)">
        <rect x="0" y="15" width="25" height="20" rx="2" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
        <rect x="25" y="5" width="4" height="30" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
        <circle cx="5" cy="38" r="4" fill="none" stroke="#f59e0b" stroke-width="1"/>
        <circle cx="20" cy="38" r="4" fill="none" stroke="#f59e0b" stroke-width="1"/>
      </g>
      <g transform="translate(140, 0)">
        <rect x="0" y="0" width="50" height="70" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
        <line x1="0" y1="23" x2="50" y2="23" stroke="#f59e0b" stroke-width="1"/>
        <line x1="0" y1="46" x2="50" y2="46" stroke="#f59e0b" stroke-width="1"/>
        <rect x="5" y="5" width="12" height="14" fill="#f59e0b" opacity="0.3"/>
        <rect x="20" y="28" width="12" height="14" fill="#f59e0b" opacity="0.4"/>
        <rect x="33" y="51" width="12" height="14" fill="#f59e0b" opacity="0.2"/>
      </g>
      <text x="100" y="90" text-anchor="middle" fill="#f59e0b" font-family="JetBrains Mono, monospace" font-size="9" font-weight="500">WAREHOUSE</text>
    </g>
  </g>

  <!-- Right: ERP Business Intelligence -->
  <g transform="translate(1100, 200)" opacity="0.18">
    <rect x="0" y="100" width="200" height="300" rx="4" fill="none" stroke="#00AFF0" stroke-width="2"/>
    <g stroke="#00AFF0" stroke-width="1">
      <rect x="20" y="130" width="30" height="25" rx="2" fill="none"/>
      <rect x="65" y="130" width="30" height="25" rx="2" fill="none"/>
      <rect x="110" y="130" width="30" height="25" rx="2" fill="none"/>
      <rect x="155" y="130" width="30" height="25" rx="2" fill="none"/>
      <rect x="20" y="175" width="30" height="25" rx="2" fill="none"/>
      <rect x="65" y="175" width="30" height="25" rx="2" fill="none"/>
      <rect x="110" y="175" width="30" height="25" rx="2" fill="none"/>
      <rect x="155" y="175" width="30" height="25" rx="2" fill="none"/>
    </g>
    <g transform="translate(30, 240)">
      <rect x="0" y="0" width="55" height="40" rx="3" fill="none" stroke="#00AFF0" stroke-width="1.5"/>
      <path d="M8 30 L18 20 L28 25 L38 12 L48 18" fill="none" stroke="#00AFF0" stroke-width="1.5"/>
      <text x="27" y="50" text-anchor="middle" fill="#00AFF0" font-size="7">FINANCE</text>
    </g>
    <g transform="translate(110, 240)">
      <rect x="0" y="0" width="55" height="40" rx="3" fill="none" stroke="#00AFF0" stroke-width="1.5"/>
      <line x1="5" y1="12" x2="50" y2="12" stroke="#00AFF0" stroke-width="1"/>
      <line x1="5" y1="22" x2="50" y2="22" stroke="#00AFF0" stroke-width="1"/>
      <line x1="5" y1="32" x2="50" y2="32" stroke="#00AFF0" stroke-width="1"/>
      <text x="27" y="50" text-anchor="middle" fill="#00AFF0" font-size="7">PLANNING</text>
    </g>
    <g transform="translate(70, 310)">
      <rect x="0" y="0" width="60" height="45" rx="3" fill="none" stroke="#00AFF0" stroke-width="1.5"/>
      <text x="30" y="18" text-anchor="middle" fill="#00AFF0" font-size="16" font-weight="bold">98%</text>
      <text x="30" y="32" text-anchor="middle" fill="#00AFF0" font-size="7">OEE</text>
      <text x="30" y="55" text-anchor="middle" fill="#00AFF0" font-size="7">VISIBILITY</text>
    </g>
    <text x="100" y="420" text-anchor="middle" fill="#00AFF0" font-family="JetBrains Mono, monospace" font-size="10" font-weight="500">BUSINESS INTELLIGENCE</text>
  </g>

  <!-- Center: ONE DATABASE hub -->
  <g transform="translate(700, 450)">
    <circle r="50" fill="#000864" opacity="0.08"/>
    <circle r="35" fill="none" stroke="#000864" stroke-width="2" opacity="0.15"/>
    <circle r="20" fill="none" stroke="#00AFF0" stroke-width="2" opacity="0.3"/>
    <circle r="8" fill="#00AFF0" opacity="0.4">
      <animate attributeName="r" values="6;10;6" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite"/>
    </circle>
    <text y="70" text-anchor="middle" fill="#000864" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600" opacity="0.4">ONE DATABASE</text>
  </g>

  <!-- Data flow lines (animated dashes) -->
  <g opacity="0.35">
    <path d="M280 580 Q400 550 640 470" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="8 4" marker-end="url(#pg-arrow-blue)">
      <animate attributeName="stroke-dashoffset" values="24;0" dur="2s" repeatCount="indefinite"/>
    </path>
    <text x="400" y="540" fill="#8b5cf6" font-family="JetBrains Mono, monospace" font-size="8" opacity="0.8">machine data</text>
  </g>
  <g opacity="0.35">
    <path d="M280 480 Q450 460 640 450" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="8 4" marker-end="url(#pg-arrow-blue)">
      <animate attributeName="stroke-dashoffset" values="24;0" dur="2.2s" repeatCount="indefinite"/>
    </path>
    <text x="420" y="445" fill="#10b981" font-family="JetBrains Mono, monospace" font-size="8" opacity="0.8">production status</text>
  </g>
  <g opacity="0.35">
    <path d="M280 380 Q480 390 640 430" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="8 4" marker-end="url(#pg-arrow-blue)">
      <animate attributeName="stroke-dashoffset" values="24;0" dur="1.8s" repeatCount="indefinite"/>
    </path>
    <text x="440" y="375" fill="#f59e0b" font-family="JetBrains Mono, monospace" font-size="8" opacity="0.8">inventory levels</text>
  </g>
  <g opacity="0.35">
    <path d="M760 450 Q900 430 1100 380" fill="none" stroke="#00AFF0" stroke-width="2.5" stroke-dasharray="8 4" marker-end="url(#pg-arrow-blue)">
      <animate attributeName="stroke-dashoffset" values="24;0" dur="2s" repeatCount="indefinite"/>
    </path>
    <text x="920" y="400" fill="#00AFF0" font-family="JetBrains Mono, monospace" font-size="8" opacity="0.8">unified insights</text>
  </g>
  <g opacity="0.25">
    <path d="M1100 520 Q900 560 760 480" fill="none" stroke="#00AFF0" stroke-width="1.5" stroke-dasharray="6 4">
      <animate attributeName="stroke-dashoffset" values="0;20" dur="2.5s" repeatCount="indefinite"/>
    </path>
    <text x="920" y="550" fill="#00AFF0" font-family="JetBrains Mono, monospace" font-size="8" opacity="0.7">work orders</text>
  </g>
  <g opacity="0.25">
    <path d="M640 480 Q500 530 280 530" fill="none" stroke="#10b981" stroke-width="1.5" stroke-dasharray="6 4">
      <animate attributeName="stroke-dashoffset" values="0;20" dur="2.8s" repeatCount="indefinite"/>
    </path>
    <text x="450" y="520" fill="#10b981" font-family="JetBrains Mono, monospace" font-size="8" opacity="0.7">schedule updates</text>
  </g>
</svg>`;

// Section scene (hub + 4 corners + checkmarks + edge lines)
const SCENE_SVG = `<svg aria-hidden="true" viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <circle cx="700" cy="450" r="60" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
  <circle cx="700" cy="450" r="30" stroke="#00AFF0" stroke-width="1.5" fill="none" opacity="0.12"/>
  <circle cx="700" cy="450" r="6" fill="#000864" opacity="0.2"/>
  <rect x="200" y="150" width="100" height="70" rx="8" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
  <line x1="300" y1="185" x2="645" y2="420" stroke="#000864" stroke-width="1.5" opacity="0.1"/>
  <rect x="1100" y="150" width="100" height="70" rx="8" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
  <line x1="1100" y1="185" x2="755" y2="420" stroke="#000864" stroke-width="1.5" opacity="0.1"/>
  <rect x="200" y="650" width="100" height="70" rx="8" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
  <line x1="300" y1="685" x2="645" y2="480" stroke="#000864" stroke-width="1.5" opacity="0.1"/>
  <rect x="1100" y="650" width="100" height="70" rx="8" stroke="#000864" stroke-width="2" fill="none" opacity="0.15"/>
  <line x1="1100" y1="685" x2="755" y2="480" stroke="#000864" stroke-width="1.5" opacity="0.1"/>
  <path d="M470 300 L480 310 L500 290" stroke="#00AFF0" stroke-width="2" fill="none" opacity="0.2"/>
  <path d="M900 300 L910 310 L930 290" stroke="#00AFF0" stroke-width="2" fill="none" opacity="0.2"/>
  <path d="M470 580 L480 590 L500 570" stroke="#00AFF0" stroke-width="2" fill="none" opacity="0.18"/>
  <path d="M900 580 L910 590 L930 570" stroke="#00AFF0" stroke-width="2" fill="none" opacity="0.18"/>
  <line x1="0" y1="300" x2="200" y2="300" stroke="#000864" stroke-width="1" opacity="0.08"/>
  <line x1="1200" y1="300" x2="1400" y2="300" stroke="#000864" stroke-width="1" opacity="0.08"/>
  <line x1="0" y1="600" x2="200" y2="600" stroke="#000864" stroke-width="1" opacity="0.08"/>
  <line x1="1200" y1="600" x2="1400" y2="600" stroke="#000864" stroke-width="1" opacity="0.08"/>
  <circle cx="400" cy="340" r="4" fill="#000864" opacity="0.12"/>
  <circle cx="1000" cy="340" r="4" fill="#000864" opacity="0.12"/>
  <circle cx="500" cy="550" r="3" fill="#000864" opacity="0.08"/>
  <circle cx="900" cy="550" r="3" fill="#000864" opacity="0.08"/>
</svg>`;

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const cardsHTML = CARDS.map((card) => {
    const featuresHTML = card.features.map(f =>
      `<li><span class="prod-card-check prod-card-check--${card.slug}">${CHECK_SVG}</span>${f}</li>`
    ).join('');

    return `
          <a href="/products/${card.slug}/" class="prod-card prod-card--${card.slug}">
            <div class="prod-card-header">
              <div class="prod-card-icon prod-card-icon--${card.slug}">
                ${ICON_SVGS[card.slug]}
              </div>
              <div class="prod-card-titles">
                <div class="prod-card-eyebrow prod-card-eyebrow--${card.slug}">${card.eyebrow}</div>
                <h3 class="prod-card-title">${card.title}</h3>
              </div>
            </div>
            <div class="prod-card-tagline prod-card-tagline--${card.slug}">${card.tagline}</div>
            <p class="prod-card-desc">${card.desc}</p>
            <ul class="prod-card-features">${featuresHTML}</ul>
            <div class="prod-card-cta prod-card-cta--${card.slug}">
              ${card.ctaText}
              ${ARROW_SVG}
            </div>
          </a>`;
  }).join('');

  const html = `
    <div class="${P}-section">
      <div class="${P}-ecosystem">${ECOSYSTEM_SVG}</div>
      <div class="${P}-dots" aria-hidden="true"></div>
      <div class="${P}-scene">${SCENE_SVG}</div>

      <div class="${P}-header" style="position:relative;z-index:2">
        <p class="${P}-label">The Complete Stack</p>
        <h2 class="${P}-title">Four Products. One Ecosystem.</h2>
        <p class="${P}-subtitle">Each product is powerful alone. Together, they\u2019re unstoppable.</p>
      </div>

      <div class="${P}-cards" style="position:relative;z-index:2">
        ${cardsHTML}
      </div>
    </div>`;

  return base.wrapInDiviSection('Grid', html, 'Grid: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  // Color map for per-variant rules
  const colors = {
    erp:  { main: '#00AFF0', grad: 'linear-gradient(135deg,#00AFF0,#003CC8)', radial: 'rgba(0,175,240,0.1)', eyebrow: '#0369a1', cta: '#0369a1' },
    mes:  { main: '#10b981', grad: 'linear-gradient(135deg,#10b981,#02D28C)', radial: 'rgba(16,185,129,0.1)', eyebrow: '#10b981', cta: '#10b981' },
    wms:  { main: '#f59e0b', grad: 'linear-gradient(135deg,#f59e0b,#d97706)', radial: 'rgba(245,158,11,0.1)', eyebrow: '#f59e0b', cta: '#d97706' },
    aiot: { main: '#8b5cf6', grad: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', radial: 'rgba(139,92,246,0.1)', eyebrow: '#8b5cf6', cta: '#8b5cf6' },
  };

  // Per-variant accent bar (::before), glow (::after), icon, eyebrow, tagline, check, cta
  const variantCSS = Object.entries(colors).map(([slug, c]) => `
.prod-card--${slug}::before{background:${c.grad}}
.prod-card--${slug}::after{background:radial-gradient(circle,${c.radial} 0%,transparent 70%)}
.prod-card-icon--${slug}{background:${c.grad}}
.prod-card-icon--${slug}::after{background:linear-gradient(135deg,${c.radial.replace('0.1','0.3')},transparent)}
.prod-card-eyebrow--${slug}{color:${c.eyebrow}}
.prod-card-tagline--${slug}::before{background:${c.main}}
.prod-card-check--${slug}{background:${c.grad}}
.prod-card-cta--${slug}{color:${c.cta}}
.prod-card--${slug}:hover{box-shadow:0 32px 80px ${c.radial};border-color:transparent}`
  ).join('');

  return `
/* === PRODUCTS GRID (S2) === */
.${P}-section{padding:120px 0;background:linear-gradient(180deg,#f8fafc 0%,#fff 30%,#fff 70%,#f8fafc 100%);position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-section::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#00AFF0,transparent)}

/* Background layers */
.${P}-ecosystem{position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;pointer-events:none;opacity:0.6}
.${P}-ecosystem svg{position:absolute;width:100%;height:100%;min-width:1200px}
.${P}-dots{position:absolute;top:0;left:0;right:0;bottom:0;background-image:radial-gradient(circle,rgba(0,175,240,0.03) 1px,transparent 1px);background-size:30px 30px;pointer-events:none}
${base.svgSceneCSS(P)}

/* Section header */
.${P}-header{max-width:700px;margin:0 auto 80px;text-align:center;position:relative;z-index:2}
.${P}-label{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;color:#0369a1;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:16px;display:flex;align-items:center;justify-content:center;gap:12px}
.${P}-label::before,.${P}-label::after{content:'';width:40px;height:1px;background:linear-gradient(90deg,transparent,#00AFF0);flex-shrink:0}
.${P}-label::after{background:linear-gradient(90deg,#00AFF0,transparent)}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:44px;font-weight:700;color:#000864;margin:0 0 16px 0;letter-spacing:-0.02em;line-height:1.6;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;color:#5b6b80;line-height:1.6;margin:0;padding:0}

/* Card grid */
.${P}-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:36px;max-width:1200px;margin:0 auto;padding:0 24px;position:relative;z-index:2}

/* Card base */
.prod-card{background:#ffffff;border-radius:24px;padding:48px;box-shadow:0 4px 24px rgba(0,0,0,0.04);border:1px solid #e8eef3;transition:all 0.5s cubic-bezier(0.4,0,0.2,1);display:flex;flex-direction:column;text-decoration:none;position:relative;overflow:hidden}

/* Accent bar (top) */
.prod-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;transform:scaleX(0);transform-origin:left;transition:transform 0.5s ease}

/* Glow orb (bottom-right) */
.prod-card::after{content:'';position:absolute;bottom:-50px;right:-50px;width:150px;height:150px;border-radius:50%;opacity:0;transition:opacity 0.5s ease}

/* Card hover */
.prod-card:hover{transform:translateY(-12px)}
.prod-card:hover::before{transform:scaleX(1)}
.prod-card:hover::after{opacity:1}
.prod-card:hover .prod-card-icon{transform:scale(1.08) rotate(-5deg)}
.prod-card:hover .prod-card-icon::after{opacity:1}
.prod-card:hover .prod-card-cta{gap:16px}
.prod-card:hover .prod-card-cta svg{transform:translateX(4px)}

/* Card header (icon + titles) */
.prod-card-header{display:flex;align-items:flex-start;gap:24px;margin-bottom:28px}
.prod-card-icon{width:80px;height:80px;border-radius:20px;display:flex;align-items:center;justify-content:center;flex-shrink:0;position:relative;transition:all 0.4s ease}
.prod-card-icon svg{width:40px;height:40px;stroke:#ffffff;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
.prod-card-icon::after{content:'';position:absolute;inset:-4px;border-radius:24px;opacity:0;transition:opacity 0.4s ease;z-index:-1}
.prod-card-titles{flex:1}
.prod-card-eyebrow{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px}
.prod-card-title{font-family:'Noto Sans',sans-serif;font-size:26px;font-weight:700;color:#000864;margin:0;letter-spacing:-0.01em;line-height:1.6}

/* Tagline */
.prod-card-tagline{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:500;color:#000864;margin-bottom:16px;display:flex;align-items:center;gap:12px;line-height:1.6}
.prod-card-tagline::before{content:'';width:24px;height:2px;flex-shrink:0}

/* Description */
.prod-card-desc{font-family:'Noto Sans',sans-serif;font-size:16px;color:#5b6b80;line-height:1.7;margin-bottom:28px;flex:1}

/* Features list */
.prod-card-features{list-style:none;padding:0;margin:0 0 32px 0;display:grid;grid-template-columns:1fr 1fr;gap:14px}
.prod-card-features li{font-family:'Noto Sans',sans-serif;font-size:14px;color:#000864;display:flex;align-items:center;gap:10px}
.prod-card-check{width:22px;height:22px;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.prod-card-check svg{width:12px;height:12px;stroke:#ffffff;stroke-width:3;fill:none}

/* CTA */
.prod-card-cta{font-family:'Noto Sans',sans-serif;font-size:15px;font-weight:600;display:flex;align-items:center;gap:10px;margin-top:auto;transition:gap 0.3s ease}
.prod-card-cta svg{width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:2;transition:transform 0.3s ease}

/* Per-product variants */
${variantCSS}

/* Divi list reset */
${base.diviListReset(P)}

/* Responsive: tablet */
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${P}-cards{grid-template-columns:1fr;max-width:600px}
  .${P}-title{font-size:36px}
  .${P}-section{padding:80px 0}
}

/* Responsive: mobile */
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:60px 0}
  .${P}-title{font-size:32px}
  .prod-card{padding:32px}
  .prod-card-header{flex-direction:column;gap:16px}
  .prod-card-features{grid-template-columns:1fr}
  .${P}-header{margin-bottom:48px}
}

/* Reduced motion */
${base.reducedMotion(`.prod-card,.prod-card::before,.prod-card::after,.prod-card-icon,.prod-card-icon::after,.prod-card-cta,.prod-card-cta svg{animation:none !important;transition:none !important}`)}`.trim();
}

module.exports = { blocks, css };
