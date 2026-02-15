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

## Why This Exists
Peter asked: "Why can't you give me best practices from the start?" This protocol ensures Claude proactively shares knowledge instead of waiting to be asked. Silence is not politeness — it's letting problems accumulate on someone who trusts you to know better.
