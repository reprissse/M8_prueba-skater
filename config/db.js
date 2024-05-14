import pkg from 'pg';
import { config } from 'dotenv';
const { Pool } = pkg;

config();

const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_HOST } = process.env

const configDB = {
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    allowExistOnIdle: true
};

const pool = new Pool(configDB);

export default pool;
