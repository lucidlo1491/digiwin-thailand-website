# Autopilot v7 — Trustworthy Visual Comparison + Build Right From Source

You are running the autopilot visual fidelity loop for page: **$ARGUMENTS**

**Core principle:** Make the WordPress Divi 5 page look identical to the HTML reference site.

**v7.1 key change:** Data-first diagnostic hierarchy. Fidelity-check (structured data) is the PRIMARY diagnostic. Claude Vision is demoted to STRUCTURAL checks only (missing/extra elements). Pixel diff remains the pass/fail GATE. CSD provides fix recipes.

**The Perception Gap:** LLMs process images as 16×16 patches. A 20px padding difference ≈ 1 patch. Research confirms Claude/GPT-4/Gemini all fail at detecting CSS-level differences from screenshots. The solution: give Claude exact property values (fidelity-check output), not pixels.

**What's in v7.1:**
- Shared screenshot config (`screenshot-config.js`) — deterministic, comparable captures across all tools
- Side-by-side composite images — Peter can see REF vs WP in one PNG
- Review HTML page (`screenshots/review-{page}.html`) — interactive toggle/slider
- **Fidelity-check as primary diagnostic** (exact CSS property values, not visual guessing)
- **Claude Vision demoted to structural checks** (missing SVGs, extra pseudo-elements, broken layouts)
- HTML files are the PRIMARY build source (mechanical translation). ContentSpec is verification only.
- 17 build principles embedded (from v1-v6 + Round 2/3 red team findings)
- **Gate 6 + Gate 7 in build-page.js** (--full-verify flag): auto-run fidelity-check + visual-diff + regression

---

## Phase 0 — HTML Source Analysis

**Before touching ANY builder code**, read the HTML source:

1. **Read the HTML source file** (e.g. `complete_website/index.html` for home):
   - Identify every section, every element, every class, every attribute
   - Note interactive elements: `data-particles`, canvas, scroll triggers, counter animations
   - Note decorative elements: wave fades, gradient transitions, grain textures, SVG backgrounds
   - Note text content: quotation marks, em dashes, special characters

2. **For each section**, create a mental inventory:
   - Elements present (what must appear in `blocks()`)
   - CSS classes used (what must appear in `css()`)
   - Scripts present (what must be inlined in Code Module)
   - Opacity values, z-index stacking, overflow behavior

**This inventory is your build truth. The builder must reproduce it 1:1.**

---

## Phase 1 — Pre-Build Validation (5 Gates)

### Gate A: LocalWP Running
```bash
curl -sk --max-time 5 -o /dev/null -w "%{http_code}" https://digiwin-thailand.local/ 2>/dev/null
```
If not `200`, STOP and tell Peter to start LocalWP.

### Gate B: Page Config Exists
Load from `complete_website/divi5/pages/$ARGUMENTS.js`. Extract:
- `pageId`, `protoFile`, `verify.wpUrl`, `verify.sections`
- If missing, STOP.

### Gate C: HTML Reference Exists
Verify `complete_website/{protoFile}` exists on disk.

### Gate D: Lock Check
```bash
ls /tmp/autopilot-$ARGUMENTS.lock 2>/dev/null
```
If lock exists and is <30 min old, STOP. Otherwise create:
```bash
echo $$ > /tmp/autopilot-$ARGUMENTS.lock
```

### Gate E: Builder Element Parity (MANUAL — most important gate)
For each section builder, compare `blocks()` output against HTML source:
- [ ] Every HTML element has a corresponding builder element
- [ ] No builder element exists that isn't in the HTML
- [ ] Interactive elements preserved (canvas, data-particles, scroll triggers)
- [ ] Decorative elements preserved (wave fades, gradients, grain textures)
- [ ] Text content matches EXACTLY (quotation marks `\u201C`/`\u201D`, em dashes)
- [ ] CSS-assembler functions (sectionHeaderCSS, cardCSS) — do they add unwanted pseudo-elements not in HTML? If so, DON'T USE them.
- [ ] Scripts scoped to section-specific selectors (not generic)

---

## Phase 2 — Build + Capture

1. **Capture HTML reference screenshots** (auto-invalidates if source changed):
   ```bash
   node complete_website/divi5/lib/screenshot-reference.js --page $ARGUMENTS --force-recapture
   ```

