# Step-by-step execution plan

Companion to `ROADMAP.md` (the "why" / phases). This is the "how" — one numbered step at a time, in order. Each step is sized to be one session's work: pick the next unchecked step, do only that, commit, push, check it off. Do not skip ahead — later steps assume earlier ones are done. No step here is started until you explicitly say "go" on it.

Legend: `[x]` done · `[ ]` not started.

**Two tracks run side by side from here on:** Phase 0/1/2/3/4 below are the backend/data track (in strict order). **Phase R** (redesign — visual + UX flows) is a separate track that starts now, in parallel, the way a real product team runs design and engineering concurrently rather than sequentially. The only place they interlock: a page's redesign should reflect a backend fix's new behavior once that fix ships (e.g. Phase R's dispatch/FGR edit screens should surface the stock re-adjustment from steps 0.9/0.10 once those land) — not before.

---

## Infra note: shared dev/staging Supabase project

- [x] Created `erp-manufacturing-dev` (Supabase, `ap-south-1`, org `SetmiMis's Org`), applied the `erp_test` schema and all 6 migrations to it via the Supabase MCP tools (this sandbox has no network path to `*.supabase.co:5432` for `npm run migration:run` directly — only to the Supabase management API, which the MCP tools use). See `erp-backend/.env.example` for the connection details (password intentionally not committed anywhere).
- [ ] Row Level Security is off on all 26 tables in that project — intentional for now since this backend uses its own JWT auth over a direct Postgres connection, not Supabase's PostgREST/client-SDK path. Revisit before ever exposing these tables through Supabase's auto-generated REST API.
- [x] Seeded realistic demo data into the Supabase project (company, users, warehouses, suppliers, customers, items, a BOM, a fully-received PO with GRN+QC, a completed production run, an FGR, a dispatch) — stock_items balances hand-verified against the stock_ledger chain (steel sheet 730kg, M8 bolt 4600pcs, chair 40pcs). Login: `admin@demo.com` / `Demo@1234`. See README.md "Demo data".

## Infra note: deployments

- [x] Frontend deployed to Vercel (`erp-manufacturing-frontend`, team `setmi-india`, git-linked to `SetmiMis/erp` main branch, auto-deploys on push): https://erp-manufacturing-frontend.vercel.app
- [x] Along the way: the first Vercel deploy failed outright (`VULNERABLE_NEXTJS_VERSION` — Next.js 15.5.3 has a critical RCE, CVE-2025-66478/React2Shell). Upgraded to the latest stable, Next.js 16.3.5, verified with a clean build + a runtime smoke test before pushing, then `npm audit fix` for two unrelated vulnerabilities. 0 vulnerabilities now.
- [x] Backend deployed to Render (`erp-backend`, free plan, git-linked, auto-deploys on push): https://erp-backend-45as.onrender.com/api. Two real deploy failures hit and fixed along the way (both now reflected in `render.yaml`): (1) `npm ci` skipping devDependencies under `NODE_ENV=production` broke `nest build` (`nest: not found`) — fixed with `--include=dev` + `NPM_CONFIG_PRODUCTION=false`; (2) Supabase's direct `db.<ref>.supabase.co` host resolves to IPv6, which Render's network can't reach (`ENETUNREACH`) — fixed by switching to Supabase's session pooler host/username. Vercel's `NEXT_PUBLIC_API_URL` now points at this backend and the frontend was redeployed; verified end-to-end with a real login (`admin@demo.com`/`Demo@1234` returns a JWT) against the live Supabase demo data.

## Phase 0 — Stabilization

- [x] **0.1** Rate limiting on login/signup (`@nestjs/throttler`)
- [x] **0.2** CORS allow-list (`CORS_ORIGINS` env var)
- [x] **0.3** Row-locking fix for the stock-mutation race condition (`pessimistic_write` in `InventoryService.mutateStock`)
- [x] **0.4** Missing FKs: `bom_items.item_id`, `production_order_items.item_id`
- [x] **0.5** `company_id` indexes across tenant-scoped tables
- [x] **0.6** Removed dead `quality_check_items` table + duplicate entity files
- [x] **0.7** Removed unused deps: backend (`mysql2`, `bcryptjs`, `jsonwebtoken`), frontend (`@supabase/supabase-js`, `mysql2`, `gsap`, `animejs`)
- [x] **0.8** Dispatch/FGR **delete** now reverses its stock movement (`InventoryService.reverseMovements`)
- [x] **0.9** Dispatch **update** re-adjusts stock when line quantities/warehouse change (reverses the old movement via `reverseMovements`, falls back to the original item/warehouse when the request only changes one of the two, then re-applies)
- [x] **0.10** FGR **update** re-adjusts stock the same way as 0.9
- [x] **0.11** CI workflow (`.github/workflows/ci.yml`): on every push/PR to `main`, runs backend build + unit tests (lint included but non-blocking — see 0.15) and frontend build. Found and fixed a real pre-existing bug in the process: `erp-frontend/src/app/suppliers/[id]/edit/page.tsx` had its own local `Supplier` interface missing `created_at`/`updated_at`/`deleted_at`, which made `npm run build` fail outright (a type error, not just a lint nit) — nobody had run a production build before this.
- [ ] **0.15** Backend lint debt: ~440 pre-existing eslint findings (mostly unrun prettier formatting, plus a handful of real `@typescript-eslint/no-unsafe-*` issues in `users.service.ts`/`warehouses.service.ts`/`suppliers.service.ts`/`reports.service.ts`) and two test files eslint can't parse (`test/app.e2e-spec.ts`, `test/setup-e2e.ts` — not in the eslint project's tsconfig). Clean this up, then remove `continue-on-error` from the CI lint step so it actually gates merges.
- [x] **0.12** Picked npm (CI, all scripts, and both `package.json`s already assume it) — removed the unused `pnpm-lock.yaml` from both apps, documented the choice in each app's README. Also replaced `erp-frontend/README.md`, which turned out to be a stale ~7,400-line full-repo text dump (not real docs), with an actual short README.
- [x] **0.13** Wired `PORT` (`main.ts`, defaults 3001), `JWT_ACCESS_TTL`/`JWT_REFRESH_TTL` (`AuthService`, defaults 15m/7d) through so `.env.example` is accurate. Previously `JWT_EXPIRES_IN` was documented as controlling token lifetime but every `signAsync()` call in `AuthService` passed its own hardcoded `'15m'`/`'7d'`, silently overriding it.
- [x] **0.14** `docker-compose.yml` for local dev (Postgres + backend + frontend), with dev Dockerfiles for both apps (hot-reload via bind mounts). Verified end-to-end in this sandbox: fresh stack boots, backend migrations run clean, `GET /api/system` responds, frontend serves 200. Found and worked around a real bug in the process — see 0.16.
- [ ] **0.16** Every migration in `src/migrations/*.ts` hardcodes the schema name `"erp_test"` directly into its raw SQL (all 4 files), instead of running unqualified against whatever schema TypeORM is configured for. This means the backend has never been able to boot against a fresh/default (`public`-schema) Postgres — only against one where `erp_test` already exists, which is why `data-source.ts`'s own comment calls it a schema meant "to verify migrations against real Postgres without touching the live app's data," not a production target. docker-compose works around this (0.14) by creating that schema via `erp-backend/docker/init-schema.sql` and setting `DB_SCHEMA=erp_test`, rather than editing the migration files — rewriting already-shipped migration SQL is only safe once someone confirms whether any deployed environment already has this migration applied under a specific schema. Decide that, then either rename to `public` in a new migration/fix, or make the workaround the documented permanent setup.

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

