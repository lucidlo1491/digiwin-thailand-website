# Content Spec: Partner Program Hub — Divi 5 Build (2.0)

**Batch:** 1 (Highest Priority)
**PRD Reference:** Section 2.0 — Partner Program (Profit Reframing Hub)
**Playbook Reference:** Sections 2.3 (Track B Voice), 3.1 (Hub Page Arc), 3.3 (Track B Leaf Arc), 6.1 (CTA Hierarchy), 7.2 (Partner Hub Notes)
**Status:** v2.0 — Mapped to Divi 5 modules from HTML build
**Last Updated:** February 12, 2026
**Platform:** WordPress + Divi 5

---

## Page Overview

| Element | Specification |
|---------|---------------|
| **Audience** | Distributor prospects — ERP implementers, accounting firms, IT consultancies |
| **Objective** | Reframe their business model problem and position DigiWin as the solution. **MOST IMPORTANT PAGE per PRD notes.** |
| **URL** | digiwin.co.th/partner-program.html |
| **Emotional Arc** | Provocative (hero disrupts complacency) > Strategic (alternative model) > Transparent (economics previewed) > Direct (CTA) |
| **Page Structure** | 9 sections, ~680 lines inline CSS in static build |

---

## Divi 5 Capabilities Leveraged

| Divi 5 Feature | Where Used | Why |
|----------------|-----------|-----|
| **CSS Grid Layout** | Pain card grids (Sections 2-3), Benefits checklist, Ascension tiers, Market timing cards | Native responsive grids without custom CSS |
| **Group Module** | Pain cards, benefit cards, offering cards, tier steps, timing cards | Card-style containers with shared bg, border, hover |
| **Design Variables** | Colors, fonts, spacing, border radius | All `--dw-*` values set once, referenced site-wide |
| **Interactions System** | Card hovers, scroll fade-ins, hero stats count-up | Replaces `DigiWinUI.initScrollAnimation()` |
| **Nested Modules** | Before/After comparison boxes (Section 4) | Each comparison box contains Icon List + Text modules |
| **Icon List Module** | Before/After model lists, benefits checklist | Per-item icons (X marks, checkmarks) |
| **Number Counter** | Hero stats, Market timing stats | Animated count-up on scroll |
| **Semantic Elements** | Every section | `<section>`, `<nav>` breadcrumb, proper heading hierarchy |
| **Code Module** | SVG illustration (hero right side), dot pattern overlays, grain texture | Complex visuals that need raw HTML/CSS |

---

## Design Variables Reference

> **Global Design Variables are defined in `ContentSpec_Home_Divi5_2.0.md`.** All Partner Program pages inherit the same global set. Key values referenced on this page:

| Variable | Value | Usage on This Page |
|----------|-------|-------------------|
| `--dw-primary-blue` | #00AFF0 | CTAs, badges, accent elements |
| `--dw-dark-navy` | #000864 | Hero backgrounds, dark sections, benefits box |
| `--dw-light-gray` | #F5F7FA | Alternating section backgrounds |
| `--dw-text-dark` | #333333 | Body text on light backgrounds |
| `--dw-text-light` | #64748b | Secondary/support text |
| `--dw-white` | #FFFFFF | Card backgrounds, light text on dark |
| `--dw-heading` | Noto Sans, sans-serif | All headings |
| `--dw-body` | Noto Sans, sans-serif | Body copy |
| `--dw-mono` | JetBrains Mono, monospace | Labels, badges, stats |
| `--dw-section-pad` | 100px top/bottom | Standard section padding |
| `--dw-card-radius` | 20px | Card border radius |

### Page-Specific Colors (not in global set)

