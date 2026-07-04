export type Permission = 'student.read' | 'student.create' | 'student.update' | 'student.delete' | 'attendance.mark' | 'attendance.edit' | 'attendance.approve' | 'marks.publish' | 'reports.generate' | 'settings.manage';
export type RoleName = 'SUPER_ADMIN' | 'ADMIN' | 'PRINCIPAL' | 'HOD' | 'FACULTY' | 'STUDENT';
export declare function getPermissionsForRole(role: RoleName): Permission[];
export declare function hasPermission(role: RoleName, permission: Permission): boolean;
//# sourceMappingURL=permissions.d.ts.map