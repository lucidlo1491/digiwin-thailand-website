# Content Spec: The Business Model Crisis — Divi 5 Build (2.0)

**Batch:** 1 (Highest Priority)
**PRD Reference:** Section 2.1 — The Business Model Crisis
**Playbook Reference:** Sections 2.3 (Track B Voice), 3.3 (Track B Leaf Arc), 7.3 (Business Model Crisis Notes)
**Status:** v2.0 — Mapped to Divi 5 modules from HTML build
**Last Updated:** February 12, 2026
**Platform:** WordPress + Divi 5

---

## Page Overview

| Element | Specification |
|---------|---------------|
| **Audience** | Distributor prospects deep in awareness/consideration — they've seen the Hub and want depth |
| **Objective** | Deepen the pain of the man-day model, then pivot to possibility. Empathy first. |
| **URL** | digiwin.co.th/partner-program/business-model.html |
| **Emotional Arc** | Disruption (the cycle is a trap) > Evidence (documented math) > Possibility (three futures) > Economics (the alternative model) |
| **Page Structure** | 8 sections, ~540 lines inline CSS in static build |

---

## Divi 5 Capabilities Leveraged

| Divi 5 Feature | Where Used | Why |
|----------------|-----------|-----|
| **CSS Grid Layout** | Evidence cards (Sections 3-4), Solution cards, Comparison table | Responsive grids |
| **Group Module** | Cycle steps, evidence cards, future path cards, solution cards, insight box | Card containers |
| **Design Variables** | Colors, fonts, spacing | Global consistency |
| **Interactions System** | Card fade-ins, hover effects, cycle step reveals | Replaces custom JS |
| **Icon List Module** | Comparison table rows | Structured checkmark/X lists |
| **Code Module** | Cycle connecting line (gradient SVG), comparison table, diamond pattern overlay | Complex visual elements |
| **Semantic Elements** | Every section | Proper heading hierarchy |

---

## Design Variables Reference

> **Global Design Variables are defined in `ContentSpec_Home_Divi5_2.0.md`.** This page inherits the same set.

### Page-Specific Colors

| Color | Value | Usage |
|-------|-------|-------|
| Red pain gradient | `#fef2f2 → #fff5f5` | Cycle step bg, evidence card bg, Path 1 |
| Red border | #fecaca | Pain cards border, cycle step border |
| Red accent bar | #ef4444 | Top accent bar on evidence cards |
| Red icon | #dc2626 | Path 1 X icon |
| Yellow gradient | `#fef9c3 → #fefce8` | Path 2 bg |
| Yellow border | #fde047 | Path 2 border |
| Yellow icon | #eab308 | Path 2 alert icon |
| Green gradient | `#f0fdf4 → #dcfce7` | Path 3 bg, solution card bg |
| Green border | #86efac | Path 3 border, solution cards |
| Green icon | #22c55e | Path 3 check icon |
| Green accent bar | #22c55e | Top accent bar on solution cards |

---

## Section 1: Hero

**Purpose:** Hook with truth — name the problem the distributor feels but hasn't articulated.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(135deg, #1a2e40 0%, var(--dw-dark-navy) 50%, #2d4a5e 100%)`, padding: 140px top / 100px bottom. Dot pattern overlay (Code Module, opacity 0.03). |
| **Content Column** | Column | Max-width: 900px |
| **Breadcrumb** | Text Module | `Partner Program / Business Model Crisis` — 14px, `rgba(255,255,255,0.5)`. "Partner Program" links to `/partner-program.html` |
| **Headline** | Text Module (H1) | `The Problem Isn't Your Team—It's Your Business Model` — `--dw-heading` 700, `clamp(32px, 4vw, 48px)`, white |
| **Subtitle** | Text Module | "You're tired of Monday Morning Escalations..." — `--dw-body` 18px, `rgba(255,255,255,0.75)`, line-height 1.75 |

> **No hero stats bar on this page** — it's a narrative page, not a numbers page. The hero is intentionally shorter/simpler.

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | Full layout |
| Mobile (≤640px) | Padding: 120px top / 80px bottom, H1: 32px |

---

## Section 2: The Pattern — "You Know This Pattern"

**Purpose:** Visualize the SI consulting cycle as a trap.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: `--dw-section-pad` |
| **Header** | Group Module | Centered: headline + subhead |
| **Cycle Layout** | Row with CSS Grid | `grid-template-columns: repeat(4, 1fr)`, gap: 24px, max-width: 1000px, centered |
| **Connecting Line** | Code Module | Absolute-positioned gradient line running behind step circles. Red gradient: `#fecaca → #ef4444 → #fecaca`. Hidden on mobile. |
| **Each Step** | Group Module | Background: `linear-gradient(135deg, #fef2f2, #fee2e2)`, border: `1px solid #fecaca`, border-radius: `--dw-card-radius`, padding: 28px, center-aligned |
| **Repeat Callout** | Group Module | Below the 4 steps. Background: `linear-gradient(135deg, #fef2f2, #fff5f5)`, border: `1px solid #fecaca`, border-radius: 12px, padding: 20px 28px, center-aligned |

