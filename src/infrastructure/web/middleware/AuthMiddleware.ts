import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../../application/services/AuthService';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
      };
    }
  }
}

export class AuthMiddleware {
  constructor(private authService: AuthService) {}

  authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Access token required' });
        return;
      }

      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      
      const user = await this.authService.getUserFromToken(token);
      if (!user) {
        res.status(401).json({ error: 'Invalid or expired token' });
        return;
      }

      // Add user to request object
      req.user = {
        id: user.id,
        email: user.email,
        name: user.name
      };

      next();
    } catch (error) {
      res.status(401).json({ error: 'Authentication failed' });
    }
  };

  // Optional: Role-based authorization middleware
  authorize = (roles: string[] = []) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      if (!req.user) {
        res.status(401).json({ error: 'Authentication required' });
        return;
      }

      // For now, we don't have roles implemented
      // This is a placeholder for future role-based authorization
      next();
    };
  };
}
