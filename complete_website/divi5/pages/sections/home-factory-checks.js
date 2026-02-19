/**
 * home-factory-checks.js — Homepage Factory Path Understanding Checks Section Builder
 *
 * ContentSpec: §3.3 "Factory Path — Understanding Checks (Track A)" (lines 268-369)
 *
 * Structure: One Code Module containing complete section HTML (header + 5 pain point cards + CTA).
 * Cards 1-3 in CSS grid (3 columns). Cards 4-5 full-width below grid.
 * Section background: light gradient. Cards: white with shadow, hover effects.
 */

const { codeModule, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../../lib/modules');
const cssLib = require('../../lib/css-assembler');
const superD = require('../../lib/super-d');

// ────────────────────────────────────────────────────────────────
// SPEC — Design tokens from ContentSpec_Home_Divi5_2.0.md §3.3
// ────────────────────────────────────────────────────────────────
const SPEC = {
  section: {
    background: 'linear-gradient(165deg, #f8fafc 0%, #f1f5f9 100%)', // line 276
    padding: '100px 40px', // line 276
  },
  header: {
    label: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '11px',        // line 288
      fontWeight: '500',       // line 288
      textTransform: 'uppercase',
      letterSpacing: '0.2em',  // line 288
      color: '#0369a1',        // line 288
    },
    title: {
      fontFamily: "'Noto Sans', sans-serif",
      fontSize: 'clamp(32px, 4vw, 44px)', // line 289
      fontWeight: '700',       // line 289
      color: '#000864',        // line 289
      lineHeight: '1.15',      // line 289
      letterSpacing: '-0.02em', // line 289
    },
    subtitle: {
      fontFamily: "'Noto Sans', sans-serif",
      fontSize: '18px',        // line 290
      color: '#5b6b80',        // line 290
      lineHeight: '1.6',       // line 290
      maxWidth: '600px',       // line 290
    },
  },
  card: {
    background: '#fff',        // line 281
    border: '1px solid #e2e8f0', // line 281
    boxShadow: '0 4px 24px rgba(0,0,0,0.04)', // line 281
    borderRadius: '20px',      // line 281
    padding: '40px 32px',      // line 281
    hoverShadow: '0 20px 60px rgba(0,175,240,0.12)', // line 281
    hoverBorder: '#00AFF0',    // line 281
    transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)', // line 281
  },
  cardNumber: {
    fontFamily: "'Noto Sans', sans-serif",
    fontSize: '64px',          // line 299
    fontWeight: '800',         // line 299
    color: '#0369a1',          // line 299
    opacity: '0.15',           // line 299
  },
  cardTitle: {
    fontFamily: "'Noto Sans', sans-serif",
    fontSize: '20px',          // line 300
    fontWeight: '700',         // line 300
    color: '#000864',          // line 300
  },
  cardQuote: {
    fontFamily: "'Noto Sans', sans-serif",
    fontSize: '16px',          // line 301
    fontStyle: 'italic',       // line 301
    color: '#475569',          // line 301
    lineHeight: '1.7',         // line 301
    paddingLeft: '16px',       // line 301
    borderLeft: '3px solid #00AFF0', // line 301
  },
  cardDescription: {
    fontFamily: "'Noto Sans', sans-serif",
    fontSize: '15px',          // line 302
    color: '#5b6b80',          // line 302
    lineHeight: '1.6',         // line 302
  },
  cta: {
    marginTop: '56px',         // line 358
  },
};

// ════════════════════════════════════════════════════════════════
// CONTENT HTML
// ════════════════════════════════════════════════════════════════

