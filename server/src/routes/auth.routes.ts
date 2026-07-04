import express from 'express'
import {
  login,
  register,
  refresh,
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
  getMe,
} from '../controllers/auth.controller'
import { validateRequest } from '../middleware/validation.middleware'
import {
  loginSchema,
  registerSchema,
  refreshTokenSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../validators/auth.validator'
import { authenticateJWT } from '../middleware/auth.middleware'

const router = express.Router()

// Public routes
router.post('/login', validateRequest(loginSchema), login)
router.post('/register', validateRequest(registerSchema), register)
router.post('/refresh', validateRequest(refreshTokenSchema), refresh)
router.post('/forgot-password', validateRequest(forgotPasswordSchema), forgotPassword)
router.post('/reset-password', validateRequest(resetPasswordSchema), resetPassword)

// Protected routes
router.post('/logout', authenticateJWT, validateRequest(refreshTokenSchema), logout)
router.post(
  '/change-password',
  authenticateJWT,
  validateRequest(changePasswordSchema),
  changePassword
)
router.get('/me', authenticateJWT, getMe)

export default router
