import Knex from 'knex';
import knexConfig from '../../../knexfile';
import knexSessionStore from 'connect-session-knex';
import session from 'express-session';

const knexSession = knexSessionStore(session);

export const knex: any = Knex(knexConfig);

export const storeKnexSession = new knexSession({
    knex,
    tablename: 'sessions',
});
