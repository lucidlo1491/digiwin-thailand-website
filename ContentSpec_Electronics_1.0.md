# Content Spec: Electronics Assembly (PRD Section 4.2)

**Batch:** 2
**PRD Reference:** Section 4.2
**Playbook Reference:** Section 3.2 (Leaf Page Arc — Track A), Section 2.2 (Track A Voice), Section 4.1 (Factory Operator Objections)
**Status:** v1.0 — Reverse-engineered from HTML build
**Last Updated:** February 10, 2026

---

## Page Overview

**Audience:** Track A — Electronics assembly manufacturers (PCB/PCBA, HDD, automotive electronics, consumer electronics in Thailand)
**Objective:** Prove DigiWin handles component-level complexity: high-mix production, SMT integration, moisture-sensitive device management, and component-level traceability
**URL:** digiwin.co.th/industries/electronics.html
**Emotional Arc:** Pain ("The electronics manufacturing challenge") → Solution ("How DigiWin solves it" including BOI compliance) → Proof (equipment integrations, product recommendations) → Action (CTA)
**HTML Source:** `/complete_website/src/pages/industries/electronics.html`

---

## Section 1: Hero

**Purpose:** Immediately signal electronics manufacturing expertise through high-mix vocabulary.

| Element | Specification |
|---------|---------------|
| **Layout** | Centered text, full-width dark section |
| **Background** | Shared `.elec-hero` styles from `styles.css` — dark gradient with grain texture overlay |
| **Typography** | All from shared industry hero styles |

