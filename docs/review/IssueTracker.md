# Issue Tracker - Secure Academic Management System

## Overview

This document tracks all issues identified during the project audit. Issues are categorized by priority (Critical, High, Medium, Low) with detailed descriptions and recommendations.

---

## Critical Issues

### ISSUE-001: Prisma Schema Location Inconsistency ✅

| Field | Value |
|-------|-------|
| **Priority** | Critical |
| **Status** | Completed |
| **Component** | Database/Backend |
| **Affected Files** | `server/prisma.schema`, `database/schema.prisma`, `server/prisma/schema.prisma` |
| **Estimated Effort** | 1 hour |

**Problem**: Two Prisma schema files exist. `server/prisma.schema` is minimal while `database/schema.prisma` contains the complete schema.

**Reason**: Project structure inconsistency.

**Impact**: Confusion for developers, risk of schema drift, Prisma commands won't work correctly.

**Solution Implemented**:
1. Moved `database/schema.prisma` to `server/prisma/schema.prisma`
2. Deleted `server/prisma.schema`
3. Added RefreshToken and PasswordResetToken models to schema
4. Added LoginStatus enum and updated LoginHistory model

---

### ISSUE-002: No Authentication Implemented ✅

| Field | Value |
|-------|-------|
| **Priority** | Critical |
| **Status** | Completed |
| **Component** | Backend |
| **Affected Files** | `server/src/lib/auth.ts`, `server/src/services/auth.service.ts`, `server/src/controllers/auth.controller.ts`, `server/src/routes/auth.routes.ts`, `server/src/repositories/user.repository.ts`, `server/src/repositories/refreshToken.repository.ts`, `server/src/repositories/loginHistory.repository.ts` |
| **Estimated Effort** | 1 week |

**Problem**: No authentication system in place at all.

**Reason**: Project is in early stages, foundation only.

**Impact**: Anyone can access any API endpoint - completely insecure.

**Solution Implemented**:
1. Implemented JWT authentication with access and refresh tokens
2. Created auth endpoints (login, register, refresh, logout, change-password, forgot-password, reset-password, get-me)
3. **Password hashing upgraded to Argon2id** (memory-hard, production-grade) with bcryptjs fallback
4. Implemented refresh token rotation and revocation
5. Implemented account lockout for too many failed attempts
6. Added EmailVerificationToken model for future email verification

---

### ISSUE-003: No Authorization Implemented ✅

| Field | Value |
|-------|-------|
| **Priority** | Critical |
| **Status** | Completed |
| **Component** | Backend |
| **Affected Files** | `server/src/middleware/auth.middleware.ts` |
| **Estimated Effort** | 2-3 days |

**Problem**: No role checks on endpoints, no RBAC.

**Reason**: Authentication not implemented yet.

**Impact**: Users can access resources they shouldn't (e.g., student can change marks).

**Solution Implemented**:
1. Created authentication middleware to verify JWT
2. Created authorization middleware to check roles/permissions
3. Protected endpoints with appropriate role checks

---

### ISSUE-004: No Input Validation ✅

| Field | Value |
|-------|-------|
| **Priority** | Critical |
| **Status** | Completed |
| **Component** | Backend |
| **Affected Files** | `server/src/middleware/validation.middleware.ts`, `server/src/validators/auth.validator.ts` |
| **Estimated Effort** | 2-3 days |

**Problem**: No validation of incoming request data.

**Reason**: Controllers and routes not implemented yet.

**Impact**: SQL injection, XSS, invalid data in database.

**Solution Implemented**:
1. Created Zod schemas for all request inputs
2. Created validation middleware to validate all requests before processing
3. Implemented proper error responses for validation errors

---

## High Priority Issues

### ISSUE-005: Missing Backend Module Structure ✅

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Status** | Completed |
| **Component** | Backend |
| **Affected Files** | `server/src/` |
| **Estimated Effort** | 30 minutes |

**Problem**: Missing directories for controllers, services, repositories, routes, validators, middleware.

**Reason**: Project is in early stages.

**Impact**: Code will become disorganized as features are added.

**Solution Implemented**:
Directories already existed, confirmed they're all present:
- `server/src/controllers/`
- `server/src/services/`
- `server/src/repositories/`
- `server/src/routes/`
- `server/src/validators/`
- `server/src/middleware/`
- `server/src/lib/`

---

### ISSUE-006: No Prisma Client Singleton ✅

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Status** | Completed |
| **Component** | Backend |
| **Affected Files** | `server/src/lib/prisma.ts` |
| **Estimated Effort** | 15 minutes |

**Problem**: No centralized Prisma Client instance.

**Reason**: Not created yet.

**Impact**: Risk of multiple Prisma Client instances being created, wasting resources.

**Solution Implemented**:
Created `server/src/lib/prisma.ts` with singleton Prisma Client instance.

---

### ISSUE-007: No Database Migrations 📝

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Status** | In Progress |
| **Component** | Database |
| **Affected Files** | N/A |
| **Estimated Effort** | 30 minutes |

