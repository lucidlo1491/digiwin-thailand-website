# ContentSpec: Event Detail Page Template (v1.0)

> **Page Type:** Event Detail (reusable template)
> **First Instance:** BOI Compliance Workshop (`events/boi-compliance-workshop.html`)
> **Source Files:** `complete_website/src/pages/events/boi-compliance-workshop.html`
> **Status:** In Development
> **Last Updated:** 2026-02-11

---

## Template Overview

**URL Pattern:** `digiwin.co.th/events/[event-slug].html`
**Title Tag Pattern:** "[Event Title] - DigiWin Thailand"
**Audience:** Track A (Factory Operators) — event attendees seeking specific information before registering
**Emotional Arc:** Curiosity → Relevance → Urgency → Action (from Playbook v1.3, Section 3.10)
**Purpose:** Convert event interest (from News hub) into registration by providing event-specific context, outcomes, and logistics.

**Template mechanic:** One shared CSS class system in `styles.css`. Each event page sets only `--event-color` via 1 line of inline CSS. Content varies per event; structure is identical.

---

## Event Type Color System

| Type | CSS Variable | Color | Badge BG |
|------|-------------|-------|----------|
| Seminar | `--event-color: #00AFF0` | Blue | `rgba(55,152,228,0.12)` |
| Workshop | `--event-color: #22C55E` | Green | `rgba(34,197,94,0.12)` |
| Factory Visit | `--event-color: #F59E0B` | Amber | `rgba(245,158,11,0.12)` |
| Trade Show | `--event-color: #8B5CF6` | Purple | `rgba(139,92,246,0.12)` |

---

## Section Architecture

| # | Section | Background | Persuasion Purpose |
|---|---------|------------|-------------------|
| 1 | Hero | Dark gradient + grain (event-color accent) | Instant clarity: what, when, where + urgency |
| 2 | The Problem | White | Pain-first: "This is YOUR challenge right now" |
| 3 | What You'll Walk Away With | Light gray (#F5F7FA) | Outcomes > topics. "You'll leave knowing how to..." |
| 4 | Agenda | White | Proves structure + professionalism, not a sales pitch |
| 5 | Who Should Attend | Light gray | Self-selection: reader sees themselves |
| 6 | Proof / Social Signal | White | Past event stats, track record |
| 7 | Logistics | Light gray | Remove friction: venue, parking, what to bring |
| 8 | Registration CTA | Dark gradient + grain | Urgency recap + simple action |
| 9 | Related Events | Light gray | Keep them in funnel if this event doesn't fit |

---

## Section 1: Hero

