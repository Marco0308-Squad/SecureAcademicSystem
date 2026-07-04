"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
const errors_1 = require("../errors");
class MarksService {
    async listMarks() {
        return prisma_1.default.internalMark.findMany({
            orderBy: { updatedAt: 'desc' },
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
    async createMarks(input) {
        const existing = await prisma_1.default.internalMark.findFirst({
            where: {
                studentId: input.studentId,
                subjectId: input.subjectId,
            },
        });
        if (existing) {
            throw new errors_1.ConflictError('Marks for this student and subject already exist');
        }
        const totalMarks = [input.test1, input.test2, input.test3, input.assignment]
            .filter((value) => value != null)
            .reduce((sum, value) => sum + value, 0);
        const outOfMarks = input.outOfMarks ?? 100;
        const percentage = outOfMarks > 0 ? (totalMarks / outOfMarks) * 100 : 0;
        return prisma_1.default.internalMark.create({
            data: {
                studentId: input.studentId,
                subjectId: input.subjectId,
                test1: input.test1,
                test2: input.test2,
                test3: input.test3,
                assignment: input.assignment,
                totalMarks,
                outOfMarks,
                percentage,
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
    async updateMarks(id, input) {
        const record = await prisma_1.default.internalMark.findUnique({ where: { id } });
        if (!record) {
            throw new errors_1.NotFoundError('Marks record');
        }
        const nextData = {
            studentId: input.studentId,
            subjectId: input.subjectId,
            test1: input.test1,
            test2: input.test2,
            test3: input.test3,
            assignment: input.assignment,
            outOfMarks: input.outOfMarks,
        };
        const current = {
            test1: record.test1 ?? 0,
            test2: record.test2 ?? 0,
            test3: record.test3 ?? 0,
            assignment: record.assignment ?? 0,
        };
        const updated = {
            ...current,
            ...Object.fromEntries(Object.entries(nextData).filter(([, value]) => value !== undefined)),
        };
        const totalMarks = [updated.test1, updated.test2, updated.test3, updated.assignment]
            .filter((value) => value != null)
            .reduce((sum, value) => sum + value, 0);
        const outOfMarks = updated.outOfMarks ?? record.outOfMarks ?? 100;
        const percentage = outOfMarks > 0 ? (totalMarks / outOfMarks) * 100 : 0;
        return prisma_1.default.internalMark.update({
            where: { id },
            data: {
                ...nextData,
                totalMarks,
                outOfMarks,
                percentage,
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
exports.default = new MarksService();
//# sourceMappingURL=marks.service.js.map