**Problem**: No migration files exist.

**Reason**: Project is new.

**Impact**: Can't deploy schema changes safely, no versioning of schema.

**Recommended Solution**:
1. Fix schema location (ISSUE-001 - ✅ Completed)
2. Run `prisma migrate dev --name init`

**Note**: Schema is finalized. Migration requires a running PostgreSQL instance. Run `prisma migrate dev` when database is available.

---

### ISSUE-008: Permissive CORS Configuration ✅

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Status** | Completed |
| **Component** | Backend |
| **Affected Files** | `server/src/index.ts` |
| **Estimated Effort** | 15 minutes |

**Problem**: `app.use(cors())` allows any origin.

**Reason**: Default configuration used.

**Impact**: CSRF attacks possible, cross-origin requests allowed from anywhere.

**Solution Implemented**:
Updated to:
```typescript
app.use(cors({
  origin: config.CORS_ORIGIN,
  credentials: true
}))
```

---

### ISSUE-009: Error Handler Doesn't Use Custom Errors ✅

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Status** | Completed |
| **Component** | Backend |
| **Affected Files** | `server/src/index.ts` |
| **Estimated Effort** | 30 minutes |

**Problem**: Current error handler doesn't check for custom ApiError instances.

**Reason**: Error handler was written before custom errors.

**Impact**: Inconsistent error responses.

**Solution Implemented**:
1. Updated error handler to check for ApiError, ValidationError, AuthenticationError, AuthorizationError and format appropriately
2. Added Winston logging to error handler
3. Centralized error handler with structured error logging

---

### ISSUE-010: Dashboard Page Inlined in App.tsx ✅

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Status** | Completed |
| **Component** | Frontend |
| **Affected Files** | `client/src/App.tsx`, `client/src/pages/DashboardPage.tsx` |
| **Estimated Effort** | 15 minutes |

**Problem**: DashboardPage component is inside App.tsx instead of its own file.

**Reason**: Quick setup.

**Impact**: Poor code organization.

**Solution Implemented**:
1. Created `client/src/pages/DashboardPage.tsx`
2. Moved DashboardPage component there
3. Imported and used in App.tsx

---

### ISSUE-011: No Frontend State Management ✅

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Status** | Completed |
| **Component** | Frontend |
| **Affected Files** | N/A |
| **Estimated Effort** | 1 day |

**Problem**: No state management solution in place.

**Reason**: Project is in early stages.

**Impact**: Prop drilling, inconsistent state, hard to manage auth state.

**Solution Implemented**:
1. Added Zustand for client state (auth, user info)
2. Created `client/src/store/authStore.ts` with login, logout, hydrate actions
3. Added `@tanstack/react-query` for server state management
4. Created `client/src/services/api.ts` with Axios instance and interceptors (token refresh queue)
5. Created `client/src/services/authService.ts` for auth API calls

---

## Medium Priority Issues

### ISSUE-012: No Logging System ✅

| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Status** | Completed |
| **Component** | Backend |
| **Affected Files** | `server/src/lib/logger.ts` |
| **Estimated Effort** | 1 day |

**Problem**: Winston is installed but not configured or used.

**Reason**: Not set up yet.

**Impact**: No visibility into system behavior, hard to debug issues.

**Solution Implemented**:
1. Configured Winston logger with console and file transports
2. Logs written to `logs/` directory (error.log, combined.log, http.log)
3. Morgan HTTP logger integrated with Winston via morganStream
4. Error handler uses `logger.error()` with structured context
5. Colorized console output for development, JSON files for production

---

### ISSUE-013: No Tests

| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Status** | Open |
| **Component** | Entire Project |
| **Affected Files** | N/A |
| **Estimated Effort** | 2-3 weeks |

**Problem**: No tests at all - unit, integration, or E2E.

**Reason**: Project is new.

**Impact**: Can't refactor safely, regressions likely, no confidence in code.

**Recommended Solution**:
1. Start with unit tests for utilities and services
2. Add integration tests for API endpoints
3. Set up CI/CD to run tests on PR

---

### ISSUE-014: No Environment Variable Validation ✅

| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Status** | Completed |
| **Component** | Backend |
| **Affected Files** | `server/src/config/index.ts` |
| **Estimated Effort** | 1 hour |

**Problem**: Environment variables are not validated on startup.

**Reason**: Not implemented yet.

**Impact**: Runtime errors from missing or invalid configuration.

**Solution Implemented**:
Created a Zod schema for env vars and validate on startup, exiting with error if any invalid.

---

### ISSUE-015: No Soft Deletes

| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Status** | Open |
| **Component** | Database |
| **Affected Files** | `server/prisma/schema.prisma` |
| **Estimated Effort** | 1-2 days |

**Problem**: All deletes are hard deletes.

**Reason**: Not designed yet.

**Impact**: Data loss, no recovery option, can't see historical data.

