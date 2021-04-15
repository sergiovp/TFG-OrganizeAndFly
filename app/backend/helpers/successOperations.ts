import status from './statusCodes';

export function userDeleted(): object {
    return {
        msg: {
            info: 'User profile was deleted successfully'
        },
        status: status.Success,
    };
}
