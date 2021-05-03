import status from './statusCodes';

export function userDeleted(): object {
    return {
        msg: {
            info: 'User profile was deleted successfully'
        },
        status: status.Success,
    };
}

export function profileUpdated(): object {
    return {
        info: 'User profile was updated successfully',
        status: status.Success,
    };
}

export function sessionDeleted() {
    return {
        msg: {
            info: 'Session was deleted successfully from the DB'
        },
        status: status.Success,
    };
}
