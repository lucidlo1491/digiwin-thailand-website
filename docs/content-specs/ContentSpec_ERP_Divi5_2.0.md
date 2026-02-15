# Content Spec: ERP Product Page — Divi 5 Build (2.0)

**Batch:** 2 (Product Pages)
**PRD Reference:** Section 3.1 — ERP Core: T100 & iGP
**Playbook Reference:** Section 3.2 (Leaf Page Arc — Track A), Section 2.2 (Track A voice), Section 4.1 (Factory Owner Objections), Section 6 (CTA hierarchy)
**Status:** v2.0 — Reverse-engineered from HTML build + mapped to Divi 5 modules
**Last Updated:** February 14, 2026
**Platform:** WordPress + Divi 5

---

## Page Overview

| Element | Specification |
|---------|---------------|
| **Audience** | Track A — Factory operators evaluating ERP options (CFOs, finance managers, plant managers) |
| **Objective** | Show the right ERP for their size (T100 = enterprise, iGP = growth). Lead with financial pain, not features. |
| **URL** | digiwin.co.th/products/erp.html |
| **Emotional Arc** | Leaf Page Arc Track A (Playbook 3.2) — Pain Validation -> Relief/Solution -> Proof -> Gentle Nudge |
| **Page Structure** | 10 sections, ~2065 lines in static build |
| **CTA Language** | "Let's Talk" / "Get in Touch" (NEVER "Request Demo" or "Book a Demo") |

---

## Divi 5 Capabilities Leveraged

| Divi 5 Feature | Where Used | Why |
|----------------|-----------|-----|
| **CSS Grid Layout** | Hero 2-col, Pain grid 2-col, Products 2-col, Capabilities 4-col, Weapon cards auto-fit, BOI callout 2-col | Native responsive grids without custom CSS |
| **Group Module** | Pain cards, Product cards, Weapon cards, Integration nodes, ERPII module cards, Related solution cards | Card-style containers with shared background, border, hover effects |
| **Nested Modules** | Product cards (header + body + features + accordion), Pain cards (problem + solution halves) | Complex card layouts with internal structure |
| **Design Variables** | Colors, fonts, spacing | Define once, reference everywhere across all sections |
| **Interactions System** | Card hovers, scroll fade-ins, stat counters, pill hover state | Built-in scroll-triggered and hover animations replace custom JS |
| **Accordion Module** | ERPII Ecosystem expander, FAQ section | Native expand/collapse without custom JS |
| **Number Counter** | Hero stats (44, 50K+, 100+), BOI callout stat (10M+) | Built-in count-up animation on scroll |
| **Icon List Module** | Product feature checklists (T100, iGP) | Native checkmark lists with per-item icons |
| **Blurb Module** | Capability cards (8 cards with icon + title + text) | Built-in icon/title/body structure fits perfectly |
| **Customizable Breakpoints** | All sections | 7 breakpoints replace the manual 1024/768/640 media queries |
| **Semantic Elements** | Every section | `<section>`, `<nav>`, `<main>` tags for SEO and accessibility |
| **Code Module** | Hero SVG background, Hero dashboard mockup, BOI enforcement alert, Grain textures, Super D background, Particle wave | Complex visual elements that cannot be replicated with native modules |

---

## Design Variables

See Homepage spec (`ContentSpec_Home_Divi5_2.0.md`) for the complete global Design Variables reference (colors, fonts, spacing). All values defined there apply to this page.

**Page-Specific Color Notes:**
| Variable | Value | Usage on This Page |
|----------|-------|-------------------|
| `--dw-red` | #DC2626 | Pain section labels, pain card icons (default state) |
| `--dw-green` | #047857 | Solution labels, dashboard mockup "Today's Output" value |
| `--dw-yellow` | #FFD700 | BOI enforcement alert border and warning icon |
| Amber tones | #92400e, #78350f, #b45309, #a16207 | BOI enforcement text hierarchy (these are contextual, not global tokens) |

---

## Section 1: Hero — Financial Pain First

**Purpose:** Lead with the CFO/finance team's #1 frustration: no real-time cost visibility. Establish DigiWin as manufacturing-specific, not generic.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(165deg, #0f1419 0%, #1a2632 40%, #000864 100%)`, padding: 160px top 100px bottom, `overflow: hidden`, margin-top: 80px (header offset) |
| **Grain Overlay** | Code Module | SVG `feTurbulence` noise filter, `opacity: 0.03`, absolute positioned, pointer-events: none |
| **Super D Background** | Code Module | `.dw-d-bg--center .dw-d-bg--gradient .dw-d-parallax` at `opacity: 0.10` — ERP is the brain at the center |
| **SVG Background** | Code Module | Spreadsheet/dashboard line drawing, right-aligned, 55% width, `opacity: 0.12` |
| **Grid Layout** | Row with CSS Grid | `grid-template-columns: 1fr 1fr`, gap: 60px, align-items: center, max-width: 1200px |
| **Left Column** | Column | Contains all text content + CTAs + stats |
| **Right Column** | Column | Contains dashboard mockup (hidden on tablet/mobile) |

### Left Column Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Badge** | Text Module | `Core System . ERP` — JetBrains Mono, 11px, uppercase, 0.1em spacing, blue pill background (`rgba(0,175,240,0.1)`, border: `1px solid rgba(0,175,240,0.3)`), with pulsing blue dot (`::before` pseudo-element, 8px circle) |
| **Headline** | Text Module (H1) | `Your Finance Team Deserves Better Than` **`Month-End Surprises`** — Noto Sans 700, `clamp(36px, 4.5vw, 52px)`, white. "Month-End Surprises" in `#0369a1` (use Divi inline color) |
| **Subtitle** | Text Module | `Real-time cost visibility. Accurate Bills of Materials. Inventory that matches reality. ERP designed for how manufacturing actually works—not how accountants imagine it does.` — 19px, `rgba(255,255,255,0.8)`, line-height: 1.7 |
| **Primary CTA** | Button Module | `Let's Talk` -> `/demo.html` — `.btn-white` style (white background, dark text) |
| **Secondary CTA** | Button Module | `Compare T100 vs iGP` -> `#products` — `.btn-outline-white` style (transparent bg, white border, anchor link) |
| **Stats Row** | Group Module (nested) | Flexbox row, gap: 40px, border-top: `1px solid rgba(255,255,255,0.1)`, margin-top: 48px, padding-top: 32px |

#### Hero Stats (inside Group)

| Stat | Number | Label | Module |
|------|--------|-------|--------|
| 1 | `44` | Years in Mfg | Number Counter (animated, CSS class `dw-years` for dynamic update) |
| 2 | `50K+` | Factories | Text Module (not a pure number) |
| 3 | `100+` | Thai Sites | Text Module (not a pure number) |

