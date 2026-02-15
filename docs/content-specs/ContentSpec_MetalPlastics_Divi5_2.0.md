# Content Spec: Metal & Plastics Processing Page — Divi 5 Build (2.0)

**Batch:** 2 (Industry Pages)
**PRD Reference:** Section 4, Page 4.3
**Playbook Reference:** Section 2 (Track A — Factory Operators)
**Status:** v2.0 — Reverse-engineered from HTML build + mapped to Divi 5 modules
**Last Updated:** February 14, 2026
**Platform:** WordPress + Divi 5

---

## Page Overview

| Element | Specification |
|---------|---------------|
| **Audience** | Track A — Metal stamping, injection molding, die casting, CNC factory operators |
| **Objective** | Convince process manufacturers that DigiWin understands yield-driven economics and process parameter complexity |
| **URL** | digiwin.co.th/industries/metal-plastics.html |
| **Emotional Arc** | Empathetic ("margins are made or lost on the shop floor") → Technical ("data-driven visibility") → Proof ("Ginfong: 23% → 34% margin") → Action |
| **Page Structure** | 10 sections: Hero, Context, Challenges, Solutions (4+1 BOI), Specialized ERP (7 conditions), Ginfong Case Study (dark), Process Types, Products, FAQ, CTA + Related Solutions |
| **Key Differentiator** | Ginfong case study with hard numbers (margin 23% → 34%, revenue +200%) + 7 metal-specific ERP conditions |

---

## Divi 5 Capabilities Leveraged

| Divi 5 Feature | Where Used | Why |
|----------------|-----------|-----|
| **CSS Grid Layout** | Challenges (3-col), Solutions (2-col), Specialized ERP (auto-fit), Products (3-col) | Native responsive grids |
| **Group Module** | Solution cards, Specialized ERP cards, Ginfong case study, Process badges | Complex card containers |
| **Icon List Module** | Solution feature checklists | Structured checkmark lists |
| **Accordion Module** | FAQ (5 items) | Native details/summary |
| **Number Counter** | Hero stats, Ginfong stats | Animated count-up |
| **Blurb Module** | Challenge cards, Specialized ERP cards | Icon + title + text |
| **Interactions System** | Card hovers, scroll reveals | Replace custom JS |
| **Design Variables** | All styling | Brand consistency |

---

## Design Variables (Global Reference)

See `ContentSpec_Home_Divi5_2.0.md` for full Design Variables table.

---

## Section 1: Hero — Centered Dark

**Purpose:** Establish yield-optimization expertise with process-specific stats.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Same dark hero gradient pattern, padding 160px 0 120px |
| **Super D** | Code Module | Class: `dw-d-bg dw-d-bg--bottom dw-d-bg--particle`, opacity 0.15 |
| **Content Row** | Row | Max-width: 1200px, centered, text-align center, z-index 2 |

### Hero Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Badge** | Text Module | `METAL & PLASTICS PROCESSING` — Pill styling |
| **Headline** | Text Module (H1) | `Optimize Yield.` **`Minimize Scrap.`** — "Minimize Scrap." in #00AFF0. Noto Sans 700, clamp(36px, 4.5vw, 52px), white |
| **Subtitle** | Text Module | `Stamping, injection molding, die casting, CNC machining. Process manufacturing where cycle time and yield drive your margins.` — 18px, rgba(255,255,255,0.75), line-height 1.7 |
| **Stats Row** | Row (3 columns) | Flexbox, gap 48px, border-top 1px solid rgba(255,255,255,0.1), padding-top 40px |

### Hero Stats

| Stat | Value | Label | Module |
|------|-------|-------|--------|
| 1 | `+15%` | Average yield improvement | Text Module |
| 2 | `-30%` | Unplanned downtime | Text Module |
| 3 | `100%` | Cycle time visibility | Text Module |

> **Divi 5 Note:** Use Text modules since values contain `+` and `-` prefixes.

---

## Section 2: Context — Where Margins Are Made

**Purpose:** Frame the economic reality — material costs = 50-70%, so yield = profit.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: 80px 0 |
| **Content Row** | Row | Max-width: 800px, centered |

### Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `Where Margins Are Made` — Noto Sans 700, 36px, #000864 |
| **Body** | Text Module | `In metal and plastics processing, **material costs are 50-70% of your total cost**. Every defective part is money in the scrap bin. Every second of cycle time drift is capacity you'll never recover. Small improvements in yield and efficiency **translate directly to the bottom line**—but you can't improve what you can't measure.` — 17px, #333, line-height 1.7 |

