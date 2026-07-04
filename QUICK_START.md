# Quick Start Guide - Secure Academic Management System

## For Impatient Developers

Want to get SAMS running in 5 minutes? Follow this!

### Prerequisites

- Docker & Docker Compose installed
- Git installed
- 4GB+ RAM available

### One-Command Startup

```bash
# Clone and start
git clone https://github.com/yourusername/SecureAcademicSystem.git
cd SecureAcademicSystem
bash scripts/start.sh

# That's it! Services will be running in ~30 seconds
```

### Access the Application

After services start:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api/v1
- **Database**: localhost:5432 (PostgreSQL)
- **Redis**: localhost:6379

### Default Credentials

Seed data will be added, but for now:

```
Email: admin@college.edu
Password: Admin@1234
```

### Common Commands

```bash
# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f server
docker-compose logs -f client

# Stop everything
bash scripts/stop.sh

# Reset database (DEV ONLY!)
bash scripts/reset-db.sh

# Database shell
docker-compose exec postgres psql -U sams_user -d sams_db

# Server shell
docker-compose exec server sh

# Client shell
docker-compose exec client sh
```

### Troubleshooting

**Services won't start?**
```bash
# Check Docker is running
docker --version

# Check logs
docker-compose logs

# Rebuild images
docker-compose build --no-cache
docker-compose up -d
```

**Can't connect to frontend?**
```bash
# Verify port 5173 is available
lsof -i :5173

# Check client logs
docker-compose logs client
```

**Database connection error?**
```bash
# Check PostgreSQL is running
docker-compose ps postgres

# Check database credentials in .env
cat .env | grep DATABASE_URL

# Try manual connection
docker-compose exec postgres psql -U sams_user -d sams_db -c "SELECT NOW();"
```

### Architecture at a Glance

```
┌─────────────────────────────────────────────┐
│  Your Browser (React + Vite)                │
│  http://localhost:5173                      │
└────────────┬────────────────────────────────┘
             │ HTTP/REST
             ▼
┌─────────────────────────────────────────────┐
│  Nginx Reverse Proxy                        │
│  http://localhost:80                        │
└────────────┬────────────────────────────────┘
             │
      ┌──────┴──────┐
      ▼             ▼
┌──────────────┐ ┌──────────────┐
│ React Client │ │ Express API  │
│ :5173        │ │ :5000        │
└──────────────┘ └──────┬───────┘
                        │ SQL
                        ▼
                ┌───────────────────┐
                │ PostgreSQL        │
                │ :5432             │
                └───────────────────┘
```

### Project Structure Quick Reference

```
server/src/
├── controllers/     ← HTTP request handlers
├── services/        ← Business logic
├── repositories/    ← Database access
├── routes/          ← Express routes
├── middleware/      ← Auth, validation, error handling
├── validators/      ← Input validation (Zod schemas)
├── types/           ← TypeScript types
├── errors/          ← Custom error classes
├── constants/       ← App constants
└── utils/           ← Helper functions

client/src/
├── pages/           ← Page components
├── components/      ← Reusable UI components
├── hooks/           ← Custom React hooks
├── services/        ← API calls (Axios)
├── store/           ← State management
├── types/           ← TypeScript types
├── constants/       ← App constants
└── utils/           ← Helper functions
```

### Development Workflow

1. **Edit files** → Services auto-reload
2. **Run tests** → `docker-compose exec server npm test`
3. **Check database** → `docker-compose exec postgres psql -U sams_user -d sams_db`
4. **View API docs** → See `docs/API.md`
5. **Commit code** → Follow format: `feat(module): description`

### Next Steps

1. Read [ARCHITECTURE.md](docs/ARCHITECTURE.md) to understand system design
2. Read [API.md](docs/API.md) to understand REST endpoints
3. Start implementing modules in this order:
   - Authentication (foundation)
   - Dashboard
   - Student Management
   - Faculty Management
   - Others...

### Documentation

- **[README.md](README.md)** - Project overview
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System design
- **[API.md](docs/API.md)** - API endpoints
- **[DATABASE.md](docs/DATABASE.md)** - Database schema
- **[SECURITY.md](docs/SECURITY.md)** - Security guidelines
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Production deployment

### Getting Help

**Check logs first:**
```bash
docker-compose logs -f --tail=50
```

**Check specific service:**
```bash
docker-compose logs -f server
docker-compose logs -f client
docker-compose logs -f postgres
```

**Inspect container:**
```bash
docker-compose exec server env
docker-compose ps
```

---

**🚀 Happy Coding!**

Now go build something awesome! 💪
