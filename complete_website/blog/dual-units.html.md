# Dual Unit Management

> Handling dual units of measure in manufacturing ERP systems.

---

Skip to content

[Back to Insights](../blog.html)
Cost Management 

# Dual Units: Why Your ERP Should Show Both Kilograms AND Pieces

6 min read 

February 2026 

Your sales team sells in pieces. Your production floor measures in kilograms. Your warehouse counts in boxes. Your purchasing team orders in rolls or sheets. Every department uses different units of measure for the same product — and somehow your ERP is supposed to keep everyone on the same page.

For many manufacturers, the ERP forces a choice: pick one primary unit, and convert everything else manually. This creates friction, errors, and wasted time at every handoff point. Sales enters an order for 500 pieces. Warehouse needs to know that's 125 kg. Production needs 3 rolls of raw material. Purchasing needs 2 pallets. Every conversion is manual — and every manual conversion is an error waiting to happen.

## The Single-Unit Problem

Many ERP systems — including certain major brands operating in Thailand — support only one primary unit of measure per item. You define a product as "kilograms" or "pieces" but not both simultaneously. The system picks one as the "master" unit, and everything else is treated as a conversion that must be calculated on the fly.

This seems like a reasonable technical decision until you live with the consequences. Sales enters an order for 500 pieces. Warehouse needs to know that's 125 kg. The system doesn't show both. The warehouse clerk has to remember — or look up — that this particular item weighs 0.25 kg per piece. If they get it wrong, they ship 120 kg when they should have shipped 125 kg. The customer receives 480 pieces instead of 500.

Production faces the same problem. The production order says to manufacture 1,000 units. The floor supervisor needs to know how many kilograms of raw material to requisition. The BOM (Bill of Materials) might show it in kg, but the production order shows units. Every handoff requires a mental conversion — or a separate lookup table — to connect what the system says to what the operation needs.

Purchasing encounters the inverse issue. Suppliers sell raw materials by the kilogram, roll, or sheet. Production consumes materials by the piece or meter. Inventory is tracked in yet another unit. When the purchasing team places an order, they need to translate production consumption rates (in pieces) into supplier order quantities (in kg or rolls). This translation happens outside the ERP, in spreadsheets or through manual calculation, because the system only understands one unit at a time.

When your salesperson promises 500 pieces and your warehouse ships 120 kg, someone made a conversion error. Dual units eliminate the conversion entirely.

## What Dual Units Solve

