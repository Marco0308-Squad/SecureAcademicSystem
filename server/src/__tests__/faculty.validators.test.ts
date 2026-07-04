import { describe, it, expect } from 'vitest'
import { createFacultySchema, updateFacultySchema } from '../validators/faculty.validator'

describe('faculty validators', () => {
  it('accepts a valid faculty payload', () => {
    const payload = createFacultySchema.parse({
      email: 'faculty@example.com',
      password: 'Password123',
      firstName: 'Asha',
      lastName: 'Rao',
      employeeId: 'EMP001',
      departmentId: 'dept_1',
      specialization: 'AI',
    })

    expect(payload.email).toBe('faculty@example.com')
  })

  it('rejects invalid employee ids', () => {
    expect(() => createFacultySchema.parse({
      email: 'faculty@example.com',
      password: 'Password123',
      firstName: 'Asha',
      lastName: 'Rao',
      employeeId: '',
      departmentId: 'dept_1',
    })).toThrow()
  })

  it('allows partial updates', () => {
    const payload = updateFacultySchema.parse({ specialization: 'Data Science' })
    expect(payload.specialization).toBe('Data Science')
  })
})
