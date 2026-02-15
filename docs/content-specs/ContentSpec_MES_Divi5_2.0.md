# Content Spec: MES Product Page — Divi 5 Build (2.0)

**Batch:** Batch 2
**PRD Reference:** Section 3.2 — MES: sMES & SFT
**Playbook Reference:** Section 3.2 (Leaf Page Arc — Track A), Section 2.2 (Track A voice), Section 4.1 (Factory Owner Objections), Section 6 (CTA hierarchy)
**Status:** v2.0 — Reverse-engineered from HTML build + mapped to Divi 5 modules
**Last Updated:** February 14, 2026
**Platform:** WordPress + Divi 5

---

## Page Overview

| Element | Specification |
|---------|---------------|
| **Audience** | Track A — Factory operators (production managers, plant managers, operations directors) |
| **Objective** | "Stop guessing, start seeing" — sell real-time shop floor visibility across three product tiers |
| **URL** | digiwin.co.th/products/mes.html |
| **Emotional Arc** | Leaf Page Arc Track A (Playbook 3.2) — Pain Validation → Relief/Solution → Proof → Gentle Nudge |
| **Page Structure** | 11 sections, ~1600 lines in static build |
| **Key Differentiators** | 3-tier product comparison (MES / SFT / AIoT Cloud), any-ERP compatibility, operator workflow, named reports |

---

## Divi 5 Capabilities Leveraged

| Divi 5 Feature | Where Used | Why |
|----------------|-----------|-----|
| **CSS Grid Layout** | Hero 2-col, Before/After, 3-tier comparison, Capabilities 4-col, Reports 2-col, Results 3-col | Native responsive grids without custom CSS |
| **Group Module** | Product cards, capability cards, result cards, report columns, FAQ items | Card-style containers with shared styling |
| **Nested Modules** | Product cards (badge + title + features + best-for), report columns (badge + list) | Rich internal layouts inside Groups |
| **Design Variables** | All colors, fonts, spacing | Global tokens referenced everywhere — zero hardcoded values |
| **Interactions System** | Card hovers, scroll fade-ins, stat counters, workflow step reveals | Replaces custom JS entirely |
| **Number Counter Module** | Hero stats, Results section metrics | Animated count-up on scroll |
| **Icon List Module** | Product feature lists, capability cards | Consistent checkmark/icon lists |
| **Accordion Module** | FAQ section | Native `<details>`/`<summary>` behavior with nested modules |
| **Blurb Module** | Capability cards, integration nodes | Icon + title + description pattern |
| **Semantic Elements** | Every section | `<section>`, `<main>`, `<article>` for SEO and accessibility |
| **Customizable Breakpoints** | All sections | 7 breakpoints replace manual 1024/768/640 media queries |
| **Code Module** | Hero dashboard mockup, capabilities SVG scene, workflow strip, Super D/particle overlays | Complex visuals that need raw HTML/SVG |
| **Flexbox Layout** | Hero CTAs, hero stats row, workflow steps, integration visual, CTA buttons | Alignment and wrapping controls |

---

## Design Variables (Global — Reference from Homepage Spec)

These are defined once in Divi 5's Design Variables panel. This page inherits all globals from the Homepage spec. Page-specific additions noted below.

### Colors (Global — already defined)
| Variable Name | Value | Usage on This Page |
|--------------|-------|-------------------|
| `--dw-primary-blue` | #00AFF0 | CTAs, badges, stat numbers, workflow circles, report icons |
| `--dw-dark-navy` | #000864 | Hero bg, results section bg, product card headers, section titles |
| `--dw-navy-mid` | #001080 | Hero gradient end |
| `--dw-royal` | #003CC8 | SFT badge gradient, integration node icon gradient |
| `--dw-cyan` | #00E6FF | AIoT Cloud badge gradient |
| `--dw-light-gray` | #F5F7FA | Alternating section backgrounds |
| `--dw-text-dark` | #333333 | Body text in light sections |
| `--dw-text-light` | #64748b / #5b6b80 | Secondary text, descriptions |
| `--dw-white` | #FFFFFF | Card backgrounds, light text |

### Page-Specific Color Notes
| Color | Value | Usage |
|-------|-------|-------|
| Before Red | #dc2626 | Before column label, border #fee2e2 |
| After Green | #16a34a | After column label, border #dcfce7 |
| Check Green | #22c55e | Feature list checkmarks |
| Mockup Green | #047857 | OEE stat in dashboard mockup |
| Mockup Yellow | #f59e0b | Alert stat in dashboard mockup |

### Fonts (Global — already defined)
| Variable Name | Value | Usage on This Page |
|--------------|-------|-------------------|
| `--dw-heading` | Noto Sans, sans-serif | All H1-H3 headings |
| `--dw-body` | Noto Sans, sans-serif | Body copy, descriptions, feature lists |
| `--dw-mono` | JetBrains Mono, monospace | Hero badge, stat labels, results labels, report badges |

### Spacing (Global — already defined)
| Variable Name | Value | Usage |
|--------------|-------|-------|
| `--dw-section-pad` | 80px top/bottom | Standard section padding (this page uses 80px, not 100px) |
| `--dw-container-max` | 1200px | Max content width (900px for integration section) |
| `--dw-card-radius` | 20px | Card border radius |
| `--dw-card-gap` | 24px | Grid gap between cards |

---

## Section 1: Hero — Split Layout with Dashboard Mockup