---

## Section 3: Challenges — The Process Manufacturing Challenge

**Purpose:** Name 3 pain points specific to process manufacturing.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #F5F7FA, padding: 100px 0 |
| **Content Row** | Row | Max-width: 1100px, centered |

### Section Header

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `The Process Manufacturing Challenge` |
| **Subtitle** | Text Module | `Hidden losses that erode your margins` |

### Challenge Cards (3 cards)

| Card | Icon | Title | Description |
|------|------|-------|-------------|
| 1 | Trash/bin | `Scrap Eats Margins` | `Material costs are your biggest expense. Every defective part is money thrown away. Small yield improvements create significant profit impact.` |
| 2 | Wrench | `Die/Mold Mysteries` | `Which die is causing defects? When does a mold need maintenance? Without data, you're guessing until it fails catastrophically.` |
| 3 | Clock | `Cycle Time Drift` | `Machines slow down gradually. Operators don't notice 0.5 seconds per cycle—but over a shift, that's real capacity loss.` |

---

## Section 4: Solutions — How DigiWin Solves It

**Purpose:** Present 4 core process-manufacturing capabilities + highlighted BOI card.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: 100px 0 |
| **Blueprint Background** | Code Module | SVG manufacturing process illustration (mold cavity, press, trim, gauge stations), decorative, aria-hidden |
| **Content Row** | Row | Max-width: 1200px, centered, z-index 2 |

### Section Header

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `How DigiWin Solves It` |
| **Subtitle** | Text Module | `Data-driven visibility for process manufacturing` |

### Solution Cards (4 standard + 1 highlighted BOI)

| Card | Icon | Title | Description | Features |
|------|------|-------|-------------|----------|
| 1 | Bar chart | `Process Parameter Monitoring` | `Capture temperature, pressure, speed from every cycle. Correlate parameters to quality outcomes.` | `Real-time parameter capture`, `Quality correlation analysis`, `Out-of-spec alerts` |
| 2 | Wrench | `Die/Mold Management` | `Track shot counts, maintenance history, and performance by tool. Predict maintenance needs before failures.` | `Shot count tracking`, `Maintenance scheduling`, `Tool performance trending` |
| 3 | Heartbeat/pulse | `Scrap Analysis` | `Categorize defects by type, correlate to machine, shift, material lot. Find root causes, not just symptoms.` | `Defect categorization`, `Pareto analysis`, `Root cause correlation` |
| 4 | Lightning bolt | `Cycle Time Optimization` | `Real-time cycle time monitoring against standards. Alert on drift and identify bottlenecks.` | `Auto cycle detection`, `Drift alerts`, `OEE calculation` |
| 5 (highlighted) | Shield-check | `BOI Compliance` | `Production-order-level material reconciliation for BOI audits. Track actual material consumption per mold run — essential for co-product and multi-cavity tracking.` | `BOI-ready audit reports`, `Co-product cost allocation`, `Proven: 10M+ THB/yr saved` |

Card 5 styling: border 2px solid rgba(0,175,240,0.3), background linear-gradient(135deg, rgba(0,175,240,0.03), white). Icon background: linear-gradient(135deg, rgba(0,175,240,0.2), rgba(0,175,240,0.1)).

---

## Section 5: Specialized ERP — 7 Metal-Specific Conditions

**Purpose:** Demonstrate deep domain knowledge. These 7 conditions are things generic ERP vendors cannot answer.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #F5F7FA, padding: 100px 0 |
| **Content Row** | Row | Max-width: 1200px, centered |

### Section Header

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `Why Metal & Plastics Manufacturing Needs Specialized ERP` — Noto Sans 700, 36px, #000864 |
| **Subtitle** | Text Module | `7 production realities that generic ERP systems simply cannot handle` — 18px, #5b6b80 |

### Specialized ERP Cards (7 cards)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Grid** | Row | CSS Grid: auto-fit, minmax(320px, 1fr), gap 24px |
| **Each Card** | Group Module | Same solution-card styling, padding 32px |

