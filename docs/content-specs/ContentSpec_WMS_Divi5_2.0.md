# Content Spec: WMS (sFLS) — Divi 5 Build (2.0)

**Batch:** 2 (Product Pages)
**PRD Reference:** Section 3.3 — WMS: sFLS
**Playbook Reference:** Section 3.2 (Leaf Page Arc — Track A), Section 2.2 (Track A voice), Section 4.1 (Factory Owner Objections), Section 6 (CTA hierarchy)
**Status:** v2.0 — Reverse-engineered from HTML build + mapped to Divi 5 modules
**Last Updated:** February 14, 2026
**Platform:** WordPress + Divi 5

---

## Page Overview

| Element | Specification |
|---------|---------------|
| **Audience** | Factory operators with inventory accuracy problems — warehouse managers, operations managers, supply chain leads |
| **Objective** | Zero ghost inventory — end the warehouse chaos |
| **URL** | digiwin.co.th/products/wms.html |
| **Emotional Arc** | Leaf Page Arc Track A (Playbook 3.2) — Pain Validation → Relief/Solution → Proof → Gentle Nudge |
| **Page Structure** | 10 sections: Hero → GEO Explainer → Problem Cards → Capabilities → Mobile Functions → Process Flow → Transformation → Integration → FAQ → CTA + Related Solutions |

---

## Divi 5 Capabilities Leveraged

| Divi 5 Feature | Where Used | Why |
|----------------|-----------|-----|
| **CSS Grid Layout** | Hero 2-col, Problem cards 3-col, Capabilities 2-col, Mobile functions 4-col, Step reduction 2-col | Native responsive grids without custom CSS |
| **Group Module** | Problem cards, Capability boxes, Mobile module cards, Step reduction cards, Integration nodes | Card-style containers with shared background, border, hover effects |
| **Nested Modules** | Capability boxes (icon + title + tagline + desc + feature list), Mobile modules (icon header + function list) | Complex card internal layouts without Code Modules |
| **Design Variables** | Colors, fonts, spacing | Global tokens — change once, updates everywhere |
| **Interactions System** | Card hovers, scroll reveals, process flow arrows | Built-in scroll-triggered animations and hover transforms replace custom JS |
| **Icon List Module** | Capability feature lists, Mobile function lists | Structured lists with per-item icons |
| **Number Counter** | Hero stats (44, 50K+, 100+) | Animated count-up on scroll |
| **Accordion Module** | FAQ section | Native `<details>`/`<summary>` pattern |
| **Semantic Elements** | Every section | `<section>`, `<main>`, `<table>` tags for SEO and accessibility |
| **Customizable Breakpoints** | All sections | 7 breakpoints replace manual media queries |

---

## Design Variables (Reference Homepage Spec)

All Design Variables are defined globally in the Homepage Divi 5 spec (ContentSpec_Home_Divi5_2.0.md). This page uses the same set:

### Colors
| Variable Name | Value | Usage on This Page |
|--------------|-------|-----|
| `--dw-primary-blue` | #00AFF0 | CTAs, stat numbers, capability icons, active states |
| `--dw-dark-navy` | #000864 | Hero background, section titles, table headers, integration nodes |
| `--dw-navy-mid` | #001080 | Hero gradient end |
| `--dw-royal` | #003CC8 | Icon gradient secondary, button hover |
| `--dw-light-gray` | #F5F7FA | Alternating section backgrounds (Capabilities, Process Flow) |
| `--dw-text-dark` | #333333 | Body text |
| `--dw-text-light` | #64748b | Secondary text, taglines |
| `--dw-white` | #FFFFFF | Card backgrounds, hero text |

### Additional Page-Specific Colors
| Color | Value | Usage |
|-------|-------|-------|
| Problem Red | #DC2626 / #fee2e2 | Problem card borders, before-state numbers, red accents |
| Success Green | #22c55e | Checkmarks, "after" indicator, accuracy stat |
| Amber | #F59E0B / #FFD700 | Outbound stream, Inventory module accent |
| Coral | #FF6E82 | Sales module accent |

### Fonts & Spacing
Same as Homepage spec: Noto Sans (headings/body), JetBrains Mono (labels/badges), 100px section padding, 20px card radius, 24-32px card gap.

---

## Section 1: Hero — Warehouse Grid

