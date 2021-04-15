import dataBase from '../dataBase/instanceDB';
import { getBDError } from '../helpers/errorsFunctions';

const TABLE_NAME = 'users';

export async function signUpDB(userID: string, email:string, pass: string): Promise<any> {
    try {
        await dataBase(TABLE_NAME)
            .insert({ user_id: userID, email: email, pass: pass })
        return await dataBase(TABLE_NAME)
            .select('user_id', 'email', 'pass')
            .first()
            .where({ user_id: userID });
    } catch (err) {
        return getBDError(err);
    }
}

export async function logInDB(email: string, pass: string): Promise<any> {
    try {
        return await dataBase(TABLE_NAME)
            .first()
            .where({ email: email });
    } catch (err) {
        return getBDError(err);
    }
}
