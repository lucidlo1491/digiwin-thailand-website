# AMRP Capacity Planning

> Advanced Material Requirements Planning for multi-factory Thai manufacturers.

---

Skip to content

[Back to Insights](../blog.html)
PRODUCTION PLANNING 

# AMRP: Why You Don't Need a Separate APS System

8 min read 

February 2026 

You bought an ERP for your factory. You set up your Bill of Materials (BOM), configured your production workflows, and trained your team. Then you sit down with your planner to create the production schedule for next month. You tell the system: here are the customer orders, here are the delivery dates, now show me the production plan. The system calculates material requirements, checks inventory, generates purchase orders. Everything looks good on paper. Then your planner looks at the calendar and says: "This won't work. Our CNC line can't handle this volume. We're going to miss half these delivery dates."

That is when you discover the gap. Your ERP only does MRP — Material Requirements Planning. It assumes you have infinite production capacity. It tells you what materials you need and when, but not whether your production lines can actually execute the plan. The schedule looks perfect until you try to run it on real machines with real constraints. To add capacity planning, your vendor says, you need a separate APS system — Advanced Planning and Scheduling. That is another license, another vendor, another integration project. Most enterprise ERP systems work this way. It is the industry default.

DigiWin's AMRP (Advanced MRP) does not work this way. It builds capacity planning directly into the ERP — at no extra cost, no separate system, no integration complexity. Materials and capacity planned together, in one database, from day one.

## What Standard MRP Misses

Standard MRP calculates material requirements but assumes unlimited production capacity. It looks at your orders, explodes the BOMs, calculates gross requirements, nets against inventory, and generates planned orders for materials. This is useful — you know what to buy and when. But it tells you nothing about whether your production floor can actually make those goods on time.

The result is production plans that look correct on paper but are impossible to execute. Your bottleneck machines get overloaded. Some work centers sit idle while others are double-booked. Delivery dates slip because the system scheduled more work than a production line can physically handle. Your planners spend hours — sometimes entire days — manually adjusting the MRP output to fit real capacity constraints.

Consider a typical scenario. You have three customer orders all due in Week 10. MRP schedules them all for production in Week 9 to allow time for final testing and shipping. But Week 9 already has 120 hours of work scheduled on your CNC line, and the line only has 100 hours of available capacity (after accounting for maintenance downtime and shift constraints). MRP does not see this problem. It generates the plan anyway. Then your production manager crosses out half the work orders and reschedules them by hand, knowing that some deliveries will now be late.

MRP assumes infinite capacity. Your production floor does not have infinite capacity. That gap is why your delivery dates keep slipping.

## What AMRP Does Differently

DigiWin's AMRP integrates material planning and capacity planning in one system. When you schedule a production order, AMRP checks both material availability and production line capacity — simultaneously, in real time, from the same database.

**Key capabilities:**

- **Backward scheduling from delivery date:** AMRP starts with the customer delivery date and schedules backward, checking at each step whether materials are available and whether the required production line has capacity. If a bottleneck appears, the system flags it immediately — not after your planner discovers it manually.

- **Forward scheduling when backward fails:** If backward scheduling is not feasible (materials will arrive late, or capacity is already committed), AMRP automatically switches to forward scheduling and calculates the earliest realistic delivery date. You know immediately whether you can meet the customer's timeline or need to negotiate.

- **Considers already-committed capacity:** AMRP tracks capacity at the work center level, accounting for already-scheduled production orders. When a new order arrives, the system knows which time slots are still available and which are already blocked. No double-booking.

- **Assembly coordination for JIT material arrival:** For complex assemblies with multiple sub-components, AMRP schedules material arrivals to minimize inventory holding time. Components arrive just in time for assembly, not weeks early.

- **Resource priority settings:** You can configure priority rankings for internal production lines versus OEM outsourcing partners. AMRP schedules internal capacity first, then overflows to external partners only when internal lines are fully loaded.

- **Rush order recalculation:** When a priority order arrives mid-month, AMRP recalculates remaining capacity across all existing orders and reschedules in seconds — not hours of manual replanning.

This is not a separate APS system layered on top of the ERP. It is built into the core planning engine. One system. One database. Materials and capacity planned together.

MRP 
Materials Only
(Assumes Infinite Capacity) 


AMRP 
Materials + Capacity
(Built into DigiWin ERP) 

No extra license. No separate system. No integration complexity. 

## The APS Tax: What Other Vendors Charge

Many enterprise ERP vendors require separate APS purchases for capacity-aware planning. These are not small add-ons. Enterprise APS systems can cost as much as the ERP itself — sometimes more, depending on the number of production lines and complexity of scheduling rules. You pay for the APS license, the implementation project, the integration middleware, and the ongoing maintenance of two separate systems that need to stay synchronized.

And even after you pay for it, you still have integration complexity. The ERP manages orders, inventory, and financials. The APS system manages scheduling. Data flows back and forth between the two. When a rush order arrives, you update the ERP, wait for the data to sync to APS, run the APS optimizer, then push the revised schedule back to the ERP. This takes time — often hours, sometimes longer if the integration has issues. Your planners spend significant effort managing the handoff between systems rather than focusing on production optimization.

AMRP eliminates this entirely. There is no separate APS license to buy. No integration project. No synchronization delays. Capacity planning is built into the ERP from day one, using the same database, the same user interface, the same workflow your team already knows. When a rush order arrives, you update one system — and the capacity recalculation happens immediately.

