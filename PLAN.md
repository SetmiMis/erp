# Step-by-step execution plan

Companion to `ROADMAP.md` (the "why" / phases). This is the "how" — one numbered step at a time, in order. Each step is sized to be one session's work: pick the next unchecked step, do only that, commit, push, check it off. Do not skip ahead — later steps assume earlier ones are done. No step here is started until you explicitly say "go" on it.

Legend: `[x]` done · `[ ]` not started.

**Two tracks run side by side from here on:** Phase 0/1/2/3/4 below are the backend/data track (in strict order). **Phase R** (redesign — visual + UX flows) is a separate track that starts now, in parallel, the way a real product team runs design and engineering concurrently rather than sequentially. The only place they interlock: a page's redesign should reflect a backend fix's new behavior once that fix ships (e.g. Phase R's dispatch/FGR edit screens should surface the stock re-adjustment from steps 0.9/0.10 once those land) — not before.

---

## Phase 0 — Stabilization

- [x] **0.1** Rate limiting on login/signup (`@nestjs/throttler`)
- [x] **0.2** CORS allow-list (`CORS_ORIGINS` env var)
- [x] **0.3** Row-locking fix for the stock-mutation race condition (`pessimistic_write` in `InventoryService.mutateStock`)
- [x] **0.4** Missing FKs: `bom_items.item_id`, `production_order_items.item_id`
- [x] **0.5** `company_id` indexes across tenant-scoped tables
- [x] **0.6** Removed dead `quality_check_items` table + duplicate entity files
- [x] **0.7** Removed unused deps: backend (`mysql2`, `bcryptjs`, `jsonwebtoken`), frontend (`@supabase/supabase-js`, `mysql2`, `gsap`, `animejs`)
- [x] **0.8** Dispatch/FGR **delete** now reverses its stock movement (`InventoryService.reverseMovements`)
- [ ] **0.9** Dispatch **update** re-adjusts stock when line quantities change (currently header-only — reverse the old movement via `reverseMovements`, then re-apply the new quantities, same transaction)
- [ ] **0.10** FGR **update** re-adjusts stock the same way as 0.9
- [ ] **0.11** CI workflow (`.github/workflows/test.yml`): on every push/PR, run backend `npm run lint` + `npm run build` + `npm test`, and frontend `npm run build`. Today only a supply-chain attestation workflow exists — nothing currently gates a broken build from merging.
- [ ] **0.12** Pick one package manager (repo has both `package-lock.json` and `pnpm-lock.yaml` in each app) — delete the unused lockfile, document the choice in each app's README
- [ ] **0.13** Backend port (`3001`) and its 15m/7d token lifetimes are hardcoded in a few places despite `.env.example` documenting env vars for them — wire `PORT`, `JWT_ACCESS_TTL`, `JWT_REFRESH_TTL` through so `.env.example`'s claims are actually true
- [ ] **0.14** `docker-compose.yml` for local dev (Postgres + backend + frontend) — right now a new contributor has to hand-provision Postgres before `npm run start:dev` works

## Phase R — UI/UX Redesign (parallel track, starts now)

Visual design and UX flows both in scope — not just a coat of paint. Runs module-by-module so each shipped step is a usable, reviewable improvement, not a big-bang rewrite.

- [ ] **R.1** UX audit of the current app — walk every existing page/flow (already-committed history includes past "UI audit" / "UI polish" commits; confirm what's still inconsistent), list concrete pain points: inconsistent empty/loading/error states, unclear navigation, form flows that take too many steps, mobile breakpoints that break. This is the "why" behind every step after it — done before any visual change.
- [ ] **R.2** Design system foundation — color tokens (light + dark), typography scale, spacing scale, elevation/shadow rules, documented as the single source every page pulls from (build on MUI's theme layer rather than fighting it, since MUI v7 is already the frontend's component library)
- [ ] **R.3** Core shell redesign — sidebar navigation, top bar, the layout every other page sits inside. Highest-leverage single change since it's visible on every screen.
- [ ] **R.4** Dashboard redesign — the first thing every user sees after login; apply the design system from R.2 inside the shell from R.3
- [ ] **R.5** Module-by-module page redesign + UX flow rework, roughly in order of how often a user touches them: Items/current-stock → Purchase Orders/GRN → Production Orders/BOM → Dispatch/FGR → Quality Check → Customers/Suppliers → Reports → Settings/RBAC. Each module's step includes both the visual refresh and any flow simplification found in R.1 for that module.
- [ ] **R.6** Standardize empty/loading/error states and form validation feedback across every page (a cross-cutting pass after R.5's modules exist, so there's a real pattern to standardize rather than inventing one in the abstract)
- [ ] **R.7** Mobile/responsive pass — verify and fix breakpoints module by module
- [ ] **R.8** Accessibility pass — color contrast, keyboard navigation, ARIA labels, focus states
- [ ] **R.9** Final design-consistency QA across the whole app before calling the redesign done

## Phase 1 — Core ERP gaps (each bullet is its own step, do in this order)

- [ ] **1.1** Stock ledger pagination — replace the hardcoded `LIMIT 500` in `InventoryService.getLedger` with real cursor/offset pagination + a `(company_id, created_at)` composite index
- [ ] **1.2** Composite indexes `(company_id, status)` on `purchase_orders`, `production_orders`, `dispatch_orders` (do after 1.1 confirms the actual dashboard query shapes)
- [ ] **1.3** BOM versioning — allow multiple versions per finished item, mark exactly one `is_active` per item at a time (schema currently allows a flat list with no version-conflict guard)
- [ ] **1.4** BOM cost rollup — compute a finished item's cost from its active BOM's component costs, surfaced on the item/BOM pages
- [ ] **1.5** BOM approval step — draft → pending-approval → active states, gated by a role check (no workflow engine yet, just a status field + guard)
- [ ] **1.6** Batch/lot tracking schema — add `batch_no`/`expiry_date` (nullable, opt-in per item) to `stock_items`/`stock_ledger`, threaded through GRN (batch in) and dispatch (batch out, FEFO-aware if time allows)
- [ ] **1.7** Warehouse bin-level stock — `stock_items` gets an optional `location_id` (the schema already has `locations.location_type` unused for this); UI shows bin on the current-stock page
- [ ] **1.8** Serial number tracking for items flagged serial-tracked (separate from batch/lot — one row per unit, not a quantity)

## Phase 2 — New modules (each is its own multi-step sub-plan, written when we get there)

- [ ] **2.1** Audit-trail table — generic `audit_log(company_id, actor_user_id, entity_type, entity_id, action, diff, created_at)`, written by a TypeORM subscriber so it's automatic, not per-service boilerplate. Do this *first* in Phase 2 — everything sold to a paying customer should be auditable from day one, and retrofitting it after Finance/CRM exist means re-touching every service.
- [ ] **2.2** Notification center — starts as in-app only (a `notifications` table + a bell icon), email/SMS added once there's an actual trigger (low-stock, approval-pending) worth notifying on
- [ ] **2.3** Workflow/approval engine — generic enough that BOM approval (1.5) and future PO/production approval gates reuse it instead of each rolling its own status enum
- [ ] **2.4** CRM — leads → quotations → won/lost, feeding into `customers` (already exists) rather than duplicating it
- [ ] **2.5** Finance — chart of accounts, journal entries, this is the largest single module in the whole plan; will get its own detailed sub-plan before starting
- [ ] **2.6** Landed-cost / import-costing engine — depends on Finance (2.5) existing for the accounting entries it produces

## Phase 3 — Marketplace connectors

- [ ] **3.1** Design the generic marketplace-adapter interface (one contract: `fetchOrders`, `pushInventory`, `pushPricing`) before writing an Amazon-specific line of code, so Flipkart/others are new adapters, not copy-pasted modules
- [ ] **3.2** Amazon SP-API: app registration + OAuth (needs your Amazon Seller Central account and SP-API developer registration — this step needs you to obtain credentials, I can't self-serve that)
- [ ] **3.3** Amazon: order import → creates a dispatch order in this ERP, decrementing the same `stock_ledger`
- [ ] **3.4** Amazon: inventory/price push — this ERP's stock becomes the source of truth Amazon's listing reflects
- [ ] **3.5** Flipkart Seller API: same shape as 3.2–3.4, reusing the 3.1 adapter interface (also needs your Flipkart seller credentials)

## Phase 4 — Productization for resale

- [ ] **4.1** Self-serve tenant onboarding: plan selection + demo-data seeding on top of the existing `POST /api/companies`
- [ ] **4.2** Billing: subscription plans + usage limits, payment gateway (Razorpay/Stripe — your call which)
- [ ] **4.3** Per-tenant white-label config (logo/colors) if sold through resellers
- [ ] **4.4** Admin/ops console: cross-tenant support view, impersonation-for-debugging with its own audit log entry (uses 2.1)
- [ ] **4.5** Load test the row-locking (0.3) and indexing (0.5/1.1/1.2) work under realistic concurrent traffic before onboarding the first paying tenant; decide `stock_ledger` partitioning strategy if the load test says so

---

## How we'll work through this

1. One step at a time, in order — I won't jump to Phase 3 while Phase 0 has open boxes.
2. Before starting a step, I'll say which one and what it involves; nothing gets touched without that.
3. Each step ends in a pushed commit to `SetmiMis/erp` and this file updated (`[ ]` → `[x]`).
4. Steps needing something only you can provide (Amazon/Flipkart credentials, a payment gateway choice, Docker/DB access for load testing) are marked above — flag me when you have them so I know that step is unblocked.