### Step Content

| Step | Icon | Title | Description |
|------|------|-------|-------------|
| 1 | Checkmark circle (line icon) | Win the Project | After weeks of proposals, demos, negotiations... |
| 2 | Document (line icon) | Deliver Expertise | Your team does great work. You solve hard problems. |
| 3 | Alert circle (line icon) | Project Ends | Knowledge transferred. They don't need you anymore. |
| 4 | Refresh/repeat (line icon) | Start from Zero | Back to hunting. More proposals. More negotiations. |

### Step Internal Structure

| Element | Divi 5 Module | Notes |
|---------|--------------|-------|
| **Step Number** | Text Module or Circle Counter | 36x36px circle, `#ef4444` bg, white text, `--dw-heading` 600, 14px |
| **Icon** | Image/Code Module | 40x40px, red-tinted circle bg |
| **Title** | Text Module (H3) | `--dw-heading` 700, 18px, `--dw-text-dark` |
| **Description** | Text Module | `--dw-body` 14px, `--dw-text-light`, line-height 1.6 |

### Repeat Callout

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Icon** | Code Module | Cycling arrows SVG, 24x24px |
| **Text** | Text Module | "And the cycle repeats... forever" — `--dw-heading` 600, 16px, `#dc2626` |

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | 4 columns with connecting line |
| Tablet (≤1024px) | 2 columns (2×2 grid), connecting line hidden |
| Mobile (≤640px) | 1 column |

---

## Section 3: The Industry Evidence (Row 1)

