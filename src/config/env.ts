import { z } from 'zod';

export const envSchema = z.object({
    NEXT_PUBLIC_DB_URI: z.string(),
});

export const ENV = envSchema.parse(process.env);
