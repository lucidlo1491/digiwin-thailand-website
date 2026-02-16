# Global Acceptance Criteria — DigiWin Thailand Divi 5 Build

Every page/section pushed to WordPress must pass ALL P0 criteria before review.
P1 criteria are expected for production. P2 criteria are best practices.

**Source documents** (every criterion traces to one of these):
1. **PRD** — `docs/strategy/DigiWin_Website_PRD_v1.2.md`
2. **Playbook** — `docs/strategy/DigiWin_Persuasion_Playbook_v1.0.md`
3. **ContentSpec** — `docs/content-specs/ContentSpec_*_Divi5_2.0.md` (per page)
4. **Pipeline** — `memory/divi5-api-pipeline.md` (WordPress technical constraints)
5. **Decisions** — `memory/decisions.md` (42 settled decisions)

Page-specific criteria (tabs, logo grids, forms, blog layouts) belong in each page's ContentSpec — not here.

---

## D — Design System

| ID | Check | P | Source |
|----|-------|---|--------|
| D1 | **Fonts loaded:** Noto Sans (400–800) + JetBrains Mono (500–700) via mu-plugin `wp_enqueue_style()`. Verify: `document.fonts` entries show `status==='loaded'` for both families. Never use `@import` in `_et_pb_custom_css`. | P0 | PRD §Typography, D4, D42, Pipeline §mu-plugin |
| D2 | **Font sizes match ContentSpec** — compare `getComputedStyle()` vs spec at 1440px viewport, ±1px tolerance. | P1 | ContentSpec per page |
| D3 | **Colors use design tokens** — `var(--dw-*)` in HTML site CSS, or Divi Design Variables in WP. No hardcoded hex in pageLevelCSS except inside `@keyframes` or SVG attributes. | P1 | PRD §Design System, D1–D3 |
| D4 | **No hardcoded brand colors in inline styles** — all color via CSS classes in `_et_pb_custom_css`. | P1 | Pipeline §wp_kses |
| D5 | **Spacing matches ContentSpec** — margin/padding within ±4px at 1440px. All spacing via pageLevelCSS classes, not module JSON. | P1 | ContentSpec, Pipeline §Gotcha #6, #11 |
| D6 | **No page-prefixed CSS selectors** when a component class exists. One `.product-hero` not five `.mes-hero`/`.erp-hero`/etc. | P1 | CSS Lessons §1 |
| D7 | **BEM naming** for all new CSS classes (`.block__element--modifier`). | P2 | CSS Lessons §4 |

### Verify / Pass / Fail Template
```
D1 Verify: Open page → DevTools Console →
  [...document.fonts].filter(f => f.family.includes('Noto Sans') && f.status === 'loaded').length > 0
  [...document.fonts].filter(f => f.family.includes('JetBrains Mono') && f.status === 'loaded').length > 0
  Both must return > 0.
Pass: Both font families show loaded entries.
Fail: Either returns 0 → check mu-plugin is active, Google Fonts URL is correct.
```

---

## L — Layout

| ID | Check | P | Source |
|----|-------|---|--------|
| L1 | **No horizontal scroll** at any breakpoint (375/480/768/1024/1440). | P0 | PRD §Responsive |
| L2 | **All internal links resolve** to existing pages — no 404s, no placeholder hrefs. | P0 | PRD §Real Links Only, D8 |
| L3 | **No ghost background images** — no double/cached images from previous page versions. Check computed `background-image` on all sections/columns. | P0 | Pipeline §v25 |
| L4 | **Column backgrounds fully opaque** unless ContentSpec explicitly specifies transparency. | P0 | Pipeline §v23 Fix #1 |
| L5 | **Section background not Divi default white** unless ContentSpec requires it. Check `background-color` is not `#fff`/`rgb(255,255,255)` unless specified. | P0 | ContentSpec |

### Verify / Pass / Fail
```
L1 Verify: At each breakpoint, check document.documentElement.scrollWidth <= window.innerWidth.
Pass: No overflow at any breakpoint.
Fail: scrollWidth exceeds innerWidth → find overflowing element via binary DOM search.

L3 Verify: Inspect all .et_pb_column elements → getComputedStyle(el).backgroundImage.
Pass: Only expected background-image URLs present (match ContentSpec or "none").
Fail: URL contains old/cached image path → clear Divi CSS cache, update column JSON.
```

---

## A — Accessibility

