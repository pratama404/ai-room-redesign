import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:2IcpRSbOJ3Md@ep-black-sound-a5li0yvm.us-east-2.aws.neon.tech/neondb?sslmode=require',
  },
});