2. **Build the WordPress page** (full build, all sections):
   ```bash
   node complete_website/divi5/build-page.js --page $ARGUMENTS --force
   ```
   Automatically: backs up → pushes to MySQL → flushes cache → screenshots (with warm-up) → Gates 1-3.

3. **Run visual diff** (generates composites + review HTML):
   ```bash
   node complete_website/divi5/lib/visual-diff.js --page $ARGUMENTS
   ```
   Generates: per-section diff PNGs, side-by-side composite PNGs, `screenshots/review-$ARGUMENTS.html`.

4. **Report baseline** — show Peter:
   - Per-section pixel diff verdicts: MATCH (<2%) / REVIEW (2-5%) / FAIL (>5%)
   - Height mismatch warnings (if any)
   - Location of `screenshots/review-$ARGUMENTS.html` for interactive review

---

## Phase 3 — Convergence (Data-First Hierarchy)

**Core insight: Don't ask Claude to see. Give it data.**
LLMs process images as 16×16 patches. A 20px padding difference ≈ 1 patch. Claude is good at CONFIRMING differences Peter points out, but cannot DISCOVER CSS-level differences independently. The tools that output exact property mismatches already exist — use them first.

For each section, in priority order (FAIL > REVIEW):

### Layer 1: PIXEL DIFF as GATE
**Tool:** `visual-diff.js --page $ARGUMENTS`
- <2% = **MATCH** → section DONE, skip all further diagnosis
- 2-5% = **REVIEW** → Layer 2 quick scan, accept if cosmetic
- >5% = **FAIL** → full Layer 2 + 3 diagnosis MANDATORY

### Layer 2: FIDELITY CHECK as PRIMARY DIAGNOSTIC (structured data)
**Tool:** `fidelity-check.js --page $ARGUMENTS [--section <fail-section>]`
**For FAIL sections**, fidelity-check outputs exact property mismatches:
```
FIXABLE: .card padding-top: expected "24px", got "40px"
  → Fix: .card{padding-top:24px} in section css()
FIXABLE: h3 font-size: expected "20px", got "32px"
  → Fix: .card-name{font-size:20px} in section css()
```
**Claude applies each fix mechanically.** No guessing. No visual interpretation.
- **FIXABLE** — real CSS bugs to fix (font, color, padding on content elements)
- Filter: ignore STRUCTURAL (Divi wrapper defaults) and ACCEPTABLE (equivalent values)

### Layer 3: CLAUDE VISION as STRUCTURAL CHECK (missing/extra elements only)
**Tool:** Claude reads the composite PNG (or ref + WP screenshots)
**Only used for issues fidelity-check CANNOT catch:**
- `MISSING_ELEMENT` — SVG/decoration/animation not in builder
- `EXTRA_ELEMENT` — Decorator function adding unwanted pseudo-elements
- `LAYOUT_DIFF` — Fundamentally different grid/flex structure
- `TEXT_CONTENT_DIFF` — Missing text, wrong quotation marks

**Vision is NOT used for:** font-size, padding, margin, color, line-height, font-weight.
These are CSS properties — fidelity-check gives exact values. Vision cannot.

### Layer 4: COMPUTED STYLE DIFF as CSS PRESCRIPTION
**Tool:** `computed-style-diff.js --page $ARGUMENTS [--section <fail-section>]`
**For remaining FAIL sections after Layer 2 fixes.**
Maps structural observations to exact CSS property + selector with fix recipes.

### Layer 5: ELEMENT PRESENCE as STRUCTURAL SANITY CHECK
**Tool:** `visual-diff.js --page $ARGUMENTS --presence-check`
Catches elements that are in DOM but invisible (opacity:0, display:none, zero dimensions).

---

## Phase 4 — Fix Loop (max 3 iterations per section)

### State tracking:
```
bestDiffPct = current pixel diff% per section
bestCode = snapshot of builder file before changes
noImprovementCount = 0
```

### Per iteration:

1. **Identify FAIL sections** from visual diff (>5%).

2. **Run fidelity-check** (Layer 2 — PRIMARY):
   - Read the FIXABLE output (structured data, exact property values)
   - Apply each fix mechanically — the data tells you the CSS

