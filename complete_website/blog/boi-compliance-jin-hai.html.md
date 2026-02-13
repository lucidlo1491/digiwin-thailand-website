# BOI Compliance Guide

> How BOI-promoted factories in Thailand maintain compliance with manufacturing software.

---

Skip to content

[Back to Insights](../blog.html)
BOI & Compliance 

# How One Factory Saved 10M THB/Year in BOI Supplementary Taxes

8 min read 

February 2026 

If you operate a BOI-certified factory in Thailand, you know the drill. Once a year, the Board of Investment audits your operations. They compare what you imported under duty-free privileges against what you actually produced. Every kilogram of bonded material needs to map to a finished product that left your facility. When the numbers don't reconcile, you pay supplementary taxes on the gap. For one factory in Thailand, that gap was costing over 10 million baht every single year.

This is not an unusual story. It is a pattern that repeats across hundreds of BOI-certified manufacturers. The cause is almost always the same: their ERP system cannot track material consumption at the level the BOI board actually audits. The system says one thing. The production floor did another. And the factory pays the difference.

## The 10 Million Baht Gap

To understand why this gap exists, you need to understand how most ERP systems handle material consumption. When a factory sets up its system, it creates a Bill of Materials (BOM) for every product. The BOM says: to make one unit of Product A, you need 2.5 kg of Material X, 1.2 kg of Material Y, and 0.3 kg of Material Z. Clean, precise, theoretical.

But actual production is messy. Material waste varies from batch to batch depending on machine conditions, operator skill, and raw material quality. Operators substitute components when the specified material is out of stock. Yield rates fluctuate with ambient temperature, humidity, and equipment age. A batch that the BOM says should consume 500 kg of steel might actually consume 523 kg. Another batch might use 487 kg. Over thousands of production orders across a year, these small differences compound into enormous discrepancies.

Here is the critical problem: the BOI board does not care about your theoretical calculations. They do not want to see what your BOM says should have happened. They want to see what **actually** happened — at the production order level, material by material, order by order. When your system can only provide theoretical consumption but the physical inventory tells a different story, you have a gap. And that gap becomes supplementary tax.

The BOI board doesn't audit your BOM. They audit your actual production consumption — order by order, material by material. If your ERP can't show that, you're paying for the gap.

For the factory in question — Jin Hai, a DigiWin customer that had been manufacturing in Thailand for over a decade — this gap had become an accepted cost of doing business. Every year, the BOI audit would reveal discrepancies between imported bonded materials and production output. Every year, supplementary taxes would exceed 10 million baht. And every year, the threat of BOI certificate revocation grew more real.

## Why Most ERPs Fail BOI Audits

The root cause is architectural. Most ERP systems — including manufacturing-focused ones from vendors operating in the Thai market — calculate material consumption using a top-down approach. They take the standard BOM, multiply by production quantity, and generate a theoretical consumption figure. This is useful for cost estimation and purchasing planning, but it is fundamentally wrong for BOI compliance reporting.

Consider a typical scenario: your BOM says Product A requires 2.500 kg of bonded imported aluminum per unit. You produced 10,000 units this quarter. Your ERP reports consumption of 25,000 kg. But the warehouse physical count shows you actually issued 26,340 kg to the production floor. Where did the extra 1,340 kg go? Your ERP has no answer, because it never tracked actual issuance at the production order level. It only knows what **should** have been used according to the formula.

This forces a painful workaround. Accountants and compliance teams end up maintaining separate BOI filing systems outside the ERP — often in spreadsheets. They manually reconcile inventory records, production logs, and import declarations to prepare BOI reports. This process is time-consuming (weeks of preparation before each audit), error-prone (manual data entry across multiple sources), and inherently risky (any inconsistency triggers deeper scrutiny from the BOI board).

~100% 
of new manufacturing entrants
in Thailand have BOI certificates 

~80% 
handle bonded
material imports 

The scale of this problem is significant. Almost every new manufacturing investment in Thailand comes with a BOI certificate — it is a core part of the country's industrial promotion strategy. And roughly 80% of these manufacturers handle bonded material imports, meaning they are subject to the exact reconciliation requirements that trip up most ERP systems. This is especially critical in sectors like [automotive manufacturing](../industries/automotive.html), where bonded material volumes are high and audit scrutiny is intense. This is not a niche compliance issue. It is a structural challenge affecting the majority of the Thai manufacturing sector.

## Production-Order-Level Reconciliation: The DigiWin Difference

DigiWin's T100 ERP approaches material consumption tracking from the opposite direction. Instead of calculating consumption top-down from the BOM, T100 tracks material issuance and consumption at the **individual production order level**. Every time materials are issued to a production order, the system records the exact quantities. When production is complete, back-flush quantities are based on actual consumption, not theoretical BOM calculations.

