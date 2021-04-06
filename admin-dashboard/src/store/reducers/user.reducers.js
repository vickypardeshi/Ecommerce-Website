import { userConstants } from "../actions/constants";

const initState = {
    error: null,
    loading: false,
    message: '',
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
    switch (action.type){
        case userConstants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case userConstants.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
            }
            break;
        case userConstants.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            }
            break;
        default:
            return state;
    }
    return state
};