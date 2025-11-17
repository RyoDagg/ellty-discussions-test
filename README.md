# Ellty Discussions

A minimal, structured discussion platform with threaded conversations. This project demonstrates a clean architecture focused on simplicity, maintainability, and clear organization.

## Development Principles

1. **Write code that's easy to delete**: If a feature needs removal, it should be obvious what to remove
2. **One file, one responsibility**: Large files are a code smell
3. **Consistent patterns**: Once a pattern is established, use it everywhere
4. **Document through structure**: Code organization is documentation
5. **Minimize dependencies**: Each new package must justify its existence

## Overview

Ellty Discussions is a full-stack application that allows users to create threaded discussions where messages form a tree structure. Each message can perform mathematical operations on its parent's result, creating a collaborative calculation thread.

**Tech Stack:**

- **Backend**: NestJS (Node.js/TypeScript) with MongoDB
- **Frontend**: React + TypeScript + Vite + TailwindCSS
- **State Management**: Zustand
- **Authentication**: JWT-based
- **Infrastructure**: Docker Compose

## Philosophy: Structured, Organized, and Minimal

This project embodies three core principles that guide every architectural decision:

### 🎯 Structured

**Feature-based organization** over scattered files. Each feature lives in its own module with clear boundaries:

```
server/src/
  ├── discussions/          # Self-contained feature module
  │   ├── discussions.controller.ts
  │   ├── discussions.service.ts
  │   └── discussions.module.ts
  ├── messages/             # Separate, focused module
  ├── user/                 # Authentication & user management
  └── schemas/              # Shared data models
```

Every module follows the **same pattern**: Controller (routes) → Service (business logic) → Schema (data model). This predictability makes the codebase navigable and intuitive.

### 📁 Organized

**Separation of concerns** at every level:

- **Backend**: Strict MVC pattern with dependency injection
- **Frontend**: Components, pages, and services are clearly separated
- **Shared schemas**: Data models defined once, used consistently
- **Configuration**: Environment variables, Docker configs, and dependencies are isolated

Each directory has a **single, clear purpose**. Files are organized by **what they do**, not by **what they are** (e.g., all controllers together). This makes it easy to find and modify related code.

### ⚡ Minimal

**Do one thing well**:

- **No unnecessary abstractions**: Services do their job, controllers handle HTTP, schemas define data
- **Lean dependencies**: Only what's essential (NestJS core, React, Zustand, TailwindCSS)
- **Clean code**: Functions are small, focused, and easy to understand
- **No over-engineering**: Patterns emerge naturally, not forced prematurely

Complexity is introduced **only when needed**, not preemptively. The codebase stays small and maintainable.

## Project Structure

```
ellty-discussions-test/
├── server/                 # NestJS backend
│   ├── src/
│   │   ├── discussions/    # Discussion feature module
│   │   ├── messages/       # Message feature module
│   │   ├── user/           # Authentication module
│   │   └── schemas/        # MongoDB schemas
│   └── Dockerfile
├── web/                    # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route pages
│   │   └── services/       # API & state management
│   └── Dockerfile
├── docker-compose.yml      # Orchestration
└── DOCKER.md              # Docker setup guide
```

## Quick Start

### Using Docker (Recommended)

```bash
# Set JWT secret (optional, defaults provided)
export JWT_SECRET=your-secret-key

# Start all services
docker-compose up --build

# Access the application
# Web: http://localhost:80
# API: http://localhost:3000
```

See [DOCKER.md](./DOCKER.md) for detailed Docker instructions.

### Local Development

**Backend:**

```bash
cd server
pnpm install
pnpm run start:dev
```

**Frontend:**

```bash
cd web
pnpm install
pnpm run dev
```

**MongoDB:**

```bash
# Use Docker for MongoDB
docker-compose up mongodb
# Or install MongoDB locally
```

## Architecture Highlights

### Backend Pattern

Every feature follows the NestJS module pattern:

```typescript
// Module: groups related functionality
@Module({
  imports: [MongooseModule.forFeature([...schemas])],
  controllers: [FeatureController],
  providers: [FeatureService],
})
export class FeatureModule {}

// Controller: handles HTTP requests
@Controller("feature")
export class FeatureController {
  constructor(private readonly service: FeatureService) {}
  // Routes here
}

// Service: contains business logic
@Injectable()
export class FeatureService {
  // Business logic here
}
```

This pattern ensures:

- **Testability**: Services can be tested in isolation
- **Reusability**: Services can be injected anywhere
- **Clarity**: Route handling vs. business logic is explicit

### Frontend Organization

```
web/src/
├── components/     # Reusable, presentational components
├── pages/          # Route-level components (feature pages)
└── services/       # API client & global state
```

- **Components**: Pure UI, no business logic
- **Pages**: Orchestrate components and handle route-specific logic
- **Services**: Centralized API calls and state management

### Data Flow

```
User Action → Component → Service/Store → API → Backend Controller → Service → Database
                                                              ↓
User sees result ← Component ← Service/Store ← API ← Backend Controller ← Service ← Database
```

Unidirectional, predictable, and easy to debug.

## Key Features

- 🔐 **JWT Authentication**: Secure user sessions
- 💬 **Threaded Discussions**: Tree-structured conversations
- 🧮 **Mathematical Operations**: Messages can perform calculations
- 📊 **Real-time Updates**: Refresh to see new messages
- 🎨 **Minimal UI**: Clean, focused interface with TailwindCSS
