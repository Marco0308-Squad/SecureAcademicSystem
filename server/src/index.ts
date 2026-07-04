import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { config } from './config'
import { ApiResponseFormatter } from './utils/apiResponse'
import prisma from './lib/prisma'
import logger, { morganStream } from './lib/logger'
import {
  ApiError,
  ValidationError,
  AuthenticationError,
} from './errors'
import authRoutes from './routes/auth.routes'
import studentRoutes from './routes/student.routes'
import academicRoutes from './routes/academic.routes'
import facultyRoutes from './routes/faculty.routes'
import courseRoutes from './routes/course.routes'
import subjectRoutes from './routes/subject.routes'
import attendanceRoutes from './routes/attendance.routes'
import marksRoutes from './routes/marks.routes'
import assignmentRoutes from './routes/assignment.routes'

const app = express()

// Middleware
app.use(helmet())
app.use(
  cors({
    origin: config.CORS_ORIGIN,
    credentials: true,
  })
)
app.use(morgan('combined', { stream: morganStream }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Rate limiting
const limiter = rateLimit({
  windowMs: Number(config.RATE_LIMIT_WINDOW_MS),
  max: Number(config.RATE_LIMIT_MAX_REQUESTS),
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api/', limiter)

// Auth routes with stricter rate limit
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message:
    'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api/v1/auth', authLimiter, authRoutes)
app.use('/api/v1/students', studentRoutes)
app.use('/api/v1/academics', academicRoutes)
app.use('/api/v1/faculty', facultyRoutes)
app.use('/api/v1/courses', courseRoutes)
app.use('/api/v1/subjects', subjectRoutes)
app.use('/api/v1/attendance', attendanceRoutes)
app.use('/api/v1/marks', marksRoutes)
app.use('/api/v1/assignments', assignmentRoutes)

// Health check endpoint
app.get('/api/v1/health', async (_req, res) => {
  let dbStatus = 'unknown'
  let redisStatus = 'unknown'

  try {
    await prisma.$queryRaw`SELECT 1`
    dbStatus = 'healthy'
  } catch {
    dbStatus = 'unhealthy'
  }

  res.json(
    ApiResponseFormatter.success({
      status: 'OK',
      timestamp: new Date(),
      services: {
        database: dbStatus,
        redis: redisStatus,
      },
    })
  )
})

// 404 handler
app.use((_req, res) => {
  res.status(404).json(ApiResponseFormatter.error('Route not found', 404))
})

// Centralized error handler
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    logger.error('Unhandled error', {
      error: err.message,
      stack: err.stack,
      statusCode: err.statusCode || 500,
    })

    let statusCode = 500
    let message = 'Internal server error'
    let errors: Record<string, string[]> | undefined = undefined

    if (err instanceof ApiError) {
      statusCode = err.statusCode
      message = err.message
      errors = err.errors
    } else if (err instanceof ValidationError) {
      statusCode = 400
      message = err.message
      errors = err.errors
    } else if (err instanceof AuthenticationError) {
      statusCode = 401
      message = err.message
    }

    res
      .status(statusCode)
      .json(ApiResponseFormatter.error(message, statusCode, errors))
  }
)

const PORT = config.PORT
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
  console.log(`📊 Environment: ${config.NODE_ENV}`)
})

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('Shutting down gracefully...')
  server.close(async () => {
    console.log('Server closed')
    await prisma.$disconnect()
    console.log('Prisma disconnected')
    process.exit(0)
  })
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)

export default app
