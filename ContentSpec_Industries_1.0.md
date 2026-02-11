# Content Spec: Industries — Vertical Validation Hub (PRD Section 4.0)

**Batch:** 2
**PRD Reference:** Section 4.0
**Playbook Reference:** Section 3.1 (Hub Page Arc), Section 2.2 (Track A Voice), Section 4.1 (Factory Operator Objections)
**Status:** v1.1 — Updated to reflect hero redesign, GDP correction, and cross-industry capabilities rework
**Last Updated:** February 11, 2026

---

## Page Overview

**Audience:** Track A — Factory operators seeking industry-specific proof that DigiWin knows their vertical
**Objective:** Self-identification and routing to the correct industry leaf page (Automotive, Electronics, Metal & Plastics)
**URL:** digiwin.co.th/industries.html
**Emotional Arc:** Recognition ("Built for YOUR industry") → Curiosity (Thailand market context) → Self-Selection (industry cards) → Confidence (universal challenges + approach) → Action (CTA)
**HTML Source:** `/complete_website/src/pages/industries.html`

---

## Section 1: Hero

**Purpose:** Establish DigiWin as a vertical manufacturing specialist, not a generic software vendor.

| Element | Specification |
|---------|---------------|
| **Layout** | Centered text, full-width dark section |
| **Background** | Linear gradient: `--navy-deep` (#0f1419) → `--navy-mid` (#1a2632) → `--navy` (#253B50) at 165deg; grain texture overlay (SVG noise, opacity 0.03, 8s animation); radial gradient accent (blue glow at 70% 30% and 30% 80%) |
| **Padding** | 160px top, 120px bottom |
| **Min-height** | 60vh |
| **Animation** | `slide-up 0.8s ease-out` on inner content |

| Element | Content |
|---------|---------|
| **Badge** | `INDUSTRY-SPECIFIC MANUFACTURING ERP` (JetBrains Mono, 11px, uppercase, 0.1em letter-spacing, blue pulse dot animation) |
| **Headline** | `Built for Your Industry.<br><span>Proven by Experience.</span>` (h1, Lexend 700, clamp 40-56px, -0.03em tracking; "Proven by Experience." in `--blue` #3798E4) |
| **Subhead** | `Your factory isn't generic — your ERP shouldn't be either. From automotive JIT scheduling to electronics component traceability to metal processing yield optimization, we've spent 44 years solving industry-specific challenges on the shop floor.` (Source Sans 3, 19px, rgba white 0.75, max-width 680px; "44" uses `dw-years` dynamic class) |
| **Stats bar** | Three stats separated by 48px gap, border-top 1px rgba white 0.1, padding-top 40px |

**Hero Stats:**

| Stat | Value | Label |
|------|-------|-------|
| 1 | `3` | `CORE VERTICALS` |
| 2 | `100+` | `THAI IMPLEMENTATIONS` |
| 3 | `44` (dynamic via `dw-years` class) | `YEARS MANUFACTURING-ONLY` |

---

## Section 2: Thailand Market Context

**Purpose:** Establish Thailand's manufacturing importance to frame DigiWin's relevance in-market.

| Element | Specification |
|---------|---------------|
| **Layout** | Centered header + 4-column stat grid |
| **Background** | White (`--white`), with 1px blue gradient line at top (linear-gradient 90deg transparent → blue → transparent) |
| **Padding** | 120px top and bottom |
| **Max-width** | 1100px |

| Element | Content |
|---------|---------|
| **Section Label** | `MARKET CONTEXT` (JetBrains Mono, 11px, uppercase, 0.15em letter-spacing, blue) |
| **Headline** | `Thailand: ASEAN's Manufacturing Hub` (Lexend, 40px, 700, `--navy`, -0.02em tracking) |
| **Subhead** | `The region's most mature industrial ecosystem, with deep supply chains and demanding global customers` (18px, #64748b, max-width 700px) |

**Context Stats (4-column grid, 24px gap):**

| Stat | Value | Label |
|------|-------|-------|
| 1 | `#1` | `ASEAN AUTO PRODUCTION` |
| 2 | `2,500+` | `AUTO PARTS SUPPLIERS` |
| 3 | `$40B` | `ELECTRONICS EXPORTS` |
| 4 | `~27%` | `GDP FROM MANUFACTURING` |

*Stats are cards with `--gray-light` (#F5F7FA) background, 20px border-radius, 40px/24px padding. Hover: white background, blue border, shadow, translateY(-4px).*

**Scroll Animation:** `DigiWinUI.initScrollAnimation('.context-stat', { stagger: 80, distance: 20, duration: 500, threshold: 0.2 })`

---

## Section 3: Industry Cards (Choose Your Industry)

**Purpose:** Self-identification — let visitors route to their specific industry page.

| Element | Specification |
|---------|---------------|
| **Layout** | Vertical stack of 3 full-width cards, each a 2-column grid (visual | content). Even cards reverse column order via `direction: rtl`. |
| **Background** | `--gray-light` (#F5F7FA) with dot pattern overlay (radial-gradient, blue 0.03 opacity, 30px grid) |
| **Padding** | 120px top and bottom |
| **Max-width** | 1200px |

| Element | Content |
|---------|---------|
| **Section Label** | `SPECIALIZED SOLUTIONS` (JetBrains Mono, 11px, uppercase, 0.15em letter-spacing, blue) |
| **Headline** | `Choose Your Industry` (Lexend, 40px, 700, `--navy`) |
| **Subhead** | `Specialized solutions for Thailand's core manufacturing sectors` (18px, #64748b) |

### Card 1: Automotive Parts Manufacturing

| Element | Content |
|---------|---------|
| **Link** | `{{basePath}}industries/automotive.html` (entire card is an `<a>` tag) |
| **Visual Panel** | Dark gradient background, car SVG icon (100x100px blue container, 52px white stroke icon), stat: `500+` / `Tier 1-3 suppliers served` |
| **Title** | `Automotive Parts Manufacturing` (Lexend, 28px, #253B50) |
| **Description** | `Thailand is ASEAN's Detroit. We understand what tier-1 OEMs demand: perfect lot traceability, JIT delivery schedules, and EDI integration that actually works with Toyota, Honda, and Denso systems.` |
| **Features** | OEM EDI integration, IATF 16949 compliance, Lot-level traceability, Kanban & JIT (2x2 grid, checkmark icons) |
| **CTA link** | `Explore Automotive Solutions →` (#3798E4, Lexend 600, 15px) |

### Card 2: Electronics Assembly

| Element | Content |
|---------|---------|
| **Link** | `{{basePath}}industries/electronics.html` |
| **Visual Panel** | Monitor SVG icon, stat: `1000+` / `Component types tracked` |
| **Title** | `Electronics Assembly` |
| **Description** | `High-mix, low-volume. Fast product cycles. Thousands of components per board. Moisture-sensitive parts. We built our MES specifically for this complexity.` |
| **Features** | SMT integration, Component traceability, MSD management, AOI integration |
| **CTA link** | `Explore Electronics Solutions →` |

### Card 3: Metal & Plastics Processing

| Element | Content |
|---------|---------|
| **Link** | `{{basePath}}industries/metal-plastics.html` |
| **Visual Panel** | Gear/settings SVG icon, stat: `15%` / `Average yield improvement` |
| **Title** | `Metal & Plastics Processing` |
| **Description** | `Stamping, injection molding, die casting, CNC machining. Process manufacturing where yield optimization and scrap reduction directly drive your margins.` |
| **Features** | Process monitoring, Mold/die tracking, Scrap analysis, Cycle optimization |
| **CTA link** | `Explore Metal & Plastics Solutions →` |

**Scroll Animation:** `DigiWinUI.initScrollAnimation('.industry-card', { mode: 'class', className: 'visible', stagger: 150, threshold: 0.15, rootMargin: '0px 0px -60px 0px' })`

---

## Section 4: Cross-Industry Capabilities

**Purpose:** Show DigiWin-specific differentiators that apply across all verticals — these are PRD-specified capabilities, not generic buzzwords.

| Element | Specification |
|---------|---------------|
| **Layout** | 4-column card grid |
| **Background** | White (#fff) |
| **Padding** | 100px top and bottom |
| **Max-width** | 1100px |

| Element | Content |
|---------|---------|
| **Headline** | `Cross-Industry Capabilities` (Lexend, 36px, #253B50) |
| **Subhead** | `Regardless of your vertical, these manufacturing fundamentals are built into every DigiWin solution` (18px, #64748b) |

**Capability Cards (4-column grid, 24px gap):**

| Card | Icon | Title | Body |
|------|------|-------|------|
| 1 | Search | `Full Traceability` | `Lot-level tracking from raw material to finished goods. Answer any customer audit question in minutes, not days.` |
| 2 | Clipboard check | `BOI Compliance` | `Production-order-level material reconciliation that passes BOI audit scrutiny. One client saved 10M+ THB/year in supplementary taxes.` |
| 3 | Dual arrows | `Dual-Unit Conversion` | `Show kilograms AND pieces simultaneously across purchasing, production, and sales. No workarounds needed.` |
| 4 | Eye | `Production Visibility` | `See your shop floor in real time — machine status, work order progress, and OEE — not yesterday's spreadsheet.` |

*Cards: white bg, 1px #e2e8f0 border, 16px border-radius, 32px/24px padding. 64px icon containers with blue gradient. Hover: blue border, shadow, translateY(-4px), icon fills blue.*

**Scroll Animation:** `DigiWinUI.initScrollAnimation('.challenge-card', { stagger: 100, distance: 30, duration: 600, threshold: 0.15 })`

---

## Section 5: Our Approach

**Purpose:** Show DigiWin's consultative methodology — address fear that implementation will be pushed rather than tailored.

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column step grid |
| **Background** | Dark gradient: linear-gradient(135deg, #253B50, #1a2e40) |
| **Padding** | 100px top and bottom |
| **Max-width** | 1000px |

| Element | Content |
|---------|---------|
| **Headline** | `Our Approach` (Lexend, 36px, white) |
| **Subhead** | `How we help you succeed, regardless of your starting point` (18px, rgba white 0.7) |

**Steps:**

| Step | Number | Title | Body |
|------|--------|-------|------|
| 1 | `1` (blue gradient circle, 56px) | `Understand` | `We start by understanding your specific challenges—not pushing a generic solution. Every factory is different.` |
| 2 | `2` | `Design` | `We design a solution that matches your maturity level. Start where you are, not where you "should" be.` |
| 3 | `3` | `Deliver` | `We implement in phases, delivering value quickly. You see ROI before the full project is complete.` |

---

## Section 6: CTA (Shared Component)

**Purpose:** Convert to contact.

| Element | Specification |
|---------|---------------|
| **Layout** | Shared `.cta-section` component from `styles.css` |
| **Background** | (Defined in shared styles) |

| Element | Content |
|---------|---------|
| **Headline** | `Let's Talk About Your Factory` |
| **Subhead** | `Every factory is different. Let us understand yours.` |
| **Primary CTA** | `Get in Touch` → `{{basePath}}demo.html` |
| **Secondary CTA** | `View Products` → `{{basePath}}products.html` |

---

## Inline JavaScript

```javascript
(function() {
    // Industry cards - class-based scroll animation
    DigiWinUI.initScrollAnimation('.industry-card', {
        mode: 'class', className: 'visible', stagger: 150,
        threshold: 0.15, rootMargin: '0px 0px -60px 0px'
    });

    // Challenge cards
    DigiWinUI.initScrollAnimation('.challenge-card', {
        stagger: 100, distance: 30, duration: 600, threshold: 0.15
    });

    // Context stats
    DigiWinUI.initScrollAnimation('.context-stat', {
        stagger: 80, distance: 20, duration: 500, threshold: 0.2
    });
})();
```

---

## CSS Architecture

This page has **significant inline CSS** (~580 lines) covering:
- Hero section (`.industries-hero` and children)
- Context section (`.context-section` and children)
- Industry cards section (`.industries-section` and children)
- Challenges section (`.challenges-section` and children — note: these classes overlap with styles in `styles.css` used by individual industry pages)
- Approach section (`.approach-section` and children)
- Full responsive breakpoints at 1024px and 640px

**Note:** The industries hub page has its own `.challenges-section` styles inline that differ from the shared `.challenges-section` in `styles.css` (which is used by automotive, electronics, and metal-plastics pages). This could cause conflicts if not carefully managed.

---

## Responsive Behavior

| Breakpoint | Changes |
|------------|---------|
| **1024px** | Hero h1: 40px; Context stats: 2-column; Industry cards: single-column (no RTL flip); Challenges: 2-column; Approach steps: single-column |
| **640px** | Hero padding: 120px/80px; Hero h1: 32px; Subtitle: 17px; Context stats: single-column; Stat values: 32px; Card visual: 40px padding; Card content: 32px padding; Card title: 24px; Features: single-column; Challenges: single-column |

---

## Flags & Notes

1. **PRD Divergence — Section structure:** PRD Section 4.0 specifies "Industry Selector (SYSPRO-style tabs)" but the build uses large vertical cards instead. This is arguably a better UX for 3 industries (tabs work better with 4+), but should be formally acknowledged.

2. **PRD Divergence — CTA wording:** PRD specifies `"Tell Us Your Industry"` as CTA text, but the build uses `"Let's Talk About Your Factory"` with `"Get in Touch"` button. The built version is more aligned with the Playbook's welcoming tone.

3. **Missing from PRD spec — Approach section:** The PRD's Section 4.0 does not mention an "Our Approach" section (Understand → Design → Deliver). This was added in the build and aligns well with Objection 1 (fear of disruption) from Playbook Section 4.1. Good addition.

4. **Missing from PRD spec — Market Context section:** The Thailand market context stats section (#1 ASEAN, 2,500+ suppliers, $40B electronics, ~27% GDP) is not in the PRD. Good addition for credibility but stats should be source-verified.

5. **Stat verification status:**
   - ~~"10% GDP from manufacturing"~~ **FIXED (v1.1):** Changed to ~27%, which aligns with World Bank/NESDC data for Thailand's manufacturing share of GDP.
   - "2,500+ auto parts suppliers" — plausible (Thai Automotive Institute figures), but check latest data
   - "$40B electronics exports" — check against BOI/NESDC data
   - "500+ Tier 1-3 suppliers served" (automotive card) — needs sourcing
   - "1000+ component types tracked" (electronics card) — needs sourcing
   - "15% average yield improvement" (metal card) — needs sourcing
   - "One client saved 10M+ THB/year" (BOI card) — sourced from VP strategy transcript (verified in cross-check findings)

6. **CSS inline vs. shared:** This page has ~580 lines of inline CSS. The `.challenges-section` class name conflicts with the shared class in `styles.css` used by the individual industry pages. The inline version overrides for this page, but this is fragile. Should be refactored to use a distinct class name (e.g., `.industries-hub-challenges`) or extracted to `styles.css` with proper scoping. **Deferred: will extract on next page touch per CLAUDE.md guardrail.**

7. ~~**CSS `:root` block is malformed:**~~ **FIXED (v1.1):** Removed malformed `@keyframes` fragments that had corrupted the `:root` block. The actual keyframes exist in shared `styles.css`.

8. **Dynamic years class:** Hero subtitle uses `dw-years` class on "44" and hero stat uses `dw-years` on the "44" stat number. Both will be dynamically updated by `digiwin-dynamic.js`. Good pattern.

9. **No case studies referenced:** PRD Section 4.0 doesn't require case studies on this hub page, and the build correctly omits them (leaf pages handle proof). Consistent with the Hub Page Arc (Section 3.1 of Playbook).

10. **CTA links correctly to existing pages:** Primary CTA → `demo.html` (exists), Secondary → `products.html` (exists). Industry card links all point to existing industry sub-pages.

11. **v1.1 Changes Summary:**
    - Hero badge: "Deep Manufacturing Expertise" → "Industry-Specific Manufacturing ERP"
    - Hero headline: Added "Proven by Experience." second line in blue
    - Hero subtitle: Rewritten — pain-first, mentions all 3 verticals, no caps "YOUR"
    - Hero stats: Generic company stats (44/50K+/100+) → industry-specific (3 Core Verticals / 100+ Thai Implementations / 44 Years Manufacturing-Only)
    - GDP stat: 10% → ~27% (factual correction)
    - Cross-Industry section: "What Every Factory Needs" → "Cross-Industry Capabilities" with PRD differentiators (Full Traceability, BOI Compliance, Dual-Unit Conversion, Production Visibility)
    - Broken CSS: Malformed `:root`/`@keyframes` merge cleaned up
