# Database Documentation - Secure Academic Management System

## Overview

SAMS uses PostgreSQL as the primary database. The schema is designed following 3NF (Third Normal Form) with proper indexing, constraints, and audit trails.

## Schema Design Principles

1. **Normalization**: 3NF to minimize redundancy
2. **Data Integrity**: Foreign keys and constraints
3. **Performance**: Strategic indexing
4. **Auditability**: Created/updated timestamps
5. **Scalability**: Partitioning-ready design

## ER Diagram (Text Representation)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         AUTHENTICATION                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  User (1)────────────┐                                              │
│  ├─ id               │ 1:1                                          │
│  ├─ email (unique)   │     ┌───────────────────┐                   │
│  ├─ password         │────→│  UserProfile      │                   │
│  ├─ firstName        │     ├─ dateOfBirth      │                   │
│  ├─ lastName         │     ├─ gender           │                   │
│  ├─ role (RBAC)      │     ├─ address          │                   │
│  ├─ status           │     └───────────────────┘                   │
│  ├─ createdAt        │                                              │
│  ├─ updatedAt        │ 1:N  ┌──────────────────┐                   │
│  └─ lastLogin        └─────→│ LoginHistory     │                   │
│                             ├─ ipAddress       │                   │
│  1:N  ┌─────────────────────┤ userAgent        │                   │
│  └───→│ AuditLog            ├─ status          │                   │
│       └─────────────────────┤ createdAt        │                   │
│                             └──────────────────┘                   │
│                                                                       │
│  1:1  ┌──────────────┐  1:N  ┌──────────────────┐                   │
│  ┌───→│ Student      │───────→│ Enrollment       │                   │
│  │    ├─ rollNumber  │        ├─ subjectId       │                   │
│  │    ├─ regNumber   │        ├─ enrollmentDate  │                   │
│  │    └──────────────┘        └──────────────────┘                   │
│  │                                                                    │
│  │    ┌──────────────┐  1:N  ┌──────────────────┐                   │
│  └───→│ Faculty      │───────→│ Subject          │                   │
│  │    ├─ employeeId  │        ├─ code            │                   │
│  │    └──────────────┘        ├─ credits         │                   │
│  │                            └──────────────────┘                   │
│  │    ┌──────────────┐                                               │
│  └───→│ Admin        │                                               │
│       └──────────────┘                                               │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    ACADEMIC STRUCTURE                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Department (1)                                                      │
│  ├─ id                                                               │
│  ├─ name (unique)   1:N   ┌──────────────┐                          │
│  ├─ code (unique)  ──────→│ Faculty      │                          │
│  └─ createdAt             └──────────────┘                          │
│        │                      │                                      │
│        │ 1:N          1:N     │ 1:N                                  │
│        └─→ Course     ──→ Subject ←──┘                              │
│             ├─ code           ├─ code                               │
│             ├─ name           ├─ credits                            │
│             ├─ credits        ├─ lectures                           │
│             └─ description    └─ practicals                         │
│                │                                                     │
│                │ 1:N         M:N                                    │
│                └──→ Enrollment ←──┐                                 │
│                     ├─ status       │                                │
│                     └─ date         │                                │
│                                      │                                │
│  Semester (1)                        │                                │
│  ├─ id                    1:N        │                                │
│  ├─ number               ──→ Course  │                                │
│  ├─ name                            │                                │
│  ├─ startDate                   Student (M)                          │
│  ├─ endDate                         │                                │
│  ├─ status                          │                                │
│  └─ createdAt              1:N      │                                │
│        │                  ──────────┘                                │
│        │ 1:N    ┌────────────────────┐                              │
│        └──────→ │ Timetable          │                              │
│                 ├─ dayOfWeek         │                              │
│                 ├─ startTime         │                              │
│                 ├─ endTime           │                              │
│                 └─ classroom         │                              │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                   ATTENDANCE & ASSESSMENT                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Attendance                InternalMark            SemesterMark     │
│  ├─ studentId             ├─ studentId            ├─ studentId      │
│  ├─ subjectId             ├─ subjectId            ├─ subjectId      │
│  ├─ date                  ├─ test1                ├─ marks          │
│  ├─ status (P/A/L)        ├─ test2                ├─ grade          │
│  └─ remarks               ├─ test3                ├─ percentage     │
│                           ├─ assignment           └─ createdAt      │
│                           ├─ totalMarks                             │
│                           └─ percentage            Enrollment       │
│                                                    ├─ studentId     │
│  Assignment          StudentAssignment            ├─ subjectId     │
│  ├─ id              ├─ studentId                  ├─ status        │
│  ├─ subjectId       ├─ assignmentId               └─ enrollmentDate│
│  ├─ facultyId       ├─ submissionDate                              │
│  ├─ title           ├─ marks                                        │
│  ├─ totalMarks      ├─ feedback                                     │
│  ├─ dueDate         └─ status                                       │
│  └─ createdDate                                                     │
│        │ 1:N                                                         │
│        └────→ StudentAssignment                                      │
│              (M:N junction)                                          │
│                                                                       │
│  Examination                ExamSchedule                             │
│  ├─ id                     ├─ examinationId                          │
│  ├─ subjectId              ├─ date                                   │
│  ├─ semesterId             ├─ startTime                              │
│  ├─ examType (I/E/P)       ├─ endTime                                │
│  ├─ date                   ├─ room                                   │
│  ├─ startTime              └─ createdAt                              │
│  ├─ endTime                                                          │
│  ├─ totalMarks                                                       │
│  ├─ duration                                                         │
│  └─ room                                                             │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      FEE MANAGEMENT                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Fee (1)                    1:N   FeeTransaction                    │
│  ├─ id                 ──────────→ ├─ feeId                        │
│  ├─ studentId                     ├─ amount                        │
│  ├─ feeType                       ├─ paymentDate                   │
│  ├─ amount                        ├─ paymentMethod                 │
│  ├─ dueDate                       ├─ transactionId                 │
│  ├─ paidDate                      ├─ status                        │
│  ├─ status                        └─ createdAt                     │
│  └─ createdAt                                                       │
│                                                                       │
│  Fee Types: TUITION, HOSTEL, LABORATORY, EXAMINATION,              │
│             ACTIVITY, LIBRARY, OTHER                               │
│                                                                       │
│  Fee Status: PENDING, PARTIALLY_PAID, PAID, OVERDUE, WAIVED        │
│                                                                       │
│  Payment Methods: CASH, CHECK, CREDIT_CARD, DEBIT_CARD,            │
│                   BANK_TRANSFER, ONLINE                            │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                  NOTIFICATIONS & LOGGING                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Notification                AuditLog                                │
│  ├─ id                       ├─ id                                   │
│  ├─ userId                   ├─ userId                              │
│  ├─ title                    ├─ action                              │
│  ├─ message                  ├─ module                              │
│  ├─ type                     ├─ entity                              │
│  ├─ data (JSON)              ├─ entityId                            │
│  ├─ isRead                   ├─ changes (JSON)                      │
│  ├─ createdAt                ├─ ipAddress                           │
│  └─ readAt                   ├─ userAgent                           │
│                              ├─ status                              │
│  Types: ASSIGNMENT, EXAM,    └─ createdAt                          │
│         ATTENDANCE, MARKS,                                          │
│         FEE, SYSTEM, OTHER    Audit Actions: LOGIN, LOGOUT,        │
│                              PASSWORD_CHANGE, ROLE_CHANGE,         │
│  Report                      ATTENDANCE_UPDATE, MARKS_UPDATE,      │
│  ├─ id                       RECORD_CREATE, RECORD_UPDATE,         │
│  ├─ title                    RECORD_DELETE, ADMIN_ACTION            │
│  ├─ type                                                            │
│  ├─ generatedBy              SystemSettings                         │
│  ├─ filters (JSON)           ├─ id                                   │
│  ├─ data (JSON)              ├─ key (unique)                        │
│  ├─ createdAt                ├─ value                               │
│  └─ expiresAt                ├─ type                                │
│                              └─ description                         │
│  Report Types: ATTENDANCE,                                          │
│         MARKS, STUDENT_PERFORMANCE,                                │
│         FEE_COLLECTION, FACULTY_WORKLOAD,                          │
│         COURSE_COMPLETION, OTHER                                   │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Table Specifications

