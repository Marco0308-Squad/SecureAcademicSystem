import prisma from '../lib/prisma'
import { ConflictError, NotFoundError } from '../errors'

class AcademicService {
  async listDepartments() {
    return prisma.department.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { students: true, faculties: true, subjects: true },
        },
      },
    })
  }

  async createDepartment(input: { name: string; code: string }) {
    const existing = await prisma.department.findFirst({
      where: { OR: [{ name: input.name }, { code: input.code }] },
    })

    if (existing) {
      throw new ConflictError('Department with that name or code already exists')
    }

    return prisma.department.create({ data: input })
  }

  async updateDepartment(id: string, input: { name?: string; code?: string }) {
    const department = await prisma.department.findUnique({ where: { id } })
    if (!department) {
      throw new NotFoundError('Department')
    }

    return prisma.department.update({ where: { id }, data: input })
  }

  async listSemesters() {
    return prisma.semester.findMany({ orderBy: { number: 'asc' } })
  }

  async createSemester(input: {
    number: number
    name: string
    startDate: string
    endDate: string
    status?: string
  }) {
    const existing = await prisma.semester.findFirst({
      where: { number: input.number, name: input.name },
    })

    if (existing) {
      throw new ConflictError('Semester already exists')
    }

    return prisma.semester.create({
      data: {
        number: input.number,
        name: input.name,
        startDate: new Date(input.startDate),
        endDate: new Date(input.endDate),
        status: (input.status as any) ?? 'ACTIVE',
      },
    })
  }

  async updateSemester(id: string, input: Partial<{ number: number; name: string; startDate: string; endDate: string; status: string }>) {
    const semester = await prisma.semester.findUnique({ where: { id } })
    if (!semester) {
      throw new NotFoundError('Semester')
    }

    return prisma.semester.update({
      where: { id },
      data: {
        ...(input.number !== undefined ? { number: input.number } : {}),
        ...(input.name !== undefined ? { name: input.name } : {}),
        ...(input.startDate !== undefined ? { startDate: new Date(input.startDate) } : {}),
        ...(input.endDate !== undefined ? { endDate: new Date(input.endDate) } : {}),
        ...(input.status !== undefined ? { status: input.status as any } : {}),
      },
    })
  }
}

export default new AcademicService()
