# WordPress Divi 5 Build Workflow

**Created:** February 10, 2026
**Purpose:** Repeatable 6-step process for building every page in WordPress + Divi 5

---

## Roles

- **Claude** builds pages inside WordPress Divi 5 (via Playwright browser automation)
- **Peter** reviews and fine-tunes in the visual builder afterward

## Source Documents (The Trinity)

1. `DigiWin_Website_PRD_v1.2.md` — architecture, design system
2. `DigiWin_Persuasion_Playbook_v1.0.md` — voice, emotional arcs, objection scripts
3. `ContentSpec_*_Divi5_2.0.md` — exact content, layout, and Divi 5 module mapping per page

**Reference:** `memory/divi5-knowledge.md` — module selection guide, animation mapping, design variables

---

## The Workflow: 6 Steps Per Page

```
STEP 0: ONE-TIME SETUP (do once, skip for all pages)
  WordPress + Divi 5 + Design Variables + Global layouts
    │
STEP 1: PREP — Divi 5 ContentSpec
  Upgrade v1.0 spec → v2.0 with Divi 5 module mapping.
  Peter approves content. (Skip for blog articles/legal)
    │
STEP 2: BUILD — Claude builds in Divi
  Place modules, enter content, apply styles section-by-section
  per ContentSpec. Save reusable patterns as Presets.
    │
STEP 3: SELF-AUDIT — Claude checks work
  Screenshot each section. Compare against ContentSpec,
  Playbook, PRD design system.
    │
STEP 4: HANDOFF — Peter reviews
  Peter opens page in Divi, fine-tunes visual details,
  approves or requests changes.
    │
STEP 5: ITERATE — Fix feedback
  Claude addresses Peter's feedback. Expect 2-3 rounds.
    │
STEP 6: PUBLISH — Go live
  Publish page. Update ContentSpec status. Move to next page.
```

---

## Step 0: One-Time Setup

**Do this once before any page building begins.**

### 0a. WordPress + Divi 5 Installation

- Install WordPress on hosting (or local staging)
- Install and activate Divi 5 theme
- Configure: permalink structure, site title, timezone, language
- Create all 31 pages as empty drafts (WP-CLI or manual)
- Set up user accounts

### 0b. Divi 5 Design Variables (Global)

Set these once — every page module references them:

| Variable | Value | Purpose |
|----------|-------|---------|
| Primary Blue | #3798E4 | CTAs, links, accents |
| Dark Navy | #253B50 | Dark sections, footer |
| Light Gray | #F5F7FA | Alternating section backgrounds |
| Text Dark | #333333 | Primary body text |
| Text Light | #64748b | Secondary text |
| Heading Font | Lexend | All H1-H6 |
| Body Font | Source Sans 3 | Paragraphs |
| Mono Font | JetBrains Mono | Labels, badges, codes |
| Section Padding | 100px | Standard vertical padding |
| Card Radius | 20px | Card border radius |
| Container Width | 1200px | Max content width |

### 0c. Global Layouts (Theme Builder)

Build once, applies to every page:

**Header:**
- Sticky nav with logo, menu module, CTA button
- Mega Menus via Canvases:
  - "Products" Canvas: 4-column grid (ERP, MES, WMS, AIoT) with icons + descriptions + links
  - "Industries" Canvas: 3-column grid (Automotive, Electronics, Metal & Plastics) with icons + links
  - "Partner Program" Canvas: 3-column grid (Business Model, Economics, Solutions) with icons + links
- Attach Canvases to menu items via Interactions (hover trigger)
- Mobile: Off-Canvas hamburger menu (Divi 5 Canvas feature)

**Footer:**
- Company info, links, Bangkok address, copyright with dynamic year

### 0d. Reusable Presets

Save these patterns the first time we create them:

| Preset Name | Description |
|-------------|-------------|
| Trust Card | Dark gradient card with badge + icon + title + body |
| Check Card (Light) | White numbered pain-point card |
| Check Card (Dark) | Dark variant |
| CTA Section | Blue gradient banner with dual buttons |
| Section Header | Label + title + subtitle centered block |
| Product Card | Icon + title + feature list + benefit |
| Stats Row | Number counter grid on dark background |