**Purpose:** Establish the core promise — every item tracked, every location known. Manufacturing-specific WMS positioning.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(135deg, #1a2d3d 0%, #000864 50%, #001080 100%)`, padding: 140px top 100px bottom, overflow: hidden |
| **Grid Pattern Overlay** | Code Module | SVG grid pattern at `opacity: 0.5` — represents warehouse grid structure |
| **Super D Background** | Code Module | `dw-d-bg--top` parallax at opacity 0.12 — warehouse structure descending |
| **Layout** | Row with CSS Grid | `grid-template-columns: 1fr 1fr`, gap: 60px, align-items: center |
| **Left Column** | Column | Content block, text-align: left, max-width: 560px |
| **Right Column** | Column | Warehouse mockup visual (hidden on tablet/mobile) |

### Left Column: Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Badge** | Text Module | `Warehouse Management System` — JetBrains Mono, 11px, uppercase, 0.1em spacing, pill shape (rgba(0,175,240,0.15) bg, rgba(0,175,240,0.3) border, border-radius: 50px), color: #7fc4fd |
| **Headline** | Text Module (H1) | `Every Item. Every Location. Every Time.` — Noto Sans 700, 48px, white, line-height: 1.15 |
| **Subtitle** | Text Module | `Smart warehouse management that eliminates searching, reduces errors, and keeps inventory accurate—without endless manual counts.` — Noto Sans, 20px, rgba(255,255,255,0.85), line-height: 1.6, max-width: 700px |
| **CTA Group** | Group Module (Flexbox) | gap: 16px, justify-content: flex-start, flex-wrap: wrap |
| **Primary CTA** | Button Module | `Let's Talk` → `/demo.html` — `.btn-white` style (white bg, navy text) |
| **Secondary CTA** | Button Module | `Explore sFLS` → `#capabilities` — `.btn-outline-white` style (transparent bg, white border) |
| **Stats Row** | Group Module | Flexbox row, gap: 48px, border-top: 1px solid rgba(255,255,255,0.1), margin-top: 40px, padding-top: 32px |

#### Hero Stats

| Stat | Value | Label | Module |
|------|-------|-------|--------|
| 1 | `44` | Years in Mfg | Number Counter (dynamic via `dw-years` class) |
| 2 | `50K+` | Factories | Text Module (not a pure number) |
| 3 | `100+` | Thai Sites | Text Module |

Number styling: Noto Sans 800, 32px, #00AFF0. Label styling: JetBrains Mono, 10px, rgba(255,255,255,0.75), uppercase, 0.1em spacing.

### Right Column: Warehouse Mockup

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Mockup Container** | Code Module | Glassmorphic card: rgba(255,255,255,0.03) bg, 1px solid rgba(255,255,255,0.1), border-radius: 16px, padding: 20px, box-shadow: 0 40px 80px rgba(0,0,0,0.3) |
| **Content** | Inline HTML | 5x3 warehouse bin grid (A1-C5) with occupied/empty/active states + stats bar (Accuracy 99.2%, Locations 847, Utilized 73%) |

> **Divi 5 Note:** The warehouse mockup is a decorative visual. Use a Code Module with the existing HTML/CSS. It is hidden on tablet/mobile via display:none at <=1024px.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | 2-column grid, mockup visible |
| **Tablet (<=1024px)** | 1 column, mockup hidden, text center-aligned |
| **Mobile (<=640px)** | Padding: 120px top 60px bottom, H1: 32px, stats stack or wrap |

---

## Section 2: GEO Explainer — What is WMS?

**Purpose:** GEO (Generative Engine Optimization) section. Plain-language explanation of WMS for AI search engines and first-time readers.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Padding: 40px top 0 bottom, text-align: center |
| **Inner** | Row | Max-width: 800px, centered |
| **Heading** | Text Module (H2) | `What is WMS (Warehouse Management System)?` — Noto Sans 700, 22px, #000864 |
| **Paragraph 1** | Text Module | Generic WMS definition — Noto Sans, 17px, #333, line-height: 1.7 |
| **Paragraph 2** | Text Module | DigiWin-specific positioning — mentions sFLS, barcode/RFID, FIFO/FEFO, location intelligence, wave picking |

### Exact Content

**Paragraph 1:** `A Warehouse Management System (WMS) is software that manages warehouse operations including receiving, storage, picking, packing, and shipping. With barcode and RFID tracking, a WMS provides real-time inventory accuracy — so you always know exactly what you have and where it is.`

**Paragraph 2:** `DigiWin WMS, powered by the sFLS platform, brings smart inventory management to manufacturing warehouses in Thailand. It replaces manual stock checks and paper-based tracking with barcode/RFID scanning, automated FIFO/FEFO enforcement, location intelligence, and wave picking optimization — covering inbound, production, and outbound warehouse operations end to end.`

---

## Section 3: Problem Cards — The Warehouse Chaos Problem

**Purpose:** Pain validation — name the exact station-specific nightmares warehouse teams experience daily. Creates "they understand us" trust.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #ffffff, padding: 100px top/bottom |
| **Section Scene** | Code Module | Background SVG illustration (warehouse shelves, barcodes, discrepancy numbers) at low opacity — decorative |
| **Header** | Group Module | Center-aligned: section title + subtitle |
| **Cards Grid** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, gap: 24px |
| **Each Card** | Group Module | Background: white, border-radius: 16px, padding: 32px, border: 2px solid #fee2e2, text-align: center, hover: border-color changes to --dw-blue |

### Section Header

| Element | Content |
|---------|---------|
| **Title** | `The Warehouse Chaos Problem` — section-title class |
| **Subtitle** | `Sound familiar? Every station has its own nightmare.` — section-subtitle class |

### Problem Cards (6 total)

Each card contains (nested inside Group Module):

| Element | Divi 5 Module | Styling |
|---------|--------------|---------|
| **Icon** | Code Module (inline SVG) | 64x64px container, linear-gradient(135deg, #fef2f2, #fee2e2) bg, border-radius: 16px, SVG: 28px, stroke: #dc2626 |
| **Station Label** | Text Module | JetBrains Mono, 11px, uppercase, 0.1em spacing, color: --dw-blue |
| **Title** | Text Module (H3) | Noto Sans 600, 18px, #000864 |
| **Description** | Text Module | Noto Sans, 15px, #5b6b80, line-height: 1.6 |

#### Card 1: Purchase & Arrival

| Element | Content |
|---------|---------|
| **Station** | `Purchase & Arrival` |
| **Title** | `"It's Here But Not in the System"` |
| **Description** | `Purchase orders arrive but receiving is manual — paper logs, miscounts, delayed PO matching. Materials sit on the dock while item data hasn't updated.` |

#### Card 2: Inventory

| Element | Content |
|---------|---------|
| **Station** | `Inventory` |
| **Title** | `"System Says 500, Shelf Says 340"` |
| **Description** | `Physical counts vs. system counts are always different. Year-end reconciliation becomes a nightmare that takes the whole team.` |

#### Card 3: Picking

| Element | Content |
|---------|---------|
| **Station** | `Picking` |
| **Title** | `"Wrong Part — They Look the Same"` |
| **Description** | `Picking errors caused by similar specifications. Visual similarity is not a picking system. Costs you customer trust and expensive returns.` |

#### Card 4: Quality Inspection

| Element | Content |
|---------|---------|
| **Station** | `Quality Inspection` |
| **Title** | `"Where's That QC Report?"` |
| **Description** | `Quality checks happen in a black box — no visibility into inspection status or pass rates until it's too late. Materials sit in limbo between receiving and storage.` |

#### Card 5: Packing & Shipping

| Element | Content |
|---------|---------|
| **Station** | `Packing & Shipping` |
| **Title** | `"We Shipped the Wrong One Again"` |
| **Description** | `Packing is error-prone without system guidance — wrong items, wrong quantities, missed shipments. Customers get the wrong item, you eat the return cost.` |

#### Card 6: Stock Rotation

| Element | Content |
|---------|---------|
| **Station** | `Stock Rotation` |
| **Title** | `"FIFO? We Try..."` |
| **Description** | `First-in-first-out is the rule. Reality: oldest stock hides in the back while new stock gets picked first. Expired inventory discovered too late.` |

### Responsive Breakpoints

| Breakpoint | Grid Columns |
|-----------|-------------|
| Desktop (>1024px) | 3 columns |
| Tablet (<=1024px) | 2 columns |
| Mobile (<=640px) | 1 column, max-width: 400px, centered |

---

## Section 4: Capabilities — sFLS: Smart Factory Logistics System

**Purpose:** Present the solution framework. Four capability areas that directly map to the problems named in Section 3.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section (id=`capabilities`) | Background: --dw-light-gray (#F5F7FA), padding: 100px top/bottom |
| **Header** | Group Module | Center-aligned: section title + subtitle |
| **Cards Grid** | Row with CSS Grid | `grid-template-columns: repeat(2, 1fr)`, gap: 32px, max-width: 1200px |
| **Each Card** | Group Module | Background: white, border-radius: 20px, padding: 40px, box-shadow: 0 4px 24px rgba(0,0,0,0.06), border: 1px solid #e8eef3, hover: border-color --dw-blue + enhanced shadow |

### Section Header

| Element | Content |
|---------|---------|
| **Title** | `sFLS: Smart Factory Logistics System` |
| **Subtitle** | `Warehouse management designed for manufacturing` |

### Capability Cards (4 total)

Each card internal layout (nested inside Group Module):

| Element | Divi 5 Module | Styling |
|---------|--------------|---------|
| **Header Row** | Group Module (Flexbox) | flex-direction: row, gap: 20px, align-items: flex-start, margin-bottom: 20px |
| **Icon** | Code Module (inline SVG) | 64x64px, linear-gradient(135deg, --dw-blue, --dw-royal) bg, border-radius: 16px, SVG: 28px stroke white |
| **Titles Group** | Group Module | flex: 1 |
| **Title** | Text Module (H3) | Noto Sans 600, 22px, #000864 |
| **Tagline** | Text Module | Noto Sans, 15px, #5b6b80 |
| **Description** | Text Module | Noto Sans, 16px, #000864, line-height: 1.7 |
| **Feature List** | Icon List Module | 4 items each, checkmark icon (#22c55e), Noto Sans 15px, #000864, border-bottom: 1px solid #f0f4f8 between items |

#### Card 1: Location Intelligence

| Element | Content |
|---------|---------|
| **Title** | `Location Intelligence` |
| **Tagline** | `Every item has an address` |
| **Description** | `System knows exactly where to put it and where to find it. No more searching. No more guessing.` |
| **Features** | Zone/aisle/shelf/bin structure, Suggested putaway locations based on rules, Directed picking paths for efficiency, Visual warehouse maps |

#### Card 2: Barcode/RFID Driven

| Element | Content |
|---------|---------|
| **Title** | `Barcode/RFID Driven` |
| **Tagline** | `Scan-based accuracy` |
| **Description** | `Scan-based transactions eliminate data entry errors. Every move is recorded. Real-time accuracy.` |
| **Features** | Mobile device support (Android/iOS), RFID capability for high-volume, Real-time inventory updates, Error prevention with scan validation |

#### Card 3: FIFO/FEFO Automation

| Element | Content |
|---------|---------|
| **Title** | `FIFO/FEFO Automation` |
| **Tagline** | `Automatic stock rotation` |
| **Description** | `System enforces first-in-first-out or first-expired-first-out. No more expired stock hiding in the back.` |
| **Features** | Lot tracking with receiving dates, Expiry date management, Automatic pick sequencing, Expiry alerts and reports |

#### Card 4: Wave Picking

| Element | Content |
|---------|---------|
| **Title** | `Wave Picking` |
| **Tagline** | `Optimized fulfillment` |
| **Description** | `Batch similar orders together. Optimize picker routes. Get more shipments out with the same team.` |
| **Features** | Order batching by criteria, Route optimization algorithms, Labor efficiency tracking, Pick-to-cart and pick-to-pallet |

### Responsive Breakpoints

| Breakpoint | Grid Columns |
|-----------|-------------|
| Desktop (>1024px) | 2 columns |
| Tablet (<=1024px) | 1 column, max-width: 600px, centered |
| Mobile (<=640px) | 1 column, full width |

---

## Section 5: Mobile Functions — 40+ Mobile Functions in Your Pocket

**Purpose:** Demonstrate depth and comprehensiveness. Show every warehouse operation runs from a mobile device — this is a complete system, not a toy.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #ffffff, padding: 100px top/bottom |
| **Super D Background** | Code Module | `dw-d-bg--corner-br` subtle — decorative |
| **Header** | Group Module | Section title + subtitle |
| **Modules Grid** | Row with CSS Grid | `grid-template-columns: repeat(4, 1fr)`, gap: 24px |
| **Each Module Card** | Group Module | Background: white, border-radius: 16px, padding: 28px 24px, border: 1px solid #e8eef3, hover: box-shadow 0 8px 24px rgba(0,0,0,0.08) |
| **Footer Text** | Text Module | Center-aligned summary line |

### Section Header

| Element | Content |
|---------|---------|
| **Title** | `40+ Mobile Functions in Your Pocket` |
| **Subtitle** | `Every warehouse operation — from receiving dock to shipping door — runs on a mobile device.` |

### Module Cards (4 total)

Each card internal layout:

| Element | Divi 5 Module | Styling |
|---------|--------------|---------|
| **Header Row** | Group Module (Flexbox) | flex-direction: row, gap: 12px, align-items: center, padding-bottom: 16px, border-bottom: 2px solid (accent-color at 0.3 opacity) |
| **Icon** | Code Module (inline SVG) | 44x44px, gradient bg per module color, border-radius: 12px, SVG: 22px stroke white |
| **Module Name** | Text Module | Noto Sans 600, 16px, #000864 |
| **Function Count** | Text Module | JetBrains Mono, 10px, uppercase, 0.08em spacing, #5b6b80 |
| **Function List** | Icon List Module or Text Module with list | Noto Sans 14px, #333, 6px vertical padding, colored bullet per module |

#### Card 1: Purchase (Blue)

| Element | Content |
|---------|---------|
| **Color** | Blue (--dw-blue to --dw-royal gradient) |
| **Count** | `6 Functions` |
| **Functions** | PO Receipt, Supplier Label Scan, QC Entry, Put-Away, Returns Processing, GRN Generation |

#### Card 2: Production (Green)

| Element | Content |
|---------|---------|
| **Color** | Green (#02D28C to #059669 gradient) |
| **Count** | `6 Functions` |
| **Functions** | Material Issue, WIP Transfer, Component Scan, Batch Recording, Scrap Entry, Production Receipt |

#### Card 3: Inventory (Amber)

| Element | Content |
|---------|---------|
| **Color** | Amber (#FFD700 to #F59E0B gradient) |
| **Count** | `9 Functions` |
| **Functions** | Stock Count, Cycle Count, Location Transfer, Lot Adjustment, Shelf Life Check, Min/Max Alert, Label Print, Consolidation, Physical Inventory |

#### Card 4: Sales (Coral)

| Element | Content |
|---------|---------|
| **Color** | Coral (#FF6E82 to #DC2626 gradient) |
| **Count** | `7 Functions` |
| **Functions** | Pick Order, Wave Pick, Pack Verify, Ship Confirm, BOL Generation, Customer Label, Returns Receipt |

### Footer

`40+ functions — every warehouse operation in your pocket.` — JetBrains Mono, 13px, #5b6b80, center-aligned.

### Responsive Breakpoints

| Breakpoint | Grid Columns |
|-----------|-------------|
| Desktop (>1024px) | 4 columns |
| Tablet (<=1024px) | 2 columns |
| Mobile (<=640px) | 1 column, max-width: 360px, centered |

---

## Section 6: Process Flow — End-to-End Warehouse Coverage

**Purpose:** Visualize the three material streams (Inbound, Production, Outbound) and show sFLS covers every step from dock to floor to door.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: --dw-light-gray (#F5F7FA), padding: 100px top/bottom |
| **Header** | Group Module | Section title + subtitle |
| **Streams Container** | Column | Flex column, gap: 24px |
| **Each Stream** | Group Module | Background: white, border-radius: 16px, padding: 24px 32px, border: 1px solid #e8eef3, flex-direction: row, align-items: center, gap: 20px |

### Section Header

| Element | Content |
|---------|---------|
| **Title** | `End-to-End Warehouse Coverage` |
| **Subtitle** | `sFLS manages every material movement — from dock to floor to door.` |

### Stream 1: Inbound (Blue)

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Badge** | Text Module | `Inbound` — JetBrains Mono, 11px, uppercase, rgba(0,175,240,0.12) bg, --dw-blue text, padding: 6px 14px, border-radius: 6px |
| **Steps** | Group Module (Flexbox) | `Purchase` → `Check & Accept` → `IQC` → `Stock In` → `Shelf Assignment` |
| **Arrow** | Text Module | `→` between each step, color: #b0bec5, aria-hidden: true |

Each step: Noto Sans 500, 14px, pill-shaped (rgba(0,175,240,0.08) bg, 1px solid rgba(0,175,240,0.2) border, border-radius: 8px, padding: 8px 16px).

### Stream 2: Production (Green)

| Element | Content |
|---------|---------|
| **Badge** | `Production` — rgba(2,210,140,0.12) bg, #059669 text |
| **Steps** | `Work Order` → `Requisition` → `Picking` → `Reporting` → `Stock In` → `Transfer` |

Each step: rgba(2,210,140,0.08) bg, 1px solid rgba(2,210,140,0.2) border.

### Stream 3: Outbound (Amber)

| Element | Content |
|---------|---------|
| **Badge** | `Outbound` — rgba(245,158,11,0.12) bg, #D97706 text |
| **Steps** | `Order Received` → `Pick` → `OQC` → `Stock Out` → `Delivery` |

Each step: rgba(245,158,11,0.08) bg, 1px solid rgba(245,158,11,0.2) border.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | Horizontal streams, badge + steps in one row |
| Tablet (<=1024px) | Streams stack vertically, badge above steps |
| Mobile (<=640px) | Steps wrap to multiple lines |

---

## Section 7: Transformation — What Changes When sFLS Goes Live

**Purpose:** Concrete proof of transformation. Before/after comparison table + step-reduction stories provide measurable evidence.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #ffffff, padding: 100px top/bottom |
| **Super D Background** | Code Module | `dw-d-bg--corner-br` subtle — decorative |
| **Header** | Group Module | Section title + subtitle |
| **Comparison Table** | Code Module | Full HTML `<table>` with accessible markup — caption, scope attributes, semantic structure |
| **Step Reduction Grid** | Row with CSS Grid | `grid-template-columns: repeat(2, 1fr)`, gap: 32px |
| **Each Step Card** | Group Module | Background: --dw-light-gray, border-radius: 16px, padding: 32px |
| **Source Line** | Text Module | Attribution text, centered |

### Section Header

| Element | Content |
|---------|---------|
| **Title** | `What Changes When sFLS Goes Live` |
| **Subtitle** | `Process by process, the transformation is measurable.` |

### Before/After Comparison Table

> **Divi 5 Note:** Use a Code Module for the table to preserve full semantic HTML (`<table>`, `<caption>`, `<thead>`, `<th scope="col">`, `<tbody>`). Divi 5 does not have a native Table module. The table must remain accessible.

| Process | Before (Manual) | After (sFLS) | Impact |
|---------|-----------------|--------------|--------|
| Purchase Receipt | Manually key in each order — over 8 minutes per receipt | Scan code → real-time ERP update → EKanBan instant push | 7 → 3 steps |
| Material Picking | Manual selection — wrong parts, high loss rate | Auto-generated pick docs by work order — zero errors via scan | Near-zero errors |
| Stock In | Manual warehousing — over 10 minutes, labor-intensive | Directed putaway — significantly reduced operating time | Major time savings |
| Stock Out | Long shipment prep — affects on-time delivery | Optimized picks → shorter shipment time → better OTD rate | Better OTD |
| Inventory Count | Team works overtime, manual ID is error-prone | Full count in hours, error rate nearly zero | 5 → 3 steps |

Table styling:
- Header: --dw-navy bg, white text, Noto Sans 600, 14px, uppercase
- Column widths: Process 16%, Before 34%, After 34%, Impact 16%
- Before column: #FEF2F2 bg, #991B1B text
- After column: #F0FDF4 bg, #166534 text
- Impact column: #EFF6FF bg, --dw-navy text, font-weight: 600, center-aligned
- Border-radius: 12px with overflow: hidden, box-shadow: 0 4px 24px rgba(0,0,0,0.06)

### Step Reduction Stories (2 cards)

Each card internal layout:

| Element | Divi 5 Module | Styling |
|---------|--------------|---------|
| **Header** | Group Module (Flexbox) | Row with title + number comparison, margin-bottom: 24px |
| **Title** | Text Module | Noto Sans 600, 16px, #000864 |
| **Before Number** | Text Module | Noto Sans 700, 48px, #DC2626, text-decoration: line-through, opacity: 0.5 |
| **Arrow** | Text Module | `→`, 24px, #5b6b80 |
| **After Number** | Text Module | Noto Sans 700, 48px, --dw-blue |
| **Columns** | Row (CSS Grid 2-col) | gap: 24px |
| **Before Column** | Group Module | Label: JetBrains Mono 11px uppercase #DC2626 + ordered list with strikethrough, #9CA3AF |
| **After Column** | Group Module | Label: JetBrains Mono 11px uppercase --dw-blue + ordered list with checkmarks, #000864 font-weight: 500 |

#### Card 1: Receiving Process (7 → 3)

**Before steps:** PO check, Print out, Unloading area, Counting, Recording, Key-in data, Create delivery note

**After steps:** PO check by app, Counting, Record by app *(delivery note auto-created)*

#### Card 2: Inventory Process (5 → 3)

**Before steps:** Inventory plan, Print paper count cards, Physical count, Record quantity, Accounting adjustment

**After steps:** Inventory plan, Intelligent logistics inventory, Accounting adjustment

### Source Attribution

`Based on DigiWin WMS implementations across manufacturing and distribution operations` — JetBrains Mono, 11px, #5b6b80, center-aligned.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | Table renders normally, step reduction cards side by side |
| Tablet (<=1024px) | Table scrolls horizontally (overflow-x: auto), step cards stack to 1 column (max-width: 500px) |
| Mobile (<=640px) | Step reduction internal columns stack to 1 column, before/after numbers: 36px |

---

## Section 8: Integration — Connected to Everything

**Purpose:** Position WMS within the broader DigiWin ecosystem. One database, no reconciliation.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(180deg, #F5F7FA 0%, #ffffff 100%)`, padding: 100px top/bottom |
| **Header** | Group Module | Section title + subtitle, center-aligned |
| **Integration Visual** | Group Module (Flexbox) | Center-aligned row: ERP ↔ MES ↔ WMS (active) ↔ AIoT, gap: 0 (arrows provide spacing) |
| **Each Node** | Group Module | Background: white, border: 2px solid #e8eef3, border-radius: 16px, padding: 20px 28px, hover: border-color --dw-blue |
| **Active Node (WMS)** | Group Module | border-color: --dw-blue, background: `linear-gradient(135deg, #f0f7ff, #ffffff)`, box-shadow: 0 8px 24px rgba(0,175,240,0.15) |
| **Arrow** | Text Module | `↔`, font-size: 20px, color: #0369a1, padding: 0 12px |
| **Message Box** | Group Module | White, border-radius: 16px, padding: 32px 40px, box-shadow, border, max-width: 700px centered |
| **Links Row** | Group Module (Flexbox) | gap: 16px, justify-content: center, flex-wrap: wrap |
| **Each Link** | Button Module (ghost style) | White bg, 1px solid #e8eef3, border-radius: 8px, #0369a1 text, hover: border-color --dw-blue + blue tint bg |

### Section Header

| Element | Content |
|---------|---------|
| **Title** | `Connected to Everything` |
| **Subtitle** | `WMS is the inventory truth for your entire operation` |

### Integration Nodes

| Node | Icon | Name | Active? |
|------|------|------|---------|
| 1 | Grid/table icon | `ERP` | No |
| 2 | Factory icon | `MES` | No |
| 3 | Cube icon | `WMS` | Yes (highlighted) |
| 4 | Sun/sensor icon | `AIoT` | No |

### Message Box Content

`Material requests from production trigger picks automatically. Receiving updates ERP inventory in real time. Location data feeds production planning.` **`One source of inventory truth. Zero reconciliation.`**

### Navigation Links

| Link | Destination |
|------|-------------|
| `Explore ERP →` | `/products/erp.html` |
| `Explore MES →` | `/products/mes.html` |
| `Explore AIoT →` | `/products/aiot.html` |

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | Horizontal node row |
| Tablet (<=1024px) | Nodes stack vertically, arrows rotate 90deg |
| Mobile (<=640px) | Same as tablet |

---

## Section 9: FAQ — Frequently Asked Questions

**Purpose:** Address remaining objections and provide SEO-rich answers. Structured data (FAQPage schema) already in `<head>`.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #f8fafc, padding: 60px top/bottom |
| **Inner** | Row | Max-width: 800px, centered |
| **Heading** | Text Module (H2) | `Frequently Asked Questions` — Noto Sans 700, 28px, #000864, center-aligned |
| **FAQ Items** | Accordion Module | 5 items, each with summary (question) and detail (answer) |

### FAQ Items

| # | Question | Answer |
|---|----------|--------|
| 1 | What is a Warehouse Management System (WMS)? | A WMS controls and optimizes warehouse operations — from receiving and putaway to picking, packing, and shipping. DigiWin WMS (sFLS) is designed specifically for manufacturing warehouses, handling raw materials, WIP inventory, and finished goods with production-linked workflows. |
| 2 | How is DigiWin WMS different from generic WMS solutions? | DigiWin WMS (sFLS) is built for manufacturing, not distribution. It includes production material kitting, shop floor delivery integration, WIP location tracking, and quality hold management. It also shares one database with DigiWin ERP and MES, eliminating integration complexity. |
| 3 | Can DigiWin WMS work with my existing ERP? | Yes. DigiWin WMS can operate standalone or integrate with any existing ERP via standard APIs. It works natively with DigiWin ERP (T100/iGP) through a shared database, but also connects to SAP, Oracle, and other ERP platforms. |
| 4 | What hardware do I need for DigiWin WMS? | Standard Android or iOS mobile devices for barcode scanning, plus optional RFID readers for high-volume environments. Barcode label printers for location/item labeling. Runs on standard server infrastructure or cloud — no specialized hardware beyond mobile scanners. |
| 5 | How long does WMS implementation take? | Typically 2-4 months depending on warehouse complexity. Basic implementations with core receiving, putaway, and picking can go live in as little as 6 weeks. Phased approach lets you start with high-impact areas. |

> **Divi 5 Note:** Use Accordion Module with semantic `<details>`/`<summary>` rendering. Question: Noto Sans 600, 17px, #000864. Answer: Noto Sans, 15px, #333, line-height: 1.7. Expand/collapse icon: `+` / `-`, color #0369a1.

---

## Section 10: CTA — Ready to End the Warehouse Chaos?

**Purpose:** Final conversion point. Gentle nudge, not hard sell. Consistent with Playbook CTA hierarchy (Level 2 — "Let's Talk").

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Uses `.product-detail-cta` shared class (dark navy gradient with brand overlays) |
| **Super D Background** | Code Module | `dw-d-bg--left` medium — structured warehouse organization |
| **Wave Flow** | Code Module | Particle wave at opacity 0.32, height 170px — goods in motion toward action |
| **Content** | Group Module (z-index: 3) | Center-aligned |
| **Headline** | Text Module (H2) | `Ready to End the Warehouse Chaos?` — White, large |
| **Subtitle** | Text Module | `Fill out the form and our team will reach out to discuss your specific warehouse challenges.` — rgba(255,255,255,0.85) |
| **Button Group** | Group Module (Flexbox) | gap: 16px, center |
| **Primary CTA** | Button Module | `Get in Touch` → `/demo.html` — `.btn-white` (NEVER "Request Demo") |
| **Secondary CTA** | Button Module | `View All Products` → `/products.html` — `.btn-outline-white` |

---

## Section 11: Related Solutions (SEO Internal Links)

**Purpose:** Internal linking for SEO juice and cross-navigation between related product and industry pages.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: --dw-light-gray, padding: 60px 5% |
| **Heading** | Text Module (H2) | `Explore Related Solutions` — Noto Sans 600, 28px, #000864, center |
| **Grid** | Row with CSS Grid | `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`, gap: 24px |
| **Each Card** | Group Module (linked) | White bg, border-radius: 12px, padding: 24px, border: 1px solid #e5e7eb, hover: box-shadow |

### Cards

| Title | Description | Link |
|-------|-------------|------|
| ERP | End-to-end manufacturing ERP built for Thai factories — from BOM to financials to BOI compliance. | `/products/erp.html` |
| MES | Real-time shop floor execution system — OEE tracking, SPC, and paperless work orders. | `/products/mes.html` |
| AIoT | Connect machines directly to your ERP with IoT sensors, edge computing, and AI-powered analytics. | `/products/aiot.html` |
| Automotive | ERP and MES solutions purpose-built for automotive parts manufacturers and OEM suppliers. | `/industries/automotive.html` |
| Electronics | Manufacturing software for electronics assembly, SMT lines, and component traceability. | `/industries/electronics.html` |
| Metal & Plastics | Integrated solutions for die casting, injection molding, and metal fabrication shops. | `/industries/metal-plastics.html` |

---

## Scroll Animation Strategy

| Component | Static Build | Divi 5 Equivalent |
|-----------|-------------|-------------------|
| Card hover lifts | CSS transition translateY(-6px) | Interactions → Hover → Transform (translateY: -6px, 0.3s ease) |
| Scroll fade-in | `DigiWinUI.initScrollAnimation()` | Interactions → Scroll → Fade In (400ms ease, 70ms stagger) |
| Hero stat counters | Hardcoded values | Number Counter module (auto-animate on scroll) |
| Problem card border hover | CSS transition border-color | Interactions → Hover → Border Color (--dw-blue, 0.3s ease) |
| Process flow arrows | Static `→` characters | Text Module with `aria-hidden="true"` |
| Super D parallax | Custom parallax via `dw-d-parallax` | Code Module with the same CSS, OR Divi 5 Interactions → Scroll → Parallax if supported |
| Wave flow animation | CSS keyframes drift 30s loop | Code Module preserving existing CSS animation |
| Dynamic year | `dw-years` class + `digiwin-dynamic.js` | Code Module snippet or manual update |

> **Only remaining custom JS:** Dynamic year calculation (2026 - 1982 = 44). Use Code Module snippet for initial build.

---

## Structured Data (Already in `<head>`)

Three JSON-LD schemas are included:

1. **SoftwareApplication** — DigiWin WMS (sFLS), BusinessApplication, Warehouse Management System
2. **BreadcrumbList** — Home → Products → WMS: sFLS
3. **FAQPage** — 5 questions/answers matching FAQ section content

> **Divi 5 Note:** Add these via `Divi > Theme Options > Integration > Head` or a Code Module in the header. Ensure they persist through Divi builds.

---

## Issues Found During Reverse-Engineering

| Issue | Severity | Recommendation |
|-------|----------|----------------|
| **Warehouse mockup is ~40 lines of HTML** | Low | Keep in Code Module — it is a decorative visual only shown on desktop |
| **Before/After table requires Code Module** | Medium | Divi 5 has no native Table module. Code Module with accessible HTML is the correct approach. |
| **SVG section scene illustrations are decorative** | Low | Keep in Code Modules, mark with `aria-hidden="true"` |
| **44 years is hardcoded in places, dynamic in others** | Low | Standardize via Divi 5 Design Variable or dynamic Code Module |
| **Problem card icons are inline SVGs** | Low | Keep in Code Modules within Group Modules — more maintainable than converting to images |

---

## Validation Checklist (Divi 5 Build)

- [ ] Hero renders 2-column on desktop, stacks on tablet/mobile
- [ ] Warehouse mockup is hidden on tablet/mobile
- [ ] All 6 problem cards render in correct 3-column grid
- [ ] Problem cards have hover effect (border-color change)
- [ ] All 4 capability boxes render in 2-column grid
- [ ] Capability feature lists show checkmarks
- [ ] All 4 mobile function modules render in 4-column grid
- [ ] Function counts match: Purchase (6), Production (6), Inventory (9), Sales (7)
- [ ] 3 process flow streams display horizontally with correct color-coding
- [ ] Before/After table is accessible (caption, scope, semantic markup)
- [ ] Step reduction cards show correct numbers (7→3, 5→3)
- [ ] Integration diagram shows 4 nodes with WMS highlighted
- [ ] Integration links go to correct product pages
- [ ] 5 FAQ items expand/collapse correctly
- [ ] CTA says "Get in Touch" (NEVER "Request Demo" or "Book a Demo")
- [ ] CTA button links to `/demo.html`
- [ ] All internal links point to pages that exist
- [ ] Dynamic year shows correct value (2026 - 1982 = 44)
- [ ] Colors match Design Variables exactly
- [ ] Fonts load: Noto Sans, JetBrains Mono
- [ ] `prefers-reduced-motion` disables all animations/transitions
- [ ] Skip-to-content link present
- [ ] `<main>` landmark present with id `wms-content`
- [ ] Page loads under 3 seconds on 4G connection
- [ ] No horizontal scroll on any breakpoint
- [ ] Related Solutions grid renders responsively

---

## Open Questions for Peter

1. **Warehouse mockup:** Keep the interactive bin grid in Code Module, or replace with a product screenshot/stock image?
2. **Before/After table:** Happy with the current data, or do you have updated implementation metrics from recent Thai deployments?
3. **Step reduction stories:** Only 2 stories shown (Receiving 7→3, Inventory 5→3). Should we add more process stories?
4. **Mobile function counts:** The "40+" claim is based on 28 listed functions (6+6+9+7). Should we expand the lists to actually show 40+, or keep the current representative selection?

---
