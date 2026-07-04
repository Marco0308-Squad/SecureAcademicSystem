"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
const auth_1 = require("../lib/auth");
const errors_1 = require("../errors");
const client_1 = require("@prisma/client");
class StudentService {
    async listStudents(query) {
        const { page, limit, search, status } = query;
        const skip = (page - 1) * limit;
        const where = {
            OR: search
                ? [
                    { user: { firstName: { contains: search, mode: 'insensitive' } } },
                    { user: { lastName: { contains: search, mode: 'insensitive' } } },
                    { rollNumber: { contains: search, mode: 'insensitive' } },
                    { registrationNumber: { contains: search, mode: 'insensitive' } },
                ]
                : undefined,
            ...(status ? { status: status } : {}),
        };
        const [data, total] = await Promise.all([
            prisma_1.default.student.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: {
                        select: { id: true, email: true, firstName: true, lastName: true, role: true, status: true },
                    },
                    department: { select: { id: true, name: true, code: true } },
                    semester: { select: { id: true, number: true, name: true } },
                },
            }),
            prisma_1.default.student.count({ where }),
        ]);
        return { data, total, page, limit };
    }
    async getStudent(id) {
        const student = await prisma_1.default.student.findUnique({
            where: { id },
            include: {
                user: {
                    select: { id: true, email: true, firstName: true, lastName: true, role: true, status: true },
                },
                department: { select: { id: true, name: true, code: true } },
                semester: { select: { id: true, number: true, name: true } },
            },
        });
        if (!student) {
            throw new errors_1.NotFoundError('Student');
        }
        return student;
    }
    async createStudent(input) {
        const existingUser = await prisma_1.default.user.findUnique({ where: { email: input.email } });
        if (existingUser) {
            throw new errors_1.ConflictError('Email already in use');
        }
        const existingRoll = await prisma_1.default.student.findUnique({ where: { rollNumber: input.rollNumber } });
        if (existingRoll) {
            throw new errors_1.ConflictError('Roll number already in use');
        }
        const existingRegistration = await prisma_1.default.student.findUnique({
            where: { registrationNumber: input.registrationNumber },
        });
        if (existingRegistration) {
            throw new errors_1.ConflictError('Registration number already in use');
        }
        const hashedPassword = await (0, auth_1.hashPassword)(input.password);
        const student = await prisma_1.default.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email: input.email,
                    password: hashedPassword,
                    firstName: input.firstName,
                    lastName: input.lastName,
                    role: client_1.UserRole.STUDENT,
                    status: 'ACTIVE',
                },
            });
            return tx.student.create({
                data: {
                    userId: user.id,
                    rollNumber: input.rollNumber,
                    registrationNumber: input.registrationNumber,
                    departmentId: input.departmentId,
                    semesterId: input.semesterId,
                    admissionDate: input.admissionDate ? new Date(input.admissionDate) : new Date(),
                    status: input.status ?? 'ACTIVE',
                },
                include: {
                    user: {
                        select: { id: true, email: true, firstName: true, lastName: true, role: true, status: true },
                    },
                    department: { select: { id: true, name: true, code: true } },
                    semester: { select: { id: true, number: true, name: true } },
                },
            });
        });
        return student;
    }
    async updateStudent(id, input) {
        const student = await prisma_1.default.student.findUnique({ where: { id } });
        if (!student) {
            throw new errors_1.NotFoundError('Student');
        }
        const updated = await prisma_1.default.student.update({
            where: { id },
            data: {
                rollNumber: input.rollNumber,
                registrationNumber: input.registrationNumber,
                departmentId: input.departmentId,
                semesterId: input.semesterId,
                status: input.status,
            },
            include: {
                user: {
                    select: { id: true, email: true, firstName: true, lastName: true, role: true, status: true },
                },
                department: { select: { id: true, name: true, code: true } },
                semester: { select: { id: true, number: true, name: true } },
            },
        });
        if (input.firstName || input.lastName) {
            await prisma_1.default.user.update({
                where: { id: student.userId },
                data: {
                    firstName: input.firstName ?? undefined,
                    lastName: input.lastName ?? undefined,
                },
            });
        }
        return updated;
    }
    async deleteStudent(id) {
        const student = await prisma_1.default.student.findUnique({ where: { id } });
        if (!student) {
            throw new errors_1.NotFoundError('Student');
        }
        await prisma_1.default.user.delete({ where: { id: student.userId } });
    }
}
exports.default = new StudentService();
//# sourceMappingURL=student.service.js.map