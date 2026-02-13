# Co-Product Cost Accounting

> Managing co-product and by-product costing in process manufacturing.

---

Skip to content

[Back to Insights](../blog.html)
Cost Management 

# Co-Product Cost Accounting: The Problem Most ERPs Cannot Solve

7 min read 

February 2026 

In Thai manufacturing, one production run often produces multiple outputs. A plastics injection cycle might yield three different parts from one mold. A food processing batch might produce a primary product, a by-product, and a co-product. A chemical reaction might generate two saleable outputs and a recyclable residue.

This is not an edge case. It is daily reality on thousands of shop floors across Thailand.

The question is simple: if your ERP cannot accurately allocate costs across multiple outputs from a single production run, your cost data is fiction. And if your cost data is fiction, so are your margins, your quotes, and your pricing strategy.

## The Multi-Output Reality

Many Thai industries produce co-products and by-products as a natural part of manufacturing. This is not a special scenario that needs a workaround. It is the fundamental way these factories operate.

- **Plastics injection molding:** Multi-cavity molds produce different parts in a single cycle. Runners and sprues are recycled back into raw material. One machine setup yields multiple SKUs simultaneously.

- **Food and beverage processing:** A single batch of raw material produces a primary product alongside by-products that carry commercial value -- cooking oils, animal feed, flavoring extracts.

- **Chemical manufacturing:** Chemical reactions inherently produce multiple outputs. A single process might yield a primary compound, a secondary compound, and a recoverable solvent.

- **Metal processing:** Stamping, cutting, and machining operations produce primary parts alongside scrap metal with resale value. Die-casting generates both finished components and reusable overflow material.

When one work order produces three outputs, your ERP needs to know how to split the cost accurately -- not just divide by three.

## How Most ERPs Get This Wrong

The standard ERP architecture assumes a clean, simple relationship: one work order produces one output item. One BOM (Bill of Materials) in, one finished good out. This works perfectly for single-product assembly lines. It falls apart completely in co-product manufacturing.

When factories running these systems encounter multi-output production, they are forced into workarounds:

- **Separate work orders for each output.** The factory creates three work orders to represent what is actually one production run. This destroys the cost linkage between outputs. Material consumption cannot be accurately split because each work order pretends it is an independent process.

- **Manual journal entries to redistribute costs.** The accounting team manually moves costs between accounts at month-end to approximate the correct allocation. This is error-prone, audit-risky, and always delayed. By the time the numbers are corrected, decisions have already been made on wrong data.

- **Ignore co-product costing entirely.** Some factories simply assign zero cost to by-products and load everything onto the primary product. The P&L for the primary product looks worse than reality, the by-product appears to have infinite margins, and management decisions are based on distorted numbers.

The most common mid-market ERP systems encountered in Thai manufacturing all require one or more of these workarounds to handle co-product scenarios. None of them support native multi-output work orders at the SME tier.

1 Production Run 

3 Outputs 

3 Separate Work Orders 

0% Cost Accuracy 
The broken model that most ERPs force on multi-output factories 

## Native Co-Product Handling

