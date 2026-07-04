import express from 'express'
import { listSubjects, createSubject, updateSubject } from '../controllers/subject.controller'
import { validateRequest } from '../middleware/validation.middleware'
import { createSubjectSchema, updateSubjectSchema } from '../validators/subject.validator'
import { authenticateJWT } from '../middleware/auth.middleware'
import { requirePermission } from '../middleware/authorization.middleware'

const router = express.Router()

router.get('/', authenticateJWT, requirePermission('student.read'), listSubjects)
router.post('/', authenticateJWT, requirePermission('student.create'), validateRequest(createSubjectSchema), createSubject)
router.put('/:id', authenticateJWT, requirePermission('student.update'), validateRequest(updateSubjectSchema), updateSubject)

export default router
