# Docker Setup Guide

This project uses Docker Compose to orchestrate all services: MongoDB, NestJS server, and React web application.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

## Quick Start

1. **Set environment variables** (optional, defaults are provided):
   ```bash
   export JWT_SECRET=your-secret-key-change-in-production
   ```

2. **Build and start all services**:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   - Web application: http://localhost:80
   - Server API: http://localhost:3000
   - MongoDB: localhost:27017

## Services

### MongoDB
- **Port**: 27017
- **Database**: ellty
- **Data persistence**: Volume `mongodb_data`

### Server (NestJS)
- **Port**: 3000
- **Environment variables**:
  - `PORT`: Server port (default: 3000)
  - `MONGODB_URI`: MongoDB connection string
  - `APP_URL`: Frontend URL for CORS
  - `JWT_SECRET`: Secret key for JWT tokens

### Web (React/Vite)
- **Port**: 80
- **Build argument**: `VITE_API_URL` - API endpoint URL

## Commands

### Start services
```bash
docker-compose up
```

### Start services in background
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### Stop services and remove volumes
```bash
docker-compose down -v
```

### Rebuild services
```bash
docker-compose up --build
```

### View logs
```bash
docker-compose logs -f
```

### View logs for specific service
```bash
docker-compose logs -f server
docker-compose logs -f web
docker-compose logs -f mongodb
```

## Development

For local development without Docker, you can run services individually:

### Server
```bash
cd server
pnpm install
pnpm run start:dev
```

### Web
```bash
cd web
pnpm install
pnpm run dev
```

### MongoDB
Install MongoDB locally or use the Docker container:
```bash
docker-compose up mongodb
```

## Environment Variables

Create a `.env` file in the root directory (optional):
```env
JWT_SECRET=your-secret-key-change-in-production
```

The docker-compose.yml file uses default values if environment variables are not set.

