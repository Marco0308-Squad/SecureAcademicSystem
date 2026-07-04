import { Request, Response, NextFunction } from 'express'
import subjectService from '../services/subject.service'
import { ApiResponseFormatter } from '../utils/apiResponse'

export const listSubjects = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const subjects = await subjectService.listSubjects()
    res.json(ApiResponseFormatter.success(subjects, 'Subjects retrieved'))
  } catch (error) {
    next(error)
  }
}

export const createSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subject = await subjectService.createSubject(req.body)
    res.status(201).json(ApiResponseFormatter.success(subject, 'Subject created'))
  } catch (error) {
    next(error)
  }
}

export const updateSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subject = await subjectService.updateSubject(req.params.id, req.body)
    res.json(ApiResponseFormatter.success(subject, 'Subject updated'))
  } catch (error) {
    next(error)
  }
}
