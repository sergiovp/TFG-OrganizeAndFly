import { knex as dataBase }  from '../dataBase/instanceDB';
import { getBDError } from '../helpers/errorsFunctions';

const TABLE_NAME = 'sessions';

export async function deleteSessionDB(sid: string) {
    console.log(sid);
    try {
        return await dataBase(TABLE_NAME)
            .where({ sid: sid })
            .first()
            .del();
    } catch (err) {
        return getBDError(err);
    }
}
