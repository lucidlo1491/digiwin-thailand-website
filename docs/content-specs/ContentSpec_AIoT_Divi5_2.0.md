# Content Spec: AIoT Smart Factory Platform — Divi 5 Build (2.0)

**Batch:** 2 (Product Pages)
**PRD Reference:** Section 3.4 — AIoT & Smart Factory
**Playbook Reference:** Section 3.2 (Leaf Page Arc — Track A), Section 2.2 (Track A voice), Section 4.1 (Factory Owner Objections), Section 6 (CTA hierarchy)
**Status:** v2.0 — Reverse-engineered from HTML build + mapped to Divi 5 modules
**Last Updated:** February 14, 2026
**Platform:** WordPress + Divi 5

---

## Page Overview

| Element | Specification |
|---------|---------------|
| **Audience** | Factory operators seeking machine visibility — plant managers, maintenance managers, operations directors, continuous improvement leads |
| **Objective** | Convince factories that machine data is accessible and actionable — no machine replacement needed |
| **URL** | digiwin.co.th/products/aiot.html |
| **Emotional Arc** | Leaf Page Arc Track A (Playbook 3.2) — Pain Validation → Relief/Solution → Proof → Gentle Nudge |
| **Page Structure** | 11 sections: Hero → GEO Explainer → Problem Cards → Data Flow → Capabilities → Metrics → Protocol Tags → Integration → FAQ → CTA + Related Solutions |
| **Key Claims** | 50+ protocols supported, 1M+ data points/day, <1s real-time response, 15% OEE improvement, 40% downtime reduction, 12% energy savings |

---

## Divi 5 Capabilities Leveraged

| Divi 5 Feature | Where Used | Why |
|----------------|-----------|-----|
| **CSS Grid Layout** | Hero 2-col, Problem cards 4-col, Capabilities 2-col, Metrics 4-col | Native responsive grids without custom CSS |
| **Group Module** | Problem cards, Data flow stages, Capability cards, Metric cards, Integration nodes, Protocol tags | Card-style containers with shared background, border, hover effects |
| **Nested Modules** | Capability cards (icon + title + desc + feature grid), Data flow stages (number + title + desc + tag items) | Complex card internal layouts without Code Modules |
| **Design Variables** | Colors, fonts, spacing | Global tokens — change once, updates everywhere |
| **Interactions System** | Card hovers, scroll reveals, data flow arrow animations | Built-in scroll-triggered animations and hover transforms replace custom JS |
| **Number Counter** | Hero stats (50+, 1M+), Metrics values (+15%, -40%, -12%, 100%) | Animated count-up on scroll |
| **Accordion Module** | FAQ section | Native expand/collapse pattern |
| **Code Module** | Hero sensor dashboard, Section scene SVGs, Protocol tag grid, Super D backgrounds | Complex visual elements that Divi modules cannot replicate |
| **Semantic Elements** | Every section | `<section>`, `<main>` tags for SEO and accessibility |
| **Customizable Breakpoints** | All sections | 7 breakpoints replace manual media queries |

---

## Design Variables (Reference Homepage Spec)

All Design Variables are defined globally in the Homepage Divi 5 spec (ContentSpec_Home_Divi5_2.0.md). This page uses the same set:

### Colors
| Variable Name | Value | Usage on This Page |
|--------------|-------|-----|
| `--dw-primary-blue` | #00AFF0 | CTAs, stat values, capability icons, data flow accents, active states |
| `--dw-dark-navy` | #000864 | Hero background, section titles, metrics section bg, integration nodes |
| `--dw-navy-deep` | #000432 | Hero gradient start, metrics gradient end |
| `--dw-navy-mid` | #001080 | Hero gradient end |
| `--dw-royal` | #003CC8 | Icon gradient secondary, capability hover states |
| `--dw-light-gray` | #F5F7FA | Alternating section backgrounds (Data Flow, Protocol, Related) |
| `--dw-text-dark` | #333333 | Body text |
| `--dw-text-light` | #64748b | Secondary text, descriptions |
| `--dw-white` | #FFFFFF | Card backgrounds, hero text |

### Additional Page-Specific Colors
| Color | Value | Usage |
|-------|-------|-------|
| Problem Red | #b91c1c / #fecaca / #fef2f2 / #fee2e2 | Problem card backgrounds, borders, text, icon strokes |
| Status Green | #22c55e | Running status, live badge, pulsing dot |
| Warning Amber | #fbbf24 | Warning sensor tile, idle status |
| Alert Red | #ef4444 | Alert sensor tile, offline status |
| Sensor Blue | #7EC8F2 | Dashboard title, sensor icons, hero badge text |

### Fonts & Spacing
Same as Homepage spec: Noto Sans (headings/body), JetBrains Mono (labels/badges), 100px section padding, 20px card radius, 24-32px card gap.

