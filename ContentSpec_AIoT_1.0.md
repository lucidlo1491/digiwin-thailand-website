# Content Spec: AIoT Platform (No Explicit PRD Section)

**Batch:** Batch 2
**PRD Reference:** No dedicated PRD section for end-user AIoT page. PRD Section 2.2.3 covers the **partner-facing** AIoT product page. This is the **end-user-facing** equivalent, created to match the pattern of ERP (3.1), MES (3.2), and WMS (3.3) product pages.
**Playbook Reference:** Section 3.2 (Leaf Page Arc — Track A), Section 2.2 (Track A voice), Section 6 (CTA hierarchy)
**Status:** v1.0 — Reverse-engineered from HTML build
**Last Updated:** February 10, 2026

---

## Page Overview

**Audience:** Factory operators interested in machine connectivity, predictive maintenance, and OEE optimization — plant managers, maintenance managers, operations directors
**Objective:** Sell machine intelligence — your machines generate data, you should be using it
**URL:** digiwin.co.th/products/aiot.html
**Emotional Arc:** Leaf Page Arc Track A (Playbook 3.2) — Pain Validation → Relief/Solution → Proof → Gentle Nudge

---

## Section 1: Hero

**Purpose:** Machine intelligence — the untapped data from your equipment

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column grid. Left = content, Right = live sensor dashboard mockup |
| **Background** | Dark gradient with violet tint (AIoT brand color), grain overlay |
| **Padding** | 160px top, 100px bottom |

| Element | Content |
|---------|---------|
| **Badge** | `Industrial Intelligence Platform` |
| **Headline** | `Your Machines` `Know Everything.` (span highlight) `But Can You Hear Them?` |
| **Subtitle** | `Every machine generates thousands of data points daily. DigiWin AIoT captures, analyzes, and transforms this data into competitive advantage.` |

**Note:** No hero CTAs (buttons). The hero uses stats and the dashboard mockup to drive engagement instead. This differs from the ERP, MES, and WMS hero patterns which all include "Let's Talk" + secondary CTA buttons.

### Hero Stats

| # | Value | Label |
|---|-------|-------|
| 1 | `50+` | Protocols Supported |
| 2 | `1M+` | Data Points/Day |
| 3 | `< 1s` | Real-Time Response |

**Note:** These stats differ from other product pages (which use 44 years / 50K+ / 100+). AIoT uses technology-specific metrics instead of company-wide credibility stats.

### Hero Sensor Dashboard Mockup (right column)

Live sensor data visualization with "Live" badge:
- 4 sensor tiles: Temperature `78.4°C`, Vibration `2.4 mm/s` (warning state), Power Draw `47.2 kW`, RPM `1,847`
- Machine list: CNC-M01 (Running), CNC-M02 (Idle), CNC-M03 (Running)

---

## Section 2: Problem Section

**Purpose:** Factory blindness — machines running without reporting

| Element | Specification |
|---------|---------------|
| **Layout** | 4-column grid of problem cards |
| **Background** | White or light section |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section title** | `Most Factories Are Flying Blind` |
| **Section subtitle** | `Your machines talk. But without the right ears, you're missing critical intelligence.` |

### Problem Cards

| # | Title | Description |
|---|-------|-------------|
| 1 | Silent Machines | Machines run without reporting. Problems only surface after breakdowns. |
| 2 | Reactive Maintenance | Fix it when it breaks. Unplanned downtime costs 10x more than scheduled maintenance. |
| 3 | Manual OEE | Staff tracking production on clipboards. Data is late, inaccurate, or simply not collected. |
| 4 | Hidden Energy Waste | No visibility into which machines consume what. Energy costs spike unexplained. |

---

## Section 3: Data Flow (How It Works)

**Purpose:** Explain the 4-step process from machine signal to actionable intelligence

| Element | Specification |
|---------|---------------|
| **Layout** | 4-stage horizontal pipeline visualization |
| **Background** | Dark or gradient section |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section title** | `How DigiWin AIoT Works` |
| **Section subtitle** | `From machine signal to actionable intelligence in real-time` |

### Data Flow Stages

| # | Stage | Title | Description | Items |
|---|-------|-------|-------------|-------|
| 1 | Connect | Connect | Edge devices collect data from any machine, any brand, any age | PLCs, CNCs, Sensors, Meters |
| 2 | Translate | Translate | Universal protocol support turns signals into standardized data | OPC-UA, Modbus, MQTT, MT Connect |
| 3 | Analyze | Analyze | AI models detect patterns, predict failures, optimize performance | OEE, Anomaly, Trends, Alerts |
| 4 | Act | Act | Dashboards, alerts, and integrations drive immediate action | ERP, MES, Mobile, Andon |

---

## Section 4: Capabilities

**Purpose:** 4 core AIoT capability areas with feature details

| Element | Specification |
|---------|---------------|
| **Layout** | 2x2 grid of capability cards |
| **Background** | Light section |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section title** | `Smart Factory Capabilities` |
| **Section subtitle** | `Complete visibility from machine signal to business insight` |

### Capability Cards

| # | Title | Description | Features |
|---|-------|-------------|----------|
| 1 | Universal Machine Connectivity | Connect any machine, any protocol, any age. Our edge devices speak every language your factory uses. | PLC integration, CNC/SMT machines, Sensor networks, Legacy equipment |
| 2 | Real-Time OEE | Automatic OEE calculation from machine signals. See availability, performance, and quality without manual input. | Auto downtime tracking, Cycle time analysis, Quality correlation, Shift comparisons |
| 3 | Predictive Maintenance | AI models learn your machine behavior and predict failures before they happen. Fix it before it breaks. | Vibration analysis, Temperature trending, Anomaly detection, Auto work orders |
| 4 | Energy Management | Monitor consumption by machine, line, and product. Identify waste, optimize costs, meet sustainability targets. | Real-time monitoring, Cost per unit, Peak demand alerts, Carbon footprint |

