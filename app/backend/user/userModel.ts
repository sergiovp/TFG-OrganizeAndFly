import dataBase from '../dataBase/instanceDB';
import { getBDError } from '../helpers/errorsFunctions';

const TABLE_NAME = 'users';

export async function logInDB(email: string, pass: string): Promise<any> {
    try {
        return await dataBase(TABLE_NAME)
            .first()
            .where({ email: email });
    } catch (err) {
        return getBDError(err);
    }
}
