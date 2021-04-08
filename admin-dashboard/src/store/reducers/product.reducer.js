import { productConstants } from "../actions/constants";

const initState = {
    products: [],
    loading: false,
    error: '',
}
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
    switch(action.type){
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
            }
            break;
        case productConstants.ADD_NEW_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case productConstants.ADD_NEW_PRODUCT_SUCCESS:
            const product = action.payload.products;
            const updatedProducts = state.products.push({
                ...product
            });
            console.log(updatedProducts);
            state = {
                ...state,
                loading: false,
            }
            break;
        case productConstants.ADD_NEW_PRODUCT_FAILURE:
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