| ID | Check | P | Source |
|----|-------|---|--------|
| A1 | **Skip-to-content link** present (`<a class="dw-skip-link">`). | P0 | PRD §Accessibility, audit.js check |
| A2 | **`<main>` landmark** present wrapping primary content. | P0 | PRD §Accessibility, audit.js check |
| A3 | **`prefers-reduced-motion`** disables ALL animations — CSS transitions, @keyframes, SMIL elements removed via JS. | P0 | PRD §Animation, D6 |
| A4 | **Text contrast ≥ 0.75 opacity** on dark backgrounds. No `rgba(255,255,255,X)` where X < 0.75 on navy/dark sections. | P0 | PRD §Accessibility, audit.js check |
| A5 | **All images have `alt` text or `aria-hidden="true"`** for decorative images. SVG illustrations use `aria-hidden="true"`. | P0 | PRD §Accessibility |

### Verify / Pass / Fail
```
A3 Verify: Enable prefers-reduced-motion in DevTools → Rendering → Emulate CSS media feature.
  Check: No visible animations. SMIL elements removed from DOM (inspect SVG containers).
  CSS: All @keyframes gated by @media (prefers-reduced-motion: no-preference).
Pass: Page is completely static with reduced-motion enabled.
Fail: Any animation still running → add media query guard or JS removal.
```

---

## W — WordPress / Divi 5

| ID | Check | P | Source |
|----|-------|---|--------|
| W1 | **Google Fonts `<link>` in `<head>`** — mu-plugin injects via `wp_enqueue_style()`. Verify: `document.querySelector('link[href*="fonts.googleapis"]')` exists. | P0 | Pipeline §mu-plugin, D42 |
| W2 | **No cached background-image URLs** from previous page versions. Inspect computed styles on all columns. | P0 | Pipeline §v25 |
| W3 | **`wp:divi/code` for `<script>` tags** — never `wp:html` (which shows "Unknown Module" in VB). Scripts must be in Code Module content via direct MySQL. | P0 | Pipeline §Gotcha #10, D37→revised |
| W4 | **SVG containers use `wp:divi/code`** via direct MySQL — Divi Code Module wrapper preserves absolute positioning when written directly. | P0 | Pipeline §Gotcha #10 |
| W5 | **Direct MySQL write used** — not Respira API which strips `wp:divi/code` blocks. Verify: raw `post_content` in `wp_posts` table contains `<!-- wp:divi/code` blocks intact. | P0 | Pipeline §Why Direct MySQL, D37 |
| W6 | **Admin labels on all modules** — every module shows a descriptive label in VB Layers panel (e.g., "Hero Title", "CTA Buttons", not "Code Module"). | P1 | Pipeline §Admin Labels Convention |
| W7 | **No empty sections/rows in VB** — every container has at least one rendering module. Open VB Layers panel and expand all. | P0 | Pipeline §No Empty Containers |
| W8 | **Page status = "publish"** after build push. Verify: `SELECT post_status FROM wp_posts WHERE ID = {PAGE_ID}`. | P0 | Pipeline |
| W9 | **Content survives VB re-save** — open page in VB, make no changes, click Save. Reload front-end. All content still renders identically. | P1 | Pipeline §Editability |
| W10 | **Divi CSS cache handled** — either flush cache after push, or use `!important` in pageLevelCSS to override cached rules. | P1 | Pipeline |

### Verify / Pass / Fail
```
W5 Verify: Run MySQL query:
  SELECT post_content FROM wp_posts WHERE ID = {PAGE_ID};
  Search output for "wp:divi/code" — must appear for every HTML content module.
Pass: All Code Module blocks present with content intact.
Fail: Blocks missing or stripped → was pushed via Respira API. Re-push via direct MySQL.

W7 Verify: Open page in Visual Builder → Layers panel → expand all sections.
Pass: Every section/row/column has child modules, no "No Modules" indicators.
Fail: Empty container found → likely uses wp:divi/button or wp:divi/group (both produce empty divs).
```

---

## C — Content

| ID | Check | P | Source |
|----|-------|---|--------|
| C1 | **No fabricated product terminology.** Every product name, acronym expansion, feature name must exist in source docs or codebase. If not found, STOP and flag — never guess. | P0 | D33, D34, D35 |
| C2 | **Dynamic year calculation** — years since founding shows `new Date().getFullYear() - 1982`, not hardcoded. Currently: `44 years`. | P1 | D14, Pipeline §Hero JS |
| C3 | **CTA text: "Let's Talk" or "Get in Touch"** — never "Book a Demo", "Request Demo", "Schedule a Demo". DigiWin Thailand does not offer demos. | P0 | PRD §Business Constraints, D8 |
| C4 | **MES referenced generically** — never sMES, eMES, or iMES in public-facing content. Internal variants exist but are not for the website. | P0 | D31, D36 |
| C5 | **SFT = "Shop Floor Tracking"** — never "Smart Factory Transparency" or any other expansion. | P0 | D32, D33 |

