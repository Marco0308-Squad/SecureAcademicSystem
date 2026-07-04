#!/bin/bash

# Startup script for the application

echo "Starting SAMS..."

# Create SSL certificates if they don't exist
if [ ! -f docker/ssl/cert.pem ] || [ ! -f docker/ssl/key.pem ]; then
  echo "Creating self-signed SSL certificate..."
  mkdir -p docker/ssl
  openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout docker/ssl/key.pem \
    -out docker/ssl/cert.pem \
    -subj "/C=IN/ST=State/L=City/O=College/CN=localhost"
fi

# Start Docker Compose
echo "Starting Docker Compose services..."
docker-compose up -d

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 10

# Run database migrations
echo "Running database migrations..."
docker-compose exec -T server npm run db:migrate

# Optionally seed database
if [ "$1" = "seed" ]; then
  echo "Seeding database..."
  docker-compose exec -T server npm run db:seed
fi

echo "SAMS started successfully!"
echo ""
echo "Services:"
echo "  Frontend:  http://localhost:5173"
echo "  API:       http://localhost:5000/api/v1"
echo "  Nginx:     http://localhost:80"
echo ""
echo "View logs with: docker-compose logs -f"
