# Content Spec: Industries — Vertical Validation Hub (PRD Section 4.0)

**Batch:** 2
**PRD Reference:** Section 4.0
**Playbook Reference:** Section 3.1 (Hub Page Arc), Section 2.2 (Track A Voice), Section 4.1 (Factory Operator Objections)
**Status:** v1.0 — Reverse-engineered from HTML build
**Last Updated:** February 10, 2026

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
| **Badge** | `DEEP MANUFACTURING EXPERTISE` (JetBrains Mono, 11px, uppercase, 0.1em letter-spacing, blue pulse dot animation) |
| **Headline** | `Built for <span>Your Industry</span>` (h1, Lexend 700, clamp 40-56px, -0.03em tracking; span in `--blue` #3798E4) |
| **Subhead** | `We don't just understand manufacturing—we understand YOUR manufacturing. 44 years of vertical expertise in ASEAN's core industrial sectors.` (Source Sans 3, 19px, rgba white 0.75, max-width 680px) |
| **Stats bar** | Three stats separated by 48px gap, border-top 1px rgba white 0.1, padding-top 40px |

**Hero Stats:**

| Stat | Value | Label |
|------|-------|-------|
| 1 | `44` (dynamic via `dw-years` class) | `YEARS FOCUS` |
| 2 | `50K+` | `FACTORIES` |
| 3 | `100+` | `THAI CUSTOMERS` |

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
| 4 | `10%` | `GDP FROM MANUFACTURING` |

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

## Section 4: Universal Challenges (What Every Factory Needs)

**Purpose:** Show cross-industry value — regardless of vertical, these pain points are universal.

| Element | Specification |
|---------|---------------|
| **Layout** | 4-column card grid |
| **Background** | White (#fff) |
| **Padding** | 100px top and bottom |
| **Max-width** | 1100px |

| Element | Content |
|---------|---------|
| **Headline** | `What Every Factory Needs` (Lexend, 36px, #253B50) |
| **Subhead** | `Regardless of industry, these challenges are universal` (18px, #64748b) |

**Challenge Cards (4-column grid, 24px gap):**

| Card | Title | Body |
|------|-------|------|
| 1 (Eye icon) | `Visibility` | `Know what's happening on your floor—right now, not tomorrow morning in a report.` |
| 2 (Search icon) | `Traceability` | `Answer any customer audit question in minutes, not days of spreadsheet hunting.` |
| 3 (Bar chart icon) | `Control` | `Costs, quality, delivery—manage them proactively instead of fighting fires.` |
| 4 (Arrow up icon) | `Efficiency` | `Do more with the same resources. Grow revenue without growing headcount proportionally.` |

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

4. **Missing from PRD spec — Market Context section:** The Thailand market context stats section (#1 ASEAN, 2,500+ suppliers, $40B electronics, 10% GDP) is not in the PRD. Good addition for credibility but stats should be source-verified.

5. **Stat verification needed:** The following claims need source verification:
   - "2,500+ auto parts suppliers" — plausible (Thai Automotive Institute figures), but check latest data
   - "$40B electronics exports" — check against BOI/NESDC data
   - "10% GDP from manufacturing" — Thailand's manufacturing is closer to 25-27% of GDP. If this means a specific sub-sector, it should be clarified. **Likely incorrect.**

6. **CSS inline vs. shared:** This page has ~580 lines of inline CSS. The `.challenges-section` class name conflicts with the shared class in `styles.css` used by the individual industry pages. The inline version overrides for this page, but this is fragile. Should be refactored to use a distinct class name (e.g., `.industries-hub-challenges`) or extracted to `styles.css` with proper scoping.

7. **CSS `:root` block is malformed:** Line 18 shows `--white: #ffffff;` immediately followed by `}10% { transform: translate(-2%, -2%); }` — this appears to be a corrupted merge of the `:root` block with `@keyframes grain` animation frames. The page likely still works because the browser may recover, but this is a bug that should be cleaned up.

8. **Dynamic years class:** Hero stats use `dw-years` class on both the subtitle ("44 years") and the stat number, which will be dynamically updated by `digiwin-dynamic.js`. Good pattern for keeping the founding year claim current.

9. **No case studies referenced:** PRD Section 4.0 doesn't require case studies on this hub page, and the build correctly omits them (leaf pages handle proof). Consistent with the Hub Page Arc (Section 3.1 of Playbook).

10. **CTA links correctly to existing pages:** Primary CTA → `demo.html` (exists), Secondary → `products.html` (should verify exists). Industry card links all point to existing industry sub-pages.
