import { drizzle } from 'drizzle-orm/neon-http';
export const db = drizzle(process.env.NEXT_PUBIC_DATABASE_URL);