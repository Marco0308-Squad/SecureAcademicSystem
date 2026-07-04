"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']).default('development'),
    PORT: zod_1.z.coerce.number().min(1).max(65535).default(5000),
    DATABASE_URL: zod_1.z.string().url(),
    DB_USER: zod_1.z.string().min(1),
    DB_PASSWORD: zod_1.z.string().min(1),
    DB_HOST: zod_1.z.string().min(1),
    DB_PORT: zod_1.z.coerce.number().min(1).max(65535),
    DB_NAME: zod_1.z.string().min(1),
    JWT_SECRET: zod_1.z.string().min(32),
    JWT_ACCESS_SECRET: zod_1.z.string().min(32).optional(),
    JWT_REFRESH_SECRET: zod_1.z.string().min(32),
    JWT_EXPIRY: zod_1.z.string().min(1).optional(),
    JWT_ACCESS_EXPIRY: zod_1.z.string().min(1).optional(),
    JWT_REFRESH_EXPIRY: zod_1.z.string().min(1),
    CORS_ORIGIN: zod_1.z.string().url(),
    LOG_LEVEL: zod_1.z.enum(['error', 'warn', 'info', 'debug']).default('info'),
    REDIS_HOST: zod_1.z.string().min(1),
    REDIS_PORT: zod_1.z.coerce.number().min(1).max(65535),
    RATE_LIMIT_WINDOW_MS: zod_1.z.coerce.number().min(1000),
    RATE_LIMIT_MAX_REQUESTS: zod_1.z.coerce.number().min(1),
    BCRYPT_ROUNDS: zod_1.z.coerce.number().min(10).max(20).default(12),
    MAX_LOGIN_ATTEMPTS: zod_1.z.coerce.number().min(1).default(5),
    LOCK_TIME: zod_1.z.string().min(1).default('30m'),
    SMTP_HOST: zod_1.z.string().optional(),
    SMTP_PORT: zod_1.z.coerce.number().optional(),
    SMTP_USER: zod_1.z.string().optional(),
    SMTP_PASSWORD: zod_1.z.string().optional(),
    SMTP_FROM: zod_1.z.string().email().optional(),
});
const rawEnv = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://sams_user:sams_password_change_me@postgres:5432/sams_db',
    DB_USER: process.env.DB_USER || 'sams_user',
    DB_PASSWORD: process.env.DB_PASSWORD || 'sams_password_change_me',
    DB_HOST: process.env.DB_HOST || 'postgres',
    DB_PORT: process.env.DB_PORT || '5432',
    DB_NAME: process.env.DB_NAME || 'sams_db',
    JWT_SECRET: process.env.JWT_SECRET || 'your-jwt-secret-key-change-in-production-32chars-min',
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'your-jwt-refresh-secret-key-change-in-production-32chars-min',
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY,
    JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || '7d',
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    REDIS_HOST: process.env.REDIS_HOST || 'redis',
    REDIS_PORT: process.env.REDIS_PORT || '6379',
    RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS || '900000',
    RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS || '100',
    BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS,
    MAX_LOGIN_ATTEMPTS: process.env.MAX_LOGIN_ATTEMPTS,
    LOCK_TIME: process.env.LOCK_TIME,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_FROM: process.env.SMTP_FROM,
};
const validatedEnv = envSchema.safeParse(rawEnv);
if (!validatedEnv.success) {
    console.error('❌ Invalid environment variables:');
    console.error(validatedEnv.error.format());
    process.exit(1);
}
// Compute final config
const finalConfig = {
    ...validatedEnv.data,
    // Use JWT_SECRET as fallback for JWT_ACCESS_SECRET
    JWT_ACCESS_SECRET: validatedEnv.data.JWT_ACCESS_SECRET || validatedEnv.data.JWT_SECRET,
    JWT_ACCESS_EXPIRY: validatedEnv.data.JWT_ACCESS_EXPIRY || validatedEnv.data.JWT_EXPIRY || '15m',
};
exports.config = finalConfig;
//# sourceMappingURL=index.js.map