These presets accelerate every page after the first.

---

## Step 1: Prep — ContentSpec for Divi 5

**Before building any page, ensure the ContentSpec is ready.**

### Which pages need a Divi 5 upgrade?

| Category | Divi 5 Spec Needed? | Reason |
|----------|---------------------|--------|
| Homepage | Done (`ContentSpec_Home_Divi5_2.0.md`) | Complex: split hero, nested tabs, SVG illustrations |
| Partner Program (4 pages) | Yes — upgrade before building | Revenue-critical, complex layouts |
| Products (5 pages) | Yes — upgrade before building | Multiple card/grid patterns |
| Industries (4 pages) | Light upgrade | Pattern repeats after first one |
| About | Yes — upgrade before building | Complex: timeline, map, stats |
| Demo | Light upgrade | Mostly a form page |
| Blog hub + News hub | Light upgrade | Blog module + filters |
| Blog articles (10) | Skip | Post Content module, trivial |
| Legal (2) | Skip | Text module, trivial |

### What the Divi 5 ContentSpec adds (beyond v1.0)

For each section, the Divi 5 spec specifies:
1. **Exact Divi 5 module** (Group vs Blurb vs Text vs Tabs, etc.)
2. **Nesting structure** (which modules go inside which)
3. **Design Variable references** (not hardcoded colors)
4. **Interaction settings** (scroll effects, hover transforms)
5. **Responsive breakpoint behavior** per section
6. **Preset references** (which reusable presets to use)

### ContentSpec prep checklist (per page)

- [ ] Read the v1.0 ContentSpec
- [ ] Cross-check content against PRD and Playbook
- [ ] Map each section to Divi 5 modules (using `memory/divi5-knowledge.md`)
- [ ] Identify which Presets to reuse vs create new
- [ ] Flag any content changes needed
- [ ] Peter approves the spec (Tier 1 pages) or auto-approved (Tier 3-4)

---

## Step 2: Build — Claude Builds in Divi 5

**Claude works in the Divi visual builder via Playwright browser automation.**

### Build process per section (top to bottom)

1. **Add Section** — set background, padding, CSS Grid/Flexbox per spec
2. **Add Row/Columns** — set column structure per spec
3. **Add Modules** — place the specified modules (Group, Text, Button, Image, etc.)
4. **Enter Content** — paste exact copy from ContentSpec
5. **Apply Styling** — reference Design Variables for colors, fonts, spacing
6. **Set Interactions** — scroll effects (fade-in 400ms, stagger 70ms), hover transforms
7. **Set Responsive** — adjust layout per breakpoint (desktop → tablet → mobile)
8. **Save Preset** — if this is a new reusable pattern, save it

### Build rules (enforced every time)

| Rule | Check |
|------|-------|
| Content matches ContentSpec exactly | Copy from spec, don't improvise |
| Colors use Design Variables | Never hardcode #3798E4 — reference the variable |
| CTA wording follows Playbook | "Let's Talk" / "Talk to Our Team" — NEVER "Request a Demo" |
| Links go to real pages | Verify the target page exists as a draft or published |
| Fonts are correct | Headings: Lexend. Body: Source Sans 3. Labels: JetBrains Mono. |
| Animation timing | Scroll: 400ms ease, 70ms stagger. Hover: 300-400ms ease. |
| Semantic HTML | Use Divi 5 semantic element options (section, nav, article) |
| Responsive works | Check all breakpoints before saving |

### Complex elements handling

| Element | Approach |
|---------|----------|
| SVG illustrations | Code Module with inline SVG for launch. Tag for Lottie migration later. |
| Grain texture overlays | Code Module with SVG noise filter + CSS animation |
| Dynamic year (44 years) | Code Module with tiny JS snippet: `new Date().getFullYear() - 1982` |
| Tabbed content with rich layouts | Tabs Module + Nested Modules (Row inside each tab) |
| Card grids with hover effects | CSS Grid Row + Group Modules + Interactions hover |

---

## Step 3: Self-Audit — Claude Checks Own Work

**After building each page, before handing to Peter.**

### Automated checks (via Playwright)

