# Content Spec: Industries Hub Page — Divi 5 Build (2.0)

**Batch:** 2 (Industry Pages)
**PRD Reference:** Section 4, Page 4.0
**Playbook Reference:** Section 2 (Dual-Audience Emotional Arcs — Track A)
**Status:** v2.0 — Reverse-engineered from HTML build + mapped to Divi 5 modules
**Last Updated:** February 14, 2026
**Platform:** WordPress + Divi 5

---

## Page Overview

| Element | Specification |
|---------|---------------|
| **Audience** | Track A — Factory operators exploring industry-specific solutions |
| **Objective** | Route visitors to the correct industry vertical within 15 seconds |
| **URL** | digiwin.co.th/industries.html |
| **Emotional Arc** | Empathetic ("we know your industry") → Confident ("proven by experience") → Action |
| **Page Structure** | 6 sections: Hero, Market Context, Industry Cards, Cross-Industry Capabilities, Our Approach, CTA |

---

## Divi 5 Capabilities Leveraged

| Divi 5 Feature | Where Used | Why |
|----------------|-----------|-----|
| **CSS Grid Layout** | Context stats (4-col), Challenges grid (4-col) | Native grid without custom CSS |
| **Group Module** | Industry cards, Challenge cards, Context stat cards | Card containers with shared styling |
| **Design Variables** | Colors, fonts, spacing | Single source of truth for brand tokens |
| **Interactions System** | Card hovers, scroll reveals, stat counters | Built-in scroll-triggered animations replace custom JS |
| **Number Counter** | Hero stats, Context stats | Animated count-up on scroll |
| **Semantic Elements** | Every section | `<section>` tags for SEO and accessibility |
| **Nested Modules** | Industry cards (icon + stat + text + features + link) | Complex card layouts natively |
| **Blurb Module** | Challenge cards (icon + title + text) | Built-in icon/title/body structure |

---

## Design Variables (Global Reference)

All Design Variables are defined once in Divi 5's global panel. This page references the same variables as the Homepage spec. See `ContentSpec_Home_Divi5_2.0.md` for the full Design Variables table.

