import { describe, it, expect } from 'vitest'
import { createAttendanceSchema, updateAttendanceSchema } from '../validators/attendance.validator'

describe('attendance validators', () => {
  it('accepts a valid attendance payload', () => {
    const payload = createAttendanceSchema.parse({
      studentId: 'student_1',
      subjectId: 'subject_1',
      date: '2026-07-02',
      status: 'PRESENT',
      remarks: 'On time',
    })

    expect(payload.status).toBe('PRESENT')
  })

  it('rejects an invalid attendance status', () => {
    expect(() => createAttendanceSchema.parse({
      studentId: 'student_1',
      subjectId: 'subject_1',
      date: '2026-07-02',
      status: 'UNKNOWN',
    })).toThrow()
  })

  it('allows partial updates', () => {
    const payload = updateAttendanceSchema.parse({ status: 'ABSENT' })
    expect(payload.status).toBe('ABSENT')
  })
})
