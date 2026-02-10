# Content Spec: Blog — Co-Product Cost Accounting: The Problem SAP Cannot Solve (7.0)

**PRD Reference:** Section 7.0 (Blog / Knowledge Base)
**Status:** v1.0 — Reverse-engineered from HTML build
**Last Updated:** February 10, 2026

---

## Article Metadata

| Field | Value |
|-------|-------|
| **Title** | Co-Product Cost Accounting: The Problem SAP Cannot Solve |
| **Slug** | /blog/co-product-cost-accounting |
| **Category** | Cost Management |
| **Category Badge Color** | rgba(5, 150, 105, 0.2) background with #34d399 text, 1px solid rgba(5, 150, 105, 0.3) border (Green theme) |
| **Read Time** | 7 min read |
| **Publication Date** | February 2026 |
| **Meta Description** | Most ERPs force separate work orders for each output — destroying cost accuracy. Learn how native co-product handling delivers accurate per-product costing for plastics, food, and chemical manufacturing. |

---

## Article Content

### Opening / Hook

In Thai manufacturing, one production run often produces multiple outputs. A plastics injection cycle yields three different parts from one mold. A food processing batch produces a primary product, a by-product, and a co-product. A chemical reaction generates two saleable outputs and a recyclable residue.

This is not an edge case. It is daily reality on thousands of shop floors across Thailand.

The question: if your ERP cannot accurately allocate costs across multiple outputs from a single production run, your cost data is fiction. And if your cost data is fiction, so are your margins, your quotes, and your pricing strategy.

### Section 1: The Multi-Output Reality

Many Thai industries produce co-products and by-products as a natural part of manufacturing. Not a special scenario needing a workaround — the fundamental way these factories operate.

- **Plastics injection molding:** Multi-cavity molds produce different parts in a single cycle. Runners and sprues recycled. One machine setup yields multiple SKUs simultaneously.
- **Food and beverage processing:** Single batch produces primary product alongside commercially valuable by-products — cooking oils, animal feed, flavoring extracts.
- **Chemical manufacturing:** Chemical reactions inherently produce multiple outputs — primary compound, secondary compound, recoverable solvent.
- **Metal processing:** Stamping, cutting, machining produce primary parts alongside scrap metal with resale value. Die-casting generates both finished components and reusable overflow material.

**Pull quote:** "When one work order produces three outputs, your ERP needs to know how to split the cost accurately -- not just divide by three."

### Section 2: How Most ERPs Get This Wrong

Standard ERP architecture assumes: one work order produces one output item. One BOM in, one finished good out. Works for single-product assembly lines. Falls apart completely in co-product manufacturing.

Forced workarounds:

- **Separate work orders for each output.** Creates three work orders for one production run. Destroys cost linkage. Material consumption cannot be accurately split because each work order pretends it's independent.
- **Manual journal entries to redistribute costs.** Accounting team manually moves costs between accounts at month-end. Error-prone, audit-risky, always delayed. Decisions already made on wrong data.
- **Ignore co-product costing entirely.** Assign zero cost to by-products, load everything onto primary product. P&L distorted — primary product looks worse, by-product appears to have infinite margins.

SAP Business One, Kingdee, and Yonyou — the most common ERPs in Thai manufacturing — all require one or more of these workarounds. None support native multi-output work orders at the SME tier.

**Data callout:** 1 Production Run -> 3 Outputs -> 3 Separate Work Orders = "0% Cost Accuracy" — "The broken model that most ERPs force on multi-output factories"

### Section 3: Native Co-Product Handling

DigiWin approaches co-product manufacturing the way the shop floor actually works: one work order can declare multiple output items. No workaround. No manual redistribution. Architected from the ground up.

How it works:

- **One work order, multiple outputs.** Single work order defines production run, input materials, and all expected outputs — primary products, co-products, by-products. System knows from the start.
- **Flexible cost allocation methods.** Costs distributed by weight, by quantity, by market value, or by custom formula. Plastics factory: allocate by weight. Food processor: by market value. Chemical plant: custom formula based on purity grades.
- **Material consumption tracks to the work order.** All raw materials, labor, overhead consumed against the work order, then distributed across all outputs per allocation method. No ambiguity.
- **Accurate per-product costing.** True cost for each output item reflecting manufacturing reality — not estimate, not manual adjustment, not guess.

**Highlight box:** "Co-product cost accounting is not an edge case. In plastics injection molding alone — one of Thailand's largest manufacturing sectors — multi-output production is the default reality. Any ERP that cannot handle this natively is not built for Thai manufacturing."

### Section 4: Why Accurate Costing Matters More Than You Think

Inaccurate cost allocation cascades into every decision:

