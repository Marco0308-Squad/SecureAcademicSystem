import { z } from 'zod'

export const createCourseSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  departmentId: z.string().min(1),
  semesterId: z.string().min(1),
  totalCredits: z.number().int().positive(),
  description: z.string().optional(),
  syllabus: z.string().optional(),
})

export const updateCourseSchema = z.object({
  code: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  departmentId: z.string().min(1).optional(),
  semesterId: z.string().min(1).optional(),
  totalCredits: z.number().int().positive().optional(),
  description: z.string().optional(),
  syllabus: z.string().optional(),
})
