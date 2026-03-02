---
description: "Scaffold Divi 5 builder files from HTML prototype with full-spectrum CSS extraction"
argument-hint: "<page-slug>"
---

# /divi5-scaffold — HTML→Divi 5 Conversion Skill

Convert an HTML prototype page into Divi 5 builder .js files. Three phases: analyze, plan, generate.

**Page slug:** `$ARGUMENTS`

---

## Phase A: Full-Spectrum Analysis (read-only)

Read the COMPLETE rendering stack for this page. Do NOT skip any source.

### Step A1: Locate Files
```
HTML prototype:  complete_website/$ARGUMENTS.html
External CSS:    complete_website/styles.css
JS scripts:      complete_website/digiwin-components.js, digiwin-dynamic.js
```
Read ALL of these files. If the HTML file doesn't exist, STOP and tell Peter.

### Step A2: Extract Per-Section Data

For EACH `<section>` inside `<main>`, extract:

| What | Where | What to Extract |
|------|-------|----------------|
| DOM structure | HTML `<section>` elements | Section boundaries, element tree, text content **verbatim** |
| Inline CSS | `<style>` blocks in HTML | Rules matching section classes |
| External CSS (base) | `styles.css` | Rules matching section classes — base styles |
| External CSS (hover) | `styles.css` | `:hover` rules for buttons, cards, links |
| External CSS (pseudo) | `styles.css` | `::before`/`::after` rules (decorative overlays, glow, grain, dots) |
| External CSS (hidden) | `styles.css` | `display:none` rules (elements NOT to include in builder) |
| External CSS (responsive) | `styles.css` `@media` blocks | What changes at 1024/768/480px |
| Hover states | CSS `:hover` rules | Button effects, card transforms, link color changes |
| Pseudo-elements | CSS `::before`/`::after` | Decorative overlays, lines, shadows |
| Scroll animations | `data-*` attributes + JS | What triggers, what animates, final state values |
| JavaScript behavior | `<script>` + external JS | Counter animations, tab switching, accordion, particles |
| Decorative SVGs | Inline SVGs + CSS `background-image` | Complexity level → inline vs Base64 JS injection |
| Backgrounds | CSS gradients | Exact stop colors, angles, positions |

### Step A3: Print Analysis Report

For each section, print:
```
── Section: {name} (line {N}) ──
  Classes: {list}
  Background: {gradient/color/transparent}
  Dark section: {yes/no}
  Text elements: {count} (H1: N, H2: N, H3: N, p: N, spans: N)
  CSS rules: {N inline} + {N base} + {N hover} + {N pseudo} + {N hidden} + {N responsive}
  SVGs: {count} ({simple/complex})
  JavaScript: {counter/tabs/accordion/particles/none}
  Scroll animations: {yes/no} — {what triggers}
  Internal links: {list of .html hrefs to remap}
```

**CRITICAL:** Extract ALL text content verbatim. Every heading, paragraph, button label, stat number. This is the content truth — never paraphrase.

---

## Phase B: Module Strategy (read-only, prints decision table)

For each element in each section, decide the Divi module strategy.

### Step B1: Read Reference Files
- Read `memory/divi5-vb-expert-guide.md` — D80 property reliability table, 4-layer hierarchy
- Read `memory/divi5-build-principles.md` — 15 build rules
- Check template registry: `require('./lib/templates/index').list()`

### Step B2: Decision Table

Print for each section:
```
── Section: {name} — Module Strategy ──
Element         | Module        | Layer | D80 Reliable? | CSS Fallback? | Template?
Section wrapper | codeModule    | 4     | N/A           | Full control  | {template-name or "custom"}
H1 title        | textModule    | 1+3   | NO (size)     | clamp() !important | —
Card grid       | codeModule    | 4     | N/A           | Full control  | card-grid-dark
Button CTA      | codeModule    | 4     | N/A           | Full control  | —
FAQ accordion   | accordionItem | 1     | YES           | None needed   | —
```

**Layer reference:**
- Layer 1: Divi module JSON properties (VB panel)
- Layer 2: Page-level CSS (`_et_builder_page_level_css`)
- Layer 3: CSS `!important` overrides
- Layer 4: Code Module (full HTML control, MySQL only)

**D80 unreliable properties** (MUST have CSS fallback):
`fontSize`, `letterSpacing`, `lineHeight`, `fontFamily` on textModule/heading.

### Step B3: Template Matching

For sections that match existing templates, note:
- Template name + example reference file
- What the template provides vs what needs customization
- Whether to use template or go custom (if >50% custom CSS needed, go custom)

Print summary. Claude can proceed to Phase C or ask Peter about ambiguous decisions.

---

## Phase C: Generate Files (writes files)

### Step C1: Run Scaffold Builder
```bash
node complete_website/divi5/lib/scaffold-builder.js --page $ARGUMENTS [--force]
```

This generates the initial section builder files with:
- `blocks()` wrapping HTML in `base.wrapInDiviSection()`
- `css()` with inline CSS + auto-ported hover/pseudo/base from styles.css
- Font smoothing reset, reduced motion, list reset as needed
- `${P}` prefix remapping on class names
- Internal `.html` links remapped to WordPress slug format

### Step C2: Review + Enhance Generated Files

For EACH generated section file, read it and verify/enhance:

