/**
 * demo-expect.js — What to Expect Section (S3) — Contact page
 *
 * Three-step process cards: Discovery Call → Tailored Demo → Honest Assessment.
 * Light background with Super D corner decoration.
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = `
    <div class="demo-expect">
    ${superD.html('demo-expect-deco')}
    <div class="demo-expect-inner" style="position:relative;z-index:2;">
      <div class="demo-expect-header">
        <h2>What to Expect</h2>
        <p>No pressure. No obligation. Just a conversation about what's possible.</p>
      </div>
      <div class="expect-steps">
        <div class="expect-step">
          <div class="step-number">1</div>
          <h3>Discovery Call</h3>
          <p>We'll learn about your factory, challenges, and goals. We ask questions first—no sales pitch. 30-45 minutes.</p>
        </div>
        <div class="expect-step">
          <div class="step-number">2</div>
          <h3>Tailored Demo</h3>
          <p>See only the products that fit your needs. We'll focus on your industry and specific use cases. No generic slide decks.</p>
        </div>
        <div class="expect-step">
          <div class="step-number">3</div>
          <h3>Honest Assessment</h3>
          <p>If there's a fit, we'll provide a detailed proposal. If not, we'll tell you honestly. We'd rather build trust than force a sale.</p>
        </div>
      </div>
    </div>
    </div>`;

  return base.wrapInDiviSection('Expect', html, 'Expect: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === EXPECT (S3) === */
.demo-expect{padding:80px 24px;background:linear-gradient(180deg,#F5F7FA 0%,#fff 100%);position:relative;overflow:hidden;${base.fontSmoothingReset()}font-size:16px}
${superD.css('demo-expect-deco', { variant: 'outline', position: 'corner-br', opacity: 0.06 })}
.demo-expect-inner{max-width:1000px;margin:0 auto}
.demo-expect-header{text-align:center;margin-bottom:48px}
.demo-expect-header h2{font-family:'Noto Sans',sans-serif;font-size:36px;font-weight:700;color:#000864;margin-bottom:12px}
.demo-expect-header p{font-size:17px;color:#5b6b80;margin:0}
.expect-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.expect-step{background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:32px;text-align:center;transition:all 0.3s ease}
.expect-step:hover{box-shadow:0 12px 40px rgba(0,0,0,0.08)}
.step-number{width:48px;height:48px;background:linear-gradient(135deg,#00AFF0,#003CC8);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Noto Sans',sans-serif;font-size:20px;font-weight:700;color:#fff;margin:0 auto 20px}
.expect-step h3{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:600;color:#000864;margin-bottom:12px}
.expect-step p{font-size:14px;color:#5b6b80;line-height:1.6;margin:0}
@media(max-width:640px){.expect-steps{grid-template-columns:1fr}}
${base.reducedMotion(`.expect-step,.demo-expect-deco{animation:none !important;transition:none !important}`)}
`.trim();
}

module.exports = { blocks, css };
