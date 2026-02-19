/**
 * Divi 5 Section Builder: Partner Path — Understanding Checks
 * Section 4: Dark theme variant with 3 pain point cards
 * ContentSpec §3.4
 */

const { codeModule, textModule, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../../lib/modules');
const cssLib = require('../../lib/css-assembler');

/**
 * Returns array of block markup strings for this section
 */
function blocks() {
  return [
    sectionOpen({
      adminLabel: 'Partner Understanding Checks',
      css: 'selector{background:transparent !important;padding:0 !important;}',
    }),

    rowOpen({ columns: 1, adminLabel: 'Partner Checks Container' }),
    columnOpen(),

    // Main content Code Module
    codeModule(`
        <div class="pchecks-section">
        <!-- Background scene: revenue ceiling + man-day trap -->
        <div class="pchecks-scene">
          <svg aria-hidden="true" viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
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
          </svg>
        </div>
        <!-- Section Header -->
        <div class="pchecks-header">
          <div class="pchecks-label">
            <span class="pchecks-label-line"></span>
            <span class="pchecks-label-text">For ERP Implementers</span>
            <span class="pchecks-label-line"></span>
          </div>
          <h2 class="pchecks-title">Trapped in These Cycles?</h2>
          <p class="pchecks-subtitle">The consulting model has structural limits. Recognizing these traps is the first step to escaping them.</p>
        </div>

        <!-- 3 Pain Point Cards -->
        <div class="pchecks-grid">

          <!-- Card 1: Man-Day Trap -->
          <div class="pchecks-card">
            <div class="pchecks-card-number">01</div>
            <h3 class="pchecks-card-title">The Man-Day Trap</h3>
            <blockquote class="pchecks-card-quote">
              "Your revenue is mathematically capped by your headcount. You cannot grow your top line without proportionally increasing your payroll costs."
            </blockquote>
            <p class="pchecks-card-desc">
              You are selling hours, not assets. Revenue = Hours Worked, making exponential growth impossible. Every January, you start at zero again.
            </p>
          </div>

          <!-- Card 2: Customization Death Spiral -->
          <div class="pchecks-card">
            <div class="pchecks-card-number">02</div>
            <h3 class="pchecks-card-title">Customization Death Spiral</h3>
            <blockquote class="pchecks-card-quote">
              "You accept customization requests to win the deal, but then you become married to that code forever."
            </blockquote>
            <p class="pchecks-card-desc">
              You can't upgrade clients on custom code. Support becomes a nightmare of unbillable hours. Your profit evaporated the moment you said "Yes" to a non-standard request.
            </p>
          </div>

          <!-- Card 3: Ghost IT Burden -->
          <div class="pchecks-card">
            <div class="pchecks-card-number">03</div>
            <h3 class="pchecks-card-title">The Ghost IT Burden</h3>
            <blockquote class="pchecks-card-quote">
              "You aren't just their ERP consultant—you are their unpaid IT department, fixing Wi-Fi, printers, and user discipline issues."
            </blockquote>
            <p class="pchecks-card-desc">
              Most Thai SMEs lack a dedicated IT manager. You end up subsidizing their operations with your margins — absorbing unbillable work you feel forced to do just to keep the relationship alive.
            </p>
          </div>

        </div>

        <!-- CTA -->
        <div class="pchecks-cta-wrapper">
          <a href="/partner-program.html" class="pchecks-cta">See the Way Out</a>
        </div>
        </div>
      `, 'Partner Checks: 3 Pain Points'),

    columnClose(),
    rowClose(),
    sectionClose()
  ];
}

/**
 * Returns section CSS string
 */
function css() {
  return `
/* ============================================
   Partner Path Understanding Checks (Dark Theme)
   ContentSpec §3.4
   ============================================ */

.pchecks-section {
  position: relative;
  overflow: hidden;
  background: linear-gradient(165deg, #0f1419 0%, #1a2632 50%, #000864 100%);
  padding: 100px 40px;
  margin: -20px 0;
}

/* Background scene SVG */
.pchecks-scene{position:absolute;inset:0;pointer-events:none;z-index:1;opacity:0.20}
.pchecks-scene svg{width:100%;height:100%}

/* ============================================
   Section Header (Dark Theme)
   ============================================ */

${cssLib.sectionHeaderCSS('pchecks', { dark: true })}

.pchecks-header {
  text-align: center;
  max-width: 900px;
  margin: 0 auto 80px;
}

.pchecks-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
}

.pchecks-label-line {
  width: 40px;
  height: 1px;
  background: rgba(255, 255, 255, 0.4);
}

.pchecks-label-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
}

.pchecks-title {
  font-family: 'Noto Sans', sans-serif;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  color: #ffffff;
  margin: 0 0 20px;
}

.pchecks-subtitle {
  font-family: 'Noto Sans', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
}

/* ============================================
   3-Column Grid
   ============================================ */

.pchecks-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 60px;
}

/* ============================================
   Pain Point Cards (Dark Theme)
   ============================================ */

${cssLib.cardCSS('pchecks', { dark: true })}

.pchecks-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 40px 32px;
  transition: all 0.4s ease;
  position: relative;
}

.pchecks-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-4px);
}

.pchecks-card-number {
  font-family: 'Noto Sans', sans-serif;
  font-size: 72px;
  font-weight: 700;
  line-height: 1;
  color: rgba(255, 255, 255, 0.15);
  margin-bottom: 16px;
}

.pchecks-card-title {
  font-family: 'Noto Sans', sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
  color: #ffffff;
  margin: 0 0 20px;
}

.pchecks-card-quote {
  font-family: 'Noto Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  font-style: italic;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 20px;
  padding-left: 20px;
  border-left: 3px solid rgba(255, 255, 255, 0.3);
}

.pchecks-card-desc {
  font-family: 'Noto Sans', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
}

/* ============================================
   CTA
   ============================================ */

.pchecks-cta-wrapper {
  text-align: center;
}

.pchecks-cta {
  display: inline-block;
  font-family: 'Noto Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  background: var(--dw-blue, #00AFF0);
  padding: 16px 48px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.pchecks-cta:hover {
  background: #0099D6;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 175, 240, 0.3);
}

/* ============================================
   Responsive
   ============================================ */

@media (max-width: 1024px) {
  .pchecks-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .pchecks-title {
    font-size: 40px;
  }

  .pchecks-subtitle {
    font-size: 18px;
  }
}

@media (max-width: 768px) {
  .pchecks-section {
    padding: 80px 24px !important;
  }

  .pchecks-header {
    margin-bottom: 60px;
  }

  .pchecks-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .pchecks-title {
    font-size: 32px;
  }

  .pchecks-subtitle {
    font-size: 16px;
  }

  .pchecks-card {
    padding: 32px 24px;
  }

  .pchecks-card-number {
    font-size: 56px;
  }

  .pchecks-card-title {
    font-size: 20px;
  }

  .pchecks-card-quote {
    font-size: 15px;
  }

  .pchecks-card-desc {
    font-size: 14px;
  }

  .pchecks-label-line {
    width: 30px;
  }

  .pchecks-label-text {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .pchecks-section {
    padding: 60px 20px !important;
  }

  .pchecks-header {
    margin-bottom: 48px;
  }

  .pchecks-title {
    font-size: 28px;
  }

  .pchecks-cta {
    width: 100%;
    padding: 14px 32px;
  }
}

/* ===== REDUCED MOTION ===== */
@media (prefers-reduced-motion: reduce) {
  .pchecks-card,
  .pchecks-cta {
    transition: none !important;
  }
  .pchecks-cta:hover {
    transform: none !important;
  }
}
`;
}

module.exports = { blocks, css };
