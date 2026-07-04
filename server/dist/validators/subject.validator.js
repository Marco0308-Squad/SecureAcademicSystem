"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubjectSchema = exports.createSubjectSchema = void 0;
const zod_1 = require("zod");
exports.createSubjectSchema = zod_1.z.object({
    code: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    courseId: zod_1.z.string().min(1),
    departmentId: zod_1.z.string().min(1),
    semesterId: zod_1.z.string().min(1),
    credits: zod_1.z.number().int().positive(),
    totalLectures: zod_1.z.number().int().nonnegative(),
    totalPracticals: zod_1.z.number().int().nonnegative(),
    facultyId: zod_1.z.string().min(1),
});
exports.updateSubjectSchema = zod_1.z.object({
    code: zod_1.z.string().min(1).optional(),
    name: zod_1.z.string().min(1).optional(),
    courseId: zod_1.z.string().min(1).optional(),
    departmentId: zod_1.z.string().min(1).optional(),
    semesterId: zod_1.z.string().min(1).optional(),
    credits: zod_1.z.number().int().positive().optional(),
    totalLectures: zod_1.z.number().int().nonnegative().optional(),
    totalPracticals: zod_1.z.number().int().nonnegative().optional(),
    facultyId: zod_1.z.string().min(1).optional(),
});
//# sourceMappingURL=subject.validator.js.map