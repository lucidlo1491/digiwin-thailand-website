# Content Spec: Electronics Assembly Page — Divi 5 Build (2.0)

**Batch:** 2 (Industry Pages)
**PRD Reference:** Section 4, Page 4.2
**Playbook Reference:** Section 2 (Track A — Factory Operators)
**Status:** v2.0 — Reverse-engineered from HTML build + mapped to Divi 5 modules
**Last Updated:** February 14, 2026
**Platform:** WordPress + Divi 5

---

## Page Overview

| Element | Specification |
|---------|---------------|
| **Audience** | Track A — Electronics assembly factory operators (PCBA, SMT, component assembly) |
| **Objective** | Convince electronics manufacturers that DigiWin MES handles high-mix complexity that generic systems cannot |
| **URL** | digiwin.co.th/industries/electronics.html |
| **Emotional Arc** | Empathetic ("we know your chaos") → Technical ("purpose-built for electronics") → Proof ("Hoo Chin Thai case") → Action |
| **Page Structure** | 9 sections: Hero, Context, Challenges, Solutions (5 cards incl. BOI), Equipment Integration, Hoo Chin Case Study, Products, FAQ, CTA + Related Solutions |
| **Key Differentiator** | Hoo Chin Electronics (Thailand) — a verified Thai client, not just Asia-wide references |

---

## Divi 5 Capabilities Leveraged

| Divi 5 Feature | Where Used | Why |
|----------------|-----------|-----|
| **CSS Grid Layout** | Challenges grid (3-col), Solutions grid (2+1), Equipment brands, Products (3-col) | Native responsive grids |
| **Group Module** | Solution cards, Equipment brand badges, Hoo Chin case study card | Complex card containers |
| **Icon List Module** | Solution feature checklists | Structured checkmark lists |
| **Accordion Module** | FAQ (5 items) | Native details/summary |
| **Number Counter** | Hero stats | Animated count-up |
| **Blurb Module** | Challenge cards | Icon + title + text pattern |
| **Interactions System** | Card hovers, scroll reveals | Replace custom JS |
| **Design Variables** | All styling | Brand consistency |

---

## Design Variables (Global Reference)

See `ContentSpec_Home_Divi5_2.0.md` for full Design Variables table.

---

## Section 1: Hero — Centered Dark

**Purpose:** Establish electronics-specific expertise with precision-focused stats.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Same dark hero gradient pattern, padding 160px 0 120px |
| **Super D** | Code Module | Class: `dw-d-bg dw-d-bg--top`, opacity 0.12 |
| **Content Row** | Row | Max-width: 1200px, centered, text-align center, z-index 2 |

### Hero Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Badge** | Text Module | `ELECTRONICS ASSEMBLY` — Pill styling, JetBrains Mono, 11px, uppercase |
| **Headline** | Text Module (H1) | `Precision for` **`High-Mix`** `Manufacturing` — "High-Mix" in #00AFF0. Noto Sans 700, clamp(36px, 4.5vw, 52px), white |
| **Subtitle** | Text Module | `Thousands of components per board. Fast product cycles. Complete traceability. Built specifically for electronics complexity.` — 18px, rgba(255,255,255,0.75), line-height 1.7 |
| **Stats Row** | Row (3 columns) | Flexbox, gap 48px, border-top 1px solid rgba(255,255,255,0.1), padding-top 40px |

### Hero Stats

| Stat | Value | Label | Module |
|------|-------|-------|--------|
| 1 | `1000+` | Component types tracked | Number Counter |
| 2 | `99.9%` | Pick accuracy | Number Counter |
| 3 | `-45%` | MSD scrap reduction | Text Module (negative sign) |

---

## Section 2: Context — Thailand's Electronics Ecosystem

**Purpose:** Ground the page in Thailand's $40B+ electronics export market.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: 80px 0, shared `.context-section` styling |
| **Content Row** | Row | Max-width: 800px, centered |

### Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `Thailand's Electronics Ecosystem` — Noto Sans 700, 36px, #000864 |
| **Body** | Text Module | `Thailand exports **$40+ billion in electronics annually**, from hard disk drives to automotive electronics to consumer devices. Electronics manufacturers face unique complexity: **hundreds of unique parts per product**, constant changeovers for high-mix production, and moisture-sensitive components that require precise handling. DigiWin's MES was built specifically for this challenge.` — 17px, #333, line-height 1.7 |

---

## Section 3: Challenges — The Electronics Manufacturing Challenge

**Purpose:** Name the 3 core pain points that create the "they get it" reaction.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #F5F7FA, padding: 100px 0 |
| **Wave Decoration** | Code Module | Class: `dw-wave-vertical--right`, opacity 0.06, decorative |
| **Content Row** | Row | Max-width: 1100px, centered, z-index 2 |

### Section Header

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `The Electronics Manufacturing Challenge` |
| **Subtitle** | Text Module | `Complexity that generic systems can't handle` |

### Challenge Cards (3 cards)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Grid** | Row | CSS Grid: 3 columns, gap 24px |
| **Each Card** | Blurb Module | Same challenge-card styling |

| Card | Icon | Title | Description |
|------|------|-------|-------------|
| 1 | Gear/Settings | `Component Chaos` | `Hundreds of unique parts per product. Thousands of reels in inventory. One wrong component placed = entire batch scrap.` |
| 2 | Clock | `Fast Changeovers` | `High-mix, low-volume means constant changeovers. Every minute of setup time is lost production capacity you can't recover.` |
| 3 | Arrows (radial) | `Moisture Sensitivity` | `MSD components that expire after floor exposure. Track it or scrap it. Manual tracking simply can't keep up with the pace.` |

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Tablet (<=1024px)** | Grid: 2 columns (last card spans full width) |
| **Mobile (<=640px)** | Grid: 1 column |

---

## Section 4: Solutions — How DigiWin Solves It

**Purpose:** Present 5 solution capabilities (including BOI compliance as highlighted card).

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: 100px 0 |
| **Blueprint Background** | Code Module | SVG circuit board traces (vertical lines, IC pad patterns, connection nodes), decorative, aria-hidden |
| **Content Row** | Row | Max-width: 1200px, centered, z-index 2 |

### Section Header

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `How DigiWin Solves It` |
| **Subtitle** | Text Module | `Purpose-built capabilities for electronics assembly` |

### Solution Cards (5 cards — 2x2 grid + 1 highlighted)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Grid** | Row | CSS Grid: 2 columns, gap 24px. Card 5 (BOI) may span full width or sit in a 3rd row. |
| **Cards 1-4** | Group Module | Standard solution-card styling |
| **Card 5 (BOI)** | Group Module | **Highlighted:** border 2px solid rgba(0,175,240,0.3), background linear-gradient(135deg, rgba(0,175,240,0.03), white) |

| Card | Icon | Title | Description | Features |
|------|------|-------|-------------|----------|
| 1 | Link (chain) | `SMT Machine Integration` | `Direct connection to pick-and-place machines. Verify component reels before mounting. Prevent wrong-part defects at the source.` | `Reel verification at feeder`, `Wrong-part prevention`, `Program download automation` |
| 2 | Tag | `Component-Level Traceability` | `Track every reel to every board position. Know exactly which components went into which products.` | `Reel to serial number linkage`, `Full forward/backward trace`, `Recall scope minimization` |
| 3 | Water droplet | `MSD Management` | `Automatic floor life tracking for moisture-sensitive components. System alerts before expiry to reduce scrap.` | `Auto floor life countdown`, `Bake-out cycle tracking`, `Expiry alerts & blocking` |
| 4 | Eye | `AOI/ICT Integration` | `Connect inspection results to MES. Track defect trends by component, machine, operator, and time.` | `Auto defect capture`, `Pareto analysis`, `SPC trending` |
| 5 | Shield-check | `BOI Compliance` | `Production-order-level material reconciliation for BOI audits. Track actual component consumption per assembly order — critical for bonded electronic components.` | `BOI-ready audit reports`, `Bonded component tracking`, `Proven: 10M+ THB/yr saved` |

---

## Section 5: Equipment Integration — Direct Machine Connectivity

