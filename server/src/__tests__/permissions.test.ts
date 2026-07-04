import { describe, it, expect } from 'vitest'
import { hasPermission, getPermissionsForRole } from '../lib/permissions'

describe('permissions', () => {
  it('grants broad access to super administrators', () => {
    expect(hasPermission('SUPER_ADMIN', 'student.delete')).toBe(true)
    expect(hasPermission('SUPER_ADMIN', 'settings.manage')).toBe(true)
  })

  it('allows students to read their own records', () => {
    expect(hasPermission('STUDENT', 'student.read')).toBe(true)
    expect(hasPermission('STUDENT', 'student.create')).toBe(false)
  })

  it('allows faculty to mark attendance and publish marks', () => {
    expect(hasPermission('FACULTY', 'attendance.mark')).toBe(true)
    expect(hasPermission('FACULTY', 'marks.publish')).toBe(true)
  })

  it('returns the expected permission set for a role', () => {
    const permissions = getPermissionsForRole('HOD')
    expect(permissions).toContain('student.read')
    expect(permissions).toContain('reports.generate')
    expect(permissions).not.toContain('settings.manage')
  })
})
