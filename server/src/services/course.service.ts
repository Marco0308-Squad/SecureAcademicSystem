import prisma from '../lib/prisma'
import { ConflictError, NotFoundError } from '../errors'

class CourseService {
  async listCourses() {
    return prisma.course.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        department: { select: { id: true, name: true, code: true } },
        semester: { select: { id: true, number: true, name: true } },
      },
    })
  }

  async createCourse(input: any) {
    const existing = await prisma.course.findUnique({ where: { code: input.code } })
    if (existing) {
      throw new ConflictError('Course code already exists')
    }

    return prisma.course.create({
      data: {
        code: input.code,
        name: input.name,
        departmentId: input.departmentId,
        semesterId: input.semesterId,
        totalCredits: input.totalCredits,
        description: input.description,
        syllabus: input.syllabus,
      },
      include: {
        department: { select: { id: true, name: true, code: true } },
        semester: { select: { id: true, number: true, name: true } },
      },
    })
  }

  async updateCourse(id: string, input: any) {
    const course = await prisma.course.findUnique({ where: { id } })
    if (!course) {
      throw new NotFoundError('Course')
    }

    return prisma.course.update({
      where: { id },
      data: {
        code: input.code,
        name: input.name,
        departmentId: input.departmentId,
        semesterId: input.semesterId,
        totalCredits: input.totalCredits,
        description: input.description,
        syllabus: input.syllabus,
      },
      include: {
        department: { select: { id: true, name: true, code: true } },
        semester: { select: { id: true, number: true, name: true } },
      },
    })
  }
}

export default new CourseService()
