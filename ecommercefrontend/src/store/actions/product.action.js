import axios from "../../api/axios"
import { productConstants } from "./constants";

export const getProductBySlug = (slug) => {
    return async dispatch => {
        try{
            dispatch({
                type: productConstants.GET_PRODUCT_BY_SLUG_REQUEST,
            });
            const res = await axios.get(`/products/${slug}`);
            if (res.status === 200) {
                dispatch({
                    type: productConstants.GET_PRODUCT_BY_SLUG_SUCCESS,
                    payload: res.data
                });
            }
            else {
                dispatch({
                    type: productConstants.GET_PRODUCT_BY_SLUG_FAILURE,
                    payload: {
                        error: 'Something went wrong',
                    }
                });
            }
        }
        catch(error){
            dispatch({
                type: productConstants.GET_PRODUCT_BY_SLUG_FAILURE,
                payload: {
                    error,
                }
            });
        }
    }
};

export const getProductDetailsById = (payload) => {
    return async dispatch => {
        dispatch({
            type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST,
        });
        let res;
        try {
            const { productId } = payload.params;
            res = await axios.get(`/product/${productId}`);
            if (res.status === 200) {
                dispatch({
                    type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                    payload: {
                        productDetails: res.data.product
                    }
                });
            }
            else{
                dispatch({
                    type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                    payload: {
                        error: 'Something went wrong',
                    }
                });
            }
        }
        catch(error){
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload: {
                    error: 'Something went wrong',
                }
            });
        }
    }
};
