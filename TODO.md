# Secure Academic Management System - Production Deployment Preparation TODO

## Completed
- [x] Gathered repo information (frameworks/build/start/Prisma/env validation/nginx/docker).
- [x] Approved production-readiness plan.

## Remaining
- [ ] Create/repair `.env.example` to match runtime validation and document required vars.
- [ ] Ensure backend production hardening: compression middleware, production-safe Helmet defaults, structured startup logging.
- [ ] Ensure frontend production API base URL works behind nginx/container (prefer `/api/v1`).
- [ ] Verify builds: frontend build, backend build, TypeScript compilation.
- [ ] Verify Prisma: generate + `migrate deploy` command safety checks.
- [ ] Add GitHub Actions CI workflow: lint/test/build + Prisma validate.
- [ ] Docker/deployment tweaks if build/runtime issues are found.
- [ ] Generate final deployment report with exact commands and required env vars.