3. **If fidelity-check found nothing**, use Claude Vision (Layer 3 — STRUCTURAL):
   - Read composite PNG for the section
   - Look for MISSING/EXTRA elements, layout structure issues
   - Do NOT try to diagnose CSS property values from screenshots

4. **For remaining CSS issues**, run computed-style-diff (Layer 4):
   - Filter to `fixability: "FIXABLE"` only
   - Ignore STRUCTURAL and ACCEPTABLE

5. **Fix in priority order:**
   - `MISSING_ELEMENT` → add to `blocks()`
   - `EXTRA_ELEMENT` → remove decorator call or override with `display:none`
   - CSS property fixes → apply exact values from fidelity-check/CSD output
   - `LAYOUT_DIFF` → fix in `css()` (check Divi max-width: 1080px default)

5. **Read the section builder file** before making changes.

6. **FULL-PAGE rebuild** (NEVER partial):
   ```bash
   node complete_website/divi5/build-page.js --page $ARGUMENTS --force
   ```

7. **Re-run visual diff + regression check:**
   ```bash
   node complete_website/divi5/lib/visual-diff.js --page $ARGUMENTS --regression-check
   ```
   If `--regression-check` exits non-zero, a previously-passing section regressed >2pp — revert the change immediately.

8. **Check improvement (pixel diff% is convergence):**
   - If section diffPct < bestDiffPct → update, save bestCode, reset counter
   - If MATCH (<2%) → section DONE
   - If REVIEW (2-5%) → section acceptable
   - If no improvement → increment noImprovementCount

9. **Stop conditions:**
   - **All sections MATCH or REVIEW** → page DONE
   - **No pixel improvement for 2 consecutive iterations** → rollback to bestCode
   - **3 iterations reached** → report remaining issues and STOP

### Safeguards:
- **Regression guard:** After each fix, check ALL section diffs. If any MATCH section regressed, revert immediately.
- **Oscillation detection:** Hash all verdicts. Same hash twice → halt with `NEEDS_HUMAN_REVIEW`.
- **Scope isolation:** CSS fixes must only modify selectors with the section's class prefix.
- **Always use `--force`** for builds during autopilot.

---

## Phase 5 — Final Verification + Peter Review

1. **Full rebuild + screenshots:**
   ```bash
   node complete_website/divi5/build-page.js --page $ARGUMENTS --force
   ```

2. **Full visual diff (generates final review page):**
   ```bash
   node complete_website/divi5/lib/visual-diff.js --page $ARGUMENTS
   ```

3. **Element presence check:**
   ```bash
   node complete_website/divi5/lib/visual-diff.js --page $ARGUMENTS --presence-check
   ```

4. **Claude reads and describes EVERY section screenshot** (NON-NEGOTIABLE):
   - Read each composite PNG using the Read tool
   - Describe what matches and what differs
   - This is the "human eyes" check Peter wants

5. **Tell Peter to open the review page:**
   ```
   Open screenshots/review-$ARGUMENTS.html in your browser for interactive comparison.
   ```

6. **Final report:**
   ```
   ═══════════════════════════════════════════════════════════
   AUTOPILOT v7 COMPLETE — $ARGUMENTS
   ═══════════════════════════════════════════════════════════
   Section          | Pixel Before | Pixel After | Verdict  | Vision Notes
   -----------------+--------------+-------------+----------+-------------
   hero             | 7.9%         | 1.8%        | MATCH    | —
   logo-bar         | SKIP         | SKIP        | MATCH    | —
   factory-checks   | 5.5%         | 3.2%        | REVIEW   | Minor spacing
   ...
   ═══════════════════════════════════════════════════════════
   Review page: screenshots/review-$ARGUMENTS.html
   Files modified: [list every file changed]
   Remaining issues: [natural language description from Claude Vision]
   ```

7. **Remove lock:**
   ```bash
   rm -f /tmp/autopilot-$ARGUMENTS.lock
   ```

---

## Build Principles (17 rules — embedded from v1-v6)

### P1: HTML is the build source
The HTML prototype file is the PRIMARY truth for building. ContentSpec is for verification only. Read HTML first, build from HTML, verify against ContentSpec.

### P2: Element parity before pixel comparison
Every HTML element must have a builder counterpart. Every builder element must exist in HTML. Check BEFORE running any automated tools.

