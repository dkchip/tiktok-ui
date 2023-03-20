import { LOGIN_USER, LOGOUT_USER } from '../constants';

const initialState = {
    currentUser: {},
    auth: false,
};

function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { 
                    ...state, 
                    currentUser: action.payload, 
                    auth: true
                    };
        case LOGOUT_USER:
            return {
                    ...state, 
                    currentUser: action.payload, 
                    auth: false
                };
        default:
            return state;
    }
}

export default loginReducer;
