# Content Spec: Home Page — Divi 5 Build (2.0)

**Batch:** 0 (Foundation Page)
**PRD Reference:** Section 4, Page 1.0
**Playbook Reference:** Section 2 (Dual-Audience Emotional Arcs), Section 5 (CTA Hierarchy)
**Status:** v2.0 — Reverse-engineered from HTML build + mapped to Divi 5 modules
**Last Updated:** February 10, 2026
**Platform:** WordPress + Divi 5

---

## Page Overview

| Element | Specification |
|---------|---------------|
| **Audience** | Both — factory operators (Track A) AND distributor prospects (Track B) |
| **Objective** | Segment and route visitors within 5 seconds |
| **URL** | digiwin.co.th (homepage) |
| **Emotional Arc (Track A)** | Empathetic → "We see your invisible pain" → Confident → Action |
| **Emotional Arc (Track B)** | Provocative → "Your business model traps you" → Strategic → Action |
| **Page Structure** | 9 sections, ~2870 lines in static build |

---

## Divi 5 Capabilities Leveraged

This page takes full advantage of Divi 5's new features:

| Divi 5 Feature | Where Used | Why |
|----------------|-----------|-----|
| **CSS Grid Layout** | Hero split, Stats, Trust grid, Check cards | Native 2-col, 4-col, and asymmetric grids without custom CSS |
| **Nested Modules** | Industry Tabs, Product Cards | Each tab contains a full Image + Text + List + Button layout. No Code Module workaround needed. |
| **Group Module** | Trust cards, Check cards, Product pillars | Card-style containers with shared background, border, hover effects |
| **Design Variables** | Colors, fonts, spacing | Define #00AFF0, #000864, font families once; reference everywhere |
| **Interactions System** | Card hovers, scroll reveals, stat counters | Built-in scroll-triggered animations and hover transforms replace custom JS |
| **Lottie Module** | Hero illustrations (potential upgrade) | Complex SVG animations → lightweight .json Lottie files for performance |
| **Customizable Breakpoints** | All sections | 7 breakpoints replace the manual 1024/768/640 media queries |
| **Semantic Elements** | Every section | `<section>`, `<nav>`, `<article>` tags for SEO and accessibility |
| **Flexbox Layout** | CTA buttons, hero stats, logo bar | Wrapping, spacing, alignment controls without CSS |
| **Group Carousel** | Client logo bar | Native auto-scrolling logo carousel without plugins |

---

## Design Variables (Global — Set Once in Divi 5)

Define these in Divi 5's Design Variables panel so every module references them:

### Colors
| Variable Name | Value | Usage |
|--------------|-------|-------|
| `--dw-primary-blue` | #00AFF0 | CTAs, links, accents, icon backgrounds |
| `--dw-dark-navy` | #000864 | Footer, hero overlays, dark sections |
| `--dw-light-gray` | #F5F7FA | Alternating section backgrounds |
| `--dw-text-dark` | #333333 | Primary body text |
| `--dw-text-light` | #64748b | Secondary/support text |
| `--dw-white` | #FFFFFF | Card backgrounds, light text |
| `--dw-partner-gold` | #fef3c7 | Partner panel highlight accent |

### Fonts
| Variable Name | Value | Usage |
|--------------|-------|-------|
| `--dw-heading` | Noto Sans, sans-serif | All headings (H1-H6) |
| `--dw-body` | Noto Sans, sans-serif | Body copy, descriptions |
| `--dw-mono` | JetBrains Mono, monospace | Labels, badges, stats, codes |
| `--dw-chinese` | Noto Sans SC, sans-serif | CJK fallback |

### Spacing
| Variable Name | Value | Usage |
|--------------|-------|-------|
| `--dw-section-pad` | 100px top/bottom | Standard section padding |
| `--dw-section-pad-sm` | 60px top/bottom | Compact sections (logo bar) |
| `--dw-container-max` | 1200px | Max content width |
| `--dw-card-radius` | 20px | Card border radius |
| `--dw-card-gap` | 24px-32px | Grid gap between cards |

---

## Section 1: Hero — Split Screen

