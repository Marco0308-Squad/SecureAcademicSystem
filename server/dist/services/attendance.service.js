"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
const errors_1 = require("../errors");
class AttendanceService {
    async listAttendance() {
        return prisma_1.default.attendance.findMany({
            orderBy: { date: 'desc' },
            include: {
                student: {
                    include: {
                        user: { select: { id: true, firstName: true, lastName: true, email: true } },
                    },
                },
                subject: { select: { id: true, code: true, name: true } },
            },
        });
    }
    async createAttendance(input) {
        const existing = await prisma_1.default.attendance.findFirst({
            where: {
                studentId: input.studentId,
                subjectId: input.subjectId,
                date: new Date(input.date),
            },
        });
        if (existing) {
            throw new errors_1.ConflictError('Attendance for this student and subject on that date already exists');
        }
        return prisma_1.default.attendance.create({
            data: {
                studentId: input.studentId,
                subjectId: input.subjectId,
                date: new Date(input.date),
                status: input.status,
                remarks: input.remarks,
            },
            include: {
                student: {
                    include: {
                        user: { select: { id: true, firstName: true, lastName: true, email: true } },
                    },
                },
                subject: { select: { id: true, code: true, name: true } },
            },
        });
    }
    async updateAttendance(id, input) {
        const record = await prisma_1.default.attendance.findUnique({ where: { id } });
        if (!record) {
            throw new errors_1.NotFoundError('Attendance record');
        }
        return prisma_1.default.attendance.update({
            where: { id },
            data: {
                studentId: input.studentId,
                subjectId: input.subjectId,
                date: input.date ? new Date(input.date) : undefined,
                status: input.status,
                remarks: input.remarks,
            },
            include: {
                student: {
                    include: {
                        user: { select: { id: true, firstName: true, lastName: true, email: true } },
                    },
                },
                subject: { select: { id: true, code: true, name: true } },
            },
        });
    }
}
exports.default = new AttendanceService();
//# sourceMappingURL=attendance.service.js.map