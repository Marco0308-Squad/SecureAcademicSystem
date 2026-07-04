import prisma from '../lib/prisma'
import { hashPassword } from '../lib/auth'
import { ConflictError, NotFoundError } from '../errors'
import { UserRole } from '@prisma/client'

class FacultyService {
  async listFaculty() {
    return prisma.faculty.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, email: true, firstName: true, lastName: true, role: true, status: true },
        },
        department: { select: { id: true, name: true, code: true } },
      },
    })
  }

  async createFaculty(input: any) {
    const existingUser = await prisma.user.findUnique({ where: { email: input.email } })
    if (existingUser) {
      throw new ConflictError('Email already in use')
    }

    const existingEmployee = await prisma.faculty.findUnique({ where: { employeeId: input.employeeId } })
    if (existingEmployee) {
      throw new ConflictError('Employee ID already in use')
    }

    const hashedPassword = await hashPassword(input.password)

    return prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
          firstName: input.firstName,
          lastName: input.lastName,
          role: UserRole.FACULTY,
          status: 'ACTIVE',
        },
      })

      return tx.faculty.create({
        data: {
          userId: user.id,
          employeeId: input.employeeId,
          specialization: input.specialization,
          qualifications: input.qualifications ?? [],
          departmentId: input.departmentId,
          officePhone: input.officePhone,
          officeLocation: input.officeLocation,
          consultationHours: input.consultationHours,
          status: input.status ?? 'ACTIVE',
        },
        include: {
          user: {
            select: { id: true, email: true, firstName: true, lastName: true, role: true, status: true },
          },
          department: { select: { id: true, name: true, code: true } },
        },
      })
    })
  }

  async updateFaculty(id: string, input: any) {
    const faculty = await prisma.faculty.findUnique({ where: { id } })
    if (!faculty) {
      throw new NotFoundError('Faculty')
    }

    const updated = await prisma.faculty.update({
      where: { id },
      data: {
        employeeId: input.employeeId,
        specialization: input.specialization,
        qualifications: input.qualifications,
        departmentId: input.departmentId,
        officePhone: input.officePhone,
        officeLocation: input.officeLocation,
        consultationHours: input.consultationHours,
        status: input.status,
      },
      include: {
        user: {
          select: { id: true, email: true, firstName: true, lastName: true, role: true, status: true },
        },
        department: { select: { id: true, name: true, code: true } },
      },
    })

    if (input.firstName || input.lastName) {
      await prisma.user.update({
        where: { id: faculty.userId },
        data: {
          firstName: input.firstName ?? undefined,
          lastName: input.lastName ?? undefined,
        },
      })
    }

    return updated
  }
}

export default new FacultyService()
