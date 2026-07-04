import express from 'express'
import {
  listDepartments,
  createDepartment,
  updateDepartment,
  listSemesters,
  createSemester,
  updateSemester,
} from '../controllers/academic.controller'
import { validateRequest } from '../middleware/validation.middleware'
import {
  createDepartmentSchema,
  updateDepartmentSchema,
  createSemesterSchema,
  updateSemesterSchema,
} from '../validators/academic.validator'
import { authenticateJWT } from '../middleware/auth.middleware'
import { requirePermission } from '../middleware/authorization.middleware'

const router = express.Router()

router.get('/departments', authenticateJWT, requirePermission('student.read'), listDepartments)
router.post('/departments', authenticateJWT, requirePermission('student.create'), validateRequest(createDepartmentSchema), createDepartment)
router.put('/departments/:id', authenticateJWT, requirePermission('student.update'), validateRequest(updateDepartmentSchema), updateDepartment)

router.get('/semesters', authenticateJWT, requirePermission('student.read'), listSemesters)
router.post('/semesters', authenticateJWT, requirePermission('student.create'), validateRequest(createSemesterSchema), createSemester)
router.put('/semesters/:id', authenticateJWT, requirePermission('student.update'), validateRequest(updateSemesterSchema), updateSemester)

export default router
