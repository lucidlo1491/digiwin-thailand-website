# ContentSpec: Blog / Insights & Knowledge (v1.0)

> **Pages:** Blog Listing (`blog.html`) + Article Template + 10 Articles
> **Source Files:** `complete_website/src/pages/blog.html`, `complete_website/src/pages/blog/*.html`
> **Status:** Built and deployed (10 articles)
> **Last Updated:** 2026-02-09

---

## Page Overview

### Blog Listing Page
**URL:** `digiwin.co.th/blog.html`
**Title Tag:** "Insights & Knowledge - DigiWin Thailand"
**Audience:** Track A (Factory Operators) primary, Track B (Distributors) secondary
**Emotional Arc:** Curiosity → Authority → Trust → Action (from Playbook v1.1, Section 3.7)
**Purpose:** Establish DigiWin as a technical authority in Thai manufacturing. Drive engagement with deep-content articles that demonstrate domain expertise. Each article maps to a competitive weapon or pain point from transcript intelligence.

### Article Template
**URL Pattern:** `digiwin.co.th/blog/{article-slug}.html`
**Emotional Arc:** Problem Recognition → Technical Depth → Proof → CTA (from Playbook v1.1, Section 3.8)
**Purpose:** Each article addresses a specific manufacturing challenge, provides genuine technical insight, and positions DigiWin's solution as the natural answer — without being salesy.

---

## Category System

| Category | Color | Badge BG | CSS Variable | Article Count |
|----------|-------|----------|-------------|---------------|
| BOI & Compliance | #DC2626 | Red | `--cat-boi` | 1 |
| Production Planning | #3798E4 | Blue | `--cat-production` | 3 |
| Cost Management | #059669 | Green | `--cat-cost` | 2 |
| Smart Factory | #7C3AED | Purple | `--cat-smart` | 2 |
| Industry Insights | #D97706 | Amber | `--cat-industry` | 2 |

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
- "Shared" in #3798E4
- Lexend 700, clamp(36px, 5.5vw, 56px)

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
| All | all | #3798E4 |
| BOI & Compliance | boi | #DC2626 |
| Production Planning | production | #3798E4 |
| Cost Management | cost | #059669 |
| Smart Factory | smart | #7C3AED |
| Industry Insights | industry | #D97706 |

**Tab Design:** Unified bar, JetBrains Mono 12px uppercase. Active: category color bg + white text. Inactive: transparent bg, #666 text.

**Article Cards (10 total):**

| # | Slug | Title | Category | data-category | Read Time | Tier |
|---|------|-------|----------|---------------|-----------|------|
| 1 | boi-compliance-jin-hai | How One Factory Saved 10M THB/Year in BOI Supplementary Taxes | BOI & Compliance | boi | 8 min | 1 |
| 2 | lrp-vs-mrp | LRP vs MRP: Why Your Production Planning Takes Hours Instead of Minutes | Production Planning | production | 7 min | 1 |
| 3 | co-product-cost-accounting | Co-Product Cost Accounting: The Problem SAP Cannot Solve | Cost Management | cost | 7 min | 1 |
| 4 | feature-codes | Feature Codes: How to Turn 27 SKUs Into 1 Product | Production Planning | production | 7 min | 2 |
| 5 | amrp-capacity-planning | AMRP: Why You Don't Need a Separate APS System | Production Planning | production | 8 min | 2 |
| 6 | five-pain-points | The 5 Universal Pain Points Every Thai Factory Owner Faces | Industry Insights | industry | 10 min | 2 |
| 7 | sap-ecc-end-of-life | SAP ECC End-of-Life 2027: What Thai Manufacturers Need to Know | Industry Insights | industry | 7 min | 3 |
| 8 | dual-units | Dual Units: Why Your ERP Should Show Both Kilograms AND Pieces | Cost Management | cost | 6 min | 3 |
| 9 | shop-floor-scheduling | Shop Floor Mini-Scheduling: When Plans Meet Reality | Smart Factory | smart | 7 min | 3 |
| 10 | production-transparency | From Paper Reports to Production Transparency: A Practical Guide | Smart Factory | smart | 9 min | 3 |

