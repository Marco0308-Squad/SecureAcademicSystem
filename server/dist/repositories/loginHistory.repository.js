"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
const client_1 = require("@prisma/client");
class LoginHistoryRepository {
    async create(data) {
        return prisma_1.default.loginHistory.create({
            data,
        });
    }
    async findRecentFailedAttempts(userId, windowMinutes = 30) {
        const since = new Date(Date.now() - windowMinutes * 60 * 1000);
        return prisma_1.default.loginHistory.count({
            where: {
                userId,
                status: client_1.LoginStatus.FAILED,
                createdAt: { gte: since },
            },
        });
    }
}
exports.default = new LoginHistoryRepository();
//# sourceMappingURL=loginHistory.repository.js.map