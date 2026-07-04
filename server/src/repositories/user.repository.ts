import prisma from '../lib/prisma'
import { UserRole, UserStatus, type User } from '@prisma/client'

export interface CreateUserInput {
  email: string
  password: string
  firstName: string
  lastName: string
  role?: UserRole
  status?: UserStatus
}

export interface UpdateUserInput {
  firstName?: string
  lastName?: string
  phone?: string
  avatar?: string
}

class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    })
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    })
  }

  async create(data: CreateUserInput): Promise<User> {
    return prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role || UserRole.STUDENT,
        status: data.status || UserStatus.ACTIVE,
      },
    })
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    })
  }

  async updatePassword(id: string, newPassword: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { password: newPassword },
    })
  }

  async updateLastLogin(id: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { lastLogin: new Date() },
    })
  }
}

export default new UserRepository()
