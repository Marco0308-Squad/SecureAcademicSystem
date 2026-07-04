import { z } from 'zod'

export const createAttendanceSchema = z.object({
  studentId: z.string().min(1),
  subjectId: z.string().min(1),
  date: z.string().min(1),
  status: z.enum(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED']),
  remarks: z.string().optional(),
})

export const updateAttendanceSchema = z.object({
  studentId: z.string().min(1).optional(),
  subjectId: z.string().min(1).optional(),
  date: z.string().min(1).optional(),
  status: z.enum(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED']).optional(),
  remarks: z.string().optional(),
})
