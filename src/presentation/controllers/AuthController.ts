import { Request, Response } from 'express';
import { AuthService } from '../../application/services/AuthService';
import { RegisterUserDto, LoginUserDto } from '../../application/dtos/AuthDto';

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const dto: RegisterUserDto = req.body;
      
      // Basic validation
      if (!dto.email || !dto.name || !dto.password) {
        res.status(400).json({ error: 'Email, name, and password are required' });
        return;
      }

      if (dto.password.length < 8) {
        res.status(400).json({ error: 'Password must be at least 8 characters long' });
        return;
      }

      const result = await this.authService.register(dto);
      res.status(201).json(result);
    } catch (error) {
      if ((error as Error).message === 'User with this email already exists') {
        res.status(409).json({ error: (error as Error).message });
      } else {
        res.status(400).json({ error: (error as Error).message });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const dto: LoginUserDto = req.body;
      
      // Basic validation
      if (!dto.email || !dto.password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
      }

      const result = await this.authService.login(dto);
      res.json(result);
    } catch (error) {
      if ((error as Error).message === 'Invalid credentials') {
        res.status(401).json({ error: (error as Error).message });
      } else {
        res.status(400).json({ error: (error as Error).message });
      }
    }
  }

  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      // User is added to request by auth middleware
      if (!req.user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }

      res.json({ user: req.user });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      // For JWT, logout is handled client-side by removing the token
      // In a real app, you might want to implement token blacklisting
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
