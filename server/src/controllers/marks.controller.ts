import { Request, Response, NextFunction } from 'express'
import marksService from '../services/marks.service'
import { ApiResponseFormatter } from '../utils/apiResponse'

export const listMarks = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const marks = await marksService.listMarks()
    res.json(ApiResponseFormatter.success(marks, 'Marks retrieved'))
  } catch (error) {
    next(error)
  }
}

export const createMarks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const marks = await marksService.createMarks(req.body)
    res.status(201).json(ApiResponseFormatter.success(marks, 'Marks recorded'))
  } catch (error) {
    next(error)
  }
}

export const updateMarks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const marks = await marksService.updateMarks(req.params.id, req.body)
    res.json(ApiResponseFormatter.success(marks, 'Marks updated'))
  } catch (error) {
    next(error)
  }
}
