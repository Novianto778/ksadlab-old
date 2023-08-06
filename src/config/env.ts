import { z } from 'zod';

export const envSchema = z.object({
    NODE_ENV: z.string().default('development'),
    PORT: z.string().default('3000'),
    DB_HOST: z.string().default('localhost'),
    DB_PORT: z.string().default('3306'),
    DB_USER: z.string().default('root'),
    DB_PASSWORD: z.string().default(''),
    DB_DATABASE: z.string().default(''),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().default(''),
});

export const ENV = envSchema.parse(process.env);
