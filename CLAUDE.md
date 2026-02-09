# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DigiWin Thailand website redesign project (digiwin.co.th). This is a **documentation-driven project** in pre-development phase—no traditional codebase yet.

**Platform:** WordPress + DIVI Page Builder (via JSON import pipeline)
**Target Audiences:** Thai manufacturing factory operators (Track A) and distributor/consulting prospects (Track B)

## Project Structure

```
DigiWin_Website_PRD_v1.2.md          # Layer 1: Strategy, architecture, design system
DigiWin_Persuasion_Playbook_v1.0.md  # Layer 2: Voice, emotional arcs, objection scripts
ContentSpec_Home_1.0.md              # Layer 3: Production blueprint (per page)
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

**Colors:**
- Primary Blue: #3798E4 (CTAs, links)
- Dark Navy: #253B50 (footer, hero overlays)
- Light Gray: #F5F7FA (alternating sections)
- Text: #333333 (dark), #666666 (light)

**Typography:**
- Headings: Lexend (weights 300-800)
- Body: Source Sans 3 (weights 300-700)
- Labels/Badges: JetBrains Mono (monospace, uppercase, 0.1em letter-spacing)
- Chinese fallback: Noto Sans TC

**Animation Timing:**
- Scroll fade-in: 0.4s ease (not 0.6s—users shouldn't wait)
- Hover transitions: 0.3s-0.4s ease
- Stagger delay: 0.07s between elements

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

## Collaboration Style

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

Before generating any Content Spec, always reference:
1. `DigiWin_Persuasion_Playbook_v1.0.md` for voice calibration and objection scripts
2. `DigiWin_Website_PRD_v1.2.md` Section 4 for page-specific requirements
