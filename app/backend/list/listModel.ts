import { data } from 'cypress/types/jquery';
import { knex as dataBase }  from '../dataBase/instanceDB';
import { getBDError } from '../helpers/errorsFunctions';

export async function addListBD(listID: string, listName: string, listDescription: string, boardId: string) {
    try {
        await dataBase('lists')
            .insert({
                list_id: listID,
                list_name: listName,
                list_description: listDescription,
            })
        await dataBase('board_list')
            .insert({
                board_id: boardId,
                list_id: listID
            })
        return await dataBase('lists')
            .select('list_id', 'list_name', 'list_description')
            .first()
            .where('list_id', listID);
    } catch (err) {
        return getBDError(err);
    }
}

export async function getBoardListsDB(boardID: string) {
    try {
        return await dataBase('board_list')
            .select('list_id')
            .where('board_id', boardID)
    } catch (err) {
        return getBDError(err);
    }
}

export async function getListDB(listID: string) {
    try {
        return await dataBase('lists')
            .select('list_id', 'list_name', 'list_description')
            .where('list_id', listID)
            .first();
    } catch (err) {
        return getBDError(err);
    }
}

export async function deleteListDB(listID: string) {
    try {
        return await dataBase('lists')
            .where('list_id', listID)
            .first()    
            .del()
    } catch (err) {
        return getBDError(err);
    }
}

export async function setListDB(listID: string, name: string, description: string) {
    try {
        return await dataBase('lists')
            .first()
            .where('list_id', listID)
            .update({
                'list_name': name,
                'list_description': description
            })
    } catch (err) {
        return getBDError(err);
    }
}
