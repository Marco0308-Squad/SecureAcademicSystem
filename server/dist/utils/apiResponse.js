"use strict";
// API response formatting utilities for backend
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseFormatter = void 0;
class ApiResponseFormatter {
    static success(data, message = 'Success', status = 200) {
        return {
            success: true,
            status,
            message,
            data,
            errors: null,
            timestamp: new Date().toISOString(),
        };
    }
    static error(message, status = 500, errors) {
        return {
            success: false,
            status,
            message,
            data: undefined,
            errors: errors || null,
            timestamp: new Date().toISOString(),
        };
    }
    static paginated(data, total, page, limit, message = 'Success', status = 200) {
        return {
            success: true,
            status,
            message,
            data,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
            timestamp: new Date().toISOString(),
        };
    }
    static validationError(errors) {
        return {
            success: false,
            status: 422,
            message: 'Validation failed',
            data: undefined,
            errors,
            timestamp: new Date().toISOString(),
        };
    }
    static sendSuccess(res, data, message = 'Success', status = 200) {
        res.status(status).json(this.success(data, message, status));
    }
    static sendError(res, message, status = 500, errors) {
        res.status(status).json(this.error(message, status, errors));
    }
    static sendPaginated(res, data, total, page, limit, message = 'Success') {
        res.status(200).json(this.paginated(data, total, page, limit, message));
    }
    static sendValidationError(res, errors) {
        res.status(422).json(this.validationError(errors));
    }
}
exports.ApiResponseFormatter = ApiResponseFormatter;
exports.default = ApiResponseFormatter;
//# sourceMappingURL=apiResponse.js.map