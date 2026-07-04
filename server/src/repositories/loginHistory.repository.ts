import prisma from '../lib/prisma'
import { LoginStatus, type LoginHistory } from '@prisma/client'

export interface CreateLoginHistoryInput {
  userId: string
  ipAddress: string
  userAgent?: string | null
  status: LoginStatus
  reason?: string | null
}

class LoginHistoryRepository {
  async create(data: CreateLoginHistoryInput): Promise<LoginHistory> {
    return prisma.loginHistory.create({
      data,
    })
  }

  async findRecentFailedAttempts(
    userId: string,
    windowMinutes: number = 30
  ): Promise<number> {
    const since = new Date(Date.now() - windowMinutes * 60 * 1000)
    return prisma.loginHistory.count({
      where: {
        userId,
        status: LoginStatus.FAILED,
        createdAt: { gte: since },
      },
    })
  }
}

export default new LoginHistoryRepository()
