# Content Spec: MES — sMES & SFT (PRD Section 3.2)

**Batch:** Batch 2
**PRD Reference:** Section 3.2 — MES: sMES & SFT
**Playbook Reference:** Section 3.2 (Leaf Page Arc — Track A), Section 2.2 (Track A voice), Section 4.1 (Factory Owner Objections), Section 6 (CTA hierarchy)
**Status:** v1.2 — Intelligence integrated: 3-tier comparison, any-ERP proof, named reports, official stats
**Last Updated:** February 13, 2026

---

## Page Overview

**Audience:** Factory operators struggling with production visibility — production managers, plant managers, operations directors
**Objective:** "Stop guessing, start seeing" — sell real-time shop floor visibility
**URL:** digiwin.co.th/products/mes.html
**Emotional Arc:** Leaf Page Arc Track A (Playbook 3.2) — Pain Validation → Relief/Solution → Proof → Gentle Nudge

---

## Section 1: Hero

**Purpose:** Production pain — the blindness of not knowing what's happening on the floor

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column grid. Left = content, Right = MES dashboard mockup (hidden on tablet/mobile) |
| **Background** | Dark gradient: `linear-gradient(165deg, #0f1419 0%, #1a2632 40%, #000864 100%)` with grain overlay |
| **Padding** | 160px top, 100px bottom |

| Element | Content |
|---------|---------|
| **Badge** | `Manufacturing Execution System` (with pulsing green dot) |
| **Headline** | `Stop Guessing. Start Seeing.` |
| **Subtitle** | `Real-time visibility into every workstation, every work order, every minute. Know exactly what's happening on your shop floor—as it happens.` |
| **Primary CTA** | `Let's Talk` → `{{basePath}}demo.html` (white button) |
| **Secondary CTA** | `Find Your Fit` → `#compare` (outline white, anchor link) |

### Hero Stats

| # | Value | Label |
|---|-------|-------|
| 1 | `44` (dw-years dynamic) | Years in Mfg |
| 2 | `50K+` | Factories |
| 3 | `100+` | Thai Sites |

### Hero Dashboard Mockup (right column)

MES-specific mockup with:
- 3 traffic light dots
- Status bar: OEE `87%` (green), Units Today `1,247`, Alerts `3` (yellow)
- Timeline bar chart with 7 bars, one highlighted as "active"

---

## Section 2: Before/After Transformation

