import * as listModel from '../list/listModel';
import { generateID } from '../helpers/generations';

export async function addList(listName: string, listDescription: string, boardID: string) {
    const listID = generateID();

    return await listModel.addListBD(listID, listName, listDescription, boardID);
}


export async function getBoardLists(boardID: string) {
    const listsIDs = await listModel.getBoardListsDB(boardID);
    let listInfo = [];

    for (let list of listsIDs) {
        listInfo.push(await listModel.getListDB(list.list_id));
    }

    return listInfo;
}

export async function getList(listID: string) {
    const listInfo = await listModel.getListDB(listID);

    return listInfo;
}

export async function deleteList(listID: string) {
    const response = await listModel.deleteListDB(listID);

    return response;
}

export async function setList(listID: string, name: string, description: string) {
    const response = await listModel.setListDB(listID, name, description);

    return response;
}
