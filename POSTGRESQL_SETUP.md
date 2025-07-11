# PostgreSQL Installation Guide (Windows)

## Option 1: Using Docker (Recommended)
1. Start Docker Desktop
2. Run: `docker-compose up -d postgres`

## Option 2: Local PostgreSQL Installation

### Download and Install:
1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Run the installer and follow the setup wizard
3. Remember the password you set for the 'postgres' user

### Create Database:
1. Open pgAdmin or use psql command line
2. Create database: `cleanarchdb`
3. Update your .env file with the correct credentials

### Connect:
- Host: localhost
- Port: 5432
- Database: cleanarchdb
- Username: postgres
- Password: [your password]

## Option 3: Cloud Database (PostgreSQL as a Service)
- Railway: https://railway.app/
- Heroku Postgres: https://www.heroku.com/postgres
- AWS RDS: https://aws.amazon.com/rds/
- Google Cloud SQL: https://cloud.google.com/sql/

## Testing Connection:
After setting up, test with:
```bash
npm run dev
```

The application should connect and display: "✅ Database connection established successfully"
