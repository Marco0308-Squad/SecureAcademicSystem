import { describe, it, expect } from 'vitest'
import {
  createDepartmentSchema,
  updateDepartmentSchema,
  createSemesterSchema,
} from '../validators/academic.validator'

describe('academic validators', () => {
  it('validates a department payload', () => {
    const payload = createDepartmentSchema.parse({ name: 'Computer Science', code: 'CSE' })
    expect(payload).toEqual({ name: 'Computer Science', code: 'CSE' })
  })

  it('rejects a department with an empty code', () => {
    expect(() => createDepartmentSchema.parse({ name: 'Computer Science', code: '' })).toThrow()
  })

  it('validates a semester payload', () => {
    const payload = createSemesterSchema.parse({
      number: 1,
      name: 'Fall 2026',
      startDate: '2026-08-01',
      endDate: '2026-12-15',
      status: 'ACTIVE',
    })

    expect(payload.number).toBe(1)
    expect(payload.status).toBe('ACTIVE')
  })

  it('allows partial updates', () => {
    const payload = updateDepartmentSchema.parse({ code: 'ECE' })
    expect(payload).toEqual({ code: 'ECE' })
  })
})
