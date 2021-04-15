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
        msg: {
            info: 'User profile was updated successfully'
        },
        status: status.Success,
    };
}
