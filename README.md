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

## Status

See [`AUDIT_REPORT.md`](./AUDIT_REPORT.md) for a detailed audit: current architecture, database schema, known security/performance issues, and a prioritized list of recommended fixes before further feature work.
