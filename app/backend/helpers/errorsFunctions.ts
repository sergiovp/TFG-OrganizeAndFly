import errorsValues from './errorsValues';
import status from './statusCodes';

export function getBadArguments(): object {
    return {
        msg: {
            error: { BadArguments: errorsValues.BadArguments },
        },
        status: status.BadRequest,
    };
}

export function getWrongData(): object {
    return {
        msg: {
            error: { WrongData: errorsValues.WrongData },
        },
        status: status.Notfound,
    };
}

export function getEmailBadSintax(): object {
    return {
        msg: {
            error: { EmailBadSyntax: errorsValues.EmailBadSyntax },
        },
        status: status.BadRequest,
    };
}

export function getMatchPasswords() {
    return {
        msg: {
            error: {PasswordsDontMatch: errorsValues.PasswordsDontMatch },
        },
        status: status.BadRequest,
    };
}

export function getSecurePass() {
    return {
        msg: {
            error: {UnsafePass: errorsValues.UnsafePass },
        },
        status: status.BadRequest,
    };
}

export function getDuplicateEmail() {
    return {
        msg: {
            error: {DuplicatedEmail: errorsValues.DuplicatedEmail },
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
            error: { TokenDoesNotProvided: errorsValues.TokenDoesNotProvided },
        },
        status: status.Unauthorized,
    };
}

export function getTokenNotMatch() {
    return {
        msg: {
            error: { TokenDoesNotMatch: errorsValues.TokenDoesNotMatch },
        },
        status: status.Unauthorized,
    };
}
