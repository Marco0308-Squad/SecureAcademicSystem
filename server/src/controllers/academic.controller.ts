import { Request, Response, NextFunction } from 'express'
import academicService from '../services/academic.service'
import { ApiResponseFormatter } from '../utils/apiResponse'

export const listDepartments = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const departments = await academicService.listDepartments()
    res.json(ApiResponseFormatter.success(departments, 'Departments retrieved'))
  } catch (error) {
    next(error)
  }
}

export const createDepartment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const department = await academicService.createDepartment(req.body)
    res.status(201).json(ApiResponseFormatter.success(department, 'Department created'))
  } catch (error) {
    next(error)
  }
}

export const updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const department = await academicService.updateDepartment(req.params.id, req.body)
    res.json(ApiResponseFormatter.success(department, 'Department updated'))
  } catch (error) {
    next(error)
  }
}

export const listSemesters = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const semesters = await academicService.listSemesters()
    res.json(ApiResponseFormatter.success(semesters, 'Semesters retrieved'))
  } catch (error) {
    next(error)
  }
}

export const createSemester = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const semester = await academicService.createSemester(req.body)
    res.status(201).json(ApiResponseFormatter.success(semester, 'Semester created'))
  } catch (error) {
    next(error)
  }
}

export const updateSemester = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const semester = await academicService.updateSemester(req.params.id, req.body)
    res.json(ApiResponseFormatter.success(semester, 'Semester updated'))
  } catch (error) {
    next(error)
  }
}
