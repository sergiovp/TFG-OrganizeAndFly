import axios from 'axios';
import generateHeader from '../helpers/generateHeader';

const URL = 'http://localhost:7777/';

axios.defaults.withCredentials = true;

export async function addBoard(boardName: string, boardDescription: string) {
    console.log("AQUI");
    try {
        return await axios.post(URL + 'board',
        {
            boardName,
            boardDescription
        }/*,
        {
            headers: generateHeader('token'),
        }*/);
    } catch (err) {
        return err.response ? err.response.data : err;
    }
}