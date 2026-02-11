# Content Spec: Blog — AMRP: Why You Don't Need a Separate APS System (7.0)

**PRD Reference:** Section 7.0 (Blog / Knowledge Base)
**Status:** v1.0 — Reverse-engineered from HTML build
**Last Updated:** February 10, 2026

---

## Article Metadata

| Field | Value |
|-------|-------|
| **Title** | AMRP: Why You Don't Need a Separate APS System |
| **Slug** | /blog/amrp-capacity-planning |
| **Category** | Production Planning |
| **Category Badge Color** | #00AFF0 (Primary Blue) |
| **Read Time** | 8 min read |
| **Publication Date** | February 2026 |
| **Meta Description** | Most ERPs require an expensive separate APS system for capacity planning. DigiWin's AMRP builds capacity planning directly into the ERP — at no extra cost. |

---

## Article Content

### Opening / Hook

The article opens with a relatable scenario: you bought an ERP, set up your BOM, configured production workflows, and trained your team. You try to create next month's production schedule. The system calculates material requirements and generates purchase orders — everything looks good. Then your planner says: "This won't work. Our CNC line can't handle this volume. We're going to miss half these delivery dates."

This reveals the gap: standard MRP assumes infinite production capacity. It tells you what materials you need and when, but not whether your production lines can actually execute the plan. To add capacity planning, your vendor says you need a separate APS (Advanced Planning and Scheduling) system — another license, another vendor, another integration project. Oracle and SAP work this way.

DigiWin's AMRP (Advanced MRP) builds capacity planning directly into the ERP — at no extra cost, no separate system, no integration complexity. Materials and capacity planned together, in one database, from day one.

### Section 1: What Standard MRP Misses

Standard MRP calculates material requirements but assumes unlimited production capacity. It explodes BOMs, calculates gross requirements, nets against inventory, and generates planned orders — but tells you nothing about whether your production floor can make those goods on time.

Result: production plans that look correct on paper but are impossible to execute. Bottleneck machines overloaded, some work centers idle while others double-booked, delivery dates slipping. Planners spend hours or entire days manually adjusting MRP output.

Example scenario: Three customer orders due in Week 10. MRP schedules all for Week 9. But Week 9 already has 120 hours scheduled on the CNC line with only 100 hours of available capacity. MRP doesn't see this problem.

**Pull quote:** "MRP assumes infinite capacity. Your production floor does not have infinite capacity. That gap is why your delivery dates keep slipping."

### Section 2: What AMRP Does Differently

DigiWin's AMRP integrates material planning and capacity planning in one system. Key capabilities:

- **Backward scheduling from delivery date:** Starts with customer delivery date, schedules backward checking material availability and production line capacity at each step. Flags bottlenecks immediately.
- **Forward scheduling when backward fails:** If backward scheduling is not feasible (materials arrive late or capacity already committed), automatically switches to forward scheduling and calculates the earliest realistic delivery date.
- **Considers already-committed capacity:** Tracks capacity at work center level, accounting for already-scheduled production orders. No double-booking.
- **Assembly coordination for JIT material arrival:** For complex assemblies, schedules material arrivals to minimize inventory holding time. Components arrive just in time for assembly.
- **Resource priority settings:** Configure priority rankings for internal production lines versus OEM outsourcing partners. Schedules internal capacity first, overflows to external partners only when fully loaded.
- **Rush order recalculation:** When a priority order arrives mid-month, recalculates remaining capacity across all existing orders and reschedules in seconds.

**Data card comparison:** MRP (Materials Only, Assumes Infinite Capacity) -> AMRP (Materials + Capacity, Built into DigiWin ERP). "No extra license. No separate system. No integration complexity."

### Section 3: The APS Tax: What Other Vendors Charge

Oracle and SAP require separate APS purchases for capacity-aware planning. Enterprise APS systems can cost as much as the ERP itself. You pay for: APS license, implementation project, integration middleware, ongoing maintenance of two separate systems.

Even after paying, integration complexity remains: ERP manages orders/inventory/financials, APS manages scheduling. Data flows back and forth. Rush orders require: update ERP -> wait for APS sync -> run APS optimizer -> push revised schedule back to ERP. Takes hours or longer.