**Card Design:**
- White card, 16px border-radius, 4px top border in category color
- Category label: JetBrains Mono 11px uppercase in category color
- Title: Lexend 600, 18px, #253B50
- Excerpt: Source Sans 3, 15px, #666 (2-line clamp)
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
   - Blue divider (60px × 3px, #3798E4)
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
| `.blog-back-link` | Navigation back to listing | rgba(255,255,255,0.6), hover: #3798E4 |
| `.blog-category-badge` | Category pill | JetBrains Mono 11px, category color bg |
| `.blog-body` | Article content container | max-width: 800px, padding: 64px 24px 80px |
| `.blog-body h2` | Section headings | Lexend 600, 28px, #253B50, margin-top: 56px |
| `.blog-body p` | Body paragraphs | Source Sans 3, 18px, line-height: 1.8, #333 |
| `.blog-pullquote` | Pull quote | border-left: 4px #3798E4, italic, 20px |
| `.blog-data-card` | Data callout | Dark gradient, JetBrains Mono numbers |
| `.blog-highlight` | Info box | #EBF5FF bg, border-left: 4px #3798E4 |
| `.blog-divider` | Section separator | 60px × 3px, #3798E4 |
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
| Hero headline | Lexend | clamp(36px, 5.5vw, 56px) | 700 | #fff / #3798E4 |
| Section titles | Lexend | 32px | 700 | #253B50 |
| Filter tabs | JetBrains Mono | 12px | 500 | Category colors |
| Card titles | Lexend | 18px | 600 | #253B50 |
| Card excerpts | Source Sans 3 | 15px | 400 | #666 |
| Card meta | Source Sans 3 | 13px | 400 | #999 |

### Article Pages

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Article h1 | Lexend | clamp(28px, 4.5vw, 42px) | 700 | #fff |
| Article h2 | Lexend | 28px | 600 | #253B50 |
| Article h3 | Lexend | 22px | 600 | #253B50 |
| Body text | Source Sans 3 | 18px | 400 | #333 |
| Pull quotes | Source Sans 3 | 20px | 400 (italic) | #253B50 |
| Data numbers | JetBrains Mono | clamp(32px, 5vw, 48px) | 500 | #3798E4 |
| Data labels | Source Sans 3 | 16px | 400 | rgba(255,255,255,0.7) |

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
Articles are derived from DigiWin's actual presale methodology (Playbook v1.1, Section 11):
- **Pain-first approach:** Every article opens with a recognizable problem
- **Story-driven:** Case studies and scenarios, not feature lists
- **Top-down messaging:** Written for factory owners/operators, not IT teams
- **Manufacturing language:** Shop floor, OEE, BOM, batch-level — not generic enterprise terms

### Competitive Positioning
- **Track A (factory operators):** Articles never name competitors directly. They describe capabilities gaps without attribution.
- **Blog exception:** Factual comparisons are acceptable per Playbook v1.1 anti-pattern #3 update. SAP ECC end-of-life is treated as industry news, not competitive attack. Co-product article mentions "the problem SAP cannot solve" in title but frames as capability gap, not disparagement.

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

## Post-Launch Notes

- **Article dates are placeholder** (all "February 2026") — should be updated with actual publish dates
- **Article images are absent** — hero images and inline diagrams should be added for visual richness
- **"Coming Soon" articles in Deep Dive Library** should be converted to real articles as content is created
- **Analytics:** Track article views, time on page, and scroll depth to identify highest-performing topics
- **Thai localization:** Articles should be translated to Thai as a Phase 3 initiative
- **Newsletter integration:** "Subscribe for new articles" functionality needs backend (Mailchimp/ActiveCampaign)
- Consider adding estimated reading progress bar for long articles
- Consider adding social share buttons (LinkedIn especially — B2B audience)