**Recommended Solution**:
Add `deletedAt DateTime?` to critical models (User, Student, Faculty, etc.) and update all queries to filter deleted records.

---

### ISSUE-016: No Refresh Token Model ✅

| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Status** | Completed |
| **Component** | Database |
| **Affected Files** | `server/prisma/schema.prisma` |
| **Estimated Effort** | 1 hour |

**Problem**: No way to store or invalidate refresh tokens.

**Reason**: Not designed yet.

**Impact**: Can't implement refresh token rotation or revocation.

**Solution Implemented**:
Added RefreshToken model and PasswordResetToken model to schema.

---

### ISSUE-017: LoginHistory.status is String Instead of Enum ✅

| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Status** | Completed |
| **Component** | Database |
| **Affected Files** | `server/prisma/schema.prisma` |
| **Estimated Effort** | 30 minutes |

**Problem**: LoginHistory.status is String instead of a proper enum.

**Reason**: Oversight in schema design.

**Impact**: Invalid status values possible.

**Solution Implemented**:
Created LoginStatus enum and updated LoginHistory to use it with default 'FAILED'.

---

## Low Priority Issues

### ISSUE-018: No API Documentation

| Field | Value |
|-------|-------|
| **Priority** | Low |
| **Status** | Open |
| **Component** | Backend |
| **Affected Files** | N/A |
| **Estimated Effort** | 1-2 days |

**Problem**: No Swagger/OpenAPI documentation.

**Reason**: Routes not implemented yet.

**Impact**: Hard for developers to use the API.

**Recommended Solution**:
Add Swagger UI using tsoa or similar.

---

### ISSUE-019: Health Check Doesn't Verify Dependencies ✅

| Field | Value |
|-------|-------|
| **Priority** | Low |
| **Status** | Completed |
| **Component** | Backend |
| **Affected Files** | `server/src/index.ts` |
| **Estimated Effort** | 1 hour |

**Problem**: Health check only returns "OK", doesn't check database or Redis.

**Reason**: Simple initial implementation.

**Impact**: Can't properly monitor system health.

**Solution Implemented**:
Enhanced health check to verify database connection, returns status for services.

---

### ISSUE-020: No Graceful Shutdown for Prisma ✅

| Field | Value |
|-------|-------|
| **Priority** | Low |
| **Status** | Completed |
| **Component** | Backend |
| **Affected Files** | `server/src/index.ts` |
| **Estimated Effort** | 15 minutes |

**Problem**: Graceful shutdown doesn't disconnect Prisma.

**Reason**: Not implemented yet.

**Impact**: Potential hanging database connections.

**Solution Implemented**:
Added `await prisma.$disconnect()` to shutdown handler and handles both SIGTERM and SIGINT.

---

### ISSUE-021: No Reusable Frontend Components

| Field | Value |
|-------|-------|
| **Priority** | Low |
| **Status** | Open |
| **Component** | Frontend |
| **Affected Files** | N/A |
| **Estimated Effort** | 1 week |

**Problem**: No component library - buttons, inputs, etc.

**Reason**: Project is in early stages.

**Impact**: Code duplication, inconsistent UI.

**Recommended Solution**:
Build reusable components library.

---

### ISSUE-022: No Error Boundaries ✅

| Field | Value |
|-------|-------|
| **Priority** | Low |
| **Status** | Completed |
| **Component** | Frontend |
| **Affected Files** | `client/src/components/ErrorBoundary.tsx` |
| **Estimated Effort** | 30 minutes |

**Problem**: No error boundaries to catch component errors.

**Reason**: Not implemented yet.

**Impact**: Entire app can crash from a single component error.

**Solution Implemented**:
Created ErrorBoundary component wrapped around the app.

---

### ISSUE-023: No Toast Notifications

| Field | Value |
|-------|-------|
| **Priority** | Low |
| **Status** | Open |
| **Component** | Frontend |
| **Affected Files** | N/A |
| **Estimated Effort** | 1 hour |

**Problem**: No toast/notification system for user feedback.

**Reason**: Not implemented yet.

**Impact**: Poor UX - users don't get feedback on actions.

**Recommended Solution**:
Add react-hot-toast or sonner.

---

## Issue Summary

| Priority | Count | Completed |
|----------|-------|-----------|
| Critical | 4 | 4 |
| High | 7 | 7 |
| Medium | 6 | 4 |
| Low | 6 | 3 |
| **Total** | **23** | **18** |

---

## Next Steps

1. **Write comprehensive tests** (ISSUE-013) - Medium priority
2. **Add API documentation** (ISSUE-018) - Low priority
3. **Implement soft deletes** (ISSUE-015) - Medium priority
4. **Build reusable frontend components** (ISSUE-021) - Low priority
5. **Add toast notifications** (ISSUE-023) - Low priority

---

## Issue Workflow

- **Open**: Issue identified but not started
- **In Progress**: Work has started on the issue
- **In Review**: Fix complete, awaiting review
- **Closed**: Issue resolved
