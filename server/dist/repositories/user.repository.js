"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
const client_1 = require("@prisma/client");
class UserRepository {
    async findByEmail(email) {
        return prisma_1.default.user.findUnique({
            where: { email },
        });
    }
    async findById(id) {
        return prisma_1.default.user.findUnique({
            where: { id },
        });
    }
    async create(data) {
        return prisma_1.default.user.create({
            data: {
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                role: data.role || client_1.UserRole.STUDENT,
                status: data.status || client_1.UserStatus.ACTIVE,
            },
        });
    }
    async update(id, data) {
        return prisma_1.default.user.update({
            where: { id },
            data,
        });
    }
    async updatePassword(id, newPassword) {
        return prisma_1.default.user.update({
            where: { id },
            data: { password: newPassword },
        });
    }
    async updateLastLogin(id) {
        return prisma_1.default.user.update({
            where: { id },
            data: { lastLogin: new Date() },
        });
    }
}
exports.default = new UserRepository();
//# sourceMappingURL=user.repository.js.map