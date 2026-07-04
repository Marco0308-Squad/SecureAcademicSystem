# Architecture - Secure Academic Management System

## Overview

SAMS is built on a **Layered Architecture** with clear separation of concerns. The system uses modern software engineering practices including SOLID principles, DRY, and KISS.

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React + Vite)                  │
│  ├── Pages (Route-based components)                             │
│  ├── Components (Reusable UI components)                        │
│  ├── Hooks (Custom React logic)                                 │
│  ├── Services (API calls via Axios)                             │
│  └── Store (State management)                                   │
└────────────────┬────────────────────────────────────────────────┘
                 │ HTTPS/REST API
                 │
┌────────────────▼────────────────────────────────────────────────┐
│                    NGINX (Reverse Proxy)                        │
│  ├── SSL/TLS termination                                        │
│  ├── Load balancing                                             │
│  └── Static file serving                                        │
└────────────────┬────────────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────────────┐
│                  BACKEND API (Express + Node.js)                │
│  ┌───────────────────────────────────────────────────────┐      │
│  │ Middleware Layer                                      │      │
│  │ ├── Authentication (JWT verification)                │      │
│  │ ├── Authorization (RBAC checks)                       │      │
│  │ ├── Request validation                                │      │
│  │ ├── Error handling                                    │      │
│  │ └── Logging                                           │      │
│  └───────────────────────────────────────────────────────┘      │
│  ┌───────────────────────────────────────────────────────┐      │
│  │ Route Layer                                           │      │
│  │ └── Route handlers → Controllers                      │      │
│  └───────────────────────────────────────────────────────┘      │
│  ┌───────────────────────────────────────────────────────┐      │
│  │ Controller Layer                                      │      │
│  │ ├── Request validation (Zod schemas)                  │      │
│  │ ├── Call appropriate services                         │      │
│  │ └── Format and return responses                       │      │
│  └───────────────────────────────────────────────────────┘      │
│  ┌───────────────────────────────────────────────────────┐      │
│  │ Service Layer                                         │      │
│  │ ├── Business logic implementation                     │      │
│  │ ├── Data processing                                   │      │
│  │ ├── Cross-repository operations                       │      │
│  │ └── Authorization checks                              │      │
│  └───────────────────────────────────────────────────────┘      │
│  ┌───────────────────────────────────────────────────────┐      │
│  │ Repository Layer                                      │      │
│  │ ├── Prisma ORM calls                                  │      │
│  │ ├── Database query building                           │      │
│  │ ├── Data transformation                               │      │
│  │ └── Caching logic                                     │      │
│  └───────────────────────────────────────────────────────┘      │
│  ┌───────────────────────────────────────────────────────┐      │
│  │ Utilities & Constants                                 │      │
│  │ ├── Helper functions                                  │      │
│  │ ├── Password hashing, JWT handling                    │      │
│  │ ├── Date formatting                                   │      │
│  │ └── Constants & enums                                 │      │
│  └───────────────────────────────────────────────────────┘      │
└────────────────┬────────────────────────────────────────────────┘
                 │ SQL Queries
                 │
