# Agile Kanban Board

A Kanban board application built with React, TypeScript, Vite for the frontend, and Node.js, Express, Prisma (PostgreSQL) for the backend.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A PostgreSQL database (e.g., local PostgreSQL instance or a service like [Supabase](https://supabase.com/))

## Setup Process

Follow these steps to get the project running locally after cloning the repository.

### 1. Install Dependencies

Install the dependencies for both the frontend and the backend.

```bash
# Install frontend dependencies (root directory)
npm install

# Navigate to the backend directory and install backend dependencies
cd backend
npm install
cd ..
```

### 2. Configure Environment Variables

You need to set up environment variables for both the backend and frontend.

#### Backend Environment Variables
Create a `.env` file in the `backend/` directory:

```env
# backend/.env
DATABASE_URL="your_postgresql_database_connection_url"
DIRECT_URL="your_postgresql_direct_connection_url" # Required if using a connection pooler like Supabase
FRONTEND_URL="http://localhost:5173"
JWT_SECRET="your_secret_key_for_jwt"
```

#### Frontend Environment Variables
Create a `.env.development` file in the root directory:

```env
# .env.development
VITE_API_BASE_URL='http://localhost:3000'
```

### 3. Initialize the Database

Navigate to the backend directory and set up your Prisma database schema.

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Push the schema to your database (creates tables)
npx prisma db push
# Alternatively, you can use `npx prisma migrate dev` if you want to track migration history.

cd ..
```

### 4. Run the Application

You can start both the frontend and backend servers concurrently from the root directory using a single command:

```bash
# Runs frontend on port 5173 and backend on port 3000
npm run dev
```

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:3000](http://localhost:3000)

## Available Scripts (Root Directory)

- `npm run dev`: Starts both frontend and backend development servers concurrently.
- `npm run dev:frontend`: Starts only the frontend development server.
- `npm run dev:backend`: Starts only the backend development server.
- `npm run build`: Builds the frontend for production.
- `npm run lint`: Runs ESLint.