This means the system knows, for every single production order, exactly which bonded materials were consumed and in what quantities. When waste occurs, it is captured. When substitutions happen, they are recorded. When yield varies from the standard, the variance is documented at the source — not reconstructed after the fact from aggregate numbers.

**How production-order-level tracking works:** When a production order is opened, the system creates a material consumption record specific to that order. As materials are issued from the warehouse to the production floor, each issuance is linked to the order. When the order closes, actual consumption is compared against the BOM standard — and the variance is captured. This per-order granularity means BOI reports can trace every gram of bonded material from import declaration through production to finished goods, exactly as the BOI board requires.

The result is BOI-ready reports generated directly from the ERP — no separate filing system, no manual reconciliation, no spreadsheets maintained by the compliance team. The system produces reports that match exactly what the BOI board wants to see: a complete, auditable trail from bonded material import to production consumption to finished goods output, at the production order level.

No other ERP vendor operating in the Thai market — not the Chinese vendors scaling their Thai operations, not the global enterprise systems — offers production-order-level BOI reconciliation as a built-in capability. Most treat BOI compliance as an afterthought, something the customer's team needs to handle outside the system. DigiWin built it into the core architecture of its [manufacturing ERP](../products/erp.html) because it understood, from years of serving Thai manufacturers, that BOI compliance is not an add-on. It is a fundamental requirement that shapes how material consumption must be tracked from day one.

## The Results

10M+ THB/year 

150K THB (2024) 

Zero (2025) 
Annual supplementary tax liability — Jin Hai Factory 

Jin Hai's transformation was not instantaneous, but it was decisive. After implementing DigiWin T100 with production-order-level material tracking, their supplementary tax exposure began to collapse. The system captured actual consumption data with enough granularity to satisfy BOI audit requirements. Discrepancies that had previously been invisible — buried in the gap between theoretical BOM consumption and physical reality — were now visible, documented, and reconciled within the system.

By 2024, their annual supplementary tax had dropped from over 10 million baht to 150,000 baht. By 2025, it reached zero. The BOI revocation threat that had loomed over the company for years was eliminated entirely. And this was not through creative accounting or audit negotiation — it was through accurate data. The system simply showed the BOI board, at the production order level, exactly where every kilogram of bonded material went.

The system didn't just reduce their supplementary taxes. It eliminated them entirely. Not through creative accounting, but through accurate data — the kind the BOI board actually wants to see.

The financial return is straightforward to calculate. DigiWin T100 implementation costs are a fraction of 10 million baht per year in supplementary taxes. The system paid for itself in avoided taxes alone within the first year — and that does not account for the reduced compliance labor, eliminated audit risk, and protection of the BOI certificate that underpins the factory's entire import duty structure.

## What This Means for Your Factory

If your factory holds a BOI certificate — and if you are a manufacturer in Thailand, you almost certainly do — this is not an optional consideration. BOI compliance is existential. Revocation of your certificate does not just mean paying supplementary taxes. It means losing all import duty privileges, retroactively and going forward. For factories that import significant volumes of bonded materials, that single event can threaten the viability of the entire operation.

Even if your current system appears to "work," consider this question honestly: **can your ERP produce production-order-level material reconciliation reports that show actual (not theoretical) consumption of bonded materials, order by order?**

If the answer is no, your compliance team is filling that gap manually. They are building spreadsheets, cross-referencing warehouse records, and preparing separate BOI filings outside the system. This works — until it doesn't. One data entry error, one missed substitution, one unrecorded variance, and you have an audit discrepancy that becomes a supplementary tax assessment.

The gap between theoretical BOM consumption and actual production consumption exists in every factory. The question is whether your system captures it or hides it. If it hides it, you are one audit away from a significant tax liability — or worse, a BOI revocation notice.

## 2026: BOI Enforcement Gets Teeth

The urgency is no longer theoretical. Based on enforcement trends confirmed at DigiWin's January 28, 2026 BOI compliance webinar, Thai manufacturers face heightened scrutiny in four key areas:

- 1 ### Double Bookkeeping Detection BOI investigators are specifically looking for companies maintaining separate books for BOI and non-BOI transactions. ERP systems that cannot properly segregate BOI-privileged vs standard transactions are a red flag. If your compliance team is running a parallel set of records outside the system, that practice itself now draws investigator attention.

- 2 ### Inventory Mismatch Audits Physical stock counts vs system records. Discrepancies between what is on the floor and what is in your system trigger deeper investigations. This is exactly the gap that manual reconciliation creates — and exactly the gap that real-time WMS integration eliminates.

