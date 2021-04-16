import axios from 'axios';
import { generateAuthHeader } from '../helpers/userAuth';

const URL = 'http://localhost:7777/';
const HEADER = generateAuthHeader();

export async function signUp(email: string, pass: string, passConfirmation: string) {
    try {
        return await axios.post(URL + 'signup', {
            email,
            pass,
            passConfirmation
        });
    } catch (err) {
        return err.response.data;
    }
}

export async function logIn(email: string, pass: string) {
    try {
        return await axios.post(URL + 'login', {
            email, 
            pass
        });
    } catch (err) {
        return err.response.data;
    }
}

export async function getProfile(userID: string) {
    try {
        return await axios.get(URL + 'profile/' + userID, {
            headers: HEADER
        });
    } catch (err) {
        return err.response.data;
    }
}

export async function setProfile(userID: string, email?: string, actualPass?: string, newPass?: string) {
    try {
        return await axios.put(URL + 'profile/' + userID, {
            headers: HEADER,
            email,
            actualPass,
            newPass
        });
    } catch (err) {
        return err.response.data;
    }
}

export async function deleteProfile(userID: string) {
    try {
        return await axios.delete(URL + 'profile/' + userID, {
            headers: HEADER
        });
    } catch (err) {
        return err.response.data;
    }
}