Number styling: Noto Sans 800, 32px, `#0369a1`, -0.02em tracking.
Label styling: JetBrains Mono, 10px, `rgba(255,255,255,0.75)`, uppercase, 0.1em spacing.

### Right Column: Dashboard Mockup (MUST be Code Module)

The dashboard mockup is a complex HTML/CSS composition that cannot be replicated with native Divi modules. It includes:

- Browser chrome with 3 traffic-light dots
- Navigation tabs: Dashboard (active), Production, Inventory, Finance
- 3 metric cards: Today's Output `1,247` (green), Pending Orders `38`, Margin `24.3%` (blue)
- Bar chart with 7 animated bars

**Divi 5 approach:** Code Module containing the full `.erp-dashboard-mockup` HTML/CSS block. Style encapsulated within the module.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | 2-column grid, dashboard mockup visible |
| **Tablet (<=1024px)** | Single column, center-aligned text, dashboard mockup hidden, SVG background reduced to 0.06 opacity |
| **Mobile (<=640px)** | Reduced padding (120px top, 80px bottom), stats stack vertically (flex-direction: column, centered) |

---

## Section 2: GEO Definition Block

**Purpose:** Answer "What is ERP?" for AI engines and first-time visitors. SEO/GEO optimized plain-language definition.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: 40px top 0 bottom |
| **Row** | Row | Max-width: 800px, centered |
| **Heading** | Text Module (H2) | `What is ERP (Enterprise Resource Planning)?` — Noto Sans 700, 22px, `#000864`, center-aligned |
| **Body Text** | Text Module | Full definition paragraph (see content below) — 17px, `#333`, line-height: 1.7 |

### Exact Content

**Heading:** `What is ERP (Enterprise Resource Planning)?`

**Body:** `**DigiWin ERP** is a manufacturing-specific Enterprise Resource Planning system born from 44 years of serving factories across Taiwan, China, and Southeast Asia — regions where manufacturing isn't just an industry, it's the backbone of the economy. Available in two editions — **T100** for enterprise-scale multi-site operations (200+ employees) and **iGP** for growing single-site manufacturers (20–200 employees) — it provides real-time financial control, BOM (Bill of Materials) management, MRP (Material Requirements Planning) and LRP (Lot Requirements Planning), quality management, and complete production traceability. Backed by 50,000+ factory clients and 1,500+ R&D engineers, DigiWin is the most widely deployed manufacturing ERP in Greater China and Southeast Asia — now serving Thai manufacturers directly with a full local team.`

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **All** | Single column, centered, max-width 800px. No layout changes needed. |

---

## Section 3: Pain Points — Problem/Solution Cards

**Purpose:** Validate factory ERP pain points with "Sound Familiar?" empathy. Each card pairs a quoted problem with a concrete DigiWin solution.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: 100px top/bottom |
| **Header** | Row (single column) | Center-aligned text |
| **Section Label** | Text Module | `SOUND FAMILIAR?` — JetBrains Mono, 11px, uppercase, 0.15em spacing, `#DC2626` (red) |
| **Section Title** | Text Module (H2) | `Manufacturing Challenges, Solved` — Noto Sans 700, 40px, `#000864` |
| **Section Subtitle** | Text Module | `Generic ERP wasn't built for factories. These problems disappear when your system understands manufacturing.` — 18px, `#5b6b80`, max-width: 600px |
| **Card Grid** | Row with CSS Grid | `grid-template-columns: repeat(2, 1fr)`, gap: 28px, max-width: 1200px |
| **Each Card** | Group Module | Background: white, border-radius: 20px, padding: 36px, border: `1px solid #e8eef3`, box-shadow: `0 4px 24px rgba(0,0,0,0.04)` |

### Card Internal Structure (each Group Module contains)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Icon** | Code Module or Image Module | 56x56px container, gradient background (`linear-gradient(135deg, #fee2e2, #fecaca)`), border-radius: 14px, SVG icon in red (`#DC2626`) |
| **Problem Label** | Text Module | `THE PROBLEM` — JetBrains Mono, 10px, uppercase, `#DC2626` |
| **Problem Title** | Text Module (H3) | Quoted pain point — Noto Sans 600, 18px, `#000864` |
| **Problem Description** | Text Module | Description — 15px, `#5b6b80`, line-height: 1.65 |
| **Divider** | Divider Module | Dashed, 1px, `#e8eef3` |
| **Solution Label** | Text Module | `DIGIWIN SOLUTION` — JetBrains Mono, 10px, uppercase, `#047857` (green) |
| **Solution Title** | Text Module (H4) | Solution name — Noto Sans 600, 16px, `#000864` |
| **Solution Description** | Text Module | Description — 15px, `#5b6b80`, line-height: 1.65 |

### Pain Card Content (4 cards)

| # | Icon | Problem Quote | Problem Description | Solution Title | Solution Description |
|---|------|--------------|-------------------|----------------|---------------------|
| 1 | Dollar sign (cost) | "We don't know our true costs until month-end" | Standard cost variance buried in accounting entries. Material waste discovered weeks after production. No visibility into real-time margin. | Real-Time Cost Visibility | Actual cost calculated at each production stage. Margin visibility before you ship, not after you invoice. |
| 2 | Document (BOM) | "MRP gives us garbage because our BOMs are outdated" | Engineering changes happen on the floor, not in the system. BOM versions scattered across spreadsheets. | Engineering Change Control | Engineering Change Notice (ECN) workflow ensures changes are captured before production. MRP always runs against current, approved BOMs. |
| 3 | Box (inventory) | "Inventory count never matches the system" | Ghost inventory haunts every audit. Production consumes materials that don't exist. Purchasing reorders what you already have. | Transaction-Level Accuracy | Every material movement captured at source. Barcode scanning enforced at key points. Cycle counting built in. |
| 4 | Search (trace) | "We can't trace quality issues back to their source" | Customer complaints trigger panic investigations. Lot numbers exist somewhere, maybe. Root cause analysis takes weeks. | Complete Traceability | Lot tracking from receiving to shipping. One click shows full genealogy. Quality data linked to batches, machines, operators. |

### Hover Interaction

Card hover: border-color transitions to `#0369a1`, box-shadow becomes `0 12px 48px rgba(0,175,240,0.12)`, icon background transitions to `linear-gradient(135deg, #0369a1, #003CC8)` with white SVG stroke.

Use Divi 5 Interactions System -> Hover -> Transform + Background for these effects.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | 2-column grid |
| **Tablet (<=1024px)** | 1-column grid, max-width: 600px centered |
| **Mobile (<=640px)** | Same as tablet, reduced padding |

---

