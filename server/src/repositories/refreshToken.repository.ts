import prisma from '../lib/prisma'

export interface CreateRefreshTokenInput {
  userId: string
  token: string
  expiresAt: Date
}

class RefreshTokenRepository {
  async create(data: CreateRefreshTokenInput): Promise<any> {
    return prisma.refreshToken.create({
      data,
    })
  }

  async findByToken(token: string): Promise<any> {
    return prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    })
  }

  async revokeToken(token: string): Promise<any> {
    return prisma.refreshToken.update({
      where: { token },
      data: { isRevoked: true },
    })
  }

  async revokeAllUserTokens(userId: string): Promise<any> {
    return prisma.refreshToken.updateMany({
      where: { userId },
      data: { isRevoked: true },
    })
  }

  async deleteExpiredTokens(): Promise<any> {
    return prisma.refreshToken.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    })
  }
}

export default new RefreshTokenRepository()
