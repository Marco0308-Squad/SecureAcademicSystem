import express from 'express'
import { listAttendance, createAttendance, updateAttendance } from '../controllers/attendance.controller'
import { validateRequest } from '../middleware/validation.middleware'
import { createAttendanceSchema, updateAttendanceSchema } from '../validators/attendance.validator'
import { authenticateJWT } from '../middleware/auth.middleware'
import { requirePermission } from '../middleware/authorization.middleware'

const router = express.Router()

router.get('/', authenticateJWT, requirePermission('student.read'), listAttendance)
router.post('/', authenticateJWT, requirePermission('attendance.mark'), validateRequest(createAttendanceSchema), createAttendance)
router.put('/:id', authenticateJWT, requirePermission('attendance.edit'), validateRequest(updateAttendanceSchema), updateAttendance)

export default router
