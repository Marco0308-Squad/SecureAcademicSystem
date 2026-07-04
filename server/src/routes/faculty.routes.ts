import express from 'express'
import { listFaculty, createFaculty, updateFaculty } from '../controllers/faculty.controller'
import { validateRequest } from '../middleware/validation.middleware'
import { createFacultySchema, updateFacultySchema } from '../validators/faculty.validator'
import { authenticateJWT } from '../middleware/auth.middleware'
import { requirePermission } from '../middleware/authorization.middleware'

const router = express.Router()

router.get('/', authenticateJWT, requirePermission('student.read'), listFaculty)
router.post('/', authenticateJWT, requirePermission('student.create'), validateRequest(createFacultySchema), createFaculty)
router.put('/:id', authenticateJWT, requirePermission('student.update'), validateRequest(updateFacultySchema), updateFaculty)

export default router