**Purpose:** Immediately segment two audiences with pain-first messaging per Playbook emotional arcs.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | CSS Grid: `grid-template-columns: 1fr 1fr`, min-height: `calc(100vh - 80px)`, margin-top: 80px (header offset) |
| **Left Panel** | Column | Background: linear-gradient(165deg, #0f1419 0%, #1a2632 40%, #000864 100%) |
| **Right Panel** | Column | Background: linear-gradient(165deg, #0369a1 0%, #2d7bc4 40%, #2d7bc4 100%) |
| **Each Panel Content** | Group Module | Contains: Text (label) → Text (headline) → Text (subtitle) → Button → Group (stats row) |
| **Illustrations** | Code Module OR Lottie Module | See "Illustration Strategy" below |

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | 2-column grid, side by side |
| **Tablet (≤1024px)** | Stack to 1 column, each panel min-height: 80vh |
| **Mobile (≤640px)** | Stack, padding: 48px 24px, stats go vertical |

### Left Panel: Track A — Factory Operators

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Label** | Text Module | `FOR MANUFACTURING BUSINESS OWNERS` — JetBrains Mono, 14px, uppercase, 0.15em spacing, #00AFF0, with left gradient line (CSS pseudo-element or Divider module) |
| **Headline** | Text Module (H1) | `Your True Costs Are` **`Invisible.`** — Noto Sans 700, clamp(32px, 3.5vw, 52px), white. "Invisible" in #00AFF0 (use Divi inline color) |
| **Subtitle** | Text Module | `"Shadow Excel" files have replaced your standard operating procedures. Ghost inventory means system says 100, shelf says 50. We fix this—because we've spent 44 years doing nothing but manufacturing software.` — Noto Sans, 18px, rgba(255,255,255,0.75), line-height 1.75 |
| **CTA Button** | Button Module | `See How We Fix It` → links to `/products.html` — Primary blue background, white text |
| **Stats Row** | Group Module (nested) | Flexbox row, gap 40px, border-top: 1px solid rgba(255,255,255,0.1), margin-top 48px, padding-top 32px |

#### Stats Row Items (inside Group)

| Stat | Number | Label |
|------|--------|-------|
| 1 | `44` | Years Manufacturing Focus |
| 2 | `50K+` | Factories Served |
| 3 | `300378` | Shenzhen Listed |

Number styling: Noto Sans 800, 32px, #00AFF0, -0.02em tracking. Label styling: JetBrains Mono, 11px, rgba(255,255,255,0.5), uppercase, 0.1em spacing.

> **Divi 5 Note:** Use Number Counter modules for the stats to get animated count-up on scroll. Set "No Animation" for `300378` (it's a stock code, not a quantity).

### Right Panel: Track B — Distributor Prospects

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Label** | Text Module | `FOR ERP IMPLEMENTERS` — same mono styling, color: rgba(255,255,255,0.9) |
| **Headline** | Text Module (H1) | `Trapped in the` **`Man-Day`** `Model?` — "Man-Day" in #fef3c7 |
| **Subtitle** | Text Module | `Your revenue is capped by headcount. Customization wars burn out your best consultants. We offer a way out—product-based margins that compound instead of compress.` |
| **CTA Button** | Button Module | `Escape the Trap` → links to `/partner-program.html` — Ghost style: transparent bg, white border |
| **Stats Row** | Group Module (nested) | Same flex layout as left panel |

#### Stats Row Items

| Stat | Number | Label |
|------|--------|-------|
| 1 | `Industry-Leading` | License Margins |
| 2 | `Your MA` | Your Revenue |

> **Updated Feb 10, 2026:** Hero stats changed from specific percentages ("30-40% License Margin" / "50% Recurring Revenue") to qualitative statements. Rationale: (1) "50% Recurring Revenue" had no verified source, (2) actual margins (50-70%) made "30-40%" misleading, (3) undersell strategy — let the Partner Program page reveal specific numbers. MA positioning: "We keep the maintenance revenue in your hands, not ours."

Number styling: white instead of blue. Use Text modules (not Number Counter, since these are ranges/percentages).

### Illustration Strategy

The static HTML uses complex inline SVGs with CSS animations:
- **Factory panel:** Ghost inventory warehouse, fragmenting spreadsheets, broken data streams, hidden cost bubbles, factory outline
- **Partner panel:** Breaking cage ("man-day trap"), revenue ceiling breakthrough, compounding revenue streams, clock transformation, freedom burst, margin percentages

**Divi 5 approach — two options:**

| Option | How | Pros | Cons |
|--------|-----|------|------|
| **A: Lottie Module** (Recommended) | Convert SVGs to Lottie JSON animations using After Effects/Bodymovin or LottieFiles | Tiny file size, GPU-accelerated, smooth 60fps, Divi-native | Requires Lottie file creation step |
| **B: Code Module** | Paste SVG+CSS animation code directly | Exact match to current build | Large code blocks, harder to maintain in Divi |

> **Recommendation:** Start with **Option B** (Code Module) for launch. Schedule Lottie conversion as a post-launch optimization. The SVG animations are the page's visual signature — don't lose them.

### Grain Texture Overlay

Both panels have a subtle noise grain texture (`opacity: 0.03`). In Divi 5:
- Use Section → Background → Pattern/Mask overlay if available
- OR use Code Module with the SVG noise filter as a positioned overlay
- The grain animation (`animation: grain 8s steps(10) infinite`) gives it life — preserve this

---

## Section 2: Client Logo Bar

**Purpose:** Build credibility for both audiences. Social proof before the deep content.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%), padding: 60px 40px |
| **Row** | Row | Max-width: 1200px, centered |
| **Label** | Text Module | `Trusted by Leading Manufacturers in Thailand` — JetBrains Mono, 12px, uppercase, 0.15em spacing, #64748b, center-aligned |
| **Logo Strip** | Group Carousel OR Image Modules in Row | See below |
| **Stats Row** | Row (3 columns) | Flexbox row, center-aligned, gap 60px, border-top 1px solid #e2e8f0 |

### Logo Strip

| Approach | Divi 5 Module | Notes |
|----------|--------------|-------|
| **If client logos available** | Group Carousel Module | 6-8 Image modules inside, auto-scroll, grayscale filter (Divi 5 Image filter options), height 48px, hover → color |
| **If no logos yet** | Image Modules in Row | 6 placeholder images with `onerror` fallback text. Grayscale filter, 0.6 opacity, hover: full color + opacity 1 |

### Stats Below Logo Strip

| Stat | Value | Label |
|------|-------|-------|
| 1 | `50,000+` | Factories Worldwide |
| 2 | `44` | Years in Manufacturing |
| 3 | `Certified` | Thai Revenue Department |

Use **Number Counter** modules for `50,000+` and `44` (animated count-up). Use **Text Module** for `Certified` (not a number).

Styling: Value → Noto Sans 700, 28px, #000864. Label → Noto Sans, 13px, #64748b.

---

## Section 3: Factory Path — Understanding Checks

**Purpose:** Track A empathy section. Name the pains that factory owners recognize, creating "they understand us" trust.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: linear-gradient(165deg, #f8fafc 0%, #f1f5f9 100%), padding: 100px 40px |
| **Header** | Group Module | Center-aligned: label + title + subtitle |
| **Cards Grid** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, gap: 32px. Cards 4+5 wrap to second row. |
| **Each Card** | Group Module | Background: white, border: 1px solid #e2e8f0, border-radius: 20px, padding: 40px 32px, hover: translateY(-6px) + blue shadow + blue border |

### Section Header

| Element | Content |
|---------|---------|
| **Label** | `FOR MANUFACTURING BUSINESS OWNERS` — mono styling with flanking gradient lines |
| **Title** | `Do You Recognize These Problems?` — Noto Sans 700, clamp(32px, 4vw, 44px), #000864 |
| **Subtitle** | `If any of these sound familiar, you're not alone. We've helped 50,000+ factories escape these exact traps.` — Noto Sans, 18px, #64748b |

### Pain Point Cards (5 total)

Each card contains (nested inside Group Module):

| Element | Divi 5 Module | Styling |
|---------|--------------|---------|
| **Number** | Text Module | Noto Sans 800, 64px, #00AFF0 at 0.15 opacity |
| **Title** | Text Module (H3) | Noto Sans 700, 20px, #000864 |
| **Quote** | Text Module | Noto Sans, 16px italic, #475569, left border 3px solid #00AFF0, padding-left 16px |
| **Description** | Text Module | Noto Sans, 15px, #64748b, line-height 1.6 |

#### Card 1: "Shadow Excel" Reality

| Element | Content |
|---------|---------|
| **Number** | 01 |
| **Title** | "Shadow Excel" Reality |
| **Quote** | "You know your factory isn't actually running on your current system—it's running on spreadsheets because your staff finds the software too rigid or slow." |
| **Description** | Your real operations live in unconnected Excel files, not in your ERP. Financial data doesn't match physical reality because planners work outside the system. |

#### Card 2: "The Black Box" Problem

| Element | Content |
|---------|---------|
| **Number** | 02 |
| **Title** | "The Black Box" Problem |
| **Quote** | "You know exactly how much raw material you bought and how many finished goods you sold, but the 3 weeks in between (WIP) are invisible." |
| **Description** | You rely on paper reports filled out yesterday to understand what happened today. You can't see what's happening on the floor right now without walking over and asking. |

#### Card 3: "Ghost Inventory" Crisis

| Element | Content |
|---------|---------|
| **Number** | 03 |
| **Title** | "Ghost Inventory" Crisis |
| **Quote** | "The system says you have 100 units, but the shelf has 50. This discrepancy forces your team to hoard 'safety stock' just to survive." |
| **Description** | Inventory inaccuracy ties up millions in unnecessary capital and destroys your ability to promise reliable delivery dates. The "borrowing culture" has replaced discipline. |

#### Card 4: "Cost Guesswork" Trap

| Element | Content |
|---------|---------|
| **Number** | 04 |
| **Title** | "Cost Guesswork" Trap |
| **Quote** | "You quoted a price last month based on estimated costs. This month the same product costs 15% more to make — and you have no idea why." |
| **Description** | Batch-to-batch cost fluctuations are invisible without production-order-level tracking. You're pricing based on last quarter's averages, not this morning's reality. |

#### Card 5: "10-Second Answer" Failure

| Element | Content |
|---------|---------|
| **Number** | 05 |
| **Title** | "10-Second Answer" Failure |
| **Quote** | "When your biggest customer calls and asks 'where is my order?' — you put them on hold, walk to the shop floor, and hope someone knows." |
| **Description** | Real-time delivery status should be a click away, not a 20-minute investigation. Every hold costs you credibility with the customers who matter most. |

### CTA Below Cards

| Element | Content |
|---------|---------|
| **Button** | `See How We Fix This` → `/products.html` — Primary blue, centered |

### Responsive

| Breakpoint | Grid Columns |
|-----------|-------------|
| Desktop (>1024px) | 3 columns (cards 4-5 in row 2) |
| Tablet (≤1024px) | 2 columns (card 5 spans 2, centered, max-width 500px) |
| Mobile (≤768px) | 1 column |

> **Divi 5 Note:** Use Divi 5's CSS Grid responsive controls per breakpoint. The last card spanning 2 columns on tablet can use `grid-column: span 2` in column settings.

---

## Section 4: Partner Path — Understanding Checks

**Purpose:** Track B provocative opening. Name the structural traps that consultants/implementers recognize.

### Divi 5 Implementation

Identical structure to Section 3, but with dark theme:

| Element | Difference from Section 3 |
|---------|--------------------------|
| **Section Background** | linear-gradient(165deg, #0f1419 0%, #1a2632 50%, #000864 100%) |
| **Card Background** | rgba(255,255,255,0.05), border: 1px solid rgba(255,255,255,0.1) |
| **Card Hover** | translateY(-6px), bg rgba(255,255,255,0.08), border rgba(255,255,255,0.2) |
| **Number Color** | white at 0.15 opacity (not blue) |
| **Title Color** | white |
| **Quote Color** | rgba(255,255,255,0.8), border-left: rgba(255,255,255,0.3) |
| **Description Color** | rgba(255,255,255,0.6) |
| **Label Color** | rgba(255,255,255,0.7) |

### Pain Point Cards (3 total)

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
| **Description** | Most Thai SMEs lack a dedicated IT Manager. You subsidize their operations with your margins. The "free work" that kills your spirit but you feel forced to do to keep the relationship. |

> **Updated Feb 10, 2026:** Changed "80% of Thai SMEs" → "Most Thai SMEs". The 80% figure appears in DigiWin's IDP documents but is not backed by an external source (no OSMEP/FTI/BOI citation). Using "most" is defensible; if challenged, say "based on our experience across 100+ Thai implementations."

### CTA Below Cards

| Element | Content |
|---------|---------|
| **Button** | `See the Way Out` → `/partner-program.html` — Ghost button (white outline on dark) |

---

## Section 5: Product Pillars — Value Propositions

**Purpose:** Show breadth of manufacturing software stack. Each pillar links to its product page.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #F5F7FA, standard section padding |
| **Header** | Group Module | Label + Title + Subtitle, centered |
| **Product Grid** | Row with CSS Grid | `grid-template-columns: repeat(4, 1fr)`, gap: 24px |
| **Each Product Card** | Group Module (linked) | Entire card is clickable (Group link). White bg, radius 20px, shadow, hover: translateY(-8px) + blue shadow. Top blue accent bar on hover (CSS `::before` via custom CSS or Divi border-top). |

### Section Header

| Element | Content |
|---------|---------|
| **Label** | `COMPLETE MANUFACTURING STACK` |
| **Title** | `One Ecosystem. Total Visibility.` |
| **Subtitle** | `From financials to the factory floor, every DigiWin product works together—no integration nightmares, no data silos.` |

### Product Card Structure (repeats 4x)

Each Group Module contains:

| Element | Divi 5 Module | Notes |
|---------|--------------|-------|
| **Icon** | Image Module or Code Module | Custom SVG icons (80x80px container, dark navy bg, 24px radius). Each icon is unique to the product. |
| **Product Title** | Text Module (H3) | Noto Sans 700, 20px, #000864 |
| **Full Name** | Text Module | JetBrains Mono, 11px, #00AFF0, uppercase, 0.05em spacing |
| **Tagline** | Text Module | Noto Sans 600, 15px, #000864, line-height 1.3 |
| **Features** | Icon List Module (Divi 5 new!) | 3 items per card, blue dot bullets, each with bold term + description |
| **Benefit Line** | Text Module | 13px, #00AFF0, weight 500, top border 1px solid #e2e8f0 |

> **Divi 5 Advantage:** The new **Icon List Module** is perfect for the 3-feature list in each card. Each item gets a consistent blue dot icon and the bold/normal text formatting.

#### Card 1: ERP Core

| Element | Content |
|---------|---------|
| **Link** | `/products/erp.html` |
| **Icon** | Custom SVG: document + calculator + dollar sign |
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
| **Icon** | Custom SVG: factory with conveyor belt and products |
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
| **Icon** | Custom SVG: warehouse shelves with boxes |
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
| **Icon** | Custom SVG: central AI hub with sensor nodes and connection lines |
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
| Tablet (≤1024px) | 2 columns |
| Mobile (≤640px) | 1 column |

---

## Section 6: Industry Selector — Tabbed Interface

**Purpose:** Let visitors self-identify by manufacturing vertical. Builds "they understand MY industry" confidence.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, standard padding |
| **Header** | Group Module | Label + Title + Subtitle, centered |
| **Tab Interface** | **Tabs Module with Nested Modules** | 3 tabs. Each tab body contains a nested Row (2 columns: image left, content right) |

> **This is where Divi 5 nested modules shine.** In Divi 4, the Tabs module could only hold text/HTML. In Divi 5, each tab can contain a full layout: Row → Column (Image) + Column (Text + List + Button). No Code Module workarounds needed.

### Section Header

| Element | Content |
|---------|---------|
| **Label** | `INDUSTRY EXPERTISE` |
| **Title** | `Built for Your Industry` |
| **Subtitle** | `We don't just understand manufacturing—we understand YOUR manufacturing.` |

### Tab Configuration

| Setting | Value |
|---------|-------|
| **Tab Style** | Pill/rounded tabs in a unified bar (use Divi 5 Tab design options) |
| **Active Tab** | White background, #000864 text, weight 600, bottom 3px blue gradient bar |
| **Inactive Tab** | Transparent, #64748b text, hover: #00AFF0 text + light blue bg |
| **Tab Bar Background** | #f1f5f9 with 16px top border-radius |
| **Content Area** | White, 24px border-radius, box-shadow: 0 12px 48px rgba(0,0,0,0.08) |

### Tab 1: Automotive Parts Manufacturing

**Tab Label:** `Automotive Parts`

Inside the tab, use a **nested Row** with 2 columns:

#### Left Column: Industry Image

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Image** | Image Module or Code Module | Height: 450px. SVG illustration of automotive assembly line (car body, robotic arms, conveyor, gear, welding sparks, JIT label, "RUNNING" status). Dark navy gradient background. |

> **Note:** The static build uses a 270-line inline SVG with animations. For Divi 5, use Code Module to embed the SVG, or replace with a static image/Lottie as a simpler alternative.

#### Right Column: Industry Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Title** | Text Module (H3) | `Automotive Parts Manufacturing` — Noto Sans 700, 32px, #000864 |
| **Description** | Text Module | `Thailand is ASEAN's automotive hub. We understand what tier-1 OEMs demand: perfect traceability, JIT delivery, and EDI integration that works—every time.` |
| **Features** | Icon List Module | 4 items with blue check-square icons: Toyota/Honda/Denso EDI integration · IATF 16949 compliance support · Lot-level traceability for recalls · Kanban and JIT scheduling |
| **CTA** | Button Module | `Explore Automotive Solutions` → `/industries/automotive.html` — Primary blue |

### Tab 2: Electronics Assembly

**Tab Label:** `Electronics Assembly`

#### Left Column: Industry Image
Complex PCB board SVG illustration (circuit traces, CPU chip, memory chips, SMT components, signal flow animations, AOI scanner, LED status indicators).

#### Right Column: Industry Content

| Element | Content |
|---------|---------|
| **Title** | `Electronics Assembly` |
| **Description** | `High-mix, low-volume. Fast product cycles. Thousands of components per board. We built our MES for exactly this complexity.` |
| **Features** | SMT machine integration · Component-level traceability · MSD (moisture sensitivity) management · AOI integration and defect tracking |
| **CTA** | `Explore Electronics Solutions` → `/industries/electronics.html` |

### Tab 3: Metal & Plastics Processing

**Tab Label:** `Metal & Plastics`

#### Left Column: Industry Image
CNC machine + injection molding machine + stamping press SVG illustration (spinning spindle, sparks, ejected parts, conveyor with parts, overhead crane, yield rate display "98.2%").

#### Right Column: Industry Content

| Element | Content |
|---------|---------|
| **Title** | `Metal & Plastics Processing` |
| **Description** | `Stamping, injection molding, CNC machining. Process manufacturing where yield optimization and scrap reduction drive your margins.` |
| **Features** | Process parameter monitoring · Mold/die lifecycle management · Scrap analysis and reduction · Cycle time optimization |
| **CTA** | `Explore Metal & Plastics Solutions` → `/industries/metal-plastics.html` |

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | Tabs horizontal, content: 2-column (image + text) |
| Tablet (≤1024px) | Tabs horizontal, content: 1 column (image above text), image height: 300px |
| Mobile (≤640px) | Tabs stack vertically (full width), image above text |

---

## Section 7: Stats Banner

**Purpose:** Reinforce credibility with verifiable numbers. Creates an emotional "weight of evidence" pause.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: linear-gradient(165deg, #0f1419 0%, #1a2632 40%, #000864 100%), padding: 100px 40px. Grain texture overlay (Code Module or background pattern). Blue radial glow overlay (background image: radial-gradient). |
| **Stats Row** | Row with CSS Grid | `grid-template-columns: repeat(4, 1fr)`, gap: 48px, center-aligned |
| **Each Stat** | Number Counter Module | Animated count-up on scroll enter |
| **Dividers** | CSS or Divider Module | Vertical gradient dividers between stats (linear-gradient: transparent → rgba(55,152,228,0.3) → transparent) |

### Stats

| Number | Label | Module Type | Animation |
|--------|-------|------------|-----------|
| `44` | Years Manufacturing Focus | Number Counter | Count up from 0 |
| `50,000+` | Factories Across Asia | Number Counter | Count up from 0, suffix "+" |
| `100+` | Thai Implementations | Number Counter | Count up from 0, suffix "+" |
| `300378` | Shenzhen Stock Exchange | Text Module (no animation) | Static — it's a stock code |

Styling: Number → Noto Sans 800, clamp(48px, 6vw, 72px), #00AFF0. Label → JetBrains Mono, 11px, rgba(255,255,255,0.6), uppercase, 0.12em spacing.

### Responsive

| Breakpoint | Grid |
|-----------|------|
| Desktop | 4 columns with vertical dividers |
| Tablet (≤1024px) | 2x2 grid, no dividers |
| Mobile (≤640px) | 2x2 grid |

---

## Section 8: Trust Anchors — Credibility Cards

**Purpose:** Five proof points that answer "why should I trust DigiWin?" — each anchored to a verifiable fact.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: white, standard padding |
| **Header** | Group Module | Label + Title + Subtitle |
| **Cards Grid** | Row with CSS Grid | `grid-template-columns: repeat(2, 1fr)`, gap: 24px. Last card: `grid-column: 1 / -1` (full width) |
| **Each Card** | Group Module | Background: linear-gradient(135deg, #000864 0%, #1e3a5f 50%, #0f172a 100%), radius: 20px, padding: 36px, min-height: 280px, grain overlay. Hover: translateY(-4px) + deep shadow. |

### Section Header

| Element | Content |
|---------|---------|
| **Label** | `WHY TRUST DIGIWIN` |
| **Title** | `Credibility Without Hype` |
| **Subtitle** | `We don't just claim to be different. Here's the evidence.` |

### Card Structure (repeats 5x)

Each Group Module contains:

| Element | Divi 5 Module | Styling |
|---------|--------------|---------|
| **Background Icon** | Image/Code Module | Large SVG icon, absolute positioned top-right, opacity 0.08, 180x180px. Hover: opacity 0.12, scale 1.05, rotate 5deg. |
| **Small Icon** | Image/Code Module | 48x48px, rgba(55,152,228,0.15) bg, blue border, 12px radius |
| **Badge** | Text Module | JetBrains Mono, 11px, #00AFF0, bg rgba(55,152,228,0.15), border: 1px solid rgba(55,152,228,0.25), 5px 12px padding, 6px radius |
| **Title** | Text Module (H3) | Noto Sans 700, 22px, white |
| **Headline** | Text Module | Noto Sans, 15px weight 500, rgba(255,255,255,0.9) |
| **Detail** | Text Module | Noto Sans, 13px, rgba(255,255,255,0.55), line-height 1.65 |

#### Card 1: Financial Stability

| Element | Content |
|---------|---------|
| **Badge** | `300378` |
| **Title** | Financial Stability |
| **Headline** | We are a publicly traded company with transparent financials—the stability partners and clients need for a 10-year relationship. |
| **Detail** | Unlike "fly-by-night" software houses or small local vendors who might go bankrupt, DigiWin is a Shenzhen-listed company with regulated governance. Proves vendor is a permanent entity with capital to support partners long-term. |
| **Icon** | Bar chart (📊) |

#### Card 2: Manufacturing DNA

| Element | Content |
|---------|---------|
| **Badge** | `Foxconn FII` |
| **Title** | Manufacturing DNA |
| **Headline** | Strategic investment from Foxconn Industrial Internet validates our software handles the world's largest electronics manufacturer. |
| **Detail** | This isn't just "IT software"—it's Industrial Reality. When the company that builds iPhones trusts DigiWin, it proves "Smart Factory" capabilities at the highest level of complexity. |
| **Icon** | Stacked layers |

#### Card 3: Domain Endurance

| Element | Content |
|---------|---------|
| **Badge** | `Since 1982` |
| **Title** | Domain Endurance |
| **Headline** | We have spent 44 years exclusively in manufacturing software—built on decades of shop-floor reality, not temporary tech trends. |
| **Detail** | DigiWin has survived every technology shift (DOS → Windows → Cloud) while staying focused on manufacturing. We didn't pivot to crypto or retail POS when it was trendy. |
| **Icon** | Clock |

#### Card 4: Scale Proof

| Element | Content |
|---------|---------|
| **Badge** | `50,000+` |
| **Title** | Scale Proof |
| **Headline** | Our methodology is refined from 50,000+ implementations across Asia—adopt a proven standard, not a beta product. |
| **Detail** | The software logic has been battle-tested in thousands of Asian factories. It handles specific complexities (Thai tax, sub-contracting, circular BOMs) that break smaller systems. |
| **Icon** | Globe |

#### Card 5: BOI Compliance (Full-Width Card)

| Element | Content |
|---------|---------|
| **Badge** | `BOI Ready` |
| **Title** | BOI Compliance |
| **Headline** | Production-order-level material reconciliation that passes BOI audits — the capability no competitor can match. |
| **Detail** | One factory saved 10M+ THB/year in supplementary taxes. Our system tracks actual material consumption per production order, not theoretical BOM calculations. [Read the full story →](/blog/boi-compliance-jin-hai.html) |
| **Icon** | Shield with checkmark |

### Responsive

| Breakpoint | Grid |
|-----------|------|
| Desktop | 2 columns + full-width last card |
| Tablet (≤1024px) | 1 column |
| Mobile (≤640px) | 1 column, min-height: auto, padding: 28px 24px |

---

## Section 9: Final CTA Banner

**Purpose:** Convert interested visitors. Welcoming tone per Playbook — "Let's talk" not "Book a demo."

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: linear-gradient(135deg, #00AFF0 0%, #2d7bc4 50%, #2d7bc4 100%), padding: 120px 40px. Cross-pattern overlay (SVG background or Divi 5 pattern). White radial glow bottom-right. |
| **Content** | Call to Action Module OR Group Module | Max-width 800px, centered, z-index above overlays |
| **Title** | Text Module (H2) | `Let's Start a Conversation` — Noto Sans 700, clamp(36px, 4.5vw, 52px), white, -0.02em tracking |
| **Subtitle** | Text Module | `We're eager to understand your challenges and explore how we can help. No pressure, no sales pitch—just a genuine conversation about your manufacturing operations.` — Noto Sans, 20px, rgba(255,255,255,0.9), line-height 1.65 |
| **Button Row** | Group Module (flexbox) | Centered, gap 20px, flex-wrap: wrap |
| **Primary CTA** | Button Module | `Talk to Our Team` → `/demo.html` — White bg, #2d7bc4 text, bold, shadow. Hover: translateY(-3px) + deeper shadow. |
| **Secondary CTA** | Button Module | `Explore Partnership` → `/partner-program.html` — Transparent bg, white text, 2px solid rgba(255,255,255,0.6) border. Hover: rgba(255,255,255,0.15) bg + solid white border. |

> **PRD Compliance Note:** CTA says "Talk to Our Team" — NOT "Request a Demo." This aligns with the business constraint: DigiWin Thailand does not offer product demos.

---

## Scroll Animation Strategy (Divi 5 Interactions)

The static build uses `DigiWinUI.initScrollAnimation()` with IntersectionObserver. In Divi 5, replace with the built-in **Interactions System**:

| Animation | Divi 5 Interaction | Settings |
|-----------|-------------------|----------|
| Cards fade-in on scroll | Scroll → Fade In | Duration: 400ms, ease, stagger: 70ms between siblings |
| Card hover lift | Hover → Transform | translateY: -6px to -8px depending on card type |
| Number counters | Number Counter module | Built-in count animation on viewport entry |
| Industry tab content | Tabs Module | Built-in fade transition between tabs |
| Hero content slide-up | Scroll → Slide Up | Duration: 800ms, ease-out |
| Hero stats fade-in | Scroll → Fade In | Delay: 500ms, duration: 1000ms |

> **Divi 5 replaces** the custom JavaScript entirely. No inline `<script>` needed for scroll animations.

---

## Page-Specific JavaScript

| Component | Static Build | Divi 5 Equivalent |
|-----------|-------------|-------------------|
| Industry tab switching | Custom JS (14 lines) | Tabs Module (native) |
| Scroll animations | `DigiWinUI.initScrollAnimation()` | Divi 5 Interactions → Scroll Effects |
| Client stats observer | IntersectionObserver (6 lines) | Number Counter auto-animate |
| Dynamic year calculation | `digiwin-dynamic.js` | Divi 5 Dynamic Content or Code Module snippet |

> **Only remaining custom JS:** The dynamic year calculation (`44` years computed from founding year 1982). Options: (a) Divi 5 Dynamic Content field, (b) tiny Code Module with year calc, or (c) manually update annually.

---

## Issues Found During Reverse-Engineering

| Issue | Severity | Recommendation |
|-------|----------|----------------|
| **Hero SVG illustrations are ~400 lines each** | Medium | Start with Code Module, migrate to Lottie post-launch |
| **Client logos are all placeholders** | High | Peter needs to provide 6-8 real client logos before Divi build |
| **44 → hardcoded in some places, dynamic in others** | Low | Use Divi 5 Design Variable or Dynamic Content for the year number everywhere |
| **Check cards 4-5 are outside the grid div** | Bug | HTML nesting error in static build — cards 4-5 sit outside `.dw-checks-grid`. Fix in Divi build. |
| **No `<h2>` on logo section** | A11y | Add a visually hidden H2 for screen readers |
| **Old ContentSpec 1.0 is completely outdated** | Info | The Feb 4 draft had different headlines, different sections, "Request a Demo" CTA (violation). This 2.0 spec supersedes it entirely. |

---

## Validation Checklist (Divi 5 Build)

- [ ] Split-screen hero renders at 100vh minus header on desktop
- [ ] Hero stacks vertically on tablet/mobile
- [ ] Factory SVG illustration animations play smoothly
- [ ] Partner SVG illustration animations play smoothly
- [ ] Grain texture visible but subtle on dark panels
- [ ] Client logo strip scrolls or displays responsively
- [ ] All 5 factory check cards render in correct grid
- [ ] All 3 partner check cards render in correct grid (dark theme)
- [ ] 4 product pillar cards link to correct product pages
- [ ] Industry tabs switch between 3 industries
- [ ] Industry tab content shows image + text side by side on desktop
- [ ] SVG industry illustrations render inside tabs
- [ ] Stats counter animates on scroll
- [ ] All 5 trust cards render (2+2+1 layout)
- [ ] BOI card links to correct blog article
- [ ] CTA says "Talk to Our Team" (NOT "Request a Demo")
- [ ] CTA says "Explore Partnership" (NOT "Become a Partner / Book a Demo")
- [ ] All internal links point to pages that exist
- [ ] Dynamic year shows correct value (2026 - 1982 = 44)
- [ ] Page loads under 3 seconds on 4G connection
- [ ] No horizontal scroll on any breakpoint
- [ ] Hover effects work on all card types
- [ ] Colors match Design Variables exactly
- [ ] Fonts load: Noto Sans, Noto Sans, JetBrains Mono

---

## Open Questions for Peter

1. **Client logos:** Still needed — do you have 6-8 logos ready for the Divi build?
2. **SVG illustrations:** Keep the complex animated SVGs or replace with simpler static images/Lottie for easier Divi maintenance?
3. **Industry tab images:** The current SVGs are 200-300 lines each. Acceptable in Code Modules, or prefer static images?
4. **Dynamic year:** Update manually each year or invest in a tiny dynamic solution?

---

*This spec supersedes `ContentSpec_Home_1.0.md` (Feb 4 draft), which was never approved and diverges significantly from what was built.*
