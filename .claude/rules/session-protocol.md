# Session Start Protocol — Auto-loaded every session

## Before Starting Any Work (MANDATORY)

### 1. Memory Health Check (30 seconds)
- Read `MEMORY.md` — is the project status current? Update if stale.
- Check "Scripts That Already Exist" section — do NOT propose building something listed there.
- Check "Gaps Still Open" section — are any now resolved? Update if so.

### 2. Tooling Awareness
- Before proposing any new script/tool/automation, run `ls *.js` in `complete_website/` to see what exists.
- Before proposing any new process, check `.claude/rules/` for existing rules.
- If what you're about to suggest already exists, USE IT instead of rebuilding.

### 3. Proactive Improvement (Flag, Don't Hoard)
When you notice ANY of these during a session, say it immediately — don't wait to be asked:
- A better tool, pattern, or approach exists for what we're doing
- Something we built manually could be automated
- Memory files are getting stale, duplicated, or contradictory
- A file is being edited in the wrong place (root vs src/)
- The current approach will cause problems later (tech debt)
- An industry best practice applies to what we're doing right now

Frame it as: "Before we continue — [observation]. Want me to [fix]?"

### 4. Document As You Go
After completing any of these, update the relevant memory/rules file IMMEDIATELY (not "later"):
- New script created → add to MEMORY.md "Scripts That Already Exist" table
- New decision made → add to `memory/decisions.md`
- Process rule established → add to relevant `.claude/rules/*.md` file
- Phase completed → move to `memory/archive-completed-work.md`
- Bug pattern discovered → add to `memory/css-lessons-learned.md`

### 5. End-of-Session Hygiene
Before the session ends or context runs low:
- Update MEMORY.md project status if anything changed
- Note any unfinished work in "Gaps Still Open"
- Ensure any new files/scripts are documented

## Failure Cases (Feb 2026) — These Must Never Happen Again
1. Claude let CSS grow to 6,000 lines without flagging bloat. Peter caught it.
2. Claude let 35 pages ship without accessibility fundamentals. Peter had to drive a 2-day retrofit.
3. Claude treated auditing as a separate manual task instead of an automatic part of every page build.
4. Claude executed repetitive work (page-by-page audits) without questioning whether it should be automated.

## Automatic Triggers — Claude MUST Stop Work and Speak Up When:
1. Any file grows >200 lines in a single session without consolidation
2. A CSS/HTML/content pattern repeats 3+ times across files
3. A third-party claim (dates, features, statistics) hasn't been verified against a source
4. An approach will create rework across multiple pages
5. Work is repetitive and could be automated (scripted or parallelized via agents)
6. Work lacks a clear objective or measurable outcome
7. The current approach contradicts industry best practices Claude knows from experience
8. A page is about to be presented without passing all automated + manual audits

## How to Flag (plain language, not jargon)
- "Hey — what we're doing here isn't professional. Here's the industry standard way: [explanation]. Want me to do it that way instead?"
- "I'm seeing us repeat the same pattern for the 4th time. Let me consolidate this into one reusable component before we continue."
- "This is going to create rework later. Let me fix the root cause now — it'll take 10 minutes and save us hours."
- "Before I build this, I want to flag: we're heading in a direction that [specific problem]. The better path is [alternative]. Your call."

## Self-Critique Before Presenting
- Red team your own work from the user's perspective before showing it
- Ask: "Would a manufacturing business owner find this compelling?"
- Ask: "Would a senior web developer approve this code?" If not, fix it first.
- Identify weaknesses proactively rather than waiting for feedback
