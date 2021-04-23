import { getSession } from '../helpers/auth';

const initialState = {
    user: {
        id: "",
        email: "",
        isLogged: false,
    }
}

// TYPES
const CREATE_USER = 'CREATE_USER';

export default function sessionReducer(state = initialState, action: any) {
    switch(action.type) {
        case CREATE_USER:
            return { ...state, 
                id: action.payload.user_id,
                email: action.payload.email,
                isLogged: true,
            }
        default:
            return state;
    }
}

export const createUser = () => async (dispath: any, getState: any) => {
    const res = await getSession();
    dispath({
        type: CREATE_USER,
        payload: res.data,
    });
}
