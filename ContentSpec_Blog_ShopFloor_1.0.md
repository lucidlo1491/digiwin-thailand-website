# Content Spec: Blog — Shop Floor Mini-Scheduling: When Plans Meet Reality (7.0)

**PRD Reference:** Section 7.0 (Blog / Knowledge Base)
**Status:** v1.0 — Reverse-engineered from HTML build
**Last Updated:** February 10, 2026

---

## Article Metadata

| Field | Value |
|-------|-------|
| **Title** | Shop Floor Mini-Scheduling: When Plans Meet Reality |
| **Slug** | /blog/shop-floor-scheduling |
| **Category** | Smart Factory |
| **Category Badge Color** | #7C3AED (purple) |
| **Read Time** | 7 min read |
| **Publication Date** | February 2026 |
| **Meta Description** | Production plans rarely survive first contact with the shop floor. Mini-scheduling lets floor supervisors adjust in real-time while keeping planning informed. |

---

## Template & CSS Notes

- Uses shared blog template from `styles.css` (blog-hero, blog-body, blog-related, blog-cta classes)
- Only inline CSS: `.blog-category-badge { background: #7C3AED; }` (1 line)
- Matches the **target pattern** for blog articles — zero custom CSS beyond badge color
- **Note:** Category badge text is "SMART FACTORY" (uppercase) in the HTML, which differs from other articles that use title case. The shared CSS may apply `text-transform: uppercase` — need to verify consistency.

---

## Article Content

### Opening / Hook

Every production planner knows the feeling. You spend Monday morning building a precise weekly schedule — machine assignments, order sequences, material availability all perfectly coordinated. By Monday afternoon, a machine is down for unplanned maintenance. A rush order arrives from a key customer. A material delivery is delayed by two days. Your perfect plan is obsolete.

This is not a sign of poor planning. It is a reflection of manufacturing reality. Production schedules are built on assumptions about machine uptime, material availability, and stable demand. Every one of those assumptions gets challenged every day. The question is not whether your plan will need adjustment — it is whether your system makes those adjustments visible or invisible to the people who depend on accurate scheduling information.

---

### Section 1: The Gap Between Planning and the Floor

- In most factories: wall between planning department and production floor
- Planning creates schedules in ERP → floor supervisor gets printout or static schedule view
- When reality forces changes, supervisor adjusts by instinct and experience
- Changes happen in supervisor's head or on whiteboard — planning doesn't know until next day's production report
- Plan and reality diverge: system says Line 3 running Order 4521, but supervisor moved it to Line 2 because of tooling issue
- Downstream decisions (material staging, quality checks, shipping) based on obsolete information

Cascading problems:
- Warehouse teams prepare materials for wrong production sequence
- Quality inspectors wait at wrong line
- Maintenance schedules conflict with actual production
- Customer service quotes delivery dates based on outdated schedules
- Everyone working hard but from different versions of the truth

**Pull quote:** "The best production plan is one that adapts to reality without losing visibility. Mini-scheduling keeps the floor flexible and planning informed."

### Section 2: What Mini-Scheduling Does

- DigiWin's shop floor mini-scheduling bridges the gap
- Floor supervisors can adjust production sequences, reassign machines, reschedule orders directly in the system — in real-time
- Changes immediately visible to planning department
- System recalculates downstream impacts (material requirements, delivery dates, capacity utilization) automatically

Key design principles:
- **Not a separate scheduling system** — same system planning uses, with permissions/interfaces for floor-level decision-making
- Supervisor sees their lines, machines, orders — doesn't need to understand full ERP
- Adjustments recorded in same database planning reads from
- No reconciliation step, no phone calls, no manual log entries

**Planning maintains strategic control:**
- Sets master schedule (weekly/daily based on demand, material availability, capacity)
- Mini-scheduling adjusts execution within boundaries planning has defined
- If floor adjustment would violate material availability or customer commitment dates, system flags it
- Supervisor can see **why** adjustment is problematic and make informed decision

### Section 3: How It Works

Workflow:
1. Production planner sets master schedule (which orders on which lines, in what sequence, starting when)
2. Schedule visible to floor supervisors on screens (desktop, tablet, or terminal)
3. When adjustments needed, supervisor can:

**Adjustment capabilities:**
- **Drag-and-drop resequence orders** on a machine (move Order B ahead of Order A because material for A is delayed)
- **Move an order to a different machine or line** (shift Order C from Line 3 to Line 2 because Line 3 has maintenance issue)
- **Split a production order across shifts** (500 units on day shift, 300 on night shift for rush request)
- **Flag delays that affect downstream orders** (mark Order D as delayed so dependent assembly orders rescheduled automatically)

Every change logged and immediately visible to planning. No phone calls, no whiteboards, no next-day surprises. If planning needs to intervene (e.g., floor adjustment creates delivery risk), they can communicate through the system or escalate.

**Data card:**
- Real-Time: Floor adjustments visible to planning instantly — not next-day

### Section 4: Why This Matters for Thai Manufacturers

- Thai floor supervisors often the most experienced people in the factory
- Know which machines run better on certain products, which operators strongest on which lines, when to push overtime vs. split production
- This knowledge is not written down — lives in their heads, built over years

