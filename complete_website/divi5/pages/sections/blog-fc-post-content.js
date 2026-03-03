/**
 * blog-fc-post-content.js — Article body for post format (VB-Native)
 *
 * Rendered INSIDE postContentModule — the body layout (blog-single.js)
 * wraps this with hero, related, and CTA sections.
 *
 * Key difference from blog-fc-content.js (page version):
 *   - NO section-numbered CSS (section numbers differ inside body layout)
 *   - Body layout CSS handles base h2/p/a typography
 *   - Custom CSS only for: data card, highlight, bullets, pullquote
 *   - All font properties via native JSON (D46 fixed: bare name only)
 *
 * Uses a single section with multiple rows (one per article segment).
 */

const { textModule, codeModule, dividerModule, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../../lib/modules');

// Font options — family works natively (D46 fixed: bare name only)
const H2 = { color: '#000864', size: '28px', weight: '600', family: 'Noto Sans', lineHeight: '1.3' };
const BODY = { color: '#333333', size: '16px', weight: '400', family: 'Noto Sans', lineHeight: '1.8' };

// Shared row config — matches body layout's content width
const ROW_SIZING = { width: '100%', maxWidth: '760px' };
const COL_SPACING = {
  desktop: { value: { padding: { top: '0px', bottom: '0px', left: '24px', right: '24px' } } },
  tablet:  { value: { padding: { top: '0px', bottom: '0px', left: '16px', right: '16px' } } },
  phone:   { value: { padding: { top: '0px', bottom: '0px', left: '16px', right: '16px' } } },
};

function css() {
  // No section-numbered CSS — only class-based selectors for custom elements.
  // Body layout CSS (.dw-blog-content-wrap .et_pb_post_content) handles base typography.
  return `
/* ═══ Blog FC Post Content — Custom Elements Only ═══ */

/* Custom list bullets (body layout has no custom bullet styling) */
.blog-fc-list ul { list-style: none; padding: 0; margin: 16px 0 24px; }
.blog-fc-list li { padding: 4px 0 4px 24px; position: relative; }
.blog-fc-list li::before {
  content: ''; position: absolute; left: 0; top: 14px;
  width: 8px; height: 8px; border-radius: 50%; background: #00AFF0;
}
.blog-fc-list li strong { color: #000864; }

/* Data card */
.blog-fc-data-card {
  background: #F5F7FA; border-left: 4px solid #00AFF0;
  border-radius: 0 12px 12px 0; padding: 32px; margin: 32px 0; text-align: center;
}
.blog-fc-data-inline { display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap; }
.blog-fc-data-number { font-family: 'Noto Sans', sans-serif; font-size: 36px; font-weight: 800; color: #000864; }
.blog-fc-data-arrow { font-size: 32px; color: #00AFF0; font-weight: 700; }
.blog-fc-data-label { font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 500; color: #666; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 16px; }

/* Highlight box */
.blog-fc-highlight {
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  border: 1px solid #bae6fd; border-radius: 12px; padding: 28px 32px; margin: 32px 0;
}
.blog-fc-highlight p { font-family: 'Noto Sans', sans-serif; font-size: 16px; line-height: 1.75; color: #333; margin: 0; padding: 0; }
.blog-fc-highlight strong { color: #000864; }

/* Responsive */
@media (max-width: 768px) {
  .blog-fc-data-number { font-size: 28px; }
}
@media (max-width: 480px) {
  .blog-fc-highlight { padding: 20px 24px; }
  .blog-fc-data-inline { flex-direction: column; gap: 8px; }
}
`.trim();
}

function blocks() {
  return [
    sectionOpen({
      adminLabel: 'Blog FC Content',
      padding: { top: '60px', bottom: '80px', left: '0px', right: '0px', syncVertical: 'off', syncHorizontal: 'off' },
    }),

    // ── Row 1: Opening Paragraphs ──
    rowOpen({ adminLabel: 'Opening Paragraphs', sizing: ROW_SIZING }),
    columnOpen({ adminLabel: 'Opening Column', spacing: COL_SPACING }),

    textModule(
      '<p>Your factory makes a shirt. Three sizes (S, M, L), three colors (red, blue, white), three collar types (V-neck, round, crew). That is 27 separate item codes. Each needs its own Bill of Materials, its own inventory tracking record, its own purchasing rules, its own reorder point. Scale this across a product line of even moderate complexity, and you suddenly have thousands of SKUs managing what is fundamentally the same product with minor variations.</p>',
      BODY, { adminLabel: 'Opening: SKU multiplication problem' }
    ),

    textModule(
      '<p>This is not a theoretical problem. It is a pattern that repeats across every manufacturing sector that deals with configurable products. Electronics (brand/version/source), apparel (size/color/fabric), solar panels (electrical properties), machinery (dimensions/capacity). The result is an ERP system choked with nearly identical item masters, a warehouse team managing dozens of picking locations for functionally identical products, and a purchasing department juggling hundreds of reorder points that should be consolidated under a single material plan.</p>',
      BODY, { adminLabel: 'Opening: Cross-industry pattern' }
    ),

    dividerModule({ color: '#000864', weight: '3px', width: '48px', marginTop: '40px', marginBottom: '40px', adminLabel: 'Accent Divider' }),

    columnClose(), rowClose(),

    // ── Row 2: The Problem with SKU Multiplication ──
    rowOpen({ adminLabel: 'SKU Multiplication Problem', sizing: ROW_SIZING }),
    columnOpen({ adminLabel: 'SKU Column', spacing: COL_SPACING }),

    textModule('<h2>The Problem with SKU Multiplication</h2>', H2, { adminLabel: 'H2: SKU Multiplication' }),

    textModule(
      '<p>When you treat each product variation as a separate item code, several predictable problems emerge. First, <strong>inventory accuracy collapses</strong>. Your system shows zero stock of "medium blue V-neck," so production stops waiting for replenishment. Meanwhile, the warehouse has excess inventory of "medium blue round-neck" sitting unused. The materials are identical. The manufacturing process is identical. But because they are tracked as separate items, the system cannot recognize they are interchangeable for material planning purposes.</p>',
      BODY, { adminLabel: 'Body: Inventory accuracy' }
    ),

    textModule(
      '<p>Second, <strong>purchasing becomes exponentially more complex</strong>. Instead of one reorder point for "shirt fabric - blue," you now have nine — one for each combination that uses blue fabric. Each variation triggers its own purchase requisition. Each has its own minimum order quantity, lead time buffer, and safety stock calculation. The purchasing team spends more time managing item-level parameters than actually negotiating with suppliers or optimizing order quantities.</p>',
      BODY, { adminLabel: 'Body: Purchasing complexity' }
    ),

    textModule(
      '<p>Third, <strong>BOM maintenance becomes a nightmare</strong>. Your supplier changes the thread specification. Now you need to update 27 separate BOMs instead of one. A quality issue requires a material substitution. Again, 27 BOMs. A cost change needs to propagate through the system. 27 records. Every change multiplies across every SKU, and every manual update is an opportunity for error — which means some item codes will inevitably drift out of sync with reality.</p>',
      BODY, { adminLabel: 'Body: BOM nightmare' }
    ),

    textModule(
      '<p>Fourth, <strong>warehouse operations suffer</strong>. Picking errors increase because visually similar items are stored across different locations. Cycle counts take longer because each SKU requires separate verification. Space utilization drops because you cannot consolidate storage — the system treats each variation as a unique item requiring its own bin location.</p>',
      BODY, { adminLabel: 'Body: Warehouse operations' }
    ),

    // Pullquote — freeForm CSS for border-left (Layer 2)
    textModule(
      '<p>The goal isn\'t fewer products. It\'s fewer item codes managing more products.</p>',
      { color: '#555555', size: '16px', weight: '500', family: 'Noto Sans', lineHeight: '1.7' },
      { adminLabel: 'Quote: Fewer item codes', marginTop: '32px', marginBottom: '32px' },
      'selector { border-left: 4px solid #00AFF0; background: #f8fafc; border-radius: 0 8px 8px 0; padding: 16px 24px; } selector .et_pb_text_inner p { font-style: italic; margin-bottom: 0 !important; }'
    ),

    columnClose(), rowClose(),

    // ── Row 3: What Feature Codes Do ──
    rowOpen({ adminLabel: 'What Feature Codes Do', sizing: ROW_SIZING }),
    columnOpen({ adminLabel: 'Feature Codes Column', spacing: COL_SPACING }),

    textModule('<h2>What Feature Codes Do</h2>', H2, { adminLabel: 'H2: What Feature Codes Do' }),

    textModule(
      '<p><a href="/products/erp/">DigiWin\'s ERP</a> feature code system solves this by separating the concept of a <strong>product</strong> from the concept of a <strong>variant</strong>. Instead of creating 27 separate item codes, you create one item master with multiple feature dimensions. The system defines the product once — its base BOM, its routing, its cost structure, its purchasing rules — and then layers variant dimensions on top.</p>',
      BODY, { adminLabel: 'Body: Product vs variant' }
    ),

    // Feature list — class-based CSS for bullet styling
    textModule(
      '<div class="blog-fc-list"><p>In the shirt example, you would define:</p><ul><li><strong>Feature 1 (Size):</strong> S, M, L</li><li><strong>Feature 2 (Color):</strong> Red, Blue, White</li><li><strong>Feature 3 (Collar):</strong> V-neck, Round, Crew</li></ul></div>',
      BODY, { adminLabel: 'List: Feature dimensions' }
    ),

    textModule(
      '<p>The system treats each combination as a unique variant for inventory tracking, order fulfillment, and warehouse management. When a customer orders "medium blue V-neck," the system knows exactly which physical inventory to pick. But for BOM maintenance, purchasing planning, and cost accounting, all 27 variants roll up to a single item master. When you need to update the thread specification, you update one BOM — and it applies to all variants automatically.</p>',
      BODY, { adminLabel: 'Body: Variant tracking' }
    ),

    // Data card — codeModule (Layer 4)
    codeModule(
      `<div class="blog-fc-data-card"><div class="blog-fc-data-inline"><div><div class="blog-fc-data-number">27 SKUs</div></div><div class="blog-fc-data-arrow">&rarr;</div><div><div class="blog-fc-data-number">1 Item Code</div></div></div><div class="blog-fc-data-label">90%+ reduction in item master complexity</div></div>`,
      'Data Card: 27 SKUs → 1 Item Code'
    ),

    textModule(
      '<p>This is not just a data organization trick. It fundamentally changes how the system handles material planning. When you run MRP, the system aggregates demand across all feature combinations. If you have orders for 100 red shirts (across all sizes and collars) and 50 blue shirts (across all sizes and collars), MRP calculates fabric requirements at the color level — not at the individual SKU level. The result is consolidated purchase requisitions, more accurate reorder points, and fewer stockouts caused by artificial fragmentation of demand.</p>',
      BODY, { adminLabel: 'Body: MRP aggregation' }
    ),

    columnClose(), rowClose(),

    // ── Row 4: Product Features vs Inventory Features ──
    rowOpen({ adminLabel: 'Product vs Inventory Features', sizing: ROW_SIZING }),
    columnOpen({ adminLabel: 'Features Column', spacing: COL_SPACING }),

    textModule('<h2>Product Features vs Inventory Features</h2>', H2, { adminLabel: 'H2: Product vs Inventory' }),

    textModule(
      '<p>DigiWin\'s feature code architecture includes a critical distinction: <strong>product features</strong> (attributes of the product itself) versus <strong>inventory features</strong> (attributes of how you track it). This separation unlocks capabilities that most ERP systems cannot support.</p>',
      BODY, { adminLabel: 'Body: Feature distinction' }
    ),

    textModule(
      '<p>Product features are inherent to what you are making. Size, color, electrical rating, material grade — these are choices your customer makes when placing an order, and they often affect the BOM or routing. Inventory features, by contrast, are internal tracking dimensions that the customer never sees. Supplier brand (when multiple suppliers provide functionally identical components), customer-dedicated stock (when a large customer requires segregated inventory), lot number (for traceability without creating separate item codes), warehouse location (when the same product is stocked in multiple facilities) — these are all inventory features.</p>',
      BODY, { adminLabel: 'Body: Feature types explained' }
    ),

    textModule(
      '<p>The power of this separation is that you can add inventory tracking complexity without exploding your item master. Consider a scenario: you manufacture solar panels, and you source the same photovoltaic cell from three different suppliers. The cells are functionally identical, but you need to track which supplier\'s material went into each finished panel for warranty traceability.</p>',
      BODY, { adminLabel: 'Body: Solar panel example' }
    ),

    textModule(
      '<p>In a traditional ERP, you would be forced to create three separate item codes for the same cell — one per supplier — and then three separate BOMs for the solar panel. With inventory features, you define one item code for the cell and add "supplier brand" as an inventory feature. The BOM references a single component. During production, the system tracks which supplier\'s inventory was issued — providing full traceability without fragmenting the item master.</p>',
      BODY, { adminLabel: 'Body: Inventory feature solution' }
    ),

    columnClose(), rowClose(),

    // ── Row 5: Real-World Applications ──
    rowOpen({ adminLabel: 'Real-World Applications', sizing: ROW_SIZING }),
    columnOpen({ adminLabel: 'Applications Column', spacing: COL_SPACING }),

    textModule('<h2>Real-World Applications Across Industries</h2>', H2, { adminLabel: 'H2: Real-World Applications' }),

    textModule('<p><strong>Electronics Manufacturing:</strong> A factory produces power adapters in multiple voltage ratings (12V, 24V, 48V), multiple connector types (USB-C, barrel jack, terminal block), and sources components from multiple suppliers. Without feature codes, this requires dozens of item codes. With feature codes, one item master with three product features and one inventory feature. BOM maintenance effort drops by 80%.</p>', BODY, { adminLabel: 'Body: Electronics' }),

    textModule('<p><strong>Apparel and Textiles:</strong> A garment manufacturer produces workwear in 5 sizes, 6 colors, and 3 fabric weights. Traditional approach: 90 SKUs. Feature code approach: 1 item code with 3 product features. When a fabric supplier changes, one BOM update instead of 90.</p>', BODY, { adminLabel: 'Body: Apparel' }),

    textModule('<p><strong>Industrial Components:</strong> A machining shop makes steel brackets in 8 lengths and 4 hole-pattern configurations. Each bracket can be supplied in raw steel or zinc-plated. Traditional approach: 64 SKUs. Feature code approach: 1 item code with 3 features.</p>', BODY, { adminLabel: 'Body: Industrial' }),

    // Highlight box — codeModule (Layer 4)
    codeModule(
      `<div class="blog-fc-highlight"><p><strong>Feature-aware costing:</strong> DigiWin's feature code system supports cost differentiation at the feature level. If zinc-plated brackets cost more than raw steel (due to the plating process), you can assign incremental cost to the "plating" feature value without creating separate item codes. The system calculates the final product cost by summing the base item cost plus feature-specific cost adders — giving you variant-level cost accuracy without variant-level item master complexity.</p></div>`,
      'Highlight: Feature-Aware Costing'
    ),

    columnClose(), rowClose(),

    // ── Row 6: The Real Impact ──
    rowOpen({ adminLabel: 'The Real Impact', sizing: ROW_SIZING }),
    columnOpen({ adminLabel: 'Impact Column', spacing: COL_SPACING }),

    textModule('<h2>The Real Impact</h2>', H2, { adminLabel: 'H2: The Real Impact' }),

    textModule('<p>The benefits of feature codes extend far beyond reducing the number of rows in your item master table. The operational impacts touch nearly every function in a manufacturing organization.</p><p><strong>Product setup speed increases dramatically.</strong> Launching a new product with multiple variants no longer requires creating dozens of item codes, BOMs, and routing records. You define one item master, specify feature dimensions, and the system generates all valid combinations automatically.</p>', BODY, { adminLabel: 'Body: Product setup speed' }),

    textModule('<p><strong>BOM maintenance errors drop.</strong> When a material specification changes, you update one BOM instead of dozens. Fewer update points means fewer opportunities for data entry errors and fewer instances where some SKUs drift out of sync with others.</p>', BODY, { adminLabel: 'Body: BOM errors' }),

    textModule('<p><strong>Inventory visibility improves.</strong> Instead of seeing fragmented stock across dozens of SKUs, planners see consolidated inventory at the feature level. If total blue fabric inventory is sufficient but distributed across multiple combinations, the system recognizes that and avoids unnecessary purchase orders.</p>', BODY, { adminLabel: 'Body: Inventory visibility' }),

    textModule('<p><strong>Purchasing becomes simpler and more effective.</strong> MRP generates consolidated demand for materials common across feature combinations. Purchase requisitions aggregate by supplier and material, not by individual SKU — increasing order quantities, reducing administrative overhead, and improving supplier relationships.</p>', BODY, { adminLabel: 'Body: Purchasing' }),

    textModule('<p><strong>Warehouse operations become more efficient.</strong> Cycle counting is faster because feature-coded items can be counted at the aggregate level. Picking accuracy improves because visually similar items are no longer scattered across dozens of bin locations. Storage consolidation becomes possible.</p>', BODY, { adminLabel: 'Body: Warehouse' }),

    // Pullquote — freeForm CSS (Layer 2)
    textModule(
      '<p>Feature codes don\'t just reduce SKU count. They restructure how the entire system thinks about product complexity — from planning to purchasing to production to warehouse management.</p>',
      { color: '#555555', size: '16px', weight: '500', family: 'Noto Sans', lineHeight: '1.7' },
      { adminLabel: 'Quote: System restructuring', marginTop: '32px', marginBottom: '32px' },
      'selector { border-left: 4px solid #00AFF0; background: #f8fafc; border-radius: 0 8px 8px 0; padding: 16px 24px; } selector .et_pb_text_inner p { font-style: italic; margin-bottom: 0 !important; }'
    ),

    columnClose(), rowClose(),

    // ── Row 7: What This Means for Your Factory ──
    rowOpen({ adminLabel: 'What This Means', sizing: ROW_SIZING }),
    columnOpen({ adminLabel: 'Factory Column', spacing: COL_SPACING }),

    textModule('<h2>What This Means for Your Factory</h2>', H2, { adminLabel: 'H2: What This Means' }),

    textModule('<p>If your factory produces configurable products — anything with size, color, voltage, dimension, or material variations — you are almost certainly managing more SKUs than necessary. The question is not whether feature codes would help. The question is how much operational overhead you are currently tolerating because your ERP lacks this capability.</p>', BODY, { adminLabel: 'Body: Diagnostic intro' }),

    textModule('<p>Here is a straightforward diagnostic: count how many item codes in your system share 90%+ identical BOMs, differing only in a single component or dimension. If that number is in the dozens, you have SKU multiplication. If it is in the hundreds, you have SKU explosion. And if your team is maintaining separate spreadsheets to track which items are "really the same product," you have already built a feature code system manually — you just do not have software support for it.</p>', BODY, { adminLabel: 'Body: Diagnostic' }),

    textModule('<p>DigiWin\'s T100 ERP supports feature codes as a core architectural capability, not an add-on module. This means the entire system — from sales order entry to production planning to inventory management to costing — understands and respects feature-level logic. You are not working around the system. You are working with it.</p>', BODY, { adminLabel: 'Body: T100 positioning' }),

    columnClose(), rowClose(),
    sectionClose(),
  ];
}

module.exports = { blocks, css };