- [x] **1.1** Stock ledger pagination — `InventoryService.getLedger` now returns `{ rows, total, limit, offset }` (offset pagination, max page size 200, default 50, ordered by `created_at DESC, id DESC` for a stable tie-break), backed by a new `(company_id, created_at)` index. `InventoryController` and the `stock-ledger` frontend page (Prev/Next + "Showing X-Y of total") updated to match. Verified end-to-end via the docker-compose stack: seeded 7 real stock movements through the API, confirmed 3-page pagination (3+3+1) returns the correct rows with a consistent `total` on every page.
- [x] **1.2** Composite `(company_id, status)` indexes on `purchase_orders`, `production_orders`, `dispatch_orders` (migration 1786172699869). Confirmed the real query pattern first (`purchase-orders.service.ts` and `reports.service.ts` both filter `company_id` + `status` together) rather than guessing. Verified via docker-compose: fresh migration run succeeds, `\di erp_test.*` in psql shows all three indexes created.
- [x] **1.3** BOM versioning — two partial unique indexes (migration 1786172699870): at most one active BOM per `(company_id, fg_item_id)`, and no duplicate `version` label per finished item. `BomService.create()`/`update()` auto-deactivate the current active sibling before activating a new version (so activating one reads as "promote this version," not a manual two-step), and a Postgres unique-violation on either index is translated to a clean 409 `ConflictException` instead of a raw DB error leaking through. Verified end-to-end via docker-compose: created V1 (active) → created V2 (active), confirmed V1 auto-flipped to inactive → attempted a duplicate V2 for the same item, got the expected 409. Applied to the Supabase dev DB too.
- [x] **1.4** BOM cost rollup — `BomService.getCostRollup()` sums each component's `qty × items.purchase_rate` (re-priced live on every call, not cached, so a rate change is reflected immediately). Two endpoints: `GET /bom/:id/cost` (a specific version) and `GET /bom/item/:itemId/cost` (whichever BOM is currently active for that item, 404 if none). Surfaced on the BOM detail page: a "Rolled-up Cost" figure in the info card, plus Unit Cost/Line Cost columns and a Total Cost footer row on the components table. Verified end-to-end via docker-compose: 5kg steel @₹85.50 + 8pcs bolts @₹2.50 → ₹447.50, matching hand-calculated expected value exactly; no-active-BOM case returns a clean 404.
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
