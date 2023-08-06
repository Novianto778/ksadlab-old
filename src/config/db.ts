import { ENV } from './env';

const host = ENV.DB_HOST;
const port = ENV.DB_PORT;
const user = ENV.DB_USER;
const password = ENV.DB_PASSWORD;
const database = ENV.DB_DATABASE;

export const uri = `mysql://${user}:${password}@${host}:${port}/${database}`;
