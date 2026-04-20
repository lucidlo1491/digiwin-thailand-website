/**
 * th-demo-form.js — Thai Form Section (S2) — Contact page
 */

const base = require('../../lib/templates/_base');

function blocks() {
  const html = `
    <div class="demo-form-section">
    <div class="demo-form-inner" style="position:relative;z-index:2;">
      <div class="demo-form-container">
        [contact-form-7 id="3ede9be" title="DigiWin Contact Form"]
        <div class="form-alternative">
          <p>ต้องการส่งอีเมลโดยตรง?</p>
          <a href="mailto:info@digiwin.co.th">info@digiwin.co.th</a>
        </div>
      </div>

      <div class="demo-why">
        <h3>ทำไมต้องคุยกับเรา?</h3>
        <div class="why-points">
          <div class="why-point">
            <div class="why-icon">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div class="why-content">
              <h4>ไม่มีการขายแบบกดดัน</h4>
              <p>การโทรครั้งแรกเป็นเรื่องเกี่ยวกับสถานการณ์ของคุณ ไม่ใช่ฟีเจอร์ของเรา เรารับฟังก่อนเสมอ</p>
            </div>
          </div>
          <div class="why-point">
            <div class="why-icon">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div class="why-content">
              <h4><span class="dw-years">44</span> ปี เฉพาะด้านการผลิต</h4>
              <p>เราเข้าใจโรงงาน เพราะนี่คือสิ่งที่เราทำมาตลอด ไม่มีค้าปลีก ไม่มีโรงแรม มีแต่การผลิต</p>
            </div>
          </div>
          <div class="why-point">
            <div class="why-icon">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"/></svg>
            </div>
            <div class="why-content">
              <h4>ทีมงานคนไทย</h4>
              <p>ที่ปรึกษาพูดไทย ประจำกรุงเทพฯ ไม่ใช่ Call Center ต่างประเทศ ซัพพอร์ตในพื้นที่จริง</p>
            </div>
          </div>
          <div class="why-point">
            <div class="why-icon">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="why-content">
              <h4>ได้รับการรับรองจากกรมสรรพากร</h4>
              <p>ปรับแต่งสำหรับภาษีไทย, ภาษีหัก ณ ที่จ่าย, e-Tax และรายงาน BOI เรียบร้อยแล้ว</p>
            </div>
          </div>
        </div>

        <div class="demo-proof">
          <span class="demo-proof-label">ทำไมเราถึงแตกต่าง</span>
          <div class="demo-proof-stats">
            <div class="proof-stat">
              <span class="proof-stat-value">72%</span>
              <span class="proof-stat-label">บริษัทจดทะเบียนในไต้หวันไว้วางใจเรา</span>
            </div>
            <div class="proof-stat">
              <span class="proof-stat-value">Foxconn FII</span>
              <span class="proof-stat-label">นักลงทุนเชิงกลยุทธ์</span>
            </div>
            <div class="proof-stat">
              <span class="proof-stat-value">1,300+</span>
              <span class="proof-stat-label">วิศวกร R&D</span>
            </div>
            <div class="proof-stat">
              <span class="proof-stat-value">CMMI 4</span>
              <span class="proof-stat-label">ได้รับการรับรองตั้งแต่ 2010</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>`;

  return base.wrapInDiviSection('Form', html, 'Form: Content');
}

