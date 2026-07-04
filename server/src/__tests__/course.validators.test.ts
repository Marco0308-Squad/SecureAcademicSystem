import { describe, it, expect } from 'vitest'
import { createCourseSchema, updateCourseSchema } from '../validators/course.validator'

describe('course validators', () => {
  it('accepts a valid course payload', () => {
    const payload = createCourseSchema.parse({
      code: 'CSE101',
      name: 'Programming Fundamentals',
      departmentId: 'dept_1',
      semesterId: 'sem_1',
      totalCredits: 4,
      description: 'Intro to programming',
    })

    expect(payload.code).toBe('CSE101')
  })

  it('rejects a negative credit value', () => {
    expect(() => createCourseSchema.parse({
      code: 'CSE102',
      name: 'Algorithms',
      departmentId: 'dept_1',
      semesterId: 'sem_1',
      totalCredits: -1,
    })).toThrow()
  })

  it('allows partial updates', () => {
    const payload = updateCourseSchema.parse({ name: 'Data Structures' })
    expect(payload.name).toBe('Data Structures')
  })
})
