"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
const errors_1 = require("../errors");
class AcademicService {
    async listDepartments() {
        return prisma_1.default.department.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { students: true, faculties: true, subjects: true },
                },
            },
        });
    }
    async createDepartment(input) {
        const existing = await prisma_1.default.department.findFirst({
            where: { OR: [{ name: input.name }, { code: input.code }] },
        });
        if (existing) {
            throw new errors_1.ConflictError('Department with that name or code already exists');
        }
        return prisma_1.default.department.create({ data: input });
    }
    async updateDepartment(id, input) {
        const department = await prisma_1.default.department.findUnique({ where: { id } });
        if (!department) {
            throw new errors_1.NotFoundError('Department');
        }
        return prisma_1.default.department.update({ where: { id }, data: input });
    }
    async listSemesters() {
        return prisma_1.default.semester.findMany({ orderBy: { number: 'asc' } });
    }
    async createSemester(input) {
        const existing = await prisma_1.default.semester.findFirst({
            where: { number: input.number, name: input.name },
        });
        if (existing) {
            throw new errors_1.ConflictError('Semester already exists');
        }
        return prisma_1.default.semester.create({
            data: {
                number: input.number,
                name: input.name,
                startDate: new Date(input.startDate),
                endDate: new Date(input.endDate),
                status: input.status ?? 'ACTIVE',
            },
        });
    }
    async updateSemester(id, input) {
        const semester = await prisma_1.default.semester.findUnique({ where: { id } });
        if (!semester) {
            throw new errors_1.NotFoundError('Semester');
        }
        return prisma_1.default.semester.update({
            where: { id },
            data: {
                ...(input.number !== undefined ? { number: input.number } : {}),
                ...(input.name !== undefined ? { name: input.name } : {}),
                ...(input.startDate !== undefined ? { startDate: new Date(input.startDate) } : {}),
                ...(input.endDate !== undefined ? { endDate: new Date(input.endDate) } : {}),
                ...(input.status !== undefined ? { status: input.status } : {}),
            },
        });
    }
}
exports.default = new AcademicService();
//# sourceMappingURL=academic.service.js.map