"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMarksSchema = exports.createMarksSchema = void 0;
const zod_1 = require("zod");
exports.createMarksSchema = zod_1.z.object({
    studentId: zod_1.z.string().min(1),
    subjectId: zod_1.z.string().min(1),
    test1: zod_1.z.number().int().nonnegative().optional(),
    test2: zod_1.z.number().int().nonnegative().optional(),
    test3: zod_1.z.number().int().nonnegative().optional(),
    assignment: zod_1.z.number().int().nonnegative().optional(),
    outOfMarks: zod_1.z.number().int().positive().optional(),
});
exports.updateMarksSchema = zod_1.z.object({
    studentId: zod_1.z.string().min(1).optional(),
    subjectId: zod_1.z.string().min(1).optional(),
    test1: zod_1.z.number().int().nonnegative().optional(),
    test2: zod_1.z.number().int().nonnegative().optional(),
    test3: zod_1.z.number().int().nonnegative().optional(),
    assignment: zod_1.z.number().int().nonnegative().optional(),
    outOfMarks: zod_1.z.number().int().positive().optional(),
});
//# sourceMappingURL=marks.validator.js.map