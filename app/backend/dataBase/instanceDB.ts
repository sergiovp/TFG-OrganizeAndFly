import knex from 'knex';
import knexConfig from '../../../knexfile';

export const dataBase = knex(knexConfig);
