import { Request, Response, NextFunction } from 'express'
import assignmentService from '../services/assignment.service'
import { ApiResponseFormatter } from '../utils/apiResponse'

export const listAssignments = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const assignments = await assignmentService.listAssignments()
    res.json(ApiResponseFormatter.success(assignments, 'Assignments retrieved'))
  } catch (error) {
    next(error)
  }
}

export const createAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const assignment = await assignmentService.createAssignment(req.body)
    res.status(201).json(ApiResponseFormatter.success(assignment, 'Assignment created'))
  } catch (error) {
    next(error)
  }
}

export const updateAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const assignment = await assignmentService.updateAssignment(req.params.id, req.body)
    res.json(ApiResponseFormatter.success(assignment, 'Assignment updated'))
  } catch (error) {
    next(error)
  }
}
