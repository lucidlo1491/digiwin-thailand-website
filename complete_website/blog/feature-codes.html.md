# Feature Codes in ERP

> Using feature codes for configurable products and variant management in manufacturing.

---

Skip to content

[Back to Insights](../blog.html)
PRODUCTION PLANNING 

# Feature Codes: How to Turn 27 SKUs Into 1 Product

7 min read 

February 2026 

Your factory makes a shirt. Three sizes (S, M, L), three colors (red, blue, white), three collar types (V-neck, round, crew). That is 27 separate item codes. Each needs its own Bill of Materials, its own inventory tracking record, its own purchasing rules, its own reorder point. Scale this across a product line of even moderate complexity, and you suddenly have thousands of SKUs managing what is fundamentally the same product with minor variations.

This is not a theoretical problem. It is a pattern that repeats across every manufacturing sector that deals with configurable products. Electronics (brand/version/source), apparel (size/color/fabric), solar panels (electrical properties), machinery (dimensions/capacity). The result is an ERP system choked with nearly identical item masters, a warehouse team managing dozens of picking locations for functionally identical products, and a purchasing department juggling hundreds of reorder points that should be consolidated under a single material plan.

## The Problem with SKU Multiplication

When you treat each product variation as a separate item code, several predictable problems emerge. First, **inventory accuracy collapses**. Your system shows zero stock of "medium blue V-neck," so production stops waiting for replenishment. Meanwhile, the warehouse has excess inventory of "medium blue round-neck" sitting unused. The materials are identical. The manufacturing process is identical. But because they are tracked as separate items, the system cannot recognize they are interchangeable for material planning purposes.

Second, **purchasing becomes exponentially more complex**. Instead of one reorder point for "shirt fabric - blue," you now have nine — one for each combination that uses blue fabric. Each variation triggers its own purchase requisition. Each has its own minimum order quantity, lead time buffer, and safety stock calculation. The purchasing team spends more time managing item-level parameters than actually negotiating with suppliers or optimizing order quantities.

Third, **BOM maintenance becomes a nightmare**. Your supplier changes the thread specification. Now you need to update 27 separate BOMs instead of one. A quality issue requires a material substitution. Again, 27 BOMs. A cost change needs to propagate through the system. 27 records. Every change multiplies across every SKU, and every manual update is an opportunity for error — which means some item codes will inevitably drift out of sync with reality.

Fourth, **warehouse operations suffer**. Picking errors increase because visually similar items are stored across different locations. Cycle counts take longer because each SKU requires separate verification. Space utilization drops because you cannot consolidate storage — the system treats each variation as a unique item requiring its own bin location.

The goal isn't fewer products. It's fewer item codes managing more products.

## What Feature Codes Do

