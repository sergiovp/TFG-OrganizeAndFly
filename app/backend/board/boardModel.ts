import { knex as dataBase }  from '../dataBase/instanceDB';
import { getBDError } from '../helpers/errorsFunctions';

const TABLE_NAME = 'boards';
const ID_DB_NAME = 'board_id';
const BOARD_DB_NAME = 'board_name';
const BOARD_DB_DESCRIPTION = 'board_description';

export async function addBoardDB(
    boardID: string,
    boardName: string,
    boardDescription: string,
    userID: string) {
        try {
            await dataBase(TABLE_NAME)
                .insert({
                    board_id: boardID,
                    board_name: boardName,
                    board_description: boardDescription,
                    board_team: false
                })
            await dataBase('user_board')
                .insert({
                    user_id: userID,
                    board_id: boardID
                })
            return await dataBase(TABLE_NAME)
                .select('board_id', 'board_name', 'board_id')
                .first()
                .where(ID_DB_NAME, boardID);
        } catch (err) {
            return getBDError(err);
        }
}

export async function setBoardDB(boardID: string, boardName?: string, boardDescription?: string) {

}

export async function deleteBoardDB(boardID: string) {

}

export async function shareBoardDB(boardID: string, userEmail: string) {

}

export async function getUserBoardsDB(userID: string) {
    try {
        return await dataBase('user_board')
            .select('board_id')
            .where('user_id', userID);
    } catch (err) {
        return getBDError(err);
    }
}

export async function getBoardDB(boardID: string) {
    try {
        return await dataBase('boards')
            .select('board_name', 'board_description', 'board_id')
            .where('board_id', boardID)
            .first();
    } catch (err) {
        return getBDError(err);
    }
}
