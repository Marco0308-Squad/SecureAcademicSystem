import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { ValidationError } from '../errors'

export function validateRequest(schema: z.ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body)
      if (!result.success) {
        const errors: Record<string, string[]> = {}
        for (const issue of result.error.issues) {
          const field = issue.path.join('.')
          if (!errors[field]) errors[field] = []
          errors[field].push(issue.message)
        }
        throw new ValidationError('Invalid request data', errors)
      }
      // Replace req.body with validated data
      req.body = result.data
      next()
    } catch (error) {
      next(error)
    }
  }
}
