# Content Spec: Partner Economics — Divi 5 Build (2.0)

**Batch:** 1 (Highest Priority)
**PRD Reference:** Section 2.3 — Partner Economics
**Playbook Reference:** Sections 2.3 (Track B Voice), 3.5 (Economics Page Arc), 7.4 (Partner Economics Notes)
**Status:** v2.0 — Mapped to Divi 5 modules from HTML build
**Last Updated:** February 12, 2026
**Platform:** WordPress + Divi 5

---

## Page Overview

| Element | Specification |
|---------|---------------|
| **Audience** | Distributor prospects in evaluation stage — they want numbers, not narrative |
| **Objective** | Prove the financial case. "Spreadsheet energy" — feels like opening a spreadsheet, not reading a brochure (Playbook 7.4). |
| **URL** | digiwin.co.th/partner-program/economics.html |
| **Emotional Arc** | Numbers-first > Revenue model > Year 1-2-3 projection > Protection > CTA |
| **Page Structure** | 5 sections, ~620 lines inline CSS in static build |

---

## Divi 5 Capabilities Leveraged

| Divi 5 Feature | Where Used | Why |
|----------------|-----------|-----|
| **CSS Grid Layout** | Revenue stream cards, year journey cards, protection cards, bar chart | Responsive grid controls per breakpoint |
| **Group Module** | Revenue stream cards, year cards, protection cards, proof bar | Card containers with structured internal layouts |
| **Nested Modules** | Revenue cards (dark header → white body → margin grid → note) | Complex card internals that need multiple layout zones |
| **Design Variables** | Colors, fonts, spacing | Global consistency |
| **Number Counter** | Hero proof bar (100%), bar chart values | Animated count-up |
| **Interactions System** | Card fade-ins, hover lifts, bar chart reveal | Replaces custom scroll JS |
| **Icon List Module** | Protection card bullet points | Structured lists with per-item icons |
| **Code Module** | Dot pattern overlay, diamond pattern overlay | SVG texture overlays |

---

## Design Variables Reference

> **Global Design Variables are defined in `ContentSpec_Home_Divi5_2.0.md`.** This page inherits the same set.

### Page-Specific Colors

| Color | Value | Usage |
|-------|-------|-------|
| Green accent (primary) | #4ade80 | Hero proof values, Year 3 accent, highlighted metrics |
| Green dark | #22c55e | Year 3 gradient end, check icons |
| Blue gradient start | #00AFF0 | Year 2 header gradient start |
| Blue gradient end | #2d7bc4 | Year 2 header gradient end |
| Gray gradient start | #94a3b8 | Year 1 header gradient start |
| Gray gradient end | #64748b | Year 1 header gradient end |
| Green light bg | #f0fdf4 | Highlighted metric cells |
| Red light bg | #fef2f2 | (not used on this page — but available from shared palette) |
| Bar chart blue | #00AFF0 | Y1 and Y2 bars |
| Bar chart green | #4ade80 | Y3 bar (featured) |

---

## Section 1: Hero

