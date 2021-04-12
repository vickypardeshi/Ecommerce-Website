import axios from "../../api/axios"
import { productConstants } from "./constants";

export const getProductBySlug = (slug) => {
    return async dispatch => {

        dispatch({
            type: productConstants.GET_PRODUCT_BY_SLUG_REQUEST,
        });

        const res = await axios.get(`/products/${slug}`);
        if(res.status === 200){
            dispatch({
                type: productConstants.GET_PRODUCT_BY_SLUG_SUCCESS,
                payload: res.data 
            });
        }
        else{
            dispatch({
                type: productConstants.GET_PRODUCT_BY_SLUG_FAILURE,
                payload: {
                    error: 'Something went wrong',
                } 
            });
        }
    }
}