### Users Table

```sql
CREATE TABLE "User" (
  id VARCHAR(25) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  avatar VARCHAR(500),
  phone VARCHAR(20),
  role VARCHAR(50) NOT NULL DEFAULT 'STUDENT',
  status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  lastLogin TIMESTAMP,
  
  CONSTRAINT role_valid CHECK (role IN ('SUPER_ADMIN', 'ADMIN', 'PRINCIPAL', 'HOD', 'FACULTY', 'STUDENT')),
  CONSTRAINT status_valid CHECK (status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'ARCHIVED'))
);

CREATE INDEX idx_user_email ON "User"(email);
CREATE INDEX idx_user_role ON "User"(role);
CREATE INDEX idx_user_status ON "User"(status);
```

### Student Table

```sql
CREATE TABLE "Student" (
  id VARCHAR(25) PRIMARY KEY,
  userId VARCHAR(25) UNIQUE NOT NULL,
  rollNumber VARCHAR(50) UNIQUE NOT NULL,
  registrationNumber VARCHAR(50) UNIQUE NOT NULL,
  departmentId VARCHAR(25) NOT NULL,
  semesterId VARCHAR(25) NOT NULL,
  admissionDate DATE NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (userId) REFERENCES "User"(id) ON DELETE CASCADE,
  FOREIGN KEY (departmentId) REFERENCES "Department"(id) ON DELETE RESTRICT,
  FOREIGN KEY (semesterId) REFERENCES "Semester"(id) ON DELETE RESTRICT,
  CONSTRAINT status_valid CHECK (status IN ('ACTIVE', 'ON_LEAVE', 'GRADUATED', 'DROPPED', 'SUSPENDED'))
);

CREATE INDEX idx_student_rollNumber ON "Student"(rollNumber);
CREATE INDEX idx_student_registrationNumber ON "Student"(registrationNumber);
CREATE INDEX idx_student_departmentId ON "Student"(departmentId);
CREATE INDEX idx_student_status ON "Student"(status);
```

