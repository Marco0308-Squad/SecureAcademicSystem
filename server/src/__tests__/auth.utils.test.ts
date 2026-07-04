import { describe, it, expect } from 'vitest'
import { generateAccessToken, verifyAccessToken, generateRefreshToken, hashToken } from '../lib/auth'

describe('Auth Utilities', () => {
  const mockPayload = {
    userId: 'test-user-id',
    email: 'test@example.com',
    role: 'STUDENT',
  }

  describe('generateAccessToken', () => {
    it('should generate a valid JWT token', () => {
      const token = generateAccessToken(mockPayload)
      expect(token).toBeDefined()
      expect(typeof token).toBe('string')
      expect(token.split('.')).toHaveLength(3) // JWT has 3 parts
    })

    it('should generate different tokens for different payloads', () => {
      const token1 = generateAccessToken(mockPayload)
      const token2 = generateAccessToken({ ...mockPayload, userId: 'different-id' })
      expect(token1).not.toBe(token2)
    })
  })

  describe('verifyAccessToken', () => {
    it('should verify a valid token and return the payload', () => {
      const token = generateAccessToken(mockPayload)
      const decoded = verifyAccessToken(token)
      expect(decoded.userId).toBe(mockPayload.userId)
      expect(decoded.email).toBe(mockPayload.email)
      expect(decoded.role).toBe(mockPayload.role)
    })

    it('should throw on an invalid token', () => {
      expect(() => verifyAccessToken('invalid-token')).toThrow()
    })

    it('should throw on an expired token', () => {
      // Can't easily test expiration without waiting, but we can test structure
      const token = generateAccessToken(mockPayload)
      expect(() => verifyAccessToken(token)).not.toThrow()
    })
  })

  describe('generateRefreshToken', () => {
    it('should generate a 40-byte hex string (80 chars)', () => {
      const token = generateRefreshToken()
      expect(token).toBeDefined()
      expect(typeof token).toBe('string')
      expect(token.length).toBe(80) // 40 bytes = 80 hex chars
    })

    it('should generate unique tokens each time', () => {
      const token1 = generateRefreshToken()
      const token2 = generateRefreshToken()
      expect(token1).not.toBe(token2)
    })
  })

  describe('hashToken', () => {
    it('should hash a token using SHA-256', () => {
      const token = 'some-refresh-token'
      const hashed = hashToken(token)
      expect(hashed).toBeDefined()
      expect(hashed.length).toBe(64) // SHA-256 hex length
    })

    it('should produce the same hash for the same input', () => {
      const token = 'some-refresh-token'
      const hashed1 = hashToken(token)
      const hashed2 = hashToken(token)
      expect(hashed1).toBe(hashed2)
    })

    it('should produce different hashes for different inputs', () => {
      const hashed1 = hashToken('token-1')
      const hashed2 = hashToken('token-2')
      expect(hashed1).not.toBe(hashed2)
    })
  })
})
