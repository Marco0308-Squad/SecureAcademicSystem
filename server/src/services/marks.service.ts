import prisma from '../lib/prisma'
import { ConflictError, NotFoundError } from '../errors'

class MarksService {
  async listMarks() {
    return prisma.internalMark.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        student: {
          include: {
            user: { select: { id: true, firstName: true, lastName: true, email: true } },
          },
        },
        subject: { select: { id: true, code: true, name: true } },
      },
    })
  }

  async createMarks(input: any) {
    const existing = await prisma.internalMark.findFirst({
      where: {
        studentId: input.studentId,
        subjectId: input.subjectId,
      },
    })

    if (existing) {
      throw new ConflictError('Marks for this student and subject already exist')
    }

    const totalMarks = [input.test1, input.test2, input.test3, input.assignment]
      .filter((value: number | null | undefined): value is number => value != null)
      .reduce((sum: number, value: number) => sum + value, 0)

    const outOfMarks = input.outOfMarks ?? 100
    const percentage = outOfMarks > 0 ? (totalMarks / outOfMarks) * 100 : 0

    return prisma.internalMark.create({
      data: {
        studentId: input.studentId,
        subjectId: input.subjectId,
        test1: input.test1,
        test2: input.test2,
        test3: input.test3,
        assignment: input.assignment,
        totalMarks,
        outOfMarks,
        percentage,
      },
      include: {
        student: {
          include: {
            user: { select: { id: true, firstName: true, lastName: true, email: true } },
          },
        },
        subject: { select: { id: true, code: true, name: true } },
      },
    })
  }

  async updateMarks(id: string, input: any) {
    const record = await prisma.internalMark.findUnique({ where: { id } })
    if (!record) {
      throw new NotFoundError('Marks record')
    }

    const nextData = {
      studentId: input.studentId,
      subjectId: input.subjectId,
      test1: input.test1,
      test2: input.test2,
      test3: input.test3,
      assignment: input.assignment,
      outOfMarks: input.outOfMarks,
    }

    const current = {
      test1: record.test1 ?? 0,
      test2: record.test2 ?? 0,
      test3: record.test3 ?? 0,
      assignment: record.assignment ?? 0,
    }

    const updated = {
      ...current,
      ...Object.fromEntries(Object.entries(nextData).filter(([, value]) => value !== undefined)),
    } as {
      test1?: number | null
      test2?: number | null
      test3?: number | null
      assignment?: number | null
      outOfMarks?: number | null
    }

    const totalMarks = [updated.test1, updated.test2, updated.test3, updated.assignment]
      .filter((value: number | null | undefined): value is number => value != null)
      .reduce((sum: number, value: number) => sum + value, 0)

    const outOfMarks = updated.outOfMarks ?? record.outOfMarks ?? 100
    const percentage = outOfMarks > 0 ? (totalMarks / outOfMarks) * 100 : 0

    return prisma.internalMark.update({
      where: { id },
      data: {
        ...nextData,
        totalMarks,
        outOfMarks,
        percentage,
      },
      include: {
        student: {
          include: {
            user: { select: { id: true, firstName: true, lastName: true, email: true } },
          },
        },
        subject: { select: { id: true, code: true, name: true } },
      },
    })
  }
}

export default new MarksService()
