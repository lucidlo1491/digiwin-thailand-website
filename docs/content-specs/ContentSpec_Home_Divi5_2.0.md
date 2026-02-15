# Content Spec: Home Page — Divi 5 Build (2.0)

**Batch:** 0 (Foundation Page)
**PRD Reference:** Section 4, Page 1.0
**Playbook Reference:** Section 2 (Dual-Audience Emotional Arcs), Section 5 (CTA Hierarchy)
**Status:** v2.0 — Reverse-engineered from current HTML source + mapped to Divi 5 modules
**Last Updated:** February 14, 2026
**Platform:** WordPress + Divi 5
**HTML Source:** `complete_website/src/pages/index.html` (3,543 lines)

---

## Page Overview

| Element | Specification |
|---------|---------------|
| **Audience** | Both — factory operators (Track A) AND distributor prospects (Track B) |
| **Objective** | Segment and route visitors within 5 seconds |
| **URL** | digiwin.co.th (homepage) |
| **Emotional Arc (Track A)** | Empathetic → "We see your invisible pain" → Confident → Action |
| **Emotional Arc (Track B)** | Provocative → "Your business model traps you" → Strategic → Action |
| **Page Structure** | 10 sections (Hero → Logo Bar → Factory Checks → Partner Checks → Product Pillars → Industry Tabs → Stats Banner → Trust Anchors → Proven Results → Final CTA) |
| **Structured Data** | Organization + WebSite JSON-LD schemas |

---

## Divi 5 Capabilities Leveraged

| Divi 5 Feature | Where Used | Why |
|----------------|-----------|-----|
| **CSS Grid Layout** | Hero split, Stats grid, Trust grid, Check cards grid, Product grid, Results grid | Native multi-column grids without custom CSS |
| **Nested Modules** | Industry Tabs, Product Cards, Trust Cards | Each tab/card contains full layouts (Image + Text + List + Button). No Code Module workaround needed. |
| **Group Module** | Trust cards, Check cards, Product pillars, Result cards | Card-style containers with shared background, border, hover effects |
| **Design Variables** | Colors, fonts, spacing | Define brand tokens once; reference everywhere |
| **Interactions System** | Card hovers, scroll reveals, stat counters | Built-in scroll-triggered animations and hover transforms replace custom JS |
| **Lottie Module** | Hero illustrations (post-launch upgrade) | Complex SVG animations to lightweight .json Lottie files |
| **Customizable Breakpoints** | All sections | 7 breakpoints replace manual 1024/768/640 media queries |
| **Semantic Elements** | Every section | `<section>`, `<nav>`, `<article>`, `<main>` tags for SEO and accessibility |
| **Flexbox Layout** | CTA buttons, hero stats, logo bar, stat rows | Wrapping, spacing, alignment controls without CSS |
| **Group Carousel** | Client logo bar | Native auto-scrolling logo carousel |
| **Icon List Module** | Product feature lists, industry feature lists | Per-item icons with consistent formatting |

---

## Design Variables (Global — Set Once in Divi 5)

Define these in Divi 5's Design Variables panel so every module references them:

### Colors
| Variable Name | Value | Usage |
|--------------|-------|-------|
| `--dw-blue` | #00AFF0 | CTAs, links, accents, icon backgrounds |
| `--dw-navy` | #000864 | Dark sections, footer, hero overlays, headings |
| `--dw-navy-deep` | #000432 | Gradient dark end |
| `--dw-navy-mid` | #001080 | Gradient mid |
| `--dw-royal` | #003CC8 | Secondary blue, CTA section gradient end |
| `--dw-cyan` | #00E6FF | Particle wave highlights, tech accents |
| `--dw-gray-light` | #F5F7FA | Alternating section backgrounds |
| `--dw-text-dark` | #333333 | Primary body text |
| `--dw-text-light` | #5b6b80 | Secondary/support text (note: #5b6b80 in current build, not #64748b) |
| `--dw-white` | #FFFFFF | Card backgrounds, light text |
| `--dw-partner-gold` | #fef3c7 | Partner panel highlight accent |

### Fonts
| Variable Name | Value | Usage |
|--------------|-------|-------|
| `--dw-heading` | Noto Sans, sans-serif | All headings (H1-H6), weights 500-700 |
| `--dw-body` | Noto Sans, sans-serif | Body copy, descriptions, weight 400 |
| `--dw-mono` | JetBrains Mono, monospace | Labels, badges, stats, codes |
| `--dw-chinese` | Noto Sans SC, sans-serif | CJK fallback (Simplified Chinese per brand kit) |

### Spacing
| Variable Name | Value | Usage |
|--------------|-------|-------|
| `--dw-section-pad` | 100px top/bottom | Standard section padding |
| `--dw-section-pad-sm` | 60px top/bottom | Compact sections (logo bar) |
| `--dw-section-pad-cta` | 120px top/bottom | CTA section padding |
| `--dw-container-max` | 1200px | Max content width |
| `--dw-card-radius` | 20px | Card border radius |
| `--dw-card-gap` | 24px-32px | Grid gap between cards |

---

## Brand Graphic Elements (Recurring Across Sections)

The current HTML uses three DigiWin brand graphic devices that appear throughout the page. These must be handled consistently in Divi 5:

| Brand Element | HTML Class | Description | Divi 5 Approach |
|---------------|-----------|-------------|----------------|
| **Super D Background** | `.dw-d-bg` | Large D mark from logo used as background device, positioned with CSS (bleeding off edges, never centered). Variants: `--particle`, `--gradient`, `--left`, `--center`, `--corner-br` | Code Module positioned absolutely within each Section. Each variant has different opacity, position, and size. |
| **Particle Wave** | `.dw-wave-flow` | Dot-matrix flowing pattern representing data flow at hero bottom and CTA bottom | Code Module (SVG + CSS animation). Height ~220-250px, opacity 0.15-0.5. |
| **Wave Fade Transition** | `.dw-wave-fade` | Subtle particle wave used as section transition (between Checks→Products and Stats→Trust) | Code Module, height ~60px, opacity 0.12-0.15. |
| **Section Scene SVGs** | `.dw-section-scene` | Full-width background illustrations specific to each section (factory flow, revenue ceiling, trust anchors) | Code Module positioned absolute behind content. |

> **Divi 5 Note:** All brand graphic elements are Code Modules. They sit inside the Section but before the Row, with `position: absolute`, `pointer-events: none`, and appropriate z-index. The content Row gets `position: relative; z-index: 2`.

---

## Section 1: Hero — Split Screen

**Purpose:** Immediately segment two audiences with pain-first messaging per Playbook emotional arcs.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | CSS Grid: `grid-template-columns: 1fr 1fr`, min-height: `calc(100vh - 80px)`, margin-top: 80px (header offset), `position: relative; overflow: hidden` |
| **Super D Background** | Code Module | `.dw-d-bg--particle` variant, opacity 0.18, right: -10%, width: 65%, min-height: 80vh. Positioned absolute spanning both panels. |
| **Particle Wave** | Code Module | `.dw-wave-flow`, height: 250px, opacity: 0.5, z-index: 2, bottom of hero. |
| **Left Panel (Track A)** | Column | Background: `linear-gradient(165deg, #0f1419 0%, #1a2632 40%, #000864 100%)` |
| **Right Panel (Track B)** | Column | Background: `linear-gradient(165deg, #00AFF0 0%, #003CC8 40%, #003CC8 100%)` |
| **Each Panel Content** | Group Module | Contains: Text (label) → Text (headline) → Text (subtitle) → Button(s) → Group (stats row) |
| **Illustrations** | Code Module (now) / Lottie Module (later) | See "Illustration Strategy" below |

