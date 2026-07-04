import { z } from 'zod'

export const createAssignmentSchema = z.object({
  subjectId: z.string().min(1),
  facultyId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  totalMarks: z.number().int().positive().default(10),
  dueDate: z.string().min(1),
})

export const updateAssignmentSchema = z.object({
  subjectId: z.string().min(1).optional(),
  facultyId: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  totalMarks: z.number().int().positive().optional(),
  dueDate: z.string().min(1).optional(),
})
