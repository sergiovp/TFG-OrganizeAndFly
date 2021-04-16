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