┌────────────────▼────────────────────────────────────────────────┐
│            PostgreSQL Database (Normalized Schema)              │
│  ├── User & Authentication tables                               │
│  ├── Academic structure tables                                  │
│  ├── Student & Faculty tables                                   │
│  ├── Assessment tables                                          │
│  ├── Audit & Logging tables                                     │
│  └── System Configuration tables                                │
└─────────────────────────────────────────────────────────────────┘
```

## Layered Architecture Details

### 1. **Middleware Layer**

Handles cross-cutting concerns:

```
Request → Auth Middleware → Validation Middleware → Error Handler → Route Handler
```

**Responsibilities:**
- JWT token verification
- Role-based access control
- Request body validation
- Error handling and logging
- Security headers

**Key Files:**
- `src/middleware/auth.ts` - Authentication
- `src/middleware/authorization.ts` - RBAC
- `src/middleware/validation.ts` - Input validation
- `src/middleware/errorHandler.ts` - Error handling
- `src/middleware/logging.ts` - Request/response logging

### 2. **Controller Layer**

Handles HTTP request/response:

```typescript
// Example: AuthController
async login(req: Request, res: Response) {
  // 1. Validate input
  const { email, password } = loginSchema.parse(req.body)
  
  // 2. Call service
  const result = await authService.login(email, password)
  
  // 3. Return response
  res.json(ApiResponse.success(result))
}
```

**Responsibilities:**
- Extract and validate request data
- Call appropriate services
- Format and return responses
- Handle errors

**Rules:**
- NO business logic in controllers
- Keep controllers thin and focused
- Use consistent response format
- All validation before calling service

### 3. **Service Layer**

Contains all business logic:

```typescript
// Example: AuthService
async login(email: string, password: string) {
  // 1. Find user
  const user = await userRepository.findByEmail(email)
  
  // 2. Verify password
  const isValidPassword = await verifyPassword(password, user.password)
  
  // 3. Generate tokens
  const tokens = generateTokens(user)
  
  // 4. Log audit
  await auditService.log('LOGIN', 'AUTH', user.id)
  
  return tokens
}
```

**Responsibilities:**
- Implement business logic
- Coordinate multiple repositories
- Perform calculations and transformations
- Authorization checks
- Call external services
- Logging and auditing

**Rules:**
- Services are independent of HTTP
- One service = one bounded context
- Services call repositories and other services
- No direct database queries

### 4. **Repository Layer**

Data access abstraction:

```typescript
// Example: UserRepository
async findByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: { profile: true }
  })
}

async create(data: CreateUserInput) {
  return prisma.user.create({ data })
}
```

**Responsibilities:**
- Database queries via Prisma
- Data transformation
- Query optimization
- Implement query builders

**Rules:**
- No business logic in repositories
- One repository per model
- Parameterized queries only (Prisma handles this)
- Methods are specific to data access

### 5. **Validation Layer**

Input validation using Zod:

```typescript
// src/validators/auth.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type LoginInput = z.infer<typeof loginSchema>
```

**Responsibilities:**
- Define validation schemas
- Type-safe validation
- Error messages
- Reusable across layers

### 6. **Error Handling**

Custom error classes:

```typescript
class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Usage
throw new ApiError(400, 'Invalid email', { email: ['Must be unique'] })
```

## Request Flow Example

**Scenario: Student login**

```
1. Browser sends POST /api/v1/auth/login
   └── Request: { email: "student@college.edu", password: "..." }

2. Express receives request
   └── Routes to authController.login()

3. Middleware chain runs:
   └── Validation → CORS → Body parser → Logging

4. Controller validates input (Zod)
   └── authSchema.parse(req.body)

5. Controller calls service
   └── authService.login(email, password)

6. Service layer:
   ├── Calls userRepository.findByEmail(email)
   ├── Verifies password
   ├── Calls tokenService.generateTokens(user)
   ├── Calls auditService.log('LOGIN', 'AUTH', user.id)
   └── Returns { accessToken, refreshToken, user }

7. Repository layer:
   ├── Executes Prisma query
   ├── Transforms data
   └── Returns user object

8. Service returns result to controller

9. Controller formats response
   └── ApiResponse.success({ ... })

10. Middleware chain on response:
    └── Error handler → Logging → CORS headers

11. Browser receives:
    {
      "success": true,
      "status": 200,
      "message": "Login successful",
      "data": { ... },
      "timestamp": "..."
    }
