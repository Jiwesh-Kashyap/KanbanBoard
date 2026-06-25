import "dotenv/config"

import { PrismaClient } from './generated/prisma/client.js'; // Fixed typo here (./generated)
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false }
});

const adapter = new PrismaPg(pool);

// Prisma 7 accepts the adapter parameter like this perfectly!
export const prisma = new PrismaClient({ adapter });
