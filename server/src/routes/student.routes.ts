import express from 'express'
import { listStudents, getStudent, createStudent, updateStudent, deleteStudent } from '../controllers/student.controller'
import { validateRequest } from '../middleware/validation.middleware'
import { createStudentSchema, updateStudentSchema, studentQuerySchema } from '../validators/student.validator'
import { authenticateJWT } from '../middleware/auth.middleware'
import { requirePermission } from '../middleware/authorization.middleware'

const router = express.Router()

router.get('/', authenticateJWT, requirePermission('student.read'), validateRequest(studentQuerySchema), listStudents)
router.get('/:id', authenticateJWT, requirePermission('student.read'), getStudent)
router.post('/', authenticateJWT, requirePermission('student.create'), validateRequest(createStudentSchema), createStudent)
router.put('/:id', authenticateJWT, requirePermission('student.update'), validateRequest(updateStudentSchema), updateStudent)
router.delete('/:id', authenticateJWT, requirePermission('student.delete'), deleteStudent)

export default router