function getSectionHTML() {
  return `
<div class="checks-section">
  <!-- Background scene: broken factory data flows -->
  <div class="checks-scene">
    <svg aria-hidden="true" viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
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
    </svg>
  </div>
<div class="checks-container">
  <div class="checks-header">
    <div class="checks-header-label">For Manufacturing Business Owners</div>
    <h2 class="checks-title">Do You Recognize These Problems?</h2>
    <p class="checks-subtitle">If any of these sound familiar, you're not alone. These are the most common problems we solve for factories across Thailand and Asia.</p>
  </div>

  <div class="checks-grid">
    <!-- Card 1: "Shadow Excel" Reality -->
    <div class="checks-card">
      <svg aria-hidden="true" class="checks-card-bg" viewBox="-40 0 280 320" fill="none" preserveAspectRatio="xMaxYMid slice">
        <rect x="40" y="20" width="60" height="18" rx="2" stroke="#000864" stroke-width="1.5" fill="none"/>
        <rect x="110" y="20" width="80" height="18" rx="2" stroke="#000864" stroke-width="1.5" fill="none"/>
        <rect x="20" y="48" width="80" height="18" rx="2" stroke="#000864" stroke-width="1.5" fill="none"/>
        <rect x="110" y="48" width="60" height="18" rx="2" stroke="#000864" stroke-width="1.5" fill="none"/>
        <rect x="60" y="76" width="90" height="18" rx="2" stroke="#000864" stroke-width="1.5" fill="none"/>
        <rect x="30" y="104" width="50" height="18" rx="2" stroke="#000864" stroke-width="1.5" fill="none"/>
        <rect x="90" y="104" width="100" height="18" rx="2" stroke="#000864" stroke-width="1.5" fill="none"/>
        <rect x="50" y="132" width="70" height="18" rx="2" stroke="#000864" stroke-width="1.5" fill="none"/>
        <rect x="130" y="132" width="60" height="18" rx="2" stroke="#000864" stroke-width="1.5" fill="none"/>
        <line x1="70" y1="40" x2="55" y2="48" stroke="#00AFF0" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="140" y1="40" x2="120" y2="48" stroke="#00AFF0" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="100" y1="96" x2="65" y2="104" stroke="#00AFF0" stroke-width="1" stroke-dasharray="3 3"/>
        <circle cx="180" cy="80" r="3" fill="#000864"/><circle cx="25" cy="90" r="2" fill="#000864"/>
        <circle cx="195" cy="150" r="4" fill="#000864"/><circle cx="15" cy="160" r="2.5" fill="#000864"/>
        <text x="160" y="220" font-family="'Noto Sans'" font-size="80" font-weight="800" fill="#000864" opacity="0.4">?</text>
      </svg>
      <div class="checks-card-number">01</div>
      <h3 class="checks-card-title">"Shadow Excel" Reality</h3>
      <div class="checks-card-quote">"You know your factory isn't actually running on your current system—it's running on spreadsheets because your staff finds the software too rigid or slow."</div>
      <p class="checks-card-desc">Your real operations live in unconnected Excel files, not in your ERP. Financial data doesn't match physical reality because planners work outside the system.</p>
    </div>

    <!-- Card 2: "The Black Box" Problem -->
    <div class="checks-card">
      <svg aria-hidden="true" class="checks-card-bg" viewBox="0 0 220 320" fill="none" preserveAspectRatio="xMaxYMid slice">
        <path d="M70 80 L150 60 L200 100 L200 220 L120 240 L70 200Z" fill="#000864" opacity="0.15"/>
        <path d="M70 80 L150 60 L200 100 L120 120 L70 80Z" fill="#000864" opacity="0.25"/>
        <path d="M120 120 L200 100 L200 220 L120 240Z" fill="#000864" opacity="0.2"/>
        <path d="M70 80 L120 120 L120 240 L70 200Z" fill="#000864" opacity="0.1"/>
        <rect x="82" y="145" width="26" height="22" rx="3" stroke="#000864" stroke-width="2" fill="none" opacity="0.5"/>
        <path d="M88 145 L88 135 Q88 125 95 125 Q102 125 102 135 L102 145" stroke="#000864" stroke-width="2" fill="none" opacity="0.5"/>
        <circle cx="95" cy="157" r="3" fill="#000864" opacity="0.5"/>
        <path d="M30 100 L60 100" stroke="#00AFF0" stroke-width="1.5"/>
        <path d="M130 260 L160 260" stroke="#00AFF0" stroke-width="1.5"/>
        <text x="15" y="95" font-family="'Noto Sans'" font-size="10" fill="#000864" opacity="0.5">IN</text>
        <text x="165" y="255" font-family="'Noto Sans'" font-size="10" fill="#000864" opacity="0.5">OUT</text>
        <text x="85" y="290" font-family="'Noto Sans'" font-size="12" fill="#000864" opacity="0.3" font-weight="700">3 WEEKS?</text>
      </svg>
      <div class="checks-card-number">02</div>
      <h3 class="checks-card-title">"The Black Box" Problem</h3>
      <div class="checks-card-quote">"You know exactly how much raw material you bought and how many finished goods you sold, but the 3 weeks in between — your work in progress — are invisible."</div>
      <p class="checks-card-desc">You rely on paper reports filled out yesterday to understand what happened today. You can't see what's happening on the floor right now without walking over and asking.</p>
    </div>

    <!-- Card 3: "Ghost Inventory" Crisis -->
    <div class="checks-card">
      <svg aria-hidden="true" class="checks-card-bg" viewBox="0 0 220 320" fill="none" preserveAspectRatio="xMaxYMid slice">
        <line x1="40" y1="60" x2="200" y2="60" stroke="#000864" stroke-width="2"/>
        <line x1="40" y1="120" x2="200" y2="120" stroke="#000864" stroke-width="2"/>
        <line x1="40" y1="180" x2="200" y2="180" stroke="#000864" stroke-width="2"/>
        <line x1="50" y1="55" x2="50" y2="185" stroke="#000864" stroke-width="1.5"/>
        <line x1="190" y1="55" x2="190" y2="185" stroke="#000864" stroke-width="1.5"/>
        <rect x="60" y="40" width="25" height="18" rx="2" fill="#000864" opacity="0.3"/>
        <rect x="95" y="40" width="25" height="18" rx="2" stroke="#000864" stroke-width="1" fill="none" stroke-dasharray="3 2" opacity="0.5"/>
        <rect x="130" y="40" width="25" height="18" rx="2" stroke="#000864" stroke-width="1" fill="none" stroke-dasharray="3 2" opacity="0.5"/>
        <rect x="165" y="40" width="20" height="18" rx="2" fill="#000864" opacity="0.3"/>
        <rect x="60" y="100" width="25" height="18" rx="2" fill="#000864" opacity="0.3"/>
        <rect x="95" y="100" width="25" height="18" rx="2" fill="#000864" opacity="0.3"/>
        <rect x="130" y="100" width="25" height="18" rx="2" stroke="#000864" stroke-width="1" fill="none" stroke-dasharray="3 2" opacity="0.5"/>
        <rect x="60" y="160" width="25" height="18" rx="2" stroke="#000864" stroke-width="1" fill="none" stroke-dasharray="3 2" opacity="0.5"/>
        <text x="60" y="220" font-family="'Noto Sans'" font-size="14" fill="#000864" opacity="0.4" font-weight="700">System: 100</text>
        <text x="60" y="245" font-family="'Noto Sans'" font-size="14" fill="#00AFF0" opacity="0.6" font-weight="700">Reality: 50</text>
        <text x="150" y="232" font-family="'Noto Sans'" font-size="36" fill="#000864" opacity="0.3" font-weight="800">≠</text>
      </svg>
      <div class="checks-card-number">03</div>
      <h3 class="checks-card-title">"Ghost Inventory" Crisis</h3>
      <div class="checks-card-quote">"The system says you have 100 units, but the shelf has 50. This discrepancy forces your team to hoard 'safety stock' just to survive."</div>
      <p class="checks-card-desc">Inventory inaccuracy ties up millions in unnecessary capital and destroys your ability to promise reliable delivery dates. The "borrowing culture" has replaced discipline.</p>
    </div>
  </div>

  <!-- Cards 4-5: Full-width below grid -->
  <div class="checks-card checks-card--full">
    <svg aria-hidden="true" class="checks-card-bg" viewBox="0 0 400 180" fill="none" preserveAspectRatio="xMaxYMid slice">
      <path d="M280 150 L280 60" stroke="#000864" stroke-width="2" opacity="0.3"/>
      <path d="M275 70 L280 55 L285 70" stroke="#000864" stroke-width="2" fill="none" opacity="0.3"/>
      <path d="M320 140 L320 40" stroke="#000864" stroke-width="2" opacity="0.4"/>
      <path d="M315 50 L320 35 L325 50" stroke="#000864" stroke-width="2" fill="none" opacity="0.4"/>
      <path d="M360 130 L360 25" stroke="#00AFF0" stroke-width="2.5" opacity="0.3"/>
      <path d="M355 35 L360 18 L365 35" stroke="#00AFF0" stroke-width="2.5" fill="none" opacity="0.3"/>
      <rect x="230" y="70" width="40" height="24" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.3"/>
      <text x="237" y="87" font-family="'Noto Sans'" font-size="11" fill="#000864" opacity="0.4">$???</text>
      <rect x="230" y="110" width="40" height="24" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.3"/>
      <text x="234" y="127" font-family="'Noto Sans'" font-size="11" fill="#000864" opacity="0.4">+15%</text>
      <text x="100" y="140" font-family="'Noto Sans'" font-size="72" font-weight="800" fill="#000864" opacity="0.06">15%</text>
    </svg>
    <div class="checks-card-number">04</div>
    <h3 class="checks-card-title">"Cost Guesswork" Trap</h3>
    <div class="checks-card-quote">"You quoted a price last month based on estimated costs. This month the same product costs 15% more to make — and you have no idea why."</div>
    <p class="checks-card-desc">Batch-to-batch cost fluctuations are invisible without production-order-level tracking. You're pricing based on last quarter's averages, not this morning's reality.</p>
  </div>

  <div class="checks-card checks-card--full">
    <svg aria-hidden="true" class="checks-card-bg" viewBox="0 0 400 180" fill="none" preserveAspectRatio="xMaxYMid slice">
      <circle cx="310" cy="90" r="60" stroke="#000864" stroke-width="2" fill="none" opacity="0.2"/>
      <circle cx="310" cy="90" r="3" fill="#000864" opacity="0.3"/>
      <line x1="310" y1="90" x2="310" y2="50" stroke="#000864" stroke-width="2.5" opacity="0.3" stroke-linecap="round"/>
      <line x1="310" y1="90" x2="345" y2="100" stroke="#000864" stroke-width="2" opacity="0.25" stroke-linecap="round"/>
      <line x1="310" y1="32" x2="310" y2="38" stroke="#000864" stroke-width="1.5" opacity="0.3"/>
      <line x1="310" y1="142" x2="310" y2="148" stroke="#000864" stroke-width="1.5" opacity="0.3"/>
      <line x1="252" y1="90" x2="258" y2="90" stroke="#000864" stroke-width="1.5" opacity="0.3"/>
      <line x1="362" y1="90" x2="368" y2="90" stroke="#000864" stroke-width="1.5" opacity="0.3"/>
      <text x="275" y="170" font-family="'Noto Sans'" font-size="14" fill="#000864" opacity="0.3" font-weight="700">20 min...</text>
      <rect x="200" y="50" width="30" height="50" rx="6" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.2"/>
      <line x1="208" y1="88" x2="222" y2="88" stroke="#000864" stroke-width="1" opacity="0.2"/>
      <path d="M235 65 Q242 65 242 72" stroke="#00AFF0" stroke-width="1" fill="none" opacity="0.3"/>
      <path d="M235 60 Q248 60 248 75" stroke="#00AFF0" stroke-width="1" fill="none" opacity="0.25"/>
      <path d="M235 55 Q254 55 254 78" stroke="#00AFF0" stroke-width="1" fill="none" opacity="0.2"/>
    </svg>
    <div class="checks-card-number">05</div>
    <h3 class="checks-card-title">"10-Second Answer" Failure</h3>
    <div class="checks-card-quote">"When your biggest customer calls and asks 'where is my order?' — you put them on hold, walk to the shop floor, and hope someone knows."</div>
    <p class="checks-card-desc">Real-time delivery status should be a click away, not a 20-minute investigation. Every hold costs you credibility with the customers who matter most.</p>
  </div>

  <div class="checks-cta">
    <a href="/demo.html" class="checks-btn checks-btn--primary">Let's Talk About Your Factory</a>
  </div>
</div>
</div>`;
}