---

## Section 1: Hero — The Connected Network

**Purpose:** Establish the core insight — your machines already generate the data you need, you just cannot hear it. The sensor dashboard mockup makes this tangible.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(135deg, #000432 0%, #000864 50%, #001080 100%)`, padding: 140px top 100px bottom, overflow: hidden |
| **Cross Pattern Overlay** | Code Module | SVG cross pattern at opacity 0.5 — represents data connection nodes |
| **Super D Background** | Code Module | `dw-d-bg--center dw-d-bg--particle` parallax at opacity 0.12 — the intelligence hub |
| **Layout** | Row with CSS Grid | `grid-template-columns: 1fr 1fr`, gap: 60px, align-items: center |
| **Left Column** | Column | Content block, text-align: left |
| **Right Column** | Column | Sensor dashboard visual, center-aligned |

### Left Column: Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Badge** | Text Module | `Industrial Intelligence Platform` — JetBrains Mono, 11px, uppercase, 0.1em spacing, pill shape (rgba(0,175,240,0.2) bg, rgba(0,175,240,0.3) border, border-radius: 50px), color: #7EC8F2 |
| **Headline** | Text Module (H1) | `Your Machines` **`Know Everything.`** `But Can You Hear Them?` — Noto Sans 700, 52px, white, line-height: 1.15. "Know Everything." in #00AFF0 (Divi inline text color). Line break before "But Can You Hear Them?" |
| **Subtitle** | Text Module | `Every machine generates thousands of data points daily. DigiWin AIoT captures, analyzes, and transforms this data into competitive advantage.` — Noto Sans, 20px, rgba(255,255,255,0.85), line-height: 1.6, max-width: 700px |
| **Stats Row** | Group Module (Flexbox) | gap: 60px, margin-top: 50px, center-aligned on text-align |

#### Hero Stats

| Stat | Value | Label | Module |
|------|-------|-------|--------|
| 1 | `50+` | Protocols Supported | Number Counter or Text Module |
| 2 | `1M+` | Data Points/Day | Text Module (not pure number) |
| 3 | `< 1s` | Real-Time Response | Text Module (not pure number) |

Value styling: Noto Sans 700, 42px, #00AFF0. Label styling: JetBrains Mono, 10px, rgba(255,255,255,0.75), uppercase, 0.1em spacing.

> **Note:** No CTA buttons in hero. The hero relies on the stats and the sensor dashboard visual to create intrigue. The CTA comes at the bottom of the page. This is intentional — the page uses a "show, don't push" approach for a technical product.

### Right Column: Sensor Dashboard Mockup

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Dashboard Container** | Code Module | Full HTML/CSS for the sensor dashboard — glassmorphic card with backdrop-filter: blur(8px), rgba(255,255,255,0.08) bg, 1px solid rgba(255,255,255,0.15), border-radius: 16px, max-width: 480px |

#### Dashboard Internal Structure

| Component | Content |
|-----------|---------|
| **Header** | "Live Sensor Data" label + pulsing green "Live" badge |
| **Sensor Grid** (2x2) | Temperature: 78.4°C (normal), Vibration: 2.4 mm/s (warning/amber), Power Draw: 47.2 kW (normal), RPM: 1,847 (normal) |
| **Machine List** (3 rows) | CNC-M01: Running (green), CNC-M02: Idle (amber), CNC-M03: Running (green) |

> **Divi 5 Note:** The entire dashboard is a single Code Module. The pulsing green dot uses `@keyframes pulse-dot` CSS animation. This is a decorative/illustrative element — not interactive data. Mark sensor SVGs with `aria-hidden="true"`.

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (>1024px)** | 2-column grid, dashboard visible |
| **Tablet (<=1024px)** | 1 column, dashboard below content (max-width: 400px, centered), H1: 40px, stats gap: 40px |
| **Mobile (<=640px)** | Padding: 120px top 80px bottom, H1: 32px, subtitle: 17px, stats stack vertically (gap: 24px), stat values: 36px |

---

## Section 2: GEO Explainer — What is AIoT?

**Purpose:** GEO (Generative Engine Optimization) section. Plain-language explanation of AIoT for AI search engines and first-time readers. Critically important because AIoT is not a widely understood term in Thailand.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Padding: 40px top 0 bottom, text-align: center |
| **Inner** | Row | Max-width: 800px, centered |
| **Heading** | Text Module (H2) | `What is AIoT (Artificial Intelligence + Internet of Things)?` — Noto Sans 700, 22px, #000864 |
| **Paragraph 1** | Text Module | Generic AIoT definition |
| **Paragraph 2** | Text Module | DigiWin-specific positioning |

### Exact Content

**Paragraph 1:** `AIoT is technology that connects factory machines and sensors to collect real-time production data, then applies AI analytics to predict maintenance needs and optimize efficiency. It turns raw machine signals into actionable intelligence — letting you prevent breakdowns before they happen instead of reacting after the fact.`

**Paragraph 2:** `DigiWin AIoT is an industrial IoT platform that connects any machine, any protocol, to a unified data layer. Supporting 50+ industrial protocols — including OPC-UA, Modbus, MQTT, Fanuc, Siemens, and Mitsubishi — it captures over 1 million data points per day from CNC machines, PLCs, sensors, and energy meters. The platform enables real-time OEE monitoring, predictive maintenance, energy management, and environmental tracking, delivering an average 15% OEE improvement and 40% reduction in unplanned downtime for Thai factories.`

> **Important Note:** "Mitsubishi MELSEC" is a legitimate PLC communication protocol name (Mitsubishi Electric's proprietary protocol for their MELSEC series PLCs). It is NOT a client reference. It correctly appears alongside other protocol names like "Siemens S7" and "FANUC FOCAS" throughout this page.

---

## Section 3: Problem Cards — Most Factories Are Flying Blind

**Purpose:** Pain validation for factory operators who know something is wrong but cannot articulate it. Four specific blindness problems that resonate.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #ffffff, padding: 100px top/bottom |
| **Section Scene** | Code Module | Background SVG illustration (disconnected machines, broken data lines, "NO DATA" screen, question marks) at low opacity — decorative, aria-hidden |
| **Header** | Group Module | Center-aligned: section title + subtitle, z-index: 2 |
| **Cards Grid** | Row with CSS Grid | `grid-template-columns: repeat(4, 1fr)`, gap: 24px, z-index: 2 |
| **Each Card** | Group Module | Background: `linear-gradient(145deg, #fef2f2, #fee2e2)`, border: 1px solid #fecaca, border-radius: 16px, padding: 32px 24px, text-align: center, hover: box-shadow 0 12px 32px rgba(185,28,28,0.1), icon bg changes to blue gradient + white icon stroke |

### Section Header

| Element | Content |
|---------|---------|
| **Title** | `Most Factories Are Flying Blind` — Noto Sans 700, 36px, #000864 |
| **Subtitle** | `Your machines talk. But without the right ears, you're missing critical intelligence.` — 18px, #5b6b80 |

### Problem Cards (4 total)

Each card contains (nested inside Group Module):

| Element | Divi 5 Module | Styling |
|---------|--------------|---------|
| **Icon** | Code Module (inline SVG) | 56x56px container, `linear-gradient(135deg, #fee2e2, #fecaca)` bg, border-radius: 14px, SVG: 28px, stroke: #b91c1c. On card hover: bg changes to `linear-gradient(135deg, --dw-blue, --dw-royal)`, stroke: white |
| **Title** | Text Module (H3) | Noto Sans 600, 18px, #991b1b |
| **Description** | Text Module | 14px, #b91c1c, line-height: 1.6 |

#### Card 1: Silent Machines

| Element | Content |
|---------|---------|
| **Title** | `Silent Machines` |
| **Description** | `Machines run without reporting. Problems only surface after breakdowns.` |

#### Card 2: Reactive Maintenance

| Element | Content |
|---------|---------|
| **Title** | `Reactive Maintenance` |
| **Description** | `Fix it when it breaks. Unplanned downtime costs 10x more than scheduled maintenance.` |

#### Card 3: Manual OEE

| Element | Content |
|---------|---------|
| **Title** | `Manual OEE` |
| **Description** | `Staff tracking production on clipboards. Data is late, inaccurate, or simply not collected.` |

#### Card 4: Hidden Energy Waste

| Element | Content |
|---------|---------|
| **Title** | `Hidden Energy Waste` |
| **Description** | `No visibility into which machines consume what. Energy costs spike unexplained.` |

### Responsive Breakpoints

| Breakpoint | Grid Columns |
|-----------|-------------|
| Desktop (>1024px) | 4 columns |
| Tablet (<=1024px) | 2 columns |
| Mobile (<=640px) | 1 column |

---

## Section 4: Data Flow — How DigiWin AIoT Works

**Purpose:** Demystify the technology. Four-stage pipeline from machine signal to actionable intelligence. Makes the abstract concrete.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #F5F7FA, padding: 100px top/bottom |
| **Header** | Group Module | Center-aligned: title + subtitle |
| **Stages Container** | Row (Flexbox) | Horizontal row, justify-content: space-between, gap: 20px, align-items: stretch |
| **Each Stage** | Group Module | Background: white, border-radius: 16px, padding: 32px 24px, text-align: center, box-shadow: 0 4px 20px rgba(0,0,0,0.06), flex: 1 |
| **Arrow Between Stages** | Code Module | CSS `::after` pseudo-element on non-last stages: 24x24px blue triangle (clip-path) pointing right, positioned at center-right. Hidden on tablet/mobile. |

### Section Header

| Element | Content |
|---------|---------|
| **Title** | `How DigiWin AIoT Works` — Noto Sans 700, 36px, #000864 |
| **Subtitle** | `From machine signal to actionable intelligence in real-time` — 18px, #5b6b80 |

### Data Flow Stages (4 total)

Each stage contains (nested inside Group Module):

| Element | Divi 5 Module | Styling |
|---------|--------------|---------|
| **Number Circle** | Code Module or Text Module | 40x40px, `linear-gradient(135deg, #00AFF0, #003CC8)` bg, white text, border-radius: 50%, Noto Sans 600 18px, centered |
| **Title** | Text Module (H3) | Noto Sans 600, 18px, #000864 |
| **Description** | Text Module | 14px, #5b6b80, line-height: 1.5 |
| **Tag Items** | Group Module (Flexbox wrap) | Pill-shaped tags, center-justified, gap: 8px, margin-top: 16px |

Each tag: #F5F7FA bg, padding: 6px 12px, border-radius: 20px, 12px text, #475569 color.

#### Stage 1: Connect

| Element | Content |
|---------|---------|
| **Number** | `1` |
| **Title** | `Connect` |
| **Description** | `Edge devices collect data from any machine, any brand, any age` |
| **Tags** | PLCs, CNCs, Sensors, Meters |

#### Stage 2: Translate

| Element | Content |
|---------|---------|
| **Number** | `2` |
| **Title** | `Translate` |
| **Description** | `Universal protocol support turns signals into standardized data` |
| **Tags** | OPC-UA, Modbus, MQTT, MT Connect |

#### Stage 3: Analyze

| Element | Content |
|---------|---------|
| **Number** | `3` |
| **Title** | `Analyze` |
| **Description** | `AI models detect patterns, predict failures, optimize performance` |
| **Tags** | OEE, Anomaly, Trends, Alerts |

#### Stage 4: Act

| Element | Content |
|---------|---------|
| **Number** | `4` |
| **Title** | `Act` |
| **Description** | `Dashboards, alerts, and integrations drive immediate action` |
| **Tags** | ERP, MES, Mobile, Andon |

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | 4 columns in a row with arrows between stages |
| Tablet (<=1024px) | Stages wrap (flex-wrap), arrows hidden |
| Mobile (<=640px) | Stages stack vertically (flex-direction: column) |

---

## Section 5: Capabilities — Smart Factory Capabilities

**Purpose:** Four capability pillars that map directly to the problems named in Section 3. Each card demonstrates depth with feature checklists.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #ffffff, padding: 100px top/bottom |
| **Header** | Group Module | Center-aligned: title + subtitle, max-width: 700px |
| **Cards Grid** | Row with CSS Grid | `grid-template-columns: repeat(2, 1fr)`, gap: 32px, max-width: 1000px, centered |
| **Each Card** | Group Module | Background: white, border: 1px solid #e2e8f0, border-radius: 20px, padding: 40px, hover: border-color #00AFF0 + box-shadow 0 12px 40px rgba(0,175,240,0.15) + icon bg changes to gradient |

### Section Header

| Element | Content |
|---------|---------|
| **Title** | `Smart Factory Capabilities` — Noto Sans 700, 36px, #000864 |
| **Subtitle** | `Complete visibility from machine signal to business insight` |

### Capability Cards (4 total)

Each card internal layout (nested inside Group Module):

| Element | Divi 5 Module | Styling |
|---------|--------------|---------|
| **Icon** | Code Module (inline SVG) | 64x64px container, `linear-gradient(135deg, rgba(0,175,240,0.15), rgba(0,175,240,0.05))` bg, border-radius: 16px, SVG: 32px stroke #00AFF0. On card hover: bg changes to `linear-gradient(135deg, #00AFF0, #003CC8)`, stroke white |
| **Title** | Text Module (H3) | Noto Sans 600, 22px, #000864 |
| **Description** | Text Module | 15px, #5b6b80, line-height: 1.6, margin-bottom: 24px |
| **Feature Grid** | Row with CSS Grid | `grid-template-columns: 1fr 1fr`, gap: 12px |
| **Each Feature** | Group Module (Flexbox row) | Checkmark SVG (16px, #0369a1) + Text (14px, #475569), gap: 8px |

#### Card 1: Universal Machine Connectivity

| Element | Content |
|---------|---------|
| **Title** | `Universal Machine Connectivity` |
| **Description** | `Connect any machine, any protocol, any age. Our edge devices speak every language your factory uses.` |
| **Features** | PLC integration, CNC/SMT machines, Sensor networks, Legacy equipment |

#### Card 2: Real-Time OEE

| Element | Content |
|---------|---------|
| **Title** | `Real-Time OEE` |
| **Description** | `Automatic OEE calculation from machine signals. See availability, performance, and quality without manual input.` |
| **Features** | Auto downtime tracking, Cycle time analysis, Quality correlation, Shift comparisons |

#### Card 3: Predictive Maintenance

| Element | Content |
|---------|---------|
| **Title** | `Predictive Maintenance` |
| **Description** | `AI models learn your machine behavior and predict failures before they happen. Fix it before it breaks.` |
| **Features** | Vibration analysis, Temperature trending, Anomaly detection, Auto work orders |

#### Card 4: Energy Management

| Element | Content |
|---------|---------|
| **Title** | `Energy Management` |
| **Description** | `Monitor consumption by machine, line, and product. Identify waste, optimize costs, meet sustainability targets.` |
| **Features** | Real-time monitoring, Cost per unit, Peak demand alerts, Carbon footprint |

### Responsive Breakpoints

| Breakpoint | Grid Columns |
|-----------|-------------|
| Desktop (>1024px) | 2 columns |
| Tablet (<=1024px) | 1 column |
| Mobile (<=640px) | 1 column, feature grid becomes 1 column |

---

## Section 6: Metrics — Measured Impact

**Purpose:** Hard numbers — the proof section. Dark background creates visual weight and authority for the claims.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: `linear-gradient(135deg, #000864 0%, #000432 100%)`, padding: 100px top/bottom, `data-particles="bold"` for particle wave enhancement |
| **Header** | Group Module | Center-aligned: title + subtitle, white text |
| **Metrics Grid** | Row with CSS Grid | `grid-template-columns: repeat(4, 1fr)`, gap: 24px, max-width: 1100px, centered |
| **Each Metric Card** | Group Module | Background: rgba(255,255,255,0.05), border: 1px solid rgba(255,255,255,0.1), border-radius: 16px, padding: 32px 24px, text-align: center |

### Section Header

| Element | Content |
|---------|---------|
| **Title** | `Measured Impact` — Noto Sans 700, 36px, white |
| **Subtitle** | `What our customers achieve with AIoT implementation` — 18px, rgba(255,255,255,0.75) |

### Metric Cards (4 total)

| Stat | Value | Label | Module |
|------|-------|-------|--------|
| 1 | `+15%` | OEE Improvement | Number Counter (48px, 700 weight, #00AFF0) |
| 2 | `-40%` | Unplanned Downtime | Number Counter |
| 3 | `-12%` | Energy Costs | Number Counter |
| 4 | `100%` | Data Accuracy | Number Counter |

Value styling: Noto Sans 700, 48px, #00AFF0, line-height: 1. Label styling: 15px, rgba(255,255,255,0.8), margin-top: 12px, line-height: 1.4.

### Responsive Breakpoints

| Breakpoint | Grid Columns |
|-----------|-------------|
| Desktop (>1024px) | 4 columns |
| Tablet (<=1024px) | 2 columns |
| Mobile (<=640px) | 1 column |

---

## Section 7: Protocol Tags — Supported Protocols & Equipment

**Purpose:** Technical credibility. The protocol list proves DigiWin AIoT can connect to any equipment — this is a key objection handler for factories with diverse machine fleets.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #ffffff, padding: 80px top/bottom |
| **Super D Background** | Code Module | `dw-d-bg--corner-tl` subtle at opacity 0.10 — AI intelligence overseeing the protocol landscape |
| **Inner** | Row | Max-width: 1000px, centered, text-align: center |
| **Heading** | Text Module (H3) | `Supported Protocols & Equipment` — Noto Sans 600, 24px, #000864 |
| **Protocol Grid** | Group Module (Flexbox wrap) | Flex-wrap: wrap, justify-content: center, gap: 16px |
| **Each Tag** | Text Module or Group Module | #F5F7FA bg, 1px solid #e2e8f0, padding: 12px 24px, border-radius: 8px, Noto Sans 500 15px #475569 |

### Protocol Tags (12 total)

| Tag |
|-----|
| OPC-UA |
| Modbus TCP/RTU |
| MQTT |
| MT Connect |
| PROFINET |
| EtherNet/IP |
| Siemens S7 |
| Mitsubishi MELSEC |
| FANUC FOCAS |
| Allen-Bradley |
| Omron FINS |
| BACnet |

> **Important Note:** "Mitsubishi MELSEC" is a legitimate PLC communication protocol name (Mitsubishi Electric's MELSEC series), NOT a client name. Similarly, "Siemens S7" is Siemens' S7 PLC protocol, "FANUC FOCAS" is Fanuc's CNC communication protocol, and "Allen-Bradley" refers to Rockwell Automation's PLC communication protocol. All are standard industrial automation protocol names that belong in this list.

---

## Section 8: Integration — The Intelligence Layer

**Purpose:** Position AIoT within the DigiWin ecosystem. AIoT is the machine-level data layer that feeds intelligence to MES, ERP, and WMS.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #F5F7FA, padding: 80px top/bottom |
| **Header** | Group Module | Center-aligned: title + subtitle |
| **Integration Diagram** | Group Module (Flexbox) | Center-aligned row: ERP ↔ MES ↔ AIoT (active) ↔ WMS, gap: 24px, flex-wrap: wrap, max-width: 900px centered |
| **Each Node** | Group Module (linkable for ERP/MES/WMS) | Static white bg, 2px solid #e2e8f0, border-radius: 16px, padding: 24px 32px, text-align: center, hover on non-active: border-color #00AFF0 + translateY(-2px) |
| **Active Node (AIoT)** | Group Module | `linear-gradient(135deg, #00AFF0, #003CC8)` bg, border-color: #00AFF0, white text, icon bg: rgba(255,255,255,0.2) + white icon stroke |
| **Arrow** | Text Module | `↔`, font-weight: 700, font-size: 24px, color: #0369a1 |
| **Message Box** | Group Module | White bg, border-radius: 20px, padding: 40px 48px, box-shadow: 0 8px 40px rgba(0,0,0,0.06), 1px solid #e8eef3, max-width: 800px centered |
| **Links Row** | Group Module (Flexbox) | gap: 16px, justify-content: center, flex-wrap: wrap, margin-top: 40px |
| **Each Link** | Button Module (ghost style) | White bg, 1px solid #e8eef3, border-radius: 12px, #0369a1 text, Noto Sans 600 14px, hover: border-color #00AFF0 + blue tint bg + translateY(-2px) |

### Section Header

| Element | Content |
|---------|---------|
| **Title** | `The Intelligence Layer` — Noto Sans 700, 36px, #000864 |
| **Subtitle** | `AIoT connects your machines to your business systems` — 18px, #5b6b80 |

### Integration Nodes

| Node | Icon | Title | Subtitle | Link | Active? |
|------|------|-------|----------|------|---------|
| 1 | Grid/table SVG | `ERP` | `T100 / iGP` | `/products/erp.html` | No |
| 2 | Factory SVG | `MES` | `MES / SFT` | `/products/mes.html` | No |
| 3 | Sun/sensor SVG | `AIoT` | `Machine Layer` | (current page) | Yes |
| 4 | Cube SVG | `WMS` | `sFLS` | `/products/wms.html` | No |

Node styling: Icon container 48x48px, linear-gradient(135deg, rgba(0,175,240,0.1), rgba(0,175,240,0.05)) bg, border-radius: 12px. Title: Noto Sans 600, 18px, #000864. Subtitle: 13px, #5b6b80. Active node has all text in white.

### Message Box Content

`Machine data flows from sensors to dashboards in real time. AIoT feeds OEE to MES, triggers maintenance in ERP, and validates inventory in WMS.` **`One connected factory. Zero blind spots.`**

### Navigation Links

| Link | Destination |
|------|-------------|
| `Explore ERP →` | `/products/erp.html` |
| `Explore MES →` | `/products/mes.html` |
| `Explore WMS →` | `/products/wms.html` |

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | Horizontal node row |
| Tablet (<=1024px) | Nodes wrap (flex-wrap) |
| Mobile (<=640px) | Nodes stack vertically, arrows rotate 90deg |

---

## Section 9: FAQ — Frequently Asked Questions

**Purpose:** Address remaining objections and provide SEO-rich answers. Structured data (FAQPage schema) already in `<head>`.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #f8fafc, padding: 60px top/bottom |
| **Inner** | Row | Max-width: 800px, centered |
| **Heading** | Text Module (H2) | `Frequently Asked Questions` — Noto Sans 700, 28px, #000864, center-aligned |
| **FAQ Items** | Accordion Module | 5 items, each with summary (question) and detail (answer) |

### FAQ Items

| # | Question | Answer |
|---|----------|--------|
| 1 | What is Industrial AIoT? | Industrial AIoT (Artificial Intelligence of Things) combines IoT sensor connectivity with AI-driven analytics for manufacturing. It connects factory machines, PLCs, and sensors to a unified data platform that monitors equipment health, calculates OEE automatically, predicts failures before they happen, and optimizes energy consumption — turning raw machine data into actionable intelligence. |
| 2 | What machines and protocols does DigiWin AIoT support? | DigiWin AIoT supports 50+ industrial protocols including OPC-UA, Modbus TCP/RTU, MQTT, MT Connect, PROFINET, EtherNet/IP, Siemens S7, Mitsubishi MELSEC, FANUC FOCAS, Allen-Bradley, Omron FINS, and BACnet. It connects to CNC machines, injection molding machines, PLCs, robots, energy meters, and environmental sensors from any brand and any age. |
| 3 | Do I need to replace my existing machines to use AIoT? | No. DigiWin AIoT retrofits onto existing equipment regardless of age or brand. Edge devices connect to machine control interfaces (PLCs, CNCs) or add external sensors (vibration, temperature, power) to machines without digital outputs. Even 20-year-old equipment can be connected without any modification to the machine itself. |
| 4 | How does AIoT connect to ERP and MES? | DigiWin AIoT is built on the same platform as DigiWin ERP and MES, sharing one database. Machine data flows automatically from sensors through AIoT into MES for OEE calculations and into ERP for maintenance work orders and production costing. No middleware, no manual data entry, no integration projects required. |
| 5 | What ROI can I expect from factory AIoT? | DigiWin AIoT customers typically achieve a 15% OEE improvement, 40% reduction in unplanned downtime, and 12% energy cost savings. Most factories see payback within 6-12 months. The immediate wins come from eliminating manual data collection and making machine status visible in real time. |

> **Divi 5 Note:** Use Accordion Module with semantic rendering. Question: Noto Sans 600, 17px, #000864. Answer: Noto Sans, 15px, #333, line-height: 1.7. Expand/collapse icon: `+` / `-`, color #0369a1.

---

## Section 10: CTA — Start Listening to Your Machines

**Purpose:** Final conversion point. Gentle nudge aligned with the "hearing" metaphor established in the hero.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Uses `.cta-section` shared class (dark navy gradient with brand overlays) |
| **Super D Background** | Code Module | `dw-d-bg--bottom dw-d-bg--medium dw-d-glow` — network intelligence rising toward the decision |
| **Wave Flow** | Code Module | Particle wave at opacity 0.36, height 190px — connected network energy driving conversion |
| **Content** | Group Module (z-index: 3) | Center-aligned |
| **Headline** | Text Module (H2) | `Start Listening to Your Machines` — White, large |
| **Subtitle** | Text Module | `See what your factory floor is really doing` — rgba(255,255,255,0.85) |
| **Button Group** | Group Module (Flexbox) | gap: 16px, center |
| **Primary CTA** | Button Module | `Get in Touch` → `/demo.html` — Primary CTA style (NEVER "Request Demo") |
| **Secondary CTA** | Button Module | `Explore All Products` → `/products.html` — Ghost/outline style |

---

## Section 11: Related Solutions (SEO Internal Links)

**Purpose:** Internal linking for SEO and cross-navigation between related product and industry pages.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: --dw-light-gray, padding: 60px 5% |
| **Heading** | Text Module (H2) | `Explore Related Solutions` — Noto Sans 600, 28px, #000864, center |
| **Grid** | Row with CSS Grid | `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`, gap: 24px |
| **Each Card** | Group Module (linked) | White bg, border-radius: 12px, padding: 24px, border: 1px solid #e5e7eb, hover: box-shadow |

### Cards

| Title | Description | Link |
|-------|-------------|------|
| ERP | End-to-end manufacturing ERP built for Thai factories — from BOM to financials to BOI compliance. | `/products/erp.html` |
| MES | Real-time shop floor execution system — OEE tracking, SPC, and paperless work orders. | `/products/mes.html` |
| WMS | Smart warehouse management with barcode/RFID — from receiving to dispatch with full traceability. | `/products/wms.html` |
| Automotive | ERP and MES solutions purpose-built for automotive parts manufacturers and OEM suppliers. | `/industries/automotive.html` |
| Electronics | Manufacturing software for electronics assembly, SMT lines, and component traceability. | `/industries/electronics.html` |
| Metal & Plastics | Integrated solutions for die casting, injection molding, and metal fabrication shops. | `/industries/metal-plastics.html` |

---

## Scroll Animation Strategy

| Component | Static Build | Divi 5 Equivalent |
|-----------|-------------|-------------------|
| Card hover lifts + icon color change | CSS transition (0.3-0.4s ease) | Interactions → Hover → Transform (translateY: -2px to -6px) + Background Color + SVG Stroke Color |
| Scroll fade-in | `DigiWinUI.initScrollAnimation()` | Interactions → Scroll → Fade In (400ms ease, 70ms stagger) |
| Hero stat counters | Hardcoded values | Number Counter module (auto-animate on scroll) |
| Metric counters | Static values | Number Counter module (animated count-up) |
| Data flow arrows | CSS `::after` clip-path | Code Module pseudo-elements (hidden on mobile) |
| Live dot pulse | `@keyframes pulse-dot 1.5s infinite` | Code Module preserving CSS keyframe animation |
| Super D parallax | `dw-d-parallax` class | Code Module with same CSS, OR Interactions → Scroll → Parallax |
| Wave flow animation | CSS keyframes drift 30s loop | Code Module preserving existing CSS animation |
| Problem card icon swap on hover | CSS transition (bg + stroke change) | Interactions → Hover → multi-property transition (background-gradient + SVG stroke) |

> **Note:** The live pulsing dot animation in the hero dashboard is a micro-interaction that gives the dashboard visual "life." Preserve it in the Code Module. It respects `prefers-reduced-motion` via the media query at the end of the page styles.

---

## Structured Data (Already in `<head>`)

Three JSON-LD schemas are included:

1. **SoftwareApplication** — DigiWin AIoT Smart Factory Platform, BusinessApplication, Industrial Internet of Things
2. **BreadcrumbList** — Home → Products → AIoT & Smart Factory
3. **FAQPage** — 5 questions/answers matching FAQ section content

> **Divi 5 Note:** Add these via `Divi > Theme Options > Integration > Head` or a Code Module in the header. Ensure they persist through Divi builds.

---

## Issues Found During Reverse-Engineering

| Issue | Severity | Recommendation |
|-------|----------|----------------|
| **Hero sensor dashboard is ~100 lines of HTML** | Medium | Keep in Code Module — it is a decorative visual. Consider replacing with a product screenshot post-launch. |
| **Section scene SVG (disconnected machines) is ~30 lines** | Low | Keep in Code Module, `aria-hidden="true"` |
| **Protocol tags are repetitive HTML** | Low | Could use Divi 5 Blurb modules in a Flexbox Row, or keep as Code Module for simpler maintenance |
| **Integration node links (ERP, MES, WMS) are relative paths** | Medium | Ensure Divi build uses absolute paths or correct WP permalinks |
| **No hero CTA buttons** | Design | Intentional — the page relies on "show, don't push" for a technical product. CTA is at the bottom. Validate with Peter if a hero CTA should be added. |
| **Metric claims need sourcing** | High | +15% OEE, -40% downtime, -12% energy, 100% data accuracy — these appear in FAQ answers too. Cross-reference with `memory/data-crosscheck-findings.md` and verify against DigiWin official materials. |

---

## Validation Checklist (Divi 5 Build)

- [ ] Hero renders 2-column on desktop (content left, dashboard right)
- [ ] Sensor dashboard shows 4 sensor tiles (temperature, vibration, power, RPM)
- [ ] Machine status list shows 3 machines (running, idle, running)
- [ ] Live dot pulses green (respects prefers-reduced-motion)
- [ ] Hero stacks vertically on tablet/mobile
- [ ] GEO explainer text renders correctly (mentions 50+ protocols, OPC-UA, Modbus, etc.)
- [ ] "Mitsubishi MELSEC" appears as protocol name (not flagged as client reference)
- [ ] All 4 problem cards render in correct grid (4-col desktop → 2 tablet → 1 mobile)
- [ ] Problem card hover changes icon background from red to blue gradient
- [ ] 4 data flow stages display horizontally with arrows between them
- [ ] Data flow arrows hidden on tablet/mobile
- [ ] Each stage shows numbered circle + title + description + tags
- [ ] All 4 capability cards render in 2-column grid
- [ ] Capability feature grids show 2-column layout with checkmarks
- [ ] Capability card hover changes border + shadow + icon
- [ ] 4 metric cards render on dark background (4-col desktop → 2 tablet → 1 mobile)
- [ ] Metric values animate on scroll (Number Counter)
- [ ] All 12 protocol tags display in wrap layout
- [ ] Integration diagram shows 4 nodes with AIoT highlighted (blue gradient)
- [ ] Non-active nodes link to correct product pages
- [ ] Integration message box renders with bold text
- [ ] 5 FAQ items expand/collapse correctly
- [ ] CTA says "Get in Touch" (NEVER "Request Demo" or "Book a Demo")
- [ ] CTA button links to `/demo.html`
- [ ] All internal links point to pages that exist
- [ ] Colors match Design Variables exactly
- [ ] Fonts load: Noto Sans, JetBrains Mono
- [ ] `prefers-reduced-motion` disables all animations/transitions
- [ ] Skip-to-content link present
- [ ] `<main>` landmark present with id `aiot-content`
- [ ] Page loads under 3 seconds on 4G connection
- [ ] No horizontal scroll on any breakpoint
- [ ] Related Solutions grid renders responsively

---

## Open Questions for Peter

1. **Hero CTA:** The current page has no CTA button in the hero — only stats. Should we add a "Let's Talk" button in the hero, or keep the current "show, don't push" approach?
2. **Sensor dashboard:** Keep the HTML mockup or replace with a real product screenshot/video once available?
3. **Metric claims sourcing:** +15% OEE, -40% downtime, -12% energy, 100% accuracy — are these from official DigiWin case study data? Need verification before Divi build.
4. **Protocol list completeness:** The current list shows 12 protocols. The claim is "50+." Should we expand the visible list or keep it representative?

---
