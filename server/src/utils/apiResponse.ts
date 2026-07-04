// API response formatting utilities for backend

import { Response } from 'express'
import { ApiResponse, PaginatedResponse } from '../types'

export class ApiResponseFormatter {
  static success<T>(data: T, message: string = 'Success', status: number = 200): ApiResponse<T> {
    return {
      success: true,
      status,
      message,
      data,
      errors: null,
      timestamp: new Date().toISOString(),
    }
  }

  static error(message: string, status: number = 500, errors?: Record<string, string[]>): ApiResponse {
    return {
      success: false,
      status,
      message,
      data: undefined,
      errors: errors || null,
      timestamp: new Date().toISOString(),
    }
  }

  static paginated<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
    message: string = 'Success',
    status: number = 200
  ): PaginatedResponse<T> {
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
    }
  }

  static validationError(errors: Record<string, string[]>): ApiResponse {
    return {
      success: false,
      status: 422,
      message: 'Validation failed',
      data: undefined,
      errors,
      timestamp: new Date().toISOString(),
    }
  }

  static sendSuccess<T>(res: Response, data: T, message: string = 'Success', status: number = 200): void {
    res.status(status).json(this.success(data, message, status))
  }

  static sendError(res: Response, message: string, status: number = 500, errors?: Record<string, string[]>): void {
    res.status(status).json(this.error(message, status, errors))
  }

  static sendPaginated<T>(
    res: Response,
    data: T[],
    total: number,
    page: number,
    limit: number,
    message: string = 'Success'
  ): void {
    res.status(200).json(this.paginated(data, total, page, limit, message))
  }

  static sendValidationError(res: Response, errors: Record<string, string[]>): void {
    res.status(422).json(this.validationError(errors))
  }
}

export default ApiResponseFormatter
