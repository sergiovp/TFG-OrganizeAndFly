import * as boardModel from './boardModel';
import * as errorFunctions from '../helpers/errorsFunctions';
import * as generations from '../helpers/generations';

export async function addBoard(boardName: string, boardDescription: string) {
    console.log("Controller", boardName)
    if (!boardName) {
        return errorFunctions.getBadArguments();
    }

    const boardID = generations.generateID();

    console.log(boardID)

    const response = await boardModel.addBoardDB(boardID, boardName, boardDescription);
    console.log(response);
}

export async function setBoard(boardID: string, boardName?: string, boardDescription?: string) {

}

export async function deleteBoard(boardID: string) {

}

export async function shareBoard(boardID: string, userEmail: string) {

}
