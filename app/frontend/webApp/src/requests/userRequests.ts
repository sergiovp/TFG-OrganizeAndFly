import axios from 'axios';
import generateHeader from '../helpers/generateHeader';

const URL = 'http://localhost:7777/';

axios.defaults.withCredentials = true;

export async function signUp(email: string, pass: string, passConfirmation: string) {
    try {
        return await axios.post(URL + 'signup', {
            email,
            pass,
            passConfirmation
        });
    } catch (err: any) {
        return err.response ? err.response.data : err;
    }
}

export async function logIn(email: string, pass: string) {
    try {
        return await axios.post(URL + 'login',{
            email,
            pass
        });
    } catch (err: any) {
        return err.response ? err.response.data : err;
    }
}

export async function logOut() {
    try {
        localStorage.clear();
        return await axios.get(URL + 'logout');
    } catch (err: any) {
        return err.response ? err.response.data : err;
    }
}

export async function getProfile(userID: string, token: string) {
    try {
        return await axios.get(URL + 'profile/' + userID, {
            headers: generateHeader(token),
        });
    } catch (err: any) {
        return err.response ? err.response.data : err;
    }
}

export async function setProfile(userID: string, token: string, email?: string, actualPass?: string, newPass?: string, newPassRep?: string) {
    try {
        return await axios.put(URL + 'profile/' + userID, {
            email,
            actualPass,
            newPass,
            newPassRep,
        },
        {
            headers: generateHeader(token),
        });
    } catch (err: any) {
        return err.response ? err.response.data : err;
    }
}

export async function deleteProfile(userID: string, token: string) {
    try {
        return await axios.delete(URL + 'profile/' + userID, {
            headers: generateHeader(token),
        });
    } catch (err: any) {
        return err.response ? err.response.data : err;
    }
}

export async function getUserEmail(token:string, userEmail: string) {
    try {
        return await axios.get(URL + 'user/' + userEmail, {
            headers: generateHeader(token),
        });
    } catch (err: any) {
        return err.response ? err.response.data : err;
    }
}

export async function getParticipantsBoard(token: string, boardID: string) {
    try {
        return await axios.get(URL + 'participants/' + boardID, {
            headers: generateHeader(token),
        });
    } catch (err: any) {
        return err.response ? err.response.data : err;
    }
}

export async function insertParticipant(token: string, userEmail: string, boardID: string) {
    try {
        return await axios.post(URL + 'participant/',
        {
            userEmail,
            boardID
        },{
            headers: generateHeader(token),
        });
    } catch (err: any) {
        return err.response ? err.response.data : err;
    }
}

export async function insertTeamParticipant(token: string, userEmail: string, teamID: string) {
    try {
        return await axios.post(URL + 'participantTeam/',
        {
            userEmail,
            teamID
        },{
            headers: generateHeader(token),
        });
    } catch (err: any) {
        return err.response ? err.response.data : err;
    }
}
