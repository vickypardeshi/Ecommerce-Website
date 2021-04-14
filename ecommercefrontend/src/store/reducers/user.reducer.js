import { userConstants } from '../actions/constants';

const initState = {
    loading: false,
    error: null,
    address: [],
    orders: [],
    ordersFetching: false,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
    switch (action.type) {
        case userConstants.GET_USER_ADDRESS_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case userConstants.GET_USER_ADDRESS_SUCCESS:
            state = {
                ...state,
                loading: false,
                address: action.payload.address,
            }
            break;
        case userConstants.GET_USER_ADDRESS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            }
            break;
        case userConstants.ADD_USER_ADDRESS_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case userConstants.ADD_USER_ADDRESS_SUCCESS:
            state = {
                ...state,
                loading: false,
                address: action.payload.address,
            }
            break;
        case userConstants.ADD_USER_ADDRESS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            }
            break;
        case userConstants.GET_USER_ORDER_REQUEST:
            state = {
                ...state,
                ordersFetching: true,
            }
            break;
        case userConstants.GET_USER_ORDER_SUCCESS:
            state = {
                ...state,
                ordersFetching: false,
                orders: action.payload.orders,
            }
            break;
        case userConstants.GET_USER_ORDER_FAILURE:
            state = {
                ...state,
                ordersFetching: false,
                error: action.payload.error,
            }
            break;
        default:
            return state;
    }
    return state;
}