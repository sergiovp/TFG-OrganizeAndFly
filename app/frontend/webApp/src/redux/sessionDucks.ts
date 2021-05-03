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
const UPDATE_USER_SESSION = 'UPDATE_USER_SESSION';

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
        case UPDATE_USER_SESSION:
            console.log(action.payload);
            return {
                ...state,
                email: action.payload.email,
            }
        default:
            return state;
    }
}

export const createUserAction = (token: string, userData: any) => async (dispath: any, getState: any) => {
    dispath({
        type: CREATE_USER_SESSION,
        payload: {token, userData},
    });
}

export const deleteUserAction = () => async (dispath: any, getState: any) => {
    dispath({
        type: DELETE_USER_SESSION,
        payload: '',
    });
}

export const setUserDataAction = (email: string) => async (dispath: any, getState: any) => {
    dispath({
        type: UPDATE_USER_SESSION,
        payload: { email },
    });
}
