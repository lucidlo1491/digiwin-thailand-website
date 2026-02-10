# Content Spec: Blog — LRP vs MRP: Why Your Production Planning Takes Hours Instead of Minutes (7.0)

**PRD Reference:** Section 7.0 (Blog / Knowledge Base)
**Status:** v1.0 — Reverse-engineered from HTML build
**Last Updated:** February 10, 2026

---

## Article Metadata

| Field | Value |
|-------|-------|
| **Title** | LRP vs MRP: Why Your Production Planning Takes Hours Instead of Minutes |
| **Slug** | /blog/lrp-vs-mrp |
| **Category** | Production Planning |
| **Category Badge Color** | #3798E4 (primary blue) |
| **Read Time** | 6 min read |
| **Publication Date** | February 2026 |
| **Meta Description** | Traditional MRP takes hours to recalculate your entire factory. LRP (Lot Requirements Planning) gives you per-order material answers in under a minute. Learn why this changes everything for Thai manufacturers. |

---

## Template & CSS Notes

- **DOES NOT use the shared blog template** — Has its own complete inline CSS (~508 lines)
- Custom class names: `article-hero`, `article-body`, `article-category`, `article-meta`, `article-pullquote`, `article-data-callout`, `article-highlight`, `article-scenario`, `related-section`, `article-cta`
- Shared blog articles use: `blog-hero`, `blog-body`, `blog-category-badge`, `blog-meta`, `blog-pullquote`, `blog-data-card`, `blog-highlight`, `blog-related`, `blog-cta`
- Uses `dw-main` wrapper, other blog articles do not
- Scroll animation class: `fade-up` (vs `fade-in` used in shared template articles)
- **This article needs CSS migration to the shared blog template** to match the pattern established by other articles

---

## Article Content

### Opening / Hook (Lead paragraph with blue left border)

Every production planner knows the frustration: you kick off an MRP run at 6 PM, and by the time it finishes hours later, two rush orders have already changed everything. The plan was outdated before it was even printed.

This is not an edge case. It is the daily reality for thousands of Thai factories running traditional MRP. And it raises a question that most ERP vendors prefer to avoid: **why does production planning still take so long?**

---

### Section 1: The MRP Problem Nobody Talks About

- MRP (Material Requirements Planning) designed in 1970s for batch processing and overnight mainframe runs
- Core logic: take master production schedule, explode BOM for every item, check inventory, calculate purchase/production needs
- Problem is **scale** — MRP recalculates everything: every active item, every BOM level, every open PO, every WO in progress
- Typical Thai factory with thousands of active items and multi-level BOMs: MRP runs take hours (4-8 hours reported)
- During those hours, shop floor keeps moving — planner can't answer questions until run completes

**Pull quote:** "An MRP run that takes 4 hours to complete is already 4 hours out of date. You are making decisions today based on a picture from yesterday."

- Planners compensate with safety stock padding, over-ordering, or gut feel — none is a real solution

### Section 2: What If You Could Plan Per Order?

- LRP (Lot Requirements Planning) flips the approach — calculates material requirements for a **specific production order** instead of the entire factory
- For one order: what materials needed? What's in stock? What's allocated? What needs purchasing, and when?
- LRP answers in **under a minute** because it looks at one order's worth of data

**Data callout card (dark navy, two-column):**
- Traditional MRP: **Hours** per full run
- LRP: **< 1 min** per order (highlighted in blue)

- Changes planning from batch activity to real-time conversation — planner gets actionable answers **right now**

### Section 3: How LRP Works in Practice

Scenario (Tuesday, 10 AM): Customer calls with rush order for 500 units requiring 12 materials and 3 production stages.

**Scenario box (gray background, numbered steps):**
1. Enters the order into the system
2. Runs LRP on that specific order — results come back in under a minute
3. Instantly sees what materials are needed and what is already in stock
4. Sees what is allocated to other orders and what remains available
5. Knows exactly what needs to be purchased and the required delivery dates
6. Can tell the customer when production can start and when they can expect delivery

No waiting, no spreadsheets, no calling the warehouse.

**Highlight box (blue left border, light blue background):** "LRP does not replace MRP — it complements it. Run MRP nightly for the big picture: aggregate demand, long-range purchasing schedules, capacity loading. Use LRP throughout the day for real-time, order-level decisions. Together, they give planners both strategic visibility and tactical speed."

### Section 4: Why This Matters for Thai Manufacturers