**Purpose:** Show brand-name SMT equipment compatibility (builds trust with equipment-specific buyers).

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: linear-gradient(135deg, #000864, #000432), padding: 80px 0 |
| **Content Row** | Row | Max-width: 900px, centered, z-index 2 |

### Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H3) | `Direct Equipment Integration` — Noto Sans 700, 28px, white, center |
| **Subtitle** | Text Module | `DigiWin MES connects directly to your SMT lines, inspection stations, reflow ovens, and test equipment — capturing real-time production data without manual entry.` — 16px, #666→ rgba(255,255,255,0.75) on dark bg, max-width 700px, center |

### Equipment Brand Groups (3 categories)

Each category has a label + brand badge row:

**SMT Pick-and-Place:**

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Label** | Text Module | `SMT PICK-AND-PLACE` — JetBrains Mono, 11px, #00AFF0, uppercase |
| **Brands** | Row (Flexbox) | `Fuji`, `Panasonic`, `Yamaha`, `Juki`, `ASM` — each as Text Module styled as badge (background rgba(255,255,255,0.08), border 1px solid rgba(255,255,255,0.15), border-radius 8px, padding 12px 24px, white text) |

**AOI & Inspection:**

| Brands |
|--------|
| `Koh Young`, `Saki`, `Omron` |

**Reflow Ovens & Test:**

| Brands |
|--------|
| `Heller`, `BTU`, `Keysight` |

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Mobile (<=640px)** | Brand badges stack, smaller padding |

---

## Section 6: Hoo Chin Electronics — Thai Case Study

**Purpose:** Provide a verified Thai client reference (not just Asia-wide). This is the strongest proof point on the page.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: 80px 0 |
| **Content Row** | Row | Max-width: 800px, centered |

### Case Study Card

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Card** | Group Module | Background: `linear-gradient(135deg, rgba(0,175,240,0.04), rgba(0,8,100,0.04))`, border 1px solid rgba(0,175,240,0.2), border-left 4px solid #00AFF0, border-radius 12px, padding 40px |

### Card Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Label** | Text Module | `DIGIWIN IN THAI ELECTRONICS` — JetBrains Mono, 11px, #00AFF0, uppercase, 0.1em spacing |
| **Client Name** | Text Module (H3) | `Hoo Chin Electronics (Thailand)` — Noto Sans 700, 24px, #000864 |
| **Description** | Text Module | `Hoo Chin Electronics, a Thai electronics manufacturer and one of DigiWin's local clients, chose DigiWin ERP to manage the complexity of high-mix production, BOI compliance, and multi-material component tracking — the same challenges your factory faces every day.` — 16px, #333, line-height 1.7 |
| **Localization Note** | Text Module | `This is not just an Asia-wide reference. Hoo Chin operates in Thailand, navigates Thai regulations, and works with Thai supply chains — proof that DigiWin delivers results in your market.` — 14px, #666, line-height 1.6 |

> **Important:** Hoo Chin is a verified Thai client. This is the key differentiator from the Automotive page's Asia-only references. Emphasize "operates in Thailand" and "Thai regulations."

---

## Section 7: Recommended Products for Electronics

**Purpose:** Link to the 3 most relevant products for electronics assembly.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #F5F7FA, padding: 80px 0 |
| **Content Row** | Row | Max-width: 1200px, centered |

### Section Header

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `Recommended Products for Electronics` |

### Product Cards (3 cards)

| Card | Icon | Title | Description | Link |
|------|------|-------|-------------|------|
| 1 | Machine | `MES` | `Component-level traceability, SMT integration, MSD management, and real-time quality tracking for electronics.` | `/products/mes.html` |
| 2 | Box/cube | `sFLS WMS` | `Reel management, moisture-sensitive handling, and kitting support for electronics warehouse operations.` | `/products/wms.html` |
| 3 | Sun/rays | `AIoT` | `Machine connectivity for SMT lines, reflow ovens, and test equipment. Real-time OEE and process monitoring.` | `/products/aiot.html` |

---

## Section 8: FAQ — Accordion

**Purpose:** SEO (GEO) content + user confidence for electronics-specific questions.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #f8fafc, padding: 60px 0 |
| **Content Row** | Row | Max-width: 800px, centered |
| **Headline** | Text Module (H2) | `Frequently Asked Questions` — center |
| **FAQ Items** | Accordion Module | 5 items |

### FAQ Items

| # | Question | Answer (abbreviated) |
|---|----------|--------|
| 1 | What MES system works best for electronics assembly in Thailand? | DigiWin MES is purpose-built for electronics assembly complexity with native SMT machine integration... |
| 2 | Can DigiWin MES integrate with Fuji and Panasonic SMT machines? | Yes. DigiWin provides direct machine connectivity with all major SMT equipment brands including Fuji, Panasonic, Yamaha, Juki, and ASM... |
| 3 | How does DigiWin handle moisture-sensitive component (MSD) tracking? | DigiWin automates the entire floor-life management process... auto countdown, bake-out cycles, expiry alerts... 45% reduction in MSD-related scrap... |
| 4 | Does DigiWin support BOI compliance for electronics factories? | Yes. Production-order-level material reconciliation... bonded electronic components... 10M+ THB/year savings... |
| 5 | What pick accuracy can I achieve with DigiWin WMS? | DigiWin sFLS WMS delivers 99.9% pick accuracy... reel-level inventory, automated kitting, barcode-driven verification... |

---

## Section 9: CTA — Master Electronics Complexity

**Purpose:** Convert electronics-specific interest into conversation.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Shared CTA section styling |
| **Super D** | Code Module | Class: `dw-d-bg dw-d-bg--center dw-d-bg--gradient`, opacity 0.10 |
| **Wave** | Code Module | Class: `dw-wave-flow`, opacity 0.08 |

### CTA Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `Master Electronics Complexity` |
| **Subtitle** | Text Module | `See how DigiWin handles high-mix manufacturing` |
| **Primary Button** | Button Module | `Get in Touch` → `/demo.html` |
| **Secondary Button** | Button Module | `View Other Industries` → `/industries.html` |

---

## Section 10: Related Solutions — Internal Links

**Purpose:** SEO internal linking.

### Divi 5 Implementation

Same pattern as Automotive page. 6 link cards:

| Title | Link |
|-------|------|
| `Automotive` | `/industries/automotive.html` |
| `Metal & Plastics` | `/industries/metal-plastics.html` |
| `ERP` | `/products/erp.html` |
| `MES` | `/products/mes.html` |
| `WMS` | `/products/wms.html` |
| `AIoT` | `/products/aiot.html` |

---

## Animation Strategy

| Animation | Divi 5 Implementation |
|-----------|----------------------|
| **Hero entrance** | Slide-up 0.8s ease-out |
| **All cards** | Scroll fade-in, 0.4s ease, stagger 0.07s |
| **Card hovers** | Border-color + box-shadow, 0.3s ease |
| **Equipment badges** | Scroll fade-in per row |
| **BOI card highlight** | Subtle border glow (static, not animated) |
| **prefers-reduced-motion** | All animations disabled |

---

## Validation Checklist

- [ ] Skip-to-content link: `#elec-content`
- [ ] `<main id="elec-content">` landmark present
- [ ] `prefers-reduced-motion` disables all animations
- [ ] No low-contrast text on dark backgrounds
- [ ] All SVG icons have `aria-hidden="true"`
- [ ] H1 unique; H2-H3 hierarchy correct
- [ ] Hoo Chin Electronics case study present with Thai framing
- [ ] Equipment brand names: Fuji, Panasonic, Yamaha, Juki, ASM, Koh Young, Saki, Omron, Heller, BTU, Keysight
- [ ] BOI compliance card has highlighted styling (distinct from other solution cards)
- [ ] CTA says "Get in Touch" (never "Request Demo")
- [ ] Structured data: WebPage + BreadcrumbList + FAQPage schemas
- [ ] Design tokens used for all colors
- [ ] All links verified to exist
- [ ] FAQ uses Accordion module
- [ ] MES used generically (not product-name-specific)
