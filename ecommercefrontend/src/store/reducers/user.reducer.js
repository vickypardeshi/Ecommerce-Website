import { userConstants } from '../actions/constants';

const initState = {
    loading: false,
    error: null,
    orderFetching: false,
    placeOrder: false,
    address: [],
    orders: [],
    orderDetails: [],
    placedOrderId: null,
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
                orderFetching: true,
            }
            break;
        case userConstants.GET_USER_ORDER_SUCCESS:
            state = {
                ...state,
                orderFetching: false,
                orders: action.payload.orders,
            }
            break;
        case userConstants.GET_USER_ORDER_FAILURE:
            state = {
                ...state,
                orderFetching: false,
                error: action.payload.error,
            }
            break;
        case userConstants.GET_USER_ORDER_DETAILS_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case userConstants.GET_USER_ORDER_DETAILS_SUCCESS:
            state = {
                ...state,
                loading: false,
                orderDetails: action.payload.order,
            }
            break;
        case userConstants.GET_USER_ORDER_DETAILS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            }
            break;
        case userConstants.ADD_USER_ORDER_REQUEST:
            state = {
                ...state,
                placeOrder: true,
            };
            break;
        case userConstants.ADD_USER_ORDER_SUCCESS:
            state = {
                ...state,
                placeOrder: false,
                placedOrderId: action.payload.order._id,
            };
            break;
        case userConstants.ADD_USER_ORDER_FAILURE:
            state = {
                ...state,
                placeOrder: false,
                error: action.payload.error
            };
            break;
        default:
            return state;
    }
    return state;
};
