import { describe, expect, it } from 'vitest'
import { createAssignmentSchema, updateAssignmentSchema } from '../validators/assignment.validator'

describe('assignment validator', () => {
  it('accepts a valid assignment payload', () => {
    const result = createAssignmentSchema.safeParse({
      subjectId: 'subject-1',
      facultyId: 'faculty-1',
      title: 'Research Paper',
      description: 'Write a short analysis',
      totalMarks: 10,
      dueDate: '2026-08-10T00:00:00.000Z',
    })

    expect(result.success).toBe(true)
  })

  it('rejects non-positive total marks', () => {
    const result = createAssignmentSchema.safeParse({
      subjectId: 'subject-1',
      facultyId: 'faculty-1',
      title: 'Research Paper',
      totalMarks: 0,
      dueDate: '2026-08-10T00:00:00.000Z',
    })

    expect(result.success).toBe(false)
  })

  it('allows partial updates', () => {
    const result = updateAssignmentSchema.safeParse({
      title: 'Updated title',
      totalMarks: 15,
    })

    expect(result.success).toBe(true)
  })
})