### Verify / Pass / Fail
```
C1 Verify: For every product term on the page, search codebase:
  grep -r "TERM" docs/ complete_website/ memory/
Pass: Term found in at least one source document.
Fail: Term not found → it may be fabricated. Flag for Peter's review.

C3 Verify: Search page content for "demo" (case-insensitive).
Pass: No matches, or only in educational context (not CTA).
Fail: CTA contains "demo" → replace with "Let's Talk" or "Get in Touch".
```

---

## R — Responsive

| ID | Check | P | Source |
|----|-------|---|--------|
| R1 | **Layout verified at 5 breakpoints** (1440/1024/768/480/375) — no collapse, overlap, or overflow. Columns stack vertically at ≤1024px with `width:100%`. | P1 | PRD §Responsive, Pipeline §Gotcha #5 |

### Verify / Pass / Fail
```
R1 Verify: Playwright screenshots at all 5 viewports, or manual DevTools resize.
  Check: No overlapping text, no cut-off content, no horizontal scroll, columns stack below 1024px.
Pass: All 5 breakpoints render correctly.
Fail: Layout breaks → add @media query to _et_pb_custom_css for that breakpoint.
```

---

## E — Editability

| ID | Check | P | Source |
|----|-------|---|--------|
| E1 | **All text content editable in Visual Builder** — labels, subtitles, body text use `wp:divi/text` (native Text Module). Titles with `<span>` color highlights and complex HTML use `wp:divi/code` (Code Module with editing UI). | P1 | Pipeline §Gotcha #10 |
| E2 | **Content survives VB re-save without loss.** Open VB → Save (no changes) → reload front-end → compare. Same as W9. | P1 | Pipeline §Editability |

### Verify / Pass / Fail
```
E1 Verify: Open page in VB → Layers panel.
  Check: Every text element has either a Text Module (click to edit inline)
  or a Code Module (click to open code editor). No "Unknown Module" items.
Pass: All content accessible via VB editing interface.
Fail: "Unknown Module" present → convert from wp:html to wp:divi/code via direct MySQL.
```

---

## Summary

| Category | Count | P0 | P1 | P2 |
|----------|-------|----|----|-----|
| D — Design System | 7 | 1 | 5 | 1 |
| L — Layout | 5 | 5 | 0 | 0 |
| A — Accessibility | 5 | 5 | 0 | 0 |
| W — WordPress/Divi 5 | 10 | 6 | 4 | 0 |
| C — Content | 5 | 3 | 2 | 0 |
| R — Responsive | 1 | 0 | 1 | 0 |
| E — Editability | 2 | 0 | 2 | 0 |
| **Total** | **35** | **20** | **14** | **1** |

**P0 = build blocker.** Script must exit non-zero. Fix before presenting to Peter.
**P1 = production requirement.** Must be resolved before go-live.
**P2 = best practice.** Track but don't block.

---

## Automation Coverage

| Criterion | Automated by | Manual |
|-----------|-------------|--------|
| D1 | verify-divi5.js (Font Gate) | — |
| D2–D5 | verify-divi5.js (Property Coverage) | — |
| D6–D7 | — | Code review |
| L1 | verify-divi5.js (Playwright viewport check) | — |
| L2 | check-links.js | — |
| L3–L5 | verify-divi5.js (computed style checks) | — |
| A1–A4 | audit.js (6 checks) | — |
| A5 | — | Visual review |
| W1 | verify-divi5.js (Font Gate) | — |
| W2 | verify-divi5.js | — |
| W3–W5 | verify-divi5.js (Hydration layer) | MySQL query |
| W6–W7 | — | VB Layers panel |
| W8 | Build script (checks post_status) | — |
| W9, E2 | — | Manual VB re-save test |
| W10 | — | Cache flush after push |
| C1–C5 | extract-stats.js + grep | Code review |
| R1 | verify-divi5.js (5 viewport screenshots) | — |
| E1 | — | VB Layers panel |

**Coverage: 22/35 automated, 13/35 manual** (mostly VB interaction tests that require human verification).

---

*Created: 2026-02-16*
*Last updated: 2026-02-16*
