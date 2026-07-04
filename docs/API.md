# API Documentation - Secure Academic Management System

## Base URL

```
http://localhost:5000/api/v1
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "status": 200,
  "message": "Request successful",
  "data": {},
  "errors": null,
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## Standard HTTP Status Codes

| Code | Meaning | Use Case |
|------|---------|----------|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | User lacks permission |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate resource |
| 422 | Unprocessable Entity | Validation error |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Maintenance |

## Rate Limiting

All endpoints are rate-limited:

```
- Anonymous: 20 requests per 15 minutes
- Authenticated: 100 requests per 15 minutes
- Admin: 500 requests per 15 minutes
```

Headers returned:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1609502400
```

## Pagination

List endpoints support pagination:

```
GET /api/v1/students?page=1&limit=20&sort=name&order=asc
```

Response includes:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "pages": 8
  }
}
```

## Sorting & Filtering

### Sorting
```
?sort=name&order=asc
?sort=createdAt&order=desc
```

### Filtering
```
?search=John
?department=IT
?status=ACTIVE
?dateFrom=2024-01-01&dateTo=2024-12-31
```

---

# Authentication Endpoints

## POST /auth/register

Create a new user account.

**Request:**
```json
{
  "email": "student@college.edu",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "role": "STUDENT"
}
```

**Response (201):**
```json
{
  "success": true,
  "status": 201,
  "message": "Account created successfully",
  "data": {
    "id": "user123",
    "email": "student@college.edu",
    "firstName": "John",
    "lastName": "Doe",
    "role": "STUDENT"
  }
}
```

**Validation Rules:**
- Email must be unique and valid format
- Password minimum 8 characters
- First/Last name required

---

## POST /auth/login

Authenticate user and receive tokens.

**Request:**
```json
{
  "email": "student@college.edu",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "status": 200,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user123",
      "email": "student@college.edu",
      "firstName": "John",
      "lastName": "Doe",
      "role": "STUDENT"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
      "expiresIn": 900
    }
  }
}
```

**Error Responses:**
```json
// Invalid credentials
{
  "success": false,
  "status": 401,
  "message": "Invalid email or password",
  "errors": null
}
```

**Security:**
- Failed attempts logged
- Account locked after 5 failed attempts
- Lock duration: 30 minutes

---

## POST /auth/refresh-token

Refresh expired access token.

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "success": true,
  "status": 200,
  "message": "Token refreshed",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 900
  }
}
```

---

## POST /auth/logout

Invalidate refresh token.

**Authentication:** Required (Bearer token)

**Response (200):**
```json
{
  "success": true,
  "status": 200,
  "message": "Logged out successfully"
}
```

---

## POST /auth/change-password

Change user password.

**Authentication:** Required

**Request:**
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass456!",
  "confirmPassword": "NewPass456!"
}
```

**Response (200):**
```json
{
  "success": true,
  "status": 200,
  "message": "Password changed successfully"
}
```

---

## POST /auth/forgot-password

Request password reset email.

**Request:**
```json
{
  "email": "student@college.edu"
}
```

**Response (200):**
```json
{
  "success": true,
  "status": 200,
  "message": "Password reset link sent to your email"
}
```

---

## POST /auth/reset-password

Reset password using token from email.

**Request:**
```json
{
  "token": "reset_token_from_email",
  "password": "NewPass456!",
  "confirmPassword": "NewPass456!"
}
```

**Response (200):**
```json
{
  "success": true,
  "status": 200,
  "message": "Password reset successful"
}
```

---

# Student Endpoints

## GET /students

List all students (Admin/Principal/HOD only).

**Query Parameters:**
```
?page=1&limit=20
?search=John
?department=IT
?semester=1
?status=ACTIVE
?sort=rollNumber&order=asc
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "student1",
      "rollNumber": "IT2024001",
      "registrationNumber": "REG2024001",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@college.edu",
      "department": "Information Technology",
      "semester": 1,
      "status": "ACTIVE",
      "admissionDate": "2024-01-15"
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "pages": 8
  }
}
```

---

## GET /students/:id

Get student details.

**Authentication:** Required

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "student1",
    "rollNumber": "IT2024001",
    "registrationNumber": "REG2024001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@college.edu",
    "phone": "+91-9999999999",
    "department": "Information Technology",
    "semester": 1,
    "status": "ACTIVE",
    "admissionDate": "2024-01-15",
    "profile": {
      "dateOfBirth": "2006-05-20",
      "gender": "Male",
      "address": "123 Main St",
      "city": "Bangalore",
      "state": "Karnataka",
      "postalCode": "560001",
      "emergencyContact": "mother"
    }
  }
}
```