---

## Section 5: Metrics / Measured Impact

**Purpose:** Proof of AIoT outcomes

| Element | Specification |
|---------|---------------|
| **Layout** | 4-column grid of metric cards |
| **Background** | Dark or gradient section |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section title** | `Measured Impact` |
| **Section subtitle** | `What our customers achieve with AIoT implementation` |

### Metric Cards

| # | Value | Label |
|---|-------|-------|
| 1 | `+15%` | OEE Improvement |
| 2 | `-40%` | Unplanned Downtime |
| 3 | `-12%` | Energy Costs |
| 4 | `100%` | Data Accuracy |

---

## Section 6: Supported Protocols

**Purpose:** Technical credibility — show breadth of equipment compatibility

| Element | Specification |
|---------|---------------|
| **Layout** | Tag cloud / grid of protocol badges |
| **Background** | Light section |
| **Padding** | Compact section |

| Element | Content |
|---------|---------|
| **Title** | `Supported Protocols & Equipment` |

### Protocol Tags

OPC-UA, Modbus TCP/RTU, MQTT, MT Connect, PROFINET, EtherNet/IP, Siemens S7, Mitsubishi MELSEC, FANUC FOCAS, Allen-Bradley, Omron FINS, BACnet

---

## Section 7: Integration

**Purpose:** Show AIoT as the intelligence layer connecting machines to business systems

| Element | Specification |
|---------|---------------|
| **Layout** | Horizontal flow: ERP (T100/iGP) ↔ MES (sMES/SFT) ↔ AIoT (active, Machine Layer) ↔ WMS (sFLS) |
| **Background** | Dark or gradient section |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Section title** | `The Intelligence Layer` |
| **Section subtitle** | `AIoT connects your machines to your business systems` |

### Integration Nodes (with sub-labels)

| Node | Title | Subtitle | Link |
|------|-------|----------|------|
| ERP | ERP | T100 / iGP | `erp.html` |
| MES | MES | sMES / SFT | `mes.html` |
| AIoT | AIoT | Machine Layer | (current page — not linked) |
| WMS | WMS | sFLS | `wms.html` |

**Note:** Integration nodes on this page include product sub-labels (T100/iGP, sMES/SFT, sFLS) which the other product pages' integration sections do not. This is a nice touch for context but creates an inconsistency.

---

## Section 8: CTA

**Purpose:** Convert visitors to contact

| Element | Specification |
|---------|---------------|
| **Layout** | Centered text with button row |
| **Background** | Violet/dark gradient (AIoT brand color) |
| **Padding** | 120px top/bottom |

| Element | Content |
|---------|---------|
| **Title** | `Start Listening to Your Machines` |
| **Subtitle** | `See what your factory floor is really doing` |
| **Primary CTA** | `Get in Touch` → `{{basePath}}demo.html` |
| **Secondary CTA** | `Explore All Products` → `{{basePath}}products.html` |

---

## Responsive Behavior

| Breakpoint | Changes |
|-----------|---------|
| **<= 1024px** | Hero: single column, centered. Sensor dashboard: hidden or stacked below. Problem grid: 2-column. Data flow: stacked vertically. Capabilities: 1-column. |
| **<= 640px** | Hero: reduced padding. Stats: vertical column. All grids: single column. |

---

## Flags & Notes

1. **FLAG — NO PRD SECTION**: There is no explicit PRD section for an end-user AIoT product page. PRD Section 2.2.3 covers the **partner-facing** AIoT page. This end-user page was created to complete the product suite (ERP + MES + WMS + AIoT) and follows the same pattern as the other leaf pages. The PRD should be updated to include a Section 3.4 for AIoT.
2. **MISSING HERO CTAs**: Unlike ERP, MES, and WMS pages which all have "Let's Talk" + secondary anchor CTA in the hero, the AIoT hero has NO CTA buttons. This is an inconsistency that should be addressed — adding "Let's Talk" and "Explore Capabilities" would match the pattern.
3. **DIFFERENT HERO STATS**: AIoT hero uses technology metrics (50+ Protocols, 1M+ Data Points, <1s Response) instead of company-wide stats (44 Years, 50K+ Factories, 100+ Thai Sites). This is intentional and appropriate for the technical audience, but creates an inconsistency with the other 3 product pages.
4. **STATS — SOFT CLAIMS**: "+15% OEE Improvement", "-40% Unplanned Downtime", "-12% Energy Costs", "100% Data Accuracy" — not sourced. Cross-check with actual implementation data. Note: MES page also claims "-40% Unplanned Downtime" — is this the same claim or independent?
5. **CTA COMPLIANCE**: "Get in Touch" — compliant. No demo language.
6. **PROTOCOL LIST**: 12 protocols listed. Verify these are all actually supported by DigiWin's AIoT platform. FANUC FOCAS, Allen-Bradley, Omron FINS are very specific — if accurate, they're strong selling points.
7. **CTA BUTTON CLASS**: CTA uses `cta-btn-primary` and `cta-btn-secondary` class names instead of `btn-white` and `btn-outline-white` used on other product pages. This is an inconsistency — should be standardized.
8. **INLINE CSS**: ~694 lines of inline CSS. Sensor dashboard, data flow pipeline, protocol tags, and dark sections could be extracted.
9. **UNIQUE DATA FLOW SECTION**: The "How It Works" 4-stage pipeline (Connect → Translate → Analyze → Act) is unique to AIoT and not present on other product pages. This is appropriate and effective for explaining a technical product.
