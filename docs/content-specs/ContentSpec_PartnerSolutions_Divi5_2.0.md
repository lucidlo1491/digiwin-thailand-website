# Content Spec: The Solution Stack — Divi 5 Build (2.0)

**Batch:** 1 (Highest Priority)
**PRD Reference:** Section 2.2 — The Solution Stack (Product Portfolio for Partners)
**Playbook Reference:** Sections 2.3 (Track B Voice), 3.4 (Partner Product Page Arc), 7.2 (Partner Hub Notes)
**Status:** v2.0 — Mapped to Divi 5 modules from HTML build
**Last Updated:** February 12, 2026
**Platform:** WordPress + Divi 5

---

## Page Overview

| Element | Specification |
|---------|---------------|
| **Audience** | Distributor prospects evaluating what they'd actually sell — the "weapon evaluation" |
| **Objective** | Show portfolio depth and cross-sell opportunity. Products framed as "what you can sell" not "what it does." |
| **URL** | digiwin.co.th/partner-program/solutions.html |
| **Emotional Arc** | Arsenal overview > Product depth > Land-and-expand lifecycle > Reverse Cut strategy > Competitive positioning |
| **Page Structure** | 6 sections, ~765 lines inline CSS in static build (largest Partner page) |

---

## Divi 5 Capabilities Leveraged

| Divi 5 Feature | Where Used | Why |
|----------------|-----------|-----|
| **CSS Grid Layout** | Product cards (2-col alternating), lifecycle phases (4-col), reverse cut phases, competitive cards | Complex responsive grids |
| **Group Module** | Product cards, lifecycle phases, reverse cut cards, competitive cards, ace card, proof bar | Structured card containers |
| **Nested Modules** | Product cards (info column + metrics column inside one card) | 2-zone card layout |
| **Design Variables** | Colors, fonts, spacing | Global consistency |
| **Interactions System** | Card fade-ins, hover lifts, lifecycle phase reveals | Replaces custom JS |
| **Icon List Module** | Product features (4 items per card), competitive talking points | Per-item icons/bullets |
| **Number Counter** | Hero stats (44 years, 50K+), Reverse Cut comparison numbers | Animated count-up |
| **Code Module** | Lifecycle arrow connectors, reverse cut comparison table, dot pattern overlay, ace card diamond pattern | Complex SVG/HTML elements |

---

## Design Variables Reference

> **Global Design Variables defined in `ContentSpec_Home_Divi5_2.0.md`.** This page inherits the same set.

### Page-Specific Colors

| Color | Value | Usage |
|-------|-------|-------|
| Blue lifecycle | #00AFF0 | Phase 1 (Land) |
| Green lifecycle | #10b981 | Phase 2 (Stabilize) |
| Amber lifecycle | #f59e0b | Phase 3 (Expand), Reverse Cut label, Ace Card label |
| Purple lifecycle | #8b5cf6 | Phase 4 (Lock), Competitive Positioning label |
| Blue highlight bg | #eff6ff | Highlighted metric cells (blue-tinted) |
| Red tag bg | #fef2f2 | Competitive "vs." tags |
| Red tag border | #fecaca | Competitive "vs." tags |
| Red tag text | #dc2626 | Competitive "vs." tag text |
| Green comparison bg | #f0fdf4 | "eMES Entry" column in comparison |
| Red strikethrough | #dc2626 | "Full ERP Replacement" column |
| Gray metrics bg | `#f8fafc → #f1f5f9` | Product card right column |

---

## Section 1: Hero

