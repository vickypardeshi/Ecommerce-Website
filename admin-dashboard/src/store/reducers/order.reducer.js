import { orderConstants } from "../actions/constants"

const initState = {
    loading: false,
    error: false,
    orders: [],
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
    switch(action.type){
        case orderConstants.GET_CUSTOMER_ORDER_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case orderConstants.GET_CUSTOMER_ORDER_SUCCESS:
            state = {
                ...state,
                loading: false,
                orders: action.payload.orders,
            }
            break;
        case orderConstants.GET_CUSTOMER_ORDER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: true,
            }
            break;
        default:
            return state;
    }
    return state;
}