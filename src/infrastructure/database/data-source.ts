import { DataSource } from 'typeorm';
import { UserEntity } from './entities/UserEntity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'cleanarchdb',
  synchronize: process.env.NODE_ENV !== 'production', // Only in development
  logging: process.env.NODE_ENV === 'development',
  entities: [UserEntity],
  migrations: ['src/infrastructure/database/migrations/*.ts'],
  subscribers: ['src/infrastructure/database/subscribers/*.ts'],
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connection established successfully');
  } catch (error) {
    console.error('❌ Error during database initialization:', error);
    throw error;
  }
};
