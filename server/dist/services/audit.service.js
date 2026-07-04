"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
const logger_1 = __importDefault(require("../lib/logger"));
class AuditService {
    async log(input) {
        try {
            const data = {
                userId: input.userId,
                action: input.action,
                module: input.module,
                entity: input.entity,
                entityId: input.entityId,
                ipAddress: input.ipAddress,
                userAgent: input.userAgent,
                status: input.status || 'SUCCESS',
            };
            if (input.changes) {
                data.changes = JSON.parse(JSON.stringify(input.changes));
            }
            await prisma_1.default.auditLog.create({ data });
        }
        catch (error) {
            // Audit logging failure should never break the main operation
            logger_1.default.error('Failed to write audit log', {
                error,
                input,
            });
        }
    }
    async findByUser(userId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            prisma_1.default.auditLog.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: {
                    user: {
                        select: { id: true, email: true, firstName: true, lastName: true, role: true },
                    },
                },
            }),
            prisma_1.default.auditLog.count({ where: { userId } }),
        ]);
        return { data, total, page, limit };
    }
    async findByModule(module, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            prisma_1.default.auditLog.findMany({
                where: { module },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: {
                    user: {
                        select: { id: true, email: true, firstName: true, lastName: true, role: true },
                    },
                },
            }),
            prisma_1.default.auditLog.count({ where: { module } }),
        ]);
        return { data, total, page, limit };
    }
    async findAll(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            prisma_1.default.auditLog.findMany({
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: {
                    user: {
                        select: { id: true, email: true, firstName: true, lastName: true, role: true },
                    },
                },
            }),
            prisma_1.default.auditLog.count(),
        ]);
        return { data, total, page, limit };
    }
}
exports.default = new AuditService();
//# sourceMappingURL=audit.service.js.map