## Section 4: Two Products Comparison — T100 vs iGP

**Purpose:** Clear segmentation between T100 (enterprise) and iGP (growth). Let visitors self-select.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `#F5F7FA`, padding: 100px top/bottom, ID: `products` (anchor target) |
| **Header Row** | Row (single column) | Center-aligned |
| **Section Label** | Text Module | `CHOOSE YOUR SCALE` — JetBrains Mono, 11px, uppercase, 0.15em spacing, `#0369a1` |
| **Section Title** | Text Module (H2) | `Two ERPs, One Philosophy` — Noto Sans 700, 40px, `#000864` |
| **Section Subtitle** | Text Module | `Manufacturing-first design that grows with your business. Start where you are, scale when ready.` — 18px, `#5b6b80`, max-width: 550px |
| **Use-Case Nav Pills** | Row with Flexbox | Center-justified, gap: 12px, flex-wrap: wrap, margin-bottom: 48px |
| **Each Pill** | Button Module or Text Module with link | Pill-style: padding 10px 22px, white bg, `1px solid #e8eef3`, border-radius: 8px, 13px font. Hover: blue bg + white text |
| **Product Grid** | Row with CSS Grid | `grid-template-columns: repeat(2, 1fr)`, gap: 32px |
| **Each Product Card** | Group Module | White bg, border-radius: 24px, border: `2px solid #e8eef3`, overflow: hidden |

### Use-Case Navigation Pills

| Label | Target |
|-------|--------|
| Warehouse ERP | `#igp-card` |
| Smart Factory | `#t100-card` |
| Cloud ERP | `#igp-card` |
| Financial | `#capabilities` |
| Custom Solutions | `#t100-card` |

> **Semantic note:** Wrap pills in a `<nav aria-label="ERP use cases">` element. Use Divi 5 Semantic Elements setting on the Row.

### Product Card Internal Structure

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Card Header** | Group Module (nested) | Background: `linear-gradient(135deg, #000864, #1a2632)`, padding: 36px 36px 28px, with bottom gradient bar (4px, blue -> light-blue, via `::after` or Divider) |
| **Badge** | Text Module | Pill style: `rgba(0,175,240,0.2)` bg, border, JetBrains Mono 10px uppercase |
| **Product Name** | Text Module (H3) | Noto Sans 700, 32px, white |
| **Tagline** | Text Module | 16px, `rgba(255,255,255,0.75)` |
| **Card Body** | Group Module (nested) | Padding: 36px, white background |
| **Description** | Text Module | 16px, `#000864`, line-height: 1.7 |
| **Feature List** | Icon List Module | Blue checkmark icons (22x22 rounded squares), 15px text, `#000864`, border-bottom separators |
| **Best For Box** | Group Module (nested) | Background: `#F5F7FA`, border-radius: 12px, padding: 20px 24px |
| **Best For Label** | Text Module | JetBrains Mono, 10px, uppercase, `#0369a1` |
| **Best For Text** | Text Module | 14px, `#5b6b80` |

### T100 Card Content

| Element | Content |
|---------|---------|
| **Badge** | `ENTERPRISE SCALE` |
| **Name** | `T100` |
| **Tagline** | `Full ERP for complex operations` |
| **Description** | `Multi-site, multi-currency, multi-company—built for enterprises that need complete control across complex, distributed operations.` |
| **Features** | Multi-company consolidation / Advanced financial reporting / Complex BOM with engineering change control / Enterprise workflow engine / Advanced MRP & production scheduling / Business intelligence dashboards included |
| **Best For** | `200+ employees, multi-site, complex supply chains, group companies needing consolidation` |

**T100-Only Element: Trust Callout Box**

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Group Module (nested) | Background: `#f0f9ff`, border: `1px solid #0369a1`, border-radius: 12px, padding: 24px, Flexbox row with gap: 16px |
| **Icon** | Code Module or Image | 44x44px, gradient blue background, lock/shield SVG icon |
| **Title** | Text Module (H4) | `Your Data Belongs to You` — Noto Sans 700, 16px, `#000864` |
| **Body** | Text Module | `Full source code transfer included. Your system, your data, your independence — no vendor lock-in, ever. Backed by 24/7 e-Service and e-Learning support.` — 14px, `#5b6b80` |

### iGP Card Content

| Element | Content |
|---------|---------|
| **Badge** | `GROWTH STAGE` |
| **Name** | `iGP` |
| **Tagline** | `Right-sized for growing factories` |
| **Description** | `All the manufacturing-specific features you need without the enterprise complexity you don't. Fast to implement, easy to master.` |
| **Features** | Complete financials & inventory / Production planning & MRP / Quality management / Procurement & sales / Standard dashboards / Rapid implementation |
| **Best For** | `20–200 employees, single site, straightforward operations, moving beyond spreadsheets` |

**iGP-Only Element: Proven In Tag**

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Proven In** | Text Module | `Proven across auto parts, food processing, electronics, machinery, fasteners, rubber & plastics, textiles, and many more manufacturing verticals.` — 13px, italic, `#666`, border-top: `1px solid #f0f4f8`, padding-top: 16px, margin-top: 16px |

**iGP-Only Element: ERPII Ecosystem Accordion**

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Accordion** | Accordion Module (or Toggle Module) | Single item, border: `1px solid #e8eef3`, border-radius: 12px |
| **Summary/Title** | Accordion Title | `iGP is more than ERP` — Noto Sans 600, 15px, `#0369a1`, with "+" icon |
| **Content Heading** | Text Module (H4) | `Start with ERP. Expand into Everything.` — Noto Sans 700, 20px, `#000864` |
| **Content Subtitle** | Text Module | `iGP is a complete ERPII platform. Start with financials and production, then add modules as you grow — no system change required.` — 14px, `#5b6b80` |
| **Modules Grid** | Row with CSS Grid (nested inside accordion) | `grid-template-columns: repeat(3, 1fr)`, gap: 16px |
| **Each Module Card** | Blurb Module or Group Module | `#F5F7FA` bg, border-radius: 12px, padding: 16px, center-aligned |

### ERPII Module Cards (6 cards inside accordion)

| # | Abbreviation | Name | Description | Link |
|---|-------------|------|-------------|------|
| 1 | BI / KPI | Business Intelligence | Executive dashboards and balanced scorecard | — |
| 2 | SCM | Supply Chain | End-to-end visibility from supplier to customer | — |
| 3 | PLM | Product Lifecycle | BOM, process, and drawings integration | — |
| 4 | APS | Advanced Planning | Finite capacity scheduling and optimization | — |
| 5 | MES / SFT | Shop Floor | Real-time production tracking and execution | Link to `mes.html` |
| 6 | CRM | Customer Management | Quotation to order to relationship | — |