**Purpose:** Document the math of why the model is broken — not anecdote, evidence.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(180deg, #f8fafc 0%, #fff 100%)`, padding: `--dw-section-pad` |
| **Header** | Group Module | Centered: headline + subhead |
| **Cards Grid** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, gap: 24px |
| **Each Card** | Group Module | White bg, `1px solid #e2e8f0`, `--dw-card-radius`, padding: 32px. Top accent bar: 4px solid `#ef4444` (border-top). |

### Evidence Card Internal Structure

| Element | Divi 5 Module | Notes |
|---------|--------------|-------|
| **Icon** | Image/Code Module | 48x48px, red-tinted bg circle |
| **Title** | Text Module (H3) | `--dw-heading` 700, 20px, `--dw-text-dark` |
| **Body** | Text Module | `--dw-body` 15px, `--dw-text-light`, line-height 1.65. Bold text for key figures. |
| **Formula** | Text Module | `--dw-mono` 12px, `#dc2626`, bg `#fef2f2`, border `1px solid #fecaca`, 8px 16px padding, border-radius 8px. Appears as a "tag" at bottom. |

### Evidence Cards (Row 1)

| Card | Icon | Title | Key Figure | Formula |
|------|------|-------|-----------|---------|
| 1 | Bar chart | The Profit Squeeze | **~35% in 2018 to ~18% in 2024** | `Same Effort = Half the Return` |
| 2 | Users | The 35-Person Cap | **35-45 employees** | `Revenue = Headcount (Linear Only)` |
| 3 | Clock | The ฿200K Replacement Cost | **฿200,000 + 6 months** | `Talent Loss = 200K + 6 Months` |

### Responsive

| Breakpoint | Grid |
|-----------|------|
| Desktop (>1024px) | 3 columns |
| Tablet (≤1024px) | 2 columns (card 3 centered below) |
| Mobile (≤640px) | 1 column |

---

## Section 4: More Industry Evidence (Row 2)

**Purpose:** 3 more evidence data points.

### Divi 5 Implementation

Identical structure to Section 3 with:

| Difference | Value |
|-----------|-------|
| **Background** | White (#fff) |
| **Padding** | 60px top / 100px bottom (tighter — flows from Section 3) |

### Evidence Cards (Row 2)

| Card | Icon | Title | Key Figure | Formula |
|------|------|-------|-----------|---------|
| 1 | Dollar sign | The 65% Overrun Trap | **65% of budget overruns** | `Goodwill Fixes = Profit Evaporates` |
| 2 | Bar chart (ascending) | The 30% Undercut | **~30% lower** | `Price War = Margin Death` |
| 3 | Bookmark | The Shrinking Pie | **~100 factory closures/month** | `Fewer Factories = More Competition` |

> **Data Notes:** "65% of budget overruns" and "~100 factory closures/month" are not externally cited. May need softening or source attribution before Divi build.

### Responsive

Same as Section 3.

---

## Section 5: Three Possible Futures

**Purpose:** Present three paths — only one leads to sustainable growth. Pivot from pain to possibility.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: `--dw-section-pad` |
| **Header** | Group Module | Centered: headline + subhead |
| **Path Cards** | Column (stacked) | Max-width: 900px, centered. 3 cards stacked vertically with 24px gap. |
| **Insight Box** | Group Module | Below paths. Dark bg with diamond pattern. |

### Path Card Internal Structure

| Element | Divi 5 Module | Notes |
|---------|--------------|-------|
| **Card** | Group Module | Per-path gradient bg, per-path border color, `--dw-card-radius`, padding: 32px |
| **Icon Row** | Group Module (Flexbox) | Icon (32x32px circle) + Title, aligned left |
| **Subtitle** | Text Module | `--dw-heading` 600, 14px, per-path color, italic |
| **Body** | Text Module | `--dw-body` 15px, `--dw-text-dark`, line-height 1.65 |

### Path Cards

| Path | Color | Icon | Title | Subtitle |
|------|-------|------|-------|----------|
| 1 | Red bg/border | X circle (`#dc2626`) | Path 1: "Work Harder" | Why this fails: You cannot outwork structural compression. |
| 2 | Yellow bg/border | Alert circle (`#eab308`) | Path 2: "Find a Niche" | Why this is limited: You hit a ceiling on client size. |
| 3 | Green bg/border | Checkmark (`#22c55e`) | Path 3: "Change the Model" | Why this is logical: Decouples revenue from hours. |

### Insight Box

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Group Module | Background: `linear-gradient(135deg, var(--dw-dark-navy), #1a2e40)`, `--dw-card-radius`, padding: 40px 32px. Diamond pattern overlay (Code Module). Margin-top: 48px. |
| **Quote** | Text Module | "Shift from selling hours to building assets..." — `--dw-heading` 600, 20px, white, center-aligned |
| **Subtext** | Text Module | "The goal isn't to sell more software..." — `--dw-body` 15px, `rgba(255,255,255,0.6)`, center-aligned |

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| All breakpoints | Path cards are already stacked vertically (single column). Insight box padding reduces on mobile. |

---

## Section 6: There's Another Way — Solution Cards

**Purpose:** Pivot to the alternative. What adding a product line changes.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(180deg, #f8fafc 0%, #fff 100%)`, padding: `--dw-section-pad` |
| **Header** | Group Module | Centered |
| **Cards Grid** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, gap: 24px |
| **Each Card** | Group Module | White bg, `1px solid #86efac`, `--dw-card-radius`, padding: 32px. Top accent bar: 4px solid `#22c55e`. Hover: `translateY(-4px)`, shadow. |

### Solution Card Internal Structure

Same as evidence cards but with green accent instead of red.

### Solution Cards

| Card | Icon | Title | Body | Formula |
|------|------|-------|------|---------|
| 1 | Sun | Recurring Revenue | Software licenses and MA generate predictable monthly income... | `Monthly Revenue = License Base x Rate` |
| 2 | Lock | Sticky Relationships | When customers run their factory on your software... | `Churn Rate → Near Zero` |
| 3 | Trending up | Compound Growth | Year 2 = Year 1 + new customers... | `Year N = Year N-1 + New Wins` |

### Responsive

Same grid behavior as evidence cards (3 → 2 → 1).

---

## Section 7: Side-by-Side Comparison

**Purpose:** Direct comparison — Services Only vs. Services + Product.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: `--dw-section-pad` |
| **Header** | Group Module | Centered: headline |
| **Table** | Code Module | HTML `<table>` with styled header and alternating rows. Max-width: 1000px, centered. |

### Comparison Table

| Metric | Services Only | Services + Product |
|--------|---------------|--------------------|
| Revenue Model | Resets to zero each year | Compounds annually |
| Customer Relationship | Project-based, ends | Ongoing, permanent |
| Revenue Predictability | Feast or famine | Predictable base + growth |
| Business Valuation | 1-2x revenue (if any) | 5-10x recurring revenue |
| Owner Dependence | Business = You | Business = Customer base |
| Growth Ceiling | Limited by headcount | Limited by market size |

### Table Styling

| Element | Style |
|---------|-------|
| **Header row** | `var(--dw-dark-navy)` bg, white text, `--dw-heading` 600 |
| **"Services Only" column** | bg `#fef2f2`, text `#dc2626` for emphasis |
| **"Services + Product" column** | bg `#f0fdf4`, text `#22c55e` for emphasis |
| **Metric label column** | bg white, `--dw-heading` 600, `--dw-text-dark` |
| **Alternating rows** | `#f8fafc` / white |
| **Border** | `1px solid #e2e8f0` |
| **Border radius** | 16px on outer table |

> **Divi 5 Note:** Use Code Module with an HTML `<table>`. Divi has no native table module, and building this from Rows/Columns would be fragile. The Code Module approach gives us exact styling control.

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | Full 3-column table |
| Tablet (≤1024px) | Table scrolls horizontally or stacks (header cells hidden except first) |
| Mobile (≤640px) | Stacked card view — each row becomes a card with metric name on top |

---

## Section 8: Final CTA

**Purpose:** Bridge to Economics or Solutions — the next step in the journey.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(135deg, var(--dw-primary-blue) 0%, #2d7bc4 50%, #1e5a8a 100%)`, padding: `--dw-section-pad`. Dot pattern overlay. |
| **Content** | Group Module | Max-width: 800px, centered |
| **Headline** | Text Module (H2) | "See How the Economics Actually Work" — white, `clamp(32px, 4vw, 44px)` |
| **Body** | Text Module | "You've seen the problem. Now see the math..." — 18px, `rgba(255,255,255,0.9)` |
| **Primary CTA** | Button Module | `See Partner Economics` → `/partner-program/economics.html` — White bg, `#2d7bc4` text |
| **Secondary CTA** | Button Module | `Evaluate the Weapon First` → `/partner-program/solutions.html` — Ghost button |

> **Note:** This page's CTAs bridge to other Partner pages, NOT to a contact form. This is correct — the visitor hasn't seen the economics yet.

### Responsive

Same as Partner Hub/Economics CTA sections.

---

## Scroll Animation Strategy (Divi 5 Interactions)

| Animation | Divi 5 Interaction | Settings |
|-----------|-------------------|----------|
| Cycle steps reveal | Scroll → Fade In | 400ms ease, 150ms stagger |
| Cycle connecting line draw | Scroll → Custom (Code Module CSS animation) | 1s ease-in-out, triggered on viewport entry |
| Evidence cards fade-in | Scroll → Fade In | 400ms ease, 100ms stagger |
| Path cards slide-up | Scroll → Slide Up | 400ms ease, 150ms stagger |
| Solution cards fade-in | Scroll → Fade In | 400ms ease, 100ms stagger |
| Card hover lifts | Hover → Transform | translateY: -4px |
| Insight box fade-in | Scroll → Fade In | 600ms ease |
| CTA slide-up | Scroll → Slide Up | 600ms ease |

---

## Page-Specific JavaScript

| Component | Static Build | Divi 5 Equivalent |
|-----------|-------------|-------------------|
| Scroll animations | `DigiWinUI.initScrollAnimation()` | Divi 5 Interactions |
| Cycle connecting line | CSS gradient + absolute positioning | Code Module (CSS only) |
| Comparison table | HTML table | Code Module |

> **Zero custom JavaScript required.**

---

## Issues Found During Mapping

| Issue | Severity | Recommendation |
|-------|----------|----------------|
| **"65% of budget overruns" unsourced** | Medium | Verify or soften to "the majority of budget overruns" |
| **"~100 factory closures/month" may be stale** | Medium | Attributed to "early 2024" — verify current conditions |
| **"5-10x recurring revenue" valuation** | Low | Position as industry benchmark, not guarantee |
| **Comparison table on mobile** | Medium | Code Module table needs responsive CSS. Use horizontal scroll or card-stack pattern. |
| **No hero stats on this page** | Info | Intentional — narrative page, not numbers page. Correct approach. |
| **PRD calls for 4 sections, HTML has 8** | Info | Expanded content aligns with Playbook "Empathy First" guidance. Richer than PRD spec but editorially sound. |

---

## Validation Checklist (Divi 5 Build)

- [ ] Breadcrumb navigates to Partner Hub
- [ ] Hero is simpler than other Partner pages (no stats bar) — intentional
- [ ] 4 cycle steps render in row with connecting gradient line
- [ ] Connecting line hidden on tablet/mobile
- [ ] "And the cycle repeats... forever" callout displays with cycling arrows
- [ ] 6 evidence cards (3+3) with red top accent bars
- [ ] Formula tags display in monospace with red styling
- [ ] 3 path cards stacked vertically (red, yellow, green)
- [ ] Path icons match colors (red X, yellow alert, green check)
- [ ] Dark insight box with diamond pattern
- [ ] 3 solution cards with green top accent bars
- [ ] Comparison table renders with red/green column tinting
- [ ] Table is responsive (scrolls or stacks on mobile)
- [ ] CTA bridges to Economics and Solutions (NOT to contact form)
- [ ] No "Request Demo" or "Book Demo" language anywhere
- [ ] All internal links point to pages that exist
- [ ] Responsive: all grids collapse correctly
- [ ] Colors match Design Variables
- [ ] Fonts: Noto Sans headings/body, JetBrains Mono labels/formulas

---

*This spec supersedes `ContentSpec_PartnerBusinessModel_1.0.md` for the Divi 5 build.*
