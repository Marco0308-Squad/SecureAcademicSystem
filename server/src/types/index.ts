// Common TypeScript types for the entire application

export interface ApiResponse<T = any> {
  success: boolean
  status: number
  message: string
  data?: T
  errors?: Record<string, string[]> | null
  timestamp: string
}

export interface PaginatedResponse<T> {
  success: boolean
  status: number
  message: string
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
  timestamp: string
}

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  status: UserStatus
}

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'PRINCIPAL' | 'HOD' | 'FACULTY' | 'STUDENT'

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'ARCHIVED'

export interface JwtPayload {
  sub: string // User ID
  email: string
  role: UserRole
  iat: number
  exp: number
  jti: string // JWT ID for token blacklist
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED'

export type EnrollmentStatus = 'ACTIVE' | 'WITHDRAWN' | 'DROPPED' | 'COMPLETED'

export type FeeStatus = 'PENDING' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE' | 'WAIVED'

export type FeeType = 'TUITION' | 'HOSTEL' | 'LABORATORY' | 'EXAMINATION' | 'ACTIVITY' | 'LIBRARY' | 'OTHER'

export type StudentStatus = 'ACTIVE' | 'ON_LEAVE' | 'GRADUATED' | 'DROPPED' | 'SUSPENDED'

export type FacultyStatus = 'ACTIVE' | 'ON_LEAVE' | 'INACTIVE' | 'RETIRED'

export type SemesterStatus = 'PLANNING' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED'

export type ExamType = 'INTERNAL' | 'EXTERNAL' | 'MIDTERM' | 'FINAL' | 'PRACTICAL'

export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'

export type NotificationType = 'ASSIGNMENT' | 'EXAM' | 'ATTENDANCE' | 'MARKS' | 'FEE' | 'SYSTEM' | 'OTHER'

export type AuditAction = 
  | 'LOGIN' 
  | 'LOGOUT' 
  | 'PASSWORD_CHANGE' 
  | 'ROLE_CHANGE' 
  | 'ATTENDANCE_UPDATE' 
  | 'MARKS_UPDATE' 
  | 'RECORD_CREATE' 
  | 'RECORD_UPDATE' 
  | 'RECORD_DELETE' 
  | 'ADMIN_ACTION'

export type ReportType = 
  | 'ATTENDANCE' 
  | 'MARKS' 
  | 'STUDENT_PERFORMANCE' 
  | 'FEE_COLLECTION' 
  | 'FACULTY_WORKLOAD' 
  | 'COURSE_COMPLETION' 
  | 'OTHER'

export interface PageRequest {
  page: number
  limit: number
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
}