**Purpose:** Signal immediately that this page is about numbers. Green accent = money/growth.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(135deg, #1a2e40 0%, var(--dw-dark-navy) 50%, #2d4a5e 100%)`, padding: 140px top / 100px bottom. Dot pattern overlay via Code Module. |
| **Content Column** | Column | Max-width: 900px |
| **Breadcrumb** | Text Module | `Partner Program / Partner Economics` — 14px, `rgba(255,255,255,0.5)`. "Partner Program" links to `/partner-program.html`. Use Divi inline link. |
| **Headline** | Text Module (H1) | `See the Actual Economics—Not a Sales Pitch` — `--dw-heading` 700, `clamp(32px, 4vw, 48px)`, white. "Not a Sales Pitch" in `#4ade80` |
| **Subtitle** | Text Module | "Realistic numbers in Thai Baht..." — `--dw-body` 18px, `rgba(255,255,255,0.75)`, line-height 1.75 |

### Hero Proof Bar

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Row** | Row with CSS Grid | `grid-template-columns: repeat(4, 1fr)`, border-top: `1px solid rgba(255,255,255,0.1)`, margin-top: 48px, padding-top: 40px |

| Stat | Value | Label | Module |
|------|-------|-------|--------|
| 1 | `30-40%` | License Margin | Text Module |
| 2 | `100%` | Service Revenue | Number Counter (suffix: %) |
| 3 | `Fixed` | Predictable MA Cost | Text Module |
| 4 | `6mo` | Lead Lock Protection | Text Module |

Value styling: `--dw-heading` 800, 32px, `#4ade80` (green, not blue — this is the Economics page). Label styling: `--dw-mono` 11px, `rgba(255,255,255,0.5)`, uppercase.

> **Undersell Note (Feb 10, 2026):** Hero shows 30-40%. Actual margins (Silver 50-62%, Golden 62-70%) revealed in the body below. Intentional "exceed expectations" strategy.

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | Full layout, 4-column proof bar |
| Tablet (≤1024px) | Proof bar → 2-column |
| Mobile (≤640px) | Proof bar → 1-column, H1: 28px, proof values: 24px |

---

## Section 2: The 4 Revenue Streams

**Purpose:** Show how partner revenue works — license, service, MA, upsell.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: `--dw-section-pad` |
| **Header** | Group Module | Label + Title + Subtitle, centered |
| **Cards Grid** | Row with CSS Grid | `grid-template-columns: repeat(2, 1fr)`, gap: 24px |
| **Each Card** | Group Module | White bg, `1px solid #e2e8f0`, `--dw-card-radius`, overflow: hidden |

### Revenue Card Internal Structure

Each card has a 2-zone layout (use nested Group Modules):

| Zone | Divi 5 Module | Styling |
|------|--------------|---------|
| **Header Zone** | Group Module | Background: `linear-gradient(135deg, var(--dw-dark-navy), #1a2e40)`, padding: 24px 28px. Contains: icon (48px, `rgba(0,175,240,0.15)` bg, blue border) + title (white, 20px 700) + tag badge (`--dw-mono` 11px, `#4ade80`, `rgba(74,222,128,0.15)` bg, pill shape) |
| **Body Zone** | Group Module | White bg, padding: 28px. Contains: description text + margin grid table + note text |

### Margin Grid (inside body zone)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Grid** | Row with CSS Grid | `grid-template-columns: 1fr 1fr`, gap: 1px, bg: `#e2e8f0` (creates grid lines) |
| **Each Cell** | Group Module | White bg, padding: 12px 16px. Label: `--dw-mono` 11px, `--dw-text-light`. Value: `--dw-heading` 600, 16px, `--dw-text-dark`. Highlighted cells: bg `#f0fdf4`, value color `#22c55e` |

### Revenue Stream Content

#### Stream 1: License Revenue

| Element | Content |
|---------|---------|
| **Tag** | "Front-Loaded Cash Flow" |
| **Description** | You purchase license keys at Distributor Price, sell at SSP. Difference = **immediate gross profit**. |
| **Grid Row 1** | Silver Partner / ~50% margin |
| **Grid Row 2** | Gold Partner / ~62-70% margin (highlighted green) |

#### Stream 2: Service Revenue

| Element | Content |
|---------|---------|
| **Tag** | "100% Retention" |
| **Description** | DigiWin is a product vendor, not a service competitor. **You keep 100%** of all fees. |
| **Grid Row 1** | Workflow iGP Project / ฿800K - ฿1.2M |
| **Grid Row 2** | T100/eMES Project / Hourly billing (highlighted green) |
| **Note** | *We "give up" this high-margin revenue to partners in exchange for market scale.* |

#### Stream 3: Recurring Support (MA)

| Element | Content |
|---------|---------|
| **Tag** | "The Annuity Stream" |
| **Description** | You pay DigiWin a **fixed annual fee** (starting Year 2) for Tier 2 support. You provide Tier 1 and **set your own client rate**. |
| **Grid Row 1** | Your Cost to DigiWin / Fixed annual fee |
| **Grid Row 2** | You Charge the Client / You set the rate (highlighted green) |
| **Note** | *No profit-sharing. Your cost is fixed and predictable.* |

> **VP-confirmed model (Oct 2025):** No 75/25 split. DigiWin charges fixed 12% of SSP. Distributor sets own client rate. This is the canonical model.

#### Stream 4: Upsell & Cross-Sell

| Element | Content |
|---------|---------|
| **Tag** | "Growth Multiplier" |
| **Description** | Revenue doesn't end at Go-Live. Build IP on the **Digiwin.cloud PaaS platform**. |
| **Grid Row 1** | Module Add-ons / Same tier-based margin (30-40%+) |
| **Grid Row 2** | Referral Fees / 5-10% of license (highlighted green) |
| **Note** | *A single client can generate 3-4 additional license sales over 5 years.* |

### Responsive

| Breakpoint | Grid |
|-----------|------|
| Desktop (>1024px) | 2 columns |
| Tablet (≤1024px) | 1 column |
| Mobile (≤640px) | 1 column, margin grids stack if needed |

---

## Section 3: The 3-Year Partner Journey

**Purpose:** Realistic Year 1-2-3 scenarios. Conservative and credible.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(180deg, #f8fafc 0%, #fff 100%)`, padding: `--dw-section-pad` |
| **Header** | Group Module | Label + Title + Subtitle, centered |
| **Year Cards Row** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, gap: 24px |
| **Each Year Card** | Group Module | White bg, `1px solid #e2e8f0`, `--dw-card-radius`, overflow: hidden |
| **Year 3 Card** | Group Module (featured) | Extra: `2px solid #4ade80` border, `0 0 20px rgba(74,222,128,0.1)` glow shadow |
| **Summary Bar Chart** | Group Module | Dark background, below year cards |

### Year Card Internal Structure

| Zone | Divi 5 Module | Styling |
|------|--------------|---------|
| **Header** | Group Module | Gradient bg (per-year color), padding: 24px. Contains: badge pill + title + status line |
| **Body** | Group Module | White bg, padding: 28px. Contains: reality check quote + timeline items + revenue math table + outcome text |

### Year 1: Investment & Ramp

| Element | Content |
|---------|---------|
| **Header Gradient** | `#94a3b8 → #64748b` (gray) |
| **Badge** | "Year 1" |
| **Title** | "Investment & Ramp" |
| **Status** | Silver Partner (Co-Delivery) |
| **Reality Check** | "Don't expect profit in Q1-Q2. Focus is training and first pilot deals." |

**Timeline:**

| Quarter | Activity |
|---------|----------|
| Q1-Q2 | 2 Senior Consultants undergo certification |
| Q3-Q4 | Close 2 Workflow iGP projects |

**Revenue Math:**

| Line Item | Amount |
|-----------|--------|
| License Revenue | ~฿380,000 |
| Service Revenue | ~฿1,600,000 |
| Recurring (MA) | ฿0 (warranty) |
| **Total Year 1** | **~฿2.0M** |

**Outcome:** Break even or small loss, but 2 reference sites and certified team.

### Year 2: Cash Flow Phase

| Element | Content |
|---------|---------|
| **Header Gradient** | `#00AFF0 → #2d7bc4` (blue) |
| **Badge** | "Year 2" |
| **Title** | "Cash Flow Phase" |
| **Status** | Transition to Gold Partner |
| **Reality Check** | "Team deploys without hand-holding. Introduce 'Reverse Cut' with eMES." |
| **Activity** | 3 iGP projects + 1 eMES standalone |

**Revenue Math:**

| Line Item | Amount |
|-----------|--------|
| License Revenue | ~฿1,100,000 |
| Service Revenue | ~฿3,500,000 |
| Recurring (MA) | ~฿100,000 |
| **Total Year 2** | **~฿4.7M** |

**Outcome:** **Profitable practice.** Service revenue funds ops; license revenue is profit.

### Year 3: Asset Building Phase (Featured)

| Element | Content |
|---------|---------|
| **Header Gradient** | `#4ade80 → #22c55e` (green) |
| **Badge** | "Year 3" |
| **Title** | "Asset Building Phase" |
| **Status** | Gold Partner (Specialized) |
| **Reality Check** | "Farming engine kicks in. MA covers a junior consultant. First T100/AIoT upsell." |
| **Activity** | 4 iGP + 1 T100 or 2 eMES add-ons |

**Revenue Math:**

| Line Item | Amount |
|-----------|--------|
| License Revenue | ~฿2,000,000+ |
| Service Revenue | ~฿5,000,000+ |
| Recurring (MA) | ~฿350,000+ (highlighted green) |
| **Total Year 3** | **~฿7.4M+** |

**Outcome:** Business valuation shifts. **Recurring revenue stream and sticky client base.**

### Revenue Math Table (inside each year card)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Table** | Row with CSS Grid OR Code Module | 2-column grid (label / amount). Border-bottom on each row: `1px solid #f1f5f9`. Total row: bold, `--dw-primary-blue` text. |

> **Divi 5 Recommendation:** Use a Code Module with a simple HTML `<table>` for the revenue math. Divi doesn't have a native table module, and trying to build tables from Text modules is fragile.

### 3-Year Summary Bar Chart

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Group Module | Background: `linear-gradient(135deg, var(--dw-dark-navy), #1a2e40)`, `--dw-card-radius`, padding: 48px, margin-top: 48px |
| **Title** | Text Module | "3-Year Revenue Trajectory" — `--dw-heading` 700, 24px, white, centered |
| **Chart** | Code Module | 3 vertical bars using CSS, flexbox-aligned at bottom |

| Year | Value | Label | Color | Height |
|------|-------|-------|-------|--------|
| Y1 | ฿2M | Y1: Surviving | `--dw-primary-blue` | 27% |
| Y2 | ฿4.7M | Y2: Profitable | `--dw-primary-blue` | 63% |
| Y3 | ฿7.4M+ | Y3: Asset | `#4ade80` (featured) | 100% |

> **Divi 5 Note:** The bar chart is best implemented as a Code Module with CSS flexbox bars. Divi's Bar Counters module is horizontal, not vertical. A Code Module with 3 `<div>` bars gives us the exact visual we need.

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | 3 year cards side by side, bar chart at full width |
| Tablet (≤1024px) | Year cards → 1 column (stacked), bars narrower (80px) |
| Mobile (≤640px) | Year cards stacked, bar chart height reduced (150px), smaller text |

---

## Section 4: Your Protection Structure

**Purpose:** Remove risk — partnership protection guarantees.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: `--dw-section-pad` |
| **Header** | Group Module | Label + Title + Subtitle, centered |
| **Cards Grid** | Row with CSS Grid | `grid-template-columns: repeat(2, 1fr)`, gap: 24px |
| **Each Card** | Group Module | White bg, `1px solid #e2e8f0`, `--dw-card-radius`, padding: 32px |

### Protection Card Internal Structure

| Element | Divi 5 Module | Notes |
|---------|--------------|-------|
| **Icon** | Image/Code Module | 48x48px, `rgba(0,175,240,0.15)` bg circle, blue icon |
| **Title** | Text Module (H3) | `--dw-heading` 700, 20px, `--dw-text-dark` |
| **Points** | Icon List Module | 3 items per card, blue dot icons. Each item has **bold lead** + description. |
| **Proof Quote** | Text Module | `--dw-body` 14px italic, `--dw-text-light`, left border 3px solid `--dw-primary-blue`, padding-left 16px |

### Protection Card Content

| Card | Icon | Title | Points Summary | Quote |
|------|------|-------|---------------|-------|
| 1 | Shield | Territory & Conflict Protection | 6-Month Lock · Structural Segmentation · Non-Compete Clause | "Your leads are locked. Contractual protection, not just promises." |
| 2 | Users | Co-Implementation Support | Tiered Support · Entrusted Service Safety Net · On-Site Pilot Assistance | "You are never alone on Go-Live." |
| 3 | Graduation cap | Training & Certification | Mandatory Certification · Role-Based Tracks · Sales "Weaponization" | "Competency transfer, not just manuals." |
| 4 | Pulse | Demand Generation | 100% Lead Distribution · Gold Priority Allocation · Division of Labor | "We feed the army." |

### Responsive

| Breakpoint | Grid |
|-----------|------|
| Desktop (>1024px) | 2 columns |
| Tablet (≤1024px) | 1 column |
| Mobile (≤640px) | 1 column, reduced padding |

---

## Section 5: Final CTA

**Purpose:** Convert — "Let's Talk Numbers."

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(135deg, var(--dw-primary-blue) 0%, #2d7bc4 50%, #1e5a8a 100%)`, padding: `--dw-section-pad`. Dot pattern overlay. |
| **Content** | Group Module | Max-width: 800px, centered |
| **Headline** | Text Module (H2) | "Ready to Run the Numbers for Your Firm?" — white, `clamp(32px, 4vw, 44px)` |
| **Body** | Text Module | "Let's discuss your territory, your targets..." — 18px, `rgba(255,255,255,0.9)` |
| **Primary CTA** | Button Module | `Schedule Discovery Call` → `/demo.html` — White bg, `#2d7bc4` text |
| **Secondary CTA** | Button Module | `Back to Partner Overview` → `/partner-program.html` — Ghost button |

### Responsive

Same as Partner Hub Section 9.

---

## Scroll Animation Strategy (Divi 5 Interactions)

| Animation | Divi 5 Interaction | Settings |
|-----------|-------------------|----------|
| Revenue cards fade-in | Scroll → Fade In | 400ms ease, 100ms stagger |
| Year cards fade-in | Scroll → Fade In | 400ms ease, 150ms stagger |
| Protection cards fade-in | Scroll → Fade In | 400ms ease, 100ms stagger |
| Card hover lifts | Hover → Transform | translateY: -4px |
| Bar chart bars grow | Scroll → Scale Y | From 0 to 1, 600ms ease-out, 200ms stagger |
| Number Counter (100%) | Number Counter module | Auto on viewport entry |
| Hero content slide-up | Scroll → Slide Up | 600ms ease |

---

## Page-Specific JavaScript

| Component | Static Build | Divi 5 Equivalent |
|-----------|-------------|-------------------|
| Scroll animations | `DigiWinUI.initScrollAnimation()` | Divi 5 Interactions |
| Bar chart animation | CSS + IntersectionObserver | Divi 5 Interactions → Scroll → Scale Y |
| Revenue math tables | HTML tables | Code Module (tables) |

> **Only Code Module JS needed:** None. All animations via Divi 5 Interactions. Revenue math tables are pure HTML in Code Modules.

---

## Issues Found During Mapping

| Issue | Severity | Recommendation |
|-------|----------|----------------|
| **Revenue figures are very specific** | Medium | Add disclaimer: "Illustrative scenario — actual results depend on your market and effort." |
| **MA model contradiction** | High | Page may still reference old "75/25 split" or "9%". Must be corrected to VP's model: fixed 12% fee, no profit-sharing. Verify content before Divi build. |
| **Missing "Download Partner Economics Brief"** | Medium | PRD specifies dual CTAs: discovery call + download. Add a download option. |
| **CTA links to `demo.html`** | Low | Rename to `contact.html` |
| **Bar chart needs Code Module** | Low | Divi's Bar Counters are horizontal. Use Code Module for vertical bars. |
| **Revenue math tables need Code Module** | Low | Divi has no native table module. Code Module with `<table>` is cleanest approach. |
| **No 4-Stage Maturity Path section** | Medium | PRD specifies "Filter → Empower → Pilot → Independent". Consider adding or aligning with Hub page's Ready/Silver/Gold terminology. |

---

## Validation Checklist (Divi 5 Build)

- [ ] Breadcrumb navigates to Partner Hub
- [ ] Hero proof bar values in green (#4ade80), not blue
- [ ] "Not a Sales Pitch" in headline is green (#4ade80)
- [ ] 4 revenue stream cards render in 2-column grid
- [ ] Each card has dark header → white body structure
- [ ] Highlighted metric cells have green background (#f0fdf4)
- [ ] MA model says "fixed annual fee" and "you set your own rate" (NOT "75/25 split")
- [ ] 3 year cards with correct header gradients (gray → blue → green)
- [ ] Year 3 card has green border and glow effect
- [ ] Revenue math tables render cleanly (Code Module)
- [ ] Bar chart shows Y1/Y2/Y3 with correct proportions
- [ ] 4 protection cards in 2-column grid
- [ ] Proof quotes have left blue border styling
- [ ] CTA says "Schedule Discovery Call" (NOT "Request Demo")
- [ ] All links work (Partner Hub, demo/contact page)
- [ ] Responsive: cards stack on tablet/mobile
- [ ] Colors match Design Variables
- [ ] Fonts: Noto Sans headings/body, JetBrains Mono labels

---

*This spec supersedes `ContentSpec_PartnerEconomics_1.0.md` for the Divi 5 build.*
