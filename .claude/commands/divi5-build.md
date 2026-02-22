---
description: "Build a Divi 5 page with mandatory visual verification"
argument-hint: "<page-name> [--section <name>]"
---

Build and visually verify a Divi 5 page. Steps (ALL mandatory):

1. Run: node complete_website/divi5/build-page.js --page $ARGUMENTS --full-verify --auto-fix
2. The build script automatically:
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
- ALWAYS use --full-verify --auto-fix. Never skip Gates 6-7.
- Do NOT substitute code review for visual verification.
- Do NOT say "verified" without showing screenshots.
- If auto-fix regressions are detected, it auto-reverts. Report this.
- If LocalWP is down, say so and STOP.
