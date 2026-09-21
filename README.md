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
- **Backend:** https://erp-backend-45as.onrender.com/api (Render, service
  `erp-backend`, free plan, auto-deploys on every push to `main`; DB is the
  Supabase project above, over its **session pooler**, not the direct host --
  see the note below). Vercel's `NEXT_PUBLIC_API_URL` points at it, so the
  frontend can log in for real: verified end-to-end with
  `admin@demo.com` / `Demo@1234` returning a real JWT.

  `render.yaml` at the repo root is the Blueprint used to create it (Render
  dashboard → **New +** → **Blueprint** → connect `SetmiMis/erp`; the two
  secrets it leaves blank, `DATABASE_URL`/`JWT_SECRET`, get filled in on
  first deploy). Two real deploy failures along the way, both fixed and
  reflected in `render.yaml`/`.env.example` so a fresh deploy doesn't repeat
  them:
  1. `npm ci` was skipping devDependencies (because `NODE_ENV=production` is
     set for the app at runtime) -- `@nestjs/cli` lives there, so `nest build`
     failed with `nest: not found`. Fixed with `--include=dev` on the build
     command plus `NPM_CONFIG_PRODUCTION=false`.
  2. Supabase's direct host (`db.<ref>.supabase.co`) resolves to IPv6, and
     Render's network can't reach it (`ENETUNREACH`). Fixed by switching
     `DATABASE_URL` to the **session pooler** host
     (`aws-0-<region>.pooler.supabase.com:5432`, username
     `postgres.<project-ref>`, not just `postgres`) -- see
     `erp-backend/.env.example`'s Supabase section for the exact string.
     Use the pooler host by default on any host without confirmed IPv6
     egress, not just Render.

## Status

See [`AUDIT_REPORT.md`](./AUDIT_REPORT.md) for a detailed audit: current architecture, database schema, known security/performance issues, and a prioritized list of recommended fixes before further feature work.