### Faculty Table

```sql
CREATE TABLE "Faculty" (
  id VARCHAR(25) PRIMARY KEY,
  userId VARCHAR(25) UNIQUE NOT NULL,
  employeeId VARCHAR(50) UNIQUE NOT NULL,
  specialization VARCHAR(255),
  departmentId VARCHAR(25) NOT NULL,
  officePhone VARCHAR(20),
  officeLocation VARCHAR(255),
  consultationHours VARCHAR(255),
  status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (userId) REFERENCES "User"(id) ON DELETE CASCADE,
  FOREIGN KEY (departmentId) REFERENCES "Department"(id) ON DELETE RESTRICT,
  CONSTRAINT status_valid CHECK (status IN ('ACTIVE', 'ON_LEAVE', 'INACTIVE', 'RETIRED'))
);

CREATE INDEX idx_faculty_employeeId ON "Faculty"(employeeId);
CREATE INDEX idx_faculty_departmentId ON "Faculty"(departmentId);
CREATE INDEX idx_faculty_status ON "Faculty"(status);
```

### Course Table

```sql
CREATE TABLE "Course" (
  id VARCHAR(25) PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  departmentId VARCHAR(25) NOT NULL,
  semesterId VARCHAR(25) NOT NULL,
  totalCredits INT NOT NULL,
  description TEXT,
  syllabus TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (departmentId) REFERENCES "Department"(id) ON DELETE RESTRICT,
  FOREIGN KEY (semesterId) REFERENCES "Semester"(id) ON DELETE RESTRICT,
  UNIQUE(code, semesterId)
);

CREATE INDEX idx_course_departmentId ON "Course"(departmentId);
CREATE INDEX idx_course_semesterId ON "Course"(semesterId);
```

### Subject Table

```sql
CREATE TABLE "Subject" (
  id VARCHAR(25) PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  courseId VARCHAR(25) NOT NULL,
  departmentId VARCHAR(25) NOT NULL,
  semesterId VARCHAR(25) NOT NULL,
  credits INT NOT NULL,
  totalLectures INT NOT NULL,
  totalPracticals INT NOT NULL,
  facultyId VARCHAR(25) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (courseId) REFERENCES "Course"(id) ON DELETE CASCADE,
  FOREIGN KEY (departmentId) REFERENCES "Department"(id) ON DELETE RESTRICT,
  FOREIGN KEY (semesterId) REFERENCES "Semester"(id) ON DELETE RESTRICT,
  FOREIGN KEY (facultyId) REFERENCES "Faculty"(id) ON DELETE RESTRICT,
  UNIQUE(code, semesterId)
);

CREATE INDEX idx_subject_courseId ON "Subject"(courseId);
CREATE INDEX idx_subject_facultyId ON "Subject"(facultyId);
CREATE INDEX idx_subject_departmentId ON "Subject"(departmentId);
```

## Key Indexes for Performance

