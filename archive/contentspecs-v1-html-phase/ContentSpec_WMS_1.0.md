# Content Spec: WMS — sFLS (PRD Section 3.3)

**Batch:** Batch 2
**PRD Reference:** Section 3.3 — WMS: sFLS
**Playbook Reference:** Section 3.2 (Leaf Page Arc — Track A), Section 2.2 (Track A voice), Section 4.1 (Factory Owner Objections), Section 6 (CTA hierarchy)
**Status:** v1.2 — Intelligence integrated: 6 pain points, mobile depth, process flow, before/after metrics
**Last Updated:** February 13, 2026

---

## Page Overview

**Audience:** Factory operators with inventory accuracy problems — warehouse managers, operations managers, supply chain leads
**Objective:** Zero ghost inventory — end the warehouse chaos
**URL:** digiwin.co.th/products/wms.html
**Emotional Arc:** Leaf Page Arc Track A (Playbook 3.2) — Pain Validation → Relief/Solution → Proof → Gentle Nudge

---

## Section 1: Hero

**Purpose:** Inventory accuracy — the pain of not knowing where things are

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column grid. Left = content, Right = warehouse grid mockup (hidden on tablet/mobile) |
| **Background** | Dark gradient with grain overlay (amber-tinted) |
| **Padding** | 160px top, 100px bottom |

| Element | Content |
|---------|---------|
| **Badge** | `Warehouse Management System` (with pulsing amber dot) |
| **Headline** | `Every Item. Every Location. Every Time.` |
| **Subtitle** | `Smart warehouse management that eliminates searching, reduces errors, and keeps inventory accurate—without endless manual counts.` |
| **Primary CTA** | `Let's Talk` → `{{basePath}}demo.html` (white button) |
| **Secondary CTA** | `Explore sFLS` → `#capabilities` (outline white, anchor link) |

### Hero Stats

| # | Value | Label |
|---|-------|-------|
| 1 | `44` (dw-years dynamic) | Years in Mfg |
| 2 | `50K+` | Factories |
| 3 | `100+` | Thai Sites |

### Hero Warehouse Mockup (right column)

Warehouse bin grid visualization:
- 5x3 grid of cells (A1-A5, B1-B5, C1-C5) with occupied/empty/active states
- Stats bar below: Accuracy `99.2%` (green), Locations `847`, Utilized `73%`

---

## Section 2: Problem Section

**Purpose:** Validate warehouse pain points — 6 station-specific problems warehouse managers recognize instantly

