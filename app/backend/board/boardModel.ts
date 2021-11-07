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
            .where({
                'board_id': boardID,
                
            })
            .select('board_name', 'board_description', 'board_id')
            .first();
    } catch (err) {
        return getBDError(err);
    }
}

export async function getBoardTeamDB(boardID: string) {
    try {
        return await dataBase('boards')
            .where({
                'board_id': boardID,
                'board_team': true
            })
            .select('board_name', 'board_description', 'board_id')
            .first();
    } catch (err) {
        return getBDError(err);
    }
}

export async function deleteBoardDB(boardID: string) {
    try {
        return await dataBase('boards')
            .first()
            .where({'board_id': boardID})
            .del()
    } catch (err) {
        return getBDError(err);
    }
}

export async function setBoardDB(boardID: string, name: string, description: string) {
    try {
        await dataBase('boards')
            .first()
            .where('board_id', boardID)
            .update({
                'board_name': name,
                'board_description': description
            })
        return await dataBase(TABLE_NAME)
            .select('board_id', 'board_name', 'board_id')
            .first()
            .where(ID_DB_NAME, boardID);
    } catch (err) {
        return getBDError(err);
    }
}

export async function addBoardTeamDB(
    boardID: string,
    boardName: string,
    boardDescription: string,
    userID: string,
    teamID: string) {
        try {
            await dataBase(TABLE_NAME)
                .insert({
                    board_id: boardID,
                    board_name: boardName,
                    board_description: boardDescription,
                    board_team: true
                })
            await dataBase('team_board')
                .insert({
                    team_id: teamID,
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

export async function getTeamBoardsDB(teamID: string) {
    try {
        return await dataBase('team_board')
            .select('board_id')
            .where('team_id', teamID);
    } catch (err) {
        return getBDError(err);
    }
}

export async function isBoatdTeamDB(boardID: string) {
    try {
        return await dataBase('boards')
            .select('board_team')
            .first()
            .where({'board_id': boardID})
    } catch (err) {
        return getBDError(err);
    }
}

export async function getBoardParticipantsDB(boardID: string) {
    try {
        return await dataBase('user_board')
            .where({
                'board_id': boardID
            })
    } catch (err) {
        return getBDError(err);
    }
}

export async function deleteParticipant(userID: string, boardID: string) {
    try {
        return await dataBase('user_board')
            .first()
            .where({
                'board_id': boardID,
                'user_id': userID
            })
            .del();
    } catch (err) {
        return getBDError(err);
    }
}
