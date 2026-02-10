# Content Spec: WMS — sFLS (PRD Section 3.3)

**Batch:** Batch 2
**PRD Reference:** Section 3.3 — WMS: sFLS
**Playbook Reference:** Section 3.2 (Leaf Page Arc — Track A), Section 2.2 (Track A voice), Section 4.1 (Factory Owner Objections), Section 6 (CTA hierarchy)
**Status:** v1.0 — Reverse-engineered from HTML build
**Last Updated:** February 10, 2026

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

**Purpose:** Validate warehouse pain points — 3 core problems

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column grid |
| **Background** | White (#ffffff) |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section title** | `The Warehouse Chaos Problem` |
| **Section subtitle** | `Sound familiar?` |

### Problem Cards

| # | Title | Description |
|---|-------|-------------|
| 1 | "Where Is It?" | Workers spending hours searching for materials. "It's in the warehouse somewhere" is not a location strategy. |
| 2 | Wrong Part Shipped | Picking errors that cost you customer trust and expensive returns. Visual similarity is not a picking system. |
| 3 | Inventory Never Matches | Physical counts vs. system counts are always different. Year-end reconciliation becomes a nightmare. |

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

---

## Section 4: Metrics

**Purpose:** Measurable WMS outcomes

| Element | Specification |
|---------|---------------|
| **Layout** | 4-column grid of metric cards |
| **Background** | White (#ffffff) |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section title** | `What WMS Delivers` |
| **Section subtitle** | `Measurable improvements across your warehouse operation` |

### Metric Cards

| # | Title | Description |
|---|-------|-------------|
| 1 | 99%+ Accuracy | System matches physical. No more surprises at audit time. |
| 2 | 35% Faster Picks | Directed paths eliminate searching. More picks per hour. |
| 3 | -80% Errors | Scan validation catches mistakes before they ship. |
| 4 | +20% Capacity | Smart putaway maximizes your warehouse capacity. |

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
4. **STATS — SOFT CLAIMS**: "99%+ Accuracy", "35% Faster Picks", "-80% Errors", "+20% Capacity" — these are presented as outcomes but are not sourced. Should be verified against actual implementation data or clearly labeled as typical improvements.
5. **CTA COMPLIANCE**: "Let's Talk" and "Get in Touch" — fully compliant. No demo language.
6. **CTA SECONDARY**: Secondary CTA links to `products.html` (View All Products) rather than `industries.html` (View by Industry). This is different from ERP and MES pages but is a reasonable choice.
7. **PRD NOTE**: PRD says CTA should be "See WMS in Action" — the built page uses "Get in Touch" instead. More compliant with business constraints.
8. **INLINE CSS**: ~624 lines of inline CSS. Problem cards, capability boxes, and metrics styles could be extracted to shared CSS.
