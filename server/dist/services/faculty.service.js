"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
const auth_1 = require("../lib/auth");
const errors_1 = require("../errors");
const client_1 = require("@prisma/client");
class FacultyService {
    async listFaculty() {
        return prisma_1.default.faculty.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: { id: true, email: true, firstName: true, lastName: true, role: true, status: true },
                },
                department: { select: { id: true, name: true, code: true } },
            },
        });
    }
    async createFaculty(input) {
        const existingUser = await prisma_1.default.user.findUnique({ where: { email: input.email } });
        if (existingUser) {
            throw new errors_1.ConflictError('Email already in use');
        }
        const existingEmployee = await prisma_1.default.faculty.findUnique({ where: { employeeId: input.employeeId } });
        if (existingEmployee) {
            throw new errors_1.ConflictError('Employee ID already in use');
        }
        const hashedPassword = await (0, auth_1.hashPassword)(input.password);
        return prisma_1.default.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email: input.email,
                    password: hashedPassword,
                    firstName: input.firstName,
                    lastName: input.lastName,
                    role: client_1.UserRole.FACULTY,
                    status: 'ACTIVE',
                },
            });
            return tx.faculty.create({
                data: {
                    userId: user.id,
                    employeeId: input.employeeId,
                    specialization: input.specialization,
                    qualifications: input.qualifications ?? [],
                    departmentId: input.departmentId,
                    officePhone: input.officePhone,
                    officeLocation: input.officeLocation,
                    consultationHours: input.consultationHours,
                    status: input.status ?? 'ACTIVE',
                },
                include: {
                    user: {
                        select: { id: true, email: true, firstName: true, lastName: true, role: true, status: true },
                    },
                    department: { select: { id: true, name: true, code: true } },
                },
            });
        });
    }
    async updateFaculty(id, input) {
        const faculty = await prisma_1.default.faculty.findUnique({ where: { id } });
        if (!faculty) {
            throw new errors_1.NotFoundError('Faculty');
        }
        const updated = await prisma_1.default.faculty.update({
            where: { id },
            data: {
                employeeId: input.employeeId,
                specialization: input.specialization,
                qualifications: input.qualifications,
                departmentId: input.departmentId,
                officePhone: input.officePhone,
                officeLocation: input.officeLocation,
                consultationHours: input.consultationHours,
                status: input.status,
            },
            include: {
                user: {
                    select: { id: true, email: true, firstName: true, lastName: true, role: true, status: true },
                },
                department: { select: { id: true, name: true, code: true } },
            },
        });
        if (input.firstName || input.lastName) {
            await prisma_1.default.user.update({
                where: { id: faculty.userId },
                data: {
                    firstName: input.firstName ?? undefined,
                    lastName: input.lastName ?? undefined,
                },
            });
        }
        return updated;
    }
}
exports.default = new FacultyService();
//# sourceMappingURL=faculty.service.js.map