### P3: Full-page builds only
MySQL push replaces the ENTIRE `post_content`. ALWAYS rebuild all sections. NEVER push a single section.

### P4: Script isolation
Scripts must scope selectors to section-specific classes. `document.querySelectorAll('.stats-section[data-particles]')` not `[data-particles]`.

### P5: Module selection (non-negotiable)
| Content | Module | Why |
|---------|--------|-----|
| Plain text | `wp:divi/text` (textModule) | VB inline editing |
| HTML/complex | `wp:divi/code` (codeModule) | Full control, MySQL only |
| Buttons/CTAs | `wp:divi/code` with `<a>` | `wp:divi/button` renders empty |
| SVG (complex) | `wp:divi/code` + Base64 JS | wp_kses strips attributes |
| JavaScript | `wp:divi/code` | Scripts execute here |
| **NEVER** | `wp:divi/button`, `wp:divi/group` | Empty `<div>`s |
| **Max 1/page** | `wp:html` (htmlBlock) | "Unknown Module" in VB |

### P6: CSS architecture
- All CSS in `css()` function → assembled into pageLevelCSS (`_et_pb_custom_css`)
- Scoped by section class prefix
- Override Divi defaults: `background:transparent!important;padding:0!important` on sections
- Row: `max-width:100%!important;margin:0!important;padding:0!important`

### P7: Protected properties — NEVER override with !important on `.et_pb_*`:
`display`, `flex-direction`, `flex-wrap`, `flex-grow`, `flex-shrink`, `flex-basis`

### P8: Font rules
- Font JSON properties are IGNORED by Divi — always use CSS
- Available: Noto Sans (400-800), JetBrains Mono (500-700), Noto Sans SC
- D46 rule: Never use `family` JSON property — it wraps in quotes, creating unmatched names

### P9: SVG handling
- Complex SVGs (transform, animation, preserveAspectRatio) → Base64 JS injection
- Simple SVGs (fill, stroke, opacity only) → inline in Code Module
- Use SVG attributes not CSS: `stop-color="#fff"` not `style="stop-color:#fff"`

### P10: CSS-assembler traps (5 functions that ADD elements)
| Function | What it adds | Trap |
|----------|-------------|------|
| `sectionHeaderCSS(prefix)` | `::before`+`::after` flanking lines on label | Doubled lines if HTML already has `<span>` lines |
| `cardCSS(prefix)` | Card styles with hover | May cascade-conflict with explicit card CSS |
| `buttonLightCSS(prefix)` | `::before` sweep animation on buttons | Extra pseudo-element |
| `grainCSS(selector)` | `::before` grain texture overlay | May duplicate existing grain element |
| `statsCSS(prefix)` | Stats row + border-top | May conflict with custom stats layout |

**Rule:** If HTML doesn't have the pseudo-element, DON'T USE the assembler function. Write CSS manually.

### P11: `themeBuilderReset(sectionIndex)`
Resets Divi theme builder defaults for a specific section. The `sectionIndex` is the 0-based position in the page. **Reordering sections breaks all reset indices.**

### P12: `GLOBAL_THEME_RESET`
Zeros ALL padding on sections/rows/columns. Builders need higher specificity to add padding back.

### P13: `textModule()` limitation
Same font-size value on ALL breakpoints (desktop/tablet/phone). For responsive sizing, use Code Module with CSS `@media` queries.

### P14: Max 1 `wp:html` per page
All JS must consolidate into a single `htmlBlock()`. Multiple `wp:html` blocks show as "Unknown Module" in Visual Builder.

### P15: `pageJS` is dead code
Scripts must go inside `<script>` tags within `codeModule()` in builders. The config-level `pageJS` function is never executed.

### P16: mu-plugin dependency
`digiwin-svg-kses.php` must be installed in `wp-content/mu-plugins/`. It allows additional SVG attributes through wp_kses. Without it, some inline SVGs break.

### P17: Counter initial values
Stats counters should render their FINAL value in HTML (e.g., `44` not `0`). The animation script will animate from 0 → target on scroll. This ensures screenshots always capture final values.

---

## Module Translation Table (ContentSpec names → modules.js functions)

