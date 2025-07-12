import { Entity } from '../common/Entity';
import { v4 as uuidv4 } from 'uuid';

export interface UserProps {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User extends Entity<string> {
  private props: UserProps;

  constructor(id: string, props: UserProps) {
    super(id);
    this.props = props;
  }

  get email(): string {
    return this.props.email;
  }

  get name(): string {
    return this.props.name;
  }

  get password(): string {
    return this.props.password;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public updateName(name: string): void {
    this.props.name = name;
    this.props.updatedAt = new Date();
  }

  public updateEmail(email: string): void {
    this.props.email = email;
    this.props.updatedAt = new Date();
  }

  public updatePassword(password: string): void {
    this.props.password = password;
    this.props.updatedAt = new Date();
  }

  public static create(props: Omit<UserProps, 'createdAt' | 'updatedAt'>): User {
    const now = new Date();
    const id = uuidv4(); // Generate UUID v4
    
    return new User(id, {
      ...props,
      createdAt: now,
      updatedAt: now
    });
  }
}