1. **SPEC block**: Add `const SPEC = {}` at top with exact CSS values from Phase A analysis. Include source reference (styles.css line number or inline `<style>` origin).

2. **Verbatim content**: Compare generated text against Phase A extraction — must be character-identical. Fix any escaping issues (`\u201C`/`\u201D` for smart quotes, `\u2014` for em dashes).

3. **D80 dual-write**: For every `textModule()` or property using D80-unreliable JSON fields, ensure CSS `!important` backup exists in `css()`.

4. **Dark section overrides**: If Phase A identified a dark background, add section-scoped color overrides:
   ```css
   .${P}-section{color:#fff !important}
   .${P}-section h1,.${P}-section h2,.${P}-section h3,.${P}-section h4{color:#fff !important}
   .${P}-section p,.${P}-section li,.${P}-section span{color:rgba(255,255,255,0.85) !important}
   ```

5. **Hover states**: Verify all hover rules from Phase A are present (auto-ported or manually added). Add `focus-visible` equivalents for accessibility.

6. **Pseudo-elements**: Verify all `::before`/`::after` decorations from Phase A are present.

7. **Responsive breakpoints**: Verify all `@media` rules from Phase A are present.

8. **SVG handling**: Complex SVGs (transform, animation, preserveAspectRatio) → Base64 JS injection pattern. Simple SVGs → inline in Code Module.

9. **JavaScript behavior**: Counter animations, tab switching, accordion, particles — scope all selectors to section class prefix.

### Step C3: Generate/Update Page Config

If the page config was newly generated, update:
- `pageId`: Look up or create WP page (`SELECT ID FROM wp_posts WHERE post_name='$ARGUMENTS'`)
- `verify.wpUrl`: Set to correct URL with page ID
- `verify.sections[].styleMap`: Ensure at least H2, buttons, and key content elements are mapped

---

## Post-Generate Validation (6 mandatory checks)

Run ALL 6 checks. Report pass/fail for each.

### Check 1: D80 Fallback Audit
For every `textModule()` call and every `rowOpen()`/`columnOpen()` with JSON font properties:
- Verify CSS `!important` fallback exists for: fontSize, letterSpacing, lineHeight, fontFamily
- FAIL if any D80-unreliable property lacks CSS backup

### Check 2: Content Parity
Compare generated `blocks()` text content against Phase A verbatim extraction:
- Every heading, paragraph, button label, stat number must match character-for-character
- Check smart quotes, em dashes, special characters
- FAIL if any text differs

### Check 3: Dark Section Audit
For every section with dark background (navy, #000864, #000432, dark gradient):
- Verify section-scoped `color: !important` overrides exist
- Verify heading colors are `#fff !important`
- Verify body text is `rgba(255,255,255,0.85) !important` or similar
- FAIL if any dark section lacks color overrides

### Check 4: CSS Invention Check
For every CSS property value in generated files:
- Must trace back to Phase A extraction (inline `<style>`, styles.css, or Divi override pattern)
- Known Divi overrides are exempt: `background:transparent!important`, `padding:0!important`, font-smoothing
- FAIL if any CSS value was fabricated (not in source HTML/CSS)

### Check 5: Syntax Validation
```bash
node -e "require('./pages/sections/$ARGUMENTS-{section}.js')"
```
Run for each generated file. FAIL if any throws.

### Check 6: Dry-Run Build
```bash
node complete_website/divi5/build-page.js --page $ARGUMENTS --dry-run
```
Verify: module count, block structure, no errors. FAIL if dry-run exits non-zero.

---

## Output

Print conversion report:
```
═══════════════════════════════════════════════════════════════
SCAFFOLD COMPLETE — $ARGUMENTS
═══════════════════════════════════════════════════════════════
Sections: N generated, M skipped (existing)
Files: [list every file created/modified]

Post-Generate Validation:
  ✓ Check 1: D80 fallback audit — PASS (N properties checked)
  ✓ Check 2: Content parity — PASS (N text elements matched)
  ✗ Check 3: Dark section audit — FAIL (section "hero" missing color overrides)
  ✓ Check 4: CSS invention check — PASS (N values traced to source)
  ✓ Check 5: Syntax validation — PASS (N files loaded)
  ✓ Check 6: Dry-run build — PASS (N blocks, M KB)

Status: {READY FOR /divi5-build | NEEDS FIXES}
═══════════════════════════════════════════════════════════════
```

If all 6 pass: "Ready for `/divi5-build $ARGUMENTS`"
If any fail: Fix the failures, re-run checks, then present again.

---

## Rules (NON-NEGOTIABLE)

1. **Never fabricate product terminology.** Search codebase first. If unsure, leave unexpanded and flag.
2. **Never paraphrase content.** All text is verbatim from HTML source.
3. **Never invent CSS values.** Every value traces to source HTML/CSS or known Divi override.
4. **Read before writing.** Always read generated files before enhancing.
5. **Full Phase A before any code.** Don't skip analysis — it prevents 80% of back-and-forth.
6. **D80 dual-write is mandatory.** Every unreliable property gets CSS backup.
7. **Dark sections get color overrides.** No exceptions.
8. **focus-visible on every hover state.** Accessibility is not optional.
9. **Section-scoped CSS only.** Never emit selectors that could bleed to other sections.
10. **All 6 post-generate checks must pass.** Don't present partial results.
