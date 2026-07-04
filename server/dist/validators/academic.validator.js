"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSemesterSchema = exports.createSemesterSchema = exports.updateDepartmentSchema = exports.createDepartmentSchema = void 0;
const zod_1 = require("zod");
exports.createDepartmentSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Department name is required'),
    code: zod_1.z.string().min(1, 'Department code is required').max(10),
});
exports.updateDepartmentSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    code: zod_1.z.string().min(1).max(10).optional(),
});
exports.createSemesterSchema = zod_1.z.object({
    number: zod_1.z.number().int().min(1).max(12),
    name: zod_1.z.string().min(1),
    startDate: zod_1.z.string().min(1),
    endDate: zod_1.z.string().min(1),
    status: zod_1.z.enum(['PLANNING', 'ACTIVE', 'COMPLETED', 'ARCHIVED']).optional(),
});
exports.updateSemesterSchema = zod_1.z.object({
    number: zod_1.z.number().int().min(1).max(12).optional(),
    name: zod_1.z.string().min(1).optional(),
    startDate: zod_1.z.string().min(1).optional(),
    endDate: zod_1.z.string().min(1).optional(),
    status: zod_1.z.enum(['PLANNING', 'ACTIVE', 'COMPLETED', 'ARCHIVED']).optional(),
});
//# sourceMappingURL=academic.validator.js.map