# Content Spec: Products Hub — Divi 5 Build (2.0)

**Batch:** 2 (Product Pages)
**PRD Reference:** Section 3.0 — Products (End-User Hub)
**Playbook Reference:** Section 3.1 (Hub Page Arc), Section 2.2 (Track A voice), Section 4.2–4.3 (Vendor lock-in / Fit objections), Section 6 (CTA hierarchy)
**Status:** v2.0 — Upgraded from v1.0 + mapped to Divi 5 modules
**Last Updated:** February 21, 2026
**Platform:** WordPress + Divi 5

---

## Page Overview

| Element | Specification |
|---------|---------------|
| **Audience** | Track A — Factory operators exploring manufacturing software (production managers, plant managers, CFOs) |
| **Objective** | Route visitors to the right product based on their pain point. Establish authority as a manufacturing-only ecosystem provider. This is a **routing page** — goal is self-selection, not conversion. |
| **URL** | digiwin.co.th/products (WordPress slug: `products`) |
| **Emotional Arc** | Hub Page Arc (Playbook 3.1) — "That's me" → "Tell me more" → "I'll go here" |
| **Page Structure** | 5 sections, ~1,245 lines in HTML prototype |
| **CTA Language** | "Let's Talk" (NEVER "Request Demo" or "Book a Demo"). Hub pages use bridge CTAs that route deeper, not hard conversion. |

---

## Divi 5 Capabilities Leveraged

| Divi 5 Feature | Where Used | Why |
|----------------|-----------|-----|
| **CSS Grid Layout** | Hero 2-col, Product grid 2-col, Why cards 3-col | Native responsive grids without custom CSS |
| **Group Module** | Product cards, Why cards, Integration message box | Card containers with shared background, border, hover |
| **Code Module** | Hero SVG background, Hero stack visual, Integration diagram, Super D, grain textures, particle wave | Complex visual elements that cannot be replicated with native modules |
| **Design Variables** | Colors, fonts, spacing | Define once, reference everywhere |
| **Interactions System** | Card hovers, scroll fade-ins, stack float animation | Replace custom JS IntersectionObserver |
| **Number Counter** | Hero stats (44, 4) | Built-in count-up animation |
| **Customizable Breakpoints** | All sections | Replace manual 1024/640 media queries |
| **Semantic Elements** | Every section | `<section>`, `<main>` for SEO and accessibility |

---

## Design Variables

See Homepage spec (`ContentSpec_Home_Divi5_2.0.md`) for the complete global Design Variables reference.

**Page-Specific Color Notes:**

| Variable | Value | Usage on This Page |
|----------|-------|-------------------|
| ERP accent | `#00AFF0` (blue) | ERP product card accent bar, icon bg |
| MES accent | `#10b981` (green) | MES product card accent bar, icon bg |
| WMS accent | `#f59e0b` (amber) | WMS product card accent bar, icon bg |
| AIoT accent | `#8b5cf6` (violet) | AIoT product card accent bar, icon bg |
| Integration bar | `linear-gradient(90deg, #00AFF0, #10b981, #f59e0b, #8b5cf6)` | Message box top accent |

---

## Section 1: Hero — Manufacturing Authority

