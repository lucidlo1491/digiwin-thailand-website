# Content Spec: Automotive Parts Manufacturing (PRD Section 4.1)

**Batch:** 2
**PRD Reference:** Section 4.1
**Playbook Reference:** Section 3.2 (Leaf Page Arc — Track A), Section 2.2 (Track A Voice), Section 4.1 (Factory Operator Objections)
**Status:** v1.0 — Reverse-engineered from HTML build
**Last Updated:** February 10, 2026

---

## Page Overview

**Audience:** Track A — Automotive parts manufacturers (tier 1-3 OEM suppliers in Thailand)
**Objective:** Prove DigiWin understands JIT delivery, lot traceability, EDI integration, and IATF 16949 compliance — the specific requirements of automotive supply chain
**URL:** digiwin.co.th/industries/automotive.html
**Emotional Arc:** Pain ("The automotive stakes are high") → Solution ("How DigiWin solves it") → Proof (OEM integrations, product recommendations) → Action (CTA)
**HTML Source:** `/complete_website/src/pages/industries/automotive.html`

---

## Section 1: Hero

**Purpose:** Establish immediate relevance to automotive parts suppliers by speaking their language — OEM demands, JIT, traceability.

| Element | Specification |
|---------|---------------|
| **Layout** | Centered text, full-width dark section |
| **Background** | Shared `.auto-hero` styles from `styles.css` — dark gradient with grain texture overlay |
| **Padding** | (Defined in `styles.css`) |
| **Typography** | All from shared industry hero styles |

