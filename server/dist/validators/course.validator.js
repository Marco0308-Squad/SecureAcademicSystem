"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseSchema = exports.createCourseSchema = void 0;
const zod_1 = require("zod");
exports.createCourseSchema = zod_1.z.object({
    code: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    departmentId: zod_1.z.string().min(1),
    semesterId: zod_1.z.string().min(1),
    totalCredits: zod_1.z.number().int().positive(),
    description: zod_1.z.string().optional(),
    syllabus: zod_1.z.string().optional(),
});
exports.updateCourseSchema = zod_1.z.object({
    code: zod_1.z.string().min(1).optional(),
    name: zod_1.z.string().min(1).optional(),
    departmentId: zod_1.z.string().min(1).optional(),
    semesterId: zod_1.z.string().min(1).optional(),
    totalCredits: zod_1.z.number().int().positive().optional(),
    description: zod_1.z.string().optional(),
    syllabus: zod_1.z.string().optional(),
});
//# sourceMappingURL=course.validator.js.map