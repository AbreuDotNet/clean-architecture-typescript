import * as jwt from 'jsonwebtoken';
import { User } from '../../domain/entities/User';
import { Password } from '../../domain/value-objects/Password';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { RegisterUserDto, LoginUserDto, AuthResponseDto, JwtPayload } from '../dtos/AuthDto';

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(dto: RegisterUserDto): Promise<AuthResponseDto> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create password hash
    const password = await Password.create(dto.password);

    // Create new user
    const user = User.create({
      email: dto.email,
      name: dto.name,
      password: password.value
    });

    await this.userRepository.save(user);

    // Generate token
    const token = this.generateToken({
      userId: user.id,
      email: user.email
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token
    };
  }

  async login(dto: LoginUserDto): Promise<AuthResponseDto> {
    // Find user by email
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const password = Password.createFromHash(user.password);
    const isValidPassword = await password.compare(dto.password);
    
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = this.generateToken({
      userId: user.id,
      email: user.email
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token
    };
  }

  async verifyToken(token: string): Promise<JwtPayload> {
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error('JWT_SECRET not configured');
      }

      const decoded = jwt.verify(token, secret) as JwtPayload;
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  async getUserFromToken(token: string): Promise<User | null> {
    try {
      const payload = await this.verifyToken(token);
      return this.userRepository.findById(payload.userId);
    } catch (error) {
      return null;
    }
  }

  private generateToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

    if (!secret) {
      throw new Error('JWT_SECRET not configured');
    }

    return jwt.sign(payload, secret, { 
      expiresIn 
    } as jwt.SignOptions);
  }
}
