export type Permission =
  | 'student.read'
  | 'student.create'
  | 'student.update'
  | 'student.delete'
  | 'attendance.mark'
  | 'attendance.edit'
  | 'attendance.approve'
  | 'marks.publish'
  | 'reports.generate'
  | 'settings.manage'

export type RoleName =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'PRINCIPAL'
  | 'HOD'
  | 'FACULTY'
  | 'STUDENT'

const rolePermissions: Record<RoleName, Permission[]> = {
  SUPER_ADMIN: [
    'student.read',
    'student.create',
    'student.update',
    'student.delete',
    'attendance.mark',
    'attendance.edit',
    'attendance.approve',
    'marks.publish',
    'reports.generate',
    'settings.manage',
  ],
  ADMIN: [
    'student.read',
    'student.create',
    'student.update',
    'student.delete',
    'attendance.mark',
    'attendance.edit',
    'attendance.approve',
    'marks.publish',
    'reports.generate',
  ],
  PRINCIPAL: [
    'student.read',
    'attendance.mark',
    'attendance.edit',
    'attendance.approve',
    'marks.publish',
    'reports.generate',
  ],
  HOD: ['student.read', 'student.create', 'student.update', 'attendance.mark', 'reports.generate'],
  FACULTY: ['student.read', 'attendance.mark', 'attendance.edit', 'marks.publish'],
  STUDENT: ['student.read'],
}

export function getPermissionsForRole(role: RoleName): Permission[] {
  return rolePermissions[role] ?? []
}

export function hasPermission(role: RoleName, permission: Permission): boolean {
  return role === 'SUPER_ADMIN' || getPermissionsForRole(role).includes(permission)
}
