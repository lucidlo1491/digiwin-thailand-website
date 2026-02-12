# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DigiWin Thailand website redesign project (digiwin.co.th). This is a **documentation-driven project** in pre-development phase—no traditional codebase yet.

**Platform:** WordPress + DIVI Page Builder (via JSON import pipeline)
**Target Audiences:** Thai manufacturing factory operators (Track A) and distributor/consulting prospects (Track B)

## Project Structure

```
docs/
  strategy/                          # Layer 1 + 2: Strategy documents
    DigiWin_Website_PRD_v1.2.md      #   Architecture, design system, page requirements
    DigiWin_Persuasion_Playbook_v1.0.md  #   Voice, emotional arcs, objection scripts
    DigiWin_Design_System.md         #   Colors, typography, spacing
    DigiWin_Company_Research_2025.md  #   Market intelligence
  content-specs/                     # Layer 3: Production blueprints (per page)
    ContentSpec_Home_1.0.md          #   32 specs total
    ContentSpec_Home_Divi5_2.0.md    #   Divi 5 module mappings
    ...
  build/                             # Build workflow + tracking
    Divi5_Build_Tracker.md           #   Page-by-page status board
    Divi5_Build_Workflow.md          #   6-step repeatable process
    SITE_NAVIGATION.md               #   Link map
    PageBrief_*.md                   #   Header/Footer/Home briefs
  guides/                            # Process guides
    NotebookLM_*.md                  #   Content extraction workflows
complete_website/                    # HTML website (source of truth for CloneWebX)
CLAUDE.md                            # This file (must stay in root)
```

## Three-Layer Documentation Model

1. **PRD (Layer 1):** Defines site architecture (20 pages), design system, and workflow. Rarely changes.
2. **Playbook (Layer 2):** Defines voice calibration, emotional arcs by audience, objection-handling scripts, CTA hierarchy. Rarely changes.
3. **Content Specs (Layer 3):** Generated per batch for production. Contains exact copy, image specifications, DIVI module mapping.

## Production Workflow

1. Claude generates Content Spec from PRD + Playbook
2. Peter reviews and approves Content Spec
3. Claude generates DIVI JSON with stock image URLs (Unsplash/Pexels)
4. Claude imports JSON into DIVI via WordPress admin browser
5. Peter reviews screenshots and approves
6. Post-launch: Stock images replaced with custom photography

## Build Order

| Batch | Pages | Priority |
|-------|-------|----------|
| Global | Header & Footer | First |
| Batch 0 | 1.0 Home | Validation test |
| Batch 1 | 2.0 Partner Program | Highest |
| Batch 2-6 | Remaining 17 pages | Sequential |

## Dual-Audience Architecture

**Track A (Factory Operators):**
- Pain points: Implementation disruption, failed ERP attempts, vendor lock-in
- Emotional arc: Empathetic → Confident → Reassuring → Action-oriented
- Proof pattern: Stats → Case studies → Testimonials → ROI scenarios

**Track B (Distributors):**
- Pain points: Channel conflict, margin viability, product complexity
- Emotional arc: Provocative → Strategic → Transparent → Direct
- Proof pattern: Pain naming → Alternative model → Revenue scenarios → Guarantees

## Design System

**Colors (Official Brand Kit — aligned Feb 2026):**
- Primary Blue (Smart Blue): #00AFF0 (CTAs, links, accents) — CSS var: `--dw-blue`
- Dark Navy: #000864 (footer, hero overlays, dark sections) — CSS var: `--dw-navy`
- Navy Deep: #000432 (gradient dark end) — CSS var: `--dw-navy-deep`
- Navy Mid: #001080 (gradient mid) — CSS var: `--dw-navy-mid`
- Royal Blue: #003CC8 (secondary blue, headings on dark) — CSS var: `--dw-royal`
- Cyan Accent: #00E6FF (particle wave highlights, tech accents) — CSS var: `--dw-cyan`
- Light Gray: #F5F7FA (alternating sections) — CSS var: `--dw-gray-light`
- Text: #333333 (dark), #666666 (light)
- Accent Colors: Purple #644CE6, Green #02D28C, Coral #FF6E82, Yellow #FFD700, Red #DC2626
- Color ratio: 60% Smart Blue / 30% navy+royal+cyan / 10% accent colors
- All colors defined as CSS custom properties (`--dw-*`) in `:root` of styles.css

