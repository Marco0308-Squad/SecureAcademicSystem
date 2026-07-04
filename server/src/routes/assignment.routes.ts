import express from 'express'
import { listAssignments, createAssignment, updateAssignment } from '../controllers/assignment.controller'
import { validateRequest } from '../middleware/validation.middleware'
import { createAssignmentSchema, updateAssignmentSchema } from '../validators/assignment.validator'
import { authenticateJWT } from '../middleware/auth.middleware'
import { requirePermission } from '../middleware/authorization.middleware'

const router = express.Router()

router.get('/', authenticateJWT, requirePermission('student.read'), listAssignments)
router.post('/', authenticateJWT, requirePermission('marks.publish'), validateRequest(createAssignmentSchema), createAssignment)
router.put('/:id', authenticateJWT, requirePermission('marks.publish'), validateRequest(updateAssignmentSchema), updateAssignment)

export default router
