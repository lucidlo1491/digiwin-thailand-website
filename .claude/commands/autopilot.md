# Autopilot Visual Fidelity — HTML Reference vs WordPress

You are running the autopilot visual fidelity loop for page: **$ARGUMENTS**

Your job: make the WordPress Divi 5 page look identical to the HTML reference site, section by section. You screenshot both sides, compare, diagnose differences with your vision, fix the section builder code, rebuild, and repeat until they match.

---

## Phase 1 — Pre-flight Checks

1. **Verify LocalWP is running:**
   ```bash
   curl -sk --max-time 5 -o /dev/null -w "%{http_code}" https://digiwin-thailand.local/ 2>/dev/null
   ```
   If not `200`, STOP and tell Peter to start LocalWP.

2. **Load page config** from `complete_website/divi5/pages/$ARGUMENTS.js`. Extract:
   - `pageId`, `protoFile`, `verify.wpUrl`, `verify.sections` (with `htmlSelector` + `wpSelector`)
   - If page config doesn't exist, STOP and tell Peter.

3. **Verify HTML reference file exists** at `complete_website/{protoFile}`.

4. **Check file lock** — ensure no other autopilot is running:
   ```bash
   ls /tmp/autopilot-$ARGUMENTS.lock 2>/dev/null
   ```
   If lock exists and is <30 min old, STOP. Otherwise proceed and create the lock:
   ```bash
   echo $$ > /tmp/autopilot-$ARGUMENTS.lock
   ```

5. **Pre-flight asset check** — for each section, verify any referenced external URLs (images, fonts) return HTTP 200. If critical assets are missing (e.g., uploaded media), STOP with a clear message — the autopilot loop can't fix missing uploads.

---

## Phase 2 — Baseline Capture

1. **Capture HTML reference screenshots** (cached — skips if already exist):
   ```bash
   node complete_website/divi5/lib/screenshot-reference.js --page $ARGUMENTS
   ```
   Use `--force-recapture` only if Peter explicitly requests fresh reference shots.

2. **Build the WordPress page** (full build, all sections):
   ```bash
   node complete_website/divi5/build-page.js --page $ARGUMENTS --force
   ```
   This automatically: backs up → pushes to MySQL → flushes cache → screenshots → runs Gates 1-3.

3. **Run visual diff:**
   ```bash
   node complete_website/divi5/lib/visual-diff.js --page $ARGUMENTS
   ```
   This generates diff PNGs in `screenshots/diffs/`.

4. **Report baseline** — show Peter the diff percentages for all sections. Read and display the diff report.

---

## Phase 3 — Claude Vision Comparison

For each section (prioritized by highest diff% first):

1. **Read BOTH screenshots** using the Read tool:
   - Reference: `screenshots/reference/$ARGUMENTS-{section}.png`
   - WordPress: Find the latest `screenshots/verify/$ARGUMENTS-{section}-*.png`

2. **LOOK at both images carefully.** Diagnose specific differences:
   - Layout: spacing, alignment, widths, padding
   - Typography: font family, size, weight, line-height, color
   - Backgrounds: gradients, SVGs, patterns, colors
   - Missing elements: icons, images, decorative elements
   - Visual weight: contrast, hierarchy

3. **Prioritize fixes** by impact: structural issues (missing backgrounds, wrong layout) before cosmetic issues (slight spacing differences).

---

## Phase 4 — Fix Loop (per section, highest diff% first)

For each failing section:

### Iteration tracking
- `bestDiff` = current diff% for this section
- `bestCode` = current builder code (snapshot before changes)
- `attempts` = 0
- `maxAttempts` = 3 (extend to 7 if diff% is consistently decreasing)

### Per iteration:

1. **Read the section builder file** (e.g., `complete_website/divi5/pages/sections/home-{section}.js`)

2. **Identify CSS/HTML fixes** based on visual diagnosis. Common fixes:
   - Background colors/gradients: update CSS in the builder's `css()` function
   - Missing SVG backgrounds: check if SVG survived WordPress sanitization (Base64 encode if needed)
   - Font issues: use `!important` in page-level CSS (never Divi Text Module `family` property)
   - Spacing: adjust padding/margin in the section/row/column attrs
   - Missing elements: add them to the `blocks()` output

3. **Edit the builder file** with targeted fixes.

4. **FULL-PAGE rebuild** (NEVER partial — MySQL replaces entire post_content):
   ```bash
   node complete_website/divi5/build-page.js --page $ARGUMENTS --force
   ```

5. **Re-run visual diff** for just this section:
   ```bash
   node complete_website/divi5/lib/visual-diff.js --page $ARGUMENTS
   ```

6. **Check improvement:**
   - If new diff% < bestDiff → update bestDiff, save bestCode, continue
   - If new diff% >= bestDiff for 2 consecutive attempts → **rollback to bestCode**, move to next section
   - If diff% < 5% → section is GOOD ENOUGH, move to next section

7. **Increment attempts.** If attempts >= maxAttempts → move to next section (keep best version).

### Safeguards:
- **Never use `--section` flag** for MySQL push — always full-page builds
- **Always use `--force`** to bypass lock warnings during autopilot
- **Check for oscillation** — if fix A improves section X but breaks section Y, rollback to best-so-far
- **Max 3 attempts per section** by default (extend to 7 only if measurably improving each iteration)

---

## Phase 5 — Final Verification

1. **Full-page rebuild** + screenshot:
   ```bash
   node complete_website/divi5/build-page.js --page $ARGUMENTS --force
   ```

2. **Full visual diff:**
   ```bash
   node complete_website/divi5/lib/visual-diff.js --page $ARGUMENTS
   ```

3. **Read and display** the final reference vs WordPress screenshots side by side for ALL sections.
   - Use the Read tool to view each pair of PNGs
   - Describe what you see to Peter

4. **Final report:**
   ```
   ═══════════════════════════════════════════════════
   AUTOPILOT COMPLETE — $ARGUMENTS
   ═══════════════════════════════════════════════════
   Section          | Before | After  | Status
   -----------------+--------+--------+--------
   hero             | 45.2%  | 3.1%   | ✓ PASS
   logo-bar         | SKIP   | SKIP   | ✓ SKIP
   factory-checks   | 22.1%  | 8.4%   | ✓ PASS
   ...
   ═══════════════════════════════════════════════════
   ```

5. **Remove lock file:**
   ```bash
   rm -f /tmp/autopilot-$ARGUMENTS.lock
   ```

---

## Rules (NON-NEGOTIABLE)

1. **ALWAYS show Peter screenshots.** After every rebuild, use Read to view the PNG files and describe what you see. Never just report numbers — Peter wants to SEE the page.

2. **Full-page builds only.** MySQL replaces the entire post_content. Never use `--section` for push.

3. **Read before editing.** Always read the current builder file before making changes.

4. **Keep backups.** build-page.js auto-backs up. Never delete backups during autopilot.

5. **Don't loop on unfixable issues.** If a problem is caused by WordPress sanitization (SVG stripping), missing uploaded media, or Divi 5 limitations — report it clearly and move on.

6. **Respect the ContentSpec.** Don't change copy, structure, or functionality to "match" the screenshot. Only fix visual styling.

7. **Never fabricate product terminology.** Search codebase first. If unsure, leave unexpanded and flag.

8. **Track cumulative changes.** At the end, summarize every file you modified and what changed.
