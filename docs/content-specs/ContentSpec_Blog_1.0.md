# ContentSpec: Blog / Insights & Knowledge (v2.0)

> **Pages:** Blog Listing (`blog.html`) + Article Template + 10 Articles
> **Source Files:** `complete_website/src/pages/blog.html`, `complete_website/src/pages/blog/*.html`
> **Status:** Built and deployed (10 articles). v2.0 adds funnel staging, product cross-links, content gaps, and reciprocal link specs.
> **Last Updated:** 2026-02-11

---

## Page Overview

### Blog Listing Page
**URL:** `digiwin.co.th/blog.html`
**Title Tag:** "Insights & Knowledge - DigiWin Thailand"
**Audience:** Track A (Factory Operators) primary, Track B (Distributors) secondary
**Emotional Arc:** Curiosity → Authority → Trust → Action (from Playbook v1.2, Section 3.7)
**Purpose:** Establish DigiWin as a technical authority in Thai manufacturing. Drive engagement with deep-content articles that demonstrate domain expertise. Each article maps to a competitive weapon or pain point from transcript intelligence.

### Article Template
**URL Pattern:** `digiwin.co.th/blog/{article-slug}.html`
**Emotional Arc:** Varies by funnel stage — TOFU (3.8.1), MOFU (3.8.2), BOFU (3.8.3), Track B (3.9) — from Playbook v1.2, Section 3.8
**Purpose:** Each article addresses a specific manufacturing challenge, provides genuine technical insight, and positions DigiWin's solution as the natural answer — without being salesy.

---

## Category System

| Category | Color | Badge BG | CSS Variable | Article Count |
|----------|-------|----------|-------------|---------------|
| BOI & Compliance | #DC2626 | Red | `--cat-boi` | 1 |
| Production Planning | #00AFF0 | Blue | `--cat-production` | 3 |
| Cost Management | #059669 | Green | `--cat-cost` | 2 |
| Smart Factory | #7C3AED | Purple | `--cat-smart` | 2 |
| Industry Insights | #D97706 | Amber | `--cat-industry` | 2 |
| Partner Insights | #0EA5E9 | Teal-Blue | `--cat-partner` | 0 (planned: 2) |

---

## Blog Listing Page — Section Architecture

