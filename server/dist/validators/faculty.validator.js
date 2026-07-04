"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFacultySchema = exports.createFacultySchema = void 0;
const zod_1 = require("zod");
exports.createFacultySchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    employeeId: zod_1.z.string().min(1),
    departmentId: zod_1.z.string().min(1),
    specialization: zod_1.z.string().optional(),
    qualifications: zod_1.z.array(zod_1.z.string()).optional(),
    officePhone: zod_1.z.string().optional(),
    officeLocation: zod_1.z.string().optional(),
    consultationHours: zod_1.z.string().optional(),
    status: zod_1.z.enum(['ACTIVE', 'ON_LEAVE', 'INACTIVE', 'RETIRED']).optional(),
});
exports.updateFacultySchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).optional(),
    lastName: zod_1.z.string().min(1).optional(),
    employeeId: zod_1.z.string().min(1).optional(),
    departmentId: zod_1.z.string().min(1).optional(),
    specialization: zod_1.z.string().optional(),
    qualifications: zod_1.z.array(zod_1.z.string()).optional(),
    officePhone: zod_1.z.string().optional(),
    officeLocation: zod_1.z.string().optional(),
    consultationHours: zod_1.z.string().optional(),
    status: zod_1.z.enum(['ACTIVE', 'ON_LEAVE', 'INACTIVE', 'RETIRED']).optional(),
});
//# sourceMappingURL=faculty.validator.js.map