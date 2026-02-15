# Content Spec: Automotive Parts Manufacturing Page — Divi 5 Build (2.0)

**Batch:** 2 (Industry Pages)
**PRD Reference:** Section 4, Page 4.1
**Playbook Reference:** Section 2 (Track A — Factory Operators)
**Status:** v2.0 — Reverse-engineered from HTML build + mapped to Divi 5 modules
**Last Updated:** February 14, 2026
**Platform:** WordPress + Divi 5

---

## Page Overview

| Element | Specification |
|---------|---------------|
| **Audience** | Track A — Automotive parts factory operators (tier 1-3 suppliers) |
| **Objective** | Convince automotive suppliers that DigiWin understands their OEM-driven reality |
| **URL** | digiwin.co.th/industries/automotive.html |
| **Emotional Arc** | Empathetic ("the stakes are high") → Confident ("we solve it") → Proof ("verified results") → Action |
| **Page Structure** | 9 sections: Hero, Context, Stakes, Solutions, Products, Proven Results, Track Record, FAQ, CTA + Related Solutions |
| **Key Constraint** | NO Toyota/Honda/Denso references (not verified DigiWin clients). Named case studies are Asia-based (Zhejiang Yahu, Ningbo GREAT, Wieson Automotive) — framed as "Asia track record," not Thai clients. |

---

## Divi 5 Capabilities Leveraged

| Divi 5 Feature | Where Used | Why |
|----------------|-----------|-----|
| **CSS Grid Layout** | Solutions grid (2x2), Results grid (4x2), Track record (3-col) | Native responsive grids |
| **Group Module** | Stake cards, Solution cards, Result cards, Track record cards | Card containers with complex content |
| **Number Counter** | Hero stats, Results metrics | Animated count-up on scroll |
| **Icon List Module** | Solution feature lists | Checkmark lists per solution |
| **Accordion Module** | FAQ section (5 items) | Native `<details>/<summary>` behavior |
| **Interactions System** | Card hovers, scroll reveals | Replace custom JS animations |
| **Design Variables** | Colors, fonts, spacing | Brand consistency |
| **Semantic Elements** | All sections | Accessibility compliance |

---

## Design Variables (Global Reference)

See `ContentSpec_Home_Divi5_2.0.md` for full Design Variables table. This page uses the same global tokens.

---

## Section 1: Hero — Centered Dark

**Purpose:** Establish automotive-specific expertise with urgency-driven stats.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Same dark hero gradient as Industries Hub: `linear-gradient(165deg, #0f1419 0%, #1a2632 40%, #000864 100%)`, min-height auto, padding: 160px 0 120px |
| **Super D** | Code Module | Class: `dw-d-bg dw-d-bg--left dw-d-bg--gradient`, opacity 0.14 |
| **Content Row** | Row | Max-width: 1200px, centered, text-align center, z-index 2 |

### Hero Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Badge** | Text Module | `AUTOMOTIVE PARTS MANUFACTURING` — Same pill styling as Industries Hub hero badge |
| **Headline** | Text Module (H1) | `Built for What` **`OEMs Demand`** — "OEMs Demand" in #00AFF0. Noto Sans 700, clamp(36px, 4.5vw, 52px), white |
| **Subtitle** | Text Module | `JIT delivery. Complete traceability. EDI integration. Thailand is ASEAN's automotive hub—we help tier 1-3 suppliers stay competitive.` — 18px, rgba(255,255,255,0.75), line-height 1.7 |
| **Stats Row** | Row (3 columns) | Flexbox, gap 48px, border-top 1px solid rgba(255,255,255,0.1), padding-top 40px |

### Hero Stats (8 sourced metrics — 3 shown in hero)

