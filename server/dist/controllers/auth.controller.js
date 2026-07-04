"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.resetPassword = exports.forgotPassword = exports.changePassword = exports.logout = exports.refresh = exports.register = exports.login = void 0;
const auth_service_1 = __importDefault(require("../services/auth.service"));
const apiResponse_1 = require("../utils/apiResponse");
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const ipAddress = req.ip ||
            req.headers['x-forwarded-for'] ||
            'unknown';
        const userAgent = req.headers['user-agent'];
        const result = await auth_service_1.default.login(email, password, ipAddress, userAgent);
        res.json(apiResponse_1.ApiResponseFormatter.success(result, 'Login successful'));
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const register = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const result = await auth_service_1.default.register(email, password, firstName, lastName);
        res.status(201).json(apiResponse_1.ApiResponseFormatter.success(result, 'Registration successful'));
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        const result = await auth_service_1.default.refreshToken(refreshToken);
        res.json(apiResponse_1.ApiResponseFormatter.success(result, 'Token refreshed'));
    }
    catch (error) {
        next(error);
    }
};
exports.refresh = refresh;
const logout = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        await auth_service_1.default.logout(refreshToken);
        res.json(apiResponse_1.ApiResponseFormatter.success(null, 'Logout successful'));
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
const changePassword = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const { currentPassword, newPassword } = req.body;
        await auth_service_1.default.changePassword(userId, currentPassword, newPassword);
        res.json(apiResponse_1.ApiResponseFormatter.success(null, 'Password changed successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.changePassword = changePassword;
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        await auth_service_1.default.forgotPassword(email);
        res.json(apiResponse_1.ApiResponseFormatter.success(null, 'If an account exists with that email, a reset link has been sent'));
    }
    catch (error) {
        next(error);
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res, next) => {
    try {
        const { token, newPassword } = req.body;
        await auth_service_1.default.resetPassword(token, newPassword);
        res.json(apiResponse_1.ApiResponseFormatter.success(null, 'Password reset successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.resetPassword = resetPassword;
const getMe = async (req, res, next) => {
    try {
        const user = req.user;
        res.json(apiResponse_1.ApiResponseFormatter.success(user));
    }
    catch (error) {
        next(error);
    }
};
exports.getMe = getMe;
//# sourceMappingURL=auth.controller.js.map