| ContentSpec Term | modules.js Function | Notes |
|-----------------|--------------------|-|
| Text Module | `textModule(content, fontOpts, moduleOpts)` | Plain text only |
| Code Module | `codeModule(html, adminLabel)` | Full HTML, MySQL only |
| HTML Block | `htmlBlock(content)` | Max 1 per page |
| Section | `sectionOpen(opts)` + `sectionClose()` | Always wrap content |
| Row | `rowOpen(opts)` + `rowClose()` | `columns: 1` for full-width |
| Column | `columnOpen(opts)` + `columnClose()` | `css:` for overrides |
| "Fullwidth Section" | Not available in Divi 5 | Use Section + Row(columns:1) |
| "Specialty Section" | Not available | Use Code Module with CSS grid |
| "Button Module" | **BANNED** — use Code Module | `wp:divi/button` renders empty |

---

## Minimal Page Config Skeleton (for new pages)

```javascript
// pages/{page}.js
const path = require('path');

// Import section builders
const section1Builder = require('./sections/{page}-{section1}');
// ...

module.exports = {
  pageId: 0,  // Get from MySQL: SELECT ID FROM wp_posts WHERE post_name='{slug}'
  title: 'Page Title',
  siteUrl: 'https://digiwin-thailand.local',
  specPath: path.join(__dirname, '..', '..', '..', 'docs', 'content-specs', 'ContentSpec_{Page}_Divi5_2.0.md'),
  prototypePath: path.join(__dirname, '..', '..', '{page}.html'),
  protoFile: '{page}.html',

  sections: [
    { name: 'section1', builder: section1Builder },
    // ...
  ],

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 1,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/?page_id=0',  // Update with real page ID
    sections: [
      {
        name: 'section1',
        wpSelector: '.section1-wrapper',    // Class from YOUR Code Module
        htmlSelector: '.dw-section1',        // Class in HTML prototype
        pixelThreshold: 0.1,
        requiredElements: [
          { selector: '.section1-title', label: 'Section Title' },
        ],
        styleMap: [
          // Point to content elements INSIDE Code Modules, never .et_pb_* wrappers
          { label: 'Title', htmlSel: '.dw-section1 .dw-title', wpSel: '.section1-title' },
        ],
      },
    ],
  },
};
```

### Finding/Creating WordPress Page ID

```sql
-- Find existing page:
SELECT ID, post_title, post_name FROM wp_posts WHERE post_type='page' AND post_status='publish';

-- Create new page:
INSERT INTO wp_posts (post_title, post_name, post_type, post_status, post_content, post_author)
VALUES ('Page Title', 'page-slug', 'page', 'publish', '', 1);
-- Use LAST_INSERT_ID() as pageId in config
```

---

## Per-Section Baseline Guidance

| Section Type | Expected Baseline | Why |
|-------------|------------------|-----|
| Gradient backgrounds | 3-5% | Gradient rendering differs between static HTML and Divi |
| Particle animations | SKIP pixel diff | Canvas = random frame each capture |
| Logo marquee | SKIP pixel diff | Overflow + animation state |
| Dark sections with SVG | 3-8% | SVG rendering + opacity stacking |
| Light sections, no animation | <2% | Should be near-exact |
| Sections with counters | <3% after V17 fix | Counters now render final values |

---

## Rules (NON-NEGOTIABLE)

1. **ALWAYS show Peter screenshots.** Read composite PNGs and describe what you see.
2. **Full-page builds only.** Never use `--section` for MySQL push.
3. **Read before editing.** Always read the builder file before changes.
4. **Pixel diff is the GATE.** Fidelity-check is the PRIMARY DIAGNOSTIC (data). Vision is STRUCTURAL only. CSD is the PRESCRIPTION.
5. **Don't fix STRUCTURAL or ACCEPTABLE mismatches.** They're expected Divi differences.
6. **Don't loop on unfixable issues.** Report and move on.
7. **Respect the HTML source.** Don't change copy, structure, or functionality.
8. **Never fabricate product terminology.** Search codebase first.
9. **Track cumulative changes.** Summarize every file modified at the end.
10. **Protected properties.** NEVER override display/flex-* with !important on .et_pb_*.
11. **SVG background rule.** Never apply ::before/::after to .et_pb_* selectors.
12. **styleMap targets content elements** inside Code Modules, never .et_pb_* wrappers.
13. **Review page is mandatory.** Tell Peter to open `screenshots/review-{page}.html`.