**Mini-scheduling doesn't replace their judgment — it digitizes it:**
- Supervisor decision ("moving this order to Line 2 because tooling setup already there from previous run") becomes system record
- Planning can see not just **what** changed but **why**
- Over time: patterns become visible, planning can incorporate floor intelligence into future master schedules

**Particularly valuable in Thailand's industrial context:**
- Many factories operate with lean planning teams (2-3 people scheduling hundreds of orders across dozens of machines)
- Cannot micromanage every adjustment
- Mini-scheduling gives them **visibility** — see what floor is doing, trust supervisors' expertise, intervene only on strategic issues

**Highlight box:** "Common mini-scheduling adjustments in Thai factories: Resequencing orders to minimize tooling changeovers when material delays force schedule changes; shifting production to night shift when rush orders arrive mid-day; moving orders between parallel lines when one machine develops quality issues; splitting large orders across shifts to balance overtime costs with delivery commitments."

### Section 5: Closing — Planning as Conversation, Not Broadcast

- Production planning should not be one-way broadcast — should be conversation between planning and floor
- Planning sets strategy (what to produce, by when, with what resources)
- Floor executes tactics (how to adapt strategy to today's reality)
- When both sides see what the other is doing: **alignment**

Mini-scheduling makes conversation happen in real-time with full visibility:
- Planning doesn't lose control
- Floor doesn't lose flexibility
- Entire factory operates from same version of the truth — schedule reflecting not just what was planned but what is actually happening

Closing argument: If current system forces supervisors to adjust on whiteboards or in their heads, you have a visibility gap. That gap creates inefficiency, delays, missed commitments. It also wastes the most valuable resource: experience and judgment of the people who know the production floor best. Mini-scheduling closes that gap.

---

## Related Articles

| Article Title | Link |
|---------------|------|
| AMRP: Capacity-Aware Planning That Prevents Over-Commitment | /blog/amrp-capacity-planning.html |
| Production Transparency: Why What You Can't See Costs You Money | /blog/production-transparency.html |
| The 5 Universal Pain Points Every Thai Manufacturer Faces | /blog/five-pain-points.html |

---

## CTA Section

| Field | Value |
|-------|-------|
| **Heading** | Bridging Planning and Production? |
| **Body** | Our team can show you how mini-scheduling keeps your floor flexible and your plans accurate. |
| **Button Text** | Let's Talk |
| **Button Link** | demo.html |

---

## Data Claims & Stats Used

| Claim | Source/Verification |
|-------|-------------------|
| "lean planning teams (2-3 people)" for Thai factories | Plausible for mid-size Thai manufacturers; not sourced from specific data |
| "hundreds of production orders across dozens of machines" | Directionally reasonable for high-mix factories; illustrative |
| "Order 4521" | Fictional order number for illustration |

**Note:** This article is notably light on specific data claims — it relies primarily on operational scenarios and workflow descriptions rather than statistics. This is appropriate for a feature-explanation article.

---

## Internal Links

| Link Text | Target |
|-----------|--------|
| Back to Insights | blog.html |
| AMRP: Capacity-Aware Planning That Prevents Over-Commitment | blog/amrp-capacity-planning.html |
| Production Transparency: Why What You Can't See Costs You Money | blog/production-transparency.html |
| The 5 Universal Pain Points Every Thai Manufacturer Faces | blog/five-pain-points.html |
| Let's Talk (CTA) | demo.html |

---

## Flags & Notes

- **DigiWin named explicitly in Section 2** ("DigiWin's shop floor mini-scheduling") — this is appropriate as the article describes a specific product feature. The rest of the article focuses on the concept and benefits rather than being a product pitch.
- **Category badge text is "SMART FACTORY" (uppercase)** — other articles using Smart Factory category use title case ("Smart Factory"). This is a minor inconsistency; the shared CSS likely normalizes this with `text-transform: uppercase` on the badge.
- **Related article links to `amrp-capacity-planning.html`** — need to verify this file exists. If not, this violates the "Real Links Only" constraint.
- **Related article titles differ slightly** from actual article titles on those pages (e.g., "Production Transparency: Why What You Can't See Costs You Money" vs. the actual article title "From Paper Reports to Production Transparency: A Practical Guide"). These should be reconciled for consistency.
- **CTA "show you how mini-scheduling keeps your floor flexible"** — borders on demo language but acceptable since framed as consultation.
- **Strong Thai-specific context** — Section 4 specifically addresses Thai industrial context (lean planning teams, experienced floor supervisors, knowledge in heads not systems). This is good audience targeting per the Playbook.
- **"Planning as Conversation, Not Broadcast"** is a strong conceptual frame — memorable and shareable. Good headline writing.
- **No jargon concerns** — ERP, OEE, BOM are not used in this article. Technical terms (MES, APS) are also absent. This article is highly accessible to the Thai factory owner audience.
- **No images or visual data** — Article relies on text descriptions and a single data card. The drag-and-drop interface description in Section 3 could benefit from a screenshot or illustration in future iterations.
