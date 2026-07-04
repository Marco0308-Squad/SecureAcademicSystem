import { Request, Response, NextFunction } from 'express'
import attendanceService from '../services/attendance.service'
import { ApiResponseFormatter } from '../utils/apiResponse'

export const listAttendance = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const attendance = await attendanceService.listAttendance()
    res.json(ApiResponseFormatter.success(attendance, 'Attendance retrieved'))
  } catch (error) {
    next(error)
  }
}

export const createAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const attendance = await attendanceService.createAttendance(req.body)
    res.status(201).json(ApiResponseFormatter.success(attendance, 'Attendance recorded'))
  } catch (error) {
    next(error)
  }
}

export const updateAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const attendance = await attendanceService.updateAttendance(req.params.id, req.body)
    res.json(ApiResponseFormatter.success(attendance, 'Attendance updated'))
  } catch (error) {
    next(error)
  }
}
