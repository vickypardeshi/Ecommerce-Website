import axios from '../../api/axios';
import {
    categoryConstants, 
    orderConstants, 
    productConstants, 
} from "./constants";

export const getInitialData = () => {
    return async dispatch => {
        try{
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_REQUEST,
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_REQUEST,
            });
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_REQUEST,
            });
            const res = await axios.post('/initialData');
            if(res.status === 200){
                const { categories, products, orders} = res.data;
                dispatch({
                    type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                    payload: { categories}
                });
                dispatch({
                    type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                    payload: { products }
                });
                dispatch({
                    type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                    payload: { orders }
                });
            }
            else{
                dispatch({
                    type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
                dispatch({
                    type: productConstants.GET_ALL_PRODUCTS_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
                dispatch({
                    type: orderConstants.GET_CUSTOMER_ORDER_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
        catch(error){
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: {
                    error
                }
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_FAILURE,
                payload: {
                    error
                }
            });
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_FAILURE,
                payload: {
                    error
                }
            });
        }
    }
}