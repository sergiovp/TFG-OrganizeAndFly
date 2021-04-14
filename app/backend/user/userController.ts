import * as userModel from './userModel';
import * as errorFunctions from '../helpers/errorsFunctions';
import * as validations from '../helpers/validations';
import * as generations from '../helpers/generations';

export async function logIn(email: string, pass: string) {
    if (!email || !pass) {
        return errorFunctions.getBadArguments();
    }

    const userData = await userModel.logInDB(email, pass);

    if (!userData) {
        return errorFunctions.getWrongData();
    }

    if (userData.msg?.error) {
        return userData;
    }

    if (!(await validations.validateEncryptedPass(pass, userData.pass))) {
        return errorFunctions.getWrongData();
    }

    const token = generations.generateUserToken(userData);

    return { token: token };
}