## Real-World Impact: Rush Orders and Resource Priority

**Rush orders:** In most factories, a priority customer order arriving mid-month triggers a day of chaos. The planner pulls up the existing MRP schedule, prints it out, and manually marks which orders can be delayed to make room for the rush job. Then they recalculate material requirements, check with the warehouse, call the production supervisor to confirm feasibility, and finally update the system with the revised plan. This takes hours — and the plan is already outdated by the time it is entered, because other orders have progressed or materials have arrived in the meantime.

With AMRP, the planner enters the rush order, flags it as priority, and clicks "reschedule." The system recalculates capacity across all existing orders, identifies which work can be deferred without missing critical deadlines, and generates a new schedule that accommodates the rush order — in seconds. The revised schedule accounts for material availability, production line capacity, and delivery date commitments across every order in the system. AMRP can be run multiple times per day for dynamic rescheduling as conditions change. Your planners spend less time updating spreadsheets and more time managing exceptions.

**Resource priority:** Many factories use a combination of internal production lines and external OEM partners. You want to maximize utilization of your own equipment (you already paid for it), and only overflow to OEM partners when internal capacity is fully booked. But coordinating this manually is complex — you need to know the real-time load on every internal line, compare it against incoming orders, and decide which jobs to send external.

AMRP lets you configure resource priority rules. You rank your internal production lines first, then list OEM partners in order of preference. When AMRP schedules a production order, it checks internal capacity first. If internal lines have available slots, the work is scheduled there. If internal capacity is fully loaded, AMRP assigns the order to the highest-priority external partner with availability. The system enforces your strategy automatically, without manual intervention.

Your production plan is only as good as the capacity behind it. If your ERP ignores capacity, your plan is fiction.

## What This Means for Your Factory

If you are running standard MRP, you already know the pain. Your planners manually adjust the MRP output every week — or every day — to fit real capacity constraints. Your delivery performance suffers because the system schedules work that cannot physically be completed on time. You have considered buying a separate APS system, but the cost and complexity have kept you from pulling the trigger.

AMRP changes the calculation. You get capacity planning without the APS tax. No separate license. No integration project. No data synchronization delays. Capacity planning is built into the ERP, using the same database your team already works with. The cost is zero (beyond the standard DigiWin T100 license you are already using). The implementation complexity is zero (it is already there). The value is immediate — production plans that account for real capacity constraints, delivery dates you can actually meet, and planners who spend less time manually correcting the system.

This is not a future feature. It is not a premium add-on. It is standard functionality in [DigiWin's manufacturing ERP](../products/erp.html), available today, included in the base license. If you are planning production for a manufacturing operation with capacity constraints — and every real factory has capacity constraints — AMRP eliminates the gap between your plan and your reality.

## Frequently Asked Questions

What is AMRP? + 

AMRP stands for Advanced Material Requirements Planning. It is DigiWin's built-in capacity-aware scheduling engine that integrates material planning and production capacity planning in one system. Unlike standard MRP which only calculates material requirements and assumes infinite production capacity, AMRP checks both material availability and production line capacity simultaneously, in real time, from the same database — ensuring your production plans are actually executable.

What is the difference between MRP and AMRP? + 

Standard MRP calculates material requirements but assumes unlimited production capacity — it tells you what materials you need but not whether your production lines can actually execute the plan. AMRP adds capacity constraints, split-order handling, and both backward scheduling (from delivery date) and forward scheduling (when backward is not feasible). AMRP also considers already-committed capacity to prevent double-booking, coordinates assembly timing for JIT material arrival, and supports resource priority settings for internal vs. OEM production.

Do I need a separate APS system with DigiWin ERP? + 

No. DigiWin's AMRP builds capacity planning directly into the ERP at no extra cost, with no separate system and no integration complexity. Most enterprise ERP vendors require a separate Advanced Planning and Scheduling (APS) system for capacity-aware planning, which can cost as much as the ERP itself. With DigiWin, materials and capacity are planned together in one database from day one — eliminating the APS license, the integration project, and the synchronization delays between separate systems.

What are the 6 key AMRP capabilities? + 

The six key AMRP capabilities are: (1) Backward scheduling from delivery date with automatic bottleneck detection, (2) Forward scheduling when backward scheduling is not feasible to calculate the earliest realistic delivery date, (3) Already-committed capacity tracking at the work center level to prevent double-booking, (4) Assembly coordination for JIT material arrival to minimize inventory holding time, (5) Resource priority settings that schedule internal production lines first and overflow to OEM partners only when internal capacity is full, and (6) Rush order recalculation that reschedules remaining capacity across all existing orders in seconds.

## Related Articles

[Production Planning ### LRP vs MRP: Which Planning Method Fits Your Factory? Read article](../blog/lrp-vs-mrp.html)
[Production Planning ### Feature Codes: How to Plan Products That Change Per Customer Read article](../blog/feature-codes.html)
[Smart Factory ### Shop Floor Mini-Scheduling: Real-Time Dispatch from AMRP to MES Read article](../blog/shop-floor-scheduling.html)

## Ready to Plan with Real Capacity?

See how AMRP eliminates the gap between your production plan and your production reality.

[Let's Talk](../demo.html)

## Related Solutions

[### Manufacturing ERP End-to-end manufacturing ERP for Thai factories — BOM, financials, and BOI compliance.](../products/erp.html)
[### Manufacturing Execution System (MES) Real-time shop floor execution — OEE tracking, SPC, and paperless work orders.](../products/mes.html)