import { productConstants } from "../actions/constants";

const initState = {
    products: [],
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
        default:
            return state;
    }
    return state;
}