import { knex as dataBase }  from '../dataBase/instanceDB';
import { getBDError } from '../helpers/errorsFunctions';

const TABLE_NAME = 'users';
const ID_DB_NAME = 'user_id';
const EMAIL_DB_NAME = 'email';
const PASS_DB_NAME = 'pass';

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

export async function setProfileDB(userID: string, email?: string, pass?: string): Promise<any> {
    try {
        await dataBase(TABLE_NAME)
            .first()
            .where(ID_DB_NAME, userID)
            .update({ email: email, pass: pass });
        return await dataBase(TABLE_NAME)
            .select('user_id', 'email', 'pass')
            .first()
            .where(ID_DB_NAME, userID);
    } catch (err) {
        return getBDError(err);
    }
}

export async function getPass(userID: string): Promise<any> {
    try {
        return await dataBase(TABLE_NAME)
            .select(PASS_DB_NAME)
            .first()
            .where(ID_DB_NAME, userID);
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

export async function getUserEmailDB(userEmail: string) {
    try {
        return dataBase('users')
        .select('email')
            .first()
            .where('email', userEmail)
    } catch (err) {
        return getBDError(err);
    }
}

export async function getParticipantsDB(boardID: string) {
    try {
        return dataBase('user_board')
            .where('board_id', boardID)
    } catch (err) {
        return getBDError(err);
    }
}

export async function addParticipantDB(userID: string, boardID: string) {
    try {
        return await dataBase('user_board')
            .insert({user_id: userID, board_id: boardID})
    } catch (err) {
        return getBDError(err);
    }
}

export async function getUserIDByEmail(userEmail: string) {
    try {
        return await dataBase('users')
            .select('user_id')
            .first()
            .where('email', userEmail)
    } catch (err) {
        return getBDError(err);
    }
}

export async function getUserEmailByID(userID: string) {
    try {
        return await dataBase('users')
            .select('email')
            .first()
            .where('user_id', userID);
    } catch (err) {
        return getBDError(err);
    }
}

export async function addParticipantTeamDB(userID: string, teamID: string) {
    try {
        return await dataBase('user_team')
            .insert({
                'user_id': userID,
                'team_id': teamID
            })
    } catch (err) {
        return getBDError(err);
    }
}
