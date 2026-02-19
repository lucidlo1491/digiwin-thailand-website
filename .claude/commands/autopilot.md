# Autopilot v2 — Visual Fidelity System (Data-First Protocol)

You are running the autopilot visual fidelity loop for page: **$ARGUMENTS**

Your job: make the WordPress Divi 5 page look identical to the HTML reference site. You use **data-first diagnosis** (element presence → property checks → vision), NOT vision-first guessing.

---

## Phase 1 — Pre-flight Checks

1. **Verify LocalWP is running:**
   ```bash
   curl -sk --max-time 5 -o /dev/null -w "%{http_code}" https://digiwin-thailand.local/ 2>/dev/null
   ```
   If not `200`, STOP and tell Peter to start LocalWP.

2. **Load page config** from `complete_website/divi5/pages/$ARGUMENTS.js`. Extract:
   - `pageId`, `protoFile`, `verify.wpUrl`, `verify.sections` (with selectors + `requiredElements` + `maxDiffPct`)
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

5. **Reference freshness check** — screenshot-reference.js now auto-invalidates if HTML source changed (content hash). No manual check needed.

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

3. **Run element presence checks** (PRIMARY STRUCTURAL GATE):
   ```bash
   node complete_website/divi5/lib/visual-diff.js --page $ARGUMENTS --presence-check
   ```
   This checks every `requiredElements` entry in the page config — DOM existence, visibility, opacity, dimensions.

4. **Run visual diff** (ADVISORY — does not block):
   ```bash
   node complete_website/divi5/lib/visual-diff.js --page $ARGUMENTS
   ```
   Generates per-section diff PNGs + three-tier verdicts (MATCH / REVIEW / FAIL).

5. **Report baseline** — show Peter:
   - Element presence results (any missing = STRUCTURAL issue, priority 1)
   - Visual diff verdicts per section
   - Read and display key screenshots

---

## Phase 3 — Data-First Diagnosis

For each section with issues (prioritized: FAIL > REVIEW > MATCH):

### Priority 1: STRUCTURAL (missing elements)
**FIRST** — Read element presence report. Any missing/invisible elements are `MISSING_ELEMENT` issues.
- Example: SVG illustration container exists but SVG never injected → JS execution issue
- Example: `.checks-scene` not found → section builder didn't include background SVG

### Priority 2: PROPERTY (CSS mismatches)
**SECOND** — If `verify-divi5.js` produces JSON output, read it. Property mismatches are `FIXABLE_CSS` issues.
- Example: font-family mismatch → fix in builder's `css()` function
- Example: padding different → fix in section/row/column attrs

### Priority 3: COSMETIC (pixel differences)
**THIRD** — Read visual diff report + view screenshots. Remaining differences after structural and property fixes are cosmetic.
- View both reference and WP screenshots using Read tool
- Diagnose specific visual differences

### Issue Categories
Categorize each issue as ONE of:
- `MISSING_ELEMENT` — SVG/icon/decoration not in builder output. Fix: add to `blocks()`.
- `FIXABLE_CSS` — CSS property mismatch. Fix: update builder's `css()` function.
- `DIVI_OVERRIDE_REQUIRED` — Divi default conflicts. Fix: `!important` or Code Module approach.
- `TIMING_ARTIFACT` — Screenshot captured mid-render. Fix: retry with longer wait.
- `KNOWN_ACCEPTABLE` — Intentionally different, documented in decisions.md. **Only valid skip category.**

---

## Phase 4 — Fix Loop (Convergence-Based)

### State tracking per section:
```
bestDiffPct = current diff%
bestCode = snapshot of builder file before changes
noImprovementCount = 0
verdictHistory = [] (for oscillation detection)
```

### Per iteration:

1. **Read the section builder file** before making any changes.

2. **Fix in priority order:**
   - `MISSING_ELEMENT` first — add SVGs/decorations to `blocks()` using wrapper div + Base64 pattern
   - `FIXABLE_CSS` second — update `css()` function
   - `DIVI_OVERRIDE_REQUIRED` third — add `!important` or Code Module

3. **Edit the builder file** with targeted, scoped fixes.

4. **FULL-PAGE rebuild** (NEVER partial — MySQL replaces entire post_content):
   ```bash
   node complete_website/divi5/build-page.js --page $ARGUMENTS --force
   ```

5. **Re-run checks:**
   - Element presence (if fixing MISSING_ELEMENT)
   - Visual diff for the page
   ```bash
   node complete_website/divi5/lib/visual-diff.js --page $ARGUMENTS
   ```

6. **Check improvement:**
   - If new diff% < bestDiffPct → update bestDiffPct, save bestCode, reset noImprovementCount
   - If new diff% >= bestDiffPct → increment noImprovementCount
   - If diff MATCH (<3%) → section done, move to next

7. **Stop conditions:**
   - **No improvement for 2 consecutive iterations** → rollback to bestCode, move to next section
   - **Section reaches MATCH** → done
   - **All sections MATCH or REVIEW** → done

### Safeguards:

- **Regression guard:** After each fix, check ALL section verdicts. If any previously-MATCH section worsened, immediately revert the change.
- **Oscillation detection:** Hash all section verdicts after each iteration. If the same hash appears twice, halt with `NEEDS_HUMAN_REVIEW`.
- **Scope isolation:** CSS fixes must only modify selectors containing the section's class prefix (e.g., `.checks-*` for factory-checks). Cross-section selectors → escalate to human.
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

3. **Full visual diff:**
   ```bash
   node complete_website/divi5/lib/visual-diff.js --page $ARGUMENTS
   ```

4. **Read and display** the final reference vs WordPress screenshots for ALL sections.
   - Use the Read tool to view each pair of PNGs
   - Describe what you see to Peter
   - **This is NON-NEGOTIABLE — Claude MUST show every screenshot**

5. **Final report:**
   ```
   ═══════════════════════════════════════════════════════════
   AUTOPILOT v2 COMPLETE — $ARGUMENTS
   ═══════════════════════════════════════════════════════════
   Section          | Before | After  | Verdict | Elements
   -----------------+--------+--------+---------+---------
   hero             | 45.2%  | 2.1%   | MATCH   | 5/5 ✓
   logo-bar         | SKIP   | SKIP   | MATCH   | —
   factory-checks   | 22.1%  | 5.4%   | REVIEW  | 3/3 ✓
   ...
   ═══════════════════════════════════════════════════════════
   Issues remaining: [list any REVIEW or FAIL sections with reason]
   Files modified: [list every file changed]
   ```

6. **Remove lock file:**
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

9. **Data-first, not vision-first.** Always read element presence + property check data BEFORE using vision to diagnose issues. Claude vision hallucination is a known failure mode — never trust visual diagnosis alone for CSS values.

10. **SVG background rule.** NEVER apply `::before`/`::after` to `.et_pb_*` selectors (Divi owns those). Always use wrapper `<div>` inside Code Module for decorative elements.
