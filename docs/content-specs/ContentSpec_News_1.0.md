# ContentSpec: News & Events Page (v1.0)

> **Page:** News & Events (`news.html`)
> **Source Files:** `complete_website/src/pages/news.html`
> **Status:** Built and deployed
> **Last Updated:** 2026-02-09

---

## Page Overview

**URL:** `digiwin.co.th/news.html`
**Title Tag:** "News & Events - DigiWin Thailand"
**Audience:** Track A (Factory Operators) + Track B (Distributors) — shared page
**Emotional Arc:** Recognition → Interest → Registration (from Playbook v1.1, Section 3.6)
**Purpose:** Establish DigiWin Thailand as an active, event-hosting presence in the Thai manufacturing community. Drive event registrations and email subscriptions.

---

## Section Architecture

| # | Section | Background | Purpose |
|---|---------|------------|---------|
| 1 | Hero | Dark navy gradient + grain | Badge "NEWS & EVENTS", headline, subtitle, 3 hero stats |
| 2 | Featured Event | White | Large spotlight card for next major event |
| 3 | Upcoming Events Grid | Light gray (#F5F7FA) | 4-column color-coded event cards |
| 4 | Event Series | White | Monthly campaign progression (4 themes) |
| 5 | Past Events Archive | Light gray | Filterable grid with type tabs |
| 6 | CTA | Dark navy gradient + grain | Email subscribe + contact prompt |

---

## Section 1: Hero

**Layout:** Centered text on dark navy gradient (135deg, #1a2e40 → #000864 → #2d4a5e) with dot grain texture overlay.

**Badge:** `NEWS & EVENTS` — JetBrains Mono, 13px, uppercase, 1.5px letter-spacing, blue pill (rgba(55,152,228,0.2) bg, 0.3 border)

**Headline:**
```
Where Manufacturing Intelligence
Meets Action
```
- "Action" in #00AFF0 blue
- Font: Noto Sans 700, clamp(32px, 5vw, 52px)

**Subtitle:**
```
Industry workshops, compliance seminars, factory visits, and trade exhibitions
designed for Thai manufacturers ready to transform their operations.
```
- Noto Sans, 18px, rgba(255,255,255,0.85)

**Hero Stats (3 columns):**

| Value | Label |
|-------|-------|
| 4+ | Events per Quarter |
| 100+ | Thai Factories Served |
| Free | Most Events |

- Values: Noto Sans 700, 42px, #00AFF0
- Labels: 14px, rgba(255,255,255,0.7)
- Separated by top border: 1px solid rgba(255,255,255,0.1)

---

## Section 2: Featured Event

**Layout:** White background, max-width 1200px. Section badge "FEATURED EVENT" in blue pill. Large card with gradient left panel + white right panel.

**Featured Event Content:**

| Field | Value |
|-------|-------|
| Type Badge | WORKSHOP (green #22C55E) |
| Title | BOI Compliance Workshop: Production-Level Reconciliation That Passes Every Audit |
| Description | Learn how production-order-level material tracking eliminates BOI supplementary taxes. Featuring the Jin Hai case study: from 10M THB/year to zero. |
| Date | March 15, 2026 |
| Time | 09:00 – 16:00 |
| Location | Bangkok, Thailand |
| CTA | Register Now → demo.html |
| Tag | "Limited to 30 Participants" |

**Card Design:**
- Left panel: dark gradient (#1a2e40 → #000864), contains SVG calendar icon + event metadata
- Right panel: white, contains title, description, CTA button
- Border-radius: 16px, box-shadow, hover: translateY(-4px)

---

## Section 3: Upcoming Events Grid

**Layout:** Light gray (#F5F7FA) background. Section title "Upcoming Events" centered. 4 event cards in responsive grid (4-col → 2-col → 1-col).

**Event Type Color System:**

| Type | Color | Badge BG |
|------|-------|----------|
| Seminar | #00AFF0 | rgba(55,152,228,0.1) |
| Workshop | #22C55E | rgba(34,197,94,0.1) |
| Factory Visit | #F59E0B | rgba(245,158,11,0.1) |
| Trade Show | #8B5CF6 | rgba(139,92,246,0.1) |

**Events (Q2 2026 Campaign):**

| # | Type | Title | Date | Location |
|---|------|-------|------|----------|
| 1 | Seminar | Thailand Manufacturing Competitiveness 2026: Trends & Technology | April 10, 2026 | Bangkok |
| 2 | Workshop | Production Planning Masterclass: AMRP vs. Traditional MRP | April 24, 2026 | Bangkok |
| 3 | Factory Visit | Smart Factory Tour: Real-Time Production Monitoring in Action | May 8, 2026 | Chonburi |
| 4 | Trade Show | Manufacturing Expo Thailand 2026 — Visit Us at Booth TBA | May 15-18, 2026 | BITEC Bangkok |

**Card Design:**
- White background, 16px border-radius, colored top border (4px, event type color)
- Type badge: JetBrains Mono 11px uppercase, colored pill
- Title: Noto Sans 600, 18px
- Metadata: Noto Sans, 14px, icons for date/time/location
- CTA: "Learn More →" in event type color
- Hover: translateY(-4px), shadow, border-color transition

---

## Section 4: Event Series

**Layout:** White background. Section badge "STRUCTURED LEARNING" in blue pill. Title "Manufacturing Competitiveness Series" centered. Subtitle explaining monthly progressive campaign. 4 series cards in grid.

**Series Concept:** Monthly themed events that build on each other — attendees can join individual sessions or follow the full series.

**Monthly Themes:**

| Month | Theme | Icon | Description |
|-------|-------|------|-------------|
| March | BOI Compliance | Shield | Understanding production-level reconciliation and eliminating supplementary taxes |
| April | Production Transparency | Chart | From paper reports to real-time shop floor visibility |
| May | Cash Flow & Costing | Coins | Batch-level cost tracking and co-product cost allocation |
| June | Digital Transformation | Rocket | AI agents, IoT connectivity, and the smart factory roadmap |

**Card Design:**
- White cards with left colored border (4px, event series color)
- Month label: JetBrains Mono badge
- Theme title: Noto Sans 600
- Description: Noto Sans
- "View Events →" link

**Series Progress Indicator:** Connected dots/line showing progression Mar → Apr → May → Jun, with current month highlighted.

---

## Section 5: Past Events Archive

**Layout:** Light gray background. Title "Past Events" centered. Filter tabs (All | Seminars | Workshops | Factory Visits | Trade Shows). Grid of past event cards with "View Recap →" links.

**Filter Tab Design:** Unified tab bar (per user's design preference), selected tab = blue background + white text.

**Initial Past Events (Placeholder):**

| Title | Type | Date | Attendees |
|-------|------|------|-----------|
| Industry 4.0 for Thai Manufacturers | Seminar | January 2026 | 85 |
| ERP Selection Workshop | Workshop | December 2025 | 28 |
| Factory Digitization Tour | Factory Visit | November 2025 | 15 |

**Card Design:** Compact cards with type badge, title, date, attendee count, "View Recap →" link.

---

## Section 6: CTA

**Layout:** Dark navy gradient + grain texture. Centered content, max-width 640px.

**Headline:** "Don't Miss the Next Event"
**Subtext:** "Join 500+ Thai manufacturing professionals who stay informed about industry trends, compliance updates, and technology opportunities."

**CTA Options:**
1. Email subscribe input + "Subscribe" button (primary)
2. "Or Let's Talk Directly →" text link to demo.html (secondary)

**Design:** Input field with blue submit button, white rounded style matching site design.

---

## Typography Summary

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Hero badge | JetBrains Mono | 13px | 500 | #7EC8F2 |
| Hero headline | Noto Sans | clamp(32px, 5vw, 52px) | 700 | #fff / #00AFF0 |
| Hero subtitle | Noto Sans | 18px | 400 | rgba(255,255,255,0.85) |
| Section titles | Noto Sans | 36px | 700 | #000864 |
| Card titles | Noto Sans | 18px | 600 | #000864 |
| Body text | Noto Sans | 16px | 400 | #333333 |
| Badges/Labels | JetBrains Mono | 11-13px | 500 | Various |
| CTA buttons | Noto Sans | 16px | 600 | #fff on #00AFF0 |

---

## Animation Specification

| Element | Animation | Timing |
|---------|-----------|--------|
| Hero content | slide-up on load | 0.8s ease-out |
| All `.fade-in` elements | translateY(24px) → 0, opacity 0 → 1 | 0.4s ease, 0.07s stagger |
| Cards on hover | translateY(-4px) + shadow | 0.3s ease |
| Filter tab active | background/color transition | 0.3s ease |

**Implementation:** IntersectionObserver with threshold 0.1, rootMargin '0px 0px -40px 0px'. Stagger index calculated from parent's `.fade-in` children.

---

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| ≤1024px | Event grid: 2 columns |
| ≤768px | Hero stats: single column, hero padding reduced, event grid: 1 column, series cards stack |
| ≤480px | Hero headline: 28px, reduce padding throughout |

---

## Content Sources

| Content | Source |
|---------|--------|
| Q2 2026 campaign themes | VP strategy talk (Jan 27) — serialized event campaign strategy |
| BOI workshop content | Transcript intelligence — Jin Hai case study |
| Event series structure | VP directive — monthly progression building to Q2 pipeline |
| Attendee targets | 10 end-customer opportunities minimum by Q2 |
| "100+ Thai Factories" stat | Transcript intelligence — market data section |

---

## Internal Links

| Link | Destination | Context |
|------|-------------|---------|
| Register Now (featured) | demo.html | Event registration = contact form |
| Learn More (each event) | demo.html | Individual event registration |
| View Events (series) | # (anchor/placeholder) | Links to filtered event view |
| Subscribe (CTA) | JavaScript handler | Email subscription |
| Let's Talk (CTA) | demo.html | Direct contact |

---

## DIVI Module Mapping (WordPress Migration)

| Section | DIVI Module | Notes |
|---------|-------------|-------|
| Hero | Fullwidth Header + Code | Custom gradient, grain texture via CSS |
| Featured Event | Specialty: Blog / Custom Code | Card with dual-panel layout |
| Event Grid | Blog Module or Blurb Grid | 4-column, filterable by category |
| Event Series | Blurb Module (4-col) | Connected timeline visual |
| Past Events | Blog Module + Filterable Portfolio | Category filter tabs |
| CTA | Email Optin + CTA | Mailchimp/ActiveCampaign integration |

---

## Post-Launch Notes

- **Event content is placeholder** — real events should replace these as Q2 2026 campaign is finalized
- **Email subscribe** is currently visual-only — needs backend integration (Mailchimp, ActiveCampaign, or custom)
- **Past events** should eventually link to recap pages with photos, attendee testimonials, and key takeaways
- **Factory Visit events** need capacity limits prominently displayed (max 15-20 per visit)
- Consider adding Google Maps embed for event locations
