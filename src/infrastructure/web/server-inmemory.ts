import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { UserController } from '../../presentation/controllers/UserController';
import { AuthController } from '../../presentation/controllers/AuthController';
import { UserService } from '../../application/services/UserService';
import { AuthService } from '../../application/services/AuthService';
import { InMemoryUserRepository } from '../repositories/InMemoryUserRepository';
import { AuthMiddleware } from './middleware/AuthMiddleware';
// import { TypeOrmUserRepository } from '../repositories/TypeOrmUserRepository';
// import { initializeDatabase } from '../database/data-source';

const app = express();
const port = process.env.PORT || 3000;

// Use InMemoryUserRepository for now (while setting up database)
async function startServer() {
  try {
    console.log('🔗 Using In-Memory Database (for testing)');

    // Middleware
    app.use(express.json());

    // Dependency Injection - Using in-memory repository for now
    const userRepository = new InMemoryUserRepository();
    const userService = new UserService(userRepository);
    const authService = new AuthService(userRepository);
    const userController = new UserController(userService);
    const authController = new AuthController(authService);
    const authMiddleware = new AuthMiddleware(authService);

    // Auth Routes (Public)
    app.post('/api/auth/register', (req, res) => authController.register(req, res));
    app.post('/api/auth/login', (req, res) => authController.login(req, res));

    // Protected Routes - Require Authentication
    app.get('/api/auth/profile', authMiddleware.authenticate, (req, res) => authController.getProfile(req, res));
    app.post('/api/auth/logout', authMiddleware.authenticate, (req, res) => authController.logout(req, res));

    // User Routes (Protected)
    app.get('/api/users', authMiddleware.authenticate, (req, res) => userController.getAllUsers(req, res));
    app.get('/api/users/:id', authMiddleware.authenticate, (req, res) => userController.getUserById(req, res));
    app.post('/api/users', authMiddleware.authenticate, (req, res) => userController.createUser(req, res));
    app.put('/api/users/:id', authMiddleware.authenticate, (req, res) => userController.updateUser(req, res));
    app.delete('/api/users/:id', authMiddleware.authenticate, (req, res) => userController.deleteUser(req, res));

    // Health check
    app.get('/health', (req, res) => {
      res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        database: 'In-Memory (temporary)'
      });
    });

    app.listen(port, () => {
      console.log(`🚀 Clean Architecture server running on port ${port}`);
      console.log(`🔍 Health check: http://localhost:${port}/health`);
      console.log(`� Auth endpoints:`);
      console.log(`   POST http://localhost:${port}/api/auth/register`);
      console.log(`   POST http://localhost:${port}/api/auth/login`);
      console.log(`   GET  http://localhost:${port}/api/auth/profile (protected)`);
      console.log(`📡 User endpoints: http://localhost:${port}/api/users (protected)`);
      console.log(`⚠️  Using in-memory database. Start PostgreSQL to use persistent storage.`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();

export default app;
