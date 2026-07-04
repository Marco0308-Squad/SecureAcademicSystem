import prisma from '../lib/prisma'
import logger from '../lib/logger'

export type AuditStatusEnum = 'SUCCESS' | 'FAILURE' | 'UNAUTHORIZED'

export interface AuditLogInput {
  userId: string
  action: string
  module: string
  entity: string
  entityId?: string
  changes?: Record<string, unknown>
  ipAddress?: string
  userAgent?: string
  status?: AuditStatusEnum
}

class AuditService {
  async log(input: AuditLogInput): Promise<void> {
    try {
      const data: any = {
        userId: input.userId,
        action: input.action,
        module: input.module,
        entity: input.entity,
        entityId: input.entityId,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
        status: input.status || 'SUCCESS',
      }
      if (input.changes) {
        data.changes = JSON.parse(JSON.stringify(input.changes))
      }
      await prisma.auditLog.create({ data })
    } catch (error) {
      // Audit logging failure should never break the main operation
      logger.error('Failed to write audit log', {
        error,
        input,
      })
    }
  }

  async findByUser(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit
    const [data, total] = await Promise.all([
      prisma.auditLog.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          user: {
            select: { id: true, email: true, firstName: true, lastName: true, role: true },
          },
        },
      }),
      prisma.auditLog.count({ where: { userId } }),
    ])
    return { data, total, page, limit }
  }

  async findByModule(module: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit
    const [data, total] = await Promise.all([
      prisma.auditLog.findMany({
        where: { module },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          user: {
            select: { id: true, email: true, firstName: true, lastName: true, role: true },
          },
        },
      }),
      prisma.auditLog.count({ where: { module } }),
    ])
    return { data, total, page, limit }
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit
    const [data, total] = await Promise.all([
      prisma.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          user: {
            select: { id: true, email: true, firstName: true, lastName: true, role: true },
          },
        },
      }),
      prisma.auditLog.count(),
    ])
    return { data, total, page, limit }
  }
}

export default new AuditService()
