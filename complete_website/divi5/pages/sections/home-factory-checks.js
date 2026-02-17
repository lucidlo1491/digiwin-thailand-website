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
<div class="checks-container">
  <div class="checks-header">
    <div class="checks-header-label">For Manufacturing Business Owners</div>
    <h2 class="checks-title">Do You Recognize These Problems?</h2>
    <p class="checks-subtitle">If any of these sound familiar, you're not alone. These are the most common problems we solve for factories across Thailand and Asia.</p>
  </div>

  <div class="checks-grid">
    <!-- Card 1: "Shadow Excel" Reality -->
    <div class="checks-card">
      <div class="checks-card-number">01</div>
      <h3 class="checks-card-title">"Shadow Excel" Reality</h3>
      <div class="checks-card-quote">"You know your factory isn't actually running on your current system—it's running on spreadsheets because your staff finds the software too rigid or slow."</div>
      <p class="checks-card-desc">Your real operations live in unconnected Excel files, not in your ERP. Financial data doesn't match physical reality because planners work outside the system.</p>
    </div>

    <!-- Card 2: "The Black Box" Problem -->
    <div class="checks-card">
      <div class="checks-card-number">02</div>
      <h3 class="checks-card-title">"The Black Box" Problem</h3>
      <div class="checks-card-quote">"You know exactly how much raw material you bought and how many finished goods you sold, but the 3 weeks in between — your work in progress — are invisible."</div>
      <p class="checks-card-desc">You rely on paper reports filled out yesterday to understand what happened today. You can't see what's happening on the floor right now without walking over and asking.</p>
    </div>

    <!-- Card 3: "Ghost Inventory" Crisis -->
    <div class="checks-card">
      <div class="checks-card-number">03</div>
      <h3 class="checks-card-title">"Ghost Inventory" Crisis</h3>
      <div class="checks-card-quote">"The system says you have 100 units, but the shelf has 50. This discrepancy forces your team to hoard 'safety stock' just to survive."</div>
      <p class="checks-card-desc">Inventory inaccuracy ties up millions in unnecessary capital and destroys your ability to promise reliable delivery dates. The "borrowing culture" has replaced discipline.</p>
    </div>
  </div>

  <!-- Cards 4-5: Full-width below grid -->
  <div class="checks-card checks-card--full">
    <div class="checks-card-number">04</div>
    <h3 class="checks-card-title">"Cost Guesswork" Trap</h3>
    <div class="checks-card-quote">"You quoted a price last month based on estimated costs. This month the same product costs 15% more to make — and you have no idea why."</div>
    <p class="checks-card-desc">Batch-to-batch cost fluctuations are invisible without production-order-level tracking. You're pricing based on last quarter's averages, not this morning's reality.</p>
  </div>

  <div class="checks-card checks-card--full">
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
      css: 'selector{background:linear-gradient(165deg, #f8fafc 0%, #f1f5f9 100%) !important;padding:100px 40px !important;position:relative;overflow:hidden;}',
    }),

    // Row (wrapper for full-width content)
    rowOpen({
      adminLabel: 'Checks Content Row',
      css: 'selector{max-width:1200px !important;margin:0 auto !important;padding:0 !important;}',
    }),

    // Column (single column, full-width)
    columnOpen({
      adminLabel: 'Checks Column',
      css: 'selector{width:100% !important;}',
    }),

    // Content — Code Module with entire section HTML
    codeModule(getSectionHTML(), 'Factory Checks: Header + 5 Cards + CTA'),

    columnClose(),
    rowClose(),
    sectionClose(),
  ];
}

function css() {
  return `
/* === THEME BUILDER FULL-BLEED OVERRIDE (section 2) === */
.et_pb_section_2_tb_body{background:transparent !important;padding:0 !important;margin:0 !important;}
.et_pb_row_2_tb_body{max-width:1200px !important;width:100% !important;padding:0 !important;margin:0 auto !important;}
.et_pb_column_2_tb_body{padding:0 !important;}

/* === DIVI SPACING RESET === */
.et_pb_section_2:not([class*='tb_body']) .et_pb_column{gap:0 !important}

/* === SECTION WRAPPER === */
.checks-section{background:${SPEC.section.background};padding:${SPEC.section.padding}}

/* === SECTION CONTAINER === */
.checks-container{position:relative;z-index:2;max-width:1200px;margin:0 auto}

/* === SECTION HEADER === */
.checks-header{text-align:center;max-width:800px;margin:0 auto 56px;position:relative;z-index:2}

.checks-header-label{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.2em;color:#0369a1;margin-bottom:20px;display:flex;align-items:center;justify-content:center;gap:12px}
.checks-header-label::before,
.checks-header-label::after{content:'';width:40px;height:1px;background:linear-gradient(90deg,transparent,#0369a1);flex-shrink:0}
.checks-header-label::after{transform:scaleX(-1)}

.checks-title{font-family:'Noto Sans',sans-serif;font-size:clamp(32px,4vw,44px);font-weight:700;color:#000864;line-height:1.15;letter-spacing:-0.02em;margin:0 0 20px}

.checks-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;max-width:600px;margin:0 auto}

/* === CARDS GRID === */
.checks-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;margin-bottom:32px}

/* === CARD STYLING === */
.checks-card{background:#fff;border:1px solid #e2e8f0;box-shadow:0 4px 24px rgba(0,0,0,0.04);border-radius:20px;padding:40px 32px;position:relative;overflow:hidden;transition:all 0.4s cubic-bezier(0.4,0,0.2,1)}

.checks-card:hover{box-shadow:0 20px 60px rgba(0,175,240,0.12);border-color:#00AFF0}

.checks-card--full{grid-column:1 / -1}

/* === CARD ELEMENTS === */
.checks-card-number{font-family:'Noto Sans',sans-serif;font-size:64px;font-weight:800;color:#0369a1;opacity:0.15;line-height:1;margin-bottom:16px}

.checks-card-title{font-family:'Noto Sans',sans-serif;font-size:20px;font-weight:700;color:#000864;margin:0 0 16px;line-height:1.3}

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
