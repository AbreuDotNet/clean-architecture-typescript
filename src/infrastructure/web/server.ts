import express from 'express';
import { UserController } from '../../presentation/controllers/UserController';
import { UserService } from '../../application/services/UserService';
import { InMemoryUserRepository } from '../repositories/InMemoryUserRepository';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Dependency Injection
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
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Clean Architecture server running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/health`);
  console.log(`API endpoints: http://localhost:${port}/api/users`);
});

export default app;
