// Application Layer - Use Cases and DTOs

export interface CreateUserDto {
  email: string;
  name: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
}

export interface UserResponseDto {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
