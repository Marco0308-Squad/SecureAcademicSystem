import prisma from '../lib/prisma'
import { hashPassword } from '../lib/auth'
import { ConflictError, NotFoundError } from '../errors'
import { UserRole } from '@prisma/client'

interface StudentListQuery {
  page: number
  limit: number
  search?: string
  status?: string
}

class StudentService {
  async listStudents(query: StudentListQuery) {
    const { page, limit, search, status } = query
    const skip = (page - 1) * limit

    const where = {
      OR: search
        ? [
            { user: { firstName: { contains: search, mode: 'insensitive' as const } } },
            { user: { lastName: { contains: search, mode: 'insensitive' as const } } },
            { rollNumber: { contains: search, mode: 'insensitive' as const } },
            { registrationNumber: { contains: search, mode: 'insensitive' as const } },
          ]
        : undefined,
      ...(status ? { status: status as any } : {}),
    }

    const [data, total] = await Promise.all([
      prisma.student.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, email: true, firstName: true, lastName: true, role: true, status: true },
          },
          department: { select: { id: true, name: true, code: true } },
          semester: { select: { id: true, number: true, name: true } },
        },
      }),
      prisma.student.count({ where }),
    ])

    return { data, total, page, limit }
  }

  async getStudent(id: string) {
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, email: true, firstName: true, lastName: true, role: true, status: true },
        },
        department: { select: { id: true, name: true, code: true } },
        semester: { select: { id: true, number: true, name: true } },
      },
    })

    if (!student) {
      throw new NotFoundError('Student')
    }

    return student
  }

  async createStudent(input: any) {
    const existingUser = await prisma.user.findUnique({ where: { email: input.email } })
    if (existingUser) {
      throw new ConflictError('Email already in use')
    }

    const existingRoll = await prisma.student.findUnique({ where: { rollNumber: input.rollNumber } })
    if (existingRoll) {
      throw new ConflictError('Roll number already in use')
    }

    const existingRegistration = await prisma.student.findUnique({
      where: { registrationNumber: input.registrationNumber },
    })
    if (existingRegistration) {
      throw new ConflictError('Registration number already in use')
    }

    const hashedPassword = await hashPassword(input.password)

    const student = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
          firstName: input.firstName,
          lastName: input.lastName,
          role: UserRole.STUDENT,
          status: 'ACTIVE',
        },
      })

      return tx.student.create({
        data: {
          userId: user.id,
          rollNumber: input.rollNumber,
          registrationNumber: input.registrationNumber,
          departmentId: input.departmentId,
          semesterId: input.semesterId,
          admissionDate: input.admissionDate ? new Date(input.admissionDate) : new Date(),
          status: input.status ?? 'ACTIVE',
        },
        include: {
          user: {
            select: { id: true, email: true, firstName: true, lastName: true, role: true, status: true },
          },
          department: { select: { id: true, name: true, code: true } },
          semester: { select: { id: true, number: true, name: true } },
        },
      })
    })

    return student
  }

  async updateStudent(id: string, input: any) {
    const student = await prisma.student.findUnique({ where: { id } })
    if (!student) {
      throw new NotFoundError('Student')
    }

    const updated = await prisma.student.update({
      where: { id },
      data: {
        rollNumber: input.rollNumber,
        registrationNumber: input.registrationNumber,
        departmentId: input.departmentId,
        semesterId: input.semesterId,
        status: input.status,
      },
      include: {
        user: {
          select: { id: true, email: true, firstName: true, lastName: true, role: true, status: true },
        },
        department: { select: { id: true, name: true, code: true } },
        semester: { select: { id: true, number: true, name: true } },
      },
    })

    if (input.firstName || input.lastName) {
      await prisma.user.update({
        where: { id: student.userId },
        data: {
          firstName: input.firstName ?? undefined,
          lastName: input.lastName ?? undefined,
        },
      })
    }

    return updated
  }

  async deleteStudent(id: string) {
    const student = await prisma.student.findUnique({ where: { id } })
    if (!student) {
      throw new NotFoundError('Student')
    }

    await prisma.user.delete({ where: { id: student.userId } })
  }
}

export default new StudentService()
