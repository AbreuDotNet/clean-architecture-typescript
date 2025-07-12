import { User } from '../../domain/entities/User';
import { Password } from '../../domain/value-objects/Password';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dtos/UserDto';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const password = await Password.create(dto.password);

    // Create new user
    const user = User.create({
      email: dto.email,
      name: dto.name,
      password: password.value
    });

    await this.userRepository.save(user);

    return this.toResponseDto(user);
  }

  async getUserById(id: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findById(id);
    return user ? this.toResponseDto(user) : null;
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return null;
    }

    if (dto.name) {
      user.updateName(dto.name);
    }

    if (dto.email) {
      user.updateEmail(dto.email);
    }

    if (dto.password) {
      const password = await Password.create(dto.password);
      user.updatePassword(password.value);
    }

    await this.userRepository.save(user);

    return this.toResponseDto(user);
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return false;
    }

    await this.userRepository.delete(id);
    return true;
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => this.toResponseDto(user));
  }

  private toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}