- 3 ### BOI / Non-BOI Transaction Filing Incorrect categorization of raw materials, production, and sales between BOI-promoted and non-promoted activities. Getting this wrong can lead to privilege revocation — losing your tax benefits entirely. The board is no longer treating misclassification as an honest mistake.

- 4 ### Tariff Recovery Actions Retroactive duty collection on imports that were incorrectly claimed under BOI duty exemptions. Companies are being asked to repay years of import duties if records do not match. The financial exposure is not limited to the current year — it reaches back to the original import declarations.

**Source:** Insights from DigiWin's BOI compliance team — Xu Zhihao (Senior Consultant), Lin Haibo (Implementation Director), and Lin Jianyi (Compliance Specialist) — presenters at DigiWin's January 2026 BOI compliance webinar series.

Each of these four enforcement areas points to the same root cause: systems that cannot produce auditable, granular records of bonded material movement from import to production to finished goods. If your ERP handles BOI compliance through manual workarounds, spreadsheets, or theoretical BOM calculations, the window for fixing that gap is closing.

**Coming soon:** DigiWin is developing a standalone BOI compliance module — a web-based solution designed to work with any existing ERP system. If replacing your ERP is not feasible right now, this module can layer on top of your current system to provide the production-order-level reconciliation the BOI board requires. Contact our team to learn more about early access.

## Frequently Asked Questions

What are BOI supplementary taxes? + 

BOI supplementary taxes are penalties imposed by Thailand's Board of Investment when a manufacturer's actual material usage does not match BOI-approved ratios. During annual BOI audits, the board compares what was imported under duty-free privileges against what was actually produced. Every kilogram of bonded material must map to a finished product. When the numbers do not reconcile — meaning there is a gap between imported bonded materials and documented production output — the manufacturer pays supplementary taxes on the discrepancy.

How can manufacturers reduce BOI tax penalties? + 

Manufacturers can reduce or eliminate BOI tax penalties through production-order-level material reconciliation. Instead of relying on theoretical BOM calculations that estimate what should have been consumed, the ERP system tracks actual material issuance and consumption for every individual production order. This captures waste, substitutions, and yield variances at the source, producing an auditable trail that shows the BOI board exactly where every kilogram of bonded material went — from import declaration through production to finished goods.

What is production-order-level reconciliation? + 

Production-order-level reconciliation means tracking material usage per production order against BOI-approved ratios, rather than relying on aggregate or theoretical calculations. When a production order is opened, the system creates a material consumption record specific to that order. As materials are issued from the warehouse, each issuance is linked to the order. When the order closes, actual consumption is compared against the BOM standard and the variance is captured. This per-order granularity allows BOI reports to trace every gram of bonded material from import to production to finished goods.

How much can BOI compliance optimization save? + 

The savings can be substantial. In the case of Jin Hai, a DigiWin customer manufacturing in Thailand, their annual BOI supplementary tax liability dropped from over 10 million THB per year to just 150,000 THB in 2024, and then to zero in 2025. The DigiWin T100 implementation cost was a fraction of the 10 million THB annual savings, meaning the system paid for itself in avoided taxes alone within the first year — not counting reduced compliance labor, eliminated audit risk, and protection of the BOI certificate.

What are the BOI enforcement focus areas for 2026? + 

Based on enforcement trends confirmed at DigiWin's January 2026 BOI compliance webinar, Thai manufacturers face heightened scrutiny in four areas: (1) Double bookkeeping detection — investigators look for companies maintaining separate books for BOI and non-BOI transactions; (2) Inventory mismatch audits — discrepancies between physical stock counts and system records trigger deeper investigations; (3) BOI/non-BOI transaction filing — incorrect categorization of materials and production between promoted and non-promoted activities can lead to privilege revocation; (4) Tariff recovery actions — retroactive duty collection on imports incorrectly claimed under BOI duty exemptions, potentially reaching back years.

## Related Articles

[Production Planning ### LRP vs MRP: Which Planning Method Fits Your Factory? Read article](../blog/lrp-vs-mrp.html)
[Cost Management ### Co-Product Cost Accounting: Allocating Costs When One Process Makes Many Products Read article](../blog/co-product-cost-accounting.html)
[Industry Insights ### The 5 Universal Pain Points Every Thai Manufacturer Faces Read article](../blog/five-pain-points.html)

## Need Help with BOI Compliance?

Our team has helped Thai manufacturers eliminate supplementary taxes and pass BOI audits with confidence.

[Let's Talk](../demo.html)

## Related Solutions

[### Manufacturing ERP End-to-end manufacturing ERP for Thai factories — BOM, financials, and BOI compliance.](../products/erp.html)
[### AIoT IoT sensors, edge computing, and AI analytics connecting machines to your ERP.](../products/aiot.html)