| # | Icon | Title | Description |
|---|------|-------|-------------|
| 1 | Grid (KG/PC) | `Dual Unit Conversion` | `Track inventory in both KG (raw material) and PCS (finished parts) simultaneously — automatic conversion at every transaction.` |
| 2 | Pulse/wave | `Heat Treatment Outsourcing` | `Manage external processing workflows where parts leave and return — full traceability through the outsourcing cycle.` |
| 3 | Lock/box | `Furnace & Batch Tracking` | `Monitor furnace parameters (temperature, duration, atmosphere) tied to specific batches for quality certification.` |
| 4 | Wrench | `Die & Mold Management` | `Track die/mold lifecycle — usage counts, maintenance schedules, cost allocation across products.` |
| 5 | Box-plus | `Container Quantity Control` | `Manage standard container quantities for efficient warehouse operations and accurate shipping.` |
| 6 | Graph/nodes | `Multi-Process Routing` | `Handle complex routing where parts go through stamping, deburring, plating, and assembly with different cost centers.` |
| 7 | Layers | `Scrap & Yield Management` | `Track material yield rates per operation, auto-calculate scrap costs, and feed back into BOM costing.` |

Each card uses the same Blurb-like pattern: icon (64x64px, gradient background) + title (Noto Sans 700, 18px, #000864) + description (15px, #5b6b80, line-height 1.6).

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Tablet (<=1024px)** | Grid: 2 columns |
| **Mobile (<=640px)** | Grid: 1 column |

---

## Section 6: Ginfong Case Study — Dark Featured Section

**Purpose:** The strongest proof point on the page. Hard numbers that translate directly to business impact.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(135deg, #000864 0%, #001080 50%, #003CC8 100%)`, padding: 100px 0 |
| **Super D** | Code Module | Class: `dw-d-bg dw-d-bg--bottom dw-d-bg--particle`, opacity 0.1 |
| **Content Row** | Row | Max-width: 1000px, centered, z-index 2 |

### Section Header

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Label** | Text Module | `PROVEN RESULTS` — JetBrains Mono, 13px, #00E6FF (cyan accent), uppercase, 0.1em spacing |
| **Headline** | Text Module (H2) | `DigiWin's Metal Industry Track Record` — Noto Sans 700, 36px, white |

### Case Study Card

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Card** | Group Module | Background: rgba(255,255,255,0.06), border 1px solid rgba(255,255,255,0.12), border-radius 20px, padding 48px, backdrop-filter blur(8px) |

### Card Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Label** | Text Module | `CASE STUDY` — JetBrains Mono, 12px, #00AFF0, uppercase, 0.1em spacing |
| **Client Name** | Text Module (H3) | `Ginfong Metal Stamping` — Noto Sans 700, 26px, white |
| **Industry** | Text Module | `Metal stamping / Precision parts manufacturing` — 15px, rgba(255,255,255,0.75) |
| **Stats Row** | Row (2 columns) | Flexbox, gap 32px, flex-wrap, margin-bottom 24px |

### Ginfong Stats

| Stat | Value | Label |
|------|-------|-------|
| 1 | `23%` **to** `34%` | Gross Margin Improvement |
| 2 | `+200%` | Revenue Growth |

Value styling: Noto Sans 800, 40px, #00AFF0. "to" connector: 20px, rgba(255,255,255,0.75).
Label styling: Noto Sans, 13px, rgba(255,255,255,0.75).

### Quote & Solution

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Quote** | Text Module | `"By gaining real-time visibility into per-order costing, Ginfong transformed from a low-margin stamping shop into a precision manufacturing partner."` — 15px, rgba(255,255,255,0.85), italic, border-left 3px solid #00AFF0, padding-left 16px |
| **Solution** | Text Module | **Solution:** `DigiWin ERP with integrated cost management` — 14px, rgba(255,255,255,0.75). "Solution:" bold at rgba(255,255,255,0.9) |

> **Key Data Points (verified):**
> - Gross margin: 23% → 34% (11 percentage point improvement)
> - Revenue growth: +200%
> - Solution: DigiWin ERP with integrated cost management
> - Source: DigiWin official case study materials

---

## Section 7: Process Types We Support

**Purpose:** Show breadth of process coverage — builds confidence that DigiWin isn't limited to one process type.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: 60px 0 |
| **Super D** | Code Module | Class: `dw-d-bg dw-d-bg--corner-tl`, opacity 0.08 |
| **Content Row** | Row | Max-width: 900px, centered, z-index 2 |

### Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H3) | `Process Types We Support` — Noto Sans 700, 24px, #000864, center |
| **Process Badges** | Row (Flexbox) | 8 badges in a wrapping flex row, centered, gap 12px |

### Process Badges

| Badge |
|-------|
| `Stamping` |
| `Injection Molding` |
| `Die Casting` |
| `CNC Machining` |
| `Forging` |
| `Extrusion` |
| `Sheet Metal` |
| `Blow Molding` |

Each badge: Text Module styled as pill — background #F5F7FA, border 1px solid #e2e8f0, border-radius 8px, padding 12px 24px, Noto Sans 500, 14px, #333.

---

## Section 8: Recommended Products for Metal & Plastics

**Purpose:** Link to the 3 most relevant products.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #F5F7FA, padding: 80px 0 |
| **Content Row** | Row | Max-width: 1200px, centered |

### Section Header

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `Recommended Products for Metal & Plastics` |

### Product Cards (3 cards)

| Card | Icon | Title | Description | Link |
|------|------|-------|-------------|------|
| 1 | Sun/rays | `AIoT` | `Machine connectivity for presses, injection molders, and CNC machines. Real-time OEE and process parameter capture.` | `/products/aiot.html` |
| 2 | Machine | `MES` | `Production tracking, quality data collection, scrap analysis, and die/mold management for process manufacturing.` | `/products/mes.html` |
| 3 | Grid/table | `iGP ERP` | `Right-sized ERP for metal and plastics operations with strong inventory and costing capabilities.` | `/products/erp.html` |

---

## Section 9: FAQ — Accordion

**Purpose:** SEO (GEO) content + user confidence for process manufacturing questions.

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
| 1 | What ERP system is best for metal stamping factories in Thailand? | DigiWin offers ERP and MES specifically designed for metal stamping... 15% yield improvement, 30% downtime reduction... |
| 2 | How does DigiWin help reduce scrap in injection molding? | Real-time yield tracking + SPC integration... Pareto analysis, root cause correlation, out-of-spec alerts... |
| 3 | Can DigiWin track mold and die maintenance and shot counts? | Built-in die and mold management module... shot counts, maintenance history, performance trending, predictive maintenance... |
| 4 | Does DigiWin support BOI compliance for metal and plastics manufacturers? | Production-order-level material reconciliation... co-product and multi-cavity tracking... 10M+ THB/year saved... |
| 5 | What process types does DigiWin support? | Stamping, injection molding, die casting, CNC machining, forging, extrusion, sheet metal, blow molding... cycle time optimization, process monitoring, scrap analysis, die/mold management... |

---

## Section 10: CTA — Improve Yield, Reduce Scrap

**Purpose:** Convert process-manufacturing interest into conversation.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Shared CTA section styling |
| **Super D** | Code Module | Class: `dw-d-bg dw-d-bg--left dw-d-bg--gradient`, opacity 0.12 |
| **Wave** | Code Module | Class: `dw-wave-flow`, opacity 0.10 |

### CTA Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `Improve Yield, Reduce Scrap` |
| **Subtitle** | Text Module | `See how DigiWin helps process manufacturers` |
| **Primary Button** | Button Module | `Get in Touch` → `/demo.html` |
| **Secondary Button** | Button Module | `View Other Industries` → `/industries.html` |

---

## Section 11: Related Solutions — Internal Links

**Purpose:** SEO internal linking.

Same pattern as other industry pages. 6 link cards:

| Title | Link |
|-------|------|
| `Automotive` | `/industries/automotive.html` |
| `Electronics Assembly` | `/industries/electronics.html` |
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
| **Ginfong stats** | Number Counter count-up on scroll for `23`, `34`, `200` |
| **Process badges** | Scroll fade-in as a group |
| **BOI card highlight** | Static border glow (not animated) |
| **prefers-reduced-motion** | All animations disabled |

---

## Validation Checklist

- [ ] Skip-to-content link: `#metal-content`
- [ ] `<main id="metal-content">` landmark present
- [ ] `prefers-reduced-motion` disables all animations
- [ ] No low-contrast text on dark backgrounds
- [ ] All SVG icons have `aria-hidden="true"`
- [ ] H1 unique; H2-H3 hierarchy correct
- [ ] Ginfong case study present with verified data: margin 23% → 34%, revenue +200%
- [ ] 7 metal-specific ERP conditions fully documented
- [ ] BOI compliance card has highlighted styling
- [ ] CTA says "Get in Touch" (never "Request Demo")
- [ ] Structured data: WebPage + BreadcrumbList + FAQPage schemas
- [ ] Design tokens used for all colors
- [ ] All links verified to exist
- [ ] FAQ uses Accordion module
- [ ] 8 process types listed: Stamping, Injection Molding, Die Casting, CNC Machining, Forging, Extrusion, Sheet Metal, Blow Molding
- [ ] MES used generically (not product-name-specific)
- [ ] Ginfong quote is attributed with solution context
- [ ] Blueprint SVG decorative backgrounds are `aria-hidden="true"`
