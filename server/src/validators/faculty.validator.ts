import { z } from 'zod'

export const createFacultySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  employeeId: z.string().min(1),
  departmentId: z.string().min(1),
  specialization: z.string().optional(),
  qualifications: z.array(z.string()).optional(),
  officePhone: z.string().optional(),
  officeLocation: z.string().optional(),
  consultationHours: z.string().optional(),
  status: z.enum(['ACTIVE', 'ON_LEAVE', 'INACTIVE', 'RETIRED']).optional(),
})

export const updateFacultySchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  employeeId: z.string().min(1).optional(),
  departmentId: z.string().min(1).optional(),
  specialization: z.string().optional(),
  qualifications: z.array(z.string()).optional(),
  officePhone: z.string().optional(),
  officeLocation: z.string().optional(),
  consultationHours: z.string().optional(),
  status: z.enum(['ACTIVE', 'ON_LEAVE', 'INACTIVE', 'RETIRED']).optional(),
})