function css() {
  return `
/* === FORM (S2) === */
.demo-form-section{padding:80px 24px;background:#fff;${base.fontSmoothingReset()}font-size:16px}
.demo-form-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:64px}
.demo-form-container{background:#fff;border:1px solid #e2e8f0;border-radius:24px;padding:48px;box-shadow:0 4px 24px rgba(0,0,0,0.06)}
/* CF7 form header */
.demo-form-container .demo-form-header{margin-bottom:32px}
.demo-form-container .demo-form-header h2{font-family:'Noto Sans Thai',sans-serif;font-size:28px;font-weight:700;color:#000864;margin-bottom:8px}
.demo-form-container .demo-form-header p{font-size:15px;color:#5b6b80;margin:0}
/* CF7 form fields */
.demo-form-container .form-group{margin-bottom:24px}
.demo-form-container .form-label{display:block;font-weight:600;color:#000864;margin-bottom:8px;font-size:14px}
.demo-form-container .wpcf7 input[type="text"],
.demo-form-container .wpcf7 input[type="email"],
.demo-form-container .wpcf7 input[type="tel"],
.demo-form-container .wpcf7 textarea{width:100%;padding:14px 16px;border:1px solid #e2e8f0;border-radius:12px;font-size:16px;font-family:'Noto Sans Thai',sans-serif;transition:all 0.2s;box-sizing:border-box}
.demo-form-container .wpcf7 input:focus,
.demo-form-container .wpcf7 textarea:focus{outline:none;border-color:#00AFF0;box-shadow:0 0 0 3px rgba(0,175,240,0.1)}
.demo-form-container .wpcf7 textarea{resize:vertical;min-height:100px}
/* CF7 checkboxes */
.demo-form-container .wpcf7-checkbox .wpcf7-list-item{display:block;margin:0 0 8px}
.demo-form-container .wpcf7-checkbox input[type="checkbox"]{width:18px;height:18px;accent-color:#00AFF0;margin-right:8px}
/* CF7 acceptance */
.demo-form-container .wpcf7-acceptance input[type="checkbox"]{width:18px;height:18px;accent-color:#00AFF0;margin-right:8px}
.demo-form-container .wpcf7-acceptance a{color:#00AFF0;text-decoration:underline}
/* CF7 submit button */
.demo-form-container .wpcf7 .form-submit,
.demo-form-container .wpcf7 input[type="submit"]{width:100%;padding:16px;background:linear-gradient(135deg,#00AFF0,#003CC8);color:#fff;border:none;border-radius:12px;font-family:'Noto Sans Thai',sans-serif;font-size:16px;font-weight:600;cursor:pointer;transition:all 0.3s}
.demo-form-container .wpcf7 .form-submit:hover,
.demo-form-container .wpcf7 input[type="submit"]:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,175,240,0.3)}
/* CF7 response messages */
.demo-form-container .wpcf7-response-output{border-radius:12px;padding:16px;margin:16px 0 0;font-size:14px}
.demo-form-container .wpcf7-mail-sent-ok{border-color:#02D28C;color:#059669;background:#f0fdf4}
.demo-form-container .wpcf7-validation-errors{border-color:#dc2626;color:#dc2626;background:#fef2f2}
.demo-form-container .wpcf7 .wpcf7-not-valid-tip{color:#dc2626;font-size:13px;margin-top:4px}
.demo-form-container .wpcf7 .wpcf7-spinner{display:none}
.form-alternative{margin-top:24px;padding-top:24px;border-top:1px solid #e2e8f0;text-align:center}
.form-alternative p{font-size:14px;color:#5b6b80;margin-bottom:4px}
.form-alternative a{color:#0369a1;font-weight:600;text-decoration:none}
.demo-why{padding:0 0 80px}
.demo-why h3{font-family:'Noto Sans Thai',sans-serif;font-size:20px;font-weight:600;color:#000864;margin-bottom:24px}
.why-points{display:flex;flex-direction:column;gap:20px}
.why-point{display:flex;gap:16px}
.why-icon{width:48px;height:48px;background:linear-gradient(135deg,#eff6ff,#dbeafe);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.why-icon svg{width:24px;height:24px;stroke:#00AFF0}
.why-content h4{font-family:'Noto Sans Thai',sans-serif;font-size:16px;font-weight:600;color:#000864;margin:0 0 4px}
.why-content p{font-size:14px;color:#5b6b80;line-height:1.6;margin:0}
.demo-proof{background:linear-gradient(135deg,#000864,#000432);border-radius:20px;padding:32px;margin-top:40px}
.demo-proof-label{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;color:#15803d;letter-spacing:1px;text-transform:uppercase;display:block;margin-bottom:16px}
.demo-proof-stats{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.proof-stat{text-align:center;padding:16px;background:rgba(255,255,255,0.05);border-radius:12px}
.proof-stat-value{font-family:'Noto Sans',sans-serif;font-size:24px;font-weight:700;color:#00AFF0;display:block}
.proof-stat-label{font-size:12px;color:rgba(255,255,255,0.85)}
@media(max-width:1024px){.demo-form-inner{grid-template-columns:1fr;gap:48px}}
@media(max-width:640px){.demo-form-container{padding:32px 24px}.demo-proof-stats{grid-template-columns:1fr}}
${base.reducedMotion(`.form-input,.form-checkbox-label,.form-submit{animation:none !important;transition:none !important}`)}
`.trim();
}

module.exports = { blocks, css };
