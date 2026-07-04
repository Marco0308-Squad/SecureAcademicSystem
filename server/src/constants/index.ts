// Global constants for server

// User Roles
export const USER_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  PRINCIPAL: 'PRINCIPAL',
  HOD: 'HOD',
  FACULTY: 'FACULTY',
  STUDENT: 'STUDENT',
} as const

// User Status
export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
  ARCHIVED: 'ARCHIVED',
} as const

// Student Status
export const STUDENT_STATUS = {
  ACTIVE: 'ACTIVE',
  ON_LEAVE: 'ON_LEAVE',
  GRADUATED: 'GRADUATED',
  DROPPED: 'DROPPED',
  SUSPENDED: 'SUSPENDED',
} as const

// Faculty Status
export const FACULTY_STATUS = {
  ACTIVE: 'ACTIVE',
  ON_LEAVE: 'ON_LEAVE',
  INACTIVE: 'INACTIVE',
  RETIRED: 'RETIRED',
} as const

// Attendance Status
export const ATTENDANCE_STATUS = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  LATE: 'LATE',
  EXCUSED: 'EXCUSED',
} as const

// Fee Status
export const FEE_STATUS = {
  PENDING: 'PENDING',
  PARTIALLY_PAID: 'PARTIALLY_PAID',
  PAID: 'PAID',
  OVERDUE: 'OVERDUE',
  WAIVED: 'WAIVED',
} as const

// Enrollment Status
export const ENROLLMENT_STATUS = {
  ACTIVE: 'ACTIVE',
  WITHDRAWN: 'WITHDRAWN',
  DROPPED: 'DROPPED',
  COMPLETED: 'COMPLETED',
} as const

// Semester Status
export const SEMESTER_STATUS = {
  PLANNING: 'PLANNING',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED',
} as const

// Exam Types
export const EXAM_TYPES = {
  INTERNAL: 'INTERNAL',
  EXTERNAL: 'EXTERNAL',
  MIDTERM: 'MIDTERM',
  FINAL: 'FINAL',
  PRACTICAL: 'PRACTICAL',
} as const

// Audit Actions
export const AUDIT_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  PASSWORD_CHANGE: 'PASSWORD_CHANGE',
  ROLE_CHANGE: 'ROLE_CHANGE',
  ATTENDANCE_UPDATE: 'ATTENDANCE_UPDATE',
  MARKS_UPDATE: 'MARKS_UPDATE',
  RECORD_CREATE: 'RECORD_CREATE',
  RECORD_UPDATE: 'RECORD_UPDATE',
  RECORD_DELETE: 'RECORD_DELETE',
  ADMIN_ACTION: 'ADMIN_ACTION',
} as const

// JWT Configuration
export const JWT_CONFIG = {
  ALGORITHM: 'HS256',
  EXPIRY: process.env.JWT_EXPIRY || '15m',
  REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || '7d',
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const

// Rate Limiting
export const RATE_LIMITS = {
  LOGIN: { windowMs: 15 * 60 * 1000, max: 5 }, // 5 attempts per 15 minutes
  API: { windowMs: 1 * 60 * 1000, max: 100 }, // 100 requests per minute
  PASSWORD_RESET: { windowMs: 60 * 60 * 1000, max: 3 }, // 3 requests per hour
} as const

// Password Policy
export const PASSWORD_POLICY = {
  MIN_LENGTH: 8,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBER: true,
  REQUIRE_SPECIAL: true,
  SPECIAL_CHARS: '!@#$%^&*',
} as const

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['application/pdf', 'application/msword', 'text/plain'],
  UPLOAD_DIR: './uploads',
} as const

// Validation Messages
export const VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Invalid email address',
  EMAIL_EXISTS: 'Email already exists',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
  PASSWORD_WEAK: 'Password must contain uppercase, lowercase, number, and special character',
  FIRST_NAME_REQUIRED: 'First name is required',
  LAST_NAME_REQUIRED: 'Last name is required',
} as const

// Error Messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized - Invalid or expired token',
  FORBIDDEN: 'Forbidden - You do not have permission',
  NOT_FOUND: 'Resource not found',
  INTERNAL_ERROR: 'Internal server error',
  INVALID_CREDENTIALS: 'Invalid email or password',
  ACCOUNT_LOCKED: 'Account is locked due to too many failed login attempts',
  ACCOUNT_INACTIVE: 'Account is inactive',
  ACCOUNT_SUSPENDED: 'Account is suspended',
} as const

// HTTP Headers
export const HTTP_HEADERS = {
  AUTHORIZATION: 'Authorization',
  CONTENT_TYPE: 'Content-Type',
  X_FORWARDED_FOR: 'X-Forwarded-For',
  X_REAL_IP: 'X-Real-IP',
  USER_AGENT: 'User-Agent',
} as const
