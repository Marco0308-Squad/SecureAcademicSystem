import { Response, NextFunction } from 'express'
import { AuthorizationError, AuthenticationError } from '../errors'
import { hasPermission, Permission, RoleName } from '../lib/permissions'
import { AuthRequest } from './auth.middleware'

export const requirePermission = (permission: Permission) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AuthenticationError('Authentication required')
    }

    const role = req.user.role as RoleName

    if (!hasPermission(role, permission)) {
      throw new AuthorizationError('Insufficient permissions')
    }

    next()
  }
}
