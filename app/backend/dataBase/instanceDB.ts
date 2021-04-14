import knex from 'knex';
import knexConfig from '../../../knexfile';

const dataBase = knex(knexConfig);

export default dataBase;
