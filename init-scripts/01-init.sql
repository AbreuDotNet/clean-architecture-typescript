-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the database if it doesn't exist
-- Note: This script runs in the postgres database by default
-- The cleanarchdb database is created via POSTGRES_DB environment variable

-- Set password for postgres user
ALTER USER postgres PASSWORD 'password123';
