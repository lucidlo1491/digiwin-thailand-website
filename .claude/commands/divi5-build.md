---
description: "Build a Divi 5 page with mandatory visual verification"
argument-hint: "<page-name> [--section <name>]"
---

Build and visually verify a Divi 5 page. Steps (ALL mandatory):

1. Run: node complete_website/divi5/build-page.js --page $ARGUMENTS
2. The build script automatically (Gates 6-7 + auto-fix are DEFAULT ON):
   - Pushes to WordPress via MySQL, flushes cache, captures screenshots
   - Gates 1-5: content parity, element parity, design system, editability, color parity
   - Gate 6: fidelity-check finds exact CSS mismatches
   - Auto-fix patches SAFE issues, re-pushes, re-captures screenshots
   - Gate 7: visual-diff with regression check
3. Show Peter EVERY screenshot (Read tool on each .png).
4. Present results clearly:
   - "Auto-fix applied N fixes. M AMBIGUOUS remain: [list]"
   - "Visual diff: X MATCH, Y REVIEW, Z FAIL"
5. Peter reviews and flags what automation missed.
6. Claude iterates (max 2 rounds per section), then escalates with data.

CRITICAL RULES:
- Gates 6-7 + auto-fix run by default. Use --skip-verify / --skip-autofix only for quick iteration.
- Do NOT substitute code review for visual verification.
- Do NOT say "verified" without showing screenshots.
- If auto-fix regressions are detected, it auto-reverts. Report this.
- If LocalWP is down, say so and STOP.

---

## PRESENTATION GATE (MANDATORY)

Claude MUST NOT present results to Peter if ANY of these are true:
- Any section has FAIL verdict (>5% pixel diff) AND FIXABLE items remain in fidelity-check
- Content parity gate failed (wrong text)
- Any dark section lacks `!important` color overrides

Claude must self-correct (apply fixes → rebuild → re-verify) until:
(a) All sections are MATCH or REVIEW, OR
(b) Only AMBIGUOUS/STRUCTURAL items remain, OR
(c) 3 iterations reached with no pixel improvement.

When presenting, Claude MUST include:
- Screenshot of every section (Read tool on each .png)
- Explicit list of remaining AMBIGUOUS items with remediation options
- Confidence: "X/Y sections MATCH, Z REVIEW, W unresolvable"

Claude NEVER says "done" or "verified" — presents data and lets Peter judge.
