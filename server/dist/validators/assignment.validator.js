"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAssignmentSchema = exports.createAssignmentSchema = void 0;
const zod_1 = require("zod");
exports.createAssignmentSchema = zod_1.z.object({
    subjectId: zod_1.z.string().min(1),
    facultyId: zod_1.z.string().min(1),
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
    totalMarks: zod_1.z.number().int().positive().default(10),
    dueDate: zod_1.z.string().min(1),
});
exports.updateAssignmentSchema = zod_1.z.object({
    subjectId: zod_1.z.string().min(1).optional(),
    facultyId: zod_1.z.string().min(1).optional(),
    title: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().optional(),
    totalMarks: zod_1.z.number().int().positive().optional(),
    dueDate: zod_1.z.string().min(1).optional(),
});
//# sourceMappingURL=assignment.validator.js.map