**Purpose:** Production pain headline with credibility stats and a visual mockup that makes MES tangible.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(135deg, #1a2d3d 0%, var(--dw-dark-navy) 50%, var(--dw-navy-mid) 100%)`, padding: 140px top, 100px bottom, `overflow: hidden`, `position: relative` |
| **Grid Pattern Overlay** | Code Module | SVG grid pattern, `opacity: 0.5`, absolute positioned, covers entire section |
| **Particle Wave** | Code Module | `.dw-d-bg.dw-d-bg--bottom.dw-d-bg--particle.dw-d-parallax`, `opacity: 0.15` |
| **Content Row** | Row (CSS Grid) | `grid-template-columns: 1fr 1fr`, gap: 60px, align-items: center, `z-index: 1` |
| **Left Column: Content** | Column | `max-width: 560px`, text-align: left |
| **Right Column: Mockup** | Column | Contains dashboard mockup (Code Module) |

### Left Column: Hero Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Badge** | Text Module | `Manufacturing Execution System` — JetBrains Mono, 11px, uppercase, 0.1em spacing, color: #7fc4fd, bg: `rgba(0, 175, 240, 0.15)`, border: `1px solid rgba(0, 175, 240, 0.3)`, padding: 8px 20px, radius: 50px |
| **Headline** | Text Module (H1) | `Stop Guessing. Start Seeing.` — Noto Sans 700, 48px, white, line-height: 1.15 |
| **Subtitle** | Text Module | `Real-time visibility into every workstation, every work order, every minute. Know exactly what's happening on your shop floor—as it happens.` — Noto Sans, 20px, `rgba(255, 255, 255, 0.85)`, max-width: 700px, line-height: 1.6 |
| **CTA Row** | Group Module (Flexbox) | gap: 16px, flex-wrap: wrap |
| **Primary CTA** | Button Module | `Let's Talk` → `/demo.html` — `.btn-white` style (white bg, navy text) |
| **Secondary CTA** | Button Module | `Find Your Fit` → `#compare` — `.btn-outline-white` style (transparent bg, white border) |
| **Stats Row** | Group Module (Flexbox) | gap: 48px, margin-top: 40px, padding-top: 32px, border-top: `1px solid rgba(255, 255, 255, 0.1)` |

#### Hero Stats

| Stat | Value | Label | Module |
|------|-------|-------|--------|
| 1 | `44` | Years in Mfg | Number Counter (class `dw-years` for dynamic calculation) |
| 2 | `50K+` | Factories | Text Module (not a pure number) |
| 3 | `100+` | Thai Sites | Text Module |

Number styling: Noto Sans 800, 32px, `--dw-primary-blue`. Label styling: JetBrains Mono, 10px, `rgba(255, 255, 255, 0.75)`, uppercase, 0.1em spacing.

> **Data Source:** "44 years" = 2026 - 1982 (verified). "50K+" = cumulative clients (verified in `data-crosscheck-findings.md`). "100+" = Thai implementations (soft number, consistent).

### Right Column: Dashboard Mockup

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Mockup Container** | Code Module | Full HTML/CSS for the MES dashboard mockup. White card with frosted glass effect: `bg: rgba(255, 255, 255, 0.03)`, border: `1px solid rgba(255, 255, 255, 0.1)`, radius: 16px, padding: 20px, shadow: `0 40px 80px rgba(0, 0, 0, 0.3)` |

#### Mockup Content

The dashboard mockup contains:
- **Header dots**: 3 traffic light dots (red, yellow, green)
- **Status bar** (3 items):
  - OEE: `87%` (green #047857)
  - Units Today: `1,247` (blue)
  - Alerts: `3` (yellow #f59e0b)
- **Timeline bar chart**: 7 bars at varying heights, one marked "active"

Status values use Noto Sans 700, 20px. Labels use JetBrains Mono, 9px, `rgba(255, 255, 255, 0.75)`.

> **Divi 5 Note:** This is best implemented as a Code Module containing the complete HTML/CSS mockup. It is a visual decoration, not functional data — keep it as static HTML.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | 2-column grid, mockup visible |
| **Tablet (<=1024px)** | 1 column, centered text, mockup hidden (`display: none`), stats row centered |
| **Mobile (<=640px)** | Padding: 120px top, 60px bottom. H1: 32px. Stats stack if needed. |

---

## Section 2: GEO Definition Block

**Purpose:** GEO (Generative Engine Optimization) — provide a clear, AI-readable definition of MES and DigiWin's 3-tier offering for LLM scraping and featured snippets.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: 40px top, 0 bottom, text-align: center |
| **Content Wrapper** | Row | Max-width: 800px, centered |
| **Definition Title** | Text Module (H2) | `What is MES (Manufacturing Execution System)?` — Noto Sans 700, 22px, `--dw-dark-navy` |
| **Definition Para 1** | Text Module | General MES definition — Noto Sans, 17px, #333, line-height: 1.7 |
| **Definition Para 2** | Text Module | DigiWin-specific 3-tier explanation — Noto Sans, 17px, #333, line-height: 1.7. Bold: "DigiWin MES", "MES", "SFT", "AIoT Cloud" |

### Exact Content

**Paragraph 1:**
> A Manufacturing Execution System (MES) is software that monitors, tracks, and controls production on the factory floor in real time, bridging the gap between ERP planning and shop floor execution. It gives manufacturers instant visibility into what is happening at every workstation and work order — replacing paper logs and delayed reports with live data.

**Paragraph 2:**
> **DigiWin MES** provides this real-time visibility for factories in Thailand. Through three tiers — **MES** for full production execution, **SFT** (Shop Floor Tracking) for mid-tier tracking, and **AIoT Cloud** for entry-level monitoring — it tracks work orders, calculates OEE in real time, captures quality data at every station, and maintains complete lot-level traceability. Start anywhere and upgrade as your factory matures.

> **GEO Note:** This block exists purely for search engines and AI models. It provides the semantic definition that triggers featured snippets for queries like "what is MES" or "DigiWin MES vs SFT". No visual decoration needed.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **All breakpoints** | Single column, centered, max-width: 800px. No layout changes needed. |

---

## Section 3: Before/After Transformation

**Purpose:** Visual impact — contrast the chaos of no MES vs. clarity with MES. Emotional validation for production managers.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: 80px top/bottom |
| **Section Header** | Group Module | Centered: title + subtitle |
| **Grid** | Row (CSS Grid) | `grid-template-columns: 1fr 60px 1fr`, gap: 24px, align-items: start |
| **Before Column** | Group Module | White bg, radius: 20px, border: `2px solid #fee2e2`, shadow: `0 4px 24px rgba(0,0,0,0.06)` |
| **Arrow Divider** | Text Module | `→` character, 32px, color: #0369a1, centered, padding-top: 150px |
| **After Column** | Group Module | White bg, radius: 20px, border: `2px solid #dcfce7`, shadow: `0 4px 24px rgba(0,0,0,0.06)` |

### Section Header

| Element | Content |
|---------|---------|
| **Title** | `The Transformation` — standard `.section-title` styling |
| **Subtitle** | `From shop floor chaos to real-time clarity` — standard `.section-subtitle` styling |

### Before Column

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Header Bar** | Group Module | Background: `linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)`, padding: 20px 24px, text-align: center |
| **Header Label** | Text Module | `BEFORE MES` — Noto Sans 700, 14px, #dc2626, uppercase, 1px spacing |
| **Items Container** | Group Module | Padding: 24px |
| **Each Item** | Group Module | Padding: 16px 0, border-bottom: `1px solid #f0f4f8` (last: none) |

#### Before Items

| # | Title | Description |
|---|-------|-------------|
| 1 | "Where's that order?" | Walk the floor, ask around, hope someone knows. Hours to find answers. |
| 2 | Yesterday's data | Production reports arrive after problems already happened. Always reacting. |
| 3 | Traceability panic | Quality issue? Days of paper-digging to find which batch, which lot, which operator. |
| 4 | OEE guesswork | Downtime tracking on whiteboards. No one trusts the numbers. |

Item title: Noto Sans 600, 16px, `--dw-dark-navy`. Description: Noto Sans, 15px, #5b6b80, line-height: 1.5.

### After Column

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Header Bar** | Group Module | Background: `linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)`, padding: 20px 24px, text-align: center |
| **Header Label** | Text Module | `WITH DIGIWIN MES` — Noto Sans 700, 14px, #16a34a, uppercase, 1px spacing |
| **Items** | Same structure as Before column |

#### After Items

| # | Title | Description |
|---|-------|-------------|
| 1 | Order location in one click | Which station, what operation, estimated completion — instant answers. |
| 2 | Real-time dashboards | Live production rates, quality alerts, downtime notifications. Prevent problems. |
| 3 | Complete traceability | Full genealogy from receiving to shipping. One click shows everything. |
| 4 | Accurate OEE | Automatic calculation from machine data. Real numbers you can trust. |

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | 3-column grid (Before | Arrow | After) |
| **Tablet (<=1024px)** | 1 column, stacked. Arrow rotates 90deg. Max-width: 500px, centered. |
| **Mobile (<=640px)** | Same as tablet |

---

## Section 4: Three-Tier Product Comparison

**Purpose:** Clear segmentation of MES / SFT / AIoT Cloud with selection guidance. Anchor target for hero "Find Your Fit" CTA.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section (id: `compare`) | Background: `--dw-light-gray` (#F5F7FA), padding: 80px top/bottom |
| **Section Header** | Group Module | Centered: title + subtitle |
| **Product Grid** | Row (CSS Grid) | `grid-template-columns: repeat(3, 1fr)`, gap: 24px |
| **Each Product Card** | Group Module | White bg, radius: 20px, border: `2px solid #e8eef3`, hover: border `--dw-primary-blue` + shadow `0 12px 40px rgba(0, 175, 240, 0.12)`, transition: 0.3s ease |
| **Selection Guide** | Row (CSS Grid) | `grid-template-columns: repeat(3, 1fr)`, gap: 24px, margin-top: 48px, padding-top: 48px, border-top: `1px solid #e2e8f0` |
| **Any-ERP Callout** | Group Module (Flexbox) | bg: #f0f9ff, border: `1px solid --dw-primary-blue`, radius: 12px, padding: 32px, gap: 24px, margin-top: 48px |
| **Workflow Strip** | Group Module | margin-top: 48px, padding-top: 48px, border-top: `1px solid #e2e8f0` |

### Section Header

| Element | Content |
|---------|---------|
| **Title** | `Three Paths to Shop Floor Visibility` |
| **Subtitle** | `Choose the level that matches your needs and budget. Start anywhere — upgrade anytime.` |

### Product Card Structure (repeats 3x)

Each Group Module contains:

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Card Header** | Group Module | Background: `linear-gradient(135deg, var(--dw-dark-navy) 0%, #1a2d3d 100%)`, padding: 32px 32px 24px, with 4px blue gradient bottom bar (`::after` pseudo or Divider) |
| **Badge** | Text Module | 12px, 600 weight, white, uppercase, pill shape (radius 50px), padding: 4px 12px |
| **Product Title** | Text Module (H3) | White, Noto Sans 700, 28px |
| **Tagline** | Text Module | `rgba(255, 255, 255, 0.75)`, 15px |
| **Card Body** | Group Module | Padding: 28px |
| **Description** | Text Module | 15px, `--dw-dark-navy`, line-height: 1.7 |
| **Feature List** | Icon List Module | Green checkmarks (#22c55e), 14px, `--dw-dark-navy`, items separated by `1px solid #f0f4f8` |
| **Best For** | Group Module | bg: #f8fafc, radius: 12px, padding: 16px 20px, margin-top: 20px |
| **Best For Label** | Text Module | `BEST FOR` — 13px, 600 weight, #0369a1, uppercase, 0.5px spacing |
| **Best For Text** | Text Module | 14px, #5b6b80, line-height: 1.5 |

#### Card 1: MES (Full)

| Element | Content |
|---------|---------|
| **Badge** | `Full MES` — bg: `linear-gradient(135deg, var(--dw-dark-navy), #3d5a73)` |
| **Title** | `MES` |
| **Tagline** | `Complete manufacturing execution with routing enforcement` |
| **Description** | `Full MES capability including work order management, routing enforcement, quality data collection, and real-time performance dashboards.` |
| **Features** | Work order dispatch and real-time tracking · Routing enforcement with operation validation · Quality data collection with SPC integration · Real-time OEE calculation per machine/line · Full lot and serial traceability · Mobile workstation interface |
| **Best For** | `Complex manufacturing with multiple operations, automotive/electronics with traceability requirements, factories with government grants or existing ERP` |

#### Card 2: SFT (Mid-Tier)

| Element | Content |
|---------|---------|
| **Badge** | `Mid-Tier` — bg: `linear-gradient(135deg, var(--dw-primary-blue), var(--dw-royal))` |
| **Title** | `SFT` |
| **Tagline** | `Shop floor tracking without MES complexity` |
| **Description** | `Lightweight tracking for factories that want visibility without full MES complexity. Barcode-based, fast to implement, easy to use.` |
| **Features** | Production quantity reporting · Labor time tracking by operation · Downtime reason recording · Basic lot traceability · Simple barcode scanning interface · Rapid deployment (days, not months) |
| **Best For** | `Factories already using SCADA, fast-growing companies, rapid visibility improvement without disruption` |

> **Naming Note:** SFT = Shop Floor Tracking. NOT "Smart Factory Transparency". Use "SFT" consistently throughout.

#### Card 3: AIoT Cloud (Entry Level)

| Element | Content |
|---------|---------|
| **Badge** | `Entry Level` — bg: `linear-gradient(135deg, var(--dw-cyan), var(--dw-primary-blue))` |
| **Title** | `AIoT Cloud` |
| **Tagline** | `Production visibility on a subscription` |
| **Description** | `Cloud-based production monitoring with mobile apps. See equipment data and production status with minimal IT infrastructure.` |
| **Features** | Real-time equipment monitoring · Production status dashboard · Mobile app access · Subscription pricing (no upfront) · Cloud deployment (no servers) |
| **Best For** | `Low initial investment, simple equipment monitoring, factories testing digitalization before committing` |

### Selection Guide (Below Product Cards)

Three guide items in a row:

| # | Arrow Icon | Product | Description |
|---|-----------|---------|-------------|
| 1 | &#9650; | `AIoT Cloud` | Starting your digitalization journey. Small factories, quick start, subscription pricing. |
| 2 | &#9650;&#9650; | `SFT` | Need production transparency. Mid-size operations, structured tracking, fast deployment. |
| 3 | &#9650;&#9650;&#9650; | `MES` | Full manufacturing execution. Complex operations, multi-plant, complete traceability. |

Each item: White bg, radius: 16px, border: `1px solid #e8eef3`, padding: 24px 20px, text-align: center. Product name: Noto Sans 700, 18px, `--dw-dark-navy`. Description: 14px, #5b6b80.

### Any-ERP Compatibility Callout

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Icon** | Code Module or Image | SVG connector/plug icon in 48x48 container, bg: `rgba(0, 175, 240, 0.15)` → `rgba(0, 175, 240, 0.05)` gradient, radius: 12px |
| **Title** | Text Module (H3) | `Already Have an ERP?` — Noto Sans 700, 20px, `--dw-dark-navy` |
| **Body** | Text Module | `MES connects to any ERP system through standard web services. See your shop floor clearly without changing your existing ERP. When you're ready to upgrade, we're here.` — 16px, #5b6b80, line-height: 1.7 |

> **Strategy Note:** This supports the "Reverse Cut" strategy — enter with MES alongside any existing ERP. Do NOT name specific competitor ERPs.

### Operator Workflow Strip

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Title** | Text Module (H3) | `A Day on the MES-Connected Shop Floor` — Noto Sans 700, 20px, `--dw-dark-navy`, centered |
| **Steps Container** | Code Module or Group Module (Flexbox) | Horizontal flow with scroll on mobile. Flex: row, align-items: center, overflow-x: auto, `-webkit-overflow-scrolling: touch` |

#### Workflow Steps (9 total)

| Step | Label |
|------|-------|
| 1 | Clock In |
| 2 | Material Check |
| 3 | First QC |
| 4 | Start Machine |
| 5 | Log Production |
| 6 | Mid-Shift QC |
| 7 | Material Request |
| 8 | End Count |
| 9 | Clock Out |

Each step: 44px circle (bg: `--dw-primary-blue`, white text, Noto Sans 700, 14px) + label below (Noto Sans 600, 12px, `--dw-dark-navy`, nowrap). Connected by 32px horizontal lines (2px, `--dw-primary-blue`).

**Caption:** *"Every step captured. Every scan recorded. Every minute accounted for."* — Noto Sans, 15px italic, #5b6b80, centered.

> **Divi 5 Note:** The workflow strip with connectors is best implemented as a Code Module for pixel-perfect control of circle + connector + label alignment. Alternatively, use a Row with many small Columns, but that creates excessive Divi elements.

### Responsive Breakpoints (Entire Section 4)

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | 3-column product grid, 3-column selection guide, horizontal workflow |
| **Tablet (<=1024px)** | Product grid: 1 column (max-width: 600px, centered). Selection guide: 1 column (max-width: 400px). ERP callout: flex-direction column, text-align center. Workflow: horizontal scroll. |
| **Mobile (<=640px)** | Same as tablet. Workflow strip scrollable. |

---

## Section 5: Capabilities Grid

**Purpose:** Show the 8 real-time visibility capabilities MES provides. Reinforces "what you can see right now."

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: 80px top/bottom, `overflow: hidden`, `position: relative` |
| **Background Scene** | Code Module | Large SVG illustration of a production line (workstations WS-01 through QC to PACK, with scan nodes, data lines, work order tracking bar). Absolute positioned, `z-index: 0`. All elements at very low opacity (0.06-0.15) — decorative only. |
| **Content Wrapper** | Row | Max-width: 1200px, `z-index: 2`, `position: relative` |
| **Section Header** | Group Module | Centered: title + subtitle |
| **Capabilities Grid** | Row (CSS Grid) | Uses the existing `.capabilities-grid` pattern from `styles.css` (assumed 4-column or 2x4 layout) |
| **Each Capability** | Blurb Module or Group Module | Icon + title + short description |

### Section Header

| Element | Content |
|---------|---------|
| **Title** | `What You Can See — Right Now` |
| **Subtitle** | `Real-time visibility into every aspect of production` |

### Capability Cards (8 total)

| # | Icon (SVG) | Title | Description |
|---|-----------|-------|-------------|
| 1 | Map pin | Order Location | Which workstation? What operation? How long until complete? |
| 2 | Line chart | Production Rate | Units per hour vs. target. By line, product, shift. |
| 3 | Alert triangle | Quality Issues | Defects as they happen. By type, station, operator. |
| 4 | Clock | Downtime | What's stopped? Why? For how long? Trends over time. |
| 5 | People/team | Labor Efficiency | Actual vs. standard time. By operator, by operation. |
| 6 | Box/cube | Material Usage | What's being consumed? Variance from standard? |
| 7 | Grid/table | OEE Metrics | Availability, performance, quality — calculated automatically. |
| 8 | Search/magnifier | Traceability | Full genealogy. Lot, serial, components, operators. |

Card styling: White bg, radius: 16px, border: `1px solid #e8eef3`, padding: 24px. Icon: SVG inside 48px circle/square container. Title: Noto Sans 600, 16px, `--dw-dark-navy`. Description: Noto Sans, 14px, #5b6b80.

> **Divi 5 Module Choice:** Use **Blurb Module** if the built-in icon + title + body layout fits. Use **Group Module** (Image/Code + Text + Text) if more control is needed over icon styling.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | 4-column grid (2 rows of 4) |
| **Tablet (<=1024px)** | 2-column grid |
| **Mobile (<=640px)** | 1-column grid |

---

## Section 6: Integration Flow

**Purpose:** Show MES as the bridge between planning (ERP) and execution (floor). Cross-sell to other product pages.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(180deg, var(--dw-light-gray) 0%, #ffffff 100%)`, padding: 80px top/bottom |
| **Content Wrapper** | Row | Max-width: 900px, centered, text-align: center |
| **Section Header** | Group Module | Centered: title + subtitle |
| **Integration Visual** | Group Module (Flexbox) or Code Module | Horizontal flow of integration nodes with arrows. Flex: row, center, gap: 0, wrap. Margin: 48px 0. |
| **Integration Message** | Group Module | White bg, radius: 16px, padding: 32px 40px, shadow: `0 4px 24px rgba(0,0,0,0.06)`, border: `1px solid #e8eef3`, max-width: 700px, centered |
| **Integration Links** | Group Module (Flexbox) | gap: 16px, center, wrap, margin-top: 32px |

### Section Header

| Element | Content |
|---------|---------|
| **Title** | `Connected to Everything` |
| **Subtitle** | `MES is the bridge between planning and execution` |

### Integration Visual — 4 Nodes

| Node | Name | Active? | Icon |
|------|------|---------|------|
| 1 | ERP | No | Grid/table SVG |
| 2 | MES | **Yes** (highlighted) | Factory/conveyor SVG |
| 3 | WMS | No | Box/package SVG |
| 4 | AIoT | No | Gear/settings SVG |

Each node: White bg, border: `2px solid #e8eef3`, radius: 16px, padding: 20px 28px, text-align: center, hover: blue border. Active node: blue border, bg: `linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)`, shadow: `0 8px 24px rgba(0, 175, 240, 0.15)`.

Icon container: 48px square, bg: `linear-gradient(135deg, var(--dw-primary-blue), var(--dw-royal))`, radius: 12px, white SVG inside.

Arrows between nodes: `↔` character, 20px, #0369a1, padding: 0 12px.

### Integration Message

> Work orders flow from ERP to MES automatically. Material consumption updates inventory in real time. Machine data from AIoT feeds OEE calculations. **One integrated system. Zero manual reconciliation.**

Noto Sans, 18px, `--dw-dark-navy`, line-height: 1.8.

### Integration Links

| Link | Target |
|------|--------|
| `Explore ERP →` | `/products/erp.html` |
| `Explore WMS →` | `/products/wms.html` |
| `Explore AIoT →` | `/products/aiot.html` |

Each link: White bg, border: `1px solid #e8eef3`, radius: 8px, padding: 12px 24px, color: #0369a1, Noto Sans 600, 14px. Hover: blue border, bg: #f0f7ff.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | Horizontal flow (ERP ↔ MES ↔ WMS ↔ AIoT) |
| **Tablet (<=1024px)** | Vertical flow (nodes stacked). Arrows rotate 90deg, padding: 8px 0. |
| **Mobile (<=640px)** | Same as tablet |

---

## Section 7: Results / Measured Impact

**Purpose:** Proof of outcomes with specific, sourced metrics. Separated by product tier (MES vs. SFT) to reinforce segmentation.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(135deg, var(--dw-dark-navy) 0%, #1a2d3d 100%)`, padding: 80px top/bottom, `data-particles="bold"` |
| **Content Wrapper** | Row | Max-width: 1100px, centered, `z-index: 2` |
| **Section Header** | Group Module | Centered |
| **MES Row Label** | Text Module | `MES RESULTS` — JetBrains Mono, 11px, `rgba(255, 255, 255, 0.75)`, uppercase, 0.1em spacing |
| **MES Stats Grid** | Row (CSS Grid) | `grid-template-columns: repeat(3, 1fr)`, gap: 24px |
| **SFT Row Label** | Text Module | `SFT RESULTS` — same styling |
| **SFT Stats Grid** | Row (CSS Grid) | Same as MES grid |
| **Shared Result** | Group Module | Centered, inline-block |
| **Attribution** | Text Module | Centered, 13px, `rgba(255, 255, 255, 0.75)` |

### Section Header

| Element | Content |
|---------|---------|
| **Label** | `Measured Impact` — JetBrains Mono, 11px, `--dw-primary-blue`, uppercase, 0.15em spacing |
| **Title** | `What Our Customers Achieve` — Noto Sans 700, 36px, white |

### MES Results (3 cards)

| # | Value | Label | Source |
|---|-------|-------|--------|
| 1 | `-45%` | Production Cycle Time | Industry statistics (official DigiWin site) |
| 2 | `-70%` | Quality Failure Rate | Industry statistics (official DigiWin site) |
| 3 | `+26%` | Operational Efficiency | Industry statistics (official DigiWin site) |

### SFT Results (3 cards)

| # | Value | Label | Source |
|---|-------|-------|--------|
| 1 | `92%` | Production Transparency | Typical results (official DigiWin site) |
| 2 | `86%` | On-Time Delivery Rate | Typical results (official DigiWin site) |
| 3 | `2-4` | Week Implementation | DigiWin verified |

### Shared Result (1 card)

| Value | Label |
|-------|-------|
| `76%` | Customer Satisfaction Improvement |

### Result Card Styling

Each card: bg: `rgba(255, 255, 255, 0.05)`, border: `1px solid rgba(255, 255, 255, 0.1)`, radius: 16px, padding: 32px 24px, text-align: center.

Value: Noto Sans 800, 42px, `--dw-primary-blue`, line-height: 1. Use **Number Counter** modules for animated count-up.

Label: Noto Sans, 15px, `rgba(255, 255, 255, 0.8)`, margin-top: 12px.

### Attribution

> Based on DigiWin implementation data across 50,000+ manufacturing clients

Noto Sans, 13px, `rgba(255, 255, 255, 0.75)`, centered, margin-top: 16px.

> **Data Source Note:** MES stats are cited as "industry statistics" on the official DigiWin site. SFT stats have no explicit attribution — we use "typical results" qualifier. See `data-crosscheck-findings.md` for full verification.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | 3-column grids |
| **Tablet (<=1024px)** | 3-column grids maintained (cards narrow gracefully) |
| **Mobile (<=640px)** | 1-column grid, max-width: 280px, centered |

---

## Section 8: Named Reports & Dashboards

**Purpose:** Make the product tangible by listing specific reports. Buyers want to know "what do I get out of the box?"

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, padding: 80px top/bottom |
| **Content Wrapper** | Row | Max-width: 1100px, centered |
| **Section Header** | Group Module | Centered: title + subtitle |
| **Reports Grid** | Row (CSS Grid) | `grid-template-columns: 1fr 1fr`, gap: 32px |
| **Each Column** | Group Module | bg: `--dw-light-gray`, radius: 16px, padding: 32px, border: `1px solid #e8eef3` |

### Section Header

| Element | Content |
|---------|---------|
| **Title** | `Built-In Reports & Dashboards` |
| **Subtitle** | `Pre-configured analytics ready from day one — no custom development needed` |

### MES Reports Column

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Header** | Group Module (Flexbox) | Badge + count, gap: 12px |
| **Badge** | Text Module | `MES` — JetBrains Mono, 11px, 500 weight, uppercase, 0.1em spacing, white on `--dw-dark-navy`, pill shape |
| **Count** | Text Module | `10 Reports` — Noto Sans, 14px, #5b6b80 |
| **List** | Icon List Module or Code Module (ordered list) | 10 items with blue square icons (&#9632;) |

#### MES Reports (10)

1. Work Order Progress
2. Equipment Utilization (OEE)
3. Quality Inspection
4. Material Consumption
5. Shift Performance
6. Downtime Analysis
7. Yield Rate
8. Cycle Time
9. Batch Traceability
10. Operator Productivity

### SFT Dashboards Column

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Badge** | Text Module | `SFT` — white on `linear-gradient(135deg, var(--dw-primary-blue), var(--dw-royal))`, pill shape |
| **Count** | Text Module | `6 Dashboards` |
| **List** | Icon List Module or Code Module | 6 items |

#### SFT Dashboards (6)

1. Production Status Board
2. Daily Output Summary
3. Machine Status Monitor
4. Order Completion
5. WIP Tracking
6. Delivery Schedule

List item styling: Noto Sans, 15px, `--dw-dark-navy`, padding: 10px 0, border-bottom: `1px solid #e2e8f0` (last: none). Icon: `--dw-primary-blue`, 14px.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | 2-column grid side by side |
| **Tablet (<=1024px)** | 1 column, stacked. Max-width: 500px, centered. |
| **Mobile (<=640px)** | Same as tablet |

---

## Section 9: FAQ (Accordion)

**Purpose:** Address common objections and questions. Serves double duty as SEO content (FAQ structured data already in `<head>`).

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #f8fafc, padding: 60px top/bottom |
| **Content Wrapper** | Row | Max-width: 800px, centered |
| **Title** | Text Module (H2) | `Frequently Asked Questions` — Noto Sans 700, 28px, `--dw-dark-navy`, centered |
| **Accordion** | Accordion Module | 5 items, closed by default, border: `1px solid #e5e7eb`, radius: 8px, gap: 12px between items |

### FAQ Items

| # | Question | Answer |
|---|----------|--------|
| 1 | What is a Manufacturing Execution System (MES)? | A Manufacturing Execution System (MES) is software that tracks, monitors, and controls production on the factory floor in real time. It bridges the gap between ERP planning and actual shop floor execution — showing you what's happening on every machine and workstation right now, not what happened yesterday. |
| 2 | What is the difference between MES, SFT, and AIoT Cloud? | MES is DigiWin's full-featured manufacturing execution system for comprehensive production management — work order tracking, quality control, material traceability, and OEE analytics. SFT (Shop Floor Tracking) is a mid-tier option deployed in 2-4 weeks, focusing on production reporting and machine status monitoring. AIoT Cloud is the entry-level tier — cloud-based monitoring with mobile apps and subscription pricing. Many factories start with AIoT Cloud or SFT and expand to full MES as they mature. |
| 3 | Do I need ERP before implementing MES? | No. DigiWin MES connects to any existing ERP through standard web services. Many manufacturers start with MES first to get immediate shop floor visibility, then add or upgrade ERP later. This approach lets you see ROI faster than a full ERP replacement. |
| 4 | What results can I expect with DigiWin MES? | Based on implementation data across 50,000+ manufacturing clients, MES customers report a 45% reduction in production cycle time, 70% reduction in quality failures, and 26% improvement in operational efficiency. SFT users typically achieve 92% production transparency and 86% on-time delivery rate. Results vary by factory, but the visibility alone typically drives immediate behavioral improvements on the shop floor. |
| 5 | How does DigiWin MES connect to machines on the shop floor? | DigiWin MES connects to shop floor equipment through DigiWin's AIoT platform, which supports 50+ industrial protocols including OPC-UA, Modbus, MQTT, and direct CNC/PLC connections. For machines without digital interfaces, barcode scanning and tablet-based operator input provide the data bridge. |

Accordion styling: Question — Noto Sans 600, 17px, `--dw-dark-navy`, padding: 16px 20px, white bg. Answer — Noto Sans, 15px, #333, line-height: 1.7, padding: 0 20px 16px. Toggle indicator: `+` character, 20px, #0369a1.

> **Divi 5 Note:** The Accordion Module in Divi 5 supports nested modules, meaning each answer panel can contain rich layouts if needed. For this page, plain text answers suffice.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **All breakpoints** | Single column, max-width: 800px. No layout changes needed. |

---

## Section 10: Final CTA Banner

**Purpose:** Convert interested visitors. Welcoming tone — "Let's talk" not "Book a demo."

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Uses `.product-detail-cta` pattern. Background: dark navy gradient, `position: relative`, `overflow: hidden` |
| **Super D Background** | Code Module | `.dw-d-bg.dw-d-bg--bold.dw-d-glow` — large D mark bleeding off edge, low opacity |
| **Particle Wave** | Code Module | `.dw-wave-flow`, height: 200px, opacity: 0.38, `z-index: 1` |
| **Content Wrapper** | Group Module | Max-width: 800px, centered, `z-index: 3`, text-align: center |
| **Title** | Text Module (H2) | `Ready to See Your Shop Floor Clearly?` — `.product-detail-cta-title` styling (Noto Sans 700, ~40px, white) |
| **Subtitle** | Text Module | `Fill out the form and our team will reach out to discuss your specific production visibility challenges.` — `.product-detail-cta-subtitle` styling (Noto Sans, ~18px, `rgba(255,255,255,0.85)`) |
| **Button Row** | Group Module (Flexbox) | Centered, gap: 16px, flex-wrap: wrap |
| **Primary CTA** | Button Module | `Get in Touch` → `/demo.html` — `.btn-white` (white bg, navy text) |
| **Secondary CTA** | Button Module | `View by Industry` → `/industries.html` — `.btn-outline-white` (transparent bg, white border) |

> **CTA Compliance:** "Get in Touch" and "Let's Talk" are the approved CTAs. NEVER use "Request Demo", "Book a Demo", or "See MES in Action." This page has NO demo offering — per business constraint, the user fills out a form and the team contacts them.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | Centered content, buttons side by side |
| **Tablet (<=1024px)** | Same, reduced padding |
| **Mobile (<=640px)** | Buttons stack vertically |

---

## Section 11: Related Solutions — Internal Links

**Purpose:** SEO internal linking and cross-selling. Directs visitors to related product and industry pages.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `--dw-light-gray`, padding: 60px top/bottom |
| **Content Wrapper** | Row | Max-width: 1200px, centered |
| **Title** | Text Module (H2) | `Explore Related Solutions` — Noto Sans 600, 28px, `--dw-dark-navy`, centered |
| **Links Grid** | Row (CSS Grid) | `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`, gap: 24px |
| **Each Link Card** | Group Module (linked) | Entire card is clickable. White bg, radius: 12px, border: `1px solid #e5e7eb`, padding: 24px. Hover: shadow. |

### Link Cards (6)

| # | Title | Description | Link |
|---|-------|-------------|------|
| 1 | ERP | End-to-end manufacturing ERP built for Thai factories — from BOM to financials to BOI compliance. | `/products/erp.html` |
| 2 | WMS | Smart warehouse management with barcode/RFID — from receiving to dispatch with full traceability. | `/products/wms.html` |
| 3 | AIoT | Connect machines directly to your ERP with IoT sensors, edge computing, and AI-powered analytics. | `/products/aiot.html` |
| 4 | Automotive | ERP and MES solutions purpose-built for automotive parts manufacturers and OEM suppliers. | `/industries/automotive.html` |
| 5 | Electronics | Manufacturing software for electronics assembly, SMT lines, and component traceability. | `/industries/electronics.html` |
| 6 | Metal & Plastics | Integrated solutions for die casting, injection molding, and metal fabrication shops. | `/industries/metal-plastics.html` |

Card title: Noto Sans 600, 18px, `--dw-dark-navy`. Description: Noto Sans, 14px, #666, line-height: 1.5.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | 3-column grid |
| **Tablet (<=1024px)** | 2-column grid |
| **Mobile (<=640px)** | 1-column grid |

---

## Structured Data (JSON-LD)

The page includes three structured data blocks in `<head>`. These should be preserved in Divi 5 via a Code Module in the page header or Divi's Integration tab:

### 1. SoftwareApplication Schema

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "DigiWin MES",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "Manufacturing Execution System",
  "description": "Real-time shop floor visibility for Thai factories. Three tiers — MES for full production execution, SFT for lightweight tracking, AIoT Cloud for entry-level monitoring.",
  "operatingSystem": "Web-based",
  "url": "https://www.digiwin.co.th/products/mes.html",
  "featureList": "OEE monitoring, Quality data capture, Lot-level traceability, Work order management, Real-time production dashboards, SPC analysis, Machine downtime tracking, Paperless shop floor",
  "provider": {
    "@type": "Organization",
    "name": "DigiWin Thailand",
    "url": "https://www.digiwin.co.th"
  }
}
```

### 2. BreadcrumbList Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.digiwin.co.th/"},
    {"@type": "ListItem", "position": 2, "name": "Products", "item": "https://www.digiwin.co.th/products.html"},
    {"@type": "ListItem", "position": 3, "name": "MES", "item": "https://www.digiwin.co.th/products/mes.html"}
  ]
}
```

### 3. FAQPage Schema

Contains all 5 FAQ items (matches Section 9 content exactly). Must stay in sync with the visible FAQ accordion.

---

## Scroll Animation Strategy (Divi 5 Interactions)

The static build uses `DigiWinUI.initScrollAnimation()` with IntersectionObserver. In Divi 5, replace entirely with the built-in **Interactions System**:

| Animation | Divi 5 Interaction | Settings |
|-----------|-------------------|----------|
| Before/After columns fade-in | Scroll → Fade In | Duration: 400ms, ease, stagger: 100ms between columns |
| Product cards fade-in | Scroll → Fade In | Duration: 400ms, ease, stagger: 70ms between cards |
| Product card hover lift | Hover → Transform | translateY: -4px, transition: 0.3s ease (via existing CSS) |
| Capability cards fade-in | Scroll → Fade In | Duration: 400ms, ease, stagger: 70ms |
| Integration nodes fade-in | Scroll → Fade In | Duration: 400ms, stagger: 100ms |
| Integration node hover | Hover → Border Color | Blue border on hover (CSS handles this) |
| Result stat counters | Number Counter Module | Built-in count animation on viewport entry |
| Result cards fade-in | Scroll → Fade In | Duration: 400ms, ease, stagger: 70ms |
| Workflow steps reveal | Scroll → Slide In Left | Duration: 400ms, stagger: 50ms per step |
| FAQ items | Accordion Module | Built-in open/close animation |
| CTA section slide-up | Scroll → Slide Up | Duration: 600ms, ease-out |

> **Divi 5 replaces** all custom JavaScript for scroll animations. No inline `<script>` needed.

---

## Page-Specific JavaScript

| Component | Static Build | Divi 5 Equivalent |
|-----------|-------------|-------------------|
| Scroll animations | `DigiWinUI.initScrollAnimation()` | Divi 5 Interactions → Scroll Effects |
| Dynamic year | `dw-years` class + `digiwin-dynamic.js` | Code Module snippet or Divi 5 Dynamic Content |
| FAQ toggle | Native `<details>` | Accordion Module (native) |
| Particle wave | CSS animation + SVG | Code Module (preserve existing) |
| Super D background | CSS animation + SVG | Code Module (preserve existing) |

> **Only remaining custom JS:** Dynamic year calculation (`44` = 2026 - 1982). Options: (a) Divi 5 Dynamic Content field, (b) tiny Code Module `<script>`, or (c) manually update annually.

---

## SEO / Open Graph Metadata

Preserve in Divi 5 via Yoast SEO or Divi's SEO fields:

| Meta | Value |
|------|-------|
| **Title** | `MES: Real-Time Production Visibility | DigiWin Thailand` |
| **Description** | `Manufacturing Execution System for real-time shop floor visibility. Three tiers — MES, SFT, and AIoT Cloud — to match your factory's needs and budget.` |
| **Canonical** | `https://www.digiwin.co.th/products/mes.html` |
| **OG Image** | `https://www.digiwin.co.th/assets/og-default.jpg` (replace with MES-specific image when available) |
| **OG Type** | `website` |

---

## Accessibility Requirements

These are **non-negotiable** and must be baked into the Divi 5 build from the start:

| Requirement | Implementation |
|-------------|---------------|
| **Skip link** | `<a href="#mes-content" class="dw-skip-link">Skip to content</a>` — before header |
| **Main landmark** | `<main id="mes-content">` wraps all content sections |
| **prefers-reduced-motion** | CSS media query disables all animations/transitions for users who prefer reduced motion. All Divi 5 Interactions must have a reduced-motion fallback. |
| **SVG decorations** | All decorative SVGs must have `aria-hidden="true"` |
| **Contrast** | No text with opacity < 0.75 on dark backgrounds. Current build uses 0.75 minimum — maintain this. |
| **Color-blind safe** | Before/After section uses both color AND labels (not color alone) to distinguish columns |
| **FAQ headings** | Accordion items use proper heading hierarchy (H3 inside accordion) |
| **Link text** | All links have descriptive text (no "click here"). Integration links and related solution cards have clear labels. |

---

## Issues Found During Reverse-Engineering

| Issue | Severity | Recommendation |
|-------|----------|----------------|
| **~869 lines of inline `<style>`** | Medium | All page-specific CSS moves into Divi 5 module-level styling. Zero inline CSS needed in Divi. |
| **Dashboard mockup is static HTML, not real data** | Low | Keep as visual decoration. Consider replacing with a screenshot of actual MES UI post-launch. |
| **Workflow strip is difficult to build with Divi modules** | Medium | Use Code Module for the workflow strip. Attempting it with individual Divi elements creates too many modules. |
| **Capabilities SVG background is ~30 lines** | Low | Code Module. Not worth converting to Lottie given low complexity. |
| **"44" years — some hardcoded, some dynamic** | Low | Standardize: use `dw-years` class everywhere, ensure dynamic JS runs. |
| **Product cards use generic MES (not sMES/eMES/iMES)** | Info | Correct per Peter's decision. Use "MES" generically on all public-facing pages. |
| **Report lists use `<ol>` but display as unordered** | Low | Switch to `<ul>` in Divi 5 build, or use Icon List Module (inherently unordered). |

---

## Validation Checklist (Divi 5 Build)

### Layout & Structure
- [ ] Hero renders as 2-column on desktop (content left, mockup right)
- [ ] Hero stacks to 1 column on tablet, mockup hidden
- [ ] GEO definition block displays correctly below hero
- [ ] Before/After columns render side by side with arrow divider on desktop
- [ ] Before/After stacks vertically on tablet/mobile with rotated arrow
- [ ] 3 product cards render in equal-width columns
- [ ] Selection guide renders as 3 columns below product cards
- [ ] Any-ERP callout renders with icon + text side by side
- [ ] Workflow strip displays all 9 steps with connectors horizontally
- [ ] 8 capability cards render in 4-column grid
- [ ] Integration flow shows 4 nodes with arrows horizontally
- [ ] Results section shows two labeled rows (MES + SFT) plus shared card
- [ ] Reports section shows 2 columns (MES: 10 items, SFT: 6 items)
- [ ] FAQ accordion opens/closes correctly for all 5 items
- [ ] CTA banner renders with Super D + particle wave backgrounds
- [ ] Related solutions grid shows 6 cards

### Content Accuracy
- [ ] Hero headline: "Stop Guessing. Start Seeing." (matches PRD 3.2)
- [ ] SFT = "Shop Floor Tracking" (NOT "Smart Factory Transparency")
- [ ] Product is called "MES" generically (NOT sMES, eMES, or iMES)
- [ ] MES stats: -45% cycle time, -70% quality failures, +26% efficiency
- [ ] SFT stats: 92% transparency, 86% delivery, 2-4 week implementation
- [ ] Shared stat: 76% customer satisfaction
- [ ] Attribution: "Based on DigiWin implementation data across 50,000+ manufacturing clients"
- [ ] Dynamic year shows correct value (2026 - 1982 = 44)
- [ ] MES reports: 10 named reports listed
- [ ] SFT dashboards: 6 named dashboards listed

### CTAs & Links
- [ ] Primary CTA says "Let's Talk" or "Get in Touch" (NEVER "Request Demo" or "Book a Demo")
- [ ] Hero "Find Your Fit" scrolls to `#compare` anchor
- [ ] Integration links point to existing product pages (erp.html, wms.html, aiot.html)
- [ ] Related solutions links all point to pages that exist
- [ ] CTA buttons link to `/demo.html` (contact form, not a demo)

### Accessibility
- [ ] Skip-to-content link present and functional
- [ ] `<main>` landmark wraps all content
- [ ] `prefers-reduced-motion` media query disables all animations
- [ ] All decorative SVGs have `aria-hidden="true"`
- [ ] No text with opacity < 0.75 on dark backgrounds
- [ ] FAQ items accessible via keyboard

### Performance
- [ ] Page loads under 3 seconds on 4G connection
- [ ] No horizontal scroll on any breakpoint
- [ ] All hover effects work on clickable elements only
- [ ] Colors match Design Variables exactly
- [ ] Fonts load: Noto Sans, JetBrains Mono

### Structured Data
- [ ] SoftwareApplication schema present and valid
- [ ] BreadcrumbList schema present and valid
- [ ] FAQPage schema matches visible FAQ content exactly

---

## Open Questions for Peter

1. **Dashboard mockup:** Keep the current CSS mockup, or replace with a screenshot of the actual MES interface once available?
2. **Capabilities SVG background:** Keep the production-line SVG scene, or simplify to a subtle pattern for easier Divi maintenance?
3. **Workflow strip implementation:** Code Module (pixel-perfect) or attempt with Divi modules (more maintainable but less precise)?
4. **Product card photos:** Add product screenshots/images to each tier card header, or keep the current badge + gradient header style?

---

*This spec supersedes `ContentSpec_MES_1.0.md` (v1.2, Feb 13) for the Divi 5 build. Content is identical to the HTML build — this spec adds Divi 5 module mapping, responsive breakpoints, animation strategy, and structured data preservation.*
