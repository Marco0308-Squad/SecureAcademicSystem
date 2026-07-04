import prisma from '../lib/prisma'
import { ConflictError, NotFoundError } from '../errors'

class AssignmentService {
  async listAssignments() {
    return prisma.assignment.findMany({
      orderBy: { dueDate: 'asc' },
      include: {
        subject: { select: { id: true, code: true, name: true } },
        faculty: {
          include: {
            user: { select: { id: true, firstName: true, lastName: true, email: true } },
          },
        },
      },
    })
  }

  async createAssignment(input: any) {
    const existing = await prisma.assignment.findFirst({
      where: {
        subjectId: input.subjectId,
        title: input.title,
      },
    })

    if (existing) {
      throw new ConflictError('Assignment title already exists for this subject')
    }

    return prisma.assignment.create({
      data: {
        subjectId: input.subjectId,
        facultyId: input.facultyId,
        title: input.title,
        description: input.description,
        totalMarks: input.totalMarks ?? 10,
        dueDate: new Date(input.dueDate),
      },
      include: {
        subject: { select: { id: true, code: true, name: true } },
        faculty: {
          include: {
            user: { select: { id: true, firstName: true, lastName: true, email: true } },
          },
        },
      },
    })
  }

  async updateAssignment(id: string, input: any) {
    const assignment = await prisma.assignment.findUnique({ where: { id } })
    if (!assignment) {
      throw new NotFoundError('Assignment')
    }

    return prisma.assignment.update({
      where: { id },
      data: {
        subjectId: input.subjectId,
        facultyId: input.facultyId,
        title: input.title,
        description: input.description,
        totalMarks: input.totalMarks,
        dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
      },
      include: {
        subject: { select: { id: true, code: true, name: true } },
        faculty: {
          include: {
            user: { select: { id: true, firstName: true, lastName: true, email: true } },
          },
        },
      },
    })
  }
}

export default new AssignmentService()
