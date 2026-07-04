# Deployment Guide - Secure Academic Management System

## Deployment Overview

SAMS can be deployed using Docker & Docker Compose for development/staging or Kubernetes for production.

## Prerequisites

- Docker 20.10+
- Docker Compose 2.0+
- PostgreSQL 14+ (or use Docker)
- Node.js 18+ (for local development)
- Git

## Development Deployment (Local)

### Quick Start with Docker Compose

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/SecureAcademicSystem.git
cd SecureAcademicSystem

# 2. Create environment file
cp .env.example .env
# Edit .env with your configuration

# 3. Start services
docker-compose up -d

# 4. Run database migrations
docker-compose exec server npm run db:migrate

# 5. Seed initial data (optional)
docker-compose exec server npm run db:seed

# 6. Access application
# Frontend: http://localhost:5173
# Backend API: http://localhost:5000/api/v1
# Nginx: http://localhost:80 (in production)
```

### Manual Local Setup (Without Docker)

```bash
# Backend setup
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run dev

# Frontend setup (in another terminal)
cd client
npm install
npm run dev

# Access
# Frontend: http://localhost:5173
# Backend: http://localhost:5000/api/v1
```

## Staging Deployment

### Using Docker Compose

```bash
# 1. Prepare environment
cp .env.example .env.staging
# Edit .env.staging for staging configuration

# 2. Build images
docker-compose -f docker-compose.yml -f docker-compose.staging.yml build

# 3. Deploy
docker-compose -f docker-compose.yml -f docker-compose.staging.yml up -d

# 4. Run migrations
docker-compose -f docker-compose.yml -f docker-compose.staging.yml exec server npm run db:migrate

# 5. View logs
docker-compose logs -f
```

## Production Deployment

### Prerequisites

- Ubuntu 20.04 LTS or similar
- 4GB+ RAM
- 20GB+ storage
- SSL certificate
- Domain name
- Backup storage (S3, etc.)

### Installation Steps

#### 1. System Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install PostgreSQL client (for backups)
sudo apt install -y postgresql-client

# Create app directory
sudo mkdir -p /opt/sams
sudo chown $USER:$USER /opt/sams
```

#### 2. Application Setup

```bash
# Clone repository
cd /opt/sams
git clone https://github.com/yourusername/SecureAcademicSystem.git .

# Create production environment
cp .env.example .env.production
# Edit .env.production with production values

# Generate SSL certificate (if using self-signed)
mkdir -p docker/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout docker/ssl/key.pem \
  -out docker/ssl/cert.pem

# Create docker-compose.production.yml
cp docker-compose.yml docker-compose.production.yml
# Edit for production settings
```

#### 3. Database Setup

```bash
# Create database backup directory
sudo mkdir -p /opt/sams/backups
sudo chown $USER:$USER /opt/sams/backups

# Start PostgreSQL
docker-compose -f docker-compose.production.yml up -d postgres

# Run migrations
docker-compose -f docker-compose.production.yml run --rm server npm run db:migrate:deploy

# Seed initial data
docker-compose -f docker-compose.production.yml run --rm server npm run db:seed
```

#### 4. Application Deployment

```bash
# Build production images
docker-compose -f docker-compose.production.yml build

# Start all services
docker-compose -f docker-compose.production.yml up -d

# Verify services are running
docker-compose -f docker-compose.production.yml ps

# Check logs
docker-compose -f docker-compose.production.yml logs -f
```

#### 5. Nginx Configuration

```bash
# Copy production nginx config
cp docker/nginx.conf.prod docker/nginx.conf

# Verify nginx configuration
docker-compose -f docker-compose.production.yml exec nginx nginx -t

# Reload nginx
docker-compose -f docker-compose.production.yml exec nginx nginx -s reload
```

#### 6. SSL Certificate Setup