| Color | Value | Usage |
|-------|-------|-------|
| Red pain accent | #fecaca (border), #fef2f2/#fff5f5 (gradient bg) | Pain point cards (Sections 2-3) |
| Green model accent | #86efac (border), #f0fdf4/#dcfce7 (gradient bg) | "New Model" comparison box |
| Red model accent | #fecaca (border), #fee2e2 (label bg) | "Old Model" comparison box |
| Green check | #4ade80 | Benefits checklist icons |
| Gold gradient | #fbbf24 → #d97706 | Gold tier circle |
| Silver gradient | #a8a29e → #78716c | Silver tier circle |
| Gray gradient | #94a3b8 → #64748b | Ready tier circle |
| Red stat | #DC2626 | SAP EOL stat (Section 8) |
| Amber stat | #F59E0B | Competitors stat (Section 8) |
| Green stat | #22C55E | Target factories stat (Section 8) |

---

## Section 1: Hero

**Purpose:** Disrupt complacency with a provocative headline that challenges the distributor's identity.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(135deg, #1a2e40 0%, var(--dw-dark-navy) 50%, #2d4a5e 100%)`, padding: 140px top / 100px bottom. Min-height: auto (not full-screen — this is a content page, not a landing hero). |
| **SVG Illustration** | Code Module | Positioned absolute right side. Stacking rectangles + grid pattern + connection nodes. `pointer-events: none`, `opacity: 0.6`. Hidden on mobile (≤1024px). |
| **Content Column** | Column | Max-width: 700px, z-index: 2 (above SVG) |
| **Badge** | Text Module | "For ERP Implementers & IT Consultants" — `--dw-mono` 12px uppercase, `rgba(0,175,240,0.2)` bg, `rgba(0,175,240,0.3)` border, color `#7EC8F2`, pill shape (border-radius 100px), with user-plus SVG icon inline |
| **Headline** | Text Module (H1) | `Tired of Selling Man-Hours? The Problem Isn't Your Team.` — `--dw-heading` 700, `clamp(32px, 4vw, 48px)`, white. "Man-Hours" in `--dw-primary-blue` via Divi inline text color |
| **Subtitle** | Text Module | "You're fighting customization wars..." — `--dw-body` 18px, `rgba(255,255,255,0.75)`, line-height 1.75 |
| **Button Row** | Group Module (Flexbox) | Gap: 16px, flex-wrap: wrap |
| **Primary CTA** | Button Module | `Schedule Partner Strategy Session` → `/demo.html` — `--dw-primary-blue` bg, white text, 16px 36px padding, 12px radius |
| **Secondary CTA** | Button Module | `See the Math First` → `/partner-program/economics.html` — Transparent bg, `rgba(255,255,255,0.6)` border, white text |
| **Stats Bar** | Row (CSS Grid) | `grid-template-columns: repeat(4, 1fr)`, border-top: `1px solid rgba(255,255,255,0.1)`, margin-top: 48px, padding-top: 40px |

### Hero Stats (inside Row)

| Stat | Value | Label | Module |
|------|-------|-------|--------|
| 1 | `100%` | Service Fees You Keep | Number Counter (suffix: %) |
| 2 | `30-40%` | License Margin | Text Module (range, not counter) |
| 3 | `9%` | Annual Maintenance Share | Text Module |
| 4 | `6 mo` | Lead Lock Protection | Text Module |

Number styling: `--dw-heading` 800, 32px, white. Label styling: `--dw-mono` 11px, `rgba(255,255,255,0.5)`, uppercase, 0.1em spacing.

> **Note:** Only `100%` uses Number Counter (count from 0 to 100). The others are ranges/text — use Text modules.

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | Full layout with SVG illustration |
| Tablet (≤1024px) | SVG hidden, stats bar → 2-col grid |
| Mobile (≤640px) | Padding: 120px top / 80px bottom, stats → 1-col, H1: 32px |

---

## Section 2: Reality Check — Revenue Model Pain

