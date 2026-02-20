/**
 * home-factory-checks.js — Factory Path Understanding Checks (Track A)
 * ContentSpec: §3.3 (lines 268-369)
 *
 * Template: card-grid-dark (theme: 'light')
 * 5 pain-point cards: 3 in grid + 2 full-width. White cards on light bg.
 */

const cardGrid = require('../../lib/templates/card-grid-dark');

const DATA = {
  adminLabel: 'Factory Checks — 5 Pain Points',
  sectionPrefix: 'checks',
  theme: 'light',
  background: 'linear-gradient(165deg, #f8fafc 0%, #f1f5f9 100%)',
  padding: '100px 40px',
  headerStyle: 'pseudo',
  headerMaxWidth: '1200px',
  headerMarginBottom: '64px',
  header: {
    label: 'For Manufacturing Business Owners',
    title: 'Do You Recognize These Problems?',
    subtitle: 'If any of these sound familiar, you\u2019re not alone. These are the most common problems we solve for factories across Thailand and Asia.',
  },
  superD: { class: 'fchecks-deco', variant: 'outline', position: 'left', opacity: 0.10, label: 'Decoration: Super D Left' },
  svgScene: `<svg aria-hidden="true" viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <line x1="0" y1="180" x2="420" y2="180" stroke="#000864" stroke-width="1.5"/>
    <line x1="520" y1="180" x2="850" y2="180" stroke="#000864" stroke-width="1.5" stroke-dasharray="8 6"/>
    <line x1="950" y1="180" x2="1400" y2="180" stroke="#000864" stroke-width="1.5"/>
    <line x1="0" y1="480" x2="380" y2="480" stroke="#000864" stroke-width="1.5"/>
    <line x1="480" y1="480" x2="780" y2="480" stroke="#000864" stroke-width="1.5" stroke-dasharray="8 6"/>
    <line x1="880" y1="480" x2="1400" y2="480" stroke="#000864" stroke-width="1.5"/>
    <line x1="0" y1="720" x2="300" y2="720" stroke="#000864" stroke-width="1"/>
    <line x1="400" y1="720" x2="700" y2="720" stroke="#000864" stroke-width="1" stroke-dasharray="6 4"/>
    <line x1="800" y1="720" x2="1400" y2="720" stroke="#000864" stroke-width="1"/>
    <line x1="350" y1="0" x2="350" y2="280" stroke="#000864" stroke-width="1"/>
    <line x1="350" y1="360" x2="350" y2="580" stroke="#000864" stroke-width="1" stroke-dasharray="6 4"/>
    <line x1="750" y1="0" x2="750" y2="230" stroke="#000864" stroke-width="1"/>
    <line x1="750" y1="310" x2="750" y2="480" stroke="#000864" stroke-width="1" stroke-dasharray="6 4"/>
    <line x1="750" y1="580" x2="750" y2="900" stroke="#000864" stroke-width="1"/>
    <line x1="1100" y1="80" x2="1100" y2="380" stroke="#000864" stroke-width="1"/>
    <line x1="1100" y1="480" x2="1100" y2="900" stroke="#000864" stroke-width="1" stroke-dasharray="6 4"/>
    <rect x="100" y="130" width="80" height="100" rx="4" stroke="#000864" stroke-width="2" opacity="0.5"/>
    <rect x="112" y="145" width="20" height="20" rx="2" fill="#000864" opacity="0.15"/>
    <rect x="138" y="145" width="30" height="8" rx="1" fill="#000864" opacity="0.1"/>
    <rect x="450" y="410" width="100" height="140" rx="4" stroke="#000864" stroke-width="2" opacity="0.4"/>
    <rect x="470" y="435" width="60" height="30" rx="2" stroke="#000864" stroke-width="1" opacity="0.3"/>
    <rect x="480" y="480" width="40" height="12" rx="1" fill="#000864" opacity="0.12"/>
    <rect x="920" y="130" width="120" height="100" rx="4" stroke="#000864" stroke-width="2" opacity="0.4"/>
    <circle cx="980" cy="180" r="25" stroke="#000864" stroke-width="1.5" opacity="0.3"/>
    <rect x="1200" y="620" width="90" height="120" rx="4" stroke="#000864" stroke-width="2" opacity="0.35"/>
    <g opacity="0.6"><line x1="455" y1="170" x2="475" y2="190" stroke="#00AFF0" stroke-width="2.5"/><line x1="475" y1="170" x2="455" y2="190" stroke="#00AFF0" stroke-width="2.5"/></g>
    <g opacity="0.5"><line x1="340" y1="300" x2="360" y2="320" stroke="#00AFF0" stroke-width="2"/><line x1="360" y1="300" x2="340" y2="320" stroke="#00AFF0" stroke-width="2"/></g>
    <g opacity="0.45"><line x1="815" y1="470" x2="835" y2="490" stroke="#00AFF0" stroke-width="2"/><line x1="835" y1="470" x2="815" y2="490" stroke="#00AFF0" stroke-width="2"/></g>
    <g opacity="0.4"><line x1="1090" y1="410" x2="1110" y2="430" stroke="#00AFF0" stroke-width="2"/><line x1="1110" y1="410" x2="1090" y2="430" stroke="#00AFF0" stroke-width="2"/></g>
    <path d="M180 180 L300 180" stroke="#000864" stroke-width="1.5" opacity="0.4"/><polygon points="295,175 310,180 295,185" fill="#000864" opacity="0.4"/>
    <path d="M1040 180 L1090 180" stroke="#000864" stroke-width="1.5" opacity="0.4"/><polygon points="1085,175 1100,180 1085,185" fill="#000864" opacity="0.4"/>
    <path d="M600 380 L660 360" stroke="#000864" stroke-width="1" opacity="0.3" stroke-dasharray="4 3"/>
    <path d="M680 350 L740 330" stroke="#000864" stroke-width="1" opacity="0.2"/>
    <circle cx="220" cy="340" r="4" fill="#000864" opacity="0.35"/><circle cx="290" cy="410" r="3" fill="#000864" opacity="0.25"/>
    <circle cx="640" cy="280" r="5" fill="#00AFF0" opacity="0.25"/><circle cx="850" cy="640" r="3" fill="#000864" opacity="0.3"/>
    <circle cx="1060" cy="330" r="4" fill="#000864" opacity="0.25"/><circle cx="1300" cy="440" r="3" fill="#00AFF0" opacity="0.2"/>
    <circle cx="520" cy="760" r="4" fill="#000864" opacity="0.25"/><circle cx="160" cy="630" r="3" fill="#000864" opacity="0.3"/>
    <circle cx="1150" cy="760" r="5" fill="#000864" opacity="0.2"/><circle cx="80" cy="450" r="3" fill="#000864" opacity="0.2"/>
    <text x="560" y="300" font-family="'Noto Sans',sans-serif" font-size="36" font-weight="800" fill="#000864" opacity="0.12">?</text>
    <text x="1070" y="600" font-family="'Noto Sans',sans-serif" font-size="28" font-weight="800" fill="#000864" opacity="0.10">?</text>
    <text x="200" y="560" font-family="'Noto Sans',sans-serif" font-size="22" font-weight="800" fill="#000864" opacity="0.08">?</text>
    <rect x="620" y="600" width="35" height="25" rx="2" stroke="#000864" stroke-width="1" opacity="0.2"/>
    <line x1="625" y1="608" x2="650" y2="608" stroke="#000864" stroke-width="0.5" opacity="0.2"/>
    <line x1="625" y1="614" x2="645" y2="614" stroke="#000864" stroke-width="0.5" opacity="0.2"/>
    <line x1="625" y1="620" x2="648" y2="620" stroke="#000864" stroke-width="0.5" opacity="0.2"/>
    <rect x="1050" y="150" width="30" height="20" rx="2" stroke="#000864" stroke-width="1" opacity="0.2"/>
    <line x1="1055" y1="157" x2="1075" y2="157" stroke="#000864" stroke-width="0.5" opacity="0.2"/>
    <line x1="1055" y1="163" x2="1070" y2="163" stroke="#000864" stroke-width="0.5" opacity="0.2"/>
  </svg>`,
  sceneOpacity: 0.20,
  gridCols: 3,
  gridGap: '32px',
  gridMarginBottom: '32px',
  cards: [
    {
      number: '01',
      title: '\u201CShadow Excel\u201D Reality',
      quote: '\u201CYou know your factory isn\u2019t actually running on your current system\u2014it\u2019s running on spreadsheets because your staff finds the software too rigid or slow.\u201D',
      quoteTag: 'div',
      description: 'Your real operations live in unconnected Excel files, not in your ERP. Financial data doesn\u2019t match physical reality because planners work outside the system.',
      svgBg: {
        viewBox: '-40 0 280 320',
        content: `<rect x="40" y="20" width="60" height="18" rx="2" stroke="#000864" stroke-width="1.5" fill="none"/><rect x="110" y="20" width="80" height="18" rx="2" stroke="#000864" stroke-width="1.5" fill="none"/><rect x="20" y="48" width="80" height="18" rx="2" stroke="#000864" stroke-width="1.5" fill="none"/><rect x="110" y="48" width="60" height="18" rx="2" stroke="#000864" stroke-width="1.5" fill="none"/><rect x="60" y="76" width="90" height="18" rx="2" stroke="#000864" stroke-width="1.5" fill="none"/><rect x="30" y="104" width="50" height="18" rx="2" stroke="#000864" stroke-width="1.5" fill="none"/><rect x="90" y="104" width="100" height="18" rx="2" stroke="#000864" stroke-width="1.5" fill="none"/><rect x="50" y="132" width="70" height="18" rx="2" stroke="#000864" stroke-width="1.5" fill="none"/><rect x="130" y="132" width="60" height="18" rx="2" stroke="#000864" stroke-width="1.5" fill="none"/><line x1="70" y1="40" x2="55" y2="48" stroke="#00AFF0" stroke-width="1" stroke-dasharray="3 3"/><line x1="140" y1="40" x2="120" y2="48" stroke="#00AFF0" stroke-width="1" stroke-dasharray="3 3"/><line x1="100" y1="96" x2="65" y2="104" stroke="#00AFF0" stroke-width="1" stroke-dasharray="3 3"/><circle cx="180" cy="80" r="3" fill="#000864"/><circle cx="25" cy="90" r="2" fill="#000864"/><circle cx="195" cy="150" r="4" fill="#000864"/><circle cx="15" cy="160" r="2.5" fill="#000864"/><text x="160" y="220" font-family="'Noto Sans'" font-size="80" font-weight="800" fill="#000864" opacity="0.4">?</text>`,
      },
    },
    {
      number: '02',
      title: '\u201CThe Black Box\u201D Problem',
      quote: '\u201CYou know exactly how much raw material you bought and how many finished goods you sold, but the 3 weeks in between \u2014 your work in progress \u2014 are invisible.\u201D',
      quoteTag: 'div',
      description: 'You rely on paper reports filled out yesterday to understand what happened today. You can\u2019t see what\u2019s happening on the floor right now without walking over and asking.',
      svgBg: {
        viewBox: '0 0 220 320',
        content: `<path d="M70 80 L150 60 L200 100 L200 220 L120 240 L70 200Z" fill="#000864" opacity="0.15"/><path d="M70 80 L150 60 L200 100 L120 120 L70 80Z" fill="#000864" opacity="0.25"/><path d="M120 120 L200 100 L200 220 L120 240Z" fill="#000864" opacity="0.2"/><path d="M70 80 L120 120 L120 240 L70 200Z" fill="#000864" opacity="0.1"/><rect x="82" y="145" width="26" height="22" rx="3" stroke="#000864" stroke-width="2" fill="none" opacity="0.5"/><path d="M88 145 L88 135 Q88 125 95 125 Q102 125 102 135 L102 145" stroke="#000864" stroke-width="2" fill="none" opacity="0.5"/><circle cx="95" cy="157" r="3" fill="#000864" opacity="0.5"/><path d="M30 100 L60 100" stroke="#00AFF0" stroke-width="1.5"/><path d="M130 260 L160 260" stroke="#00AFF0" stroke-width="1.5"/><text x="15" y="95" font-family="'Noto Sans'" font-size="10" fill="#000864" opacity="0.5">IN</text><text x="165" y="255" font-family="'Noto Sans'" font-size="10" fill="#000864" opacity="0.5">OUT</text><text x="85" y="290" font-family="'Noto Sans'" font-size="12" fill="#000864" opacity="0.3" font-weight="700">3 WEEKS?</text>`,
      },
    },
    {
      number: '03',
      title: '\u201CGhost Inventory\u201D Crisis',
      quote: '\u201CThe system says you have 100 units, but the shelf has 50. This discrepancy forces your team to hoard \u2018safety stock\u2019 just to survive.\u201D',
      quoteTag: 'div',
      description: 'Inventory inaccuracy ties up millions in unnecessary capital and destroys your ability to promise reliable delivery dates. The \u201Cborrowing culture\u201D has replaced discipline.',
      svgBg: {
        viewBox: '0 0 220 320',
        content: `<line x1="40" y1="60" x2="200" y2="60" stroke="#000864" stroke-width="2"/><line x1="40" y1="120" x2="200" y2="120" stroke="#000864" stroke-width="2"/><line x1="40" y1="180" x2="200" y2="180" stroke="#000864" stroke-width="2"/><line x1="50" y1="55" x2="50" y2="185" stroke="#000864" stroke-width="1.5"/><line x1="190" y1="55" x2="190" y2="185" stroke="#000864" stroke-width="1.5"/><rect x="60" y="40" width="25" height="18" rx="2" fill="#000864" opacity="0.3"/><rect x="95" y="40" width="25" height="18" rx="2" stroke="#000864" stroke-width="1" fill="none" stroke-dasharray="3 2" opacity="0.5"/><rect x="130" y="40" width="25" height="18" rx="2" stroke="#000864" stroke-width="1" fill="none" stroke-dasharray="3 2" opacity="0.5"/><rect x="165" y="40" width="20" height="18" rx="2" fill="#000864" opacity="0.3"/><rect x="60" y="100" width="25" height="18" rx="2" fill="#000864" opacity="0.3"/><rect x="95" y="100" width="25" height="18" rx="2" fill="#000864" opacity="0.3"/><rect x="130" y="100" width="25" height="18" rx="2" stroke="#000864" stroke-width="1" fill="none" stroke-dasharray="3 2" opacity="0.5"/><rect x="60" y="160" width="25" height="18" rx="2" stroke="#000864" stroke-width="1" fill="none" stroke-dasharray="3 2" opacity="0.5"/><text x="60" y="220" font-family="'Noto Sans'" font-size="14" fill="#000864" opacity="0.4" font-weight="700">System: 100</text><text x="60" y="245" font-family="'Noto Sans'" font-size="14" fill="#00AFF0" opacity="0.6" font-weight="700">Reality: 50</text><text x="150" y="232" font-family="'Noto Sans'" font-size="36" fill="#000864" opacity="0.3" font-weight="800">\u2260</text>`,
      },
    },
    {
      number: '04',
      title: '\u201CCost Guesswork\u201D Trap',
      fullWidth: true,
      quote: '\u201CYou quoted a price last month based on estimated costs. This month the same product costs 15% more to make \u2014 and you have no idea why.\u201D',
      quoteTag: 'div',
      description: 'Batch-to-batch cost fluctuations are invisible without production-order-level tracking. You\u2019re pricing based on last quarter\u2019s averages, not this morning\u2019s reality.',
      svgBg: {
        viewBox: '0 0 400 180',
        content: `<path d="M280 150 L280 60" stroke="#000864" stroke-width="2" opacity="0.3"/><path d="M275 70 L280 55 L285 70" stroke="#000864" stroke-width="2" fill="none" opacity="0.3"/><path d="M320 140 L320 40" stroke="#000864" stroke-width="2" opacity="0.4"/><path d="M315 50 L320 35 L325 50" stroke="#000864" stroke-width="2" fill="none" opacity="0.4"/><path d="M360 130 L360 25" stroke="#00AFF0" stroke-width="2.5" opacity="0.3"/><path d="M355 35 L360 18 L365 35" stroke="#00AFF0" stroke-width="2.5" fill="none" opacity="0.3"/><rect x="230" y="70" width="40" height="24" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.3"/><text x="237" y="87" font-family="'Noto Sans'" font-size="11" fill="#000864" opacity="0.4">$???</text><rect x="230" y="110" width="40" height="24" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.3"/><text x="234" y="127" font-family="'Noto Sans'" font-size="11" fill="#000864" opacity="0.4">+15%</text><text x="100" y="140" font-family="'Noto Sans'" font-size="72" font-weight="800" fill="#000864" opacity="0.06">15%</text>`,
      },
    },
    {
      number: '05',
      title: '\u201C10-Second Answer\u201D Failure',
      fullWidth: true,
      quote: '\u201CWhen your biggest customer calls and asks \u2018where is my order?\u2019 \u2014 you put them on hold, walk to the shop floor, and hope someone knows.\u201D',
      quoteTag: 'div',
      description: 'Real-time delivery status should be a click away, not a 20-minute investigation. Every hold costs you credibility with the customers who matter most.',
      svgBg: {
        viewBox: '0 0 400 180',
        content: `<circle cx="310" cy="90" r="60" stroke="#000864" stroke-width="2" fill="none" opacity="0.2"/><circle cx="310" cy="90" r="3" fill="#000864" opacity="0.3"/><line x1="310" y1="90" x2="310" y2="50" stroke="#000864" stroke-width="2.5" opacity="0.3" stroke-linecap="round"/><line x1="310" y1="90" x2="345" y2="100" stroke="#000864" stroke-width="2" opacity="0.25" stroke-linecap="round"/><line x1="310" y1="32" x2="310" y2="38" stroke="#000864" stroke-width="1.5" opacity="0.3"/><line x1="310" y1="142" x2="310" y2="148" stroke="#000864" stroke-width="1.5" opacity="0.3"/><line x1="252" y1="90" x2="258" y2="90" stroke="#000864" stroke-width="1.5" opacity="0.3"/><line x1="362" y1="90" x2="368" y2="90" stroke="#000864" stroke-width="1.5" opacity="0.3"/><text x="275" y="170" font-family="'Noto Sans'" font-size="14" fill="#000864" opacity="0.3" font-weight="700">20 min...</text><rect x="200" y="50" width="30" height="50" rx="6" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.2"/><line x1="208" y1="88" x2="222" y2="88" stroke="#000864" stroke-width="1" opacity="0.2"/><path d="M235 65 Q242 65 242 72" stroke="#00AFF0" stroke-width="1" fill="none" opacity="0.3"/><path d="M235 60 Q248 60 248 75" stroke="#00AFF0" stroke-width="1" fill="none" opacity="0.25"/><path d="M235 55 Q254 55 254 78" stroke="#00AFF0" stroke-width="1" fill="none" opacity="0.2"/>`,
      },
    },
  ],
  cta: { text: 'Let\u2019s Talk About Your Factory', href: '/demo.html' },
};

module.exports = {
  blocks: () => cardGrid.blocks(DATA),
  css: () => cardGrid.css(DATA),
};
