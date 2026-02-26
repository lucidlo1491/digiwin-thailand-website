/**
 * th-legal-privacy.js — Thai Privacy Policy section builder
 *
 * Provides Thai-translated privacy policy content wrapped in a Divi section.
 * Mirrors the English privacy-policy.html structure with professional Thai legal language.
 * Keeps DigiWin brand name, email addresses, and URLs in English.
 */

const base = require('../../lib/templates/_base');

const THAI_PRIVACY_HTML = `
<section class="dw-section" style="padding-top: 120px;">
  <div class="dw-container">
    <div style="max-width: 800px; margin: 0 auto;">
      <h1 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 36px; color: #000864; margin-bottom: 16px;">นโยบายความเป็นส่วนตัว</h1>
      <p style="color: #5b6b80; margin-bottom: 48px;">อัปเดตล่าสุด: กุมภาพันธ์ 2569</p>

      <div style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 16px; line-height: 1.8; color: #000864;">
        <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 24px; margin: 32px 0 16px 0;">1. ข้อมูลที่เราเก็บรวบรวม</h2>
        <p>DigiWin Thailand ("เรา" หรือ "บริษัท") เก็บรวบรวมข้อมูลที่ท่านให้โดยตรง เช่น เมื่อท่านติดต่อเรา สอบถามข้อมูล หรือสมัครเป็นพันธมิตรทางธุรกิจ ข้อมูลดังกล่าวอาจรวมถึง:</p>
        <ul style="margin: 16px 0; padding-left: 24px;">
          <li>ชื่อและข้อมูลติดต่อ</li>
          <li>ชื่อบริษัทและตำแหน่งงาน</li>
          <li>ที่อยู่อีเมลและหมายเลขโทรศัพท์</li>
          <li>ข้อมูลเกี่ยวกับการดำเนินงานด้านการผลิตของท่าน</li>
        </ul>

        <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 24px; margin: 32px 0 16px 0;">2. วิธีการใช้ข้อมูลของท่าน</h2>
        <p>เราใช้ข้อมูลที่เก็บรวบรวมเพื่อ:</p>
        <ul style="margin: 16px 0; padding-left: 24px;">
          <li>ตอบข้อซักถามและคำขอของท่าน</li>
          <li>ให้ข้อมูลเกี่ยวกับผลิตภัณฑ์และบริการของเรา</li>
          <li>ดำเนินการพิจารณาใบสมัครพันธมิตรทางธุรกิจ</li>
          <li>ปรับปรุงเว็บไซต์และบริการของเรา</li>
          <li>ส่งข้อมูลด้านการตลาด (โดยได้รับความยินยอมจากท่าน)</li>
        </ul>

        <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 24px; margin: 32px 0 16px 0;">3. การเปิดเผยข้อมูล</h2>
        <p>เราไม่ขาย แลกเปลี่ยน หรือให้เช่าข้อมูลส่วนบุคคลของท่านแก่บุคคลภายนอก เราอาจเปิดเผยข้อมูลของท่านแก่:</p>
        <ul style="margin: 16px 0; padding-left: 24px;">
          <li>บริษัทในกลุ่ม DigiWin เพื่อวัตถุประสงค์ทางธุรกิจ</li>
          <li>ผู้ให้บริการที่ช่วยสนับสนุนการดำเนินงานของเรา</li>
          <li>หน่วยงานทางกฎหมายเมื่อกฎหมายกำหนด</li>
        </ul>

        <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 24px; margin: 32px 0 16px 0;">4. ความปลอดภัยของข้อมูล</h2>
        <p>เราใช้มาตรการทางเทคนิคและองค์กรที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของท่านจากการเข้าถึง เปลี่ยนแปลง เปิดเผย หรือทำลายโดยไม่ได้รับอนุญาต</p>

        <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 24px; margin: 32px 0 16px 0;">5. สิทธิของท่าน</h2>
        <p>ภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA) ของประเทศไทย ท่านมีสิทธิ:</p>
        <ul style="margin: 16px 0; padding-left: 24px;">
          <li>เข้าถึงข้อมูลส่วนบุคคลของท่าน</li>
          <li>แก้ไขข้อมูลที่ไม่ถูกต้อง</li>
          <li>ขอลบข้อมูลของท่าน</li>
          <li>เพิกถอนความยินยอม</li>
          <li>ยื่นเรื่องร้องเรียนต่อหน่วยงานที่เกี่ยวข้อง</li>
        </ul>

        <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 24px; margin: 32px 0 16px 0;">6. ติดต่อเรา</h2>
        <p>หากท่านมีข้อสงสัยเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ หรือต้องการใช้สิทธิของท่าน กรุณาติดต่อเราที่:</p>
        <p style="margin-top: 16px;">
          <strong>DigiWin Thailand</strong><br>
          อีเมล: <a href="mailto:info@digiwin.co.th" style="color: #0369a1;">info@digiwin.co.th</a>
        </p>
      </div>
    </div>
  </div>
</section>
`.trim();

module.exports = {
  blocks: () => base.wrapInDiviSection('นโยบายความเป็นส่วนตัว: Content', THAI_PRIVACY_HTML, 'Thai Privacy Policy Content'),
  css: () => `
/* === LEGAL PAGE: THAI PRIVACY POLICY === */
/* Divi section-level overrides for legal pages */
.et_pb_section { padding: 0 !important; min-height: auto !important; margin: 0 !important; text-align: start !important; }
.et_pb_section .et_pb_row { max-width: 100% !important; width: 100% !important; padding: 0 !important; margin: 0 auto !important; }
.et_pb_section .et_pb_column { padding: 0 !important; }
.et_pb_section, .et_pb_section * { -webkit-font-smoothing: auto !important; -moz-osx-font-smoothing: auto !important; }
.et_pb_section p { padding-bottom: 0 !important; }
.fade-in { opacity: 1 !important; transform: none !important; }
:root { --dw-blue-text: #0369a1; --dw-gray-light: #F5F7FA; --dw-navy: #000864; }

/* Thai font override for legal content */
.dw-section, .dw-section * {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
.dw-section h1, .dw-section h2 {
  line-height: 1.4 !important;
}
.dw-section p, .dw-section li {
  line-height: 1.8 !important;
}
`.trim(),
};
