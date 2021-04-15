import dataBase from '../dataBase/instanceDB';
import { getBDError } from '../helpers/errorsFunctions';

const TABLE_NAME = 'users';
const ID_DB_NAME = 'user_id';
const EMAIL_DB_NAME = 'email';

export async function signUpDB(userID: string, email:string, pass: string): Promise<any> {
    try {
        await dataBase(TABLE_NAME)
            .insert({ user_id: userID, email: email, pass: pass })
        return await dataBase(TABLE_NAME)
            .select('user_id', 'email', 'pass')
            .first()
            .where(ID_DB_NAME, userID);
    } catch (err) {
        return getBDError(err);
    }
}

export async function logInDB(email: string, pass: string): Promise<any> {
    try {
        return await dataBase(TABLE_NAME)
            .first()
            .where(EMAIL_DB_NAME, email);
    } catch (err) {
        return getBDError(err);
    }
}

export async function deleteProfileDB(userID: string): Promise<any> {
    try {
        return await dataBase(TABLE_NAME)
            .first()
            .where(ID_DB_NAME, userID)
            .del();
    } catch (err) {
        return getBDError(err);
    }
}

export async function getProfileDB(userID: string): Promise<any> {
    try {
        return await dataBase(TABLE_NAME)
            .first()
            .where(ID_DB_NAME, userID );
    } catch (err) {
        return getBDError(err);
    }
}
