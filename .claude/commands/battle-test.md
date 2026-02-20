# Battle-Test: Persistent QA Agents

Run 5 specialist agents sequentially on a Divi 5 page. Each agent reads its accumulated memory, runs checks, and writes back new learnings.

## Usage
- `/battle-test <page>` — Run all 5 agents on a page
- `/battle-test <page> css` — CSS Fidelity agent only
- `/battle-test <page> build` — Build QA agent only
- `/battle-test <page> visual` — Visual Diff agent only
- `/battle-test <page> responsive` — Responsive QA agent only
- `/battle-test <page> content` — Content Parity agent only

## Arguments
- `$ARGUMENTS` — page name (required), optionally followed by agent name

## Instructions

Parse `$ARGUMENTS` to extract the page name (first word) and optional agent filter (second word).

For each agent (or the filtered one), follow this exact sequence:

### 1. CSS Fidelity Agent
1. Read `memory/agents/css-fidelity.md` — note known quirks and fix patterns
2. Run `node complete_website/divi5/lib/fidelity-check.js --page <page>`
3. Report: FIXABLE count, STRUCTURAL count, new quirks found
4. If new quirks found, append to `memory/agents/css-fidelity.md`
5. Update session count and last-run date

### 2. Build QA Agent
1. Read `memory/agents/build-qa.md` — note build rules
2. Run `node complete_website/divi5/build-page.js --page <page> --dry-run`
3. Verify: block types, admin labels, CTA text, CSS prefix uniqueness
4. Report any violations
5. If new issues found, append to `memory/agents/build-qa.md`

### 3. Visual Diff Agent
1. Read `memory/agents/visual-diff.md` — note known visual differences
2. Run `node complete_website/divi5/lib/screenshot-reference.js --page <page>`
3. Run `node complete_website/divi5/lib/visual-diff.js --page <page>`
4. Read the composite PNGs and describe what you see
5. Report: MATCH/REVIEW/FAIL per section, pixel diff percentages
6. If new diagnosis patterns found, append to `memory/agents/visual-diff.md`

### 4. Responsive QA Agent
1. Read `memory/agents/responsive-qa.md` — note known issues
2. Review the template CSS for correct breakpoint handling
3. Check: grid collapse, padding scale, font size scale, button full-width
4. Report any missing or incorrect responsive rules
5. If new responsive issues found, append to `memory/agents/responsive-qa.md`

### 5. Content Parity Agent
1. Read `memory/agents/content-parity.md` — note content rules
2. Check section builder data against HTML prototype content
3. Verify: headings match, CTA text valid, Unicode preserved, stats sourced
4. Report any content mismatches
5. If new content issues found, append to `memory/agents/content-parity.md`

### Summary
After all agents run, provide a summary table:

```
| Agent | Status | Findings |
|-------|--------|----------|
| CSS Fidelity | ✓/⚠/✗ | X fixable, Y structural |
| Build QA | ✓/⚠/✗ | X violations |
| Visual Diff | ✓/⚠/✗ | X match, Y review, Z fail |
| Responsive | ✓/⚠/✗ | X issues at N breakpoints |
| Content Parity | ✓/⚠/✗ | X mismatches |
```

Key: ✓ = all pass, ⚠ = minor issues, ✗ = blocking issues

IMPORTANT: After running, update each agent's memory file with new learnings. This is how agents accumulate experience across sessions.
