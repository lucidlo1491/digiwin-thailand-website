# Content Spec: Blog — Dual Units: Why Your ERP Should Show Both Kilograms AND Pieces (7.0)

**PRD Reference:** Section 7.0 (Blog / Knowledge Base)
**Status:** v1.0 — Reverse-engineered from HTML build
**Last Updated:** February 10, 2026

---

## Article Metadata

| Field | Value |
|-------|-------|
| **Title** | Dual Units: Why Your ERP Should Show Both Kilograms AND Pieces |
| **Slug** | /blog/dual-units |
| **Category** | Cost Management |
| **Category Badge Color** | #059669 (Green) |
| **Read Time** | 6 min read |
| **Publication Date** | February 2026 |
| **Meta Description** | When your sales team thinks in pieces but production measures in kilograms, your ERP should handle both simultaneously — not force you to choose one. |

---

## Article Content

### Opening / Hook

Your sales team sells in pieces. Your production floor measures in kilograms. Your warehouse counts in boxes. Your purchasing team orders in rolls or sheets. Every department uses different units of measure for the same product — and somehow your ERP is supposed to keep everyone on the same page.

For many manufacturers, the ERP forces a choice: pick one primary unit, convert everything else manually. This creates friction, errors, and wasted time at every handoff. Sales enters an order for 500 pieces. Warehouse needs to know that's 125 kg. Production needs 3 rolls of raw material. Purchasing needs 2 pallets. Every conversion is manual — and every manual conversion is an error waiting to happen.

### Section 1: The Single-Unit Problem

Many ERP systems — including certain major brands operating in Thailand — support only one primary unit of measure per item. You define a product as "kilograms" or "pieces" but not both simultaneously. The system picks one "master" unit; everything else is a conversion calculated on the fly.

Example: Sales enters 500 pieces. Warehouse needs 125 kg. System doesn't show both. Clerk has to remember item weighs 0.25 kg per piece. If wrong, they ship 120 kg (480 pieces) instead of 125 kg (500 pieces).

Production faces the same problem: production order says 1,000 units, but floor supervisor needs to know kilograms of raw material to requisition. BOM shows kg; production order shows units. Every handoff requires mental conversion or lookup table.

Purchasing encounters the inverse: suppliers sell by kg, roll, or sheet. Production consumes by piece or meter. Translation happens outside the ERP in spreadsheets because the system only understands one unit at a time.

**Pull quote:** "When your salesperson promises 500 pieces and your warehouse ships 120 kg, someone made a conversion error. Dual units eliminate the conversion entirely."

### Section 2: What Dual Units Solve

DigiWin's ERP displays both units simultaneously. On one screen: **500 pieces = 125 kg**. No mental math, no conversion tables.

- Inventory shows stock in both units (240 kg = 960 pieces at 0.25 kg/piece)
- Sales orders display customer quantity in pieces and warehouse fulfillment in kg
- Production orders show output in pieces and material consumption in kg
- Purchase orders display supplier units alongside production units

Not just convenience — accuracy. Every manual conversion introduces error risk: wrong conversion factor, transposed digits, forgotten packaging waste, incorrect rounding. Errors propagate as shipping discrepancies, production shortages, or inventory write-offs.

**Data card:** "2 Units, 1 Screen" — "See inventory, orders, and production in both measurement units simultaneously"

Dual units also matter for BOI compliance. BOI-certified manufacturers often need to report material consumption in import declaration units — which may differ from production units. If you import steel by the ton but produce parts by kg and sell by piece, your BOI report needs to reconcile all three. Dual-unit system makes this reconciliation automatic.

### Section 3: Where It Matters Most

Dual units are particularly critical where sales unit and production unit naturally diverge:

- **Plastics:** Resin purchased/tracked by kg. Injection-molded parts counted/sold by piece. Production needs to know kg of resin for 10,000 pieces. Inventory shows both kg remaining and pieces equivalent.
- **Metal fabrication:** Steel bought by ton. Sheets cut into parts counted by unit. Customer orders 5,000 brackets; purchasing needs to know tons of steel.
- **Food manufacturing:** Ingredients measured by kg/liter. Finished goods packaged/sold by case/unit. Recipe uses kg; sales order uses cases.
- **Chemicals:** Raw materials procured by liter/barrel. Production consumes by kg (weight-based). Finished products sold by volume or weight depending on customer.