[DigiWin's ERP](../products/erp.html) feature code system solves this by separating the concept of a **product** from the concept of a **variant**. Instead of creating 27 separate item codes, you create one item master with multiple feature dimensions. The system defines the product once — its base BOM, its routing, its cost structure, its purchasing rules — and then layers variant dimensions on top.

In the shirt example, you would define:

- **Feature 1 (Size):** S, M, L

- **Feature 2 (Color):** Red, Blue, White

- **Feature 3 (Collar):** V-neck, Round, Crew

The system treats each combination as a unique variant for inventory tracking, order fulfillment, and warehouse management. When a customer orders "medium blue V-neck," the system knows exactly which physical inventory to pick. But for BOM maintenance, purchasing planning, and cost accounting, all 27 variants roll up to a single item master. When you need to update the thread specification, you update one BOM — and it applies to all variants automatically.

27 SKUs 

1 Item Code 

90%+ reduction in item master complexity 

This is not just a data organization trick. It fundamentally changes how the system handles material planning. When you run MRP, the system aggregates demand across all feature combinations. If you have orders for 100 red shirts (across all sizes and collars) and 50 blue shirts (across all sizes and collars), MRP calculates fabric requirements at the color level — not at the individual SKU level. The result is consolidated purchase requisitions, more accurate reorder points, and fewer stockouts caused by artificial fragmentation of demand.

## Product Features vs Inventory Features

DigiWin's feature code architecture includes a critical distinction: **product features** (attributes of the product itself) versus **inventory features** (attributes of how you track it). This separation unlocks capabilities that most ERP systems cannot support.

Product features are inherent to what you are making. Size, color, electrical rating, material grade — these are choices your customer makes when placing an order, and they often affect the BOM or routing. Inventory features, by contrast, are internal tracking dimensions that the customer never sees. Supplier brand (when multiple suppliers provide functionally identical components), customer-dedicated stock (when a large customer requires segregated inventory), lot number (for traceability without creating separate item codes), warehouse location (when the same product is stocked in multiple facilities) — these are all inventory features.

The power of this separation is that you can add inventory tracking complexity without exploding your item master. Consider a scenario: you manufacture solar panels, and you source the same photovoltaic cell from three different suppliers. The cells are functionally identical, but you need to track which supplier's material went into each finished panel for warranty traceability.

In a traditional ERP, you would be forced to create three separate item codes for the same cell — one per supplier — and then three separate BOMs for the solar panel, each specifying a different supplier-specific component. Now you have SKU multiplication driven not by product complexity but by internal tracking requirements.

With inventory features, you define one item code for the cell and add "supplier brand" as an inventory feature. The BOM for the solar panel references a single component. During production, the system tracks which supplier's inventory was issued to each production order — providing full traceability without fragmenting the item master or BOM structure.

## Real-World Applications Across Industries

**Electronics Manufacturing:** A factory produces power adapters in multiple voltage ratings (12V, 24V, 48V), multiple connector types (USB-C, barrel jack, terminal block), and sources components from multiple suppliers. Without feature codes, this requires dozens of item codes for what is fundamentally the same adapter. With feature codes, one item master with three product features (voltage, connector type, housing color) and one inventory feature (supplier brand). BOM maintenance effort drops by 80%.

**Apparel and Textiles:** A garment manufacturer produces workwear in 5 sizes, 6 colors, and 3 fabric weights. Traditional approach: 90 SKUs. Feature code approach: 1 item code with 3 product features. When a fabric supplier changes, one BOM update instead of 90. When MRP runs, fabric demand aggregates by color and weight — not by individual SKU — resulting in consolidated purchase orders and better supplier pricing.

**Industrial Components:** A machining shop makes steel brackets in 8 lengths and 4 hole-pattern configurations. Each bracket can be supplied in raw steel or zinc-plated. Traditional approach: 64 SKUs (8 lengths × 4 patterns × 2 finishes). Feature code approach: 1 item code with 3 features. When the plating vendor changes, one routing update propagates to all zinc-plated variants. When a customer orders a new configuration, adding a new length value takes seconds instead of creating an entire new item master.

**Feature-aware costing:** DigiWin's feature code system supports cost differentiation at the feature level. If zinc-plated brackets cost more than raw steel (due to the plating process), you can assign incremental cost to the "plating" feature value without creating separate item codes. The system calculates the final product cost by summing the base item cost plus feature-specific cost adders — giving you variant-level cost accuracy without variant-level item master complexity.

## The Real Impact

The benefits of feature codes extend far beyond reducing the number of rows in your item master table. The operational impacts touch nearly every function in a manufacturing organization.

**Product setup speed increases dramatically.** Launching a new product with multiple variants no longer requires creating dozens of item codes, BOMs, and routing records. You define one item master, specify feature dimensions, and the system generates all valid combinations automatically. What used to take days of data entry now takes hours.

**BOM maintenance errors drop.** When a material specification changes, you update one BOM instead of dozens. When a cost changes, you update one item master instead of propagating changes across multiple records. Fewer update points means fewer opportunities for data entry errors and fewer instances where some SKUs drift out of sync with others.

**Inventory visibility improves.** Instead of seeing fragmented stock across dozens of SKUs, planners see consolidated inventory at the feature level. If total blue fabric inventory is sufficient but it is distributed across multiple size/collar combinations, the system can recognize that and avoid unnecessary purchase orders. Conversely, if a specific feature combination is genuinely out of stock, that visibility is preserved.

**Purchasing becomes simpler and more effective.** MRP generates consolidated demand for materials that are common across feature combinations. Purchase requisitions aggregate by supplier and material, not by individual SKU. This increases order quantities (unlocking volume discounts), reduces administrative overhead (fewer POs to process), and improves supplier relationships (predictable, consolidated orders instead of fragmented, small-batch requests).

**Warehouse operations become more efficient.** Cycle counting is faster because feature-coded items can be counted at the aggregate level for materials that do not require per-variant segregation. Picking accuracy improves because visually similar items are no longer scattered across dozens of bin locations. Storage consolidation becomes possible because the system can manage feature-level inventory within shared locations.

Feature codes don't just reduce SKU count. They restructure how the entire system thinks about product complexity — from planning to purchasing to production to warehouse management.

## What This Means for Your Factory

If your factory produces configurable products — anything with size, color, voltage, dimension, or material variations — you are almost certainly managing more SKUs than necessary. The question is not whether feature codes would help. The question is how much operational overhead you are currently tolerating because your ERP lacks this capability.

Here is a straightforward diagnostic: count how many item codes in your system share 90%+ identical BOMs, differing only in a single component or dimension. If that number is in the dozens, you have SKU multiplication. If it is in the hundreds, you have SKU explosion. And if your team is maintaining separate spreadsheets to track which items are "really the same product," you have already built a feature code system manually — you just do not have software support for it.

DigiWin's T100 ERP supports feature codes as a core architectural capability, not an add-on module. This means the entire system — from sales order entry to production planning to inventory management to costing — understands and respects feature-level logic. You are not working around the system. You are working with it.

Most ERP systems treat SKU reduction as a data cleanup project. DigiWin treats it as a planning architecture shift. The difference is whether your system can actually operate on feature-coded items — or whether you are just using cleaner naming conventions while still managing dozens of functionally identical SKUs.

## Frequently Asked Questions

What are feature codes in ERP? + 

Feature codes are a product configuration system built into DigiWin's ERP that separates the concept of a product from the concept of a variant. Instead of creating a separate item code for every combination of size, color, material, or specification, you define one item master with multiple feature dimensions. The system manages the base BOM, routing, cost structure, and purchasing rules once, then layers variant dimensions on top — drastically reducing item master complexity while preserving full inventory tracking at the variant level.

How do feature codes reduce SKU count? + 

Feature codes eliminate SKU multiplication by managing product variations as dimensions of a single item rather than separate item codes. For example, a product with 3 sizes, 3 colors, and 3 collar types would traditionally require 27 separate SKUs, each with its own BOM, inventory record, and purchasing rules. With feature codes, this becomes 1 item code with 3 feature dimensions. BOM maintenance effort drops dramatically — when a material specification changes, you update one BOM instead of 27. MRP also aggregates demand across all feature combinations, producing consolidated purchase requisitions instead of fragmented ones.

What is the difference between product features and inventory features? + 

Product features are attributes inherent to what you are making — size, color, electrical rating, material grade — that your customer selects when placing an order and that may affect the BOM or routing. Inventory features are internal tracking dimensions the customer never sees, such as supplier brand (when multiple suppliers provide identical components), customer-dedicated stock, lot numbers for traceability, or warehouse location. This separation lets you add inventory tracking complexity for traceability and compliance without exploding your item master or creating duplicate BOMs.

## Related Articles

[PRODUCTION PLANNING ### LRP vs MRP: Which Planning Method Fits Your Factory? Read article](../blog/lrp-vs-mrp.html)
[PRODUCTION PLANNING ### AMRP: Why You Don't Need a Separate APS System Read article](../blog/amrp-capacity-planning.html)
[COST MANAGEMENT ### Dual Units: Why Your ERP Should Show Both Kilograms AND Pieces Read article](../blog/dual-units.html)

## Managing Product Complexity?

Our team helps Thai manufacturers simplify their product data without losing visibility.

[Let's Talk](../demo.html)

## Related Solutions

[### Manufacturing ERP End-to-end manufacturing ERP for Thai factories — BOM, financials, and BOI compliance.](../products/erp.html)
[### Manufacturing Execution System (MES) Real-time shop floor execution — OEE tracking, SPC, and paperless work orders.](../products/mes.html)