---

## POST /students

Create new student (Admin only).

**Request:**
```json
{
  "email": "newstudent@college.edu",
  "password": "InitialPass123!",
  "firstName": "Jane",
  "lastName": "Smith",
  "rollNumber": "IT2024050",
  "registrationNumber": "REG2024050",
  "departmentId": "dept123",
  "semesterId": "sem123",
  "admissionDate": "2024-01-15"
}
```

**Response (201):**
```json
{
  "success": true,
  "status": 201,
  "message": "Student created successfully",
  "data": {
    "id": "student2",
    "rollNumber": "IT2024050",
    "email": "newstudent@college.edu"
  }
}
```

---

## PUT /students/:id

Update student details (Admin/Student own profile).

**Request:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "+91-8888888888",
  "profile": {
    "dateOfBirth": "2006-05-20",
    "gender": "Female",
    "address": "456 Oak St"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": { ... }
}
```

---

## GET /students/:id/attendance

Get student attendance records.

**Query Parameters:**
```
?subject=subjectId
?dateFrom=2024-01-01&dateTo=2024-12-31
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "att1",
      "date": "2024-01-15",
      "subject": "Database Systems",
      "status": "PRESENT"
    }
  ]
}
```

---

## GET /students/:id/marks

Get student marks.

**Query Parameters:**
```
?subject=subjectId
?type=internal|semester
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "internal": [
      {
        "subject": "Database Systems",
        "test1": 28,
        "test2": 30,
        "assignment": 9,
        "total": 67
      }
    ],
    "semester": [
      {
        "subject": "Database Systems",
        "marks": 75,
        "grade": "A",
        "percentage": 75
      }
    ]
  }
}
```

---

## GET /students/:id/fees

Get student fee records.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "fee1",
      "type": "TUITION",
      "amount": 50000,
      "dueDate": "2024-01-30",
      "status": "PAID",
      "paidDate": "2024-01-25"
    }
  ]
}
```

---

# Faculty Endpoints

## GET /faculty

List all faculty (Admin/Principal only).

**Query Parameters:**
```
?page=1&limit=20
?search=Smith
?department=IT
?status=ACTIVE
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "faculty1",
      "employeeId": "EMP001",
      "firstName": "Dr. John",
      "lastName": "Smith",
      "email": "smith@college.edu",
      "department": "Computer Science",
      "specialization": "Database Systems",
      "status": "ACTIVE"
    }
  ],
  "pagination": { ... }
}
```

---

## POST /faculty

Create new faculty member (Admin only).

**Request:**
```json
{
  "email": "newfaculty@college.edu",
  "password": "InitialPass123!",
  "firstName": "Dr. Jane",
  "lastName": "Johnson",
  "employeeId": "EMP050",
  "departmentId": "dept123",
  "specialization": "Web Development",
  "qualifications": ["B.Tech", "M.Tech", "Ph.D"]
}
```

**Response (201):**
```json
{
  "success": true,
  "status": 201,
  "data": { ... }
}
```

---

# Course Endpoints

## GET /courses

List all courses.

**Query Parameters:**
```
?department=IT
?semester=1
?search=Database
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "course1",
      "code": "CS201",
      "name": "Database Systems",
      "department": "Computer Science",
      "semester": 1,
      "credits": 4,
      "description": "Introduction to..."
    }
  ]
}
```

---

# Subject Endpoints

## GET /subjects

List all subjects.

**Query Parameters:**
```
?course=courseId
?faculty=facultyId
?semester=1
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "subject1",
      "code": "CS201",
      "name": "Database Systems",
      "course": "CS201 - Core CS",
      "faculty": "Dr. Smith",
      "credits": 4,
      "lectures": 45,
      "practicals": 30
    }
  ]
}
```

