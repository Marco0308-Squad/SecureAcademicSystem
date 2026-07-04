// Common types for frontend

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

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'PRINCIPAL' | 'HOD' | 'FACULTY' | 'STUDENT'

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'ARCHIVED'

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  status: UserStatus
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface Student {
  id: string
  rollNumber: string
  registrationNumber: string
  firstName: string
  lastName: string
  email: string
  department: string
  semester: number
  status: 'ACTIVE' | 'ON_LEAVE' | 'GRADUATED' | 'DROPPED' | 'SUSPENDED'
}

export interface Faculty {
  id: string
  employeeId: string
  firstName: string
  lastName: string
  email: string
  specialization: string
  department: string
  status: 'ACTIVE' | 'ON_LEAVE' | 'INACTIVE' | 'RETIRED'
}

export interface Course {
  id: string
  code: string
  name: string
  department: string
  semester: number
  credits: number
  description: string
}

export interface Subject {
  id: string
  code: string
  name: string
  course: string
  faculty: string
  credits: number
  lectures: number
  practicals: number
}

export interface Attendance {
  id: string
  date: string
  subject: string
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED'
}

export interface InternalMark {
  id: string
  subject: string
  test1?: number
  test2?: number
  test3?: number
  assignment?: number
  total?: number
}

export interface SemesterMark {
  id: string
  subject: string
  marks?: number
  grade?: string
  percentage?: number
}