| Element | Specification |
|---------|---------------|
| **Layout** | 3x2 grid (6 cards, 2 rows) |
| **Background** | White (#ffffff) |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section title** | `The Warehouse Chaos Problem` |
| **Section subtitle** | `Sound familiar? Every station has its own nightmare.` |

### Problem Cards (6 — station-specific)

| # | Station | Title | Description |
|---|---------|-------|-------------|
| 1 | Purchase & Arrival | "It's Here But Not in the System" | Materials arrive and sit on the dock, but item data hasn't updated. Receiving can't stock in what the system doesn't know about. |
| 2 | Inventory | "System Says 500, Shelf Says 340" | Physical counts vs. system counts are always different. Year-end reconciliation becomes a nightmare that takes the whole team. |
| 3 | Picking | "Wrong Part — They Look the Same" | Picking errors caused by similar specifications. Visual similarity is not a picking system. Costs you customer trust and expensive returns. |
| 4 | Quality Inspection | "Where's That QC Report?" | Unable to grasp the progress of quality inspection. Materials sit in limbo between receiving and storage while QC status is unknown. |
| 5 | Packing & Shipping | "We Shipped the Wrong One Again" | Mistakes caused by similar product specifications and packaging. Customers get the wrong item, you eat the return cost. |
| 6 | Stock Rotation | "FIFO? We Try..." | First-in-first-out is the rule. Reality: oldest stock hides in the back while new stock gets picked first. Expired inventory discovered too late. |

**Card Style:** Each card has a warehouse station icon (receiving dock, shelf, forklift, clipboard, box, calendar) + red accent top border. Station label in JetBrains Mono 11px uppercase. Hover: border turns blue.

---

## Section 3: Capabilities (sFLS Product)

**Purpose:** WMS-specific capabilities — 4 core feature areas

| Element | Specification |
|---------|---------------|
| **Layout** | 2x2 grid of capability boxes |
| **Background** | Light gray (#F5F7FA) |
| **Padding** | 100px top/bottom |
| **ID** | `#capabilities` (anchor target for hero CTA) |

| Element | Content |
|---------|---------|
| **Section title** | `sFLS: Smart Factory Logistics System` |
| **Section subtitle** | `Warehouse management designed for manufacturing` |

### Capability Boxes

| # | Title | Tagline | Description | Features |
|---|-------|---------|-------------|----------|
| 1 | Location Intelligence | Every item has an address | System knows exactly where to put it and where to find it. No more searching. No more guessing. | Zone/aisle/shelf/bin structure, Suggested putaway locations based on rules, Directed picking paths for efficiency, Visual warehouse maps |
| 2 | Barcode/RFID Driven | Scan-based accuracy | Scan-based transactions eliminate data entry errors. Every move is recorded. Real-time accuracy. | Mobile device support (Android/iOS), RFID capability for high-volume, Real-time inventory updates, Error prevention with scan validation |
| 3 | FIFO/FEFO Automation | Automatic stock rotation | System enforces first-in-first-out or first-expired-first-out. No more expired stock hiding in the back. | Lot tracking with receiving dates, Expiry date management, Automatic pick sequencing, Expiry alerts and reports |
| 4 | Wave Picking | Optimized fulfillment | Batch similar orders together. Optimize picker routes. Get more shipments out with the same team. | Order batching by criteria, Route optimization algorithms, Labor efficiency tracking, Pick-to-cart and pick-to-pallet |

### Mobile-First Operations (Expandable below Capability #2)

**Purpose:** Transform "mobile app support" from generic to specific. 40+ named functions.

| Element | Specification |
|---------|---------------|
| **Layout** | 4-column module cards, expandable from Capability #2 |
| **Teaser** | `40+ mobile functions across 4 modules →` (clickable) |

| Module | Icon | Top Functions (show 3) |
|--------|------|----------------------|
| **Purchase** | Truck | Scan & Stock-In, Incoming Inspection, Rapid Receipt |
| **Production** | Gear | WO Issuance, Material Picking, Process Reporting |
| **Inventory** | Box | Warehouse Transfers, Inventory Counting, Product Packing |
| **Sales** | Clipboard | OQC Inspection, Distribution, Shipment Tracking |

**Style:** Small cards, 12px radius. Footer: "40+ functions — every warehouse operation in your pocket."

### Three-Stream Process Flow (New Visual Section — between Capabilities and Metrics)

**Purpose:** Shows sFLS covers the ENTIRE warehouse operation, not just storage.

| Element | Specification |
|---------|---------------|
| **Layout** | 3 horizontal swim lanes, left-to-right |
| **Background** | Light gray (#F5F7FA) inset panel |
| **Title** | `End-to-End Warehouse Coverage` |
| **Subtitle** | `sFLS manages every material movement — from dock to floor to door.` |

| Stream | Color | Steps |
|--------|-------|-------|
| **Inbound** | Blue (#00AFF0) | Purchase → Check & Accept → IQC → Stock In → Shelf Assignment |
| **Production** | Green (#02D28C) | Work Order → Requisition → Picking → Reporting → Stock In → Transfer |
| **Outbound** | Amber (#FFD700) | Order Received → Pick → OQC → Stock Out → Delivery |

**Style:** Rounded step nodes with arrows. Color-coded stream badges. Hover shows 1-line description.

---

## Section 4: Before & After — The sFLS Transformation

**Purpose:** Concrete proof through process-level before/after comparisons. More compelling than abstract percentages.

| Element | Specification |
|---------|---------------|
| **Layout** | Before/After comparison table + Step Reduction visual |
| **Background** | White (#ffffff) |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section title** | `What Changes When sFLS Goes Live` |
| **Section subtitle** | `Process by process, the transformation is measurable.` |

### Before/After Comparison Table

| Process | Before (Manual) | After (sFLS) |
|---------|----------------|-------------|
| **Purchase Receipt** | Manually key in each order — over 8 minutes per receipt | Scan code → real-time ERP update → EKanBan instant push |
| **Material Picking** | Manual selection — wrong parts, high loss rate | Auto-generated pick docs by work order — zero errors via scan |
| **Stock In** | Manual warehousing — over 10 minutes, labor-intensive | Directed putaway — significantly reduced operating time |
| **Stock Out** | Long shipment prep — affects on-time delivery | Optimized picks → shorter shipment time → better OTD rate |
| **Inventory Count** | Team works overnight, manual ID is error-prone | Full count in hours, error rate nearly zero |

**Table Style:** Dark header row (#000864), "Before" column in red-tinted bg (#FEF2F2), "After" column in green-tinted bg (#F0FDF4). Alternating row stripes.

### Step Reduction Stories (Visual Highlight)

**Purpose:** "7 steps become 3" communicates more than any feature list.

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column, side by side comparison boxes |
| **Background** | Light gray inset (#F5F7FA), 16px radius |

**Receiving Process: `7` → `3` Steps**

| Before (crossed out, faded) | After (highlighted) |
|-----------------------------|---------------------|
| 1. PO check | 1. PO check by app |
| 2. Print out | 2. Counting |
| 3. Unloading area | 3. Record by app *(delivery note auto-created)* |
| 4. Counting | |
| 5. Recording | |
| 6. Key-in data | |
| 7. Create delivery note | |

**Inventory Process: `5` → `3` Steps**

| Before (crossed out, faded) | After (highlighted) |
|-----------------------------|---------------------|
| 1. Inventory plan | 1. Inventory plan |
| 2. Print paper count cards | 2. Intelligent logistics inventory |
| 3. Physical count | 3. Accounting adjustment |
| 4. Record quantity | |
| 5. Accounting adjustment | |

**Visual Style:** Large step-count numbers (`7→3`, `5→3`) in 48px Noto Sans 700, #00AFF0. "Before" steps shown with strikethrough text at 0.4 opacity. "After" steps shown with check icons and full opacity. Animation: steps cross out sequentially on scroll (0.15s stagger).

---

## Section 5: Integration

**Purpose:** Show WMS as the inventory truth for the entire operation

| Element | Specification |
|---------|---------------|
| **Layout** | Horizontal flow: ERP ↔ MES ↔ WMS (active) ↔ AIoT |
| **Background** | `linear-gradient(180deg, #F5F7FA 0%, #fff 100%)` |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section title** | `Connected to Everything` |
| **Section subtitle** | `WMS is the inventory truth for your entire operation` |
| **Integration message** | `Material requests from production trigger picks automatically. Receiving updates ERP inventory in real time. Location data feeds production planning.` **`One source of inventory truth. Zero reconciliation.`** |

### Integration Links

| Link | Target |
|------|--------|
| Explore ERP → | `erp.html` |
| Explore MES → | `mes.html` |
| Explore AIoT → | `aiot.html` |

---

## Section 6: CTA

**Purpose:** Convert visitors to contact

| Element | Specification |
|---------|---------------|
| **Layout** | Centered text with button row |
| **Background** | Amber/blue gradient (WMS brand color accent) |
| **Padding** | 120px top/bottom |

| Element | Content |
|---------|---------|
| **Title** | `Ready to End the Warehouse Chaos?` |
| **Subtitle** | `Fill out the form and our team will reach out to discuss your specific warehouse challenges.` |
| **Primary CTA** | `Get in Touch` → `{{basePath}}demo.html` (white button) |
| **Secondary CTA** | `View All Products` → `{{basePath}}products.html` (outline white button) |

---

## Responsive Behavior

| Breakpoint | Changes |
|-----------|---------|
| **<= 1024px** | Hero: single column, centered. Warehouse mockup: hidden. Problem grid: responsive reflow. Capabilities: 1-column. Integration: vertical flow. |
| **<= 640px** | Hero: reduced padding. Stats: vertical column. Metrics: stacked. |

---

## Flags & Notes

1. **PRD ALIGNMENT — GOOD**: Headline "Every Item. Every Location. Every Time." matches PRD Section 3.3 exactly. Capabilities cover barcode/RFID, bin management, FIFO, automated picking per PRD.
2. **PRD ALIGNMENT — EXCEEDS**: Page has 6 sections vs PRD's 3. Additions: Problem section, Metrics, Integration. These follow Playbook proof escalation.
3. **SINGLE PRODUCT**: Unlike ERP (T100/iGP) and MES (sMES/SFT), WMS has only one product (sFLS). No comparison layout needed — the page correctly uses a capabilities-focused approach instead.
4. **STATS — RESOLVED v1.2**: Previous soft claims ("99%+ Accuracy", "35% Faster Picks", "-80% Errors", "+20% Capacity") replaced with concrete before/after comparison table using official site process-level data. Step reduction stories (7→3, 5→3) added as visual proof points.
5. **CTA COMPLIANCE**: "Let's Talk" and "Get in Touch" — fully compliant. No demo language.
6. **CTA SECONDARY**: Secondary CTA links to `products.html` (View All Products) rather than `industries.html` (View by Industry). This is different from ERP and MES pages but is a reasonable choice.
7. **PRD NOTE**: PRD says CTA should be "See WMS in Action" — the built page uses "Get in Touch" instead. More compliant with business constraints.
8. **INLINE CSS**: ~624 lines of inline CSS. Problem cards, capability boxes, and metrics styles could be extracted to shared CSS.
9. **EXPANDED PAIN POINTS — INTEGRATED v1.2**: Section 2 expanded from 3 generic cards to 6 station-specific cards (Purchase & Arrival, Inventory, Picking, QC, Packing/Shipping, Stock Rotation). Each maps to a specific warehouse station with descriptive titles and icon spec.
10. **40+ MOBILE FUNCTIONS — INTEGRATED v1.2**: Mobile-First Operations expandable section added below Capability #2. Shows 4 modules (Purchase, Production, Inventory, Sales) with top 3 functions each. Teaser text: "40+ mobile functions across 4 modules."
11. **THREE-STREAM FLOW — INTEGRATED v1.2**: New visual section added between Capabilities and Before/After. Shows Inbound (blue), Production (green), Outbound (amber) as 3 horizontal swim lanes with process steps. Demonstrates end-to-end warehouse coverage.
12. **BEFORE/AFTER METRICS — INTEGRATED v1.2**: Section 4 completely rewritten. Comparison table shows 5 processes (Purchase Receipt, Material Picking, Stock In, Stock Out, Inventory Count) with manual vs. sFLS outcomes. Attribution uses "significantly reduced" and "nearly zero" language to avoid unsourced specifics.
13. **STEP REDUCTION STORIES — INTEGRATED v1.2**: Visual comparison boxes added to Section 4. Receiving 7→3 steps and Inventory 5→3 steps shown with strikethrough animation on "before" steps. Large step-count numbers in 48px Noto Sans 700, #00AFF0.
