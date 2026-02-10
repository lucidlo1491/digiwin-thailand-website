# Content Spec: Products End-User Hub (PRD Section 3.0)

**Batch:** Batch 2
**PRD Reference:** Section 3.0 — Products (End-User Hub)
**Playbook Reference:** Section 3.1 (Hub Page Arc), Section 2.2 (Track A voice), Section 6 (CTA hierarchy)
**Status:** v1.0 — Reverse-engineered from HTML build
**Last Updated:** February 10, 2026

---

## Page Overview

**Audience:** Factory operators — production managers, plant managers, CFOs
**Objective:** Route visitors to the right product based on their pain point. Establish authority as a manufacturing-only ecosystem provider.
**URL:** digiwin.co.th/products.html
**Emotional Arc:** Hub Page Arc (Playbook 3.1) — Authority → Discovery → Clarity → Action

---

## Section 1: Hero

**Purpose:** Establish manufacturing authority and introduce the complete product stack

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column grid (1fr 1fr), 80px gap. Left = content, Right = animated stack visual (hidden on tablet/mobile) |
| **Background** | Dark gradient: `linear-gradient(165deg, #0f1419 0%, #1a2632 40%, #253B50 100%)` with grain overlay (0.03 opacity), radial glow overlays (blue + violet) |
| **Padding** | 160px top, 120px bottom. Min-height: 85vh. Flex centered. |
| **Background illustration** | SVG: Factory building silhouette, data stream lines (animated dashes), floating data nodes (animated y-position), circuit board pattern, conveyor belt representation |

