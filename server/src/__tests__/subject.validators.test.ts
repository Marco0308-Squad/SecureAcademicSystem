import { describe, it, expect } from 'vitest'
import { createSubjectSchema, updateSubjectSchema } from '../validators/subject.validator'

describe('subject validators', () => {
  it('accepts a valid subject payload', () => {
    const payload = createSubjectSchema.parse({
      code: 'SUB101',
      name: 'Database Systems',
      courseId: 'course_1',
      departmentId: 'dept_1',
      semesterId: 'sem_1',
      credits: 3,
      totalLectures: 40,
      totalPracticals: 10,
      facultyId: 'fac_1',
    })

    expect(payload.name).toBe('Database Systems')
  })

  it('rejects negative credits', () => {
    expect(() => createSubjectSchema.parse({
      code: 'SUB102',
      name: 'Operating Systems',
      courseId: 'course_1',
      departmentId: 'dept_1',
      semesterId: 'sem_1',
      credits: -1,
      totalLectures: 40,
      totalPracticals: 10,
      facultyId: 'fac_1',
    })).toThrow()
  })

  it('allows partial updates', () => {
    const payload = updateSubjectSchema.parse({ credits: 4 })
    expect(payload.credits).toBe(4)
  })
})