```sql
-- Attendance queries
CREATE INDEX idx_attendance_student_subject_date 
  ON "Attendance"(studentId, subjectId, date);

-- Marks queries
CREATE INDEX idx_internalmark_student_subject 
  ON "InternalMark"(studentId, subjectId);
CREATE INDEX idx_semestermark_student_subject 
  ON "SemesterMark"(studentId, subjectId);

-- Enrollment queries
CREATE INDEX idx_enrollment_student_subject 
  ON "Enrollment"(studentId, subjectId);

-- Audit logs
CREATE INDEX idx_auditlog_user_created 
  ON "AuditLog"(userId, createdAt DESC);
CREATE INDEX idx_auditlog_action_module 
  ON "AuditLog"(action, module);

-- Login history
CREATE INDEX idx_loginhistory_user_created 
  ON "LoginHistory"(userId, createdAt DESC);

-- Fee tracking
CREATE INDEX idx_fee_student_status 
  ON "Fee"(studentId, status);
CREATE INDEX idx_fee_duedate 
  ON "Fee"(dueDate) WHERE status IN ('PENDING', 'OVERDUE');
```

## Data Relationships Summary

| Entity | Relation Type | Target | Cardinality | Cascade | Notes |
|--------|---|--------|---|---|---|
| User | 1:1 | UserProfile | 1:1 | Cascade | One user, one profile |
| User | 1:N | LoginHistory | 1:N | Cascade | Track login attempts |
| User | 1:N | AuditLog | 1:N | Cascade | Track user actions |
| User | 1:N | Notification | 1:N | Cascade | User notifications |
| User | 1:1 | Student | 1:1 | Cascade | Student-specific data |
| User | 1:1 | Faculty | 1:1 | Cascade | Faculty-specific data |
| User | 1:1 | Admin | 1:1 | Cascade | Admin-specific data |
| Department | 1:N | Faculty | 1:N | Restrict | Faculty must have dept |
| Department | 1:N | Student | 1:N | Restrict | Student must have dept |
| Department | 1:N | Course | 1:N | Restrict | Course must have dept |
| Department | 1:N | Subject | 1:N | Restrict | Subject must have dept |
| Semester | 1:N | Course | 1:N | Restrict | Course bound to semester |
| Semester | 1:N | Subject | 1:N | Restrict | Subject bound to semester |
| Semester | 1:N | Student | 1:N | Restrict | Student enrolled in semester |
| Course | 1:N | Subject | 1:N | Cascade | Subjects part of course |
| Faculty | 1:N | Subject | 1:N | Restrict | Faculty teaches subjects |
| Faculty | 1:N | Assignment | 1:N | Cascade | Faculty creates assignments |
| Faculty | 1:N | Timetable | 1:N | Restrict | Faculty schedules classes |
| Subject | M:N | Student | M:N | Via Enrollment | Enrollment junction table |
| Subject | 1:N | Attendance | 1:N | Cascade | Attendance records |
| Subject | 1:N | InternalMark | 1:N | Cascade | Internal marks |
| Subject | 1:N | SemesterMark | 1:N | Cascade | Semester marks |
| Subject | 1:N | Assignment | 1:N | Cascade | Assignments per subject |
| Subject | 1:N | Examination | 1:N | Cascade | Exams per subject |
| Student | 1:N | Enrollment | 1:N | Cascade | Student enrollments |
| Student | 1:N | Attendance | 1:N | Cascade | Attendance records |
| Student | 1:N | InternalMark | 1:N | Cascade | Internal marks |
| Student | 1:N | SemesterMark | 1:N | Cascade | Semester marks |
| Student | 1:N | Fee | 1:N | Cascade | Fee records |
| Assignment | 1:N | StudentAssignment | 1:N | Cascade | Student submissions |
| Fee | 1:N | FeeTransaction | 1:N | Cascade | Fee payments |

## Database Migrations

Migrations are managed by Prisma:

```bash
# Create a new migration after schema changes
npx prisma migrate dev --name migration_name

# Deploy migrations to production
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

## Backup Strategy

- **Frequency**: Daily at 2 AM
- **Retention**: 30 days
- **Backup Location**: S3 or external storage
- **Recovery Test**: Monthly
- **Point-in-time Recovery**: 7 days

## Performance Optimization

- **Connection Pooling**: PgBouncer (max 100 connections)
- **Query Optimization**: Indexes on foreign keys and frequently queried columns
- **Caching**: Redis for session management (optional)
- **Query Analysis**: Regular EXPLAIN ANALYZE

## Constraints & Validation

All tables enforce:
- `NOT NULL` on required fields
- `UNIQUE` on identifiers
- `CHECK` constraints on enum fields
- `FOREIGN KEY` constraints with appropriate cascade behavior
- `DEFAULT` values for timestamps

---

**Last Updated**: 2024-01-01  
**Schema Version**: 1.0.0
