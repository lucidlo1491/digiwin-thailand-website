/**
 * blog-fc-faq.js — FAQ section for Feature Codes VB POC (VB-Native)
 *
 * Uses native Divi 5 Accordion module — each Q&A is individually
 * click-to-edit in the Visual Builder. No codeModules.
 *
 * VB-native: font props set via module JSON. CSS only for accordion card
 * styling (borders, radius, spacing) and toggle icon contrast.
 *
 * D46 fix: family uses bare name 'Noto Sans' — Divi adds fallback automatically.
 */

const { textModule, accordionOpen, accordionClose, accordionItem, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../../lib/modules');

function css() {
  return `
/* ═══ Blog FC FAQ (VB-Native Accordion) ═══ */

/* Accordion card styling (Layer 3 — no native panel for border/radius on toggles) */
.et_pb_section_2 .et_pb_toggle {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
  background: #fff;
}
.et_pb_section_2 .et_pb_toggle_title {
  padding: 16px 20px;
}
.et_pb_section_2 .et_pb_toggle_content {
  padding: 0 20px 16px;
}
.et_pb_section_2 .et_pb_toggle_content p {
  margin: 0;
  padding: 0;
}

/* FAQ heading centering */
.et_pb_section_2 .et_pb_text .et_pb_text_inner h2 {
  text-align: center;
  margin: 0;
  padding: 0;
}

/* Accordion toggle icon — increase contrast (Layer 3) */
.et_pb_section_2 .et_pb_toggle::before,
.et_pb_section_2 .et_pb_toggle .et_pb_toggle_title::before { color: #666; }

/* Focus states */
.et_pb_section_2 .et_pb_toggle:focus-within { outline: 2px solid #00AFF0; outline-offset: 2px; }
.et_pb_section_2 .et_pb_toggle_title:focus-visible { outline: 2px solid #00AFF0; outline-offset: 2px; }

/* Responsive */
@media (max-width: 768px) {
  .et_pb_section_2 .et_pb_toggle_title { min-height: 44px; display: flex; align-items: center; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .et_pb_section_2 .et_pb_toggle { transition: none; }
}
`.trim();
}

function blocks() {
  return [
    sectionOpen({
      adminLabel: 'Blog FC FAQ',
      background: { color: '#f8fafc' },
      padding: { top: '60px', bottom: '60px', left: '0px', right: '0px', syncVertical: 'off', syncHorizontal: 'off' },
    }),

    rowOpen({ adminLabel: 'FAQ Row', sizing: { width: '100%', maxWidth: '800px' } }),
    columnOpen({
      adminLabel: 'FAQ Column',
      spacing: { desktop: { value: { padding: { top: '0px', bottom: '0px', left: '24px', right: '24px' } } } },
    }),

    // 1. Section heading — all native JSON (Layer 1)
    textModule(
      '<h2>Frequently Asked Questions</h2>',
      { color: '#000864', size: '28px', weight: '700', family: 'Noto Sans', lineHeight: '1.3' },
      { adminLabel: 'FAQ Heading', marginBottom: '32px' }
    ),

    // 2. Native Accordion — font props via JSON (Layer 1)
    accordionOpen({
      adminLabel: 'FAQ Accordion',
      titleFont: { family: 'Noto Sans', weight: '600', size: '17px', color: '#000864' },
      bodyFont: { family: 'Noto Sans', weight: '400', size: '15px', lineHeight: '1.7em', color: '#333333' },
    }),

    accordionItem(
      'What are feature codes in ERP?',
      '<p>Feature codes are a product configuration system built into DigiWin\'s ERP that separates the concept of a product from the concept of a variant. Instead of creating a separate item code for every combination of size, color, material, or specification, you define one item master with multiple feature dimensions. The system manages the base BOM, routing, cost structure, and purchasing rules once, then layers variant dimensions on top — drastically reducing item master complexity while preserving full inventory tracking at the variant level.</p>',
      { open: true, adminLabel: 'FAQ: What are feature codes?' }
    ),

    accordionItem(
      'How do feature codes reduce SKU count?',
      '<p>Feature codes eliminate SKU multiplication by managing product variations as dimensions of a single item rather than separate item codes. For example, a product with 3 sizes, 3 colors, and 3 collar types would traditionally require 27 separate SKUs, each with its own BOM, inventory record, and purchasing rules. With feature codes, this becomes 1 item code with 3 feature dimensions. BOM maintenance effort drops dramatically — when a material specification changes, you update one BOM instead of 27. MRP also aggregates demand across all feature combinations, producing consolidated purchase requisitions instead of fragmented ones.</p>',
      { adminLabel: 'FAQ: How reduce SKU count?' }
    ),

    accordionItem(
      'What is the difference between product features and inventory features?',
      '<p>Product features are attributes inherent to what you are making — size, color, electrical rating, material grade — that your customer selects when placing an order and that may affect the BOM or routing. Inventory features are internal tracking dimensions the customer never sees, such as supplier brand (when multiple suppliers provide identical components), customer-dedicated stock, lot numbers for traceability, or warehouse location. This separation lets you add inventory tracking complexity for traceability and compliance without exploding your item master or creating duplicate BOMs.</p>',
      { adminLabel: 'FAQ: Product vs inventory features?' }
    ),

    accordionClose(),

    columnClose(),
    rowClose(),
    sectionClose(),
  ];
}

module.exports = { blocks, css };