In every case, the organization is forced to choose one "primary" unit. This reverberates through every transaction. The cost isn't just conversion time — it's the errors. A shipping mistake from unit conversion error damages customer trust, consumes internal labor, potentially triggers penalty clauses. Over hundreds of transactions per month, cumulative impact is significant.

**Highlight box — BOI reporting note:** Bonded materials often tracked in import units (tons, barrels, cases) while production consumption measured in different units (kg, liters, pieces). Dual-unit display ensures BOI reconciliation reports show consumption in both import unit and production unit without manual conversion.

### Section 4: A Small Feature with Large Impact

Seems like a small thing — two units on one screen. But across thousands of transactions per month, across every department, eliminating unit-of-measure conversion errors is significant.

Benefits enumerated: Fewer shipping mistakes. Faster order processing. More accurate inventory. Cleaner BOI reports. Less time on conversion factors. Fewer spreadsheets bridging sales-to-production gap.

If your current ERP forces you to choose between kg and pieces, you've felt this friction. Your team has workarounds — reference tables, conversion spreadsheets, mental math. These work until they don't. When they fail, the cost is immediate and measurable.

Dual-unit display isn't a luxury feature. It's the difference between an ERP that reflects how your business actually operates and one that forces your business to conform to its limitations.

### Closing / CTA

**CTA heading:** "Tired of Unit Conversion Headaches?"
**CTA body:** "See how dual-unit display eliminates errors across your entire operation."
**CTA button:** "Let's Talk" -> links to demo.html

---

## Data Claims & Stats Used

| Claim | Source/Verification |
|-------|-------------------|
| "Many ERP systems... support only one primary unit of measure per item" | General industry claim — many ERPs do support dual UoM but may not display both simultaneously. Needs nuance. |
| 0.25 kg per piece example (500 pieces = 125 kg) | Illustrative example, not a real product |
| "Hundreds of transactions per month" | Reasonable for manufacturing operations — not a specific claim |
| "Certain major brands operating in Thailand" single-unit limitation | Indirect competitor reference — no specific vendor named. Needs verification for accuracy. |

---

## Internal Links

| Link Text | Target |
|-----------|--------|
| Back to Insights | blog.html |
| Co-Product Cost Accounting: Allocating Costs When One Process Makes Many Products | blog/co-product-cost-accounting.html |
| Feature Codes: How to Handle "Same Product, Different Specs" Without Drowning in SKUs | blog/feature-codes.html |
| How One Factory Saved 10M THB/Year in BOI Supplementary Taxes | blog/boi-compliance-jin-hai.html |
| Let's Talk (CTA) | demo.html |

---

## Flags & Notes

- **CTA link target:** Links to `demo.html` — verify page exists.
- **No competitors named:** Article refers to "certain major brands operating in Thailand" without naming them. This aligns with PRD guidance. Good.
- **Related card title mismatch for Feature Codes:** Related card says "How to Handle 'Same Product, Different Specs' Without Drowning in SKUs" but the actual Feature Codes article title is "How to Turn 27 SKUs Into 1 Product." Different subtitle used in the related card.
- **Template uses shared blog CSS classes:** Uses `blog-hero`, `blog-body`, `blog-pullquote`, `blog-data-card`, `blog-highlight`, `blog-related`, `blog-cta` from shared `styles.css`. Only inline CSS is the category badge color (1 line). Correct pattern.
- **BOI cross-reference:** Article references BOI compliance without linking to the dedicated BOI article in the body text (only in related cards). Consider adding an inline link to `blog/boi-compliance-jin-hai.html` in the BOI compliance paragraphs for better internal linking.
- **Abbreviations:** BOM (Bill of Materials) spelled out on first use. BOI (Board of Investment) not spelled out — used multiple times. SKU not spelled out. For Thai manufacturing audience, BOI is widely known. BOM is properly explained. Consider spelling out BOI at least once.
- **Lightest article of the set:** At 6 min read, this is the shortest article. Content is solid but could potentially benefit from a real-world case study or specific data point about conversion error costs to strengthen the argument.
- **Good Thai audience targeting:** Industry examples (plastics, metal, food, chemicals) all map directly to major Thai manufacturing sectors. Appropriate for Track A audience.
