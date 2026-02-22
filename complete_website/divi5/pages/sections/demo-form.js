/**
 * demo-form.js — Form Section (S2) — Contact page
 *
 * Two-column layout: contact form + "Why Talk to Us?" panel.
 * SVGs are inline — safe in wp:html blocks via MySQL push.
 */

const base = require('../../lib/templates/_base');

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = `
    <div class="demo-form-section">
    <div class="demo-form-inner" style="position:relative;z-index:2;">
      <div class="demo-form-container">
        <div class="demo-form-header">
          <h2>Request a Consultation</h2>
          <p>Tell us about your situation. We'll respond within 1 business day.</p>
        </div>
        <form action="#" method="POST">
          <div class="form-group">
            <label class="form-label" for="demo-name">Your Name *</label>
            <input type="text" required class="form-input" id="demo-name" placeholder="Khun Somchai">
          </div>
          <div class="form-group">
            <label class="form-label" for="demo-email">Email *</label>
            <input type="email" required class="form-input" id="demo-email" placeholder="somchai@company.co.th">
          </div>
          <div class="form-group">
            <label class="form-label" for="demo-company">Company *</label>
            <input type="text" required class="form-input" id="demo-company" placeholder="Your company name">
          </div>
          <div class="form-group">
            <label class="form-label" for="demo-phone">Phone</label>
            <input type="tel" class="form-input" id="demo-phone" placeholder="+66">
          </div>
          <div class="form-group">
            <label class="form-label">I'm interested in:</label>
            <div class="form-checkbox-group">
              <label class="form-checkbox-label">
                <input type="checkbox" name="interest" value="factory">
                <div class="checkbox-content">
                  <h3>Solutions for My Factory</h3>
                  <p>I own or manage a manufacturing facility</p>
                </div>
              </label>
              <label class="form-checkbox-label">
                <input type="checkbox" name="interest" value="partner">
                <div class="checkbox-content">
                  <h3>Becoming a DigiWin Partner</h3>
                  <p>I run a software/consulting firm</p>
                </div>
              </label>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="demo-situation">Tell us about your current situation</label>
            <textarea class="form-input form-textarea" id="demo-situation" placeholder="What challenges are you facing? What systems do you currently use?"></textarea>
          </div>
          <div class="form-group">
            <label class="form-checkbox-label" style="border-color:#e2e8f0;background:#f8fafc;">
              <input type="checkbox" name="pdpa_consent" required id="demo-pdpa">
              <div class="checkbox-content">
                <p style="color:#333;font-size:14px;line-height:1.5;">I agree to the processing of my personal data per DigiWin's <a href="/privacy-policy/" style="color:#00AFF0;text-decoration:underline;">Privacy Policy</a> *</p>
              </div>
            </label>
          </div>
          <button type="submit" class="form-submit">Start the Conversation</button>
          <p style="text-align:center;font-size:13px;color:#5b6b80;margin-top:12px;line-height:1.5;">No sales pressure. We'll listen to your situation first.</p>
        </form>
        <div class="form-alternative">
          <p>Prefer to email directly?</p>
          <a href="mailto:info@digiwin.co.th">info@digiwin.co.th</a>
        </div>
      </div>

      <div class="demo-why">
        <h3>Why Talk to Us?</h3>
        <div class="why-points">
          <div class="why-point">
            <div class="why-icon">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div class="why-content">
              <h4>No Sales Pitch</h4>
              <p>Our first call is about your situation, not our features. We listen before we talk.</p>
            </div>
          </div>
          <div class="why-point">
            <div class="why-icon">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div class="why-content">
              <h4><span class="dw-years">44</span> Years Manufacturing Only</h4>
              <p>We understand factories because that's all we've ever done. No retail. No hospitality. Just manufacturing.</p>
            </div>
          </div>
          <div class="why-point">
            <div class="why-icon">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"/></svg>
            </div>
            <div class="why-content">
              <h4>Local Thai Team</h4>
              <p>Thai-speaking consultants based in Bangkok. No overseas call centers. Real local support.</p>
            </div>
          </div>
          <div class="why-point">
            <div class="why-icon">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="why-content">
              <h4>Thai Revenue Dept. Certified</h4>
              <p>Already localized for Thai taxation, Withholding Tax, e-Tax integration, and BOI reporting.</p>
            </div>
          </div>
        </div>

        <div class="demo-proof">
          <span class="demo-proof-label">Why We're Different</span>
          <div class="demo-proof-stats">
            <div class="proof-stat">
              <span class="proof-stat-value">72%</span>
              <span class="proof-stat-label">Taiwan Listed Cos. Trust Us</span>
            </div>
            <div class="proof-stat">
              <span class="proof-stat-value">Foxconn FII</span>
              <span class="proof-stat-label">Strategic Investor</span>
            </div>
            <div class="proof-stat">
              <span class="proof-stat-value">1,300+</span>
              <span class="proof-stat-label">R&D Engineers</span>
            </div>
            <div class="proof-stat">
              <span class="proof-stat-value">CMMI 4</span>
              <span class="proof-stat-label">Certified Since 2010</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>`;

  return base.wrapInDiviSection('Form', html, 'Form: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === FORM (S2) === */
.demo-form-section{padding:80px 24px;background:#fff;${base.fontSmoothingReset()}font-size:16px}
.demo-form-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:64px}
.demo-form-container{background:#fff;border:1px solid #e2e8f0;border-radius:24px;padding:48px;box-shadow:0 4px 24px rgba(0,0,0,0.06)}
.demo-form-header{margin-bottom:32px}
.demo-form-header h2{font-family:'Noto Sans',sans-serif;font-size:28px;font-weight:700;color:#000864;margin-bottom:8px}
.demo-form-header p{font-size:15px;color:#5b6b80;margin:0}
.form-group{margin-bottom:24px}
.form-label{display:block;font-weight:600;color:#000864;margin-bottom:8px;font-size:14px}
.form-input{width:100%;padding:14px 16px;border:1px solid #e2e8f0;border-radius:12px;font-size:16px;font-family:'Noto Sans',sans-serif;transition:all 0.2s;box-sizing:border-box}
.form-input:focus{outline:none;border-color:#00AFF0;box-shadow:0 0 0 3px rgba(0,175,240,0.1)}
.form-textarea{resize:vertical;min-height:100px}
.form-checkbox-group{display:flex;flex-direction:column;gap:12px}
.form-checkbox-label{display:flex;align-items:center;gap:12px;cursor:pointer;padding:16px;border:1px solid #e2e8f0;border-radius:12px;transition:all 0.2s}
.form-checkbox-label:hover{border-color:#00AFF0;background:#f8fafc}
.form-checkbox-label input[type="checkbox"]{width:20px;height:20px;accent-color:#00AFF0}
.checkbox-content h3{font-family:'Noto Sans',sans-serif;font-size:15px;font-weight:600;color:#000864;margin:0 0 2px}
.checkbox-content p{font-size:13px;color:#5b6b80;margin:0}
.form-submit{width:100%;padding:16px;background:linear-gradient(135deg,#00AFF0,#003CC8);color:#fff;border:none;border-radius:12px;font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;cursor:pointer;transition:all 0.3s}
.form-submit:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,175,240,0.3)}
.form-alternative{margin-top:24px;padding-top:24px;border-top:1px solid #e2e8f0;text-align:center}
.form-alternative p{font-size:14px;color:#5b6b80;margin-bottom:4px}
.form-alternative a{color:#0369a1;font-weight:600;text-decoration:none}
.demo-why{padding:0 0 80px}
.demo-why h3{font-family:'Noto Sans',sans-serif;font-size:20px;font-weight:600;color:#000864;margin-bottom:24px}
.why-points{display:flex;flex-direction:column;gap:20px}
.why-point{display:flex;gap:16px}
.why-icon{width:48px;height:48px;background:linear-gradient(135deg,#eff6ff,#dbeafe);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.why-icon svg{width:24px;height:24px;stroke:#00AFF0}
.why-content h4{font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;color:#000864;margin:0 0 4px}
.why-content p{font-size:14px;color:#5b6b80;line-height:1.6;margin:0}
.demo-proof{background:linear-gradient(135deg,#000864,#000432);border-radius:20px;padding:32px;margin-top:40px}
.demo-proof-label{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;color:#15803d;letter-spacing:1px;text-transform:uppercase;display:block;margin-bottom:16px}
.demo-proof-stats{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.proof-stat{text-align:center;padding:16px;background:rgba(255,255,255,0.05);border-radius:12px}
.proof-stat-value{font-family:'Noto Sans',sans-serif;font-size:24px;font-weight:700;color:#00AFF0;display:block}
.proof-stat-label{font-size:12px;color:rgba(255,255,255,0.75)}
@media(max-width:1024px){.demo-form-inner{grid-template-columns:1fr;gap:48px}}
@media(max-width:640px){.demo-form-container{padding:32px 24px}.demo-proof-stats{grid-template-columns:1fr}}
${base.reducedMotion(`.form-input,.form-checkbox-label,.form-submit{animation:none !important;transition:none !important}`)}
`.trim();
}

module.exports = { blocks, css };