**Purpose:** Establish manufacturing authority and introduce the complete product stack with animated visual hierarchy.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(165deg, #0f1419 0%, #1a2632 40%, #000864 100%)`, padding: 160px top 120px bottom, `overflow: hidden`, min-height: 85vh, margin-top: 80px (header offset) |
| **Grain Overlay** | Code Module | SVG `feTurbulence` noise filter, `opacity: 0.03`, absolute positioned |
| **Super D** | Code Module | `super-d.js` — variant: `gradient`, position: `left`, opacity: `0.10`, parallax enabled |
| **Particle Wave** | Code Module | Absolute bottom, height 120px, opacity 0.12 |
| **SVG Background** | Code Module | Factory silhouette + data stream lines + floating data nodes + circuit board pattern |
| **Grid Layout** | Row with CSS Grid | `grid-template-columns: 1fr 1fr`, gap: 80px, align-items: center, max-width: 1200px |
| **Left Column** | Column | Text content + CTA + stats |
| **Right Column** | Column | Animated stack visual (hidden on tablet/mobile) |

### Left Column Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Badge** | Text Module | `Complete Manufacturing Intelligence Stack` — JetBrains Mono, 11px, uppercase, 0.1em spacing, pulsing blue dot |
| **Headline** | Text Module (H1) | `Manufacturing Software by` **`Manufacturing Experts`** — Noto Sans 700, `clamp(36px, 4.5vw, 52px)`, white. Highlight span in `#00AFF0` |
| **Subtitle** | Text Module | `From ERP to shop floor, one integrated ecosystem designed by manufacturers, for manufacturers. 44 years of focus on one industry means we understand your factory.` — 19px, `rgba(255,255,255,0.8)`, line-height: 1.7. `44` uses `dw-years` dynamic class. |
| **Primary CTA** | Button Module | `Let's Talk` → `/demo.html` — white button style |
| **Stats Row** | Group Module | Flexbox row, gap: 48px, border-top: `1px solid rgba(255,255,255,0.1)`, margin-top: 48px, padding-top: 32px |

### Hero Stats

| # | Value | Label | Dynamic? |
|---|-------|-------|----------|
| 1 | `44` | Years Focus | Yes — `dw-years` class |
| 2 | `50K+` | Factories | Static text |
| 3 | `100+` | Thai Implementations | Static text |
| 4 | `4` | Core Products | Static text |

Number styling: Noto Sans 800, 32px, `#0369a1`, -0.02em tracking.
Label styling: JetBrains Mono, 10px, `rgba(255,255,255,0.75)`, uppercase, 0.1em spacing.

### Right Column: Stack Visual (MUST be Code Module)

Animated isometric stack showing the 4-product hierarchy. Cannot be replicated with native Divi modules due to staggered float animations and data particle effects.

| Layer | Label | Color Gradient | Float delay |
|-------|-------|---------------|-------------|
| AIoT Platform | AIoT Platform | `#8b5cf6 → #7c3aed` | 0.9s |
| MES Shop Floor | MES Shop Floor | `#10b981 → #059669` | 0.6s |
| WMS Warehouse | WMS Warehouse | `#f59e0b → #d97706` | 0.3s |
| ERP Foundation | ERP Foundation | `#00AFF0 → #2d7bc4` | 0s |

5 data particles rise between layers with staggered 0.5s delays.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | 2-column grid, stack visual visible |
| **Tablet (<=1024px)** | Single column, centered text, stack visual hidden, SVG background 0.06 opacity |
| **Mobile (<=640px)** | Padding 120px/60px, h1 28px, stats stack vertically |

---

## Section 2: Product Navigation Cards

**Purpose:** Route visitors to the right product solution based on their pain point. The primary interaction point of this hub page.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(180deg, #f8fafc 0%, #fff 30%, #fff 70%, #f8fafc 100%)`, padding: 120px top/bottom |
| **Blue accent line** | Code Module | Top border decoration, blue gradient |
| **Dot grid pattern** | Code Module | Absolute, pointer-events: none, subtle background texture |
| **Ecosystem SVG** | Code Module | Large background illustration: factory floor (left) + office/ERP (right) + data hub (center) with animated flow arrows |
| **Section Header** | Text Modules | Label + H2 + subtitle, centered, max-width: 680px |
| **Product Grid** | Row with CSS Grid | `grid-template-columns: repeat(2, 1fr)`, gap: 36px, max-width: 1200px |
| **Product Cards** | Code Module (wp:html) | Full-card `<a>` links — entire card is clickable. Cannot use native Divi Group Module (no `href` support). |

### Section Header

| Element | Content |
|---------|---------|
| **Label** | `The Complete Stack` — JetBrains Mono, 11px, uppercase, flanked by blue lines |
| **Title (H2)** | `Four Products. One Ecosystem.` |
| **Subtitle** | `Each product is powerful alone. Together, they're unstoppable.` |

### Product Cards (4 cards — all `<a>` tags)

| # | Eyebrow | Title (H3) | Tagline | Description | Features (4) | CTA text | Link |
|---|---------|------------|---------|-------------|-------------|----------|------|
| 1 | `Core System` | `ERP: T100 & iGP` | `"The Brain" — Financial Control & Visibility` | Complete enterprise resource planning built for manufacturing complexity. From multi-entity financials to shop floor scheduling, manage your entire operation with software that speaks manufacturing. | Multi-currency consolidation · Advanced BOM/routing · Integrated MRP/APS · Real-time cost analysis | Explore ERP Solutions → | `/products/erp.html` |
| 2 | `Shop Floor` | `MES & SFT` | `"Eyes on Production" — Real-Time Visibility` | Stop guessing what's happening on the floor. Real-time production tracking connects every workstation to your management dashboard. See what's happening—as it happens. | Live work order tracking · Quality data collection · Operator analytics · Complete traceability | Explore MES Solutions → | `/products/mes.html` |
| 3 | `Warehouse` | `WMS: sFLS` | `"Every Item Accounted For" — Zero Ghost Inventory` | Smart warehouse management that knows where everything is, guides picking and putaway, and keeps inventory accurate without manual counts. End the ghost inventory problem. | Barcode & RFID ready · Zone/bin management · Wave picking · FIFO/FEFO automation | Explore WMS Solutions → | `/products/wms.html` |
| 4 | `Smart Factory` | `AIoT Platform` | `"Intelligence at Scale" — Machine Connectivity` | Machine connectivity and AI-powered analytics that turn your equipment data into competitive advantage. Predictive maintenance, OEE optimization, and energy management. | Universal connectivity · Real-time OEE · Predictive maintenance · Energy monitoring | Explore AIoT Solutions → | `/products/aiot.html` |

### Card Color System

| Product | Accent Color | Icon BG Gradient | Hover accent |
|---------|-------------|------------------|-------------|
| ERP | `#00AFF0` | `#00AFF0 → #2d7bc4` | `box-shadow: 0 12px 40px rgba(0,175,240,0.15)` |
| MES | `#10b981` | `#10b981 → #059669` | `box-shadow: 0 12px 40px rgba(16,185,129,0.15)` |
| WMS | `#f59e0b` | `#f59e0b → #d97706` | `box-shadow: 0 12px 40px rgba(245,158,11,0.15)` |
| AIoT | `#8b5cf6` | `#8b5cf6 → #7c3aed` | `box-shadow: 0 12px 40px rgba(139,92,246,0.15)` |

### Card Hover Interaction

- `translateY(-8px)` lift
- Color-coded box-shadow (see table above)
- Accent bar at top scales from `scaleX(0)` to `scaleX(1)`
- Corner glow appears (radial gradient, product color at 0.06 opacity)
- CTA arrow translates right 4px
- Transition: `all 0.4s ease`

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | 2-column grid, all elements visible |
| **Tablet (<=1024px)** | 1-column grid, max-width: 600px centered |
| **Mobile (<=640px)** | Reduced padding (32px), card header stacks vertically, features 1-column |

---

## Section 3: Integration Visual

**Purpose:** Show the connected ecosystem value prop — one database, no silos, zero integration tax.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(180deg, #F5F7FA 0%, #fff 100%)`, padding: 140px top/bottom |
| **Super D** | Code Module | `super-d.js` — variant: `outline`, position: `corner-br`, opacity: `0.06` |
| **Grid pattern** | Code Module | 50px squares, 0.03 opacity background |
| **Section Header** | Text Modules | H2 + subtitle, centered |
| **Integration Diagram** | Code Module (wp:html) | Complex SVG + CSS animation — central hub, 4 orbit nodes, animated data flow lines. MUST be Code Module. |
| **Message Box** | Code Module | White card with gradient top bar and quotation mark |
| **Mid-page CTA** | Button Module | Centered below message box |

### Section Header

| Element | Content |
|---------|---------|
| **Title (H2)** | `One Integrated Ecosystem` |
| **Subtitle** | `All products share a common data platform—no integration nightmares, no data silos, no reconciliation headaches.` |

### Integration Diagram

- **Central Hub**: 140px circle, dark navy gradient, "Data Hub" label, pulsing ring animation
- **Orbit**: 380px dashed circle, 4 product nodes at cardinal positions
- **Nodes**: 100px white rounded boxes — ERP (top), MES (right), WMS (bottom), AIoT (left)
- **Data flow lines**: SVG animated dashed lines, color-coded per product
- **Data flow labels**: FINANCE, PRODUCTION, INVENTORY, MACHINES

### Integration Message Box

| Element | Content |
|---------|---------|
| **Style** | White card, 24px radius, 48px/64px padding, gradient top bar (blue→green→amber→violet), decorative `"` quotation mark |
| **Body** | `Unlike point solutions that create data silos, every DigiWin product is built on the same foundation. Your ERP talks to your MES. Your WMS knows what's on the floor. Your AIoT feeds insights back to planning.` **`One database. One truth. Zero integration tax.`** |

### Mid-page CTA

| Element | Content |
|---------|---------|
| **Button** | `Let's Talk About Your Factory` → `/demo.html` — blue gradient button |

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | Full orbit diagram, 380px radius |
| **Tablet (<=1024px)** | Orbit shrinks to 300px, flow labels hidden |
| **Mobile (<=640px)** | Orbit shrinks to 200px, diagram simplified |

---

## Section 4: Why DigiWin Products

**Purpose:** Three confidence-building differentiators. Addresses Playbook objections 4.2 (vendor lock-in) and 4.3 (manufacturing fit).

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `#ffffff`, padding: 120px top/bottom |
| **Section Header** | Text Modules | Label + H2, centered |
| **Cards Grid** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, gap: 36px, max-width: 1200px |
| **Why Cards** | Code Module (wp:html) | SVG icon + H3 + body text. Dynamic `dw-years` in cards 1 and 3. |

### Section Header

| Element | Content |
|---------|---------|
| **Label** | `The DigiWin Advantage` — JetBrains Mono, 11px, uppercase |
| **Title (H2)** | `Why Choose DigiWin Products?` |

### Advantage Cards (3)

| # | Icon | Title (H3) | Description |
|---|------|-----------|-------------|
| 1 | Shield/target SVG | `Manufacturing-Only Focus` | We don't sell to banks, retailers, or hospitals. `44` years of exclusive manufacturing focus means features built for the factory floor, not adapted from other industries. (`44` = `dw-years` dynamic) |
| 2 | Growth/arrows SVG | `Grows With You` | Start with what you need today. Add capabilities as you grow. From 20-person workshop to multi-site enterprise—same ecosystem, same partner, no starting over. |
| 3 | People/team SVG | `Local Support Team` | 50+ team members in Thailand. Bilingual support. Local implementation expertise backed by `44` years of global manufacturing knowledge. (`44` = `dw-years` dynamic) |

### Card Hover Interaction

- `translateY(-8px)` lift
- `box-shadow: 0 20px 40px rgba(0,8,100,0.08)`
- Icon background shifts from `#f1f5f9` to blue gradient
- Transition: `all 0.4s ease`

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | 3-column grid |
| **Tablet (<=1024px)** | 1-column, max-width: 480px centered |
| **Mobile (<=640px)** | Reduced padding, cards full-width |

---

## Section 5: CTA — Not Sure Where to Start?

**Purpose:** Convert visitors who are unsure which product to explore. Offer clarity without pressure.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(135deg, #00AFF0 0%, #2d7bc4 50%, #2d7bc4 100%)`, padding: 140px top/bottom, overflow: hidden |
| **Super D** | Code Module | `super-d.js` — variant: `particle`, position: `left`, opacity: `0.14` |
| **Particle Wave** | Code Module | Height 180px, opacity 0.35 |
| **Grain Overlay** | Code Module | 0.03 opacity texture |
| **Cross Pattern** | Code Module | Background pattern, 0.05 opacity |
| **Text + Buttons** | Text + Button Modules | Centered, max-width: 700px |

### Content

| Element | Content |
|---------|---------|
| **Title (H2)** | `Not Sure Where to Start?` — white, Noto Sans 700, 42px |
| **Subtitle** | `Tell us about your factory and we'll recommend the right solution for your needs. No obligation, no pressure—just clarity.` — white 0.9 opacity |
| **Primary CTA** | `Let's Talk` → `/demo.html` — white button (dark text) |
| **Secondary CTA** | `View by Industry` → `/industries.html` — outline white button |

**NOTE:** v1.0 spec said "Request a Free Assessment" — corrected to "Let's Talk" per business constraints and HTML prototype.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop** | Side-by-side buttons, centered text |
| **Mobile (<=640px)** | Buttons stack full-width, reduced padding |

---

## Scroll Animation Strategy

All scroll animations from the HTML prototype will use CSS-only implementations in Divi 5:

| Element | HTML Prototype | Divi 5 Replacement |
|---------|---------------|-------------------|
| Product card fade-in | `DigiWinUI.initScrollAnimation()` stagger: 120ms | CSS: `scroll-animation` class with `animation-delay` per card |
| Why card fade-in | `DigiWinUI.initScrollAnimation()` stagger: 100ms | CSS: same pattern |
| Integration diagram | `IntersectionObserver` threshold: 0.3 | CSS: `scroll-animation` class on diagram container |
| Stack visual float | Custom keyframes | CSS: `@keyframes float` in Code Module |

---

## Page-Specific JavaScript

| JS in HTML Prototype | Divi 5 Approach |
|---------------------|-----------------|
| `digiwin-components.js` scroll animations | Handled by CSS scroll-animation classes |
| `digiwin-dynamic.js` year calculation | Inline `<script>` in Code Module: `dw-years` → `new Date().getFullYear() - 1982` |
| `particle-ocean.js` | Inline `<script>` in hero Code Module |
| Integration diagram `IntersectionObserver` | CSS `scroll-animation` class |

---

## Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Manufacturing Software: ERP, MES, WMS, AIoT",
  "description": "Complete manufacturing software suite: ERP, MES, WMS, and AIoT. 44 years of manufacturing focus. One integrated ecosystem for Thai factories.",
  "url": "https://www.digiwin.co.th/products",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "ERP: T100 & iGP", "url": "https://www.digiwin.co.th/products/erp"},
      {"@type": "ListItem", "position": 2, "name": "MES & SFT", "url": "https://www.digiwin.co.th/products/mes"},
      {"@type": "ListItem", "position": 3, "name": "WMS: sFLS", "url": "https://www.digiwin.co.th/products/wms"},
      {"@type": "ListItem", "position": 4, "name": "AIoT Platform", "url": "https://www.digiwin.co.th/products/aiot"}
    ]
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.digiwin.co.th/"},
      {"@type": "ListItem", "position": 2, "name": "Products", "item": "https://www.digiwin.co.th/products"}
    ]
  }
}
```

---

## Open Graph & Meta

| Element | Value |
|---------|-------|
| `<title>` | `Manufacturing Software: ERP, MES, WMS, AIoT \| DigiWin Thailand` |
| `<meta name="description">` | `Complete manufacturing software suite: ERP, MES, WMS, and AIoT. 44 years of manufacturing focus. One integrated ecosystem for Thai factories.` |
| `og:title` | Same as `<title>` |
| `og:description` | Same as meta description |
| `og:type` | `website` |
| `og:url` | `https://www.digiwin.co.th/products` |

