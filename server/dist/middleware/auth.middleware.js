"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.authenticateJWT = void 0;
const errors_1 = require("../errors");
const auth_1 = require("../lib/auth");
const prisma_1 = __importDefault(require("../lib/prisma"));
const authenticateJWT = async (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader?.startsWith('Bearer ')) {
            throw new errors_1.AuthenticationError('Authentication token missing or invalid');
        }
        const token = authHeader.split(' ')[1];
        const decoded = (0, auth_1.verifyAccessToken)(token);
        const user = await prisma_1.default.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                role: true,
                status: true,
            },
        });
        if (!user) {
            throw new errors_1.AuthenticationError('User not found');
        }
        if (user.status !== 'ACTIVE') {
            throw new errors_1.AuthenticationError('User account is not active');
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authenticateJWT = authenticateJWT;
const requireRole = (roles) => {
    return (req, _res, next) => {
        if (!req.user) {
            throw new errors_1.AuthenticationError('Authentication required');
        }
        if (!roles.includes(req.user.role)) {
            throw new errors_1.AuthorizationError('Insufficient permissions');
        }
        next();
    };
};
exports.requireRole = requireRole;
//# sourceMappingURL=auth.middleware.js.map