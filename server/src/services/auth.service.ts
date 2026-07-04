import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  verifyPassword,
  generatePasswordResetToken,
} from '../lib/auth'
import userRepository from '../repositories/user.repository'
import refreshTokenRepository from '../repositories/refreshToken.repository'
import loginHistoryRepository from '../repositories/loginHistory.repository'
import {
  AuthenticationError,
  ConflictError,
  BadRequestError,
} from '../errors'
import prisma from '../lib/prisma'
import { config } from '../config'
import { UserRole, LoginStatus } from '@prisma/client'

export interface LoginResult {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
  }
}

class AuthService {
  async login(
    email: string,
    password: string,
    ipAddress: string,
    userAgent?: string
  ): Promise<LoginResult> {
    const user = await userRepository.findByEmail(email)

    try {
      if (!user) {
        throw new AuthenticationError('Invalid credentials')
      }

      // Check account lock
      const failedAttempts =
        await loginHistoryRepository.findRecentFailedAttempts(user.id)
      const maxAttempts = Number(config.MAX_LOGIN_ATTEMPTS || 5)

      if (failedAttempts >= maxAttempts) {
        await loginHistoryRepository.create({
          userId: user.id,
          ipAddress,
          userAgent,
          status: LoginStatus.LOCKED,
          reason: 'Too many failed login attempts',
        })
        throw new AuthenticationError(
          'Account locked due to too many failed attempts'
        )
      }

      const passwordValid = await verifyPassword(password, user.password)

      if (!passwordValid) {
        await loginHistoryRepository.create({
          userId: user.id,
          ipAddress,
          userAgent,
          status: LoginStatus.FAILED,
          reason: 'Invalid password',
        })
        throw new AuthenticationError('Invalid credentials')
      }

      if (user.status !== 'ACTIVE') {
        await loginHistoryRepository.create({
          userId: user.id,
          ipAddress,
          userAgent,
          status: LoginStatus.FAILED,
          reason: 'Account not active',
        })
        throw new AuthenticationError('Account is not active')
      }

      // Success!
      await loginHistoryRepository.create({
        userId: user.id,
        ipAddress,
        userAgent,
        status: LoginStatus.SUCCESS,
      })

      await userRepository.updateLastLogin(user.id)

      // Generate tokens
      const accessToken = generateAccessToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      })
      const refreshTokenValue = generateRefreshToken()

      // Calculate expires at for refresh token
      const refreshTokenExpiry = config.JWT_REFRESH_EXPIRY || '7d'
      let expiresInMs = 7 * 24 * 60 * 60 * 1000 // Default 7 days
      if (typeof refreshTokenExpiry === 'string' && refreshTokenExpiry.endsWith('d')) {
        const days = parseInt(refreshTokenExpiry, 10)
        expiresInMs = days * 24 * 60 * 60 * 1000
      } else if (typeof refreshTokenExpiry === 'string' && refreshTokenExpiry.endsWith('h')) {
        const hours = parseInt(refreshTokenExpiry, 10)
        expiresInMs = hours * 60 * 60 * 1000
      }
      const expiresAt = new Date(Date.now() + expiresInMs)

      // Store refresh token
      await refreshTokenRepository.create({
        userId: user.id,
        token: refreshTokenValue,
        expiresAt,
      })

      return {
        accessToken,
        refreshToken: refreshTokenValue,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      }
    } catch (error) {
      throw error
    }
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<LoginResult> {
    const existingUser = await userRepository.findByEmail(email)
    if (existingUser) {
      throw new ConflictError('Email already in use')
    }

    const hashedPassword = await hashPassword(password)

    const user = await userRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: UserRole.STUDENT,
    })

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })
    const refreshTokenValue = generateRefreshToken()

    await refreshTokenRepository.create({
      userId: user.id,
      token: refreshTokenValue,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    return {
      accessToken,
      refreshToken: refreshTokenValue,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    }
  }

  async refreshToken(refreshToken: string): Promise<{
    accessToken: string
    refreshToken: string
  }> {
    const storedToken = await refreshTokenRepository.findByToken(refreshToken)

    if (!storedToken || storedToken.isRevoked || storedToken.expiresAt < new Date()) {
      throw new AuthenticationError('Invalid refresh token')
    }

    // Revoke old token
    await refreshTokenRepository.revokeToken(refreshToken)

    const user = await userRepository.findById(storedToken.userId)
    if (!user) {
      throw new AuthenticationError('User not found')
    }

    // Generate new tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })
    const newRefreshToken = generateRefreshToken()

    await refreshTokenRepository.create({
      userId: user.id,
      token: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    return {
      accessToken,
      refreshToken: newRefreshToken,
    }
  }

  async logout(refreshToken: string): Promise<void> {
    try {
      await refreshTokenRepository.revokeToken(refreshToken)
    } catch {
      // Ignore errors, token might not exist
    }
  }

  async logoutAll(userId: string): Promise<void> {
    await refreshTokenRepository.revokeAllUserTokens(userId)
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await userRepository.findById(userId)
    if (!user) {
      throw new AuthenticationError('User not found')
    }

    const passwordValid = await verifyPassword(currentPassword, user.password)

    if (!passwordValid) {
      throw new AuthenticationError('Current password is incorrect')
    }

    const hashedPassword = await hashPassword(newPassword)
    await userRepository.updatePassword(userId, hashedPassword)

    // Revoke all tokens to force re-login
    await this.logoutAll(userId)
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await userRepository.findByEmail(email)
    if (!user) {
      // Don't reveal if user exists or not
      return
    }

    const token = generatePasswordResetToken()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    })

    // TODO: Send email with reset token
    console.log(`Password reset token for ${email}: ${token}`)
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token,
        isUsed: false,
        expiresAt: { gt: new Date() },
      },
    })

    if (!resetToken) {
      throw new BadRequestError('Invalid or expired reset token')
    }

    const hashedPassword = await hashPassword(newPassword)
    await userRepository.updatePassword(resetToken.userId, hashedPassword)

    // Mark token as used
    await prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { isUsed: true },
    })

    // Revoke all tokens
    await this.logoutAll(resetToken.userId)
  }
}

export default new AuthService()
