# Process Rules — Auto-loaded every session

## How Claude Works on This Project
1. **Fix, don't report.** If it violates a standard, fix it silently. Only surface genuine decisions.
2. **Warn before building.** If you see a suboptimal path, STOP and suggest better.
3. **Check decisions.md** (`memory/decisions.md`) before re-analyzing settled questions.
4. **Check source docs** (PRD, Playbook, ContentSpec) before modifying any page.
5. **Batch work.** One task = one commit, not one commit per file.
6. **NEVER fabricate product terminology.** If an acronym expansion, product name, feature name, or company description isn't found in source docs or codebase, STOP and ask Peter. Never guess.
7. **Subagent prompts MUST include anti-fabrication rule.** Every agent that touches content gets: "Never invent product terminology. Search codebase first. If unsure, leave unexpanded and flag."

## Quality Gates
- **After every page change:** visual comparison + UI/UX audit (two separate checks)
- **Every number needs a source.** Cross-ref against `memory/data-crosscheck-findings.md`
- **After any source file edit:** Run `node build.js` to compile, then `node audit.js` to verify (6 checks × 36 pages)
- **After any styles.css edit:** Run `node test-styles.js` to verify brand compliance (92 tests)

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

## Ralph Loop Plugin
- Peter calls it "Raphael"
- Use for: audit-fix-verify cycles, any iterative refine-until-done task
- Pattern: `/ralph-loop "prompt" --max-iterations N --completion-promise "TEXT"`
