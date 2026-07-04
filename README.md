# Secure Academic Management System (SAMS)

A production-grade, enterprise-level academic management system for engineering colleges built with React, Node.js, Express, PostgreSQL, and modern DevSecOps practices.

## 🎯 Project Goals

- **Production Quality**: Enterprise-grade code and architecture
- **Security First**: Industry-standard security practices
- **Scalability**: Designed for growth and high performance
- **Maintainability**: Clean, modular, well-documented codebase
- **Reliability**: Comprehensive testing and error handling
- **Compliance**: RBAC, audit logs, and secure data handling

## 📋 Table of Contents

- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Database](#database)
- [API Documentation](#api-documentation)
- [Security](#security)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🛠 Technology Stack

### Frontend
- **React 19**: Modern UI framework
- **Vite**: Lightning-fast build tool
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **React Router**: Client-side routing
- **React Hook Form**: Efficient form handling
- **Zod**: Schema validation
- **Axios**: HTTP client

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **TypeScript**: Type safety
- **PostgreSQL**: Relational database
- **Prisma ORM**: Database access layer

### Testing & Quality
- **Vitest**: Unit testing framework
- **Supertest**: HTTP assertion library
- **ESLint**: Code linting
- **Prettier**: Code formatting

### DevOps
- **Docker & Docker Compose**: Containerization
- **Nginx**: Reverse proxy & web server

## 📁 Project Structure

```
SecureAcademicSystem/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── layouts/       # Layout wrappers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service layer
│   │   ├── store/         # State management
│   │   ├── types/         # TypeScript types
│   │   ├── constants/     # Constants & config
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   └── package.json
│
├── server/                # Express backend
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── services/      # Business logic
│   │   ├── repositories/  # Data access layer
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # Route definitions
│   │   ├── validators/    # Input validation
│   │   ├── middleware/    # Auth, error handling
│   │   ├── types/         # TypeScript types
│   │   ├── constants/     # Constants
│   │   ├── utils/         # Utility functions
│   │   ├── config/        # Configuration
│   │   ├── errors/        # Error classes
│   │   └── app.ts         # Express app setup
│   └── package.json
│
├── database/
│   ├── schema.prisma      # Prisma schema
│   ├── migrations/        # Migration files
│   └── seeds/             # Seed data
│
├── docker/                # Docker configurations
│   ├── Dockerfile.server
│   ├── Dockerfile.client
│   └── nginx.conf
│
├── docs/                  # Documentation
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DATABASE.md
│   ├── SECURITY.md
│   └── DEPLOYMENT.md
│
├── tests/                 # Test files
│   ├── unit/
│   └── integration/
│
├── scripts/               # Automation scripts
├── docker-compose.yml     # Local development setup
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ (or Docker)
- PostgreSQL 14+ (or Docker)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SecureAcademicSystem.git
   cd SecureAcademicSystem
   ```

2. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start with Docker Compose (Recommended)**
   ```bash
   docker-compose up -d
   ```

4. **Or setup locally**
   ```bash
   # Install server dependencies
   cd server
   npm install
   npx prisma migrate dev
   npm run dev

   # In another terminal, install client dependencies
   cd client
   npm install
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api/v1

## 🏗️ Architecture

### Design Patterns
- **Layered Architecture**: Controllers → Services → Repositories
- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **DRY**: Don't Repeat Yourself
- **KISS**: Keep It Simple, Stupid
- **Separation of Concerns**: Each layer has distinct responsibilities

### Authentication & Authorization
- JWT-based authentication with access and refresh tokens
- Role-Based Access Control (RBAC)
- Six user roles: Super Admin, Admin, Principal, HOD, Faculty, Student
- Server-enforced authorization on every protected endpoint

### Security Measures
- Input validation on all endpoints
- Parameterized database queries
- Password hashing with Argon2id
- Rate limiting
- Secure HTTP headers
- CORS configuration
- SQL injection prevention
- XSS prevention
- CSRF token support
- Audit logging

## 🗄️ Database

### Supported Roles
- **Super Admin**: System-level access
- **Admin**: College administration
- **Principal**: College principal
- **HOD**: Head of Department
- **Faculty**: Teachers
- **Student**: Learners

### Core Modules
1. Authentication
2. Dashboard
3. Student Management
4. Faculty Management
5. Department Management
6. Course Management
7. Subject Management
8. Semester Management
9. Attendance Management
10. Internal Marks
11. Semester Marks
12. Timetable Management
13. Assignment Management
14. Examination Management
15. Fee Management
16. Notifications
17. Reports
18. Audit Logs
19. User Profile
20. System Settings

See [DATABASE.md](docs/DATABASE.md) for complete schema.

## 📡 API Documentation

Base URL: `http://localhost:5000/api/v1`

### Response Format
All API responses follow a consistent format:

```json
{
  "success": true,
  "status": 200,
  "message": "Request successful",
  "data": {},
  "errors": null,
  "timestamp": "2024-01-01T12:00:00Z"
}
```

See [API.md](docs/API.md) for detailed endpoint documentation.

## 🔒 Security

This system implements industry-standard security practices:

- Input validation and sanitization
- SQL injection prevention (Prisma parameterized queries)
- XSS prevention (React escaping)
- CSRF protection
- Authentication bypass prevention
- Privilege escalation prevention
- Session management
- Secure password storage
- Audit logging
- Rate limiting
- Secure headers

See [SECURITY.md](docs/SECURITY.md) for detailed security documentation.

## ✅ Testing

### Run Tests
```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# Coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

Tests include:
- Unit tests for services and utilities
- Integration tests for API endpoints
- Authentication and authorization tests
- Input validation tests

## 🐳 Deployment

### Docker Compose (Development)
```bash
docker-compose up -d
```

### Production Deployment
See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for:
- Docker production builds
- Nginx configuration
- Environment setup
- Database migrations
- SSL/TLS setup
- Monitoring and logging

## 📝 Development Workflow

1. Create a feature branch: `git checkout -b feature/module-name`
2. Implement feature following architecture guidelines
3. Write tests for new code
4. Run linting and formatting: `npm run lint:fix`
5. Commit with clear messages
6. Create pull request
7. Code review and merge

## 🤝 Contributing

### Code Standards
- Follow TypeScript best practices
- Use ESLint and Prettier configurations
- Write self-documenting code
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable names

### Commit Messages
```
type(scope): subject

type: feat, fix, docs, style, refactor, test, chore
scope: module or component name
subject: brief description (imperative mood)
```

Example: `feat(auth): implement JWT refresh token logic`

## 📚 Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [API Specification](docs/API.md)
- [Database Schema](docs/DATABASE.md)
- [Security Guidelines](docs/SECURITY.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## 📄 License

MIT License - See LICENSE file for details

## 👥 Contact

- **Project Lead**: [Your Name]
- **Email**: [Your Email]
- **Documentation**: [Link to wiki/docs]

---

**Last Updated**: 2024-01-01  
**Version**: 1.0.0-alpha
