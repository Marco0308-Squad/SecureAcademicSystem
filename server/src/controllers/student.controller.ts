import { Request, Response, NextFunction } from 'express'
import studentService from '../services/student.service'
import { ApiResponseFormatter } from '../utils/apiResponse'
import { AuthRequest } from '../middleware/auth.middleware'

export const listStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page ?? 1)
    const limit = Number(req.query.limit ?? 20)
    const search = typeof req.query.search === 'string' ? req.query.search : undefined
    const status = typeof req.query.status === 'string' ? req.query.status : undefined

    const result = await studentService.listStudents({ page, limit, search, status })
    res.json(ApiResponseFormatter.paginated(result.data, result.total, result.page, result.limit, 'Students retrieved'))
  } catch (error) {
    next(error)
  }
}

export const getStudent = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const student = await studentService.getStudent(req.params.id)
    res.json(ApiResponseFormatter.success(student, 'Student retrieved'))
  } catch (error) {
    next(error)
  }
}

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await studentService.createStudent(req.body)
    res.status(201).json(ApiResponseFormatter.success(student, 'Student created'))
  } catch (error) {
    next(error)
  }
}

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await studentService.updateStudent(req.params.id, req.body)
    res.json(ApiResponseFormatter.success(student, 'Student updated'))
  } catch (error) {
    next(error)
  }
}

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await studentService.deleteStudent(req.params.id)
    res.json(ApiResponseFormatter.success(null, 'Student deleted'))
  } catch (error) {
    next(error)
  }
}
