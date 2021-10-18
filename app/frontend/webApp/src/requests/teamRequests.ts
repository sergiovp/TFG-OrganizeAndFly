import axios from 'axios';
import generateHeader from '../helpers/generateHeader';

const URL = 'http://localhost:7777/';

axios.defaults.withCredentials = true;

export async function addTeam(teamName: string, teamDescription: string, token: string, userID: string) {
    try {
        return await axios.post(URL + 'team',
        {
            teamName,
            teamDescription,
            userID
        },
        {
            headers: generateHeader(token),
        });
    } catch(err) {
        return err.response ? err.response.data : err;
    }
}

export async function getUserTeams(token: string, userID: string) {
    try {
        return await axios.get(URL + 'teams/' + userID, {
            headers: generateHeader(token),
        });
    } catch(err) {
        return err.response ? err.response.data : err;
    }
}

export async function getTeam(token: string, teamID: string) {
    try {
        return await axios.get(URL + 'team/' + teamID, {
            headers: generateHeader(token),
        });
    } catch(err) {
        return err.response ? err.response.data : err;
    }
}
