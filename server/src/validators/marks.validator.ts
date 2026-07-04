import { z } from 'zod'

export const createMarksSchema = z.object({
  studentId: z.string().min(1),
  subjectId: z.string().min(1),
  test1: z.number().int().nonnegative().optional(),
  test2: z.number().int().nonnegative().optional(),
  test3: z.number().int().nonnegative().optional(),
  assignment: z.number().int().nonnegative().optional(),
  outOfMarks: z.number().int().positive().optional(),
})

export const updateMarksSchema = z.object({
  studentId: z.string().min(1).optional(),
  subjectId: z.string().min(1).optional(),
  test1: z.number().int().nonnegative().optional(),
  test2: z.number().int().nonnegative().optional(),
  test3: z.number().int().nonnegative().optional(),
  assignment: z.number().int().nonnegative().optional(),
  outOfMarks: z.number().int().positive().optional(),
})
