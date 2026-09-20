# Roadmap — from ERP to a sellable, Zoho-style platform

Goal: take this manufacturing ERP (currently backend + frontend, single-tenant-per-company but multi-company capable) to a product that can be sold to multiple businesses, with e-commerce marketplace connectivity (Amazon, Flipkart). This is a multi-month, multi-phase effort — not something done in one pass. Each phase below should ship as its own set of small, reviewable commits, in order, because later phases depend on the data-integrity and security foundation earlier phases establish.

## Phase 0 — Stabilization (in progress)

Fixes to existing code, no new features. Safe, small, independently revertible.

- [x] Rate limiting on auth/signup (`@nestjs/throttler`)
- [x] CORS locked to an allow-list (`CORS_ORIGINS`)
- [x] Row-locking fix for the stock-mutation race condition (`InventoryService.mutateStock`, `pessimistic_write`)
- [x] Missing FKs on `bom_items.item_id` / `production_order_items.item_id`
- [x] `company_id` indexes across tenant-scoped tables
- [x] Dead `quality_check_items` table + duplicate entity files removed
- [x] Unused deps removed from backend (`mysql2`, `bcryptjs`, `jsonwebtoken`)
- [x] Unused deps removed from frontend (`@supabase/supabase-js`, `mysql2`, and now `gsap`/`animejs` — `framer-motion` is the one actually used, 13 call sites)
- [x] Dispatch/FGR delete now reverses the stock movement it caused (`InventoryService.reverseMovements`), instead of silently leaving stock wrong
- [ ] Dispatch/FGR **update** still doesn't re-adjust stock when quantities change (only reversed on delete so far) — same `reverseMovements` + re-apply pattern, next
- [ ] No automated tests run in CI (only a supply-chain attestation workflow exists) — add a `test.yml` workflow running backend `npm test` + `npm run build` and frontend `npm run build` on every PR
- [ ] Two lockfiles per app (`package-lock.json` + `pnpm-lock.yaml`) — pick one package manager and delete the other's lockfile

## Phase 1 — Fill the core ERP gaps

Net-new work inside the existing domain (manufacturing/inventory/purchasing), not net-new modules:

- BOM cost rollup, versioning, and an approval step (currently a flat single-version list)
- Batch/lot/serial/expiry tracking on items and stock movements
- Warehouse bin-level tracking (schema already has `locations.location_type`, nothing built on top)
- Real pagination on the stock ledger (currently a hardcoded `LIMIT 500`)
- Cursor/offset pagination + `(company_id, status)` / `(company_id, created_at)` composite indexes on the transactional tables once dashboard query patterns are finalized

## Phase 2 — New modules

Each is a genuinely separate module, estimate and schedule independently:

- **Finance:** chart of accounts, journal entries, AR/AP, GST reports, P&L, balance sheet
- **CRM:** leads, quotations, won/lost pipeline
- **Landed-cost / import-costing engine**
- **Workflow/approval engine** (generic enough to gate POs, production orders, etc. behind sign-off)
- **Notification center** (email/SMS/in-app for low-stock, approval requests, order status)
- **Audit-trail table** (who changed what, when — needed before this is sold to anyone handling their own compliance)

## Phase 3 — E-commerce marketplace connectors

The part that turns this from "internal ERP" into "sync your store's orders/stock here":

- **Amazon:** SP-API integration — OAuth app registration, order import, inventory/price feed push, FBA vs. self-ship handling
- **Flipkart:** Flipkart Seller API — same shape (orders in, stock/price out)
- A generic **marketplace adapter interface** in the backend so a third platform (Meesho, Shopify, etc.) is a new adapter, not a new core module
- Reconciliation: marketplace order → this ERP's dispatch/stock flow, so a marketplace sale decrements the same `stock_ledger` everything else uses — no parallel inventory truth

## Phase 4 — Productization for resale (the "become Zoho" phase)

Everything above is still a single company's ERP. Selling it to many companies needs:

- **Tenant onboarding flow:** self-serve company signup (already has `POST /api/companies`), plan selection, sandbox/demo data seeding
- **Billing:** subscription plans, usage limits per plan, payment gateway integration (Razorpay/Stripe)
- **Per-tenant configuration:** feature flags per plan, white-label branding (logo/colors) if sold as a reseller product
- **Admin/ops console:** cross-tenant view for support, impersonation-for-debugging with audit logging, tenant health/usage dashboards
- **SLA-grade infra:** the current stock-mutation code assumes one Postgres instance under moderate load — before onboarding paying customers, put a load test against the row-locking and index work from Phase 0, and decide on `stock_ledger` partitioning before it's a live migration under production data

## Sequencing note

Phases 0 and 1 are foundation — skipping them to jump straight to marketplace connectors or billing means building Phase 3/4 on top of known data-integrity gaps (the update-without-stock-reversal issue, unpaginated ledger, missing batch tracking) that will be much more expensive to fix once real tenant data depends on them.
