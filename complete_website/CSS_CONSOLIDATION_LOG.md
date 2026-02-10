# CSS Consolidation Log

## Iteration 1: Blog Post Hero + Full Article Styles

**Pattern category:** Hero section styles (expanded to full blog article template)

**What was extracted:**
- Complete blog post CSS template (~370 lines) moved to `styles.css`
- Includes: `.blog-hero`, `.blog-hero-inner`, `.blog-back-link`, `.blog-category-badge`, `.blog-hero h1`, `.blog-meta`, `.blog-body` (full typography), `.blog-pullquote`, `.blog-data-card`, `.blog-highlight`, `.blog-divider`, `.blog-related`, `.blog-cta`, `.fade-in`, and all responsive breakpoints

**Files updated:**
- `styles.css` — added ~370 lines of shared blog CSS
- 8 blog posts stripped to badge-color-only inline CSS:
  - shop-floor-scheduling.html (#7C3AED)
  - dual-units.html (#059669)
  - amrp-capacity-planning.html (#3798E4)
  - boi-compliance-jin-hai.html (#DC2626)
  - feature-codes.html (#3798E4)
  - five-pain-points.html (#D97706)
  - production-transparency.html (#10B981)
  - sap-ecc-end-of-life.html (#D97706)

**Lines removed:** ~3,264 lines of duplicate inline CSS
**Lines added:** ~370 lines to styles.css
**Net reduction:** ~2,894 lines

**Not touched this iteration:**
- `co-product-cost-accounting.html` (uses `.article-hero` class names)
- `lrp-vs-mrp.html` (uses `.article-hero` class names)
- Non-blog page heroes (products, industries, partner-program sub-pages)

**Build:** 30 pages, 0 errors

## Iteration 2: CTA Section Styles

**Pattern category:** CTA section/banner styles (gradient backgrounds, centered content, button pair)

**What was extracted:**
- `.cta-section` (padding, gradient background, text-align)
- `.cta-inner` (max-width, margin, padding)
- `.cta-section h2` (Lexend, 40px, white)
- `.cta-section p` (20px, white 0.9 opacity)
- `.cta-buttons` (flex, gap, center)
- `.cta-btn-primary` + `:hover` (white bg, blue text, lift effect)
- `.cta-btn-secondary` + `:hover` (transparent, white border, fill effect)
- Responsive: `.cta-section h2` 28px + `.cta-buttons` column at 640px

**Files updated:**
- `styles.css` — added ~60 lines of shared CTA CSS + 2 responsive rules
- 5 pages stripped of CTA CSS (~57 lines each) + 2 responsive lines each:
  - industries.html
  - industries/automotive.html
  - industries/electronics.html
  - industries/metal-plastics.html
  - products/aiot.html

**Lines removed:** ~295 lines (57×5 + 2×5)
**Lines added:** ~62 lines to styles.css
**Net reduction:** ~233 lines

**Not touched this iteration:**
- Pages with page-prefixed CTA classes (`.erp-cta`, `.mes-cta`, `.partner-cta`, etc.) — would require HTML class name changes
- `blog.html` CTA uses `.cta-btn-white`/`.cta-btn-outline` with different padding/border-radius
- `co-product-cost-accounting.html` and `lrp-vs-mrp.html` — completely different architectures

**Patterns analyzed but NOT extractable:**
- Badge/label styles — too varied (different font sizes, letter-spacing, colors across pages)
- Section label + title + subtitle — inconsistent class names, only 2 identical pages
- Card hover lift effects — only 3 pages share identical `.solution-card:hover` (1 rule, not worth it)
- Responsive media queries — ALL use page-specific class names, no identical blocks across 3+ pages
- `.btn-white`/`.btn-outline-white` — only 2 pages identical (MES + WMS), others differ
- Partner-program sub-pages — share structure but use different class prefixes (`.crisis-*`, `.econ-*`, `.stack-*`)

**Build:** 30 pages, 0 errors

## Summary: Consolidation Complete

All six pattern categories from CSS_CONSOLIDATION_PROMPT.md have been analyzed:

| Category | Result |
|---|---|
| 1. Hero section styles | EXTRACTED — 8 blog posts (~2,894 lines saved) |
| 2. Badge/label styles | SKIPPED — too varied across pages |
| 3. Section label + title + subtitle | SKIPPED — inconsistent names, max 2 identical |
| 4. Card hover lift effects | SKIPPED — max 3 identical (1 rule each) |
| 5. CTA section/banner styles | EXTRACTED — 5 pages (~233 lines saved) |
| 6. Responsive media queries | SKIPPED — all page-specific class names |

**Total lines saved: ~3,127 lines**
**Total lines added to styles.css: ~432 lines**
**Net reduction: ~2,695 lines**
