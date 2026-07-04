# Security Guidelines - Secure Academic Management System

## Overview

Security is built into every layer of SAMS. This document outlines security practices, threats prevented, and implementation details.

## Security Principles

1. **Security by Default**: Safe defaults, explicit configuration for relaxation
2. **Defense in Depth**: Multiple layers of protection
3. **Principle of Least Privilege**: Minimal necessary access
4. **Fail Securely**: Deny access by default
5. **Security First**: Never compromise security for convenience
6. **Regular Auditing**: Log and monitor security events

## Threats Prevented

### 1. Broken Access Control (OWASP #1)

**Prevention:**
- Role-Based Access Control (RBAC) enforced on every endpoint
- Authorization checks at service layer, not just controller
- Verify resource ownership before allowing access
- Never trust client-supplied roles

**Implementation:**
```typescript
// src/middleware/authorization.ts
async function authorizeAction(req, res, next) {
  const user = req.user
  const resourceId = req.params.id
  
  // Verify ownership or admin privilege
  const resource = await resourceRepository.findById(resourceId)
  if (resource.ownerId !== user.id && user.role !== 'ADMIN') {
    throw new ApiError(403, 'Forbidden')
  }
  next()
}
```

### 2. Insecure Direct Object References (IDOR)

**Prevention:**
- Always verify resource ownership before access
- Use UUIDs, not sequential IDs
- Check authorization on every resource access
- Log suspicious access attempts

**Example (Secure):**
```typescript
// Student can only view their own marks
async getMyMarks(userId: string) {
  const student = await studentRepository.findByUserId(userId)
  return marksRepository.findByStudentId(student.id)
}

// Trying to access another student's marks fails
async getStudentMarks(studentId: string, userId: string) {
  const student = await studentRepository.findById(studentId)
  const requestingUser = await userRepository.findById(userId)
  
  // Verify ownership or admin
  if (student.userId !== userId && requestingUser.role !== 'ADMIN') {
    throw new ApiError(403, 'Forbidden')
  }
  
  return marksRepository.findByStudentId(studentId)
}
```

### 3. SQL Injection

**Prevention:**
- Use Prisma ORM (parameterized queries)
- Never concatenate SQL strings
- Input validation before database

**Safe (Prisma):**
```typescript
// Prisma automatically uses parameterized queries
const user = await prisma.user.findUnique({
  where: { email: userInput.email }
})
```

**Dangerous (Never do this):**
```typescript
// DON'T: String concatenation
const user = await db.query(`
  SELECT * FROM users WHERE email = '${userInput.email}'
`)
```

### 4. Cross-Site Scripting (XSS)

**Prevention:**
- React automatically escapes content
- Avoid innerHTML, use textContent or React elements
- Validate and sanitize input on backend
- Set secure headers

**Safe (React):**
```typescript
// React escapes by default
function Component({ userInput }) {
  return <div>{userInput}</div> // Safe: automatically escaped
}
```

**Dangerous (Avoid):**
```typescript
// DON'T: Use innerHTML with untrusted content
function Component({ userInput }) {
  return <div dangerouslySetInnerHTML={{ __html: userInput }} />
}
```

### 5. Cross-Site Request Forgery (CSRF)

**Prevention:**
- SameSite cookie attribute (Strict/Lax)
- CSRF tokens for state-changing operations
- Verify origin header
- Use POST for state changes (not GET)

**Implementation:**
```typescript
// Middleware: CSRF token validation
function validateCsrfToken(req, res, next) {
  const token = req.body._csrf || req.headers['x-csrf-token']
  
  if (req.method !== 'GET' && !token) {
    throw new ApiError(403, 'CSRF token missing')
  }
  
  // Verify token against session
  if (!verifyCsrfToken(token, req.session.csrfToken)) {
    throw new ApiError(403, 'Invalid CSRF token')
  }
  
  next()
}
```

### 6. Authentication Bypass

**Prevention:**
- Validate JWT signature
- Check token expiry
- Verify token is in whitelist (for logout)
- Rate limit login attempts
- Enforce password complexity