**Purpose:** Visual impact — contrast the chaos of no MES vs. clarity with MES

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column grid with arrow divider between columns |
| **Background** | Light gray (#F5F7FA) |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section title** | `The Transformation` |
| **Section subtitle** | `From shop floor chaos to real-time clarity` |

### Before/After Grid

| # | Before MES | With DigiWin MES |
|---|-----------|------------------|
| 1 | **"Where's that order?"** — Walk the floor, ask around, hope someone knows. Hours to find answers. | **Order location in one click** — Which station, what operation, estimated completion—instant answers. |
| 2 | **Yesterday's data** — Production reports arrive after problems already happened. Always reacting. | **Real-time dashboards** — Live production rates, quality alerts, downtime notifications. Prevent problems. |
| 3 | **Traceability panic** — Quality issue? Days of paper-digging to find which batch, which lot, which operator. | **Complete traceability** — Full genealogy from receiving to shipping. One click shows everything. |
| 4 | **OEE guesswork** — Downtime tracking on whiteboards. No one trusts the numbers. | **Accurate OEE** — Automatic calculation from machine data. Real numbers you can trust. |

---

## Section 3: Two Products Comparison

**Purpose:** Clear segmentation between sMES (full MES) and SFT (lightweight tracking)

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column grid |
| **Background** | White (#ffffff) |
| **Padding** | 100px top/bottom |
| **ID** | `#compare` (anchor target for hero CTA) |

| Element | Content |
|---------|---------|
| **Section title** | `Three Paths to Shop Floor Visibility` |
| **Section subtitle** | `Choose the level that matches your needs and budget. Start anywhere — upgrade anytime.` |

### Product Selection Pyramid (Visual)

**Layout:** Inverted pyramid/funnel graphic above the cards, showing the 3 tiers with budget indicator:
- Top (widest): sMES — Full | High investment
- Middle: SFT — Mid-tier | Mid investment
- Bottom (narrowest): AIoT Cloud — Entry | Low investment

**Style:** Navy gradient bg (#000864), tiers in ascending opacity. Arrow indicator: "Start here, grow up."

### Product Cards (3-Column Grid)

| Element | sMES | SFT | AIoT Cloud |
|---------|------|-----|------------|
| **Badge** | `Full MES` | `Mid-Tier` | `Entry Level` |
| **Name** | `sMES` | `SFT` | `AIoT Cloud` |
| **Tagline** | Complete manufacturing execution with routing enforcement | Shop floor tracking without MES complexity | Production visibility on a subscription |
| **Description** | Full MES capability including work order management, routing enforcement, quality data collection, and real-time performance dashboards. | Lightweight tracking for factories that want visibility without full MES complexity. Barcode-based, fast to implement, easy to use. | Cloud-based production monitoring with mobile apps. See equipment data and production status with minimal IT infrastructure. |
| **Control Points** | Production status, sub-con, lot tracking, material checking, QC, machine maintenance | Production status, sub-con, lot tracking, factory plant info | Production status, equipment data |
| **Features** | Work order dispatch and real-time tracking, Routing enforcement with operation validation, Quality data collection with SPC integration, Real-time OEE calculation per machine/line, Full lot and serial traceability, Mobile workstation interface | Production quantity reporting, Labor time tracking by operation, Downtime reason recording, Basic lot traceability, Simple barcode scanning interface, Rapid deployment (days, not months) | Real-time equipment monitoring, Production status dashboard, Mobile app access, Subscription pricing (no upfront), Cloud deployment (no servers) |
| **Best For** | Complex manufacturing with multiple operations, automotive/electronics with traceability requirements, factories with government grants or existing ERP | Factories already using SCADA, fast-growing companies, rapid visibility improvement without disruption | Low initial investment, simple equipment monitoring, factories testing digitization before committing |
| **Built-in Reports** | OEE Analysis, Yield Rate, NG Reasons, Production Daily Report, Machine Utilization, KPI Tracking (10 total) | Visual Management Kanban, Production Dashboard, Process Status Board, OEE Analysis, Defect Reasons Analysis (6 dashboards) | Basic production reports, equipment alerts |

### Any-ERP Compatibility Callout (Below sMES Card)

**Purpose:** Supports the "Reverse Cut" strategy — enter with MES alongside any existing ERP.

| Element | Specification |
|---------|---------------|
| **Layout** | Callout box with plug/connector icon |
| **Background** | Light blue-tinted (#f0f9ff), 1px border #00AFF0, 12px radius |
| **Icon** | Plug connector (SVG, #00AFF0) |
| **Title** | `Already Have an ERP?` |
| **Body** | `sMES connects to any ERP system through standard web services. See your shop floor clearly without changing your existing ERP. When you're ready to upgrade, we're here.` |

**Source:** Official site QAD integration diagram proves sMES works with non-DigiWin ERPs.

### Operator Day-in-the-Life (Visual Strip)

**Purpose:** Makes MES tangible for production managers who think in workflows, not system architecture.

| Element | Specification |
|---------|---------------|
| **Layout** | Horizontal step strip below the 3-column comparison |
| **Background** | White (#fff), thin top border #e2e8f0 |
| **Style** | 9 connected step circles with labels, left-to-right flow. Active steps highlighted in #00AFF0. |

**Workflow Steps:**
`Clock In` → `Material Check` → `First QC` → `Start Production` → `In-Process QC` → `Complete Operation` → `Stock In` → `Report` → `Clock Out`

**Caption:** *"Every step captured. Every scan recorded. Every minute accounted for."*

---

## Section 4: Capabilities Grid

**Purpose:** Real-time visibility into every aspect of production (8 capabilities)

| Element | Specification |
|---------|---------------|
| **Layout** | 4-column grid (responsive to 2-column) |
| **Background** | Light gray (#F5F7FA) |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section title** | `What You Can See—Right Now` |
| **Section subtitle** | `Real-time visibility into every aspect of production` |

### Capability Cards

| # | Title | Description |
|---|-------|-------------|
| 1 | Order Location | Which workstation? What operation? How long until complete? |
| 2 | Production Rate | Units per hour vs. target. By line, product, shift. |
| 3 | Quality Issues | Defects as they happen. By type, station, operator. |
| 4 | Downtime | What's stopped? Why? For how long? Trends over time. |
| 5 | Labor Efficiency | Actual vs. standard time. By operator, by operation. |
| 6 | Material Usage | What's being consumed? Variance from standard? |
| 7 | OEE Metrics | Availability, performance, quality—calculated automatically. |
| 8 | Traceability | Full genealogy. Lot, serial, components, operators. |

---

## Section 5: Integration

**Purpose:** Show MES as the bridge between planning (ERP) and execution (floor)

| Element | Specification |
|---------|---------------|
| **Layout** | Horizontal flow: ERP ↔ MES (active) ↔ WMS ↔ AIoT |
| **Background** | `linear-gradient(180deg, #F5F7FA 0%, #fff 100%)` |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section title** | `Connected to Everything` |
| **Section subtitle** | `MES is the bridge between planning and execution` |
| **Integration message** | `Work orders flow from ERP to MES automatically. Material consumption updates inventory in real time. Machine data from AIoT feeds OEE calculations.` **`One integrated system. Zero manual reconciliation.`** |

### Integration Links

| Link | Target |
|------|--------|
| Explore ERP → | `erp.html` |
| Explore WMS → | `wms.html` |
| Explore AIoT → | `aiot.html` |

---

## Section 6: Results / Measured Impact

**Purpose:** Proof of outcomes with specific metrics

| Element | Specification |
|---------|---------------|
| **Layout** | 4-column grid of stat cards |
| **Background** | White or dark section (varies by implementation) |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section label** | `Measured Impact` |
| **Section title** | `What Our Customers Achieve` |

### Result Cards — sMES Row

| # | Value | Label | Attribution |
|---|-------|-------|-------------|
| 1 | `-45%` | Production Cycle Time | Industry statistics (official site) |
| 2 | `-70%` | Quality Failures | Industry statistics (official site) |
| 3 | `+26%` | Efficiency Increase | Industry statistics (official site) |

### Result Cards — SFT Row

| # | Value | Label | Attribution |
|---|-------|-------|-------------|
| 1 | `92%` | Production Transparency | Typical results (official site) |
| 2 | `86%` | Order Delivery Speed | Typical results (official site) |
| 3 | `2-4 Weeks` | Implementation Time | DigiWin verified |

### Shared Result

| # | Value | Label |
|---|-------|-------|
| 1 | `76%` | Customer Satisfaction Improvement (SFT users) |

**Design:** Two horizontal rows of stat cards, each labeled with the product name (sMES / SFT). Row divider with product badge. This dual-row format reinforces the product segmentation from Section 3.

**Attribution note:** sMES stats are cited as "industry statistics" on the official DigiWin site. SFT stats have no attribution on the official site — we use "typical results" qualifier. Previous v1.1 soft claims (+23% OEE, -40% downtime) have been replaced as they were unsourced.

---

## Section 7: CTA

**Purpose:** Convert visitors to contact

| Element | Specification |
|---------|---------------|
| **Layout** | Centered text with button row |
| **Background** | Green gradient (MES brand color) or blue gradient |
| **Padding** | 120px top/bottom |

| Element | Content |
|---------|---------|
| **Title** | `Ready to See Your Shop Floor Clearly?` |
| **Subtitle** | `Fill out the form and our team will reach out to discuss your specific production visibility challenges.` |
| **Primary CTA** | `Get in Touch` → `{{basePath}}demo.html` (white button) |
| **Secondary CTA** | `View by Industry` → `{{basePath}}industries.html` (outline white button) |

---

## Responsive Behavior

| Breakpoint | Changes |
|-----------|---------|
| **<= 1024px** | Hero: single column, centered. Dashboard mockup: hidden. Product comparison & capabilities: responsive reflow. Integration: vertical flow. |
| **<= 640px** | Hero: reduced padding. Stats: vertical column. Before/after: stacked vertically. |

---

## Flags & Notes

1. **PRD ALIGNMENT — GOOD**: Headline "Stop Guessing. Start Seeing." matches PRD Section 3.2 exactly. Before/After visual matches PRD requirement.
2. **PRD ALIGNMENT — EXCEEDS**: Page has 7 sections vs PRD's 3. Additions: Capabilities grid, Integration, Results metrics. These follow Playbook proof escalation pattern.
3. **STATS — RESOLVED v1.2**: Previous soft claims (+23% OEE, -40% downtime, 90% traceability) replaced with official site stats. sMES: -45% cycle time, -70% quality failures, +26% efficiency (attributed to "industry statistics"). SFT: 92% transparency, 86% delivery speed (attributed as "typical results").
4. **CTA COMPLIANCE**: "Let's Talk" and "Get in Touch" — fully compliant. No "demo" language.
5. **PRD NOTE**: PRD says CTA should be "See MES in Action" — the built page uses "Get in Touch" instead. Both are acceptable under PRD CTA rules, but "Get in Touch" is more compliant with the business constraint (no demos).
6. **INLINE CSS**: ~789 lines of inline CSS. Before/After section, product boxes, and results section styles could potentially be extracted.
7. **THREE-TIER COMPARISON — INTEGRATED v1.2**: Section 3 expanded from 2-column to 3-column. AIoT Cloud added as entry tier. Selection pyramid visual specified. Hero CTA updated to "Find Your Fit."
8. **ANY-ERP COMPATIBILITY — INTEGRATED v1.2**: Callout box spec added below sMES card. Supports "Reverse Cut" strategy without naming specific competitor ERPs.
9. **NAMED REPORTS — INTEGRATED v1.2**: 10 sMES reports and 6 SFT dashboards now listed in product card "Built-in Reports" row.
10. **OFFICIAL SITE STATS — INTEGRATED v1.2**: Section 6 restructured with product-specific stat rows. Soft claims replaced. Attribution noted.
11. **SFT MANAGEMENT KANBANS — INTEGRATED v1.2**: 6 named dashboards included in SFT product card.
12. **5M FRAMEWORK**: Not integrated — reserved as optional organizing principle for Divi 5 build. Thai factory managers will recognize it but it doesn't warrant a separate section.
13. **[NEW v1.2] OPERATOR WORKFLOW**: Day-in-the-life visual strip added below comparison section. 9-step flow from Clock In to Clock Out.