Abbreviation styling: JetBrains Mono, 10px, uppercase, `#0369a1`.
Name styling: Noto Sans 600, 13px, `#000864`.
Description styling: Noto Sans, 12px, `#5b6b80`.

> **Note:** Use "MES" generically (not sMES/eMES/iMES) per project conventions.

### Product Card Hover Interaction

Card hover: border-color transitions to `#0369a1`, box-shadow becomes `0 20px 60px rgba(0,175,240,0.15)`.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | 2-column product grid, 3-column ERPII modules grid |
| **Tablet (<=1024px)** | 1-column product grid (max-width: 600px centered), 2-column ERPII modules grid |
| **Mobile (<=640px)** | 1-column everything, ERPII modules grid goes single column, pills: smaller font (12px), tighter padding (8px 16px) |

---

## Section 5: Core ERP Capabilities — 8 Blurb Cards

**Purpose:** Feature overview using icon + title + short description format. Visual center: ERP hub with connecting spokes (background decoration).

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: 100px top/bottom, ID: `capabilities` |
| **Background Visual** | Code Module | SVG hub-and-spoke diagram (ERP center with Finance/Inventory/Sales/Purchase nodes), very low opacity (0.08-0.12), absolute positioned, pointer-events: none |
| **Header Row** | Row (single column) | Center-aligned |
| **Section Label** | Text Module | `WHAT'S INSIDE` — JetBrains Mono, 11px, uppercase, 0.15em spacing, `#0369a1` |
| **Section Title** | Text Module (H2) | `Core ERP Capabilities` — Noto Sans 700, 40px, `#000864` |
| **Capabilities Grid** | Row with CSS Grid | `grid-template-columns: repeat(4, 1fr)` on desktop, using existing `.capabilities-grid` pattern |
| **Each Card** | Blurb Module | Icon (48x48, blue gradient background, white SVG stroke) + Title (Noto Sans 600) + Body (Noto Sans 400) |

### Capability Cards Content (8 cards)

| # | Title | Description |
|---|-------|-------------|
| 1 | Financial Control | Multi-currency, multi-company. Real-time cost visibility. Automated consolidation. |
| 2 | Inventory Management | Lot tracking. Multiple locations. Cycle counting. Min/max automation. |
| 3 | Production Planning | MRP engine with advanced scheduling. Capacity planning. Work order dispatch. Schedule optimization. |
| 4 | Quality Management | Incoming, outgoing, and in-process quality checks. Non-conformance tracking. Corrective action management. SPC (Statistical Process Control) integration ready. |
| 5 | Procurement | Supplier management. RFQ/PO workflow. Blanket orders. Receiving inspection. |
| 6 | Sales & CRM | Quotation to order. Available-to-promise checking. Customer credit control. Delivery scheduling. |
| 7 | Reporting & BI | Pre-built manufacturing reports. Custom dashboards. Excel export. Mobile access. |
| 8 | Integration | Native MES/WMS/AIoT connection. API for third-party. EDI for customers. |

> **Note on Background SVG:** The hub-and-spoke SVG (ERP center node with connecting lines to Finance, Inventory, Sales, Purchase corner nodes) is decorative only. Wrap in Code Module with `aria-hidden="true"`, absolute positioning, and `pointer-events: none`. This is purely atmospheric — it adds visual depth but carries no content weight.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | 4-column grid (2 rows of 4) |
| **Tablet (<=1024px)** | 2-column grid |
| **Mobile (<=640px)** | 1-column grid |

---

## Section 6: Technical Advantages — 7 Weapon Cards + BOI Callout + BOI Enforcement Alert

**Purpose:** Differentiate DigiWin ERP from competitors on technical capabilities that matter to Thai manufacturers. This is the "proof" section of the emotional arc.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `#F5F7FA`, padding: 100px top/bottom |
| **Header Row** | Row (single column) | Center-aligned |
| **Section Label** | Text Module | `WHAT SETS DIGIWIN APART` — JetBrains Mono, 13px, uppercase, 0.1em spacing, `#0369a1` |
| **Section Title** | Text Module (H2) | `7 Technical Advantages Built for Real Factories` — Noto Sans 700, 40px, `#000864` |
| **Section Subtitle** | Text Module | `These aren't minor features — they're fundamental architectural capabilities that address real Thai manufacturing challenges.` — 18px, `#666`, max-width: 700px |
| **Weapon Grid** | Row with CSS Grid | `grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))`, gap: 24px |
| **Each Weapon Card** | Group Module | White bg, `1px solid #e8eef3`, border-radius: 20px, padding: 32px |
| **BOI Callout** | Group Module (full width) | Dark gradient background, 2-column grid, margin-top: 48px |
| **BOI Enforcement** | Code Module or Group Module | Amber alert styling, margin-top: 32px |

### Weapon Card Internal Structure

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Header Row** | Group Module (nested, Flexbox) | `align-items: center`, gap: 12px |
| **Icon** | Code Module or Image | 48x48px, `linear-gradient(135deg, rgba(0,175,240,0.15), rgba(0,175,240,0.05))`, border-radius: 12px, SVG icon `#00AFF0` |
| **Title** | Text Module (H3) | Noto Sans 600, 18px, `#000864` |
| **Abbreviation** | Text Module | JetBrains Mono, 11px, uppercase, `#0369a1` |
| **Body** | Text Module | 16px, `#333`, line-height: 1.6 |
| **Differentiator** | Text Module | 14px, `#0369a1`, font-weight: 500 (the competitive comparison line) |

### Weapon Cards Content (7 cards)

| # | Title | Abbreviation | Body | Differentiator |
|---|-------|-------------|------|----------------|
| 1 | Advanced Material Requirements Planning | AMRP | Capacity planning built directly into the ERP. Schedule production based on actual machine capacity, material availability, and labor constraints — all calculated in one system. | Many enterprise ERP systems require a separate advanced planning system (APS) purchase for this capability. |
| 2 | Co-Product Accounting | Multi-Output Work Orders | One work order produces multiple outputs with accurate cost allocation per product. Essential for plastics injection, food processing, and chemical manufacturing. | Most competing ERP systems cannot handle co-product work orders without costly customization. |
| 3 | Lot Requirements Planning | LRP | Calculate material requirements for a specific production order in under one minute. No waiting hours for a full MRP run to answer "can we accept this order?" | Accept or decline orders with confidence — while the customer is still on the phone. |
| 4 | Dual Unit Tracking | Simultaneous UOM Display | Display and track both weight (kg) and quantity (pieces) simultaneously across all transactions. No conversions, no rounding errors, no confusion. | Most mid-market ERP systems can only display one unit of measure at a time. |
| 5 | Shop Floor Mini-Scheduling | Real-Time Floor Adjustments | Floor supervisors adjust production schedules in real-time, and changes are immediately visible to planning. Bridge the gap between the plan and reality. | This bidirectional floor-to-planning visibility is rare in mid-market ERP. |
| 6 | Feature Codes | Multi-Dimension Variants | Manage product variants across up to 3 dimensions (color, size, grade) under a single item code. Turn 27 SKUs into 1 manageable product with full traceability. | Reduces item master complexity by 90%+ for variant-heavy manufacturers. |
| 7 | BOI (Board of Investment) Reconciliation | Production-Order-Level Tracking | Track actual material consumption at the production order level — not theoretical BOM calculations. Generate BOI-ready reports that match what the Board of Investment audits. | No competitor offers production-order-level BOI material reconciliation. |

