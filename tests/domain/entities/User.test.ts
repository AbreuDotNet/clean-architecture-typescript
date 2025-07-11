import { User } from '../../../src/domain/entities/User';

describe('User Entity', () => {
  describe('create', () => {
    it('should create a user with valid properties', () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com'
      };

      const user = User.create(userData);

      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
      expect(user.id).toBeDefined();
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('updateName', () => {
    it('should update user name and updatedAt timestamp', () => {
      const user = User.create({
        name: 'John Doe',
        email: 'john@example.com'
      });

      const originalUpdatedAt = user.updatedAt;
      
      // Wait a bit to ensure timestamp difference
      setTimeout(() => {
        user.updateName('Jane Doe');
        
        expect(user.name).toBe('Jane Doe');
        expect(user.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
      }, 10);
    });
  });

  describe('updateEmail', () => {
    it('should update user email and updatedAt timestamp', () => {
      const user = User.create({
        name: 'John Doe',
        email: 'john@example.com'
      });

      const originalUpdatedAt = user.updatedAt;
      
      setTimeout(() => {
        user.updateEmail('jane@example.com');
        
        expect(user.email).toBe('jane@example.com');
        expect(user.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
      }, 10);
    });
  });

  describe('equals', () => {
    it('should return true for users with same id', () => {
      const userData = { name: 'John Doe', email: 'john@example.com' };
      const user1 = User.create(userData);
      const user2 = new User(user1.id, {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      expect(user1.equals(user2)).toBe(true);
    });

    it('should return false for users with different ids', () => {
      const user1 = User.create({ name: 'John Doe', email: 'john@example.com' });
      const user2 = User.create({ name: 'Jane Doe', email: 'jane@example.com' });

      expect(user1.equals(user2)).toBe(false);
    });
  });
});
