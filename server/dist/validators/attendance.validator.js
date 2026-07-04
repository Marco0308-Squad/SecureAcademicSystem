"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAttendanceSchema = exports.createAttendanceSchema = void 0;
const zod_1 = require("zod");
exports.createAttendanceSchema = zod_1.z.object({
    studentId: zod_1.z.string().min(1),
    subjectId: zod_1.z.string().min(1),
    date: zod_1.z.string().min(1),
    status: zod_1.z.enum(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED']),
    remarks: zod_1.z.string().optional(),
});
exports.updateAttendanceSchema = zod_1.z.object({
    studentId: zod_1.z.string().min(1).optional(),
    subjectId: zod_1.z.string().min(1).optional(),
    date: zod_1.z.string().min(1).optional(),
    status: zod_1.z.enum(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED']).optional(),
    remarks: zod_1.z.string().optional(),
});
//# sourceMappingURL=attendance.validator.js.map