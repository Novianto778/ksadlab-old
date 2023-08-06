import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { createConnection } from 'mysql2';

const connection = createConnection(
    'mysql://root:password@localhost:3307/ksadlab'
);
const db = drizzle(connection);

async function runMigrate() {
    await migrate(db, { migrationsFolder: 'drizzle' });
}

runMigrate()
    .then(() => {
        console.log('Migration completed');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Migration failed', err);
        process.exit(1);
    });
