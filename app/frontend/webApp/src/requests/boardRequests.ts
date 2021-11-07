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
        } catch (err :any) {
            return err.response ? err.response.data : err;
        }
}

export async function addBoardTeam(
    boardName: string,
    boardDescription: string,
    token: string,
    teamID: string,
    userID: string) {
        try {
            return await axios.post(URL + 'boardTeam',
            {
                boardName,
                boardDescription,
                teamID,
                userID
            },
            {
                headers: generateHeader(token),
            });
        } catch (err :any) {
            return err.response ? err.response.data : err;
        }
}

export async function getUserBoards(token: string, userID: string) {
    try {
        return await axios.get(URL + 'boards/' + userID, {
            headers: generateHeader(token),
        });
    } catch(err :any) {
        return err.response ? err.response.data : err;
    }
}

export async function getTeamBoards(token: string, teamID: string) {
    try {
        return await axios.get(URL + 'boardsTeam/' + teamID, {
            headers: generateHeader(token),
        });
    } catch(err :any) {
        return err.response ? err.response.data : err;
    }
}

export async function getBoard(token: string, boardID: string) {
    try {
        return await axios.get(URL + 'board/' + boardID, {
            headers: generateHeader(token),
        });
    } catch(err :any) {
        return err.response ? err.response.data : err;
    }
}

export async function deleteBoard(token: string, boardID: string) {
    try {
        return await axios.delete(URL + 'board/' + boardID, {
            headers: generateHeader(token),
        });
    } catch (err :any) {
        return err.response ? err.response.data : err;
    }
}

export async function setBoard(token: string, boardID: string, name: string, description: string) {
    try {
        return await axios.put(URL + 'board/' + boardID, {
            name,
            description
        },
        {
            headers: generateHeader(token),
        });
    } catch (err :any) {
        return err.response ? err.response.data : err;
    }
}

export async function isBoardTeam(token: string, boardID: string) {
    try {
        return await axios.get(URL + 'isBoardTeam/' + boardID, {
            headers: generateHeader(token),
        });
    } catch(err :any) {
        return err.response ? err.response.data : err;
    }
}

export async function leaveBoard(token: string, userID: string, boardID: string) {
    try {
        return await axios.delete(URL + 'leaveBoard/' + userID + '/' + boardID, {
            headers: generateHeader(token),
        });
    } catch (err :any) {
        return err.response ? err.response.data : err;
    }
}
