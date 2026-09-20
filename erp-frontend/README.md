This is the frontend for the ERP Manufacturing system — a [Next.js](https://nextjs.org) (App Router) app talking to the `erp-backend` NestJS API.

> **Package manager: npm.** Use `npm`, not `pnpm`/`yarn` — `package-lock.json` is the lockfile CI and every install command here rely on. (A stray `pnpm-lock.yaml` used to sit alongside it; removed as of PLAN.md step 0.12.)

## Getting Started

```bash
cp .env.example .env   # set NEXT_PUBLIC_API_URL to the backend's URL
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The backend (see `../erp-backend/README.md`) needs to be running for any page that hits the API.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [`AUDIT_REPORT.md`](../AUDIT_REPORT.md) and [`PLAN.md`](../PLAN.md) at the repo root for this project's architecture notes and roadmap.
