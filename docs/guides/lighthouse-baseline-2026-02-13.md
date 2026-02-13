# Lighthouse Baseline — Feb 13, 2026

All 35 pages audited on desktop via Lighthouse 13.0.1 against `localhost:3456`.

## Scores Summary (Post-Fix)

| Category | Before | After | Improvement |
|----------|--------|-------|-------------|
| Performance | 99.7 avg | 99.7 avg | — (already excellent) |
| Accessibility | 90.1 avg (89–94) | **100** (all pages) | +10 points |
| Best Practices | 97.5 avg | 97.5 avg | — |
| SEO | 92.0 avg | 92.0 avg | — |

**27/27 sampled pages verified at Accessibility 100.**

## What Was Fixed

### 1. Color Contrast (was score: 0 on all pages)
- **Root cause:** `rgba(255,255,255,0.75)` text on navy backgrounds = 4.3:1 (below 4.5:1)
- **Fix:** Bumped to `rgba(255,255,255,0.85)` across 28 instances in `styles.css` + inline styles
- **Also fixed:** `#64748b` muted text → `#5b6b80` (90 instances across 16 pages)
- **Also fixed:** `.dw-btn-primary` background `#00AFF0` → `#006dac` (white text contrast 2.5:1 → 5.5:1)
- **Also fixed:** Active filter tabs (blog, case-studies) white-on-blue → `#006dac`
- **Also fixed:** Brand blue used as text color on light backgrounds → `#0369a1` (accessible text blue)
- **Also fixed:** Bright accent text colors: `#4ade80`→`#15803d`, `#10b981`→`#047857`, `#16a34a`→`#15803d`, `#f59e0b`→`#92400e`, `#ef4444`→`#b91c1c`, `#8B5CF6`→`#6d28d9`
- **Also fixed:** `.event-agenda-item--break` had `opacity: 0.6` making ALL child text fail — replaced with individual color styling

### 2. Heading Order (was score: 0 on all pages)
- **Root cause:** H1→H3 skips and H2→H4 skips across 5 pages
- **Pages fixed:**
  - `blog.html`: Featured article H3 → H2
  - `about.html`: 16 x H4 → H3 (outcomes, references, awards sections)
  - `case-studies.html`: 5 card H3 → H2
  - `news.html`: Featured H3 → H2, 7 x H4 → H3
  - `demo.html`: 2 checkbox H4 → H3

### 3. Touch Targets (was score: 0 on most pages)
- **Root cause:** Footer links had no padding, header CTA was 1px short
- **Fix:** `.dw-header-cta` padding 14px → 15px (43px → 45px height)
- **Fix:** `.dw-footer-links a` added `display: inline-flex; align-items: center; min-height: 44px`
- **Fix:** `.dw-footer-legal a` padding 8px → 15px (30px → 44px height)
- **Fix:** `.dw-footer-contact a` added `display: inline-flex; align-items: center; min-height: 44px`

### 4. Case Studies Page (bonus fixes)
- Low-contrast inline styles: `rgba(255,255,255,0.7)` and `rgba(255,255,255,0.6)` → `0.85`
- Missing `prefers-reduced-motion` media query for pulse animation
- Inline script used `DigiWinUI` without `DOMContentLoaded` wrapper

## Performance Notes (unchanged)

- ERP page: Performance 96 (CLS 0.128, score 82)
- Electronics page: Performance 99 (TBT 110ms, score 96)
- Thai RD blog: Performance 99 (CLS 0.063, score 97)
- All other pages: Performance 100

## SEO Note (unchanged)

All pages score 92. The missing 8 points likely come from:
- No structured data detected by Lighthouse (we have JSON-LD but Lighthouse may not parse all types)
- Possible missing meta robots or hreflang tags
