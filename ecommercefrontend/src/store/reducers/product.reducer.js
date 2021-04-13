import { productConstants } from "../actions/constants"

const initState = {
    loading: false,
    error: '',
    products: [],
    productsByPrice: {
        under5k: [],
        under10k: [],
        under15: [],
        under20k: [],
        under25k: [],
    },

    productDetails: {},
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
    switch (action.type) {
        case productConstants.GET_PRODUCT_BY_SLUG_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case productConstants.GET_PRODUCT_BY_SLUG_SUCCESS:
            state = {
                ...state,
                loading: false,
                products: action.payload.products,
                productsByPrice: {
                    ...action.payload.productsByPrice
                }
            }
            break;
        case productConstants.GET_PRODUCT_BY_SLUG_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            }
            break;
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
            state = {
                ...state,
                loading: false,
                productDetails: action.payload.productDetails,
            }
            break;
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
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
}