1. Screenshot every section at desktop width
2. Screenshot at tablet (768px) and mobile (375px)
3. Compare against ContentSpec — does each section match?

### Audit checklist

| Category | Check |
|----------|-------|
| Content | All headings, body copy, CTAs match ContentSpec verbatim |
| Design System | Colors: #3798E4, #253B50, #F5F7FA, #333, #64748b only |
| Typography | Lexend headings, Source Sans 3 body, JetBrains Mono labels |
| Tone | Welcoming not salesy. Pain-first per Playbook. No "Request a Demo." |
| Links | Every link targets a page that exists |
| Stats | Numbers match cross-checked data (44 years, 50K+, 100+, 300378) |
| Responsive | No horizontal scroll. Grids collapse properly. Text readable. |
| Animations | 400ms scroll fade-in. No sluggish delays. |
| Accessibility | Alt text on images. Heading hierarchy (H1 → H2 → H3). Semantic tags. |
| Performance | No massive inline SVGs. Images sized correctly. |

### What to flag for Peter

- Sections where ContentSpec was ambiguous (Claude made a judgment call)
- Elements that look different from the static HTML build (intentional Divi adaptation)
- Content that may need updating (outdated stats, placeholder logos)
- Technical limitations hit (Divi can't do X, used workaround Y)

---

## Step 4: Handoff — Peter Reviews

Peter opens the page in Divi's visual builder and evaluates:

1. **Visual impression** — does it feel right? Premium industrial aesthetic?
2. **Content accuracy** — anything that reads wrong or needs updating?
3. **Mobile experience** — check on actual phone if possible
4. **CTA feel** — welcoming or pushy?
5. **Space usage** — any wasted space or awkward gaps?

Feedback comes in natural language. Claude interprets and implements.

---

## Step 5: Iterate — Fix Feedback

**Expect 2-3 rounds per page. This is normal.**

1. Claude receives Peter's feedback
2. Claude implements changes in Divi builder
3. Claude re-runs self-audit on changed sections
4. If content changed → update ContentSpec to match (source-of-truth stays current)
5. Peter reviews again

### ContentSpec sync rule

> If the built page diverges from the ContentSpec during fine-tuning, **update the ContentSpec to match the approved final version.** The ContentSpec must always reflect reality.

---

## Step 6: Publish

1. Set page status to Published
2. Update ContentSpec status: `Published — [date]`
3. Verify page loads correctly on the live site
4. Check all internal links work
5. Move to the next page in build order

---

## Build Order

| Order | Page(s) | Why This Order |
|-------|---------|----------------|
| **0** | Global: Header + Footer | Every page needs these |
| **1** | Homepage | Establishes most Presets. Validation test. |
| **2** | Partner Program hub | Highest business priority (Q2 deadline). |
| **3** | Partner sub-pages (3) | Business Model, Economics, Solutions |
| **4** | Products hub + 4 product pages | Reuse product card preset from Homepage |
| **5** | Industries hub + 3 verticals | Reuse tab/card patterns |
| **6** | About Us | Complex but not urgent |
| **7** | Demo / Contact | Form page, relatively simple |
| **8** | Blog hub + News hub | Blog module + category filters |
| **9** | Blog articles (10) | Post Content module, quick |
| **10** | Legal (Privacy + Terms) | Text pages, last |

**Pipeline rule:** While building Batch N, Claude preps the Divi 5 ContentSpec for Batch N+1.

---

## Prerequisites Checklist

| Item | Status | Needed For |
|------|--------|-----------|
| WordPress hosting URL | Pending | Browser access to WP admin |
| WP admin credentials | Pending | Claude logs in via Playwright |
| Divi 5 license activated | Pending | Theme must be installed |
| Client logos (6-8) | Pending | Homepage logo bar, trust sections |
| Domain/staging URL | Pending | Where the site will live |

---

## Quality Gates

Every page passes through these gates:

```
ContentSpec Approved → Built in Divi → Self-Audit Passed → Peter Approved → Published
     (Step 1)            (Step 2)         (Step 3)           (Step 4-5)      (Step 6)
```

No page publishes without Peter's approval.
No page builds without an approved ContentSpec.
No content changes without updating the ContentSpec.