---

## Accessibility Requirements

- Skip link: `#products-content` targeting `<main>`
- Heading hierarchy: H1 (hero) → H2 (each section) → H3 (card titles) — no skipped levels
- All SVGs: `aria-hidden="true"` (decorative) or proper `<title>` + `aria-label` (meaningful)
- Product cards: Full `<a>` tags with descriptive text — screen reader reads card title + CTA
- Color contrast: All text meets WCAG AA (4.5:1 body, 3:1 large text)
- `prefers-reduced-motion`: Disable all float animations, scroll transitions, particle effects
- Focus indicators: Visible focus ring on all interactive elements (cards, buttons, links)

---

## Validation Checklist

- [ ] H1 contains "Manufacturing Software" (SEO target)
- [ ] All 4 product cards link to correct sub-pages
- [ ] Product card links resolve (200 status)
- [ ] Stats "44" uses `dw-years` dynamic class (4 occurrences)
- [ ] "50K+" and "100+" match cross-checked data
- [ ] CTA says "Let's Talk" (NOT "Request Demo" or "Book a Demo")
- [ ] No competitor names mentioned
- [ ] Integration message box has gradient top bar (4 product colors)
- [ ] Product color system matches across card accent, icon bg, hover shadow
- [ ] Heading hierarchy: H1 → H2 → H3, no skips
- [ ] Skip link present and functional
- [ ] `prefers-reduced-motion` disables all animations
- [ ] Tablet: stack visual hidden, product grid single-column
- [ ] Mobile: stats stack vertically, buttons full-width
- [ ] All SVGs have `aria-hidden="true"`
- [ ] Page loads < 3s on local
- [ ] No horizontal scroll at any breakpoint
- [ ] Schema.org CollectionPage + BreadcrumbList present
- [ ] OG meta tags present and correct