**Implementation:**
```typescript
// Auth middleware
function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    
    // Check token expiry
    if (decoded.exp * 1000 < Date.now()) {
      throw new ApiError(401, 'Token expired')
    }
    
    // Check token not in blacklist
    if (isTokenBlacklisted(decoded.jti)) {
      throw new ApiError(401, 'Token revoked')
    }
    
    return decoded
  } catch (err) {
    throw new ApiError(401, 'Invalid token')
  }
}
```

### 7. Privilege Escalation

**Prevention:**
- Verify roles from database, not from client
- Enforce role permissions strictly
- Audit role changes
- Prevent self-role-modification

**Implementation:**
```typescript
// Never use client-supplied role
async updateUserRole(userId: string, newRole: UserRole) {
  const requestingUser = await userRepository.findById(req.userId)
  
  // Only Super Admin can change roles
  if (requestingUser.role !== 'SUPER_ADMIN') {
    throw new ApiError(403, 'Only Super Admin can change roles')
  }
  
  // Cannot modify own role
  if (userId === requestingUser.id) {
    throw new ApiError(400, 'Cannot modify your own role')
  }
  
  const updated = await userRepository.update(userId, { role: newRole })
  
  // Audit log
  await auditService.log('ROLE_CHANGE', 'USER', userId, { 
    newRole, 
    changedBy: requestingUser.id 
  })
  
  return updated
}
```

### 8. Session Hijacking

**Prevention:**
- Use secure, httpOnly cookies
- Use SameSite=Strict
- Short token expiry (15 minutes)
- Refresh token rotation
- Session invalidation on logout

**Configuration:**
```typescript
// Cookie security
app.use(session({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}))

// JWT expiry
const accessToken = jwt.sign(payload, JWT_SECRET, {
  expiresIn: '15m'  // Short expiry
})

const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
  expiresIn: '7d'   // Longer expiry
})
```

### 9. Command Injection

**Prevention:**
- Never pass user input to shell/exec
- Use parameterized APIs
- Validate and whitelist input
- Disable shell execution features

**Safe:**
```typescript
// Use parameterized file operations
import { promises as fs } from 'fs'

const content = await fs.readFile(filePath, 'utf-8')
```

**Dangerous (Never do this):**
```typescript
// DON'T: Execute shell with user input
const { exec } = require('child_process')
exec(`convert ${userUploadedFile} output.png`)
```

### 10. Insecure File Uploads

**Prevention:**
- Validate file type (MIME type + magic bytes)
- Limit file size
- Store outside web root
- Randomize filenames
- Virus scan
- Disable execution

**Implementation:**
```typescript
async uploadAssignmentFile(file: Express.Multer.File) {
  // Validate size
  const MAX_SIZE = 10 * 1024 * 1024 // 10MB
  if (file.size > MAX_SIZE) {
    throw new ApiError(400, 'File too large')
  }
  
  // Validate MIME type
  const ALLOWED_TYPES = ['application/pdf', 'application/msword']
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    throw new ApiError(400, 'Invalid file type')
  }
  
  // Check magic bytes
  const buffer = await file.buffer
  if (!isValidPdfOrDoc(buffer)) {
    throw new ApiError(400, 'Invalid file format')
  }
  
  // Randomize filename
  const filename = `${crypto.randomUUID()}-${Date.now()}`
  const filepath = path.join(UPLOAD_DIR, filename)
  
  // Store outside web root
  await saveFile(filepath, buffer)
  
  // Optionally: virus scan
  await virusScanner.scan(filepath)
  
  return filename
}
```

### 11. Sensitive Data Exposure

**Prevention:**
- Never log passwords or tokens
- Hash all passwords (Argon2id)
- Encrypt sensitive data at rest
- Use HTTPS only
- PII data minimization
- Secure error messages

