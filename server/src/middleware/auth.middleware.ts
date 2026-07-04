import { Request, Response, NextFunction } from 'express'
import { AuthenticationError, AuthorizationError } from '../errors'
import { verifyAccessToken } from '../lib/auth'
import prisma from '../lib/prisma'

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    role: string
    status: string
  }
}

export const authenticateJWT = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader?.startsWith('Bearer ')) {
      throw new AuthenticationError('Authentication token missing or invalid')
    }

    const token = authHeader.split(' ')[1]

    const decoded = verifyAccessToken(token)

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
      },
    })

    if (!user) {
      throw new AuthenticationError('User not found')
    }

    if (user.status !== 'ACTIVE') {
      throw new AuthenticationError('User account is not active')
    }

    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AuthenticationError('Authentication required')
    }

    if (!roles.includes(req.user.role)) {
      throw new AuthorizationError('Insufficient permissions')
    }
    next()
  }
}
