import { User } from '../../../domain/entities/User';
import { UserEntity } from '../entities/UserEntity';

export class UserMapper {
  static toDomain(userEntity: UserEntity): User {
    return new User(userEntity.id, {
      email: userEntity.email,
      name: userEntity.name,
      password: userEntity.password,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    });
  }

  static toPersistence(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = user.id;
    userEntity.email = user.email;
    userEntity.name = user.name;
    userEntity.password = user.password;
    userEntity.createdAt = user.createdAt;
    userEntity.updatedAt = user.updatedAt;
    return userEntity;
  }

  static toCreatePersistence(user: User): Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      email: user.email,
      name: user.name,
      password: user.password,
    };
  }
}
