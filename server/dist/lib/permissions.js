"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPermissionsForRole = getPermissionsForRole;
exports.hasPermission = hasPermission;
const rolePermissions = {
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
};
function getPermissionsForRole(role) {
    return rolePermissions[role] ?? [];
}
function hasPermission(role, permission) {
    return role === 'SUPER_ADMIN' || getPermissionsForRole(role).includes(permission);
}
//# sourceMappingURL=permissions.js.map