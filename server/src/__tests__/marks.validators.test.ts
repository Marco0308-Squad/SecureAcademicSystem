import { describe, expect, it } from 'vitest'
import { createMarksSchema, updateMarksSchema } from '../validators/marks.validator'

describe('marks validator', () => {
  it('accepts a valid internal mark payload', () => {
    const result = createMarksSchema.safeParse({
      studentId: 'student-1',
      subjectId: 'subject-1',
      test1: 78,
      test2: 82,
      test3: 79,
      assignment: 90,
      outOfMarks: 100,
    })

    expect(result.success).toBe(true)
  })

  it('rejects negative marks values', () => {
    const result = createMarksSchema.safeParse({
      studentId: 'student-1',
      subjectId: 'subject-1',
      test1: -5,
      test2: 82,
      assignment: 90,
      outOfMarks: 100,
    })

    expect(result.success).toBe(false)
  })

  it('allows partial updates for mark fields', () => {
    const result = updateMarksSchema.safeParse({
      test1: 88,
      assignment: 95,
      outOfMarks: 100,
    })

    expect(result.success).toBe(true)
  })
})
