import { z } from 'zod'

export const createStudentSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  rollNumber: z.string().min(1),
  registrationNumber: z.string().min(1),
  departmentId: z.string().min(1),
  semesterId: z.string().min(1),
  admissionDate: z.string().optional(),
  status: z.enum(['ACTIVE', 'ON_LEAVE', 'GRADUATED', 'DROPPED', 'SUSPENDED']).optional(),
})

export const updateStudentSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  rollNumber: z.string().min(1).optional(),
  registrationNumber: z.string().min(1).optional(),
  departmentId: z.string().min(1).optional(),
  semesterId: z.string().min(1).optional(),
  status: z.enum(['ACTIVE', 'ON_LEAVE', 'GRADUATED', 'DROPPED', 'SUSPENDED']).optional(),
})

export const studentQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  status: z.string().optional(),
})