```

## Module Structure

Each feature module follows this pattern:

```
module/
├── controllers/
│   ├── moduleController.ts
│   └── index.ts
├── services/
│   ├── moduleService.ts
│   └── index.ts
├── repositories/
│   ├── moduleRepository.ts
│   └── index.ts
├── validators/
│   ├── moduleValidator.ts
│   └── index.ts
├── routes.ts
└── index.ts
```

## Database Architecture

### Schema Design Principles

1. **Normalization**: 3NF to eliminate redundancy
2. **Constraints**: Foreign keys, unique, not null
3. **Indexes**: On frequently queried columns
4. **Audit Trail**: Created/updated timestamps on all entities
5. **Soft Deletes**: Mark as deleted, don't physically delete

### Key Relationships

- **1:N** - Department has many Faculty
- **M:N** - Student enrolls in many Subjects
- **1:1** - User has one Profile

## Security Architecture

### Authentication Flow

```
Client                Server
  │                    │
  ├─ Login ────────→   │ (validate credentials)
  │                    ├─ Generate JWT tokens
  │                    ├─ Store refresh token in secure DB
  │ ←─ Access Token   │
  │ ←─ Refresh Token  │
  │                    │
  ├─ Request ────────→ │ (with Bearer token in header)
  │                    ├─ Verify JWT signature
  │                    ├─ Check expiry
  │                    ├─ Check RBAC
  │ ←─ Protected Data  │
```

### Authorization Strategy

```
Request → Auth Middleware
          ├─ Verify JWT signature
          ├─ Extract user role
          └─ Continue

         → Route Handler
          └─ Resource ID

         → Service Layer
          ├─ Verify resource ownership
          ├─ Check RBAC rules
          └─ Process if authorized
```

## API Response Format

All endpoints return consistent format:

```json
{
  "success": true|false,
  "status": 200|400|401|403|500,
  "message": "Human readable message",
  "data": {
    // Response data
  },
  "errors": {
    "field": ["error message"]
  },
  "timestamp": "ISO 8601 datetime"
}
```

## Error Handling Strategy

```typescript
// Middleware catches all errors
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(ApiResponse.error(...))
  }
  
  if (err instanceof ZodError) {
    return res.status(400).json(ApiResponse.validationError(...))
  }
  
  // Unknown error - log and return generic message
  logger.error(err)
  res.status(500).json(ApiResponse.error(...))
})
```

## Technology Decisions

| Layer | Technology | Reason |
|-------|-----------|--------|
| Frontend | React 19 + Vite | Modern, performant, great DX |
| Backend | Express + Node.js | Fast, lightweight, scalable |
| Database | PostgreSQL | Reliable, ACID, great for relational data |
| ORM | Prisma | Type-safe, migrations, excellent DX |
| Validation | Zod | Runtime type safety, great errors |
| Auth | JWT | Stateless, scalable, industry standard |
| Styling | Tailwind CSS | Utility-first, rapid prototyping |
| Testing | Vitest | Fast, compatible with TypeScript |

## Deployment Architecture

```
Internet
   ↓
Nginx (Reverse Proxy)
   ├─ SSL/TLS termination
   ├─ Load balancing
   ├─ Static files
   └─ API gateway
   ↓
Node.js Application Instances
   ├─ Instance 1 (Port 5001)
   ├─ Instance 2 (Port 5002)
   └─ Instance N (Port 500N)
   ↓
PostgreSQL Database
   └─ Primary + Replicas
```

## Scalability Considerations

1. **Horizontal Scaling**: Multiple Node.js instances behind load balancer
2. **Database**: Connection pooling, read replicas
3. **Caching**: Redis for session management and caching
4. **CDN**: CloudFront or similar for static assets
5. **Monitoring**: Prometheus, Grafana for metrics

## Version Control Strategy

```
main (production)
 ↑
 └── develop (staging)
      ↑
      └── feature/module-name (development)
```

## Documentation Hierarchy

1. **README.md** - Project overview
2. **docs/ARCHITECTURE.md** - This document
3. **docs/API.md** - API endpoints
4. **docs/DATABASE.md** - Schema details
5. **docs/SECURITY.md** - Security guidelines
6. **Code comments** - Complex logic explanation

---

**Last Updated**: 2024-01-01  
**Version**: 1.0.0
