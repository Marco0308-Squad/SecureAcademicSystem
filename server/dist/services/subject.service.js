"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
const errors_1 = require("../errors");
class SubjectService {
    async listSubjects() {
        return prisma_1.default.subject.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                course: { select: { id: true, name: true, code: true } },
                department: { select: { id: true, name: true, code: true } },
                semester: { select: { id: true, number: true, name: true } },
                faculty: {
                    include: {
                        user: { select: { id: true, firstName: true, lastName: true, email: true } },
                    },
                },
            },
        });
    }
    async createSubject(input) {
        const existing = await prisma_1.default.subject.findUnique({ where: { code: input.code } });
        if (existing) {
            throw new errors_1.ConflictError('Subject code already exists');
        }
        return prisma_1.default.subject.create({
            data: {
                code: input.code,
                name: input.name,
                courseId: input.courseId,
                departmentId: input.departmentId,
                semesterId: input.semesterId,
                credits: input.credits,
                totalLectures: input.totalLectures,
                totalPracticals: input.totalPracticals,
                facultyId: input.facultyId,
            },
            include: {
                course: { select: { id: true, name: true, code: true } },
                department: { select: { id: true, name: true, code: true } },
                semester: { select: { id: true, number: true, name: true } },
                faculty: {
                    include: {
                        user: { select: { id: true, firstName: true, lastName: true, email: true } },
                    },
                },
            },
        });
    }
    async updateSubject(id, input) {
        const subject = await prisma_1.default.subject.findUnique({ where: { id } });
        if (!subject) {
            throw new errors_1.NotFoundError('Subject');
        }
        return prisma_1.default.subject.update({
            where: { id },
            data: {
                code: input.code,
                name: input.name,
                courseId: input.courseId,
                departmentId: input.departmentId,
                semesterId: input.semesterId,
                credits: input.credits,
                totalLectures: input.totalLectures,
                totalPracticals: input.totalPracticals,
                facultyId: input.facultyId,
            },
            include: {
                course: { select: { id: true, name: true, code: true } },
                department: { select: { id: true, name: true, code: true } },
                semester: { select: { id: true, number: true, name: true } },
                faculty: {
                    include: {
                        user: { select: { id: true, firstName: true, lastName: true, email: true } },
                    },
                },
            },
        });
    }
}
exports.default = new SubjectService();
//# sourceMappingURL=subject.service.js.map