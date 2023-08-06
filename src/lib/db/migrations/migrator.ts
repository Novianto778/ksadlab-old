import { uri } from '@/config/db';
import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql2 from 'mysql2/promise';
import path from 'path';

const doMigrate = async () => {
    try {
        const dbConnection = await mysql2.createConnection({
            uri: uri,
        });
        const dbMigrator = drizzle(dbConnection);

        await migrate(dbMigrator, {
            migrationsFolder: path.resolve('.drizzle', 'migrations'),
        });
        console.log('migration done');
        process.exit(0);
    } catch (e) {
        console.log('migration error: ', e);
        process.exit(0);
    }
};
doMigrate();
