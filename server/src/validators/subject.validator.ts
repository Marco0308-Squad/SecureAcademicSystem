import { z } from 'zod'

export const createSubjectSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  courseId: z.string().min(1),
  departmentId: z.string().min(1),
  semesterId: z.string().min(1),
  credits: z.number().int().positive(),
  totalLectures: z.number().int().nonnegative(),
  totalPracticals: z.number().int().nonnegative(),
  facultyId: z.string().min(1),
})

export const updateSubjectSchema = z.object({
  code: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  courseId: z.string().min(1).optional(),
  departmentId: z.string().min(1).optional(),
  semesterId: z.string().min(1).optional(),
  credits: z.number().int().positive().optional(),
  totalLectures: z.number().int().nonnegative().optional(),
  totalPracticals: z.number().int().nonnegative().optional(),
  facultyId: z.string().min(1).optional(),
})
