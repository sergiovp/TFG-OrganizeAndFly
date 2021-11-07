import * as boardModel from './boardModel';
import { generateID } from '../helpers/generations';

export async function addBoard(boardName: string, boardDescription: string, userID: string) {
    const boardID = generateID();

    return await boardModel.addBoardDB(boardID, boardName, boardDescription, userID);
}

export async function getUserBoards(userID: string) {
    const boardsIDs = await boardModel.getUserBoardsDB(userID);
    let boardInfo = [];

    for (let board of boardsIDs) {
        boardInfo.push(await boardModel.getBoardDB(board.board_id));
    }

    return boardInfo;
}

export async function getBoard(boardID: string) {
    const boardInfo = await boardModel.getBoardDB(boardID);

    return boardInfo;
}

export async function deleteBoard(boardID: string) {
    const response = boardModel.deleteBoardDB(boardID);

    return response;
}

export async function setBoard(boardID: string, name: string, description: string) {
    const response = boardModel.setBoardDB(boardID, name, description);

    return response;
}

export async function addBoardTeam(boardName: string, boardDescription: string, teamID: string, userID: string) {
    const boardID = generateID();

    return await boardModel.addBoardTeamDB(boardID, boardName, boardDescription, userID, teamID);
}

export async function getTeamBoards(teamID: string) {
    const boardsIDs = await boardModel.getTeamBoardsDB(teamID);
    let boardInfo = [];

    for (let board of boardsIDs) {
        boardInfo.push(await boardModel.getBoardTeamDB(board.board_id));
    }

    return boardInfo;
}

export async function isBoardTeam(boardID: string) {
    const response = await boardModel.isBoatdTeamDB(boardID);

    return response.board_team;
}

export async function leaveBoard(userID: string, boardID: string) {
    const isTeamBoard = await boardModel.getBoardParticipantsDB(boardID);

    // The board has more users. Just delete the actual user.
    if (isTeamBoard.length > 1) {
        return await boardModel.deleteParticipant(userID, boardID);
    } 
    // This user is the only user in the board. Delete the board.
    else {
        return await boardModel.deleteBoardDB(boardID);
    }
}