### Weapon Card Hover Interaction

Hover: border-color transitions to `#00AFF0`, box-shadow becomes `0 12px 40px rgba(0,175,240,0.12)`.

### BOI Callout — Proven Results (Dark Box)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Group Module | Background: `linear-gradient(135deg, #000864, #1e3a5f)`, border-radius: 20px, padding: 48px, CSS Grid: `1fr 1fr`, gap: 48px |
| **Left Column** | Column | Text content |
| **Label** | Text Module | `PROVEN RESULTS` — JetBrains Mono, 12px, uppercase, `#00AFF0` |
| **Title** | Text Module (H3) | `From 10M THB/Year to Zero in Supplementary Taxes` — Noto Sans 700, 28px, white |
| **Body** | Text Module | `When the BOI audited one of our clients, DigiWin's production-order-level reconciliation showed exact material consumption — no gaps, no guesswork. The result: supplementary taxes dropped from over 10 million baht annually to zero.` — 17px, `rgba(255,255,255,0.85)`, line-height: 1.7 |
| **Link** | Button Module (text link style) | `Read the Full Story` -> `/blog/boi-compliance-jin-hai.html` — 15px, `#00AFF0`, with arrow icon |
| **Right Column** | Column | Stat display, center-aligned |
| **Stat Container** | Group Module | `rgba(0,175,240,0.15)` bg, border-radius: 20px, padding: 40px |
| **Primary Stat** | Text Module or Number Counter | `10M+` — JetBrains Mono 700, 56px, `#00AFF0` |
| **Primary Label** | Text Module | `THB/year saved` — 16px, `rgba(255,255,255,0.75)` |
| **Divider** | Divider Module | 40px width, 2px, `#00AFF0`, centered, margin: 16px auto |
| **Secondary Stat** | Text Module | `Zero` — JetBrains Mono 700, 56px, `#15803d` (green) |
| **Secondary Label** | Text Module | `supplementary taxes in 2025` — 16px, `rgba(255,255,255,0.75)` |

### BOI 2026 Enforcement Alert (MUST be Code Module)

This alert uses non-standard amber/warning styling with a complex layout (numbered list items with badge-style numbers, warning icon, and specific amber color hierarchy) that is easier to maintain as a Code Module than to reconstruct from native Divi elements.

| Element | Content |
|---------|---------|
| **Container** | Amber background (`#FFFBEB`), left border: 4px solid `#FFD700`, border-radius: 0 12px 12px 0, padding: 32px |
| **Icon** | Warning triangle SVG (yellow fill, amber stroke) |
| **Title** | `BOI 2026: Enforcement Is Getting Serious` — Noto Sans 700, 20px, `#92400e` |
| **Body** | `The Board of Investment is cracking down on four areas that directly affect your factory:` — 15px, `#78350f` |
| **Item 1** | **Double bookkeeping detection** — Separate systems for BOI vs non-BOI transactions are being flagged. A single integrated system eliminates the risk. |
| **Item 2** | **Inventory mismatch audits** — Physical vs. system stock discrepancies trigger investigations. WMS barcode scanning and cycle counting deliver 95%+ accuracy. |
| **Item 3** | **BOI/non-BOI transaction filing** — Incorrect categorization can lead to privilege revocation. Production-order-level tracking separates BOI from non-BOI transactions automatically. |
| **Item 4** | **Tariff recovery actions** — Non-compliant imports face retroactive duty collection. A full audit trail from receiving to shipping gives you BOI-ready reports on demand. |
| **CTA Link** | `See how DigiWin ERP handles BOI compliance` -> `/blog/boi-compliance-jin-hai.html` — 15px, `#b45309`, with arrow |
| **Source** | `Based on BOI enforcement trends confirmed at DigiWin's January 28, 2026 compliance webinar` — 12px, italic, `#a16207` |

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | Auto-fit grid (2-3 columns for weapon cards), BOI callout 2-column |
| **Tablet (<=1024px)** | Weapon cards stack to 1 column, BOI callout stacks to 1 column (center-aligned) |
| **Mobile (<=768px)** | BOI callout: reduced padding (32px), single column |

---

## Section 7: Integration — ERP That Reaches the Floor