| # | Section | Background | Purpose |
|---|---------|------------|---------|
| 1 | Hero | Dark navy gradient + grain + radial blue glows | Badge, headline, subtitle, animated dot indicator |
| 2 | Featured Article | White | Large 2-column spotlight card for top article |
| 3 | Article Grid | Light gray (#F5F7FA) | Filterable 3-column card grid with category tabs |
| 4 | Deep Dive Library | White | Structured list grouped by category |
| 5 | CTA | Dark navy gradient + grain | Contact prompt |

---

### Section 1: Hero

**Badge:** `INSIGHTS & KNOWLEDGE` — JetBrains Mono, blue pill with animated pulse dot

**Headline:**
```
Manufacturing Intelligence,
Shared
```
- "Shared" in #00AFF0
- Noto Sans 700, clamp(36px, 5.5vw, 56px)

**Subtitle:**
```
Technical guides, compliance insights, and real implementation stories
from Thailand's manufacturing floor.
```

**Animated Elements:** Floating data visualizations (SVG circles/lines) on left and right sides, opacity 0.1-0.15, position absolute.

---

### Section 2: Featured Article

**Layout:** White background, 2-column card (image placeholder left, content right). Spotlights the BOI compliance article as lead content.

**Featured Article:**

| Field | Value |
|-------|-------|
| Category Badge | BOI & COMPLIANCE (#DC2626) |
| Title | How One Factory Saved 10M THB/Year in BOI Supplementary Taxes |
| Excerpt | A BOI-certified manufacturer was paying over 10 million baht per year in supplementary taxes. Through production-order-level material reconciliation, they eliminated that cost entirely. |
| Read Time | 8 min read |
| CTA | Read the Full Story → blog/boi-compliance-jin-hai.html |

---

### Section 3: Article Grid

**Layout:** Light gray background. Section title "All Articles" with filter tabs above the grid.

**Filter Tabs:**

| Tab | data-filter | Highlighted Color |
|-----|-------------|-------------------|
| All | all | #00AFF0 |
| BOI & Compliance | boi | #DC2626 |
| Production Planning | production | #00AFF0 |
| Cost Management | cost | #059669 |
| Smart Factory | smart | #7C3AED |
| Industry Insights | industry | #D97706 |
| Partner Insights | partner | #0EA5E9 |

**Tab Design:** Unified bar, JetBrains Mono 12px uppercase. Active: category color bg + white text. Inactive: transparent bg, #666 text.

**Article Cards (10 total):**

| # | Slug | Title | Category | data-category | Read Time | Tier | Funnel Stage | Primary Product Link |
|---|------|-------|----------|---------------|-----------|------|-------------|---------------------|
| 1 | boi-compliance-jin-hai | How One Factory Saved 10M THB/Year in BOI Supplementary Taxes | BOI & Compliance | boi | 8 min | 1 | MOFU | products/erp.html |
| 2 | lrp-vs-mrp | LRP vs MRP: Why Your Production Planning Takes Hours Instead of Minutes | Production Planning | production | 7 min | 1 | MOFU | products/erp.html |
| 3 | co-product-cost-accounting | Co-Product Cost Accounting: The Problem SAP Cannot Solve | Cost Management | cost | 7 min | 1 | MOFU | products/erp.html |
| 4 | feature-codes | Feature Codes: How to Turn 27 SKUs Into 1 Product | Production Planning | production | 7 min | 2 | MOFU | products/erp.html |
| 5 | amrp-capacity-planning | AMRP: Why You Don't Need a Separate APS System | Production Planning | production | 8 min | 2 | MOFU | products/erp.html |
| 6 | five-pain-points | The 5 Universal Pain Points Every Thai Factory Owner Faces | Industry Insights | industry | 10 min | 2 | TOFU | products.html |
| 7 | sap-ecc-end-of-life | SAP ECC End-of-Life 2027: What Thai Manufacturers Need to Know | Industry Insights | industry | 7 min | 3 | TOFU | products/erp.html |
| 8 | dual-units | Dual Units: Why Your ERP Should Show Both Kilograms AND Pieces | Cost Management | cost | 6 min | 3 | MOFU | products/erp.html |
| 9 | shop-floor-scheduling | Shop Floor Mini-Scheduling: When Plans Meet Reality | Smart Factory | smart | 7 min | 3 | MOFU | products/mes.html |
| 10 | production-transparency | From Paper Reports to Production Transparency: A Practical Guide | Smart Factory | smart | 9 min | 3 | TOFU/MOFU | products/mes.html, products/aiot.html |

**Card Design:**
- White card, 16px border-radius, 4px top border in category color
- Category label: JetBrains Mono 11px uppercase in category color
- Title: Noto Sans 600, 18px, #000864
- Excerpt: Noto Sans, 15px, #666 (2-line clamp)
- Footer: read time + "Read →" link
- Hover: translateY(-4px), blue border, shadow
- Date: "February 2026" on all initial articles

**Filter JavaScript:** Click handler toggles `data-category` attribute visibility. "All" shows all cards. Transition: opacity 0 → 1, 0.3s ease.

---

### Section 4: Deep Dive Library

**Layout:** White background. Structured list grouped by category with expandable sections.

**Categories Listed:**

| Category | Articles Listed | Note |
|----------|----------------|------|
| BOI & Compliance | BOI Jin Hai (linked), 2 more "Coming Soon" | Planned: BOI standalone module, Free Trade Zone reporting |
| Production Planning | LRP, Feature Codes, AMRP (linked), 2 more "Coming Soon" | Planned: Batch scheduling, demand forecasting |
| Cost Management | Co-Product, Dual Units (linked), 2 more "Coming Soon" | Planned: Standard costing, transfer pricing |
| Smart Factory | Shop Floor Scheduling, Production Transparency (linked), 2 more "Coming Soon" | Planned: IoT integration, AI agents |
| Industry Insights | 5 Pain Points, SAP EOL (linked), 2 more "Coming Soon" | Planned: Thailand manufacturing outlook, Odoo migration |

**"Coming Soon" Badge:** JetBrains Mono 10px, gray pill (#E5E7EB bg, #9CA3AF text)

---

### Section 5: CTA

**Headline:** "Have a Manufacturing Challenge?"
**Subtext:** "Whether it's BOI compliance, production visibility, or cost management — our team has helped 100+ Thai factories solve the exact problems you're facing."
**Button:** "Let's Talk" → demo.html

---

## Article Template Specification

### Structure

Every article follows this structure:

```
1. Hero (compact, dark gradient)
   - Back link "← Back to Insights" → blog.html
   - Category badge (colored by category)
   - Article title (h1)
   - Meta line: read time • date

2. Article Body (max-width 800px, white bg)
   - Opening paragraphs (no heading)
   - Blue divider (60px × 3px, #00AFF0)
   - H2 sections with body copy
   - Interspersed elements:
     - Pull quotes (blue left border)
     - Data callout cards (dark gradient, JetBrains Mono numbers)
     - Highlight boxes (blue left border, light blue bg)

3. Related Articles (light gray bg)
   - 3-column grid of related article cards
   - Category label + title + "Read article →"

4. CTA Section (dark gradient)
   - Article-specific headline
   - Supportive subtext
   - "Let's Talk" button → demo.html
```

### Article Styles (Inline CSS)

All article styles are defined in `<style>` within `<head>` — no external stylesheet needed beyond the base `styles.css`.

**Key Style Classes:**

| Class | Purpose | Key Properties |
|-------|---------|----------------|
| `.blog-hero` | Compact hero | padding: 160px 24px 60px, dark gradient |
| `.blog-back-link` | Navigation back to listing | rgba(255,255,255,0.6), hover: #00AFF0 |
| `.blog-category-badge` | Category pill | JetBrains Mono 11px, category color bg |
| `.blog-body` | Article content container | max-width: 800px, padding: 64px 24px 80px |
| `.blog-body h2` | Section headings | Noto Sans 600, 28px, #000864, margin-top: 56px |
| `.blog-body p` | Body paragraphs | Noto Sans, 18px, line-height: 1.8, #333 |
| `.blog-pullquote` | Pull quote | border-left: 4px #00AFF0, italic, 20px |
| `.blog-data-card` | Data callout | Dark gradient, JetBrains Mono numbers |
| `.blog-highlight` | Info box | #EBF5FF bg, border-left: 4px #00AFF0 |
| `.blog-divider` | Section separator | 60px × 3px, #00AFF0 |
| `.blog-related` | Related articles section | #F5F7FA bg |
| `.blog-related-grid` | 3-column card grid | gap: 24px |
| `.blog-cta` | Bottom CTA | Dark gradient, centered |

---

## Article Inventory

### Tier 1 (Priority — Case Study / Killer Differentiator)

#### Article 1: BOI Compliance — Jin Hai
- **File:** `blog/boi-compliance-jin-hai.html`
- **Source:** Transcript intelligence — Jin Hai case, BOI compliance section
- **Competitive Weapon:** BOI production-order-level reconciliation
- **Key Proof Point:** 10M+ THB/year → 150K (2024) → Zero (2025)
- **Word Count:** ~1500 words
- **Related:** LRP vs MRP, Co-Product, 5 Pain Points

#### Article 2: LRP vs MRP
- **File:** `blog/lrp-vs-mrp.html`
- **Source:** Eddie's presale training + product knowledge (AMRP section)
- **Competitive Weapon:** LRP (Lot Requirements Planning) — per-order calc in <1 min
- **Key Proof Point:** Hours → minutes for material planning
- **Related:** BOI Compliance, Co-Product, AMRP

#### Article 3: Co-Product Cost Accounting
- **File:** `blog/co-product-cost-accounting.html`
- **Source:** Competitive weapons (transcript), product knowledge
- **Competitive Weapon:** One work order → multiple outputs with cost allocation
- **Key Proof Point:** SAP, Kingdee, Yonyou cannot do this
- **Related:** BOI Compliance, LRP vs MRP, Dual Units

### Tier 2 (Technical Authority)

#### Article 4: Feature Codes
- **File:** `blog/feature-codes.html`
- **Source:** T100 product knowledge — Product Feature Codes section
- **Competitive Weapon:** 27 SKUs → 1 item code with 3 dimensions
- **Key Proof Point:** 90%+ reduction in item master complexity
- **Related:** LRP vs MRP, AMRP, Dual Units

#### Article 5: AMRP Capacity Planning
- **File:** `blog/amrp-capacity-planning.html`
- **Source:** Product knowledge (AMRP section), competitive comparison
- **Competitive Weapon:** Built-in capacity planning (no separate APS purchase)
- **Key Proof Point:** Oracle/SAP require expensive separate APS
- **Related:** LRP vs MRP, Feature Codes, Shop Floor Scheduling

#### Article 6: 5 Universal Pain Points
- **File:** `blog/five-pain-points.html`
- **Source:** Eddie's presale methodology — 5 universal pain points
- **Competitive Weapon:** None directly — establishes authority and empathy
- **Key Proof Point:** 100+ Thai implementations insight
- **Related:** BOI Compliance, Production Transparency, Shop Floor Scheduling

### Tier 3 (Market Intelligence / Supporting Content)

#### Article 7: SAP ECC End-of-Life
- **File:** `blog/sap-ecc-end-of-life.html`
- **Source:** Transcript intelligence — Alfa Sistemi meeting, competitive landscape
- **Competitive Weapon:** Market timing opportunity
- **Key Proof Point:** 2027 deadline, forced migration window
- **Note:** Factual industry analysis, not competitor attack
- **Related:** BOI Compliance, AMRP, 5 Pain Points

#### Article 8: Dual Units
- **File:** `blog/dual-units.html`
- **Source:** Competitive weapons (transcript), product knowledge
- **Competitive Weapon:** Show kg AND pieces simultaneously
- **Key Proof Point:** SAP B1 can only show single unit
- **Related:** Co-Product, Feature Codes, BOI Compliance

#### Article 9: Shop Floor Mini-Scheduling
- **File:** `blog/shop-floor-scheduling.html`
- **Source:** Competitive weapons (transcript), presale methodology
- **Competitive Weapon:** Floor supervisors adjust real-time, visible to planning
- **Key Proof Point:** No competitor matches this
- **Related:** AMRP, Production Transparency, 5 Pain Points

#### Article 10: Production Transparency
- **File:** `blog/production-transparency.html`
- **Source:** Presale methodology (pain point #2), product knowledge (eMES)
- **Competitive Weapon:** MES + ERP + IoT journey
- **Key Proof Point:** Practical 4-stage roadmap
- **Related:** 5 Pain Points, Shop Floor Scheduling, LRP vs MRP

---

## Cross-Link Matrix

Every article links to 3 related articles. This matrix shows all cross-links:

| Article | Links To |
|---------|----------|
| BOI Compliance | LRP, Co-Product, 5 Pain Points |
| LRP vs MRP | BOI Compliance, Co-Product, AMRP |
| Co-Product | BOI Compliance, LRP, Dual Units |
| Feature Codes | LRP, AMRP, Dual Units |
| AMRP | LRP, Feature Codes, Shop Floor Scheduling |
| 5 Pain Points | BOI Compliance, Production Transparency, Shop Floor Scheduling |
| SAP EOL | BOI Compliance, AMRP, 5 Pain Points |
| Dual Units | Co-Product, Feature Codes, BOI Compliance |
| Shop Floor Scheduling | AMRP, Production Transparency, 5 Pain Points |
| Production Transparency | 5 Pain Points, Shop Floor Scheduling, LRP |

---

## Typography Summary

### Blog Listing Page

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Hero badge | JetBrains Mono | 13px | 500 | #7EC8F2 |
| Hero headline | Noto Sans | clamp(36px, 5.5vw, 56px) | 700 | #fff / #00AFF0 |
| Section titles | Noto Sans | 32px | 700 | #000864 |
| Filter tabs | JetBrains Mono | 12px | 500 | Category colors |
| Card titles | Noto Sans | 18px | 600 | #000864 |
| Card excerpts | Noto Sans | 15px | 400 | #666 |
| Card meta | Noto Sans | 13px | 400 | #999 |

### Article Pages

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Article h1 | Noto Sans | clamp(28px, 4.5vw, 42px) | 700 | #fff |
| Article h2 | Noto Sans | 28px | 600 | #000864 |
| Article h3 | Noto Sans | 22px | 600 | #000864 |
| Body text | Noto Sans | 18px | 400 | #333 |
| Pull quotes | Noto Sans | 20px | 400 (italic) | #000864 |
| Data numbers | JetBrains Mono | clamp(32px, 5vw, 48px) | 500 | #00AFF0 |
| Data labels | Noto Sans | 16px | 400 | rgba(255,255,255,0.7) |

---

## Responsive Breakpoints

### Blog Listing

| Breakpoint | Changes |
|------------|---------|
| ≤1024px | Article grid: 2 columns, hero decorative elements hidden |
| ≤768px | Article grid: 1 column, hero padding reduced, featured card stacks vertically |
| ≤480px | Font sizes reduced, padding tightened |

### Article Pages

| Breakpoint | Changes |
|------------|---------|
| ≤768px | Related grid: 1 column, hero padding reduced, body font: 17px, pullquote: 18px |

---

## Content Strategy Notes

### Eddie's Presale Methodology as Content Source
Articles are derived from DigiWin's actual presale methodology (Playbook v1.2, Section 11):
- **Pain-first approach:** Every article opens with a recognizable problem
- **Story-driven:** Case studies and scenarios, not feature lists
- **Top-down messaging:** Written for factory owners/operators, not IT teams
- **Manufacturing language:** Shop floor, OEE, BOM, batch-level — not generic enterprise terms

### Competitive Positioning
- **Track A (factory operators):** Articles never name competitors directly. They describe capabilities gaps without attribution.
- **Blog exception:** Factual comparisons are acceptable per Playbook v1.2 anti-pattern #3 update. SAP ECC end-of-life is treated as industry news, not competitive attack. Co-product article mentions "the problem SAP cannot solve" in title but frames as capability gap, not disparagement.

### SEO Strategy
- Each article targets a specific long-tail keyword cluster
- Meta descriptions written for click-through from search results
- H2 headings include natural keyword variations
- Internal cross-links strengthen topical authority

---

## DIVI Module Mapping (WordPress Migration)

### Blog Listing

| Section | DIVI Module | Notes |
|---------|-------------|-------|
| Hero | Fullwidth Header + Code | Custom gradient, animated elements via CSS |
| Featured | Blurb / Blog (single post) | 2-column layout |
| Article Grid | Filterable Portfolio or Blog | Category filter, 3-column |
| Deep Dive Library | Toggle / Accordion | Grouped by category |
| CTA | Call to Action | Standard dark gradient |

### Article Pages

| Section | DIVI Module | Notes |
|---------|-------------|-------|
| Hero | Fullwidth Header | Compact, dark gradient |
| Body | Text + Code Modules | Pull quotes, data cards as Code modules |
| Related | Blog Module (3-post) | Related by category |
| CTA | Call to Action | Article-specific copy |

---

## Content Gap Analysis (Prioritized for Q2 2026)

### TOFU Gaps (Awareness — Attracting New Visitors)

| Priority | Proposed Title | Search Intent | Target Category | Notes |
|----------|---------------|---------------|-----------------|-------|
| P1 | BOI Audit Preparation Checklist 2026 | Compliance, high search intent | BOI & Compliance | Highest organic potential — factory owners actively searching |
| P2 | What Is MES? A Factory Owner's Guide | Informational | Smart Factory | Supports "reverse cut" strategy — MES as entry point |
| P3 | Why Thai Factories Still Run on Excel | Problem-aware | Industry Insights | High relatability, social media shareable |

### BOFU Gaps (Decision — Converting Evaluators)

| Priority | Proposed Title | Search Intent | Target Category | Notes |
|----------|---------------|---------------|-----------------|-------|
| P1 | DigiWin vs. Odoo for Thai Manufacturing | Comparison | Industry Insights | Competitive positioning — Odoo is SEO-dominant in Thailand |
| P2 | What Happens After "Let's Talk": DigiWin's Implementation Process | Fear removal | Industry Insights | Directly addresses Objection 1 (implementation disruption) |

### Track B Gaps (Distributor Recruitment)

| Priority | Proposed Title | Search Intent | Target Category | Notes |
|----------|---------------|---------------|-----------------|-------|
| P1 | The Man-Day Trap: Why ERP Consultancies Hit Revenue Ceilings | Business model disruption | Partner Insights (NEW) | Blog entry point for distributors — uses Playbook 3.9 arc |
| P2 | How to Add Manufacturing ERP to Your Consulting Portfolio | Commercial/informational | Partner Insights (NEW) | Bridges to partner-program.html |

### Publication Priority

First 4 articles to publish. Per PRD v1.4 content calendar: BOFU gaps and Track B gaps are filled first (aligned with Q2 2026 distributor deadline).

1. **The Man-Day Trap: Why ERP Consultancies Hit Revenue Ceilings** (Track B — Q2 deadline for distributor pipeline)
2. **DigiWin vs. Odoo for Thai Manufacturing** (BOFU, Track A — competitive positioning against SEO-dominant Odoo)
3. **What Happens After "Let's Talk": DigiWin's Implementation Process** (BOFU, Track A — fear removal for evaluators)
4. **BOI Audit Preparation Checklist 2026** (TOFU, Track A — highest organic search potential)

---

## Retrofit Cross-Links Specification

Each existing article should be updated to include product/industry page links within its body, using the three-tier CTA system from Playbook v1.2 Section 7.9.

| Article | Mid-Article Link (Tier 1 — Soft) | Post-Proof Link (Tier 2 — Bridge) | Partner Link? |
|---------|----------------------------------|-----------------------------------|---------------|
| BOI Compliance | products/erp.html (after "Why ERPs Fail" section) | Industry pages (after results section) | No |
| LRP vs MRP | products/erp.html (after LRP explanation) | — | No |
| Co-Product Cost | products/erp.html (after capability demo) | partner-program.html (after distributor paragraph) | Yes |
| Feature Codes | products/erp.html (after 27→1 reduction) | — | No |
| AMRP | products/erp.html (after APS comparison) | — | No |
| 5 Pain Points | products.html (after Pain 3) | industries.html (after Pain 5) | No |
| SAP ECC EOL | — (keep pure TOFU) | products/erp.html (after alternative path) | Yes |
| Dual Units | products/erp.html (after dual-unit demo) | — | No |
| Shop Floor Scheduling | products/mes.html (after scheduling demo) | — | No |
| Production Transparency | products/mes.html (after paper problem) | products/aiot.html (after roadmap) | No |

**Implementation notes:**
- Tier 1 (Soft) uses existing `blog-highlight` box style — no new CSS needed
- Tier 2 (Bridge) needs a new `blog-bridge-cta` component — white card with category-color accent
- Partner links add a secondary CTA line to the bottom banner: "Exploring a Partnership?" → partner-program.html
- Max 2 in-article CTAs per article (1 soft + 1 bridge). Bottom banner is always present.

---

## Reciprocal Links Specification

Product and industry pages should link BACK to relevant blog articles via a "Related Insights" section at the bottom of each page. This creates the bidirectional linking architecture defined in PRD v1.4 Section 8.4.

| Page | Blog Articles to Link | Notes |
|------|----------------------|-------|
| products.html | 5 Pain Points, SAP ECC End-of-Life | 2 articles (hub page — broad articles) |
| products/erp.html | BOI Compliance, LRP vs MRP, Co-Product, Feature Codes, AMRP, Dual Units | 6 articles — show top 3, expandable |
| products/mes.html | Shop Floor Scheduling, Production Transparency | 2 articles |
| products/wms.html | (none yet) | Future: needs WMS-focused article |
| products/aiot.html | Production Transparency | 1 article |
| industries/automotive.html | 5 Pain Points, Shop Floor Scheduling | 2 articles |
| industries/electronics.html | 5 Pain Points, Feature Codes | 2 articles |
| industries/metal-plastics.html | Co-Product, Dual Units, 5 Pain Points | 3 articles |

**"Related Insights" Section Design:**
- Placement: After main content, before final CTA banner
- Layout: 3-column card grid (same as blog article "Related Articles" component)
- Card: Category badge + title + "Read article →" link
- Background: #F5F7FA (light gray) to visually separate from main content
- Responsive: 1-column on mobile

---

## Post-Launch Notes

- **Article dates are placeholder** (all "February 2026") — should be updated with actual publish dates
- **Article images are absent** — hero images and inline diagrams should be added for visual richness
- **"Coming Soon" articles in Deep Dive Library** should be converted to real articles as content is created
- **Analytics:** Track article views, time on page, and scroll depth to identify highest-performing topics
- **Thai localization:** Articles should be translated to Thai as a Phase 3 initiative
- **Newsletter integration:** "Subscribe for new articles" functionality needs backend (Mailchimp/ActiveCampaign)
- Consider adding estimated reading progress bar for long articles
- Consider adding social share buttons (LinkedIn especially — B2B audience)