---

# Attendance Endpoints

## POST /attendance/mark

Mark student attendance (Faculty only).

**Request:**
```json
{
  "subjectId": "subject1",
  "studentId": "student1",
  "date": "2024-01-15",
  "status": "PRESENT",
  "remarks": ""
}
```

**Response (201):**
```json
{
  "success": true,
  "status": 201,
  "message": "Attendance marked",
  "data": { ... }
}
```

---

## POST /attendance/bulk

Mark attendance for multiple students (Faculty only).

**Request:**
```json
{
  "subjectId": "subject1",
  "date": "2024-01-15",
  "attendance": [
    { "studentId": "student1", "status": "PRESENT" },
    { "studentId": "student2", "status": "ABSENT" },
    { "studentId": "student3", "status": "LATE" }
  ]
}
```

**Response (201):**
```json
{
  "success": true,
  "status": 201,
  "message": "Attendance marked for 3 students"
}
```

---

# Marks Endpoints

## POST /marks/internal

Add internal marks (Faculty only).

**Request:**
```json
{
  "studentId": "student1",
  "subjectId": "subject1",
  "test1": 28,
  "test2": 30,
  "assignment": 9
}
```

**Response (201):**
```json
{
  "success": true,
  "status": 201,
  "data": {
    "studentId": "student1",
    "subject": "Database Systems",
    "test1": 28,
    "test2": 30,
    "assignment": 9,
    "total": 67
  }
}
```

---

## POST /marks/semester

Add semester marks (Faculty only).

**Request:**
```json
{
  "studentId": "student1",
  "subjectId": "subject1",
  "marks": 75
}
```

**Response (201):**
```json
{
  "success": true,
  "status": 201,
  "data": {
    "studentId": "student1",
    "subject": "Database Systems",
    "marks": 75,
    "grade": "A",
    "percentage": 75
  }
}
```

---

# Assignment Endpoints

## GET /assignments

List assignments for a subject.

**Query Parameters:**
```
?subject=subjectId
?faculty=facultyId
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "assign1",
      "title": "Assignment 1",
      "subject": "Database Systems",
      "faculty": "Dr. Smith",
      "totalMarks": 10,
      "dueDate": "2024-01-25",
      "createdDate": "2024-01-15",
      "submissions": 25,
      "graded": 12
    }
  ]
}
```

---

## POST /assignments

Create assignment (Faculty only).

**Request:**
```json
{
  "subjectId": "subject1",
  "title": "Assignment 1: Database Design",
  "description": "Design a database schema for...",
  "totalMarks": 10,
  "dueDate": "2024-01-25"
}
```

**Response (201):**
```json
{
  "success": true,
  "status": 201,
  "data": { ... }
}
```

---

## POST /assignments/:id/submit

Submit assignment (Student).

**Request:**
```json
{
  "file": "base64_encoded_file",
  "submissionText": "..."
}
```

**Response (201):**
```json
{
  "success": true,
  "status": 201,
  "message": "Assignment submitted successfully"
}
```

---

## POST /assignments/:id/grade

Grade assignment (Faculty only).

**Request:**
```json
{
  "studentId": "student1",
  "marks": 8,
  "feedback": "Good work, but needs improvement in..."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Assignment graded"
}
```

---

# Error Responses

## Validation Error (422)

```json
{
  "success": false,
  "status": 422,
  "message": "Validation failed",
  "errors": {
    "email": ["Email must be unique", "Invalid email format"],
    "password": ["Password must be at least 8 characters"]
  }
}
```

## Unauthorized (401)

```json
{
  "success": false,
  "status": 401,
  "message": "Unauthorized - Invalid or expired token"
}
```

## Forbidden (403)

```json
{
  "success": false,
  "status": 403,
  "message": "Forbidden - You don't have permission to access this resource"
}
```

## Not Found (404)

```json
{
  "success": false,
  "status": 404,
  "message": "Student not found",
  "data": null
}
```

---

**Last Updated**: 2024-01-01  
**API Version**: v1
