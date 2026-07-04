import prisma from '../lib/prisma'
import { ConflictError, NotFoundError } from '../errors'

class SubjectService {
  async listSubjects() {
    return prisma.subject.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        course: { select: { id: true, name: true, code: true } },
        department: { select: { id: true, name: true, code: true } },
        semester: { select: { id: true, number: true, name: true } },
        faculty: {
          include: {
            user: { select: { id: true, firstName: true, lastName: true, email: true } },
          },
        },
      },
    })
  }

  async createSubject(input: any) {
    const existing = await prisma.subject.findUnique({ where: { code: input.code } })
    if (existing) {
      throw new ConflictError('Subject code already exists')
    }

    return prisma.subject.create({
      data: {
        code: input.code,
        name: input.name,
        courseId: input.courseId,
        departmentId: input.departmentId,
        semesterId: input.semesterId,
        credits: input.credits,
        totalLectures: input.totalLectures,
        totalPracticals: input.totalPracticals,
        facultyId: input.facultyId,
      },
      include: {
        course: { select: { id: true, name: true, code: true } },
        department: { select: { id: true, name: true, code: true } },
        semester: { select: { id: true, number: true, name: true } },
        faculty: {
          include: {
            user: { select: { id: true, firstName: true, lastName: true, email: true } },
          },
        },
      },
    })
  }

  async updateSubject(id: string, input: any) {
    const subject = await prisma.subject.findUnique({ where: { id } })
    if (!subject) {
      throw new NotFoundError('Subject')
    }

    return prisma.subject.update({
      where: { id },
      data: {
        code: input.code,
        name: input.name,
        courseId: input.courseId,
        departmentId: input.departmentId,
        semesterId: input.semesterId,
        credits: input.credits,
        totalLectures: input.totalLectures,
        totalPracticals: input.totalPracticals,
        facultyId: input.facultyId,
      },
      include: {
        course: { select: { id: true, name: true, code: true } },
        department: { select: { id: true, name: true, code: true } },
        semester: { select: { id: true, number: true, name: true } },
        faculty: {
          include: {
            user: { select: { id: true, firstName: true, lastName: true, email: true } },
          },
        },
      },
    })
  }
}

export default new SubjectService()
