import { Email } from '../../../src/domain/value-objects/Email';

describe('Email Value Object', () => {
  describe('create', () => {
    it('should create email with valid format', () => {
      const validEmail = 'test@example.com';
      const email = Email.create(validEmail);

      expect(email.value).toBe(validEmail);
    });

    it('should throw error for invalid email format', () => {
      const invalidEmails = [
        'invalid',
        'invalid@',
        '@invalid.com',
        'invalid.com',
        '',
        'spaces @domain.com'
      ];

      invalidEmails.forEach(invalidEmail => {
        expect(() => Email.create(invalidEmail))
          .toThrow('Invalid email format');
      });
    });
  });

  describe('equals', () => {
    it('should return true for emails with same value', () => {
      const email1 = Email.create('test@example.com');
      const email2 = Email.create('test@example.com');

      expect(email1.equals(email2)).toBe(true);
    });

    it('should return false for emails with different values', () => {
      const email1 = Email.create('test1@example.com');
      const email2 = Email.create('test2@example.com');

      expect(email1.equals(email2)).toBe(false);
    });

    it('should return false when comparing with null or undefined', () => {
      const email = Email.create('test@example.com');

      expect(email.equals(null as any)).toBe(false);
      expect(email.equals(undefined as any)).toBe(false);
    });
  });
});
