import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { UserController } from '../../presentation/controllers/UserController';
import { UserService } from '../../application/services/UserService';
import { InMemoryUserRepository } from '../repositories/InMemoryUserRepository';
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
    const userController = new UserController(userService);

    // Routes
    app.get('/api/users', (req, res) => userController.getAllUsers(req, res));
    app.get('/api/users/:id', (req, res) => userController.getUserById(req, res));
    app.post('/api/users', (req, res) => userController.createUser(req, res));
    app.put('/api/users/:id', (req, res) => userController.updateUser(req, res));
    app.delete('/api/users/:id', (req, res) => userController.deleteUser(req, res));

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
      console.log(`📡 API endpoints: http://localhost:${port}/api/users`);
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