**Purpose:** Name the 3 revenue model problems. The "Pain Point Trio."

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: `--dw-section-pad` |
| **Header** | Group Module | Centered: Text (headline) + Text (subhead) |
| **Cards Grid** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, gap: 24px |
| **Each Card** | Group Module | Background: `linear-gradient(135deg, #fef2f2, #fff5f5)`, border: `1px solid #fecaca`, border-radius: `--dw-card-radius`, padding: 32px. Hover: `translateY(-4px)` + `0 12px 24px rgba(220,38,38,0.08)` shadow. |

### Card Structure (inside each Group)

| Element | Divi 5 Module | Notes |
|---------|--------------|-------|
| **Icon** | Image Module or Code Module | 48x48px, circle container with red-tinted bg |
| **Title** | Text Module (H3) | `--dw-heading` 700, 20px, `--dw-text-dark` |
| **Body** | Text Module | `--dw-body` 15px, `--dw-text-light`, line-height 1.65. **Bold** text within body uses Divi inline bold. |

### Pain Card Content

| Card | Icon | Title | Key Bold Text |
|------|------|-------|--------------|
| 1 | Bar chart (declining) | The "Margin Erosion" Crisis | **35% to 18%** |
| 2 | Dollar sign | The "Unbillable Overrun" | **cannot bill for** |
| 3 | Lock | The "Ghost IT" Burden | **Most Thai SMEs** |

> **Data Note (Feb 10, 2026):** Card 3 uses "Most Thai SMEs" not "80% of Thai SMEs". The 80% figure is from DigiWin IDP docs but not externally cited.

### Responsive

| Breakpoint | Grid Columns |
|-----------|-------------|
| Desktop (>1024px) | 3 columns |
| Tablet (≤1024px) | 2 columns (card 3 spans 2, centered) |
| Mobile (≤640px) | 1 column |

---

## Section 3: Reality Check — Operational Pain

**Purpose:** 3 more operational pain points. Extends the trio to 6 total.

### Divi 5 Implementation

Identical structure to Section 2 with these differences:

| Element | Difference from Section 2 |
|---------|--------------------------|
| **Section Background** | `#f8fafc` (light gray variant) |
| **Padding** | 60px top, 100px bottom (tighter top — flows from Section 2) |
| **Card Style** | Same red-tinted gradient cards |

### Pain Card Content

| Card | Icon | Title | Key Bold Text |
|------|------|-------|--------------|
| 1 | Gauge | Consultant Burnout | **"Data Babysitters"** |
| 2 | Clock | The "Knowledge Ceiling" | **฿200,000 in recruitment plus 6 months** |
| 3 | Users | The "Sales vs. Delivery" War | **perpetual conflict** |

### Section CTA

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Link Button** | Button Module | `Read the Full Diagnosis →` → `/partner-program/business-model.html` — Ghost style (transparent bg, blue text/border) |

### Responsive

Same as Section 2 (3 → 2 → 1 column).

---

## Section 4: The Alternative Model — "You Keep the Meat, We Drink the Soup"

