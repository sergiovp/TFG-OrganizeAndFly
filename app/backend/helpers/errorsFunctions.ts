import { signErrors, tokenErrors } from './errorsValues';
import status from './statusCodes';

export function getBadArguments(): object {
    return {
        msg: {
            error: { BadArguments: signErrors.BadArguments },
        },
        status: status.BadRequest,
    };
}

export function getWrongData(): object {
    return {
        msg: {
            error: { WrongData: signErrors.WrongData },
        },
        status: status.Notfound,
    };
}

export function getEmailBadSintax(): object {
    return {
        msg: {
            error: { EmailBadSyntax: signErrors.EmailBadSyntax },
        },
        status: status.BadRequest,
    };
}

export function getMatchPasswords() {
    return {
        msg: {
            error: {PasswordsDontMatch: signErrors.PasswordsDontMatch },
        },
        status: status.BadRequest,
    };
}

export function getSecurePass() {
    return {
        msg: {
            error: {UnsafePass: signErrors.UnsafePass },
        },
        status: status.BadRequest,
    };
}

export function getDuplicateEmail() {
    return {
        msg: {
            error: {DuplicatedEmail: signErrors.DuplicatedEmail },
        },
        status: status.BadRequest,
    };
}

export function getBDError(err: any): object {
    return {
        msg: {
            error: { BDError: err.message },
        },
        status: status.Notfound,
    };
}

export function getTokenNotProvided() {
    return {
        msg: {
            error: { TokenDoesNotProvided: tokenErrors.TokenDoesNotProvided },
        },
        status: status.Unauthorized,
    };
}

export function getTokenNotMatch() {
    return {
        msg: {
            error: { TokenDoesNotMatch: tokenErrors.TokenDoesNotMatch },
        },
        status: status.Unauthorized,
    };
}