**Using Let's Encrypt (Recommended):**

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Copy certificates
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem docker/ssl/cert.pem
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem docker/ssl/key.pem
sudo chown $USER:$USER docker/ssl/*

# Auto-renewal (cron job)
# Run: sudo crontab -e
# Add: 0 2 * * * /usr/bin/certbot renew --quiet && docker-compose -f /opt/sams/docker-compose.production.yml exec nginx nginx -s reload
```

### Environment Configuration (Production)

```bash
# .env.production
DATABASE_URL=postgresql://user:password@postgres:5432/sams_db
DB_HOST=postgres
DB_PORT=5432
DB_NAME=sams_db
DB_USER=sams_user
DB_PASSWORD=<STRONG_PASSWORD>

SERVER_PORT=5000
NODE_ENV=production

JWT_SECRET=<GENERATE_RANDOM_64_CHAR_STRING>
JWT_REFRESH_SECRET=<GENERATE_RANDOM_64_CHAR_STRING>
JWT_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

CORS_ORIGIN=https://yourdomain.com
LOG_LEVEL=warn

BCRYPT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
LOCK_TIME=30m

# Email configuration (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@yourdomain.com

# Redis
REDIS_PASSWORD=<STRONG_PASSWORD>
```

## Backup & Recovery

### Automated Daily Backups

```bash
# Create backup script: /opt/sams/backup.sh
#!/bin/bash

BACKUP_DIR="/opt/sams/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/sams_db_$DATE.sql.gz"

# Create backup
docker-compose -f /opt/sams/docker-compose.production.yml exec -T postgres \
  pg_dump -U sams_user sams_db | gzip > $BACKUP_FILE

# Keep only last 30 days of backups
find $BACKUP_DIR -name "sams_db_*.sql.gz" -mtime +30 -delete

# Upload to S3
aws s3 cp $BACKUP_FILE s3://your-backup-bucket/

echo "Backup completed: $BACKUP_FILE"
```

```bash
# Add to crontab
sudo crontab -e
# Add: 0 2 * * * /opt/sams/backup.sh >> /var/log/sams-backup.log 2>&1
```

### Recovery Procedure

```bash
# 1. Stop application
docker-compose -f docker-compose.production.yml stop server nginx client

# 2. Restore database
BACKUP_FILE="/opt/sams/backups/sams_db_YYYYMMDD_HHMMSS.sql.gz"
gunzip < $BACKUP_FILE | docker-compose -f docker-compose.production.yml exec -T postgres \
  psql -U sams_user -d sams_db

# 3. Start application
docker-compose -f docker-compose.production.yml up -d
```

## Monitoring & Logging

### Docker Logs

```bash
# View logs
docker-compose -f docker-compose.production.yml logs -f

# View specific service logs
docker-compose -f docker-compose.production.yml logs -f server

# View last 100 lines
docker-compose -f docker-compose.production.yml logs --tail=100
```

### Health Checks

```bash
# Check service health
curl http://localhost/health

# Check API
curl http://localhost/api/v1/health

# Check database
docker-compose -f docker-compose.production.yml exec postgres pg_isready -U sams_user
```

### Resource Monitoring

```bash
# View container resource usage
docker stats

# View container processes
docker-compose -f docker-compose.production.yml ps

# Inspect container
docker inspect <container_id>
```

## Scaling

### Horizontal Scaling (Multiple Backend Instances)

```yaml
# docker-compose.production.yml
services:
  server-1:
    build: ./server
    # ...
  
  server-2:
    build: ./server
    # ...

  nginx:
    # Load balance across server-1 and server-2
```

### Vertical Scaling (Increase Resources)

```bash
# Edit docker-compose.yml to increase resources
services:
  server:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
```

## Updates & Maintenance

### Application Updates

```bash
# 1. Pull latest changes
cd /opt/sams
git pull origin main

# 2. Rebuild images
docker-compose -f docker-compose.production.yml build

# 3. Run migrations (if schema changed)
docker-compose -f docker-compose.production.yml run --rm server npm run db:migrate:deploy

# 4. Restart services
docker-compose -f docker-compose.production.yml up -d

# 5. Verify
docker-compose -f docker-compose.production.yml ps
docker-compose -f docker-compose.production.yml logs -f
```

### Zero-Downtime Updates

```bash
# Using rolling updates
docker-compose -f docker-compose.production.yml up -d \
  --scale server=2 \
  --no-deps --build server
```

## Troubleshooting

### Service Won't Start

```bash
# Check logs
docker-compose -f docker-compose.production.yml logs server

# Check dependencies
docker-compose -f docker-compose.production.yml ps

# Rebuild
docker-compose -f docker-compose.production.yml build --no-cache server
```

### Database Connection Issues

```bash
# Check database is running
docker-compose -f docker-compose.production.yml ps postgres

# Test connection
docker-compose -f docker-compose.production.yml exec postgres psql -U sams_user -d sams_db -c "SELECT NOW();"

# Check DATABASE_URL
docker-compose -f docker-compose.production.yml exec server env | grep DATABASE_URL
```

### Out of Disk Space

```bash
# Clean up Docker
docker system prune -a

# Remove old images
docker image prune

# Remove unused volumes
docker volume prune

# Check disk usage
du -sh /var/lib/docker
```

## Performance Tuning

### Database Connection Pooling

```bash
# Add to docker-compose.yml
environment:
  DATABASE_POOL_SIZE=20
  DATABASE_IDLE_TIMEOUT=30000
```

### Enable Redis Caching

```bash
# Enable Redis in docker-compose.yml
# Already included in default config
```

### CDN Setup (Optional)

```bash
# CloudFront or similar
# Point to /static/* assets
```

## Security Hardening

### Update System

```bash
sudo apt update && sudo apt upgrade -y
sudo reboot
```

### Firewall Configuration

```bash
# Ubuntu UFW
sudo ufw enable
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 5432/tcp  # PostgreSQL (if remote)
```

### SSH Key-Based Authentication

```bash
# Disable password authentication
sudo sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart ssh
```

## Kubernetes Deployment (Advanced)

For large-scale production, consider Kubernetes:

```bash
# Using Helm charts (future enhancement)
helm install sams ./charts/sams

# Manual k8s setup
kubectl apply -f k8s/namespace.yml
kubectl apply -f k8s/secrets.yml
kubectl apply -f k8s/postgres.yml
kubectl apply -f k8s/server.yml
kubectl apply -f k8s/client.yml
kubectl apply -f k8s/nginx.yml
```

---

**Last Updated**: 2024-01-01  
**Version**: 1.0.0
