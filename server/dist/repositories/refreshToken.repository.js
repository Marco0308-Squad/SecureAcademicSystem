"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
class RefreshTokenRepository {
    async create(data) {
        return prisma_1.default.refreshToken.create({
            data,
        });
    }
    async findByToken(token) {
        return prisma_1.default.refreshToken.findUnique({
            where: { token },
            include: { user: true },
        });
    }
    async revokeToken(token) {
        return prisma_1.default.refreshToken.update({
            where: { token },
            data: { isRevoked: true },
        });
    }
    async revokeAllUserTokens(userId) {
        return prisma_1.default.refreshToken.updateMany({
            where: { userId },
            data: { isRevoked: true },
        });
    }
    async deleteExpiredTokens() {
        return prisma_1.default.refreshToken.deleteMany({
            where: {
                expiresAt: { lt: new Date() },
            },
        });
    }
}
exports.default = new RefreshTokenRepository();
//# sourceMappingURL=refreshToken.repository.js.map