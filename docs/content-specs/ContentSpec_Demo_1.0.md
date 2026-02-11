# Content Spec: Get in Touch / Contact Page (No Explicit PRD Section)

**Batch:** N/A (cross-cutting conversion page, used by all batches)
**PRD Reference:** No dedicated section — referenced as CTA destination across all pages
**Playbook Reference:** Section 2.2 (Track A Voice — Decision stage), Section 2.3 (Track B Voice — Decision stage), Section 6 (CTA Language)
**Status:** v1.0 — Reverse-engineered from HTML build
**Last Updated:** February 10, 2026

---

## Page Overview

**Audience:** Both Track A (factory operators) and Track B (distributor prospects) — this is the shared conversion page
**Objective:** Capture contact information from qualified leads and set expectations for the conversation process
**URL:** digiwin.co.th/demo.html
**Emotional Arc:** Welcome ("Let's talk about YOUR factory") → Trust ("Why talk to us?") → Low pressure ("What to expect — no obligation")
**HTML Source:** `/complete_website/src/pages/demo.html`
**Page Title (HTML):** `Get in Touch - DigiWin Thailand`

---

## Section 1: Hero

**Purpose:** Set a welcoming, low-pressure tone. Signal that this is a conversation, not a sales pitch.

| Element | Specification |
|---------|---------------|
| **Layout** | Centered text, full-width dark section |
| **Background** | Linear gradient: `135deg, #1a2e40 0%, #000864 50%, #2d4a5e 100%`; dot pattern overlay (SVG circles, white fill-opacity 0.03, 60x60px grid) |
| **Padding** | 140px top, 80px bottom, 24px sides |
| **Position** | Relative, overflow hidden |

