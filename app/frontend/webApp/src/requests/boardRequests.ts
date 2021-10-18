import axios from 'axios';
import generateHeader from '../helpers/generateHeader';

const URL = 'http://localhost:7777/';

axios.defaults.withCredentials = true;

export async function addBoard(
    boardName: string,
    boardDescription: string,
    token: string,
    userID: string) {
        try {
            return await axios.post(URL + 'board',
            {
                boardName,
                boardDescription,
                userID
            },
            {
                headers: generateHeader(token),
            });
        } catch (err) {
            return err.response ? err.response.data : err;
        }
}

export async function getUserBoards(token: string, userID: string) {
    try {
        return await axios.get(URL + 'boards/' + userID, {
            headers: generateHeader(token),
        });
    } catch(err) {
        return err.response ? err.response.data : err;
    }
}

export async function getBoard(token: string, boardID: string) {
    try {
        return await axios.get(URL + 'board/' + boardID, {
            headers: generateHeader(token),
        });
    } catch(err) {
        return err.response ? err.response.data : err;
    }
}
