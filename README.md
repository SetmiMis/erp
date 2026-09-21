# ERP Manufacturing V1

A multi-company manufacturing ERP: purchasing (PO → GRN → QC), production (BOM, production orders), inventory (stock ledger, dispatch, finished-goods receipt), and role-based access control.

## Structure

```
erp-backend/    NestJS 11 + TypeORM 0.3 API (PostgreSQL, JWT auth, multi-tenant via company_id)
erp-frontend/   Next.js 15 (App Router) + MUI v7 client
AUDIT_REPORT.md Architecture/security/code-quality audit of the current codebase — read this first
```

## Stack

- **Backend:** NestJS, TypeORM, PostgreSQL, class-validator, JWT (access + refresh tokens), RBAC (roles + permissions).
- **Frontend:** Next.js App Router, React 19, MUI v7 + Emotion, Zustand, Chart.js.

## Getting started

### Option A: docker compose (fastest — Postgres + backend + frontend, no local Postgres needed)

```bash
docker compose up --build
# backend:  http://localhost:3001/api
# frontend: http://localhost:3000
```

Hot-reloads both apps (source is bind-mounted). First boot creates the `erp_test`
Postgres schema every migration currently hardcodes (see `erp-backend/docker/init-schema.sql`
and PLAN.md step 0.16) and runs migrations automatically. Data persists in the
`postgres-data` volume across restarts; `docker compose down -v` wipes it for a clean slate.

### Option B: run each app directly

#### Backend
```bash
cd erp-backend
cp .env.example .env   # fill in DATABASE_URL / JWT_SECRET / etc.
npm install
npm run start:dev      # http://localhost:3001/api
```

#### Frontend
```bash
cd erp-frontend
cp .env.example .env
npm install
npm run dev             # http://localhost:3000
```

## Shared dev/staging database (Supabase)

A Supabase Postgres project (`erp-manufacturing-dev`, `ap-south-1`) exists for
shared dev/staging use, with the `erp_test` schema and all current migrations
already applied. To point `erp-backend` at it instead of a local/docker
Postgres, get the DB password from the Supabase dashboard and set in your
`.env` (see `erp-backend/.env.example`'s "Supabase dev/staging project"
section for the exact `DATABASE_URL`/`DB_SSL`/`DB_SCHEMA` values) — never
commit that password anywhere, including here.

**Row Level Security is off on every table in that project.** That's
intentional for now: this backend talks to Postgres directly with its own
JWT auth (see `erp-backend/src/auth/`), not through Supabase's PostgREST/
client-SDK path that RLS is meant to gate. It becomes a real gap only if
this project starts exposing these tables through Supabase's auto-generated
REST API or client libraries — worth revisiting before that happens, not
before.

## Demo data

The Supabase dev database (above) has demo data seeded: one company ("Demo
Manufacturing Co"), 2 warehouses, 3 suppliers, 3 customers, 8 items, a BOM,
a fully-received purchase order with GRN + QC, a completed production run,
a finished-goods receipt, and a dispatch -- stock levels are consistent with
the full ledger chain. Login:

- `admin@demo.com` / `Demo@1234` (COMPANY_ADMIN)
- `staff1@demo.com` / `Demo@1234` (USER)

## Live deployments

- **Frontend:** https://erp-manufacturing-frontend.vercel.app (Vercel, project
  `erp-manufacturing-frontend`, team `setmi-india`, auto-deploys on every push
  to `main`).
- **Backend:** not deployed yet -- the frontend above can't actually log in
  until it is, since it has no `/api` to call. `render.yaml` at the repo root
  is a ready-to-use Render Blueprint for this:
  1. On [Render](https://dashboard.render.com), **New +** → **Blueprint** →
     connect `SetmiMis/erp`. Render detects `render.yaml` and proposes the
     `erp-backend` web service from it.
  2. Before the first deploy, fill in the two secrets `render.yaml` leaves
     blank (`sync: false`): `DATABASE_URL` (the Supabase connection string
     from `erp-backend/.env.example`'s Supabase section, password from the
     Supabase dashboard) and `JWT_SECRET` (any long random string).
  3. Once live, copy the service's `https://erp-backend-<hash>.onrender.com`
     URL, set it as `NEXT_PUBLIC_API_URL` (with `/api` appended) in the
     Vercel project's environment variables, and redeploy the frontend so it
     points at the real backend instead of failing with no `/api` to call.

## Status

See [`AUDIT_REPORT.md`](./AUDIT_REPORT.md) for a detailed audit: current architecture, database schema, known security/performance issues, and a prioritized list of recommended fixes before further feature work.