**Layout:** Dark gradient background (165deg, #0f1419 → #1a2632 → #000864) with grain texture overlay and event-color radial accent. Back link to News hub. Centered content.

**Back Link:**
```
← Back to News & Events
```
- Links to `news.html`
- Style: Same as blog back link (Noto Sans, 15px, rgba(255,255,255,0.6))

**Event Type Badge:**
```
WORKSHOP
```
- JetBrains Mono, 12px, uppercase, 1.5px letter-spacing
- Background: var(--event-color) at 0.15 opacity
- Color: var(--event-color)
- Border-radius: 50px

**Headline:**
```
BOI Compliance Workshop: Production-Level Reconciliation That Passes Every Audit
```
- Noto Sans 700, clamp(28px, 4.5vw, 44px), #fff
- Max-width: 800px

**Subtitle:**
```
A full-day, hands-on workshop where you'll learn exactly how production-order-level material tracking eliminates BOI supplementary taxes — featuring the Jin Hai case study.
```
- Noto Sans, 18px, rgba(255,255,255,0.85), max-width: 700px

**Quick Facts Bar (4 items):**

| Icon | Label | Value |
|------|-------|-------|
| Calendar | Date | Saturday, March 15, 2026 |
| Clock | Time | 09:00 – 16:00 |
| MapPin | Location | Bangkok, Thailand |
| Users | Seats | Limited to 30 |

- Dark card with subtle border (rgba(255,255,255,0.1))
- Grid: 4 columns on desktop, 2×2 on mobile
- Values: Noto Sans 600, 16px, #fff
- Labels: Noto Sans, 13px, rgba(255,255,255,0.6)
- Icons: 18px, var(--event-color)

**CTA Button:**
```
Register Now →
```
- Links to `demo.html`
- Style: var(--event-color) background, white text, Noto Sans 600 16px
- Box-shadow with event-color glow

---

## Section 2: The Problem

**Layout:** White background. Max-width 800px centered (matches blog body width). Persuasion purpose: name the pain so the reader thinks "yes, that's me."

**Section Label:**
```
THE CHALLENGE
```
- JetBrains Mono, 12px, var(--event-color), uppercase

**Headline:**
```
Your Finance Team Spends Weeks Preparing for Every BOI Audit
```
- Noto Sans 700, 36px, #000864

**Body Copy (3 paragraphs max):**
```
If your factory holds a BOI certificate — and if you're a manufacturer in Thailand, you almost certainly do — your compliance team is fighting a battle every audit cycle. They're manually reconciling import declarations against production records, building spreadsheets outside your ERP, and hoping the numbers align.

The root cause is architectural: most ERP systems calculate material consumption from theoretical BOMs. But the BOI board doesn't audit your BOM — they audit your actual production consumption, order by order, material by material. When your system can't show that level of detail, the gap between theory and reality becomes supplementary tax.

One factory was paying over 10 million baht per year in that gap. This workshop shows you exactly how they eliminated it.
```
- Noto Sans, 18px, #333, line-height 1.8
- Bold key phrases: "BOI board doesn't audit your BOM", "10 million baht per year"

**Callout Card (Jin Hai data):**
```
10M+ THB/year → Zero
Annual supplementary tax — Jin Hai Factory, after implementing production-order-level reconciliation
```
- Dark background card (matching blog-data-card pattern)
- JetBrains Mono numbers, Noto Sans label

---

## Section 3: What You'll Walk Away With

**Layout:** Light gray (#F5F7FA) background. Section label + headline centered, outcome cards in 2-column grid.

**Section Label:**
```
WORKSHOP OUTCOMES
```

**Headline:**
```
What You'll Be Able to Do After This Workshop
```
- Noto Sans 700, 36px, #000864

**Outcome Cards (6 items, 2×3 grid):**

| # | Icon | Outcome | Detail |
|---|------|---------|--------|
| 1 | ClipboardCheck | Run a BOI reconciliation report | Map imported bonded materials to production orders — the exact format BOI auditors expect |
| 2 | AlertTriangle | Identify compliance gaps in your current ERP | Know specifically which data your system can and cannot produce for BOI filings |
| 3 | Calculator | Calculate your supplementary tax exposure | Estimate the gap between theoretical BOM consumption and actual production usage |
| 4 | Shield | Build a BOI audit preparation checklist | A step-by-step process your team can follow before every audit cycle |
| 5 | FileText | Evaluate ERP systems for BOI readiness | Know what questions to ask any ERP vendor about production-order-level tracking |
| 6 | TrendingUp | Present a compliance upgrade business case | Build the ROI argument for production-level tracking using real factory data |

**Card Design:**
- White background, 16px border-radius, 32px padding
- Icon: 48px circle with var(--event-color) at 0.1 opacity bg, icon stroke var(--event-color)
- Title: Noto Sans 600, 18px, #000864
- Detail: Noto Sans, 15px, #64748b, line-height 1.6

---

## Section 4: Agenda

**Layout:** White background. Max-width 800px centered. Timeline layout similar to About page timeline.

**Section Label:**
```
FULL-DAY AGENDA
```

**Headline:**
```
A Structured Day — Not a Sales Pitch
```
- Noto Sans 700, 36px, #000864
- Subtitle: "Every session is designed around what you'll take home — not what we want to sell."

**Agenda Items:**

| Time | Title | Description | Type |
|------|-------|-------------|------|
| 09:00 – 09:30 | Registration & Networking | Coffee, introductions, and a quick survey of your current BOI compliance process | Setup |
| 09:30 – 10:30 | Why BOI Audits Fail | The gap between theoretical BOM consumption and actual production data — and why most ERPs can't bridge it | Presentation |
| 10:30 – 10:45 | Coffee Break | | Break |
| 10:45 – 12:00 | The Jin Hai Case Study | How one factory went from 10M+ THB/year in supplementary taxes to zero. Data walkthrough, not marketing slides. | Case Study |
| 12:00 – 13:00 | Lunch | Networking lunch — bring your questions | Break |
| 13:00 – 14:30 | Hands-On: Building a Reconciliation Report | Working with sample production data, you'll build the exact report format BOI auditors want to see | Workshop |
| 14:30 – 14:45 | Coffee Break | | Break |
| 14:45 – 15:30 | Assessing Your Current System | Framework for evaluating whether your ERP can produce production-order-level tracking — and what to do if it can't | Framework |
| 15:30 – 16:00 | Q&A + Next Steps | Open discussion, individual compliance questions, and your take-home checklist | Wrap-up |

**Design:**
- Timeline with event-color accent line on left
- Time: JetBrains Mono, 13px, var(--event-color)
- Title: Noto Sans 600, 18px, #000864
- Description: Noto Sans, 15px, #64748b
- Break items: lighter treatment (no description, muted styling)

---

## Section 5: Who Should Attend

**Layout:** Light gray background. 3 persona cards in grid.

**Section Label:**
```
WHO THIS IS FOR
```

**Headline:**
```
Is This Workshop Right for You?
```

**Persona Cards (3):**

| Persona | Role | Factory Size | Challenge |
|---------|------|-------------|-----------|
| Factory CFO / Finance Director | You sign off on BOI compliance filings and worry about audit results every cycle | 50-500 employees, BOI-certified | "I need to know our compliance exposure — and whether our ERP is hiding gaps" |
| Production Manager / Plant Manager | You run the shop floor and your data feeds the compliance reports | Any size, BOI-certified | "I need my production data to match what finance reports — but right now it doesn't" |
| ERP / IT Manager | You manage the system that's supposed to produce BOI reports — but it can't | Companies evaluating or upgrading ERP | "I need to know what production-order-level tracking actually requires from a system" |

**Card Design:**
- White background, 16px border-radius
- Top accent: 4px bar in var(--event-color)
- Role: Noto Sans 600, 20px, #000864
- Factory Size: JetBrains Mono, 12px, var(--event-color), uppercase badge
- Challenge: Noto Sans, 15px, #64748b, italic, in quotes
- Hover: translateY(-4px) + shadow

---

## Section 6: Proof / Social Signal

**Layout:** White background. Stats row + testimonial placeholder.

**Section Label:**
```
WHY DIGIWIN EVENTS
```

**Headline:**
```
Learn from the Team That's Done This 100+ Times
```

**Stats Row (4 items):**

| Value | Label |
|-------|-------|
| 100+ | Thai Implementations |
| 44 | Years Manufacturing ERP |
| 95% | Contract Renewal Rate |
| 50+ | Thai Team Members |

- Dark background strip (matching About Us stats banner pattern)
- Values: Noto Sans 700, 42px, var(--event-color)
- Labels: Noto Sans, 14px, rgba(255,255,255,0.7)

**Supporting Text:**
```
DigiWin has been helping Thai manufacturers pass BOI audits for 8 years. This workshop distills that experience into a single day — the same frameworks our implementation team uses with every BOI-certified client.
```

---

## Section 7: Logistics

**Layout:** Light gray background. 2-column grid: details left, map/location right.

**Section Label:**
```
PRACTICAL DETAILS
```

**Headline:**
```
Everything You Need to Know
```

**Logistics Grid:**

| Item | Detail |
|------|--------|
| Date | Saturday, March 15, 2026 |
| Time | 09:00 – 16:00 (registration opens 08:30) |
| Location | Bangkok, Thailand (exact venue TBA — registered attendees will receive details) |
| Cost | Free (sponsored by DigiWin Thailand) |
| Language | Presentation in Thai with English materials |
| What to Bring | Laptop recommended for hands-on session. Sample data provided. |
| Parking | Available at venue (details sent after registration) |
| Lunch | Included — networking lunch and coffee breaks |

**Design:**
- Left column: icon + label + value rows
- Icons: 20px, var(--event-color)
- Labels: Noto Sans 600, 14px, #000864
- Values: Noto Sans, 16px, #333

---

## Section 8: Registration CTA

**Layout:** Dark gradient + grain (matching hero). Centered content with urgency elements.

**Headline:**
```
Secure Your Spot
```
- Noto Sans 700, 40px, #fff

**Urgency Recap:**
```
Saturday, March 15, 2026 · Bangkok · Limited to 30 participants
```
- Noto Sans, 18px, rgba(255,255,255,0.85)

**CTA Button:**
```
Register Now →
```
- Links to `demo.html`
- Large button: var(--event-color) background, white text, 18px, 20px 48px padding

**Secondary:**
```
Can't make this date? Register your interest and we'll notify you of the next session. →
```
- Text link to `demo.html`, rgba(255,255,255,0.7)

---

## Section 9: Related Events

**Layout:** Light gray background. 3 event cards from the News hub.

**Headline:**
```
More Upcoming Events
```

**Cards:** Pull 3 upcoming events from News hub (same card design as upcoming-card on news.html). Each links to either an event detail page (if available) or demo.html.

**Suggested Events:**
1. Seminar: Production Transparency — April 10, 2026
2. Workshop: Shop Floor Data Collection with eMES — April 24, 2026
3. Factory Visit: Live Factory Tour — May 8, 2026

---

## Typography Summary

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Back link | Noto Sans | 15px | 500 | rgba(255,255,255,0.6) |
| Hero badge | JetBrains Mono | 12px | 500 | var(--event-color) |
| Hero headline | Noto Sans | clamp(28px, 4.5vw, 44px) | 700 | #fff |
| Hero subtitle | Noto Sans | 18px | 400 | rgba(255,255,255,0.85) |
| Quick facts values | Noto Sans | 16px | 600 | #fff |
| Section labels | JetBrains Mono | 12px | 500 | var(--event-color) |
| Section titles | Noto Sans | 36px | 700 | #000864 |
| Body text | Noto Sans | 18px | 400 | #333333 |
| Card titles | Noto Sans | 18-20px | 600 | #000864 |
| Card body | Noto Sans | 15px | 400 | #64748b |
| Agenda time | JetBrains Mono | 13px | 500 | var(--event-color) |
| CTA buttons | Noto Sans | 16px | 600 | #fff on var(--event-color) |

---

## Animation Specification

| Element | Animation | Timing |
|---------|-----------|--------|
| Hero content | slide-up on load | 0.8s ease-out |
| All `.fade-in` elements | translateY(24px) → 0, opacity 0 → 1 | 0.4s ease, 0.07s stagger |
| Cards on hover | translateY(-4px) + shadow | 0.3s ease |
| Stats counter | Counter animation on scroll | 0.4s ease |

**Implementation:** Uses `DigiWinUI.initScrollAnimation()` — same as blog articles and news hub.

---

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| ≤1024px | Outcome grid: 1 column, Persona cards: 1 column, Stats: 2×2, Quick facts: 2×2 |
| ≤768px | Hero headline: 28px, Agenda: compact (time above title), Logistics: single column |
| ≤480px | All grids single column, CTA button full-width, padding reduced |

---

## Content Sources

| Content | Source | Verification |
|---------|--------|-------------|
| Jin Hai 10M THB → Zero | Transcript intelligence, BOI blog article | Verified (cross-check findings) |
| "100+ Thai Implementations" | Transcript intelligence — market data | Verified |
| "95% contract renewal rate" | MA-specific, 2024→2025 | Verified with caveat (single-year) |
| "44 years" | Founded 1982 | Verified |
| "50+ Thai Team Members" | Transcript intelligence | Verified |
| BOI compliance technical details | BOI blog article, presale training | Verified |

---

## Internal Links

| Link | Destination | Context |
|------|-------------|---------|
| ← Back to News & Events | news.html | Navigation |
| Register Now (hero + CTA) | demo.html | Event registration |
| Can't make this date? | demo.html | Interest capture |
| Related event cards | demo.html or event pages | Cross-sell |
| "Read the full case study" | blog/boi-compliance-jin-hai.html | Deeper reading |

---

## Post-Launch Notes

- **Venue TBA** — update logistics section when venue is confirmed
- **Registration count** — consider adding live seat counter if backend supports it
- **Post-event:** Convert this page to a recap page with photos, key takeaways, and attendee count
- **Template reuse:** Next events (April seminar, April workshop, May factory visit) follow identical structure with event-specific content swapped in

---

*— End of ContentSpec v1.0 —*
