export declare class ApiError extends Error {
    statusCode: number;
    errors?: Record<string, string[]> | undefined;
    constructor(statusCode: number, message: string, errors?: Record<string, string[]> | undefined);
}
export declare class ValidationError extends ApiError {
    constructor(message?: string, errors?: Record<string, string[]>);
}
export declare class AuthenticationError extends ApiError {
    constructor(message?: string);
}
export declare class AuthorizationError extends ApiError {
    constructor(message?: string);
}
export declare class NotFoundError extends ApiError {
    constructor(resource?: string);
}
export declare class ConflictError extends ApiError {
    constructor(message: string);
}
export declare class BadRequestError extends ApiError {
    constructor(message: string);
}
export declare class TooManyRequestsError extends ApiError {
    constructor(message?: string);
}
export declare class InternalServerError extends ApiError {
    constructor(message?: string);
}
//# sourceMappingURL=index.d.ts.map