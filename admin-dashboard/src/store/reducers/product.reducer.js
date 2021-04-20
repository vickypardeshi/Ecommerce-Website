import { productConstants } from "../actions/constants";

const initState = {
    products: [],
    loading: false,
    error: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                loading: false,
                products: action.payload.products,
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            }
            break;
        case productConstants.ADD_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case productConstants.ADD_PRODUCT_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break;
        case productConstants.ADD_PRODUCT_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            }
            break;
        default:
            return state;
    }
    return state;
};
