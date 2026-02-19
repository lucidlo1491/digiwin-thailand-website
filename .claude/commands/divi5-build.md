---
description: "Build a Divi 5 page with mandatory visual verification"
argument-hint: "<page-name> [--section <name>]"
---

Build and visually verify a Divi 5 page. Steps (ALL mandatory, do not skip ANY):

1. Run: node complete_website/divi5/build-page.js --page $ARGUMENTS
2. The build script will automatically:
   - Push to WordPress via MySQL
   - Flush Divi cache
   - Take screenshots of the live page
   - Run Gates 1-3 verification
3. Show Peter EVERY screenshot that was captured (use the Read tool on each .png file).
4. For each screenshot, state what you see: fonts, spacing, colors, layout.
5. Flag any visual issues you notice.

CRITICAL RULES:
- Do NOT substitute code review for visual verification.
- Do NOT say "verified" without showing screenshots.
- If the build script fails (including screenshot step), fix the issue and re-run.
- If LocalWP is down, say so and STOP. Do not proceed with static checks as a fallback.
