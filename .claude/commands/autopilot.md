# Autopilot v3 — Visual Fidelity System (Computed Style + Prescriptive Diagnosis)

You are running the autopilot visual fidelity loop for page: **$ARGUMENTS**

Your job: make the WordPress Divi 5 page look identical to the HTML reference site. You use **four-layer data-first diagnosis** (structural → computed style → pixel → vision), NOT vision-first guessing.

**v3 upgrade over v2:** Computed style extraction replaces CSS guessing. Every mismatch gets a prescriptive fix recipe. Style-first convergence ensures fixes are measurable.

---

## Phase 1 — Pre-flight Checks

1. **Verify LocalWP is running:**
   ```bash
   curl -sk --max-time 5 -o /dev/null -w "%{http_code}" https://digiwin-thailand.local/ 2>/dev/null
   ```
   If not `200`, STOP and tell Peter to start LocalWP.

2. **Load page config** from `complete_website/divi5/pages/$ARGUMENTS.js`. Extract:
   - `pageId`, `protoFile`, `verify.wpUrl`, `verify.sections` (with selectors + `requiredElements` + `maxDiffPct` + `styleMap`)
   - If page config doesn't exist, STOP.

3. **Verify HTML reference file exists** at `complete_website/{protoFile}`.

4. **Check file lock** — ensure no other autopilot is running:
   ```bash
   ls /tmp/autopilot-$ARGUMENTS.lock 2>/dev/null
   ```
   If lock exists and is <30 min old, STOP. Otherwise create the lock:
   ```bash
   echo $$ > /tmp/autopilot-$ARGUMENTS.lock
   ```

5. **Reference freshness check** — screenshot-reference.js auto-invalidates if HTML source changed (content hash). No manual check needed.

6. **Pre-flight asset check** — for each section, verify any referenced external URLs (images, fonts) return HTTP 200. If critical assets are missing, STOP.

---

## Phase 2 — Baseline Capture

1. **Capture HTML reference screenshots** (auto-invalidates if source changed):
   ```bash
   node complete_website/divi5/lib/screenshot-reference.js --page $ARGUMENTS
   ```

2. **Build the WordPress page** (full build, all sections):
   ```bash
   node complete_website/divi5/build-page.js --page $ARGUMENTS --force
   ```
   This automatically: backs up → pushes to MySQL → flushes cache → screenshots (with warm-up) → runs Gates 1-3.

3. **Run element presence checks** (LAYER 1 — STRUCTURAL GATE):
   ```bash
   node complete_website/divi5/lib/visual-diff.js --page $ARGUMENTS --presence-check
   ```
   This checks every `requiredElements` entry — DOM existence, visibility, opacity, dimensions.

4. **Run computed style diff** (LAYER 2 — STYLE GATE):
   ```bash
   node complete_website/divi5/lib/computed-style-diff.js --page $ARGUMENTS
   ```
   Extracts computed styles from matched element pairs (via `styleMap` in page config), compares 30+ properties with fuzzy matching. Outputs JSON + console report with fix recipes.

5. **Run visual diff** (LAYER 3 — PIXEL — ADVISORY):
   ```bash
   node complete_website/divi5/lib/visual-diff.js --page $ARGUMENTS
   ```
   Generates per-section diff PNGs + three-tier verdicts (MATCH / REVIEW / FAIL).

6. **Report baseline** — show Peter:
   - Element presence results (any missing = STRUCTURAL issue, priority 1)
   - Computed style mismatches per section (with fix recipes)
   - Visual diff verdicts per section
   - Read and display key screenshots

---

## Phase 3 — Four-Layer Prescriptive Diagnosis

For each section with issues (prioritized: FAIL > REVIEW > MATCH):

### Layer 1: STRUCTURAL (missing elements)
**Tool:** `visual-diff.js --presence-check`
**Catches:** Missing/invisible elements, zero-dimension containers
**Fix in:** Builder's `blocks()` function

### Layer 2: STYLE (computed CSS mismatches)
**Tool:** `computed-style-diff.js --page $ARGUMENTS`
**Catches:** Wrong font, color, spacing, background, layout
**Fix in:** Builder's `css()` function
**Read the JSON output:** `screenshots/style-diff-$ARGUMENTS.json`

### Layer 3: PIXEL (visual diffs not caught by L1-L2)
**Tool:** `visual-diff.js --page $ARGUMENTS`
**Catches:** Visual differences not explained by structural or style data
**Fix in:** `css()` or `blocks()` depending on diagnosis