| Element | Content |
|---------|---------|
| **Badge** | `ELECTRONICS ASSEMBLY` (JetBrains Mono, 11px, uppercase, blue pill with pulse dot) |
| **Headline** | `Precision for <span>High-Mix</span> Manufacturing` (h1, Lexend 700; span in #3798E4) |
| **Subhead** | `Thousands of components per board. Fast product cycles. Complete traceability. Built specifically for electronics complexity.` |

**Hero Stats:**

| Stat | Value | Label |
|------|-------|-------|
| 1 | `1000+` | `Component types tracked` |
| 2 | `99.9%` | `Pick accuracy` |
| 3 | `-45%` | `MSD scrap reduction` |

---

## Section 2: Thailand Electronics Context

**Purpose:** Frame Thailand's electronics industry scale and position DigiWin's MES as purpose-built for this complexity.

| Element | Specification |
|---------|---------------|
| **Layout** | Centered text block |
| **Background** | Shared `.context-section` styles from `styles.css` |

| Element | Content |
|---------|---------|
| **Headline** | `Thailand's Electronics Ecosystem` |
| **Body** | `Thailand exports **$40+ billion in electronics annually**, from hard disk drives to automotive electronics to consumer devices. Electronics manufacturers face unique complexity: **hundreds of unique parts per product**, constant changeovers for high-mix production, and moisture-sensitive components that require precise handling. DigiWin's MES was built specifically for this challenge.` |

---

## Section 3: Challenges (The Electronics Manufacturing Challenge)

**Purpose:** Pain naming — articulate the specific operational complexities that generic systems fail to handle.

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column card grid |
| **Background** | Shared `.challenges-section` styles from `styles.css` |

| Element | Content |
|---------|---------|
| **Headline** | `The Electronics Manufacturing Challenge` |
| **Subhead** | `Complexity that generic systems can't handle` |

**Challenge Cards:**

| Card | Icon | Title | Body |
|------|------|-------|------|
| 1 | Gear/settings | `Component Chaos` | `Hundreds of unique parts per product. Thousands of reels in inventory. One wrong component placed = entire batch scrap.` |
| 2 | Clock circle | `Fast Changeovers` | `High-mix, low-volume means constant changeovers. Every minute of setup time is lost production capacity you can't recover.` |
| 3 | Expand arrows | `Moisture Sensitivity` | `MSD components that expire after floor exposure. Track it or scrap it. Manual tracking simply can't keep up with the pace.` |

---

## Section 4: Solutions (How DigiWin Solves It)

**Purpose:** Map each electronics challenge to specific DigiWin capabilities, including the highlighted BOI compliance card.

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column card grid (5 cards total — last one spans or follows the grid) |
| **Background** | Shared `.solutions-section` styles from `styles.css` |

| Element | Content |
|---------|---------|
| **Headline** | `How DigiWin Solves It` |
| **Subhead** | `Purpose-built capabilities for electronics assembly` |

### Solution Card 1: SMT Machine Integration

| Element | Content |
|---------|---------|
| **Title** | `SMT Machine Integration` |
| **Description** | `Direct connection to pick-and-place machines. Verify component reels before mounting. Prevent wrong-part defects at the source.` |
| **Features** | Reel verification at feeder, Wrong-part prevention, Program download automation |

### Solution Card 2: Component-Level Traceability

| Element | Content |
|---------|---------|
| **Title** | `Component-Level Traceability` |
| **Description** | `Track every reel to every board position. Know exactly which components went into which products.` |
| **Features** | Reel to serial number linkage, Full forward/backward trace, Recall scope minimization |

### Solution Card 3: MSD Management

| Element | Content |
|---------|---------|
| **Title** | `MSD Management` |
| **Description** | `Automatic floor life tracking for moisture-sensitive components. System alerts before expiry to reduce scrap.` |
| **Features** | Auto floor life countdown, Bake-out cycle tracking, Expiry alerts & blocking |

### Solution Card 4: AOI/ICT Integration

| Element | Content |
|---------|---------|
| **Title** | `AOI/ICT Integration` |
| **Description** | `Connect inspection results to MES. Track defect trends by component, machine, operator, and time.` |
| **Features** | Auto defect capture, Pareto analysis, SPC trending |

### Solution Card 5: BOI Compliance (Highlighted)

| Element | Content |
|---------|---------|
| **Inline Styles** | `border: 2px solid rgba(55,152,228,0.3); background: linear-gradient(135deg, rgba(55,152,228,0.03), rgba(255,255,255,1));` — icon has stronger blue gradient |
| **Title** | `BOI Compliance` |
| **Description** | `Production-order-level material reconciliation for BOI audits. Track actual component consumption per assembly order — critical for bonded electronic components.` |
| **Features** | BOI-ready audit reports, Bonded component tracking, Proven: 10M+ THB/yr saved |

---

## Section 5: Equipment Integration Logos

**Purpose:** Build credibility by showing which SMT and test equipment DigiWin integrates with.

| Element | Specification |
|---------|---------------|
| **Layout** | Centered logo strip |
| **Background** | Shared `.equipment-section` styles from `styles.css` (#F5F7FA) |

| Element | Content |
|---------|---------|
| **Headline** | `Integrated with Leading Equipment` (h3) |
| **Logos** | Fuji, Panasonic, Yamaha, Juki, ASM, Koh Young, Omron, Keysight |

*Note: These are currently text placeholders, not actual logo images.*

---

## Section 6: Recommended Products

**Purpose:** Bridge CTA — route to specific product pages relevant to electronics manufacturers.

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column product card grid |
| **Background** | Shared `.products-section` styles |

| Element | Content |
|---------|---------|
| **Headline** | `Recommended Products for Electronics` |

**Product Cards:**

| Card | Product | Description | Link |
|------|---------|-------------|------|
| 1 | `sMES` | `Component-level traceability, SMT integration, MSD management, and real-time quality tracking for electronics.` | `{{basePath}}products/mes.html` |
| 2 | `sFLS WMS` | `Reel management, moisture-sensitive handling, and kitting support for electronics warehouse operations.` | `{{basePath}}products/wms.html` |
| 3 | `AIoT` | `Machine connectivity for SMT lines, reflow ovens, and test equipment. Real-time OEE and process monitoring.` | `{{basePath}}products/aiot.html` |

---

## Section 7: CTA (Shared Component)

**Purpose:** Convert to contact.

| Element | Content |
|---------|---------|
| **Headline** | `Master Electronics Complexity` |
| **Subhead** | `See how DigiWin handles high-mix manufacturing` |
| **Primary CTA** | `Get in Touch` → `{{basePath}}demo.html` |
| **Secondary CTA** | `View Other Industries` → `{{basePath}}industries.html` |

---

## Inline JavaScript

None. This page has no inline `<script>` block (unlike the automotive page which has a legacy dropdown handler).

---

## CSS Architecture

This page has **zero inline CSS**. All styles come from the shared `styles.css`:
- `.elec-hero` and children (hero section)
- `.context-section` (Thailand context)
- `.challenges-section` (pain cards)
- `.solutions-section` (solution cards)
- `.equipment-section` (logo strip)
- `.products-section` (product recommendations)
- `.cta-section` (shared CTA)

**Exception:** The BOI Compliance solution card (Card 5) has inline styles for the highlighted border and gradient background. These 2 lines of inline CSS are acceptable as page-specific overrides.

---

## Responsive Behavior

All responsive behavior is handled by shared `styles.css` breakpoints:
- **1024px:** Hero h1 40px, stats gap shrinks, challenges/solutions → 2-column, products → 2-column
- **640px:** Hero h1 32px, stats stack vertically, all grids → single-column

---

## Flags & Notes

1. **PRD Divergence — Missing case study:** PRD Section 4.2 explicitly calls for "Electronics case study" and CTA "See DigiWin in Electronics." The build has no case study. This is the same gap as the automotive page — Playbook's Leaf Page Arc requires measurable proof.

2. **BOI Compliance card is a strong addition:** Not in the original PRD for Section 4.2, but aligns perfectly with the project's cross-checked intelligence that BOI compliance is the #1 sales driver. The "10M+ THB/yr saved" claim references the Jin Hai case study from PRD Section 1.3. This card uses visual differentiation (blue border + gradient background) to call attention — good pattern.

3. **Stat verification needed:**
   - "1000+ Component types tracked" — capability claim, acceptable
   - "99.9% Pick accuracy" — needs source; is this a DigiWin system capability or customer result?
   - "-45% MSD scrap reduction" — needs source; specific customer result or average?
   - "$40+ billion in electronics annually" — should verify against latest BOI/Bank of Thailand data

4. **Equipment logos are text placeholders:** Fuji, Panasonic, Yamaha, Juki, ASM, Koh Young, Omron, Keysight are rendered as styled text. Need actual logo images for production.

5. **No scroll animations:** Like the automotive page, this page has no `DigiWinUI.initScrollAnimation()` calls. Challenge cards and solution cards appear without animation. Inconsistent with the industries hub page which has full animation.

6. **Good electronics-specific language:** SMT, MSD, AOI, ICT, Pareto analysis, SPC, reel management, kitting, bake-out cycle — all highly specific to electronics assembly. Aligns with Playbook manufacturing language requirements.

7. **Product order differs from automotive:** Electronics leads with sMES (not ERP), reflecting that MES is the primary entry point for electronics factories. This aligns with the "reverse cut" strategy (lead with MES, then upsell ERP). Smart differentiation.

8. **CTA wording is correct:** Uses "Get in Touch" (not "Book a Demo"), aligned with PRD constraints.

9. **No ERP recommended:** Unlike automotive (which recommends T100 ERP), the electronics page recommends sMES, sFLS WMS, and AIoT — no ERP product. This may be intentional (electronics customers often already have ERP and need MES/WMS layered on top), but could also be an oversight. Consider whether iGP should be included as a fourth option.