| Element | Content |
|---------|---------|
| **Badge** | `AUTOMOTIVE PARTS MANUFACTURING` (JetBrains Mono, 11px, uppercase, blue pill with pulse dot) |
| **Headline** | `Built for What <span>OEMs Demand</span>` (h1, Lexend 700, clamp 40-56px; span in #3798E4) |
| **Subhead** | `JIT delivery. Complete traceability. EDI integration. Thailand is ASEAN's automotive hub—we help tier 1-3 suppliers stay competitive.` |

**Hero Stats:**

| Stat | Value | Label |
|------|-------|-------|
| 1 | `500+` | `Auto suppliers served` |
| 2 | `100%` | `Traceability coverage` |
| 3 | `99.5%` | `On-time delivery` |

---

## Section 2: Thailand Context

**Purpose:** Frame Thailand's automotive importance and position DigiWin's experience within it.

| Element | Specification |
|---------|---------------|
| **Layout** | Centered text block, narrow max-width |
| **Background** | Shared `.context-section` styles from `styles.css` |

| Element | Content |
|---------|---------|
| **Headline** | `Thailand: ASEAN's Detroit` (Lexend, from shared styles) |
| **Body** | `Thailand produces **1.9 million vehicles annually**, making it the largest automotive manufacturing hub in Southeast Asia. Behind every vehicle are **2,500+ tier 1-3 suppliers** facing relentless demands: perfect quality, complete traceability, and JIT delivery windows measured in hours, not days. DigiWin has spent 20+ years helping these suppliers meet—and exceed—OEM expectations.` |

---

## Section 3: Stakes (The Automotive Stakes Are High)

**Purpose:** Pain naming — articulate the specific fears and pressures automotive suppliers face. Addresses Playbook's "Name it" pattern.

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column card grid |
| **Background** | Shared `.stakes-section` styles from `styles.css` (aliases `.challenges-section`) |
| **Max-width** | From shared styles |

| Element | Content |
|---------|---------|
| **Headline** | `The Automotive Stakes Are High` (Lexend, from shared styles) |
| **Subhead** | `In automotive, there's no room for "good enough"` |

**Stake Cards:**

| Card | Icon | Title | Body |
|------|------|-------|------|
| 1 | Clock circle | `JIT or Else` | `Miss one delivery window and Toyota stops the line. The penalty isn't a warning—it's the cost of that downtime, plus losing the contract entirely.` |
| 2 | Search circle | `Trace or Lose` | `A quality issue surfaces. OEM asks: which lot? Which raw materials? Which operator? If you can't answer in hours, you're not a tier-1 supplier anymore.` |
| 3 | Clipboard | `Audit Anxiety` | `IATF 16949. Customer audits quarterly. Documentation requirements that keep growing. Manual systems simply can't keep up.` |

---

## Section 4: Solutions (How DigiWin Solves It)

**Purpose:** Map each automotive pain point to a specific DigiWin capability. Problem → Solution pairs per Playbook Section 3.2.

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column card grid (from shared `.solutions-section` in `styles.css`) |
| **Background** | Shared styles |

| Element | Content |
|---------|---------|
| **Headline** | `How DigiWin Solves It` |
| **Subhead** | `Purpose-built capabilities for automotive supply chain` |

### Solution Card 1: OEM EDI Integration

| Element | Content |
|---------|---------|
| **Title** | `OEM EDI Integration` |
| **Description** | `Direct connection to Toyota, Honda, Denso, and other OEM systems. No manual data entry, no missed signals.` |
| **Features** | Receive forecasts & POs automatically, Send ASN & delivery confirmations, Quality data exchange |

### Solution Card 2: Lot-Level Traceability

| Element | Content |
|---------|---------|
| **Title** | `Lot-Level Traceability` |
| **Description** | `Track every component from receiving through shipping. Answer "where did this part go?" in seconds, not days.` |
| **Features** | Forward & backward traceability, Barcode/QR code scanning, Recall scope analysis |

### Solution Card 3: Kanban & JIT Scheduling

| Element | Content |
|---------|---------|
| **Title** | `Kanban & JIT Scheduling` |
| **Description** | `Production scheduling that understands kanban signals, sequence orders, and delivery windows.` |
| **Features** | Plan backwards from ship date, Sequence delivery support, Multi-plant coordination |

### Solution Card 4: Quality Documentation

| Element | Content |
|---------|---------|
| **Title** | `Quality Documentation` |
| **Description** | `PPAP support. Control plans. Inspection records. SPC data. All captured digitally, all audit-ready.` |
| **Features** | IATF 16949 compliance, SPC charts & analysis, 8D reporting |

---

## Section 5: OEM Integration Logos

**Purpose:** Build credibility by showing which OEM systems DigiWin integrates with.

| Element | Specification |
|---------|---------------|
| **Layout** | Centered logo strip |
| **Background** | Shared `.oem-section` styles from `styles.css` (#F5F7FA) |
| **Padding** | 80px top and bottom |

| Element | Content |
|---------|---------|
| **Headline** | `Integrated with Major OEM Systems` (h3, Lexend, 24px) |
| **Logos** | Toyota, Honda, Nissan, Isuzu, Denso, Mitsubishi, Mazda, Suzuki |

*Note: These are currently text placeholders, not actual logo images.*

---

## Section 6: Recommended Products

**Purpose:** Bridge CTA — route to specific product pages relevant to automotive manufacturers.

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column product card grid |
| **Background** | Shared `.products-section` styles from `styles.css` |

| Element | Content |
|---------|---------|
| **Headline** | `Recommended Products for Automotive` |

**Product Cards:**

| Card | Product | Description | Link |
|------|---------|-------------|------|
| 1 | `T100 ERP` | `Multi-site, multi-currency ERP with automotive-specific modules for EDI, JIT scheduling, and supplier management.` | `{{basePath}}products/erp.html` |
| 2 | `sMES` | `Full traceability, quality data collection, and real-time production visibility for automotive precision requirements.` | `{{basePath}}products/mes.html` |
| 3 | `sFLS WMS` | `FIFO enforcement, lot tracking, and sequence delivery support for JIT warehouse operations.` | `{{basePath}}products/wms.html` |

---

## Section 7: CTA (Shared Component)

**Purpose:** Convert to contact.

| Element | Content |
|---------|---------|
| **Headline** | `Meet OEM Demands with Confidence` |
| **Subhead** | `See how DigiWin helps Thailand's top automotive suppliers` |
| **Primary CTA** | `Get in Touch` → `{{basePath}}demo.html` |
| **Secondary CTA** | `View Other Industries` → `{{basePath}}industries.html` |

---

## Inline JavaScript

```javascript
(function() {
    // Legacy dropdown handler (duplicated from header — likely unnecessary since
    // digiwin-components.js handles this via the shared footer partial)
    const dropdowns = document.querySelectorAll('.dw-nav-item[data-dropdown]');
    dropdowns.forEach(function(item) {
        const menu = item.querySelector('.dw-mega-menu');
        item.addEventListener('mouseenter', function() {
            dropdowns.forEach(function(other) { if (other !== item) { other.classList.remove('active'); const m = other.querySelector('.dw-mega-menu'); if (m) m.classList.remove('active'); }});
            item.classList.add('active'); if (menu) menu.classList.add('active');
        });
        item.addEventListener('mouseleave', function() { item.classList.remove('active'); if (menu) menu.classList.remove('active'); });
    });
})();
```

Also loads: `<script src="{{basePath}}digiwin-dynamic.js"></script>` — **this is a duplicate** since `digiwin-dynamic.js` is already loaded via the footer partial.

---

## CSS Architecture

This page has **zero inline CSS**. All styles come from the shared `styles.css`:
- `.auto-hero` and children (hero section)
- `.context-section` (Thailand context)
- `.stakes-section` / `.challenges-section` (pain cards)
- `.solutions-section` (solution cards)
- `.oem-section` (logo strip)
- `.products-section` (product recommendations)
- `.cta-section` (shared CTA)

---

## Responsive Behavior

All responsive behavior is handled by shared `styles.css` breakpoints:
- **1024px:** Hero h1 40px, stats gap shrinks, solutions grid → 2-column, product grid → 2-column
- **640px:** Hero h1 32px, stats stack vertically, solutions/products → single-column

---

## Flags & Notes

1. **PRD Divergence — Missing case study:** PRD Section 4.1 explicitly calls for "Automotive case study" in Section 2 (Solution Mapping + Case Study). The build has no case study. This is a significant gap — the Playbook's Leaf Page Arc (Section 3.2) requires proof via case study with measurable outcomes.

2. **Stat verification needed:**
   - "500+ Auto suppliers served" — needs source verification from DigiWin data
   - "100% Traceability coverage" — this is a capability claim, not a market stat, so acceptable
   - "99.5% On-time delivery" — needs source; is this a DigiWin customer average or a specific case?
   - "1.9 million vehicles annually" — check against Thai Automotive Institute / FTI latest data
   - "20+ years helping these suppliers" — DigiWin Thailand established 2017 (per PRD); this may refer to the global company's automotive experience. Should clarify.

3. **Duplicate JavaScript:** The inline script duplicates navigation dropdown behavior that `digiwin-components.js` (loaded via footer partial) already handles. Also, `digiwin-dynamic.js` is loaded both inline AND via the footer partial. Both duplicates should be removed.

4. **OEM logos are text placeholders:** Toyota, Honda, Nissan, etc. are rendered as styled text divs, not actual logo images. These need to be replaced with real logo assets for production.

5. **No scroll animations on this page:** Unlike the industries hub page, this page does not initialize any `DigiWinUI.initScrollAnimation()` calls. The solutions cards and product cards will appear without animation. Consider adding staggered scroll animations for consistency.

6. **Good manufacturing language usage:** The page correctly uses automotive-specific terminology: JIT, EDI, IATF 16949, PPAP, SPC, 8D, Kanban, ASN, lot traceability. This aligns with Playbook Section 2.1 (manufacturing language rule).

7. **No BOI compliance section:** Unlike the electronics and metal-plastics pages, the automotive page does not include a BOI compliance card. Given that BOI compliance is identified as DigiWin's #1 sales driver (per cross-checked business intelligence), this may be a missed opportunity for automotive suppliers who also have BOI obligations.

8. **CTA wording is correct:** Uses "Get in Touch" (not "Book a Demo" or "Request Demo"), which aligns with the PRD's no-demo constraint.