### Layer 4: VISION (remaining after L1-L3)
**Tool:** Claude reads screenshots using Read tool
**Catches:** Subtle visual issues, animation/transition artifacts
**Fix in:** Judgment call — only use after L1-L3 data is exhausted

### Issue Categories
Categorize each issue as ONE of:
- `MISSING_ELEMENT` — SVG/icon/decoration not in builder output. Fix: add to `blocks()`.
- `FIXABLE_CSS` — Computed style mismatch. Fix: update builder's `css()` function.
- `DIVI_OVERRIDE_REQUIRED` — Divi default conflicts. Fix: `!important` or Code Module approach.
- `TIMING_ARTIFACT` — Screenshot captured mid-render. Fix: retry with longer wait.
- `KNOWN_ACCEPTABLE` — Intentionally different, documented in decisions.md. **Only valid skip category.**

### Prescriptive Fix Recipes (from computed-style-diff output)

```
FONT MISMATCH →
  1. Check font loading (document.fonts.check)
  2. Check D46 mangling (Divi Text Module wraps font in quotes)
  3. Fix: !important on .et_pb_text .et_pb_text_inner p { font-family: ... }

COLOR MISMATCH →
  1. Check Divi default color bleeding (section/row/column defaults)
  2. Fix: !important on the specific .et_pb_section_N selector

SPACING MISMATCH →
  1. Check Divi default padding (4% left/right on .et_pb_row)
  2. Check .et_pb_code_inner wrapper padding
  3. Fix: padding:0 !important on .et_pb_row, .et_pb_code_inner

BACKGROUND MISMATCH →
  1. Check Divi inline styles (module settings override CSS)
  2. Fix: !important on BOTH background AND background-image

LAYOUT MISMATCH →
  1. Check Divi max-width:1080px default on rows
  2. Fix: max-width:100% !important on .et_pb_row_N

OVERFLOW MISMATCH →
  1. Check overflow:hidden clipping absolutely positioned decorations
  2. Fix: overflow:visible !important on the section/row
```

### PROTECTED PROPERTIES — NEVER override with !important:
`display`, `flex-direction`, `flex-wrap`, `flex-grow`, `flex-shrink`, `flex-basis`
Overriding these on `.et_pb_*` elements WILL break Divi's layout engine.

---

## Phase 4 — Fix Loop (Style-First Convergence)

### State tracking per section:
```
bestMismatchCount = current style mismatches
bestDiffPct = current pixel diff%
bestCode = snapshot of builder file before changes
noImprovementCount = 0
verdictHistory = [] (for oscillation detection)
```

### Per iteration:

1. **Read the computed-style-diff JSON** (`screenshots/style-diff-$ARGUMENTS.json`):
   - Identify top mismatches by category
   - Note the fix recipes from the output

2. **Fix in priority order:**
   - `MISSING_ELEMENT` first — add SVGs/decorations to `blocks()` using wrapper div + Base64 pattern
   - `FONT` mismatches second — most visually impactful
   - `COLOR` mismatches third
   - `SPACING` mismatches fourth
   - `BACKGROUND` mismatches fifth
   - `LAYOUT` mismatches last

3. **Read the section builder file** before making any changes.

4. **Edit the builder file** with targeted, scoped fixes.

5. **FULL-PAGE rebuild** (NEVER partial — MySQL replaces entire post_content):
   ```bash
   node complete_website/divi5/build-page.js --page $ARGUMENTS --force
   ```

6. **Re-run computed style diff** (FAST — no screenshots needed, direct style measurement):
   ```bash
   node complete_website/divi5/lib/computed-style-diff.js --page $ARGUMENTS
   ```

7. **Re-run visual diff:**
   ```bash
   node complete_website/divi5/lib/visual-diff.js --page $ARGUMENTS
   ```

8. **Check improvement (BOTH metrics must be tracked):**
   - If new mismatchCount < bestMismatchCount → update bestMismatchCount, save bestCode, reset noImprovementCount
   - If new diffPct < bestDiffPct → update bestDiffPct
   - If mismatchCount = 0 AND diffPct < 3% → section DONE
   - If neither improved → increment noImprovementCount

9. **Stop conditions:**
   - **No improvement for 2 consecutive iterations** → rollback to bestCode, move to next section
   - **0 style mismatches AND MATCH pixel verdict** → done
   - **All sections at 0 mismatches or REVIEW** → done

### Smart Deep-Scan Trigger:
If pixel diff > 10% but computed-style-diff shows < 3 mismatches, run deep-scan:
```bash
node complete_website/divi5/lib/computed-style-diff.js --page $ARGUMENTS --deep-scan
```
This checks ALL computed properties (not just the default 30+) to find hidden mismatches.

