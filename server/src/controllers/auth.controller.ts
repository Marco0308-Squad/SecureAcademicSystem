import { Request, Response, NextFunction } from 'express'
import authService from '../services/auth.service'
import { ApiResponseFormatter } from '../utils/apiResponse'
import { AuthRequest } from '../middleware/auth.middleware'

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const ipAddress =
      req.ip ||
      (req.headers['x-forwarded-for'] as string) ||
      'unknown'
    const userAgent = req.headers['user-agent']

    const result = await authService.login(
      email,
      password,
      ipAddress,
      userAgent
    )

    res.json(ApiResponseFormatter.success(result, 'Login successful'))
  } catch (error) {
    next(error)
  }
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, firstName, lastName } = req.body

    const result = await authService.register(
      email,
      password,
      firstName,
      lastName
    )

    res.status(201).json(
      ApiResponseFormatter.success(result, 'Registration successful')
    )
  } catch (error) {
    next(error)
  }
}

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body

    const result = await authService.refreshToken(refreshToken)

    res.json(ApiResponseFormatter.success(result, 'Token refreshed'))
  } catch (error) {
    next(error)
  }
}

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body
    await authService.logout(refreshToken)

    res.json(ApiResponseFormatter.success(null, 'Logout successful'))
  } catch (error) {
    next(error)
  }
}

export const changePassword = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id!
    const { currentPassword, newPassword } = req.body

    await authService.changePassword(userId, currentPassword, newPassword)

    res.json(
      ApiResponseFormatter.success(null, 'Password changed successfully')
    )
  } catch (error) {
    next(error)
  }
}

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body
    await authService.forgotPassword(email)

    res.json(
      ApiResponseFormatter.success(
        null,
        'If an account exists with that email, a reset link has been sent'
      )
    )
  } catch (error) {
    next(error)
  }
}

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, newPassword } = req.body

    await authService.resetPassword(token, newPassword)

    res.json(
      ApiResponseFormatter.success(null, 'Password reset successfully')
    )
  } catch (error) {
    next(error)
  }
}

export const getMe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user
    res.json(ApiResponseFormatter.success(user))
  } catch (error) {
    next(error)
  }
}
