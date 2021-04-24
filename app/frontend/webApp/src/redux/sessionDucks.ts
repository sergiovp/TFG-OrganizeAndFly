import { getSession } from '../helpers/auth';

const initialState = {
    user: {
        token: "",
        id: "",
        email: "",
        isLogged: false,
    }
}

// TYPES
const CREATE_USER_SESSION = 'CREATE_USER_SESSION';
const DELETE_USER_SESSION = 'DELETE_USER_SESSION';

export default function sessionReducer(state = initialState, action: any) {
    switch(action.type) {
        case CREATE_USER_SESSION:
            return {
                token: action.payload.token,
                id: action.payload.userData.user_id,
                email: action.payload.userData.email,
                isLogged: true,
            }
        case DELETE_USER_SESSION:
            return {
                token: "",
                id: "",
                email: "",
                isLogged: false,
            }
        default:
            return state;
    }
}

export const createUserAction = (sessionData: any) => async (dispath: any, getState: any) => {
    dispath({
        type: CREATE_USER_SESSION,
        payload: sessionData,
    });
}

export const deleteUserAction = () => async (dispath: any, getState: any) => {
    dispath({
        type: DELETE_USER_SESSION,
    });
}
