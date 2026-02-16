# Plan: Divi 5 Page Acceptance Criteria

**Date:** 2026-02-16
**Status:** DRAFT — awaiting Peter's approval + red team results

---

## Problem

We have 16 Divi 5 content specs with 480+ validation checklist items. **Zero** have:
- Verification methods (HOW to check)
- Pass/fail thresholds (WHAT counts as passing)
- Automated test hooks (WHERE the check runs)

Result: Every page build becomes subjective. Claude doesn't know when to stop iterating, Peter doesn't know what "done" means, and we end up in back-and-forth cycles.

## Goal

**Every page has binary pass/fail acceptance criteria BEFORE building starts.** Claude builds → runs verification → presents a green/red report. Peter sees results, not drafts.

---

## Approach: Embedded Acceptance Criteria (Option 1 — Extend In-Place)

### Why NOT separate files?
- Content specs are already the single source of truth per page
- Separate acceptance files create sync drift (spec says X, acceptance says Y)
- The SVG Animation Acceptance Spec works as standalone because it applies to ONE component across pages — page-level criteria are page-specific by nature

### Why NOT full YAML automation?
- We haven't built a single page yet beyond hero POC
- Automating 480 checks before knowing which ones matter is premature
- The hero POC taught us: acceptance criteria evolve during build (we added R3a, K1a mid-session)
- **Plan:** Start with structured markdown → graduate individual checks to automation as they prove their value

### What changes in each ContentSpec

**Replace** the current `## Validation Checklist` section with `## Acceptance Criteria`.

Each criterion follows this template:

```markdown
### [ID]. [Short description]
**Priority:** P0 (blocks ship) | P1 (must fix before Peter review) | P2 (nice to have)
**Verify:** [Exact steps — what to click, measure, or run]
**Pass:** [Quantitative threshold or binary condition]
**Fail:** [What to check if it fails — root cause hints]
```

### Priority Levels

| Level | Meaning | Gate |
|-------|---------|------|
| **P0** | Blocks shipping. Accessibility, broken links, wrong content, layout collapse | Must pass before presenting to Peter |
| **P1** | Must fix before Peter's final review. Design system compliance, animation timing, responsive fidelity | Fix during build, verify before review |
| **P2** | Nice to have. Performance optimization, micro-interactions, polish | Flag for Peter, fix if time allows |

### Criterion Categories (consistent across all pages)

| Category | ID Prefix | What it covers |
|----------|-----------|----------------|
| **L** — Layout | L1, L2... | Section structure, grid behavior, stacking order, responsive breakpoints |
| **C** — Content | C1, C2... | Exact copy matches spec, no fabricated terms, stats verified |
| **D** — Design System | D1, D2... | Colors match tokens, fonts loaded, spacing correct |
| **A** — Accessibility | A1, A2... | Skip link, landmarks, alt text, contrast, reduced-motion, form labels |
| **I** — Interactions | I1, I2... | Hover effects, scroll animations, tab switching, accordion behavior |
| **R** — Responsive | R1, R2... | Breakpoint behavior at 1440/1024/768/480/375 |
| **P** — Performance | P1, P2... | Load time, CLS, image optimization |
| **E** — Editability | E1, E2... | Content editable in Visual Builder, no hardcoded strings in Code Modules |

### What "Done" Means for a Page

A page is **DONE** when:
1. All P0 criteria pass (automated + manual)
2. All P1 criteria pass (verified by Claude before presenting)
3. P2 criteria are documented with status (pass/skip/defer)
4. Peter gives visual approval after seeing the green report

### Global Criteria (apply to ALL pages — written once, referenced everywhere)

Instead of repeating the same 15 checks in every spec, we create ONE file:

**`docs/build/Global_Acceptance_Criteria.md`**