| Element | Content |
|---------|---------|
| **Headline** | `Let's Talk About <span>Your Factory</span>` (h1, Noto Sans 700, clamp 32-48px; span in #00AFF0) |
| **Subhead** | `Whether you're a factory owner seeking solutions or a distributor exploring partnership—we'll listen first, then show you what's relevant.` (18px, rgba white 0.85, line-height 1.7) |

**Trust Stats Bar** (flex row, 32px gap, border-top 1px rgba white 0.1, padding-top 32px):

| Stat | Value | Label |
|------|-------|-------|
| 1 | `44` (dynamic via `dw-years` class) | `Years Experience` |
| 2 | `50K+` | `Factories` |
| 3 | `100+` | `Thai Customers` |
| 4 | `300378` | `Stock Listed` |

---

## Section 2: Form + Why Talk to Us (Two-Column Layout)

**Purpose:** The primary conversion mechanism — contact form on the left, trust-building content on the right.

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column grid (1fr 1fr), 64px gap |
| **Background** | White (#fff) |
| **Padding** | 80px top and bottom, 24px sides |
| **Max-width** | 1100px |

### Left Column: Contact Form

| Element | Specification |
|---------|---------------|
| **Container** | White, 1px #e2e8f0 border, 24px border-radius, 48px padding, subtle shadow |

| Element | Content |
|---------|---------|
| **Form Header Title** | `Request a Demo` |
| **Form Header Subtitle** | `Tell us about your situation. We'll respond within 1 business day.` |

**Form Fields:**

| Field | Type | Label | Required | Placeholder |
|-------|------|-------|----------|-------------|
| 1 | text | `Your Name *` | Yes | `Khun Somchai` |
| 2 | email | `Email *` | Yes | `somchai@company.co.th` |
| 3 | text | `Company *` | Yes | `Your company name` |
| 4 | tel | `Phone` | No | `+66` |
| 5 | checkbox group | `I'm interested in:` | No | (see below) |
| 6 | textarea | `Tell us about your current situation` | No | `What challenges are you facing? What systems do you currently use?` |

**Checkbox Options:**

| Option | Value | Title | Description |
|--------|-------|-------|-------------|
| 1 | `factory` | `Solutions for My Factory` | `I own or manage a manufacturing facility` |
| 2 | `partner` | `Becoming a DigiWin Partner` | `I run a software/consulting firm` |

| Element | Content |
|---------|---------|
| **Submit Button** | `Submit Request` (full-width, blue gradient, Noto Sans 600, 16px, 12px border-radius) |
| **Alternative Contact** | `Prefer to email directly?` → `info@digiwin.co.th` (mailto link) |

**Form Input Styles:**
- Inputs: 14px/16px padding, 1px #e2e8f0 border, 12px border-radius, Noto Sans 16px
- Focus state: blue border (#00AFF0), blue glow shadow (3px, rgba blue 0.1)
- Checkbox labels: 16px padding cards with border, hover → blue border + light gray background
- Submit hover: translateY(-2px), blue glow shadow

### Right Column: Why Talk to Us

| Element | Content |
|---------|---------|
| **Headline** | `Why Talk to Us?` (h3, Noto Sans 600, 20px) |

**Why Points (vertical stack, 20px gap):**

| # | Icon | Title | Body |
|---|------|-------|------|
| 1 | Question mark circle | `No Sales Pitch` | `Our first call is about your situation, not our features. We listen before we talk.` |
| 2 | Shield | `44 Years Manufacturing Only` (dynamic year) | `We understand factories because that's all we've ever done. No retail. No hospitality. Just manufacturing.` |
| 3 | People group | `Local Thai Team` | `Thai-speaking consultants based in Bangkok. No overseas call centers. Real local support.` |
| 4 | Checkmark | `Thai Revenue Dept. Certified` | `Already localized for Thai taxation, Withholding Tax, e-Tax integration, and BOI reporting.` |

**Proof Card** (dark gradient box, 32px padding, 20px border-radius, margin-top 40px):

| Element | Content |
|---------|---------|
| **Label** | `WHY WE'RE DIFFERENT` (JetBrains Mono, 11px, uppercase, green #4ade80) |

| Stat | Value | Label |
|------|-------|-------|
| 1 | `72%` | `Taiwan Listed Cos. Trust Us` |
| 2 | `Foxconn FII` | `Strategic Investor` |
| 3 | `1,300+` | `R&D Engineers` |
| 4 | `CMMI 4` | `Certified Since 2010` |

---

## Section 3: What to Expect

**Purpose:** Remove anxiety about the contact process. Set expectations for a consultative, no-pressure experience.

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column step cards |
| **Background** | Gradient: `180deg, #f8fafc 0%, #fff 100%` |
| **Padding** | 80px top and bottom, 24px sides |
| **Max-width** | 1000px |

| Element | Content |
|---------|---------|
| **Headline** | `What to Expect` (Noto Sans, 36px, 700, #000864) |
| **Subhead** | `No pressure. No obligation. Just a conversation about what's possible.` (17px, #64748b) |

**Steps:**

| Step | Number | Title | Body |
|------|--------|-------|------|
| 1 | `1` (blue gradient circle, 48px) | `Discovery Call` | `We'll learn about your factory, challenges, and goals. We ask questions first—no sales pitch. 30-45 minutes.` |
| 2 | `2` | `Tailored Demo` | `See only the products that fit your needs. We'll focus on your industry and specific use cases. No generic slide decks.` |
| 3 | `3` | `Honest Assessment` | `If there's a fit, we'll provide a detailed proposal. If not, we'll tell you honestly. We'd rather build trust than force a sale.` |

---

## Inline JavaScript

None. This page has no inline `<script>` block.

---

## CSS Architecture

This page has **significant inline CSS** (~370 lines) covering:
- `.demo-hero` and children (hero section)
- `.demo-form-section`, `.demo-form-container`, all form elements (form layout + inputs)
- `.demo-why`, `.why-points`, `.why-point` (why talk to us)
- `.demo-proof` (proof stats card)
- `.demo-expect` (what to expect section)
- Responsive breakpoints at 1024px and 640px

**Not using shared styles except:** `.cta-section` is NOT used on this page (no shared CTA component — the form IS the CTA). The page does use `styles.css` for header, footer, and base typography.

---

## Responsive Behavior

| Breakpoint | Changes |
|------------|---------|
| **1024px** | Form grid → single-column; trust stats → flex-wrap with 24px gap |
| **640px** | Hero padding: 120px/60px; form container: 32px/24px padding; expect steps → single-column; proof stats → single-column |

---

## Flags & Notes

1. **VIOLATION — "Request a Demo" heading:** The form header says `"Request a Demo"` which directly contradicts the PRD constraint: "DigiWin Thailand does not offer product demos. CTAs should be 'Let's Talk' or 'Get in Touch' — not 'Request Demo' or 'Book a Demo.'" **Must be changed.** Suggested alternatives: `"Tell Us About Your Situation"`, `"Start the Conversation"`, or simply `"Get in Touch"`.

2. **VIOLATION — "Tailored Demo" in What to Expect:** Step 2 says `"Tailored Demo"` — same problem. Suggested alternative: `"Tailored Walkthrough"` or `"Relevant Solutions Discussion"`.

3. **Dual-audience form is a good pattern:** The checkbox group ("Solutions for My Factory" vs. "Becoming a DigiWin Partner") correctly segments Track A and Track B at the form level. This aligns with the PRD's dual-audience architecture. The form can be used to route submissions to appropriate team members.

4. **Page title vs. filename mismatch:** The file is `demo.html` but the page title is `"Get in Touch - DigiWin Thailand"`. The filename implies a demo request page; the title implies a general contact page. Consider renaming the file to `contact.html` to align with the no-demo policy, though this would require updating all CTA links across the site.

5. **Stat "300378" for Stock Listed:** This is DigiWin's Shenzhen stock code. While it signals legitimacy (publicly listed company), the raw number "300378" is meaningless without context. Consider formatting as `"SZSE: 300378"` or `"Shenzhen 300378"` to make the stock listing claim more understandable.

6. **"72% Taiwan Listed Cos. Trust Us":** This is a strong claim but needs source verification. The cross-checked intelligence mentions this figure. If accurate, consider adding context: "72% of Taiwan-listed manufacturers use DigiWin."

7. **No form action configured:** The form has `action="#"` and `method="POST"` — this is a placeholder. Before launch, this needs to be connected to an actual form handler (WordPress form plugin, HubSpot, or custom API endpoint).

8. **Email placeholder "somchai@company.co.th":** Good Thai-market personalization using a local .co.th domain and common Thai name.

9. **CMMI 4 certification date:** The proof card says "Certified Since 2010." Cross-check against actual certification records.

10. **Missing fields that could improve lead quality:** Consider adding:
    - Industry dropdown (Automotive / Electronics / Metal & Plastics / Other)
    - Company size (number of employees or revenue range)
    - Current ERP system (if any)
    These would help the sales team prioritize and prepare for the discovery call.

11. **CSS should be extracted:** With ~370 lines of inline CSS, this page is a candidate for extraction to `styles.css` on the next touch. The form styles, why-points, proof card, and expect-steps could all be shared patterns.

12. **Good emotional arc:** The page follows a consultative pattern — "Let's Talk" (welcoming) → "Why Talk to Us?" (trust) → "What to Expect" (process clarity, no pressure). This aligns with the Playbook's Decision-stage tone: "Calm + action-oriented."

13. **"We'll respond within 1 business day":** Good expectation setting. Verify this commitment with the Thailand team.
