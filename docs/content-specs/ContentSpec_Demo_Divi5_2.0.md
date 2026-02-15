# Content Spec: Demo (Contact) Page — Divi 5 Build (2.0)

**Batch:** 2 (Core Pages)
**PRD Reference:** Section 4, Page 6.0
**Playbook Reference:** Section 5 (CTA Hierarchy), Section 2 (Both Tracks — welcoming tone)
**Status:** v2.0 — Reverse-engineered from HTML build + mapped to Divi 5 modules
**Last Updated:** February 14, 2026
**Platform:** WordPress + Divi 5

---

## Page Overview

| Element | Specification |
|---------|---------------|
| **Audience** | Both — factory operators (Track A) AND distributor prospects (Track B) |
| **Objective** | Convert visitor interest into a consultation request. Low friction, no pressure. |
| **URL** | digiwin.co.th/demo (URL retained for SEO continuity; page title/content says "Contact") |
| **Emotional Arc** | Welcoming → Reassuring → Transparent → Action |
| **Page Structure** | 3 sections, ~630 lines in static build |
| **Key Constraint** | CTA = "Let's Talk" / "Start the Conversation" — NEVER "Request Demo" or "Book a Demo" (per PRD: DigiWin Thailand does not offer product demos) |
| **Form Requirement** | MUST use Divi 5's native Contact Form Module for WordPress form submission handling |

---

## Divi 5 Capabilities Leveraged

| Divi 5 Feature | Where Used | Why |
|----------------|-----------|-----|
| **Contact Form Module** | Main form | Native WordPress form handling — submissions go to admin email, no plugin needed |
| **CSS Grid Layout** | Form + sidebar layout, trust stats, process steps | Native 2-col and 3-col grids |
| **Group Module** | "Why Talk to Us" cards, proof stats, expect steps | Card-style containers |
| **Number Counter** | Hero trust stats (44, 50K+, 100+) | Animated count-up |
| **Blurb Module** | "Why Talk to Us" items | Icon + title + text built-in |
| **Design Variables** | Colors, fonts, spacing | Global brand consistency |
| **Interactions System** | Card hovers, form focus states | Native hover/focus animations |
| **Semantic Elements** | Form labels, sections | Accessibility compliance |

---

## Design Variables (Global — Set Once in Divi 5)

Inherits all global Design Variables from Homepage spec. Key additions for this page:

| Variable Name | Value | Usage |
|--------------|-------|-------|
| `--dw-primary-blue` | #00AFF0 | Form focus states, submit button, stat values |
| `--dw-dark-navy` | #000864 | Hero bg, headings, proof section bg |
| `--dw-royal` | #003CC8 | Submit button gradient end |
| `--dw-sky-blue` | #0369a1 | Trust stat values, proof stat values |

---

## Section 1: Hero — Centered Welcome