**Implementation:**
```typescript
// Password hashing
async hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.id,
    memoryCost: 2 ** 16, // 64MB
    timeCost: 3,
    parallelism: 1
  })
}

// Never log sensitive data
logger.info('Login attempt', {
  email: user.email,
  // DON'T: password: password
  // DON'T: token: token
})

// Secure error messages
async login(email: string, password: string) {
  try {
    const user = await userRepository.findByEmail(email)
    if (!user || !(await verifyPassword(password, user.password))) {
      // Generic message - don't reveal if user exists
      throw new ApiError(401, 'Invalid email or password')
    }
  } catch (err) {
    // Never leak internal details
    throw new ApiError(401, 'Login failed')
  }
}
```

### 12. API Authorization Bypass

**Prevention:**
- Verify authorization on every endpoint
- Check both authentication and authorization
- Use middleware consistently
- Validate scopes/permissions
- Rate limiting per user

**Implementation:**
```typescript
// Route protection middleware
const protectedRoute = [
  authenticateToken,  // Verify token is valid
  authorize(['ADMIN', 'FACULTY']),  // Verify role
  validateRequestBody(schema),  // Validate input
]

router.post('/marks', protectedRoute, marksController.addMarks)
```

## Password Policy

**Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character
- No dictionary words
- Not same as previous 5 passwords

**Implementation:**
```typescript
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain uppercase letter')
  .regex(/[a-z]/, 'Must contain lowercase letter')
  .regex(/[0-9]/, 'Must contain number')
  .regex(/[!@#$%^&*]/, 'Must contain special character')
  .refine(pwd => !isCommonPassword(pwd), 'Password is too common')
```

## Session Management

- **Access Token Expiry**: 15 minutes
- **Refresh Token Expiry**: 7 days
- **Session Timeout**: 30 minutes of inactivity
- **Concurrent Sessions**: 3 per user
- **Logout**: Invalidates all tokens

## Rate Limiting

- **Login attempts**: 5 per minute, lock account for 30 minutes
- **API calls**: 100 per minute for authenticated users
- **Password reset**: 3 per hour
- **File uploads**: 10 per hour per user

## Data Encryption

- **In Transit**: TLS 1.3 (HTTPS)
- **At Rest**: Sensitive fields encrypted with AES-256
- **Passwords**: Argon2id hashing with salt

## Audit Logging

All security-relevant events are logged:

- User login/logout
- Password changes
- Role changes
- Data access (CRUD operations)
- Authentication failures
- Authorization failures
- Failed rate limit attempts
- Administrative actions

**Retention**: Audit logs retained for 2 years

## CORS Configuration

```typescript
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 3600
}
```

## Security Headers

```typescript
app.use(helmet())

// Specific headers
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Content-Security-Policy', "default-src 'self'")
  next()
})
```

## Dependency Security

- Weekly security updates
- Dependency scanning with npm audit
- Use npm ci (not npm install) in production
- Lock dependencies to exact versions
- Remove unused dependencies

## Code Review Checklist

Before any code merge, verify:

- [ ] No hardcoded secrets or credentials
- [ ] All inputs validated
- [ ] All database queries parameterized
- [ ] Authorization checks on all protected endpoints
- [ ] No sensitive data in logs
- [ ] No XSS vulnerabilities
- [ ] Error messages don't leak information
- [ ] Tests cover security scenarios
- [ ] No deprecated/vulnerable dependencies
- [ ] HTTPS enforced
- [ ] Rate limiting applied

## Incident Response

1. **Detection**: Monitor audit logs and alerts
2. **Response**: Isolate affected systems
3. **Investigation**: Forensic analysis
4. **Remediation**: Fix root cause
5. **Notification**: Inform affected users if required
6. **Documentation**: Document incident and prevention

## Security Testing

Regular security testing includes:
- Manual penetration testing (quarterly)
- Automated vulnerability scanning (weekly)
- Dependency audits (weekly)
- Load/stress testing
- Fuzz testing

## Compliance

SAMS is designed to comply with:
- Data Protection Act
- Educational institution standards
- GDPR (if EU users)
- Industry best practices

---

**Last Updated**: 2024-01-01  
**Version**: 1.0.0