| Element | Content |
|---------|---------|
| **Badge** | `Complete Manufacturing Intelligence Stack` (JetBrains Mono, 11px, uppercase, with pulsing blue dot) |
| **Headline** | `Manufacturing Software by` `Manufacturing Experts` (highlight span in #3798E4) |
| **Subtitle** | `From ERP to shop floor, one integrated ecosystem designed by manufacturers, for manufacturers. 44 years of focus on one industry means we understand your factory.` |
| **Stats row** | 4 stats separated by 48px gap, border-top 1px white 0.1 opacity |

### Hero Stats

| # | Value | Label |
|---|-------|-------|
| 1 | `44` (dw-years dynamic) | Years Focus |
| 2 | `50K+` | Factories |
| 3 | `100+` | Thai Implementations |
| 4 | `4` | Core Products |

### Hero Stack Visual (right column)

Animated isometric stack with 4 floating layers (staggered float animation at 4s, 0.3s delay increments):

| Layer | Label | Color | Position |
|-------|-------|-------|----------|
| AIoT | AIoT Platform | Violet gradient (#8b5cf6 → #7c3aed) | top: 40px |
| MES | MES Shop Floor | Green gradient (#10b981 → #059669) | top: 120px, right: 40px |
| WMS | WMS Warehouse | Amber gradient (#f59e0b → #d97706) | top: 200px, right: 20px |
| ERP | ERP Foundation | Blue gradient (#3798E4 → #2d7bc4) | top: 280px, right: 60px |

Data particles (5) rise between layers with staggered 0.5s delays.

---

## Section 2: Product Navigation Cards

**Purpose:** Route visitors to the right product solution based on pain

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column grid, 36px gap, max-width 1200px |
| **Background** | Light gradient: `linear-gradient(180deg, #f8fafc 0%, #fff 30%, #fff 70%, #f8fafc 100%)` with blue line accent at top, dot-grid pattern background |
| **Padding** | 120px top/bottom |
| **Background illustration** | Large SVG ecosystem illustration: left = factory floor story (machines/sensors, production line, warehouse), right = office/ERP layer with dashboards, center = data hub with animated flow arrows showing data flowing between layers |

| Element | Content |
|---------|---------|
| **Section label** | `The Complete Stack` (JetBrains Mono, 11px, uppercase, flanked by blue lines) |
| **Section title** | `Four Products. One Ecosystem.` |
| **Section subtitle** | `Each product is powerful alone. Together, they're unstoppable.` |

### Product Cards

Cards animate in via scroll (IntersectionObserver, class toggle "visible", 120ms stagger). Each card has color-coded accent bar (scaleX on hover), corner glow, 80px icon with gradient background.

| # | Eyebrow | Title | Tagline | Description | Features | CTA | Link |
|---|---------|-------|---------|-------------|----------|-----|------|
| 1 | `Core System` | `ERP: T100 & iGP` | `"The Brain" — Financial Control & Visibility` | Complete enterprise resource planning built for manufacturing complexity. From multi-entity financials to shop floor scheduling, manage your entire operation with software that speaks manufacturing. | Multi-currency consolidation, Advanced BOM/routing, Integrated MRP/APS, Real-time cost analysis | Explore ERP Solutions → | `{{basePath}}products/erp.html` |
| 2 | `Shop Floor` | `MES: sMES & SFT` | `"Eyes on Production" — Real-Time Visibility` | Stop guessing what's happening on the floor. Real-time production tracking connects every workstation to your management dashboard. See what's happening—as it happens. | Live work order tracking, Quality data collection, Operator analytics, Complete traceability | Explore MES Solutions → | `{{basePath}}products/mes.html` |
| 3 | `Warehouse` | `WMS: sFLS` | `"Every Item Accounted For" — Zero Ghost Inventory` | Smart warehouse management that knows where everything is, guides picking and putaway, and keeps inventory accurate without manual counts. End the ghost inventory problem. | Barcode & RFID ready, Zone/bin management, Wave picking, FIFO/FEFO automation | Explore WMS Solutions → | `{{basePath}}products/wms.html` |
| 4 | `Smart Factory` | `AIoT Platform` | `"Intelligence at Scale" — Machine Connectivity` | Machine connectivity and AI-powered analytics that turn your equipment data into competitive advantage. Predictive maintenance, OEE optimization, and energy management. | Universal connectivity, Real-time OEE, Predictive maintenance, Energy monitoring | Explore AIoT Solutions → | `{{basePath}}products/aiot.html` |

### Card Color System

| Product | Accent Color | Icon BG Gradient |
|---------|-------------|------------------|
| ERP | #3798E4 (blue) | #3798E4 → #2d7bc4 |
| MES | #10b981 (green) | #10b981 → #059669 |
| WMS | #f59e0b (amber) | #f59e0b → #d97706 |
| AIoT | #8b5cf6 (violet) | #8b5cf6 → #7c3aed |

---

## Section 3: Integration Visual

**Purpose:** Show the connected ecosystem — one database, no silos

| Element | Specification |
|---------|---------------|
| **Layout** | Centered diagram with orbit layout. Central hub surrounded by 4 nodes at cardinal positions. |
| **Background** | `linear-gradient(180deg, #F5F7FA 0%, #fff 100%)` with grid pattern overlay (50px squares, 0.03 opacity) |
| **Padding** | 140px top/bottom |

| Element | Content |
|---------|---------|
| **Title** | `One Integrated Ecosystem` |
| **Subtitle** | `All products share a common data platform—no integration nightmares, no data silos, no reconciliation headaches.` |

### Integration Diagram

- **Central Hub**: 140px circle, dark navy gradient, "Data Hub" label, pulsing ring animation
- **Orbit**: 380px dashed circle with 4 product nodes at top/right/bottom/left
- **Nodes**: 100px white rounded boxes with product icons and names (ERP, MES, WMS, AIoT)
- **Data flow lines**: SVG animated dashed lines from center to each node, color-coded per product
- **Data flow labels** (hidden): FINANCE, PRODUCTION, INVENTORY, MACHINES

### Integration Message Box

| Element | Content |
|---------|---------|
| **Style** | White card, 24px radius, 48px/64px padding, gradient top bar (blue→green→amber→violet), decorative quotation mark |
| **Body** | `Unlike point solutions that create data silos, every DigiWin product is built on the same foundation. Your ERP talks to your MES. Your WMS knows what's on the floor. Your AIoT feeds insights back to planning.` **`One database. One truth. Zero integration tax.`** |

---

## Section 4: Why DigiWin Products

**Purpose:** Three key differentiators to build confidence

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column grid, 36px gap |
| **Background** | White (#ffffff) |
| **Padding** | 120px top/bottom |

| Element | Content |
|---------|---------|
| **Section label** | `The DigiWin Advantage` |
| **Section title** | `Why Choose DigiWin Products?` |

### Advantage Cards

| # | Title | Description |
|---|-------|-------------|
| 1 | Manufacturing-Only Focus | We don't sell to banks, retailers, or hospitals. 44 years of exclusive manufacturing focus means features built for the factory floor, not adapted from other industries. |
| 2 | Grows With You | Start with what you need today. Add capabilities as you grow. From 20-person workshop to multi-site enterprise—same ecosystem, same partner, no starting over. |
| 3 | Local Support Team | 50+ team members in Thailand. Bilingual support. Local implementation expertise backed by 44 years of global manufacturing knowledge. |

---

## Section 5: CTA

**Purpose:** Convert visitors who are unsure where to start

| Element | Specification |
|---------|---------------|
| **Layout** | Centered text with button row |
| **Background** | Blue gradient: `linear-gradient(135deg, #3798E4 0%, #2d7bc4 50%, #2d7bc4 100%)` with cross pattern overlay and grain texture |
| **Padding** | 140px top/bottom |

| Element | Content |
|---------|---------|
| **Title** | `Not Sure Where to Start?` |
| **Subtitle** | `Tell us about your factory and we'll recommend the right solution for your needs. No obligation, no pressure—just clarity.` |
| **Primary CTA** | `Request a Free Assessment` → `{{basePath}}demo.html` (white button) |
| **Secondary CTA** | `View by Industry` → `{{basePath}}industries.html` (outline white button) |

---

## JavaScript Behavior

```javascript
// Product cards scroll animation (class-based toggle)
DigiWinUI.initScrollAnimation('.product-card', {
    mode: 'class', className: 'visible', stagger: 120,
    threshold: 0.12, rootMargin: '0px 0px -80px 0px'
});

// Why cards scroll animation
DigiWinUI.initScrollAnimation('.why-card', {
    stagger: 100, distance: 30, duration: 700, threshold: 0.15
});

// Integration diagram animation on scroll
IntersectionObserver on '.integration-diagram', threshold: 0.3
```

---

## Responsive Behavior

| Breakpoint | Changes |
|-----------|---------|
| **<= 1024px** | Hero: single column, centered text. Stack visual: hidden. Product grid: 1-column (max 600px). Integration orbit: 300px. Why grid: 1-column (max 480px). |
| **<= 640px** | Hero: padding 120px/60px, h1 28px. Stats: vertical column layout. Section titles: 32px. Product cards: 32px padding, header column layout, features 1-column. CTA buttons: full-width stacked. |

---

## Flags & Notes

1. **FLAG — CTA wording**: Primary CTA says "Request a Free Assessment" which is acceptable per PRD (not "Book a Demo"). However, it links to `demo.html` — the filename "demo" may confuse. Verify this is the contact/assessment form page.
2. **FLAG — Missing AIoT from PRD Section 3.0**: The PRD Section 3.0 lists ERP, MES, WMS in the Product Navigation Cards but does not explicitly mention AIoT. The HTML includes AIoT as the 4th card. This is a reasonable addition but should be noted as an extension beyond the PRD spec.
3. **STATS VERIFICATION**: "44 years" uses `dw-years` dynamic class (correct). "50K+" and "100+" are consistent with cross-checked data.
4. **INLINE CSS**: ~1,568 lines of inline CSS. Significant extraction opportunity to `styles.css` on next touch — animation keyframes, card styles, integration diagram, and responsive rules could be shared.
5. **PRD ALIGNMENT**: Page follows PRD Section 3.0 flow closely: Hero → Product Cards → Integration Visual → CTA. The "Why DigiWin Products" section (Section 4) is an addition not in the PRD but adds value as a confidence builder.
