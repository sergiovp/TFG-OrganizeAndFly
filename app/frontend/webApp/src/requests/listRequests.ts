import axios from 'axios';
import generateHeader from '../helpers/generateHeader';

const URL = 'http://localhost:7777/';

axios.defaults.withCredentials = true;

export async function addList(
    listName: string,
    listDescription: string,
    boardId: string,
    token: string) {
        try {
            return await axios.post(URL + 'list',
            {
                listName,
                listDescription,
                boardId
            },
            {
                headers: generateHeader(token),
            });
        } catch (err: any) {
            return err.response ? err.response.data : err;
        }
}

export async function getBoardLists(token: string, boardID: string) {
    try {
        return await axios.get(URL + 'lists/' + boardID, {
            headers: generateHeader(token),
        });
    } catch(err: any) {
        return err.response ? err.response.data : err;
    }
}

export async function getList(token: string, listID: string) {
    try {
        return await axios.get(URL + 'list/' + listID, {
            headers: generateHeader(token),
        });
    } catch(err: any) {
        return err.response ? err.response.data : err;
    }
}

export async function deleteList(token: string, listID: string) {
    try {
        return await axios.delete(URL + 'list/' + listID, {
            headers: generateHeader(token),
        });
    } catch (err: any) {
        return err.response ? err.response.data : err;
    }
}

export async function setList(token: string, listID: string, name: string, description?: string) {
    try {
        return await axios.put(URL + 'list/' + listID, {
            name,
            description
        },
        {
            headers: generateHeader(token),
        });
    } catch (err: any) {
        return err.response ? err.response.data : err;
    }
}
