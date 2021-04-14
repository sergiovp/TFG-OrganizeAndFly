import { signErrors } from './errorsValues';
import status from './statusCodes';

export function getBadArguments() {
    return {
        msg: {
            error: { BadArguments: signErrors.BadArguments },
        },
        status: status.BadRequest,
    };
}

export function getWrongData() {
    return {
        msg: {
            error: { WrongData: signErrors.WrongData },
        },
        status: status.Notfound,
    };
}



export function getBDError(err: any) {
    return {
        msg: {
            error: { BDError: err.message },
        },
        status: status.Notfound,
    };
}
