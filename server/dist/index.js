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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const config_1 = require("./config");
const apiResponse_1 = require("./utils/apiResponse");
const prisma_1 = __importDefault(require("./lib/prisma"));
const logger_1 = __importStar(require("./lib/logger"));
const errors_1 = require("./errors");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const academic_routes_1 = __importDefault(require("./routes/academic.routes"));
const faculty_routes_1 = __importDefault(require("./routes/faculty.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const subject_routes_1 = __importDefault(require("./routes/subject.routes"));
const attendance_routes_1 = __importDefault(require("./routes/attendance.routes"));
const marks_routes_1 = __importDefault(require("./routes/marks.routes"));
const assignment_routes_1 = __importDefault(require("./routes/assignment.routes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: config_1.config.CORS_ORIGIN,
    credentials: true,
}));
app.use((0, morgan_1.default)('combined', { stream: logger_1.morganStream }));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: Number(config_1.config.RATE_LIMIT_WINDOW_MS),
    max: Number(config_1.config.RATE_LIMIT_MAX_REQUESTS),
    message: 'Too many requests, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', limiter);
// Auth routes with stricter rate limit
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/v1/auth', authLimiter, auth_routes_1.default);
app.use('/api/v1/students', student_routes_1.default);
app.use('/api/v1/academics', academic_routes_1.default);
app.use('/api/v1/faculty', faculty_routes_1.default);
app.use('/api/v1/courses', course_routes_1.default);
app.use('/api/v1/subjects', subject_routes_1.default);
app.use('/api/v1/attendance', attendance_routes_1.default);
app.use('/api/v1/marks', marks_routes_1.default);
app.use('/api/v1/assignments', assignment_routes_1.default);
// Health check endpoint
app.get('/api/v1/health', async (_req, res) => {
    let dbStatus = 'unknown';
    let redisStatus = 'unknown';
    try {
        await prisma_1.default.$queryRaw `SELECT 1`;
        dbStatus = 'healthy';
    }
    catch {
        dbStatus = 'unhealthy';
    }
    res.json(apiResponse_1.ApiResponseFormatter.success({
        status: 'OK',
        timestamp: new Date(),
        services: {
            database: dbStatus,
            redis: redisStatus,
        },
    }));
});
// 404 handler
app.use((_req, res) => {
    res.status(404).json(apiResponse_1.ApiResponseFormatter.error('Route not found', 404));
});
// Centralized error handler
app.use((err, _req, res, _next) => {
    logger_1.default.error('Unhandled error', {
        error: err.message,
        stack: err.stack,
        statusCode: err.statusCode || 500,
    });
    let statusCode = 500;
    let message = 'Internal server error';
    let errors = undefined;
    if (err instanceof errors_1.ApiError) {
        statusCode = err.statusCode;
        message = err.message;
        errors = err.errors;
    }
    else if (err instanceof errors_1.ValidationError) {
        statusCode = 400;
        message = err.message;
        errors = err.errors;
    }
    else if (err instanceof errors_1.AuthenticationError) {
        statusCode = 401;
        message = err.message;
    }
    res
        .status(statusCode)
        .json(apiResponse_1.ApiResponseFormatter.error(message, statusCode, errors));
});
const PORT = config_1.config.PORT;
const server = app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📊 Environment: ${config_1.config.NODE_ENV}`);
});
// Graceful shutdown
const gracefulShutdown = async () => {
    console.log('Shutting down gracefully...');
    server.close(async () => {
        console.log('Server closed');
        await prisma_1.default.$disconnect();
        console.log('Prisma disconnected');
        process.exit(0);
    });
};
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
exports.default = app;
//# sourceMappingURL=index.js.map