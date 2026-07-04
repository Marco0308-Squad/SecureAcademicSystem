// Custom error classes for the application

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message)
    this.name = 'ApiError'
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends ApiError {
  constructor(message?: string, errors?: Record<string, string[]>) {
    super(422, message || 'Validation failed', errors)
    this.name = 'ValidationError'
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string = 'Authentication failed') {
    super(401, message)
    this.name = 'AuthenticationError'
  }
}

export class AuthorizationError extends ApiError {
  constructor(message: string = 'You do not have permission to access this resource') {
    super(403, message)
    this.name = 'AuthorizationError'
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string = 'Resource') {
    super(404, `${resource} not found`)
    this.name = 'NotFoundError'
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(409, message)
    this.name = 'ConflictError'
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(400, message)
    this.name = 'BadRequestError'
  }
}

export class TooManyRequestsError extends ApiError {
  constructor(message: string = 'Too many requests, please try again later') {
    super(429, message)
    this.name = 'TooManyRequestsError'
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = 'Internal server error') {
    super(500, message)
    this.name = 'InternalServerError'
  }
}