**Typography (Official Brand Kit — Noto Sans):**
- Headings: Noto Sans (weights 500-700)
- Body: Noto Sans (weight 400)
- Labels/Badges: JetBrains Mono (monospace, uppercase, 0.1em letter-spacing)
- Chinese: Noto Sans SC (Simplified Chinese per brand kit)

**Brand Graphic System:**
- Super D (超级符号): D mark from logo used as background device — cropped, bleeding off edges, never centered
- Particle Wave (数据洋流): Dot-matrix pattern representing data flow — animated drift + breathe
- Photography: 3 categories — Brand (abstract particles), Technology (blue-cast factory), Humanistic (warm people)
- SVG assets in `complete_website/assets/digiwin-*.svg`

**Animation Timing:**
- Scroll fade-in: 0.4s ease (not 0.6s—users shouldn't wait)
- Hover transitions: 0.3s-0.4s ease
- Stagger delay: 0.07s between elements
- Particle wave drift: 30s loop, translateX
- Super D draw: 1.2s stroke-dasharray on scroll

## Key Constraints

- Use manufacturing language: "shop floor," "OEE," "BOM," "MES," "WMS" (not generic enterprise terms)
- Ground claims in specifics: "44 years," "50,000+ clients," "100+ Thai implementations"
- Never name competitors directly
- Every unspoken fear addressed within page copy (not FAQ sections)
- English v1 first; Thai localization planned but not started

## Business Constraints

**No Product Demos:**
- DigiWin Thailand does not offer product demos
- CTAs should be "Let's Talk" or "Get in Touch"—not "Request Demo" or "Book a Demo"
- Process: User fills form → Team contacts them to discuss needs

**Real Links Only:**
- Never link to pages that don't exist
- Check actual files before adding navigation

## Guardrails (CRITICAL)

**Four rules that trigger every time a page is touched:**
1. **Before** — Check PRD, Playbook, ContentSpec. Warn if anything contradicts them.
2. **During** — Extract shareable CSS to `styles.css`. Flag better technical approaches.
3. **After** — Run `/ui-ux-pro-max` audit on that page.
4. **Always** — If you see a suboptimal path, say so before doing the work.

**Source-of-Truth Check Before Every Change:**
- Before modifying any page's content, tone, or structure, ALWAYS re-read the relevant source documents:
  1. `docs/strategy/DigiWin_Website_PRD_v1.2.md` — for architecture, design system, page requirements
  2. `docs/strategy/DigiWin_Persuasion_Playbook_v1.0.md` — for voice, emotional arcs, objection scripts
  3. The page's `docs/content-specs/ContentSpec_*.md` (if one exists) — for exact approved copy and layout
- If the user's request contradicts any of these documents, **warn them explicitly** before proceeding. Do NOT silently override the source documents.
- Example: If user says "make the CTA say 'Book a Demo'" but the PRD says no demos, respond with a warning and suggest an alternative.
- Rationale: Blindly editing what sounds right in the moment causes cumulative drift that is harder to fix than the original build.

**Per-Page Audit After Every Modification:**
- After creating or modifying any page, ALWAYS run a `/ui-ux-pro-max review` audit on that specific page before presenting the result to the user.
- Do not wait until the entire site is finished — audit incrementally, page by page.
- Check at minimum: color consistency, typography, animation timing, CTA wording, tone alignment with Playbook.

**CSS Architecture (lessons learned Feb 12, 2026):**
- **Component-based, not page-based.** NEVER create `.mes-hero`, `.erp-hero`, `.auto-hero` as separate selectors when they share 90% of styles. Create ONE `.product-hero` with CSS custom properties (`--accent-color`) for the differences. If a pattern repeats 3+ times, consolidate into one component class BEFORE continuing.
- **Design tokens everywhere.** Never hardcode `#000864` or `#00AFF0` — always use `var(--dw-navy)` or `var(--dw-blue)`. This applies to colors, spacing, font-sizes, border-radius. If it's a design decision, it's a token.
- **BEM naming convention.** All new CSS follows `.block__element--modifier` pattern. No more mixed conventions (`.dw-btn-primary` vs `.btn-white` vs `.product-box-badge.light`).
- **Bloat detection trigger.** If `styles.css` or any inline `<style>` grows by >50 lines in a single session without consolidation, STOP and propose component extraction before continuing. Claude MUST flag this — Peter relies on Claude to catch it.
- **Dead CSS audit.** After every batch of pages, grep for selectors that exist in CSS but are used in zero HTML files. Remove them.
- **Accessibility in the template, not retrofitted.** Skip links, `<main>` landmarks, `prefers-reduced-motion`, contrast minimums (0.75 for text on dark backgrounds), no translateY/scale on non-clickable `<div>` hover — all baked into the base page template from Day 1. Never build 35 pages then retrofit.
- **Context: The current HTML site's 6,000-line `styles.css` is temporary** — it exists only for CloneWebX import fidelity. Divi 5 (launching Feb 26, 2026) replaces all CSS with its own Design Variables and module system. Do NOT spend time refactoring the existing CSS. DO apply these lessons when building in Divi 5.

## Collaboration Style

**Proactive Technical Guidance (CRITICAL):**
- Peter is a business leader, not a developer. He relies on Claude to know the better technical path.
- When you see a suboptimal approach — even one you yourself are about to take — STOP and suggest the better way before proceeding.
- Frame suggestions in plain language: what the problem is, what the better approach is, and why it saves time/money/trouble.
- Do NOT stay silent out of politeness. Silence = letting technical debt accumulate on someone who trusts you to know better.
- **FAILURE CASE (Feb 2026):** Claude watched `styles.css` grow from 2,000 to 6,000 lines over weeks — page-prefixed selectors duplicating patterns, no component consolidation — and never flagged it. Peter had to call it out. This is the exact scenario this rule exists to prevent.
- Examples of things to flag proactively:
  - "We're duplicating 500 lines of CSS in every file — let me consolidate into one shared stylesheet"
  - "This layout approach will break on mobile — let me use a responsive pattern instead"
  - "We're hardcoding dates that will go stale — let me make them dynamic"
  - "This page structure will make future edits painful — let me restructure it now while it's easy"
  - "We're creating 5 near-identical hero sections with different prefixes — let me make one reusable component"
  - "This file has grown past 200 lines this session — let me consolidate before continuing"
- **Automatic triggers (Claude MUST stop and flag):**
  1. Any file grows >200 lines in a single session
  2. A CSS/HTML pattern repeats 3+ times across files
  3. A third-party tool claim (dates, features) hasn't been verified
  4. An approach will create rework across multiple pages
- Timing: Flag BEFORE doing the work, not after. Give Peter the choice.

**Proactive Pattern Application:**
- Once a pattern is established on one page, apply it across all pages without waiting to be asked
- Example: CTA wording, trust stats placement, typography choices should be consistent site-wide

**Self-Critique Before Presenting:**
- Red team your own work from the user's perspective before showing it
- Ask: "Would a manufacturing business owner find this compelling or move away?"
- Identify weaknesses proactively rather than waiting for feedback

**Iterative Refinement:**
- Expect 2-3 rounds of feedback—don't aim for perfection on first try
- Feedback comes in experiential language ("too distracting", "stealing thunder") rather than exact specs
- Adjust based on visual review, not just requirements

## Content Principles

**Pain-First Messaging:**
- Lead with the problem they're experiencing, not product features
- "Your Finance Team Deserves Better Than Month-End Surprises" > "ERP Built for Manufacturing"

**Thai Audience Context:**
- Readers may encounter ERP, MES, WMS, AIoT for the first time
- Spell out abbreviations on first use (Thai RD → Thai Revenue Department)
- Use plain language and relatable analogies

**Welcoming Over Salesy:**
- Approachable, conversational tone
- Avoid pushy conversion language

## Reference Documents

Before generating or modifying any page or Content Spec, always reference:
1. `docs/strategy/DigiWin_Website_PRD_v1.2.md` — architecture, design system, page-specific requirements
2. `docs/strategy/DigiWin_Persuasion_Playbook_v1.0.md` — voice calibration, emotional arcs, objection scripts
3. Relevant `docs/content-specs/ContentSpec_*.md` — approved copy, layout, and module mapping for that page

These are the source of truth. If a user request conflicts with them, warn first — don't edit blindly.
