"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
const errors_1 = require("../errors");
class AssignmentService {
    async listAssignments() {
        return prisma_1.default.assignment.findMany({
            orderBy: { dueDate: 'asc' },
            include: {
                subject: { select: { id: true, code: true, name: true } },
                faculty: {
                    include: {
                        user: { select: { id: true, firstName: true, lastName: true, email: true } },
                    },
                },
            },
        });
    }
    async createAssignment(input) {
        const existing = await prisma_1.default.assignment.findFirst({
            where: {
                subjectId: input.subjectId,
                title: input.title,
            },
        });
        if (existing) {
            throw new errors_1.ConflictError('Assignment title already exists for this subject');
        }
        return prisma_1.default.assignment.create({
            data: {
                subjectId: input.subjectId,
                facultyId: input.facultyId,
                title: input.title,
                description: input.description,
                totalMarks: input.totalMarks ?? 10,
                dueDate: new Date(input.dueDate),
            },
            include: {
                subject: { select: { id: true, code: true, name: true } },
                faculty: {
                    include: {
                        user: { select: { id: true, firstName: true, lastName: true, email: true } },
                    },
                },
            },
        });
    }
    async updateAssignment(id, input) {
        const assignment = await prisma_1.default.assignment.findUnique({ where: { id } });
        if (!assignment) {
            throw new errors_1.NotFoundError('Assignment');
        }
        return prisma_1.default.assignment.update({
            where: { id },
            data: {
                subjectId: input.subjectId,
                facultyId: input.facultyId,
                title: input.title,
                description: input.description,
                totalMarks: input.totalMarks,
                dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
            },
            include: {
                subject: { select: { id: true, code: true, name: true } },
                faculty: {
                    include: {
                        user: { select: { id: true, firstName: true, lastName: true, email: true } },
                    },
                },
            },
        });
    }
}
exports.default = new AssignmentService();
//# sourceMappingURL=assignment.service.js.map