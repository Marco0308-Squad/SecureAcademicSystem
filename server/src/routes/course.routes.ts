import express from 'express'
import { listCourses, createCourse, updateCourse } from '../controllers/course.controller'
import { validateRequest } from '../middleware/validation.middleware'
import { createCourseSchema, updateCourseSchema } from '../validators/course.validator'
import { authenticateJWT } from '../middleware/auth.middleware'
import { requirePermission } from '../middleware/authorization.middleware'

const router = express.Router()

router.get('/', authenticateJWT, requirePermission('student.read'), listCourses)
router.post('/', authenticateJWT, requirePermission('student.create'), validateRequest(createCourseSchema), createCourse)
router.put('/:id', authenticateJWT, requirePermission('student.update'), validateRequest(updateCourseSchema), updateCourse)

export default router
