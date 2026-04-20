# GEO Optimization Plan — DigiWin Thailand

**Created:** 2026-03-05
**Status:** Phase 1-2 Complete (Infrastructure), Phases 3-8 Ready for Execution

## Problem Statement

Homepage CORE-EEAT audit scored **43/100** (Low). GEO Score: 48.8. SEO Score: 37.0. Despite Lighthouse 100/100/100/100 and 0 P0 responsive issues, the site is nearly invisible to AI citation engines. 84 JSON-LD schema blocks exist in HTML prototypes but ZERO are on the live WordPress pages.

## Infrastructure Delivered

### 1. GEO Auditor Agent
- **File:** `.claude/agents/geo-auditor.md`
- **Command:** `/geo-audit <slug>` or `/geo-audit --all`
- 80-item CORE-EEAT framework (8 dimensions × 10 items)
- Anti-hallucination rules baked in
- Saves reports to `docs/geo-audits/{slug}-audit.md`

### 2. Schema Generator Library
- **File:** `complete_website/divi5/lib/schema.js`
- Functions: `organization()`, `webSite()`, `breadcrumbList()`, `softwareApplication()`, `faqPage()`, `event()`, `blogPosting()`, `webPage()`, `localBusiness()`, `thaiVariant()`
- `serialize()` for postmeta storage
- All data sourced from existing HTML prototype JSON-LD blocks

### 3. Schema MU-Plugin
- **File:** `complete_website/divi5/phpmyadmin-export/digiwin-schema.php`
- Global: Organization + WebSite on every page
- Per-page: reads `_digiwin_schema` postmeta
- Outputs valid `<script type="application/ld+json">` in `<head>`
- Upload to `wp-content/mu-plugins/`

### 4. Build Pipeline Integration
- **mysql.js:** `pushPage()` now accepts optional `schemaMeta` parameter
- **build-page.js:** If `pageConfig.schema()` exists, serializes and pushes to postmeta
- **faq-accordion.js:** New `faqSchema(data)` export auto-generates FAQPage JSON-LD

### 5. Term Definitions Library
- **File:** `complete_website/divi5/lib/term-definitions.js`
- 28 EN terms + 10 TH terms with `<abbr>` wrapping
- `expandTerms(html, lang)` for first-use abbreviation expansion

## Schema Inventory (from HTML prototypes)

| Schema Type | Count | Pages |
|-------------|-------|-------|
| Organization | 1 | Homepage (global via mu-plugin) |
| WebSite | 1 | Homepage (global via mu-plugin) |
| BreadcrumbList | 34 | All 35 EN pages (34 have it) |
| FAQPage | 17 | Products, industries, blogs |
| SoftwareApplication | 4 | ERP, MES, WMS, AIoT |
| Article | 10 | All blog posts |
| Event | 5 | All event pages |
| WebPage | 6 | Industries, about, etc. |
| CollectionPage | 4 | Products hub, blog hub, etc. |
| AboutPage | 1 | About page |
| ContactPage | 1 | Demo page |
| **Total** | **84** | **35 EN pages** |

## Execution Roadmap

### Phase 3: Per-Page Schema (Ready)
Add `schema()` function to each of the 65 page configs. Mechanical work:

```javascript
// Example: pages/erp.js
schema() {
  const s = require('../lib/schema');
  return [
    s.breadcrumbList([
      { name: 'Home', url: '/' },
      { name: 'Products', url: '/products/' },
      { name: 'ERP', url: '/erp/' },
    ]),
    s.softwareApplication({
      name: 'DigiWin ERP (T100/iGP)',
      subCategory: 'Enterprise Resource Planning',
      description: '...',
      url: '/erp/',
      featureList: '...',
    }),
  ];
},
```

### Phase 4: FAQ Auto-Schema (Ready)
Pages using `faq-accordion.js` template automatically get FAQPage schema:
```javascript
// In page config schema():
const faqTemplate = require('../lib/templates/faq-accordion');
return [...otherSchemas, faqTemplate.faqSchema(faqData)];
```

### Phase 5: Content Enrichment ([NEEDS PETER] items)
- **Source citations** for: "50,000+ clients", "100+ Thai implementations", "30% efficiency gain", "98% uptime", "95% MA renewal"
- **FAQ content** for homepage (currently has none)
- **Real client testimonials** with attribution
- **Implementation timeline expectations** for product pages

### Phase 6: Thai Bilingual Schema
- `schema.thaiVariant()` converts any schema to Thai version
- `/th/` URL prefix, `inLanguage: 'th'`, Thai translated names

### Phase 7: Red Team Validation
- Feasibility: Can `_digiwin_schema` survive WP read/write cycle?
- Anti-hallucination: Grep all schema data for unverified claims
- Pipeline: Dry-run 5 pages, verify Gates 1-7 still pass

### Phase 8: Full Audit + Baseline
- Run `/geo-audit --all` on all 65 pages
- Save baseline to `docs/geo-audits/baseline-2026-03.json`
- Target: Homepage 43/100 → 65+/100

## Deployment Checklist

- [ ] Upload `digiwin-schema.php` to `wp-content/mu-plugins/` (via DirectAdmin)
- [ ] Add `schema()` to homepage config → rebuild → verify JSON-LD in page source
- [ ] Verify no duplicate Organization schema (mu-plugin only, not in post_content)
- [ ] Add `schema()` to all 35 EN page configs
- [ ] Add `schema()` to all 26 TH page configs
- [ ] Add `schema()` to all 10 blog post configs
- [ ] Run `/geo-audit home` → verify score improvement
- [ ] Run full site audit → save baseline
- [ ] Google Rich Results Test on 5 sample pages
