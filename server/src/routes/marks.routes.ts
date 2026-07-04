import express from 'express'
import { listMarks, createMarks, updateMarks } from '../controllers/marks.controller'
import { validateRequest } from '../middleware/validation.middleware'
import { createMarksSchema, updateMarksSchema } from '../validators/marks.validator'
import { authenticateJWT } from '../middleware/auth.middleware'
import { requirePermission } from '../middleware/authorization.middleware'

const router = express.Router()

router.get('/', authenticateJWT, requirePermission('student.read'), listMarks)
router.post('/', authenticateJWT, requirePermission('marks.publish'), validateRequest(createMarksSchema), createMarks)
router.put('/:id', authenticateJWT, requirePermission('marks.publish'), validateRequest(updateMarksSchema), updateMarks)

export default router