| Stat | Value | Label | Module |
|------|-------|-------|--------|
| 1 | `500+` | Auto suppliers served | Number Counter |
| 2 | `100%` | Traceability coverage | Text Module (not Number Counter — it's a percentage statement) |
| 3 | `99.5%` | On-time delivery | Number Counter |

Value styling: Noto Sans 800, 36px, #00AFF0.
Label styling: JetBrains Mono, 11px, rgba(255,255,255,0.75), uppercase.

---

## Section 2: Context — Thailand's Automotive Landscape

**Purpose:** Set the market context with Thailand-specific data.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: 80px 0, same shared `.context-section` styling |
| **Content Row** | Row | Max-width: 800px, centered |

### Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `Thailand: ASEAN's Detroit` — Noto Sans 700, 36px, #000864 |
| **Body** | Text Module | `Thailand produces **1.9 million vehicles annually**, making it the largest automotive manufacturing hub in Southeast Asia. Behind every vehicle are **2,500+ tier 1-3 suppliers** facing relentless demands: perfect quality, complete traceability, and JIT delivery windows measured in hours, not days. DigiWin has spent 20+ years helping these suppliers meet—and exceed—OEM expectations.` — 17px, #333, line-height 1.7. Bold tags on key numbers. |

---

## Section 3: Stakes — The Automotive Stakes Are High

**Purpose:** Name the pain directly — create "they understand us" reaction.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #F5F7FA, padding: 100px 0 |
| **Blueprint Background** | Code Module | SVG automotive production line (STAMP → WELD → PAINT → ASSEM → QC stations with arrows), decorative, aria-hidden |
| **Content Row** | Row | Max-width: 1100px, centered, z-index 2 |

### Section Header

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `The Automotive Stakes Are High` — Noto Sans 700, 36px, #000864 |
| **Subtitle** | Text Module | `In automotive, there's no room for "good enough"` — 18px, #5b6b80 |

### Stake Cards (3 cards)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Grid** | Row | CSS Grid: 3 columns, gap 32px |
| **Each Card** | Blurb Module | Same challenge-card styling (border, border-radius 16px, padding, icon box) |

| Card | Icon | Title | Description |
|------|------|-------|-------------|
| 1 | Clock | `JIT or Else` | `Miss one delivery window and the OEM stops the line. The penalty isn't a warning—it's the cost of that downtime, plus losing the contract entirely.` |
| 2 | Search | `Trace or Lose` | `A quality issue surfaces. OEM asks: which lot? Which raw materials? Which operator? If you can't answer in hours, you're not a tier-1 supplier anymore.` |
| 3 | Clipboard | `Audit Anxiety` | `IATF 16949. Customer audits quarterly. Documentation requirements that keep growing. Manual systems simply can't keep up.` |

---

## Section 4: Solutions — How DigiWin Solves It

**Purpose:** Present the 4 core automotive capabilities with feature lists.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: 100px 0 |
| **Super D** | Code Module | Class: `dw-d-bg dw-d-bg--corner-br`, opacity 0.08 |
| **Content Row** | Row | Max-width: 1200px, centered, z-index 2 |

### Section Header

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `How DigiWin Solves It` |
| **Subtitle** | Text Module | `Purpose-built capabilities for automotive supply chain` |

### Solution Cards (2x2 grid)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Grid** | Row | CSS Grid: 2 columns, gap 24px |
| **Each Card** | Group Module | Background: white, border 1px solid #e2e8f0, border-radius 16px, padding 32px. Contains icon, title, description, feature list. |

| Card | Icon | Title | Description | Features |
|------|------|-------|-------------|----------|
| 1 | Target circles | `OEM EDI Integration` | `Electronic exchange of forecasts, POs, and delivery confirmations with your OEM customers. No manual data entry, no missed signals.` | `Receive forecasts & POs automatically`, `Send ASN & delivery confirmations`, `Quality data exchange` |
| 2 | Tag | `Lot-Level Traceability` | `Track every component from receiving through shipping. Answer "where did this part go?" in seconds, not days.` | `Forward & backward traceability`, `Barcode/QR code scanning`, `Recall scope analysis` |
| 3 | Calendar | `Kanban & JIT Scheduling` | `Production scheduling that understands kanban signals, sequence orders, and delivery windows.` | `Plan backwards from ship date`, `Sequence delivery support`, `Multi-plant coordination` |
| 4 | Checkmark-square | `Quality Documentation` | `PPAP support. Control plans. Inspection records. SPC data. All captured digitally, all audit-ready.` | `IATF 16949 compliance`, `SPC charts & analysis`, `8D reporting` |

Feature lists use **Icon List Module** with blue checkmark icons per item.

---

## Section 5: Recommended Products for Automotive

**Purpose:** Link to the specific products relevant for automotive.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #F5F7FA, padding: 80px 0 |
| **Content Row** | Row | Max-width: 1200px, centered |

### Section Header

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `Recommended Products for Automotive` |

### Product Cards (3 cards)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Grid** | Row | CSS Grid: 3 columns, gap 24px |
| **Each Card** | Group Module (as link) | Same product-card styling used site-wide |

| Card | Icon | Title | Description | Link |
|------|------|-------|-------------|------|
| 1 | Grid/table | `T100 ERP` | `Multi-site, multi-currency ERP with automotive-specific modules for EDI, JIT scheduling, and supplier management.` | `/products/erp.html` |
| 2 | Machine | `MES` | `Full traceability, quality data collection, and real-time production visibility for automotive precision requirements.` | `/products/mes.html` |
| 3 | Box/cube | `sFLS WMS` | `FIFO enforcement, lot tracking, and sequence delivery support for JIT warehouse operations.` | `/products/wms.html` |

---

## Section 6: Proven Automotive Results

**Purpose:** Present 8 sourced metrics with quantified outcomes.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #F5F7FA, padding: 80px 5% |
| **Content Row** | Row | Max-width: 1200px, centered |

### Section Header

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Label** | Text Module | `VERIFIED RESULTS` — JetBrains Mono, 13px, 500, #00AFF0, uppercase, 0.1em spacing |
| **Headline** | Text Module (H2) | `Proven Automotive Results` — Noto Sans 700, 36px, #000864 |
| **Subtitle** | Text Module | `Measurable outcomes from DigiWin's 1,000+ automotive implementations across Asia.` — 18px, #666, max-width 680px |

### Results Grid (4x2 = 8 cards)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Grid** | Row | CSS Grid: 4 columns, gap 24px |
| **Each Card** | Group Module | Background: white, border-radius 12px, padding 32px 24px, text-align center, border 1px solid #e5e7eb |

| # | Value | Title | Description |
|---|-------|-------|-------------|
| 1 | `-30%` | R&D Cycle Time | Faster product development from design through production validation |
| 2 | `+35%` | On-Time Delivery | Improved JIT compliance protecting OEM contracts and preventing line-stop penalties |
| 3 | `30-60%` | Inventory Reduction | Lower carrying costs through precise demand planning and WMS integration |
| 4 | `100%` | Quality Traceability | Full lot tracking from raw material to finished product — zero traceability gaps |
| 5 | `60→80%+` | OEE Improvement | Equipment effectiveness gains through real-time MES monitoring and downtime analysis |
| 6 | `+40%` | Planning Accuracy | More precise production scheduling reducing overtime and rush orders |
| 7 | `-25%` | Scrap Rate | Lower material waste through quality control at every production stage |
| 8 | `Weeks→Days` | Month-End Closing | Automated cost accounting and financial consolidation across plants |

Value styling: Noto Sans 700, 40px, #0369a1, line-height 1.
Title styling: Noto Sans 600, 15px, #000864, margin-bottom 6px.
Description styling: Noto Sans, 13px, #666, line-height 1.5.

> **Divi 5 Note:** Use Text modules for all values (not Number Counter) since most contain special characters like `→`, `%+`, ranges. The animated scroll-reveal per card provides sufficient visual interest.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Tablet (<=1024px)** | Grid: 2 columns |
| **Mobile (<=600px)** | Grid: 1 column |

---

## Section 7: DigiWin's Automotive Track Record Across Asia

**Purpose:** Provide named customer references (Asia-based, not Thai-specific).

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: 80px 5% |
| **Content Row** | Row | Max-width: 1000px, centered |

### Section Header

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Label** | Text Module | `CUSTOMER REFERENCES` — JetBrains Mono, 13px, 500, #00AFF0, uppercase, 0.1em spacing |
| **Headline** | Text Module (H2) | `DigiWin's Automotive Track Record Across Asia` — Noto Sans 700, 36px, #000864 |
| **Subtitle** | Text Module | `DigiWin's automotive expertise spans 1,000+ implementations across Asia. Here's what our automotive clients have achieved:` — 18px, #666, max-width 700px |

### Track Record Cards (3 cards)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Grid** | Row | CSS Grid: 3 columns, gap 24px |
| **Each Card** | Group Module | Background: #F5F7FA, border-radius 12px, padding 32px, border-left 4px solid (accent color varies) |

| Card | Accent Color | Tag | Client Name | Description |
|------|-------------|-----|-------------|-------------|
| 1 | #00AFF0 (Smart Blue) | `ERP + MES` | `Zhejiang Yahu Auto Parts` | `Inventory reduced from 30M to 12M RMB through integrated ERP + MES — a 60% reduction achieved by connecting planning with real-time shop floor data.` |
| 2 | #02D28C (Green) | `ERP + MES` | `Ningbo GREAT Automotive` | `Full lot traceability from raw material to finished product — zero recall failures. Every component tracked through the entire production chain.` |
| 3 | #644CE6 (Purple) | `MES` | `Wieson Automotive Electronics` | `MES integration achieving real-time production monitoring across multiple lines — connecting machine data to management decisions instantly.` |

Tag styling: JetBrains Mono, 12px, 500, uppercase, 0.08em spacing, #0369a1.
Client name: Noto Sans 700, 18px, #000864.
Description: Noto Sans, 15px, #333, line-height 1.6.

> **Important:** These are verified Asia-based references. Do NOT add Toyota, Honda, Denso, or any unverified OEM names. Frame as "Asia track record" — not Thai-specific clients.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Mobile (<=768px)** | Grid: 1 column |

---

## Section 8: FAQ — Accordion

**Purpose:** Answer common automotive ERP questions for SEO (GEO) and user confidence.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #f8fafc, padding: 60px 0 |
| **Content Row** | Row | Max-width: 800px, centered |
| **Headline** | Text Module (H2) | `Frequently Asked Questions` — Noto Sans 700, 28px, #000864, center |
| **FAQ Items** | Accordion Module | 5 items, native `<details>/<summary>` |

### FAQ Items

| # | Question | Answer (abbreviated — full text in HTML source) |
|---|----------|--------|
| 1 | What ERP system do automotive parts factories in Thailand use? | DigiWin is the ERP of choice for over 500 automotive tier 1-3 suppliers... |
| 2 | Does DigiWin ERP support EDI for automotive supply chains? | Yes. DigiWin ERP supports EDI integration... |
| 3 | Does DigiWin support IATF 16949 quality documentation? | Yes. DigiWin includes built-in quality management modules... |
| 4 | How does DigiWin help with automotive lot traceability? | DigiWin delivers 100% traceability coverage... |
| 5 | What is the typical ROI timeline for automotive ERP? | DigiWin customers in the automotive sector typically see measurable results within the first year... |

Styling: Summary — Noto Sans 600, 17px, #000864, padding 16px 20px, white background. Content — Noto Sans, 15px, #333, line-height 1.7. Plus/minus icon indicator.

> **Divi 5 Note:** Use the native Accordion module with nested Text modules for answers. Structured data (FAQPage schema) is already in the HTML head for SEO.

---

## Section 9: CTA — Meet OEM Demands

**Purpose:** Convert automotive-specific interest into a conversation.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Shared CTA section styling |
| **Super D** | Code Module | Class: `dw-d-bg dw-d-bg--particle`, opacity 0.12 |
| **Wave** | Code Module | Class: `dw-wave-flow`, opacity 0.10 |

### CTA Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `Meet OEM Demands with Confidence` |
| **Subtitle** | Text Module | `See how DigiWin helps Thailand's top automotive suppliers` |
| **Primary Button** | Button Module | `Get in Touch` → `/demo.html` |
| **Secondary Button** | Button Module | `View Other Industries` → `/industries.html` |

---

## Section 10: Related Solutions — Internal Links

**Purpose:** SEO internal linking to related pages.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #F5F7FA, padding: 60px 5% |
| **Content Row** | Row | Max-width: 1200px, centered |
| **Headline** | Text Module (H2) | `Explore Related Solutions` — Noto Sans 600, 28px, #000864, center |
| **Link Grid** | Row | CSS Grid: auto-fit, minmax(280px, 1fr), gap 24px |

### Link Cards (6 cards)

| Title | Description | Link |
|-------|-------------|------|
| `Electronics Assembly` | Manufacturing software for electronics assembly, SMT lines, and component traceability. | `/industries/electronics.html` |
| `Metal & Plastics` | Integrated solutions for die casting, injection molding, and metal fabrication shops. | `/industries/metal-plastics.html` |
| `ERP` | End-to-end manufacturing ERP built for Thai factories — from BOM to financials to BOI compliance. | `/products/erp.html` |
| `MES` | Real-time shop floor execution system — OEE tracking, SPC, and paperless work orders. | `/products/mes.html` |
| `WMS` | Smart warehouse management with barcode/RFID — from receiving to dispatch with full traceability. | `/products/wms.html` |
| `AIoT` | Connect machines directly to your ERP with IoT sensors, edge computing, and AI-powered analytics. | `/products/aiot.html` |

Each card: Group Module as link, padding 24px, white background, border-radius 12px, border 1px solid #e5e7eb.

---

## Animation Strategy

| Animation | Divi 5 Implementation |
|-----------|----------------------|
| **Hero entrance** | Slide-up 0.8s ease-out |
| **Badge pulse dot** | CSS `@keyframes pulse-dot 2s ease-in-out infinite` |
| **Stake cards** | Scroll fade-in, stagger 0.07s |
| **Solution cards** | Scroll fade-in, stagger 0.07s |
| **Result cards** | Scroll fade-in, stagger 0.07s |
| **Track record cards** | Scroll fade-in, stagger 0.07s |
| **Card hovers** | Border-color change + box-shadow, 0.3s ease |
| **prefers-reduced-motion** | All animations disabled |

---

## Validation Checklist

- [ ] Skip-to-content link: `#auto-content`
- [ ] `<main id="auto-content">` landmark present
- [ ] `prefers-reduced-motion` disables all animations
- [ ] No low-contrast text on dark backgrounds
- [ ] All SVG icons have `aria-hidden="true"`
- [ ] H1 unique; H2-H3 hierarchy correct
- [ ] NO Toyota/Honda/Denso references anywhere
- [ ] Named case studies are Asia-based only: Zhejiang Yahu, Ningbo GREAT, Wieson
- [ ] 8 sourced metrics present in Results section
- [ ] CTA says "Get in Touch" (never "Request Demo")
- [ ] Structured data: WebPage + BreadcrumbList + FAQPage schemas
- [ ] Design tokens used for all colors
- [ ] All links verified to exist
- [ ] FAQ uses Accordion module (not custom JS)
- [ ] Blueprint SVG decorative backgrounds are `aria-hidden="true"`