Contains criteria that apply to every single page:
- A1. Skip-to-content link present (P0)
- A2. `<main>` landmark present (P0)
- A3. `prefers-reduced-motion` disables all animations (P0)
- A4. No contrast below 0.75 on dark backgrounds (P0)
- A5. All images have alt text or aria-hidden (P0)
- D1. Colors use design variable tokens (P1)
- D2. Fonts loaded: Noto Sans, JetBrains Mono (P1)
- D3. No hardcoded brand colors in inline styles (P1)
- L1. No horizontal scroll at any breakpoint (P0)
- L2. All internal links resolve to existing pages (P0)
- C1. No fabricated product terminology (P0)
- C2. Dynamic year shows correct value: `currentYear - 1982` (P1)
- P1. Page loads under 3s on throttled 4G (P2)
- E1. All text content editable in Visual Builder (P1)
- E2. Content survives VB re-save without loss (P1)
- E3. No empty sections/rows — every Section and Row contains at least one module (P0)
  - **Verify:** Open page in Divi Visual Builder → check Layers panel. No section or row should show "No Modules"
  - **Pass:** Every Section contains at least one Row, every Row contains at least one Column with at least one module
  - **Fail:** Empty containers = content not pushed correctly via API, or modules used block types that don't render (wp:divi/code, wp:divi/button, wp:divi/group produce empty divs — see Gotcha #10)

Each page spec then says:
```markdown
## Acceptance Criteria

**Global criteria:** All checks from `docs/build/Global_Acceptance_Criteria.md` apply.

### Page-Specific Criteria
[Only criteria unique to THIS page]
```

This eliminates ~15 duplicate items × 16 specs = 240 redundant lines.

---

## Execution Plan

### Phase 1: Template + Global Criteria (Today)
1. Create `docs/build/Global_Acceptance_Criteria.md` (~15 criteria)
2. Create `docs/build/Acceptance_Criteria_Template.md` (the format reference)
3. Pilot on **Home page spec** — replace validation checklist with acceptance criteria

### Phase 2: Batch Upgrade (Parallel Agents)
4. Launch parallel agents to upgrade all 16 specs simultaneously
5. Each agent:
   - Reads the page's current validation checklist
   - Reads the page's section-by-section breakdown (for context)
   - Converts checkbox items into structured criteria with verify/pass/fail
   - Removes items already covered by Global Criteria
   - Assigns P0/P1/P2 priorities
   - Adds criteria the checklist missed (based on section details)

### Phase 3: Cross-Page Consistency Check
6. One agent reads ALL 16 upgraded specs and checks:
   - Consistent ID numbering
   - No page-specific criterion that should be global
   - No global criterion missing from any page reference
   - Verify methods are actionable (not vague)

### Phase 4: Wire to Automation (Progressive)
7. Extend `verify-divi5.js` to read criteria from specs (or a JSON derivative)
8. Start with global criteria (already partially covered by `audit.js`)
9. Add page-specific checks as each page gets built

---

## What This Prevents

| Without Criteria | With Criteria |
|-----------------|---------------|
| "Does this look right?" → subjective | "L3 passes at 1440px, fails at 768px" → specific |
| 3-5 review rounds per page | 1 build + 1 verification + 1 Peter review |
| Claude guesses when to stop | Claude runs checks, presents green/red |
| Same bugs across multiple pages | Global criteria catch them once |
| "The label font seems off" | "D3: label font-size must be 10px ±1px" |

---

## Estimated Scope

| Item | Count | Effort |
|------|-------|--------|
| Global criteria | ~15 | 30 min |
| Template | 1 | 15 min |
| Home page pilot | ~35 criteria | 45 min |
| Remaining 15 specs | ~25 criteria each | 3-4 hours (parallel agents) |
| Cross-page consistency | 1 pass | 30 min |
| **Total** | ~400 criteria | ~6 hours |

---

## Red Team Questions (for AI agents to attack)

1. **Will this actually reduce iterations?** Or will Peter find things the criteria don't cover?
2. **Is the verify method actionable enough?** Can Claude execute it without interpretation?
3. **Do we need screenshots as golden refs for every page?** Or only for complex sections?
4. **What happens when a criterion is wrong?** Update workflow?
5. **Is P0/P1/P2 the right granularity?** Or do we need P0 = automated, P1 = manual, P2 = optional?
6. **Will specs become too long?** Current Home spec is 1,136 lines. Adding criteria could push to 1,500+.
7. **How do we handle Divi 5 quirks we haven't discovered yet?** (Like the white background, font inheritance, etc.)
8. **Should criteria reference the HTML original as ground truth?** Or stand independently?
