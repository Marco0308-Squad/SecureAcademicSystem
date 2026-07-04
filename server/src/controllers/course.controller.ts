import { Request, Response, NextFunction } from 'express'
import courseService from '../services/course.service'
import { ApiResponseFormatter } from '../utils/apiResponse'

export const listCourses = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await courseService.listCourses()
    res.json(ApiResponseFormatter.success(courses, 'Courses retrieved'))
  } catch (error) {
    next(error)
  }
}

export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await courseService.createCourse(req.body)
    res.status(201).json(ApiResponseFormatter.success(course, 'Course created'))
  } catch (error) {
    next(error)
  }
}

export const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await courseService.updateCourse(req.params.id, req.body)
    res.json(ApiResponseFormatter.success(course, 'Course updated'))
  } catch (error) {
    next(error)
  }
}
