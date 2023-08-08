import { z } from 'zod';

export const envSchema = z.object({
    NEXT_PUBLIC_DB_URI: z
        .string()
        .default('mysql://root:password@localhost:3307/ksadlab'),
});

export const ENV = envSchema.parse(process.env);
