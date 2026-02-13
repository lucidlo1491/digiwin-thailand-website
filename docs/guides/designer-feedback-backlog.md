# Designer Feedback Backlog

> Generated 2026-02-12 from research across 15+ world-class B2B designers and studios.
> These are hard questions framed from each designer's perspective — if we struggle to answer them, it means we have a gap to fix.

## Status

| # | Designer | Status | Priority |
|---|----------|--------|----------|
| Q1 | Peep Laja (CXL) | Open | Medium |
| Q2 | Oli Gardner (Unbounce) | Open | High |
| Q3 | Baigie (Tokyo B2B) | **DONE** (Feb 12) | — |
| Q4 | SHIFTBRAIN (Tokyo) | Open | Low |
| Q5 | Vitaly Friedman (Smashing) | Open | High |
| Q6 | Japanese tradition (Baigie/Rakuten) | Open | High |
| Q7 | Kenya Hara (Muji) | Open | Medium |

---

## Q1 — Is "Shadow Excel" How Factory Owners Actually Talk?

**Designer:** Peep Laja — founder of CXL, conversion research authority
**Perspective:** Voice-of-customer research. Copy should use the exact words your audience uses, not clever metaphors they won't recognize.

**The question:** Your hero says "Shadow Excel Reality" — but does a Thai factory owner call it that? Or do they say something like "my team uses spreadsheets instead of the system" or "I can't trust the numbers in my ERP"? If the visitor doesn't instantly see themselves in the headline, they bounce.

**What to explore:**
- Interview 3-5 Thai factory owners about their ERP frustrations — capture exact phrasing
- A/B test "Shadow Excel" vs. plain-language alternatives
- Check if the term resonates in Thai business culture or feels like Western consulting jargon

**Risk if ignored:** Clever copy that doesn't connect = bounce rate. The visitor thinks "this isn't for me."

---

## Q2 — 25:1 Attention Ratio on the Homepage

**Designer:** Oli Gardner — Unbounce co-founder, landing page methodology pioneer
**Perspective:** Every page should have ONE primary action. The ratio of links-to-conversion-goals should approach 1:1.

**The question:** Your homepage has two hero panels (factory owners + distributors), a product grid, industry tabs, trust cards, stats, CTA — each competing for attention. A first-time visitor from Google has ~8 seconds. Which single action do you most want them to take? Because right now, you're asking them to choose between 25+ paths.

**What to explore:**
- Define the ONE primary CTA per audience track
- Consider whether the split hero actually helps or paralyzes
- Reduce secondary navigation within the page body
- Use heatmapping post-launch to see where attention actually goes

**Risk if ignored:** Decision paralysis. Visitor sees everything, clicks nothing.

---

## Q3 — Placeholder Logos Destroy Credibility (**RESOLVED**)

**Designer:** Baigie Inc. — Tokyo B2B specialist
**Resolution:** Replaced 6 broken placeholder logos with verified DigiWin Taiwan case study clients (Yulon Motor, Daiso, Tailin Electronics, Taiwan Implant Tech, Jiuda Bearing, OCEAN COATINGS). Committed Feb 12, 2026 (`d5b3357`).

---

## Q4 — Generic Animations Carry No Brand Meaning

**Designer:** SHIFTBRAIN — Tokyo studio known for motion design with purpose
**Perspective:** Animation should tell a story, not just "make things move." Every transition should reinforce what the brand stands for.

**The question:** Every element on your site fades up at 0.4s with the same easing. A medical SaaS, a fashion brand, and a food delivery app could all use this exact animation. What does your motion language say about manufacturing precision, data flow, or industrial reliability? Nothing, currently. Your particle ocean is a step in the right direction — but the page-level animations are generic.

**What to explore:**
- Define a motion vocabulary: e.g., data flows left-to-right (like a production line), numbers count up (like real-time dashboards), cards slide in like factory floor panels
- Differentiate hero animations from body animations
- Consider scroll-linked progress that mirrors a manufacturing workflow
- Use the particle ocean's wave motion as the unifying rhythm

