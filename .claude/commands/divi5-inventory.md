---
description: "Quick reference card for Divi 5 modules, templates, layers, and patterns"
argument-hint: "[modules|templates|layers|patterns|all]"
---

# /divi5-inventory — Quick Reference Card

Show Divi 5 pipeline reference information. Topic: **$ARGUMENTS** (default: all)

---

## How to Use

Read the requested topic section(s) from memory files and current source code, then present a formatted reference card.

### Topic: `modules`
Read `complete_website/divi5/lib/modules.js` and present:
- All exported functions with signatures
- Module selection guide (when to use each)
- BUILDER_VERSION constant
- Banned modules and why

### Topic: `templates`
Read `complete_website/divi5/lib/templates/index.js` and list:
- All registered templates with descriptions
- For each: what it generates, example usage file, when to use vs custom
- How to use: `require('./lib/templates/{name}')`

### Topic: `layers`
Read `memory/divi5-vb-expert-guide.md` and present:
- 4-layer CSS hierarchy (JSON props → page CSS → !important → Code Module)
- D80 property reliability table (which JSON properties actually work)
- When to use each layer
- Common pitfalls

### Topic: `patterns`
Read `memory/divi5-build-principles.md` and present:
- 15 build rules summary (one line each)
- Dark section pattern
- SVG handling pattern (inline vs Base64)
- Counter/animation pattern
- Responsive breakpoint pattern

### Topic: `all`
Present all four topics above.

---

## Format

Present as a clean, scannable reference card. Use tables where appropriate. Keep it concise — this is a lookup tool, not documentation.

Example output for `modules`:
```
═══ DIVI 5 MODULE REFERENCE ═══

Function              | Use For                    | Notes
textModule()          | Plain text (VB editable)   | D80: font props unreliable, use CSS backup
codeModule()          | HTML/CSS/JS (full control) | MySQL only, not VB-editable
htmlBlock()           | Max 1 per page             | "Unknown Module" in VB
sectionOpen/Close()   | Section wrapper            | adminLabel for VB panel
rowOpen/Close()       | Row wrapper                | columns: 1 for full-width
columnOpen/Close()    | Column wrapper             | css: for overrides
placeholderWrap()     | Page assembly              | Wraps all blocks for MySQL
postTitleModule()     | Dynamic post title         | Theme Builder only
postContentModule()   | Dynamic post content       | Theme Builder only
blogModule()          | Blog listing               | Theme Builder only

BANNED: wp:divi/button (renders empty), wp:divi/group (empty div)
VERSION: 5.0.0-public-beta.8
```

---

## Rules

1. Read from CURRENT source files, not memory (modules.js and templates may have changed).
2. Cross-reference with memory files for D80 table and build principles.
3. Keep output under 100 lines — this is a quick reference, not a tutorial.
4. No file modifications — this is a read-only command.
