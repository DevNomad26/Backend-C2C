import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  FRONTEND_URL: z.string().url(),
  ALLOWED_EMAIL_DOMAIN: z.string().min(1),
  JWT_SECRET: z.string().min(10),
});


const parsed = envSchema.safeParse(process.env);

// If anything is missing or wrong, crash immediately with a clear message
if (!parsed.success) {
  console.error('Missing or invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);  // stop the server
}

// Export the validated, typed env object
export const env = parsed.data;