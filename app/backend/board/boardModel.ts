import { knex as dataBase }  from '../dataBase/instanceDB';
import { getBDError } from '../helpers/errorsFunctions';

const TABLE_NAME = 'boards';
const ID_DB_NAME = 'board_id';
const BOARD_DB_NAME = 'board_name';
const BOARD_DB_DESCRIPTION = 'board_description';

export async function addBoardDB(boardID: string, boardName: string, boardDescription: string) {
    try {
        await dataBase(TABLE_NAME)
            .insert({
                board_id: boardID,
                board_name: boardName,
                board_description: boardDescription,
                board_team: false
            })
        return await dataBase(TABLE_NAME)
            .select('board_id', 'board_name')
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
