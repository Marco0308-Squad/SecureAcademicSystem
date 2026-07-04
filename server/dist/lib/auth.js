"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.verifyAccessToken = verifyAccessToken;
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
exports.generatePasswordResetToken = generatePasswordResetToken;
exports.generateEmailVerificationToken = generateEmailVerificationToken;
exports.hashToken = hashToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("../config");
const argon2_1 = __importDefault(require("argon2"));
// Generate access token (short-lived)
function generateAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, config_1.config.JWT_ACCESS_SECRET, {
        expiresIn: config_1.config.JWT_ACCESS_EXPIRY,
    });
}
// Generate refresh token (long-lived)
function generateRefreshToken() {
    return crypto_1.default.randomBytes(40).toString('hex');
}
// Verify access token
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, config_1.config.JWT_ACCESS_SECRET);
}
// Hash password using Argon2id (production-grade, memory-hard)
async function hashPassword(password) {
    return argon2_1.default.hash(password, {
        type: argon2_1.default.argon2id,
        memoryCost: 65536, // 64 MB
        timeCost: 3,
        parallelism: 4,
    });
}
// Verify password against Argon2id hash
async function verifyPassword(plainPassword, hashedPassword) {
    try {
        return await argon2_1.default.verify(hashedPassword, plainPassword);
    }
    catch {
        // Fall back to bcryptjs for backward compatibility
        const bcrypt = await Promise.resolve().then(() => __importStar(require('bcryptjs')));
        return bcrypt.compareSync(plainPassword, hashedPassword);
    }
}
// Generate password reset token
function generatePasswordResetToken() {
    return crypto_1.default.randomBytes(32).toString('hex');
}
// Generate email verification token
function generateEmailVerificationToken() {
    return crypto_1.default.randomBytes(32).toString('hex');
}
// Hash a token for secure storage (double hashing)
function hashToken(token) {
    return crypto_1.default.createHash('sha256').update(token).digest('hex');
}
//# sourceMappingURL=auth.js.map