**Risk if ignored:** Low — animations work fine functionally. But it's a missed opportunity to feel premium and intentional vs. generic.

---

## Q5 — Navigation Mirrors Org Chart, Not Buyer Journey

**Designer:** Vitaly Friedman — Smashing Magazine founder, UX architecture expert
**Perspective:** Navigation should reflect how visitors think, not how your company is organized.

**The question:** Your menu says "Products > ERP / MES / WMS / AIoT" and "Industries > Auto / Electronics / Metal." That's your internal org chart. But a factory owner doesn't think "I need MES" — they think "my production line is a black box" or "I keep failing BOI audits." What if your navigation started from their problems instead of your product catalog?

**What to explore:**
- Problem-based navigation: "Shop Floor Visibility" → leads to MES. "Compliance & Reporting" → leads to ERP.
- Keep product names in sub-navigation for visitors who already know what they want
- Test a "What's Your Challenge?" entry point in the mega menu
- Reference: Salesforce, HubSpot, and Stripe all moved from product-based to outcome-based nav

**Risk if ignored:** High for new visitors who don't know ERP terminology. Lower risk for returning visitors and partners who know the product names.

---

## Q6 — No Self-Service Content Forces Contact Too Early

**Designer:** Japanese B2B tradition (Baigie Inc., Rakuten B2B, Yahoo Japan business)
**Perspective:** Japanese B2B buyers research exhaustively before contacting sales. Thai manufacturing buyers increasingly do the same. If your site forces "contact us" as the only path, you lose everyone who isn't ready.

**The question:** A factory owner visits your site at 10% of their research journey. They want to understand rough pricing, see a feature comparison, or calculate potential ROI. Your site offers none of this — the only action is "Let's Talk," which feels like committing to a sales conversation. Where's the self-service layer?

**What to explore:**
- ROI calculator: "Enter your revenue, headcount, current ERP" → estimated savings
- Feature comparison matrix: DigiWin vs. typical incumbent (without naming competitors)
- Pricing transparency: even a "Starting from X" or tier structure reduces friction
- Downloadable content: whitepapers, case study PDFs (gated or ungated)
- These tools also generate leads — visitors who use a calculator are warmer than cold form fills

**Risk if ignored:** High. Losing visitors who aren't ready to talk but ARE ready to learn. They go to a competitor who gives them more information.

---

## Q7 — No Visual Hierarchy Between Sections

**Designer:** Kenya Hara — Muji art director, master of visual prioritization through restraint
**Perspective:** When everything is bold, nothing is bold. Hierarchy comes from contrast — some sections must be quiet so others can be loud.

**The question:** Scroll through your homepage. Every section has a heading, a subheading, cards with icons, and a CTA. The visual rhythm is: loud-loud-loud-loud-loud. Where is the breathing room? Where is the deliberate quiet that makes the next section feel important? Your particle ocean stats section should feel like a crescendo — but it can't if everything before it is already at full volume.

**What to explore:**
- Identify the 2-3 "peak" sections (hero, stats, CTA) and design them to be visually dominant
- Make supporting sections (checks, value props, industry tabs) visually quieter: less padding, smaller headings, no background effects
- Use whitespace as a design element, not wasted space
- Consider removing background treatments from mid-page sections — let the content breathe
- The dark-to-light-to-dark rhythm should create natural peaks and valleys

**Risk if ignored:** Medium. The site works, but it feels exhausting to scroll. Premium B2B sites feel curated, not overwhelming.

---

## How to Use This Document

1. **Before each iteration cycle**, review this list and pick 1-2 items to address
2. **Cross-reference with PRD/Playbook** — some changes (like Q5 navigation) require doc updates first
3. **Validate with real users** — Q1 and Q6 especially benefit from user research before implementation
4. **Track resolution** — update the Status table at the top when items are addressed
