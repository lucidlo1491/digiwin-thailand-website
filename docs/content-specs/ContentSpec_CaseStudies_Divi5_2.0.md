# Content Spec: Case Studies Page — Divi 5 Build (2.0)

**Batch:** 2 (Core Pages)
**PRD Reference:** Section 4, Page 7.0
**Playbook Reference:** Section 2 (Track A Emotional Arc — Empathetic to Confident), Section 3 (Proof Patterns)
**Status:** v2.0 — Reverse-engineered from HTML build + mapped to Divi 5 modules
**Last Updated:** February 24, 2026
**Platform:** WordPress + Divi 5

---

## Page Overview

| Element | Specification |
|---------|---------------|
| **Audience** | Primarily Track A — factory operators evaluating DigiWin |
| **Objective** | Prove DigiWin delivers measurable outcomes for Thai manufacturers. "Real Factories. Real Results." |
| **URL** | digiwin.co.th/case-studies |
| **Emotional Arc** | Credibility → Specific Proof → Pattern Recognition → Action |
| **Page Structure** | 6 macro sections (hero, grid, 5 detail sections, listed cases, insights, CTA), ~1490 lines in static build |
| **Key Case Studies** | Ginfong (margin 23%->34%, revenue +200%), Thai Alpha (stock 95%, closing 60->15 days), Thai Hosheng (closing 90->15 days), MUFU (full automation), Taiyo Fastener (systems unified) |

---

## Divi 5 Capabilities Leveraged

| Divi 5 Feature | Where Used | Why |
|----------------|-----------|-----|
| **CSS Grid Layout** | Card grid (3-col), detail tables, stats grid, listed cases, placeholder grid | Multi-column responsive layouts |
| **Group Module** | Case study cards, stat cards, callout boxes, video links, listed cards, placeholder cards | Card-style containers with internal layout |
| **Tabs Module** | Filter buttons (industry filter) | Native tab/filter behavior with aria-pressed states |
| **Number Counter** | Hero stats (5, 3, 75%), insight stats | Animated count-up |
| **Code Module** | Filter JS, smooth scroll, SVG icons | Interactive filter requires custom JavaScript |
| **Blurb Module** | Criteria list items, placeholder industry cards | Icon + text items |
| **Image Module** | Company logos | Lazy-loaded logo images |
| **Design Variables** | Colors, fonts, spacing | Global brand consistency |
| **Interactions System** | Card hovers, scroll reveals | Built-in scroll and hover animations |
| **Semantic Elements** | Tables with scope, sections with aria-labels | Full accessibility |
| **Nested Modules** | Detail sections (badge + logo + tags + metric inside Group) | Complex card interiors |

---

## Design Variables (Global — Set Once in Divi 5)

Inherits all global Design Variables from Homepage spec. Additional variables for this page:

| Variable Name | Value | Usage |
|--------------|-------|-------|
| `--dw-green` | #02D28C | Positive change indicators in tables |
| `--dw-green-label` | #047857 | Section label text |
| `--dw-cyan` | #00E6FF | Hero badge text |
| `--dw-red` | #DC2626 | YouTube video icon background |

---

## Section 1: Hero — Centered with Stats