[DigiWin's manufacturing ERP](../products/erp.html) approaches co-product manufacturing the way the shop floor actually works: one work order can declare multiple output items. There is no workaround. There is no manual redistribution. The system is architected from the ground up to handle multi-output production as a first-class scenario.

Here is how it works in practice:

- **One work order, multiple outputs.** A single work order defines the production run, the input materials, and all expected output items -- primary products, co-products, and by-products. The system knows from the start that this run will produce multiple items.

- **Flexible cost allocation methods.** Costs can be distributed across outputs by weight, by quantity, by market value, or by a custom formula that reflects your specific production reality. A plastics factory might allocate by weight. A food processor might allocate by market value. A chemical plant might use a custom formula based on purity grades.

- **Material consumption tracks to the work order.** All raw materials, labor, and overhead are consumed against the work order, then distributed across all outputs according to the allocation method. There is no ambiguity about where costs went.

- **Accurate per-product costing.** The result is a true cost for each output item that reflects manufacturing reality -- not an estimate, not a manual adjustment, not a guess.

**Co-product cost accounting is not an edge case.** In plastics injection molding alone -- one of Thailand's largest manufacturing sectors -- multi-output production is the default reality. Any ERP that cannot handle this natively is not built for Thai manufacturing.

## Why Accurate Costing Matters More Than You Think

Inaccurate cost allocation does not just produce wrong numbers on a report. It cascades into every decision the factory makes.

**Wrong cost equals wrong pricing equals wrong margins.** If your system overstates the cost of your primary product and understates the cost of a co-product, you are setting prices based on fiction. You might be underpricing a high-value co-product -- essentially giving away margin on every order -- while overpricing your primary product and losing deals.

**Quoting accuracy suffers.** When a customer asks for a price on Product A, and Product A happens to be a co-product from a shared production run, you need to know what it actually costs to produce. If your ERP cannot provide that number, your sales team is quoting blind. Win rates drop. Margins erode. And you never know why because the root cause is buried in your cost accounting.

**BOI compliance becomes harder.** For BOI-promoted factories, material consumption must reconcile with all outputs from a production run, not just the primary product. If your system only tracks the primary output against the work order, the reconciliation between imported raw materials and finished goods will have gaps. Those gaps trigger supplementary tax exposure -- the same problem we detailed in our [BOI compliance article](../blog/boi-compliance-jin-hai.html).

**Inventory valuation is distorted.** By-products sitting in your warehouse with zero cost assigned? Your balance sheet does not reflect reality. Auditors will notice. So will your bank when you apply for a credit facility and your inventory numbers do not add up.

If you are pricing co-products based on estimated costs, you might be giving away your margins on every order.

## The Competitive Landscape

This is not a minor feature gap. It is a fundamental architectural limitation in competing systems.

**Most mid-market ERP systems** common in Thai small and medium enterprises have no native co-product work order capability. The production module assumes one work order equals one output. To work around this, factories either create multiple work orders (destroying cost linkage) or use manual journal entries (introducing delay and error). Upgrading to enterprise-tier platforms to access co-product capabilities would cost 10 to 50 times more than the SME ERP itself -- putting it out of reach for the vast majority of Thai manufacturers.

**Chinese ERP vendors** expanding rapidly in Thailand face the same architectural constraint at their SME product tiers. Their manufacturing modules were designed for single-output production. Co-product handling, where it exists at all, requires customization that increases implementation cost and ongoing maintenance burden.

**DigiWin includes native co-product support** in both the T100 (mid-market ERP) and iGP/WorkFlow (SME ERP) platforms. This is not a premium add-on. It is not a customization. It is built into the standard manufacturing module because DigiWin was designed from day one for manufacturing -- including the multi-output processes that are standard in plastics, food, chemical, and metal processing industries.

For distributors and ERP consultants evaluating which product to bring to market: co-product handling is a proven deal-winning differentiator. In any competitive evaluation involving a plastics, food, or chemical manufacturer, the ability to demonstrate native co-product cost accounting ends the conversation in your favor.

## Frequently Asked Questions

What is co-product cost accounting? + 

Co-product cost accounting is the process of accurately allocating production costs when a single manufacturing run produces multiple outputs. For example, a plastics injection cycle might yield three different parts from one mold, or a chemical reaction might generate two saleable compounds and a recyclable residue. The system must distribute raw material costs, labor, and overhead across all outputs using methods such as allocation by weight, quantity, market value, or custom formulas — rather than loading all costs onto a single primary product.

How do ERPs handle co-products? + 

Most ERP systems assume one work order produces one output, which falls apart in co-product manufacturing. They force factories into workarounds: creating separate work orders for each output (destroying cost linkage), making manual journal entries to redistribute costs at month-end (error-prone and delayed), or ignoring co-product costing entirely (assigning zero cost to by-products). DigiWin handles co-products natively — one work order can declare multiple output items with flexible cost allocation methods, tracking all material consumption and distributing costs automatically without workarounds.

Which industries need co-product costing? + 

Co-product costing is essential for any industry where a single production process naturally yields multiple outputs. Key industries include plastics injection molding (multi-cavity molds producing different parts plus recyclable runners), food and beverage processing (primary products alongside commercially valuable by-products like cooking oils or animal feed), chemical manufacturing (reactions that inherently produce multiple compounds and recoverable solvents), and metal fabrication (stamping and die-casting operations producing finished components alongside scrap metal with resale value).

Related Insights 

## Continue Reading

[BOI & Compliance ### BOI Compliance: How One Factory Eliminated 10M THB in Supplementary Taxes Production-order-level reconciliation that satisfies BOI auditors and eliminates tax exposure. Read Article](../blog/boi-compliance-jin-hai.html)

[Production Planning ### LRP vs MRP: Why Most Thai Factories Are Planning Production Wrong The difference between rough-cut capacity planning and material requirements planning -- and why you need both. Read Article](../blog/lrp-vs-mrp.html)

[Cost Management ### Dual Units of Measure: Tracking What You Buy vs. What You Use Purchase in kilograms, consume in meters. How dual-unit tracking prevents material variance from destroying your margins. Read Article](../blog/dual-units.html)

## Need Accurate Co-Product Costing?

Our team can show you how DigiWin handles multi-output production -- from plastics injection to food processing to chemical manufacturing.

[Let's Talk](../demo.html)

## Related Solutions

[### Manufacturing ERP End-to-end manufacturing ERP for Thai factories — BOM, financials, and BOI compliance.](../products/erp.html)
[### Manufacturing Execution System (MES) Real-time shop floor execution — OEE tracking, SPC, and paperless work orders.](../products/mes.html)