**Purpose:** Portfolio overview — products as "modular arsenal" for revenue generation.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(135deg, #1a2e40 0%, var(--dw-dark-navy) 50%, #2d4a5e 100%)`, padding: 140px top / 100px bottom. Dot pattern overlay (Code Module). |
| **Content Column** | Column | Max-width: 900px |
| **Breadcrumb** | Text Module | `Partner Program / Solution Stack` — 14px, `rgba(255,255,255,0.5)`. "Partner Program" links to `/partner-program.html` |
| **Headline** | Text Module (H1) | `Stop Building Custom Code.` (line break) `Start Deploying a Modular Arsenal.` — `--dw-heading` 700, `clamp(32px, 4vw, 48px)`, white. Second line in `--dw-primary-blue`. |
| **Subtitle** | Text Module | "You're not just reselling software..." — `--dw-body` 18px, `rgba(255,255,255,0.75)`, line-height 1.75 |

### Hero Stats Bar (3-column)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Row** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, border-top: `1px solid rgba(255,255,255,0.1)`, margin-top: 48px, padding-top: 40px |

| Stat | Value | Label | Module |
|------|-------|-------|--------|
| 1 | `44` | Years of R&D Investment | Number Counter (dynamic via dw-years if possible) |
| 2 | `50K+` | Manufacturing Clients | Number Counter (suffix: K+, count to 50) |
| 3 | `4` | Revenue Engines | Number Counter |

Value styling: `--dw-heading` 800, 32px, white. Label styling: `--dw-mono` 11px, `rgba(255,255,255,0.5)`, uppercase.

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | Full layout |
| Tablet (≤1024px) | Stats → 1-column |
| Mobile (≤640px) | Padding: 120px top / 80px bottom, H1: 28px |

---

## Section 2: Product Portfolio — Revenue Engines

**Purpose:** Each product as a business model with revenue characteristics and cross-sell paths.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: `--dw-section-pad` |
| **Header** | Group Module | Centered: headline + subhead |
| **Product Cards** | 4 separate Rows | Each Row = 1 product card, 2-column grid. Odd cards: info left / metrics right. Even cards: metrics left / info right (RTL). Gap: 0 (the two columns share a single card border). Max-width: 1200px. |
| **Card Container** | Group Module | White bg, `1px solid #e2e8f0`, `--dw-card-radius`, overflow: hidden, margin-bottom: 32px. Hover: `translateY(-4px)`, shadow. |

### Product Card — 2-Column Internal Layout

| Column | Content | Styling |
|--------|---------|---------|
| **Info Column** (~60%) | Badge + Title + Description + Feature List + Link | White bg, padding: 40px |
| **Metrics Column** (~40%) | Metrics title + metric rows | bg `linear-gradient(135deg, #f8fafc, #f1f5f9)`, padding: 40px |

> **Divi 5 Implementation:** Each product card is a Row with 2 Columns inside a Group Module. The Group Module provides the outer card styling (border, radius, shadow, hover). Even-numbered cards reverse the column order using Divi 5's Flexbox `flex-direction: row-reverse`.

### Info Column Structure

| Element | Divi 5 Module | Notes |
|---------|--------------|-------|
| **Badge** | Text Module | `--dw-mono` 11px, `--dw-primary-blue`, `rgba(0,175,240,0.15)` bg, pill shape |
| **Title** | Text Module (H3) | `--dw-heading` 700, 28px, `--dw-text-dark` |
| **Description** | Text Module | `--dw-body` 15px, `--dw-text-light`, line-height 1.65 |
| **Features** | Icon List Module | 4 items, blue dot icons. Item 4 (cross-sell path) in `--dw-primary-blue` bold. |
| **Link** | Button Module | Ghost style: transparent bg, `--dw-primary-blue` text, arrow icon |

### Metrics Column Structure

| Element | Divi 5 Module | Notes |
|---------|--------------|-------|
| **Metrics Title** | Text Module | `--dw-heading` 600, 14px, `--dw-text-light`, uppercase |
| **Metric Rows** | Row with CSS Grid | 2-column grid (label / value). Border-bottom: `1px solid #e2e8f0`. Highlighted rows: bg `#eff6ff`, value color `--dw-primary-blue`. |

### Product Card Content

#### Card 1: T100 Enterprise ERP — "The Tier-1 Killer"

| Element | Content |
|---------|---------|
| **Badge** | "The 'Tier-1 Killer'" |
| **Title** | T100 Enterprise ERP |
| **Description** | Win the "Big Fish" accounts... Offer **Tier-1 capability at Tier-2 pricing**. |
| **Features** | Multi-site architecture · Complex costing · Chinese/Thai/English bilingual · **Cross-sell:** T100 → eMES → WMS → AIoT → BPM |
| **Link** | "Learn more about T100" → `/products/erp.html` |
| **Metrics Title** | "Your Revenue Model: High-Value Project" |
| **Metric: Target** | 200+ employees |
| **Metric: License Margin** | 30-40% (highlighted blue) |
| **Metric: Implementation** | 100% yours (highlighted blue) |
| **Metric: Revenue Type** | Enterprise Asset |

#### Card 2: Workflow iGP Growth ERP — "The Volume Engine" (RTL layout)

| Element | Content |
|---------|---------|
| **Badge** | "The 'Volume Engine'" |
| **Title** | Workflow iGP Growth ERP |
| **Description** | "Rapid Deployment" weapon. Addresses automation gap. **Pre-localized for Thai RD.** |
| **Features** | 3-6 month deployments · Lower barrier = higher volume · Thai tax certified · **Cross-sell:** iGP → eMES → WMS → AIoT |
| **Link** | "Learn more about iGP" → `/products/erp.html` |
| **Metrics Title** | "Your Revenue Model: Cash Flow Engine" |
| **Metric: Target** | 20-200 employees |
| **Metric: Turn Time** | 3-6 months (highlighted blue) |
| **Metric: Avoid** | "Long project death" |
| **Metric: Revenue Type** | SME Cash Flow |

#### Card 3: eMES Essential MES — "The Strategic Wedge"

| Element | Content |
|---------|---------|
| **Badge** | "The 'Strategic Wedge'" |
| **Title** | eMES Essential MES |
| **Description** | The **"Reverse Cut" Strategy.** Sell eMES as "Shop Floor Enforcer" without replacing existing ERP. |
| **Features** | "Keep SAP for Finance. Use Digiwin for the floor." · Premium process consulting rates · Once you control shop floor data, client cannot leave · **"Trojan Horse:"** eMES → WMS → AIoT → T100/iGP |
| **Link** | "Learn more about eMES" → `/products/mes.html` |
| **Metrics Title** | "Your Revenue Model: Sticky Recurring" |
| **Metric: Entry Point** | ~1M THB (vs. 5M+ ERP) (highlighted blue) |
| **Metric: Timeline** | 3-6 months (vs. 18mo) (highlighted blue) |
| **Metric: Retention** | Higher barrier to exit |
| **Metric: Revenue Type** | Retention Asset |

#### Card 4: AIoT & WMS — "The Value Multipliers" (RTL layout)

| Element | Content |
|---------|---------|
| **Badge** | "The 'Value Multipliers'" |
| **Title** | AIoT & WMS: Lock-In Layers |
| **Description** | **WMS — "Zero Ghost Inventory":** Digitizes physical movement. **AIoT — "Future Proofing":** Connects machines directly to ERP. |
| **Features** | Hardware/middleware resale opportunity · Recurring data monitoring services · Solves "system says 100, shelf has 50" · **Physical lock-in:** 10+ year relationships |
| **Link** | "Learn more about AIoT & WMS" → `/products/aiot.html` |
| **Metrics Title** | "Your Revenue Model: Differentiation" |
| **Metric: Physical Integration** | Ultimate lock-in (highlighted blue) |
| **Metric: Hardware Drag** | Scanners, sensors, PLCs |
| **Metric: Client Lifetime** | 10+ years (highlighted blue) |
| **Metric: Revenue Type** | Differentiation Asset |

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | 2-column card layout (info + metrics side by side) |
| Tablet (≤1024px) | Cards → 1 column (info stacked above metrics). RTL override removed. |
| Mobile (≤640px) | Reduced padding, smaller text |

---

## Section 3: The "Land and Expand" Strategy

**Purpose:** Visualize the 4-phase account takeover strategy.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(180deg, #f8fafc 0%, #fff 100%)`, padding: `--dw-section-pad` |
| **Header** | Group Module | Label + Title + Subtitle, centered |
| **Phases Row** | Row with CSS Grid | `grid-template-columns: repeat(4, 1fr)`, gap: 16px |
| **Arrow Connectors** | Code Module | SVG arrows between phase cards, absolute positioned. Hidden on mobile. |
| **Each Phase** | Group Module | White bg, `1px solid #e2e8f0`, `--dw-card-radius`, padding: 28px, center-aligned |
| **Proof Bar** | Group Module | Dark bg, below phases. Full-width. |

### Phase Card Internal Structure

| Element | Divi 5 Module | Notes |
|---------|--------------|-------|
| **Number Circle** | Text Module or Code Module | 40x40px, per-phase gradient bg, white text, `--dw-heading` 700, 16px, border-radius 50% |
| **Title** | Text Module (H3) | `--dw-heading` 700, 18px, `--dw-text-dark` |
| **Products** | Text Module | `--dw-mono` 12px, per-phase color, bg per-phase tint |
| **Description** | Text Module | `--dw-body` 14px, `--dw-text-light` |
| **Revenue Type** | Text Module | `--dw-mono` 11px, `--dw-text-light`, top border `1px solid #e2e8f0` |

### Phase Content

| Phase | Number | Color | Title | Products | Description | Revenue Type |
|-------|--------|-------|-------|----------|-------------|-------------|
| 1 | 1 | `#00AFF0` | Land | iGP or eMES | Entry with immediate value. Fast project, quick cash. | Project fees + License |
| 2 | 2 | `#10b981` | Stabilize | WMS | Control inventory accuracy. Solve "Ghost Inventory." | Project + Hardware |
| 3 | 3 | `#f59e0b` | Expand | T100 ERP | Scale to enterprise. High-value project revenue. | Enterprise project |
| 4 | 4 | `#8b5cf6` | Lock | AIoT | Physical integration = permanent retention. | Subscription + Data |

### Lifecycle Proof Bar

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Group Module | Background: `linear-gradient(135deg, var(--dw-dark-navy), #1a2e40)`, `--dw-card-radius`, padding: 24px 32px, margin-top: 32px |
| **Text** | Text Module | "**This isn't just software—it's a Customer Lifecycle Management strategy...**" — `--dw-body` 16px, white, centered |

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | 4 columns with arrow connectors |
| Tablet (≤1024px) | 2×2 grid, arrows hidden |
| Mobile (≤640px) | 1 column (vertical), arrows rotate 90° or hidden |

---

## Section 4: The Reverse Cut Strategy

**Purpose:** Detail how to win SAP/Oracle accounts without rip-and-replace.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: `--dw-section-pad` |
| **Header** | Group Module | Label (amber `#f59e0b`) + Title + Subtitle, centered |
| **Phase Cards Row** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, gap: 24px, max-width: 1100px |
| **Each Phase Card** | Group Module | White bg, `1px solid #e2e8f0`, `--dw-card-radius`, padding: 32px |
| **Comparison Table** | Group Module | Dark bg, below phase cards. |

### Reverse Cut Phase Card Structure

| Element | Divi 5 Module | Notes |
|---------|--------------|-------|
| **Tag** | Text Module | `--dw-mono` 11px, `#f59e0b`, bg `rgba(245,158,11,0.15)`, pill |
| **Title** | Text Module (H3) | `--dw-heading` 700, 20px |
| **Description** | Text Module | `--dw-body` 15px, `--dw-text-light` |
| **Client Quote** | Text Module | `--dw-body` 14px italic, `--dw-text-light`, left border 3px solid `#f59e0b`, padding-left 16px |

### Phase Cards

| Phase | Tag | Title | Description (key point) | Client Quote |
|-------|-----|-------|------------------------|-------------|
| 1 | Phase 1 | The Wedge | "Keep SAP for Finance. Use Digiwin for the factory floor." | "Finally, I can see what's happening..." |
| 2 | Phase 2 | The Contrast | Client realizes Digiwin is flexible while legacy ERP is rigid. | "Why is updating SAP so painful..." |
| 3 | Phase 3 | The Replacement | When legacy ERP needs upgrade, propose T100. | "Let's just consolidate everything on Digiwin." |

### Dark Comparison Table

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Group Module | Background: `linear-gradient(135deg, var(--dw-dark-navy), #1a2e40)`, `--dw-card-radius`, padding: 40px, margin-top: 48px |
| **Title** | Text Module | "Why It Works: Lower Risk Threshold" — `--dw-heading` 700, 20px, white |
| **Table** | Code Module | HTML table, 3-column: Metric / Full ERP (red, strikethrough) / eMES Entry (green) |

| Metric | Full ERP Replacement | eMES Entry / Reverse Cut |
|--------|---------------------|-------------------------|
| Budget | ~~5M+ THB~~ | ~1M THB |
| Timeline | ~~9-18 months~~ | 3-6 months |
| Disruption | ~~High (rip-and-replace)~~ | Low (overlay) |
| Client Risk | ~~High~~ | Low |

Table styling: "Full ERP" values in `#ef4444` with `text-decoration: line-through`. "eMES Entry" values in `#4ade80`. Row borders: `1px solid rgba(255,255,255,0.1)`.

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | 3 phase cards, full comparison table |
| Tablet (≤1024px) | Phase cards → 1 column |
| Mobile (≤640px) | Phase cards stacked, comparison table scrolls horizontally or stacks |

---

## Section 5: Competitive Positioning — Sales Talking Points

**Purpose:** Arm partners with specific talking points for sales conversations.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(180deg, #f8fafc 0%, #fff 100%)`, padding: `--dw-section-pad` |
| **Header** | Group Module | Label (purple `#8b5cf6`) + Title + Subtitle, centered |
| **Competitive Cards** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, gap: 24px |
| **Each Card** | Group Module | White bg, `1px solid #e2e8f0`, `--dw-card-radius`, padding: 32px. Hover: `translateY(-4px)`, shadow. |
| **Ace Card** | Group Module | Below competitive cards. Dark bg with diamond pattern. |

### Competitive Card Internal Structure

| Element | Divi 5 Module | Notes |
|---------|--------------|-------|
| **"vs." Tag** | Text Module | `--dw-mono` 11px, `#dc2626`, bg `#fef2f2`, border `1px solid #fecaca`, pill |
| **Title** | Text Module (H3) | `--dw-heading` 700, 20px, `--dw-text-dark` |
| **Points** | Icon List Module | 3 items per card, blue dot icons. **Bold leads** + description. |
| **"Use When"** | Text Module | `--dw-body` 13px, `#f59e0b`, bg `rgba(245,158,11,0.1)`, padding 12px 16px, border-radius 8px |

### Competitive Card Content

| Card | "vs." Tag | Title | Points (abbreviated) | Use When |
|------|-----------|-------|---------------------|----------|
| 1 | vs. SAP B1 / NetSuite | "They Stop at the Office Door" | Manufacturing Void · Phantom Problem · Cost of "Good Enough" | Client has SAP B1/NetSuite, complains about production visibility |
| 2 | vs. SAP S/4HANA / Oracle | "Tier-1 Capability, No German Logic" | Agility vs. Rigidity · Total Cost Advantage · Hidden License Fees | Client evaluating SAP/Oracle with budget/flexibility concerns |
| 3 | vs. Thai Vendors / Odoo | "Scale Without the Dead End" | Vanishing Vendor · Feature Ceiling · Financial Credibility | Client tempted by low-cost local or Odoo |

### The Ace Card

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Group Module | Background: `linear-gradient(135deg, var(--dw-dark-navy), #1a2e40)`, `--dw-card-radius`, padding: 48px, margin-top: 48px. Diamond pattern overlay (Code Module). Center-aligned. |
| **Label** | Text Module | "THE ACE CARD" — `--dw-mono` 12px, `#f59e0b`, letter-spacing 3px, uppercase |
| **Quote** | Text Module | "SAP manages your General Ledger. Local software manages your Invoices. **Digiwin manages your Factory Floor.**" — `--dw-heading` 600, 20px, white |

### Responsive

| Breakpoint | Grid |
|-----------|------|
| Desktop (>1024px) | 3 columns |
| Tablet (≤1024px) | 1 column |
| Mobile (≤640px) | 1 column, ace card padding: 32px 24px, quote text: 18px |

---

## Section 6: Final CTA

**Purpose:** Bridge to Economics page and conversion.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(135deg, var(--dw-primary-blue) 0%, #2d7bc4 50%, #1e5a8a 100%)`, padding: `--dw-section-pad`. Dot pattern overlay. |
| **Content** | Group Module | Max-width: 800px, centered |
| **Headline** | Text Module (H2) | "Now See the Actual Economics" — white, `clamp(32px, 4vw, 44px)` |
| **Body** | Text Module | "You've seen the arsenal. Now see the math..." — 18px, `rgba(255,255,255,0.9)` |
| **Primary CTA** | Button Module | `See Partner Economics →` → `/partner-program/economics.html` — White bg, `#2d7bc4` text |
| **Secondary CTA** | Button Module | `Schedule Discovery Call` → `/demo.html` — Ghost button |

> **Note:** CTA body says "5-year projections" but Economics page shows 3-year projections. **Fix:** Change body text to "margins, recurring revenue, and multi-year projections" (remove specific "5-year").

### Responsive

Same as other Partner CTA sections.

---

## Scroll Animation Strategy (Divi 5 Interactions)

| Animation | Divi 5 Interaction | Settings |
|-----------|-------------------|----------|
| Product cards slide-up | Scroll → Slide Up | 400ms ease, 200ms stagger |
| Lifecycle phases fade-in | Scroll → Fade In | 400ms ease, 100ms stagger |
| Lifecycle arrows draw | Scroll → Custom CSS (Code Module) | 400ms each, sequential |
| Reverse cut phases fade-in | Scroll → Fade In | 400ms ease, 100ms stagger |
| Competitive cards fade-in | Scroll → Fade In | 400ms ease, 100ms stagger |
| Card hover lifts | Hover → Transform | translateY: -4px |
| Number Counters | Number Counter module | Auto on viewport entry |
| Ace card fade-in | Scroll → Fade In | 600ms ease |
| CTA slide-up | Scroll → Slide Up | 600ms ease |

---

## Page-Specific JavaScript

| Component | Static Build | Divi 5 Equivalent |
|-----------|-------------|-------------------|
| Scroll animations | `DigiWinUI.initScrollAnimation()` | Divi 5 Interactions |
| Product card RTL toggle | CSS `direction: rtl` on even cards | Divi 5 Flexbox `flex-direction: row-reverse` per breakpoint |
| Lifecycle arrow connectors | CSS + SVG | Code Module |
| Reverse cut comparison table | HTML table | Code Module |
| Dynamic year (`dw-years`) | `digiwin-dynamic.js` | Code Module snippet or Divi Dynamic Content |

> **Only Code Modules needed:** Lifecycle arrows, reverse cut comparison table, and dynamic year snippet.

---

## Issues Found During Mapping

| Issue | Severity | Recommendation |
|-------|----------|----------------|
| **Largest inline CSS of Partner pages (765 lines)** | Medium | Product cards, lifecycle phases, reverse cut, competitive cards are all page-specific patterns. Shared elements (breadcrumb, hero, CTA) extracted to Divi Presets. |
| **Product card RTL on even rows** | Medium | Divi 5's Flexbox `row-reverse` handles this natively. No custom CSS needed. |
| **"Foxconn Backing" claim** | Medium | Verify nature of Foxconn relationship before using as sales point. DigiWin is listed (300378) — confirmed. But "Foxconn backing" implies investment — check if this is Foxconn Industrial Internet (FII) strategic investment. |
| **"90% of Tier-1 capability at ~70% of the price"** | Medium | Specific comparative claim. Should be validated or softened. |
| **CTA says "5-year projections"** | Low | Economics page shows 3-year. Fix body text. |
| **Product links to `/products/*.html`** | Low | Verify these pages exist before Divi build. They do exist in current static build. |
| **Competitor naming is extensive** | Info | SAP, Oracle, NetSuite, Kingdee, Yonyou, Odoo — all named. Acceptable per Playbook for Track B pages. Ensure claims are factually defensible. |
| **"The Reverse Cut Strategy" is strongest section** | Info | Directly maps to VP's documented strategy. Highly compelling narrative. Preserve in Divi build. |

---

## Shared Presets to Create (Across All 4 Partner Pages)

These patterns appear on this page AND other Partner pages. Create as Divi 5 Option Group Presets:

| Preset Name | Description | Pages Using It |
|-------------|-------------|---------------|
| `dw-partner-hero` | Dark gradient bg, left-aligned content, dot pattern overlay | All 4 Partner pages |
| `dw-partner-breadcrumb` | 14px, rgba white, linked to parent | Economics, Business Model, Solutions |
| `dw-partner-hero-stats` | 3 or 4-column grid below hero, border-top separator | Hub, Economics, Solutions |
| `dw-partner-section-header` | Label (mono, blue, uppercase) + Title (700, clamp) + Subtitle (body, light) | Every section on all 4 pages |
| `dw-partner-cta-banner` | Blue gradient bg, centered content, dual buttons, dot pattern | All 4 Partner pages |
| `dw-partner-card-hover` | translateY(-4px), shadow, 0.4s ease | All card types across all 4 pages |
| `dw-partner-dark-box` | Navy gradient bg, card radius, padding 40px, diamond/dot pattern | Hub (benefits, insight), Economics (bar chart), Business Model (insight), Solutions (ace card, proof bar, comparison) |
| `dw-partner-pill-badge` | Mono 11px, per-color bg/border, pill shape | All badge types across all 4 pages |

---

## Validation Checklist (Divi 5 Build)

- [ ] Breadcrumb navigates to Partner Hub
- [ ] Hero headline: second line "Start Deploying a Modular Arsenal" in blue (#00AFF0)
- [ ] 3 hero stats with correct values (44, 50K+, 4)
- [ ] 4 product cards render with alternating layout (odd: info-left, even: info-right)
- [ ] RTL layout reverses correctly on even cards
- [ ] Product cards stack to 1-column on tablet/mobile
- [ ] Each product has 4 features in Icon List
- [ ] License margins show 30-40% (undersell strategy — NOT actual 50-70%)
- [ ] 4 lifecycle phases render horizontally with arrow connectors
- [ ] Phase colors are correct: blue → green → amber → purple
- [ ] Lifecycle arrows hidden on mobile
- [ ] 3 reverse cut phase cards with amber accents
- [ ] Client quotes have left amber border
- [ ] Dark comparison table: "Full ERP" values are red with strikethrough
- [ ] 3 competitive cards with red "vs." tags
- [ ] Competitive points are structured (bold lead + description)
- [ ] "Use When" tags in amber
- [ ] Ace Card displays with diamond pattern on dark bg
- [ ] CTA body says "multi-year projections" (NOT "5-year projections")
- [ ] CTA says "Schedule Discovery Call" (NOT "Request Demo")
- [ ] All product links point to existing pages
- [ ] All internal links work
- [ ] Responsive: all grids collapse correctly
- [ ] Colors match Design Variables
- [ ] Fonts: Noto Sans headings/body, JetBrains Mono labels/badges

---

*This spec supersedes `ContentSpec_PartnerSolutions_1.0.md` for the Divi 5 build.*
