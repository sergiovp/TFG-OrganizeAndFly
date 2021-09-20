/**
 * Knex file configuration
 */

import dotenv from 'dotenv';
import path from 'path';

// Configure DOTENV to use ENV variables.
dotenv.config();

const knexConfig = {
    client: 'pg',
    connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME
    },
	migrations: {
		extension: 'ts',
		directory: path.join(__dirname, 'app/backend/dataBase/migrations'),
	},
	seeds: {
		directory: path.join(__dirname, 'src/backend/dataBase/seeds'),
	},
};

export default knexConfig;