- **Wrong cost = wrong pricing = wrong margins.** If system overstates primary product cost and understates co-product cost, pricing is based on fiction. May underprice high-value co-product (giving away margin) while overpricing primary product (losing deals).
- **Quoting accuracy suffers.** When customer asks for price on a co-product, sales team needs to know actual production cost. If ERP can't provide it, quoting blind. Win rates drop, margins erode.
- **BOI compliance becomes harder.** For BOI-promoted factories, material consumption must reconcile with all outputs, not just primary product. If system only tracks primary output, reconciliation gaps trigger supplementary tax exposure. (Cross-reference to BOI compliance article.)
- **Inventory valuation is distorted.** By-products with zero cost on balance sheet don't reflect reality. Auditors and banks will notice.

**Pull quote:** "If you are pricing co-products based on estimated costs, you might be giving away your margins on every order."

### Section 5: The Competitive Landscape

This is a fundamental architectural limitation in competing systems:

- **SAP Business One:** No native co-product work order capability. Production module assumes one work order = one output. Workarounds: multiple work orders or manual journal entries. Upgrading to SAP S/4HANA would cost 10 to 50 times more than the SME ERP itself.
- **Kingdee and Yonyou:** Same architectural constraint at SME product tiers. Co-product handling requires customization increasing implementation cost and maintenance.
- **DigiWin:** Includes native co-product support in both T100 (mid-market ERP) and iGP/WorkFlow (SME ERP). Not a premium add-on. Not a customization. Built into standard manufacturing module.

For distributors and ERP consultants: co-product handling is a proven deal-winning differentiator. In any competitive evaluation involving plastics, food, or chemical manufacturer, native co-product cost accounting ends the conversation in your favor.

### Closing / CTA

**CTA heading:** "Need Accurate Co-Product Costing?"
**CTA body:** "Our team can show you how DigiWin handles multi-output production -- from plastics injection to food processing to chemical manufacturing."
**CTA button:** "Let's Talk" -> links to demo.html

---

## Data Claims & Stats Used

| Claim | Source/Verification |
|-------|-------------------|
| SAP Business One has no native co-product work order capability | Needs verification against current SAP B1 version. Plausible for SME tier. |
| Kingdee and Yonyou lack native co-product support at SME tier | Needs verification. Claim about both competitors. |
| Upgrading to SAP S/4HANA costs "10 to 50 times more" than SME ERP | Very broad range — directionally plausible but unverified. Could be challenged. |
| DigiWin includes native co-product support in both T100 and iGP/WorkFlow | DigiWin product claim — needs verification with product team |
| Plastics injection molding is "one of Thailand's largest manufacturing sectors" | Plausible — Thailand is a major plastics hub. Needs specific ranking source. |
| "0% Cost Accuracy" for the 3-separate-work-orders model | Rhetorical/illustrative claim, not a measured statistic |

---

## Internal Links

| Link Text | Target |
|-----------|--------|
| Back to Insights | blog.html |
| BOI compliance article (inline text link) | blog/boi-compliance-jin-hai.html |
| BOI Compliance: How One Factory Eliminated 10M THB (related card) | blog/boi-compliance-jin-hai.html |
| LRP vs MRP (related card) | blog/lrp-vs-mrp.html |
| Dual Units of Measure (related card) | blog/dual-units.html |
| Let's Talk (CTA) | demo.html |

---

## Flags & Notes

- **CRITICAL: Competitors named directly.** Article names SAP Business One, SAP S/4HANA, Kingdee, and Yonyou by name. The PRD says "Never name competitors directly." This article violates that rule explicitly and repeatedly. The title itself says "The Problem SAP Cannot Solve." This needs a deliberate decision: is the blog/knowledge-base an exception to the no-naming rule, or should these be changed to indirect references ("certain major enterprise systems," "Chinese vendors expanding in Thailand")? The competitive claims are the article's core value proposition, so removing them weakens the piece significantly.
- **CRITICAL: Massive inline CSS.** This article does NOT use the shared blog CSS classes. It has ~450 lines of inline CSS defining its own `.article-hero`, `.article-body`, `.article-pull-quote`, `.article-data-callout`, `.article-highlight-box`, `.related-section`, `.article-cta`, animation, and responsive styles. This is a completely different CSS pattern from the other 4 blog articles which use shared `blog-*` classes from `styles.css`. This article needs CSS extraction and migration to the shared blog pattern.
- **CTA link target:** Links to `demo.html` — verify page exists.
- **Track B content:** The final paragraph explicitly addresses "distributors and ERP consultants" — this is dual-audience (Track A + Track B) content. The rest of the article serves Track A (factory operators).
- **Abbreviations:** BOM (Bill of Materials), SKU, P&L, BOI, S/4HANA — BOM spelled out; others assume reader familiarity. BOI and S/4HANA could use brief context for non-expert Thai readers.
- **Cross-references:** Links to BOI compliance article inline — good internal linking practice.
- **"0% Cost Accuracy" claim:** This is used as a rhetorical device in the data callout. While effective, it's technically an exaggeration — separate work orders don't produce literally 0% accuracy. Could be softened to "Broken Cost Accuracy" or similar.