**Purpose:** Set welcoming, no-pressure tone immediately. Addresses both factory owners and potential distributors.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: linear-gradient(135deg, #000432 0%, #000864 50%, #001080 100%), padding: 140px 24px 80px, position: relative, overflow: hidden |
| **Grain Overlay** | Code Module | SVG dot-pattern at opacity 0.03 |
| **Super D** | Code Module | `.dw-d-bg--left` at opacity 0.08 — welcoming, open gesture |
| **Inner** | Group Module | max-width: 800px, center, text-align: center |

### Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H1) | `Let's Talk About Your Factory` — "Your Factory" in #00AFF0. Noto Sans 700, clamp(32px, 5vw, 48px), white |
| **Subtitle** | Text Module | `Whether you're a factory owner seeking solutions or a distributor exploring partnership — we'll listen first, then show you what's relevant.` — 18px, rgba(255,255,255,0.85), line-height 1.7 |
| **Trust Stats Row** | Group Module (Flexbox) | Center, gap: 32px, padding-top: 32px, border-top: 1px solid rgba(255,255,255,0.1) |

### Trust Stats (4 items)

| Stat | Value | Label | Module |
|------|-------|-------|--------|
| 1 | `44` | Years Experience | Number Counter (uses `.dw-years` dynamic class) |
| 2 | `50K+` | Factories | Number Counter |
| 3 | `100+` | Thai Customers | Number Counter |
| 4 | `300378` | Stock Listed | Text Module (not animated — stock code) |

Value styling: Noto Sans 700, 24px, #0369a1. Label styling: 12px, rgba(255,255,255,0.75).

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Tablet (<=1024px) | Trust stats: flex-wrap, gap: 24px |
| Mobile (<=640px) | Padding: 120px 20px 60px |

---

## Section 2: Form + Sidebar — Main Contact Section

**Purpose:** The conversion point. Left: contact form. Right: reasons to talk + social proof.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #fff, padding: 80px 24px |
| **Content Row** | Row with CSS Grid | `grid-template-columns: 1fr 1fr`, gap: 64px, max-width: 1100px |

### Left Column: Contact Form

**CRITICAL: Use Divi 5's native Contact Form Module**, not a Code Module or third-party plugin. This ensures:
- Form submissions go to WordPress admin email
- PDPA consent checkbox is natively handled
- Form validation is built-in
- No additional plugin dependencies

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Form Container** | Group Module | Background: #fff, border: 1px solid #e2e8f0, border-radius: 24px, padding: 48px, box-shadow: 0 4px 24px rgba(0,0,0,0.06) |
| **Form Header** | Group Module | margin-bottom: 32px |
| **Form** | **Contact Form Module** | See field configuration below |
| **Alternative** | Group Module | margin-top: 24px, border-top: 1px solid #e2e8f0, padding-top: 24px, text-align: center |

#### Form Header

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Title** | Text Module (H2) | `Request a Consultation` — Noto Sans 700, 28px, #000864 |
| **Subtitle** | Text Module | `Tell us about your situation. We'll respond within 1 business day.` — 15px, #5b6b80 |

#### Contact Form Module Configuration

| Field | Type | Label | Placeholder | Required |
|-------|------|-------|-------------|----------|
| 1 | Text | Your Name * | Khun Somchai | Yes |
| 2 | Email | Email * | somchai@company.co.th | Yes |
| 3 | Text | Company * | Your company name | Yes |
| 4 | Text (tel) | Phone | +66 | No |
| 5 | Checkboxes | I'm interested in: | — | No |
| 6 | Textarea | Tell us about your current situation | What challenges are you facing? What systems do you currently use? | No |
| 7 | Checkbox (single) | PDPA Consent | — | Yes |

**Checkbox Options for "I'm interested in:"**

| Option | Value | Sub-label |
|--------|-------|-----------|
| 1 | Solutions for My Factory | I own or manage a manufacturing facility |
| 2 | Becoming a DigiWin Partner | I run a software/consulting firm |

> **Divi 5 Contact Form Note:** The native Contact Form Module supports text, email, textarea fields. For the checkbox group and styled checkbox labels, use the Contact Form Module's conditional logic features. If the native module can't render the styled checkbox cards (icon + title + description format from the HTML build), use a **Code Module** inside the form for that specific field group while keeping the rest as native Contact Form fields.

**PDPA Consent Field:**
`I agree to the processing of my personal data per DigiWin's Privacy Policy *` — with link to `/privacy-policy.html`. This is the required consent checkbox.

**Submit Button:**
- Text: `Start the Conversation`
- Style: Full-width, padding: 16px, background: linear-gradient(135deg, #00AFF0, #003CC8), white text, border-radius: 12px, Noto Sans 600, 16px
- Hover: translateY(-2px), box-shadow: 0 8px 24px rgba(0,175,240,0.3)
- Below button: `No sales pressure. We'll listen to your situation first.` — 13px, #5b6b80, center

**Email Redirect:**
Form submissions go to: `info@digiwin.co.th` (configured in Contact Form Module settings)

**Success Message:**
`Thank you for reaching out. We'll respond within 1 business day.`

#### Alternative Contact

| Element | Content |
|---------|---------|
| **Text** | `Prefer to email directly?` — 14px, #5b6b80 |
| **Link** | `info@digiwin.co.th` — #0369a1, 600, no underline |

### Right Column: Why Talk to Us + Proof

#### "Why Talk to Us" (4 items)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Section Title** | Text Module (H3) | `Why Talk to Us?` — Noto Sans 600, 20px, #000864 |
| **Items Stack** | Group Module | Flex column, gap: 20px |
| **Each Item** | Blurb Module or Group Module | Icon (48x48, light blue gradient bg, 12px radius) + Title (H4) + Description |

| # | Icon | Title | Description |
|---|------|-------|-------------|
| 1 | Question mark circle | No Sales Pitch | Our first call is about your situation, not our features. We listen before we talk. |
| 2 | Shield | 44 Years Manufacturing Only | We understand factories because that's all we've ever done. No retail. No hospitality. Just manufacturing. |
| 3 | People group | Local Thai Team | Thai-speaking consultants based in Bangkok. No overseas call centers. Real local support. |
| 4 | Checkmark | Thai Revenue Dept. Certified | Already localized for Thai taxation, Withholding Tax, e-Tax integration, and BOI reporting. |

Icon: SVG in #00AFF0 stroke, background: linear-gradient(135deg, #eff6ff, #dbeafe), 12px radius. Title: Noto Sans 600, 16px, #000864. Description: 14px, #5b6b80, line-height 1.6.

#### Proof Panel (Dark)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Group Module | Background: linear-gradient(135deg, #000864, #000432), border-radius: 20px, padding: 32px, margin-top: 40px |
| **Label** | Text Module | `Why We're Different` — JetBrains Mono, 11px, #15803d, uppercase, 1px spacing |
| **Stats Grid** | Row with CSS Grid | `grid-template-columns: repeat(2, 1fr)`, gap: 16px |

| Stat | Value | Label |
|------|-------|-------|
| 1 | `72%` | Taiwan Listed Cos. Trust Us |
| 2 | `Foxconn FII` | Strategic Investor |
| 3 | `1,300+` | R&D Engineers |
| 4 | `CMMI 4` | Certified Since 2010 |

Each stat: Group Module with background: rgba(255,255,255,0.05), border-radius: 12px, padding: 16px, text-align: center. Value: Noto Sans 700, 24px, #0369a1. Label: 12px, rgba(255,255,255,0.75).

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Tablet (<=1024px) | Stack to 1 column, gap: 48px |
| Mobile (<=640px) | Form container padding: 32px 24px, proof stats: 1 column |

---

## Section 3: What to Expect — Process Steps

**Purpose:** Remove anxiety about what happens after form submission. No pressure, no obligation.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: linear-gradient(180deg, #f8fafc 0%, #fff 100%), padding: 80px 24px |
| **Super D** | Code Module | `.dw-d-bg--corner-br` at opacity 0.06 — subtle brand presence |
| **Header** | Group Module | Center-aligned, max-width: 1000px |
| **Steps Grid** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, gap: 24px, max-width: 1000px |
| **Each Step** | Group Module | Background: #fff, border: 1px solid #e2e8f0, border-radius: 20px, padding: 32px, text-align: center, hover: box-shadow: 0 12px 40px rgba(0,0,0,0.08) |

### Section Header

| Element | Content |
|---------|---------|
| **Title** | `What to Expect` — Noto Sans 700, 36px, #000864 |
| **Subtitle** | `No pressure. No obligation. Just a conversation about what's possible.` — 17px, #5b6b80 |

### Process Steps (3 total)

Each step card contains:

| Element | Module | Styling |
|---------|--------|---------|
| **Number Circle** | Group Module or Code Module | 48x48, background: linear-gradient(135deg, #00AFF0, #003CC8), border-radius: 50%, Noto Sans 700, 20px, white, centered |
| **Title** | Text Module (H3) | Noto Sans 600, 18px, #000864 |
| **Description** | Text Module | 14px, #5b6b80, line-height 1.6 |

| Step | Number | Title | Description |
|------|--------|-------|-------------|
| 1 | 1 | Discovery Call | We'll learn about your factory, challenges, and goals. We ask questions first — no sales pitch. 30-45 minutes. |
| 2 | 2 | Tailored Demo | See only the products that fit your needs. We'll focus on your industry and specific use cases. No generic slide decks. |
| 3 | 3 | Honest Assessment | If there's a fit, we'll provide a detailed proposal. If not, we'll tell you honestly. We'd rather build trust than force a sale. |

> **Content Note:** Step 2 says "Tailored Demo" (noun, describing the meeting format) — this is acceptable. The constraint is against CTAs that say "Book a Demo" or "Request Demo." The process description accurately reflects what happens during the consultation.

### Responsive

| Breakpoint | Grid Columns |
|-----------|-------------|
| Desktop (>640px) | 3 columns |
| Mobile (<=640px) | 1 column |

---

## Animation Strategy

### Scroll-Triggered Animations

| Element | Divi 5 Interaction | Settings |
|---------|-------------------|----------|
| Why-talk items | Scroll → Fade In Up | Duration: 400ms, ease, stagger: 70ms |
| Proof stats | Scroll → Fade In Up | Duration: 400ms, ease |
| Expect steps | Scroll → Fade In Up | Duration: 400ms, stagger: 100ms |
| Hero trust stats | Number Counter auto-animation | Built-in viewport trigger |

### Form Interactions

| Element | Divi 5 Interaction | Settings |
|---------|-------------------|----------|
| Input focus | Focus → Border color + Shadow | Border: #00AFF0, box-shadow: 0 0 0 3px rgba(0,175,240,0.1), transition: 0.2s |
| Checkbox hover | Hover → Border color + Background | Border: #00AFF0, background: #f8fafc, transition: 0.2s |
| Submit button hover | Hover → TranslateY + Shadow | translateY: -2px, box-shadow: 0 8px 24px rgba(0,175,240,0.3), transition: 0.3s |
| Expect step hover | Hover → Shadow | box-shadow: 0 12px 40px rgba(0,0,0,0.08), transition: 0.3s |

### Reduced Motion

All animations and transitions respect `prefers-reduced-motion: reduce`. Form inputs, checkbox labels, submit button, expect steps, and Super D backgrounds all have `animation: none !important; transition: none !important` in reduced-motion media query.

---

## Validation Checklist

| Check | Requirement | Implementation |
|-------|------------|----------------|
| Skip link | `<a href="#demo-content" class="dw-skip-link">Skip to content</a>` | Before `<main>` |
| Main landmark | `<main id="demo-content">` | Wraps all content |
| Form labels | Every input has a `<label>` with matching `for`/`id` | 7 form fields, all labeled |
| Required fields | Name, Email, Company, PDPA consent marked required | `required` attribute + asterisk in label |
| PDPA consent | Checkbox with link to Privacy Policy, must be checked to submit | Required checkbox field |
| Form action | Contact Form Module → admin email (info@digiwin.co.th) | Divi 5 Contact Form settings |
| No "Book a Demo" | All CTAs use "Let's Talk" / "Start the Conversation" | Hero: "Let's Talk About Your Factory", Form: "Start the Conversation" |
| Color contrast | Dark bg text >= rgba(255,255,255,0.75) | Hero text, proof panel text |
| Reduced motion | `prefers-reduced-motion: reduce` disables all transitions | Applied to all animated elements |
| Heading hierarchy | H1 (hero) → H2 (form title, expect title) → H3 (steps, why-talk) → H4 (why-talk items) | No skipped levels |
| Semantic HTML | `<form>` with proper input types (text, email, tel, checkbox, textarea) | Contact Form Module generates semantic HTML |
| Dynamic year | `.dw-years` class in hero stats and "44 Years" why-talk item | Auto-updated via digiwin-dynamic.js |
| Structured data | ContactPage + BreadcrumbList JSON-LD | In `<head>` |
| Alternative contact | Direct email link provided below form | info@digiwin.co.th |
| Success state | Clear confirmation message after submission | Contact Form Module success message setting |
| Real links only | Privacy Policy link points to existing /privacy-policy.html | Verified |
