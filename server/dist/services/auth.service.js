"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../lib/auth");
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const refreshToken_repository_1 = __importDefault(require("../repositories/refreshToken.repository"));
const loginHistory_repository_1 = __importDefault(require("../repositories/loginHistory.repository"));
const errors_1 = require("../errors");
const prisma_1 = __importDefault(require("../lib/prisma"));
const config_1 = require("../config");
const client_1 = require("@prisma/client");
class AuthService {
    async login(email, password, ipAddress, userAgent) {
        const user = await user_repository_1.default.findByEmail(email);
        try {
            if (!user) {
                throw new errors_1.AuthenticationError('Invalid credentials');
            }
            // Check account lock
            const failedAttempts = await loginHistory_repository_1.default.findRecentFailedAttempts(user.id);
            const maxAttempts = Number(config_1.config.MAX_LOGIN_ATTEMPTS || 5);
            if (failedAttempts >= maxAttempts) {
                await loginHistory_repository_1.default.create({
                    userId: user.id,
                    ipAddress,
                    userAgent,
                    status: client_1.LoginStatus.LOCKED,
                    reason: 'Too many failed login attempts',
                });
                throw new errors_1.AuthenticationError('Account locked due to too many failed attempts');
            }
            const passwordValid = await (0, auth_1.verifyPassword)(password, user.password);
            if (!passwordValid) {
                await loginHistory_repository_1.default.create({
                    userId: user.id,
                    ipAddress,
                    userAgent,
                    status: client_1.LoginStatus.FAILED,
                    reason: 'Invalid password',
                });
                throw new errors_1.AuthenticationError('Invalid credentials');
            }
            if (user.status !== 'ACTIVE') {
                await loginHistory_repository_1.default.create({
                    userId: user.id,
                    ipAddress,
                    userAgent,
                    status: client_1.LoginStatus.FAILED,
                    reason: 'Account not active',
                });
                throw new errors_1.AuthenticationError('Account is not active');
            }
            // Success!
            await loginHistory_repository_1.default.create({
                userId: user.id,
                ipAddress,
                userAgent,
                status: client_1.LoginStatus.SUCCESS,
            });
            await user_repository_1.default.updateLastLogin(user.id);
            // Generate tokens
            const accessToken = (0, auth_1.generateAccessToken)({
                userId: user.id,
                email: user.email,
                role: user.role,
            });
            const refreshTokenValue = (0, auth_1.generateRefreshToken)();
            // Calculate expires at for refresh token
            const refreshTokenExpiry = config_1.config.JWT_REFRESH_EXPIRY || '7d';
            let expiresInMs = 7 * 24 * 60 * 60 * 1000; // Default 7 days
            if (typeof refreshTokenExpiry === 'string' && refreshTokenExpiry.endsWith('d')) {
                const days = parseInt(refreshTokenExpiry, 10);
                expiresInMs = days * 24 * 60 * 60 * 1000;
            }
            else if (typeof refreshTokenExpiry === 'string' && refreshTokenExpiry.endsWith('h')) {
                const hours = parseInt(refreshTokenExpiry, 10);
                expiresInMs = hours * 60 * 60 * 1000;
            }
            const expiresAt = new Date(Date.now() + expiresInMs);
            // Store refresh token
            await refreshToken_repository_1.default.create({
                userId: user.id,
                token: refreshTokenValue,
                expiresAt,
            });
            return {
                accessToken,
                refreshToken: refreshTokenValue,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                },
            };
        }
        catch (error) {
            throw error;
        }
    }
    async register(email, password, firstName, lastName) {
        const existingUser = await user_repository_1.default.findByEmail(email);
        if (existingUser) {
            throw new errors_1.ConflictError('Email already in use');
        }
        const hashedPassword = await (0, auth_1.hashPassword)(password);
        const user = await user_repository_1.default.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: client_1.UserRole.STUDENT,
        });
        // Generate tokens
        const accessToken = (0, auth_1.generateAccessToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        const refreshTokenValue = (0, auth_1.generateRefreshToken)();
        await refreshToken_repository_1.default.create({
            userId: user.id,
            token: refreshTokenValue,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        return {
            accessToken,
            refreshToken: refreshTokenValue,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
        };
    }
    async refreshToken(refreshToken) {
        const storedToken = await refreshToken_repository_1.default.findByToken(refreshToken);
        if (!storedToken || storedToken.isRevoked || storedToken.expiresAt < new Date()) {
            throw new errors_1.AuthenticationError('Invalid refresh token');
        }
        // Revoke old token
        await refreshToken_repository_1.default.revokeToken(refreshToken);
        const user = await user_repository_1.default.findById(storedToken.userId);
        if (!user) {
            throw new errors_1.AuthenticationError('User not found');
        }
        // Generate new tokens
        const accessToken = (0, auth_1.generateAccessToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        const newRefreshToken = (0, auth_1.generateRefreshToken)();
        await refreshToken_repository_1.default.create({
            userId: user.id,
            token: newRefreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        return {
            accessToken,
            refreshToken: newRefreshToken,
        };
    }
    async logout(refreshToken) {
        try {
            await refreshToken_repository_1.default.revokeToken(refreshToken);
        }
        catch {
            // Ignore errors, token might not exist
        }
    }
    async logoutAll(userId) {
        await refreshToken_repository_1.default.revokeAllUserTokens(userId);
    }
    async changePassword(userId, currentPassword, newPassword) {
        const user = await user_repository_1.default.findById(userId);
        if (!user) {
            throw new errors_1.AuthenticationError('User not found');
        }
        const passwordValid = await (0, auth_1.verifyPassword)(currentPassword, user.password);
        if (!passwordValid) {
            throw new errors_1.AuthenticationError('Current password is incorrect');
        }
        const hashedPassword = await (0, auth_1.hashPassword)(newPassword);
        await user_repository_1.default.updatePassword(userId, hashedPassword);
        // Revoke all tokens to force re-login
        await this.logoutAll(userId);
    }
    async forgotPassword(email) {
        const user = await user_repository_1.default.findByEmail(email);
        if (!user) {
            // Don't reveal if user exists or not
            return;
        }
        const token = (0, auth_1.generatePasswordResetToken)();
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        await prisma_1.default.passwordResetToken.create({
            data: {
                userId: user.id,
                token,
                expiresAt,
            },
        });
        // TODO: Send email with reset token
        console.log(`Password reset token for ${email}: ${token}`);
    }
    async resetPassword(token, newPassword) {
        const resetToken = await prisma_1.default.passwordResetToken.findFirst({
            where: {
                token,
                isUsed: false,
                expiresAt: { gt: new Date() },
            },
        });
        if (!resetToken) {
            throw new errors_1.BadRequestError('Invalid or expired reset token');
        }
        const hashedPassword = await (0, auth_1.hashPassword)(newPassword);
        await user_repository_1.default.updatePassword(resetToken.userId, hashedPassword);
        // Mark token as used
        await prisma_1.default.passwordResetToken.update({
            where: { id: resetToken.id },
            data: { isUsed: true },
        });
        // Revoke all tokens
        await this.logoutAll(resetToken.userId);
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map