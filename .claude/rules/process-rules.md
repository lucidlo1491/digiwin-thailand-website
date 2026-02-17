# Process Rules — Auto-loaded every session

## How Claude Works on This Project
1. **Fix, don't report.** If it violates a standard, fix it silently. Only surface genuine decisions.
2. **Warn before building.** If you see a suboptimal path, STOP and suggest better.
3. **Check decisions.md** (`memory/decisions.md`) before re-analyzing settled questions.
4. **Check source docs** (PRD, Playbook, ContentSpec) before modifying any page.
5. **Batch work.** One task = one commit, not one commit per file.
6. **NEVER fabricate product terminology.** If an acronym expansion, product name, feature name, or company description isn't found in source docs or codebase, STOP and ask Peter. Never guess.
7. **Subagent prompts MUST include anti-fabrication rule.** Every agent that touches content gets: "Never invent product terminology. Search codebase first. If unsure, leave unexpanded and flag."

## Production Workflow
1. Claude generates Content Spec from PRD + Playbook
2. Peter reviews and approves Content Spec
3. Claude builds page via Divi 5 MySQL pipeline (build-page.js)
4. Peter reviews screenshots and approves
5. Post-launch: Stock images replaced with custom photography

## Build Order
| Batch | Pages | Priority |
|-------|-------|----------|
| Global | Header & Footer | First |
| Batch 0 | 1.0 Home | Validation test |
| Batch 1 | 2.0 Partner Program | Highest |
| Batch 2-6 | Remaining 17 pages | Sequential |

## Quality Gates
- **After every page change:** visual comparison + UI/UX audit (two separate checks)
- **Every number needs a source.** Cross-ref against `memory/data-crosscheck-findings.md`
- **After any source file edit:** Run `node build.js` to compile, then `node audit.js` to verify (6 checks × 36 pages)
- **After any styles.css edit:** Run `node test-styles.js` to verify brand compliance (92 tests)

## Automated Audit (non-negotiable)
Run `node complete_website/audit.js` after every build. Checks: skip-to-content link, `<main>` landmark, contrast ≥0.75, `prefers-reduced-motion`, form label associations. If the audit fails, fix BEFORE presenting work. The `/ui-ux-pro-max review` catches design/UX issues the script can't.

## Ralph Loop (preferred audit-fix workflow)
- Peter calls it "Raphael". Use `/ralph-loop` for audit-fix-verify cycles.
- Key principle: NEVER present an audit report and ask "want me to fix it?" Find it, fix it, verify it, present the completed result.
- Pattern: `/ralph-loop "prompt" --max-iterations N --completion-promise "TEXT"`

## CSS Architecture (lessons learned Feb 2026)
- **Component-based, not page-based.** ONE `.product-hero` with CSS custom properties, not `.mes-hero`, `.erp-hero`, `.auto-hero`.
- **Design tokens everywhere.** Never hardcode colors — always `var(--dw-*)`.
- **BEM naming.** `.block__element--modifier` pattern.
- **Bloat trigger:** >50 lines growth without consolidation → STOP and propose extraction.
- **Dead CSS audit** after every batch. Remove selectors used in zero HTML files.
- **Accessibility in the template, not retrofitted.** Skip links, landmarks, reduced-motion, contrast — baked in from Day 1.
- **Context:** HTML site's `styles.css` is temporary (CloneWebX fidelity). Divi 5 replaces all CSS. Apply these lessons in Divi 5 builds.

## Divi 5 Build Protocol (MANDATORY for every build-*-divi5.js push)
1. **BEFORE writing any CSS value:** Open the page's ContentSpec. Read the exact spec values. Never eyeball from browser DevTools or styles.css.
2. **SPEC tokens block:** Every build script MUST have `const SPEC = {}` at the top with ContentSpec line numbers. All CSS values trace to SPEC. (D45)
3. **Never use Divi Text Module `family` JSON property** for non-default fonts. It wraps the value in single quotes, creating unmatched font names. Use `codeModule()` or pageLevelCSS `!important` instead. (D46)
4. **Build script auto-verifies after push.** The script MUST check ALL computed properties (fontFamily, fontSize, fontWeight, lineHeight, color) against SPEC values. Exit non-zero on mismatch. (D2=P0, D43)
5. **Build script auto-flushes Divi CSS cache** after every MySQL push. Delete `et-cache/{PAGE_ID}/`. (D47)
6. **All 5 steps happen automatically** — they are coded into the build script, not manual steps Claude remembers to do.

## Build & Audit Commands
```
node build.js        # Compile src/pages + src/partials → root HTML (36 pages)
node audit.js        # 6 checks per page: skip-link, main landmark, contrast, reduced-motion, form labels, scroll-anim safety
node test-styles.js  # 92 tests: CSS vars, deprecated values, @keyframes, SVG refs, fonts, braces, naming
node check-links.js  # Validate all internal hrefs, images, and anchor IDs (2244 links)
node extract-stats.js # Extract every number/stat with context for cross-referencing (448 stats)
node ci.js           # Master pipeline: runs ALL above in sequence (use --quick to skip link check + stats)
```

## Source File Architecture
- **ALWAYS edit `src/pages/*.html`** (source files), never the root HTML files directly
- `build.js` overwrites root files from source — direct root edits WILL be lost
- Source files use `{{basePath}}`, `{{header}}`, `{{footer}}` template variables
- Pages without a `src/pages/` equivalent can be edited directly (check with `ls src/pages/` first)

## File Organization
- **Screenshots:** Always save to `/screenshots/` folder — never the project root
- **CloneWebX exports:** Managed by `clonewebx-export.js` → `complete_website/clonewebx-exports/`
