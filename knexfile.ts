/**
 * Knex file configuration
 */

import path from 'path';

const knexConfig = {
    client: 'pg',
    connection: {
		host: 'localhost',
		user: 'vela',
		password: 'vela',
		database: 'app'
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