**Purpose:** Show that DigiWin ERP connects beyond the office to the shop floor, warehouse, and IoT layer. Cross-sell MES, WMS, AIoT.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(180deg, #F5F7FA 0%, #ffffff 100%)`, padding: 100px top/bottom |
| **Super D Background** | Code Module | `.dw-d-bg--left .dw-d-bg--medium .dw-d-parallax` — ERP anchors the left side of operations |
| **Inner Container** | Row | Max-width: 1000px, centered, position: relative, z-index: 2 |
| **Header** | Row (single column) | Center-aligned |
| **Section Label** | Text Module | `BEYOND THE OFFICE DOOR` — JetBrains Mono, 11px, uppercase, 0.15em, `#0369a1` |
| **Section Title** | Text Module (H2) | `ERP That Reaches the Floor` — Noto Sans 700, 40px, `#000864` |
| **Section Subtitle** | Text Module | `Most ERP systems end at the office. DigiWin connects directly to your machines, your warehouse, and your shop floor.` — 18px, `#5b6b80` |
| **Integration Visual** | Row with Flexbox | Center-justified, gap: 20px, flex-wrap: wrap, margin-bottom: 48px |
| **Each Node** | Group Module | White bg, `2px solid #e8eef3`, border-radius: 16px, padding: 24px 32px, center-aligned |
| **Arrows** | Text Module | `<->` character or Code Module with arrow SVG, `#0369a1`, 24px |
| **Message Box** | Group Module | White bg, border-radius: 20px, padding: 40px 48px, box-shadow: `0 8px 40px rgba(0,0,0,0.06)`, border: `1px solid #e8eef3`, center-aligned, max-width: 800px |
| **Cross-sell Links** | Row with Flexbox | Center-justified, gap: 16px, flex-wrap: wrap, margin-top: 40px |
| **Each Link** | Button Module (outline style) | White bg, `1px solid #e8eef3`, border-radius: 12px, `#0369a1` text, 14px, with arrow icon |

### Integration Nodes (4 nodes with arrows between)

| Node | Active? | Icon Description |
|------|---------|-----------------|
| ERP | Yes (highlighted) | Grid/dashboard icon — border: `#0369a1`, bg: blue gradient tint, shadow |
| MES | No | Factory bars icon |
| WMS | No | Box/package icon |
| AIoT | No | Gear/sun icon |

Each node icon: 48x48px, `linear-gradient(135deg, #0369a1, #003CC8)` bg, 12px radius, white SVG, centered above label.

### Message Box Content

`One click in ERP releases a work order to the floor. One scan on the floor updates ERP inventory. No batch uploads. No manual reconciliation. **One database. One truth.**`

### Cross-sell Links

| Label | Target |
|-------|--------|
| Explore MES | `mes.html` (relative) |
| Explore WMS | `wms.html` (relative) |
| Explore AIoT | `aiot.html` (relative) |

### Node Hover Interaction

Node hover: border-color transitions to `#0369a1`.
Link hover: border-color `#0369a1`, bg: `rgba(0,175,240,0.05)`, translateY: -2px.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | Horizontal flow: ERP <-> MES <-> WMS <-> AIoT |
| **Tablet (<=1024px)** | Vertical stack (flex-direction: column), arrows rotate 90deg |
| **Mobile (<=640px)** | Same vertical stack, reduced padding |

---

## Section 8: FAQ — Accordion

**Purpose:** Answer the top 5 questions for SEO, GEO (AI engine), and visitor reassurance.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `#f8fafc`, padding: 60px top/bottom |
| **Row** | Row | Max-width: 800px, centered |
| **Title** | Text Module (H2) | `Frequently Asked Questions` — Noto Sans 700, 28px, `#000864`, center-aligned |
| **FAQ Items** | Accordion Module | 5 items, border: `1px solid #e5e7eb`, border-radius: 8px, white background |

### FAQ Content (5 items)

| # | Question | Answer |
|---|----------|--------|
| 1 | What is the difference between T100 and iGP? | T100 is DigiWin's enterprise-tier ERP designed for manufacturers with 200+ employees, multiple sites, and complex multi-company structures. iGP (also known as Workflow ERP) is the growth-tier ERP for single-site manufacturers with 20-200 employees, offering modular purchasing and faster 3-6 month deployments. Both share the same manufacturing DNA and can scale — many customers start with iGP and upgrade to T100 as they grow. |
| 2 | Is DigiWin ERP certified for Thai tax and BOI compliance? | Yes. DigiWin ERP is certified by the Thai Revenue Department for e-Tax filing and includes built-in withholding tax (WHT) workflows, VAT handling, and BOI (Board of Investment) compliance features. The system tracks actual material consumption at the production order level — not theoretical BOM calculations — so your BOI reports match what auditors expect. One customer eliminated over 10 million THB per year in supplementary tax penalties after switching to DigiWin. |
| 3 | How long does a DigiWin ERP implementation take? | iGP implementations typically take 3-6 months for a single-site factory. T100 enterprise implementations take 6-9 months for multi-site operations, which is significantly faster than comparable enterprise ERPs (often 12-18 months). This speed comes from DigiWin's pre-built manufacturing templates refined across 50,000+ factory deployments and 44 years of process knowledge — you're not starting from scratch. |
| 4 | How does DigiWin ERP compare to SAP, Oracle, or Infor for manufacturing? | DigiWin ERP delivers approximately 90% of Tier-1 ERP capability at roughly 70% of the cost, with significantly faster implementation timelines. Unlike horizontal ERPs that serve banks, retailers, and hospitals, DigiWin is built exclusively for manufacturing — with native support for Bill of Materials (BOM) management, shop floor scheduling, quality control, and production costing. These are capabilities that other ERPs typically require expensive customization to achieve, often adding months to the project. |
| 5 | Does DigiWin ERP integrate with MES, WMS, and AIoT? | Yes. All DigiWin products — ERP, MES (Manufacturing Execution System), WMS (Warehouse Management System), and AIoT — are built on the same platform with one shared database. This means no integration middleware or manual reconciliation: production data flows from shop floor machines through MES into ERP financials automatically. When you add a module, it connects instantly because it already shares the same data source. |

### Accordion Styling

| Element | Style |
|---------|-------|
| Question (summary) | Noto Sans 600, 17px, `#000864`, padding: 16px 20px, white bg |
| Toggle icon | `+` character, 20px, `#0369a1`, rotates to `x` when open |
| Answer | Noto Sans 400, 15px, `#333`, line-height: 1.7, padding: 0 20px 16px |

> **Structured Data:** The FAQ schema (JSON-LD) must be added via a Code Module in the `<head>` or via an SEO plugin. The static build already has this structured data.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **All** | Single column, full width within 800px container. No layout changes needed. |

---

## Section 9: CTA — Final Conversion

**Purpose:** Gentle nudge to action. Reassuring language, not pushy.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(135deg, #0369a1 0%, #003CC8 50%, #001080 100%)`, padding: 120px top/bottom, overflow: hidden |
| **Grain Overlay** | Code Module | SVG noise filter, `opacity: 0.02`, absolute positioned |
| **Super D Background** | Code Module | `.dw-d-bg--corner-tl .dw-d-bg--medium` — the brain watching over the decision point |
| **Particle Wave** | Code Module | `.dw-wave-flow` at height: 180px, opacity: 0.35, z-index: 1 |
| **Content Container** | Row | Max-width: 800px, centered, center-aligned, position: relative, z-index: 3 |
| **Title** | Text Module (H2) | `Ready to See What's Possible?` — Noto Sans 700, `clamp(32px, 4vw, 44px)`, white, line-height: 1.2 |
| **Subtitle** | Text Module | `Fill out the form and our team will reach out to discuss your specific manufacturing challenges.` — 19px, `rgba(255,255,255,0.9)`, line-height: 1.6 |
| **Primary CTA** | Button Module | `Get in Touch` -> `/demo.html` — `.btn-white` style |
| **Secondary CTA** | Button Module | `View by Industry` -> `/industries.html` — `.btn-outline-white` style |
| **Button Container** | Group Module (Flexbox) | Center-justified, gap: 20px, flex-wrap: wrap |

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | Standard layout |
| **Mobile (<=640px)** | Buttons stack vertically (flex-direction: column) |

---

## Section 10: Related Solutions — Internal Link Grid

**Purpose:** SEO internal linking and cross-navigation to related product and industry pages.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `#F5F7FA`, padding: 60px top/bottom. **Note:** This section is OUTSIDE `<main>` in the static build. |
| **Row** | Row | Max-width: 1200px, centered |
| **Title** | Text Module (H2) | `Explore Related Solutions` — Noto Sans 600, 28px, `#000864`, center-aligned |
| **Grid** | Row with CSS Grid | `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`, gap: 24px |
| **Each Card** | Group Module (linked) or Blurb Module | White bg, border-radius: 12px, padding: 24px, border: `1px solid #e5e7eb`. Entire card is a link. |

### Related Solution Cards (6 cards)

| # | Title | Description | Link |
|---|-------|-------------|------|
| 1 | MES | Real-time shop floor execution system — OEE tracking, SPC, and paperless work orders. | `/products/mes.html` |
| 2 | WMS | Smart warehouse management with barcode/RFID — from receiving to dispatch with full traceability. | `/products/wms.html` |
| 3 | AIoT | Connect machines directly to your ERP with IoT sensors, edge computing, and AI-powered analytics. | `/products/aiot.html` |
| 4 | Automotive | ERP and MES solutions purpose-built for automotive parts manufacturers and OEM suppliers. | `/industries/automotive.html` |
| 5 | Electronics | Manufacturing software for electronics assembly, SMT lines, and component traceability. | `/industries/electronics.html` |
| 6 | Metal & Plastics | Integrated solutions for die casting, injection molding, and metal fabrication shops. | `/industries/metal-plastics.html` |

Card title: Noto Sans 600, 18px, `#000864`.
Card description: Noto Sans 400, 14px, `#666`, line-height: 1.5.
Card hover: box-shadow transition (`0.3s ease`).

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | 3-column grid |
| **Tablet (<=1024px)** | 2-column grid |
| **Mobile (<=640px)** | 1-column grid |

---

## Scroll Animation Strategy (Divi 5 Interactions)

The static build uses `DigiWinUI.initScrollAnimation()` with IntersectionObserver plus custom CSS transitions. In Divi 5, replace with the built-in **Interactions System**:

| Animation | Divi 5 Interaction | Settings |
|-----------|-------------------|----------|
| Pain cards fade-in on scroll | Scroll -> Fade In | Duration: 400ms, ease, stagger: 70ms between siblings |
| Product cards fade-in | Scroll -> Fade In | Duration: 400ms, ease |
| Capability blurb cards | Scroll -> Fade In | Duration: 400ms, ease, stagger: 70ms |
| Weapon cards fade-in | Scroll -> Fade In | Duration: 400ms, ease, stagger: 70ms |
| Pain card hover lift | Hover -> Transform | translateY: -4px, border-color change, box-shadow change |
| Product card hover lift | Hover -> Transform | translateY: 0 (no lift), border-color to blue, box-shadow increase |
| Weapon card hover | Hover -> Transform | border-color to `#00AFF0`, box-shadow increase |
| Integration node hover | Hover -> Border Color | border-color to `#0369a1` |
| Integration link hover | Hover -> Transform | translateY: -2px, border-color change |
| Use-case pill hover | Hover -> Background + Color | bg: `#0369a1`, text: white, border-color: `#0369a1` |
| Hero stats count-up | Number Counter module | Built-in count animation on viewport entry |
| BOI stat (10M+) count-up | Number Counter module | Animated on viewport entry |
| Hero content entrance | Scroll -> Slide Up + Fade In | Duration: 800ms, ease-out |
| Hero stats entrance | Scroll -> Fade In | Delay: 500ms, duration: 1000ms |

> **Divi 5 replaces** the custom JavaScript for scroll animations entirely. No inline `<script>` needed for animation triggers.

---

## Page-Specific JavaScript

| Component | Static Build | Divi 5 Equivalent |
|-----------|-------------|-------------------|
| Scroll animations | `DigiWinUI.initScrollAnimation()` | Divi 5 Interactions -> Scroll Effects |
| ERPII accordion toggle | `<details>/<summary>` HTML | Accordion Module (native) |
| FAQ accordion toggle | `<details>/<summary>` HTML | Accordion Module (native) |
| Smooth scroll (anchor links) | CSS `scroll-behavior: smooth` | Divi 5 handles anchor scrolling natively |
| Dynamic year calculation | `dw-years` class + `digiwin-dynamic.js` | Code Module snippet or Divi 5 Dynamic Content |
| Use-case pills | Anchor links | Native anchor links (no JS needed) |

> **Only remaining custom JS:** Dynamic year calculation (`44` = current year - 1982). Options: (a) Divi 5 Dynamic Content field, (b) tiny Code Module snippet, or (c) manually update annually.

---

## Sections That MUST Remain as Code Modules

These elements cannot be adequately replicated with native Divi 5 modules and must use Code Modules:

| Element | Reason | Section |
|---------|--------|---------|
| **Hero SVG Background** | 20+ SVG elements forming a spreadsheet/dashboard wireframe decoration | Section 1 |
| **Hero Dashboard Mockup** | Complex HTML/CSS composition with traffic-light dots, nav tabs, metric cards, bar chart | Section 1 |
| **Grain Texture Overlays** | SVG `feTurbulence` noise filter with animation (`grain 8s steps(10) infinite`) | Sections 1, 9 |
| **Super D Backgrounds** | Brand graphic system elements (`.dw-d-bg` variants) with parallax | Sections 1, 7, 9 |
| **Particle Wave** | `.dw-wave-flow` animated element | Section 9 |
| **Capabilities Hub SVG** | Large background SVG (ERP hub with Finance/Inventory/Sales/Purchase nodes) | Section 5 |
| **BOI Enforcement Alert** | Complex amber-themed alert with numbered list badges, warning icon, source citation | Section 6 |
| **Pain Card Icons** | SVG icons with hover color transitions (red -> blue gradient) | Section 3 |
| **Integration Node Icons** | SVG icons inside gradient containers | Section 7 |
| **Weapon Card Icons** | SVG icons inside gradient containers | Section 6 |

> **Post-Launch Optimization:** Consider converting Hero SVG background and Capabilities Hub SVG to Lottie animations for better performance. The dashboard mockup could potentially be replaced with a real screenshot once the product is configured.

---

## Structured Data (JSON-LD)

The static build includes three JSON-LD blocks. These must be preserved in the Divi 5 build via a Code Module in the page head (or via an SEO plugin like Yoast/RankMath):

1. **SoftwareApplication** — ERP product schema with name, category, description, feature list, provider
2. **BreadcrumbList** — Home > Products > ERP: T100 & iGP
3. **FAQPage** — All 5 FAQ questions and answers

These are critical for GEO (Generative Engine Optimization) and rich snippets.

---

## Open Graph & Meta

| Tag | Value |
|-----|-------|
| **Title** | ERP: T100 & iGP - Manufacturing ERP Built for Factories \| DigiWin Thailand |
| **Description** | Enterprise Resource Planning designed for manufacturing. T100 for enterprise scale, iGP for growing factories. Financial control, BOM management, MRP planning. |
| **OG Image** | `https://www.digiwin.co.th/assets/og-default.jpg` (replace with ERP-specific image when available) |
| **Canonical** | `https://www.digiwin.co.th/products/erp.html` |

---

## Accessibility Requirements

| Requirement | Implementation |
|-------------|---------------|
| **Skip Link** | `<a href="#erp-content" class="dw-skip-link">Skip to content</a>` — must be the first focusable element after the header |
| **Main Landmark** | `<main id="erp-content">` wraps all content sections (1-9). Section 10 (Related Solutions) is outside main. |
| **Heading Hierarchy** | H1 (hero) -> H2 (each section) -> H3 (card titles) -> H4 (solution titles, trust callout). No skipped levels. |
| **SVG Decorations** | All decorative SVGs have `aria-hidden="true"` |
| **Link Text** | All links have descriptive text (no "click here"). Arrow icons are decorative only. |
| **Color Contrast** | All text on dark backgrounds meets WCAG AA. Minimum opacity 0.75 for text on dark (`rgba(255,255,255,0.75)` minimum). |
| **Reduced Motion** | `@media (prefers-reduced-motion: reduce)` disables all animations and transitions (already in static build) |
| **Nav Landmark** | Use-case pills wrapped in `<nav aria-label="ERP use cases">` |
| **Accordion** | Divi 5 Accordion Module provides native keyboard support and ARIA attributes |

---

## Validation Checklist (Divi 5 Build)

- [ ] Hero renders with 2-column grid on desktop, single column on mobile
- [ ] Dashboard mockup visible on desktop, hidden on tablet/mobile
- [ ] Hero badge with pulsing blue dot renders correctly
- [ ] "Month-End Surprises" displays in blue highlight color
- [ ] All 3 hero stats display with correct values and labels
- [ ] Dynamic year (44) calculates correctly from 1982
- [ ] GEO definition block renders below hero
- [ ] All 4 pain cards render in 2-column grid
- [ ] Pain card hover: icon background transitions from red to blue
- [ ] Pain card problem/solution sections separated by dashed divider
- [ ] Use-case navigation pills render and anchor-link to correct targets
- [ ] T100 and iGP product cards render side by side on desktop
- [ ] T100 card includes "Your Data Belongs to You" trust callout
- [ ] iGP card includes "Proven In" verticals tag
- [ ] iGP ERPII accordion expands/collapses with 6 module cards (3-col grid)
- [ ] MES link inside ERPII accordion points to `mes.html`
- [ ] All 8 capability blurb cards render in responsive grid
- [ ] Capabilities background SVG renders at low opacity (decorative only)
- [ ] All 7 weapon cards render in auto-fit grid
- [ ] BOI callout dark box renders with 2-column layout (text + stat)
- [ ] BOI stat shows "10M+" and "Zero" with correct colors (blue and green)
- [ ] "Read the Full Story" link points to `/blog/boi-compliance-jin-hai.html`
- [ ] BOI 2026 enforcement alert renders with amber styling and numbered items
- [ ] Integration section shows ERP <-> MES <-> WMS <-> AIoT flow
- [ ] "One database. One truth." message box renders centered
- [ ] Cross-sell links (Explore MES/WMS/AIoT) point to correct pages
- [ ] All 5 FAQ accordion items expand/collapse correctly
- [ ] CTA says "Get in Touch" (NOT "Request Demo" or "Book a Demo")
- [ ] Secondary CTA "View by Industry" links to `/industries.html`
- [ ] All 6 related solution cards link to pages that exist
- [ ] Super D backgrounds render at correct positions (center, left, corner-tl)
- [ ] Grain texture overlays render subtly on dark sections
- [ ] Particle wave animation plays in CTA section
- [ ] All JSON-LD structured data blocks are present
- [ ] Skip-to-content link is first focusable element
- [ ] `<main>` landmark wraps sections 1-9
- [ ] `prefers-reduced-motion` query disables all animations
- [ ] No horizontal scroll on any breakpoint
- [ ] Page loads under 3 seconds on 4G connection
- [ ] Colors match Design Variables exactly
- [ ] Fonts load: Noto Sans, JetBrains Mono

---

## Issues Found During Reverse-Engineering

| Issue | Severity | Recommendation |
|-------|----------|----------------|
| **Capabilities grid CSS classes referenced but not fully defined in inline styles** | Low | The `.capabilities-grid`, `.capability-card`, `.capability-icon`, `.capability-title`, `.capability-desc` classes are used in HTML but their CSS is in the shared `styles.css`, not the inline `<style>`. Divi 5 build should define all styles per-module. |
| **BOI callout has inline styles instead of classes** | Low | The entire BOI callout section (dark box) and weapon cards use inline `style` attributes. In Divi 5, these become module design settings — cleaner. |
| **Related Solutions section is outside `<main>`** | Bug | Technically an accessibility issue — all visible content should be within a landmark. In Divi 5, ensure this section is inside the page's main content area. |
| **Use-case pills are anchor links to IDs** | Info | Verify that Divi 5 anchor scrolling works smoothly with these IDs (`#igp-card`, `#t100-card`, `#capabilities`). |
| **44 hardcoded in some places** | Low | Use Divi 5 Dynamic Content or a single Code Module snippet for the year number everywhere. |
| **Integration link paths are relative (`mes.html`)** | Low | In Divi 5, ensure these resolve correctly. May need full paths (`/products/mes.html`). |

---

## Open Questions for Peter

1. **Dashboard mockup:** Keep the HTML/CSS mockup, or replace with a real T100 screenshot for the Divi build?
2. **Weapon cards:** Current build has 7 cards in auto-fit grid. Should the 7th (BOI) card span full width to avoid orphan layout, or is the current auto-fit acceptable?
3. **ERPII accordion:** The accordion is currently inside the iGP card. Should it be a standalone element below both cards instead, for better mobile readability?
4. **BOI enforcement alert:** Keep as Code Module (easiest), or reconstruct from native Divi modules (more maintainable long-term)?
5. **SVG background illustrations:** Keep the complex decorative SVGs, or replace with simpler/static versions for easier Divi maintenance?

---

*This spec supersedes the Divi 5-relevant portions of `ContentSpec_ERP_1.0.md` (Feb 13 draft). The 1.0 spec documents the HTML build; this 2.0 spec maps the same content to Divi 5 modules for WordPress migration.*