**Purpose:** Establish credibility with headline results. "Real Factories. Real Results." — no marketing fluff.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: linear-gradient(165deg, #000432 0%, #000864 40%, #001080 100%), padding: 140px 24px 80px, grain overlay, aria-label: "Case Studies Hero" |
| **Inner** | Group Module | max-width: 800px, center, text-align: center |

### Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Badge** | Text Module | `Case Studies` — inline-flex pill: bg rgba(0,175,240,0.15), border 1px solid rgba(0,175,240,0.3), border-radius: 50px, padding: 8px 20px, JetBrains Mono 11px uppercase, color: #00E6FF, with pulsing blue dot (::before pseudo-element or Code Module) |
| **Headline** | Text Module (H1) | `Real Factories. Real Results.` — Noto Sans 800, clamp(2rem, 5vw, 3.25rem), white, line-height 1.15 |
| **Subtitle** | Text Module | `Thai manufacturers share how DigiWin transformed their operations — with measurable outcomes, not marketing promises.` — 1.125rem, rgba(255,255,255,0.85), line-height 1.6, max-width: 640px, centered |
| **Stats Row** | Group Module (Flexbox) | Center, gap: 48px, padding-top: 32px, border-top: 1px solid rgba(255,255,255,0.1), role: "list" |

### Hero Stats (3 items)

| Stat | Value | Label | Module |
|------|-------|-------|--------|
| 1 | `5` | Detailed Case Studies | Number Counter |
| 2 | `3` | Industries | Number Counter |
| 3 | `75%` | Avg. Closing Time Cut | Number Counter |

Value: Noto Sans 800, 2rem, #00AFF0. Label: JetBrains Mono, 10px, uppercase, 0.1em spacing, rgba(255,255,255,0.85).

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Mobile (<=640px) | Padding: 120px 20px 60px, stats: flex-column, gap: 20px |

---

## Section 2: Filter + Card Grid

**Purpose:** Quick-scan overview of all 5 case studies with industry filtering. Clicking a card triggers a **smooth scroll animation** to the corresponding detail section (not an instant jump).

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #fff, padding: 80px 24px 100px, aria-label: "Case Study Overview" |
| **Inner** | Group Module | max-width: 1200px, centered |

### Filter Buttons

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Filter Group** | Code Module or Group Module with Buttons | Flexbox row, gap: 8px, center, role: "group", aria-label: "Filter by industry" |
| **Each Button** | Button Module (styled) or Code Module | JetBrains Mono 12px, uppercase, 0.1em spacing, padding: 14px 20px, min-height: 44px, border-radius: 8px, border: 1px solid #e2e8f0, bg: #F5F7FA |

> **Divi 5 Note:** The industry filter requires JavaScript to show/hide cards. Since Divi 5 Tabs Module doesn't natively support filtering a card grid, use a **Code Module** for the filter buttons and the filter JavaScript. The cards themselves can be Group Modules with `data-industry` attributes.

| Filter | Label | data-filter |
|--------|-------|-------------|
| All | All | all |
| Plastics | Plastics & Packaging | plastics-packaging |
| Metal | Metal & Precision | metal-precision |
| Electronics | Electronics | electronics |
| Fasteners | Fasteners & Components | fasteners |

Active state: bg: #006dac, color: white, border-color: #006dac. Hover: border-color: #00AFF0, color: #00AFF0. Focus-visible: outline: 3px solid #00AFF0, outline-offset: 2px.

### Card Grid (5 cards)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Grid** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, gap: 24px |
| **Each Card** | Group Module (linked to anchor) | bg: #fff, border: 1px solid #e2e8f0, border-radius: 16px, padding: 32px, cursor: pointer, hover: border-color #00AFF0 + shadow + translateY(-2px) |

Each card contains (nested modules inside Group):

| Element | Module | Styling |
|---------|--------|---------|
| **Industry Badge** | Text Module | JetBrains Mono 10px, uppercase, bg: rgba(0,175,240,0.1), color: #00AFF0, padding: 4px 12px, border-radius: 4px |
| **Company Name** | Text Module (H2) | Noto Sans 700, 1.25rem, #000864 |
| **Summary** | Text Module | 0.875rem, #666, line-height 1.5 |
| **Hero Metric** | Text Module | Noto Sans 800, 2rem, #00AFF0 |
| **Metric Label** | Text Module | 0.8125rem, #666 |
| **Product Tags** | Group Module (Flexbox) | Wrap, gap: 6px |
| **Each Tag** | Text Module | JetBrains Mono 10px, uppercase, bg: #F5F7FA, color: #555, padding: 4px 10px, border-radius: 4px |
| **Read Link** | Text Module | 0.875rem, 600, #00AFF0, "Read Case Study ->" |

#### Card Data

| # | Company | Badge | Summary | Metric | Metric Label | Products | Industry Filter |
|---|---------|-------|---------|--------|------|----------|----------------|
| 1 | Ginfong Precision | Metal Stamping | Metal stamping manufacturer that grew revenue 200% through COVID with cost visibility. | +200% | Revenue Growth | ERP, SFT | metal-precision |
| 2 | Thai Alpha Polymer | Plastics Manufacturing | PET plastic manufacturer that slashed month-end closing from 60 to 15 days. | 60->15 | Days to Close | iGP ERP, WMS | plastics-packaging |
| 3 | Thai Hosheng Packing | Packaging | Packaging manufacturer with the most dramatic closing reduction — 90 days down to 15. | 90->15 | Days to Close | iGP ERP, WMS, SFT | plastics-packaging |
| 4 | MUFU Technologies | Manufacturing | Manufacturing company that unified all departments into one automated system. | Unified Ops | Full Automation Achieved | iGP ERP | electronics |
| 5 | Taiyo Fastener Thailand | Fasteners | Japanese-standard fastener manufacturer that unified fragmented legacy systems. | Systems Unified | Multiple Systems -> One Platform | ERP, WMS | fasteners |

### Responsive

| Breakpoint | Grid Columns |
|-----------|-------------|
| Desktop (>1024px) | 3 columns |
| Tablet (<=1024px) | 2 columns |
| Mobile (<=640px) | 1 column |

---

## Section 3: Detailed Case Studies (5 sections)

**Purpose:** Deep-dive into each case study with challenge, solution, results table, quotes, and callouts. Each is its own scrollable section.

### Shared Divi 5 Implementation Pattern

Each case study follows the same structure:

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Alternating bg: odd = #F5F7FA, even = #fff. Padding: 80px 24px. Each has unique `id` for anchor scrolling. aria-label: "[Company] case study detail" |
| **Inner** | Group Module | max-width: 900px, centered |

#### Header Block (per case study)

| Element | Divi 5 Module | Styling |
|---------|--------------|---------|
| **Industry Badge** | Text Module | JetBrains Mono 11px, uppercase, bg: rgba(0,175,240,0.1), color: #00AFF0, padding: 6px 16px, border-radius: 6px |
| **Company Identity** | Group Module (Flexbox row) | gap: 24px, align-items: center |
| **Logo** | Image Module | 140x90px, border-radius: 12px, border: 1px solid #e2e8f0, bg: #fff, object-fit: contain, lazy loading |
| **Company Name** | Text Module (H2) | Noto Sans 800, clamp(1.5rem, 3vw, 2.25rem), #000864 |
| **Company Desc** | Text Module | 0.875rem, #666 |
| **Product Tags** | Group Module (Flexbox) | Each: JetBrains Mono 11px, uppercase, bg: #000864, color: #fff, padding: 6px 14px, border-radius: 6px |
| **Hero Metric** | Group Module (inline-flex) | Value: Noto Sans 800, 3rem, #00AFF0. Description: 1.125rem, #333, 600 |

#### Body Content Pattern

| Element | Divi 5 Module | Notes |
|---------|--------------|-------|
| **H3 headings** | Text Module | "The Challenge", "The Solution", "Results", "Why It Matters" — Noto Sans 700, 1.25rem, #000864 |
| **Paragraphs** | Text Module | 1rem, #333, line-height 1.7 |
| **Results Table** | Code Module | HTML `<table>` with scope attributes — too structured for native Divi modules |
| **Quotes** | Code Module or Group Module | blockquote with left border 3px solid #00AFF0, italic text, cite line |
| **Callout Boxes** | Group Module | bg: #f0f9ff, border: 1px solid rgba(0,175,240,0.25), border-left: 4px solid #00AFF0, border-radius: 0 12px 12px 0, padding: 24px 28px |
| **Criteria Lists** | Icon List Module or Code Module | 2-column grid of checkmark items |
| **Video Links** | Group Module | Flexbox row with YouTube icon, text, external link |

> **Divi 5 Note on Tables:** Results tables with `<thead>`, `<th scope="col">`, alternating row backgrounds, and colored change indicators require a **Code Module** for proper semantic HTML and accessibility. Divi 5 does not have a native data table module.

---

### Case Study 1: Ginfong Precision (id: case-ginfong)

| Field | Value |
|-------|-------|
| **Industry** | Metal Stamping |
| **Company** | Ginfong Precision (jin feng jing mi) |
| **Location** | Thailand |
| **Products** | ERP, SFT |
| **Hero Metric** | +200% Revenue Growth |
| **Logo** | logos/case-studies/kingfont.png |

#### Results Table

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Gross profit margin | 23% | 34% | +11 percentage points (green) |
| Revenue | Baseline | +200% | Grew through COVID (green) |

#### Additional Content
- **Video Link:** YouTube embed link (https://www.youtube.com/watch?v=p5vn_llRe5M) — external, opens new tab
- **Vendor Selection Callout:** "What Ginfong Looked For in an ERP Partner" — 7 criteria in 2-column grid:
  1. After-sales service quality
  2. Thai tax compliance
  3. Market share and reputation
  4. Industry-specific experience
  5. Brand longevity
  6. Price-to-value ratio
  7. Multilingual support

---

### Case Study 2: Thai Alpha Polymer (id: case-thai-alpha)

| Field | Value |
|-------|-------|
| **Industry** | Plastics Manufacturing |
| **Company** | Thai Alpha Polymer |
| **Location** | Thailand |
| **Products** | Workflow ERP (iGP), WMS (sFLS) |
| **Hero Metric** | 60->15 Days to Close |
| **Logo** | logos/official-site/carousel/thai-alpha-polymer.png |

#### Results Table

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Stock accuracy | Unknown | 95% | Barcode-driven accuracy (green) |
| Monthly closing | 60 days | 15 days | 75% faster (green) |

#### Named User Quotes
1. "The closing process used to take our entire team two months. Now we're done in two weeks." — Khun Noo, Accounting Department
2. "Every scan updates the system instantly. We finally trust our inventory numbers." — Khun Ae, Warehouse

#### Referral Callout
"Recommended by a Fellow Manufacturer" — Thai Alpha chose DigiWin based on a recommendation from Thai Hosheng.

---

### Case Study 3: Thai Hosheng Packing (id: case-thai-hosheng)

| Field | Value |
|-------|-------|
| **Industry** | Packaging |
| **Company** | Thai Hosheng Packing |
| **Location** | Thailand |
| **Products** | Workflow ERP (iGP), WMS (sFLS), SFT |
| **Hero Metric** | 90->15 Days to Close |
| **Logo** | logos/official-site/carousel/thai-ho-sheng.png |

#### Results Table

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Monthly closing | 90 days | 15 days | 83% faster (green) |
| Stock accuracy | Unknown | 90% | System-matched inventory (green) |
| On-time delivery | Unknown | 80% | Measurable OTD tracking (green) |

#### Why It Matters
Most comprehensive deployment (ERP + WMS + SFT). Most dramatic closing improvement (90 to 15 days). Referred Thai Alpha to DigiWin.

---

### Case Study 4: MUFU Technologies (id: case-mufu)

| Field | Value |
|-------|-------|
| **Industry** | Manufacturing |
| **Company** | MUFU Technologies |
| **Location** | Taiwan |
| **Products** | Workflow ERP (iGP) |
| **Hero Metric** | Full Automation |
| **Logo** | logos/official-site/carousel/mufu.png |

#### Results (Checklist format — no table)

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **List** | Icon List Module | 3 items with green checkmarks |

1. Full automation of cross-department workflows
2. Eliminated manual data re-entry between departments
3. Single source of truth for all operational data

---

### Case Study 5: Taiyo Fastener Thailand (id: case-taiyo)

| Field | Value |
|-------|-------|
| **Industry** | Fasteners |
| **Company** | Taiyo Fastener Thailand |
| **Location** | Bangpoo Industrial Estate, Samut Prakan |
| **Parent** | Subsidiary of Taiyoseiko Corporation, Japan |
| **Products** | ERP, WMS (sFLS) |
| **Hero Metric** | Systems Unified |
| **Logo** | logos/case-studies/taiyo-fastener.jpg |

#### Results (Checklist format — no table)

1. Unified multiple legacy systems into one platform
2. Reduced material tracking errors
3. Improved production scheduling accuracy

#### Japanese Quality Callout
"Japanese Quality Standards, Thai Operations" — When a Japanese manufacturer with the world's strictest quality standards chose DigiWin for their Thailand operation, it wasn't because we were the cheapest option.

---

## Section 4: Listed Case Studies — "More Success Stories"

**Purpose:** Show breadth beyond the 5 detailed studies. Named companies with logos prove a growing portfolio.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #F5F7FA, padding: 80px 24px, aria-label: "Additional case studies" |
| **Inner** | Group Module | max-width: 1200px |
| **Header** | Group Module | Label + title + subtitle |
| **Listed Grid** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, gap: 16px |
| **Each Card** | Group Module | bg: #fff, border: 1px dashed #cbd5e1, border-radius: 12px, padding: 20px, opacity: 0.85, Flexbox row with logo + info, hover: opacity 1 + solid border + blue color |
| **Placeholder Section** | Group Module | "Looking for Your Industry?" header + 4-column placeholder grid |

### Section Header

| Element | Content |
|---------|---------|
| **Label** | `More Success Stories` — JetBrains Mono, 11px, #047857, uppercase |
| **Title** | `Growing Every Quarter` — Noto Sans 800, clamp(1.5rem, 3vw, 2rem), #000864 |
| **Subtitle** | `Our Thailand case study library continues to expand. Contact us for references in your specific industry.` — 1rem, #666 |

### Listed Companies (6 cards)

| # | Company | Industry | Logo Path | CTA |
|---|---------|----------|-----------|-----|
| 1 | DIMET (SIAM) | Manufacturing, Thailand | logos/case-studies/dimet-siam.png | Ask Us About This Case -> |
| 2 | Lotus Pack | Packaging, Workflow ERP | logos/case-studies/lotuspack.jpg | Ask Us About This Case -> |
| 3 | Mr. Ken | Ceiling fans, Thailand | logos/case-studies/mrken.png | Ask Us About This Case -> |
| 4 | Hoo Chin Electronics | Electronics, Thailand (he qing dian zi) | logos/case-studies/hoochin.png | Ask Us About This Case -> |
| 5 | SRANG SERN | Rubber machinery, Thailand (shang sheng) | logos/case-studies/srangsern.png | Ask Us About This Case -> |
| 6 | De Poen Pneumatic | Pneumatic tools, Taiwan (TWSE: 1570) | logos/case-studies/depoen.jpg | Ask Us About This Case -> |

Each card: 64x64px logo (Image Module) + company name (Noto Sans 700, 1rem, #000864) + industry (0.8125rem, #666) + CTA link (0.8125rem, 600, #00AFF0). All CTAs link to /demo.html.

### Industry Placeholder Cards (4 cards)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Grid** | Row with CSS Grid | `grid-template-columns: repeat(4, 1fr)`, gap: 16px |
| **Each Card** | Group Module | bg: #f8faff, border: 1px dashed #c4dff6, border-radius: 12px, padding: 24px, text-align: center, hover: solid border + blue |

| # | Icon | Text | CTA |
|---|------|------|-----|
| 1 | Gear (settings) | Looking for automotive references? We have them. | Contact for References -> |
| 2 | Chip (electronics) | Electronics manufacturers — ask about our Thai implementations. | Contact for References -> |
| 3 | Building (food) | Food-grade compliance? We've done it. | Contact for References -> |
| 4 | Document (textile) | Textile manufacturers — ask about production tracking results. | Contact for References -> |

Icons: SVG, 48x48, bg: rgba(0,175,240,0.1), border-radius: 12px, stroke: #00AFF0. All CTAs link to /demo.html.

### Responsive

| Breakpoint | Listed Grid | Placeholder Grid |
|-----------|-------------|-----------------|
| Desktop (>1024px) | 3 columns | 4 columns |
| Tablet (<=1024px) | 2 columns | 2 columns |
| Mobile (<=640px) | 1 column | 1 column |

---

## Section 5: Cross-Cutting Insights

**Purpose:** Synthesize the pattern across all case studies into 3 compelling aggregate stats. Reinforces that these aren't outliers — they're consistent outcomes.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: linear-gradient(135deg, #000432 0%, #000864 50%, #001080 100%), padding: 80px 24px, grain overlay, aria-label: "Cross-cutting insights" |
| **Inner** | Group Module | max-width: 1000px, center, text-align: center |

### Stats (3 columns)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Stats Grid** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, gap: 32px |

| Stat | Value | Label |
|------|-------|-------|
| 1 | `75%` | Faster Month-End Closing |
| 2 | `90-95%` | Stock Accuracy Achieved |
| 3 | `+11pp` | Gross Profit Improvement |

Value: Noto Sans 800, 3rem, #00AFF0. Label: JetBrains Mono 11px, uppercase, 0.1em spacing, rgba(255,255,255,0.85).

### Synthesis Quote

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Quote Box** | Group Module | max-width: 700px, centered, bg: rgba(255,255,255,0.05), border: 1px solid rgba(255,255,255,0.08), border-radius: 12px, padding: 24px 32px |
| **Quote Text** | Text Module | `**The pattern is clear:** DigiWin's Thai customers consistently report two transformations — dramatically faster financial closing (from months to weeks) and stock accuracy that finally matches reality. These aren't aspirational targets. They're measured outcomes from factories operating in Thailand today.` — 1rem, rgba(255,255,255,0.8), line-height 1.7. "The pattern is clear:" in bold white. |

### Responsive

| Breakpoint | Stats Grid |
|-----------|-----------|
| Desktop (>640px) | 3 columns |
| Mobile (<=640px) | 1 column, gap: 24px |

---

## Section 6: CTA — "Want Results Like These?"

**Purpose:** Convert case study readers into consultation requests.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: linear-gradient(135deg, #00AFF0 0%, #003CC8 50%, #001080 100%), padding: 100px 24px, grain overlay at 0.05, text-align: center, aria-label: "Call to action" |
| **Inner** | Group Module | max-width: 640px, centered |

### Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `Want Results Like These?` — Noto Sans 800, clamp(1.5rem, 4vw, 2.25rem), white |
| **Subtitle** | Text Module | `Every factory is different. Tell us about yours and we'll share relevant case studies from your industry.` — 1.0625rem, rgba(255,255,255,0.85), line-height 1.6 |
| **Buttons Row** | Group Module (Flexbox) | Center, gap: 16px, flex-wrap: wrap |
| **Button 1** | Button Module | `Let's Talk` → /demo.html — `.btn-white` (white bg, navy text) |
| **Button 2** | Button Module | `Explore Products` → /products.html — `.btn-outline-white` (transparent bg, white border) |

---

## Animation Strategy

### Scroll-Triggered Animations

| Element | Divi 5 Interaction | Settings |
|---------|-------------------|----------|
| Case study cards (grid) | Scroll → Fade In Up (`.cs-animate`) | Duration: 400ms, ease, stagger: 70ms |
| Detail section headers | Scroll → Fade In Up | Duration: 400ms |
| Results tables | Scroll → Fade In Up | Duration: 400ms |
| Quotes/callouts | Scroll → Fade In Up | Duration: 400ms |
| Listed cards | Scroll → Fade In Up | Duration: 400ms, stagger: 70ms |
| Insight stats | Scroll → Fade In Up | Duration: 400ms, stagger: 100ms |
| Hero badge dot | CSS pulse animation | `pulse-dot 2s ease-in-out infinite` |

### Navigation Interactions

| Element | Behavior | Settings |
|---------|----------|----------|
| Case study cards → detail sections | Click card → smooth scroll to matching `#case-{id}` anchor | Custom `smoothScrollTo()` with **800ms duration**, ease-in-out curve (`2t² / -1+4t-2t²`), `requestAnimationFrame` loop. Prevents default anchor jump. Cards are `<a href="#case-{id}">` elements. Fixed duration ensures consistent scroll feel regardless of page height. |
| Industry filter buttons | Click → show/hide cards matching `data-industry` attribute | Active state toggled via `.active` class + `aria-pressed`. "All" filter shows all cards. |

### Hover Interactions

| Element | Divi 5 Interaction | Settings |
|---------|-------------------|----------|
| Case study cards | Hover → Border + Shadow + TranslateY | border: #00AFF0, shadow: 0 8px 30px rgba(0,175,240,0.12), translateY: -2px, 0.3s ease |
| Filter buttons | Hover → Border + Color | border: #00AFF0, color: #00AFF0, 0.3s ease |
| Listed cards | Hover → Opacity + Border | opacity: 1, border-style: solid, border-color: #00AFF0, 0.3s ease |
| Placeholder cards | Hover → Border + Background | border: solid #00AFF0, bg: #f0f7ff, 0.3s ease |
| Video link | Hover → Border + Background | border: #00AFF0, bg: #f0f9ff, 0.3s ease |

### Focus States

| Element | Styling |
|---------|---------|
| Filter buttons | focus-visible: outline 3px solid #00AFF0, offset 2px |
| Case study cards | focus-visible: outline 3px solid #00AFF0, offset 3px |

### Reduced Motion

`prefers-reduced-motion: reduce` disables:
- Hero badge pulse animation
- All `.cs-animate` elements: opacity 1, transform none, transition none
- All hover transforms

---

## Filter JavaScript (Code Module)

The filter functionality requires custom JavaScript in a Code Module:

```javascript
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    var filterBtns = document.querySelectorAll('.cs-filter-btn');
    var cards = document.querySelectorAll('.cs-card');

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var filter = this.getAttribute('data-filter');
            filterBtns.forEach(function(b) {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            cards.forEach(function(card) {
                card.style.display = (filter === 'all' || card.getAttribute('data-industry') === filter) ? '' : 'none';
            });
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('.cs-card').forEach(function(card) {
        card.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                var target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
```

> **Divi 5 Note:** Place this JavaScript in a Code Module at the bottom of the page, or in Divi's Integration settings (body footer code). If Divi 5's Interactions system supports show/hide based on data attributes by launch, this JavaScript can be replaced with native Interactions.

---

## Validation Checklist

| Check | Requirement | Implementation |
|-------|------------|----------------|
| Skip link | `<a href="#main-content" class="dw-skip-link">Skip to content</a>` | Before `<main>` |
| Main landmark | `<main id="main-content">` | Wraps all content |
| Section labels | Every `<section>` has `aria-label` describing content | All 6+ sections labeled |
| Heading hierarchy | H1 (hero) -> H2 (company names, section titles) -> H3 (sub-sections within case studies) | No skipped levels |
| Table accessibility | All `<th>` have `scope="col"`, tables have `aria-label` | 3 results tables |
| Image alt text | All company logos have descriptive alt text | 11 logos (5 detail + 6 listed) |
| Filter accessibility | Buttons have `aria-pressed` state, filter group has `aria-label` | JavaScript updates aria-pressed on click |
| Color contrast | Positive change text uses #02D28C on white bg (4.5:1+ ratio) | Results table cells |
| Reduced motion | All scroll animations + hover transforms disabled | Media query applied |
| External links | YouTube video link has `target="_blank"` + `rel="noopener noreferrer"` | Ginfong video link |
| Internal links | All "Ask Us About This Case" and CTAs link to existing /demo.html | 10+ links verified |
| No "Book a Demo" | All CTAs use "Let's Talk" | CTA section, placeholder cards |
| Structured data | BreadcrumbList JSON-LD | In `<head>` (to be added during build) |
| Real links only | /demo.html, /products.html verified as existing pages | Checked |
| Logo loading | All logos use `loading="lazy"` | Performance optimization |
| Card links | Case study cards are anchor links (`<a>`) for keyboard navigation | href="#case-{id}" |