Key variables used on this page:
- `--dw-primary-blue` (#00AFF0), `--dw-dark-navy` (#000864), `--dw-light-gray` (#F5F7FA)
- `--dw-heading` (Noto Sans), `--dw-mono` (JetBrains Mono)
- `--dw-section-pad` (100px), `--dw-card-radius` (20px)

---

## Section 1: Hero — Centered Dark

**Purpose:** Establish industry-specific expertise and set the routing intent.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(165deg, #0f1419 0%, #1a2632 40%, #000864 100%)`, min-height: 60vh, padding: 160px 0 120px, overflow: hidden, semantic tag: `<section>` |
| **Grain Overlay** | Code Module | SVG noise filter, opacity: 0.03, pointer-events: none, `animation: grain 8s steps(10) infinite` |
| **Radial Glow** | Code Module | `radial-gradient(ellipse at 70% 30%, rgba(0,175,240,0.12) 0%, transparent 50%)` positioned overlay |
| **Super D** | Code Module | Class: `dw-d-bg dw-d-bg--center dw-d-bg--particle dw-d-parallax`, opacity: 0.10 |
| **Content Container** | Row | Max-width: 1200px, centered, text-align: center, z-index: 2 |

### Hero Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Badge** | Text Module | `INDUSTRY-SPECIFIC MANUFACTURING ERP` — JetBrains Mono, 11px, uppercase, 0.1em spacing. Styled as pill: background rgba(0,175,240,0.1), border 1px solid rgba(0,175,240,0.3), border-radius 50px, padding 10px 20px, color #00AFF0. Pulsing dot via CSS pseudo-element. |
| **Headline** | Text Module (H1) | `Built for Your Industry.` (line break) `Proven by Experience.` — "Proven by Experience." in #00AFF0. Noto Sans 700, clamp(40px, 5vw, 56px), white, line-height 1.1, letter-spacing -0.03em |
| **Subtitle** | Text Module | `Your factory isn't generic — your ERP shouldn't be either. From automotive JIT scheduling to electronics component traceability to metal processing yield optimization, we've spent 44 years solving industry-specific challenges on the shop floor.` — Noto Sans, 19px, rgba(255,255,255,0.75), max-width 680px, margin 0 auto 40px, line-height 1.7. Note: "44" uses dynamic year class `dw-years`. |
| **Stats Row** | Row (3 columns) | Flexbox, gap 48px, justify-content center, border-top 1px solid rgba(255,255,255,0.1), padding-top 40px |

### Hero Stats

| Stat | Value | Label | Module |
|------|-------|-------|--------|
| 1 | `3` | Core Verticals | Number Counter (count-up) |
| 2 | `100+` | Thai Implementations | Number Counter |
| 3 | `44` | Years Manufacturing-Only | Number Counter (dynamic year class `dw-years`) |

Value styling: Noto Sans 800, 36px, #00AFF0, -0.02em tracking.
Label styling: JetBrains Mono, 11px, rgba(255,255,255,0.75), uppercase, 0.1em spacing.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | Full layout, 3 stats inline |
| **Tablet (<=1024px)** | H1 font-size: 40px |
| **Mobile (<=640px)** | Padding: 120px 0 80px, H1: 32px, subtitle: 17px, stats wrap with gap 32px |

---

## Section 2: Market Context — Thailand Stats

**Purpose:** Ground the page in Thailand-specific market data to build credibility.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: 120px 0, top border via Code Module (linear-gradient line) |
| **Wave Fade** | Code Module | Class `dw-wave-fade`, opacity: 0.08 — placed between hero and this section |
| **Content Row** | Row | Max-width: 1100px, centered |

### Context Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Label** | Text Module | `MARKET CONTEXT` — JetBrains Mono, 11px, 500, #00AFF0, uppercase, 0.15em spacing, center-aligned |
| **Headline** | Text Module (H2) | `Thailand: ASEAN's Manufacturing Hub` — Noto Sans 700, 40px, #000864, -0.02em tracking |
| **Subtitle** | Text Module | `The region's most mature industrial ecosystem, with deep supply chains and demanding global customers` — 18px, #5b6b80, max-width 700px, margin 0 auto, line-height 1.6 |
| **Stats Grid** | Row | CSS Grid: 4 columns, gap 24px, margin-bottom 60px |

### Context Stats (4 cards)

| Stat | Value | Label |
|------|-------|-------|
| 1 | `#1` | ASEAN auto production |
| 2 | `2,500+` | Auto parts suppliers |
| 3 | `$40B` | Electronics exports |
| 4 | `~27%` | GDP from manufacturing |

Each stat card:

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Card** | Group Module | Background: #F5F7FA, border-radius: 20px, padding: 40px 24px, text-align center, border: 1px solid transparent |
| **Value** | Text Module | Noto Sans 800, 44px, #00AFF0, line-height 1, -0.02em tracking |
| **Label** | Text Module | JetBrains Mono, 11px, #5b6b80, uppercase, 0.05em spacing, margin-top 12px |

Hover interaction (Divi 5 Interactions):
- Background: white
- Border-color: rgba(0,175,240,0.2)
- Box-shadow: 0 12px 40px rgba(0,175,240,0.1)
- Transition: 0.4s ease

> **Divi 5 Note:** Use Text modules for all stat values (not Number Counter) since `#1`, `$40B`, and `~27%` contain special characters. `2,500+` could optionally use Number Counter.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Tablet (<=1024px)** | Grid: 2 columns |
| **Mobile (<=640px)** | Grid: 1 column, stat value font-size: 32px |

---

## Section 3: Industry Cards — Choose Your Industry

**Purpose:** Route visitors to the correct industry sub-page. This is the primary navigation section.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #F5F7FA, padding: 120px 0, position relative |
| **Blueprint Background** | Code Module | SVG technical drawing background (grid lines, engineering symbols), pointer-events none, z-index 0 |
| **Content Row** | Row | Max-width: 1200px, centered, z-index 2 |

### Section Header

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Label** | Text Module | `SPECIALIZED SOLUTIONS` — JetBrains Mono, 11px, 500, #00AFF0, uppercase, 0.15em spacing, center |
| **Headline** | Text Module (H2) | `Choose Your Industry` — Noto Sans 700, 40px, #000864, -0.02em tracking |
| **Subtitle** | Text Module | `Specialized solutions for Thailand's core manufacturing sectors` — 18px, #5b6b80, center |

### Industry Card Pattern (repeated 3x)

Each industry card is a full-width link (`<a>` tag) with a 2-column grid layout:

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Card Container** | Group Module (as link) | CSS Grid: 2 columns, background: white, border-radius: 24px, overflow hidden, box-shadow 0 4px 24px rgba(0,0,0,0.06), border 1px solid #e8eef3. Wrapped in anchor tag linking to industry page. |
| **Visual Panel** | Column | Background: `linear-gradient(165deg, #0f1419 0%, #1a2632 50%, #000864 100%)`, padding: 60px, centered content with grain texture overlay |
| **Content Panel** | Column | Padding: 48px, flex column, justify-content center |

> **Divi 5 Note:** Even-numbered cards should reverse the visual/content column order. Use CSS Grid `direction: rtl` on even cards (or Divi 5 column ordering) to alternate image left/right.

### Card 1: Automotive Parts Manufacturing

**Visual Panel:**

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Icon** | Code Module | Car SVG icon, 52x52px, white stroke, inside 100x100px box with background rgba(0,175,240,0.15), border-radius 24px |
| **Stat Value** | Text Module | `500+` — Noto Sans 800, 52px, #00AFF0, -0.02em tracking |
| **Stat Label** | Text Module | `Tier 1-3 suppliers served` — JetBrains Mono, 11px, rgba(255,255,255,0.75), uppercase, 0.05em spacing |

**Content Panel:**

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Title** | Text Module (H3) | `Automotive Parts Manufacturing` — Noto Sans 700, 28px, #000864 |
| **Description** | Text Module | `Thailand is ASEAN's Detroit. We understand what tier-1 OEMs demand: perfect lot traceability, JIT delivery schedules, and EDI integration that actually works with your customers' systems.` — 16px, #5b6b80, line-height 1.7 |
| **Features** | Icon List Module | 2-column grid, gap 12px. Items: `OEM EDI integration`, `IATF 16949 compliance`, `Lot-level traceability`, `Kanban & JIT`. Blue checkmark icons. |
| **Link** | Text Module | `Explore Automotive Solutions →` — Noto Sans 600, 15px, #0369a1. Arrow gap animates on card hover (8px → 12px). |

**Link target:** `/industries/automotive.html`

### Card 2: Electronics Assembly

**Visual Panel:**

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Icon** | Code Module | Monitor SVG icon |
| **Stat Value** | Text Module | `1000+` |
| **Stat Label** | Text Module | `Component types tracked` |

**Content Panel:**

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Title** | Text Module (H3) | `Electronics Assembly` |
| **Description** | Text Module | `High-mix, low-volume. Fast product cycles. Thousands of components per board. Moisture-sensitive parts. We built our MES specifically for this complexity.` |
| **Features** | Icon List Module | `SMT integration`, `Component traceability`, `MSD management`, `AOI integration` |
| **Link** | Text Module | `Explore Electronics Solutions →` |

**Link target:** `/industries/electronics.html`

### Card 3: Metal & Plastics Processing

**Visual Panel:**

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Icon** | Code Module | Settings/gear SVG icon |
| **Stat Value** | Text Module | `15%` |
| **Stat Label** | Text Module | `Average yield improvement` |

**Content Panel:**

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Title** | Text Module (H3) | `Metal & Plastics Processing` |
| **Description** | Text Module | `Stamping, injection molding, die casting, CNC machining. Process manufacturing where yield optimization and scrap reduction directly drive your margins.` |
| **Features** | Icon List Module | `Process monitoring`, `Mold/die tracking`, `Scrap analysis`, `Cycle optimization` |
| **Link** | Text Module | `Explore Metal & Plastics Solutions →` |

**Link target:** `/industries/metal-plastics.html`

### Card Hover Interactions (Divi 5 Interactions)

- Box-shadow: 0 24px 64px rgba(0,175,240,0.18)
- Transform: translateY(-8px)
- Border-color: transparent
- Arrow gap: 8px → 12px
- Transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1)

### Card Scroll Animation (Divi 5 Interactions)

- Scroll trigger: fade-in from translateY(40px) to translateY(0)
- Threshold: 15%
- Duration: 0.4s ease
- Stagger: 0.07s between cards

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Tablet (<=1024px)** | Cards become single-column (grid-template-columns: 1fr), even cards no longer reverse direction |
| **Mobile (<=640px)** | Visual panel padding: 40px, content panel padding: 32px, title: 24px, features grid: 1 column |

---

## Section 4: Cross-Industry Capabilities

**Purpose:** Show that regardless of vertical, core manufacturing fundamentals are covered.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: 100px 0 |
| **Blueprint Background** | Code Module | SVG engineering overlay (production line, breakpoints, question marks), z-index 0 |
| **Content Row** | Row | Max-width: 1100px, centered, z-index 2 |

### Section Header

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `Cross-Industry Capabilities` — Noto Sans 700, 36px, #000864 |
| **Subtitle** | Text Module | `Regardless of your vertical, these manufacturing fundamentals are built into every DigiWin solution` — 18px, #5b6b80 |

### Capability Cards (4 cards, grid layout)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Grid** | Row | CSS Grid: 4 columns, gap 24px |
| **Each Card** | Blurb Module | Center-aligned, border 1px solid #e2e8f0, border-radius 16px, padding 32px 24px |

| Card | Icon | Title | Description |
|------|------|-------|-------------|
| 1 | Search (magnifying glass) | `Full Traceability` | `Lot-level tracking from raw material to finished goods. Answer any customer audit question in minutes, not days.` |
| 2 | Clipboard-check | `BOI Compliance` | `Production-order-level material reconciliation that passes BOI audit scrutiny. One client saved 10M+ THB/year in supplementary taxes.` |
| 3 | Arrows (expand) | `Dual-Unit Conversion` | `Show kilograms AND pieces simultaneously across purchasing, production, and sales. No workarounds needed.` |
| 4 | Eye | `Production Visibility` | `See your shop floor in real time — machine status, work order progress, and OEE — not yesterday's spreadsheet.` |

Icon styling: 64x64px background with gradient rgba(0,175,240,0.1) → rgba(0,175,240,0.05), border-radius 16px. SVG stroke #00AFF0, 28x28px.

Hover interaction:
- Border-color: #00AFF0
- Box-shadow: 0 8px 30px rgba(0,175,240,0.12)
- Icon background: linear-gradient(135deg, #00AFF0, #003CC8)
- Icon SVG stroke: white
- Transition: 0.3s ease

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Tablet (<=1024px)** | Grid: 2 columns |
| **Mobile (<=640px)** | Grid: 1 column |

---

## Section 5: Our Approach — 3-Step Process

**Purpose:** Reassure visitors that the engagement process is consultative, not pushy.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(135deg, #000864 0%, #000432 100%)`, padding: 100px 0, data-particles: bold |
| **Content Row** | Row | Max-width: 1000px, centered |

### Section Header

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `Our Approach` — Noto Sans 700, 36px, white |
| **Subtitle** | Text Module | `How we help you succeed, regardless of your starting point` — 18px, rgba(255,255,255,0.75) |

### Steps (3 columns)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Grid** | Row | CSS Grid: 3 columns, gap 32px |
| **Each Step** | Group Module | Center-aligned |

| Step | Number | Title | Description |
|------|--------|-------|-------------|
| 1 | `1` | `Understand` | `We start by understanding your specific challenges—not pushing a generic solution. Every factory is different.` |
| 2 | `2` | `Design` | `We design a solution that matches your maturity level. Start where you are, not where you "should" be.` |
| 3 | `3` | `Deliver` | `We implement in phases, delivering value quickly. You see ROI before the full project is complete.` |

Number circle: 56x56px, background linear-gradient(135deg, #00AFF0, #003CC8), border-radius 50%, Noto Sans 700, 24px, white, centered.
Title: Noto Sans 700, 20px, white.
Description: 15px, rgba(255,255,255,0.75), line-height 1.6.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Tablet (<=1024px)** | Grid: 1 column, gap 40px |

---

## Section 6: CTA — Let's Talk About Your Factory

**Purpose:** Convert interest into a conversation.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Uses shared CTA section styling (same as Homepage) |
| **Super D** | Code Module | Class: `dw-d-bg dw-d-bg--bottom dw-d-bg--gradient dw-d-parallax`, opacity 0.10 |
| **Wave** | Code Module | Class: `dw-wave-flow`, height 160px, opacity 0.3 |
| **Content** | Group Module | Centered, z-index 3 |

### CTA Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `Let's Talk About Your Factory` |
| **Subtitle** | Text Module | `Every factory is different. Let us understand yours.` |
| **Primary Button** | Button Module | `Get in Touch` → `/demo.html` — Primary blue bg, white text |
| **Secondary Button** | Button Module | `View Products` → `/products.html` — Ghost style, white border |

> **Important:** CTA says "Get in Touch" — never "Request Demo" or "Book a Demo" per business constraints.

---

## Animation Strategy

| Animation | Divi 5 Implementation |
|-----------|----------------------|
| **Hero entrance** | Slide-up 0.8s ease-out on Section load |
| **Badge pulse dot** | CSS `@keyframes pulse-dot 2s ease-in-out infinite` via Code Module |
| **Grain texture** | `animation: grain 8s steps(10) infinite` via Code Module |
| **Context stat cards** | Scroll fade-in, distance 16px, duration 200ms, threshold 0.2, stagger 0.07s |
| **Industry cards** | Scroll fade-in from translateY(40px), threshold 0.15, stagger 0.07s |
| **Challenge cards** | Scroll fade-in, distance 16px, duration 200ms, threshold 0.15, stagger 0.07s |
| **Challenge card hover** | Icon background gradient swap + SVG color change, 0.3s ease |
| **Industry card hover** | translateY(-8px), shadow expansion, arrow gap increase, 0.5s cubic-bezier |
| **prefers-reduced-motion** | All animations and transitions disabled via `@media (prefers-reduced-motion: reduce)` |

---

## Validation Checklist

- [ ] Skip-to-content link present: `#industries-content`
- [ ] `<main id="industries-content">` landmark present
- [ ] All sections use semantic `<section>` tags
- [ ] `prefers-reduced-motion` media query disables all animations
- [ ] No low-contrast text (all text on dark backgrounds >= 0.75 opacity)
- [ ] All SVG icons have `aria-hidden="true"`
- [ ] Industry cards are clickable `<a>` elements (full card as link)
- [ ] H1 is unique on page; H2-H3 hierarchy is correct
- [ ] All links point to pages that exist
- [ ] "44 years" uses dynamic year calculation (`dw-years` class)
- [ ] CTA says "Get in Touch" (never "Request Demo")
- [ ] Structured data: CollectionPage + BreadcrumbList schemas present
- [ ] Design tokens used for all colors (no hardcoded hex values in modules)
- [ ] Stats use Number Counter where appropriate
- [ ] Blueprint SVG backgrounds are decorative (`aria-hidden="true"`)
