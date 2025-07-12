import { ValueObject } from '../common/ValueObject';
import * as bcrypt from 'bcryptjs';

interface PasswordProps {
  value: string;
  hashed: boolean;
}

export class Password extends ValueObject<PasswordProps> {
  private constructor(props: PasswordProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  get isHashed(): boolean {
    return this.props.hashed;
  }

  public static async create(password: string): Promise<Password> {
    if (!this.isValidPassword(password)) {
      throw new Error('Password must be at least 8 characters long');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    return new Password({ value: hashedPassword, hashed: true });
  }

  public static createFromHash(hashedPassword: string): Password {
    return new Password({ value: hashedPassword, hashed: true });
  }

  public async compare(plainPassword: string): Promise<boolean> {
    if (!this.props.hashed) {
      throw new Error('Cannot compare unhashed password');
    }
    return bcrypt.compare(plainPassword, this.props.value);
  }

  private static isValidPassword(password: string): boolean {
    return password.length >= 8;
  }
}
