import prisma from '../lib/prisma'
import { ConflictError, NotFoundError } from '../errors'

class AttendanceService {
  async listAttendance() {
    return prisma.attendance.findMany({
      orderBy: { date: 'desc' },
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

  async createAttendance(input: any) {
    const existing = await prisma.attendance.findFirst({
      where: {
        studentId: input.studentId,
        subjectId: input.subjectId,
        date: new Date(input.date),
      },
    })

    if (existing) {
      throw new ConflictError('Attendance for this student and subject on that date already exists')
    }

    return prisma.attendance.create({
      data: {
        studentId: input.studentId,
        subjectId: input.subjectId,
        date: new Date(input.date),
        status: input.status,
        remarks: input.remarks,
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

  async updateAttendance(id: string, input: any) {
    const record = await prisma.attendance.findUnique({ where: { id } })
    if (!record) {
      throw new NotFoundError('Attendance record')
    }

    return prisma.attendance.update({
      where: { id },
      data: {
        studentId: input.studentId,
        subjectId: input.subjectId,
        date: input.date ? new Date(input.date) : undefined,
        status: input.status,
        remarks: input.remarks,
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

export default new AttendanceService()
