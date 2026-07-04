import { Response } from 'express';
import { ApiResponse, PaginatedResponse } from '../types';
export declare class ApiResponseFormatter {
    static success<T>(data: T, message?: string, status?: number): ApiResponse<T>;
    static error(message: string, status?: number, errors?: Record<string, string[]>): ApiResponse;
    static paginated<T>(data: T[], total: number, page: number, limit: number, message?: string, status?: number): PaginatedResponse<T>;
    static validationError(errors: Record<string, string[]>): ApiResponse;
    static sendSuccess<T>(res: Response, data: T, message?: string, status?: number): void;
    static sendError(res: Response, message: string, status?: number, errors?: Record<string, string[]>): void;
    static sendPaginated<T>(res: Response, data: T[], total: number, page: number, limit: number, message?: string): void;
    static sendValidationError(res: Response, errors: Record<string, string[]>): void;
}
export default ApiResponseFormatter;
//# sourceMappingURL=apiResponse.d.ts.map