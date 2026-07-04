# Database Review - Secure Academic Management System

## Overview

This document reviews the database schema and design of the Secure Academic Management System (SAMS). The schema is defined using Prisma ORM and targets PostgreSQL.

---

## Schema Location

**Current Issue**: Two schema files exist:
- `server/prisma.schema` - minimal (only datasource and generator)
- `database/schema.prisma` - complete schema

**Recommendation**: Consolidate into `server/prisma/schema.prisma` (standard Prisma location)

---

## Schema Overview

The schema includes 30+ models covering:
- User management
- Authentication & authorization
- Academic structure
- Student management
- Faculty management
- Attendance
- Marks/assessment
- Timetables
- Assignments
- Examinations
- Fee management
- Notifications
- Audit logging
- System settings
- Reports

---

## Strengths

### 1. Comprehensive Coverage
- ✅ All core academic entities are modeled
- ✅ Complete RBAC with 6 user roles
- ✅ Audit logging built-in
- ✅ Notifications system

### 2. Good Use of Enums
- ✅ `UserRole`, `UserStatus`, `AttendanceStatus`, etc.
- ✅ Type-safe and prevents invalid values

### 3. Proper Relationships
- ✅ Foreign keys properly defined
- ✅ Cascading deletes where appropriate
- ✅ `onDelete: Restrict` to prevent accidental data loss

### 4. Strategic Indexes
- ✅ Indexes on frequently queried fields
- ✅ Composite unique constraints where needed
- ✅ Indexes on foreign keys

### 5. Timestamp Fields
- ✅ `createdAt` and `updatedAt` on most models
- ✅ Automatic `updatedAt` with Prisma's `@updatedAt`

---

## Issues & Improvements

### Critical Issues

#### 1. No Soft Deletes
- **Problem**: All deletes are hard deletes
- **Impact**: Data loss, no recovery option
- **Recommendation**: Add `deletedAt DateTime?` field to models that need soft deletes, and update queries to filter out deleted records

#### 2. LoginHistory.status is String Instead of Enum
- **Problem**: `LoginHistory.status` is `String` instead of a proper enum
- **Impact**: Risk of invalid status values
- **Recommendation**: Create `LoginStatus` enum with `SUCCESS`, `FAILED`, `LOCKED`

#### 3. Missing Refresh Token Model
- **Problem**: No way to store and invalidate refresh tokens
- **Impact**: Can't implement token revocation or refresh token rotation
- **Recommendation**: Add `RefreshToken` model:
  ```prisma
  model RefreshToken {
    id        String   @id @default(cuid())
    userId    String
    user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
    token     String   @unique
    expiresAt DateTime
    createdAt DateTime @default(now())
    revokedAt DateTime?
    
    @@index([userId])
    @@index([token])
  }
  ```

### High Priority Issues

#### 4. Missing Password Reset Model
- **Problem**: No way to handle password reset tokens
- **Impact**: Can't implement password reset feature
- **Recommendation**: Add `PasswordResetToken` model

#### 5. Timetable.startTime/endTime Should Be Time, Not DateTime
- **Problem**: `Timetable` has `startTime` and `endTime` as `DateTime`, but they should just be times since date is determined by day of week
- **Impact**: Confusing data model
- **Recommendation**: Change to `String` in "HH:MM" format or use a time-only type if PostgreSQL supports it

#### 6. No Version History for Important Entities
- **Problem**: No way to track changes to important records like marks, attendance, etc.
- **Impact**: Can't see who changed what and when
- **Recommendation**: Consider adding version history tables for critical entities

#### 7. Missing Database-Level Constraints
- **Problem**: Some fields that should be required are marked as optional
- **Impact**: Data integrity issues
- **Recommendation**: Review all models and ensure proper constraints

### Medium Priority Issues

#### 8. Examination and ExamSchedule Have Redundant Fields
- **Problem**: Both `Examination` and `ExamSchedule` have `date`, `startTime`, `endTime`, `room`
- **Impact**: Redundant data, potential inconsistency
- **Recommendation**: Simplify - `Examination` should be the definition, `ExamSchedule` should be the actual scheduling

#### 9. No Database Migrations
- **Problem**: No migration files exist yet
- **Impact**: Can't deploy schema changes safely
- **Recommendation**: Create initial migration with `prisma migrate dev --name init`

#### 10. No Seed Data
- **Problem**: No seed data for development/testing
- **Impact**: Hard to develop and test without data
- **Recommendation**: Create seed script in `database/seeds/`

#### 11. Missing Role-Specific User Models
- **Problem**: Admin, Principal, HOD models exist but Student and Faculty are separate
- **Impact**: Inconsistent pattern
- **Recommendation**: Ensure all roles have appropriate profile models

#### 12. No Index on AuditLog for Querying
- **Problem**: AuditLog has indexes on userId, action, module, createdAt but no composite indexes
- **Impact**: Slow queries when filtering by multiple criteria
- **Recommendation**: Add composite indexes for common query patterns

---

## Model-Specific Reviews

### User Model
- ✅ Good structure
- ✅ Proper indexes
- ❌ Consider adding `lastLoginAt` and `loginAttempts` for security

### Student Model
- ✅ Good relations
- ✅ Unique constraints on rollNumber and registrationNumber

### Faculty Model
- ✅ Good structure
- ✅ Proper relations to department and subjects

### Attendance Model
- ✅ Unique constraint on student + subject + date - excellent!
- ✅ Prevents duplicate attendance records

### AuditLog Model
- ✅ Comprehensive
- ✅ Captures all necessary info
- ❌ Consider adding `oldValue` and `newValue` fields

---

## Performance Considerations

### Current Strengths
- ✅ Proper indexing
- ✅ Foreign keys for data integrity
- ✅ Cascading deletes to prevent orphaned records

### Recommendations
1. **Database Partitioning**: For large tables like `AuditLog` and `LoginHistory`, consider partitioning by date
2. **Read Replicas**: For read-heavy workloads, use read replicas
3. **Connection Pooling**: Ensure Prisma is configured with proper connection pooling
4. **Query Optimization**: Use Prisma's `include` and `select` carefully to avoid N+1 queries

---

## Security Considerations

### Current Strengths
- ✅ Password field exists (to be hashed)
- ✅ Audit logging for all actions
- ✅ Login history tracking

### Recommendations
1. **Encrypt Sensitive Data**: Consider encrypting PII like phone numbers, addresses
2. **Database-Level Security**: Use least privilege for database users
3. **Backup Strategy**: Implement regular automated backups
4. **Transparent Data Encryption (TDE)**: Enable if using PostgreSQL Enterprise

---

## Recommendations

### Immediate Actions
1. Consolidate Prisma schema to `server/prisma/schema.prisma`
2. Add `RefreshToken` model
3. Add `PasswordResetToken` model
4. Create initial migration
5. Add seed data

### Short Term
1. Implement soft deletes for critical models
2. Fix `LoginHistory.status` to use enum
3. Review and add missing constraints
4. Add composite indexes for AuditLog

### Long Term
1. Consider version history for critical entities
2. Plan for database partitioning
3. Set up read replicas
4. Implement database encryption

---

## Conclusion

The database schema is very well-designed overall. It's comprehensive, follows good practices, and has proper relationships and indexes. The main issues are missing features (refresh tokens, password reset tokens, soft deletes) and some minor structural issues. Fixing these will make the schema production-ready.

