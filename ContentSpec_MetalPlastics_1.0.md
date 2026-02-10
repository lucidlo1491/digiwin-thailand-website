# Content Spec: Metal & Plastics Processing (PRD Section 4.3)

**Batch:** 2
**PRD Reference:** Section 4.3
**Playbook Reference:** Section 3.2 (Leaf Page Arc — Track A), Section 2.2 (Track A Voice), Section 4.1 (Factory Operator Objections)
**Status:** v1.0 — Reverse-engineered from HTML build
**Last Updated:** February 10, 2026

---

## Page Overview

**Audience:** Track A — Metal stamping, injection molding, die casting, CNC machining, and other process manufacturers in Thailand
**Objective:** Prove DigiWin handles process manufacturing complexity: yield optimization, scrap reduction, die/mold management, and cycle time monitoring
**URL:** digiwin.co.th/industries/metal-plastics.html
**Emotional Arc:** Pain ("Hidden losses that erode your margins") → Solution ("Data-driven visibility" including BOI compliance) → Proof (process types, product recommendations) → Action (CTA)
**HTML Source:** `/complete_website/src/pages/industries/metal-plastics.html`

---

## Section 1: Hero

**Purpose:** Speak directly to the margin-driven reality of process manufacturing — yield and scrap are the language.

| Element | Specification |
|---------|---------------|
| **Layout** | Centered text, full-width dark section |
| **Background** | Shared `.metal-hero` styles from `styles.css` — dark gradient with grain texture overlay |
| **Typography** | All from shared industry hero styles |