- Thai manufacturers operate differently from Western counterparts — smaller, more frequent, more varied orders
- Factory might receive 20-30 new orders per day with different configurations, quantities, delivery requirements
- Key question: "When your customer calls about delivery, can you answer in 10 seconds?"
- With traditional MRP: planner must wait for next run or guess
- LRP makes the 10-second answer possible — run requirements check while customer is still on the phone
- For factories competing on responsiveness (most Thai factories), this is not nice-to-have — it's win/lose orders

### Section 5: The Competitive Reality

- Most ERP systems only offer traditional MRP — batch process, repeat tomorrow
- Typical answer for faster planning: bolt on separate APS (Advanced Planning and Scheduling) system
- Problem: APS can cost as much as the ERP itself — separate implementation, integration, training
- **DigiWin's approach:** LRP built directly into the ERP alongside AMRP (Advanced Material Requirements Planning) — capacity-aware planning engine considering machine availability, workforce constraints, production sequencing
- No separate purchase, no separate integration — part of standard manufacturing planning toolkit

**Pull quote:** "You should not need to buy a second system just to plan production accurately. Planning speed and planning intelligence should be built into the ERP from the start."

- Result: MRP handles big picture nightly, LRP handles minute-by-minute order questions, AMRP ensures plans are feasible given actual capacity — all from single system, single data source, no reconciliation gaps

---

## Related Articles

| Article Title | Link |
|---------------|------|
| BOI Compliance: How One Factory Saved 10M THB Per Year | /blog/boi-compliance-jin-hai.html |
| Co-Product Cost Accounting: Getting the Split Right | /blog/co-product-cost-accounting.html |
| AMRP: Why You Should Not Need a Separate APS System | /blog/amrp-capacity-planning.html |

**Note:** Related articles section uses completely custom markup (`related-section`, `related-card`, etc.) with SVG icon placeholders instead of the shared `blog-related` pattern used by other articles.

---

## CTA Section

| Field | Value |
|-------|-------|
| **Heading** | Struggling with Production Planning? |
| **Body** | Our team can show you how LRP and AMRP work for factories like yours — no obligation, no sales pitch. Just a conversation about what faster planning could look like for your operation. |
| **Button Text** | Let's Talk |
| **Button Link** | demo.html |

---

## Data Claims & Stats Used

| Claim | Source/Verification |
|-------|-------------------|
| MRP designed in the 1970s | Verified — MRP originated at IBM in the early 1970s |
| MRP runs of 4 to 8 hours for a single cycle | Plausible for legacy systems with large item masters; "some factories report" is hedged |
| LRP gives answers in under a minute | DigiWin product claim — needs verification from implementation data |
| Thai factories receive 20-30 new orders per day | Plausible for high-mix job shops; may not apply to process manufacturing |
| APS can cost as much as the ERP itself | Industry-general claim, directionally correct for mid-market; not precisely sourced |
| "thousands of Thai factories running traditional MRP" | Unverified aggregate claim |

---

## Internal Links

| Link Text | Target |
|-----------|--------|
| Back to Insights | blog.html |
| BOI Compliance: How One Factory Saved 10M THB Per Year | blog/boi-compliance-jin-hai.html |
| Co-Product Cost Accounting: Getting the Split Right | blog/co-product-cost-accounting.html |
| AMRP: Why You Should Not Need a Separate APS System | blog/amrp-capacity-planning.html |
| Let's Talk (CTA) | demo.html |

---

## Flags & Notes

- **CRITICAL: This article uses entirely custom inline CSS (~508 lines) instead of the shared blog template.** It should be migrated to use the shared `blog-hero`, `blog-body`, `blog-related`, `blog-cta` classes from `styles.css`. This is the single largest CSS debt among blog articles.
- **Different animation class:** Uses `fade-up` instead of `fade-in`. The shared component JS (`digiwin-components.js`) needs to be checked — does `initScrollAnimation` target `.fade-up` or `.fade-in`?
- **Different class naming convention:** `article-*` prefix instead of `blog-*`. This makes it harder to maintain consistency.
- **Uses `dw-main` wrapper** that other blog articles don't — structural inconsistency.
- **Related articles link to pages that may not exist:** `co-product-cost-accounting.html` and `amrp-capacity-planning.html` — need to verify these files exist. This would violate the "Real Links Only" constraint if they don't.
- **CTA text says "show you how LRP and AMRP work"** — borders on demo-like language but is acceptable since it says "show you how... work for factories like yours" and clarifies "no sales pitch."
- **Jargon handling is good:** MRP, LRP, BOM, APS, AMRP all spelled out on first use with context.
- **Strong visual hierarchy:** Data callout card, scenario box, highlight box, and pull quotes create scannable reading experience.
- **No mention of "44 years" or "50,000+ clients"** in article body — only DigiWin is mentioned by name in Section 5 (The Competitive Reality).
