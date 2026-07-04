"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentQuerySchema = exports.updateStudentSchema = exports.createStudentSchema = void 0;
const zod_1 = require("zod");
exports.createStudentSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    rollNumber: zod_1.z.string().min(1),
    registrationNumber: zod_1.z.string().min(1),
    departmentId: zod_1.z.string().min(1),
    semesterId: zod_1.z.string().min(1),
    admissionDate: zod_1.z.string().optional(),
    status: zod_1.z.enum(['ACTIVE', 'ON_LEAVE', 'GRADUATED', 'DROPPED', 'SUSPENDED']).optional(),
});
exports.updateStudentSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).optional(),
    lastName: zod_1.z.string().min(1).optional(),
    rollNumber: zod_1.z.string().min(1).optional(),
    registrationNumber: zod_1.z.string().min(1).optional(),
    departmentId: zod_1.z.string().min(1).optional(),
    semesterId: zod_1.z.string().min(1).optional(),
    status: zod_1.z.enum(['ACTIVE', 'ON_LEAVE', 'GRADUATED', 'DROPPED', 'SUSPENDED']).optional(),
});
exports.studentQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(20),
    search: zod_1.z.string().optional(),
    status: zod_1.z.string().optional(),
});
//# sourceMappingURL=student.validator.js.map