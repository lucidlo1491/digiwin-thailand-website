/**
 * th-legal-terms.js — Thai Terms of Service section builder
 *
 * Provides Thai-translated terms of service content wrapped in a Divi section.
 * Mirrors the English terms.html structure with professional Thai legal language.
 * Keeps DigiWin brand name, email addresses, and URLs in English.
 */

const base = require('../../lib/templates/_base');

const THAI_TERMS_HTML = `
<section class="dw-section" style="padding-top: 120px;">
  <div class="dw-container">
    <div style="max-width: 800px; margin: 0 auto;">
      <h1 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 36px; color: #000864; margin-bottom: 16px;">ข้อกำหนดการใช้บริการ</h1>
      <p style="color: #5b6b80; margin-bottom: 48px;">อัปเดตล่าสุด: กุมภาพันธ์ 2569</p>

      <div style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 16px; line-height: 1.8; color: #000864;">
        <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 24px; margin: 32px 0 16px 0;">1. การยอมรับข้อกำหนด</h2>
        <p>การเข้าถึงและใช้งานเว็บไซต์ DigiWin Thailand ("เว็บไซต์") ถือว่าท่านยอมรับและตกลงผูกพันตามข้อกำหนดการใช้บริการเหล่านี้ หากท่านไม่ยอมรับข้อกำหนดเหล่านี้ กรุณาอย่าใช้งานเว็บไซต์ของเรา</p>

        <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 24px; margin: 32px 0 16px 0;">2. การใช้งานเว็บไซต์</h2>
        <p>ท่านตกลงที่จะใช้งานเว็บไซต์เพื่อวัตถุประสงค์ที่ชอบด้วยกฎหมายเท่านั้น และจะไม่ใช้งานในลักษณะที่ละเมิดสิทธิของผู้อื่นหรือจำกัดการใช้งานของผู้อื่น กิจกรรมที่ห้ามกระทำได้แก่:</p>
        <ul style="margin: 16px 0; padding-left: 24px;">
          <li>พยายามเข้าถึงเว็บไซต์โดยไม่ได้รับอนุญาต</li>
          <li>ใช้เว็บไซต์เพื่อส่งรหัสที่เป็นอันตราย</li>
          <li>คัดลอกหรือเผยแพร่เนื้อหาบนเว็บไซต์โดยไม่ได้รับอนุญาต</li>
          <li>ใช้เว็บไซต์เพื่อวัตถุประสงค์ที่ผิดกฎหมาย</li>
        </ul>

        <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 24px; margin: 32px 0 16px 0;">3. ทรัพย์สินทางปัญญา</h2>
        <p>เนื้อหาทั้งหมดบนเว็บไซต์นี้ รวมถึงข้อความ กราฟิก โลโก้ รูปภาพ และซอฟต์แวร์ เป็นทรัพย์สินของ DigiWin หรือผู้อนุญาตให้ใช้สิทธิ์ และได้รับความคุ้มครองตามกฎหมายทรัพย์สินทางปัญญา ท่านไม่สามารถทำซ้ำ เผยแพร่ หรือสร้างงานดัดแปลงโดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษรจากเรา</p>

        <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 24px; margin: 32px 0 16px 0;">4. ข้อมูลผลิตภัณฑ์</h2>
        <p>แม้ว่าเราจะมุ่งมั่นในการให้ข้อมูลผลิตภัณฑ์ที่ถูกต้อง แต่เราไม่รับประกันว่าคำอธิบายผลิตภัณฑ์หรือเนื้อหาอื่น ๆ บนเว็บไซต์จะถูกต้อง สมบูรณ์ หรือเป็นปัจจุบันเสมอไป ข้อมูลจำเพาะและคุณสมบัติของผลิตภัณฑ์อาจเปลี่ยนแปลงได้โดยไม่ต้องแจ้งให้ทราบล่วงหน้า</p>

        <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 24px; margin: 32px 0 16px 0;">5. ข้อจำกัดความรับผิด</h2>
        <p>DigiWin Thailand จะไม่รับผิดชอบต่อความเสียหายทางอ้อม ความเสียหายโดยบังเอิญ ความเสียหายพิเศษ หรือความเสียหายที่เป็นผลสืบเนื่องใด ๆ ที่เกิดจากการใช้งานเว็บไซต์ หรือผลิตภัณฑ์หรือบริการใด ๆ ที่ได้รับผ่านเว็บไซต์</p>

        <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 24px; margin: 32px 0 16px 0;">6. ลิงก์ไปยังเว็บไซต์ภายนอก</h2>
        <p>เว็บไซต์อาจมีลิงก์ไปยังเว็บไซต์ของบุคคลภายนอก เราไม่รับผิดชอบต่อเนื้อหาหรือแนวปฏิบัติของเว็บไซต์ดังกล่าว การใช้งานเว็บไซต์ของบุคคลภายนอกเป็นความรับผิดชอบของท่านเอง</p>

        <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 24px; margin: 32px 0 16px 0;">7. การเปลี่ยนแปลงข้อกำหนด</h2>
        <p>เราขอสงวนสิทธิ์ในการแก้ไขข้อกำหนดการใช้บริการเหล่านี้ได้ตลอดเวลา การเปลี่ยนแปลงจะมีผลบังคับใช้ทันทีเมื่อเผยแพร่ การใช้งานเว็บไซต์ต่อไปของท่านถือว่าท่านยอมรับข้อกำหนดที่แก้ไขแล้ว</p>

        <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 24px; margin: 32px 0 16px 0;">8. กฎหมายที่ใช้บังคับ</h2>
        <p>ข้อกำหนดการใช้บริการเหล่านี้อยู่ภายใต้กฎหมายของประเทศไทย ข้อพิพาทใด ๆ ที่เกิดจากข้อกำหนดเหล่านี้จะอยู่ภายใต้เขตอำนาจศาลแต่เพียงผู้เดียวของศาลไทย</p>

        <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 24px; margin: 32px 0 16px 0;">9. ติดต่อเรา</h2>
        <p>หากท่านมีข้อสงสัยเกี่ยวกับข้อกำหนดการใช้บริการนี้ กรุณาติดต่อเราที่:</p>
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
  blocks: () => base.wrapInDiviSection('ข้อกำหนดการใช้บริการ: Content', THAI_TERMS_HTML, 'Thai Terms of Service Content'),
  css: () => `
/* === LEGAL PAGE: THAI TERMS OF SERVICE === */
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