---

## PRD Deviations (Approved)

| # | Deviation | Rationale |
|---|----------|-----------|
| 1 | **AIoT as 4th product card** — PRD Section 3.0 lists only ERP, MES, WMS | AIoT is part of the product stack and appears in the integration diagram. Omitting it from the hub would be inconsistent. Approved in v1.0. |
| 2 | **"Why DigiWin Products" section added** — PRD has 4 sections, HTML has 5 | Confidence builder addressing Playbook objections 4.2 (vendor lock-in) and 4.3 (manufacturing fit). Adds value as authority proof. Approved in v1.0. |
| 3 | **CTA wording: "Let's Talk"** — v1.0 spec said "Request a Free Assessment" | Corrected to match HTML prototype and business constraint (no demo language). |

---

## Divi 5 Build Notes

### Sections That MUST Be Code Modules (wp:html)

| Section | Reason |
|---------|--------|
| Hero stack visual | Staggered float animation + data particles — no native Divi equivalent |
| Hero SVG background | Complex multi-layer SVG with animated dashes, nodes, circuit patterns |
| Product cards | Full-card `<a>` links — Divi Group Module doesn't support `href` on container |
| Integration diagram | SVG orbit with animated data flow lines — no native equivalent |
| Integration message box | Gradient top bar (4-color) + quotation mark decoration |
| Why cards | Dynamic `dw-years` calculation via inline script |

### CSS Prefix

All CSS classes use `prod-` prefix (e.g., `.prod-hero`, `.prod-grid`, `.prod-card--erp`).

### WordPress Page

| Setting | Value |
|---------|-------|
| Page ID | 100556 |
| Slug | `products` |
| Parent | None (top-level) |
| Template | Default (Divi 5) |
