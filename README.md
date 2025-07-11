# Clean Architecture Project

A comprehensive implementation of Clean Architecture using TypeScript and Node.js. This project demonstrates how to structure a scalable application following the principles of Clean Architecture, Domain-Driven Design (DDD), and SOLID principles.

## 🏗️ Architecture Overview

This project follows the Clean Architecture pattern with four distinct layers:

### 🎯 Domain Layer (`src/domain/`)
The innermost layer containing core business logic:
- **Entities**: Core business objects with identity
- **Value Objects**: Immutable objects representing descriptive aspects
- **Repository Interfaces**: Contracts for data access
- **Domain Services**: Complex business logic that doesn't belong to entities

### 🔧 Application Layer (`src/application/`)
Contains application-specific business rules:
- **Use Cases**: Application-specific business rules
- **DTOs**: Data Transfer Objects for communication between layers
- **Application Services**: Orchestrate domain objects to fulfill use cases

### 🔌 Infrastructure Layer (`src/infrastructure/`)
Handles external dependencies:
- **Repository Implementations**: Concrete implementations of domain repositories
- **Database**: Data persistence logic
- **External Services**: Third-party integrations
- **Web Framework**: Express.js server setup

### 🎨 Presentation Layer (`src/presentation/`)
The outermost layer handling user interface:
- **Controllers**: Handle HTTP requests and responses
- **Route Handlers**: Define API endpoints
- **Input Validation**: Request data validation

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Start production server:**
   ```bash
   npm start
   ```

## 📝 API Endpoints

The project includes a User management API with the following endpoints:

- `GET /health` - Health check endpoint
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Example Usage

**Create a user:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

**Get all users:**
```bash
curl http://localhost:3000/api/users
```

## 🧪 Testing

Run tests with:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 🔍 Code Quality

**Linting:**
```bash
npm run lint
```

**Fix linting issues:**
```bash
npm run lint:fix
```

## 📁 Project Structure

```
src/
├── domain/                  # Domain Layer
│   ├── common/             # Common domain abstractions
│   │   ├── Entity.ts       # Base entity class
│   │   └── ValueObject.ts  # Base value object class
│   ├── entities/           # Domain entities
│   │   └── User.ts         # User entity
│   ├── value-objects/      # Domain value objects
│   │   └── Email.ts        # Email value object
│   └── repositories/       # Repository interfaces
│       └── UserRepository.ts
├── application/            # Application Layer
│   ├── dtos/              # Data Transfer Objects
│   │   └── UserDto.ts
│   └── services/          # Application services
│       └── UserService.ts
├── infrastructure/        # Infrastructure Layer
│   ├── repositories/      # Repository implementations
│   │   └── InMemoryUserRepository.ts
│   └── web/              # Web framework setup
│       └── server.ts
└── presentation/         # Presentation Layer
    └── controllers/      # API controllers
        └── UserController.ts
```

## 🎯 Key Benefits

- **Testability**: Business logic is isolated and easily testable
- **Maintainability**: Clear separation of concerns
- **Scalability**: Easy to add new features and modify existing ones
- **Independence**: Framework and database agnostic
- **Flexibility**: Easy to change external dependencies

## 🏗️ Architecture Principles

1. **Dependency Inversion**: High-level modules don't depend on low-level modules
2. **Single Responsibility**: Each class has one reason to change
3. **Open/Closed**: Open for extension, closed for modification
4. **Interface Segregation**: Clients shouldn't depend on interfaces they don't use
5. **Liskov Substitution**: Objects should be replaceable with instances of their subtypes

## 🔧 Development Guidelines

When adding new features:

1. Start with domain entities and value objects
2. Define repository interfaces in the domain layer
3. Implement use cases in the application layer
4. Create infrastructure implementations
5. Add presentation layer controllers
6. Write comprehensive tests

## 📚 Further Reading

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design](https://martinfowler.com/tags/domain%20driven%20design.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
