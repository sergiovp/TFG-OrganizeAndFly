import * as userModel from './userModel';
import * as errorFunctions from '../helpers/errorsFunctions';
import * as validations from '../helpers/validations';
import * as generations from '../helpers/generations';
import { userDeleted } from '../helpers/successOperations';

export async function signUp(email: string, pass: string, passConfirmation: string): Promise<any> {
    if (!email || !pass || !passConfirmation) {
        return errorFunctions.getBadArguments();
    }

    if (!(validations.validateEmail(email))) {
        return errorFunctions.getEmailBadSintax();
    }

    if (!(validations.validateSecurePass(pass))) {
        return errorFunctions.getSecurePass();
    }

    if (pass !== passConfirmation) {
        return errorFunctions.getMatchPasswords();
    }

    const userID = generations.generateID();
    const encryptedPass = await generations.generateEncryptedPass(pass);

    const userData = await userModel.signUpDB(userID, email, encryptedPass);

    if (userData.msg?.error) {
        if (validations.validateDuplicateEmail(userData.msg?.error)) {
            return errorFunctions.getDuplicateEmail();
        }
        return userData;
    }
    const token = generations.generateUserToken(userData);

    return {token: token};
}

export async function logIn(email: string, pass: string): Promise<any> {
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

export async function deleteProfile(userID: string): Promise<any> {
    const userData = await userModel.deleteProfileDB(userID);

    if (!(typeof(userData) == 'number')) {
        return userData;
    }

    if (userData !== 1) {
        return errorFunctions.getUserNotDeleted();
    }
    return userDeleted();
}

export async function getProfile(userID: string): Promise<any> {
    const userData = await userModel.getProfileDB(userID);

    if (!userData) {
        return errorFunctions.getUserNotFound();
    }
    return userData;
}