// ════════════════════════════════════════════════════════════════
// EXPORTS: blocks() and css()
// ════════════════════════════════════════════════════════════════

function blocks() {
  return [
    // Section
    sectionOpen({
      adminLabel: 'Factory Checks — 5 Pain Points',
      padding: { top: '0px', bottom: '0px', left: '0px', right: '0px', syncVertical: 'off', syncHorizontal: 'off' },
      css: 'selector{background:transparent !important;padding:0 !important;}',
    }),

    // Row (wrapper for full-width content)
    rowOpen({
      adminLabel: 'Checks Content Row',
      css: 'selector{max-width:100% !important;margin:0 !important;padding:0 !important;}',
    }),

    // Column (single column, full-width)
    columnOpen({
      adminLabel: 'Checks Column',
      css: 'selector{width:100% !important;}',
    }),

    // Super D decoration — outline variant, left bleed
    codeModule(superD.html('fchecks-deco'), 'Decoration: Super D Left'),

    // Content — Code Module with entire section HTML
    codeModule(getSectionHTML(), 'Factory Checks: Header + 5 Cards + CTA'),

    columnClose(),
    rowClose(),
    sectionClose(),
  ];
}

function css() {
  return `
/* Super D: outline left bleed */
${superD.css('fchecks-deco', { variant: 'outline', position: 'left', opacity: 0.10 })}
/* === THEME BUILDER FULL-BLEED OVERRIDE (section 2) === */
.et_pb_section_2_tb_body,.et_pb_section_2{background:transparent !important;padding:0 !important;margin:0 !important;}
.et_pb_row_2_tb_body{max-width:100% !important;width:100% !important;padding:0 !important;margin:0 !important;}
.et_pb_column_2_tb_body{padding:0 !important;}

/* === DIVI SPACING RESET === */
.et_pb_section_2:not([class*='tb_body']) .et_pb_column{gap:0 !important}

/* === SECTION WRAPPER === */
.checks-section{background:${SPEC.section.background};padding:${SPEC.section.padding};position:relative;overflow:hidden;-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto;font-size:16px}

/* === BACKGROUND SCENE SVG === */
.checks-scene{position:absolute;inset:0;pointer-events:none;z-index:1;opacity:0.35}
.checks-scene svg{width:100%;height:100%}

/* === CARD BACKGROUND SVGs === */
.checks-card-bg{position:absolute;top:0;right:0;width:220px;height:100%;opacity:0.15;pointer-events:none;z-index:0;transition:opacity 0.4s ease}
.checks-card:hover .checks-card-bg{opacity:0.18}
.checks-card--full .checks-card-bg{width:400px}

/* === SECTION CONTAINER === */
.checks-container{position:relative;z-index:2;max-width:1200px;margin:0 auto}

/* === SECTION HEADER === */
.checks-header{text-align:center;max-width:800px;margin:0 auto 56px;position:relative;z-index:2}

.checks-header-label{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.2em;color:#0369a1;margin-bottom:20px;display:flex;align-items:center;justify-content:center;gap:12px}
.checks-header-label::before,
.checks-header-label::after{content:'';width:40px;height:1px;background:linear-gradient(90deg,transparent,#0369a1);flex-shrink:0}
.checks-header-label::after{transform:scaleX(-1)}

.checks-title{font-family:'Noto Sans',sans-serif;font-size:clamp(32px,4vw,44px);font-weight:700;color:#000864;line-height:1.15;letter-spacing:-0.02em;margin:0 0 16px}

.checks-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;margin:0 300px}

/* === CARDS GRID === */
.checks-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;margin-bottom:32px}

/* === CARD STYLING === */
.checks-card{background:#fff;border:1px solid #e2e8f0;box-shadow:0 4px 24px rgba(0,0,0,0.04);border-radius:20px;padding:40px 32px;position:relative;overflow:hidden;transition:opacity 0.2s,transform 0.2s;line-height:1.6}

.checks-card:hover{box-shadow:0 20px 60px rgba(0,175,240,0.12);border-color:#00AFF0}

.checks-card--full{grid-column:1 / -1}

/* === CARD ELEMENTS === */
.checks-card-number{font-family:'Noto Sans',sans-serif;font-size:64px;font-weight:800;color:#0369a1;opacity:0.15;line-height:1;margin-bottom:16px}

.checks-card-title{font-family:'Noto Sans',sans-serif;font-size:20px;font-weight:700;color:#000864;margin:0 0 16px;line-height:1.6;position:relative;z-index:1}

.checks-card-quote{font-family:'Noto Sans',sans-serif;font-size:16px;font-style:italic;color:#475569;line-height:1.7;padding-left:16px;border-left:3px solid #00AFF0;margin-bottom:16px}

.checks-card-desc{font-family:'Noto Sans',sans-serif;font-size:15px;color:#5b6b80;line-height:1.6;margin:0}

/* === CTA === */
.checks-cta{display:flex;justify-content:center;margin-top:56px}

.checks-btn{font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;padding:16px 32px;border-radius:8px;cursor:pointer;transition:all 0.3s ease;text-decoration:none;display:inline-block;position:relative;overflow:hidden;border:none}

.checks-btn::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);transition:left 0.5s}

.checks-btn:hover::before{left:100%}

.checks-btn--primary{background:#006dac;color:#fff;box-shadow:0 4px 14px rgba(0,175,240,0.35)}

.checks-btn--primary:hover{background:#003CC8;transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,175,240,0.45)}

/* === RESPONSIVE === */
@media(max-width:1024px){
  .checks-grid{grid-template-columns:repeat(2,1fr);gap:24px}
  .checks-grid .checks-card:nth-child(3){grid-column:span 2;max-width:500px;margin:0 auto;width:100%}
  .et_pb_section_2{padding:80px 32px !important}
  .checks-card{padding:32px 24px}
  .checks-title{font-size:32px}
  .checks-subtitle{font-size:16px}
  .checks-card-number{font-size:52px}
}

@media(max-width:768px){
  .checks-grid{grid-template-columns:1fr}
  .checks-grid .checks-card:nth-child(3){grid-column:auto;max-width:none}
  .et_pb_section_2{padding:64px 24px !important}
  .checks-card{padding:32px 24px}
  .checks-header-label{font-size:10px}
  .checks-card-title{font-size:18px}
  .checks-card-quote{font-size:15px}
}

@media(max-width:640px){
  .checks-header-label::before,
  .checks-header-label::after{width:24px}
  .checks-btn{width:100%;text-align:center}
}

/* === REDUCED MOTION === */
@media(prefers-reduced-motion:reduce){
  .checks-card{transition:none}
  .checks-btn::before{transition:none}
}`;
}

module.exports = { blocks, css, SPEC };