[DigiWin's manufacturing ERP](../products/erp.html) displays both units simultaneously. On one screen, you see: **500 pieces = 125 kg**. No mental math, no conversion tables, no "let me check." The system understands that this product is measured in two ways, and it shows both wherever they matter.

Inventory shows current stock in both units. If you have 240 kg in the warehouse, the screen also shows you have 960 pieces (assuming 0.25 kg per piece). Sales orders display the customer quantity in pieces and the warehouse fulfillment quantity in kg. Production orders show required output in pieces and material consumption in kg. Purchase orders display supplier units (kg, rolls, sheets) alongside the production units (pieces, meters) they translate into.

This isn't just convenience — it's accuracy. Every time a human has to convert units manually, there's a chance of error. Use the wrong conversion factor. Transpose digits. Forget to account for packaging waste. Round incorrectly. These errors propagate through the system until they surface as shipping discrepancies, production shortages, or inventory write-offs.

2 Units, 1 Screen 
See inventory, orders, and production in both measurement units simultaneously 

Dual units also matter for compliance and reporting. BOI-certified manufacturers often need to report material consumption in the units specified by import declarations — which may differ from the units used in production. If you import steel by the ton but produce parts by the kilogram (and sell them by the piece), your BOI report needs to reconcile all three. A dual-unit system makes this reconciliation automatic rather than manual.

## Where It Matters Most

Dual units are particularly critical in industries where the sales unit and the production unit naturally diverge, such as [metal fabrication and plastics manufacturing](../industries/metal-plastics.html). Consider the following scenarios where single-unit ERPs create operational friction:

- **Plastics:** Resin is purchased and tracked by kilogram. Injection-molded parts are counted and sold by the piece. Production needs to know how many kg of resin are required to produce 10,000 pieces. Inventory needs to show both the kg remaining and how many pieces that translates into.

- **Metal fabrication:** Steel is bought by the ton. Sheets are cut and processed into parts counted by the unit. When a customer orders 5,000 brackets, purchasing needs to know how many tons of steel to order.

- **Food manufacturing:** Ingredients are purchased and measured by kilogram or liter. Finished goods are packaged and sold by the case or unit. The recipe (BOM) uses kg; the sales order uses cases.

- **Chemicals:** Raw materials are procured by the liter or barrel. Production consumes them by kilogram (weight-based). Finished products are sold by volume or by weight depending on the customer.

In every case, the organization is forced to choose one unit as "primary" and treat the other as secondary. This choice reverberates through every transaction. Warehouse staff calculate conversions. Sales staff check reference tables. Production planners maintain spreadsheets to translate between sales forecasts (in pieces) and material requirements (in kg).

The cost isn't just the time spent converting. It's the errors that result. A shipping mistake caused by a unit conversion error doesn't just delay a delivery — it damages customer trust, consumes internal labor to fix, and potentially triggers penalty clauses in supply agreements. Over hundreds of transactions per month, the cumulative impact becomes significant.

**BOI reporting note:** Bonded materials are often tracked in import units (tons, barrels, cases) while production consumption is measured in different units (kg, liters, pieces). Dual-unit display ensures BOI reconciliation reports show consumption in both the import unit and the production unit without requiring manual conversion.

## A Small Feature with Large Impact

It seems like a small thing — two units on one screen. But across thousands of transactions per month, across every department, the cumulative impact of eliminating unit-of-measure conversion errors is significant.

Fewer shipping mistakes. Faster order processing. More accurate inventory. Cleaner BOI reports. Less time wasted looking up conversion factors. Fewer spreadsheets maintained outside the system to bridge the gap between what sales says and what production needs.

If your current ERP forces you to choose between kilograms and pieces, you've already felt this friction. Your team has developed workarounds — reference tables, conversion spreadsheets, mental math routines. These workarounds function until they don't. And when they fail, the cost is immediate and measurable.

Dual-unit display isn't a luxury feature. It's the difference between an ERP that reflects how your business actually operates and one that forces your business to conform to its limitations.

## Frequently Asked Questions

What are dual units of measure in ERP? + 

Dual units of measure is an ERP capability that tracks inventory and transactions in two units of measure simultaneously — for example, both kilograms and pieces on the same screen. Instead of forcing you to pick one primary unit and manually convert everything else, the system displays both units wherever they matter: inventory screens, sales orders, production orders, and purchase orders. This eliminates manual conversion errors and ensures every department sees quantities in the unit that is natural to their operation.

Why does my ERP need dual-unit support? + 

Different departments naturally think in different units: sales teams sell in pieces, production floors measure in kilograms, warehouses count in boxes, and purchasing orders in rolls or sheets. When your ERP only supports one primary unit, every handoff between departments requires a manual conversion — and every manual conversion is an error waiting to happen. Dual-unit support eliminates this friction, preventing shipping mistakes, production shortages, and inventory write-offs that result from conversion errors across thousands of transactions per month.

Which industries need dual-unit tracking? + 

Dual-unit tracking is particularly critical in industries where sales units and production units naturally diverge. Key industries include plastics manufacturing (resin purchased in kg, injection-molded parts sold by the piece), metal fabrication (steel bought by the ton, finished parts counted by the unit), food manufacturing (ingredients measured in kg or liters, finished goods sold by the case), and chemical processing (raw materials procured by the liter or barrel, production consumes by weight). BOI-certified manufacturers also benefit because bonded materials are often tracked in import units that differ from production consumption units.

## Related Articles

[Cost Management ### Co-Product Cost Accounting: Allocating Costs When One Process Makes Many Products Read article](../blog/co-product-cost-accounting.html)
[Production Planning ### Feature Codes: How to Handle "Same Product, Different Specs" Without Drowning in SKUs Read article](../blog/feature-codes.html)
[BOI & Compliance ### How One Factory Saved 10M THB/Year in BOI Supplementary Taxes Read article](../blog/boi-compliance-jin-hai.html)

## Tired of Unit Conversion Headaches?

See how dual-unit display eliminates errors across your entire operation.

[Let's Talk](../demo.html)

## Related Solutions

[### Manufacturing ERP End-to-end manufacturing ERP for Thai factories — BOM, financials, and BOI compliance.](../products/erp.html)
[### Warehouse Management System (WMS) Smart warehouse management with barcode/RFID and full traceability.](../products/wms.html)