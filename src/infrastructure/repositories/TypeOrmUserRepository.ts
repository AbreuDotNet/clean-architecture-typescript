import { Repository } from 'typeorm';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { AppDataSource } from '../database/data-source';
import { UserEntity } from '../database/entities/UserEntity';
import { UserMapper } from '../database/mappers/UserMapper';

export class TypeOrmUserRepository implements UserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserEntity);
  }

  async findById(id: string): Promise<User | null> {
    try {
      const userEntity = await this.repository.findOne({ where: { id } });
      return userEntity ? UserMapper.toDomain(userEntity) : null;
    } catch (error) {
      console.error('Error finding user by id:', error);
      throw new Error('Failed to find user by id');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const userEntity = await this.repository.findOne({ where: { email } });
      return userEntity ? UserMapper.toDomain(userEntity) : null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new Error('Failed to find user by email');
    }
  }

  async save(user: User): Promise<void> {
    try {
      // Check if user exists (has an ID and exists in database)
      const existingUser = await this.repository.findOne({ where: { id: user.id } });
      
      if (existingUser) {
        // Update existing user
        await this.repository.update(user.id, {
          name: user.name,
          email: user.email,
          password: user.password,
          updatedAt: user.updatedAt,
        });
      } else {
        // Create new user
        const userEntity = this.repository.create(UserMapper.toCreatePersistence(user));
        await this.repository.save(userEntity);
      }
    } catch (error) {
      console.error('Error saving user:', error);
      throw new Error('Failed to save user');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.repository.delete(id);
      if (result.affected === 0) {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const userEntities = await this.repository.find({
        order: { createdAt: 'DESC' }
      });
      return userEntities.map(entity => UserMapper.toDomain(entity));
    } catch (error) {
      console.error('Error finding all users:', error);
      throw new Error('Failed to find all users');
    }
  }
}