AMRP eliminates this entirely. No separate license. No integration project. No synchronization delays. One system, one database, one workflow.

### Section 4: Real-World Impact: Rush Orders and Resource Priority

**Rush orders:** In most factories, a priority order mid-month triggers a day of chaos — manual rescheduling, phone calls, outdated plans. With AMRP: enter the rush order, flag as priority, click "reschedule." System recalculates capacity across all existing orders in seconds. Can be run multiple times per day for dynamic rescheduling.

**Resource priority:** Many factories use internal production lines plus external OEM partners. AMRP lets you configure resource priority rules. Ranks internal lines first, then OEM partners in order of preference. Enforces strategy automatically without manual intervention.

**Pull quote:** "Your production plan is only as good as the capacity behind it. If your ERP ignores capacity, your plan is fiction."

### Section 5: What This Means for Your Factory

If running standard MRP, planners manually adjust output every day to fit real capacity. Delivery performance suffers. You've considered buying a separate APS system but cost and complexity stopped you.

AMRP changes the calculation. Capacity planning without the APS tax. Zero cost beyond standard DigiWin T100 license. Zero implementation complexity (it's already there). Immediate value: production plans that account for real capacity, delivery dates you can meet, planners spending less time correcting the system.

Not a future feature. Not a premium add-on. Standard functionality in DigiWin T100, available today, included in the base ERP license.

### Closing / CTA

**CTA heading:** "Ready to Plan with Real Capacity?"
**CTA body:** "See how AMRP eliminates the gap between your production plan and your production reality."
**CTA button:** "Let's Talk" -> links to demo.html

---

## Data Claims & Stats Used

| Claim | Source/Verification |
|-------|-------------------|
| Oracle and SAP require separate APS purchases for capacity planning | General industry knowledge — needs verification for specific product tiers |
| Enterprise APS systems can cost as much as the ERP itself | Plausible but unverified — no specific pricing cited |
| AMRP recalculates in "seconds" | DigiWin product claim — needs verification |
| CNC line example: 120 hours scheduled vs 100 hours capacity | Illustrative example, not a real case study |
| AMRP included in base DigiWin T100 license at no extra cost | DigiWin product claim — needs verification with product team |
| "Can be run multiple times per day for dynamic rescheduling" | DigiWin product claim — needs verification |

---

## Internal Links

| Link Text | Target |
|-----------|--------|
| Back to Insights | blog.html |
| LRP vs MRP: Which Planning Method Fits Your Factory? | blog/lrp-vs-mrp.html |
| Feature Codes: How to Plan Products That Change Per Customer | blog/feature-codes.html |
| Shop Floor Mini-Scheduling: Real-Time Dispatch from AMRP to MES | blog/shop-floor-scheduling.html |
| Let's Talk (CTA) | demo.html |

---

## Flags & Notes

- **CTA link target:** Links to `demo.html` — this page may not exist yet. Verify file exists before deployment.
- **No competitor naming issue:** Article references Oracle and SAP by name. PRD says "Never name competitors directly." However, in blog/knowledge-base context this may be acceptable for SEO and credibility. Flagging for review.
- **Related article titles inconsistent:** The related card for Feature Codes says "How to Plan Products That Change Per Customer" but the actual Feature Codes article title is "How to Turn 27 SKUs Into 1 Product." Title mismatch in the related card.
- **Template uses shared blog CSS classes:** Uses `blog-hero`, `blog-body`, `blog-pullquote`, `blog-data-card`, `blog-highlight`, `blog-related`, `blog-cta` — all from shared `styles.css`. Only inline CSS is the category badge color (1 line). This is the correct pattern per CSS consolidation standards.
- **Abbreviations explained:** MRP (Material Requirements Planning), APS (Advanced Planning and Scheduling), AMRP (Advanced MRP), BOM (Bill of Materials), OEM, CNC, JIT — all spelled out on first use. Good Thai audience practice.
- **No real case study cited:** Article uses illustrative scenarios, not named customer examples. Consider adding a real DigiWin customer story for credibility.