### Left Panel: Track A — Factory Operators

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Label** | Text Module | `For Manufacturing Business Owners` — JetBrains Mono, 14px, weight 600, uppercase, 0.15em spacing, #00AFF0, with left gradient line (CSS pseudo-element `::before`: 40px wide, 1px, gradient from transparent to #00AFF0) |
| **Headline** | Text Module (H1) | `Your True Costs Are` **`Invisible.`** — Noto Sans 700, clamp(32px, 3.5vw, 52px), white, line-height 1.1, -0.03em tracking. "Invisible." in #00AFF0 using Divi inline color. |
| **Subtitle** | Text Module | `"Shadow Excel" files have replaced your standard operating procedures. Ghost inventory means system says 100, shelf says 50. We fix this—because we've spent 44 years doing nothing but manufacturing software.` — Noto Sans 400, 18px, rgba(255,255,255,0.75), line-height 1.75. Note: "44" uses class `.dw-years` for dynamic year calculation. |
| **CTA Button Row** | Group Module (flexbox) | Two buttons, gap 12px |
| **Primary CTA** | Button Module | `Let's Talk` → `/demo.html` — Primary blue background (#00AFF0), white text |
| **Secondary CTA** | Button Module | `See Our Solutions` → `/products.html` — Ghost style (transparent bg, white border) |
| **Stats Row** | Group Module (nested) | Flexbox row, gap 40px, border-top: 1px solid rgba(255,255,255,0.1), margin-top 48px, padding-top 32px, animation: fadeIn 1s ease-out 0.5s |

#### Stats Row Items (inside Group)

| Stat | Number | Label |
|------|--------|-------|
| 1 | `44` | Years Manufacturing Focus |
| 2 | `50K+` | Factories Served |
| 3 | `300378` | Shenzhen Listed |

Number styling: Noto Sans 800, 32px, #00AFF0, -0.02em tracking, line-height 1. Label styling: JetBrains Mono, 11px, rgba(255,255,255,0.75), uppercase, 0.1em spacing.

> **Divi 5 Note:** Use Number Counter modules for stats 1 and 2 (animated count-up on scroll). Use Text module for `300378` — it's a stock code, not a quantity; no animation.

### Right Panel: Track B — Distributor Prospects

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Label** | Text Module | `For ERP Implementers` — same mono styling, color: rgba(255,255,255,0.9), `::before` gradient line uses rgba(255,255,255,0.8) |
| **Headline** | Text Module (H2) | `Trapped in the` **`Man-Day`** `Model?` — Same sizing. "Man-Day" in #fef3c7 (partner gold) |
| **Subtitle** | Text Module | `Your revenue is capped by headcount. Customization wars burn out your best consultants. We offer a way out—product-based margins that compound instead of compress.` |
| **CTA Button** | Button Module | `Escape the Trap` → `/partner-program.html` — Primary blue background |
| **Stats Row** | Group Module (nested) | Same flex layout as left panel |

#### Stats Row Items

| Stat | Number | Label |
|------|--------|-------|
| 1 | `30–40%` | License Margins |
| 2 | `Yours to Keep` | Maintenance Revenue |

Number styling: white (not blue). Use Text modules (not Number Counter — these are ranges/text).

> **Content Note:** Hero stats use "30-40%" for license margins. This is the "undersell" strategy — actual margins (50-70%) are revealed on the Partner Program page. "Yours to Keep" positioning: we keep the maintenance revenue in your hands.

### Illustration Strategy

The static HTML uses complex inline SVGs with CSS animations:
- **Factory panel (~170 lines SVG):** Ghost inventory warehouse (dashed boxes, "SYS:100 / REAL:47 / Δ -53"), fragmenting Excel spreadsheets, broken data streams, hidden cost bubbles rising, factory outline
- **Partner panel (~180 lines SVG):** Breaking cage ("MAN-DAY" text, bent bars, freedom particles), revenue ceiling breakthrough (cracking line, bursting arrow, explosion particles), compounding revenue streams (LICENSE/SERVICE/RECURRING merging into COMPOUND), clock transformation (fading "BILLABLE HRS"), freedom burst (radiant lines), growth markers (arrows)

**Divi 5 approach:**

| Option | How | Pros | Cons |
|--------|-----|------|------|
| **A: Code Module** (Launch) | Paste SVG + CSS animation code directly into Code Module within each Column | Exact match to current build, fastest path | Large code blocks (~350 lines total), harder to maintain |
| **B: Lottie Module** (Post-launch) | Convert SVGs to Lottie JSON via After Effects/Bodymovin | Tiny file size, GPU-accelerated, 60fps, Divi-native | Requires Lottie creation step |

> **Recommendation:** Start with **Option A** (Code Module) for launch. Schedule Lottie conversion as post-launch optimization. These animations are the page's visual signature.

### Grain Texture Overlay

Both panels and multiple sections use a subtle SVG noise grain texture overlay (`opacity: 0.03-0.04`):
```css
background-image: url("data:image/svg+xml,...feTurbulence type='fractalNoise'...");
```
The factory panel also has an animated grain (`animation: grain 8s steps(10) infinite`).

In Divi 5: Include the grain overlay as part of each Code Module illustration, or add a positioned Code Module overlay per section.

### Light Leak Effect (Partner Panel Only)

The partner panel has a `::after` pseudo-element creating a radial-gradient light leak (top-right, 80% wide, white at 15% opacity). In Divi 5: Add this as custom CSS on the Column, or include in the Code Module.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | 2-column grid, side by side |
| **Tablet (<=1024px)** | Stack to 1 column, each panel min-height: 80vh, padding: 60px 40px |
| **Mobile (<=640px)** | Stack, padding: 48px 24px, min-height: 90vh, stats go vertical (flex-direction: column, gap: 24px) |

---

## Section 2: Client Logo Bar

**Purpose:** Build credibility for both audiences. Social proof before the deep content.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)`, padding: 60px 0, `position: relative; overflow: hidden`. Top border: 1px `linear-gradient(90deg, transparent, #e2e8f0, transparent)` via `::before` |
| **Label** | Text Module | `Trusted by Leading Manufacturers in Thailand` — JetBrains Mono, 13px, weight 500, uppercase, 0.15em spacing, #5b6b80, center-aligned |
| **Logo Strip** | Group Carousel OR Code Module | See below |
| **Stats Row** | Row (3 columns) | Flexbox, center-aligned, gap 60px, border-top: 1px solid #e2e8f0, max-width: 1200px, margin: 0 auto, padding: 32px 40px 0 |

### Logo Strip — 8 Client Logos

The current build uses a CSS-animated infinite-scroll marquee with duplicated logos (16 items total, 8 real + 8 `aria-hidden="true"` clones). Each logo item is a horizontal layout: logo image (left) + company name with subtitle (right).

| # | Company | Logo File | Subtitle | Special |
|---|---------|-----------|----------|---------|
| 1 | Cal-Comp Electronics | `logos/calcomp.png` | SET: CCET | — |
| 2 | TTS Plastic | `logos/tts-plastic.png` | Injection Molding | — |
| 3 | Yeong Guan Energy | `logos/yeong-guan.jpg` | TWSE: 1589 | — |
| 4 | S.T.K. Steel | `logos/stk-steel.png` | Stainless Steel | — |
| 5 | Goldensea Hi-Tech | `logos/goldensea.png` | Specialty Chemicals | — |
| 6 | Chelic Corporation | `logos/chelic.png` | TWSE: 4555 | — |
| 7 | Chung Tai Rubber | `logos/ctr.png` | Vibration Control | `.dw-client-logo--invert` — white-on-transparent logo needs `invert(1)` filter on light backgrounds |
| 8 | Haidilao International | `logos/haidilao.png` | HKEX: 6862 | — |

**Logo styling:**
- Logo image: height 108px, max-width 126px, `object-fit: contain`
- Default filter: `grayscale(100%) opacity(0.45)`
- Hover: `grayscale(0%) opacity(1)` with 0.4s ease transition
- Company name: Noto Sans, 30px, weight 600, #334155, opacity 0.55, hover: opacity 1
- Subtitle (`<small>`): 16px, weight 400, #5b6b80, uppercase, 0.06em spacing

**Marquee animation:** `dw-scroll` keyframes — `translateX(0) → translateX(-50%)`, 35s linear infinite. Pauses on hover. Edge fade: CSS `mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)`.

**Divi 5 approach:**

| Option | Module | Notes |
|--------|--------|-------|
| **Group Carousel** (Preferred) | Group Carousel Module | Put 8 slides with Image + Text modules. Enable auto-scroll. Closest native equivalent. |
| **Code Module** (Fallback) | Code Module | Paste the entire marquee HTML + CSS. Exact match but harder to edit. |

> **Important:** The `prefers-reduced-motion` media query must be respected: animation: none, flex-wrap: wrap, justify-content: center, hide `aria-hidden="true"` duplicates.

### Stats Below Logo Strip

| Stat | Value | Label |
|------|-------|-------|
| 1 | `50,000+` | Factories Worldwide |
| 2 | `44` | Years in Manufacturing |
| 3 | `Certified` | Thai Revenue Department |

Use **Number Counter** modules for `50,000+` and `44` (animated count-up). Use **Text Module** for `Certified` (not a number).

Styling: Value → Noto Sans 700, 28px, #000864, line-height 1.2. Label → Noto Sans, 13px, #5b6b80, margin-top 4px.

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | Full marquee, 3 stats horizontal, logo height 108px |
| Tablet (<=1024px) | Logo height 80px, max-width 96px, name 24px, subtitle 13px, stats gap 40px |
| Tablet (<=768px) | Logo height 64px, max-width 76px, name 20px, subtitle 11px, stats go vertical |
| Mobile (<=640px) | Padding 40px 0, logo height 52px, max-width 60px, name 16px, subtitle hidden, marquee gap 36px |

---

## Section 3: Factory Path — Understanding Checks (Track A)

**Purpose:** Track A empathy section. Name the pains factory owners recognize, creating "they understand us" trust.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(165deg, #f8fafc 0%, #f1f5f9 100%)`, padding: 100px 40px, `position: relative; overflow: hidden` |
| **Super D Background** | Code Module | `.dw-d-bg--left` variant, opacity 0.10, width 50%, left: -20%. Positioned absolute. |
| **Section Scene SVG** | Code Module | Factory production flow background (~90 lines SVG): conveyor lines (solid + dashed for broken connections), machine silhouettes, X marks at data flow breaks, arrow fragments, scattered data dots, question marks, spreadsheet fragments. All in #000864 and #00AFF0 at very low opacity (0.1-0.5). |
| **Header** | Group Module | Center-aligned: label + title + subtitle |
| **Cards Grid** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, gap: 32px. **Important structural note:** Cards 01-03 are inside the grid div. Cards 04-05 are OUTSIDE the grid div (siblings of `.dw-checks-grid` inside `.dw-checks-container`). They display as full-width cards with margin-top: 32px. |
| **Each Card** | Group Module | Background: white, border: 1px solid #e2e8f0, box-shadow: 0 4px 24px rgba(0,0,0,0.04), border-radius: 20px, padding: 40px 32px, `position: relative; overflow: hidden`. Hover: box-shadow 0 20px 60px rgba(0,175,240,0.12), border-color: #00AFF0. Transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1). |
| **Per-Card Background SVG** | Code Module (inside each Group) | `.dw-check-bg` — positioned absolute, top: 0, right: 0, width: 220px, opacity 0.10, hover: 0.18. Each card has a unique thematic illustration. |

### Section Header

| Element | Content |
|---------|---------|
| **Label** | `For Manufacturing Business Owners` — JetBrains Mono, 11px, weight 500, uppercase, 0.2em spacing, #0369a1. Flanking gradient lines (40px, 1px, `::before` and `::after`), `::after` uses `scaleX(-1)`. |
| **Title** | `Do You Recognize These Problems?` — Noto Sans 700, clamp(32px, 4vw, 44px), #000864, line-height 1.15, -0.02em tracking |
| **Subtitle** | `If any of these sound familiar, you're not alone. These are the most common problems we solve for factories across Thailand and Asia.` — Noto Sans, 18px, #5b6b80, line-height 1.6, max-width: 600px, center-aligned |

### Pain Point Cards (5 total)

Each card contains (nested inside Group Module):

| Element | Divi 5 Module | Styling |
|---------|--------------|---------|
| **Background SVG** | Code Module | Unique per card (see below). Absolute positioned, opacity 0.10, hover 0.18. |
| **Number** | Text Module | Noto Sans 800, 64px, #0369a1 at 0.15 opacity |
| **Title** | Text Module (H3) | Noto Sans 700, 20px, #000864 |
| **Quote** | Text Module | Noto Sans 400, 16px italic, #475569, line-height 1.7, padding-left 16px, border-left: 3px solid #00AFF0 |
| **Description** | Text Module | Noto Sans 400, 15px, #5b6b80, line-height 1.6 |

#### Card 1: "Shadow Excel" Reality

| Element | Content |
|---------|---------|
| **Number** | 01 |
| **Title** | "Shadow Excel" Reality |
| **Quote** | "You know your factory isn't actually running on your current system—it's running on spreadsheets because your staff finds the software too rigid or slow." |
| **Description** | Your real operations live in unconnected Excel files, not in your ERP. Financial data doesn't match physical reality because planners work outside the system. |
| **BG SVG** | Scattered spreadsheet cells — rows of rectangles (cell outlines), disconnected dashed arrows, scattered data dots, large "?" |

#### Card 2: "The Black Box" Problem

| Element | Content |
|---------|---------|
| **Number** | 02 |
| **Title** | "The Black Box" Problem |
| **Quote** | "You know exactly how much raw material you bought and how many finished goods you sold, but the 3 weeks in between — your work in progress — are invisible." |
| **Description** | You rely on paper reports filled out yesterday to understand what happened today. You can't see what's happening on the floor right now without walking over and asking. |
| **BG SVG** | 3D opaque box with lock symbol, "IN" arrow entering, "OUT" arrow exiting, "3 WEEKS?" label — what happens inside is hidden |

#### Card 3: "Ghost Inventory" Crisis

| Element | Content |
|---------|---------|
| **Number** | 03 |
| **Title** | "Ghost Inventory" Crisis |
| **Quote** | "The system says you have 100 units, but the shelf has 50. This discrepancy forces your team to hoard 'safety stock' just to survive." |
| **Description** | Inventory inaccuracy ties up millions in unnecessary capital and destroys your ability to promise reliable delivery dates. The "borrowing culture" has replaced discipline. |
| **BG SVG** | Warehouse shelf rack with solid boxes (real) and dashed boxes (ghost), "System: 100" / "Reality: 50" labels, large "≠" symbol |

#### Card 4: "Cost Guesswork" Trap (Full-width, outside grid)

| Element | Content |
|---------|---------|
| **Number** | 04 |
| **Title** | "Cost Guesswork" Trap |
| **Quote** | "You quoted a price last month based on estimated costs. This month the same product costs 15% more to make — and you have no idea why." |
| **Description** | Batch-to-batch cost fluctuations are invisible without production-order-level tracking. You're pricing based on last quarter's averages, not this morning's reality. |
| **BG SVG** | Viewbox 400x180 (wider). Upward cost arrows, price tags with "$???" and "+15%", large faint "15%" watermark |

#### Card 5: "10-Second Answer" Failure (Full-width, outside grid)

| Element | Content |
|---------|---------|
| **Number** | 05 |
| **Title** | "10-Second Answer" Failure |
| **Quote** | "When your biggest customer calls and asks 'where is my order?' — you put them on hold, walk to the shop floor, and hope someone knows." |
| **Description** | Real-time delivery status should be a click away, not a 20-minute investigation. Every hold costs you credibility with the customers who matter most. |
| **BG SVG** | Viewbox 400x180 (wider). Large clock face with tick marks and hands, "20 min..." label, phone icon with hold signal waves |

### CTA Below Cards

| Element | Content |
|---------|---------|
| **Button** | `Let's Talk About Your Factory` → `/demo.html` — Primary blue, centered, margin-top: 56px |

### Responsive

| Breakpoint | Grid Columns |
|-----------|-------------|
| Desktop (>1024px) | 3 columns (cards 01-03). Cards 04-05 full-width below grid. |
| Tablet (<=1024px) | 2 columns. Last card in grid spans 2 columns (`grid-column: span 2`, max-width: 500px, centered). Cards 04-05 full-width. |
| Tablet (<=768px) | 1 column |
| Mobile (<=640px) | 1 column, section padding: 64px 24px, card padding: 32px 24px |

---

## Section 4: Partner Path — Understanding Checks (Track B)

**Purpose:** Track B provocative opening. Name the structural traps that consultants/implementers recognize.

### Divi 5 Implementation

Identical structure to Section 3, but with dark theme:

| Element | Difference from Section 3 |
|---------|--------------------------|
| **Section Background** | `linear-gradient(165deg, #0f1419 0%, #1a2632 50%, #000864 100%)` |
| **Section Scene SVG** | Revenue ceiling visualization (~70 lines): revenue bars hitting a ceiling (dashed blue line "CAP"), man-day clock (large circle with hands), "HEADCOUNT = REVENUE" watermark, shrinking margin lines with squeeze arrows. All in white/blue at very low opacity. |
| **Card Background** | `rgba(255,255,255,0.05)`, border: 1px solid `rgba(255,255,255,0.1)` |
| **Card Hover** | bg `rgba(255,255,255,0.08)`, border-color `rgba(255,255,255,0.2)` |
| **Number Color** | white at 0.15 opacity (not blue) |
| **Title Color** | white |
| **Quote Color** | `rgba(255,255,255,0.8)`, border-left: `rgba(255,255,255,0.3)` |
| **Description Color** | `rgba(255,255,255,0.75)` |
| **Label Color** | `rgba(255,255,255,0.75)`, flanking lines: `rgba(255,255,255,0.4)` |
| **Title Color** | white |

### Section Header

| Element | Content |
|---------|---------|
| **Label** | `For ERP Implementers` |
| **Title** | `Trapped in These Cycles?` |
| **Subtitle** | `The consulting model has structural limits. Recognizing these traps is the first step to escaping them.` |

### Pain Point Cards (3 total, all inside grid)

#### Card 1: "The Man-Day Trap"

| Element | Content |
|---------|---------|
| **Number** | 01 |
| **Title** | "The Man-Day Trap" |
| **Quote** | "Your revenue is mathematically capped by your headcount. You cannot grow your top line without proportionally increasing your payroll costs." |
| **Description** | You are selling hours, not assets. Revenue = Hours Worked, making exponential growth impossible. Every January, you start at zero again. |

#### Card 2: "Customization Death Spiral"

| Element | Content |
|---------|---------|
| **Number** | 02 |
| **Title** | "Customization Death Spiral" |
| **Quote** | "You accept customization requests to win the deal, but then you become married to that code forever." |
| **Description** | You can't upgrade clients on custom code. Support becomes a nightmare of unbillable hours. Your profit evaporated the moment you said "Yes" to a non-standard request. |

#### Card 3: "The Ghost IT Burden"

| Element | Content |
|---------|---------|
| **Number** | 03 |
| **Title** | "The Ghost IT Burden" |
| **Quote** | "You aren't just their ERP consultant—you are their unpaid IT department, fixing Wi-Fi, printers, and user discipline issues." |
| **Description** | Most Thai SMEs lack a dedicated IT manager. You end up subsidizing their operations with your margins — absorbing unbillable work you feel forced to do just to keep the relationship alive. |

> **Data Note:** "Most Thai SMEs" — the original "80% of Thai SMEs" figure appeared in DigiWin's IDP documents but lacks an external source (no OSMEP/FTI/BOI citation). "Most" is defensible; if challenged, reference "based on our experience across 100+ Thai implementations."

### CTA Below Cards

| Element | Content |
|---------|---------|
| **Button** | `See the Way Out` → `/partner-program.html` — Primary blue (#00AFF0), centered |

### Responsive

Same as Section 3, but only 3 cards so grid is simpler: 3 columns → 2 columns → 1 column.

---

## Section Transition: Particle Wave Fade

Between Sections 4 and 5, the HTML inserts:
```html
<div class="dw-wave-fade" style="opacity: 0.15; margin-top: -1px;"></div>
```
This is a subtle particle wave acting as a visual transition from "problems" (dark partner section) to "solutions" (light products section). In Divi 5: Code Module between sections, or a thin Section with the SVG pattern.

---

## Section 5: Product Pillars — Value Propositions

**Purpose:** Show breadth of manufacturing software stack. Each pillar links to its product page.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #F5F7FA (`--dw-gray-light`), standard section padding, `position: relative; overflow: hidden` |
| **Super D Background** | Code Module | `.dw-d-bg--gradient .dw-d-bg--corner-br`, opacity 0.08, width 35%, min-height 40vh. Bottom-right corner. |
| **Header** | Group Module | Label + Title + Subtitle, centered |
| **Product Grid** | Row with CSS Grid | `grid-template-columns: repeat(4, 1fr)`, gap: 24px |
| **Each Product Card** | Group Module (linked) | Entire card is a clickable `<a>` tag. White bg, radius 20px, padding 40px 28px, text-align center, box-shadow: 0 4px 24px rgba(0,0,0,0.04), border: 1px solid #f1f5f9. Hover: translateY(-8px), box-shadow 0 20px 60px rgba(0,175,240,0.12), border-color transparent. Top blue accent bar on hover: 3px `::before` pseudo-element, `linear-gradient(90deg, #00AFF0, #003CC8)`, scaleX(0) → scaleX(1). Transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1). |

### Section Header

| Element | Content |
|---------|---------|
| **Label** | `Complete Manufacturing Stack` |
| **Title** | `One Ecosystem. Total Visibility.` |
| **Subtitle** | `From financials to the factory floor, every DigiWin product works together—no integration nightmares, no data silos.` |

### Product Card Structure (repeats 4x)

Each Group Module contains:

| Element | Divi 5 Module | Notes |
|---------|--------------|-------|
| **Icon** | Code Module | Custom SVG icons inside 80x80px container with `linear-gradient(145deg, #000864 0%, #1e3a5f 100%)` background, 24px border-radius. Hover: scale(1.05) rotate(-3deg). Blue glow ring (`::after`) appears on hover. SVG icon: 36x36px, color: #0369a1. |
| **Product Title** | Text Module (H3) | Noto Sans 700, 20px, #000864 |
| **Full Name** | Text Module | JetBrains Mono, 11px, weight 500, #0369a1, uppercase, 0.05em spacing |
| **Tagline** | Text Module | Noto Sans 600, 15px, #000864, line-height 1.3 |
| **Features** | Icon List Module (Divi 5) | 3 items per card, blue dot bullets (4px circle, #00AFF0), each with `<em>` bold term (font-weight 600, #475569) + description. Font: 13px, #5b6b80, padding-left 12px. |
| **Benefit Line** | Text Module | 13px, #0369a1, weight 500, border-top: 1px solid #e2e8f0, padding-top 10px, margin-top 4px |

#### Card 1: ERP Core

| Element | Content |
|---------|---------|
| **Link** | `/products/erp.html` |
| **Icon** | SVG: document + calculator overlay + dollar sign badge (see HTML for exact SVG) |
| **Title** | ERP Core |
| **Full Name** | Enterprise Resource Planning |
| **Tagline** | The central brain of your business |
| **Feature 1** | **Financials** — accounting, invoicing, budgets in one place |
| **Feature 2** | **Inventory** — real-time stock levels across locations |
| **Feature 3** | **Operations** — purchase orders, sales, and costs connected |
| **Benefit** | Replace scattered spreadsheets with one source of truth. |

#### Card 2: MES

| Element | Content |
|---------|---------|
| **Link** | `/products/mes.html` |
| **Icon** | SVG: factory building with windows/machines + conveyor belt with products + rollers |
| **Title** | MES |
| **Full Name** | Manufacturing Execution System |
| **Tagline** | Your digital eyes on the production floor |
| **Feature 1** | **Track** — follow every product through each workstation |
| **Feature 2** | **Record** — who made what, when, and how |
| **Feature 3** | **Alert** — spot delays and quality issues instantly |
| **Benefit** | Answer "which batch was my order?" in seconds. |

#### Card 3: WMS

| Element | Content |
|---------|---------|
| **Link** | `/products/wms.html` |
| **Icon** | SVG: shelf structure (vertical + horizontal lines) with boxes on shelves at varying opacity |
| **Title** | WMS |
| **Full Name** | Warehouse Management System |
| **Tagline** | Never lose track of inventory again |
| **Feature 1** | **Locate** — know which shelf, bin, and zone for every item |
| **Feature 2** | **Guide** — barcode scanning for pick, pack, and ship |
| **Feature 3** | **Count** — cycle counts that match reality |
| **Benefit** | Faster fulfillment, fewer mistakes, accurate stock. |

#### Card 4: AIoT

| Element | Content |
|---------|---------|
| **Link** | `/products/aiot.html` |
| **Icon** | SVG: central AI hub (rect with "AI" text) + connection lines (solid + dashed) + sensor nodes (circles at compass points and corners) |
| **Title** | AIoT |
| **Full Name** | AI + Internet of Things |
| **Tagline** | Connect your machines to the digital world |
| **Feature 1** | **Collect** — temperature, speed, vibration automatically |
| **Feature 2** | **Predict** — machine breakdowns before they happen |
| **Feature 3** | **Optimize** — energy usage and efficiency gains |
| **Benefit** | No manual logging. AI finds what humans miss. |

### Responsive

| Breakpoint | Grid Columns |
|-----------|-------------|
| Desktop (>1024px) | 4 columns |
| Tablet (<=1024px) | 2 columns |
| Mobile (<=640px) | 1 column |

---

## Section 6: Industry Selector — Tabbed Interface

**Purpose:** Let visitors self-identify by manufacturing vertical. Builds "they understand MY industry" confidence.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, standard padding, `position: relative; overflow: hidden` |
| **Super D Background** | Code Module | `.dw-d-bg--center`, opacity 0.05, width 90%, min-height 90vh. Center-fade. |
| **Header** | Group Module | Label + Title + Subtitle, centered |
| **Tab Interface** | **Tabs Module with Nested Modules** | 3 tabs. Each tab body contains a nested Row (2 columns: image left, content right). |

> **This is where Divi 5 nested modules shine.** In Divi 4, the Tabs module could only hold text/HTML. In Divi 5, each tab can contain a full layout: Row → Column (Image) + Column (Text + List + Button). No Code Module workarounds needed.

### Section Header

| Element | Content |
|---------|---------|
| **Label** | `Industry Expertise` |
| **Title** | `Built for Your Industry` |
| **Subtitle** | `We don't just understand manufacturing—we understand YOUR manufacturing.` |

### Tab Configuration

| Setting | Value |
|---------|-------|
| **Tab Style** | Pill/rounded tabs in unified bar, `inline-flex` layout |
| **Tab Bar Background** | #f1f5f9, border-radius: 16px 16px 0 0, padding: 6px 6px 0 6px |
| **Active Tab** | White background, #000864 text, weight 600, box-shadow: 0 -2px 8px rgba(0,0,0,0.04). Bottom 3px blue gradient bar (`::after`: linear-gradient(90deg, #00AFF0, #003CC8)). Border-radius: 12px 12px 0 0. |
| **Inactive Tab** | Transparent bg, #5b6b80 text, weight 500, 14px. Hover: #0369a1 text, rgba(0,175,240,0.08) bg. |
| **Tab Padding** | 14px 28px |
| **Content Area** | White bg, 24px border-radius, box-shadow: 0 12px 48px rgba(0,0,0,0.08), CSS Grid `1fr 1fr` when active, fadeIn 0.5s animation. margin-top: -1px (overlap with tab bar). |

### Tab 1: Automotive Parts Manufacturing

**Tab Label:** `Automotive Parts`

Inside the tab, use a **nested Row** with 2 columns:

#### Left Column: Industry Image

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Image** | Code Module | ~180-line SVG illustration. Height: 450px. Background: linear-gradient(145deg, #0f1419 0%, #1a2632 50%, #000864 100%). Content: Grid floor pattern, full-width conveyor belt with rollers, car body outline (roof/windows/wheels) with subtle translate animation, two robotic arms (gripper + welder with spark animations), large rotating gear, engine parts on conveyor, data flow dash-offset lines, status indicator "LINE STATUS / RUNNING" with green pulse, "JIT" label, ambient floating particles. |

> **MUST use Code Module** for this SVG. 180 lines of inline SVG with multiple animations (rotate, translate, opacity pulse, dash-offset). Too complex for native Divi modules. Post-launch: convert to Lottie.

#### Right Column: Industry Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Title** | Text Module (H3) | `Automotive Parts Manufacturing` — Noto Sans 700, 32px, #000864, -0.02em tracking |
| **Description** | Text Module | `Thailand is ASEAN's automotive hub. We understand what tier-1 OEMs (Original Equipment Manufacturers) demand: perfect traceability, just-in-time delivery, and EDI (Electronic Data Interchange) integration that works — every time.` — Noto Sans, 17px, #5b6b80, line-height 1.75 |
| **Features** | Icon List Module | 4 items with blue check-square icons (20x20px, gradient fill, 6px radius, white checkmark): `OEM EDI integration ready` · `IATF 16949 compliance support` · `Lot-level traceability for recalls` · `Kanban and just-in-time scheduling` — Font: 15px, #475569, padding 10px 0 10px 32px |
| **CTA** | Button Module | `Explore Automotive Solutions` → `/industries/automotive.html` — Primary blue |

> **Content Note:** The current HTML uses "OEM EDI integration ready" — no Toyota/Honda/Denso references (not verified clients). Keep it generic.

### Tab 2: Electronics Assembly

**Tab Label:** `Electronics Assembly`

#### Left Column: Industry Image
~190-line SVG illustration. PCB board: extensive trace network (horizontal + vertical paths), animated signal flow particles (blue + green circles on motion paths), main CPU chip ("ARM Cortex-M7" with pin rows on all 4 sides), memory chips ("FLASH 32MB", "SDRAM 64MB"), SMT components (capacitors, resistor arrays), crystal oscillator "48MHz", USB-C connector, PWR section, LED status row (green/blue/amber with pulse animations), via holes, test points, AOI scanner sweep (green line scanning vertically with opacity animation), label "PCB-2024-A1 / AOI: PASS".

#### Right Column: Industry Content

| Element | Content |
|---------|---------|
| **Title** | `Electronics Assembly` |
| **Description** | `High-mix, low-volume. Fast product cycles. Thousands of components per board. We built our MES for exactly this complexity.` |
| **Features** | `SMT (Surface Mount Technology) machine integration` · `Component-level traceability` · `MSD (Moisture Sensitivity Device) management` · `AOI (Automated Optical Inspection) integration and defect tracking` |
| **CTA** | `Explore Electronics Solutions` → `/industries/electronics.html` |

### Tab 3: Metal & Plastics Processing

**Tab Label:** `Metal & Plastics`

#### Left Column: Industry Image
~180-line SVG illustration. Three machines: (1) CNC 5-axis machine — machine frame, spindle head with animated vertical motion, tool bit, workpiece, welding sparks, control panel with green status LED, "CNC-5AXIS" label. (2) Injection molding machine — clamping unit with platens, mold halves (right half animated open/close), tie bars, injection unit with hopper ("RESIN"), ejected part animation, "INJ-350T" label. (3) Stamping press — frame with columns, animated ram, die bed, metal sheet feed, "PRESS-200T" label. Plus: parts conveyor with rollers and moving parts, overhead crane/gantry (animated traverse), yield rate display ("98.2%", target 98%, green progress bar), ambient glow.

#### Right Column: Industry Content

| Element | Content |
|---------|---------|
| **Title** | `Metal & Plastics Processing` |
| **Description** | `Stamping, injection molding, CNC machining. Process manufacturing where yield optimization and scrap reduction drive your margins.` |
| **Features** | `Process parameter monitoring` · `Mold/die lifecycle management` · `Scrap analysis and reduction` · `Cycle time optimization` |
| **CTA** | `Explore Metal & Plastics Solutions` → `/industries/metal-plastics.html` |

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | Tabs horizontal, content: 2-column (image + text), image height: 450px |
| Tablet (<=1024px) | Tabs horizontal, content: 1 column (image above text), image height: 300px |
| Mobile (<=640px) | Tabs stack vertically (flex-direction: column, width: 100%), border-radius: 16px 16px 0 0, padding: 4px 4px 0 4px. Each tab: width 100%, border-radius: 10px 10px 0 0, padding: 12px 20px, font-size: 13px. Industry info: padding 36px 24px. |

---

## Section 7: Stats Banner

**Purpose:** Reinforce credibility with verifiable numbers. Creates emotional "weight of evidence" pause.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(165deg, #0f1419 0%, #1a2632 40%, #000864 100%)`, padding: 100px 40px, `position: relative; overflow: hidden`. Grain texture overlay (`::before`). Blue radial glow overlay (`::after`: radial-gradient with #00AFF0 at 0.1 opacity, centered, 150% width). `data-particles="bold"` attribute. |
| **Super D Background** | Code Module | `.dw-d-bg--corner .dw-d-bg--corner-br`, opacity 0.08, width 25%, min-height 25vh. Top-right. |
| **Stats Grid** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, gap: 48px, center-aligned, max-width: 1200px, z-index: 1 |
| **Each Stat** | Number Counter or Text Module | See table below |
| **Dividers** | CSS pseudo-element (`::after` on each .dw-stat) | Vertical 1px gradient: `linear-gradient(180deg, transparent, rgba(0,175,240,0.3), transparent)`, height 60%, centered vertically. Hidden on last item. |
| **Source Citation** | Text Module | `Common Wealth Magazine, 2023` — JetBrains Mono, 11px, rgba(255,255,255,0.75), uppercase, 0.08em spacing, full-width (grid-column: 1 / -1), margin-top: -16px |

### Stats (6 items + 1 source — arranged in 3-column grid, 2 rows)

| Number | Label | Module Type | Animation |
|--------|-------|------------|-----------|
| `44` | Years in Manufacturing Software | Number Counter | Count up from 0 |
| `50,000+` | Factory Deployments Across Asia | Number Counter | Count up, suffix "+" |
| `100+` | Thai Implementations | Number Counter | Count up, suffix "+" |
| `80%` | of Taiwan's Top 2,000 Manufacturers | Number Counter | Count up, suffix "%" |
| `54%` | Taiwan Manufacturing Solutions Market Share | Number Counter | Count up, suffix "%" |
| `300378` | Shenzhen Stock Exchange | Text Module | Static — stock code, not a quantity |

Styling: Number → Noto Sans 800, clamp(48px, 6vw, 72px), #0369a1, -0.03em tracking. Label → JetBrains Mono, 11px, rgba(255,255,255,0.75), uppercase, 0.12em spacing.

> **Content Note vs. Old Spec:** The stats section now has 6 stats (was 4) arranged in a 3-column grid (was 4-column). Added "80% of Taiwan's Top 2,000 Manufacturers" and "54% Taiwan Manufacturing Solutions Market Share" with source citation "Common Wealth Magazine, 2023."

### Responsive

| Breakpoint | Grid |
|-----------|------|
| Desktop | 3 columns with vertical dividers |
| Tablet (<=1024px) | 2x3 grid (2 columns, 3 rows), gap 40px 32px, no dividers |
| Mobile (<=640px) | 2x3 grid |

---

## Section Transition: Particle Wave Fade

Between Sections 7 and 8:
```html
<div class="dw-wave-fade" style="opacity: 0.12; margin-top: -1px;"></div>
```
Same pattern as the earlier transition. Code Module.

---

## Section 8: Trust Anchors — Credibility Cards

**Purpose:** Five proof points that answer "why should I trust DigiWin?" — each anchored to a verifiable fact.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, standard padding (100px 40px), `position: relative; overflow: hidden` |
| **Section Scene SVG** | Code Module | Trust anchors background (~40 lines SVG): shield outline with checkmark, stock ticker line with "300378" label, certificate seal circles with "ISO" text, timeline ruler (1982 → 2006 → 2026), globe with lat/long lines and pin markers, scattered accent dots. All #000864 at 0.07-0.15 opacity. |
| **Header** | Group Module | Label + Title + Subtitle |
| **Cards Grid** | Row with CSS Grid | `grid-template-columns: repeat(2, 1fr)`, gap: 24px. Last card: `grid-column: 1 / -1` (full width). |
| **Each Card** | Group Module | Background: `linear-gradient(135deg, #000864 0%, #1e3a5f 50%, #0f172a 100%)`, radius: 20px, padding: 36px, min-height: 280px, `position: relative; overflow: hidden`. Grain texture overlay (`::before`). Hover: box-shadow 0 24px 48px rgba(0,0,0,0.25). Transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1). |

### Section Header

| Element | Content |
|---------|---------|
| **Label** | `Why Trust DigiWin` |
| **Title** | `Credibility Without Hype` |
| **Subtitle** | `We don't just claim to be different. Here's the evidence.` |

### Card Structure (repeats 5x)

Each Group Module contains:

| Element | Divi 5 Module | Styling |
|---------|--------------|---------|
| **Background Icon** | Code Module | Large SVG icon, absolute positioned top: -20px right: -20px, 180x180px, opacity 0.08, stroke: #00AFF0, stroke-width: 1. Hover: opacity 0.12, scale(1.05) rotate(5deg). Transition: 0.4s ease. |
| **Small Icon** | Code Module | 48x48px container, bg: rgba(0,175,240,0.15), border: 1px solid rgba(0,175,240,0.3), border-radius: 12px, flex centered. SVG: 24x24px, stroke: #00AFF0, stroke-width: 1.5. z-index: 2. |
| **Badge** | Text Module | JetBrains Mono, 11px, weight 600, #0369a1, bg: rgba(0,175,240,0.15), border: 1px solid rgba(0,175,240,0.25), padding: 5px 12px, border-radius: 6px, 0.05em spacing, z-index: 2. |
| **Title** | Text Module (H3) | Noto Sans 700, 22px, white, z-index: 2. |
| **Headline** | Text Module | Noto Sans 500, 15px, rgba(255,255,255,0.9), line-height 1.6, z-index: 2. |
| **Detail** | Text Module | Noto Sans 400, 13px, rgba(255,255,255,0.75), line-height 1.65, z-index: 2. |

#### Card 1: Financial Stability

| Element | Content |
|---------|---------|
| **Badge** | `300378` |
| **Title** | Financial Stability |
| **Headline** | We are a publicly traded company with transparent financials—the stability partners and clients need for a 10-year relationship. |
| **Detail** | Our financials are publicly audited and regulated by the Shenzhen Stock Exchange. That means you're partnering with a company that has the governance, capital, and long-term commitment to support your factory for years to come — not a vendor that might disappear after implementation. |
| **Icon** | Bar chart (SVG: `<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>`) |

#### Card 2: Manufacturing DNA

| Element | Content |
|---------|---------|
| **Badge** | `Foxconn FII` |
| **Title** | Manufacturing DNA |
| **Headline** | Strategic investment from Foxconn Industrial Internet — validation that our software meets the standards of the world's largest electronics manufacturer. |
| **Detail** | This isn't generic IT software — it's built for industrial reality. When the company that manufactures iPhones trusts DigiWin on their production lines, that speaks to the depth and reliability of our platform at the highest level of manufacturing complexity. |
| **Icon** | Stacked layers (SVG: `<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>`) |

#### Card 3: Manufacturing Focus Since Day One

| Element | Content |
|---------|---------|
| **Badge** | `Since 1982` |
| **Title** | Manufacturing Focus Since Day One |
| **Headline** | We have spent 44 years exclusively in manufacturing software—built on decades of shop-floor reality, not temporary tech trends. |
| **Detail** | DigiWin has survived every technology shift (DOS → Windows → Cloud) while staying focused on manufacturing. We didn't pivot to crypto or retail POS when it was trendy. |
| **Icon** | Clock (SVG: `<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>`) |

> **Note:** Title changed from old spec's "Domain Endurance" to "Manufacturing Focus Since Day One" — current HTML uses this longer, more descriptive title. The "44 years" uses `.dw-years` class for dynamic calculation.

#### Card 4: Proven at Scale

| Element | Content |
|---------|---------|
| **Badge** | `50,000+` |
| **Title** | Proven at Scale |
| **Headline** | Our methodology is refined from 50,000+ implementations across Asia—adopt a proven standard, not a beta product. |
| **Detail** | The software has been refined through thousands of real-world factory deployments across Asia. It handles the specific complexities — Thai tax rules, sub-contracting workflows, circular bills of materials — that often break smaller systems. |
| **Icon** | Globe (SVG: `<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10..."/>`) |

> **Note:** Title changed from "Scale Proof" to "Proven at Scale" — current HTML.

#### Card 5: BOI Compliance (Full-Width Card)

| Element | Content |
|---------|---------|
| **Badge** | `BOI Ready` |
| **Title** | BOI Compliance |
| **Headline** | Production-order-level material reconciliation that passes BOI (Board of Investment) audits — a capability no competitor can match. |
| **Detail** | One factory saved 10M+ THB/year in supplementary taxes. Our system tracks actual material consumption per production order, not theoretical bill-of-materials calculations — the gap that triggers costly audit findings. [Read the full story →](/blog/boi-compliance-jin-hai.html) |
| **Icon** | Shield with checkmark (SVG: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>`) |

> **Important:** The "Read the full story" link uses color #0369a1 (not default blue). Must render as inline text link within the detail paragraph.

### Responsive

| Breakpoint | Grid |
|-----------|------|
| Desktop | 2 columns + full-width last card |
| Tablet (<=1024px) | 1 column |
| Mobile (<=640px) | 1 column, min-height: auto, padding: 28px 24px. Background icon: 120x120px, top: -10px, right: -10px. |

---

## Section 9: Proven Results Teaser (NEW — not in old spec)

**Purpose:** Show real outcomes from Thai factories. Bridges trust claims with tangible proof. Links to case studies page.

> **This section is new since the old v2.0 spec.** It was added to the HTML after that spec was written.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `--dw-gray-light` (#F5F7FA), padding: 80px 40px, `position: relative` |
| **Header** | Group Module | Label + Title + Subtitle, centered |
| **Results Grid** | Row with CSS Grid | `grid-template-columns: repeat(2, 1fr)`, gap: 32px, max-width: 900px, margin: 48px auto 0 |
| **Each Result Card** | Group Module | Background: white, border-radius: 16px, padding: 36px 32px, border: 1px solid #e2e8f0. Hover: box-shadow 0 8px 32px rgba(0,8,100,0.08), translateY(-2px). Transition: 0.3s ease. |
| **CTA Link** | Text Module (link) | Centered below grid, margin-top: 40px |

### Section Header

| Element | Content |
|---------|---------|
| **Label** | `Proven Results` |
| **Title** | `Real Outcomes from Thai Factories` |
| **Subtitle** | `These aren't projections. These are results our clients achieved after going live.` |

### Result Cards (2 total)

Each card contains:

| Element | Divi 5 Module | Styling |
|---------|--------------|---------|
| **Company** | Text Module | JetBrains Mono, 11px, uppercase, 0.12em spacing, #00AFF0 (`--dw-blue`), margin-bottom 12px |
| **Metric** | Text Module | Noto Sans 600, 20px, #000864 (`--dw-navy`), line-height 1.4, margin-bottom 8px |
| **Detail** | Text Module | Noto Sans 400, 14px, #5b6b80, line-height 1.5 |

#### Card 1: Thai Alpha Polymer

| Element | Content |
|---------|---------|
| **Company** | Thai Alpha Polymer |
| **Metric** | Month-end closing: 60 days to 15 days |
| **Detail** | Stock accuracy reached 95% with Workflow ERP + WMS integration across their PET plastic roll operations. |

#### Card 2: Ginfong Precision Metal Stamping

| Element | Content |
|---------|---------|
| **Company** | Ginfong Precision Metal Stamping |
| **Metric** | Revenue growth of 200%, margins from 23% to 34% |
| **Detail** | Gross profit improved from 23% to 34% with ERP + SFT (Shop Floor Tracking) — even during the COVID period when competitors contracted. |

> **Content Notes:**
> - SFT = Shop Floor Tracking (NOT "Smart Factory Transparency")
> - These are verified case study results from DigiWin documentation

### CTA Link

| Element | Content |
|---------|---------|
| **Link** | `See all case studies →` → `/case-studies.html` — Noto Sans 600, 14px, #00AFF0, hover: #003CC8, no text-decoration |

### Responsive

| Breakpoint | Grid |
|-----------|------|
| Desktop | 2 columns |
| Mobile (<=768px) | 1 column |

---

## Section 10: Final CTA Banner

**Purpose:** Convert interested visitors. Welcoming tone per Playbook — "Let's Talk" not "Book a Demo."

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(135deg, #00AFF0 0%, #003CC8 50%, #003CC8 100%)`, padding: 120px 40px, `position: relative; overflow: hidden`. Cross-pattern overlay (`::before`): SVG plus pattern at 5% white opacity. White radial glow (`::after`): bottom-right, 80% wide, 10% opacity. |
| **Super D Background** | Code Module | `.dw-d-bg--gradient .dw-d-bg--left .dw-d-parallax`, width: 50%, opacity: 0.16, left: -15%. |
| **Particle Wave** | Code Module | `.dw-wave-flow`, height: 220px, opacity: 0.45, z-index: 1, bottom of section. |
| **Content** | Group Module | Max-width: 800px, centered, z-index: 3 (above overlays and wave) |
| **Title** | Text Module (H2) | `Let's Start a Conversation` — Noto Sans 700, clamp(36px, 4.5vw, 52px), white, -0.02em tracking, line-height 1.15 |
| **Subtitle** | Text Module | `We're eager to understand your challenges and explore how we can help. No pressure, no sales pitch—just a genuine conversation about your manufacturing operations.` — Noto Sans, 20px, rgba(255,255,255,0.9), line-height 1.65, margin-bottom 48px |
| **Button Row** | Group Module (flexbox) | Centered, gap 20px, flex-wrap: wrap |
| **Primary CTA** | Button Module | `Let's Talk` → `/demo.html` — White bg (#ffffff), color #003CC8, font-weight 600, box-shadow: 0 4px 20px rgba(0,0,0,0.15). Hover: translateY(-3px), box-shadow: 0 12px 40px rgba(0,0,0,0.2). |
| **Secondary CTA** | Button Module | `Explore Partnership` → `/partner-program.html` — Transparent bg, white text, border: 2px solid rgba(255,255,255,0.6). Hover: bg rgba(255,255,255,0.15), border-color: #ffffff. |

> **PRD Compliance Note:** CTA says "Let's Talk" — NOT "Request a Demo" or "Book a Demo." This aligns with the business constraint: DigiWin Thailand does not offer product demos. Process: User fills form → Team contacts them.

---

## Scroll Animation Strategy (Divi 5 Interactions)

The static build uses `DigiWinUI.initScrollAnimation()` with IntersectionObserver and custom stagger logic. In Divi 5, replace with the built-in **Interactions System**:

| Animation | Current Implementation | Divi 5 Interaction | Settings |
|-----------|----------------------|-------------------|----------|
| Cards fade-in on scroll | `DigiWinUI.initScrollAnimation('.dw-value-prop, .dw-check-card, .dw-trust-card, .dw-result-card', { stagger: 30, distance: 16, duration: 200 })` | Scroll → Fade In + Slide Up | Duration: 200ms (not 400ms — current build uses faster 200ms), distance: 16px, stagger: 30ms between siblings |
| Card hover lift | CSS `transform: translateY(-8px)` / `translateY(-6px)` / `translateY(-2px)` depending on card type | Hover → Transform | translateY varies per section (see individual section specs) |
| Number counters | IntersectionObserver on `.dw-clients-stat` | Number Counter module | Built-in count animation on viewport entry |
| Industry tab content | Custom JS (10 lines, `data-industry` attribute matching) | Tabs Module | Native tab switching with fadeIn transition |
| Hero content slide-up | CSS `animation: slide-up 0.8s ease-out` | Scroll → Slide Up | Duration: 800ms, ease-out |
| Hero stats fade-in | CSS `animation: fadeIn 1s ease-out 0.5s both` | Scroll → Fade In | Delay: 500ms, duration: 1000ms |
| Hero illustration draw-line | CSS `animation: draw-line 3s ease-out forwards` (stroke-dashoffset) | Code Module (keep as CSS) | Divi Interactions don't support SVG stroke animations |
| Hero gear rotation | CSS `animation: rotate-gear 20s linear infinite` | Code Module (keep as CSS) | Continuous rotation |
| Logo marquee scroll | CSS `animation: dw-scroll 35s linear infinite`, pauses on hover | Group Carousel auto-scroll OR Code Module | If Code Module: keep CSS animation |
| Super D parallax | `DigiWinUI.initDParallax('.dw-d-parallax', 0.3)` | Divi 5 Interactions → Scroll → Transform (translateY) | Factor: 0.3x scroll distance |
| Particle wave reveal | `DigiWinUI.initParticleReveal('.dw-wave-reveal')` | Code Module (keep as JS) OR Divi 5 Scroll → Opacity | Reveal on scroll into view |

> **prefers-reduced-motion:** The current build has comprehensive reduced-motion support — disables ALL animations and transitions on hero, illustrations, cards, parallax, marquee, wave flow, etc. In Divi 5: Set `prefers-reduced-motion: reduce` media query in custom CSS to override Divi Interaction animations. This is a non-negotiable accessibility requirement.

---

## Page-Specific JavaScript

| Component | Static Build | Divi 5 Equivalent |
|-----------|-------------|-------------------|
| Industry tab switching | Custom JS (10 lines using `data-industry` attributes) | Tabs Module (native) |
| Scroll animations | `DigiWinUI.initScrollAnimation()` | Divi 5 Interactions → Scroll Effects |
| Client stats observer | IntersectionObserver (6 lines) | Number Counter auto-animate |
| Super D parallax | `DigiWinUI.initDParallax()` | Divi 5 Interactions → Scroll Transform |
| Particle reveal | `DigiWinUI.initParticleReveal()` | Code Module snippet or Divi 5 Scroll Opacity |
| Dynamic year calculation | `digiwin-dynamic.js` (`.dw-years` elements) | Code Module snippet or Divi 5 Dynamic Content field |

> **Remaining custom JS needed in Divi 5:**
> 1. Dynamic year calculation (`2026 - 1982 = 44`, applied to all `.dw-years` spans). Options: (a) Divi 5 Dynamic Content field, (b) tiny Code Module with year calc, or (c) manually update annually.
> 2. Complex SVG animations inside Code Modules (gear rotation, spark animations, conveyor motion, etc.) — these run via CSS `@keyframes`, not JS.

---

## Structured Data (JSON-LD)

The page includes two JSON-LD schema blocks in `<head>`. In Divi 5, add these via Theme Options → Integration → Head Code, or via a Code Module in the header.

### Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DigiWin Thailand",
  "alternateName": ["DigiWin", "鼎新數智", "鼎捷软件"],
  "url": "https://www.digiwin.co.th",
  "logo": "https://www.digiwin.co.th/assets/digiwin-logo.svg",
  "description": "Manufacturing-focused enterprise software company providing ERP, MES, WMS, and AIoT solutions for factories in Thailand and Southeast Asia.",
  "foundingDate": "1982",
  "numberOfEmployees": {"@type": "QuantitativeValue", "value": 5000},
  "parentOrganization": {
    "@type": "Organization",
    "name": "Data Systems Consulting Co., Ltd.",
    "tickerSymbol": "300378",
    "exchange": "Shenzhen Stock Exchange"
  },
  "areaServed": ["Thailand", "Southeast Asia", "ASEAN"],
  "knowsAbout": ["ERP", "MES", "WMS", "AIoT", "Manufacturing Software", "Smart Factory"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Bangna Complex Office Tower, 22nd Floor",
    "addressLocality": "Bangkok",
    "postalCode": "10260",
    "addressCountry": "TH"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "info@digiwin.co.th",
    "availableLanguage": ["English", "Thai", "Chinese"]
  }
}
```

### WebSite Schema
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "DigiWin Thailand",
  "url": "https://www.digiwin.co.th",
  "description": "Manufacturing Intelligence for ASEAN Factories - ERP, MES, WMS, and AIoT solutions by DigiWin."
}
```

---

## Code Module Inventory

These elements MUST remain as Code Modules in Divi 5 (too complex for native modules):

| Code Module | Location | Size (approx.) | Content |
|-------------|----------|----------------|---------|
| **Factory Hero Illustration** | Section 1, Left Column | ~170 lines SVG | Ghost inventory warehouse, fragmenting Excel, broken data streams, cost bubbles, factory outline |
| **Partner Hero Illustration** | Section 1, Right Column | ~180 lines SVG | Breaking cage, revenue ceiling, compounding streams, clock, freedom burst, growth markers |
| **Super D Background** (x6) | Sections 1, 3, 5, 6, 7, 10 | ~5-10 lines each | Positioned `<div>` with CSS class for brand D mark |
| **Particle Wave** (x2) | Sections 1 and 10 | ~3 lines each | `.dw-wave-flow` div |
| **Wave Fade Transitions** (x2) | Between Sections 4-5 and 7-8 | ~1 line each | `.dw-wave-fade` div |
| **Factory Checks Scene SVG** | Section 3 | ~90 lines SVG | Production line flow with broken connections |
| **Partner Checks Scene SVG** | Section 4 | ~70 lines SVG | Revenue ceiling, man-day clock, squeeze arrows |
| **Per-Card Background SVGs** (x5) | Section 3, inside each card | ~20-40 lines each | Spreadsheets, black box, ghost shelves, cost arrows, clock |
| **Trust Anchors Scene SVG** | Section 8 | ~40 lines SVG | Shield, stock ticker, certificate, timeline, globe |
| **Automotive Tab SVG** | Section 6, Tab 1 | ~180 lines SVG | Assembly line, car body, robotic arms, gear, conveyor |
| **Electronics Tab SVG** | Section 6, Tab 2 | ~190 lines SVG | PCB board, CPU, memory, SMT, AOI scanner |
| **Metal & Plastics Tab SVG** | Section 6, Tab 3 | ~180 lines SVG | CNC machine, injection molder, stamping press, conveyor |
| **CTA Cross-Pattern** | Section 10 | Via CSS `::before` | SVG plus pattern |
| **Grain Texture Overlays** | Sections 1, 4, 7, 8 | Via CSS `::before` | feTurbulence noise filter |

**Total Code Modules:** ~20. **Post-launch optimization:** Convert hero illustrations and industry tab illustrations to Lottie format (reduces total from ~20 to ~15 Code Modules, with much smaller payload for the 5 largest SVGs).

---

## Validation Checklist (Divi 5 Build)

### Layout & Structure
- [ ] Split-screen hero renders at 100vh minus header on desktop
- [ ] Hero stacks vertically on tablet/mobile (left panel first)
- [ ] Super D background graphics visible but subtle across 6 sections
- [ ] Particle wave renders at hero bottom and CTA bottom
- [ ] Wave fade transitions render between Sections 4-5 and 7-8
- [ ] All section scene SVGs render as background illustrations at correct opacity

### Hero Section
- [ ] Factory SVG illustration animations play smoothly
- [ ] Partner SVG illustration animations play smoothly
- [ ] Grain texture visible but subtle on both panels (opacity 0.03-0.04)
- [ ] Partner panel light leak effect renders (radial gradient, top-right)
- [ ] Hero CTAs: "Let's Talk" (factory) and "Escape the Trap" (partner)
- [ ] Factory secondary CTA: "See Our Solutions" → /products.html

### Client Logo Bar
- [ ] 8 logos display with grayscale filter, color on hover
- [ ] CTR logo inverted for light background
- [ ] Logo marquee scrolls smoothly at 35s, pauses on hover
- [ ] Edge fade masks visible
- [ ] 3 stats below logos render correctly
- [ ] `prefers-reduced-motion` stops marquee and wraps logos

### Check Cards
- [ ] All 5 factory check cards render (3 in grid + 2 full-width below)
- [ ] All 3 partner check cards render in dark grid
- [ ] Per-card background SVGs visible at correct opacity
- [ ] Card hover effects work (shadow, border-color change)
- [ ] Section scene backgrounds visible behind cards

### Product Pillars
- [ ] 4 product pillar cards link to correct product pages (/products/erp.html, /products/mes.html, /products/wms.html, /products/aiot.html)
- [ ] Icon SVGs render inside dark navy containers
- [ ] Top blue accent bar appears on hover
- [ ] Feature lists use consistent blue dot bullets

### Industry Tabs
- [ ] Tabs switch between 3 industries (Automotive, Electronics, Metal & Plastics)
- [ ] Tab content shows image + text side by side on desktop
- [ ] SVG industry illustrations render inside tabs with animations
- [ ] Active tab has blue gradient bottom bar
- [ ] Tab content fades in on switch

### Stats Banner
- [ ] 6 stats display in 3x2 grid
- [ ] Number counters animate on scroll (except 300378)
- [ ] Vertical dividers visible between stats on desktop
- [ ] Source citation "Common Wealth Magazine, 2023" visible
- [ ] Grain texture and blue glow overlay visible

### Trust Anchors
- [ ] All 5 trust cards render (2+2+1 layout)
- [ ] BOI card spans full width
- [ ] BOI card links to correct blog article (/blog/boi-compliance-jin-hai.html)
- [ ] Background icons animate on hover (scale, rotate, opacity increase)
- [ ] Grain texture overlay on all cards

### Proven Results
- [ ] 2 result cards display side by side on desktop
- [ ] "See all case studies" link → /case-studies.html
- [ ] SFT referenced as "Shop Floor Tracking" (not other names)

### Final CTA
- [ ] CTA says "Let's Talk" (NOT "Request a Demo" / "Book a Demo")
- [ ] CTA says "Explore Partnership" (NOT "Become a Partner")
- [ ] "Let's Talk" → /demo.html
- [ ] "Explore Partnership" → /partner-program.html
- [ ] Cross-pattern overlay visible
- [ ] Particle wave at bottom of CTA section

### Global Checks
- [ ] All internal links point to pages that exist
- [ ] Dynamic year shows correct value (2026 - 1982 = 44) in all `.dw-years` instances
- [ ] Page loads under 3 seconds on 4G connection
- [ ] No horizontal scroll on any breakpoint
- [ ] Hover effects work on all card types (check, product, trust, result)
- [ ] Colors match Design Variables exactly
- [ ] Fonts load: Noto Sans, JetBrains Mono, Noto Sans SC
- [ ] JSON-LD structured data present in head
- [ ] `prefers-reduced-motion` respected — all animations disabled
- [ ] Skip-to-content link present
- [ ] `<main>` landmark present with id="home-content"
- [ ] All images have alt text (decorative SVGs use `aria-hidden="true"`)

---

## Changes from Old Spec (v2.0 → This Revision)

| Area | Old Spec (Feb 10) | Current HTML (Feb 14) |
|------|-------------------|----------------------|
| **Stats Section** | 4 stats (44, 50K+, 100+, 300378) in 4-column grid | 6 stats (44, 50K+, 100+, 80%, 54%, 300378) in 3-column grid + source citation |
| **Trust Card 3 Title** | "Domain Endurance" | "Manufacturing Focus Since Day One" |
| **Trust Card 4 Title** | "Scale Proof" | "Proven at Scale" |
| **Trust Card Details** | Shorter, more generic | Longer, more specific, warmer tone |
| **Hero Partner Stats** | "Industry-Leading / License Margins" + "Your MA / Your Revenue" | "30-40% / License Margins" + "Yours to Keep / Maintenance Revenue" |
| **Hero Factory CTA** | "See How We Fix It" → /products.html | "Let's Talk" → /demo.html + "See Our Solutions" → /products.html (two buttons) |
| **Section 9: Proven Results** | Did not exist | New section with 2 case study cards (Thai Alpha Polymer, Ginfong) + link to /case-studies.html |
| **Section Count** | 9 sections | 10 sections (added Proven Results) |
| **Client Logos** | Generic placeholders | 8 real client logos with names and stock tickers |
| **Partner Right Panel Gradient** | `#0369a1 → #2d7bc4` | `#00AFF0 → #003CC8` (brand-aligned) |
| **Section Scene Backgrounds** | Not specified | Full SVG background illustrations for Factory Checks, Partner Checks, and Trust Anchors sections |
| **Per-Card Background SVGs** | Not specified | 5 unique thematic SVGs for factory check cards |
| **Brand Graphic System** | Briefly mentioned | Fully mapped: Super D (6 instances), Particle Wave (2), Wave Fade (2), with class names and positioning |
| **Factory Checks Subtitle** | "If any of these sound familiar, you're not alone. We've helped 50,000+ factories escape these exact traps." | "If any of these sound familiar, you're not alone. These are the most common problems we solve for factories across Thailand and Asia." |
| **Automotive Features** | "Toyota/Honda/Denso EDI integration" | "OEM EDI integration ready" (no unverified client names) |
| **Industry Descriptions** | Abbreviated | Spell out abbreviations: OEM, EDI, SMT, MSD, AOI |

---

## Open Questions for Peter

1. **Lottie conversion timeline:** The 5 largest SVGs (2 hero + 3 industry tabs) total ~900 lines. Convert to Lottie pre-launch or post-launch?
2. **Dynamic year approach:** Code Module snippet vs. manual annual update vs. Divi 5 Dynamic Content field?
3. **Stats section source:** "Common Wealth Magazine, 2023" — is there a URL we can link to for the 80% and 54% claims?
4. **Proven Results section:** Keep as 2 cards on homepage, or expand to 3-4?
5. **Logo marquee:** Group Carousel (easier to edit) or Code Module (exact match to current build)?

---

*This spec supersedes the previous `ContentSpec_Home_Divi5_2.0.md` (Feb 10 draft). All content sourced from the current HTML at `complete_website/src/pages/index.html` as of Feb 14, 2026.*
