import { cartConstants } from '../actions/constants';

const initState = {
    cartItems: {
        // 123: {
        //     _id: 123,
        //     name: 'Samsung mobile',
        //     img: 'some.img',
        //     price: 2000,
        //     qty: 1, 
        // }
    },
    loading: false,
    error: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
    switch(action.type){
        case cartConstants.ADD_TO_CART_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case cartConstants.ADD_TO_CART_SUCCESS:
            state = {
                ...state,
                loading: false,
                cartItems: action.payload.cartItems
            }
            break;
        case cartConstants.ADD_TO_CART_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            }
            break;
        case cartConstants.RESET_CART_SUCCESS:
            state = {
                ...initState
            }
            break;
        default:
            return state;
    }
    return state;
};
