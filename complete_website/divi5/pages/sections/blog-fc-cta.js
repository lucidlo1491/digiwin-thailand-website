/**
 * blog-fc-cta.js — CTA section for Feature Codes VB POC (VB-Native)
 *
 * Matches HTML prototype CTA exactly:
 *   - Heading: "Managing Product Complexity?"
 *   - Subtitle: "Our team helps Thai manufacturers..."
 *   - Button: solid cyan #00AFF0, white text, chat icon
 *   - Gradient: same as hero (#0f1419 → #000432 → #000864)
 *   - Dot-pattern overlay (not cross-hatch)
 *
 * Uses codeModule for the entire CTA (heading + subtitle + button)
 * because the original needs centered layout with chat icon SVG in button.
 */

const { codeModule, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../../lib/modules');

function css() {
  return `
/* ═══ Blog FC CTA (Matching Prototype) ═══ */

/* Row + column sizing */
.et_pb_section_4 .et_pb_row { max-width: 640px !important; margin: 0 auto !important; }
.et_pb_section_4 .et_pb_module { margin-bottom: 0 !important; padding-bottom: 0 !important; }
.et_pb_section_4 .et_pb_code .et_pb_code_inner { padding: 0 !important; }

/* CTA inner layout */
.blog-fc-cta-inner {
  text-align: center;
  position: relative;
  z-index: 1;
}
.blog-fc-cta-inner h2 {
  font-family: 'Noto Sans', sans-serif;
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 700;
  color: #fff;
  margin: 0 0 16px;
  line-height: 1.25;
}
.blog-fc-cta-inner p {
  font-family: 'Noto Sans', sans-serif;
  font-size: 18px;
  color: rgba(255,255,255,0.85);
  line-height: 1.7;
  margin: 0 0 32px;
}

/* Button — solid cyan with chat icon */
.blog-fc-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #00AFF0;
  color: #fff;
  font-family: 'Noto Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding: 16px 36px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
}
.blog-fc-cta-btn:hover {
  background: #2b7bc4;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,175,240,0.3);
}
.blog-fc-cta-btn svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
}

/* Dot-pattern overlay (matching prototype) */
.et_pb_section_4::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}
.et_pb_section_4.et_pb_section { position: relative; overflow: hidden; }

/* Responsive */
@media (max-width: 768px) {
  .blog-fc-cta-inner h2 { font-size: 24px; }
  .blog-fc-cta-btn { min-height: 48px; }
}
@media (max-width: 480px) {
  .blog-fc-cta-btn { display: flex; justify-content: center; width: 100%; }
}

/* Focus states */
.blog-fc-cta-btn:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .blog-fc-cta-btn { transition: none; }
  .blog-fc-cta-btn:hover { transform: none; }
}
`.trim();
}

function blocks() {
  const ctaHTML = `<div class="blog-fc-cta-inner">
  <h2>Managing Product Complexity?</h2>
  <p>Our team helps Thai manufacturers simplify their product data without losing visibility.</p>
  <a href="/contact/" class="blog-fc-cta-btn">
    <svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    Let's Talk
  </a>
</div>`;

  return [
    // Gradient matching prototype: #0f1419 → #000432 → #000864
    sectionOpen({
      adminLabel: 'Blog FC CTA',
      background: {
        color: '#000432',
        gradient: {
          stops: [
            { color: '#0f1419', position: 0 },
            { color: '#000432', position: 40 },
            { color: '#000864', position: 100 },
          ],
          direction: '135deg',
          enabled: true,
        },
      },
      padding: { top: '80px', bottom: '80px', left: '24px', right: '24px', syncVertical: 'off', syncHorizontal: 'off' },
      css: 'selector{background:linear-gradient(135deg,#0f1419 0%,#000432 40%,#000864 100%) !important}',
    }),

    rowOpen({ adminLabel: 'CTA Row', sizing: { width: '100%', maxWidth: '640px' } }),
    columnOpen({ adminLabel: 'CTA Column' }),

    codeModule(ctaHTML, 'CTA: Managing Product Complexity'),

    columnClose(),
    rowClose(),
    sectionClose(),
  ];
}

module.exports = { blocks, css };