### Safeguards:

- **Regression guard:** After each fix, check ALL section verdicts + mismatch counts. If any previously-fixed section regressed, immediately revert the change.
- **Oscillation detection:** Hash all section verdicts + mismatch counts after each iteration. If the same hash appears twice, halt with `NEEDS_HUMAN_REVIEW`.
- **Scope isolation:** CSS fixes must only modify selectors containing the section's class prefix (e.g., `.checks-*` for factory-checks). Cross-section selectors → escalate to human.
- **Protected properties:** NEVER override `display`, `flex-direction`, `flex-wrap`, `flex-grow`, `flex-shrink`, `flex-basis` on `.et_pb_*` elements.
- **Never use `--section` flag** for MySQL push — always full-page builds.
- **Always use `--force`** to bypass lock warnings during autopilot.

---

## Phase 5 — Final Verification

1. **Full-page rebuild** + screenshot:
   ```bash
   node complete_website/divi5/build-page.js --page $ARGUMENTS --force
   ```

2. **Element presence check** (all required elements must be present):
   ```bash
   node complete_website/divi5/lib/visual-diff.js --page $ARGUMENTS --presence-check
   ```

3. **Final computed style diff:**
   ```bash
   node complete_website/divi5/lib/computed-style-diff.js --page $ARGUMENTS
   ```

4. **Full visual diff:**
   ```bash
   node complete_website/divi5/lib/visual-diff.js --page $ARGUMENTS
   ```

5. **Read and display** the final reference vs WordPress screenshots for ALL sections.
   - Use the Read tool to view each pair of PNGs
   - Describe what you see to Peter
   - **This is NON-NEGOTIABLE — Claude MUST show every screenshot**

6. **Final report:**
   ```
   ═══════════════════════════════════════════════════════════
   AUTOPILOT v3 COMPLETE — $ARGUMENTS
   ═══════════════════════════════════════════════════════════
   Section          | Pixel Before | Pixel After | Style Mismatches | Verdict | Elements
   -----------------+--------------+-------------+------------------+---------+---------
   hero             | 45.2%        | 2.1%        | 0                | MATCH   | 5/5 ✓
   logo-bar         | SKIP         | SKIP        | 0                | MATCH   | —
   factory-checks   | 22.1%        | 5.4%        | 2                | REVIEW  | 4/4 ✓
   ...
   ═══════════════════════════════════════════════════════════
   Remaining style mismatches: [list property, ref vs wp value, fix recipe]
   Issues remaining: [list any REVIEW or FAIL sections with reason]
   Files modified: [list every file changed]
   ```

7. **Remove lock file:**
   ```bash
   rm -f /tmp/autopilot-$ARGUMENTS.lock
   ```

---

## Rules (NON-NEGOTIABLE)

1. **ALWAYS show Peter screenshots.** After every rebuild, use Read to view PNG files and describe what you see. Never just report numbers.

2. **Full-page builds only.** MySQL replaces the entire post_content. Never use `--section` for push.

3. **Read before editing.** Always read the current builder file before making changes.

4. **Keep backups.** build-page.js auto-backs up. Never delete backups during autopilot.

5. **Don't loop on unfixable issues.** If a problem is caused by WordPress sanitization, missing uploaded media, or Divi 5 limitations — report it clearly and move on.

6. **Respect the ContentSpec.** Don't change copy, structure, or functionality to "match" the screenshot. Only fix visual styling.

7. **Never fabricate product terminology.** Search codebase first. If unsure, leave unexpanded and flag.

8. **Track cumulative changes.** At the end, summarize every file you modified and what changed.

9. **Data-first, not vision-first.** Always read computed-style-diff JSON + element presence data BEFORE using vision to diagnose issues. Claude vision hallucination is a known failure mode — never trust visual diagnosis alone for CSS values.

10. **SVG background rule.** NEVER apply `::before`/`::after` to `.et_pb_*` selectors (Divi owns those). Always use wrapper `<div>` inside Code Module for decorative elements.

11. **Style-first convergence.** After every fix iteration, re-run `computed-style-diff.js` BEFORE `visual-diff.js`. Mismatch count is the primary convergence metric; pixel diff% is secondary.

12. **Protected properties.** NEVER override `display`, `flex-direction`, `flex-wrap`, `flex-grow`, `flex-shrink`, `flex-basis` with `!important` on `.et_pb_*` elements. This WILL break Divi layout.
