import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';
import { uri } from './src/config/db';
dotenv.config();

export default {
    schema: './src/lib/db/schema',
    out: './src/lib/db/migrations',
    driver: 'mysql2',
    dbCredentials: {
        connectionString: uri,
    },
} satisfies Config;