**Purpose:** Present the DigiWin partner model as a structural alternative.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(180deg, #f8fafc 0%, #fff 100%)`, padding: `--dw-section-pad` |
| **Header** | Group Module | Centered: Text (headline) + Text (subhead) |
| **Comparison Layout** | Row with CSS Grid | `grid-template-columns: 1fr auto 1fr` (old | arrow | new). Max-width: 1000px, centered. |
| **Old Model Box** | Group Module | Border: `2px solid #fecaca`, radius: 16px, padding: 32px |
| **Arrow/Divider** | Code Module or Image | Large `→` arrow (custom SVG), vertically centered. On mobile: rotates 90° |
| **New Model Box** | Group Module | Border: `2px solid #86efac`, radius: 16px, padding: 32px |
| **Benefits Grid** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, gap: 24px, margin-top: 64px |

### Old Model Box Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Label** | Text Module | "Typical Vendor Model" — `--dw-mono` 11px, `#dc2626`, bg `#fee2e2`, pill badge |
| **Title** | Text Module (H3) | "Vendor Takes the Meat" — `--dw-heading` 700, 20px |
| **List** | Icon List Module | 4 items with red X icons (#dc2626): Vendor controls pricing · Partner is just reseller · Direct team competes · Maintenance goes to HQ |

### New Model Box Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Label** | Text Module | "DigiWin Strategic Concession" — `--dw-mono` 11px, `#22c55e`, bg `#dcfce7`, pill badge |
| **Title** | Text Module (H3) | "Partner Keeps the Meat" — `--dw-heading` 700, 20px |
| **List** | Icon List Module | 4 items with green checkmarks (#22c55e): **100%** implementation & service · **30-40%** license margin · **Zero** channel conflict · **9%** annual maintenance |

### Benefits Cards (3 total)

| Card | Icon | Title | Body |
|------|------|-------|------|
| 1 | Layers | Zero Channel Conflict | We don't have a direct sales team competing... |
| 2 | Lock | Deal Registration Protection | Once you book a lead, locked for **6 months**... |
| 3 | Trending up | Land & Expand Strategy | Enter with **eMES or Workflow**, then upsell... |

Each card: Group Module, white bg, `1px solid #e2e8f0` border, `--dw-card-radius`, padding 32px. Hover: `translateY(-4px)` + shadow.

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | 3-column comparison (old → arrow → new), 3-column benefits |
| Tablet (≤1024px) | Comparison stacks vertically (arrow rotates 90°), benefits → 2-col |
| Mobile (≤640px) | All 1-column |

---

## Section 5: What You Get as a DigiWin Partner

**Purpose:** Concrete value exchange — what the partner receives.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: `--dw-section-pad` |
| **Header** | Group Module | Centered: Text (headline) + Text (subhead) |
| **Offering Cards** | Row (2 columns) | Gap: 24px, each card links to a sub-page |
| **Each Card** | Group Module (linked) | Entire card clickable. White bg, `1px solid #e2e8f0`, `--dw-card-radius`, padding: 40px. Hover: border `--dw-primary-blue`, `translateY(-4px)`, blue shadow. |
| **Benefits Box** | Group Module | Background: `linear-gradient(135deg, var(--dw-dark-navy), #1a2e40)`, `--dw-card-radius`, padding: 48px. Diamond pattern overlay via Code Module or background image. |

### Offering Card Content

| Card | Icon | Title | Description | Link Text | Link Target |
|------|------|-------|-------------|-----------|-------------|
| 1 | Target | The Solution Stack | Proven products: ERP, MES, WMS, AIoT. 44 years of development. | "View Product Portfolio →" | `/partner-program/solutions.html` |
| 2 | Dollar sign | Partner Economics | Transparent margins, predictable revenue share, multi-year projections. | "See the Numbers →" | `/partner-program/economics.html` |

### Benefits Box — Checklist

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Title** | Text Module | "Partner Benefits at a Glance" — `--dw-heading` 700, 24px, white |
| **Checklist** | Row with CSS Grid | `grid-template-columns: repeat(4, 1fr)`, gap: 16px |
| **Each Item** | Icon List Module item OR Blurb | Green check icon (`#4ade80`) + white text, 14px |

Checklist items (8 total, 4 columns × 2 rows):
1. Protected territory rights
2. Technical certification
3. Sales enablement support
4. Marketing co-investment
5. Implementation methodology
6. Ongoing product updates
7. Deal registration protection
8. Annual partner summit

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | 2-column offering cards, 4-column checklist |
| Tablet (≤1024px) | Offering cards stacked, 2-column checklist |
| Mobile (≤640px) | 1-column everything |

---

## Section 6: Continue Your Research

**Purpose:** Self-directed research path for skeptical distributors who aren't ready to talk.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(180deg, #f8fafc, #fff)`, padding: `--dw-section-pad` |
| **Header** | Group Module | Centered |
| **Steps Row** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, gap: 32px. Connecting gradient line via Code Module (absolute positioned pseudo-element behind step circles). |
| **Each Step** | Group Module | Centered text alignment, padding: 32px |

### Step Content

| Step | Number | Title | Description | CTA | Link |
|------|--------|-------|-------------|-----|------|
| 1 | 1 | Deepen the "Why" | Understand why margin erosion is *structural* | "The Evolving Business Model →" | `/partner-program/business-model.html` |
| 2 | 2 | Evaluate the "Weapon" | See if DigiWin gives you a better weapon... | "The Solution Stack →" | `/partner-program/solutions.html` |
| 3 | 3 | Verify the "Math" | You won't sign until you see the spreadsheet. | "Partner Economics →" | `/partner-program/economics.html` |

### Number Circle Styling

| Element | Divi 5 Module | Styling |
|---------|--------------|---------|
| **Circle** | Text Module or Circle Counter | 56x56px, `--dw-primary-blue` bg, white text, `--dw-heading` 700, 20px, border-radius 50% |
| **Connecting Line** | Code Module | Gradient line: `--dw-primary-blue` → `#86efac`, 2px height, positioned between circles. Hidden on mobile. |

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | 3 columns with connecting line |
| Tablet (≤1024px) | 2 columns (step 3 centered below), connecting line hidden |
| Mobile (≤640px) | 1 column, no connecting line |

---

## Section 7: Structured Ascension Path

**Purpose:** Show the 3-tier partner journey.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: 60px top / 100px bottom |
| **Header** | Group Module | Centered |
| **Tiers Row** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, gap: 24px |
| **Each Tier** | Group Module | White bg, `1px solid #e2e8f0`, `--dw-card-radius`, padding: 32px, center-aligned. Hover: `translateY(-4px)`, shadow. |

### Tier Content

| Tier | Letter | Circle Gradient | Title | Description |
|------|--------|----------------|-------|-------------|
| 1 | R | `#94a3b8 → #64748b` (gray) | Ready (Entry) | **~40% margin** — Co-delivery required. "Earn while you learn." |
| 2 | S | `#a8a29e → #78716c` (warm gray) | Silver (Collaborative) | **~45% margin** — Supervised delivery. You lead; we support. |
| 3 | G | `#fbbf24 → #d97706` (gold) | Gold (Independent) | **~50%+ margin** — Full autonomy. Maximum margins. |

### Letter Circle Styling

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------|
| **Circle** | Text Module with custom CSS or Code Module | 64x64px, gradient background per tier color, white text, `--dw-heading` 800, 24px, border-radius 50%, box-shadow: `0 4px 12px rgba(0,0,0,0.15)` |

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | 3 columns |
| Tablet (≤1024px) | 3 columns (narrower) |
| Mobile (≤640px) | 1 column, stacked |

---

## Section 8: Market Timing — "Why Now"

**Purpose:** Create urgency with converging market forces.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `--dw-light-gray`, padding: 80px top/bottom |
| **Header** | Group Module | Label + Title + Subtitle |
| **Cards Row** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, gap: 24px |
| **Each Card** | Group Module | White bg, `1px solid #e2e8f0`, `--dw-card-radius`, padding: 32px. Hover: `translateY(-4px)`, shadow. |

### Section Header

| Element | Content |
|---------|---------|
| **Label** | "Why Now" — `--dw-mono` 12px, `--dw-primary-blue`, uppercase |
| **Title** | "The Thai Market Window Is Open" |
| **Subtitle** | "Three converging forces are creating a rare opportunity..." |

### Market Timing Cards

| Card | Stat | Stat Color | Title | Body |
|------|------|-----------|-------|------|
| 1 | 2027 | `#DC2626` | SAP ECC End-of-Life | SAP ECC reaches end of maintenance in 2027... |
| 2 | ~20 | `#F59E0B` | Competitors Scaling Fast | Kingdee and Yonyou each now have ~20 people... |
| 3 | 8,000 | `#22C55E` | Target Factories Identified | From 50,000+ Thai manufacturers, we've filtered to 8,000... |

Stat styling: `--dw-heading` 800, 48px, per-card color. Title: `--dw-heading` 700, 20px, `--dw-text-dark`.

> **Divi 5 Note:** Use Number Counter for `2027` and `8,000` (animated count-up). Use Text Module for `~20` (the tilde prefix makes counter awkward).

### Responsive

| Breakpoint | Grid |
|-----------|------|
| Desktop (>1024px) | 3 columns |
| Tablet (≤1024px) | 2 columns (card 3 full-width) |
| Mobile (≤640px) | 1 column |

---

## Section 9: Final CTA

**Purpose:** Primary conversion section.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(135deg, var(--dw-primary-blue) 0%, #2d7bc4 50%, #1e5a8a 100%)`, padding: `--dw-section-pad`. Dot pattern overlay via Code Module (SVG radial-gradient, opacity 0.1). |
| **Content** | Group Module | Max-width: 800px, centered, z-index above overlay |
| **Headline** | Text Module (H2) | "Ready to Discuss Your Territory?" — `--dw-heading` 700, `clamp(32px, 4vw, 44px)`, white |
| **Body** | Text Module | "This is not a 'sales call.'..." — `--dw-body` 18px, `rgba(255,255,255,0.9)`, line-height 1.65 |
| **Button Row** | Group Module (Flexbox) | Centered, gap: 16px, flex-wrap: wrap |
| **Primary CTA** | Button Module | `Schedule Partner Strategy Session` → `/demo.html` — White bg, `#2d7bc4` text, 600 weight. Hover: `translateY(-3px)`, deeper shadow. |
| **Secondary CTA** | Button Module | `See the Math First` → `/partner-program/economics.html` — Transparent bg, `rgba(255,255,255,0.6)` border, white text. Hover: `rgba(255,255,255,0.15)` bg. |
| **Footer text** | Text Module | "Not ready to talk? Download the Partner Readiness Checklist..." — 14px, `rgba(255,255,255,0.7)` |

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Desktop | Full layout |
| Tablet (≤1024px) | H2 → 36px, buttons stack if needed |
| Mobile (≤640px) | H2 → 32px, padding: 80px 24px |

---

## Scroll Animation Strategy (Divi 5 Interactions)

| Animation | Divi 5 Interaction | Settings |
|-----------|-------------------|----------|
| Pain cards fade-in | Scroll → Fade In | Duration: 400ms, ease, stagger: 70ms |
| Benefit cards fade-in | Scroll → Fade In | Duration: 400ms, ease, stagger: 70ms |
| Card hover lift | Hover → Transform | translateY: -4px to -6px |
| Hero stats appear | Scroll → Fade In | Delay: 300ms, duration: 600ms |
| Number Counter (100%) | Number Counter module | Auto-animate on viewport entry |
| Research steps reveal | Scroll → Slide Up | Duration: 400ms, ease, stagger: 100ms |
| Tier cards fade-in | Scroll → Fade In | Duration: 400ms, ease, stagger: 100ms |
| Market timing cards | Scroll → Fade In | Duration: 400ms, ease, stagger: 100ms |
| CTA slide-up | Scroll → Slide Up | Duration: 600ms, ease |

> **Zero custom JavaScript needed** — all animations handled by Divi 5 Interactions.

---

## Page-Specific JavaScript

| Component | Static Build | Divi 5 Equivalent |
|-----------|-------------|-------------------|
| Scroll animations | `DigiWinUI.initScrollAnimation()` | Divi 5 Interactions → Scroll Effects |
| Hero illustration SVG | Inline SVG with CSS animations | Code Module (preserve SVG) |
| Dynamic year | `digiwin-dynamic.js` | Code Module snippet or manual update |
| No tab switching | N/A | N/A |
| No filter logic | N/A | N/A |

> **Only remaining custom code:** Hero SVG illustration (Code Module) and dynamic year calculation.

---

## Issues Found During Mapping

| Issue | Severity | Recommendation |
|-------|----------|----------------|
| **Hero SVG illustration is ~200 lines** | Medium | Use Code Module for launch; convert to Lottie post-launch |
| **CTA links to `demo.html`** | Low | Filename contradicts no-demo principle. Rename to `contact.html` when building |
| **"9% Annual MA Share" in hero stats** | Medium | VP's actual model (Oct 2025): fixed 12% fee to DigiWin, not 9%. Verify before Divi build and correct if needed |
| **Before/After arrow SVG** | Low | Simple element but needs custom SVG. Include in Code Module |
| **Dot pattern overlays** | Low | Repeated across multiple sections. Create a reusable Divi 5 Preset for the pattern overlay Code Module |
| **6 pain cards across 2 sections** | Info | Could be merged into 1 section with 2 rows in Divi 5, but keeping 2 sections preserves the narrative pause between "Revenue Pain" and "Operational Pain" |
| **PRD deviation: 3-tier vs 4-stage** | Medium | PRD says "Filter → Empower → Pilot → Independent." HTML uses "Ready/Silver/Gold." Align terminology before Divi build. |
| **Missing Social Proof section** | Medium | PRD specifies a "Social Proof for Partners" section with partner testimonials and stock code. Not in current HTML. Consider adding. |

---

## CSS to Extract to Shared Stylesheet

These patterns repeat across all 4 Partner Program pages and should become shared Divi 5 Presets:

| Pattern | Sections Using It |
|---------|------------------|
| Breadcrumb styling | All Partner sub-pages (Economics, Business Model, Solutions) |
| Dark hero with dot pattern | All 4 Partner pages |
| Hero stats bar (4-col grid) | Hub + Economics |
| Red pain cards | Hub + Business Model |
| Section header (label + title + subtitle) | Every section across all 4 pages |
| Blue CTA banner with dual buttons | All 4 Partner pages |
| Card hover effect (translateY + shadow) | All 4 Partner pages |

> **Divi 5 Action:** Create Option Group Presets for these shared patterns so they can be applied across all Partner pages with one click.

---

## Validation Checklist (Divi 5 Build)

- [ ] Hero renders with SVG illustration on desktop, hidden on mobile
- [ ] Badge "For ERP Implementers & IT Consultants" pill displays correctly
- [ ] "Man-Hours" in headline is blue (#00AFF0)
- [ ] Hero stats bar shows 4 stats in a grid
- [ ] 6 pain cards (3+3) render in correct grids with red accent styling
- [ ] "Most Thai SMEs" used (NOT "80% of Thai SMEs")
- [ ] Before/After comparison renders side by side on desktop
- [ ] Arrow rotates 90° on mobile in comparison section
- [ ] New Model checkmarks are green, Old Model X marks are red
- [ ] 2 offering cards are clickable and link to correct sub-pages
- [ ] Benefits checklist renders in 4-column dark box
- [ ] 3 research steps show numbered circles with connecting line
- [ ] 3 ascension tiers show correct letter circles (R gray, S warm gray, G gold)
- [ ] Margin percentages: ~40%, ~45%, ~50%+ (not specific price sheet numbers)
- [ ] 3 market timing cards show correct stat colors
- [ ] CTA says "Schedule Partner Strategy Session" (NOT "Request Demo")
- [ ] Secondary CTA links to Economics page
- [ ] All internal links point to pages that exist
- [ ] No horizontal scroll on any breakpoint
- [ ] Hover effects work on all card types
- [ ] Colors match Design Variables exactly
- [ ] Fonts: Noto Sans for headings/body, JetBrains Mono for labels

---

*This spec supersedes `ContentSpec_PartnerProgram_1.0.md` for the Divi 5 build. The 1.0 spec remains as the HTML build reference.*
