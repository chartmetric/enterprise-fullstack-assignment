.PHONY: start stop clean logs shell-frontend shell-backend shell-db reset help pull

# Default target
all: pull start

# Display help information
help:
	@echo "Available commands:"
	@echo "  make          - Pulls images and starts all services"
	@echo "  make pull     - Pulls the latest Docker images"
	@echo "  make start    - Starts all services"
	@echo "  make stop     - Stops all services"
	@echo "  make clean    - Stops services and removes containers, volumes"
	@echo "  make logs     - Shows logs from all services"
	@echo "  make shell-frontend - Opens a shell in the frontend container"
	@echo "  make shell-backend  - Opens a shell in the backend container"
	@echo "  make shell-db       - Opens a PostgreSQL shell to the database"
	@echo "  make reset          - Resets all containers (fresh start)"
	@echo "  make help           - Shows this help message"

# Pull the latest images
pull:
	@echo "Pulling latest Docker images..."
	@docker pull jiwonjoung/chartmetric-assignment:frontend
	@docker pull jiwonjoung/chartmetric-assignment:backend
	@docker pull jiwonjoung/chartmetric-assignment:database
	@echo "All images pulled successfully."

# Start all services
start:
	@echo "Starting services..."
	@docker-compose up -d
	@echo "Services started!"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:5001"
	@echo "Database: postgresql://postgres:postgres@localhost:5432/chartmetric"

# Stop all services
stop:
	@echo "Stopping services..."
	@docker-compose down
	@echo "Services stopped."

# Clean the environment (remove volumes, etc)
clean:
	@echo "Cleaning environment..."
	@docker-compose down -v
	@echo "Environment cleaned."

# View logs
logs:
	@docker-compose logs -f

# Reset all containers (for a fresh start)
reset:
	@echo "Resetting all containers..."
	@docker-compose down
	@docker-compose up -d
	@echo "Reset complete. All services restarted with a fresh database."

# Shell into services
shell-frontend:
	@docker-compose exec frontend /bin/sh

shell-backend:
	@docker-compose exec backend /bin/sh

# Connect to database with psql
shell-db:
	@docker-compose exec db psql -U postgres -d chartmetric