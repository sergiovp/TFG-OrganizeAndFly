import * as boardModel from './boardModel';
import { generateID } from '../helpers/generations';

export async function addBoard(boardName: string, boardDescription: string, userID: string) {
    const boardID = generateID();

    return await boardModel.addBoardDB(boardID, boardName, boardDescription, userID);
}

export async function setBoard(boardID: string, boardName?: string, boardDescription?: string) {

}

export async function deleteBoard(boardID: string) {

}

export async function shareBoard(boardID: string, userEmail: string) {

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
