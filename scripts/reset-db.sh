#!/bin/bash

# Database reset script (Development only!)

if [ "$NODE_ENV" = "production" ]; then
  echo "ERROR: Cannot reset database in production!"
  exit 1
fi

echo "Resetting database (this will delete all data)..."
read -p "Are you sure? Type 'yes' to confirm: " confirm

if [ "$confirm" != "yes" ]; then
  echo "Cancelled."
  exit 0
fi

echo "Resetting Prisma database..."
docker-compose exec -T server npm run db:reset

echo "Database reset complete!"