| Element | Content |
|---------|---------|
| **Badge** | `METAL & PLASTICS PROCESSING` (JetBrains Mono, 11px, uppercase, blue pill with pulse dot) |
| **Headline** | `Optimize Yield. <span>Minimize Scrap.</span>` (h1, Lexend 700; span in #3798E4) |
| **Subhead** | `Stamping, injection molding, die casting, CNC machining. Process manufacturing where cycle time and yield drive your margins.` |

**Hero Stats:**

| Stat | Value | Label |
|------|-------|-------|
| 1 | `+15%` | `Average yield improvement` |
| 2 | `-30%` | `Unplanned downtime` |
| 3 | `100%` | `Cycle time visibility` |

---

## Section 2: Context (Where Margins Are Made)

**Purpose:** Frame the economic reality — material costs dominate, so small yield improvements have outsized profit impact.

| Element | Specification |
|---------|---------------|
| **Layout** | Centered text block |
| **Background** | Shared `.context-section` styles from `styles.css` |

| Element | Content |
|---------|---------|
| **Headline** | `Where Margins Are Made` |
| **Body** | `In metal and plastics processing, **material costs are 50-70% of your total cost**. Every defective part is money in the scrap bin. Every second of cycle time drift is capacity you'll never recover. Small improvements in yield and efficiency **translate directly to the bottom line**—but you can't improve what you can't measure.` |

---

## Section 3: Challenges (The Process Manufacturing Challenge)

**Purpose:** Pain naming — articulate the hidden losses that process manufacturers live with daily.

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column card grid |
| **Background** | Shared `.challenges-section` styles from `styles.css` |

| Element | Content |
|---------|---------|
| **Headline** | `The Process Manufacturing Challenge` |
| **Subhead** | `Hidden losses that erode your margins` |

**Challenge Cards:**

| Card | Icon | Title | Body |
|------|------|-------|------|
| 1 | Trash can | `Scrap Eats Margins` | `Material costs are your biggest expense. Every defective part is money thrown away. Small yield improvements create significant profit impact.` |
| 2 | Wrench | `Die/Mold Mysteries` | `Which die is causing defects? When does a mold need maintenance? Without data, you're guessing until it fails catastrophically.` |
| 3 | Clock circle | `Cycle Time Drift` | `Machines slow down gradually. Operators don't notice 0.5 seconds per cycle—but over a shift, that's real capacity loss.` |

---

## Section 4: Solutions (How DigiWin Solves It)

**Purpose:** Map each process manufacturing challenge to specific DigiWin capabilities, including highlighted BOI compliance card.

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column card grid (5 cards total) |
| **Background** | Shared `.solutions-section` styles from `styles.css` |

| Element | Content |
|---------|---------|
| **Headline** | `How DigiWin Solves It` |
| **Subhead** | `Data-driven visibility for process manufacturing` |

### Solution Card 1: Process Parameter Monitoring

| Element | Content |
|---------|---------|
| **Title** | `Process Parameter Monitoring` |
| **Description** | `Capture temperature, pressure, speed from every cycle. Correlate parameters to quality outcomes.` |
| **Features** | Real-time parameter capture, Quality correlation analysis, Out-of-spec alerts |

### Solution Card 2: Die/Mold Management

| Element | Content |
|---------|---------|
| **Title** | `Die/Mold Management` |
| **Description** | `Track shot counts, maintenance history, and performance by tool. Predict maintenance needs before failures.` |
| **Features** | Shot count tracking, Maintenance scheduling, Tool performance trending |

### Solution Card 3: Scrap Analysis

| Element | Content |
|---------|---------|
| **Title** | `Scrap Analysis` |
| **Description** | `Categorize defects by type, correlate to machine, shift, material lot. Find root causes, not just symptoms.` |
| **Features** | Defect categorization, Pareto analysis, Root cause correlation |

### Solution Card 4: Cycle Time Optimization

| Element | Content |
|---------|---------|
| **Title** | `Cycle Time Optimization` |
| **Description** | `Real-time cycle time monitoring against standards. Alert on drift and identify bottlenecks.` |
| **Features** | Auto cycle detection, Drift alerts, OEE calculation |

### Solution Card 5: BOI Compliance (Highlighted)

| Element | Content |
|---------|---------|
| **Inline Styles** | `border: 2px solid rgba(55,152,228,0.3); background: linear-gradient(135deg, rgba(55,152,228,0.03), rgba(255,255,255,1));` — icon has stronger blue gradient |
| **Title** | `BOI Compliance` |
| **Description** | `Production-order-level material reconciliation for BOI audits. Track actual material consumption per mold run — essential for co-product and multi-cavity tracking.` |
| **Features** | BOI-ready audit reports, Co-product cost allocation, Proven: 10M+ THB/yr saved |

---

## Section 5: Process Types (Logo Strip)

**Purpose:** Show the breadth of process manufacturing types that DigiWin supports.

| Element | Specification |
|---------|---------------|
| **Layout** | Centered logo/tag strip |
| **CSS Classes** | `.processes-section`, `.processes-inner`, `.processes-logos`, `.process-logo` |
| **Background** | **UNSTYLED — see Flag #1** |

| Element | Content |
|---------|---------|
| **Headline** | `Process Types We Support` (h3) |
| **Process Types** | Stamping, Injection Molding, Die Casting, CNC Machining, Forging, Extrusion, Sheet Metal, Blow Molding |

---

## Section 6: Recommended Products

**Purpose:** Bridge CTA — route to specific product pages relevant to metal & plastics manufacturers.

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column product card grid |
| **Background** | Shared `.products-section` styles |

| Element | Content |
|---------|---------|
| **Headline** | `Recommended Products for Metal & Plastics` |

**Product Cards:**

| Card | Product | Description | Link |
|------|---------|-------------|------|
| 1 | `AIoT` | `Machine connectivity for presses, injection molders, and CNC machines. Real-time OEE and process parameter capture.` | `{{basePath}}products/aiot.html` |
| 2 | `sMES` | `Production tracking, quality data collection, scrap analysis, and die/mold management for process manufacturing.` | `{{basePath}}products/mes.html` |
| 3 | `iGP ERP` | `Right-sized ERP for metal and plastics operations with strong inventory and costing capabilities.` | `{{basePath}}products/erp.html` |

---

## Section 7: CTA (Shared Component)

**Purpose:** Convert to contact.

| Element | Content |
|---------|---------|
| **Headline** | `Improve Yield, Reduce Scrap` |
| **Subhead** | `See how DigiWin helps process manufacturers` |
| **Primary CTA** | `Get in Touch` → `{{basePath}}demo.html` |
| **Secondary CTA** | `View Other Industries` → `{{basePath}}industries.html` |

---

## Inline JavaScript

None. This page has no inline `<script>` block.

---

## CSS Architecture

This page has **zero inline CSS** in the `<head>`. All styles come from the shared `styles.css`:
- `.metal-hero` and children (hero section)
- `.context-section` (margin context)
- `.challenges-section` (pain cards)
- `.solutions-section` (solution cards)
- `.products-section` (product recommendations)
- `.cta-section` (shared CTA)

**Exception:** The BOI Compliance solution card (Card 5) has inline styles for the highlighted border and gradient background (2 lines — acceptable as page-specific).

**Missing from styles.css:** `.processes-section`, `.processes-inner`, `.processes-logos`, `.process-logo` — see Flag #1.

---

## Responsive Behavior

All responsive behavior is handled by shared `styles.css` breakpoints:
- **1024px:** Hero h1 40px, stats gap shrinks, challenges/solutions → 2-column, products → 2-column
- **640px:** Hero h1 32px, stats stack vertically, all grids → single-column

---

## Flags & Notes

1. **BUG — Unstyled process types section:** The `.processes-section`, `.processes-inner`, `.processes-logos`, and `.process-logo` CSS classes used in Section 5 (Process Types We Support) are **not defined anywhere** — not in `styles.css` and not inline. The analogous sections on automotive (`.oem-section`) and electronics (`.equipment-section`) ARE styled in `styles.css`. This section will render with default browser styles (no padding, no layout, no logo pill styling). **Fix required:** Either add `.processes-section` styles to `styles.css` or alias these classes to the existing `.oem-section` / `.equipment-section` selectors.

2. **PRD Divergence — Missing case study:** PRD Section 4.3 explicitly calls for "Metal/plastics case study" and CTA "See DigiWin in Processing." The build has no case study. Same gap as automotive and electronics pages.

3. **PRD Divergence — Missing dual-unit content:** PRD Section 4.3 specifically calls out "Dual-unit (kg→PCS), scrap/waste, material yield" as key content. The build covers scrap and yield but does NOT mention dual-unit conversion anywhere. This is a notable omission since dual-unit handling is a DigiWin differentiator for process manufacturing (metals sold by weight, tracked by pieces).

4. **BOI Compliance card — good addition with process-specific framing:** The description mentions "co-product and multi-cavity tracking" which is specific to metal & plastics (multi-cavity molds produce multiple parts per shot). This is better-tailored than simply copying the electronics version. The "10M+ THB/yr saved" claim references the Jin Hai case study.

5. **Stat verification needed:**
   - "+15% Average yield improvement" — needs source; specific customer or average?
   - "-30% Unplanned downtime" — needs source
   - "100% Cycle time visibility" — capability claim, acceptable
   - "Material costs are 50-70% of your total cost" — generally accurate for process manufacturing but should cite source

6. **Product recommendation order differs from other pages:** Metal & Plastics leads with AIoT (not MES or ERP), reflecting that machine connectivity and parameter monitoring is the primary entry point for process manufacturers. Uses iGP ERP (not T100) which is the right-sized product for smaller metal/plastics operations. Good differentiation.

7. **No scroll animations:** Like the other industry leaf pages, no `DigiWinUI.initScrollAnimation()` calls. Inconsistent with the hub page.

8. **Good process-specific language:** Stamping, injection molding, die casting, CNC machining, shot counts, cycle time, OEE, Pareto analysis, co-product cost allocation, multi-cavity — all highly specific to process manufacturing.

9. **CTA wording is correct:** Uses "Get in Touch" (not "Book a Demo"), aligned with PRD constraints.

10. **Process types section is unique to this page:** Neither automotive (OEM logos) nor electronics (equipment logos) has an equivalent "process types we support" section. This is a good addition for metal & plastics since the audience spans very different manufacturing methods (stamping vs. injection molding vs. CNC). However, it's broken due to Flag #1.
