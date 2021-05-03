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
    } catch (err) {
        return err.response ? err.response.data : err;
    }
}

export async function logIn(email: string, pass: string) {
    try {
        return await axios.post(URL + 'login',{
            email,
            pass
        });
    } catch (err) {
        return err.response ? err.response.data : err;
    }
}

export async function logOut() {
    try {
        localStorage.clear();
        return await axios.get(URL + 'logout');
    } catch (err) {
        return err.response ? err.response.data : err;
    }
}

export async function getProfile(userID: string, token: string) {
    try {
        return await axios.get(URL + 'profile/' + userID, {
            headers: generateHeader(token),
        });
    } catch (err) {
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
    } catch (err) {
        return err.response ? err.response.data : err;
    }
}

export async function deleteProfile(userID: string, token: string) {
    try {
        return await axios.delete(URL + 'profile/' + userID, {
            headers: generateHeader(token),
        });
    } catch (err) {
        return err.response ? err.response.data : err;
    }
}
