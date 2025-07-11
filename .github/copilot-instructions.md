<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Clean Architecture Project Instructions

This is a Clean Architecture project implementation using TypeScript and Node.js. When working with this codebase, please follow these guidelines:

## Architecture Principles

1. **Dependency Rule**: Dependencies should only point inward. Outer layers can depend on inner layers, but inner layers should never depend on outer layers.

2. **Layer Structure**:
   - **Domain**: Core business logic, entities, value objects, and repository interfaces
   - **Application**: Use cases, application services, and DTOs
   - **Infrastructure**: External dependencies, database implementations, and frameworks
   - **Presentation**: Controllers, API routes, and user interface

3. **Key Patterns**:
   - Use dependency injection for loose coupling
   - Implement repository pattern for data access
   - Follow SOLID principles
   - Use DTOs for data transfer between layers

## Code Style Guidelines

- Use TypeScript with strict typing
- Follow naming conventions: PascalCase for classes, camelCase for methods and variables
- Keep business logic in the domain layer
- Use async/await for asynchronous operations
- Write unit tests for business logic

## Testing Strategy

- Unit tests for domain entities and value objects
- Integration tests for application services
- API tests for controllers
- Use Jest as the testing framework

## When adding new features:

1. Start with domain entities and value objects
2. Define repository interfaces in the domain layer
3. Implement use cases in the application layer
4. Create infrastructure implementations
5. Add presentation layer controllers
6. Write comprehensive tests

Always maintain the separation of concerns and ensure that business rules remain in the domain layer.
