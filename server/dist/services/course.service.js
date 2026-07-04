"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
const errors_1 = require("../errors");
class CourseService {
    async listCourses() {
        return prisma_1.default.course.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                department: { select: { id: true, name: true, code: true } },
                semester: { select: { id: true, number: true, name: true } },
            },
        });
    }
    async createCourse(input) {
        const existing = await prisma_1.default.course.findUnique({ where: { code: input.code } });
        if (existing) {
            throw new errors_1.ConflictError('Course code already exists');
        }
        return prisma_1.default.course.create({
            data: {
                code: input.code,
                name: input.name,
                departmentId: input.departmentId,
                semesterId: input.semesterId,
                totalCredits: input.totalCredits,
                description: input.description,
                syllabus: input.syllabus,
            },
            include: {
                department: { select: { id: true, name: true, code: true } },
                semester: { select: { id: true, number: true, name: true } },
            },
        });
    }
    async updateCourse(id, input) {
        const course = await prisma_1.default.course.findUnique({ where: { id } });
        if (!course) {
            throw new errors_1.NotFoundError('Course');
        }
        return prisma_1.default.course.update({
            where: { id },
            data: {
                code: input.code,
                name: input.name,
                departmentId: input.departmentId,
                semesterId: input.semesterId,
                totalCredits: input.totalCredits,
                description: input.description,
                syllabus: input.syllabus,
            },
            include: {
                department: { select: { id: true, name: true, code: true } },
                semester: { select: { id: true, number: true, name: true } },
            },
        });
    }
}
exports.default = new CourseService();
//# sourceMappingURL=course.service.js.map