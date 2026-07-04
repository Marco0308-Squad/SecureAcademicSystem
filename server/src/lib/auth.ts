import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { config } from '../config'
import argon2 from 'argon2'

export interface JwtPayload {
  userId: string
  email: string
  role: string
}

// Generate access token (short-lived)
export function generateAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    expiresIn: config.JWT_ACCESS_EXPIRY,
  } as jwt.SignOptions)
}

// Generate refresh token (long-lived)
export function generateRefreshToken(): string {
  return crypto.randomBytes(40).toString('hex')
}

// Verify access token
export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, config.JWT_ACCESS_SECRET) as JwtPayload
}

// Hash password using Argon2id (production-grade, memory-hard)
export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536,  // 64 MB
    timeCost: 3,
    parallelism: 4,
  })
}

// Verify password against Argon2id hash
export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    return await argon2.verify(hashedPassword, plainPassword)
  } catch {
    // Fall back to bcryptjs for backward compatibility
    const bcrypt = await import('bcryptjs')
    return bcrypt.compareSync(plainPassword, hashedPassword)
  }
}

// Generate password reset token
export function generatePasswordResetToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Generate email verification token
export function generateEmailVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Hash a token for secure storage (double hashing)
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex')
}
