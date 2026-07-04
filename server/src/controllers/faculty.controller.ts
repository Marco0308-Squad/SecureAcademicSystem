import { Request, Response, NextFunction } from 'express'
import facultyService from '../services/faculty.service'
import { ApiResponseFormatter } from '../utils/apiResponse'

export const listFaculty = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const faculty = await facultyService.listFaculty()
    res.json(ApiResponseFormatter.success(faculty, 'Faculty retrieved'))
  } catch (error) {
    next(error)
  }
}

export const createFaculty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const faculty = await facultyService.createFaculty(req.body)
    res.status(201).json(ApiResponseFormatter.success(faculty, 'Faculty created'))
  } catch (error) {
    next(error)
  }
}

export const updateFaculty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const faculty = await facultyService.updateFaculty(req.params.id, req.body)
    res.json(ApiResponseFormatter.success(faculty, 'Faculty updated'))
  } catch (error) {
    next(error)
  }
}
